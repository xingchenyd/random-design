# MCP server reference

[中文](mcp-tools.zh-CN.md) · [Back to README](../README.md)

`hash-design-mcp` is a stdio [Model Context Protocol](https://modelcontextprotocol.io) server built on the official TypeScript SDK. Source: [`packages/mcp/src/server.ts`](../packages/mcp/src/server.ts). It exposes 6 tools, 4 resources and 1 prompt, and sends server instructions that summarise the workflow to the client.

> Not published on npm yet. Run it from a source checkout: `node /ABS/PATH/hash-design/packages/mcp/dist/bin.js` (see [Install by hand](../README.md#install-by-hand)).

## Working directory and file access

The server runs locally with your user's permissions and makes no network requests. Relative paths (`out_dir`, `path`, `roll_path`, `out_path`) resolve against the **server's working directory**, which is whatever directory your client starts it in. Claude Code and Cursor usually start it in the project; Claude Desktop does not, so give it absolute paths there.

Tools that touch the filesystem:

| Tool                 | Reads                     | Writes                                                                |
| -------------------- | ------------------------- | --------------------------------------------------------------------- |
| `roll_designs`       | —                         | `roll.json`, `ROLL.md`, `briefs/*.md` under `out_dir` (only if given) |
| `critique_page`      | `path`, `roll_path`       | —                                                                     |
| `build_compare_page` | `roll_path`, preview list | `compare.html` (or `out_path`)                                        |

## Shared constraint parameters

`roll_designs`, `get_brief` and `critique_page` accept the same flat constraint fields. They are documented in detail in [mapping.md §5](mapping.md#5-constraints).

| Parameter          | Type                             | Meaning                                                   |
| ------------------ | -------------------------------- | --------------------------------------------------------- |
| `light_only`       | boolean                          | Only light palettes                                       |
| `dark_only`        | boolean                          | Only dark palettes (branches without one are skipped)     |
| `reduced_motion`   | boolean                          | Force the stillest motion option of each branch           |
| `brand_colors`     | string[] (≤ 2, `#rgb`/`#rrggbb`) | `[accent]` or `[accent, accent2]`                         |
| `families`         | enum[]                           | `print` `document` `signage` `screen` `craft` `modernist` |
| `include_branches` | string[]                         | Restrict the pool to these branch ids                     |
| `exclude_branches` | string[]                         | Remove these branch ids from the pool                     |

## Tools

### `roll_designs`

Roll N true-random hashes and map each to a distinct design direction. Not read-only, not idempotent (every call without `seed` is a new roll).

| Parameter   | Type                | Default                               | Notes                                                       |
| ----------- | ------------------- | ------------------------------------- | ----------------------------------------------------------- |
| `subject`   | string, required    | —                                     | What the page is for                                        |
| `facts`     | string[]            | `[]`                                  | The only facts the page may state                           |
| `count`     | integer 1–12        | 5                                     |                                                             |
| `seed`      | string              | —                                     | Reproducible roll for examples/tests only                   |
| `language`  | `zh` \| `en`        | auto-detected from subject and facts  | Brief language                                              |
| `out_dir`   | string              | —                                     | Freeze `roll.json`, `ROLL.md`, `briefs/NN-<branch>.md` here |
| `detail`    | `full` \| `summary` | `summary` with `out_dir`, else `full` | Whether every brief is inlined in the response              |
| constraints | see above           |                                       |                                                             |

Returns two text blocks: (1) Markdown (summary table, refs, the files written, the briefs when `detail = full`, and the next step) and (2) a JSON object `{ source, library, constraints, designs: [{ number, ref, branch }] }` for programmatic use.

CLI: `hash-design roll --subject … --fact … --facts-file … --count … --seed … --out … --format md|json|summary`. The CLI has no `--language` flag; it always auto-detects.

### `get_brief`

Rebuild the brief for a ref. Read-only and idempotent: the same ref + constraints + library always gives the same brief.

| Parameter   | Type                 | Notes                                     |
| ----------- | -------------------- | ----------------------------------------- |
| `ref`       | string, required     | `<64-hex hash>` or `<hash>+<probe>`       |
| `subject`   | string               | Put back into the brief's content section |
| `facts`     | string[]             |                                           |
| `language`  | `zh` \| `en`         |                                           |
| `format`    | `markdown` \| `json` | Default `markdown`                        |
| constraints | see above            | Must match the roll's constraints         |

CLI: `hash-design brief <ref> [constraints] [--subject …] [--fact …] [--format md|json]`.

### `list_branches`

List the branches in mapping order. Parameter: `family` (optional enum). CLI: `hash-design branches [--family …] [--json]`.

### `get_branch`

Full detail of one branch: concept, references, tokens and every option of every dimension. Parameters: `id` (required), `format` (`markdown` | `json`). CLI: `hash-design branch <id> [--json]`.

### `critique_page`

Static critique of an HTML page against the 14 global bans plus contrast, `viewport`, `lang`, `img alt` and reduced-motion checks. With a brief it also scores adherence (fonts, palette, radius / shadow policy). Read-only.

| Parameter   | Type                 | Notes                                                                                                            |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `html`      | string               | Full HTML source (give `html` or `path`)                                                                         |
| `path`      | string               | HTML file, relative to the server cwd                                                                            |
| `css`       | string               | Extra CSS not inlined in the HTML                                                                                |
| `brief_ref` | string               | Ref to check adherence against (+ the same constraints)                                                          |
| `roll_path` | string               | `roll.json` from `roll_designs` (alternative to `brief_ref`)                                                     |
| `pick`      | integer ≥ 1          | Design number inside `roll_path`                                                                                 |
| `facts`     | string[]             | Numbers on the page that are not in the facts get flagged; defaults to the roll's facts when `roll_path` is used |
| `format`    | `markdown` \| `json` |                                                                                                                  |
| constraints | see above            | Used with `brief_ref`                                                                                            |

Scoring: start at 100, subtract 25 per critical, 10 per major and 4 per minor finding. Grades: A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, F below. Adherence is a separate 0–100 score, present only when a brief was given.

CLI: `hash-design critique <page.html> [--css <file>] [--brief <ref> | --roll <roll.json> --pick <n>] [--facts-file <path>] [--json] [--fail-under <score>]`. With `--fail-under`, the CLI exits with code 1 when the score is below the threshold, which makes it usable in CI.

### `build_compare_page`

Write `compare.html`: every preview in a scaled iframe side by side, with branch / palette / type labels, a desktop / mobile toggle and a focus mode (keys 1–9). Expects previews at `<previews_dir>/NN-<branch>.html` and lists any that are missing. The page's labels, buttons and instructions follow the roll's language (`content.language` in `roll.json`: Chinese or English).

| Parameter      | Type             | Default                              |
| -------------- | ---------------- | ------------------------------------ |
| `roll_path`    | string, required | —                                    |
| `out_path`     | string           | `compare.html` next to `roll.json`   |
| `previews_dir` | string           | `previews` (relative to `roll.json`) |
| `briefs_dir`   | string           | `briefs` (relative to `roll.json`)   |
| `title`        | string           | the roll's subject                   |

CLI: `hash-design compare [--roll <roll.json>] [--out <compare.html>] [--previews <dir>] [--briefs <dir>] [--title <t>]`.

## Resources

| URI                         | Content                                               |
| --------------------------- | ----------------------------------------------------- |
| `hash-design://bans`        | The 14 global bans with ids and severities (Markdown) |
| `hash-design://workflow`    | The full Skill (`SKILL.md`)                           |
| `hash-design://branches`    | All branches in mapping order                         |
| `hash-design://branch/{id}` | One branch in detail (listable resource template)     |

## Prompt

`hash-design` with arguments `subject` (required), `facts` (one per line) and `count`. It expands to a user message that walks the agent through: `roll_designs` with `out_dir="design/hash-design"` and no seed → one preview per brief → `critique_page` with `roll_path` + `pick` → `build_compare_page` → stop and wait for the user's number → build the final page from the chosen brief and critique it again.

## Files written by a roll

```
design/hash-design/
  roll.json            # algorithm, library, createdAt, source, constraints, content, designs[] (full brief JSON)
  ROLL.md              # summary table + full refs
  briefs/01-<branch>.md
  …
  previews/01-<branch>.html   # written by the agent, one per brief
  compare.html                # written by build_compare_page
```

## Client configuration

See [Install by hand](../README.md#install-by-hand) in the README for Claude Code, Cursor and Claude Desktop. After the package is published on npm, the command will become `npx -y hash-design-mcp`.

## Testing

`packages/mcp/test/server.test.ts` drives the server through the SDK's in-memory transport, including a test that `roll_designs` with the example seed reproduces the CLI example roll exactly. `scripts/smoke.mjs` spawns the built server over real stdio in CI.
