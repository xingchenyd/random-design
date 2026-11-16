# #4 学术论文 · Academic paper

> A research paper typeset in LaTeX: title and authors centred, a set-off abstract, sections numbered 1 and 1.1, numbered figure and table captions, footnotes and a references list. Authority comes from the numbering system and cross-references, not from decoration.

| | |
|---|---|
| hash | `8fcd60e5d98790da96425ffc1d4521251f6a91724c110d23559e8a91b3e9596e` |
| ref | `8fcd60e5d98790da96425ffc1d4521251f6a91724c110d23559e8a91b3e9596e+2` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | document |
| references | Donald Knuth, TeX and Computer Modern (1978–86); the AMS amsart document class; Edward Tufte’s handouts and the tufte-latex class (sidenotes, margin figures); Physical Review Letters and Nature two-column journal pages; Simon Fear, the booktabs LaTeX package (1995) — three-rule tables; arXiv preprints, 1991– |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `8f cd` | branch | 0x8fcd = 36813; 36813 mod 40 = 13; collision → +2 = 15 _(primary branch (or its family) already used in this roll; walked forward 2 step(s))_ | **academic-paper** |
| 2 | `60` | voice | 0x60 = 96; 96 mod 14 = 12 | **logbook** |
| 3 | `e5` | layout | 0xe5 = 229; 229 mod 3 = 1 | **tufte-handout** |
| 4 | `d9` | type | 0xd9 = 217; 217 mod 3 = 1 | **tufte-crimson** |
| 5 | `87` | palette | 0x87 = 135; 135 mod 3 = 0 | **preprint-white** |
| 6 | `90` | density | 0x90 = 144; 144 mod 2 = 0 | **regular** |
| 7 | `da` | motion | 0xda = 218; 218 mod 3 = 2 | **still** |
| 8 | `96` | motif | 0x96 = 150; 150 mod 3 = 0 | **numbered-captions** |
| 9 | `42` | anchor | 0x42 = 66; 66 mod 3 = 0 | **title-abstract** |
| 10 | `5f` | scale | 0x5f = 95; 95 mod 3 = 2 | **major-third** |
| 11 | `fc` | surface | 0xfc = 252; 252 mod 3 = 0 | **pdf-page** |
| 12 | `1d` | twist | 0x1d = 29; 29 mod 16 = 13 | **time-as-structure** |
| 13–31 | `4521251f6a91…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 值班日志 / Logbook

船长/值班日志：按条目记录，时间戳 + 事件 + 签名缩写，事实化、略带幽默。

Devices: 时间戳 · 事件代码 · 签名缩写 · 天气/状态栏

Example register (do not copy, match the register): “0630 炉温达标。0700 开门，门外 4 人。—— L.”

## 版式 Layout — Tufte handout

A wide right margin carries sidenotes, margin figures and citations next to the text they support; there are no footnotes at the bottom.

- **Grid:** 12 columns: text spans 1–7 (≈ 55%), sidenote column spans 9–12; full-width figures span 1–12; sidenote numbers superscript in text and on the baseline in the margin.
- **Branch grid token:** Text block 34em (≈ 600px) single column, or 2 × 20em columns with a 2em gap; page margins in the LaTeX article proportion (text width ≈ 62% of the page); baseline = 1.25 × body size; floats span one column or the full text width.

Section order (top → bottom):

1. Title in large italic + author in small caps; an epigraph instead of an abstract
2. Section headings in italic; paragraphs open with “new thought” small caps
3. Body paragraphs with sidenotes and margin figures alongside
4. One full-width figure or small-multiples table
5. Bibliography as short sidenote citations plus a compact list at the end

**First-screen anchor — Title + abstract:** The first screen is the centred title block plus the set-off abstract — dense, quiet and complete.

## 字体 Typography — Crimson Pro

- **Display**: Crimson Pro 400 + italic — fallback `Palatino, "Book Antiqua", serif`
- **Body**: Crimson Pro 400/600 + italic — fallback `Palatino, "Book Antiqua", serif`
- **Mono**: —
- **CJK**: display ZCOOL XiaoWei, body Noto Serif SC
- **Setting rules:** Crimson Pro 400 italic for the title (2.4×) and section headings (1.4×), never bold; body 400 at 19px/1.5, ragged-right; paragraph openers in font-variant-caps: all-small-caps with 0.05em tracking; sidenotes at 0.75× with the number on the baseline. Oldstyle figures (onum) in prose, lining in tables.

Scale: **Major third 1.25** on a 17px base → -2: 10.9px · -1: 13.6px · 0: 17px · 1: 21.3px · 2: 26.6px · 3: 33.2px · 4: 41.5px · 5: 51.9px · 6: 64.8px · 7: 81.1px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap">
```

## 配色 Colour — Preprint white

| token | hex | role |
|---|---|---|
| paper | `#fdfdfb` | page background |
| ink | `#111111` | primary text |
| muted | `#4a4a4a` | secondary text |
| accent | `#8c1515` | primary accent |
| accent2 | `#1d5e3a` | secondary accent |
| rule | `#222222` | lines, borders |
| panel | `#f2f1ec` | secondary background |

**Usage:** Practically monochrome: ink on white for ~97% of the page. Dark red (accent) only for cross-reference links (Fig. 1, Eq. 3, §2); green (accent2) only for citation brackets [12]; panel for the abstract box.

Contrast (WCAG):

- ink on paper: **18.54:1** — AAA — any text
- muted on paper: **8.7:1** — AAA — any text
- ink on panel: **16.7:1** — AAA — any text
- accent on paper: **9.23:1** — AAA — any text
- accent2 on paper: **7.6:1** — AAA — any text
- #ffffff on accent: **9.4:1** — AAA — any text
- #ffffff on accent2: **7.74:1** — AAA — any text

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 everywhere.
- **Borders:** booktabs only: \toprule and \bottomrule 1.5px ink, \midrule 1px ink, no vertical rules in tables; abstract framed by a 1px ink box or none; footnote separator 1px ink at 40% of the text width.
- **Shadow:** none.

## 材质 Surface — PDF page

A white page on a grey reader background with a hairline edge, like a PDF at 100% zoom.

```css
body { background: var(--panel); } main { background: var(--paper); max-width: 816px; margin: 32px auto; padding: 96px 72px; outline: 1px solid var(--rule); }
```

## 母题 Motif — Numbered captions

Run-in bold “Figure 3.” / “Table 2.” labels with smaller caption text; every float is referenced from the body.

## 动效 Motion — Still

No motion: links are coloured, hover adds a 1px underline.

- duration `0ms`, easing `linear`
- prefers-reduced-motion: Nothing to change.

## 变数 Twist — 时间为骨 / Time as structure

用真实的时间/日期（营业时间、出炉时刻、日程）作为页面的主结构轴。

## 必须 Must

- Sections, figures and tables are numbered, and every one is referenced in the text.
- A delimited abstract (or an epigraph in the Tufte layout) precedes section 1.
- Tables use only horizontal rules.
- Claims are tied to sources listed in the references, taken from the facts.

## 不要 Must not (branch)

- No cards, badges, icons or call-to-action buttons; links are inline text.
- No coloured section backgrounds; colour is limited to links and figure data.
- No invented authors, DOIs, journals or citations that are not in the facts.

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
/* hash-design 8fcd60e5 · academic-paper · preprint-white */
:root {
  --paper: #fdfdfb;
  --ink: #111111;
  --muted: #4a4a4a;
  --accent: #8c1515;
  --on-accent: #ffffff;
  --accent2: #1d5e3a;
  --on-accent2: #ffffff;
  --rule: #222222;
  --panel: #f2f1ec;

  --font-display: "Crimson Pro", Palatino, "Book Antiqua", serif;
  --font-body: "Crimson Pro", Palatino, "Book Antiqua", serif;
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

- [ ] Fonts on the page are exactly: Crimson Pro / Crimson Pro
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Title + abstract" anchor, in the "Tufte handout" layout
- [ ] Copy is written in the "Logbook" voice using only the facts
- [ ] Twist "Time as structure" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 8fcd60e5d98790da96425ffc1d4521251f6a91724c110d23559e8a91b3e9596e+2`) reports no critical/major findings
