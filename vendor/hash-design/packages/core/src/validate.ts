import { contrast, isHex, isLightPaper } from './color.js';
import { isBannedFont } from './data/bans.js';
import { DENSITIES, SCALES } from './data/pools.js';
import type { Branch, FontSpec } from './types.js';

/** Hex values from framework default palettes that read as "AI template" (Tailwind 500/600/900 etc.). */
export const FRAMEWORK_DEFAULT_HEX: readonly string[] = [
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#8b5cf6',
  '#7c3aed',
  '#6d28d9',
  '#a855f7',
  '#9333ea',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#0ea5e9',
  '#06b6d4',
  '#0f172a',
  '#1e293b',
  '#334155',
  '#64748b',
  '#94a3b8',
  '#e2e8f0',
  '#f1f5f9',
  '#f8fafc',
  '#111827',
  '#1f2937',
  '#374151',
  '#6b7280',
  '#9ca3af',
  '#e5e7eb',
  '#f3f4f6',
  '#f9fafb',
  '#10b981',
  '#22c55e',
  '#ef4444',
  '#f59e0b',
  '#eab308',
  '#ec4899',
  '#d946ef',
];

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const OPTION_COUNT = { min: 3, max: 5 } as const;

function checkFont(prefix: string, f: FontSpec | undefined, errors: string[], optional = false): void {
  if (!f) {
    if (!optional) errors.push(`${prefix}: missing`);
    return;
  }
  if (!f.family?.trim()) errors.push(`${prefix}: empty family`);
  if (isBannedFont(f.family)) errors.push(`${prefix}: banned font "${f.family}"`);
  for (const part of f.fallback.split(',')) {
    if (isBannedFont(part)) errors.push(`${prefix}: banned font in fallback "${part.trim()}"`);
  }
  if (!Array.isArray(f.weights) || f.weights.length === 0) errors.push(`${prefix}: no weights`);
  if (f.weights.some((w) => w < 100 || w > 1000 || w % 50 !== 0)) errors.push(`${prefix}: odd weight`);
  if (f.source !== 'google' && f.source !== 'system') errors.push(`${prefix}: bad source`);
}

/** Returns a list of human-readable problems; empty means valid. */
export function validateBranch(b: Branch): string[] {
  const errors: string[] = [];
  const p = `[${b.id}]`;
  if (!KEBAB.test(b.id)) errors.push(`${p} id must be kebab-case`);
  if (!b.name?.zh || !b.name?.en) errors.push(`${p} name needs zh + en`);
  if (!b.concept?.zh || !b.concept?.en) errors.push(`${p} concept needs zh + en`);
  if ((b.references?.length ?? 0) < 2) errors.push(`${p} needs ≥2 references`);
  if ((b.keywords?.length ?? 0) < 3) errors.push(`${p} needs ≥3 keywords`);
  for (const k of ['grid', 'radius', 'border', 'shadow'] as const) {
    if (!b.tokens?.[k]?.trim()) errors.push(`${p} tokens.${k} missing`);
  }

  const groups = {
    layouts: b.layouts,
    type: b.type,
    palettes: b.palettes,
    motion: b.motion,
    motifs: b.motifs,
    anchors: b.anchors,
    surfaces: b.surfaces,
  } as const;
  for (const [name, list] of Object.entries(groups)) {
    if (!Array.isArray(list)) {
      errors.push(`${p} ${name} missing`);
      continue;
    }
    if (list.length < OPTION_COUNT.min || list.length > OPTION_COUNT.max) {
      errors.push(
        `${p} ${name} must have ${OPTION_COUNT.min}–${OPTION_COUNT.max} options (has ${list.length})`,
      );
    }
    const ids = new Set<string>();
    for (const o of list) {
      if (!KEBAB.test(o.id)) errors.push(`${p} ${name}.${o.id} id must be kebab-case`);
      if (ids.has(o.id)) errors.push(`${p} ${name} duplicate id ${o.id}`);
      ids.add(o.id);
      if (!o.name?.trim()) errors.push(`${p} ${name}.${o.id} missing name`);
    }
  }

  for (const l of b.layouts ?? []) {
    if (!l.description?.trim() || !l.grid?.trim())
      errors.push(`${p} layout ${l.id} needs description + grid`);
    if (!Array.isArray(l.structure) || l.structure.length < 3)
      errors.push(`${p} layout ${l.id} needs ≥3 structure steps`);
  }

  for (const t of b.type ?? []) {
    checkFont(`${p} type ${t.id}.display`, t.display, errors);
    checkFont(`${p} type ${t.id}.body`, t.body, errors);
    checkFont(`${p} type ${t.id}.mono`, t.mono, errors, true);
    if (!t.cjk?.display || !t.cjk?.body) errors.push(`${p} type ${t.id} needs cjk display + body`);
    if (!t.notes?.trim()) errors.push(`${p} type ${t.id} needs notes`);
  }

  let hasLight = false;
  for (const pal of b.palettes ?? []) {
    const c = pal.colors;
    const keys = ['paper', 'ink', 'muted', 'accent', 'accent2', 'rule', 'panel'] as const;
    let ok = true;
    for (const k of keys) {
      const v = c?.[k];
      if (!v || !isHex(v) || v !== v.toLowerCase() || v.length !== 7) {
        errors.push(`${p} palette ${pal.id}.${k} must be lowercase #rrggbb (got ${v})`);
        ok = false;
      } else if (FRAMEWORK_DEFAULT_HEX.includes(v)) {
        errors.push(`${p} palette ${pal.id}.${k} uses framework default ${v}`);
      }
    }
    if (!pal.usage?.trim()) errors.push(`${p} palette ${pal.id} needs usage`);
    if (!ok) continue;
    if (contrast(c.ink, c.paper) < 7) {
      errors.push(`${p} palette ${pal.id}: ink/paper contrast ${contrast(c.ink, c.paper).toFixed(2)} < 7`);
    }
    if (contrast(c.muted, c.paper) < 4.5) {
      errors.push(
        `${p} palette ${pal.id}: muted/paper contrast ${contrast(c.muted, c.paper).toFixed(2)} < 4.5`,
      );
    }
    if (isLightPaper(c.paper)) hasLight = true;
  }
  if (!hasLight) errors.push(`${p} needs at least one light palette (for the light-only constraint)`);

  if (!b.densities?.length || b.densities.length > 3) errors.push(`${p} densities must list 1–3 ids`);
  for (const d of b.densities ?? []) if (!DENSITIES[d]) errors.push(`${p} unknown density ${d}`);
  if (!b.scales?.length || b.scales.length > 3) errors.push(`${p} scales must list 1–3 ids`);
  for (const s of b.scales ?? []) if (!SCALES[s]) errors.push(`${p} unknown scale ${s}`);

  for (const m of b.motion ?? []) {
    if (!m.duration || !m.easing || !m.reduced)
      errors.push(`${p} motion ${m.id} needs duration/easing/reduced`);
  }
  for (const list of [b.motifs, b.anchors, b.surfaces]) {
    for (const o of list ?? [])
      if (!o.description?.trim()) errors.push(`${p} option ${o.id} needs description`);
  }
  if ((b.must?.length ?? 0) < 2) errors.push(`${p} needs ≥2 must`);
  if ((b.mustNot?.length ?? 0) < 2) errors.push(`${p} needs ≥2 mustNot`);
  return errors;
}

/** Library-level checks: unique ids/names, font diversity. */
export function validateLibrary(branches: readonly Branch[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const b of branches) {
    errors.push(...validateBranch(b));
    if (ids.has(b.id)) errors.push(`duplicate branch id ${b.id}`);
    ids.add(b.id);
    if (names.has(b.name.en)) errors.push(`duplicate branch name ${b.name.en}`);
    names.add(b.name.en);
  }
  // Font diversity: a display family may lead at most 3 branches.
  const displayUse = new Map<string, Set<string>>();
  for (const b of branches) {
    for (const t of b.type) {
      const set = displayUse.get(t.display.family) ?? new Set<string>();
      set.add(b.id);
      displayUse.set(t.display.family, set);
    }
  }
  for (const [family, set] of displayUse) {
    if (set.size > 3)
      errors.push(`display family "${family}" used by ${set.size} branches (max 3): ${[...set].join(', ')}`);
  }
  return errors;
}
