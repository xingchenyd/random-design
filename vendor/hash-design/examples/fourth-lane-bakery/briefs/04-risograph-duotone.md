# #4 Riso 双色套印 · Risograph duotone

> Riso 孔版印刷的双色套印：荧光粉和联邦蓝两种大豆油墨叠在一起，压出第三种颜色；版位总差一两毫米，平网的颗粒清清楚楚。每个颜色都是一张独立的版，设计就发生在两张版重叠的地方。

| | |
|---|---|
| hash | `bde66a3f031a0742a4a55c569080a96c9b1921916f352d8feecf0ea59aa24b0f` |
| ref | `bde66a3f031a0742a4a55c569080a96c9b1921916f352d8feecf0ea59aa24b0f` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | print |
| references | Hato Press (London) risograph publications; Colorama riso print studio (Berlin); Nieves Books zines (Zurich); Risotto Studio (Glasgow) prints and editions; Tokyo Art Book Fair riso zines |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `bd e6` | branch | 0xbde6 = 48614; 48614 mod 40 = 14 | **risograph-duotone** |
| 2 | `6a` | voice | 0x6a = 106; 106 mod 14 = 8 | **almanac** |
| 3 | `3f` | layout | 0x3f = 63; 63 mod 3 = 0 | **overprint-poster** |
| 4 | `03` | type | 0x03 = 3; 3 mod 3 = 0 | **unbounded-familjen** |
| 5 | `1a` | palette | 0x1a = 26; 26 mod 3 = 2 | **red-green-white** |
| 6 | `07` | density | 0x07 = 7; 7 mod 2 = 1 | **airy** |
| 7 | `42` | motion | 0x42 = 66; 66 mod 3 = 0 | **drum-drift** |
| 8 | `a4` | motif | 0xa4 = 164; 164 mod 3 = 2 | **grain-tints** |
| 9 | `a5` | anchor | 0xa5 = 165; 165 mod 3 = 0 | **overprint-title** |
| 10 | `5c` | scale | 0x5c = 92; 92 mod 3 = 2 | **augmented-fourth** |
| 11 | `56` | surface | 0x56 = 86; 86 mod 3 = 2 | **coarse-screen** |
| 12 | `90` | twist | 0x90 = 144; 144 mod 16 = 0 | **numerals-as-display** |
| 13–31 | `80a96c9b1921…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 历书 / Almanac

黄历/年鉴口吻：宜忌、节令、方位，短句并列，带一点古意但信息准确。

Devices: 宜 / 忌 并列 · 节气或日期 · 四字短语 · 方位与时辰

Example register (do not copy, match the register): “宜：早起、趁热。忌：周一来访。”

## 版式 Layout — Overprint poster

A poster where a giant shape on drum 1 and a giant word on drum 2 overlap; the overlap prints the third colour; small information blocks sit in the corners.

- **Grid:** 8 col; shape layer spans col 1–6, type layer col 3–8, overlapping across 4 columns; corner blocks 2 columns each.
- **Branch grid token:** 8 columns, 16px gutter, 32px margin; artwork lives on two "drum" layers that share the grid, with drum 2 offset 2px 3px from drum 1.

Section order (top → bottom):

1. Top-left corner block: edition or issue number and date in small spot-ink type
2. Overlap field: giant circle or arch on drum 1 crossed by the subject name on drum 2, multiplied where they meet
3. Bottom band: three facts as a 3-column list with 2px spot-ink rules
4. Colophon strip: inks used ("fluorescent pink + federal blue"), paper stock, edition size if given in the facts

**First-screen anchor — Overprint title:** Subject name at 14–20vw in drum-2 ink crossing a giant drum-1 circle; the overlap shows the multiply colour.

## 字体 Typography — Unbounded + Familjen Grotesk

- **Display**: Unbounded 700/800 — fallback `"Arial Black", sans-serif`
- **Body**: Familjen Grotesk 400/600 + italic — fallback `Arial, sans-serif`
- **Mono**: —
- **CJK**: display ZCOOL KuaiLe, body Noto Sans SC
- **Setting rules:** Unbounded 800 headlines, lowercase allowed, tracking -0.03em, line-height 0.92, up to 18vw; headlines always in a spot ink, never ink-black. Familjen Grotesk 400/600 body 17px/1.5; labels 600 uppercase +0.08em at 12px.

Scale: **Augmented fourth 1.414** on a 18px base → -2: 9px · -1: 12.7px · 0: 18px · 1: 25.5px · 2: 36px · 3: 50.9px · 4: 72px · 5: 101.7px · 6: 143.9px · 7: 203.4px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Familjen+Grotesk:ital,wght@0,400;0,600;1,400;1,600&family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;700&display=swap">
```

## 配色 Colour — Bright red + green on white

| token | hex | role |
|---|---|---|
| paper | `#fbfbf8` | page background |
| ink | `#14352a` | primary text |
| muted | `#3f5a4f` | secondary text |
| accent | `#ff665e` | primary accent |
| accent2 | `#00a95c` | secondary accent |
| rule | `#00a95c` | lines, borders |
| panel | `#ffe0dc` | secondary background |

**Usage:** Crisp white stock; bright red for the big shapes, green for type and grain; dark green (both drums overprinted) for body text; at least 45% paper visible.

Contrast (WCAG):

- ink on paper: **12.88:1** — AAA — any text
- muted on paper: **7.27:1** — AAA — any text
- ink on panel: **10.78:1** — AAA — any text
- accent on paper: **2.77:1** — decorative only — never for text
- accent2 on paper: **2.97:1** — decorative only — never for text
- #000000 on accent: **7.31:1** — AAA — any text
- #000000 on accent2: **6.83:1** — AA — body text OK

## 密度 Density — 疏朗 / Airy

大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。 Base 18px, line-height 1.65, spacing unit 10px, section gap 168px, max width 1080px.

## 形状与层次 Shape & depth

- **Radius:** 0 on text boxes; purely graphic shapes may be full circles or semicircles (border-radius: 50% only on shapes that carry no text).
- **Borders:** No black outlines. Rules are 2px in one spot ink. Overlaps use mix-blend-mode: multiply.
- **Shadow:** none. The misregistration offset (drum 2 translated 2px 3px) is the only depth.

## 材质 Surface — Coarse screen

Tint areas printed as a 45° halftone with a 6px cell.

```css
background-image: radial-gradient(var(--accent) 34%, transparent 36%), radial-gradient(var(--accent) 34%, transparent 36%); background-size: 6px 6px; background-position: 0 0, 3px 3px;
```

## 母题 Motif — Grain tints

Every tint is a stochastic grain or coarse halftone of a spot ink at 20–60% coverage, never an opacity fade.

## 动效 Motion — Drum drift

On hover, the drum-2 layer slides from its 2px 3px misregistration into perfect register, then back on leave.

- duration `200ms`, easing `cubic-bezier(.4,0,.2,1)`
- prefers-reduced-motion: Keep the static misregistration; no slide.

## 变数 Twist — 数字即主角 / Numerals as display

页面里所有关键数字（时间、价格、编号）用展示字体、放大到正文 3 倍以上，作为视觉主角。

## 必须 Must

- Exactly two spot inks (accent + accent2) plus paper; any third colour is their multiply overlap.
- The first screen shows at least one visible overprint (mix-blend-mode: multiply) and one deliberate 2–4px misregistration.
- Tints are grain or halftone screens of a spot ink, never opacity fades of black.

## 不要 Must not (branch)

- No pure #000000 and no full-colour (CMYK-style) imagery.
- No gradients between the two inks; transitions only via grain or halftone.
- No drop shadows, outlines in black or glossy effects; riso ink is flat and slightly chalky.

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
/* hash-design bde66a3f · risograph-duotone · red-green-white */
:root {
  --paper: #fbfbf8;
  --ink: #14352a;
  --muted: #3f5a4f;
  --accent: #ff665e;
  --on-accent: #000000;
  --accent2: #00a95c;
  --on-accent2: #000000;
  --rule: #00a95c;
  --panel: #ffe0dc;

  --font-display: Unbounded, "ZCOOL KuaiLe", "Arial Black", sans-serif;
  --font-body: "Familjen Grotesk", "Noto Sans SC", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.563rem; /* 9px */
  --step-n1: 0.796rem; /* 12.7px */
  --step-0: 1.125rem; /* 18px */
  --step-1: 1.591rem; /* 25.5px */
  --step-2: 2.249rem; /* 36px */
  --step-3: 3.181rem; /* 50.9px */
  --step-4: 4.497rem; /* 72px */
  --step-5: 6.359rem; /* 101.7px */
  --step-6: 8.992rem; /* 143.9px */
  --step-7: 12.714rem; /* 203.4px */
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

  --motion-duration: 200ms;
  --motion-easing: cubic-bezier(.4,0,.2,1);
}

html { font-size: 112.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Unbounded / Familjen Grotesk (+ ZCOOL KuaiLe / Noto Sans SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Overprint title" anchor, in the "Overprint poster" layout
- [ ] Copy is written in the "Almanac" voice using only the facts
- [ ] Twist "Numerals as display" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief bde66a3f031a0742a4a55c569080a96c9b1921916f352d8feecf0ea59aa24b0f`) reports no critical/major findings
