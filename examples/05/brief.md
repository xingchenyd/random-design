# 珐琅招牌 · 赭棕

设计规范 · 808713beb06c573e73b156180da66113de32d975f83cdc94ed769ee2edcab862

- Art direction: Enamel sign. Source logic: Painted enamel signs and shop fascia. Graphic purpose: A typographic seal and nested sign border; ornament frames the name.
- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.
- Algorithm: random-design/2; rule fingerprint: 71caaea0f85d569c
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Bodoni Moda / Manrope; CJK: Noto Serif SC. Scale 1.347; tracking -0.012em; leading 1.487.
- 构图: stack; 6 columns; margins 7.555%; graphic on right; balance 0.464; rhythm alternating.
- 图形: seal; count 6; stroke 1.757; amplitude 0.632; rotation 0°. Use the exported SVG or reproduce its parameters.
- Surface: enamel; radius 0px; depth flat.
- WCAG text/paper contrast: body 7.01:1; secondary 4.62:1; accent text 4.6:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#804d1c;
  --ink:#ffffff;
  --muted:#dfcfc2;
  --accent:#f0d3a8;
  --accent-ink:#f4cb8f;
  --accent2:#f0d3a8;
  --panel:#f1ba89;
  --panel-ink:#3d332b;
  --rule:#ceb5a1;
  --on-accent:#484137;
  --font-display:"Bodoni Moda","Noto Serif SC",serif;
  --font-body:"Manrope","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Serif SC";
  --type-scale:1.347;
  --tracking:-0.012em;
  --leading:1.487;
  --page-margin:7.555%;
  --radius:0px;
  --border:2.5px;
  --section-gap:70px;
}
```
