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

Preserve the supplied content, facts, numbers and narrative voice. Ask only for missing visual constraints that materially affect the work. Use the closest scenario: academic, business, product, culture, creative, or general. The default intensity is balanced; use calm or bold when the occasion supports it.

Generate multiple directions with the same content, show comparable previews and wait for a choice unless the user has already delegated selection. Do not require a new approval for an already selected theme. User-requested modifications and deliberate reuse are allowed.

Allow palette, font, graphic-family or composition locks while regenerating other dimensions. If the novelty constraint cannot be met, report the failure and suggest unlocking a dimension or explicitly lowering the threshold. Do not silently relax novelty or fabricate extra candidates.

## Apply the selected design

Retain `design.json`, its algorithm and library fingerprint, exported assets and the selection record. A seed alone cannot reproduce history-dependent selection; saved visual JSON can reproduce its rules with the matching release. A fresh name or seed is not evidence of a new style.

- **Web:** use the selected tokens, type hierarchy and procedural graphic. Adapt layout to actual content and semantics. Check desktop and mobile, keyboard access, overflow and text contrast. `accentInk` is for accent-coloured text on paper; `onAccent` is for text on accent. `accent2` is decorative unless separately contrast-checked.
- **PPT:** use one theme across varied page types. The exporter provides a six-slide editable sample, not a universal content-to-deck generator. Adapt the user's actual outline and preserve native text, tables and data charts. Decorative SVG is an image. Install the referenced fonts or agree on substitutes, then render all final slides and inspect fit and legibility.

Attribute distance and token validation do not prove aesthetic quality, complete accessibility or perceptual uniqueness. Distinguish browser-size checks, PPTX structural checks, rendered inspection and actual application/account tests. Do not claim WorkBuddy/ChatGPT account integration merely because a standard MCP client test passes.
