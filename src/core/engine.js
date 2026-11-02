import { z } from 'zod';
import { FONTS } from './fonts.js';
import { contrast, makePalette } from './color.js';
import { VERSION, between, canonical, clamp, digest, freshSeed, pick, rng, round } from './util.js';

export const COMPOSITIONS = ['split', 'stack', 'rail', 'frame', 'diagonal', 'island', 'type', 'band', 'offset'];
export const GRAPHICS = ['orbits', 'contours', 'ribbon', 'cells', 'lattice', 'rays', 'steps', 'arches', 'constellation', 'waves'];
export const SCENARIOS = ['academic', 'business', 'product', 'culture', 'creative', 'general'];
const hex = z.string().regex(/^#[\da-fA-F]{6}$/);
const PaletteSchema = z.object({ mode: z.enum(['light', 'dark']), hue: z.number().min(0).max(360), harmony: z.number().finite(), chroma: z.number().finite(), paper: hex, ink: hex, muted: hex, accent: hex, accentInk: hex, accent2: hex, panel: hex, rule: hex, onAccent: hex }).strict();
export const RequestSchema = z.object({
  count: z.number().int().min(1).max(8).default(5),
  seed: z.string().min(1).max(240).optional(),
  scenario: z.enum(SCENARIOS).default('general'),
  mode: z.enum(['light', 'dark', 'mixed']).default('mixed'),
  intensity: z.enum(['calm', 'balanced', 'bold']).default('balanced'),
  language: z.enum(['zh', 'en']).default('zh'),
  brand: hex.optional(),
  locks: z.object({
    palette: PaletteSchema.optional(),
    font: z.enum(FONTS.map(f => f.id)).optional(),
    graphic: z.enum(GRAPHICS).optional(),
    composition: z.enum(COMPOSITIONS).optional()
  }).strict().default({}),
  minDistance: z.number().min(0.05).max(0.8).default(0.25),
  recentWindow: z.number().int().min(0).max(2000).default(80),
  attempts: z.number().int().min(20).max(3000).default(700)
}).strict();

export const RULES = {
  algorithm: VERSION,
  fonts: FONTS,
  compositions: COMPOSITIONS,
  graphics: GRAPHICS,
  scenarios: SCENARIOS,
  implementation: 'oklch-grammar-novelty/1'
};
// Bump VERSION after any behavioral rule change; fingerprint also identifies the declarative pools.
export const LIBRARY = digest(RULES).slice(0, 16);
const number = z.number().finite();
const DesignSchema = z.object({
  schema: z.literal(1), algorithm: z.literal(VERSION), library: z.literal(LIBRARY),
  seed: z.string().min(1).max(260), scenario: z.enum(SCENARIOS), intensity: z.enum(['calm', 'balanced', 'bold']),
  palette: PaletteSchema,
  typography: z.object({ id: z.enum(FONTS.map(f => f.id)), display: z.string().max(80), body: z.string().max(80), cjk: z.string().max(80), kind: z.enum(['serif', 'sans', 'condensed', 'mono', 'handwritten']), weight: number.min(100).max(900), scale: number.min(1.1).max(1.6), tracking: number.min(-0.06).max(0.05), lineHeight: number.min(1.2).max(2), titleWeight: number.min(100).max(900) }).strict(),
  layout: z.object({ composition: z.enum(COMPOSITIONS), density: number.min(0).max(1), margin: number.min(4).max(11), split: number.min(0.3).max(0.7), align: z.enum(['left', 'center']), tilt: number.min(-20).max(20), columns: z.union([z.literal(6), z.literal(8), z.literal(12)]), graphicSide: z.enum(['left', 'right']), rhythm: z.enum(['even', 'progressive', 'alternating']) }).strict(),
  graphic: z.object({ family: z.enum(GRAPHICS), seed: number.int().min(0).max(0xffffffff), count: number.int().min(1).max(32), stroke: number.min(0.5).max(10), amplitude: number.min(0).max(1), filled: z.boolean(), symmetry: z.enum(['radial', 'bilateral', 'asymmetric']), rotation: number.min(-90).max(90) }).strict(),
  surface: z.object({ texture: z.enum(['none', 'fine-lines', 'dots', 'grid']), radius: number.min(0).max(40), border: number.min(0.5).max(4), depth: z.enum(['flat', 'offset', 'soft']) }).strict(),
  id: z.string().regex(/^[a-f0-9]{64}$/), name: z.object({ zh: z.string().max(120), en: z.string().max(120) }).strict(), novelty: number.min(0).max(1).optional()
}).strict();
const visualOf = d => {
  const graphic = { ...d.graphic };
  // Only operators that actually sample geometry use this seed. Do not count invisible randomness.
  if (!['cells', 'constellation'].includes(graphic.family)) delete graphic.seed;
  if (graphic.family !== 'cells') delete graphic.filled;
  if (graphic.family === 'steps') delete graphic.stroke;
  return { palette: d.palette, typography: d.typography, layout: d.layout, graphic, surface: d.surface };
};
export const designId = d => digest(visualOf(d));

function sample(seed, request) {
  const r = rng(`${VERSION}:${seed}`);
  const { scenario, intensity, locks } = request;
  const formal = ['academic', 'business'].includes(scenario);
  const calm = intensity === 'calm';
  const bold = intensity === 'bold';
  const excluded = formal && !bold ? ['poster', 'rounded', 'instrument', 'cjk-literary', 'cjk-condensed', 'cjk-playful', 'cjk-brush'] : scenario === 'product' ? ['classic', 'editorial', 'book', 'cjk-playful', 'cjk-brush'] : [];
  const fontPool = FONTS.filter(f => !excluded.includes(f.id));
  const font = locks.font ? FONTS.find(f => f.id === locks.font) : pick(r, fontPool);
  const mode = request.mode === 'mixed' ? (r() < 0.33 ? 'dark' : 'light') : request.mode;
  const palette = locks.palette ? structuredClone(locks.palette) : makePalette(r, { mode, brand: request.brand });
  const compositions = formal && !bold ? ['split', 'stack', 'rail', 'frame', 'type', 'band'] : scenario === 'product' && !bold ? ['split', 'stack', 'rail', 'island', 'band', 'offset'] : COMPOSITIONS;
  const composition = locks.composition ?? pick(r, compositions);
  const density = round(between(r, calm ? 0.12 : 0.25, formal ? 0.66 : 0.88));
  const tilt = composition === 'diagonal' ? round(between(r, -14, -4)) : 0;
  const graphic = {
    family: locks.graphic ?? pick(r, GRAPHICS),
    seed: Math.floor(r() * 0xffffffff),
    count: Math.floor(between(r, calm ? 4 : 6, bold ? 22 : 15)),
    stroke: round(between(r, calm ? 0.8 : 1.2, bold ? 8 : 4)),
    amplitude: round(between(r, 0.12, bold ? 0.95 : 0.65)),
    filled: r() < (font.kind === 'condensed' ? 0.7 : 0.4),
    symmetry: pick(r, ['radial', 'bilateral', 'asymmetric']),
    rotation: round(between(r, -45, 45))
  };
  const design = {
    schema: 1, algorithm: VERSION, library: LIBRARY,
    seed, scenario, intensity,
    palette,
    typography: { ...font, scale: round(between(r, calm ? 1.18 : 1.22, bold ? 1.55 : 1.4)), tracking: round(between(r, -0.045, 0.015)), lineHeight: round(between(r, 1.45, 1.72)), titleWeight: font.weight },
    layout: { composition, density, margin: round(between(r, 4, calm ? 11 : 8.5)), split: round(between(r, 0.36, 0.66)), align: composition === 'stack' || composition === 'island' ? 'center' : 'left', tilt, columns: pick(r, [6, 8, 12]), graphicSide: pick(r, ['left', 'right']), rhythm: pick(r, ['even', 'progressive', 'alternating']) },
    graphic,
    surface: { texture: pick(r, calm ? ['none', 'fine-lines'] : ['none', 'fine-lines', 'dots', 'grid']), radius: font.kind === 'serif' || graphic.family === 'lattice' ? 0 : round(between(r, 0, 28)), border: round(between(r, 0.6, bold ? 3 : 1.8)), depth: calm || formal ? 'flat' : pick(r, ['flat', 'offset', 'soft']) }
  };
  design.id = designId(design);
  design.name = { zh: `${({ split: '交错', stack: '轴心', rail: '侧序', frame: '框景', diagonal: '斜构', island: '浮岛', type: '字场', band: '横幅', offset: '错位' })[composition]} · ${({ orbits: '轨道', contours: '等高线', ribbon: '缎带', cells: '晶格', lattice: '线网', rays: '光束', steps: '阶梯', arches: '拱门', constellation: '星群', waves: '波纹' })[graphic.family]}`, en: `${composition} / ${graphic.family}` };
  return design;
}

export function validateDesign(d) {
  const issues = [];
  if (!d || d.schema !== 1 || d.algorithm !== VERSION || d.library !== LIBRARY) return { valid: false, issues: ['Unsupported schema, algorithm or rule fingerprint; use the matching version.'] };
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
    if (!Number.isFinite(d.layout.density) || d.layout.density < 0 || d.layout.density > 1) issues.push('Invalid density');
    if (!Number.isFinite(d.layout.margin) || d.layout.margin < 4 || d.layout.margin > 11 || !Number.isFinite(d.layout.split) || d.layout.split < 0.3 || d.layout.split > 0.7) issues.push('Invalid layout geometry');
    if (!Number.isFinite(d.typography.scale) || d.typography.scale < 1.1 || d.typography.scale > 1.6) issues.push('Invalid type scale');
    if (!Number.isInteger(d.graphic.count) || d.graphic.count < 1 || d.graphic.count > 32 || !Number.isFinite(d.graphic.seed) || !Number.isFinite(d.graphic.stroke) || d.graphic.stroke < 0.5 || d.graphic.stroke > 10 || !Number.isFinite(d.graphic.amplitude) || d.graphic.amplitude < 0 || d.graphic.amplitude > 1 || !Number.isFinite(d.graphic.rotation)) issues.push('Invalid graphic geometry');
    if (!['none', 'fine-lines', 'dots', 'grid'].includes(d.surface.texture) || !['flat', 'soft', 'offset'].includes(d.surface.depth) || !Number.isFinite(d.surface.radius)) issues.push('Invalid surface');
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
  return { id: d.id, hue: d.palette.hue, mode: d.palette.mode, chroma: d.palette.chroma, harmony: d.palette.harmony, font: d.typography.id, kind: d.typography.kind, scale: d.typography.scale, composition: d.layout.composition, density: d.layout.density, split: d.layout.split, graphic: d.graphic.family, filled: d.graphic.family === 'cells' && d.graphic.filled, count: d.graphic.count, amplitude: d.graphic.amplitude, texture: d.surface.texture, depth: d.surface.depth };
}
export function distance(a, b) {
  const hue = Math.abs(a.hue - b.hue) % 360;
  return clamp(
    0.12 * Math.min(hue, 360 - hue) / 180 +
    0.09 * (a.mode !== b.mode) + 0.03 * Math.min(1, Math.abs(a.chroma - b.chroma) / 0.14) +
    0.11 * (a.font !== b.font) + 0.04 * (a.kind !== b.kind) +
    0.21 * (a.composition !== b.composition) + 0.18 * (a.graphic !== b.graphic) +
    0.04 * (a.filled !== b.filled) + 0.05 * Math.abs(a.density - b.density) +
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
  return { schema: 1, algorithm: VERSION, library: LIBRARY, seed, request, designs, diagnostics: { tried, rejectedQuality, rejectedNovelty, minDistance: request.minDistance, recentCompared: recent.length, exactCompared: history.length, distanceType: 'weighted visual attributes (not a perceptual proof)' } };
}
export function reproduce(bundle) {
  if (bundle.library !== LIBRARY || bundle.algorithm !== VERSION) throw new Error('Rule version mismatch; use the original release');
  return (bundle.designs ?? [bundle]).map(assertDesign);
}
export function historyEntries(bundle) {
  return bundle.designs.map(d => ({ id: d.id, signature: signature(d), at: new Date().toISOString(), status: 'shown', algorithm: VERSION, library: LIBRARY }));
}
export const fingerprint = () => canonical(RULES);
