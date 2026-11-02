import { converter, formatHex, clampChroma } from 'culori';
import { between, round } from './util.js';
const rgb = converter('rgb');
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
function readable(h, c, bg, dark, ratio = 4.5) {
  for (let i = 0; i <= 90; i++) {
    const l = dark ? 0.72 + i * 0.003 : 0.53 - i * 0.005;
    const color = oklchHex(l, c, h);
    if (contrast(color, bg) >= ratio) return color;
  }
  return dark ? '#ffffff' : '#111111';
}
export function makePalette(r, { mode = 'light', brand } = {}) {
  const hue = round(between(r, 0, 360));
  const harmony = between(r, 28, 175);
  const dark = mode === 'dark';
  const chroma = between(r, 0.07, 0.21);
  const paper = oklchHex(dark ? between(r, 0.14, 0.22) : between(r, 0.955, 0.99), between(r, 0.002, 0.018), hue);
  const ink = readable(hue, 0.015, paper, dark, 10);
  const muted = readable(hue, 0.025, paper, dark);
  const accent = brand ?? oklchHex(dark ? 0.78 : 0.55, chroma, hue);
  const accentInk = readable(converter('oklch')(accent).h ?? hue, chroma, paper, dark);
  const accent2 = oklchHex(dark ? 0.72 : 0.65, chroma * 0.8, (hue + harmony) % 360);
  const panel = oklchHex(dark ? 0.27 : 0.92, 0.018, hue);
  const rule = oklchHex(dark ? 0.43 : 0.78, 0.025, hue);
  const onAccent = contrast('#ffffff', accent) >= contrast('#111111', accent) ? '#ffffff' : '#111111';
  return { mode, hue, harmony: round(harmony), chroma: round(chroma), paper, ink, muted, accent, accentInk, accent2, panel, rule, onAccent };
}
