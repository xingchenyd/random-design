# Architecture / 设计机制

[中文首页](../README.md) · [English](../README.en.md)

## Fixed styles and hash generation

The 21 [fixed styles](presets.md) define stable names, palette roles, fonts, illustrations and website layouts. The browser, CLI and MCP use the same preset lookup. Direct selection uses a stable specification and can be repeated independently of random history.

Hash generation samples those 21 directions plus the original eight. A direction's palette candidates include the compatible [historical hash-design swatches](../THIRD_PARTY_NOTICES.md), where available. Small shared hue shifts and bounded changes in lightness preserve the source palette relationships. The original directions also sample continuous colour ranges. Actual canvas chroma and text contrast are checked after conversion to sRGB.

## Original procedural directions

The finite building blocks are **operators**, not complete styles. Eight art-direction grammars constrain typography, allowed layouts, colour families, colour relationships, graphic purpose and material. Eleven structured graphic operators construct one subject or one repeat system. The engine samples actual palette colours, layout balance, density, whitespace, typography metrics, meaningful graphic amplitude/count/line weight and surface parameters. Arbitrary rotation and mirrored copies are disabled. It combines these rules under scenario and readability constraints.

These components are intentionally finite and inspectable. The engine does not invent new art movements, generate new font files, or prove that all combinations are perceptually distinct. Continuous parameters expand the space of visual systems; meaningful variety must also be checked across structural attributes.

`src/core/engine.js` is shared by Node, the browser and MCP. It has no model provider, network request or filesystem dependency. `src/core/graphics.js` draws deterministic SVG. `src/render.js` creates the website and brief; `src/pptx.js` exports native PowerPoint text, shapes, table and chart plus SVG artwork.

## Sampling

1. Validate request, including conflicting locks and brand/mode constraints.
2. Create a fresh cryptographic random seed unless one is supplied.
3. Derive a deterministic non-cryptographic PRNG stream from SHA-256 of the versioned seed. This is procedural sampling, not a source of additional entropy.
4. Select a coherent art direction, then generate continuous OKLCH colours within compatible families, font roles, supported spatial relations and meaningful graphic parameters. Default large canvases are chromatic. Materials and graphics must obey the same direction. See [visual-direction.md](visual-direction.md).
5. Check schema, semantic visual fingerprint and selected text contrast. Typography uses real referenced fonts and CJK fallback families.
6. Within each block of 24 candidates, rank valid candidates by minimum distance, recent direction frequency and light/dark diversity. Reject candidates below the requested threshold and continue until the set is complete or the attempt budget is exhausted.

## Novelty policy

- **Exact visual identity:** SHA-256 over canonical visual parameters only. Names, content, timestamps and selection seed do not make a style unique. SVG seed participates only for operators whose geometry actually uses it; unused count/rotation/seed fields are excluded.
- **Recent similarity:** weighted attribute distance (0–1), using art direction, actual canvas hue/lightness/chroma, colour family, font family/category, composition, graphic family, density, type scale, spatial balance, amplitude, texture and depth. Default minimum: 0.22. Recent window: 40 shown themes. Candidate budget: 1,400. These are explicit v0.2 defaults, not a runtime fallback to weaker constraints.
- **All history vs recent:** exact fingerprints are checked against all retained entries; similarity is checked against the last 40 by default. Related visual languages may reappear outside that window. This directly targets infrequent recurrence rather than a promise of infinite global uniqueness.
- **Failure:** no silent relaxation. The caller receives an exhaustion error; no partial set is added to history.
- **History scope:** Node defaults to `~/.random-design/history-v2.json` with a process lock and atomic file replacement. Browser uses localStorage and Web Locks when available; without Web Locks, concurrent tabs are not fully serialized. Export/import transfers history between environments. HTTP MCP receives client-owned history; it has no cross-user ledger.

The distance measure compares specified attributes. The rendered catalogue provides the visual review surface. Fixed styles and hashed variants share the same exporters.

## Reproduction and content

The authoritative artifact is `design.json`, not a seed. History affects which candidates a run accepts. Store JSON and the matching release/rule fingerprint to reproduce a visual specification. Generation from seed requires the same request and history. Rendering by an LLM, fonts on another device and browser versions may still differ.

Content is supplied separately. The engine does not randomize factual text, numbers or voice. The built-in sample and chart values are clearly fictional. The native exporter is a six-slide theme specimen; users/agents should adapt actual content and review all slides. Long custom content is subject to layout review; the sample exporter is not a semantic slide-layout optimizer.

## Versioning

`random-design/3` identifies the v0.3 sampling rules. `LIBRARY` hashes the declarative pools. v0.3 reads the v0.2 saved specifications and history entries. Use the release matching the stored seed if you need to reconstruct a previous sampling sequence from the seed.
