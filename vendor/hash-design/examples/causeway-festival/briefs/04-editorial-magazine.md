# #4 杂志编辑 · Editorial magazine

> The long-form magazine feature: a big drop cap, a deck under the headline, a byline, multi-column body text, a pull quote breaking the columns and folios at the foot. Rhythm comes from column measure, hairline column rules and dramatic headline scale — a printed magazine spread, not a whitespace-heavy lifestyle site.

| | |
|---|---|
| hash | `90fa12c08e8706c9a86c6a123a6420d8f83eb3093909e8b5e332a8ddc16583ad` |
| ref | `90fa12c08e8706c9a86c6a123a6420d8f83eb3093909e8b5e332a8ddc16583ad+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | print |
| references | The New Yorker feature pages (Rea Irvin display, Caslon body); Harper’s Bazaar under Alexey Brodovitch (1934–58); Esquire under Harold Hayes and George Lois (1960s); The New York Times Magazine redesign by Matt Willey (2015); London Review of Books |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `90 fa` | branch | 0x90fa = 37114; 37114 mod 40 = 34; collision → +1 = 35 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **editorial-magazine** |
| 2 | `12` | voice | 0x12 = 18; 18 mod 14 = 4 | **museum-label** |
| 3 | `c0` | layout | 0xc0 = 192; 192 mod 3 = 0 | **opening-spread** |
| 4 | `8e` | type | 0x8e = 142; 142 mod 3 = 1 | **bodoni-fashion** |
| 5 | `87` | palette | 0x87 = 135; 135 mod 3 = 0 | **weekly-white** |
| 6 | `06` | density | 0x06 = 6; 6 mod 2 = 0 | **regular** |
| 7 | `c9` | motion | 0xc9 = 201; 201 mod 3 = 0 | **page-turn** |
| 8 | `a8` | motif | 0xa8 = 168; 168 mod 3 = 0 | **drop-cap** |
| 9 | `6c` | anchor | 0x6c = 108; 108 mod 3 = 0 | **giant-headline** |
| 10 | `6a` | scale | 0x6a = 106; 106 mod 3 = 1 | **golden** |
| 11 | `12` | surface | 0x12 = 18; 18 mod 3 = 0 | **coated-magazine** |
| 12 | `3a` | twist | 0x3a = 58; 58 mod 16 = 10 | **zero-shadow** |
| 13–31 | `6420d8f83eb3…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 展签 / Museum label

博物馆藏品标签：名称、年代、材质、尺寸，最后一句冷静的注解。

Devices: 名称 / 年代 / 材质 三行 · 馆藏编号 · 一句注解 · 尺寸

Example register (do not copy, match the register): “乡村面包，2026。小麦、水、盐、九年酵种。直径 22 cm。”

## 版式 Layout — Opening spread

A two-page opener: left page a full-height image or a giant typographic headline, right page deck, byline and the first columns with a drop cap.

- **Grid:** 6 + 6 columns at ≥ 1024px; left half headline or image at 100vh; right half: deck across 4 columns, body in 2 columns × 3; folio row at the foot of both halves.
- **Branch grid token:** 12 columns, 18px gutter, max 1240px; body in 3 columns of 4 grid columns (≈ 22em) on desktop, 2 on tablet, 1 on mobile (column-count with column-rule); 24px baseline; opening spreads split 6 + 6.

Section order (top → bottom):

1. Rubric (section name) top-left in small caps, folio number
2. Left page: headline at 8–12vw or full-bleed image with a credit line
3. Right page: deck/standfirst in italic, byline “By … · Photographs by …”
4. Body starts with a 4-line drop cap and runs in 2–3 columns
5. Pull quote spanning 2 columns mid-body; end mark ■ or “Continued on p. 74”

**First-screen anchor — Giant headline:** The first screen is the headline at 10–14vw over 2–3 lines with deck and byline beneath; no image.

## 字体 Typography — Bodoni Moda + Libre Baskerville

- **Display**: Bodoni Moda 400/700 + italic — fallback `Didot, "Bodoni 72", serif`
- **Body**: Libre Baskerville 400/700 + italic — fallback `Baskerville, Georgia, serif`
- **Mono**: —
- **CJK**: display ZCOOL XiaoWei, body Noto Serif SC
- **Setting rules:** Bodoni Moda 400 italic and 700 roman mixed inside one headline at 72–160px (optical sizing on so hairlines stay sharp), leading 0.92; deck Bodoni Moda 400 at 24px. Body Libre Baskerville 400 at 16px/26px, ragged-right. Bylines uppercase 11px with 0.2em tracking in Libre Baskerville 700. 6-line drop cap in Bodoni Moda 700.

Scale: **Golden ratio 1.618** on a 17px base → -2: 6.5px · -1: 10.5px · 0: 17px · 1: 27.5px · 2: 44.5px · 3: 72px · 4: 116.5px · 5: 188.5px · 6: 305px · 7: 493.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400;1,700&display=swap">
```

## 配色 Colour — Weekly white

| token | hex | role |
|---|---|---|
| paper | `#fdfcf8` | page background |
| ink | `#111111` | primary text |
| muted | `#505050` | secondary text |
| accent | `#a6192e` | primary accent |
| accent2 | `#1d3f6e` | secondary accent |
| rule | `#1a1a1a` | lines, borders |
| panel | `#f1eee6` | secondary background |

**Usage:** Black on white for ≥ 95% of the page; red (accent) only for the rubric, the drop cap and the end mark ■; navy (accent2) for links and illustration line work; panel for sidebars.

Contrast (WCAG):

- ink on paper: **18.39:1** — AAA — any text
- muted on paper: **7.85:1** — AAA — any text
- ink on panel: **16.29:1** — AAA — any text
- accent on paper: **7.31:1** — AAA — any text
- accent2 on paper: **10.29:1** — AAA — any text
- #ffffff on accent: **7.5:1** — AAA — any text
- #ffffff on accent2: **10.56:1** — AAA — any text

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0.
- **Borders:** Column rules 1px var(--rule) (column-rule); folio rule 1px full width; pull quotes with a 3px accent rule above and 1px rule below; section breaks as a centred ornament (❧) or a 3em rule.
- **Shadow:** none.

## 材质 Surface — Coated magazine stock

Bright smooth paper with no texture; image areas at full saturation.

## 母题 Motif — Drop cap

A 3–6 line drop cap in the display face opening the feature and each major section, aligned to the baseline grid.

## 动效 Motion — Page turn

Moving between spreads turns the page: the outgoing page rotates −180° around the spine (rotateY, perspective 1600px) while the next spread is revealed beneath.

- duration `600ms`, easing `cubic-bezier(.45,.05,.2,1)`
- prefers-reduced-motion: Cut directly to the next spread.

## 变数 Twist — 零阴影 / Zero shadows

全页没有任何 box-shadow / drop-shadow；层级只靠边框、色块和留白。

## 必须 Must

- Body text runs in multiple columns on desktop at a 45–75 character measure.
- The feature opens with headline, deck and byline, and the body starts with a drop cap.
- At least one pull quote taken verbatim from the provided facts or body text.
- Folios or a running footer with issue and section information.

## 不要 Must not (branch)

- No Kinfolk-style minimal lifestyle layout: no expanses of beige whitespace around one centred paragraph.
- No card grids of article teasers with rounded thumbnails.
- No real magazine mastheads (The New Yorker, Vogue…) used as branding.

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
/* hash-design 90fa12c0 · editorial-magazine · weekly-white */
:root {
  --paper: #fdfcf8;
  --ink: #111111;
  --muted: #505050;
  --accent: #a6192e;
  --on-accent: #ffffff;
  --accent2: #1d3f6e;
  --on-accent2: #ffffff;
  --rule: #1a1a1a;
  --panel: #f1eee6;

  --font-display: "Bodoni Moda", Didot, "Bodoni 72", serif;
  --font-body: "Libre Baskerville", Baskerville, Georgia, serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.406rem; /* 6.5px */
  --step-n1: 0.657rem; /* 10.5px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.719rem; /* 27.5px */
  --step-2: 2.782rem; /* 44.5px */
  --step-3: 4.501rem; /* 72px */
  --step-4: 7.282rem; /* 116.5px */
  --step-5: 11.782rem; /* 188.5px */
  --step-6: 19.063rem; /* 305px */
  --step-7: 30.845rem; /* 493.5px */
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

  --motion-duration: 600ms;
  --motion-easing: cubic-bezier(.45,.05,.2,1);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Bodoni Moda / Libre Baskerville
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Giant headline" anchor, in the "Opening spread" layout
- [ ] Copy is written in the "Museum label" voice using only the facts
- [ ] Twist "Zero shadows" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 90fa12c08e8706c9a86c6a123a6420d8f83eb3093909e8b5e332a8ddc16583ad+1`) reports no critical/major findings
