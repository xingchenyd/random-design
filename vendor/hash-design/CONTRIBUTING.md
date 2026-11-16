# Contributing to hash-design

Thanks for your interest! Bug reports, new design branches, better critique rules, documentation and translations are all welcome. By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

[中文摘要](#中文摘要)

## Ground rules

- **Do not let the model choose the style.** The project exists to take aesthetic choice away from the agent. Features that let an agent override a rolled direction "because it looks better" will not be accepted.
- **No invented facts.** Examples, fixtures and docs must not contain fake testimonials, user counts or logos.
- **Keep the CLI and the MCP server in parity.** Every MCP tool has a CLI equivalent, and both go through the core's public API.
- **Docs must match the code.** If you change a parameter, a flag, a tool or a default, update the docs in the same pull request.

## Development setup

Requires Node.js ≥ 20; `.nvmrc` pins 22.

```bash
git clone https://github.com/qybaihe/hash-design.git
cd hash-design
npm install
npm run build
npm run check   # typecheck + lint + prettier --check + vitest
node scripts/smoke.mjs
```

| Script                          | What it does                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run build`                 | `tsc -b` for both packages                                                                    |
| `npm test`                      | Vitest (core, CLI, MCP over in-memory transport, sync and example checks)                     |
| `npm run check`                 | Everything CI checks except the smoke test and pack dry-run                                   |
| `npm run format`                | Prettier `--write`                                                                            |
| `npm run sync`                  | Regenerate `SKILL.md`'s bans block, its `.claude/` / `.cursor/` copies and `docs/branches.md` |
| `node scripts/smoke.mjs`        | CLI + MCP server over real stdio                                                              |
| `node scripts/verify-fonts.mjs` | Check every Google Fonts URL online (not run in CI)                                           |
| `npm run examples`              | List the example runs and their seeds (`scripts/examples.mjs`)                                |
| `npm run example:roll`          | Re-roll every example with its fixed seed (`-- <name>` for one)                               |
| `npm run example:critique`      | Critique every example preview against its brief; fails below 90                              |
| `npm run example:compare`       | Rebuild every example's `compare.html`                                                        |
| `npm run screenshots`           | Playwright screenshots of every example (`npx playwright install chromium` first)             |
| `npm run hero`                  | Rebuild `docs/assets/hero.png` and `social-preview.png` from the example screenshots          |
| `npm run hero:gif`              | Rebuild the animated `docs/assets/hero.gif` and `hero.mp4` (needs ffmpeg)                     |

The code layout is described in [docs/architecture.md](docs/architecture.md), and the mapping algorithm in [docs/mapping.md](docs/mapping.md).

## Pull requests

1. Fork, then create a branch from `main`.
2. Make focused commits using [Conventional Commits](https://www.conventionalcommits.org/) as the history does: `feat(core): …`, `fix(mcp): …`, `docs: …`, `test: …`, `ci: …`, `chore: …`.
3. Run `npm run check` and `node scripts/smoke.mjs` locally.
4. Add an entry under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md) for user-visible changes.
5. Open the pull request and fill in the template. CI must be green on Node 20, 22 and 24.

## Adding or changing a design branch

Branches are the heart of the project, and the most valuable contribution. A good branch is a **real-world design genre** with references you can point to (a printed artifact, a signage system, a historical movement), not a mood ("modern", "clean", "playful").

1. Open a [new branch proposal](https://github.com/qybaihe/hash-design/issues/new?template=branch_proposal.yml) first if you want feedback before writing it.
2. Write the branch in `packages/core/src/data/branches/`, at the level of detail of `_exemplar.ts` (`supermarket-circular`): bilingual name and concept, at least 2 references, at least 3 keywords, tokens, 3 options for each of layouts, type, palettes, motion, motifs, anchors and surfaces, 1–3 densities and scales, and must / must-not lists.
3. Add its id to `BRANCH_ORDER` in `packages/core/src/data/branches/index.ts`. Keep each family spread evenly around the order, because the collision walk depends on it (see [mapping.md §4](docs/mapping.md#4-branch-order)).
4. Run the checks. `npm test` runs the validator, which enforces:
   - ink/paper contrast ≥ 7:1 and muted/paper ≥ 4.5:1, plus at least one light palette
   - lowercase `#rrggbb` values and no framework default colours (`FRAMEWORK_DEFAULT_HEX`)
   - no banned fonts, including in fallbacks
   - a display family leads at most 3 branches
   - no two branches share the same lead palette (paper + accent)
5. Run `node scripts/verify-fonts.mjs` so every Google Fonts URL resolves.
6. Run `npm run sync` to regenerate `docs/branches.md` and the Skill's generated block.
7. **Re-roll the examples** (next section). Any data change alters the library fingerprint, and `examples.test.ts` will fail until you do.

## Re-rolling the examples after a data change

The four runs under `examples/` (`fourth-lane-bakery`, `sluice`, `bridge-two-bikes`, `causeway-festival`, listed in [`scripts/examples.mjs`](scripts/examples.mjs)) are pinned to the library fingerprint. After changing branches, pools or bans:

1. `npm run build && npm run example:roll` rewrites every `roll.json`, `ROLL.md` and `briefs/`. If two examples now share a branch, `examples.test.ts` fails: move the later example to the next free seed (`<name>-2`, `<name>-3`, …) in `scripts/examples.mjs`.
2. Render one preview per brief following the [Skill](skills/hash-design/SKILL.md), step 3: each preview is produced from **its own brief only** (separate agent sessions), as a single self-contained HTML file in `previews/NN-<branch>.html`.
3. `npm run example:critique` must pass: every preview scores at least 90 with no critical or major findings (`examples.test.ts` checks the same).
4. `npm run example:compare`, then `npm run screenshots`, then `npm run hero` and `npm run hero:gif` (the README hero images and the social preview are built from `examples/causeway-festival`).
5. Update everything that quotes the examples: the demo sections of every `README*.md`, each example's `README.md`, `examples/index.html`, and the worked examples and fingerprint in `docs/mapping.md` / `docs/mapping.zh-CN.md`.

If that is more than you can take on, say so in the pull request; a maintainer can help with the re-roll.

## Changing the critique rules

Rules live in `packages/core/src/critique.ts`. Add or adjust a fixture under `packages/core/test/fixtures/` and a test in `critique.test.ts` that shows the rule firing on bad input and staying quiet on good input. Keep the rule ids in sync with the bans in `packages/core/src/data/bans.ts`, then run `npm run sync`.

## Changing MCP tools or CLI flags

Update, in the same pull request: the tool schema in `packages/mcp/src/server.ts`, the CLI in `packages/core/src/cli.ts` (including `--help`), the tests, [docs/mcp-tools.md](docs/mcp-tools.md) and its Chinese version, the tool tables in all `README*.md` files, and the MCP ↔ CLI table in `skills/hash-design/SKILL.md` (then `npm run sync`).

## Documentation and translations

- `README.md` (English) is the source of truth. `README.zh-CN.md`, `README.ja.md`, `README.ko.md` and `README.es.md` are translations.
- When you change the English README, update the translations if you can. If you cannot, open an issue so a translator can follow up, and mention it in the pull request.
- Keep code blocks, commands, package names, tool names and flags identical across languages; only prose and comments are translated.
- New translations are welcome. Add the file as `README.<lang>.md` and add it to the language switcher in every README.

## Reporting bugs and requesting features

Use the [issue templates](https://github.com/qybaihe/hash-design/issues/new/choose). For security problems, follow [SECURITY.md](SECURITY.md) and do not open a public issue.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

---

## 中文摘要

- **原则**：风格由骰子决定，不接受让 Agent "觉得更好看"就改方向的功能；示例和文档里不得编造事实；MCP 与 CLI 保持一一对应；改参数、命令或默认值时，同一个 PR 里同步更新文档。
- **开发**：Node ≥ 20（`.nvmrc` 为 22）。`npm install && npm run build && npm run check`，再跑 `node scripts/smoke.mjs`。
- **提交**：沿用 Conventional Commits（`feat(core): …`、`docs: …` 等）；用户可见的改动写进 `CHANGELOG.md` 的 `[Unreleased]`；CI 必须在 Node 20/22/24 上全绿。
- **新增分支**：必须是真实世界的设计门类，有可查的参照。按 `_exemplar.ts` 的粒度写，id 加进 `BRANCH_ORDER` 并保持家族均匀分布，然后跑 `npm test`、`node scripts/verify-fonts.mjs`、`npm run sync`。
- **改数据就要重掷示例**：库指纹会变，`examples.test.ts` 会失败。`examples/` 下的 4 个示例都要重掷：`npm run example:roll`，按 Skill 第 3 步为每份 brief 独立重做预览，`npm run example:critique`（每个预览 ≥ 90 分、无 critical/major），再跑 `npm run example:compare`、`npm run screenshots`、`npm run hero` 和 `npm run hero:gif`（README 首图、动图与社交预览图取自 causeway-festival），最后更新所有 README 的示例部分、各示例的 README、`examples/index.html` 和 `docs/mapping*.md` 里的推演。做不完可以在 PR 里说明，维护者会协助。
- **翻译**：英文 `README.md` 是基准，其余语言是译本。代码块、命令、包名、工具名在各语言中保持一致。
- **安全问题**请按 [SECURITY.md](SECURITY.md) 私下报告，不要开公开 issue。
