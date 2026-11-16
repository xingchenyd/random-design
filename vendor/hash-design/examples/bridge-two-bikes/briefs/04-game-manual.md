# #4 游戏说明书 · Game manual

> 8 位与 16 位游戏的说明书和像素界面：双线边框的对话框、HP/MP 条、手柄按键示意图、道具清单，以及有限的调色板——Game Boy 的四阶绿、FC 的 54 色。限制让每一个像素都有意义。

| | |
|---|---|
| hash | `40257aad1bad4bda9c195b35779c75d0dc3ba971b03c888c15bdc1e83321779a` |
| ref | `40257aad1bad4bda9c195b35779c75d0dc3ba971b03c888c15bdc1e83321779a` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | screen |
| references | Nintendo Entertainment System instruction booklets (1985–94); Dragon Quest / Dragon Warrior (Enix, 1986) command windows; Nintendo Game Boy DMG-01 (1989) screen and manuals; Final Fantasy VI (Square, 1994) menu screens; Nintendo Power magazine maps and strategy pages (1988–) |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `40 25` | branch | 0x4025 = 16421; 16421 mod 40 = 21 | **game-manual** |
| 2 | `7a` | voice | 0x7a = 122; 122 mod 14 = 10 | **interview-qa** |
| 3 | `ad` | layout | 0xad = 173; 173 mod 3 = 2 | **strategy-guide** |
| 4 | `1b` | type | 0x1b = 27; 27 mod 3 = 0 | **press-start-chakra** |
| 5 | `ad` | palette | 0xad = 173; 173 mod 3 = 2 | **title-screen-black** |
| 6 | `4b` | density | 0x4b = 75; 75 mod 2 = 1 | **regular** |
| 7 | `da` | motion | 0xda = 218; 218 mod 3 = 2 | **bar-fill** |
| 8 | `9c` | motif | 0x9c = 156; 156 mod 3 = 0 | **double-border-window** |
| 9 | `19` | anchor | 0x19 = 25; 25 mod 3 = 1 | **dialogue-open** |
| 10 | `5b` | scale | 0x5b = 91; 91 mod 2 = 1 | **perfect-fourth** |
| 11 | `35` | surface | 0x35 = 53; 53 mod 3 = 2 | **ordered-dither** |
| 12 | `77` | twist | 0x77 = 119; 119 mod 16 = 7 | **numbered-sections** |
| 13–31 | `9c75d0dc3ba9…` | (unused) | recorded, not used | — |

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

## 版式 Layout — Strategy-guide spread

A Nintendo Power-style spread: a world map drawn as tiles with numbered callouts and a sidebar of matching tip boxes.

- **Grid:** 12-col spread; map panel 8 col × 6 rows of 48px tiles; sidebar 4 col with numbered tip boxes; callouts as 32px squares.
- **Branch grid token:** Tile grid: 8px tiles scaled ×3 (24px) on desktop, ×2 (16px) on mobile; every size, gap and border is a multiple of the scaled pixel; a screen is 32 × 28 tiles (NES 256 × 224).

Section order (top → bottom):

1. Title band with a stage number ("WORLD 1-1" pattern used for section numbering)
2. Tile map with numbered callouts over it
3. Numbered tip boxes matching the callouts
4. Stats table for the facts that have real numbers
5. A "secret" note at the bottom in a dashed box

**First-screen anchor — Dialogue opening:** A full-width dialogue box in the lower third with a name tag, typing the first fact, under a small pixel scene drawn in CSS/SVG.

## 字体 Typography — Press Start 2P + Chakra Petch

- **Display**: Press Start 2P 400 — fallback `"Courier New", monospace`
- **Body**: Chakra Petch 400/600 — fallback `Arial, sans-serif`
- **Mono**: —
- **CJK**: display ZCOOL QingKe HuangYou, body Noto Sans SC
- **Setting rules:** Press Start 2P only at multiples of 8px (16/24/32/48), uppercase, line-height 1.5, never for paragraphs; -webkit-font-smoothing: none. Chakra Petch for booklet text 16–17px/1.5, 600 for button names (A, B, START, SELECT).

Scale: **Perfect fourth 1.333** on a 17px base → -2: 9.6px · -1: 12.8px · 0: 17px · 1: 22.7px · 2: 30.2px · 3: 40.3px · 4: 53.7px · 5: 71.5px · 6: 95.4px · 7: 127.1px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Chakra+Petch:wght@400;600&family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@400;700&display=swap">
```

## 配色 Colour — Title-screen black

| token | hex | role |
|---|---|---|
| paper | `#111010` | page background |
| ink | `#fcfcfc` | primary text |
| muted | `#a4a4a4` | secondary text |
| accent | `#fca044` | primary accent |
| accent2 | `#3cbcfc` | secondary accent |
| rule | `#7c7c7c` | lines, borders |
| panel | `#000000` | secondary background |

**Usage:** Black title screen; white text; orange for the title and selected menu item; sky blue for bars and the ▼ prompt; windows pure black with a white double border.

Contrast (WCAG):

- ink on paper: **18.52:1** — AAA — any text
- muted on paper: **7.62:1** — AAA — any text
- ink on panel: **20.47:1** — AAA — any text
- accent on paper: **9.27:1** — AAA — any text
- accent2 on paper: **8.86:1** — AAA — any text
- #000000 on accent: **10.25:1** — AAA — any text
- #000000 on accent2: **9.79:1** — AAA — any text

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0 — window corners are notched by one scaled pixel with clip-path polygon, never CSS-rounded.
- **Borders:** Windows: double border — 3px line, 3px gap, 3px line (border: 9px double var(--ink); on dark windows border-color: var(--paper)); image-rendering: pixelated on every bitmap.
- **Shadow:** Hard one-tile drop (8px 8px 0 var(--rule)) on screenshot boxes only; no blur anywhere.

## 材质 Surface — Ordered dither

A 2×2 checker dither between two palette colours — the only permitted "gradient".

```css
background-image: conic-gradient(var(--accent) 25%, var(--panel) 0 50%, var(--accent) 0 75%, var(--panel) 0); background-size: 4px 4px; image-rendering: pixelated;
```

## 母题 Motif — Double-border window

Dialogue and command windows: solid fill, double border (3px line, 3px gap, 3px line), notched corners, ▶ cursor and ▼ prompt drawn as pixel triangles.

## 动效 Motion — Bar fill

Stat bars showing real values fill tile by tile on load, one step per 8px segment.

- duration `600ms`, easing `steps(12, end)`
- prefers-reduced-motion: Bars drawn at their final value.

## 变数 Twist — 分节编号 / Numbered sections

每个区块有显眼的编号（§1、No.2、03…），编号本身是设计元素。

## 必须 Must

- All sizes, gaps and borders are multiples of the scaled pixel/tile.
- No more than four colours in any one screen area.
- At least one double-border window with a ▶ cursor or ▼ prompt.
- Pixel fonts only at native multiples; long text uses the body face.

## 不要 Must not (branch)

- No anti-aliased or fractionally scaled pixel art; image-rendering: pixelated.
- No real console logos, trademarked characters or sprites from actual games.
- No gradients except a two-colour ordered dither.
- Stat bars never show invented numbers.

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
/* hash-design 40257aad · game-manual · title-screen-black */
:root {
  --paper: #111010;
  --ink: #fcfcfc;
  --muted: #a4a4a4;
  --accent: #fca044;
  --on-accent: #000000;
  --accent2: #3cbcfc;
  --on-accent2: #000000;
  --rule: #7c7c7c;
  --panel: #000000;

  --font-display: "Press Start 2P", "ZCOOL QingKe HuangYou", "Courier New", monospace;
  --font-body: "Chakra Petch", "Noto Sans SC", Arial, sans-serif;
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

  --motion-duration: 600ms;
  --motion-easing: steps(12, end);
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Press Start 2P / Chakra Petch (+ ZCOOL QingKe HuangYou / Noto Sans SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Dialogue opening" anchor, in the "Strategy-guide spread" layout
- [ ] Copy is written in the "Interview Q&A" voice using only the facts
- [ ] Twist "Numbered sections" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 40257aad1bad4bda9c195b35779c75d0dc3ba971b03c888c15bdc1e83321779a`) reports no critical/major findings
