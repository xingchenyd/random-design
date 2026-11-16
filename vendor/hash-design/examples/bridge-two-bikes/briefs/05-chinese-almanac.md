# #5 老黄历 · Chinese almanac

> 老通书与撕页黄历：米黄纸上红黑两色套印，竖排文字从右往左读，干支纪日的方框、宜与忌对开的格子、角上一方朱印；月份牌则把节气与日期框进木刻花边。每一项都有固定的位置，读者凭位置就知道去哪里找。

| | |
|---|---|
| hash | `67d7ad9674f570e3e07cbb0c1f19b566c77b87bc276073a8351bf230f4054d01` |
| ref | `67d7ad9674f570e3e07cbb0c1f19b566c77b87bc276073a8351bf230f4054d01+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | craft |
| references | 通书 / 通勝 almanacs, Qing woodblock editions and Hong Kong 蔡真步堂 editions; 《時憲書》 Qing imperial calendar, woodblock printed; 撕页日历 tear-off daily calendars, mainland China 1960s–90s; 月份牌 Shanghai calendar posters — 郑曼陀, 杭穉英 (1910s–30s); 《芥子园画传》 woodblock page frames and fish-tail 版心 |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `67 d7` | branch | 0x67d7 = 26583; 26583 mod 40 = 23; collision → +1 = 24 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **chinese-almanac** |
| 2 | `ad` | voice | 0xad = 173; 173 mod 14 = 5 | **recipe-method** |
| 3 | `96` | layout | 0x96 = 150; 150 mod 3 = 0 | **tear-off-day** |
| 4 | `74` | type | 0x74 = 116; 116 mod 3 = 2 | **yuefenpai-deco** |
| 5 | `f5` | palette | 0xf5 = 245; 245 mod 3 = 2 | **celadon-poster** |
| 6 | `70` | density | 0x70 = 112; 112 mod 2 = 0 | **regular** |
| 7 | `e3` | motion | 0xe3 = 227; 227 mod 3 = 2 | **ink-soak** |
| 8 | `e0` | motif | 0xe0 = 224; 224 mod 3 = 2 | **cinnabar-seal** |
| 9 | `7c` | anchor | 0x7c = 124; 124 mod 3 = 1 | **yi-ji-split** |
| 10 | `bb` | scale | 0xbb = 187; 187 mod 3 = 1 | **perfect-fifth** |
| 11 | `0c` | surface | 0x0c = 12; 12 mod 3 = 0 | **rice-paper** |
| 12 | `1f` | twist | 0x1f = 31; 31 mod 16 = 15 | **oversized-rule** |
| 13–31 | `19b566c77b87…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 配方步骤 / Recipe method

配方书写法：配料清单 + 有序步骤 + 时间/温度，任何介绍都写成"做法"。

Devices: 配料清单（数量对齐） · 编号步骤 · 时间与温度 · 小贴士

Example register (do not copy, match the register): “① 前一晚 21:00 喂酵种 ② 次日 06:00 入炉 ③ 230°C 烤 40 分钟。”

## 版式 Layout — Tear-off day sheet

The page is one daily sheet: a giant date numeral, lunar/ganzhi columns at its sides, 宜/忌 boxes at the foot; further sections are the following sheets.

- **Grid:** Sheet 3:4 portrait, max 720px; header band 15%; numeral zone 55% flanked by two 18%-wide vertical columns; 宜 | 忌 halves in the bottom 25%.
- **Branch grid token:** Woodblock page grid: a framed block (版框) divided into vertical columns (行) of 1em + 0.5em with 1px dividers (界栏), read right to left with writing-mode: vertical-rl; horizontal Latin blocks outside the frame on a 12-col, 16px-gutter grid.

Section order (top → bottom):

1. Header band: Gregorian year and month, weekday; red for Sundays and holidays
2. Giant date numeral (a key date or number from the facts) between vertical columns: 农历 date, 干支, solar term
3. 宜 / 忌 boxes: 宜 lists what to do (offers, actions from the facts), 忌 lists constraints
4. Bottom strip: one short line from the facts, and a perforation line
5. Following sheets stacked below, one per section, each with its own date box

**First-screen anchor — 宜/忌 split:** The first screen is the split: 宜 and 忌 at 20vw, each heading a list of facts.

## 字体 Typography — ZCOOL XiaoWei + Limelight

- **Display**: Limelight 400 — fallback `"Didot", Georgia, serif`
- **Body**: Cormorant Garamond 500/600 — fallback `Garamond, Georgia, serif`
- **Mono**: —
- **CJK**: display ZCOOL XiaoWei, body Noto Serif SC
- **Setting rules:** 1930s Shanghai poster voice: ZCOOL XiaoWei for the issuer’s name and month names, tracking 0.1em; Limelight for Latin (issuer name, month abbreviations) uppercase +0.06em and for numerals inside the month blocks. Chinese body Noto Serif SC 16px/1.8.

Scale: **Perfect fifth 1.5** on a 17px base → -2: 7.6px · -1: 11.3px · 0: 17px · 1: 25.5px · 2: 38.3px · 3: 57.4px · 4: 86.1px · 5: 129.1px · 6: 193.6px · 7: 290.5px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Cormorant+Garamond:wght@500;600&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;700&display=swap">
```

## 配色 Colour — Celadon poster

| token | hex | role |
|---|---|---|
| paper | `#e6eee5` | page background |
| ink | `#1d2420` | primary text |
| muted | `#4a554e` | secondary text |
| accent | `#2f7a5f` | primary accent |
| accent2 | `#c95a45` | secondary accent |
| rule | `#8fa79a` | lines, borders |
| panel | `#f5efe2` | secondary background |

**Usage:** 月份牌 pastel: celadon ground; cream panels for calendar blocks; jade for borders and month names; persimmon accent2 for dates and the seal; ink for text.

Contrast (WCAG):

- ink on paper: **13.37:1** — AAA — any text
- muted on paper: **6.56:1** — AA — body text OK
- ink on panel: **13.83:1** — AAA — any text
- accent on paper: **4.36:1** — large text / UI marks only (≥24px or bold ≥19px)
- accent2 on paper: **3.52:1** — large text / UI marks only (≥24px or bold ≥19px)
- #ffffff on accent: **5.16:1** — AA — body text OK
- #000000 on accent2: **5.03:1** — AA — body text OK

## 密度 Density — 常规 / Regular

常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。 Base 17px, line-height 1.55, spacing unit 8px, section gap 112px, max width 1200px.

## 形状与层次 Shape & depth

- **Radius:** 0. Seals are squares or circles; nothing else is round.
- **Borders:** Frame: 4px solid var(--ink) outer + 1px inner line 5px inside (outline: 1px solid var(--ink); outline-offset: -9px); column dividers 1px solid var(--rule); 宜/忌 boxes 2px solid var(--accent).
- **Shadow:** none. Ink only; seal edges may be roughened with an SVG filter, never shadowed.

## 材质 Surface — Rice paper

Thin rice paper with faint diagonal fibres and specks.

```css
background-color: var(--paper); background-image: repeating-linear-gradient(105deg, rgba(120,90,40,.035) 0 1px, transparent 1px 7px), radial-gradient(rgba(120,90,40,.05) 1px, transparent 1.5px); background-size: auto, 5px 5px;
```

## 母题 Motif — Cinnabar seal

A square cinnabar seal (red fill with white relief characters, or red outline intaglio) carrying 2–4 characters from the facts, edge roughened via feTurbulence + feDisplacementMap.

## 动效 Motion — Ink soak

Red characters print first at 60% opacity with blur(0.6px) and settle to crisp full ink, like ink soaking into paper.

- duration `300ms`, easing `ease-out`
- prefers-reduced-motion: Rendered crisp immediately.

## 变数 Twist — 粗线分区 / Oversized rules

至少一条 8px 以上的粗线（或双线）作为主分区手段，替代空白。

## 必须 Must

- At least one block set vertically (writing-mode: vertical-rl) and read right to left.
- Two inks dominate: black + red make up ≥ 90% of the non-paper colour (light palettes).
- A 宜/忌 or date-box structure organises the facts.
- Calendrical dates in Chinese numerals when the content is Chinese.

## 不要 Must not (branch)

- No fortune-telling or invented auspicious judgements — 宜/忌 hold practical do / avoid items from the facts.
- No dragons, lanterns or clip-art "Chinese" decoration; ornament is frames, fish-tails and seals.
- No sideways-rotated Chinese characters in vertical text.
- No gradient gold or 3D metallic effects.

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
/* hash-design 67d7ad96 · chinese-almanac · celadon-poster */
:root {
  --paper: #e6eee5;
  --ink: #1d2420;
  --muted: #4a554e;
  --accent: #2f7a5f;
  --on-accent: #ffffff;
  --accent2: #c95a45;
  --on-accent2: #000000;
  --rule: #8fa79a;
  --panel: #f5efe2;

  --font-display: Limelight, "ZCOOL XiaoWei", "Didot", Georgia, serif;
  --font-body: "Cormorant Garamond", "Noto Serif SC", Garamond, Georgia, serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.472rem; /* 7.6px */
  --step-n1: 0.708rem; /* 11.3px */
  --step-0: 1.063rem; /* 17px */
  --step-1: 1.594rem; /* 25.5px */
  --step-2: 2.391rem; /* 38.3px */
  --step-3: 3.586rem; /* 57.4px */
  --step-4: 5.379rem; /* 86.1px */
  --step-5: 8.068rem; /* 129.1px */
  --step-6: 12.103rem; /* 193.6px */
  --step-7: 18.154rem; /* 290.5px */
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
  --motion-easing: ease-out;
}

html { font-size: 106.3%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Limelight / Cormorant Garamond (+ ZCOOL XiaoWei / Noto Serif SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "宜/忌 split" anchor, in the "Tear-off day sheet" layout
- [ ] Copy is written in the "Recipe method" voice using only the facts
- [ ] Twist "Oversized rules" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief 67d7ad9674f570e3e07cbb0c1f19b566c77b87bc276073a8351bf230f4054d01+1`) reports no critical/major findings
