# Validation record / 验证记录

v0.3.0 checks were run on 2026-11-11. Read the linked records for the tested scope.

| Evidence | Observed result | What it establishes |
|---|---|---|
| Node tests | 16 passed | Fixed preset stability, v0.2 import, seed reproduction, locks, content escaping, concurrent history and export checks |
| [benchmark.json](benchmark.json) | 10,000 specifications; 10,000 distinct visual fingerprints; zero rule failures | Tested specification-scale generation and recent weighted attribute distance; not 10,000 human-certified art styles |
| [browser.json](browser.json) | 21-item catalogue, direct selection, language switch, JSON import, downloads; 84 fixed-style checks plus 64 original direction checks | Browser interaction and desktop/mobile width checks |
| [mcp.json](mcp.json) | Preset list, preset lookup, generation and rendering tested over stdio and Streamable HTTP | Standard MCP client behaviour |
| [presets-v3.json](presets-v3.json) | 42 preset PPTX exports, 147 rendered slides | Actual preset deck imports and covers |
| [pptx-structure.json](pptx-structure.json) and [pptx-render.json](pptx-render.json) | Archived v0.2 examples, 10 files and 60 slides | Historical verification of examples still distributed under `examples/` |
| Visual review | English/Chinese specimens reviewed, coherent coloured canvases and graphic roles inspected, representative website and studio screenshots inspected | Specific observed layout quality; no universal aesthetic guarantee |
| Dependency audit | `npm audit --omit=dev --audit-level=high`: zero reported vulnerabilities after lockfile update | Registry advisories at the time of checking, not a security certification |
| Skill validation | Skill Creator validator passed | Frontmatter and package structure, not every agent's runtime behaviour |

The public examples use the same saved visual JSON for the two languages. The screenshot contact sheets show real website captures and real PPTX renders. Image assets are not AI mockups. Complex SVG is intentionally an image in PPTX; native chart and table data remain editable. No PowerPoint/WPS desktop test or real-device test is claimed.

Default colour and grammar regression checks exercise 25 different five-theme seeds. The actual background chroma/lightness is measured, rather than counting accent colours. Each generated graphic, font and material must obey its selected grammar.

The benchmark's diversity measure is transparent and heuristic. It does not measure screenshot similarity, human preference, cultural originality or global uniqueness. All retained fingerprints are checked for exact reuse; only the configured recent window receives similarity checks. Constraints can exhaust the candidate budget, in which case generation fails without recording a partial set.

The static studio is a separate deployment from the optional HTTP MCP server. Public static-site verification and GitHub Actions status should be checked against the relevant deployment/commit, rather than inferred from local tests.

The v0.3.0 release includes the public deployment check and tested source commit. `deployment-v0.1.0.json` records the original studio check.
