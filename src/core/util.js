import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

export const VERSION = 'random-design/1';
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  return JSON.stringify(value);
}
export const digest = value => bytesToHex(sha256(new TextEncoder().encode(typeof value === 'string' ? value : canonical(value))));
export function rng(seed) {
  const bytes = sha256(new TextEncoder().encode(seed));
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let a = view.getUint32(0), b = view.getUint32(4), c = view.getUint32(8), d = view.getUint32(12);
  return () => {
    a |= 0; b |= 0; c |= 0; d |= 0;
    const t = ((a + b | 0) + d | 0); d = d + 1 | 0;
    a = b ^ b >>> 9; b = c + (c << 3) | 0; c = (c << 21 | c >>> 11) + t | 0;
    return (t >>> 0) / 4294967296;
  };
}
export const pick = (r, items) => items[Math.floor(r() * items.length)];
export const between = (r, a, b) => a + r() * (b - a);
export const round = (n, d = 3) => Number(n.toFixed(d));
export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function freshSeed() {
  return [...globalThis.crypto.getRandomValues(new Uint32Array(4))].map(n => n.toString(16).padStart(8, '0')).join('');
}
