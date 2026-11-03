# 植物图鉴 · 杏橘

设计规范 · 3362d0b2d9612c3ce61a20c68246886060d25feb5d0e589e3fedd0677dfa0e96

- Art direction: Botanical folio. Source logic: Botanical specimens and coloured field-guide plates. Graphic purpose: One coherent specimen: alternating tapered leaves attached to a shared curved stem, fine veins and a measured plate border.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Libre Baskerville / Lato; CJK: Noto Serif SC. Scale 1.321; tracking -0.018em; leading 1.5.
- 构图: rail; 12 columns; margins 7.415%; graphic on right; balance 0.382; rhythm progressive.
- 图形: botanical; count 4; stroke 3.366; amplitude 0.327; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: grain; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.04:1; secondary 6.13:1; accent text 5.86:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#ffbb8d;
  --ink:#44362d;
  --muted:#4d3f36;
  --accent:#324729;
  --accent-ink:#2a4d18;
  --accent2:#7e5823;
  --panel:#1d3725;
  --panel-ink:#cbbdb4;
  --rule:#533d2e;
  --on-accent:#b5beb1;
  --font-display:"Libre Baskerville","Noto Serif SC",serif;
  --font-body:"Lato","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Serif SC";
  --type-scale:1.321;
  --tracking:-0.018em;
  --leading:1.5;
  --page-margin:7.415%;
  --radius:0px;
  --border:1px;
  --section-gap:88px;
}
```
