import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { generateRecorded, readHistory, mergeHistory, selectDesign } from '../src/history.js';
import { mergeHistory as browserMerge } from '../studio/history-browser.js';

test('concurrent generation is serialized, portable history preserves selections', async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'random-design-test-'));
  const file = path.join(temp, 'history.json');
  try {
    const sets = await Promise.all(Array.from({ length: 4 }, () => generateRecorded({ count: 2, seed: 'concurrent' }, { file })));
    const history = await readHistory(file);
    assert.equal(history.length, 8); assert.equal(new Set(sets.flatMap(b => b.designs.map(d => d.id))).size, 8);
    await selectDesign(history[0].id, file);
    const selected = await readHistory(file);
    assert.equal(mergeHistory(selected, history).find(h => h.id === history[0].id).status, 'selected');
    assert.deepEqual(browserMerge(selected, history), mergeHistory(selected, history));
    await fs.writeFile(file, '{broken'); await assert.rejects(readHistory(file));
  } finally { await fs.rm(temp, { recursive: true, force: true }); }
});
