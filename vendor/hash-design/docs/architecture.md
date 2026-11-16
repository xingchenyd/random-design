# Architecture

[中文](architecture.zh-CN.md) · [Back to README](../README.md)

hash-design is an npm-workspaces monorepo with two packages, one Skill and a fully worked example. Everything is TypeScript (strict, ESM, Node ≥ 20).

```
                 ┌──────────────────────────── packages/core (npm: hash-design) ─────────────────────────────┐
  facts ───────► │ hash.ts ──► mapping.ts ──► brief.ts / derive.ts ──► files.ts (roll.json, ROLL.md, briefs/) │
  constraints    │   ▲            ▲                                                                           │
                 │   │       data/ (branches, pools, bans) ── validate.ts                                    │
                 │ crypto     critique.ts (static HTML/CSS checks)   compare.ts (compare.html)   catalog.ts   │
                 │            cli.ts / bin.ts (hash-design CLI)      skill.ts (SKILL.md access + sync block) │
                 └───────────────▲────────────────────────────────────────────────────────────────────────────┘
                                 │ imports the public API only
                 ┌───────────────┴──── packages/mcp (npm: hash-design-mcp) ────┐
                 │ server.ts: 6 tools, 4 resources, 1 prompt, instructions     │
                 │ bin.ts:    stdio transport                                  │
                 └─────────────────────────────────────────────────────────────┘
  skills/hash-design/SKILL.md ── the agent workflow (synced to .claude/ and .cursor/)
```

## Packages

### `packages/core` (`hash-design`)

| Module                     | Responsibility                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/hash.ts`              | `randomHash` (CSPRNG → SHA-256), `seededHash`, `rollHashes`, ref parsing/formatting (`<hash>+<probe>`), `ALGORITHM`                 |
| `src/mapping.ts`           | The decision tree: `mapDesign`, `mapRoll` (collisions + family spread), `branchPool`, constraints, `BYTE_MAP`, `libraryFingerprint` |
| `src/data/branches/`       | 40 branches, one object each (`_exemplar.ts` plus four family files); `index.ts` fixes `BRANCH_ORDER` (the mapping order)           |
| `src/data/pools.ts`        | Global pools: 4 densities, 7 modular scales, 14 copy voices, 16 twists                                                              |
| `src/data/bans.ts`         | 14 global bans, 23 banned fonts, English and Chinese buzzword lists                                                                 |
| `src/validate.ts`          | `validateBranch` / `validateLibrary`: shape, contrast, banned fonts, framework colours, font diversity                              |
| `src/derive.ts`            | Derived tokens: type scale, font stacks, Google Fonts URL, WCAG contrast report, `tokens.css`, language detection                   |
| `src/brief.ts`             | `roll`, `reproduce`, Markdown and JSON briefs, roll summaries, `roll.json` shape                                                    |
| `src/files.ts`             | `writeRoll`: freezes `roll.json`, `ROLL.md` and `briefs/NN-<branch>.md`                                                             |
| `src/critique.ts`          | `critiquePage`: static HTML/CSS checks for every ban plus contrast / a11y basics and brief adherence                                |
| `src/compare.ts`           | `buildComparePage`: one self-contained HTML file with scaled iframes, labels, desktop/mobile toggle, focus keys                     |
| `src/catalog.ts`           | Branch list / detail / catalogue rendering (used by the MCP server and `docs/branches.md`)                                          |
| `src/skill.ts`             | Locates `SKILL.md` (repo or packaged copy) and renders the generated bans block                                                     |
| `src/cli.ts`, `src/bin.ts` | The `hash-design` CLI (`node:util` `parseArgs`, no CLI framework)                                                                   |

Runtime dependency: `node-html-parser` (for `critique_page`). Nothing else.

### `packages/mcp` (`hash-design-mcp`)

A thin adapter over the core's public API using `@modelcontextprotocol/sdk` and `zod` input schemas. Every tool has a CLI equivalent, and a test checks that `roll_designs` with the example seed returns exactly the refs of the CLI-generated example roll. See [mcp-tools.md](mcp-tools.md).

Design choices:

- **Flat constraint parameters** (`light_only`, `brand_colors`, …) rather than a nested object: models fill flat schemas more reliably.
- **Two content blocks** from `roll_designs`: Markdown for the model to read and a small JSON block for programmatic clients.
- **`detail: summary` by default when `out_dir` is set**, so five full briefs do not flood the context; the agent then reads each brief file on its own, which is what keeps previews independent.
- Tool annotations mark `get_brief`, `list_branches`, `get_branch` and `critique_page` as read-only.

## Data as code

Branches are TypeScript objects, not YAML or JSON, so the compiler checks their shape and the validator can run in tests. Each branch carries:

- id, bilingual name and concept, references, keywords, family
- tokens (grid, radius, border, shadow policy)
- 3 options for each of layouts, type pairings, palettes, motion, motifs, anchors and surfaces
- 1–3 allowed densities and modular scales
- must / must-not lists

`validateLibrary` (run in `branches.test.ts`) enforces: 3–5 options per dimension, lowercase `#rrggbb` hex, ink/paper ≥ 7:1 and muted/paper ≥ 4.5:1 contrast, at least one light palette, no banned fonts (fallbacks included), no framework default hex values, a display family leading at most 3 branches, unique ids and names. `branches.test.ts` also checks that no two branches share the same lead palette (paper + accent). `scripts/verify-fonts.mjs` checks every Google Fonts URL online (235/235); it is not in CI because it needs the network.

## Generated files

`npm run sync` (build + `scripts/sync.mjs`) regenerates everything derived from the data:

- the bans block inside `skills/hash-design/SKILL.md`, between `<!-- BEGIN GENERATED: bans (npm run sync) -->` and `<!-- END GENERATED: bans -->`
- the copies `.claude/skills/hash-design/SKILL.md` and `.cursor/skills/hash-design/SKILL.md`
- `docs/branches.md`

`skill.test.ts` fails if any of these is stale.

## The examples as regression fixtures

The four runs under `examples/` (a bakery, a developer tool, a bicycle repair shop and a music festival) are both documentation and test fixtures. `examples.test.ts` finds every directory with a `roll.json`, re-rolls it from its `facts.md` with the seed recorded in `roll.json`, and checks that the refs, the library fingerprint and the brief files still match. It also checks that each preview scores at least 90 on the critique with no critical or major findings, that no two examples share a branch, and that the Pages index and every README link to each example. Any data change therefore forces a deliberate re-roll and new previews (see [CONTRIBUTING.md](../CONTRIBUTING.md)). The previews themselves are hand-off artifacts produced by agents following the Skill; they are not generated by code. `scripts/examples.mjs` lists the examples and re-rolls, critiques or rebuilds their compare pages.

## Testing and CI

- **Vitest**, 10 test files: `hash`, `mapping`, `branches`, `brief`, `critique` (with good and bad HTML fixtures), `compare`, `cli`, `skill` (sync checks), `examples`, and `mcp/server` (in-memory transport).
- **`scripts/smoke.mjs`**: runs the built CLI and talks to the built MCP server over a real stdio pipe.
- **CI** (`.github/workflows/ci.yml`), on Node 20, 22 and 24: `npm ci`, build, typecheck (including tests), ESLint, Prettier check, tests, smoke test, `npm pack --dry-run` for both packages.
- **Pages** (`.github/workflows/pages.yml`): publishes `examples/` to GitHub Pages when it changes.

## Packaging

Both packages are publish-ready but **not published yet**. `prepack` in `packages/core` copies `SKILL.md` and `LICENSE` into the package so `hash-design skill install` works from an npm install; `packages/mcp` depends on `hash-design` by version. `tsbuildinfo` files are excluded from the tarballs.
