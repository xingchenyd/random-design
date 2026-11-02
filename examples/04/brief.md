# 错位 · 星群

设计规范 · 780842d897aa1086327c5032adaf4a00e96a2cdbefd7b1f6f3794502fcadba5d

- Algorithm: random-design/1; rule fingerprint: f9f9ff073d5f52c1
- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.
- 字体: Nunito Sans / Nunito Sans; CJK: Noto Sans SC. Scale 1.224; tracking 0.012em; leading 1.539.
- 构图: offset; 6 columns; margins 7.481%; graphic on left; balance 0.526; rhythm even.
- 图形: constellation; count 14; stroke 1.246; amplitude 0.143; rotation 26.994°. Use the exported SVG or reproduce its parameters.
- Surface: dots; radius 14.814px; depth flat.
- WCAG text/paper contrast: body 10.07:1; secondary 7.06:1; accent text 7.18:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.

## 执行约定
保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。

## Tokens

```css
:root{
  --paper:#191b17;
  --ink:#c2c7bc;
  --muted:#a0a897;
  --accent:#a9c288;
  --accent-ink:#96af76;
  --accent2:#75afc1;
  --panel:#24281f;
  --rule:#4c5344;
  --on-accent:#111111;
  --font-display:"Nunito Sans","Noto Sans SC",sans-serif;
  --font-body:"Nunito Sans","Noto Sans SC",sans-serif;
  --font-cjk:"Noto Sans SC";
  --type-scale:1.224;
  --tracking:0.012em;
  --leading:1.539;
  --page-margin:7.481%;
  --radius:14.814px;
  --border:0.629px;
  --section-gap:75px;
}
```
