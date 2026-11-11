import { escapeHtml as escape } from './core/util.js';
import { graphicSvg } from './core/graphics.js';
import { fontUrl } from './core/fonts.js';
import { PRESET_CSS } from './preset-css.js';

const baseCss = `
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; min-height: 100vh; color: var(--ink); background: var(--paper);
  font: 16px/1.6 var(--font-body);
}
a { color: inherit; }
a:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
.frame { max-width: 1440px; margin: auto; padding: 0 var(--page-margin); }
.mast, footer {
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  min-height: 64px; border-bottom: 1px solid color-mix(in srgb, currentColor 42%, transparent);
}
.mast strong { font: 700 17px/1.2 var(--font-display); }
.mast a { font-size: 13px; text-underline-offset: .26em; }
.sheet { display: grid; gap: clamp(18px, 2.5vw, 42px); padding: clamp(30px, 4.3vw, 72px) 0 32px; }
.hero { display: grid; align-items: center; gap: 12px; min-width: 0; }
.copy { position: relative; z-index: 1; min-width: 0; }
.copy h1 {
  margin: 0; font: var(--weight) clamp(42px, 7vw, 110px)/1.03 var(--font-display);
  letter-spacing: var(--tracking); text-wrap: balance; overflow-wrap: anywhere;
}
.description { max-width: 48ch; font-size: clamp(14px, 1.25vw, 18px); margin: 20px 0 24px; overflow-wrap: anywhere; }
.action {
  display: inline-block; border: 1px solid transparent; padding: 10px 22px; text-decoration: none;
  font-size: 13px; font-weight: 700; background: var(--accent); color: var(--on-accent); border-radius: var(--radius);
}
.visual { position: relative; margin: 0; min-width: 0; width: 100%; align-self: center; }
.visual svg { display: block; width: 100%; height: auto; max-height: 430px; }
.menu { min-width: 0; }
.menu h2 { font: 700 16px/1.2 var(--font-display); margin: 0 0 13px; overflow-wrap: anywhere; }
.items { display: grid; gap: 12px; }
.item {
  display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 16px;
  padding: 18px 20px; min-width: 0; min-height: 95px; border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
  background: var(--panel); color: var(--panel-ink); border-radius: var(--radius);
}
.item h3 { font: 700 clamp(18px,2vw,32px)/1.2 var(--font-display); margin: 0; overflow-wrap: anywhere; }
.item p { font-size: 13px; margin: 6px 0 0; overflow-wrap: anywhere; }
.price { font: 700 clamp(20px,2.7vw,40px)/1 var(--font-display); max-width: min(11ch,42vw); overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
footer { min-height: 55px; border-bottom: 0; border-top: 1px solid color-mix(in srgb, currentColor 40%, transparent); font-size: 11px; }
.layout-menu .sheet { grid-template-columns: minmax(0,var(--copy)) minmax(0,1fr); align-items: center; min-height: 560px; }
.layout-menu .visual { width: min(73%,290px); margin: -8px 4% 0 auto; }
.layout-menu .hero { align-content: center; }
.layout-cards .hero { grid-template-columns: minmax(0,var(--copy)) minmax(0,1fr); min-height: 350px; }
.layout-cards .items, .layout-center .items { grid-template-columns: repeat(var(--cols), minmax(0,1fr)); }
.layout-center .hero { min-height: 350px; text-align: center; }
.layout-center .description { margin-inline: auto; }
.layout-center .visual { grid-area: 1 / 1; width: min(100%,520px); margin: 0 auto; }
.layout-center .copy { grid-area: 1 / 1; }
.layout-bento .sheet { grid-template-columns: minmax(0,var(--copy)) minmax(0,1fr); gap: 14px; }
.layout-bento .hero { align-content: start; }
.layout-bento .items { grid-template-columns: repeat(2,minmax(0,1fr)); }
.layout-bento .item:first-child { grid-column: span 2; }
.layout-scroll .sheet { grid-template-columns: minmax(0,1.55fr) minmax(0,1fr); align-items: center; }
.layout-scroll .hero { grid-template-columns: minmax(0,1fr) minmax(0,2.2fr); align-items: center; min-height: 400px; }
.layout-scroll .visual { grid-column: 2; }
`;

const responsiveCss = `
@media (max-width: 800px) {
  .layout-menu .sheet, .layout-bento .sheet, .layout-scroll .sheet { grid-template-columns: 1fr; min-height: 0; }
  .layout-cards .hero { grid-template-columns: minmax(0,1fr) minmax(0,.85fr); min-height: 270px; }
  .layout-scroll .hero { min-height: 300px; }
  .layout-menu .visual { margin-top: 0; }
}
@media (max-width: 560px) {
  .frame { padding-inline: 5%; }
  .mast { min-height: 54px; }
  .mast strong { font-size: 14px; }
  .sheet { padding-top: 25px; }
  .layout-cards .hero { grid-template-columns: 1fr; min-height: 0; }
  .layout-cards .visual { width: min(100%,340px); margin-inline: auto; }
  .layout-center .hero { min-height: 280px; }
  .layout-cards .items, .layout-center .items, .layout-bento .items { grid-template-columns: 1fr; }
  .layout-bento .item:first-child { grid-column: auto; }
  .layout-scroll .hero { min-height: 220px; }
  .item { min-height: 76px; padding: 12px 15px; }
  .description { margin-block: 14px; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`;

export function renderPresetWebsite(design, preset, content, { language, fonts, css }) {
  const title = escape(content.title).replace(/\n/g, '<br>');
  const vertical = language === 'zh' && preset.layout === 'scroll' && [...content.title].length <= 6;
  const artwork = preset.graphic === 'none' ? '' : `<figure class="visual">${graphicSvg(design, { decorative: true })}</figure>`;
  const items = content.sections.map(([name, detail], index) => {
    const price = content.prices?.[index];
    return `<article class="item"><div><h3>${escape(name)}</h3><p>${escape(detail)}</p></div>${price ? `<span class="price">${escape(price)}</span>` : ''}</article>`;
  }).join('');
  const fontLink = fonts ? `<link rel="stylesheet" href="${escape(fontUrl(design.typography))}">` : '';
  return `<!doctype html>
<html lang="${language === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escape(content.subtitle)}</title>${fontLink}
  <style>
  ${css}
  :root { --copy: ${design.layout.split * 2.16}fr; --cols: ${Math.min(3, content.sections.length)}; --weight: ${design.typography.titleWeight}; }
  ${baseCss}
  ${PRESET_CSS[preset.id]}
  ${responsiveCss}
  </style>
</head>
<body class="layout-${preset.layout} style-${preset.id}" data-design="${design.id}" data-direction="${preset.id}">
  <div class="frame">
    <header class="mast"><strong>${escape(content.subtitle)}</strong><a href="#menu">${escape(content.sectionTitle)} ↗</a></header>
    <main class="sheet">
      <section class="hero">
        <div class="copy">
          <h1${vertical ? ' class="vertical-title"' : ''}>${title}</h1>
          <p class="description">${escape(content.description)}</p>
          <a class="action" href="#menu">${escape(content.action)} <span aria-hidden="true">↗</span></a>
        </div>
        ${artwork}
      </section>
      <section id="menu" class="menu"><h2>${escape(content.sectionTitle)}</h2><div class="items">${items}</div></section>
    </main>
    <footer>${escape(content.note)}</footer>
  </div>
</body>
</html>`;
}
