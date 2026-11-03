# 艺术刊物 · 杏橘

设计规范 · 15fef37bdeae10233f450d6aa4800408178c5b557d3fd92b243aaa8c8fc6fb69

- Art direction: Editorial colour. Source logic: Art journals and exhibition catalogues. Graphic purpose: Typography is the primary image; a small ruled mark stays secondary.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Libre Baskerville / Lato; CJK: Noto Serif SC. Scale 1.294; tracking -0.021em; leading 1.614.
- 构图: type; 12 columns; margins 7.303%; graphic on right; balance 0.525; rhythm progressive.
- 图形: editorial-mark; count 4; stroke 1.525; amplitude 0.543; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: none; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.06:1; secondary 6.03:1; accent text 5.82:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#ffb798;
  --ink:#43342d;
  --muted:#4e3e38;
  --accent:#00606f;
  --accent-ink:#004b57;
  --accent2:#b1b36f;
  --panel:#7c3d32;
  --panel-ink:#fbebe4;
  --rule:#553c31;
  --on-accent:#c1d2d6;
  --font-display:"Libre Baskerville","Noto Serif SC",serif;
  --font-body:"Lato","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Serif SC";
  --type-scale:1.294;
  --tracking:-0.021em;
  --leading:1.614;
  --page-margin:7.303%;
  --radius:0px;
  --border:1px;
  --section-gap:96px;
}
```
