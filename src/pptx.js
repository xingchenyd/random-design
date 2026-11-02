import PptxGenJS from 'pptxgenjs';
import { assertDesign } from './core/engine.js';
import { graphicSvg } from './core/graphics.js';
import { normalizeContent } from './render.js';

// Product exporter: portable JS, no desktop application or model API required.
export function createPresentation(design, { language = 'zh', content: input = {} } = {}) {
  const d = assertDesign(design), c = normalizeContent(input, language), p = d.palette, l = d.layout, t = d.typography;
  if (c.sections.length > 3) throw new Error('The six-slide specimen supports up to three sections. Use the visual JSON in a content-aware deck workflow for a larger outline.');
  const limits = language === 'zh' ? { title: 24, description: 160, heading: 18, section: 80 } : { title: 90, description: 320, heading: 40, section: 160 };
  if (c.title.length > limits.title || c.description.length > limits.description || c.sections.some(([a, b]) => a.length > limits.heading || b.length > limits.section)) throw new Error('Content exceeds the theme specimen text budget. Keep the original content and use an agent to paginate it; no text was truncated.');
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'xingchenyd'; pptx.subject = `Procedural theme ${d.id}`; pptx.title = c.subtitle;
  pptx.company = 'random-design'; pptx.lang = language === 'zh' ? 'zh-CN' : 'en-US';
  pptx.theme = { headFontFace: language === 'zh' ? t.cjk : t.display, bodyFontFace: language === 'zh' ? 'Noto Sans SC' : t.body, lang: pptx.lang };
  const W = 13.333333, H = 7.5;
  const color = hex => hex.slice(1);
  const bodyFont = language === 'zh' ? 'Noto Sans SC' : t.body;
  const displayFont = language === 'zh' ? t.cjk : t.display;
  function text(s, value, x, y, w, h, options = {}) {
    s.addText(value, { x, y, w, h, fontFace: bodyFont, fontSize: 18, color: color(p.ink), margin: 0, breakLine: false, valign: 'mid', ...options });
  }
  function rect(s, x, y, w, h, fill) { s.addShape(pptx.ShapeType.rect, { x, y, w, h, line: { color: color(fill), transparency: 100 }, fill: { color: color(fill) } }); }
  function rule(s, x, y, w, fill = p.rule) { s.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color: color(fill), width: d.surface.border } }); }
  function base(number) {
    const s = pptx.addSlide(); s.background = { color: color(p.paper) };
    text(s, c.subtitle, 0.6, 0.25, 9.5, 0.24, { fontSize: 10, color: color(p.muted) });
    text(s, String(number).padStart(2, '0'), 11.8, 6.95, 0.8, 0.22, { fontSize: 10, align: 'right', color: color(p.muted) });
    rule(s, 0.6, 6.75, 12.1);
    s.addNotes(`random-design ${d.algorithm}; rule fingerprint ${d.library}; design ${d.id}. Fictional demonstration content and chart values; no empirical claims. Fonts are referenced, not embedded. Decorative procedural artwork is an SVG image; text, shapes and charts are native editable objects.`);
    return s;
  }
  function heading(s, value) { text(s, value, 0.65, 0.95, 11.9, 0.85, { fontSize: 32, fontFace: displayFont, bold: t.titleWeight >= 650, charSpacing: t.tracking * 20 }); }
  function art(s, x, y, w, h, transparency = 0) {
    const svg = graphicSvg(d);
    const base64 = typeof Buffer !== 'undefined' ? Buffer.from(svg).toString('base64') : btoa(unescape(encodeURIComponent(svg)));
    s.addImage({ data: `data:image/svg+xml;base64,${base64}`, x, y, w, h, transparency });
  }
  const s1 = base(1), comp = l.composition;
  let titleBox = { x: 0.8, y: 2.1, w: 6.3, h: 2.2 }, artBox = { x: 7.4, y: 1.25, w: 5.2, h: 4.7 };
  if (comp === 'stack') { titleBox = { x: 1.0, y: 1.25, w: 11.3, h: 1.8 }; artBox = { x: 4.5, y: 3.95, w: 4.3, h: 2.3 }; }
  if (comp === 'island') { art(s1, 1, 0.8, 11.3, 5.7, 82); rect(s1, 2.1, 1.8, 9.1, 3.9, p.paper); titleBox = { x: 2.5, y: 2.1, w: 8.3, h: 2.2 }; artBox = null; }
  if (comp === 'rail') rect(s1, 0, 0, 0.22, H, p.accent);
  if (comp === 'frame') s1.addShape(pptx.ShapeType.rect, { x: 0.45, y: 0.75, w: 12.4, h: 5.8, line: { color: color(p.ink), width: d.surface.border }, fill: { color: color(p.paper), transparency: 100 } });
  if (comp === 'band') { rect(s1, 0, 0.7, W, 0.35, p.accent); titleBox.y = 2; }
  if (comp === 'diagonal') { s1.addShape(pptx.ShapeType.parallelogram, { x: 7.1, y: 0.8, w: 5.7, h: 5.7, fill: { color: color(p.panel) }, line: { transparency: 100 } }); }
  if (comp === 'type') { titleBox.w = 9.8; titleBox.y = 1.7; artBox = { x: 10, y: 4.5, w: 2.5, h: 1.8 }; }
  if (comp === 'offset') { titleBox.y = 1.4; artBox.y = 2.6; artBox.h = 3.2; }
  if (l.graphicSide === 'left' && ['split', 'rail', 'frame', 'diagonal', 'offset'].includes(comp)) { titleBox.x = 6.8; titleBox.w = 5.5; artBox.x = 0.7; artBox.w = 5.4; }
  if (artBox) art(s1, artBox.x, artBox.y, artBox.w, artBox.h);
  text(s1, c.eyebrow, titleBox.x, titleBox.y - 0.5, titleBox.w, 0.28, { fontSize: 10, color: color(p.muted), align: l.align });
  text(s1, c.title, titleBox.x, titleBox.y, titleBox.w, titleBox.h, { fontSize: language === 'en' ? (comp === 'type' ? 54 : 44) : 46, fontFace: displayFont, bold: t.titleWeight >= 650, align: l.align, charSpacing: t.tracking * 20 });
  text(s1, c.subtitle, titleBox.x, Math.min(titleBox.y + titleBox.h + 0.2, 5.9), titleBox.w, 0.5, { fontSize: 18, color: color(p.accentInk), align: l.align });

  const s2 = base(2); heading(s2, c.sectionTitle);
  text(s2, c.description, 0.75, 2.2, 6.3, 2.6, { fontSize: 24, fontFace: displayFont, valign: 'top', breakLine: false });
  rule(s2, 7.6, 2.2, 4.6, p.accent);
  c.sections.slice(0, 3).forEach(([a, b], i) => {
    text(s2, `0${i + 1}   ${a}`, 7.65, 2.4 + i * 1.2, 4.7, 0.35, { fontSize: 18, bold: true });
    text(s2, b, 7.65, 2.85 + i * 1.2, 4.6, 0.65, { fontSize: 14, valign: 'top', color: color(p.muted) });
  });

  const s3 = base(3); heading(s3, language === 'zh' ? '从观察到表达' : 'A process of expression');
  c.sections.slice(0, 3).forEach(([a, b], i) => {
    const x = 0.8 + i * 4.15, y = 2.6 + (l.rhythm === 'progressive' ? i * 0.28 : l.rhythm === 'alternating' ? (i % 2) * 0.45 : 0);
    text(s3, `0${i + 1}`, x, y, 3.5, 0.75, { fontSize: 40, color: color(p.accentInk), fontFace: displayFont });
    rule(s3, x, y + 1, 3.5, p.accent);
    text(s3, a, x, y + 1.2, 3.5, 0.5, { fontSize: 26, fontFace: displayFont });
    text(s3, b, x, y + 1.95, 3.35, 1.25, { fontSize: 17, valign: 'top' });
  });

  const s4 = base(4); heading(s4, c.dataTitle);
  text(s4, language === 'zh' ? '演示数据 · 非研究结果' : 'Illustrative data · not research results', 0.8, 1.9, 11.5, 0.35, { fontSize: 12, color: color(p.muted) });
  const labels = language === 'zh' ? ['观察', '构建', '交流'] : ['Observe', 'Build', 'Exchange'];
  s4.addChart(pptx.ChartType.bar, [{ name: language === 'zh' ? '示例数量' : 'Example count', labels, values: [24, 38, 31] }], {
    x: 0.85, y: 2.65, w: 8, h: 3.7, catAxisLabelFontFace: bodyFont, catAxisLabelFontSize: 16, valAxisLabelFontFace: bodyFont, valAxisLabelFontSize: 12,
    catAxisLabelColor: color(p.ink), valAxisLabelColor: color(p.muted), chartColors: [color(p.accent)], showLegend: false, showTitle: false,
    showValue: true, dataLabelFormatCode: '0', dataLabelColor: color(p.ink), dataLabelBkgrdColor: color(p.paper), dataLabelPosition: 'outEnd', dataLabelFormatCodeSourceLinked: false,
    showCatName: false, showMarker: false, valAxisMinVal: 0, valAxisMaxVal: 50, valAxisMajorUnit: 10,
    showBorder: false, showSerName: false, showShadow: false,
    catAxisLineColor: color(p.rule), valAxisLineColor: color(p.rule),
    valGridLine: { color: color(p.rule), width: 0.5 },
    chartArea: { fill: { color: color(p.paper) } }, plotArea: { fill: { color: color(p.paper) } },
    showPercent: false, lang: pptx.lang
  });
  text(s4, '38', 9.6, 3.1, 2.6, 1.1, { fontSize: 64, color: color(p.accentInk), fontFace: displayFont });
  text(s4, language === 'zh' ? '构建方向的示例数量' : 'Example count for Build', 9.6, 4.5, 2.6, 1, { fontSize: 17 });

  const s5 = base(5); heading(s5, language === 'zh' ? '为不同内容保留空间' : 'Room for different kinds of content');
  const rows = language === 'zh' ? [['内容', '表达重点', '呈现方式'], ['观点', '清晰的主次关系', '标题与段落'], ['过程', '步骤与关联', '原生形状与连线'], ['数据', '尺度与比较', '可编辑图表']] : [['Content', 'Focus', 'Presentation'], ['Ideas', 'Clear hierarchy', 'Headings and text'], ['Process', 'Steps and connections', 'Native shapes'], ['Data', 'Scale and comparison', 'Editable chart']];
  s5.addTable(rows, { x: 0.8, y: 2.4, w: 11.7, h: 3.1, colW: [2.1, 4.6, 5], rowH: 0.78, fontFace: bodyFont, fontSize: 18, color: color(p.ink), fill: color(p.paper), border: { type: 'solid', color: color(p.rule), pt: 0.7 }, margin: 0.16, bold: false, autoPage: false });
  text(s5, c.note, 0.8, 5.9, 11.5, 0.35, { fontSize: 10, color: color(p.muted) });

  const s6 = base(6); art(s6, 7.2, 1.3, 5.2, 4.7);
  text(s6, language === 'zh' ? '让下一次表达，\n有自己的形状' : 'Give the next idea\na shape of its own', 0.8, 2, 6.4, 2.5, { fontSize: language === 'zh' ? 36 : 38, fontFace: displayFont, bold: t.titleWeight >= 650 });
  text(s6, c.subtitle, 0.8, 5.1, 6, 0.6, { fontSize: 18, color: color(p.accentInk) });
  return pptx;
}

export async function writePresentation(design, fileName, options = {}) {
  return createPresentation(design, options).writeFile({ fileName });
}
