# 植物图鉴 · 玉绿

设计规范 · f4bdf5b16c96578da4d4ba1f3f898546351e9869245e9fc1b8f4061114c87340

- Art direction: Botanical folio. Source logic: Botanical specimens and coloured field-guide plates. Graphic purpose: One coherent specimen: alternating tapered leaves attached to a shared curved stem, fine veins and a measured plate border.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Cormorant Garamond / Source Sans 3; CJK: Noto Serif SC. Scale 1.349; tracking 0.01em; leading 1.644.
- 构图: offset; 8 columns; margins 6.768%; graphic on right; balance 0.631; rhythm alternating.
- 图形: botanical; count 5; stroke 1.735; amplitude 0.579; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: grain; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.04:1; secondary 5.03:1; accent text 5.14:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#00502d;
  --ink:#cfe1d5;
  --muted:#aec0b4;
  --accent:#9fc2a5;
  --accent-ink:#91cb9c;
  --accent2:#e0b580;
  --panel:#e4d6b6;
  --panel-ink:#38443c;
  --rule:#a7c3b0;
  --on-accent:#3b463d;
  --font-display:"Cormorant Garamond","Noto Serif SC",serif;
  --font-body:"Source Sans 3","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Serif SC";
  --type-scale:1.349;
  --tracking:0.01em;
  --leading:1.644;
  --page-margin:6.768%;
  --radius:0px;
  --border:1px;
  --section-gap:102px;
}
```
