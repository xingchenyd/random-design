# #5 孟菲斯 · Memphis pop

> The Memphis Group of Sottsass and du Pasquier: squiggles, terrazzo flecks, confetti prints, black-and-white grids, pastels colliding with primaries. Furniture like toys, graphics like a party — deliberate clashes, but every colour field has a crisp outline.

| | |
|---|---|
| hash | `0a75884fd35836645ab3e444b59e9e403c816f24910e4207377f7dc8ef93b8f4` |
| ref | `0a75884fd35836645ab3e444b59e9e403c816f24910e4207377f7dc8ef93b8f4+2` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | modernist |
| references | Ettore Sottsass, Carlton room divider (1981); Nathalie du Pasquier, laminate and textile patterns for Memphis (1981–1987); Peter Shire, Bel Air armchair (1982); Christoph Radl, Memphis catalogues and posters (1981–1988); Ettore Sottsass, “Bacterio” print for Abet Laminati (1978) |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `0a 75` | branch | 0x0a75 = 2677; 2677 mod 40 = 37; collision → +2 = 39 _(primary branch (or its family) already used in this roll; walked forward 2 step(s))_ | **memphis-pop** |
| 2 | `88` | voice | 0x88 = 136; 136 mod 14 = 10 | **interview-qa** |
| 3 | `4f` | layout | 0x4f = 79; 79 mod 3 = 1 | **pattern-patchwork** |
| 4 | `d3` | type | 0xd3 = 211; 211 mod 3 = 1 | **chango-questrial** |
| 5 | `58` | palette | 0x58 = 88; 88 mod 3 = 1 | **laminate-yellow** |
| 6 | `36` | density | 0x36 = 54; 54 mod 2 = 0 | **regular** |
| 7 | `64` | motion | 0x64 = 100; 100 mod 3 = 1 | **pattern-shuffle** |
| 8 | `5a` | motif | 0x5a = 90; 90 mod 3 = 0 | **squiggles** |
| 9 | `b3` | anchor | 0xb3 = 179; 179 mod 3 = 2 | **squiggle-title** |
| 10 | `e4` | scale | 0xe4 = 228; 228 mod 3 = 0 | **perfect-fifth** |
| 11 | `44` | surface | 0x44 = 68; 68 mod 3 = 2 | **grid-laminate** |
| 12 | `b5` | twist | 0xb5 = 181; 181 mod 16 = 5 | **vertical-text** |
| 13–31 | `9e9e403c816f…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 问答访谈 / Interview Q&A

访谈稿：问句短，答句是当事人的原话风格，具体、口语、有细节。

Devices: 问：/答： · 引语 · 具体人名/时间 · 一句停顿或笑声注

Example register (do not copy, match the register): “问：为什么周一休息？答：酵种也要歇一天。”

## 版式 Layout — Pattern patchwork

A collage of rectangular patches, each with a different fill (grid, squiggle, terrazzo, solid), with paper-coloured content panels pinned on top.

- **Grid:** CSS grid 6 × n, 0 gap, patches span 1–3 cells; content panels span 2–4 cells and overlap patch borders by 16px.
- **Branch grid token:** 12 columns, 16px gutter, 32px margins; coloured blocks may be offset by one column or rotated ±3–8°, but text inside a block is always straight and aligned.

Section order (top → bottom):

1. Patchwork hero: 6–8 patterned patches with the title panel overlapping three of them
2. Facts as tilted label panels (rotated ±4°)
3. Schedule/table on a black-and-white grid ground
4. Footer row of patches with contact

**First-screen anchor — Squiggle title:** A huge title with a 12px squiggle underline and two geometric props (disc, triangle) touching the letters.

## 字体 Typography — Chango + Questrial

- **Display**: Chango 400 — fallback `"Arial Black", sans-serif`
- **Body**: Questrial 400 — fallback `Arial, sans-serif`
- **Mono**: —
- **CJK**: display ZCOOL KuaiLe, body Noto Sans SC
- **Setting rules:** Chango (wide, heavy, toy-like) for titles at 40–96px, mixed case, line-height 1.05. Questrial body 16/1.6; captions 13px uppercase tracking 0.1em.

Scale: **Perfect fifth 1.5** on a 17px base → -2: 7.6px · -1: 11.3px · 0: 17px · 1: 25.5px · 2: 38.3px · 3: 57.4px · 4: 86.1px · 5: 129.1px · 6: 193.6px · 7: 290.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chango&family=Questrial&display=swap">
```

## 配色 Colour — Laminate yellow

| token | hex | role |
|---|---|---|
| paper | `#ffd84a` | page background |
| ink | `#141414` | primary text |
| muted | `#4a3d00` | secondary text |
| accent | `#e8412c` | primary accent |
| accent2 | `#1b8a6b` | secondary accent |
| rule | `#141414` | lines, borders |
| panel | `#ffffff` | secondary background |

**Usage:** Bright laminate-yellow ground; red and green blocks; white outlined panels carry all text; black grids and squiggles.

Contrast (WCAG):

- ink on paper: **13.31:1** — AAA — any text
- muted on paper: **7.75:1** — AAA — any text
- ink on panel: **18.42:1** — AAA — any text
- accent on paper: **2.9:1** — decorative only — never for text
- accent2 on paper: **3.1:1** — large text / UI marks only (≥24px or bold ≥19px)
- #000000 on accent: **5.22:1** — AA — body text OK
- #000000 on accent2: **4.89:1** — AA — body text OK

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 for laminate blocks; 50% for discs; half- and quarter-discs via one- or two-corner radii (e.g. border-radius: 0 0 0 100%).
- **Borders:** 3px solid ink outline on every coloured block; patterns meet along 3px ink lines.
- **Shadow:** Hard offsets only: 8px 8px 0 var(--ink) (or a pattern-filled offset block). Never blurred.

## 材质 Surface — Grid laminate

Black grid on paper for one large shape per screen.

```css
background-color: var(--paper); background-image: linear-gradient(var(--ink) 2px, transparent 2px), linear-gradient(90deg, var(--ink) 2px, transparent 2px); background-size: 14px 14px;
```

## 母题 Motif — Squiggles

Thick (6–10px) wavy SVG strokes with round caps in ink or accent, scattered at ±30° across panels; at most 5 per screen.

## 动效 Motion — Pattern shuffle

Hovering a patch cycles its fill through three patterns in hard steps.

- duration `300ms`, easing `steps(3, end)`
- prefers-reduced-motion: The pattern changes once, without stepping.

## 变数 Twist — 竖排一处 / Vertical text once

至少一处使用竖排文字（中文 writing-mode: vertical-rl）或旋转 90° 的标签作为结构元素。

## 必须 Must

- At least three different pattern fills (grid, squiggle, terrazzo/confetti) appear on the page.
- Every coloured block has a visible ink outline or a hard offset — crisp edges.
- At least one pastel and one primary colour collide in the same view.
- Body copy always sits on a solid panel.

## 不要 Must not (branch)

- No gradients and no glows — Memphis is flat laminate.
- No synthwave clichés: neon grids to the horizon, chrome lettering, sunsets.
- No pattern behind body text.
- No blurred shadows; only hard offsets.

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
/* hash-design 0a75884f · memphis-pop · laminate-yellow */
:root {
  --paper: #ffd84a;
  --ink: #141414;
  --muted: #4a3d00;
  --accent: #e8412c;
  --on-accent: #000000;
  --accent2: #1b8a6b;
  --on-accent2: #000000;
  --rule: #141414;
  --panel: #ffffff;

  --font-display: Chango, "Arial Black", sans-serif;
  --font-body: Questrial, Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.472rem; /* 7.6px */
  --step-n1: 0.708rem; /* 11.3px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.594rem; /* 25.5px */
  --step-2: 2.391rem; /* 38.3px */
  --step-3: 3.586rem; /* 57.4px */
  --step-4: 5.379rem; /* 86.1px */
  --step-5: 8.068rem; /* 129.1px */
  --step-6: 12.103rem; /* 193.6px */
  --step-7: 18.154rem; /* 290.5px */
  --leading: 1.55;

  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-7: 56px;
  --space-8: 64px;
  --section-gap: 112px;
  --max-width: 1200px;

  --motion-duration: 300ms;
  --motion-easing: steps(3, end);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Chango / Questrial
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Squiggle title" anchor, in the "Pattern patchwork" layout
- [ ] Copy is written in the "Interview Q&A" voice using only the facts
- [ ] Twist "Vertical text once" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 0a75884fd35836645ab3e444b59e9e403c816f24910e4207377f7dc8ef93b8f4+2`) reports no critical/major findings
