import { z } from 'zod';
import { FONTS } from './fonts.js';
import { contrast, makePalette, colorCoordinates, COLOUR_FAMILIES, COLOUR_NAMES, PALETTE_RELATIONS } from './color.js';
import { DIRECTIONS, DIRECTION_IDS, directionById, TEXTURES, DIRECTION_COLOURS } from './directions.js';
import { VERSION, between, canonical, clamp, digest, freshSeed, pick, rng, round } from './util.js';

export const COMPOSITIONS = [...new Set(DIRECTIONS.flatMap(d => d.layouts))];
export const GRAPHICS = [...new Set(DIRECTIONS.flatMap(d => d.graphics))];
export const SCENARIOS = ['academic', 'business', 'product', 'culture', 'creative', 'general'];
const hex = z.string().regex(/^#[\da-fA-F]{6}$/);
const PaletteSchema = z.object({ mode: z.enum(['light', 'dark']), family: z.string().max(30), hue: z.number().min(0).max(360), harmony: z.number().finite(), chroma: z.number().finite(), paper: hex, ink: hex, muted: hex, accent: hex, accentInk: hex, accent2: hex, panel: hex, panelInk: hex, rule: hex, onAccent: hex }).strict();
export const RequestSchema = z.object({
  count: z.number().int().min(1).max(8).default(5),
  seed: z.string().min(1).max(240).optional(),
  scenario: z.enum(SCENARIOS).default('general'),
  mode: z.enum(['light', 'dark', 'mixed']).default('mixed'),
  colorfulness: z.enum(['rich', 'balanced', 'neutral']).default('rich'),
  direction: z.enum(DIRECTION_IDS).optional(),
  intensity: z.enum(['calm', 'balanced', 'bold']).default('balanced'),
  language: z.enum(['zh', 'en']).default('zh'),
  brand: hex.optional(),
  locks: z.object({
    palette: PaletteSchema.optional(),
    font: z.enum(FONTS.map(f => f.id)).optional(),
    graphic: z.enum(GRAPHICS).optional(),
    composition: z.enum(COMPOSITIONS).optional()
  }).strict().default({}),
  minDistance: z.number().min(0.05).max(0.8).default(0.22),
  recentWindow: z.number().int().min(0).max(2000).default(40),
  attempts: z.number().int().min(20).max(3000).default(1400)
}).strict();

export const RULES = {
  algorithm: VERSION,
  fonts: FONTS,
  compositions: COMPOSITIONS,
  graphics: GRAPHICS,
  scenarios: SCENARIOS,
  directions: DIRECTIONS,
  directionColours: DIRECTION_COLOURS,
  colours: COLOUR_FAMILIES,
  paletteRelations: PALETTE_RELATIONS,
  implementation: 'art-direction-colour-material/2.1'
};
// Bump VERSION after any behavioral rule change; fingerprint also identifies the declarative pools.
export const LIBRARY = digest(RULES).slice(0, 16);
const number = z.number().finite();
const DesignSchema = z.object({
  schema: z.literal(2), algorithm: z.literal(VERSION), library: z.literal(LIBRARY),
  direction: z.enum(DIRECTION_IDS),
  seed: z.string().min(1).max(260), scenario: z.enum(SCENARIOS), intensity: z.enum(['calm', 'balanced', 'bold']),
  palette: PaletteSchema,
  typography: z.object({ id: z.enum(FONTS.map(f => f.id)), display: z.string().max(80), body: z.string().max(80), cjk: z.string().max(80), kind: z.enum(['serif', 'sans', 'condensed', 'mono', 'handwritten']), weight: number.min(100).max(900), scale: number.min(1.1).max(1.6), tracking: number.min(-0.06).max(0.05), lineHeight: number.min(1.2).max(2), titleWeight: number.min(100).max(900) }).strict(),
  layout: z.object({ composition: z.enum(COMPOSITIONS), density: number.min(0).max(1), margin: number.min(4).max(11), split: number.min(0.3).max(0.7), align: z.enum(['left', 'center']), tilt: number.min(-20).max(20), columns: z.union([z.literal(6), z.literal(8), z.literal(12)]), graphicSide: z.enum(['left', 'right']), rhythm: z.enum(['even', 'progressive', 'alternating']) }).strict(),
  graphic: z.object({ family: z.enum(GRAPHICS), seed: number.int().min(0).max(0xffffffff), count: number.int().min(1).max(32), stroke: number.min(0.5).max(10), amplitude: number.min(0).max(1), filled: z.boolean(), symmetry: z.enum(['radial', 'bilateral', 'asymmetric']), rotation: number.min(-90).max(90) }).strict(),
  surface: z.object({ texture: z.enum(TEXTURES), radius: number.min(0).max(40), border: number.min(0.5).max(4), depth: z.enum(['flat', 'offset', 'soft']), grain: number.min(0).max(1), registration: number.min(0).max(8) }).strict(),
  id: z.string().regex(/^[a-f0-9]{64}$/), name: z.object({ zh: z.string().max(120), en: z.string().max(120) }).strict(), novelty: number.min(0).max(1).optional()
}).strict();
const visualOf = d => {
  const keys = { interlock: ['amplitude'], fold: ['amplitude'], 'cut-paper': ['seed'], seal: ['count', 'amplitude'], medallion: ['count', 'amplitude'], botanical: ['seed', 'count', 'amplitude'], isometric: ['amplitude'], guilloche: ['count', 'amplitude', 'stroke'], weave: ['count'], tiles: ['count'], 'editorial-mark': [] }[d.graphic.family] ?? [];
  const graphic = Object.fromEntries(['family', ...keys].map(k => [k, d.graphic[k]]));
  if (graphic.family === 'tiles') graphic.count = Math.min(5, graphic.count);
  const layout = { ...d.layout }; delete layout.tilt;
  if (!['grid', 'fine-lines'].includes(d.surface.texture)) delete layout.columns;
  return { direction: d.direction, palette: d.palette, typography: d.typography, layout, graphic, surface: d.surface };
};
export const designId = d => digest(visualOf(d));

function sample(seed, request) {
  const r = rng(`${VERSION}:${seed}`);
  const { scenario, intensity, locks } = request;
  const formal = ['academic', 'business'].includes(scenario);
  const calm = intensity === 'calm';
  const bold = intensity === 'bold';
  let languages = DIRECTIONS;
  if (request.direction) languages = languages.filter(d => d.id === request.direction);
  if (locks.graphic) languages = languages.filter(d => d.graphics.includes(locks.graphic));
  if (locks.composition) languages = languages.filter(d => d.layouts.includes(locks.composition));
  if (formal && !bold && !request.direction && !locks.graphic && !locks.composition) languages = languages.filter(d => ['blueprint', 'journal', 'edition', 'textile', 'botanical'].includes(d.id));
  if (!languages.length) throw new Error('The locked graphic and composition do not share an art-direction grammar. Unlock one dimension.');
  const art = pick(r, languages);
  const fontPool = FONTS.filter(f => art.fonts.includes(f.id));
  const font = locks.font ? FONTS.find(f => f.id === locks.font) : pick(r, fontPool);
  const palette = locks.palette ? structuredClone(locks.palette) : makePalette(r, { mode: request.mode, brand: request.brand, colorfulness: request.colorfulness, families: DIRECTION_COLOURS[art.id], direction: art.id });
  // Screen-print graphics use exactly two inks on the generated stock colour.
  if (!locks.palette && art.id === 'edition') palette.accent2 = palette.accent;
  const compositions = art.layouts;
  const composition = locks.composition ?? pick(r, compositions);
  const density = round(between(r, calm ? 0.12 : 0.25, formal ? 0.66 : 0.88));
  const tilt = 0;
  const graphic = {
    family: locks.graphic ?? pick(r, art.graphics),
    seed: Math.floor(r() * 0xffffffff),
    count: Math.floor(between(r, 4, art.id === 'textile' ? 9 : 7)),
    stroke: round(between(r, 1, art.id === 'blueprint' ? 2 : 3.5)),
    amplitude: round(between(r, 0.12, bold ? 0.95 : 0.65)),
    filled: r() < (font.kind === 'condensed' ? 0.7 : 0.4),
    symmetry: 'asymmetric',
    rotation: 0
  };
  const design = {
    schema: 2, algorithm: VERSION, library: LIBRARY, direction: art.id,
    seed, scenario, intensity,
    palette,
    typography: { ...font, scale: round(between(r, calm ? 1.18 : 1.22, bold ? 1.55 : 1.4)), tracking: round(between(r, -0.045, 0.015)), lineHeight: round(between(r, 1.45, 1.72)), titleWeight: font.weight },
    layout: { composition, density, margin: round(between(r, 4, calm ? 11 : 8.5)), split: round(between(r, 0.36, 0.66)), align: art.id === 'enamel' ? 'center' : 'left', tilt, columns: pick(r, [6, 8, 12]), graphicSide: ['edition', 'atelier', 'play'].includes(art.id) ? pick(r, ['left', 'right']) : 'right', rhythm: pick(r, ['even', 'progressive', 'alternating']) },
    graphic,
    surface: { texture: pick(r, art.textures), radius: 0, border: art.id === 'enamel' ? 2.5 : 1, depth: art.id === 'atelier' ? 'offset' : 'flat', grain: round(between(r, 0.1, 0.28)), registration: art.id === 'edition' ? round(between(r, 2, 5)) : 0 }
  };
  design.id = designId(design);
  design.name = { zh: `${art.name.zh} · ${COLOUR_NAMES[palette.family]}`, en: `${art.name.en} / ${palette.family}` };
  return design;
}

export function validateDesign(d) {
  const issues = [];
  if (!d || d.schema !== 2 || d.algorithm !== VERSION || d.library !== LIBRARY) return { valid: false, issues: ['Unsupported schema, algorithm or rule fingerprint; use the matching version.'] };
  const structure = DesignSchema.safeParse(d);
  if (!structure.success) return { valid: false, issues: structure.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) };
  try {
    if (!COMPOSITIONS.includes(d.layout.composition) || !GRAPHICS.includes(d.graphic.family) || !FONTS.some(f => f.id === d.typography.id)) issues.push('Unknown visual grammar');
    if (designId(d) !== d.id) issues.push('Visual fingerprint mismatch');
    for (const key of ['paper', 'ink', 'muted', 'accent', 'accentInk', 'accent2', 'panel', 'rule', 'onAccent']) if (!/^#[\da-f]{6}$/i.test(d.palette[key])) issues.push(`Invalid colour ${key}`);
    if (contrast(d.palette.ink, d.palette.paper) < 4.5) issues.push('Body contrast below 4.5:1');
    if (contrast(d.palette.muted, d.palette.paper) < 4.5) issues.push('Secondary text contrast below 4.5:1');
    if (contrast(d.palette.accentInk, d.palette.paper) < 4.5) issues.push('Accent text contrast below 4.5:1');
    if (contrast(d.palette.onAccent, d.palette.accent) < 4.5) issues.push('Button contrast below 4.5:1');
    if (contrast(d.palette.panelInk, d.palette.panel) < 4.5) issues.push('Panel text contrast below 4.5:1');
    const art = directionById(d.direction);
    if (!art.graphics.includes(d.graphic.family) || !art.layouts.includes(d.layout.composition)) issues.push('Graphic/composition violates the art-direction grammar');
    if (!Number.isFinite(d.layout.density) || d.layout.density < 0 || d.layout.density > 1) issues.push('Invalid density');
    if (!Number.isFinite(d.layout.margin) || d.layout.margin < 4 || d.layout.margin > 11 || !Number.isFinite(d.layout.split) || d.layout.split < 0.3 || d.layout.split > 0.7) issues.push('Invalid layout geometry');
    if (!Number.isFinite(d.typography.scale) || d.typography.scale < 1.1 || d.typography.scale > 1.6) issues.push('Invalid type scale');
    if (!Number.isInteger(d.graphic.count) || d.graphic.count < 1 || d.graphic.count > 32 || !Number.isFinite(d.graphic.seed) || !Number.isFinite(d.graphic.stroke) || d.graphic.stroke < 0.5 || d.graphic.stroke > 10 || !Number.isFinite(d.graphic.amplitude) || d.graphic.amplitude < 0 || d.graphic.amplitude > 1 || !Number.isFinite(d.graphic.rotation)) issues.push('Invalid graphic geometry');
    if (!art.textures.includes(d.surface.texture) || !['flat', 'offset'].includes(d.surface.depth) || !Number.isFinite(d.surface.radius)) issues.push('Invalid surface');
    const font = FONTS.find(f => f.id === d.typography.id);
    if (font && ['display', 'body', 'cjk', 'kind'].some(k => d.typography[k] !== font[k])) issues.push('Font metadata mismatch');
  } catch { issues.push('Incomplete design object'); }
  return { valid: issues.length === 0, issues, contrast: issues.length ? undefined : { body: round(contrast(d.palette.ink, d.palette.paper), 2), muted: round(contrast(d.palette.muted, d.palette.paper), 2), accentText: round(contrast(d.palette.accentInk, d.palette.paper), 2) } };
}
export function assertDesign(d) {
  const report = validateDesign(d);
  if (!report.valid) throw new Error(report.issues.join('; '));
  return d;
}

export function signature(d) {
  const canvas = colorCoordinates(d.palette.paper);
  return { id: d.id, direction: d.direction, colourFamily: d.palette.family, canvasL: canvas.l, hue: canvas.h, mode: d.palette.mode, chroma: canvas.c, harmony: d.palette.harmony, font: d.typography.id, kind: d.typography.kind, scale: d.typography.scale, composition: d.layout.composition, density: d.layout.density, split: d.layout.split, graphic: d.graphic.family, filled: false, count: d.graphic.count, amplitude: d.graphic.amplitude, texture: d.surface.texture, depth: d.surface.depth };
}
export function distance(a, b) {
  const hue = Math.abs(a.hue - b.hue) % 360;
  return clamp(
    0.20 * (a.direction !== b.direction) + 0.08 * (a.colourFamily !== b.colourFamily) + 0.17 * Math.min(hue, 360 - hue) / 180 +
    0.08 * Math.abs(a.canvasL - b.canvasL) + 0.04 * Math.min(1, Math.abs(a.chroma - b.chroma) / 0.14) +
    0.08 * (a.font !== b.font) + 0.04 * (a.kind !== b.kind) +
    0.10 * (a.composition !== b.composition) + 0.09 * (a.graphic !== b.graphic) +
    0.05 * Math.abs(a.density - b.density) +
    0.04 * Math.abs(a.scale - b.scale) / 0.4 + 0.025 * Math.abs(a.split - b.split) / 0.3 +
    0.025 * Math.abs(a.amplitude - b.amplitude) + 0.025 * (a.texture !== b.texture) +
    0.015 * (a.depth !== b.depth), 0, 1);
}
export function generate(options = {}, history = []) {
  const request = RequestSchema.parse(options);
  if (request.locks.palette && request.brand && request.locks.palette.accent.toLowerCase() !== request.brand.toLowerCase()) throw new Error('Locked palette conflicts with brand colour');
  if (request.locks.palette && request.mode !== 'mixed' && request.locks.palette.mode !== request.mode) throw new Error('Locked palette conflicts with light/dark mode');
  const seed = request.seed ?? freshSeed();
  const used = new Set(history.map(h => h.id));
  const recent = request.recentWindow ? history.slice(-request.recentWindow).map(h => h.signature ?? h) : [];
  const designs = [], selected = [];
  let tried = 0, rejectedQuality = 0, rejectedNovelty = 0;
  // Best-candidate sampling: collect several valid candidates, then maximize minimum distance.
  while (designs.length < request.count && tried < request.attempts) {
    let best;
    for (let j = 0; j < 24 && tried < request.attempts; j++) {
      const d = sample(`${seed}/${tried++}`, request);
      if (!validateDesign(d).valid) { rejectedQuality++; continue; }
      const s = signature(d);
      if (!request.direction && selected.some(p => p.direction === s.direction) && designs.length < Math.min(request.count, 5) && !request.locks.graphic && !request.locks.composition) { rejectedNovelty++; continue; }
      if (!request.locks.palette && !request.direction && !request.locks.graphic && request.colorfulness === 'rich' && selected.some(p => p.colourFamily === s.colourFamily) && designs.length < Math.min(request.count, request.mode === 'mixed' ? 8 : 6)) { rejectedNovelty++; continue; }
      if (used.has(d.id)) { rejectedNovelty++; continue; }
      const peers = [...recent, ...selected];
      const novelty = peers.length ? Math.min(...peers.map(p => distance(s, p))) : 1;
      if (novelty < request.minDistance) { rejectedNovelty++; continue; }
      if (!best || novelty > best.novelty) best = { d, s, novelty };
    }
    if (!best) continue;
    best.d.novelty = round(best.novelty);
    designs.push(best.d); selected.push(best.s); used.add(best.d.id);
  }
  if (designs.length !== request.count) throw new Error(`Novelty exhausted under these constraints: ${designs.length}/${request.count} accepted in ${tried} attempts. Unlock a dimension, reduce count, or explicitly choose a lower minDistance. Nothing was recorded.`);
  return { schema: 2, algorithm: VERSION, library: LIBRARY, seed, request, designs, diagnostics: { tried, rejectedQuality, rejectedNovelty, minDistance: request.minDistance, recentCompared: recent.length, exactCompared: history.length, distanceType: 'art direction + actual canvas colour + visual attributes (not a perceptual proof)' } };
}
export function reproduce(bundle) {
  if (bundle.library !== LIBRARY || bundle.algorithm !== VERSION) throw new Error('Rule version mismatch; use the original release');
  return (bundle.designs ?? [bundle]).map(assertDesign);
}
export function historyEntries(bundle) {
  return bundle.designs.map(d => ({ id: d.id, signature: signature(d), at: new Date().toISOString(), status: 'shown', algorithm: VERSION, library: LIBRARY }));
}
export const fingerprint = () => canonical(RULES);
