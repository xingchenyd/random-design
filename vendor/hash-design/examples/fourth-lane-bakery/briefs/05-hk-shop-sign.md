# #5 港式招牌 · Hong Kong shop sign

> 弥敦道上空横伸出来的招牌、上海老街的竖匾：中文大字为主，英文小一号跟在下面；红底金字、绿底白字、黑漆描金，夜里霓虹灯管沿着同样的笔画勾出来。每块牌都写着铺号、行业、电话——它既是广告，也是门牌。

| | |
|---|---|
| hash | `42c248e73162a7da2749e0b5d090af0e6b391e250e4ab38ffb304698eeeef3e7` |
| ref | `42c248e73162a7da2749e0b5d090af0e6b391e250e4ab38ffb304698eeeef3e7` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | signage |
| references | Nathan Road and Mong Kok projecting neon signs (1960s–2000s); 區建公 Au Kin-kung — hand-written shop-sign calligraphy, Hong Kong; M+ Museum — NEONSIGNS.HK collection and "Mobile M+: NEONSIGNS.HK" (2014); Nanjing Road department stores 先施 Sincere / 永安 Wing On, Shanghai 1920s–30s; Hong Kong pawnshop 押 signs with the bat-and-coin emblem |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `42 c2` | branch | 0x42c2 = 17090; 17090 mod 40 = 10 | **hk-shop-sign** |
| 2 | `48` | voice | 0x48 = 72; 72 mod 14 = 2 | **technical-manual** |
| 3 | `e7` | layout | 0xe7 = 231; 231 mod 3 = 0 | **projecting-stack** |
| 4 | `31` | type | 0x31 = 49; 49 mod 3 = 1 | **brush-signboard** |
| 5 | `62` | palette | 0x62 = 98; 98 mod 3 = 2 | **neon-street** |
| 6 | `a7` | density | 0xa7 = 167; 167 mod 2 = 1 | **regular** |
| 7 | `da` | motion | 0xda = 218; 218 mod 3 = 2 | **lacquer-swap** |
| 8 | `27` | motif | 0x27 = 39; 39 mod 3 = 0 | **vertical-board** |
| 9 | `49` | anchor | 0x49 = 73; 73 mod 3 = 1 | **hanging-vertical** |
| 10 | `e0` | scale | 0xe0 = 224; 224 mod 3 = 2 | **augmented-fourth** |
| 11 | `b5` | surface | 0xb5 = 181; 181 mod 3 = 1 | **gold-leaf-type** |
| 12 | `d0` | twist | 0xd0 = 208; 208 mod 16 = 0 | **numerals-as-display** |
| 13–31 | `90af0e6b391e…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 技术手册 / Technical manual

说明书口吻：编号条款、动词开头、规格写全，零形容词。

Devices: 1.1 / 1.2 编号 · 规格表 · 注意/警告框 · 动词开头的步骤

Example register (do not copy, match the register): “3.2 取货：报预订号 → 核对 → 取走。逾时 30 分钟释放库存。”

## 版式 Layout — Projecting sign stack

A street canyon: vertical boards hang from the right edge at staggered heights while horizontal boards carry the content on the left.

- **Grid:** 12 col, 16px gutter; cols 1–8 content boards; cols 10–12 hold 2–3 vertical boards (1:4) stacked with 24px gaps, each dropped by one-third of the previous; vertical text uses writing-mode: vertical-rl.
- **Branch grid token:** Sign-board grid: content is built from boards — horizontal boards 3:1 to 5:1, vertical boards 1:3 to 1:5. One CJK character = one square cell (1em × 1em) with a 0.12em gutter, so a board is N characters wide plus 2 × 0.4em frame.

Section order (top → bottom):

1. Vertical shop-name board at the right, 4–6 characters, gold on red, upright characters
2. Horizontal trade board at the left: what the place sells, English line beneath at ⅓ size
3. Shop-number roundel + address line (地铺 / 1/F / street number from the facts)
4. Price or service list as a lacquered board: items left, prices right in lining figures
5. Hours and phone on a narrow green strip board; footer repeats the name as a neon outline

**First-screen anchor — Hanging vertical:** A tall 1:4 vertical board hangs at the right, cut off by the top of the viewport as seen from the pavement, beside a horizontal trade board.

## 字体 Typography — Ma Shan Zheng + Antonio + Hanken Grotesk

- **Display**: Antonio 600/700 — fallback `"Arial Narrow", sans-serif`
- **Body**: Hanken Grotesk 400/600 — fallback `Arial, sans-serif`
- **Mono**: —
- **CJK**: display Ma Shan Zheng, body Noto Sans TC
- **Setting rules:** Brush characters (Ma Shan Zheng, single weight) at 120–200px, tracking 0.05em, one board = one phrase. English in Antonio 700 uppercase +0.04em at ⅓ of the CJK size, like the small English on a Mong Kok sign. Prices in Antonio 600 with the currency sign at 60%.

Scale: **Augmented fourth 1.414** on a 17px base → -2: 8.5px · -1: 12px · 0: 17px · 1: 24px · 2: 34px · 3: 48.1px · 4: 68px · 5: 96.1px · 6: 135.9px · 7: 192.1px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@600;700&family=Hanken+Grotesk:wght@400;600&family=Ma+Shan+Zheng&family=Noto+Sans+TC:wght@400;700&display=swap">
```

## 配色 Colour — Neon street at night

| token | hex | role |
|---|---|---|
| paper | `#120d0c` | page background |
| ink | `#f3ead8` | primary text |
| muted | `#a99c8a` | secondary text |
| accent | `#ff3b5c` | primary accent |
| accent2 | `#36d6c3` | secondary accent |
| rule | `#3a2e2a` | lines, borders |
| panel | `#1e1715` | secondary background |

**Usage:** Warm near-black street; neon tubes in pink (accent) and teal (accent2) as 3–4px strokes and outline text only (≤ 10% of pixels); boards are panel brown-black with cream characters.

Contrast (WCAG):

- ink on paper: **16.14:1** — AAA — any text
- muted on paper: **7.17:1** — AAA — any text
- ink on panel: **14.78:1** — AAA — any text
- accent on paper: **5.54:1** — AA — body text OK
- accent2 on paper: **10.62:1** — AAA — any text
- #000000 on accent: **6.03:1** — AA — body text OK
- #000000 on accent2: **11.56:1** — AAA — any text

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 for all boards. Only the shop-number roundel is a circle (border-radius: 50%); neon tubes use stroke-linecap: round and stroke-linejoin: round.
- **Borders:** Boards are framed: 0.4em solid var(--accent2) outer frame plus a 2px inner line (outline: 2px solid var(--accent2); outline-offset: -10px). Section rules 3px solid var(--ink).
- **Shadow:** none on boards. Neon tubes may carry a tight 0 0 2px edge of their own colour (max 3px blur) — never a halo.

## 材质 Surface — Gold-leaf characters

Characters in flat gold with a 1px darker edge — no metallic gradients.

```css
color: var(--accent2); -webkit-text-stroke: 1px color-mix(in srgb, var(--accent2) 70%, black);
```

## 母题 Motif — Vertical board

Tall boards with upright CJK characters (writing-mode: vertical-rl; text-orientation: upright), a gold double frame, and small English running along the bottom edge.

## 动效 Motion — Lacquer swap

No movement. Hovering a board swaps gold ↔ red (frame and characters reverse), like a night-lit board.

- duration `0ms`, easing `steps(1, end)`
- prefers-reduced-motion: Same — it is a colour swap only.

## 变数 Twist — 数字即主角 / Numerals as display

页面里所有关键数字（时间、价格、编号）用展示字体、放大到正文 3 倍以上，作为视觉主角。

## 必须 Must

- Chinese characters are the largest element on every board; English never exceeds 40% of the CJK size.
- At least one vertical board using writing-mode: vertical-rl with upright characters.
- Every sign carries a concrete address element from the facts: shop number, floor, street or phone.
- Neon is drawn as line work — the path of the tube is visible.

## 不要 Must not (branch)

- No glow blobs, blurred halos or text-shadow larger than 4px; no cyberpunk gradients.
- No sideways-rotated Chinese in vertical text.
- No Latin-only boards; every board is bilingual or Chinese-only.
- No faux-oriental "chop suey" Latin typefaces.

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
/* hash-design 42c248e7 · hk-shop-sign · neon-street */
:root {
  --paper: #120d0c;
  --ink: #f3ead8;
  --muted: #a99c8a;
  --accent: #ff3b5c;
  --on-accent: #000000;
  --accent2: #36d6c3;
  --on-accent2: #000000;
  --rule: #3a2e2a;
  --panel: #1e1715;

  --font-display: Antonio, "Ma Shan Zheng", "Arial Narrow", sans-serif;
  --font-body: "Hanken Grotesk", "Noto Sans TC", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.531rem; /* 8.5px */
  --step-n1: 0.751rem; /* 12px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.502rem; /* 24px */
  --step-2: 2.124rem; /* 34px */
  --step-3: 3.004rem; /* 48.1px */
  --step-4: 4.247rem; /* 68px */
  --step-5: 6.006rem; /* 96.1px */
  --step-6: 8.492rem; /* 135.9px */
  --step-7: 12.008rem; /* 192.1px */
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
  --motion-easing: steps(1, end);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Antonio / Hanken Grotesk (+ Ma Shan Zheng / Noto Sans TC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Hanging vertical" anchor, in the "Projecting sign stack" layout
- [ ] Copy is written in the "Technical manual" voice using only the facts
- [ ] Twist "Numerals as display" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 42c248e73162a7da2749e0b5d090af0e6b391e250e4ab38ffb304698eeeef3e7`) reports no critical/major findings
