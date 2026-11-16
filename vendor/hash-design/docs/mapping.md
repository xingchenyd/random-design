# Mapping specification: `hash-design/v1`

[中文](mapping.zh-CN.md) · [Back to README](../README.md)

This page specifies how a 256-bit hash becomes a design direction. Everything here is implemented in
[`packages/core/src/hash.ts`](../packages/core/src/hash.ts) and [`packages/core/src/mapping.ts`](../packages/core/src/mapping.ts)
and covered by `packages/core/test/mapping.test.ts`.

## 1. Where hashes come from

| Mode                 | Source                                           | `source` field in `roll.json` |
| -------------------- | ------------------------------------------------ | ----------------------------- |
| Real use (default)   | `sha256(crypto.randomBytes(32))`, the OS CSPRNG  | `system-random`               |
| Examples and tests   | `sha256("hash-design/v1:<seed>:<index>")`        | `seed:<seed>`                 |
| Library callers only | `roll({ hashes: [...] })` with hashes you supply | `provided-hashes`             |

`seed` exists so that examples and tests are reproducible. The Skill, the MCP prompt and the server instructions all tell agents never to pass a seed for real work.

A roll has 1–12 hashes (default 5). It cannot ask for more designs than there are branches left in the pool after constraints.

## 2. Bytes → dimensions

A hash is 32 bytes. `hash-design/v1` reads them as follows (`BYTE_MAP` in `mapping.ts`):

| Bytes | Dimension | Picked from                                        | Rule                    |
| ----- | --------- | -------------------------------------------------- | ----------------------- |
| 0–1   | branch    | the branch pool (40 branches, after constraints)   | `uint16(b0, b1) mod N`  |
| 2     | voice     | 14 global copy voices                              | `b2 mod 14`             |
| 3     | layout    | the branch's layouts (3)                           | `b3 mod len`            |
| 4     | type      | the branch's type pairings (3)                     | `b4 mod len`            |
| 5     | palette   | the branch's palettes (3), after light/dark filter | `b5 mod len`            |
| 6     | density   | the branch's allowed densities (1–3)               | `b6 mod len`            |
| 7     | motion    | the branch's motion options (3)                    | `b7 mod len`            |
| 8     | motif     | the branch's motifs (3)                            | `b8 mod len`            |
| 9     | anchor    | the branch's first-screen anchors (3)              | `b9 mod len`            |
| 10    | scale     | the branch's allowed modular scales (1–3)          | `b10 mod len`           |
| 11    | surface   | the branch's surfaces (3)                          | `b11 mod len`           |
| 12    | twist     | 16 global twists                                   | `b12 mod 16`            |
| 13–31 | —         | unused                                             | recorded in every brief |

Every step is written to the brief's **mapping trace** with the hex value, the formula and the result, so anyone can check the arithmetic by hand.

Two constraints replace a byte instead of filtering a pool:

- `brand_colors`: byte 5 is ignored. The palette whose accent hue is nearest to the first brand colour is chosen (achromatic brand colours match on lightness), then `accent` (and `accent2`, if a second colour is given) are overridden. The brief's contrast table is computed on the overridden palette.
- `reduced_motion`: byte 7 is ignored and the stillest motion option (shortest duration) is chosen.

## 3. Collisions and family spread

A single hash maps to its **primary branch** `uint16(b0, b1) mod N`. Inside one roll, `mapRoll` walks forward from the primary branch (`+1`, `+2`, …, wrapping around) until it finds a branch that is not a collision:

1. A branch already used in this roll is always a collision.
2. While at least one **family** in the pool is still unused, a branch whose family is already used is also a collision (family spread).

The number of steps walked is the design's `probe`. A design's ref is `<hash>` when `probe = 0` and `<hash>+<probe>` otherwise. Because the probe is part of the ref, any single design can be reproduced without the rest of the roll.

The six families and their sizes in the current library:

| Family    | Branches |
| --------- | -------- |
| print     | 9        |
| document  | 9        |
| signage   | 5        |
| screen    | 5        |
| craft     | 6        |
| modernist | 6        |

So a 5-roll without family constraints always spans five different families, and a 6-roll spans all six.

### A collision, step by step

The roll `hash-design roll --seed readme-demo` produces:

| #   | Hash (short) | Primary branch      | Probe | Walk                                                                                 |
| --- | ------------ | ------------------- | ----- | ------------------------------------------------------------------------------------ |
| 1   | `bfc3d620`   | 11 warm-handmade    | 0     | warm-handmade (craft)                                                                |
| 2   | `6081d15f`   | 25 art-deco         | 0     | art-deco (modernist)                                                                 |
| 3   | `177b9bc6`   | 11 warm-handmade    | 2     | warm-handmade (used) → bauhaus-primary (modernist used) → **web1-homepage** (screen) |
| 4   | `5399c212`   | 1 engineering-plate | 0     | engineering-plate (document)                                                         |
| 5   | `63438e2e`   | 11 warm-handmade    | 3     | … → web1-homepage (used) → **risograph-duotone** (print)                             |

Design 3's ref is `177b9bc61fd1dd51498216c1defceaabb2204ce863923ee50657e427b769b792+2`, and
`hash-design brief 177b9bc61fd1dd51498216c1defceaabb2204ce863923ee50657e427b769b792+2` rebuilds it on its own.

## 4. Branch order

The library order (`BRANCH_ORDER` in `packages/core/src/data/branches/index.ts`) is the mapping order, and it is deliberate: each family's members are spread evenly around the ring. With families bunched together, walking forward past a used family would funnel probability into whichever branch follows the bunch. With the even spread, every branch appears in 9–17% of 5-rolls (uniform would be 12.5%).

## 5. Constraints

Constraints are applied **before** any byte is read, by filtering the pools. They are therefore part of a design's identity: the same hash with different constraints is a different design, and you must pass the same constraints to `get_brief` / `hash-design brief` to reproduce it.

| MCP parameter      | CLI flag           | Effect                                                                            |
| ------------------ | ------------------ | --------------------------------------------------------------------------------- |
| `light_only`       | `--light-only`     | Only light palettes                                                               |
| `dark_only`        | `--dark-only`      | Only dark palettes; branches without a dark palette leave the pool                |
| `reduced_motion`   | `--reduced-motion` | Stillest motion option of each branch (byte 7 unused)                             |
| `brand_colors`     | `--brand <#hex>`   | Up to 2 colours: nearest-hue palette, accent / accent2 overridden (byte 5 unused) |
| `families`         | `--family <id>`    | Restrict the branch pool to these families                                        |
| `include_branches` | `--include <id>`   | Restrict the branch pool to these branch ids                                      |
| `exclude_branches` | `--exclude <id>`   | Remove these branch ids from the pool                                             |

`light_only` and `dark_only` cannot be combined. Unknown branch ids are rejected. Constraints that leave an empty pool are an error.

## 6. Reproducibility and the library fingerprint

A design is a pure function of `(hash, probe, constraints, library)`. Every brief and every `roll.json` records:

- `algorithm`: `hash-design/v1`. It changes only if the byte assignment changes.
- `library`: the first 12 hex digits of `sha256(JSON.stringify({ ALGORITHM, BRANCHES, VOICES, TWISTS, DENSITIES, SCALES }))`, currently `c7b166fe6ec0`.

Any edit to the branch data or the pools changes the fingerprint. An old ref still parses, but it may now map to a different design, so reproduce old refs with the version of hash-design whose fingerprint matches. The repository's own example is pinned this way: `packages/core/test/examples.test.ts` fails if the library fingerprint no longer matches `examples/fourth-lane-bakery/roll.json`.

## 7. Worked example: #3 Ink and seal

Hash `7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4`, probe 0, no constraints, from the [Fourth Lane Bakery example](../examples/fourth-lane-bakery/briefs/03-ink-and-seal.md):

| Bytes | Hex     | Dimension | Rule                        | Result                |
| ----- | ------- | --------- | --------------------------- | --------------------- |
| 0+1   | `7f 18` | branch    | 0x7f18 = 32536; mod 40 = 16 | **ink-and-seal**      |
| 2     | `e1`    | voice     | 225 mod 14 = 1              | **field-notes**       |
| 3     | `dc`    | layout    | 220 mod 3 = 1               | **handscroll**        |
| 4     | `68`    | type      | 104 mod 3 = 2               | **caoshu-antique**    |
| 5     | `35`    | palette   | 53 mod 3 = 2                | **blue-green-silk**   |
| 6     | `9c`    | density   | 156 mod 2 = 0               | **airy**              |
| 7     | `51`    | motion    | 81 mod 3 = 0                | **ink-bleed**         |
| 8     | `db`    | motif     | 219 mod 3 = 0               | **seals**             |
| 9     | `6b`    | anchor    | 107 mod 3 = 2               | **seal-as-title**     |
| 10    | `b6`    | scale     | 182 mod 3 = 2               | **perfect-fourth**    |
| 11    | `90`    | surface   | 144 mod 3 = 0               | **xuan-fibre**        |
| 12    | `3d`    | twist     | 61 mod 16 = 13              | **time-as-structure** |

Reproduce it:

```bash
node packages/core/dist/bin.js brief 7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4
```

## 8. Changing the mapping

- Adding, removing or reordering branches, or editing any option, changes `N` and/or the fingerprint. That is allowed; it is how the library grows. Re-roll the example afterwards (see [CONTRIBUTING.md](../CONTRIBUTING.md)).
- Changing which byte drives which dimension, or the collision rule, is an algorithm change and must bump `ALGORITHM` (for example to `hash-design/v2`).
