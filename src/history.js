import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import lockfile from 'proper-lockfile';
import { historyEntries, generate, LIBRARY, VERSION } from './core/index.js';

export const historyPath = () => process.env.RANDOM_DESIGN_HISTORY ?? path.join(os.homedir(), '.random-design', 'history-v2.json');
export function mergeHistory(...lists) {
  const map = new Map();
  for (const h of lists.flat()) {
    if (!h || !/^[a-f0-9]{64}$/.test(h.id) || !h.signature || h.signature.id !== h.id) throw new Error('Invalid history entry');
    const s = h.signature;
    if (['canvasL', 'hue', 'chroma', 'harmony', 'scale', 'density', 'split', 'count', 'amplitude'].some(k => !Number.isFinite(s[k])) || ['direction', 'colourFamily', 'mode', 'font', 'kind', 'composition', 'graphic', 'texture', 'depth'].some(k => typeof s[k] !== 'string') || typeof s.filled !== 'boolean') throw new Error('Invalid history signature');
    if (h.library !== LIBRARY || h.algorithm !== VERSION) throw new Error('History version mismatch; archive old history or use its matching release');
    const previous = map.get(h.id);
    map.set(h.id, previous?.status === 'selected' && h.status !== 'selected' ? previous : h);
  }
  return [...map.values()];
}
export async function readHistory(file = historyPath()) {
  try {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    if (data.schema !== 1 || !Array.isArray(data.entries)) throw new Error('Invalid history schema');
    return mergeHistory(data.entries);
  } catch (err) { if (err.code === 'ENOENT') return []; throw err; }
}
export async function writeHistory(file, entries) {
  const data = { schema: 1, algorithm: VERSION, library: LIBRARY, entries: mergeHistory(entries) };
  await fs.mkdir(path.dirname(path.resolve(file)), { recursive: true });
  const temporary = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(temporary, file);
}
export async function withHistory(file, fn) {
  await fs.mkdir(path.dirname(path.resolve(file)), { recursive: true });
  const release = await lockfile.lock(file, { realpath: false, retries: { retries: 20, minTimeout: 30, maxTimeout: 200 }, stale: 60000 });
  try { return await fn(await readHistory(file)); } finally { await release(); }
}
export async function generateRecorded(options, { file = historyPath(), persist = true } = {}) {
  if (!persist) return generate(options, await readHistory(file));
  return withHistory(file, async history => {
    const bundle = generate(options, history);
    await writeHistory(file, [...history, ...historyEntries(bundle)]);
    return bundle;
  });
}
export async function selectDesign(id, file = historyPath()) {
  return withHistory(file, async history => {
    const entry = history.find(h => h.id === id);
    if (!entry) throw new Error('Design is not in this history. Import its history first.');
    entry.status = 'selected'; entry.selectedAt = new Date().toISOString();
    await writeHistory(file, history); return entry;
  });
}
