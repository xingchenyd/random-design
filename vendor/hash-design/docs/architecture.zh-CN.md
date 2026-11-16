# 架构

[English](architecture.md) · [返回 README](../README.zh-CN.md)

hash-design 是一个 npm workspaces monorepo，包含两个包、一个 Skill 和一个完整的示例。全部用 TypeScript 编写（strict、ESM、Node ≥ 20）。

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

## 包

### `packages/core`（`hash-design`）

| 模块                       | 职责                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/hash.ts`              | `randomHash`（CSPRNG → SHA-256）、`seededHash`、`rollHashes`、ref 解析与格式化（`<hash>+<probe>`）、`ALGORITHM` |
| `src/mapping.ts`           | 决策树：`mapDesign`、`mapRoll`（碰撞 + 家族分散）、`branchPool`、约束、`BYTE_MAP`、`libraryFingerprint`         |
| `src/data/branches/`       | 40 个分支，每个分支一个对象（`_exemplar.ts` 加四个家族文件）；`index.ts` 固定 `BRANCH_ORDER`（即映射顺序）      |
| `src/data/pools.ts`        | 全局池：4 种密度、7 种模数比例、14 种文案语气、16 个变数                                                        |
| `src/data/bans.ts`         | 14 条全局禁令、23 个禁用字体、英文和中文空话词表                                                                |
| `src/validate.ts`          | `validateBranch` / `validateLibrary`：结构、对比度、禁用字体、框架色值、字体多样性                              |
| `src/derive.ts`            | 派生 token：字号阶梯、字体栈、Google Fonts URL、WCAG 对比度报告、`tokens.css`、语言检测                         |
| `src/brief.ts`             | `roll`、`reproduce`、Markdown 和 JSON brief、掷骰摘要、`roll.json` 的结构                                       |
| `src/files.ts`             | `writeRoll`：冻结 `roll.json`、`ROLL.md` 和 `briefs/NN-<branch>.md`                                             |
| `src/critique.ts`          | `critiquePage`：逐条检查禁令的静态 HTML/CSS 检查，外加对比度 / 无障碍基础项和 brief 遵守度                      |
| `src/compare.ts`           | `buildComparePage`：一个自包含的 HTML 文件，含缩放的 iframe、标签、桌面/手机切换、聚焦快捷键                    |
| `src/catalog.ts`           | 分支列表 / 详情 / 目录渲染（MCP server 和 `docs/branches.md` 都用它）                                           |
| `src/skill.ts`             | 定位 `SKILL.md`（仓库内或包内副本），并渲染生成的禁令块                                                         |
| `src/cli.ts`, `src/bin.ts` | `hash-design` CLI（用 `node:util` 的 `parseArgs`，不用 CLI 框架）                                               |

运行时依赖：`node-html-parser`（供 `critique_page` 使用），没有别的。

### `packages/mcp`（`hash-design-mcp`）

基于 `@modelcontextprotocol/sdk` 和 `zod` 输入 schema，在 core 的公开 API 之上做的一层薄适配。每个工具都有对应的 CLI 命令，另有一个测试检查：用示例 seed 调用 `roll_designs`，返回的 ref 与 CLI 生成的示例掷骰完全一致。见 [mcp-tools.zh-CN.md](mcp-tools.zh-CN.md)。

设计取舍：

- **扁平的约束参数**（`light_only`、`brand_colors`……），而不是嵌套对象：模型填扁平 schema 更可靠。
- `roll_designs` 返回**两个内容块**：给模型读的 Markdown，以及给程序化客户端用的一个小 JSON 块。
- **设置了 `out_dir` 时默认 `detail: summary`**，这样五份完整 brief 不会塞满上下文；之后由 Agent 分别读取每个 brief 文件，正是这一点保证了预览彼此独立。
- 工具注解把 `get_brief`、`list_branches`、`get_branch` 和 `critique_page` 标为只读。

## 数据即代码

分支是 TypeScript 对象，而不是 YAML 或 JSON，所以编译器会检查它们的结构，校验器也能在测试里运行。每个分支包含：

- id、双语名称和概念说明、参考、关键词、家族
- token（栅格、圆角、边框、阴影策略）
- 版式、字体对、配色、动效、母题、首屏锚点、材质，每项各 3 个选项
- 1–3 个允许的密度和模数比例
- 必须 / 不要清单

`validateLibrary`（在 `branches.test.ts` 中运行）强制要求：每个维度 3–5 个选项；hex 为小写 `#rrggbb`；ink/paper 对比度 ≥ 7:1，muted/paper ≥ 4.5:1；至少一套浅色调色板；不得使用禁用字体（fallback 也算）；不得使用框架默认 hex 值；同一个 display 字体最多作为 3 个分支的首选；id 和名称唯一。`branches.test.ts` 还会检查任意两个分支的首选调色板（paper + accent）不相同。`scripts/verify-fonts.mjs` 在线检查每个 Google Fonts URL（235/235）；它需要联网，所以不在 CI 里跑。

## 生成的文件

`npm run sync`（build + `scripts/sync.mjs`）会重新生成所有由数据派生的内容：

- `skills/hash-design/SKILL.md` 里位于 `<!-- BEGIN GENERATED: bans (npm run sync) -->` 和 `<!-- END GENERATED: bans -->` 之间的禁令块
- 副本 `.claude/skills/hash-design/SKILL.md` 和 `.cursor/skills/hash-design/SKILL.md`
- `docs/branches.md`

其中任何一个过期，`skill.test.ts` 都会失败。

## 示例即回归测试夹具

`examples/` 下的 4 个示例（面包店、开发者工具、单车修理铺、音乐节）既是文档，也是测试夹具。`examples.test.ts` 找出所有带 `roll.json` 的目录，用 `roll.json` 里记录的 seed 从各自的 `facts.md` 重新掷骰，检查 ref、库指纹和 brief 文件是否仍然一致。它还检查：每个预览的 critique 不低于 90 分且没有 critical/major，任意两个示例不共用分支，Pages 首页和每份 README 都链接到每个示例。因此任何数据改动都必须有意识地重新掷骰并重做预览（见 [CONTRIBUTING.md](../CONTRIBUTING.md)）。预览本身是 Agent 按 Skill 流程交付的产物，不是由代码生成的。`scripts/examples.mjs` 列出所有示例，并负责重掷、批量 critique 和重建对比页。

## 测试与 CI

- **Vitest**，10 个测试文件：`hash`、`mapping`、`branches`、`brief`、`critique`（带好/坏两类 HTML 夹具）、`compare`、`cli`、`skill`（同步检查）、`examples`，以及 `mcp/server`（in-memory transport）。
- **`scripts/smoke.mjs`**：运行构建好的 CLI，并通过真实的 stdio 管道与构建好的 MCP server 通信。
- **CI**（`.github/workflows/ci.yml`），在 Node 20、22 和 24 上依次跑：`npm ci`、build、typecheck（含测试）、ESLint、Prettier 检查、测试、冒烟测试，以及两个包的 `npm pack --dry-run`。
- **Pages**（`.github/workflows/pages.yml`）：`examples/` 有改动时发布到 GitHub Pages。

## 打包

两个包都已经可以发布，但**尚未发布**。`packages/core` 的 `prepack` 会把 `SKILL.md` 和 `LICENSE` 复制进包里，这样从 npm 安装后 `hash-design skill install` 也能用；`packages/mcp` 按版本号依赖 `hash-design`。`tsbuildinfo` 文件不会打进 tarball。
