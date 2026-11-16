/** Small, dependency-free colour helpers (sRGB hex only). */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHex(value: string): boolean {
  return HEX_RE.test(value.trim());
}

export function normalizeHex(value: string): string {
  const m = HEX_RE.exec(value.trim());
  if (!m || !m[1]) throw new Error(`Not a hex colour: ${value}`);
  let h = m[1].toLowerCase();
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  return `#${h}`;
}

export function hexToRgb(hex: string): Rgb {
  const h = normalizeHex(hex).slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance, 0–1. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio, 1–21. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return { h: h * 60, s, l };
}

export function hexToHsl(hex: string): Hsl {
  return rgbToHsl(hexToRgb(hex));
}

/** Smallest angular distance between two hues, 0–180. */
export function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/** Light palettes have a paper luminance above 0.4. */
export function isLightPaper(paper: string): boolean {
  return luminance(paper) > 0.4;
}

/** Pick whichever of `options` has the best contrast against `bg`. */
export function bestTextOn(bg: string, options: string[]): string {
  let best = options[0] ?? '#000000';
  let bestRatio = -1;
  for (const o of options) {
    const r = contrast(bg, o);
    if (r > bestRatio) {
      best = o;
      bestRatio = r;
    }
  }
  return best;
}

/** Whether a colour reads as purple/indigo/blue and saturated enough to be "AI gradient" material. */
export function isPurpleBlue(hex: string): boolean {
  const { h, s, l } = hexToHsl(hex);
  return h >= 215 && h <= 300 && s >= 0.35 && l >= 0.2 && l <= 0.85;
}

/** Named CSS colours we care about when parsing gradients. Not exhaustive on purpose. */
const NAMED: Record<string, string> = {
  purple: '#800080',
  violet: '#ee82ee',
  indigo: '#4b0082',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  mediumpurple: '#9370db',
  slateblue: '#6a5acd',
  royalblue: '#4169e1',
  magenta: '#ff00ff',
  fuchsia: '#ff00ff',
  white: '#ffffff',
  black: '#000000',
};

/** Parse #hex, rgb()/rgba(), hsl()/hsla() and a few named colours into hex. Returns null when unknown. */
export function parseCssColor(raw: string): string | null {
  const v = raw.trim().toLowerCase();
  if (isHex(v)) return normalizeHex(v);
  if (/^#[0-9a-f]{8}$/.test(v)) return v.slice(0, 7);
  if (/^#[0-9a-f]{4}$/.test(v)) return normalizeHex(v.slice(0, 4));
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(v);
  if (rgb) return rgbToHex({ r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) });
  const hsl = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(v);
  if (hsl) return hslToHex(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100);
  return NAMED[v] ?? null;
}

export function hslToHex(h: number, s: number, l: number): string {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex({ r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 });
}
