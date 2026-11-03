import { renderWebsite } from './website.js';
import { directionById } from './core/directions.js';
import { assertDesign, validateDesign } from './core/engine.js';
import { fontUrl } from './core/fonts.js';
import { graphicSvg } from './core/graphics.js';
import { escapeHtml as e } from './core/util.js';

export const SAMPLE = {
  zh: { title: '把想法，\n展开成可能', subtitle: '星辰开放日', description: '一次关于设计、技术与日常创造的交流。用清晰的结构呈现内容，让每一个想法获得自己的表达。', sectionTitle: '让内容找到自己的形状', sections: [ ['观察', '从真实的问题出发，梳理内容与使用情境。'], ['构建', '用颜色、文字和图形建立一致的视觉语言。'], ['交流', '在讨论与反馈中，把方向变成具体的作品。'] ], action: '了解活动', eyebrow: 'DESIGN · TECHNOLOGY · CULTURE', note: '虚构演示内容，用于比较主题；不代表真实活动或研究结论。', dataTitle: '不同方向的探索', data: ['观察', '构建', '交流'] },
  en: { title: 'Ideas into\npossibilities', subtitle: 'Xingchen Open Day', description: 'A gathering about design, technology and everyday creativity. Clear structure gives every idea room to find its own expression.', sectionTitle: 'Give content a visual voice', sections: [ ['Observe', 'Start with real questions, content and the context of use.'], ['Build', 'Connect colour, type and graphics into a coherent visual language.'], ['Exchange', 'Turn a direction into a concrete work through conversation and feedback.'] ], action: 'Explore the event', eyebrow: 'DESIGN · TECHNOLOGY · CULTURE', note: 'Fictional demonstration content. Not a real event or research finding.', dataTitle: 'Exploration by direction', data: ['Observe', 'Build', 'Exchange'] }
};
export function normalizeContent(input = {}, language = 'zh') {
  const base = SAMPLE[language] ?? SAMPLE.zh;
  const content = { ...base, ...input };
  for (const key of ['title', 'subtitle', 'description', 'sectionTitle', 'action', 'eyebrow', 'note', 'dataTitle']) {
    if (typeof content[key] !== 'string' || content[key].length > ({ title: 120, subtitle: 100, description: 800, sectionTitle: 160 }[key] ?? 400)) throw new Error(`Invalid or overlong content.${key}`);
  }
  if (!Array.isArray(content.sections) || content.sections.length < 1 || content.sections.length > 6 || content.sections.some(s => !Array.isArray(s) || s.length !== 2 || typeof s[0] !== 'string' || typeof s[1] !== 'string' || s[0].length > 100 || s[1].length > 500)) throw new Error('sections must contain 1–6 [heading, text] pairs');
  return content;
}
export function tokensCss(d) {
  assertDesign(d);
  const p = d.palette, t = d.typography, l = d.layout;
  return `:root{\n${['paper', 'ink', 'muted', 'accent', 'accentInk', 'accent2', 'panel', 'panelInk', 'rule', 'onAccent'].map(k => `  --${k.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}:${p[k]};`).join('\n')}\n  --font-display:"${t.display}","${t.cjk}",${t.kind === 'serif' ? 'serif' : 'sans-serif'};\n  --font-body:"${t.body}","Noto Sans SC",sans-serif;\n  --font-cjk:"${t.cjk}";\n  --type-scale:${t.scale};\n  --tracking:${t.tracking}em;\n  --leading:${t.lineHeight};\n  --page-margin:${l.margin}%;\n  --radius:${d.surface.radius}px;\n  --border:${d.surface.border}px;\n  --section-gap:${Math.round(130 - l.density * 70)}px;\n}\n`;
}
export function brief(d, { language = 'zh' } = {}) {
  assertDesign(d);
  const zh = language === 'zh', c = validateDesign(d).contrast;
  const art = directionById(d.direction);
  return `# ${d.name[language]}\n\n${zh ? '设计规范' : 'Visual specification'} · ${d.id}\n\n- Art direction: ${art.name.en}. Source logic: ${art.source}. Graphic purpose: ${art.role}\n- No arbitrary mirrored copies, arbitrary rotations or unrelated motif mixing.\n- Algorithm: ${d.algorithm}; rule fingerprint: ${d.library}\n- Reproduction: preserve this design JSON and use the matching release. Seed alone does not encode history-dependent candidate selection.\n- ${zh ? '字体' : 'Type'}: ${d.typography.display} / ${d.typography.body}; CJK: ${d.typography.cjk}. Scale ${d.typography.scale}; tracking ${d.typography.tracking}em; leading ${d.typography.lineHeight}.\n- ${zh ? '构图' : 'Composition'}: ${d.layout.composition}; ${d.layout.columns} columns; margins ${d.layout.margin}%; graphic on ${d.layout.graphicSide}; balance ${d.layout.split}; rhythm ${d.layout.rhythm}.\n- ${zh ? '图形' : 'Graphic'}: ${d.graphic.family}; count ${d.graphic.count}; stroke ${d.graphic.stroke}; amplitude ${d.graphic.amplitude}; rotation ${d.graphic.rotation}°. Use the exported SVG or reproduce its parameters.\n- Surface: ${d.surface.texture}; radius ${d.surface.radius}px; depth ${d.surface.depth}.\n- WCAG text/paper contrast: body ${c.body}:1; secondary ${c.muted}:1; accent text ${c.accentText}:1. Use accentInk for text on paper, onAccent for text on accent. Accent2 is decorative, not a general text colour.\n\n${zh ? '## 执行约定\n保留用户提供的文案、事实、图表数据。不要随机改写语气。网页按内容建立语义结构并适配手机；PPT 使用同一主题组织不同页型，文字与数据保持可编辑。优先保证可读性与内容完整性；不得仅通过更换种子或主题名称伪造新风格。所选主题允许明确复用。字体没有嵌入，需安装或取得用户认可的替代字体。' : '## Execution contract\nPreserve supplied copy, facts and chart data. Do not randomize voice. Use semantic, responsive structure on the web; maintain one coherent theme across varied slide types. Keep text and data editable. Prioritize readable, complete content. A new seed or name alone does not constitute a new style. Explicitly selected themes may be reused. Fonts are referenced, not embedded; install them or agree on substitutes.'}\n\n## Tokens\n\n\`\`\`css\n${tokensCss(d)}\`\`\`\n`;
}
export function pageHtml(d, { language = 'zh', content: input = {}, fonts = true } = {}) {
  assertDesign(d);
  return renderWebsite(d, normalizeContent(input, language), { language, fonts, css: tokensCss(d) });
}
export function compareHtml(bundle, { language = 'zh', content = {}, pptx = true } = {}) {
  return `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Random Design · Compare</title><style>body{margin:0;padding:36px;background:#f4f2ed;color:#1f2826;font:15px system-ui}h1{font-size:32px}header{max-width:1200px;margin:auto auto 30px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px}article{min-width:0}iframe{border:1px solid #ccc;width:100%;height:590px;background:white}a{color:inherit}small{color:#555}</style></head><body><header><p>RANDOM DESIGN / ${bundle.library}</p><h1>${language === 'zh' ? '同一份内容，多种视觉可能' : 'One story, distinct visual systems'}</h1><p>${language === 'zh' ? '同一设计规范的网页预览；请打开原页面检查真实尺寸。' : 'Website previews from shared visual specifications. Open each page to inspect full size.'}</p></header><div class="grid">${bundle.designs.map((d, i) => `<article><h2>${i + 1}. ${e(d.name[language])}</h2><p><a href="${String(i + 1).padStart(2, '0')}/page.html">${language === 'zh' ? '打开网页' : 'Open page'}</a>${pptx ? ` · <a href="${String(i + 1).padStart(2, '0')}/theme.pptx">PPTX</a>` : ''} · <a href="${String(i + 1).padStart(2, '0')}/brief.md">Brief</a></p><iframe title="${e(d.name[language])}" sandbox="allow-same-origin" srcdoc="${e(pageHtml(d, { language, content }))}" loading="lazy"></iframe></article>`).join('')}</div></body></html>`;
}
