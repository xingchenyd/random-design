# Validation record / 验证记录

Release candidate: v0.2.0. Checked 2026-11-03. Read the machine-readable files for the actual measurements and limits.

| Evidence | Observed result | What it establishes |
|---|---|---|
| Node tests | 14 passed | Reproduction, locks, constraints, content escaping, failure behaviour, concurrent history, all graphic exports, overwrite protection and excess-content refusal |
| [benchmark.json](benchmark.json) | 10,000 specifications; 10,000 distinct visual fingerprints; zero rule failures | Tested specification-scale generation and recent weighted attribute distance; not 10,000 human-certified art styles |
| [browser.json](browser.json) | Five-direction generation, repeat usage, language switch, JSON import, PPTX download, 390px layout; 64 supported direction/layout/language/width combinations | Browser interaction and bounded-layout checks in Chromium; not a physical phone or all-browser audit |
| [mcp.json](mcp.json) | Five tools exercised over stdio and Streamable HTTP | Standard-client protocol behaviour; not registration in a WorkBuddy or ChatGPT account |
| [pptx-structure.json](pptx-structure.json) | 10 exports / 60 slides; native text, table, chart and embedded chart workbook present; no broken relationships | Structural and editable-object evidence; not native editor fidelity |
| [pptx-render.json](pptx-render.json) | Actual PPTX imports rendered, 60 slides | Rendering evidence using the named renderer; font substitution depends on availability |
| Visual review | English/Chinese specimens reviewed, coherent coloured canvases and graphic roles inspected, representative website and studio screenshots inspected | Specific observed layout quality; no universal aesthetic guarantee |
| Dependency audit | `npm audit --omit=dev --audit-level=high`: zero reported vulnerabilities after lockfile update | Registry advisories at the time of checking, not a security certification |
| Skill validation | Skill Creator validator passed | Frontmatter and package structure, not every agent's runtime behaviour |

The public examples use the same saved visual JSON for the two languages. The screenshot contact sheets show real website captures and real PPTX renders. Image assets are not AI mockups. Complex SVG is intentionally an image in PPTX; native chart and table data remain editable. No PowerPoint/WPS desktop test or real-device test is claimed.

Default colour and grammar regression checks exercise 25 different five-theme seeds. The actual background chroma/lightness is measured, rather than counting accent colours. Each generated graphic, font and material must obey its selected grammar.

The benchmark's diversity measure is transparent and heuristic. It does not measure screenshot similarity, human preference, cultural originality or global uniqueness. All retained fingerprints are checked for exact reuse; only the configured recent window receives similarity checks. Constraints can exhaust the candidate budget, in which case generation fails without recording a partial set.

The static studio is a separate deployment from the optional HTTP MCP server. Public static-site verification and GitHub Actions status should be checked against the relevant deployment/commit, rather than inferred from local tests.

`deployment-v0.1.0.json` is an archived check of the old release. It is not evidence that the new studio has deployed. The v0.2.0 release attaches its public deployment check with the tested source commit.
