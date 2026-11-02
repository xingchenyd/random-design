# 交错 · 晶格

设计规范 · f7fce90ee734130f9d6b74b7d16c2538e20e4f758f6a0cc4e8c8ec8dc6d660e6

- Algorithm: random-design/1; rule fingerprint: f9f9ff073d5f52c1
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Barlow Condensed / Barlow; CJK: Noto Sans SC. Scale 1.258; tracking -0.031em; leading 1.59.
- 构图: split; 6 columns; margins 7.408%; graphic on left; balance 0.485; rhythm even.
- 图形: cells; count 14; stroke 2.728; amplitude 0.234; rotation -38.752°. Use the exported SVG or reproduce its parameters.
- Surface: fine-lines; radius 2.039px; depth soft.
- WCAG text/paper contrast: body 10.04:1; secondary 7.99:1; accent text 7.7:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#0f0804;
  --ink:#bfb7af;
  --muted:#b0a295;
  --accent:#ff9d2a;
  --accent-ink:#ea8a00;
  --accent2:#00b9d1;
  --panel:#2d251d;
  --rule:#5a4d42;
  --on-accent:#111111;
  --font-display:"Barlow Condensed","Noto Sans SC",sans-serif;
  --font-body:"Barlow","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.258;
  --tracking:-0.031em;
  --leading:1.59;
  --page-margin:7.408%;
  --radius:2.039px;
  --border:1.716px;
  --section-gap:77px;
}
```
