---
name: hash-design
description: Use when building or redesigning any web page, landing page, one-page site, poster-like page or UI mock where the result must have real design character and must NOT look AI-generated (no Inter, purple gradients, centered hero with two buttons, three identical cards). Rolls true-random hashes through the hash-design MCP server, freezes 5 distinct design briefs, renders 5 independent HTML previews plus a side-by-side compare page, waits for the user to pick one, then builds the final page and self-critiques it. Triggers - "做个页面/官网/落地页/一页站", "去 AI 味", "要有设计感", "landing page", "make it not look like AI", "give me design options".
---

# hash-design：用外部随机打破默认审美

LLM 做页面会塌缩到众数审美。这个 Skill 的做法是：**风格不由你选**。先用真随机哈希掷骰，经过固定、可复现的决策树映射成 5 个彼此不同的设计方向（brief），你只负责**忠实执行** brief，把选择权交还给用户。

## 何时使用

- 用户要做/重做一个网页、落地页、一页站、活动页、作品集首页、海报式页面、UI 视觉稿。
- 用户说"要有设计感""别像 AI 做的""给我几个方向"。
- 不适用：纯后端、已有严格设计系统且用户要求遵守的改动（此时只用 `critique_page` 自检即可）。

## 前置条件

- 已连接 MCP server `hash-design`（工具：`roll_designs`、`get_brief`、`list_branches`、`get_branch`、`critique_page`、`build_compare_page`）。
- 没有 MCP 时用 CLI 等价替代：`npx -y hash-design roll …`、`hash-design critique …`、`hash-design compare …`（见文末对照表）。

## 工作流（严格按顺序）

### 0. 收集事实

向用户要（或从仓库/上下文里找）**事实清单**：名称、地址、时间、价格、产品、联系方式、真实卖点。页面上只能出现这些事实。缺的就在页面里留"【待补：…】"，**绝不编造**数字、评价、客户、奖项。

### 1. 掷骰（不要自己挑风格）

调用 `roll_designs`：

```json
{ "subject": "第四巷面包店 一页站", "facts": ["…", "…"], "count": 5, "out_dir": "design/hash-design" }
```

- **不要传 `seed`**。seed 只用于复现示例；真实使用必须用系统随机。
- 用户的硬约束才写进约束：`light_only` / `dark_only` / `reduced_motion` / `brand_colors`（品牌色，最多 2 个）/ `families` / `include_branches` / `exclude_branches`。不要为了"安全"擅自加约束。
- **不要因为不喜欢结果而重掷。** 只有用户要求时才重掷。

### 2. 冻结 brief

`out_dir` 会写出 `roll.json`、`ROLL.md` 和 `briefs/01-<branch>.md … 05-<branch>.md`。从这一刻起 brief 是**冻结的规格**：

- 字体、色值、版式结构、首屏锚点（anchor）、密度、动效、母题、材质、文案语气（voice）、变数（twist）都按 brief 执行。
- 不允许"顺手优化"成你习惯的样子（换成 Inter、加渐变、加圆角阴影卡片、把首屏改成居中双按钮……）。
- 需要复现某个 brief：`get_brief`，传 `ref` 和**同样的约束**。

### 3. 逐个渲染 5 个独立 HTML 预览

对每个 brief **单独**做一个预览，保存为 `design/hash-design/previews/<与 brief 同名>.html`，例如 `previews/01-supermarket-circular.html`。

独立性要求（这是方法能生效的关键）：

- 做第 N 个时，**只看第 N 份 brief**；不要参考前面预览的代码，不要复用 CSS，不要统一组件。能开子 Agent 就每个预览开一个独立子 Agent，只给它那一份 brief + 事实。
- 每个预览是**单文件**：内联 `<style>`，用 brief 里的 Google Fonts `<link>`，粘贴 brief 的 `tokens.css` 并只用这些变量取色；不用 Tailwind CDN、不用 UI 框架、不引入图标库。
- 首屏必须是 brief 的 **anchor**，结构按 **layout.structure** 的顺序；文案按 **voice** 写；**twist** 要看得出来。
- 图片：没有真实素材就不用照片，用排版、色块、自绘 SVG、brief 母题完成视觉。
- 必须响应式（至少 390px 手机宽度可读），`<html lang>`、`<meta viewport>` 齐全，尊重 `prefers-reduced-motion`。
- 文件顶部写注释：`<!-- hash-design #N · <branch-id> · ref <ref> -->`。

### 4. 自检每个预览

对每个预览调用 `critique_page`：

```json
{ "path": "design/hash-design/previews/01-supermarket-circular.html", "roll_path": "design/hash-design/roll.json", "pick": 1 }
```

- 所有 **critical / major** 必须修掉；minor 尽量修，保留的要能说出理由。
- `adherence`（对 brief 的遵守度）应 ≥ 80。低于就是你偏离了 brief，回去对照 brief 改。
- 静态检查抓不到一切：再自己对照 brief 的「交付前自检」清单过一遍。

### 5. 并排对比页，然后停下

调用 `build_compare_page`（`{"roll_path": "design/hash-design/roll.json"}`），得到 `compare.html`：5 个预览缩放后并排，带分支名、配色色块、字体、语气、变数，支持桌面/手机切换和单张放大。

把 compare.html 的路径（能打开就直接打开）交给用户，用一两句话概括每个方向的差异，然后**停下，等用户回复编号**。不要替用户选，不要说"我推荐 #3"，除非用户明确问你意见。

### 6. 按选中的 brief 落地正式页面

- 只读选中的那一份 brief（及其预览）。预览可以作为起点，但正式页面要把**全部事实**组织进去，补齐所有区块、交互和移动端。
- 仍然遵守 brief 的全部 token 和全局禁令；用户要求的修改优先于 brief，但不要借机回到默认审美。
- 用户如果明确要求混搭（"#2 的版式 + #4 的配色"），照做，并在页面注释里写明来源 ref。

### 7. 最终自检并交付

对正式页面调用 `critique_page`（带 `roll_path` + `pick` 或 `brief_ref`），修到没有 critical/major。交付时说明：用了哪个 ref、做了哪些取舍、还有哪些"待补"事实。

## 硬性规则

1. 风格来自骰子，不来自你。你的品味只用于**执行质量**：对齐、节奏、细节、可读性。
2. 一个 brief 一个独立预览；预览之间不共享代码。
3. 只用事实；不编造社会证明。
4. 全局禁令高于一切（见下方，自动生成，与数据同步）。
5. 展示对比页后必须停下等用户选择。

<!-- BEGIN GENERATED: bans (npm run sync) -->
### 全局禁令（14 条，与 hash-design 数据同步）

- **禁用 Inter 及同类默认无衬线** (`generic-sans`, critical)
- **禁用紫蓝渐变** (`purple-blue-gradient`, critical)
- **禁用居中 hero + 双按钮** (`centered-hero-two-buttons`, critical)
- **禁用三张同款卡片** (`identical-cards`, major)
- **禁用玻璃态** (`glassmorphism`, major)
- **禁用 emoji 当图标** (`emoji-icons`, major)
- **禁用空洞营销文案** (`buzzword-copy`, major)
- **禁用"圆角 + 柔和大阴影"一切** (`soft-shadow-rounded`, major)
- **禁止编造事实与社会证明** (`invented-facts`, critical)
- **禁用框架默认色板** (`tailwind-default-palette`, major)
- **禁用"每段都淡入上浮"** (`scroll-fade-everything`, minor)
- **禁用标题上方的胶囊徽标** (`pill-badge-sparkle`, minor)
- **禁用占位内容** (`placeholder-content`, major)
- **禁用 SaaS 模板分节** (`template-sections`, minor)

禁用字体：Inter, Inter Tight, Inter Display, Roboto, Roboto Flex, Open Sans, Lato, Poppins, Montserrat, Nunito, Nunito Sans, Plus Jakarta Sans, Manrope, DM Sans, Outfit, Figtree, Geist, Urbanist, Sora, Lexend, Raleway, Work Sans, Space Grotesk。

分支库：40 个分支（`list_branches` 查看，`get_branch` 看细节）。
<!-- END GENERATED: bans -->

## MCP 工具 ↔ CLI 对照

| MCP 工具 | CLI |
|---|---|
| `roll_designs` | `hash-design roll --subject "…" --facts-file facts.md --out design/hash-design` |
| `get_brief` | `hash-design brief <ref> [约束参数]` |
| `list_branches` | `hash-design branches` |
| `get_branch` | `hash-design branch <id>` |
| `critique_page` | `hash-design critique page.html --roll design/hash-design/roll.json --pick 1` |
| `build_compare_page` | `hash-design compare --roll design/hash-design/roll.json` |

MCP 资源：`hash-design://bans`、`hash-design://workflow`（本文件）、`hash-design://branches`、`hash-design://branch/{id}`；MCP prompt：`hash-design`。

## 目录约定

```
design/hash-design/
  roll.json            # 哈希、约束、事实、每个 brief 的 JSON
  ROLL.md              # 概览表 + refs
  briefs/01-<branch>.md … 05-<branch>.md
  previews/01-<branch>.html … 05-<branch>.html
  compare.html         # 并排对比页
```
