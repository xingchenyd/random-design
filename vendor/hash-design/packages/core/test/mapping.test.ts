import { describe, expect, it } from 'vitest';
import { contrast, isLightPaper, luminance } from '../src/color.js';
import { BRANCHES } from '../src/data/branches/index.js';
import { DENSITIES, SCALES, TWISTS, VOICES } from '../src/data/pools.js';
import { hashBytes, rollHashes, seededHash } from '../src/hash.js';
import {
  branchPool,
  libraryFingerprint,
  mapDesign,
  mapRoll,
  normalizeConstraints,
  primaryBranchIndex,
} from '../src/mapping.js';

/** Build a hash whose first bytes are given, rest filled deterministically. */
function hashWith(prefix: number[], fill = 'ab'): string {
  const head = prefix.map((n) => n.toString(16).padStart(2, '0')).join('');
  return (head + fill.repeat(32)).slice(0, 64);
}

const ids = (d: ReturnType<typeof mapDesign>) => ({
  branch: d.branch.id,
  voice: d.voice.id,
  layout: d.layout.id,
  type: d.type.id,
  palette: d.palette.id,
  density: d.density.id,
  motion: d.motion.id,
  motif: d.motif.id,
  anchor: d.anchor.id,
  scale: d.scale.id,
  surface: d.surface.id,
  twist: d.twist.id,
});

describe('deterministic mapping', () => {
  it('same hash always maps to the same design', () => {
    for (const h of rollHashes(25)) {
      expect(ids(mapDesign(h))).toEqual(ids(mapDesign(h)));
    }
  });

  it('follows the documented byte → dimension table exactly', () => {
    for (const h of rollHashes(200, 'byte-table')) {
      const b = hashBytes(h);
      const byte = (i: number) => b[i] as number;
      const d = mapDesign(h);
      const branch = BRANCHES[((byte(0) << 8) | byte(1)) % BRANCHES.length]!;
      expect(d.branch).toBe(branch);
      expect(d.voice).toBe(VOICES[byte(2) % VOICES.length]);
      expect(d.layout).toBe(branch.layouts[byte(3) % branch.layouts.length]);
      expect(d.type).toBe(branch.type[byte(4) % branch.type.length]);
      expect(d.palette).toBe(branch.palettes[byte(5) % branch.palettes.length]);
      expect(d.density).toBe(DENSITIES[branch.densities[byte(6) % branch.densities.length]!]);
      expect(d.motion).toBe(branch.motion[byte(7) % branch.motion.length]);
      expect(d.motif).toBe(branch.motifs[byte(8) % branch.motifs.length]);
      expect(d.anchor).toBe(branch.anchors[byte(9) % branch.anchors.length]);
      expect(d.scale).toBe(SCALES[branch.scales[byte(10) % branch.scales.length]!]);
      expect(d.surface).toBe(branch.surfaces[byte(11) % branch.surfaces.length]);
      expect(d.twist).toBe(TWISTS[byte(12) % TWISTS.length]);
      expect(d.trace.map((t) => t.dimension)).toEqual([
        'branch',
        'voice',
        'layout',
        'type',
        'palette',
        'density',
        'motion',
        'motif',
        'anchor',
        'scale',
        'surface',
        'twist',
      ]);
    }
  });

  it('uses both high and low branch bytes (uint16 big-endian)', () => {
    const n = BRANCHES.length;
    expect(primaryBranchIndex(hashWith([0, 1]), n)).toBe(1);
    expect(primaryBranchIndex(hashWith([1, 0]), n)).toBe(256 % n);
    expect(mapDesign(hashWith([0, 0])).branch).toBe(BRANCHES[0]);
    expect(mapDesign(hashWith([0, n - 1])).branch).toBe(BRANCHES[n - 1]);
  });

  it('every branch is reachable', () => {
    const hit = new Set<string>();
    for (const h of rollHashes(3000, 'coverage')) hit.add(mapDesign(h).branch.id);
    expect(hit.size).toBe(BRANCHES.length);
  });

  it('library fingerprint is stable', () => {
    expect(libraryFingerprint()).toMatch(/^[0-9a-f]{12}$/);
    expect(libraryFingerprint()).toBe(libraryFingerprint());
  });
});

describe('collision handling', () => {
  // Three branches of one family: once that family is used, only branch identity matters.
  const sameFamily = BRANCHES.filter((b) => b.family === 'print').slice(0, 3);
  const include = sameFamily.map((b) => b.id);
  const inPool = (i: number) => BRANCHES.filter((b) => include.includes(b.id))[i];

  it('walks forward to the next free branch', () => {
    const [da, db, dc] = mapRoll([hashWith([0, 0], 'aa'), hashWith([0, 0], 'bb'), hashWith([0, 1], 'cc')], {
      include,
    });
    expect(da!.branch).toBe(inPool(0));
    expect(da!.probe).toBe(0);
    expect(db!.branch).toBe(inPool(1));
    expect(db!.probe).toBe(1);
    // c's primary (1) is now taken by b → walks to 2
    expect(dc!.branch).toBe(inPool(2));
    expect(dc!.probe).toBe(1);
    expect(db!.ref.endsWith('+1')).toBe(true);
    expect(db!.trace[0]!.note).toMatch(/walked forward 1/);
  });

  it('wraps around the end of the pool', () => {
    const [, d2] = mapRoll([hashWith([0, 2], 'aa'), hashWith([0, 2], 'bb')], { include });
    expect(d2!.branch).toBe(inPool(0));
  });

  it('spreads a roll across families while unused families remain', () => {
    const families = new Set(BRANCHES.map((b) => b.family)).size;
    for (let i = 0; i < 60; i++) {
      const designs = mapRoll(rollHashes(5, `spread-${i}`));
      expect(new Set(designs.map((d) => d.branch.family)).size).toBe(Math.min(5, families));
      const twelve = mapRoll(rollHashes(12, `spread12-${i}`));
      expect(new Set(twelve.slice(0, families).map((d) => d.branch.family)).size).toBe(families);
    }
  });

  it('a second hash in the same family walks to a different family', () => {
    const first = mapDesign(hashWith([0, 0], 'aa'));
    const [, second] = mapRoll([hashWith([0, 0], 'aa'), hashWith([0, 0], 'bb')]);
    expect(second!.branch.family).not.toBe(first.branch.family);
  });

  it('rolls are always distinct and reproducible from refs', () => {
    for (let i = 0; i < 40; i++) {
      const designs = mapRoll(rollHashes(12, `distinct-${i}`));
      expect(new Set(designs.map((d) => d.branch.id)).size).toBe(12);
      for (const d of designs) expect(ids(mapDesign(d.hash, { probe: d.probe }))).toEqual(ids(d));
    }
  });

  it('can roll the whole library', () => {
    const all = mapRoll(rollHashes(BRANCHES.length, 'everything'));
    expect(new Set(all.map((d) => d.branch.id)).size).toBe(BRANCHES.length);
  });

  it('refuses more designs than branches', () => {
    expect(() => mapRoll(rollHashes(3, 'x'), { include: [BRANCHES[0]!.id, BRANCHES[1]!.id] })).toThrow(
      /pool of 2/,
    );
  });
});

describe('constraints', () => {
  const hashes = rollHashes(120, 'constraints');

  it('light-only always yields a light palette', () => {
    for (const h of hashes)
      expect(isLightPaper(mapDesign(h, { constraints: { lightOnly: true } }).palette.colors.paper)).toBe(
        true,
      );
  });

  it('dark-only yields dark palettes and skips branches without one', () => {
    const pool = branchPool(normalizeConstraints({ darkOnly: true }));
    expect(pool.length).toBeGreaterThan(0);
    for (const h of hashes) {
      const d = mapDesign(h, { constraints: { darkOnly: true } });
      expect(luminance(d.palette.colors.paper)).toBeLessThanOrEqual(0.4);
    }
  });

  it('reduced-motion picks the stillest option', () => {
    for (const h of hashes.slice(0, 40)) {
      const d = mapDesign(h, { constraints: { reducedMotion: true } });
      const ms = (s: string) => parseFloat(s) * (s.endsWith('ms') ? 1 : 1000) || 0;
      const min = Math.min(...d.branch.motion.map((m) => ms(m.duration)));
      expect(ms(d.motion.duration)).toBe(min);
    }
  });

  it('brand colours replace accent slots and pick the closest-hue palette', () => {
    const d = mapDesign(seededHash('brand', 0), { constraints: { brandColors: ['#C33', '#123456'] } });
    expect(d.palette.colors.accent).toBe('#cc3333');
    expect(d.palette.colors.accent2).toBe('#123456');
    expect(d.paletteOverride?.basePaletteId).toBeTruthy();
    expect(d.trace.find((t) => t.dimension === 'palette')!.rule).toMatch(/nearest accent hue/);
  });

  it('families / include / exclude restrict the pool', () => {
    for (const h of hashes.slice(0, 30)) {
      expect(mapDesign(h, { constraints: { families: ['screen'] } }).branch.family).toBe('screen');
      expect(mapDesign(h, { constraints: { exclude: [BRANCHES[0]!.id] } }).branch.id).not.toBe(
        BRANCHES[0]!.id,
      );
    }
    const only = [BRANCHES[2]!.id, BRANCHES[7]!.id];
    const designs = mapRoll(rollHashes(2, 'inc'), { include: only });
    expect(designs.map((d) => d.branch.id).sort()).toEqual([...only].sort());
  });

  it('rejects contradictory or unknown constraints', () => {
    expect(() => normalizeConstraints({ lightOnly: true, darkOnly: true })).toThrow();
    expect(() => normalizeConstraints({ include: ['no-such-branch'] })).toThrow(/Unknown branch/);
    expect(() => normalizeConstraints({ brandColors: ['#111', '#222', '#333'] })).toThrow();
    expect(() => normalizeConstraints({ brandColors: ['red'] })).toThrow();
  });

  it('constraints are part of identity: same hash + same constraints = same design', () => {
    const h = seededHash('identity', 1);
    const c = { lightOnly: true, brandColors: ['#0a7'] };
    expect(ids(mapDesign(h, { constraints: c }))).toEqual(ids(mapDesign(h, { constraints: c })));
  });

  it('brand override still reports a sensible contrast for text on accent', () => {
    const d = mapDesign(seededHash('brand', 3), { constraints: { brandColors: ['#ffe600'] } });
    expect(contrast(d.palette.colors.ink, d.palette.colors.paper)).toBeGreaterThanOrEqual(7);
  });
});
