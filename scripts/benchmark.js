import fs from 'node:fs/promises';
import { generate, historyEntries, validateDesign, signature, distance, LIBRARY, VERSION, RequestSchema } from '../src/core/index.js';

const total = Number(process.env.BENCHMARK_COUNT ?? 10000);
if (!Number.isInteger(total) || total < 5 || total > 50000) throw new Error('BENCHMARK_COUNT must be 5–50000');
const ids = new Set(), graphics = {}, layouts = {}, fonts = {};
const defaults = RequestSchema.parse({});
let history = [], generated = 0, failures = 0, nearest = 1, checked = 0, tries = 0;
const start = performance.now();
while (generated < total) {
  const count = Math.min(5, total - generated);
  const bundle = generate({ seed: `coverage-${generated}`, count }, history);
  tries += bundle.diagnostics.tried;
  for (let i = 0; i < bundle.designs.length; i++) {
    const d = bundle.designs[i];
    if (!validateDesign(d).valid || ids.has(d.id)) failures++;
    ids.add(d.id); generated++;
    graphics[d.graphic.family] = (graphics[d.graphic.family] ?? 0) + 1;
    layouts[d.layout.composition] = (layouts[d.layout.composition] ?? 0) + 1;
    fonts[d.typography.id] = (fonts[d.typography.id] ?? 0) + 1;
    for (const h of [...history.slice(-defaults.recentWindow).map(h => h.signature), ...bundle.designs.slice(0, i).map(signature)]) { nearest = Math.min(nearest, distance(signature(d), h)); checked++; }
  }
  history.push(...historyEntries(bundle));
}
const report = { algorithm: VERSION, library: LIBRARY, generated, uniqueVisualFingerprints: ids.size, failures, recentWindow: defaults.recentWindow, threshold: defaults.minDistance, minimumAttributeDistanceToRecentWindowOrSameSet: nearest, comparisons: checked, candidateAttempts: tries, seconds: (performance.now() - start) / 1000, graphics, layouts, fonts, limits: ['Attribute distance is a heuristic, not measured human perceptual novelty.', 'This does not establish that every generated theme is aesthetically good.', 'Only representative exports are rendered; this run validates visual specifications.'] };
await fs.mkdir('docs/validation', { recursive: true });
await fs.writeFile('docs/validation/benchmark.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (failures || nearest < defaults.minDistance) process.exitCode = 1;
