// Art-direction grammars: constrain type, composition, material and the role of the graphic.
export const DIRECTIONS = [
  { id: 'edition', name: { zh: '套色版画', en: 'Colour edition' }, source: 'Two-ink exhibition prints', role: 'One interlocking emblem; two opaque inks and one registration offset.', graphics: ['interlock', 'fold'], layouts: ['split', 'type', 'band'], fonts: ['poster', 'industrial', 'geometric', 'cjk-condensed'], textures: ['grain', 'halftone'], edge: 'square', motif: 'register', type: 'display' },
  { id: 'atelier', name: { zh: '剪纸工坊', en: 'Paper atelier' }, source: 'Cut-paper studies and hand-bound art books', role: 'A single three-piece composition with cast paper edges, not floating confetti.', graphics: ['cut-paper', 'fold'], layouts: ['offset', 'split', 'frame'], fonts: ['humanist', 'literary', 'cjk-literary'], textures: ['fibres', 'grain'], edge: 'cut', motif: 'tape', type: 'literary' },
  { id: 'enamel', name: { zh: '珐琅招牌', en: 'Enamel sign' }, source: 'Painted enamel signs and shop fascia', role: 'A typographic seal and nested sign border; ornament frames the name.', graphics: ['seal', 'medallion'], layouts: ['stack', 'frame', 'band'], fonts: ['cjk-brush', 'cjk-literary', 'classic', 'editorial'], textures: ['enamel', 'none'], edge: 'double', motif: 'border', type: 'sign' },
  { id: 'botanical', name: { zh: '植物图鉴', en: 'Botanical folio' }, source: 'Botanical specimens and coloured field-guide plates', role: 'One coherent specimen: alternating tapered leaves attached to a shared curved stem, fine veins and a measured plate border.', graphics: ['botanical'], layouts: ['rail', 'split', 'offset'], fonts: ['book', 'literary', 'classic', 'cjk-literary'], textures: ['fibres', 'grain'], edge: 'square', motif: 'specimen', type: 'literary' },
  { id: 'blueprint', name: { zh: '蓝晒图纸', en: 'Cyanotype study' }, source: 'Engineering sheets and cyanotype contact prints', role: 'A constructed form with projection lines; every line describes the same geometry.', graphics: ['isometric', 'guilloche'], layouts: ['rail', 'frame', 'split'], fonts: ['technical', 'instrument', 'industrial'], textures: ['grid', 'fine-lines'], edge: 'square', motif: 'measure', type: 'technical' },
  { id: 'textile', name: { zh: '织物图样', en: 'Woven rhythm' }, source: 'Warp/weft repeats and jacquard textiles', role: 'One tessellated repeat unit, consistent weave direction and a clear selvedge.', graphics: ['weave', 'tiles'], layouts: ['band', 'split', 'frame'], fonts: ['humanist', 'rounded', 'cjk-literary', 'architect'], textures: ['woven', 'none'], edge: 'square', motif: 'selvedge', type: 'humanist' },
  { id: 'journal', name: { zh: '艺术刊物', en: 'Editorial colour' }, source: 'Art journals and exhibition catalogues', role: 'Typography is the primary image; a small ruled mark stays secondary.', graphics: ['editorial-mark'], layouts: ['type', 'rail', 'split'], fonts: ['editorial', 'book', 'classic', 'literary'], textures: ['grain', 'none'], edge: 'square', motif: 'colophon', type: 'editorial' },
  { id: 'play', name: { zh: '几何游乐', en: 'Constructed play' }, source: 'Modular posters and toy construction sets', role: 'Three connected units balanced on one axis; no arbitrary rotations or transparent copies.', graphics: ['interlock', 'tiles'], layouts: ['diagonal', 'split', 'island'], fonts: ['geometric', 'rounded', 'cjk-playful', 'cjk-condensed'], textures: ['none', 'halftone'], edge: 'square', motif: 'modules', type: 'display' }
];
export const DIRECTION_IDS = DIRECTIONS.map(d => d.id);
// Keep only variants that the current renderers actually distinguish.
for (const d of DIRECTIONS) {
  if (d.id === 'enamel') d.layouts = ['stack'];
  if (d.id === 'journal') d.layouts = ['type'];
  if (d.id === 'blueprint') d.layouts = ['rail', 'frame'];
  if (d.id === 'edition') d.layouts = ['split', 'band'];
  if (d.id === 'play') d.layouts = ['split'];
}
export const DIRECTION_COLOURS = {
  blueprint: ['cobalt', 'ocean', 'aqua'],
  botanical: ['pistachio', 'jade', 'umber', 'rose', 'apricot'],
  enamel: ['vermilion', 'jade', 'cobalt', 'citrus', 'umber', 'pistachio'],
  textile: ['apricot', 'jade', 'umber', 'cobalt', 'lilac', 'rose'],
  atelier: ['aqua', 'rose', 'lilac', 'apricot', 'pistachio', 'wine', 'umber'],
  play: ['citrus', 'cobalt', 'vermilion', 'aqua', 'lilac', 'apricot']
};
export const directionById = id => DIRECTIONS.find(d => d.id === id);
export const TEXTURES = ['none', 'fine-lines', 'dots', 'grid', 'grain', 'fibres', 'halftone', 'woven', 'enamel'];
