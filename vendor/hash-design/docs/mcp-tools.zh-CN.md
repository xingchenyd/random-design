# MCP server 参考

[English](mcp-tools.md) · [返回 README](../README.zh-CN.md)

`hash-design-mcp` 是一个基于官方 TypeScript SDK 的 stdio [Model Context Protocol](https://modelcontextprotocol.io) server。源码：[`packages/mcp/src/server.ts`](../packages/mcp/src/server.ts)。它提供 6 个工具、4 个资源和 1 个 prompt，并向客户端发送概括工作流程的 server instructions。

> 尚未发布到 npm。请从源码运行：`node /ABS/PATH/hash-design/packages/mcp/dist/bin.js`（见[手动安装](../README.zh-CN.md#手动安装)）。

## 工作目录与文件访问

server 在本地以你的用户权限运行，不发起任何网络请求。相对路径（`out_dir`、`path`、`roll_path`、`out_path`）按 **server 的工作目录**解析，也就是客户端启动它时所在的目录。Claude Code 和 Cursor 通常在项目目录里启动它；Claude Desktop 不会，所以在 Claude Desktop 里请传绝对路径。

会读写文件系统的工具：

| 工具                 | 读取                  | 写入                                                               |
| -------------------- | --------------------- | ------------------------------------------------------------------ |
| `roll_designs`       | —                     | `out_dir` 下的 `roll.json`、`ROLL.md`、`briefs/*.md`（仅在传入时） |
| `critique_page`      | `path`, `roll_path`   | —                                                                  |
| `build_compare_page` | `roll_path`、预览列表 | `compare.html`（或 `out_path`）                                    |

## 共用的约束参数

`roll_designs`、`get_brief` 和 `critique_page` 接受同样的扁平约束字段，详见 [mapping.zh-CN.md §5](mapping.zh-CN.md#5-约束)。

| 参数               | 类型                             | 含义                                                      |
| ------------------ | -------------------------------- | --------------------------------------------------------- |
| `light_only`       | boolean                          | 只用浅色调色板                                            |
| `dark_only`        | boolean                          | 只用深色调色板（没有深色调色板的分支会被跳过）            |
| `reduced_motion`   | boolean                          | 强制每个分支使用最静止的动效选项                          |
| `brand_colors`     | string[] (≤ 2, `#rgb`/`#rrggbb`) | `[accent]` 或 `[accent, accent2]`                         |
| `families`         | enum[]                           | `print` `document` `signage` `screen` `craft` `modernist` |
| `include_branches` | string[]                         | 把池子限制为这些分支 id                                   |
| `exclude_branches` | string[]                         | 从池中移除这些分支 id                                     |

## 工具

### `roll_designs`

掷 N 个真随机哈希，并把每个哈希映射到一个互不相同的设计方向。非只读、非幂等（每次不带 `seed` 的调用都是一次新的掷骰）。

| 参数       | 类型                | 默认值                                     | 说明                                                          |
| ---------- | ------------------- | ------------------------------------------ | ------------------------------------------------------------- |
| `subject`  | string，必填        | —                                          | 页面是做什么的                                                |
| `facts`    | string[]            | `[]`                                       | 页面唯一可以陈述的事实                                        |
| `count`    | integer 1–12        | 5                                          |                                                               |
| `seed`     | string              | —                                          | 可复现的掷骰，仅用于示例/测试                                 |
| `language` | `zh` \| `en`        | 根据 subject 和 facts 自动判断             | brief 的语言                                                  |
| `out_dir`  | string              | —                                          | 把 `roll.json`、`ROLL.md`、`briefs/NN-<branch>.md` 冻结到这里 |
| `detail`   | `full` \| `summary` | 有 `out_dir` 时为 `summary`，否则为 `full` | 是否把每份 brief 都内联在返回结果里                           |
| 约束       | 见上文              |                                            |                                                               |

返回两个文本块：（1）Markdown（汇总表、ref、写入的文件、`detail = full` 时的 brief，以及下一步）；（2）一个 JSON 对象 `{ source, library, constraints, designs: [{ number, ref, branch }] }`，供程序使用。

CLI：`hash-design roll --subject … --fact … --facts-file … --count … --seed … --out … --format md|json|summary`。CLI 没有 `--language` 参数，始终自动判断。

### `get_brief`

为一个 ref 重建 brief。只读且幂等：同样的 ref + 约束 + 库，永远得到同一份 brief。

| 参数       | 类型                 | 说明                                |
| ---------- | -------------------- | ----------------------------------- |
| `ref`      | string，必填         | `<64-hex hash>` 或 `<hash>+<probe>` |
| `subject`  | string               | 放回 brief 的内容部分               |
| `facts`    | string[]             |                                     |
| `language` | `zh` \| `en`         |                                     |
| `format`   | `markdown` \| `json` | 默认 `markdown`                     |
| 约束       | 见上文               | 必须与掷骰时的约束一致              |

CLI：`hash-design brief <ref> [constraints] [--subject …] [--fact …] [--format md|json]`。

### `list_branches`

按映射顺序列出分支。参数：`family`（可选 enum）。CLI：`hash-design branches [--family …] [--json]`。

### `get_branch`

一个分支的完整详情：概念说明、参考、token，以及每个维度的每个选项。参数：`id`（必填）、`format`（`markdown` | `json`）。CLI：`hash-design branch <id> [--json]`。

### `critique_page`

对 HTML 页面做静态评审：对照 14 条全局禁令，外加对比度、`viewport`、`lang`、`img alt` 和 reduced-motion 检查。提供 brief 时还会给遵守度打分（字体、配色、圆角 / 阴影策略）。只读。

| 参数        | 类型                 | 说明                                                                          |
| ----------- | -------------------- | ----------------------------------------------------------------------------- |
| `html`      | string               | 完整 HTML 源码（提供 `html` 或 `path`）                                       |
| `path`      | string               | HTML 文件，相对于 server 的 cwd                                               |
| `css`       | string               | 没有内联在 HTML 里的额外 CSS                                                  |
| `brief_ref` | string               | 用来检查遵守度的 ref（加上同样的约束）                                        |
| `roll_path` | string               | `roll_designs` 产出的 `roll.json`（可替代 `brief_ref`）                       |
| `pick`      | integer ≥ 1          | `roll_path` 里的设计编号                                                      |
| `facts`     | string[]             | 页面上出现但不在事实里的数字会被标记；使用 `roll_path` 时默认取该次掷骰的事实 |
| `format`    | `markdown` \| `json` |                                                                               |
| 约束        | 见上文               | 与 `brief_ref` 一起使用                                                       |

评分：从 100 分起扣，每个 critical 问题扣 25 分，每个 major 扣 10 分，每个 minor 扣 4 分。等级：A ≥ 90，B ≥ 75，C ≥ 60，D ≥ 40，再低为 F。遵守度是单独的 0–100 分，只在提供了 brief 时才有。

CLI：`hash-design critique <page.html> [--css <file>] [--brief <ref> | --roll <roll.json> --pick <n>] [--facts-file <path>] [--json] [--fail-under <score>]`。使用 `--fail-under` 时，分数低于阈值 CLI 就以退出码 1 退出，因此可以用在 CI 里。

### `build_compare_page`

写出 `compare.html`：把每个预览放进缩放的 iframe 里并排展示，带分支 / 配色 / 字体标签、桌面 / 手机切换和聚焦模式（按键 1–9）。预览应位于 `<previews_dir>/NN-<branch>.html`，缺失的会被列出来。页面上的标签、按钮和操作说明跟随这次 roll 的语言（`roll.json` 里的 `content.language`，中文或英文）。

| 参数           | 类型         | 默认值                            |
| -------------- | ------------ | --------------------------------- |
| `roll_path`    | string，必填 | —                                 |
| `out_path`     | string       | `roll.json` 旁边的 `compare.html` |
| `previews_dir` | string       | `previews`（相对于 `roll.json`）  |
| `briefs_dir`   | string       | `briefs`（相对于 `roll.json`）    |
| `title`        | string       | 该次掷骰的 subject                |

CLI：`hash-design compare [--roll <roll.json>] [--out <compare.html>] [--previews <dir>] [--briefs <dir>] [--title <t>]`。

## 资源

| URI                         | 内容                                        |
| --------------------------- | ------------------------------------------- |
| `hash-design://bans`        | 14 条全局禁令，含 id 和严重程度（Markdown） |
| `hash-design://workflow`    | 完整的 Skill（`SKILL.md`）                  |
| `hash-design://branches`    | 按映射顺序列出的全部分支                    |
| `hash-design://branch/{id}` | 单个分支的详情（可列举的资源模板）          |

## Prompt

`hash-design`，参数为 `subject`（必填）、`facts`（每行一条）和 `count`。它会展开成一条用户消息，带 Agent 依次完成：用 `out_dir="design/hash-design"`、不带 seed 调用 `roll_designs` → 每份 brief 做一个预览 → 用 `roll_path` + `pick` 调用 `critique_page` → `build_compare_page` → 停下来等用户回复编号 → 按选中的 brief 做正式页面，并再评审一次。

## 一次掷骰写出的文件

```
design/hash-design/
  roll.json            # algorithm、library、createdAt、source、constraints、content、designs[]（完整 brief JSON）
  ROLL.md              # 汇总表 + 完整 ref
  briefs/01-<branch>.md
  …
  previews/01-<branch>.html   # 由 Agent 写出，每份 brief 一个
  compare.html                # 由 build_compare_page 写出
```

## 客户端配置

Claude Code、Cursor 和 Claude Desktop 的配置见 README 中的[手动安装](../README.zh-CN.md#手动安装)。包发布到 npm 之后，命令会变成 `npx -y hash-design-mcp`。

## 测试

`packages/mcp/test/server.test.ts` 通过 SDK 的 in-memory transport 驱动 server，其中有一个测试检查用示例 seed 调用 `roll_designs` 能完全复现 CLI 的示例掷骰。`scripts/smoke.mjs` 在 CI 中通过真实的 stdio 启动构建好的 server。
