# #1 瑞士网格 · Swiss grid

> 国际主义字体风格：穆勒-布罗克曼的苏黎世音乐厅海报、鲁德的《排印月刊》、《新平面设计》杂志。一切服从模数网格，左齐右不齐，标题是排好的字块而不是装饰。红与黑、01/02 的编号本身就是结构——客观、冷静，让信息自己说话。

| | |
|---|---|
| hash | `0377a498f0119f4f640840bd7c48820d0f2eac30756f28efeba4029b5ab4d846` |
| ref | `0377a498f0119f4f640840bd7c48820d0f2eac30756f28efeba4029b5ab4d846` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | modernist |
| references | Josef Müller-Brockmann, Zürich Tonhalle “musica viva” concert posters (1951–1972); Emil Ruder, Typographie: A Manual of Design (1967); Neue Grafik / New Graphic Design journal (1958–1965); Josef Müller-Brockmann, Grid Systems in Graphic Design (1981); Karl Gerstner, Designing Programmes (1964) |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `03 77` | branch | 0x0377 = 887; 887 mod 40 = 7 | **swiss-grid** |
| 2 | `a4` | voice | 0xa4 = 164; 164 mod 14 = 10 | **interview-qa** |
| 3 | `98` | layout | 0x98 = 152; 152 mod 3 = 2 | **numbered-index** |
| 4 | `f0` | type | 0xf0 = 240; 240 mod 3 = 0 | **akzidenz-archivo** |
| 5 | `11` | palette | 0x11 = 17; 17 mod 3 = 2 | **tonhalle-night** |
| 6 | `9f` | density | 0x9f = 159; 159 mod 2 = 1 | **airy** |
| 7 | `4f` | motion | 0x4f = 79; 79 mod 3 = 1 | **rule-draw** |
| 8 | `64` | motif | 0x64 = 100; 100 mod 3 = 1 | **section-numerals** |
| 9 | `08` | anchor | 0x08 = 8; 8 mod 3 = 2 | **geometric-field** |
| 10 | `40` | scale | 0x40 = 64; 64 mod 2 = 0 | **perfect-fourth** |
| 11 | `bd` | surface | 0xbd = 189; 189 mod 3 = 0 | **offset-white** |
| 12 | `7c` | twist | 0x7c = 124; 124 mod 16 = 12 | **no-button-above-fold** |
| 13–31 | `48820d0f2eac…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** 二号桥单车铺

只能使用以下事实。不得编造数字、评价、奖项或客户；缺少的信息留空或写"待补"。

- 店名：二号桥单车铺（Bridge No.2 Cycle Works）
- 地址：河西路二号桥桥洞下东侧，蓝色卷帘门，门口立着一个旧车轮
- 营业：周三至周日 10:00–20:00；周一、周二休息
- 补胎 ¥15；换内胎 ¥35（含内胎）
- 全车保养 ¥180：清洗传动、调变速和刹车、紧固全车螺丝，约 2 小时
- 手工编轮组 ¥260 起，工期 5 天
- 二手车：每辆都换过链条和刹车皮，保修 90 天
- 公路车 Fitting ¥480，约 90 分钟，需预约
- 店主：陈立平，大家叫他老陈，修车 27 年，以前在自行车厂做装配
- 周四夜骑：每周四 19:30 店门口出发，沿江一圈 24 公里，免费，自带车灯
- 门口气泵免费，24 小时可用
- 预约：电话 0571-5555-0222，或到店登记
- 不卖新车，只修车、卖二手车和零件

## 文案语气 Voice — 问答访谈 / Interview Q&A

访谈稿：问句短，答句是当事人的原话风格，具体、口语、有细节。

Devices: 问：/答： · 引语 · 具体人名/时间 · 一句停顿或笑声注

Example register (do not copy, match the register): “问：为什么周一休息？答：酵种也要歇一天。”

## 版式 Layout — Numbered index

Numbers are the architecture: each section opens with a giant numeral spanning two columns with the content to its right; the page reads like a specification.

- **Grid:** 8 columns, 16px gutters, 40px margins; numeral column = cols 1–2 (numerals 12–18vw, tabular), content cols 3–8; 8px baseline.
- **Branch grid token:** 12 columns grouped into 6 fields, 24px gutter, 48px outer margin (24px on mobile); 8px baseline with body 16/24; every block top-aligns to a field row of 8 baselines (64px).

Section order (top → bottom):

1. Top band: title flush-left, a 6px red bar spanning cols 1–2 only
2. 01 — giant red numeral left; statement and key facts right
3. 02 — a ruled table (label / value / note)
4. 03 — one objective black-and-white image or a solid colour field cropped to the grid
5. 04 — contact as plain lines, numbered like everything else

**First-screen anchor — Geometric field:** An abstract figure (concentric arcs, a circle cut by the grid, or stacked bars) fills ≈60% of the first screen; the text is small and sits in two fields at the bottom-left.

## 字体 Typography — Archivo (Akzidenz stand-in)

- **Display**: Archivo 500/800 — fallback `"Helvetica Neue", Arial, sans-serif`
- **Body**: Archivo 400/500/700 — fallback `"Helvetica Neue", Arial, sans-serif`
- **Mono**: —
- **CJK**: display Noto Sans SC, body Noto Sans SC
- **Setting rules:** Headlines 800, sentence case, tracking -0.02em, line-height 0.95, set as a block of 3–5 lines. Body 16/24, weight 400, never justified. Numerals tabular (font-variant-numeric: tabular-nums). Only three sizes on a page: headline, body, 12px caption.

Scale: **Perfect fourth 1.333** on a 18px base → -2: 10.1px · -1: 13.5px · 0: 18px · 1: 24px · 2: 32px · 3: 42.6px · 4: 56.8px · 5: 75.8px · 6: 101px · 7: 134.6px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=Noto+Sans+SC:wght@400;700&display=swap">
```

## 配色 Colour — Tonhalle night

| token | hex | role |
|---|---|---|
| paper | `#121212` | page background |
| ink | `#f1eee6` | primary text |
| muted | `#a3a097` | secondary text |
| accent | `#ff5a1f` | primary accent |
| accent2 | `#4a8fd1` | secondary accent |
| rule | `#f1eee6` | lines, borders |
| panel | `#232323` | secondary background |

**Usage:** Black concert poster: off-white type (≈85% of marks); orange for the main arc or numeral; blue only as one secondary overlapping figure; never more than two accent shapes per screen.

Contrast (WCAG):

- ink on paper: **16.16:1** — AAA — any text
- muted on paper: **7.17:1** — AAA — any text
- ink on panel: **13.56:1** — AAA — any text
- accent on paper: **6.01:1** — AA — body text OK
- accent2 on paper: **5.48:1** — AA — body text OK
- #000000 on accent: **6.73:1** — AA — body text OK
- #000000 on accent2: **6.14:1** — AA — body text OK

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0 everywhere — buttons, images and inputs included.
- **Borders:** 1px solid ink hairlines only on field boundaries; one 6px accent bar (exactly one field wide) as the only heavy rule; never a box around text.
- **Shadow:** none.

## 材质 Surface — Uncoated offset

Flat uncoated stock, no texture; colours print solid with razor edges.

```css
background-color: var(--paper);
```

## 母题 Motif — Section numerals

Two-digit numerals (01, 02 …) in the display weight at 4–6× body size, tabular figures, hanging in the left column; they double as navigation.

## 动效 Motion — Rule draw

Only on the first screen, once on load: hairlines and the accent bar extend from the left margin to their column end (scaleX 0→1, transform-origin left). Type never moves.

- duration `420ms`, easing `cubic-bezier(.65,0,.35,1)`
- prefers-reduced-motion: Rules are drawn at full length immediately.

## 变数 Twist — 首屏无按钮 / No button above the fold

首屏不出现任何按钮；行动入口（电话、预订、地址）在第二屏之后，以文字链接或表格行出现。

## 必须 Must

- All text is flush-left, ragged-right; nothing centred or justified.
- Every element’s left edge lands on a declared column line (≤ 6 distinct x-positions per screen).
- A numeric system (01, 02 … or dates/times as large figures) organises the page.
- At most two type sizes per section besides the headline.

## 不要 Must not (branch)

- No centred headline and no symmetrical hero.
- No decorative imagery: photos are objective (object, building, person straight-on) or absent; no illustrations, no textures behind text.
- No more than one accent colour plus black inside the same field.
- No rounded corners, shadows or icons.

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
/* hash-design 0377a498 · swiss-grid · tonhalle-night */
:root {
  --paper: #121212;
  --ink: #f1eee6;
  --muted: #a3a097;
  --accent: #ff5a1f;
  --on-accent: #000000;
  --accent2: #4a8fd1;
  --on-accent2: #000000;
  --rule: #f1eee6;
  --panel: #232323;

  --font-display: Archivo, "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
  --font-body: Archivo, "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.633rem; /* 10.1px */
  --step-n1: 0.844rem; /* 13.5px */
  --step-0: 1.125rem; /* 18px */
  --step-1: 1.5rem; /* 24px */
  --step-2: 1.999rem; /* 32px */
  --step-3: 2.665rem; /* 42.6px */
  --step-4: 3.552rem; /* 56.8px */
  --step-5: 4.735rem; /* 75.8px */
  --step-6: 6.312rem; /* 101px */
  --step-7: 8.413rem; /* 134.6px */
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

  --motion-duration: 420ms;
  --motion-easing: cubic-bezier(.65,0,.35,1);
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Archivo / Archivo (+ Noto Sans SC / Noto Sans SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Geometric field" anchor, in the "Numbered index" layout
- [ ] Copy is written in the "Interview Q&A" voice using only the facts
- [ ] Twist "No button above the fold" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 0377a498f0119f4f640840bd7c48820d0f2eac30756f28efeba4029b5ab4d846`) reports no critical/major findings
