# 蓝晒图纸 · 海蓝

设计规范 · 2697a2bb2dadd959eba5a6b86f22cfdf0ebef64c3c8ba5513253c16625441348

- Art direction: Cyanotype study. Source logic: Engineering sheets and cyanotype contact prints. Graphic purpose: A constructed form with projection lines; every line describes the same geometry.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: IBM Plex Mono / IBM Plex Sans; CJK: Noto Sans SC. Scale 1.278; tracking -0.012em; leading 1.572.
- 构图: frame; 6 columns; margins 6.085%; graphic on right; balance 0.601; rhythm alternating.
- 图形: guilloche; count 4; stroke 1.887; amplitude 0.394; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: fine-lines; radius 0px; depth flat.
- WCAG text/paper contrast: body 7:1; secondary 4.63:1; accent text 4.62:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#005967;
  --ink:#ddf4f9;
  --muted:#b3c9ce;
  --accent:#b8d8df;
  --accent-ink:#78d2e4;
  --accent2:#e6bd77;
  --panel:#8edafd;
  --panel-ink:#303f42;
  --rule:#9ec2ca;
  --on-accent:#364549;
  --font-display:"IBM Plex Mono","Noto Sans SC",sans-serif;
  --font-body:"IBM Plex Sans","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.278;
  --tracking:-0.012em;
  --leading:1.572;
  --page-margin:6.085%;
  --radius:0px;
  --border:1px;
  --section-gap:96px;
}
```
