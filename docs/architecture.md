# Architecture / 设计机制

[中文首页](../README.md) · [English](../README.en.md)

## Visual grammar, not a completed theme catalogue

The finite building blocks are **operators**, not complete styles. Nine composition operators govern spatial relationships; ten graphic operators construct parameterized paths and shapes. The engine samples palette hue/chroma/lightness and harmony, layout balance, density, whitespace, typography metrics, stroke/shape count/amplitude/rotation/symmetry, and surface parameters. It combines them under scenario and readability constraints.

These components are intentionally finite and inspectable. The engine does not invent new art movements, generate new font files, or prove that all combinations are perceptually distinct. Continuous parameters expand the space of visual systems; meaningful variety must also be checked across structural attributes.

`src/core/engine.js` is shared by Node, the browser and MCP. It has no model provider, network request or filesystem dependency. `src/core/graphics.js` draws deterministic SVG. `src/render.js` creates the website and brief; `src/pptx.js` exports native PowerPoint text, shapes, table and chart plus SVG artwork.

## Sampling

1. Validate request, including conflicting locks and brand/mode constraints.
2. Create a fresh cryptographic random seed unless one is supplied.
3. Derive a deterministic non-cryptographic PRNG stream from SHA-256 of the versioned seed. This is procedural sampling, not a source of additional entropy.
4. Sample a candidate: continuous colours in OKLCH (gamut-clamped via Culori), font roles, spatial relations and graphics parameters. Formal scenarios restrict disruptive operators/fonts; intensity controls scale, density and graphic weight.
5. Check schema, semantic visual fingerprint and selected text contrast. Typography uses real referenced fonts and CJK fallback families.
6. Within each block of 24 candidates, retain the valid candidate with the greatest minimum distance to recent history and already selected candidates. Refuse candidates below the requested threshold. Continue until the set is complete or the attempt budget is exhausted.

## Novelty policy

- **Exact visual identity:** SHA-256 over canonical visual parameters only. Names, content, timestamps and selection seed do not make a style unique. SVG seed is a visual parameter because it changes procedural geometry.
- **Recent similarity:** weighted attribute distance (0–1), using hue distance, mode, chroma, font family/category, composition, graphic family, filled/outline, density, type scale, spatial balance, amplitude, texture and depth. Default minimum: 0.25. Recent window: 80 shown themes.
- **All history vs recent:** exact fingerprints are checked against all retained entries; similarity is checked against the last 80 by default. Related visual languages may reappear outside that window. This directly targets infrequent recurrence rather than a promise of infinite global uniqueness.
- **Failure:** no silent relaxation. The caller receives an exhaustion error; no partial set is added to history.
- **History scope:** Node defaults to `~/.random-design/history.json` with a process lock and atomic file replacement. Browser uses localStorage and Web Locks when available; without Web Locks, concurrent tabs are not fully serialized. Export/import transfers history between environments. HTTP MCP receives client-owned history; it has no cross-user ledger.

The distance measure is a transparent engineering heuristic. It has not been calibrated against human similarity ratings. There is no image-embedding or screenshot perceptual similarity model in v0.1.0. Claims of tens of thousands of "unique art styles" would be unjustified.

## Reproduction and content

The authoritative artifact is `design.json`, not a seed. History affects which candidates a run accepts. Store JSON and the matching release/rule fingerprint to reproduce a visual specification. Generation from seed requires the same request and history. Rendering by an LLM, fonts on another device and browser versions may still differ.

Content is supplied separately. The engine does not randomize factual text, numbers or voice. The built-in sample and chart values are clearly fictional. The native exporter is a six-slide theme specimen; users/agents should adapt actual content and review all slides. Long custom content is subject to layout review; the sample exporter is not a semantic slide-layout optimizer.

## Versioning

`random-design/1` identifies behavioral rules. `LIBRARY` hashes declarative pools. Any change to sampling, distance, visual rendering or pools that alters reproduction requires a version/release decision and regenerated examples/validation. A library fingerprint alone does not identify a modified source checkout; retain the Git commit or release as well.
