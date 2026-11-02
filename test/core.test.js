import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, reproduce, validateDesign, historyEntries, distance, signature, RequestSchema, designId } from '../src/core/index.js';
import { pageHtml } from '../src/render.js';

test('selection is reproducible given the same seed, request and history', () => {
  const a = generate({ seed: 'deterministic', count: 3 });
  const b = generate({ seed: 'deterministic', count: 3 });
  assert.deepEqual(a, b);
  assert.deepEqual(reproduce(JSON.parse(JSON.stringify(a))), a.designs);
});
test('history excludes exact and nearby themes across repeated usage', () => {
  const options = { seed: 'repeat', count: 5 };
  const a = generate(options), history = historyEntries(a), b = generate(options, history);
  const ids = new Set(a.designs.map(d => d.id));
  b.designs.forEach(d => { assert(!ids.has(d.id)); a.designs.forEach(old => assert(distance(signature(d), signature(old)) >= options.minDistance || distance(signature(d), signature(old)) >= 0.25)); });
});
test('brand, mode and dimension locks survive generation', () => {
  const a = generate({ seed: 'brand', brand: '#ffee00', mode: 'light', count: 1 }).designs[0];
  assert.equal(a.palette.accent, '#ffee00'); assert(validateDesign(a).valid);
  const b = generate({ seed: 'lock', count: 3, locks: { palette: a.palette, font: a.typography.id, graphic: a.graphic.family } });
  b.designs.forEach(d => { assert.deepEqual(d.palette, a.palette); assert.equal(d.typography.id, a.typography.id); assert.equal(d.graphic.family, a.graphic.family); });
  assert.throws(() => generate({ mode: 'dark', locks: { palette: a.palette } }), /conflicts/);
});
test('all scenarios and modes meet declared token contrast and geometry rules', () => {
  for (const scenario of ['academic', 'business', 'product', 'culture', 'creative', 'general']) for (const mode of ['light', 'dark']) for (const intensity of ['calm', 'balanced', 'bold']) {
    const b = generate({ count: 3, seed: `${scenario}/${mode}/${intensity}`, scenario, mode, intensity });
    b.designs.forEach(d => { assert.equal(d.palette.mode, mode); assert(validateDesign(d).valid); });
  }
});
test('infeasible novelty request fails explicitly rather than relaxing constraints', () => {
  assert.throws(() => generate({ count: 5, seed: 'too-close', minDistance: 0.8, attempts: 30, locks: { font: 'technical', graphic: 'lattice', composition: 'split' }, mode: 'light' }), /Novelty exhausted/);
});
test('saved JSON tampering, incompatible versions and invalid requests are rejected', () => {
  const a = generate({ count: 1, seed: 'valid' }).designs[0];
  const changed = structuredClone(a); changed.palette.paper = '#000000';
  assert(!validateDesign(changed).valid); assert.throws(() => reproduce(changed));
  const version = { ...a, library: 'not-this-release' }; assert.throws(() => reproduce(version));
  for (const bad of [{ count: 0 }, { count: 99 }, { brand: 'red' }, { scenario: 'unknown' }, { mode: 'both' }]) assert(!RequestSchema.safeParse(bad).success);
});
test('labels and operator-unused seed values cannot manufacture visual novelty', () => {
  const a = generate({ count: 1, seed: 'semantic', locks: { graphic: 'orbits' } }).designs[0];
  const b = structuredClone(a); b.seed = 'different'; b.name.zh = '不同名字'; b.graphic.seed++;
  assert.equal(designId(a), designId(b));
  const injection = structuredClone(a); injection.layout.columns = '6;}body{display:none';
  assert(!validateDesign(injection).valid);
});
test('untrusted text is escaped and scripts cannot execute in previews', () => {
  const d = generate({ count: 1, seed: 'escape' }).designs[0];
  const html = pageHtml(d, { content: { title: '<script>alert(1)</script>' } });
  assert(html.includes('&lt;script&gt;')); assert(!html.includes('<script>alert(1)</script>'));
  assert(html.includes('prefers-reduced-motion')); assert(html.includes('lang="zh-CN"'));
});
