import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import JSZip from 'jszip';
import { generate, GRAPHICS } from '../src/core/index.js';
import { graphicSvg } from '../src/core/graphics.js';
import { createPresentation } from '../src/pptx.js';
import { writeBundle } from '../src/export.js';

test('every graphic operator produces a bounded SVG and a portable PPTX media asset', async () => {
  for (const graphic of GRAPHICS) {
    const d = generate({ count: 1, seed: `export/${graphic}`, locks: { graphic } }).designs[0];
    assert(graphicSvg(d).startsWith('<svg'));
    const data = await createPresentation(d, { language: 'en' }).write({ outputType: 'nodebuffer' });
    const zip = await JSZip.loadAsync(data);
    const slides = Object.keys(zip.files).filter(n => /^ppt\/slides\/slide\d+\.xml$/.test(n));
    assert.equal(slides.length, 6);
    assert(Object.keys(zip.files).some(n => n.endsWith('.svg')));
    assert(Object.keys(zip.files).some(n => n.startsWith('ppt/embeddings/') && n.endsWith('.xlsx')));
  }
});
test('bundle export refuses overwrites and preserves the existing output', async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'random-design-export-'));
  const out = path.join(temp, 'roll');
  try {
    const b = generate({ count: 1, seed: 'bundle' }); await writeBundle(b, out, { pptx: false });
    const saved = await fs.readFile(path.join(out, 'roll.json'), 'utf8');
    assert(!(await fs.readFile(path.join(out, 'compare.html'), 'utf8')).includes('/theme.pptx'));
    await assert.rejects(writeBundle(b, out, { pptx: false }), /already exists/);
    assert.equal(await fs.readFile(path.join(out, 'roll.json'), 'utf8'), saved);
  } finally { await fs.rm(temp, { recursive: true, force: true }); }
});
test('native specimen rejects excess content instead of silently dropping sections', () => {
  const d = generate({ count: 1, seed: 'content-budget' }).designs[0];
  assert.throws(() => createPresentation(d, { content: { sections: Array.from({ length: 4 }, () => ['标题', '正文']) } }), /up to three/);
});
