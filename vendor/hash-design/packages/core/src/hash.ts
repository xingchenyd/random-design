import { createHash, randomBytes } from 'node:crypto';

/** Algorithm identifier. Bump when the byte → dimension assignment changes. */
export const ALGORITHM = 'hash-design/v1';

const HASH_RE = /^[0-9a-f]{64}$/;

export function sha256Hex(input: string | Uint8Array): string {
  return createHash('sha256').update(input).digest('hex');
}

/** A true-random hash: SHA-256 over 32 bytes from the OS CSPRNG. */
export function randomHash(): string {
  return sha256Hex(randomBytes(32));
}

/** A reproducible hash for examples/tests. Not for real rolls. */
export function seededHash(seed: string, index: number): string {
  return sha256Hex(`${ALGORITHM}:${seed}:${index}`);
}

/** Roll `count` hashes. With a seed the roll is reproducible; without, it uses system randomness. */
export function rollHashes(count: number, seed?: string): string[] {
  if (!Number.isInteger(count) || count < 1)
    throw new Error(`count must be a positive integer (got ${count})`);
  return Array.from({ length: count }, (_, i) => (seed === undefined ? randomHash() : seededHash(seed, i)));
}

export function isHash(value: string): boolean {
  return HASH_RE.test(value);
}

export function hashBytes(hash: string): Uint8Array {
  const h = hash.trim().toLowerCase();
  if (!isHash(h)) throw new Error(`Expected a 64-char lowercase hex SHA-256 hash, got "${hash}"`);
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export interface DesignRef {
  hash: string;
  probe: number;
}

/** Refs are `<hash>` or `<hash>+<probe>` (probe = collision steps walked inside a roll). */
export function formatRef(hash: string, probe: number): string {
  return probe > 0 ? `${hash}+${probe}` : hash;
}

export function parseRef(ref: string): DesignRef {
  const m = /^([0-9a-fA-F]{64})(?:\+(\d+))?$/.exec(ref.trim());
  if (!m || !m[1]) {
    throw new Error(
      `Invalid design ref "${ref}". Expected a 64-char hex hash, optionally followed by +<probe>.`,
    );
  }
  return { hash: m[1].toLowerCase(), probe: m[2] ? Number(m[2]) : 0 };
}

export function shortHash(hash: string): string {
  return hash.slice(0, 8);
}
