# #3 水墨印章 · Ink and seal

> 中国水墨与篆刻：山水的墨分五色，从焦墨晕开到淡墨再到纸白；文人画的题跋竖写在留白处，朱文、白文印章压在落款下。宣纸的纤维、手卷与立轴的比例——页面像一幅可以展开的画。

| | |
|---|---|
| hash | `7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4` |
| ref | `7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | craft |
| references | 黄公望《富春山居图》(1350); 八大山人 (Bada Shanren) ink paintings, late 17th century; 吴昌硕 seal carving and calligraphy (1844–1927); 齐白石 paintings with inscriptions and seals; 荣宝斋 木版水印 woodblock reproductions |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `7f 18` | branch | 0x7f18 = 32536; 32536 mod 40 = 16 | **ink-and-seal** |
| 2 | `e1` | voice | 0xe1 = 225; 225 mod 14 = 1 | **field-notes** |
| 3 | `dc` | layout | 0xdc = 220; 220 mod 3 = 1 | **handscroll** |
| 4 | `68` | type | 0x68 = 104; 104 mod 3 = 2 | **caoshu-antique** |
| 5 | `35` | palette | 0x35 = 53; 53 mod 3 = 2 | **blue-green-silk** |
| 6 | `9c` | density | 0x9c = 156; 156 mod 2 = 0 | **airy** |
| 7 | `51` | motion | 0x51 = 81; 81 mod 3 = 0 | **ink-bleed** |
| 8 | `db` | motif | 0xdb = 219; 219 mod 3 = 0 | **seals** |
| 9 | `6b` | anchor | 0x6b = 107; 107 mod 3 = 2 | **seal-as-title** |
| 10 | `b6` | scale | 0xb6 = 182; 182 mod 3 = 2 | **perfect-fourth** |
| 11 | `90` | surface | 0x90 = 144; 144 mod 3 = 0 | **xuan-fibre** |
| 12 | `3d` | twist | 0x3d = 61; 61 mod 16 = 13 | **time-as-structure** |
| 13–31 | `7778c59556fa…` | (unused) | recorded, not used | — |

## 内容 Content

**Subject:** 第四巷面包店

只能使用以下事实。不得编造数字、评价、奖项或客户；缺少的信息留空或写"待补"。

- 店名：第四巷面包店（Fourth Lane Bakery）
- 地址：老城区第四巷 17 号，巷口数第二个门，绿色木门
- 营业：周二至周日 7:00–19:00；周一休息
- 每天两炉：7:00 第一炉（乡村面包、可颂），11:00 第二炉（肉桂卷、黑麦面包）
- 卖完即止，当天不留货
- 乡村面包：天然酵种，48 小时低温发酵，整个 ¥38，半个 ¥20
- 黑麦面包：70% 黑麦，750 g，每日限 12 个，¥42
- 可颂：法国发酵黄油，¥16
- 肉桂卷：¥18，只在第二炉
- 酵种养了 9 年，店里叫它“老周”
- 面粉：本地石磨全麦粉 + 法国 T65
- 预订：提前一天 17:00 前，电话 021-5555-0417 或店内登记
- 周六 9:00–11:30 面包课，6 人小班，¥260/人，带走自己烤的面包
- 店主：周岚，前建筑师，2019 年开店
- 店内 6 个座位，手冲咖啡 ¥22

## 文案语气 Voice — 田野笔记 / Field notes

观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。

Devices: 日期/时间戳 · 度量单位 · "观察到…"式陈述 · 括号补充

Example register (do not copy, match the register): “06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。”

## 版式 Layout — Handscroll (手卷)

A horizontal handscroll: content unrolls sideways in a scrolling track, each section a scene with its own inscription and seal.

- **Grid:** Horizontal track (overflow-x: auto; scroll-snap-type: x proximity); sections 90vw × 80vh; vertical-rl inscriptions in 64px columns; on mobile the scenes stack vertically.
- **Branch grid token:** Scroll proportions: hanging-scroll column at 1:3 (≈520px wide, left of centre) or a horizontal handscroll track of 80–100vw sections; 24px gutters; mounting bands (天头 / 地头) of 8–12vh.

Section order (top → bottom):

1. 引首: the title in large calligraphy on the first panel
2. Scene 1: ink landscape with the main statement inscribed
3. Scenes 2–3: one per offering or fact group, each with a seal
4. 跋: colophon with dates, names and contact, several small seals

**First-screen anchor — Seal as title:** A large carved 白文 seal (30–40vw) bearing the name is the title; the rest of the first screen is paper and one vertical line of text.

## 字体 Typography — Liu Jian Mao Cao (草) + Zen Antique

- **Display**: Zen Antique 400 — fallback `"Songti SC", serif`
- **Body**: Crimson Pro 400/600 — fallback `Georgia, serif`
- **Mono**: —
- **CJK**: display Liu Jian Mao Cao, body Noto Serif SC
- **Setting rules:** Liu Jian Mao Cao (cursive script) only for one or two expressive words — the name or a single character — at 120px+, as the painted gesture; never for information. All other CJK in Noto Serif SC 16/1.9. Latin headings Zen Antique, body Crimson Pro 17/1.6.

Scale: **Perfect fourth 1.333** on a 18px base → -2: 10.1px · -1: 13.5px · 0: 18px · 1: 24px · 2: 32px · 3: 42.6px · 4: 56.8px · 5: 75.8px · 6: 101px · 7: 134.6px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Antique&family=Crimson+Pro:wght@400;600&family=Liu+Jian+Mao+Cao&family=Noto+Serif+SC:wght@400;700&display=swap">
```

## 配色 Colour — Blue-green landscape on silk

| token | hex | role |
|---|---|---|
| paper | `#e8dcc0` | page background |
| ink | `#1f2420` | primary text |
| muted | `#545a4f` | secondary text |
| accent | `#2f6f62` | primary accent |
| accent2 | `#ad3b26` | secondary accent |
| rule | `#7a6a4c` | lines, borders |
| panel | `#d6c6a0` | secondary background |

**Usage:** 青绿山水 on aged silk: malachite green (and its 40% tint) for mountain washes (≈30% of the painting area); ink for outlines and text; seals in accent2; rule for mount lines.

Contrast (WCAG):

- ink on paper: **11.59:1** — AAA — any text
- muted on paper: **5.23:1** — AA — body text OK
- ink on panel: **9.35:1** — AAA — any text
- accent on paper: **4.32:1** — large text / UI marks only (≥24px or bold ≥19px)
- accent2 on paper: **4.5:1** — AA — body text OK
- #ffffff on accent: **5.88:1** — AA — body text OK
- #ffffff on accent2: **6.12:1** — AA — body text OK

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0 for mounts and square seals; 50% for round seals; seal edges roughened with an SVG displacement filter.
- **Borders:** Mounting only: 12–24px panel-coloured silk border with a 1px ink inner line (隔水); no other boxes.
- **Shadow:** none; depth only through ink-wash tone.

## 材质 Surface — Xuan paper

Rice paper with long soft fibres, faintly visible.

```css
background-color: var(--paper); background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27f%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.015 .35%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23f)%27 opacity=%27.07%27/%3E%3C/svg%3E");
```

## 母题 Motif — Seals (朱文 / 白文)

Square or round seals: 朱文 = red strokes and thin red border on paper; 白文 = paper strokes cut out of a solid red block. Seal text in the CJK display face or SVG; edges roughened with feTurbulence + feDisplacementMap (scale 2–3).

## 动效 Motion — Ink bleed

On the first screen only, ink washes and calligraphy appear by spreading: a radial mask grows from the brush entry point while blur(6px) settles to 0, like ink soaking into xuan paper.

- duration `1200ms`, easing `cubic-bezier(.2,.6,.2,1)`
- prefers-reduced-motion: Show the ink at rest.

## 变数 Twist — 时间为骨 / Time as structure

用真实的时间/日期（营业时间、出炉时刻、日程）作为页面的主结构轴。

## 必须 Must

- At least one red seal (朱文 or 白文), and it is the only saturated colour on its screen.
- On Chinese pages, titles or inscriptions are set vertically (writing-mode: vertical-rl) in a calligraphic CJK face.
- Ink appears in at least three tonal values (e.g. 85/55/12%), after 墨分五色.
- Bare paper (留白) covers at least 40% of the first screen.

## 不要 Must not (branch)

- No pseudo-Asian “chop suey” Latin fonts and no brush-styled Latin text.
- No dragons, lanterns, red-and-gold festival clichés.
- No seal larger than the inscription it signs, except in the seal-as-title anchor.
- No glossy gradients; washes fade into paper, never into colour.

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
/* hash-design 7f18e1dc · ink-and-seal · blue-green-silk */
:root {
  --paper: #e8dcc0;
  --ink: #1f2420;
  --muted: #545a4f;
  --accent: #2f6f62;
  --on-accent: #ffffff;
  --accent2: #ad3b26;
  --on-accent2: #ffffff;
  --rule: #7a6a4c;
  --panel: #d6c6a0;

  --font-display: "Zen Antique", "Liu Jian Mao Cao", "Songti SC", serif;
  --font-body: "Crimson Pro", "Noto Serif SC", Georgia, serif;
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

  --motion-duration: 1200ms;
  --motion-easing: cubic-bezier(.2,.6,.2,1);
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Zen Antique / Crimson Pro (+ Liu Jian Mao Cao / Noto Serif SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Seal as title" anchor, in the "Handscroll (手卷)" layout
- [ ] Copy is written in the "Field notes" voice using only the facts
- [ ] Twist "Time as structure" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4`) reports no critical/major findings
