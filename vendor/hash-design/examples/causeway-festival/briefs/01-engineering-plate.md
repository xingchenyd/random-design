# #1 工程图版 · Engineering plate

> The engineering drawing as it leaves the print room: a border frame with zone markers, a title block in the bottom-right corner, dimension lines with arrowheads, a revision table, “Sheet 3 of 12”. Cyanotype, diazo or drafting vellum with single-stroke lettering — everything labelled, numbered and traceable.

| | |
|---|---|
| hash | `c7893950bed02a108955f7a9b57281677dfa09f3093e2a6ba899e9dd96390784` |
| ref | `c7893950bed02a108955f7a9b57281677dfa09f3093e2a6ba899e9dd96390784` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | document |
| references | ISO 5457 / ISO 7200 drawing-sheet frames and title blocks; ISO 3098 lettering and Leroy / Rotring stencil lettering templates; Apollo-era engineering drawings (North American Aviation, Grumman Lunar Module); Cyanotype blueprints and Pellet-process prints, 1870s–1940s; GB/T 14689 图纸幅面与格式 and GB/T 14691 长仿宋体 lettering |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `c7 89` | branch | 0xc789 = 51081; 51081 mod 40 = 1 | **engineering-plate** |
| 2 | `39` | voice | 0x39 = 57; 57 mod 14 = 1 | **field-notes** |
| 3 | `50` | layout | 0x50 = 80; 80 mod 3 = 2 | **exploded-assembly** |
| 4 | `be` | type | 0xbe = 190; 190 mod 3 = 1 | **draftsman-hand** |
| 5 | `d0` | palette | 0xd0 = 208; 208 mod 3 = 1 | **drafting-vellum** |
| 6 | `2a` | density | 0x2a = 42; 42 mod 2 = 0 | **compact** |
| 7 | `10` | motion | 0x10 = 16; 16 mod 3 = 1 | **zone-locate** |
| 8 | `89` | motif | 0x89 = 137; 137 mod 3 = 2 | **revision-clouds** |
| 9 | `55` | anchor | 0x55 = 85; 85 mod 3 = 1 | **general-arrangement** |
| 10 | `f7` | scale | 0xf7 = 247; 247 mod 2 = 1 | **perfect-fourth** |
| 11 | `a9` | surface | 0xa9 = 169; 169 mod 3 = 1 | **vellum** |
| 12 | `b5` | twist | 0xb5 = 181; 181 mod 16 = 5 | **vertical-text** |
| 13–31 | `7281677dfa09…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 田野笔记 / Field notes

观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。

Devices: 日期/时间戳 · 度量单位 · "观察到…"式陈述 · 括号补充

Example register (do not copy, match the register): “06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。”

## 版式 Layout — Exploded assembly

An exploded view: the topic broken into parts floating along centre lines, each part ballooned and listed in a parts list beside it.

- **Grid:** Two zones: 8-column field for the exploded view (parts positioned along a 30° axis), 4-column parts list; 8px grid; 28px balloons.
- **Branch grid token:** Drawing sheet with a 24px border frame; the frame is divided into zones — columns 1–8 across the top and bottom, rows A–F down both sides — mapped to CSS grid tracks; everything inside snaps to an 8px drafting grid.

Section order (top → bottom):

1. Header strip: drawing title in wide caps, DWG NO. right-aligned
2. Exploded view: 4–8 parts (content blocks) spaced along dash-dot centre lines with balloon numbers
3. Parts list table aligned to the balloon numbers
4. One dimension line spanning the whole view carrying the key figure (size, price, date range)
5. Title block with approval signatures

**First-screen anchor — General arrangement:** A large orthographic diagram (front / top / side views) of the subject in simple SVG shapes with dimensions, filling ~70% of the first screen.

## 字体 Typography — Architects Daughter + IBM Plex Sans Condensed

- **Display**: Architects Daughter 400 — fallback `"Segoe Print", cursive`
- **Body**: IBM Plex Sans Condensed 400/600 — fallback `"Arial Narrow", sans-serif`
- **Mono**: IBM Plex Mono 400/500 — fallback `"Courier New", monospace`
- **CJK**: display Noto Serif SC, body Noto Sans SC
- **Setting rules:** Architects Daughter for titles and callouts, UPPERCASE ONLY with 0.08em tracking at 24–48px — the hand lettering of a draughtsman on vellum. IBM Plex Sans Condensed 400/600 for notes and schedules at 15px/1.35. IBM Plex Mono 500 for drawing numbers, part numbers and dimensions; thousands separated by a thin space (“1 200”).

Scale: **Perfect fourth 1.333** on a 15px base → -2: 8.4px · -1: 11.3px · 0: 15px · 1: 20px · 2: 26.7px · 3: 35.5px · 4: 47.4px · 5: 63.1px · 6: 84.2px · 7: 112.2px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=IBM+Plex+Sans+Condensed:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
```

## 配色 Colour — Drafting vellum

| token | hex | role |
|---|---|---|
| paper | `#eef0ea` | page background |
| ink | `#1c2024` | primary text |
| muted | `#4b535a` | secondary text |
| accent | `#b3261e` | primary accent |
| accent2 | `#2e6e8e` | secondary accent |
| rule | `#9aa5ab` | lines, borders |
| panel | `#e1e5de` | secondary background |

**Usage:** Cool translucent vellum ground; graphite-black linework and lettering; red reserved for revision clouds, redlines and “VOID” stamps; steel blue (accent2) for dimension figures; grey rule for the 8px construction grid at low visibility.

Contrast (WCAG):

- ink on paper: **14.27:1** — AAA — any text
- muted on paper: **6.81:1** — AA — body text OK
- ink on panel: **12.85:1** — AAA — any text
- accent on paper: **5.69:1** — AA — body text OK
- accent2 on paper: **4.89:1** — AA — body text OK
- #ffffff on accent: **6.54:1** — AA — body text OK
- #ffffff on accent2: **5.62:1** — AA — body text OK

## 密度 Density — 紧凑 / Compact

信息密集，多栏并行；用细线和对齐建立秩序，首屏就能看到 3 个以上信息块。 Base 15px, line-height 1.45, spacing unit 6px, section gap 64px, max width 1320px.

## 形状与层次 Shape & depth

- **Radius:** 0 everywhere. The only circles are balloon callouts (28px, border-radius 50%) and centre marks.
- **Borders:** Frame: 2px solid ink outer line + 1px zone ticks; object lines 1.5px; dimension and leader lines 1px; hidden lines 1px dashed (6px/3px); centre lines 1px dash-dot (stroke-dasharray 12 3 2 3).
- **Shadow:** none. Depth is shown only by section hatching: 45° 1px lines at a 6px pitch.

## 材质 Surface — Drafting vellum

Translucent, slightly milky vellum with faint eraser smudges.

```css
background-color: var(--paper); background-image: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,.5), transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(0,0,0,.035), transparent 35%);
```

## 母题 Motif — Revision clouds & triangles

A scalloped SVG cloud around whatever changed plus a triangle holding the revision letter, matching a row in the revision table.

## 动效 Motion — Zone locate

Hovering a cross-reference (“SEE C4”) highlights the matching zone markers on the frame and draws a 1px crosshair to that zone.

- duration `120ms`, easing `steps(2, end)`
- prefers-reduced-motion: Highlight the zone markers in accent without the crosshair.

## 变数 Twist — 竖排一处 / Vertical text once

至少一处使用竖排文字（中文 writing-mode: vertical-rl）或旋转 90° 的标签作为结构元素。

## 必须 Must

- A visible drawing frame with zone markers and a title block holding title, drawing number, scale or date, and “SHEET n OF N”.
- All labels uppercase in the ISO lettering sizes; every number carries its unit.
- At least one dimension line or balloon callout carries a real fact from the brief.
- A revision table or revision letter is present and consistent across the page.

## 不要 Must not (branch)

- No rendered 3D isometrics with gradients or glows — line drawing only.
- No sci-fi HUD styling (neon, scanlines, hexagon grids); this is paper.
- No decorative arrows: every arrowhead terminates a dimension or a leader.

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
/* hash-design c7893950 · engineering-plate · drafting-vellum */
:root {
  --paper: #eef0ea;
  --ink: #1c2024;
  --muted: #4b535a;
  --accent: #b3261e;
  --on-accent: #ffffff;
  --accent2: #2e6e8e;
  --on-accent2: #ffffff;
  --rule: #9aa5ab;
  --panel: #e1e5de;

  --font-display: "Architects Daughter", "Segoe Print", cursive;
  --font-body: "IBM Plex Sans Condensed", "Arial Narrow", sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", monospace;

  --step-n2: 0.528rem; /* 8.4px */
  --step-n1: 0.703rem; /* 11.3px */
  --step-0: 0.938rem; /* 15px */
  --step-1: 1.25rem; /* 20px */
  --step-2: 1.666rem; /* 26.7px */
  --step-3: 2.221rem; /* 35.5px */
  --step-4: 2.96rem; /* 47.4px */
  --step-5: 3.946rem; /* 63.1px */
  --step-6: 5.26rem; /* 84.2px */
  --step-7: 7.011rem; /* 112.2px */
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

  --motion-duration: 120ms;
  --motion-easing: steps(2, end);
}

html { font-size: 93.8%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Architects Daughter / IBM Plex Sans Condensed / IBM Plex Mono
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "General arrangement" anchor, in the "Exploded assembly" layout
- [ ] Copy is written in the "Field notes" voice using only the facts
- [ ] Twist "Vertical text once" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief c7893950bed02a108955f7a9b57281677dfa09f3093e2a6ba899e9dd96390784`) reports no critical/major findings
