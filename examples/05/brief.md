# 横幅 · 等高线

设计规范 · 852dd8de4af9c5b81fba26867ea39f1aa7f7fd6fd83250b691ba02e9ceff5279

- Algorithm: random-design/1; rule fingerprint: f9f9ff073d5f52c1
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Archivo Black / Archivo; CJK: Noto Sans SC. Scale 1.305; tracking 0.012em; leading 1.535.
- 构图: band; 8 columns; margins 7.146%; graphic on left; balance 0.503; rhythm progressive.
- 图形: contours; count 12; stroke 2.021; amplitude 0.432; rotation 2.431°. Use the exported SVG or reproduce its parameters.
- Surface: grid; radius 7.055px; depth flat.
- WCAG text/paper contrast: body 10.05:1; secondary 7.6:1; accent text 7.4:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#110f12;
  --ink:#c0bac4;
  --muted:#aaa0b0;
  --accent:#cea5e5;
  --accent-ink:#bb92d1;
  --accent2:#97ae77;
  --panel:#29242d;
  --rule:#554c5a;
  --on-accent:#111111;
  --font-display:"Archivo Black","Noto Sans SC",sans-serif;
  --font-body:"Archivo","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.305;
  --tracking:0.012em;
  --leading:1.535;
  --page-margin:7.146%;
  --radius:7.055px;
  --border:0.994px;
  --section-gap:78px;
}
```
