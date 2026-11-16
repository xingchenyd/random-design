# #3 票根 · Ticket stub

> 剧院、铁路与电影院的票据：存根和票身之间一条打孔线，流水号、排号、座号、日期都关在小格子里，底下压着防伪扭索纹。信息很密，但每一项都有固定位置；撕下来的那一半，就是凭证。

| | |
|---|---|
| hash | `a49063502037857ce8846937fc2524f991fdbcb094a46c682d1c676cae47326b` |
| ref | `a49063502037857ce8846937fc2524f991fdbcb094a46c682d1c676cae47326b+1` |
| algorithm / library | hash-design/v1 / `c7b166fe6ec0` |
| constraints | none |
| family | document |
| references | Edmondson railway card tickets (1840s–1990, British Rail); Broadway hard tickets & Ticketron stubs (1970s–80s); Globe Ticket Co. "ADMIT ONE" roll tickets; 中国铁路硬板票与红色软纸火车票; Odeon cinema tickets (1950s) |

**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。

## 映射过程 Mapping trace

| bytes | hex | dimension | rule | → result |
|---|---|---|---|---|
| 0+1 | `a4 90` | branch | 0xa490 = 42128; 42128 mod 40 = 8; collision → +1 = 9 _(primary branch (or its family) already used in this roll; walked forward 1 step(s))_ | **ticket-stub** |
| 2 | `63` | voice | 0x63 = 99; 99 mod 14 = 1 | **field-notes** |
| 3 | `50` | layout | 0x50 = 80; 80 mod 3 = 2 | **oversized-card** |
| 4 | `20` | type | 0x20 = 32; 32 mod 3 = 2 | **bevan-oldstandard** |
| 5 | `37` | palette | 0x37 = 55; 55 mod 3 = 1 | **buff-railway-card** |
| 6 | `85` | density | 0x85 = 133; 133 mod 2 = 1 | **packed** |
| 7 | `7c` | motion | 0x7c = 124; 124 mod 3 = 1 | **dating-press** |
| 8 | `e8` | motif | 0xe8 = 232; 232 mod 3 = 1 | **guilloche** |
| 9 | `84` | anchor | 0x84 = 132; 132 mod 3 = 0 | **admit-one** |
| 10 | `69` | scale | 0x69 = 105; 105 mod 3 = 0 | **perfect-fourth** |
| 11 | `37` | surface | 0x37 = 55; 55 mod 3 = 1 | **security-paper** |
| 12 | `fc` | twist | 0xfc = 252; 252 mod 16 = 12 | **no-button-above-fold** |
| 13–31 | `2524f991fdbc…` | (unused) | recorded, not used | — |

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

## 文案语气 Voice — 田野笔记 / Field notes

观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。

Devices: 日期/时间戳 · 度量单位 · "观察到…"式陈述 · 括号补充

Example register (do not copy, match the register): “06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。”

## 版式 Layout — Oversized card ticket

The first screen is one enormous Edmondson card ticket (57:30) with FROM → TO, class, fare and a dating-press stamp; the rest of the page reads as its reverse side.

- **Grid:** Card max 1100px at 1.9:1 with an internal 12-col cell grid and 1px rules; the reverse side below uses 2 columns at 1:2.
- **Branch grid token:** Ticket module at a 4:1 ratio (e.g. 960×240): body 75% + stub 25%; inside, an 8-column cell grid with 1px rules; the page is a stack of modules with 24px gaps.

Section order (top → bottom):

1. Card front: issuing company small caps at top, FROM → TO huge, class and fare in cells, serial top-right
2. Dating-press stamp: the date embossed at −8° overprinting a corner of the card
3. Reverse side: conditions of issue in two narrow columns of 11px type
4. Timetable or fare table with dot leaders
5. Inspector's clip: a bite-shaped notch cut from one edge of the card

**First-screen anchor — Admit-one ticket:** The first screen is one huge ticket (body + stub) with the subject as the event title and the real date/time in the stub.

## 字体 Typography — Bevan + Old Standard TT

- **Display**: Bevan 400 — fallback `Rockwell, Georgia, serif`
- **Body**: Old Standard TT 400/700 + italic — fallback `Georgia, serif`
- **Mono**: —
- **CJK**: display ZCOOL XiaoWei, body Noto Serif SC
- **Setting rules:** Theatre hard-ticket voice. Bevan for the production title in upper/lower case, line-height 1.0. Old Standard TT small caps +0.12em for ORCHESTRA / ROW / SEAT labels, 16px/1.45 body, lining figures; prices with the currency sign at 60% size, raised.

Scale: **Perfect fourth 1.333** on a 14px base → -2: 7.9px · -1: 10.5px · 0: 14px · 1: 18.7px · 2: 24.9px · 3: 33.2px · 4: 44.2px · 5: 58.9px · 6: 78.5px · 7: 104.7px

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bevan&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400;1,700&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;700&display=swap">
```

## 配色 Colour — Buff railway card

| token | hex | role |
|---|---|---|
| paper | `#e9dcb8` | page background |
| ink | `#1d1b16` | primary text |
| muted | `#5a5240` | secondary text |
| accent | `#2f5d3a` | primary accent |
| accent2 | `#c8541f` | secondary accent |
| rule | `#1d1b16` | lines, borders |
| panel | `#d8c792` | secondary background |

**Usage:** Buff pressboard; black text; a green horizontal band for class (~12%); orange-red for the dating-press stamp and one route arrow; panel = the reverse side.

Contrast (WCAG):

- ink on paper: **12.61:1** — AAA — any text
- muted on paper: **5.67:1** — AA — body text OK
- ink on panel: **10.24:1** — AAA — any text
- accent on paper: **5.6:1** — AA — body text OK
- accent2 on paper: **3.25:1** — large text / UI marks only (≥24px or bold ≥19px)
- #ffffff on accent: **7.64:1** — AAA — any text
- #000000 on accent2: **4.74:1** — AA — body text OK

## 密度 Density — 满版 / Packed

像报纸/促销单一样塞满：几乎没有空白区，靠字号反差、粗线和色块分区。 Base 14px, line-height 1.35, spacing unit 4px, section gap 32px, max width 1440px.

## 形状与层次 Shape & depth

- **Radius:** 0 on corners. Stubs get semicircular notches at both ends of the perforation via radial-gradient(circle at 0 50%, transparent 10px, var(--panel) 10.5px).
- **Borders:** 1px solid rule for cells; perforation = a row of 4px holes every 8px (or 2px dotted rule); ticket outline 1.5px solid ink.
- **Shadow:** none. Tickets lie flat on the page.

## 材质 Surface — Security paper

Concentric fine-line rosettes behind all text panels, like banknote paper.

```css
background-image: repeating-radial-gradient(circle at 30% 50%, transparent 0 6px, color-mix(in srgb, var(--accent2) 18%, transparent) 6px 6.6px);
```

## 母题 Motif — Guilloche underprint

A fine SVG guilloche of overlapping sine rosettes (0.5px strokes in accent2 at ~25% tone) behind the ticket body as a security pattern.

## 动效 Motion — Dating press

The date stamp lands in two frames: scale 1.15 → 1 while settling at −8°.

- duration `140ms`, easing `steps(2, end)`
- prefers-reduced-motion: Stamp is simply present.

## 变数 Twist — 首屏无按钮 / No button above the fold

首屏不出现任何按钮；行动入口（电话、预订、地址）在第二屏之后，以文字链接或表格行出现。

## 必须 Must

- Every section is a ticket module with a perforated split into body and stub.
- All numbers (dates, times, prices, rows, seats) sit in labelled 1px-ruled cells and use tabular figures.
- Serial numbers are derived from a real fact such as the date (Nº 20261101), never a fake count.

## 不要 Must not (branch)

- No rounded-rectangle cards; ticket corners are square or notched only.
- No information floating outside a ticket module except a page-level header.
- No QR codes or barcodes that encode nothing; use guilloche and serials instead.

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
/* hash-design a4906350 · ticket-stub · buff-railway-card */
:root {
  --paper: #e9dcb8;
  --ink: #1d1b16;
  --muted: #5a5240;
  --accent: #2f5d3a;
  --on-accent: #ffffff;
  --accent2: #c8541f;
  --on-accent2: #000000;
  --rule: #1d1b16;
  --panel: #d8c792;

  --font-display: Bevan, "ZCOOL XiaoWei", Rockwell, Georgia, serif;
  --font-body: "Old Standard TT", "Noto Serif SC", Georgia, serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --step-n2: 0.492rem; /* 7.9px */
  --step-n1: 0.656rem; /* 10.5px */
  --step-0: 0.875rem; /* 14px */
  --step-1: 1.166rem; /* 18.7px */
  --step-2: 1.555rem; /* 24.9px */
  --step-3: 2.073rem; /* 33.2px */
  --step-4: 2.763rem; /* 44.2px */
  --step-5: 3.683rem; /* 58.9px */
  --step-6: 4.909rem; /* 78.5px */
  --step-7: 6.544rem; /* 104.7px */
  --leading: 1.35;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --section-gap: 32px;
  --max-width: 1440px;

  --motion-duration: 140ms;
  --motion-easing: steps(2, end);
}

html { font-size: 87.5%; }
body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 交付前自检 Before you ship

- [ ] Fonts on the page are exactly: Bevan / Old Standard TT (+ ZCOOL XiaoWei / Noto Serif SC)
- [ ] Every colour on the page comes from the 7 palette tokens above
- [ ] First screen is the "Admit-one ticket" anchor, in the "Oversized card ticket" layout
- [ ] Copy is written in the "Field notes" voice using only the facts
- [ ] Twist "No button above the fold" is visibly applied
- [ ] `critique_page` (or `hash-design critique --brief a49063502037857ce8846937fc2524f991fdbcb094a46c682d1c676cae47326b+1`) reports no critical/major findings
