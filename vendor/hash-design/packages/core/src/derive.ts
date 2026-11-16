import { bestTextOn, contrast } from './color.js';
import type { Design } from './mapping.js';
import type { FontSpec, PaletteColors, TypePairing } from './types.js';

export type Language = 'zh' | 'en';

const CJK_RE = /[㐀-鿿豈-﫿]/;

export function detectLanguage(...texts: string[]): Language {
  return texts.some((t) => CJK_RE.test(t)) ? 'zh' : 'en';
}

export interface ScaleStep {
  step: number;
  px: number;
  rem: number;
}

/** Modular type scale from step -2 to +7 around the density's base size. */
export function typeScale(design: Design): ScaleStep[] {
  const base = design.density.baseSize;
  const steps: ScaleStep[] = [];
  for (let s = -2; s <= 7; s++) {
    const px = base * design.scale.ratio ** s;
    steps.push({ step: s, px: Math.round(px * 10) / 10, rem: Math.round((px / 16) * 1000) / 1000 });
  }
  return steps;
}

function quote(family: string): string {
  return /^[a-z-]+$/i.test(family) && !family.includes(' ') ? family : `"${family}"`;
}

export function fontStack(font: FontSpec, cjk?: string): string {
  const parts = [quote(font.family)];
  if (cjk) parts.push(quote(cjk));
  parts.push(font.fallback);
  return parts.join(', ');
}

export interface FontStacks {
  display: string;
  body: string;
  mono: string;
}

export function fontStacks(type: TypePairing, lang: Language): FontStacks {
  const cjkDisplay = lang === 'zh' ? type.cjk.display : undefined;
  const cjkBody = lang === 'zh' ? type.cjk.body : undefined;
  return {
    display: fontStack(type.display, cjkDisplay),
    body: fontStack(type.body, cjkBody),
    mono: type.mono ? fontStack(type.mono) : 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
  };
}

/** CJK families that ship as variable fonts on Google Fonts and accept a weight axis. */
const CJK_VARIABLE = new Set(['Noto Sans SC', 'Noto Serif SC', 'Noto Sans TC', 'Noto Serif TC']);

function familyParam(family: string, weights: number[] | null, italic: boolean): string {
  const name = family.replace(/ /g, '+');
  if (!weights || weights.length === 0) return `family=${name}`;
  const ws = [...new Set(weights)].sort((a, b) => a - b);
  if (italic) {
    const tuples = [...ws.map((w) => `0,${w}`), ...ws.map((w) => `1,${w}`)];
    return `family=${name}:ital,wght@${tuples.join(';')}`;
  }
  if (ws.length === 1 && ws[0] === 400) return `family=${name}`;
  return `family=${name}:wght@${ws.join(';')}`;
}

/** Google Fonts CSS2 URL covering display/body/mono (+ CJK faces for Chinese pages). */
export function googleFontsUrl(type: TypePairing, lang: Language): string | null {
  const params: string[] = [];
  const seen = new Set<string>();
  const merged = new Map<string, { weights: Set<number>; italic: boolean }>();
  for (const f of [type.display, type.body, type.mono]) {
    if (!f || f.source !== 'google') continue;
    const entry = merged.get(f.family) ?? { weights: new Set<number>(), italic: false };
    f.weights.forEach((w) => entry.weights.add(w));
    entry.italic ||= Boolean(f.italic);
    merged.set(f.family, entry);
  }
  for (const [family, { weights, italic }] of merged) {
    params.push(familyParam(family, [...weights], italic));
    seen.add(family);
  }
  if (lang === 'zh') {
    for (const fam of [type.cjk.display, type.cjk.body]) {
      if (seen.has(fam)) continue;
      seen.add(fam);
      params.push(familyParam(fam, CJK_VARIABLE.has(fam) ? [400, 700] : null, false));
    }
  }
  if (params.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${params.join('&')}&display=swap`;
}

export interface ContrastLine {
  pair: string;
  ratio: number;
  verdict: string;
}

export function contrastReport(colors: PaletteColors): {
  lines: ContrastLine[];
  onAccent: string;
  onAccent2: string;
} {
  const verdict = (r: number, role: 'text' | 'accent') => {
    if (r >= 7) return 'AAA — any text';
    if (r >= 4.5) return 'AA — body text OK';
    if (r >= 3)
      return role === 'accent' ? 'large text / UI marks only (≥24px or bold ≥19px)' : 'large text only';
    return 'decorative only — never for text';
  };
  const onAccent = bestTextOn(colors.accent, [colors.paper, colors.ink, '#ffffff', '#000000']);
  const onAccent2 = bestTextOn(colors.accent2, [colors.paper, colors.ink, '#ffffff', '#000000']);
  const pairs: Array<[string, string, string, 'text' | 'accent']> = [
    ['ink on paper', colors.ink, colors.paper, 'text'],
    ['muted on paper', colors.muted, colors.paper, 'text'],
    ['ink on panel', colors.ink, colors.panel, 'text'],
    ['accent on paper', colors.accent, colors.paper, 'accent'],
    ['accent2 on paper', colors.accent2, colors.paper, 'accent'],
    [`${onAccent} on accent`, onAccent, colors.accent, 'text'],
    [`${onAccent2} on accent2`, onAccent2, colors.accent2, 'text'],
  ];
  return {
    lines: pairs.map(([pair, a, b, role]) => {
      const ratio = Math.round(contrast(a, b) * 100) / 100;
      return { pair, ratio, verdict: verdict(ratio, role) };
    }),
    onAccent,
    onAccent2,
  };
}

/** Ready-to-paste CSS custom properties for a design. */
export function tokensCss(design: Design, lang: Language): string {
  const c = design.palette.colors;
  const stacks = fontStacks(design.type, lang);
  const { onAccent, onAccent2 } = contrastReport(c);
  const d = design.density;
  const lines: string[] = [];
  lines.push(`/* hash-design ${design.short} · ${design.branch.id} · ${design.palette.id} */`);
  lines.push(':root {');
  lines.push(`  --paper: ${c.paper};`);
  lines.push(`  --ink: ${c.ink};`);
  lines.push(`  --muted: ${c.muted};`);
  lines.push(`  --accent: ${c.accent};`);
  lines.push(`  --on-accent: ${onAccent};`);
  lines.push(`  --accent2: ${c.accent2};`);
  lines.push(`  --on-accent2: ${onAccent2};`);
  lines.push(`  --rule: ${c.rule};`);
  lines.push(`  --panel: ${c.panel};`);
  lines.push('');
  lines.push(`  --font-display: ${stacks.display};`);
  lines.push(`  --font-body: ${stacks.body};`);
  lines.push(`  --font-mono: ${stacks.mono};`);
  lines.push('');
  for (const s of typeScale(design)) {
    lines.push(`  --step-${s.step < 0 ? `n${-s.step}` : s.step}: ${s.rem}rem; /* ${s.px}px */`);
  }
  lines.push(`  --leading: ${d.lineHeight};`);
  lines.push('');
  for (let i = 1; i <= 8; i++) lines.push(`  --space-${i}: ${d.unit * i}px;`);
  lines.push(`  --section-gap: ${d.sectionGap}px;`);
  lines.push(`  --max-width: ${d.maxWidth}px;`);
  lines.push('');
  lines.push(`  --motion-duration: ${design.motion.duration};`);
  lines.push(`  --motion-easing: ${design.motion.easing};`);
  lines.push('}');
  lines.push('');
  lines.push(`html { font-size: ${Math.round((d.baseSize / 16) * 1000) / 10}%; }`);
  lines.push(
    'body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }',
  );
  lines.push('@media (prefers-reduced-motion: reduce) {');
  lines.push('  *, *::before, *::after { animation: none !important; transition: none !important; }');
  lines.push('}');
  return lines.join('\n');
}
