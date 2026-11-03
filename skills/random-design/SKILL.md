---
name: random-design
description: Generate, compare and apply diverse visual themes for websites or presentations using the random-design procedural engine. Use for visual direction exploration, multiple theme proposals, palette/type/graphic/layout systems, or explicitly requested random-design work. Keep supplied copy and facts unchanged.
---

# Random Design

Use the engine to generate visual specifications, then apply a selected specification to the user's actual deliverable. Do not substitute arbitrary model-picked themes for engine output.

## Choose the available route

- **MCP available:** call `generate_directions` with the scenario, language and relevant constraints. Over HTTP, pass the client's saved history entries and retain the returned history entries. Use `render_design` for HTML/CSS/SVG/brief and `validate_design` to check saved JSON.
- **Terminal or cloud sandbox:** from a source checkout, run `npm ci`, then `node src/cli.js generate --out <new-directory> --scenario <scenario> --language zh`. Default: five directions with local history. This is source-only; do not invent an npm registry installation command. See [integration routes](references/integrations.md).
- **Browser only:** open https://xingchenyd.github.io/random-design/ . Generate directions, download the selected JSON and brief, and bring them into the current chat. A GitHub URL alone does not install a tool into ChatGPT. If browser interaction or file access is unavailable, provide the exact handoff instructions; do not claim to have generated results.

## Explore and select

Treat the selected **art direction** as a coherent visual grammar. Read its source logic and graphic purpose in the brief. The default `colorfulness: rich` uses visibly coloured large canvases, with different colour families and art directions in a batch. Neutral backgrounds are an explicit option, not the default design identity.

Do not independently replace the graphic, add mirrored copies, rotate ornaments or stack motifs from other directions. A botanical drawing must share a stem; a construction diagram's lines must describe one geometry; a textile uses one repeat system; a sign uses a disciplined border/medallion and typography. Respect those relationships when adapting the result. Numerical fingerprint uniqueness is never evidence of aesthetic quality.

Preserve the supplied content, facts, numbers and narrative voice. Ask only for missing visual constraints that materially affect the work. Use the closest scenario: academic, business, product, culture, creative, or general. The default intensity is balanced; use calm or bold when the occasion supports it.

Generate multiple directions with the same content, show comparable previews and wait for a choice unless the user has already delegated selection. Do not require a new approval for an already selected theme. User-requested modifications and deliberate reuse are allowed.

Allow palette, font, graphic-family or composition locks while regenerating other dimensions. If the novelty constraint cannot be met, report the failure and suggest unlocking a dimension or explicitly lowering the threshold. Do not silently relax novelty or fabricate extra candidates.

## Apply the selected design

Retain `design.json`, its algorithm and library fingerprint, exported assets and the selection record. A seed alone cannot reproduce history-dependent selection; saved visual JSON can reproduce its rules with the matching release. A fresh name or seed is not evidence of a new style.

Version 0.2 uses `random-design/2`, a new browser history key and `~/.random-design/history-v2.json`. Version 0.1 data stays intact and needs its matching release; do not silently reinterpret old designs as the new grammar.

- **Web:** use the selected tokens, type hierarchy and procedural graphic. Adapt layout to actual content and semantics. Check desktop and mobile, keyboard access, overflow and text contrast. `accentInk` is for accent-coloured text on paper; `onAccent` is for text on accent. `accent2` is decorative unless separately contrast-checked.
- **PPT:** use one theme across varied page types. The exporter provides a six-slide editable sample, not a universal content-to-deck generator. Adapt the user's actual outline and preserve native text, tables and data charts. Decorative SVG is an image. Install the referenced fonts or agree on substitutes, then render all final slides and inspect fit and legibility.

Attribute distance and token validation do not prove aesthetic quality, complete accessibility or perceptual uniqueness. Distinguish browser-size checks, PPTX structural checks, rendered inspection and actual application/account tests. Do not claim WorkBuddy/ChatGPT account integration merely because a standard MCP client test passes.

## Art direction when making the real project

The built-in HTML and six-slide deck are specimens for comparing specifications. They are not a universal page or deck layout. Build the actual deliverable around its own information hierarchy: a research presentation needs evidence, figures and readable captions; an event page needs its programme and location; a product page needs its actual product and interaction.

Do not paste a stock plant, rosette or construction diagram into unrelated content simply to fill space. The frozen palette, typography, material and spatial rules remain the visual contract. Where the sample motif has no role in the actual subject, replace it with one subject-relevant illustration, diagram or supplied image that follows that grammar, or use typography alone. Explain the adaptation in the design brief. Do not add unrelated ornaments, invent factual diagrams or replace the chosen direction with a new style.

For each preview and final deliverable, inspect the actual rendered result. Confirm one clear focal point, a deliberate hierarchy, consistent alignment, balanced colour areas, readable text and labels, restrained material detail and a reason for every graphic. Remove elements with no compositional or informational purpose. A valid token file or large variant count cannot substitute for this review.
