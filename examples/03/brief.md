# 斜构 · 光束

设计规范 · 1705ff88aa473a9656bbb9dbd3c598a4f6c667ad972bd4686c2c16a9058cb7ee

- Algorithm: random-design/1; rule fingerprint: f9f9ff073d5f52c1
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Outfit / Manrope; CJK: Noto Sans SC. Scale 1.319; tracking -0.006em; leading 1.538.
- 构图: diagonal; 8 columns; margins 7.484%; graphic on right; balance 0.468; rhythm progressive.
- 图形: rays; count 8; stroke 2.41; amplitude 0.468; rotation -2.283°. Use the exported SVG or reproduce its parameters.
- Surface: grid; radius 6.064px; depth flat.
- WCAG text/paper contrast: body 10.24:1; secondary 4.73:1; accent text 4.79:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#f7f3e8;
  --ink:#3d3a32;
  --muted:#716c5c;
  --accent:#886f00;
  --accent-ink:#816900;
  --accent2:#4096d6;
  --panel:#e9e5d7;
  --rule:#bdb7a6;
  --on-accent:#ffffff;
  --font-display:"Outfit","Noto Sans SC",sans-serif;
  --font-body:"Manrope","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.319;
  --tracking:-0.006em;
  --leading:1.538;
  --page-margin:7.484%;
  --radius:6.064px;
  --border:1.673px;
  --section-gap:69px;
}
```
