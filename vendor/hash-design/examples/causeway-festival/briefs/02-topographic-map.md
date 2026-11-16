# #2 地形图 · Topographic map

> The survey office’s topographic sheet: contours tightening ring by ring, grid references ticked along the neat-line, legend boxes, scale bar and imprint lined up in the margin. Water is blue italic, contours ochre, woodland a pale green tint — every colour is a data layer.

| | |
|---|---|
| hash | `ffc2f9c17e02b46cf5b743c8146922b6e19691925ba0fc9b476cda0d9b947212` |
| ref | `ffc2f9c17e02b46cf5b743c8146922b6e19691925ba0fc9b476cda0d9b947212` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | signage |
| references | Ordnance Survey 1:50 000 Landranger and 1:25 000 Explorer sheets; USGS 7.5-minute topographic quadrangles; swisstopo Landeskarte der Schweiz 1:25 000; Eduard Imhof — Cartographic Relief Presentation (1965); 国家测绘局 1:5 万地形图 |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `ff c2` | branch | 0xffc2 = 65474; 65474 mod 40 = 34 | **topographic-map** |
| 2 | `f9` | voice | 0xf9 = 249; 249 mod 14 = 11 | **dictionary-entry** |
| 3 | `c1` | layout | 0xc1 = 193; 193 mod 3 = 1 | **legend-led** |
| 4 | `7e` | type | 0x7e = 126; 126 mod 3 = 0 | **barlow-landeskarte** |
| 5 | `02` | palette | 0x02 = 2; 2 mod 3 = 2 | **cyanotype-field** |
| 6 | `b4` | density | 0xb4 = 180; 180 mod 2 = 0 | **compact** |
| 7 | `6c` | motion | 0x6c = 108; 108 mod 3 = 0 | **contour-plot** |
| 8 | `f5` | motif | 0xf5 = 245; 245 mod 3 = 2 | **scale-bar** |
| 9 | `b7` | anchor | 0xb7 = 183; 183 mod 3 = 0 | **contour-field** |
| 10 | `43` | scale | 0x43 = 67; 67 mod 3 = 1 | **minor-third** |
| 11 | `c8` | surface | 0xc8 = 200; 200 mod 3 = 2 | **woodland-stipple** |
| 12 | `14` | twist | 0x14 = 20; 20 mod 16 = 4 | **accent-rationed** |
| 13–31 | `6922b6e19691…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** Causeway — a music festival on Skerrow Island

Use only these facts. Do not invent numbers, reviews, awards or customers; leave gaps visibly empty.

- Name: Causeway — a one-day music festival on Skerrow Island
- Date: Saturday 19 June 2027
- The island is reached on foot over a 1.2 km tidal causeway
- Causeway open for arrivals 09:40–13:10 and for departures 22:15–01:30 (that day's tide times)
- Nobody crosses outside those windows; the harbour boat is for emergencies only
- Capacity: 900 people
- Tickets: £54 adult, £27 for ages 12–17, free under 12; on sale 1 March 2027
- Two stages: the Boathouse (indoors, 220 people) and the Field (outdoors)
- Field line-up: The Lantern Choir, Mara Quist, Seven Herons, Low Orbit Brass
- Boathouse line-up: Ada Fenwick (solo cello), Tomasz & the Weir, Kelp, Ruth Ono Trio
- The last set ends at 21:45 so everyone reaches the causeway in time
- No single-use plastic on the island: bring a cup, or buy an enamel one for £6
- Food from two island kitchens; cash and card
- Organised by the Skerrow Island Trust, a volunteer charity; profits go to repairing the sea wall
- Fourth year of the festival, first held in 2024
- Wear boots: parts of the causeway are wet sand and seaweed

## 文案语气 Voice — 词条 / Dictionary entry

把主题写成词典词条：词头、注音/词性、编号释义、例句、参见。

Devices: 词头加粗 · 注音或词性 · ① ② 释义 · 例句 / 参见 →

Example register (do not copy, match the register): “第四巷 dì sì xiàng ⟨名⟩ ① 一条只有一家面包店的巷子。”

## 版式 Layout — Legend-led

The legend is the page: content arranged as entries of a large two-column key, with a small locator map inset at the top right.

- **Grid:** 8 col; legend entries in 2 columns, each entry = a 48px symbol cell + text; locator inset 3 col × 3 rows with its own neat-line.
- **Branch grid token:** Map sheet: a neat-line frame inset 48px from the viewport; inside, a grid square every 96px drawn as hairlines with two-digit references at both ends of every line in the margin; content panels snap to whole grid squares.

Section order (top → bottom):

1. Series header band: series name, sheet number, edition
2. Locator inset map with the current area outlined
3. Legend sections (roads & paths / water / vegetation / buildings) relabelled as the facts’ categories
4. Reference table: grid reference for each item, e.g. "SD 284 093" format
5. Margin notes and publication imprint

**First-screen anchor — Contour field:** The first screen is a field of contours with the title set as a feature name along the slope (letter-spaced on an SVG textPath).

## 字体 Typography — Barlow Condensed + Barlow + Azeret Mono

- **Display**: Barlow Condensed 500/600 + italic — fallback `"Arial Narrow", sans-serif`
- **Body**: Barlow 400/500 — fallback `Arial, sans-serif`
- **Mono**: Azeret Mono 400 — fallback `"Courier New", monospace`
- **CJK**: display Noto Sans SC, body Noto Sans SC
- **Setting rules:** Place names in Barlow Condensed: settlements upright 600; area names letter-spaced +0.15em across their feature; water names italic. Spot heights and grid numbers in Azeret Mono 11px tabular. Hierarchy by size and spacing, not colour.

Scale: **Minor third 1.2** on a 15px base → -2: 10.4px · -1: 12.5px · 0: 15px · 1: 18px · 2: 21.6px · 3: 25.9px · 4: 31.1px · 5: 37.3px · 6: 44.8px · 7: 53.7px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,500;0,600;1,500;1,600&family=Barlow:wght@400;500&family=Azeret+Mono&display=swap">
```

## 配色 Colour — Cyanotype field copy

| token | hex | role |
|---|---|---|
| paper | `#16457a` | page background |
| ink | `#f2f5f7` | primary text |
| muted | `#b9cde0` | secondary text |
| accent | `#ffffff` | primary accent |
| accent2 | `#f0c75e` | secondary accent |
| rule | `#5d82ab` | lines, borders |
| panel | `#1d5590` | secondary background |

**Usage:** Prussian-blue blueprint of the field sheet: all line work and text in white/ink; muted for grid labels; yellow survey-crayon accent2 only for the current-location mark and corrections.

Contrast (WCAG):

- ink on paper: **8.85:1** — AAA — any text
- muted on paper: **5.94:1** — AA — body text OK
- ink on panel: **6.96:1** — AA — body text OK
- accent on paper: **9.69:1** — AAA — any text
- accent2 on paper: **6.02:1** — AA — body text OK
- #000000 on accent: **21:1** — AAA — any text
- #000000 on accent2: **13.04:1** — AAA — any text

## 密度 Density — 紧凑 / Compact

信息密集，多栏并行；用细线和对齐建立秩序，首屏就能看到 3 个以上信息块。 Base 15px, line-height 1.45, spacing unit 6px, section gap 64px, max width 1320px.

## 形状与层次 Shape & depth

- **Radius:** 0. Only symbols are round (spot heights, survey points); trig points are triangles.
- **Borders:** Neat-line: 1px ink inner line + 6px ink outer line, 8px apart. Grid lines 1px var(--rule); legend boxes 1px ink; scale bar segments 1px ink outline.
- **Shadow:** none. Relief, if any, is a hillshade tint inside the map field — never a drop shadow on UI.

## 材质 Surface — Woodland stipple

Vegetation areas as a regular stipple of small dots on the panel tint.

```css
background-color: var(--panel); background-image: radial-gradient(color-mix(in srgb, var(--ink) 25%, transparent) 1px, transparent 1.4px); background-size: 10px 8px;
```

## 母题 Motif — Scale bar

Alternating ink/paper segmented bar (0–1–2 km) with "1:25 000" above and small numbers under each division.

## 动效 Motion — Contour plot

Contours draw themselves on first load via stroke-dashoffset, innermost ring first, at constant plotter speed; 40ms stagger per contour.

- duration `900ms`, easing `linear`
- prefers-reduced-motion: Contours drawn complete.

## 变数 Twist — 强调色配给 / Accent rationed

强调色在全页最多出现 3 处；其余一切只用 ink / paper / rule。

## 必须 Must

- A neat-line frame with coordinate ticks and labels on at least two sides.
- A legend explains every symbol and colour used; a scale bar appears on the page.
- Water-related or secondary names are italic; colours are assigned by layer, never decoratively.

## 不要 Must not (branch)

- No satellite imagery, web-map pins or rounded map controls.
- No random squiggles: contours are concentric, non-crossing and evenly stepped.
- No more than four layer colours plus ink.

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
/* hash-design ffc2f9c1 · topographic-map · cyanotype-field */
:root {
  --paper: #16457a;
  --ink: #f2f5f7;
  --muted: #b9cde0;
  --accent: #ffffff;
  --on-accent: #000000;
  --accent2: #f0c75e;
  --on-accent2: #000000;
  --rule: #5d82ab;
  --panel: #1d5590;

  --font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --font-body: Barlow, Arial, sans-serif;
  --font-mono: "Azeret Mono", "Courier New", monospace;

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

  --motion-duration: 900ms;
  --motion-easing: linear;
}

html { font-size: 93.8%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Barlow Condensed / Barlow / Azeret Mono
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Contour field" anchor, in the "Legend-led" layout
- [ ] Copy is written in the "Dictionary entry" voice using only the facts
- [ ] Twist "Accent rationed" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief ffc2f9c17e02b46cf5b743c8146922b6e19691925ba0fc9b476cda0d9b947212`) reports no critical/major findings
