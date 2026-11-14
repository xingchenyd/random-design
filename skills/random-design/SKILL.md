---
name: random-design
description: Choose a fixed visual style or generate comparable hash-based directions for a website or PowerPoint. Use when the user names one of the 21 random-design presets, asks for visual alternatives, or requests reuse of a saved random-design specification.
---

# Random Design

Preserve the supplied content, facts, prices and intended voice. Use the visual specification to decide typography, palette, layout, material and the role of illustrations.

## Choose the entry point

- **Named style:** use MCP `list_presets` to resolve the ID and `get_preset` to obtain the fixed design. In a checkout, run `node src/cli.js list-presets` or `node src/cli.js preset --style new-chinese --out <new-directory>`. A named preset can be reused without advancing random history.
- **Explore variations:** call MCP `generate_directions` or run `node src/cli.js generate --out <new-directory>`. Pass the same content to each preview. Use a supplied seed if the user requests repeatability and carry over the caller's random history when available. Use `direction` to constrain variations to a named style.
- **Browser only:** open https://xingchenyd.github.io/random-design/presets/ for the fixed styles or https://xingchenyd.github.io/random-design/ for both modes. Select the style in the studio and download JSON, HTML or PPTX. See [integrations](references/integrations.md) for available clients.

## Apply the direction

Use `render_design` for a preview, CSS, SVG and a brief. The CLI and studio also generate a six-slide PowerPoint specimen. Adapt the layout and illustration to the user's subject. For example, keep the New Chinese Style's vertical short title and circular composition while replacing the sample coffee illustration if it has no role in the new content.

For these 21 styles, use the [material and reference guide](references/materials.md) to retain the lighting, surfaces and layout that make each style recognizable.

Check the actual page at its intended viewport or render the final slides. Review the title hierarchy, focal point, content fit and readability. Preserve native text and data when editing PPTX. Its complex illustration is an SVG image and some website effects have a PowerPoint-specific treatment.

Save the selected `design.json` and the project version. v0.3 can read v0.2 specifications and histories. Use the corresponding release for the older seed-to-design mapping. Keep user-selected constraints if candidate generation exhausts its budget and explain which constraint caused the conflict.
