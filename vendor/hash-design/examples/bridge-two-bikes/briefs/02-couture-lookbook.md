# #2 时装画册 · Couture lookbook

> 时装画册与巴黎版 Vogue 的编辑版面：Didone 字体在极大和极小之间来回切换，发丝细线，大片留白，字极少。每一页只有一个主体，按 LOOK 01、02……编号，像走秀出场顺序。

| | |
|---|---|
| hash | `92818df99d3eaeee4ab934e524f41bb56abca6ae73320d8fd48b647aa658fca8` |
| ref | `92818df99d3eaeee4ab934e524f41bb56abca6ae73320d8fd48b647aa658fca8+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | print |
| references | Vogue Paris covers and editorial spreads (1970s–2000s); Alexey Brodovitch — Harper's Bazaar (1934–58); Fabien Baron — Harper's Bazaar redesign (1992); Jil Sander and Maison Martin Margiela lookbooks (1990s); M/M (Paris) — Yohji Yamamoto catalogues |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `92 81` | branch | 0x9281 = 37505; 37505 mod 40 = 25; collision → +1 = 26 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **couture-lookbook** |
| 2 | `8d` | voice | 0x8d = 141; 141 mod 14 = 1 | **field-notes** |
| 3 | `f9` | layout | 0xf9 = 249; 249 mod 3 = 0 | **look-sequence** |
| 4 | `9d` | type | 0x9d = 157; 157 mod 3 = 1 | **italiana-cormorant** |
| 5 | `3e` | palette | 0x3e = 62; 62 mod 3 = 2 | **noir-champagne** |
| 6 | `ae` | density | 0xae = 174; 174 mod 1 = 0 | **airy** |
| 7 | `ee` | motion | 0xee = 238; 238 mod 3 = 1 | **runway-step** |
| 8 | `4a` | motif | 0x4a = 74; 74 mod 3 = 2 | **scale-collision** |
| 9 | `b9` | anchor | 0xb9 = 185; 185 mod 3 = 2 | **giant-initial** |
| 10 | `34` | scale | 0x34 = 52; 52 mod 2 = 0 | **golden** |
| 11 | `e5` | surface | 0xe5 = 229; 229 mod 3 = 1 | **tissue-interleaf** |
| 12 | `24` | twist | 0x24 = 36; 36 mod 16 = 4 | **accent-rationed** |
| 13–31 | `f41bb56abca6…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** 二号桥单车铺

只能使用以下事实。不得编造数字、评价、奖项或客户；缺少的信息留空或写"待补"。

- 店名：二号桥单车铺（Bridge No.2 Cycle Works）
- 地址：河西路二号桥桥洞下东侧，蓝色卷帘门，门口立着一个旧车轮
- 营业：周三至周日 10:00–20:00；周一、周二休息
- 补胎 ¥15；换内胎 ¥35（含内胎）
- 全车保养 ¥180：清洗传动、调变速和刹车、紧固全车螺丝，约 2 小时
- 手工编轮组 ¥260 起，工期 5 天
- 二手车：每辆都换过链条和刹车皮，保修 90 天
- 公路车 Fitting ¥480，约 90 分钟，需预约
- 店主：陈立平，大家叫他老陈，修车 27 年，以前在自行车厂做装配
- 周四夜骑：每周四 19:30 店门口出发，沿江一圈 24 公里，免费，自带车灯
- 门口气泵免费，24 小时可用
- 预约：电话 0571-5555-0222，或到店登记
- 不卖新车，只修车、卖二手车和零件

## 文案语气 Voice — 田野笔记 / Field notes

观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。

Devices: 日期/时间戳 · 度量单位 · "观察到…"式陈述 · 括号补充

Example register (do not copy, match the register): “06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。”

## 版式 Layout — Look sequence

Each section is one "look": a single image or a single block of text placed asymmetrically on an otherwise empty page, with its look number.

- **Grid:** 12 col; each look occupies 4–6 columns, alternating left/right; one look per 100vh on desktop.
- **Branch grid token:** 12 col, 40px gutters, 8vw outer margins, 8px baseline; blocks snap to columns, and whole columns are left empty on purpose.

Section order (top → bottom):

1. Cover: title at ~22vw running past the right margin, season line in 11px caps on its baseline
2. LOOK 01: image on 5 columns at the right, number and a two-line caption bottom-left
3. LOOK 02: text-only — one sentence at 6vw italic, nothing else on the page
4. LOOK 03: two narrow images on 3 columns each separated by a hairline
5. Credits page: tiny two-column list of credits / facts in small caps around a centred vertical hairline

**First-screen anchor — Giant initial:** One initial or numeral at ~70vh in hairline Didone filling the left half; the right half empty except a three-line caption.

## 字体 Typography — Italiana + Cormorant Garamond

- **Display**: Italiana 400 — fallback `Didot, serif`
- **Body**: Cormorant Garamond 300/400 + italic — fallback `Garamond, Georgia, serif`
- **Mono**: —
- **CJK**: display ZCOOL XiaoWei, body Noto Serif SC
- **Setting rules:** Italiana uppercase for titles, tracking 0.12em, 64–180px; look numbers in Italiana at 10vw. Cormorant Garamond 300 italic for standfirsts at 28–36px, 400 roman for body 18px/1.6. Never bold anything.

Scale: **Golden ratio 1.618** on a 18px base → -2: 6.9px · -1: 11.1px · 0: 18px · 1: 29.1px · 2: 47.1px · 3: 76.2px · 4: 123.4px · 5: 199.6px · 6: 323px · 7: 522.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;700&display=swap">
```

## 配色 Colour — Noir & champagne

| token | hex | role |
|---|---|---|
| paper | `#0d0c0b` | page background |
| ink | `#f2eee6` | primary text |
| muted | `#a39d92` | secondary text |
| accent | `#c8a46a` | primary accent |
| accent2 | `#8e1a1f` | secondary accent |
| rule | `#f2eee6` | lines, borders |
| panel | `#1a1816` | secondary background |

**Usage:** Evening-collection black; ivory type; champagne for the masthead and look numbers (~4%); deep red only as a single fill behind one image.

Contrast (WCAG):

- ink on paper: **16.89:1** — AAA — any text
- muted on paper: **7.25:1** — AAA — any text
- ink on panel: **15.3:1** — AAA — any text
- accent on paper: **8.35:1** — AAA — any text
- accent2 on paper: **2.16:1** — decorative only — never for text
- #000000 on accent: **8.97:1** — AAA — any text
- #ffffff on accent2: **9.06:1** — AAA — any text

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0 everywhere.
- **Borders:** Hairlines only: 1px at 40% ink (or 0.5px on 2× screens); no boxes around anything.
- **Shadow:** none.

## 材质 Surface — Tissue interleaf

A tissue sheet over the cover: a paper-coloured layer at 82% opacity (no blur) laid over the first image, its lower edge slightly deckled.

```css
.tissue { background: color-mix(in srgb, var(--paper) 82%, transparent); clip-path: polygon(0 0, 100% 0, 100% 97%, 80% 99%, 55% 97%, 30% 100%, 0 98%); }
```

## 母题 Motif — Scale collision

A 200px+ word sharing a baseline with 11px caps text set directly against it.

## 动效 Motion — Runway step

On hover a look steps forward: image scale 1 → 1.015 while its caption hairline draws from 0 to full width.

- duration `450ms`, easing `cubic-bezier(.16,1,.3,1)`
- prefers-reduced-motion: Only the hairline appears; no scale.

## 变数 Twist — 强调色配给 / Accent rationed

强调色在全页最多出现 3 处；其余一切只用 ink / paper / rule。

## 必须 Must

- The first screen has at least a 15:1 ratio between its largest and smallest type size.
- At least 50% of the first screen is empty paper.
- Every section carries a look or page number.

## 不要 Must not (branch)

- No paragraph longer than 60 words on any one page; no bullet lists.
- No boxes, cards, filled buttons or badges; links are underlined words or numbers.
- No mid-size type between 16 and 64px except one italic standfirst.

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
/* hash-design 92818df9 · couture-lookbook · noir-champagne */
:root {
  --paper: #0d0c0b;
  --ink: #f2eee6;
  --muted: #a39d92;
  --accent: #c8a46a;
  --on-accent: #000000;
  --accent2: #8e1a1f;
  --on-accent2: #ffffff;
  --rule: #f2eee6;
  --panel: #1a1816;

  --font-display: Italiana, "ZCOOL XiaoWei", Didot, serif;
  --font-body: "Cormorant Garamond", "Noto Serif SC", Garamond, Georgia, serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.43rem; /* 6.9px */
  --step-n1: 0.695rem; /* 11.1px */
  --step-0: 1.125rem; /* 18px */
  --step-1: 1.82rem; /* 29.1px */
  --step-2: 2.945rem; /* 47.1px */
  --step-3: 4.765rem; /* 76.2px */
  --step-4: 7.71rem; /* 123.4px */
  --step-5: 12.475rem; /* 199.6px */
  --step-6: 20.185rem; /* 323px */
  --step-7: 32.659rem; /* 522.5px */
  --leading: 1.65;

  --space-1: 10px;
  --space-2: 20px;
  --space-3: 30px;
  --space-4: 40px;
  --space-5: 50px;
  --space-6: 60px;
  --space-7: 70px;
  --space-8: 80px;
  --section-gap: 168px;
  --max-width: 1080px;

  --motion-duration: 450ms;
  --motion-easing: cubic-bezier(.16,1,.3,1);
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Italiana / Cormorant Garamond (+ ZCOOL XiaoWei / Noto Serif SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Giant initial" anchor, in the "Look sequence" layout
- [ ] Copy is written in the "Field notes" voice using only the facts
- [ ] Twist "Accent rationed" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 92818df99d3eaeee4ab934e524f41bb56abca6ae73320d8fd48b647aa658fca8+1`) reports no critical/major findings
