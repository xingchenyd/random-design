import { converter, formatHex, clampChroma } from 'culori';
import { between, pick, round } from './util.js';
const rgb = converter('rgb'), oklch = converter('oklch');
export function luminance(hex) {
  const c = rgb(hex);
  const linear = n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  return 0.2126 * linear(c.r) + 0.7152 * linear(c.g) + 0.0722 * linear(c.b);
}
export function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
export const oklchHex = (l, c, h) => formatHex(clampChroma({ mode: 'oklch', l, c, h }, 'oklch'));
export const colorCoordinates = hex => { const c = oklch(hex); return { l: c.l, c: c.c, h: c.h ?? 0 }; };
export const COLOUR_FAMILIES = [
  { id: 'citrus', hue: [75, 100], light: [0.86, 0.92], chroma: [0.14, 0.19], mode: 'light' },
  { id: 'apricot', hue: [42, 65], light: [0.79, 0.87], chroma: [0.11, 0.16], mode: 'light' },
  { id: 'rose', hue: [345, 365], light: [0.79, 0.86], chroma: [0.09, 0.14], mode: 'light' },
  { id: 'lilac', hue: [292, 325], light: [0.77, 0.86], chroma: [0.09, 0.14], mode: 'light' },
  { id: 'aqua', hue: [185, 220], light: [0.76, 0.86], chroma: [0.08, 0.13], mode: 'light' },
  { id: 'pistachio', hue: [122, 148], light: [0.77, 0.87], chroma: [0.11, 0.16], mode: 'light' },
  { id: 'vermilion', hue: [20, 36], light: [0.43, 0.53], chroma: [0.15, 0.20], mode: 'dark' },
  { id: 'cobalt', hue: [255, 275], light: [0.37, 0.48], chroma: [0.15, 0.21], mode: 'dark' },
  { id: 'jade', hue: [154, 178], light: [0.36, 0.47], chroma: [0.09, 0.14], mode: 'dark' },
  { id: 'wine', hue: [325, 349], light: [0.34, 0.45], chroma: [0.10, 0.16], mode: 'dark' },
  { id: 'ocean', hue: [211, 243], light: [0.36, 0.47], chroma: [0.09, 0.14], mode: 'dark' },
  { id: 'umber', hue: [45, 70], light: [0.38, 0.48], chroma: [0.07, 0.11], mode: 'dark' }
];
export const COLOUR_NAMES = { citrus: '柠檬黄', apricot: '杏橘', rose: '蔷薇粉', lilac: '丁香紫', aqua: '湖水青', pistachio: '开心果绿', vermilion: '朱砂红', cobalt: '钴蓝', jade: '玉绿', wine: '酒红', ocean: '海蓝', umber: '赭棕', neutral: '中性色' };
export function textOn(bg, hue = 0, chroma = 0.02, ratio = 4.5) {
  const ends = [oklchHex(0.12, chroma, hue), oklchHex(0.99, Math.min(chroma, 0.02), hue)];
  const dark = contrast(ends[0], bg) >= contrast(ends[1], bg);
  for (let i = 0; i < 85; i++) {
    const c = oklchHex(dark ? 0.38 - i * 0.004 : 0.79 + i * 0.0024, chroma, hue);
    if (contrast(c, bg) >= ratio) return c;
  }
  return dark ? '#111111' : '#ffffff';
}
// These relationships are part of the grammar, rather than independent random swatches.
export const PALETTE_RELATIONS = {
  enamel: 'warm sign ink and stock, one ink for ornament',
  botanical: 'sage foliage, warm seed ink and a parchment reverse',
  blueprint: 'cyanotype linework with one ochre annotation ink',
  textile: 'two yarn colours on a related dark or pale ground',
  play: 'one dominant stock with two subordinate construction colours',
  edition: 'two opaque print inks', atelier: 'related paper planes', journal: 'editorial ground and reverse'
};
export function makePalette(r, { mode = 'mixed', brand, colorfulness = 'rich', family, families, direction } = {}) {
  const pool = COLOUR_FAMILIES.filter(f => (mode === 'mixed' || f.mode === mode) && (!families || families.includes(f.id)));
  const f = family ? pool.find(f => f.id === family) : pick(r, pool);
  if (!f) throw new Error('Colour family conflicts with the requested mode');
  const hue = round(between(r, ...f.hue) % 360), harmony = round(between(r, 130, 195)), dark = f.mode === 'dark';
  const neutral = colorfulness === 'neutral' || colorfulness === 'balanced' && r() < 0.22;
  const chroma = neutral ? 0.015 : round(between(r, ...f.chroma));
  const paper = oklchHex(neutral ? (dark ? 0.22 : 0.96) : between(r, ...f.light), chroma, hue);
  const ink = textOn(paper, hue, 0.025, 7), muted = textOn(paper, hue, 0.025, 4.6);
  const accentHue = (hue + harmony) % 360;
  let accent = oklchHex(dark ? 0.85 : 0.45, between(r, 0.09, 0.15), accentHue);
  let accent2 = oklchHex(0.75, between(r, 0.08, 0.13), (hue + 65) % 360);
  let panel = oklchHex(dark ? between(r, 0.76, 0.88) : between(r, 0.30, 0.45), neutral ? 0.025 : 0.09, (hue + between(r, -18, 18)) % 360);
  if (!neutral) {
    if (direction === 'enamel') {
      accent = oklchHex(dark ? 0.88 : 0.31, dark ? 0.065 : 0.04, 78);
      accent2 = accent;
    } else if (direction === 'botanical') {
      accent = oklchHex(dark ? 0.78 : 0.37, 0.055, 145 + between(r, -9, 9));
      accent2 = oklchHex(dark ? 0.80 : 0.49, 0.085, 72);
      panel = oklchHex(dark ? 0.88 : 0.31, 0.045, dark ? 88 : 153);
    } else if (direction === 'blueprint') {
      accent = oklchHex(dark ? 0.86 : 0.33, 0.035, hue);
      accent2 = oklchHex(dark ? 0.82 : 0.45, 0.10, 80);
    } else if (direction === 'textile') {
      accent = oklchHex(dark ? 0.78 : 0.83, 0.055, (hue + 50) % 360);
      accent2 = oklchHex(dark ? 0.65 : 0.64, 0.065, (hue + 22) % 360);
    } else if (direction === 'play') {
      const secondaryHue = { citrus: 255, cobalt: 82, vermilion: 285, aqua: 340, lilac: 153, apricot: 240 }[f.id] ?? accentHue;
      accent = oklchHex(dark ? 0.85 : 0.43, 0.115, secondaryHue);
      accent2 = oklchHex(0.70, 0.13, (secondaryHue + 140) % 360);
    }
  }
  accent = brand ?? accent;
  const actualAccentHue = colorCoordinates(accent).h;
  const accentInk = textOn(paper, actualAccentHue, 0.09, 4.6);
  return { mode: f.mode, family: neutral ? 'neutral' : f.id, hue, harmony, chroma, paper, ink, muted, accent, accentInk, accent2, panel, panelInk: textOn(panel, hue, 0.02, 7), rule: textOn(paper, hue, 0.04, 3), onAccent: textOn(accent, actualAccentHue, 0.02, 4.6) };
}
