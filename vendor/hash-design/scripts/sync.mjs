#!/usr/bin/env node
// Regenerates data-driven docs. Requires `npm run build` first.
//  - the generated block in skills/hash-design/SKILL.md, copied to .claude/skills/ and .cursor/skills/
//  - docs/branches.md (branch catalogue)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applySkillGeneratedBlock, renderBranchCatalog } from '../packages/core/dist/index.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'skills', 'hash-design', 'SKILL.md');
const next = applySkillGeneratedBlock(await readFile(source, 'utf8'));
await writeFile(source, next, 'utf8');
for (const target of ['.claude', '.cursor']) {
  const dir = join(root, target, 'skills', 'hash-design');
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'SKILL.md'), next, 'utf8');
}
await mkdir(join(root, 'docs'), { recursive: true });
await writeFile(join(root, 'docs', 'branches.md'), `${renderBranchCatalog()}\n`, 'utf8');
console.log('synced: SKILL.md (+ .claude/.cursor copies), docs/branches.md');
