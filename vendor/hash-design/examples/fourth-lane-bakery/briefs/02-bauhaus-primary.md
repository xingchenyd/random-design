# #2 包豪斯 · Bauhaus primary

> 包豪斯的基本形与三原色：康定斯基的黄三角、红方块、蓝圆，再加黑色粗条和圆点做骨架。拜尔的通用字体、莫霍利-纳吉的版式、阿尔伯斯的色彩练习——不对称的平衡，几何无衬线，像教学挂图一样清楚。

| | |
|---|---|
| hash | `4f1cc0f2c8334072b6f033983e1687912da5d7ba471cb7c6dc4187b421696503` |
| ref | `4f1cc0f2c8334072b6f033983e1687912da5d7ba471cb7c6dc4187b421696503` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | modernist |
| references | Herbert Bayer, Universal alphabet (1925) and Bauhaus exhibition posters; László Moholy-Nagy, Bauhausbücher covers (1925–1930); Joost Schmidt, poster for the Bauhaus Exhibition Weimar (1923); Josef Albers, Interaction of Color (1963) and Homage to the Square; Wassily Kandinsky, form–colour questionnaire (1923) |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `4f 1c` | branch | 0x4f1c = 20252; 20252 mod 40 = 12 | **bauhaus-primary** |
| 2 | `c0` | voice | 0xc0 = 192; 192 mod 14 = 10 | **interview-qa** |
| 3 | `f2` | layout | 0xf2 = 242; 242 mod 3 = 2 | **bauhausbuch-cover** |
| 4 | `c8` | type | 0xc8 = 200; 200 mod 3 = 2 | **spartan-kumbh** |
| 5 | `33` | palette | 0x33 = 51; 51 mod 3 = 0 | **primaries-on-cream** |
| 6 | `40` | density | 0x40 = 64; 64 mod 2 = 0 | **regular** |
| 7 | `72` | motion | 0x72 = 114; 114 mod 3 = 0 | **form-turn** |
| 8 | `b6` | motif | 0xb6 = 182; 182 mod 3 = 2 | **albers-squares** |
| 9 | `f0` | anchor | 0xf0 = 240; 240 mod 3 = 0 | **form-composition** |
| 10 | `33` | scale | 0x33 = 51; 51 mod 3 = 0 | **perfect-fourth** |
| 11 | `98` | surface | 0x98 = 152; 152 mod 3 = 2 | **cut-card** |
| 12 | `3e` | twist | 0x3e = 62; 62 mod 16 = 14 | **footer-as-colophon** |
| 13–31 | `1687912da5d7…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 问答访谈 / Interview Q&A

访谈稿：问句短，答句是当事人的原话风格，具体、口语、有细节。

Devices: 问：/答： · 引语 · 具体人名/时间 · 一句停顿或笑声注

Example register (do not copy, match the register): “问：为什么周一休息？答：酵种也要歇一天。”

## 版式 Layout — Bauhausbuch cover

Bauhausbücher-style: a cover of heavy horizontal bars and one huge numeral or initial, then strict two-column interior pages.

- **Grid:** 6 col, 24px gutter, 40px margin; bars 16px tall spanning 4–6 columns at staggered starts; interior text in 2 columns of 3.
- **Branch grid token:** 12 columns, 16px gutter, 32px margins; 8px baseline; compositions balance on an off-centre vertical axis at 5/12 or 7/12 (or a 30° diagonal), never at 6/12.

Section order (top → bottom):

1. Cover: 2–3 horizontal black bars, one huge numeral or initial, title set between the bars
2. Contents: list where bar length encodes size/duration/price
3. Two-column body with section heads set on a coloured square
4. Back cover: imprint-style colophon with contact

**First-screen anchor — Form composition:** The first screen is an asymmetric arrangement of the three forms at large size (largest ≈45vw) with the headline set across one of them.

## 字体 Typography — League Spartan + Kumbh Sans

- **Display**: League Spartan 700/900 — fallback `Futura, Arial, sans-serif`
- **Body**: Kumbh Sans 400/600 — fallback `Arial, sans-serif`
- **Mono**: —
- **CJK**: display ZCOOL QingKe HuangYou, body Noto Sans SC
- **Setting rules:** League Spartan 900 for blocky headlines set against or inside the bars, tracking -0.02em, line-height 0.9, uppercase allowed. Kumbh Sans body 16/1.55, 600 for labels.

Scale: **Perfect fourth 1.333** on a 17px base → -2: 9.6px · -1: 12.8px · 0: 17px · 1: 22.7px · 2: 30.2px · 3: 40.3px · 4: 53.7px · 5: 71.5px · 6: 95.4px · 7: 127.1px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;900&family=Kumbh+Sans:wght@400;600&family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@400;700&display=swap">
```

## 配色 Colour — Primaries on cream

| token | hex | role |
|---|---|---|
| paper | `#f1ece0` | page background |
| ink | `#1b1b1b` | primary text |
| muted | `#55524a` | secondary text |
| accent | `#d6261c` | primary accent |
| accent2 | `#1f4fa3` | secondary accent |
| rule | `#1b1b1b` | lines, borders |
| panel | `#f2c21b` | secondary background |

**Usage:** Cream paper; black bars and type. Red square, blue circle and yellow triangle each appear at least once; yellow panel is the largest colour area (≤20%), red ≤10%, blue ≤10%.

Contrast (WCAG):

- ink on paper: **14.61:1** — AAA — any text
- muted on paper: **6.62:1** — AA — body text OK
- ink on panel: **10.26:1** — AAA — any text
- accent on paper: **4.29:1** — large text / UI marks only (≥24px or bold ≥19px)
- accent2 on paper: **6.58:1** — AA — body text OK
- #ffffff on accent: **5.06:1** — AA — body text OK
- #ffffff on accent2: **7.76:1** — AAA — any text

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 for rectangles; 50% only for true circles (dots, discs); triangles via clip-path: polygon().
- **Borders:** 12–24px solid ink bars as structural dividers (only at 0° or 90°); 2px ink for small boxes; no hairlines.
- **Shadow:** none.

## 材质 Surface — Cut card

Shapes look cut from coloured card; where two overlap, the intersection multiplies.

```css
mix-blend-mode: multiply; /* on overlapping shapes */
```

## 母题 Motif — Albers squares

Nested squares in Homage-to-the-Square proportions (10:8:6:4 units, inner squares dropped toward the bottom) as an image stand-in or section mark.

## 动效 Motion — Form turn

On hover a primary shape turns 90° (square) or 120° (triangle) in one mechanical move, like a piece of Alma Siedhoff-Buscher’s Bauhaus building game.

- duration `300ms`, easing `cubic-bezier(.5,0,.2,1)`
- prefers-reduced-motion: No rotation; swap the shape’s colour instead.

## 变数 Twist — 版权页式页脚 / Footer as colophon

页脚写成书籍版权页：字体、纸张/配色、印次、地址等，是全页信息最密的区块。

## 必须 Must

- At least two of the three elementary forms appear in primary colours.
- The composition is asymmetric: main axis at 5/12 or 7/12 (or a diagonal), never at 6/12.
- Headlines in a geometric sans; with the universal option, no capitals at all.

## 不要 Must not (branch)

- No secondary or tertiary colours (purple, green, orange, pink) — only black, white/cream/grey and the primaries.
- No gradients and no rounded rectangles — only true circles and sharp polygons.
- No pictogram icons; shapes stay abstract.
- No centred, symmetrical hero.

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
/* hash-design 4f1cc0f2 · bauhaus-primary · primaries-on-cream */
:root {
  --paper: #f1ece0;
  --ink: #1b1b1b;
  --muted: #55524a;
  --accent: #d6261c;
  --on-accent: #ffffff;
  --accent2: #1f4fa3;
  --on-accent2: #ffffff;
  --rule: #1b1b1b;
  --panel: #f2c21b;

  --font-display: "League Spartan", "ZCOOL QingKe HuangYou", Futura, Arial, sans-serif;
  --font-body: "Kumbh Sans", "Noto Sans SC", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.598rem; /* 9.6px */
  --step-n1: 0.797rem; /* 12.8px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.416rem; /* 22.7px */
  --step-2: 1.888rem; /* 30.2px */
  --step-3: 2.517rem; /* 40.3px */
  --step-4: 3.355rem; /* 53.7px */
  --step-5: 4.472rem; /* 71.5px */
  --step-6: 5.961rem; /* 95.4px */
  --step-7: 7.946rem; /* 127.1px */
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
  --motion-easing: cubic-bezier(.5,0,.2,1);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: League Spartan / Kumbh Sans (+ ZCOOL QingKe HuangYou / Noto Sans SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Form composition" anchor, in the "Bauhausbuch cover" layout
- [ ] Copy is written in the "Interview Q&A" voice using only the facts
- [ ] Twist "Footer as colophon" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 4f1cc0f2c8334072b6f033983e1687912da5d7ba471cb7c6dc4187b421696503`) reports no critical/major findings
