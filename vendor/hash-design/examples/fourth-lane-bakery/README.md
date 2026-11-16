# 示例：第四巷面包店

一次完整的 hash-design 端到端运行。店铺是虚构的，事实见 [facts.md](facts.md)。

- **在线对比页**：<https://qybaihe.github.io/hash-design/fourth-lane-bakery/compare.html>（按 1–5 放大，D/M 切换桌面/手机）
- **全部示例**：<https://qybaihe.github.io/hash-design/>

![第四巷面包店：5 个随机方向并排对比](screenshots/compare.png)

## 过程

1. **掷骰**：用固定 seed 是为了让示例可复现，真实使用请去掉 `--seed`。

   ```bash
   node packages/core/dist/bin.js roll --subject "第四巷面包店" \
     --facts-file examples/fourth-lane-bakery/facts.md --seed fourth-lane-bakery \
     --out examples/fourth-lane-bakery
   ```

   MCP 等价调用是 `roll_designs { subject, facts, seed: "fourth-lane-bakery", out_dir }`，得到的 5 个 ref 完全相同。

2. **冻结**：生成 [roll.json](roll.json)、[ROLL.md](ROLL.md) 和 [briefs/](briefs)。

3. **渲染**：按 [Skill](../../skills/hash-design/SKILL.md) 第 3 步，5 个预览分别由 5 个**互相看不到对方**的子 Agent 完成。每个子 Agent 只读自己那一份 brief 加 facts.md，产出单文件 HTML（内联 CSS 和 SVG，没有图片也没有框架），并用 critique 加截图自检至少两轮。

4. **自检**：`hash-design critique previews/NN-*.html --roll roll.json --pick N`

   | # | 分支 | critique | brief 遵守度 | 剩余 minor |
   |---|---|---|---|---|
   | 1 | 公文表格 bureaucratic-form | 96 | 100 | 表单字段编号 10/13/14/15 与年份 2026，非事实数字 |
   | 2 | 包豪斯 bauhaus-primary | 96 | 100 | 章节编号 01–07、母题比例 10:8:6:4 |
   | 3 | 水墨印章 ink-and-seal | 100 | 100 | — |
   | 4 | Riso 双色套印 risograph-duotone | 100 | 100 | — |
   | 5 | 港式招牌 hk-shop-sign | 96 | 100 | 条款编号 1.1–4.2 |

5. **对比**：`hash-design compare --roll examples/fourth-lane-bakery/roll.json` 生成 [compare.html](compare.html)。

6. **选号**：Skill 规定在这里停下，等用户回复编号。示例到此为止。

## 5 个方向

### 01 · 公文表格 Bureaucratic form

<a href="https://qybaihe.github.io/hash-design/fourth-lane-bakery/previews/01-bureaucratic-form.html"><img src="screenshots/01-bureaucratic-form-desktop.png" width="74%" alt="#1 Bureaucratic form desktop"></a> <img src="screenshots/01-bureaucratic-form-mobile.png" width="22%" alt="#1 mobile">

`51a76d00` · 版式 Numbered field form · 字体 IBM Plex Sans Condensed / IBM Plex Sans · 配色 Dropout-ink green · 语气 词条 · 变数 粗线分区 · critique **96/100**，brief 遵守度 **100/100** · [brief](briefs/01-bureaucratic-form.md)

首屏是表头：巨大的表号 IV-17（第四巷 17 号），配上编号、年度和"仅供内部填写"的红章。所有事实都填进带编号的字段、勾选格和价目表；每一部分下面的注释写成词条。

### 02 · 包豪斯 Bauhaus primary

<a href="https://qybaihe.github.io/hash-design/fourth-lane-bakery/previews/02-bauhaus-primary.html"><img src="screenshots/02-bauhaus-primary-desktop.png" width="74%" alt="#2 Bauhaus primary desktop"></a> <img src="screenshots/02-bauhaus-primary-mobile.png" width="22%" alt="#2 mobile">

`4f1cc0f2` · 版式 Bauhausbuch cover · 字体 League Spartan / Kumbh Sans · 配色 Primaries on cream · 语气 问答访谈 · 变数 版权页式页脚 · critique **96/100**，brief 遵守度 **100/100** · [brief](briefs/02-bauhaus-primary.md)

首屏是包豪斯丛书封面：巨大的数字"4"、黄三角、蓝圆和红方形正片叠底。价格做成黑色条形图，问答体分章，页脚是信息最密的版权页。

### 03 · 水墨印章 Ink and seal

<a href="https://qybaihe.github.io/hash-design/fourth-lane-bakery/previews/03-ink-and-seal.html"><img src="screenshots/03-ink-and-seal-desktop.png" width="74%" alt="#3 Ink and seal desktop"></a> <img src="screenshots/03-ink-and-seal-mobile.png" width="22%" alt="#3 mobile">

`7f18e1dc` · 版式 Handscroll (手卷) · 字体 Zen Antique / Crimson Pro · 配色 Blue-green landscape on silk · 语气 田野笔记 · 变数 时间为骨 · critique **100/100**，brief 遵守度 **100/100** · [brief](briefs/03-ink-and-seal.md)

自右向左展开的手卷：首屏是白文大印"第四巷面包店"配一行竖排地址和营业时间，往后按时间顺序是 5 段水墨小景，底部是时间轴索引。手机上变成立轴。

### 04 · Riso 双色套印 Risograph duotone

<a href="https://qybaihe.github.io/hash-design/fourth-lane-bakery/previews/04-risograph-duotone.html"><img src="screenshots/04-risograph-duotone-desktop.png" width="74%" alt="#4 Risograph duotone desktop"></a> <img src="screenshots/04-risograph-duotone-mobile.png" width="22%" alt="#4 mobile">

`bde66a3f` · 版式 Overprint poster · 字体 Unbounded / Familjen Grotesk · 配色 Bright red + green on white · 语气 历书 · 变数 数字即主角 · critique **100/100**，brief 遵守度 **100/100** · [brief](briefs/04-risograph-duotone.md)

Riso 套印海报：颗粒红日与绿色大字叠印出第三种墨色，并有刻意的错版。按历书口吻写宜忌，所有数字放大成主角。

### 05 · 港式招牌 Hong Kong shop sign

<a href="https://qybaihe.github.io/hash-design/fourth-lane-bakery/previews/05-hk-shop-sign.html"><img src="screenshots/05-hk-shop-sign-desktop.png" width="74%" alt="#5 Hong Kong shop sign desktop"></a> <img src="screenshots/05-hk-shop-sign-mobile.png" width="22%" alt="#5 mobile">

`42c248e7` · 版式 Projecting sign stack · 字体 Antonio / Hanken Grotesk · 配色 Neon street at night · 语气 技术手册 · 变数 数字即主角 · critique **96/100**，brief 遵守度 **100/100** · [brief](briefs/05-hk-shop-sign.md)

港式招牌：右侧一块红漆竖招牌"第四巷面包店"从视口顶端垂下，左侧是"面包 咖啡"横招牌和巨大的出炉时刻；写成技术手册口吻，霓虹灯管是线描，不发光。

<details><summary>#3 手卷的后几段（桌面横向滚动）</summary>

<img src="screenshots/03-ink-and-seal-scroll-1.png" width="49%"> <img src="screenshots/03-ink-and-seal-scroll-2.png" width="49%">
<img src="screenshots/03-ink-and-seal-scroll-3.png" width="49%"> <img src="screenshots/03-ink-and-seal-scroll-4.png" width="49%">

</details>

手机宽度下的对比页（`?device=mobile`）：

![手机宽度对比](screenshots/compare-mobile.png)

## 文件

```
facts.md            事实清单（唯一允许出现在页面上的内容）
roll.json / ROLL.md 5 个哈希、映射、约束、每份 brief 的 JSON
briefs/             5 份冻结 brief
previews/           5 个预览页
compare.html        并排对比页
screenshots/        桌面首屏 / 整页 / 手机，#3 的横向滚动分段，对比页（桌面、手机）
```

截图用 `npm run screenshots` 生成（需要先 `npx playwright install chromium`）。
`packages/core/test/examples.test.ts` 保证这里的 roll 和 brief 与当前数据一致：库一旦改动，测试就会提醒你重新掷骰。
