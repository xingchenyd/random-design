import { describe, expect, it } from 'vitest';
import { contrast, isLightPaper } from '../src/color.js';
import { BANNED_FONTS } from '../src/data/bans.js';
import { BRANCHES } from '../src/data/branches/index.js';
import { validateBranch, validateLibrary } from '../src/validate.js';

describe('branch library', () => {
  it('has at least 40 branches', () => {
    expect(BRANCHES.length).toBeGreaterThanOrEqual(40);
  });

  it.each(BRANCHES.map((b) => [b.id, b] as const))('%s is valid', (_id, branch) => {
    expect(validateBranch(branch)).toEqual([]);
  });

  it('passes library-level checks (unique ids, font diversity)', () => {
    expect(validateLibrary(BRANCHES)).toEqual([]);
  });

  it('never uses a banned font anywhere', () => {
    const banned = new Set(BANNED_FONTS.map((f) => f.toLowerCase()));
    for (const b of BRANCHES) {
      for (const t of b.type) {
        for (const f of [t.display, t.body, t.mono]) {
          if (f) expect(banned.has(f.family.toLowerCase()), `${b.id}/${t.id}: ${f.family}`).toBe(false);
        }
      }
    }
  });

  it('every palette is readable and every branch has a light palette', () => {
    for (const b of BRANCHES) {
      expect(
        b.palettes.some((p) => isLightPaper(p.colors.paper)),
        b.id,
      ).toBe(true);
      for (const p of b.palettes) {
        expect(contrast(p.colors.ink, p.colors.paper), `${b.id}/${p.id}`).toBeGreaterThanOrEqual(7);
      }
    }
  });

  it('branches are genuinely different: no two share the same first palette paper+accent', () => {
    const seen = new Map<string, string>();
    for (const b of BRANCHES) {
      for (const p of b.palettes) {
        const key = `${p.colors.paper}/${p.colors.accent}/${p.colors.ink}`;
        expect(seen.has(key), `${b.id}/${p.id} duplicates ${seen.get(key)}`).toBe(false);
        seen.set(key, `${b.id}/${p.id}`);
      }
    }
  });
});

describe('branch order', () => {
  it('lists every branch exactly once and interleaves families', async () => {
    const { BRANCH_ORDER } = await import('../src/data/branches/index.js');
    expect(new Set(BRANCH_ORDER).size).toBe(BRANCH_ORDER.length);
    expect(BRANCH_ORDER.length).toBe(BRANCHES.length);
    // No family occupies more than 2 consecutive slots.
    let run = 1;
    for (let i = 1; i < BRANCHES.length; i++) {
      run = BRANCHES[i]!.family === BRANCHES[i - 1]!.family ? run + 1 : 1;
      expect(run, `${BRANCHES[i]!.id}`).toBeLessThanOrEqual(2);
    }
  });

  it('families are reasonably balanced (5–9 branches each)', () => {
    const counts = new Map<string, number>();
    for (const b of BRANCHES) counts.set(b.family, (counts.get(b.family) ?? 0) + 1);
    expect(counts.size).toBe(6);
    for (const [, n] of counts) {
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThanOrEqual(9);
    }
  });
});
