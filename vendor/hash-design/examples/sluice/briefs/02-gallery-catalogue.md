# #2 美术馆图录 · Gallery catalogue

> White-cube wall texts and exhibition catalogues: one work per wall, a small label beside it giving artist, title, year, medium and dimensions. In the catalogue: wide margins, continuous plate numbers, archival grey — restraint is the authority.

| | |
|---|---|
| hash | `169a48c29375c592d4dead9d02f92a5a2036e89e793758bff47dd47b0acd0691` |
| ref | `169a48c29375c592d4dead9d02f92a5a2036e89e793758bff47dd47b0acd0691+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | signage |
| references | MoMA exhibition catalogues and wall labels (1960s–); Wim Crouwel — Stedelijk Museum Amsterdam catalogues (1964–85); documenta 5 catalogue, Kassel (1972); Brian O’Doherty — Inside the White Cube (1976); Steidl and Walther König artist monographs |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `16 9a` | branch | 0x169a = 5786; 5786 mod 40 = 26; collision → +1 = 27 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **gallery-catalogue** |
| 2 | `48` | voice | 0x48 = 72; 72 mod 14 = 2 | **technical-manual** |
| 3 | `c2` | layout | 0xc2 = 194; 194 mod 3 = 2 | **checklist-index** |
| 4 | `93` | type | 0x93 = 147; 147 mod 3 = 0 | **cormorant-catalogue** |
| 5 | `75` | palette | 0x75 = 117; 117 mod 3 = 0 | **white-cube** |
| 6 | `c5` | density | 0xc5 = 197; 197 mod 2 = 1 | **regular** |
| 7 | `92` | motion | 0x92 = 146; 146 mod 3 = 2 | **still-wall** |
| 8 | `d4` | motif | 0xd4 = 212; 212 mod 3 = 2 | **red-dot** |
| 9 | `de` | anchor | 0xde = 222; 222 mod 3 = 0 | **vinyl-title-wall** |
| 10 | `ad` | scale | 0xad = 173; 173 mod 3 = 2 | **golden** |
| 11 | `9d` | surface | 0x9d = 157; 157 mod 3 = 1 | **uncoated-stock** |
| 12 | `02` | twist | 0x02 = 2; 2 mod 16 = 2 | **nav-elsewhere** |
| 13–31 | `f92a5a2036e8…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 技术手册 / Technical manual

说明书口吻：编号条款、动词开头、规格写全，零形容词。

Devices: 1.1 / 1.2 编号 · 规格表 · 注意/警告框 · 动词开头的步骤

Example register (do not copy, match the register): “3.2 取货：报预订号 → 核对 → 取走。逾时 30 分钟释放库存。”

## 版式 Layout — Archive checklist

An archival register: tombstone entries in a measured grid with plate boxes and accession-style numbers, sections in a sticky left rail.

- **Grid:** 12 col; left 2 col sticky section rail; entries span 3 col each (4:3 plate box + 5-line tombstone); 48px row gap.
- **Branch grid token:** Catalogue grid: 12 col, 24px gutter, outer margins ≥ 12vw on desktop; a hanging line at 40% of viewport height on which works/plates are centred; captions on a 4px baseline grid.

Section order (top → bottom):

1. Register header: title, date range, number of works (from the facts)
2. Sticky section labels in the left rail
3. Entries: number, plate box, tombstone lines
4. Notes on the works: numbered endnotes
5. Credits and lenders

**First-screen anchor — Vinyl title wall:** The entry wall: exhibition title in vinyl lettering top-left at modest size, dates and venue below, everything else empty wall.

## 字体 Typography — Cormorant + EB Garamond

- **Display**: Cormorant 400/500 + italic — fallback `Garamond, "Times New Roman", serif`
- **Body**: EB Garamond 400/500 + italic — fallback `Garamond, Georgia, serif`
- **Mono**: —
- **CJK**: display Noto Serif SC, body Noto Serif SC
- **Setting rules:** Titles of works always italic. Exhibition title Cormorant 400 at ≤ 64px — the catalogue never shouts. Plate numbers in all-small-caps ("Pl. 12"); old-style figures in running text, lining in dimensions ("120 × 90 cm" with a true ×). Body 17px/1.6, max 58ch.

Scale: **Golden ratio 1.618** on a 17px base → -2: 6.5px · -1: 10.5px · 0: 17px · 1: 27.5px · 2: 44.5px · 3: 72px · 4: 116.5px · 5: 188.5px · 6: 305px · 7: 493.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap">
```

## 配色 Colour — White cube

| token | hex | role |
|---|---|---|
| paper | `#fafaf7` | page background |
| ink | `#161616` | primary text |
| muted | `#5e5e5a` | secondary text |
| accent | `#c8332b` | primary accent |
| accent2 | `#7d7a72` | secondary accent |
| rule | `#d8d6cf` | lines, borders |
| panel | `#efeee9` | secondary background |

**Usage:** Wall paper ≥ 85% of the area; ink text; muted for credit lines and dimensions; accent only as the 10px red dot and the current room number; panel behind the checklist.

Contrast (WCAG):

- ink on paper: **17.31:1** — AAA — any text
- muted on paper: **6.23:1** — AA — body text OK
- ink on panel: **15.58:1** — AAA — any text
- accent on paper: **5.07:1** — AA — body text OK
- accent2 on paper: **4.1:1** — large text / UI marks only (≥24px or bold ≥19px)
- #ffffff on accent: **5.3:1** — AA — body text OK
- #000000 on accent2: **4.9:1** — AA — body text OK

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 everywhere — images, labels, buttons.
- **Borders:** Almost none: 1px solid var(--rule) hairlines for the running head and under plate captions; images unbordered except white-on-white works (1px var(--rule)).
- **Shadow:** none. Foam-board labels are shown by a 1px var(--rule) outline, not by shadow.

## 材质 Surface — Uncoated stock

Uncoated catalogue paper with a barely visible fibre grain.

```css
background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.025) .6px, transparent .8px); background-size: 4px 5px;
```

## 母题 Motif — Red dot

A single 10px solid accent circle — the gallery "sold" dot — used at most once per screen for the one item that matters.

## 动效 Motion — Still wall

No motion; links are 1px underlines offset 3px.

- duration `0ms`, easing `linear`
- prefers-reduced-motion: Nothing to change.

## 变数 Twist — 导航不在顶部 / Navigation not on top

导航放在底部、侧边竖排或做成目录/索引，而不是顶部横条。

## 必须 Must

- Every work or item has a tombstone with maker, title and year from the facts — omit a line rather than invent it.
- At least 40% of each first screen is empty wall.
- Titles of works are italic; plate numbers are continuous.
- The exhibition title is never larger than 72px.

## 不要 Must not (branch)

- No carousels, hover-zoom or captions overlaid on images.
- No centred or justified body text; labels are flush-left ragged-right.
- No more than one accent mark per screen.

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
/* hash-design 169a48c2 · gallery-catalogue · white-cube */
:root {
  --paper: #fafaf7;
  --ink: #161616;
  --muted: #5e5e5a;
  --accent: #c8332b;
  --on-accent: #ffffff;
  --accent2: #7d7a72;
  --on-accent2: #000000;
  --rule: #d8d6cf;
  --panel: #efeee9;

  --font-display: Cormorant, Garamond, "Times New Roman", serif;
  --font-body: "EB Garamond", Garamond, Georgia, serif;
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

  --motion-duration: 0ms;
  --motion-easing: linear;
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Cormorant / EB Garamond
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Vinyl title wall" anchor, in the "Archive checklist" layout
- [ ] Copy is written in the "Technical manual" voice using only the facts
- [ ] Twist "Navigation not on top" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 169a48c29375c592d4dead9d02f92a5a2036e89e793758bff47dd47b0acd0691+1`) reports no critical/major findings
