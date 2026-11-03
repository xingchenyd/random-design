import { VERSION, LIBRARY } from '../src/core/index.js';
// Shared validation implementation is browser-safe and lives separately from node filesystem code.
export function mergeHistory(...lists) {
  const map = new Map();
  for (const h of lists.flat()) {
    if (!h || !/^[a-f0-9]{64}$/.test(h.id) || !h.signature || h.signature.id !== h.id) throw new Error('Invalid history entry');
    const s = h.signature;
    if (['canvasL', 'hue', 'chroma', 'harmony', 'scale', 'density', 'split', 'count', 'amplitude'].some(k => !Number.isFinite(s[k])) || ['direction', 'colourFamily', 'mode', 'font', 'kind', 'composition', 'graphic', 'texture', 'depth'].some(k => typeof s[k] !== 'string') || typeof s.filled !== 'boolean') throw new Error('Invalid history signature');
    if (h.algorithm !== VERSION || h.library !== LIBRARY) throw new Error('History version mismatch; use its matching release');
    const old = map.get(h.id); map.set(h.id, old?.status === 'selected' && h.status !== 'selected' ? old : h);
  }
  return [...map.values()];
}
