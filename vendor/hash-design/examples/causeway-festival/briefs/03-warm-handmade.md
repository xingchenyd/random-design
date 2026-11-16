# #3 手作温度 · Warm handmade

> The warmth of a corner shop that makes things by hand: kraft paper, rubber stamps, handwritten labels, twine, linocut vignettes and slightly crooked hand-drawn borders. The imperfection is evidence — someone really made each thing and wrote each label.

| | |
|---|---|
| hash | `ee7a4e447e6e69a008ec2e7dd9ce52e7dcffc7a789f6794848f1de5ccb2d2219` |
| ref | `ee7a4e447e6e69a008ec2e7dd9ce52e7dcffc7a789f6794848f1de5ccb2d2219+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | craft |
| references | Edward Bawden linocuts and shop posters (1950s–1980s); Whole Earth Catalog hand-pasted layouts (1968–1972); Hand-written POP price cards in Japanese 雑貨 shops; Kraft-paper bakery bags with rubber-stamped logos; Farmers’ market chalkboards |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `ee 7a` | branch | 0xee7a = 61050; 61050 mod 40 = 10; collision → +1 = 11 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **warm-handmade** |
| 2 | `4e` | voice | 0x4e = 78; 78 mod 14 = 8 | **almanac** |
| 3 | `44` | layout | 0x44 = 68; 68 mod 3 = 2 | **kraft-bag** |
| 4 | `7e` | type | 0x7e = 126; 126 mod 3 = 0 | **caveat-alegreya-sans** |
| 5 | `6e` | palette | 0x6e = 110; 110 mod 3 = 2 | **chalkboard** |
| 6 | `69` | density | 0x69 = 105; 105 mod 2 = 1 | **airy** |
| 7 | `a0` | motion | 0xa0 = 160; 160 mod 3 = 1 | **tag-swing** |
| 8 | `08` | motif | 0x08 = 8; 8 mod 3 = 2 | **linocut-vignettes** |
| 9 | `ec` | anchor | 0xec = 236; 236 mod 3 = 2 | **big-stamp** |
| 10 | `2e` | scale | 0x2e = 46; 46 mod 2 = 0 | **major-third** |
| 11 | `7d` | surface | 0x7d = 125; 125 mod 3 = 2 | **chalk-dust** |
| 12 | `d9` | twist | 0xd9 = 217; 217 mod 16 = 9 | **giant-glyph** |
| 13–31 | `ce52e7dcffc7…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 历书 / Almanac

黄历/年鉴口吻：宜忌、节令、方位，短句并列，带一点古意但信息准确。

Devices: 宜 / 忌 并列 · 节气或日期 · 四字短语 · 方位与时辰

Example register (do not copy, match the register): “宜：早起、趁热。忌：周一来访。”

## 版式 Layout — Kraft bag

The page is a kraft bag: a big rubber-stamp logo on the front, a paper label band wrapped around, the back panel printed with details.

- **Grid:** 8 col; stamp 4 col wide in the first screen; label band full width rotated -2°; back panel in 2 columns of 4, 24px gutter.
- **Branch grid token:** Loose 6-column grid, 24px gutter, 32px margins; at most one element in three sits ±1–2° off-axis or ±4px off-grid; 8px baseline for body only.

Section order (top → bottom):

1. Front: stamp logo + a handwritten note on a small label
2. Label band: one-line statement across the width
3. Back panel: materials/ingredients list + care or usage notes
4. Seal sticker: contact info inside a round sticker
5. Footer with a stitched (dashed) bottom edge

**First-screen anchor — Big stamp:** One large circular rubber stamp (40vw) with the name around the ring and a linocut vignette in the centre.

## 字体 Typography — Caveat + Alegreya Sans

- **Display**: Caveat 500/700 — fallback `"Bradley Hand", "Segoe Print", cursive`
- **Body**: Alegreya Sans 400/500/700 — fallback `"Gill Sans", Calibri, sans-serif`
- **Mono**: —
- **CJK**: display Long Cang, body Noto Sans SC
- **Setting rules:** Caveat for handwritten labels, prices and titles at 28–72px; rotate whole labels -2° to +2°, never individual letters; never for paragraphs. Alegreya Sans body 17/1.6. Prices in Caveat 700 with a smaller currency sign.

Scale: **Major third 1.25** on a 18px base → -2: 11.5px · -1: 14.4px · 0: 18px · 1: 22.5px · 2: 28.1px · 3: 35.2px · 4: 43.9px · 5: 54.9px · 6: 68.7px · 7: 85.8px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Alegreya+Sans:wght@400;500;700&display=swap">
```

## 配色 Colour — Chalkboard

| token | hex | role |
|---|---|---|
| paper | `#2e3430` | page background |
| ink | `#f1ede2` | primary text |
| muted | `#b9b9ae` | secondary text |
| accent | `#f2c14e` | primary accent |
| accent2 | `#e98a7d` | secondary accent |
| rule | `#c8c6bb` | lines, borders |
| panel | `#3a413c` | secondary background |

**Usage:** Green-black board; chalk-white handwriting and body; yellow chalk for prices, pink chalk for one highlight per section; panels a step lighter like a cleaner patch of board.

Contrast (WCAG):

- ink on paper: **10.88:1** — AAA — any text
- muted on paper: **6.43:1** — AA — body text OK
- ink on panel: **8.97:1** — AAA — any text
- accent on paper: **7.58:1** — AAA — any text
- accent2 on paper: **5.09:1** — AA — body text OK
- #000000 on accent: **12.51:1** — AAA — any text
- #000000 on accent2: **8.4:1** — AAA — any text

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0–3px on paper tags; tag corners cut with clip-path; hand-drawn borders are SVG paths, not border-radius.
- **Borders:** Hand-drawn: SVG strokes 1.5–2.5px with slight wobble (feTurbulence + feDisplacementMap, scale 2–3); 2px dashed "stitch" lines for sewn edges.
- **Shadow:** Paper only: 1px 2px 0 rgba(60,40,20,.25) under taped or pinned labels; no blurred shadows.

## 材质 Surface — Chalk dust

A board with faint smudged eraser marks.

```css
background-image: radial-gradient(ellipse at 30% 40%, rgba(255,255,255,.05), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,.04), transparent 55%);
```

## 母题 Motif — Linocut vignettes

Small one-colour SVG illustrations with gouged-line texture (solid shapes, white carving lines), depicting the actual products (bread, cup, leaf, needle).

## 动效 Motion — Tag swing

Hovering a hanging tag swings it from its hole: 0° → 4° → -2° → 0°.

- duration `600ms`, easing `cubic-bezier(.36,.07,.19,.97)`
- prefers-reduced-motion: No swing; the tag text gets a hand-drawn underline.

## 变数 Twist — 巨字 / Giant glyph

一个巨大的单字、单字母或单数字作为首屏视觉锚点（占视口高度 40% 以上）。

## 必须 Must

- At least one genuinely hand-made element: hand-lettered display, a stamp with uneven ink, or a wobbly hand-drawn border.
- Prices, hours and items are written as labels or tags, not as a generic table.
- Illustrations, if any, are one-colour linocut-style and depict real items from the facts.

## 不要 Must not (branch)

- No farmhouse clip-art clichés: "Live Laugh Love" script, mason-jar icons, wood-plank photo backgrounds.
- No handwriting face for body paragraphs — labels and titles only.
- No glossy gradients, no perfect geometric icon sets.
- Do not tilt everything: at most one element in three is off-axis.

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
/* hash-design ee7a4e44 · warm-handmade · chalkboard */
:root {
  --paper: #2e3430;
  --ink: #f1ede2;
  --muted: #b9b9ae;
  --accent: #f2c14e;
  --on-accent: #000000;
  --accent2: #e98a7d;
  --on-accent2: #000000;
  --rule: #c8c6bb;
  --panel: #3a413c;

  --font-display: Caveat, "Bradley Hand", "Segoe Print", cursive;
  --font-body: "Alegreya Sans", "Gill Sans", Calibri, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.72rem; /* 11.5px */
  --step-n1: 0.9rem; /* 14.4px */
  --step-0: 1.125rem; /* 18px */
  --step-1: 1.406rem; /* 22.5px */
  --step-2: 1.758rem; /* 28.1px */
  --step-3: 2.197rem; /* 35.2px */
  --step-4: 2.747rem; /* 43.9px */
  --step-5: 3.433rem; /* 54.9px */
  --step-6: 4.292rem; /* 68.7px */
  --step-7: 5.364rem; /* 85.8px */
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

  --motion-duration: 600ms;
  --motion-easing: cubic-bezier(.36,.07,.19,.97);
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Caveat / Alegreya Sans
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Big stamp" anchor, in the "Kraft bag" layout
- [ ] Copy is written in the "Almanac" voice using only the facts
- [ ] Twist "Giant glyph" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief ee7a4e447e6e69a008ec2e7dd9ce52e7dcffc7a789f6794848f1de5ccb2d2219+1`) reports no critical/major findings
