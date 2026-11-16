# #5 方格实验本 · Lab notebook

> The research lab notebook and the engineer’s computation pad: grid paper, handwritten conclusions beside monospace annotations, sketches, measurement tables, every entry dated and signed, mistakes struck through with a single line instead of erased. The page is a running, traceable record of work.

| | |
|---|---|
| hash | `58912b84bd8a2d3337b9da9ba7c435c9a5ac2b75dcd08a1c7b474a72b0c36302` |
| ref | `58912b84bd8a2d3337b9da9ba7c435c9a5ac2b75dcd08a1c7b474a72b0c36302+5` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | craft |
| references | Michael Faraday’s laboratory notebooks (Royal Institution, 1820s–60s); National Brand green computation notebooks with 4×4 quad ruling; Engineering computation pads on green eye-ease paper (Ampad, Roaring Spring); Bell Labs engineering notebooks with dated, witnessed pages; Leonardo da Vinci, Codex Arundel — mirror-written notes beside sketches |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `58 91` | branch | 0x5891 = 22673; 22673 mod 40 = 33; collision → +5 = 38 _(primary branch (or its family) already used in this roll; walked forward 5 step(s))_ | **lab-notebook** |
| 2 | `2b` | voice | 0x2b = 43; 43 mod 14 = 1 | **field-notes** |
| 3 | `84` | layout | 0x84 = 132; 132 mod 3 = 0 | **dated-entries** |
| 4 | `bd` | type | 0xbd = 189; 189 mod 3 = 0 | **ballpoint-plex** |
| 5 | `8a` | palette | 0x8a = 138; 138 mod 3 = 0 | **green-computation** |
| 6 | `2d` | density | 0x2d = 45; 45 mod 2 = 1 | **regular** |
| 7 | `33` | motion | 0x33 = 51; 51 mod 3 = 0 | **strike-correction** |
| 8 | `37` | motif | 0x37 = 55; 55 mod 3 = 1 | **struck-corrections** |
| 9 | `b9` | anchor | 0xb9 = 185; 185 mod 3 = 2 | **annotated-sketch** |
| 10 | `da` | scale | 0xda = 218; 218 mod 2 = 0 | **major-third** |
| 11 | `9b` | surface | 0x9b = 155; 155 mod 3 = 2 | **taped-printout** |
| 12 | `a7` | twist | 0xa7 = 167; 167 mod 16 = 7 | **numbered-sections** |
| 13–31 | `c435c9a5ac2b…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 田野笔记 / Field notes

观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。

Devices: 日期/时间戳 · 度量单位 · "观察到…"式陈述 · 括号补充

Example register (do not copy, match the register): “06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。”

## 版式 Layout — Dated entries

The page is a sequence of notebook entries, each opening with a date, a hand-underlined title and an entry number; sections are entries.

- **Grid:** 20px grid; content from x = 80px to max 880px; dates in the 0–80px margin; entries separated by a full-width hand-drawn line.
- **Branch grid token:** 20px square grid (5mm) across the page, major line every 100px; every block’s width and height are multiples of 20px; 80px left margin (4 squares) with a 1px red margin line; baselines sit on grid lines (line-height 20px or 40px).

Section order (top → bottom):

1. Page header in mono: notebook title, “Book 3 · p. 47”, owner
2. Entry 1 (dated): aim written by hand, then mono notes
3. Entry 2: measurement table ruled to the grid, units in the header
4. Entry 3: an SVG line sketch with labelled arrows
5. Signature and “Witnessed by / date” block at the page foot

**First-screen anchor — Annotated sketch:** A large single-weight line sketch of the subject with 4–6 handwritten labels and arrows fills the first screen.

## 字体 Typography — Caveat + IBM Plex Mono

- **Display**: Caveat 500/700 — fallback `"Segoe Print", "Bradley Hand", cursive`
- **Body**: IBM Plex Mono 400/600 + italic — fallback `"Courier New", monospace`
- **Mono**: —
- **CJK**: display Long Cang, body Noto Sans SC
- **Setting rules:** Caveat 500/700 for entry titles, conclusions and margin remarks at 28–44px on a 40px line so it sits on the grid; remarks may rotate −1° to 1°. IBM Plex Mono 400 at 14px/20px for data, notes and tables (one line per grid row); units always with a space (“12.5 mL”).

Scale: **Major third 1.25** on a 17px base → -2: 10.9px · -1: 13.6px · 0: 17px · 1: 21.3px · 2: 26.6px · 3: 33.2px · 4: 41.5px · 5: 51.9px · 6: 64.8px · 7: 81.1px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400;1,600&display=swap">
```

## 配色 Colour — Green computation pad

| token | hex | role |
|---|---|---|
| paper | `#eaf2df` | page background |
| ink | `#1a2419` | primary text |
| muted | `#435343` | secondary text |
| accent | `#c2412d` | primary accent |
| accent2 | `#2b5d8a` | secondary accent |
| rule | `#a9c9a4` | lines, borders |
| panel | `#dce9cf` | secondary background |

**Usage:** Eye-ease green paper with green grid (rule); graphite ink text; red (accent) for corrections, the margin line and answer boxes; blue ballpoint (accent2) for handwritten remarks and arrows; panel for header strips and taped-in printouts.

Contrast (WCAG):

- ink on paper: **13.94:1** — AAA — any text
- muted on paper: **7.14:1** — AAA — any text
- ink on panel: **12.67:1** — AAA — any text
- accent on paper: **4.47:1** — large text / UI marks only (≥24px or bold ≥19px)
- accent2 on paper: **6.02:1** — AA — body text OK
- #ffffff on accent: **5.14:1** — AA — body text OK
- #ffffff on accent2: **6.92:1** — AA — body text OK

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0. Circles around results are hand-drawn SVG ellipses with uneven strokes, not CSS radii.
- **Borders:** Grid 1px var(--rule), major lines slightly darker; boxes drawn as 1.5px ink “hand” strokes (SVG paths with ±1px jitter) or 1px ruled tables on the grid; answer boxes double-outlined (3px double ink).
- **Shadow:** none. Taped-in printouts get translucent tape strips at the corners, not shadows.

## 材质 Surface — Taped-in printout

White printout rectangles taped onto the page with translucent tape strips at two corners, rotated about 1°.

```css
.taped { background: #fffefa; position: relative; transform: rotate(-.8deg); } .taped::before { content: ""; position: absolute; top: -10px; left: 24px; width: 80px; height: 22px; background: rgba(240,232,200,.65); transform: rotate(-4deg); }
```

## 母题 Motif — Struck-through corrections

Errors left visible under a single line, with the correction and initials beside — the honesty of the record.

## 动效 Motion — Strike-through correction

A value that changes (updated hours, a new price) keeps the old value, a line draws through it left → right, then the new value is written beside it.

- duration `300ms`, easing `cubic-bezier(.5,0,.5,1)`
- prefers-reduced-motion: Show the struck-through old value and the new value without animation.

## 变数 Twist — 分节编号 / Numbered sections

每个区块有显眼的编号（§1、No.2、03…），编号本身是设计元素。

## 必须 Must

- A visible grid underlies the page and blocks align to it.
- Every entry or section carries a date and an entry or page number.
- Handwriting is used for titles and remarks, mono for data — both appear on the first screen.
- At least one table of values with units in its header.

## 不要 Must not (branch)

- No erasing: corrections are struck through, never silently replaced.
- Handwriting faces never set paragraphs longer than two lines.
- No stock science imagery: no beakers, DNA helices or glowing molecules.

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
/* hash-design 58912b84 · lab-notebook · green-computation */
:root {
  --paper: #eaf2df;
  --ink: #1a2419;
  --muted: #435343;
  --accent: #c2412d;
  --on-accent: #ffffff;
  --accent2: #2b5d8a;
  --on-accent2: #ffffff;
  --rule: #a9c9a4;
  --panel: #dce9cf;

  --font-display: Caveat, "Segoe Print", "Bradley Hand", cursive;
  --font-body: "IBM Plex Mono", "Courier New", monospace;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.68rem; /* 10.9px */
  --step-n1: 0.85rem; /* 13.6px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.328rem; /* 21.3px */
  --step-2: 1.66rem; /* 26.6px */
  --step-3: 2.075rem; /* 33.2px */
  --step-4: 2.594rem; /* 41.5px */
  --step-5: 3.242rem; /* 51.9px */
  --step-6: 4.053rem; /* 64.8px */
  --step-7: 5.066rem; /* 81.1px */
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
  --motion-easing: cubic-bezier(.5,0,.5,1);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Caveat / IBM Plex Mono
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Annotated sketch" anchor, in the "Dated entries" layout
- [ ] Copy is written in the "Field notes" voice using only the facts
- [ ] Twist "Numbered sections" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 58912b84bd8a2d3337b9da9ba7c435c9a5ac2b75dcd08a1c7b474a72b0c36302+5`) reports no critical/major findings
