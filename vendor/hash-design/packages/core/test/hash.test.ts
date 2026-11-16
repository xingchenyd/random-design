import { describe, expect, it } from 'vitest';
import { formatRef, hashBytes, isHash, parseRef, randomHash, rollHashes, seededHash } from '../src/hash.js';

describe('hashes', () => {
  it('random hashes are 64-hex and unique', () => {
    const hs = rollHashes(50);
    expect(hs.every(isHash)).toBe(true);
    expect(new Set(hs).size).toBe(50);
    expect(isHash(randomHash())).toBe(true);
  });

  it('seeded rolls are reproducible and seed-dependent', () => {
    expect(rollHashes(5, 'a')).toEqual(rollHashes(5, 'a'));
    expect(rollHashes(5, 'a')).not.toEqual(rollHashes(5, 'b'));
    expect(rollHashes(3, 'a')[2]).toBe(seededHash('a', 2));
  });

  it('rejects bad counts', () => {
    expect(() => rollHashes(0)).toThrow();
    expect(() => rollHashes(1.5)).toThrow();
  });

  it('decodes bytes', () => {
    const h = `00ff10${'0'.repeat(58)}`;
    const b = hashBytes(h);
    expect([b[0], b[1], b[2]]).toEqual([0, 255, 16]);
    expect(() => hashBytes('xyz')).toThrow();
  });

  it('refs round-trip', () => {
    const h = seededHash('ref', 0);
    expect(parseRef(formatRef(h, 0))).toEqual({ hash: h, probe: 0 });
    expect(parseRef(formatRef(h, 3))).toEqual({ hash: h, probe: 3 });
    expect(parseRef(h.toUpperCase()).hash).toBe(h);
    expect(() => parseRef('nope')).toThrow(/Invalid design ref/);
  });
});
