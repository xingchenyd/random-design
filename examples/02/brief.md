# 蓝晒图纸 · 钴蓝

设计规范 · e78fd397d9d7b5249c7e62ece09fddfd3f3d03a47692ede57cfcbbcd1547258f

- Art direction: Cyanotype study. Source logic: Engineering sheets and cyanotype contact prints. Graphic purpose: A constructed form with projection lines; every line describes the same geometry.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: IBM Plex Mono / IBM Plex Sans; CJK: Noto Sans SC. Scale 1.221; tracking -0.027em; leading 1.671.
- 构图: frame; 8 columns; margins 4.907%; graphic on right; balance 0.427; rhythm alternating.
- 图形: isometric; count 4; stroke 1.862; amplitude 0.215; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: grid; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.05:1; secondary 5.17:1; accent text 5.15:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#0f3b98;
  --ink:#d0d9ea;
  --muted:#b2bbcb;
  --accent:#c5d2e9;
  --accent-ink:#9bbbf5;
  --accent2:#e6bd77;
  --panel:#98baf3;
  --panel-ink:#272d37;
  --rule:#adbbd5;
  --on-accent:#3d434d;
  --font-display:"IBM Plex Mono","Noto Sans SC",sans-serif;
  --font-body:"IBM Plex Sans","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.221;
  --tracking:-0.027em;
  --leading:1.671;
  --page-margin:4.907%;
  --radius:0px;
  --border:1px;
  --section-gap:104px;
}
```
