import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BANS } from '../src/data/bans.js';
import { BRANCHES } from '../src/data/branches/index.js';
import { applySkillGeneratedBlock, readSkill, skillGeneratedBlock } from '../src/skill.js';

const repo = (p: string) => new URL(`../../../${p}`, import.meta.url);

describe('Skill ↔ data consistency', () => {
  const skill = readSkill();

  it('has valid frontmatter', () => {
    const m = /^---\nname: (.+)\ndescription: (.+)\n---\n/.exec(skill);
    expect(m?.[1]).toBe('hash-design');
    expect((m?.[2] ?? '').length).toBeGreaterThan(80);
    expect((m?.[2] ?? '').length).toBeLessThan(1024);
  });

  it('generated block is up to date (run `npm run sync` if this fails)', () => {
    expect(skill).toContain(skillGeneratedBlock());
    expect(applySkillGeneratedBlock(skill)).toBe(skill);
  });

  it('mentions every ban and the real branch count', () => {
    for (const b of BANS) expect(skill).toContain(b.id);
    expect(skill).toContain(`${BRANCHES.length} 个分支`);
  });

  it('copies for Claude Code and Cursor are identical to the source', () => {
    for (const p of ['.claude/skills/hash-design/SKILL.md', '.cursor/skills/hash-design/SKILL.md']) {
      expect(readFileSync(repo(p), 'utf8'), p).toBe(skill);
    }
  });
});

describe('generated docs', () => {
  it('docs/branches.md is up to date (run `npm run sync` if this fails)', async () => {
    const { renderBranchCatalog } = await import('../src/catalog.js');
    expect(readFileSync(repo('docs/branches.md'), 'utf8')).toBe(`${renderBranchCatalog()}\n`);
  });
});
