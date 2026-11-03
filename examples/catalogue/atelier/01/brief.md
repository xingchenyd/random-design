# 剪纸工坊 · 酒红

设计规范 · d9c948cdc54fcce39a189b6ff0c68d943d44655b8c61b04153aa48fda149df5d

- Art direction: Paper atelier. Source logic: Cut-paper studies and hand-bound art books. Graphic purpose: A single three-piece composition with cast paper edges, not floating confetti.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: ZCOOL XiaoWei / Source Sans 3; CJK: ZCOOL XiaoWei. Scale 1.337; tracking -0.033em; leading 1.517.
- 构图: split; 8 columns; margins 7.711%; graphic on right; balance 0.602; rhythm alternating.
- 图形: cut-paper; count 6; stroke 2.481; amplitude 0.642; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: grain; radius 0px; depth offset.
- WCAG text/paper contrast: body 7.03:1; secondary 5.58:1; accent text 5.9:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#69204e;
  --ink:#ddcad4;
  --muted:#c7b4be;
  --accent:#8de3b6;
  --accent-ink:#86cda7;
  --accent2:#ed9561;
  --panel:#e09ec0;
  --panel-ink:#2e2329;
  --rule:#cfb1c0;
  --on-accent:#39463f;
  --font-display:"ZCOOL XiaoWei","ZCOOL XiaoWei",serif;
  --font-body:"Source Sans 3","Noto Sans SC",sans-serif;
  --font-cjk:"ZCOOL XiaoWei";
  --type-scale:1.337;
  --tracking:-0.033em;
  --leading:1.517;
  --page-margin:7.711%;
  --radius:0px;
  --border:1px;
  --section-gap:95px;
}
```
