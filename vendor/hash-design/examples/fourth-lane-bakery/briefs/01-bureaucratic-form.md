# #1 公文表格 · Bureaucratic form

> 政府表格与公文：角上的表格编号、一格一格的填写框、小号大写的填表说明、勾选框、印章、复写联和虚线撕角。页面像一份需要逐项填写的正式申请，秩序本身就是权威。

| | |
|---|---|
| hash | `51a76d0076661e6657b185c58f6120d8bf340c21062111c8651c52cf9f3a324b` |
| ref | `51a76d0076661e6657b185c58f6120d8bf340c21062111c8651c52cf9f3a324b` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | document |
| references | IRS Form 1040 and US federal forms printed by the Government Printing Office; British HMSO forms with “For official use only” panels; GB/T 9704-2012 党政机关公文格式（红头文件）; Carbonless triplicate sets on white / canary / pink NCR paper; Terry Gilliam, Brazil (1985) — Form 27B/6 |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `51 a7` | branch | 0x51a7 = 20903; 20903 mod 40 = 23 | **bureaucratic-form** |
| 2 | `6d` | voice | 0x6d = 109; 109 mod 14 = 11 | **dictionary-entry** |
| 3 | `00` | layout | 0x00 = 0; 0 mod 3 = 0 | **numbered-field-form** |
| 4 | `76` | type | 0x76 = 118; 118 mod 3 = 1 | **formular-condensed** |
| 5 | `66` | palette | 0x66 = 102; 102 mod 3 = 0 | **dropout-green** |
| 6 | `1e` | density | 0x1e = 30; 30 mod 3 = 0 | **compact** |
| 7 | `66` | motion | 0x66 = 102; 102 mod 3 = 0 | **rubber-stamp** |
| 8 | `57` | motif | 0x57 = 87; 87 mod 3 = 0 | **numbered-fields** |
| 9 | `b1` | anchor | 0xb1 = 177; 177 mod 3 = 0 | **form-masthead** |
| 10 | `85` | scale | 0x85 = 133; 133 mod 3 = 1 | **minor-third** |
| 11 | `c5` | surface | 0xc5 = 197; 197 mod 3 = 2 | **photocopied-form** |
| 12 | `8f` | twist | 0x8f = 143; 143 mod 16 = 15 | **oversized-rule** |
| 13–31 | `6120d8bf340c…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** 第四巷面包店

只能使用以下事实。不得编造数字、评价、奖项或客户；缺少的信息留空或写"待补"。

- 店名：第四巷面包店（Fourth Lane Bakery）
- 地址：老城区第四巷 17 号，巷口数第二个门，绿色木门
- 营业：周二至周日 7:00–19:00；周一休息
- 每天两炉：7:00 第一炉（乡村面包、可颂），11:00 第二炉（肉桂卷、黑麦面包）
- 卖完即止，当天不留货
- 乡村面包：天然酵种，48 小时低温发酵，整个 ¥38，半个 ¥20
- 黑麦面包：70% 黑麦，750 g，每日限 12 个，¥42
- 可颂：法国发酵黄油，¥16
- 肉桂卷：¥18，只在第二炉
- 酵种养了 9 年，店里叫它“老周”
- 面粉：本地石磨全麦粉 + 法国 T65
- 预订：提前一天 17:00 前，电话 021-5555-0417 或店内登记
- 周六 9:00–11:30 面包课，6 人小班，¥260/人，带走自己烤的面包
- 店主：周岚，前建筑师，2019 年开店
- 店内 6 个座位，手冲咖啡 ¥22

## 文案语气 Voice — 词条 / Dictionary entry

把主题写成词典词条：词头、注音/词性、编号释义、例句、参见。

Devices: 词头加粗 · 注音或词性 · ① ② 释义 · 例句 / 参见 →

Example register (do not copy, match the register): “第四巷 dì sì xiàng ⟨名⟩ ① 一条只有一家面包店的巷子。”

## 版式 Layout — Numbered field form

A single form: header with form number and issuing body, then Parts I–III of boxed fields, each fact typed into a labelled field.

- **Grid:** 12-column cell grid, max 960px; fields span 3, 4, 6 or 12 columns; part bars full width; a 120px shaded right column “For official use only”.
- **Branch grid token:** Form grid: 12 columns, 0 gutter — fields are cells sharing 1px borders (border-collapse); row heights 40px (single-line field) or 80px (multi-line); every field has a numbered label in its top-left corner at 10–11px.

Section order (top → bottom):

1. Header: form number large top-left (e.g. “Form 27-B”), issuing body centred, reference number and year top-right
2. Instruction line in small caps: “READ THE NOTES ON PAGE 2 BEFORE COMPLETING THIS FORM”
3. Part I — Identification: name, address and contact as filled fields
4. Part II — Particulars: checkbox matrix and numbered fields with the real facts typed in
5. Part III — Declaration: signature, date and stamp area, then a perforated receipt stub

**First-screen anchor — Form masthead:** The first screen is the form header: giant form number, issuing body, year box, “Please print in black ink”, and Part I fields starting below.

## 字体 Typography — IBM Plex Sans Condensed + IBM Plex Sans

- **Display**: IBM Plex Sans Condensed 600/700 — fallback `"Arial Narrow", sans-serif`
- **Body**: IBM Plex Sans 400/500 — fallback `Arial, sans-serif`
- **Mono**: IBM Plex Mono 400 — fallback `"Courier New", monospace`
- **CJK**: display Noto Serif SC, body Noto Sans SC
- **Setting rules:** IBM Plex Sans Condensed 700 for titles and part bars at 24–36px; IBM Plex Sans 400 body at 15px/1.4; IBM Plex Mono for reference numbers, ISO dates (2026-11-01) and field values with tabular figures. For red-header notices the CJK issuing body is Noto Serif SC 900 (standing in for 方正小标宋), body text 16px.

Scale: **Minor third 1.2** on a 15px base → -2: 10.4px · -1: 12.5px · 0: 15px · 1: 18px · 2: 21.6px · 3: 25.9px · 4: 31.1px · 5: 37.3px · 6: 44.8px · 7: 53.7px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono&family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap">
```

## 配色 Colour — Dropout-ink green

| token | hex | role |
|---|---|---|
| paper | `#fafcf6` | page background |
| ink | `#121a14` | primary text |
| muted | `#445247` | secondary text |
| accent | `#2d7a4b` | primary accent |
| accent2 | `#b23a2e` | secondary accent |
| rule | `#8fc0a0` | lines, borders |
| panel | `#e6f1e8` | secondary background |

**Usage:** The pre-printed form (labels, boxes, part bars) in dropout green (accent ≈ 20%); filled-in data in ink; red (accent2) only for the serial number and “OFFICIAL USE ONLY” stamps; pale green panel for shaded official-use cells.

Contrast (WCAG):

- ink on paper: **17.17:1** — AAA — any text
- muted on paper: **7.99:1** — AAA — any text
- ink on panel: **15.3:1** — AAA — any text
- accent on paper: **5.08:1** — AA — body text OK
- accent2 on paper: **5.74:1** — AA — body text OK
- #ffffff on accent: **5.25:1** — AA — body text OK
- #ffffff on accent2: **5.94:1** — AA — body text OK

## 密度 Density — 紧凑 / Compact

信息密集，多栏并行；用细线和对齐建立秩序，首屏就能看到 3 个以上信息块。 Base 15px, line-height 1.45, spacing unit 6px, section gap 64px, max width 1320px.

## 形状与层次 Shape & depth

- **Radius:** 0. Checkboxes are 14px squares. Only round seals use border-radius 50%.
- **Borders:** Cells 1px solid var(--accent) in dropout palettes, otherwise var(--ink); part headers as reversed 24px bars; heavy 3px rule under the form title; perforations 1px dashed (4px/3px).
- **Shadow:** none. Carbon copies peek out by a 16px offset with a 1px rule outline — no blur.

## 材质 Surface — Nth-generation photocopy

Grey speckle and slightly thickened rules from repeated copying.

```css
background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.2px); background-size: 5px 5px; filter: contrast(1.05);
```

## 母题 Motif — Numbered field boxes

Every value lives in a bordered box with a tiny numbered label in its top-left corner (“12b  Postal code”).

## 动效 Motion — Rubber stamp

On submit or click a stamp (“RECEIVED 01 NOV 2026”) lands: scale 1.3 → 1 and rotate to −8° while accelerating into the paper, then stops dead with uneven ink (SVG turbulence mask).

- duration `160ms`, easing `cubic-bezier(.55,0,1,.45)`
- prefers-reduced-motion: The stamp appears in place at full size; no scale.

## 变数 Twist — 粗线分区 / Oversized rules

至少一条 8px 以上的粗线（或双线）作为主分区手段，替代空白。

## 必须 Must

- Each fact sits in a labelled, numbered field or a numbered paragraph — no free-floating promotional copy.
- The page carries a form or document number and a date or version.
- Instructions are set smaller than field values, in small caps or uppercase.
- Calls to action are phrased as form steps (“Complete Part III”, “Submit at counter 4”).

## 不要 Must not (branch)

- No friendly onboarding UI: no rounded progress pills, illustrations or mascots.
- No empty-looking fields when the facts supply the value — show the value typed in.
- No real agency names, emblems or seals; the issuing body comes only from the facts.

## 全局禁令 Global bans

- **禁用 Inter 及同类默认无衬线** (generic-sans, critical): 不得使用 Inter / Inter Tight / Inter Display / Roboto / Roboto Flex / Open Sans / Lato / Poppins / Montserrat / Nunito / Nunito Sans / Plus Jakarta Sans / Manrope / DM Sans / Outfit / Figtree / Geist / Urbanist / Sora / Lexend / Raleway / Work Sans / Space Grotesk，也不得只写 system-ui / sans-serif 当作"设计选择"。字体必须来自 brief 指定的字体对。
- **禁用紫蓝渐变** (purple-blue-gradient, critical): 禁止紫/靛/蓝系渐变背景、渐变文字（background-clip:text）、模糊彩色光斑（mesh blob / glow orb）。需要渐变时只能用 brief 调色板内的颜色，且必须有材质理由（如油墨叠印、日晒褪色）。
- **禁用居中 hero + 双按钮** (centered-hero-two-buttons, critical): 禁止"居中大标题 + 一行副标题 + 主按钮/幽灵按钮并排"的首屏。首屏结构必须来自 brief 的 layout 与 anchor。
- **禁用三张同款卡片** (identical-cards, major): 禁止 3/4/6 张结构相同的"图标 + 标题 + 两行说明"卡片排成一行。信息分组要用 brief 指定的版式手段（表格、清单、编号条款、价签、标签……），且各项尺寸/权重应有差异。
- **禁用玻璃态** (glassmorphism, major): 禁止 backdrop-filter 毛玻璃、半透明白卡片叠在彩色背景上。
- **禁用 emoji 当图标** (emoji-icons, major): 禁止用 emoji（✨🚀⚡️🎯 等）充当图标、项目符号或装饰；也不要拿通用图标库（Heroicons/Lucide/Feather）当装饰。需要图形时用 brief 母题自绘 SVG 或纯排版符号。
- **禁用空洞营销文案** (buzzword-copy, major): 禁止 unlock / unleash / seamless / seamlessly / supercharge / elevate / empower / revolutionize / revolutionary / effortless 等英文空话，以及 赋能 / 无缝 / 一站式 / 极致体验 / 颠覆 / 引领未来 / 全方位 / 助力 等中文空话。文案只能由用户提供的事实构成，按 brief 的 voice 写。
- **禁用"圆角 + 柔和大阴影"一切** (soft-shadow-rounded, major): 禁止所有块都是 12–24px 圆角加 0 10px 30px 级别的柔和投影。圆角与阴影只能按 brief tokens 使用（很多分支是 0 圆角、零阴影）。
- **禁止编造事实与社会证明** (invented-facts, critical): 禁止虚构数据条（"10K+ 用户 / 99.9% 可用"）、"Trusted by" logo 墙、带头像的假评价、假奖项。只用 facts 中给出的信息；缺信息就留空位或写明待补。
- **禁用框架默认色板** (tailwind-default-palette, major): 禁止直接用 Tailwind slate/indigo/violet/sky 默认色值（如 #6366f1、#8b5cf6、#0f172a、#3b82f6），禁止"深海军蓝底 + 霓虹强调色"的开发者工具外观（除非 brief 明确如此）。颜色只能来自 brief 调色板。
- **禁用"每段都淡入上浮"** (scroll-fade-everything, minor): 禁止给每个区块都加滚动淡入上浮（AOS / data-aos / IntersectionObserver fade-up）。动效只能按 brief motion 规格，且必须尊重 prefers-reduced-motion。
- **禁用标题上方的胶囊徽标** (pill-badge-sparkle, minor): 禁止在大标题上方放 "New ✨ / Now in beta →" 一类圆角胶囊小标签。
- **禁用占位内容** (placeholder-content, major): 禁止 Lorem ipsum、"Feature One"、通用图库人物照、随机 Unsplash 图。没有真实图片时，用排版、色块、自绘 SVG 或 brief 母题代替。
- **禁用 SaaS 模板分节** (template-sections, minor): 禁止 Hero → Features → Testimonials → Pricing → FAQ → CTA 的固定套路。分节顺序来自 brief layout 的 structure，内容按事实组织。

## tokens.css

```css
/* hash-design 51a76d00 · bureaucratic-form · dropout-green */
:root {
  --paper: #fafcf6;
  --ink: #121a14;
  --muted: #445247;
  --accent: #2d7a4b;
  --on-accent: #ffffff;
  --accent2: #b23a2e;
  --on-accent2: #ffffff;
  --rule: #8fc0a0;
  --panel: #e6f1e8;

  --font-display: "IBM Plex Sans Condensed", "Noto Serif SC", "Arial Narrow", sans-serif;
  --font-body: "IBM Plex Sans", "Noto Sans SC", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", monospace;

  --step-n2: 0.651rem; /* 10.4px */
  --step-n1: 0.781rem; /* 12.5px */
  --step-0: 0.938rem; /* 15px */
  --step-1: 1.125rem; /* 18px */
  --step-2: 1.35rem; /* 21.6px */
  --step-3: 1.62rem; /* 25.9px */
  --step-4: 1.944rem; /* 31.1px */
  --step-5: 2.333rem; /* 37.3px */
  --step-6: 2.799rem; /* 44.8px */
  --step-7: 3.359rem; /* 53.7px */
  --leading: 1.45;

  --space-1: 6px;
  --space-2: 12px;
  --space-3: 18px;
  --space-4: 24px;
  --space-5: 30px;
  --space-6: 36px;
  --space-7: 42px;
  --space-8: 48px;
  --section-gap: 64px;
  --max-width: 1320px;

  --motion-duration: 160ms;
  --motion-easing: cubic-bezier(.55,0,1,.45);
}

html { font-size: 93.8%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: IBM Plex Sans Condensed / IBM Plex Sans / IBM Plex Mono (+ Noto Serif SC / Noto Sans SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Form masthead" anchor, in the "Numbered field form" layout
- [ ] Copy is written in the "Dictionary entry" voice using only the facts
- [ ] Twist "Oversized rules" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 51a76d0076661e6657b185c58f6120d8bf340c21062111c8651c52cf9f3a324b`) reports no critical/major findings
