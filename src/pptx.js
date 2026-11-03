import PptxGenJS from 'pptxgenjs';
import { assertDesign } from './core/engine.js';
import { graphicSvg, textureSvg } from './core/graphics.js';
import { directionById } from './core/directions.js';
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
  function quote(value) {
    if (language !== 'zh') return value;
    // Explicit line breaks keep closing punctuation attached to the previous phrase
    // in renderers that do not implement Chinese line-breaking rules.
    const lines = [], characters = [...value];
    for (let start = 0; start < characters.length;) {
      let end = Math.min(start + 17, characters.length);
      while (end < characters.length && /[，。；：、！？）】》”’]/u.test(characters[end])) end++;
      lines.push(characters.slice(start, end).join('')); start = end;
    }
    return lines.join('\n');
  }
  function rect(s, x, y, w, h, fill) { s.addShape(pptx.ShapeType.rect, { x, y, w, h, line: { color: color(fill), transparency: 100 }, fill: { color: color(fill) } }); }
  function rule(s, x, y, w, fill = p.rule) { s.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color: color(fill), width: d.surface.border } }); }
  function base(number) {
    const s = pptx.addSlide(); s.background = { color: color(p.paper) };
    if (['grid', 'fine-lines', 'woven'].includes(d.surface.texture)) {
      for (let y = 0.2; y < 7.5; y += d.surface.texture === 'woven' ? 0.08 : 0.35) s.addShape(pptx.ShapeType.line, { x: 0, y, w: W, h: 0, line: { color: color(p.ink), transparency: 91, width: 0.35 } });
      if (d.surface.texture !== 'fine-lines') for (let x = 0.2; x < W; x += d.surface.texture === 'woven' ? 0.08 : 0.35) s.addShape(pptx.ShapeType.line, { x, y: 0, w: 0, h: H, line: { color: color(p.ink), transparency: 91, width: 0.35 } });
    } else if (['grain', 'fibres', 'halftone'].includes(d.surface.texture)) {
      const svg = textureSvg(d); const encoded = typeof Buffer !== 'undefined' ? Buffer.from(svg).toString('base64') : btoa(unescape(encodeURIComponent(svg)));
      s.addImage({ data: `data:image/svg+xml;base64,${encoded}`, x: 0, y: 0, w: W, h: H, transparency: 50 });
    }
    text(s, c.subtitle, 0.6, 0.25, 9.5, 0.24, { fontSize: 10, color: color(p.muted) });
    text(s, String(number).padStart(2, '0'), 11.8, 6.95, 0.8, 0.22, { fontSize: 10, align: 'right', color: color(p.muted) });
    rule(s, 0.6, 6.75, 12.1);
    if (number > 1 && d.direction === 'enamel') {
      s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 0.7, w: 12.5, h: 5.9, line: { color: color(p.rule), width: 0.7 }, fill: { color: color(p.paper), transparency: 100 } });
    }
    if (number > 1 && d.direction === 'textile') rect(s, 0.6, 0.72, 12.1, 0.06, p.accent);
    s.addNotes(`random-design ${d.algorithm}; rule fingerprint ${d.library}; design ${d.id}. Fictional demonstration content and chart values; no empirical claims. Fonts are referenced, not embedded. Decorative procedural artwork is an SVG image; text, shapes and charts are native editable objects.`);
    return s;
  }
  function heading(s, value) { text(s, value, 0.65, 0.95, 11.9, 0.85, { fontSize: 32, fontFace: displayFont, bold: t.titleWeight >= 650, charSpacing: t.tracking * 20 }); }
  function art(s, x, y, w, h, transparency = 0) {
    const svg = graphicSvg(d);
    const base64 = typeof Buffer !== 'undefined' ? Buffer.from(svg).toString('base64') : btoa(unescape(encodeURIComponent(svg)));
    s.addImage({ data: `data:image/svg+xml;base64,${base64}`, x, y, w, h, transparency });
  }
  const s1 = base(1), direction = directionById(d.direction);
  let titleBox = { x: 0.8, y: 2.0, w: 6.0, h: 2.5 }, artBox = { x: 7.0, y: 1.0, w: 5.5, h: 5.2 };
  let titleColor = p.ink, titleSize = 49, align = 'left';
  if (['edition', 'play'].includes(d.direction)) {
    rule(s1, 0.75, 1.4, 3.2, p.ink); titleSize = 52;
    if (d.direction === 'edition') rule(s1, 0.6, 0.75, 12.1, p.ink);
  }
  if (d.direction === 'atelier') {
    rect(s1, 0.8, 1.25, 6.2, 4.9, p.panel);
    rect(s1, 2.8, 1.12, 1.3, 0.23, p.accent2);
    titleBox = { x: 1.25, y: 2.0, w: 5.3, h: 2.5 }; titleColor = p.panelInk; titleSize = 43;
    artBox = { x: 7, y: 1.3, w: 5.5, h: 5.2 };
  }
  if (d.direction === 'enamel') {
    for (const inset of [0.55, 0.67]) s1.addShape(pptx.ShapeType.rect, { x: inset, y: 0.85 + inset - 0.55, w: W - 2 * inset, h: 5.6 - 2 * (inset - 0.55), line: { color: color(p.ink), width: inset === 0.55 ? 2 : 0.6 }, fill: { color: color(p.paper), transparency: 100 } });
    titleBox = { x: 1.15, y: 2.2, w: 11.0, h: 2.3 }; titleSize = 50; align = 'center';
    artBox = { x: 6.1, y: 1.0, w: 1.1, h: 1.05 };
  }
  if (d.direction === 'botanical') {
    titleSize = 45; titleBox.y = 2.15;
    s1.addShape(pptx.ShapeType.rect, { x: 7.05, y: 1.05, w: 5.25, h: 5.25, line: { color: color(p.ink), width: 0.7 }, fill: { transparency: 100, color: color(p.paper) } });
    artBox = { x: 7.25, y: 1.25, w: 4.8, h: 4.9 };
  }
  if (d.direction === 'blueprint') {
    s1.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.85, w: 12.3, h: 5.65, line: { color: color(p.ink), width: 0.7 }, fill: { transparency: 100, color: color(p.paper) } });
    titleSize = 43; rule(s1, 6.8, 1.1, 0.01, p.ink);
  }
  if (d.direction === 'textile') {
    rect(s1, 7.05, 0.8, 5.8, 5.85, p.panel); rect(s1, 6.92, 0.8, 0.13, 5.85, p.accent);
    artBox = { x: 7.05, y: 0.9, w: 5.8, h: 5.6 }; titleSize = 46;
  }
  if (d.direction === 'journal') {
    titleBox = { x: 0.85, y: 1.75, w: 10.5, h: 2.9 }; titleSize = 60;
    artBox = { x: 10.3, y: 4.5, w: 2, h: 1.9 };
    rule(s1, 0.85, 1.35, 10.8, p.ink);
  }
  if (artBox) art(s1, artBox.x, artBox.y, artBox.w, artBox.h);
  const eyebrowY = d.direction === 'enamel' ? 1.92 : titleBox.y - 0.5;
  text(s1, c.eyebrow, titleBox.x, eyebrowY, titleBox.w, 0.25, { fontSize: 9, color: color(titleColor), align });
  text(s1, c.title, titleBox.x, titleBox.y, titleBox.w, titleBox.h, { fontSize: language === 'en' ? titleSize - 4 : titleSize, color: color(titleColor), fontFace: displayFont, bold: t.titleWeight >= 650, align, charSpacing: t.tracking * 20 });
  text(s1, c.subtitle, titleBox.x, Math.min(titleBox.y + titleBox.h + 0.23, 5.8), titleBox.w, 0.45, { fontSize: 17, color: color(d.direction === 'atelier' ? p.panelInk : p.ink), align });

  const s2 = base(2); heading(s2, c.sectionTitle);
  rect(s2, 0.65, 2.05, 6.45, 4.2, p.panel);
  text(s2, quote(c.description), 1.0, 2.5, 5.7, 2.8, { fontSize: language === 'zh' ? 21 : 24, color: color(p.panelInk), fontFace: displayFont, valign: 'top', breakLine: false });
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

  const s6 = base(6), sign = d.direction === 'enamel', editorial = d.direction === 'journal';
  if (sign) art(s6, 6.1, 1.15, 1.1, 1.05);
  else if (editorial) art(s6, 10.1, 4.45, 2.1, 1.95);
  else art(s6, 7.2, 1.3, 5.2, 4.7);
  const endWidth = sign ? 11.7 : editorial ? 9.4 : 6.4;
  text(s6, language === 'zh' ? '让下一次表达，\n有自己的形状' : 'Give the next idea\na shape of its own', 0.8, sign ? 2.35 : 2, endWidth, 2.5, { fontSize: language === 'zh' ? 36 : 38, fontFace: displayFont, bold: t.titleWeight >= 650, align: sign ? 'center' : 'left' });
  text(s6, c.subtitle, 0.8, 5.1, endWidth, 0.6, { fontSize: 18, color: color(p.accentInk), align: sign ? 'center' : 'left' });
  return pptx;
}

export async function writePresentation(design, fileName, options = {}) {
  return createPresentation(design, options).writeFile({ fileName });
}
