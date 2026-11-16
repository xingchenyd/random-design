# #3 终端荧光 · Terminal phosphor

> The screen of a mainframe or dumb terminal: green or amber phosphor monospace on black, box-drawing characters for panels and tables, a blinking cursor after the prompt. Structure comes from the man page — NAME, SYNOPSIS, DESCRIPTION — and everything fits in 80 columns.

| | |
|---|---|
| hash | `16333b219df7a0a92644b8fb7726cd03bd7f1e76a8813242ad514385cb25a357` |
| ref | `16333b219df7a0a92644b8fb7726cd03bd7f1e76a8813242ad514385cb25a357` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | screen |
| references | DEC VT100 / VT220 terminals (1978–83); IBM 3270 display stations and ISPF panels; Unix Programmer’s Manual and the man(1) page format, Bell Labs (1971–79); Lear Siegler ADM-3A and Zenith Z-19 green/amber phosphor screens; IBM 1403 line printer and green-bar continuous paper |

**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `16 33` | branch | 0x1633 = 5683; 5683 mod 40 = 3 | **terminal-phosphor** |
| 2 | `3b` | voice | 0x3b = 59; 59 mod 14 = 3 | **personal-letter** |
| 3 | `21` | layout | 0x21 = 33; 33 mod 3 = 0 | **man-page** |
| 4 | `9d` | type | 0x9d = 157; 157 mod 3 = 1 | **plex-3270** |
| 5 | `f7` | palette | 0xf7 = 247; 247 mod 3 = 1 | **p3-amber** |
| 6 | `a0` | density | 0xa0 = 160; 160 mod 2 = 0 | **compact** |
| 7 | `a9` | motion | 0xa9 = 169; 169 mod 3 = 1 | **cursor-blink** |
| 8 | `26` | motif | 0x26 = 38; 38 mod 3 = 2 | **reverse-video** |
| 9 | `44` | anchor | 0x44 = 68; 68 mod 3 = 2 | **ascii-banner** |
| 10 | `b8` | scale | 0xb8 = 184; 184 mod 2 = 0 | **major-second** |
| 11 | `fb` | surface | 0xfb = 251; 251 mod 3 = 2 | **greenbar-paper** |
| 12 | `77` | twist | 0x77 = 119; 119 mod 16 = 7 | **numbered-sections** |
| 13–31 | `26cd03bd7f1e…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 亲笔信 / Personal letter

写给一个具体读者的信：第一人称、第二人称、具体的回忆和邀请，有落款。

Devices: 称呼 · 第一人称回忆 · 落款与日期 · 附言 P.S.

Example register (do not copy, match the register): “你好——如果你周六早上路过，门会开着，桌上有刚切的面包。”

## 版式 Layout — Man page

The page reads as a man page: header line, NAME, SYNOPSIS, DESCRIPTION, OPTIONS, SEE ALSO, with 7ch indentation.

- **Grid:** One 80ch column at 2ch from the left; section heads at col 0, body indented 7ch, option flags hanging-indented 7ch / 14ch.
- **Branch grid token:** Character grid: everything in ch and line units — 80ch max width (132ch for wide tables), line-height 1.25; columns are integer ch widths (e.g. 24ch | 56ch); spacing in whole lines, never px gaps that break the cell grid.

Section order (top → bottom):

1. Header line: TITLE(1) at both ends with the manual name centred
2. NAME: the title — one-line summary
3. SYNOPSIS: the core offer written as a command with [options]
4. DESCRIPTION: paragraphs indented 7ch
5. OPTIONS / FILES / SEE ALSO built from the facts; footer line with date and version

**First-screen anchor — ASCII banner:** The title as a large block-character banner (█ ▀ ▄) inside a double-line ╔═╗ frame.

## 字体 Typography — IBM Plex Mono + Fira Code

- **Display**: IBM Plex Mono 600/700 — fallback `"Courier New", monospace`
- **Body**: Fira Code 400/500 — fallback `"Courier New", monospace`
- **Mono**: —
- **CJK**: display Noto Sans SC, body Noto Sans SC
- **Setting rules:** Mainframe panel voice: titles in Plex Mono 700 uppercase at 1–2× body only (no big type on a 3270). Body Fira Code 15px with font-variant-ligatures: none. Field labels followed by ". . . :" leaders; protected text in muted, input in ink.

Scale: **Major second 1.125** on a 15px base → -2: 11.9px · -1: 13.3px · 0: 15px · 1: 16.9px · 2: 19px · 3: 21.4px · 4: 24px · 5: 27px · 6: 30.4px · 7: 34.2px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600;700&family=Fira+Code:wght@400;500&display=swap">
```

## 配色 Colour — P3 amber phosphor

| token | hex | role |
|---|---|---|
| paper | `#120b02` | page background |
| ink | `#ffb84a` | primary text |
| muted | `#c4842a` | secondary text |
| accent | `#ffe2a8` | primary accent |
| accent2 | `#ff7a1a` | secondary accent |
| rule | `#5a3a0c` | lines, borders |
| panel | `#1e1305` | secondary background |

**Usage:** Warm amber monochrome: ink for text, pale accent for headings and the cursor, orange accent2 only for errors; rule-brown box lines; panel for inactive panes.

Contrast (WCAG):

- ink on paper: **11.36:1** — AAA — any text
- muted on paper: **6.22:1** — AA — body text OK
- ink on panel: **10.61:1** — AAA — any text
- accent on paper: **15.54:1** — AAA — any text
- accent2 on paper: **7.49:1** — AAA — any text
- #000000 on accent: **16.7:1** — AAA — any text
- #000000 on accent2: **8.05:1** — AAA — any text

## 密度 Density — 紧凑 / Compact

信息密集，多栏并行；用细线和对齐建立秩序，首屏就能看到 3 个以上信息块。 Base 15px, line-height 1.45, spacing unit 6px, section gap 64px, max width 1320px.

## 形状与层次 Shape & depth

- **Radius:** 0 for all UI. The only curve is the optional CRT bezel around the whole screen (border-radius 18px on the outer frame).
- **Borders:** Boxes drawn with box-drawing characters (┌─┐│└┘, double ╔═╗ for the primary panel) as text, or at most 1px solid var(--accent); nothing thicker.
- **Shadow:** none on elements. Phosphor bloom only as text-shadow: 0 0 2px currentColor (≤ 3px blur); nothing else glows.

## 材质 Surface — Green-bar paper

Continuous line-printer paper: 3 lines of panel tint, 3 lines of paper, tractor holes in the margins.

```css
background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, var(--panel) 0 3.75em, transparent 3.75em 7.5em);
```

## 母题 Motif — Reverse video

Headings, the selected menu item and the status bar in reverse video (accent background, paper text) spanning whole ch widths.

## 动效 Motion — Cursor blink

A block cursor (█, 1ch × 1.25em) after the last prompt blinks 530ms on / 530ms off — the only moving thing on the screen.

- duration `1060ms`, easing `steps(2, jump-none)`
- prefers-reduced-motion: Solid cursor, no blink.

## 变数 Twist — 分节编号 / Numbered sections

每个区块有显眼的编号（§1、No.2、03…），编号本身是设计元素。

## 必须 Must

- All text is monospace on a ch grid; line length ≤ 80ch (132ch for tables).
- At least one structure borrowed from terminals: prompt + output, man-page sections, or a PF-key form panel.
- Emphasis by reverse video, brightness (accent) or underline — never size jumps larger than 2×, except one ASCII banner.

## 不要 Must not (branch)

- No neon blur, chromatic aberration or "matrix rain".
- No proportional fonts anywhere, including nav and buttons.
- No invented system output or hacker jargon — every line carries a fact.
- No rounded buttons; controls are [ bracketed ] or underlined fields.

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
/* hash-design 16333b21 · terminal-phosphor · p3-amber */
:root {
  --paper: #120b02;
  --ink: #ffb84a;
  --muted: #c4842a;
  --accent: #ffe2a8;
  --on-accent: #000000;
  --accent2: #ff7a1a;
  --on-accent2: #000000;
  --rule: #5a3a0c;
  --panel: #1e1305;

  --font-display: "IBM Plex Mono", "Courier New", monospace;
  --font-body: "Fira Code", "Courier New", monospace;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.741rem; /* 11.9px */
  --step-n1: 0.833rem; /* 13.3px */
  --step-0: 0.938rem; /* 15px */
  --step-1: 1.055rem; /* 16.9px */
  --step-2: 1.187rem; /* 19px */
  --step-3: 1.335rem; /* 21.4px */
  --step-4: 1.502rem; /* 24px */
  --step-5: 1.689rem; /* 27px */
  --step-6: 1.901rem; /* 30.4px */
  --step-7: 2.138rem; /* 34.2px */
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

  --motion-duration: 1060ms;
  --motion-easing: steps(2, jump-none);
}

html { font-size: 93.8%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: IBM Plex Mono / Fira Code
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "ASCII banner" anchor, in the "Man page" layout
- [ ] Copy is written in the "Personal letter" voice using only the facts
- [ ] Twist "Numbered sections" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 16333b219df7a0a92644b8fb7726cd03bd7f1e76a8813242ad514385cb25a357`) reports no critical/major findings
