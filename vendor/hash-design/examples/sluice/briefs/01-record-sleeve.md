# #1 唱片封套 · Record sleeve

> The 1950s–80s LP sleeve: the front is a square — a brutally cropped photo, enormous type, or almost nothing; the back is a dense track listing, recording credits and a catalogue number. Blue Note's jazz tension, ECM's cool silence, Factory's numbering and restraint.

| | |
|---|---|
| hash | `2519cd97b1cb7a53fa192b21d16d98d41c08c45046f0969f12665848f49d9f97` |
| ref | `2519cd97b1cb7a53fa192b21d16d98d41c08c45046f0969f12665848f49d9f97` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | print |
| references | Reid Miles — Blue Note Records sleeves (1956–67); Barbara Wojirsch & Dieter Rehm — ECM Records covers; Peter Saville — Factory Records (FAC numbers, "Unknown Pleasures", "Power, Corruption & Lies"); Alex Steinweiss — Columbia Records sleeves (1940s); Hipgnosis — sleeves for Pink Floyd and Led Zeppelin |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `25 19` | branch | 0x2519 = 9497; 9497 mod 40 = 17 | **record-sleeve** |
| 2 | `cd` | voice | 0xcd = 205; 205 mod 14 = 9 | **catalogue-entry** |
| 3 | `97` | layout | 0x97 = 151; 151 mod 3 = 1 | **blue-note-crop** |
| 4 | `b1` | type | 0xb1 = 177; 177 mod 3 = 0 | **league-franklin** |
| 5 | `cb` | palette | 0xcb = 203; 203 mod 3 = 2 | **factory-black** |
| 6 | `7a` | density | 0x7a = 122; 122 mod 2 = 0 | **airy** |
| 7 | `53` | motion | 0x53 = 83; 83 mod 3 = 2 | **still** |
| 8 | `fa` | motif | 0xfa = 250; 250 mod 3 = 1 | **side-a-side-b** |
| 9 | `19` | anchor | 0x19 = 25; 25 mod 3 = 1 | **cropped-giant-type** |
| 10 | `2b` | scale | 0x2b = 43; 43 mod 3 = 1 | **perfect-fifth** |
| 11 | `21` | surface | 0x21 = 33; 33 mod 3 = 0 | **laminated-flipback** |
| 12 | `d1` | twist | 0xd1 = 209; 209 mod 16 = 1 | **one-element-breaks-grid** |
| 13–31 | `6d98d41c08c4…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** Sluice — self-hosted webhook inbox

Use only these facts. Do not invent numbers, reviews, awards or customers; leave gaps visibly empty.

- Name: Sluice — a self-hosted inbox for webhooks
- What it does: gives you a public URL for webhooks, stores every delivery, and forwards it to your local or internal service
- One static binary, about 11 MB, for Linux, macOS and Windows on amd64 and arm64
- Storage: a single SQLite file; no Redis, no Postgres, no queue to run
- Install: curl -fsSL https://sluice.example/install.sh | sh
- Start: sluice serve --forward http://localhost:3000
- Retries failed forwards with exponential backoff for up to 72 hours
- Replay any stored delivery: sluice replay <delivery-id>
- Verifies HMAC-SHA256 signatures and rejects deliveries older than 5 minutes
- Web UI on port 8081: search deliveries by path, header or body text
- Keeps deliveries for 30 days by default; change it with --retain
- 1,800 deliveries per second on a 2-vCPU VM, in the project's own benchmark
- No hosted service, no account, no telemetry
- Written in Go; MIT licence; 41 contributors
- Current version 0.9.2, released 14 October 2026
- Maintainer: Ines Okafor, who started it in 2023 after losing a weekend of payment webhooks

## 文案语气 Voice — 商品目录 / Catalogue entry

邮购目录条目：货号、品名、规格、价格，每条结构一致，靠排版而非形容词取胜。

Devices: 货号 No. · 品名 + 规格 · 价格右对齐 · 库存/批次说明

Example register (do not copy, match the register): “No.07 黑麦面包 · 750 g · 每日限 12 个 · ¥42”

## 版式 Layout — Blue Note crop

Reid Miles-style: an extreme tight crop (photo or giant letters) fills two thirds of the square; the title stacks in condensed caps against one edge inside a single strong colour band.

- **Grid:** 12×12 square grid; crop occupies rows 1–8, type band rows 9–12; type may bleed off the square edge.
- **Branch grid token:** Square module: the cover is 1:1 at min(92vw, 88vh) with an internal 12×12 square grid; the back cover uses 3 columns with 12px gutters.

Section order (top → bottom):

1. Square with a photo or letterform crop in rows 1–8, tinted in one colour
2. Type band: name in giant condensed caps, title in a contrasting weight
3. Catalogue label top-right in the "BLUE NOTE 1577" manner, using the subject's own code
4. Under the sleeve: session details table (date, place, people) with 1px rules

**First-screen anchor — Cropped giant type:** The name in condensed caps so large the square edges cut it; only 60–70% of the letters are visible.

## 字体 Typography — League Gothic + Libre Franklin

- **Display**: League Gothic 400 — fallback `Impact, "Arial Narrow", sans-serif`
- **Body**: Libre Franklin 400/700/900 + italic — fallback `"Franklin Gothic Medium", Arial, sans-serif`
- **Mono**: —
- **CJK**: display ZCOOL QingKe HuangYou, body Noto Sans SC
- **Setting rules:** League Gothic uppercase at huge sizes (up to 30vw), line-height 0.82, tracking 0; it is allowed to be cut by the square edge. Libre Franklin 900 for the title line in mixed case, 400 for credits at 13px/1.5. Durations in tabular figures, right-aligned.

Scale: **Perfect fifth 1.5** on a 18px base → -2: 8px · -1: 12px · 0: 18px · 1: 27px · 2: 40.5px · 3: 60.8px · 4: 91.1px · 5: 136.7px · 6: 205px · 7: 307.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Libre+Franklin:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap">
```

## 配色 Colour — Factory black

| token | hex | role |
|---|---|---|
| paper | `#0e0e0e` | page background |
| ink | `#f0eee9` | primary text |
| muted | `#a7a49d` | secondary text |
| accent | `#e8452c` | primary accent |
| accent2 | `#f2c230` | secondary accent |
| rule | `#3a3a3a` | lines, borders |
| panel | `#1c1c1c` | secondary background |

**Usage:** Black sleeve and page; off-white type; red and yellow as small solid colour-code blocks or a single line of type (<10%); grey rules on the back cover.

Contrast (WCAG):

- ink on paper: **16.65:1** — AAA — any text
- muted on paper: **7.76:1** — AAA — any text
- ink on panel: **14.7:1** — AAA — any text
- accent on paper: **4.89:1** — AA — body text OK
- accent2 on paper: **11.52:1** — AAA — any text
- #000000 on accent: **5.32:1** — AA — body text OK
- #000000 on accent2: **12.53:1** — AAA — any text

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0 for sleeves; the disc is a circle (border-radius: 50%) with a label circle at 33% of its diameter.
- **Borders:** No borders on the cover; back-cover credits use 1px rules; a 12px spine strip where needed.
- **Shadow:** none. Wear is shown with a ring-wear mark (thin radial ring) instead of a shadow.

## 材质 Surface — Laminated flipback

Crisp, flat front; the back cover has a 6px folded flipback strip on its left edge.

```css
.sleeve { background: var(--panel); } .back { position: relative; } .back::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 6px; background: var(--rule); }
```

## 母题 Motif — Side A / Side B

Any ordered facts listed as SIDE A / SIDE B with A1…B4 numbering, titles and right-aligned tabular durations or values.

## 动效 Motion — Still sleeve

No motion; hover underlines a title and turns its duration to accent.

- duration `0ms`, easing `linear`
- prefers-reduced-motion: Nothing to change.

## 变数 Twist — 唯一越界 / One element breaks the grid

全页恰好一个元素打破栅格：旋转、出血或越过边距。其余一切严格对齐。

## 必须 Must

- The first screen contains a perfect 1:1 square composition.
- A catalogue number and an ordered listing (A1, A2… or 01, 02…) appear on the page.
- Type or image is cropped by the square edge at least once — or, in the ECM option, the square is ≥85% empty.

## 不要 Must not (branch)

- No wide rectangular hero banner; the cover is square.
- No streaming-app UI: no circular play buttons, progress bars or heart icons.
- No invented track names, credits or durations — only items from the facts.

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
/* hash-design 2519cd97 · record-sleeve · factory-black */
:root {
  --paper: #0e0e0e;
  --ink: #f0eee9;
  --muted: #a7a49d;
  --accent: #e8452c;
  --on-accent: #000000;
  --accent2: #f2c230;
  --on-accent2: #000000;
  --rule: #3a3a3a;
  --panel: #1c1c1c;

  --font-display: "League Gothic", Impact, "Arial Narrow", sans-serif;
  --font-body: "Libre Franklin", "Franklin Gothic Medium", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.5rem; /* 8px */
  --step-n1: 0.75rem; /* 12px */
  --step-0: 1.125rem; /* 18px */
  --step-1: 1.688rem; /* 27px */
  --step-2: 2.531rem; /* 40.5px */
  --step-3: 3.797rem; /* 60.8px */
  --step-4: 5.695rem; /* 91.1px */
  --step-5: 8.543rem; /* 136.7px */
  --step-6: 12.814rem; /* 205px */
  --step-7: 19.222rem; /* 307.5px */
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

  --motion-duration: 0ms;
  --motion-easing: linear;
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: League Gothic / Libre Franklin
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Cropped giant type" anchor, in the "Blue Note crop" layout
- [ ] Copy is written in the "Catalogue entry" voice using only the facts
- [ ] Twist "One element breaks the grid" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 2519cd97b1cb7a53fa192b21d16d98d41c08c45046f0969f12665848f49d9f97`) reports no critical/major findings
