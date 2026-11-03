# 织物图样 · 蔷薇粉

设计规范 · 8b88584906f0ef9887a54de55a001a575635ccd442bd2d301a7fd2e6475b1ffe

- Art direction: Woven rhythm. Source logic: Warp/weft repeats and jacquard textiles. Graphic purpose: One tessellated repeat unit, consistent weave direction and a clear selvedge.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Nunito Sans / Nunito Sans; CJK: Noto Sans SC. Scale 1.399; tracking -0.033em; leading 1.554.
- 构图: band; 12 columns; margins 7.77%; graphic on right; balance 0.442; rhythm even.
- 图形: weave; count 4; stroke 2.485; amplitude 0.177; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: woven; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.08:1; secondary 6.23:1; accent text 6.42:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#ffb5db;
  --ink:#44353c;
  --muted:#4d3d45;
  --accent:#e8bcae;
  --accent-ink:#692e1b;
  --accent2:#b07c83;
  --panel:#63273a;
  --panel-ink:#d8c9d0;
  --rule:#533a46;
  --on-accent:#4c3f3b;
  --font-display:"Nunito Sans","Noto Sans SC",sans-serif;
  --font-body:"Nunito Sans","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.399;
  --tracking:-0.033em;
  --leading:1.554;
  --page-margin:7.77%;
  --radius:0px;
  --border:1px;
  --section-gap:98px;
}
```
