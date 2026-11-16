import { BANS } from './data/bans.js';
import {
  contrastReport,
  detectLanguage,
  fontStacks,
  googleFontsUrl,
  type Language,
  tokensCss,
  typeScale,
} from './derive.js';
import { rollHashes } from './hash.js';
import {
  type Constraints,
  type Design,
  describeConstraints,
  mapDesign,
  mapRoll,
  normalizeConstraints,
} from './mapping.js';
import type { FontSpec } from './types.js';

/** What the page is about. Facts are the ONLY content the page may state. */
export interface Content {
  subject: string;
  facts: string[];
  /** Defaults to auto-detection from subject + facts. */
  language?: Language;
}

export interface Roll {
  algorithm: string;
  library: string;
  createdAt: string;
  /** "system-random" for real rolls; "seed:<seed>" for reproducible examples. */
  source: string;
  constraints: Design['constraints'];
  content: Content & { language: Language };
  designs: Design[];
}

export interface RollOptions {
  count?: number;
  seed?: string;
  constraints?: Constraints;
  content?: Partial<Content>;
  /** Override hashes (e.g. to rebuild a roll from stored hashes). */
  hashes?: string[];
  now?: Date;
}

export function normalizeContent(content: Partial<Content> = {}): Content & { language: Language } {
  const subject = content.subject?.trim() || '(untitled)';
  const facts = (content.facts ?? []).map((f) => f.trim()).filter(Boolean);
  return { subject, facts, language: content.language ?? detectLanguage(subject, ...facts) };
}

/** Roll N designs: N true-random (or seeded) hashes → deterministic, distinct designs. */
export function roll(opts: RollOptions = {}): Roll {
  const count = opts.count ?? 5;
  if (count < 1 || count > 12) throw new Error(`count must be between 1 and 12 (got ${count})`);
  const hashes = opts.hashes ?? rollHashes(count, opts.seed);
  const designs = mapRoll(hashes, opts.constraints);
  const first = designs[0];
  return {
    algorithm: first?.algorithm ?? 'hash-design/v1',
    library: first?.library ?? '',
    createdAt: (opts.now ?? new Date()).toISOString(),
    source: opts.hashes ? 'provided-hashes' : opts.seed !== undefined ? `seed:${opts.seed}` : 'system-random',
    constraints: normalizeConstraints(opts.constraints),
    content: normalizeContent(opts.content),
    designs,
  };
}

/** Reproduce one design from its ref (hash[+probe]) and the constraints used for the roll. */
export function reproduce(ref: { hash: string; probe?: number }, constraints?: Constraints): Design {
  return mapDesign(ref.hash, { probe: ref.probe ?? 0, ...(constraints ? { constraints } : {}) });
}

function fontLine(label: string, f: FontSpec | undefined): string {
  if (!f) return `- **${label}**: —`;
  const ital = f.italic ? ' + italic' : '';
  const src = f.source === 'system' ? ' (system font)' : '';
  return `- **${label}**: ${f.family} ${f.weights.join('/')}${ital}${src} — fallback \`${f.fallback}\``;
}

function swatch(hex: string): string {
  return `\`${hex}\``;
}

export interface BriefOptions {
  /** Position in the roll, 1-based (for headings). */
  number?: number;
  /** Include the mapping trace table (default true). */
  trace?: boolean;
}

/** Render one design as a Markdown brief an agent can execute without further taste decisions. */
export function renderBrief(design: Design, content: Partial<Content> = {}, opts: BriefOptions = {}): string {
  const c = normalizeContent(content);
  const lang = c.language;
  const b = design.branch;
  const pal = design.palette.colors;
  const fontsUrl = googleFontsUrl(design.type, lang);
  const contrastInfo = contrastReport(pal);
  const scale = typeScale(design);
  const n = opts.number ? `#${opts.number} ` : '';
  const out: string[] = [];

  out.push(`# ${n}${b.name.zh} · ${b.name.en}`);
  out.push('');
  out.push(`> ${lang === 'zh' ? b.concept.zh : b.concept.en}`);
  out.push('');
  out.push('| | |');
  out.push('|---|---|');
  out.push(`| hash | \`${design.hash}\` |`);
  out.push(`| ref | \`${design.ref}\` |`);
  out.push(`| algorithm / library | ${design.algorithm} / \`${design.library}\` |`);
  out.push(`| constraints | ${describeConstraints(design.constraints)} |`);
  out.push(`| family | ${b.family} |`);
  out.push(`| references | ${b.references.join('; ')} |`);
  out.push('');
  out.push(
    lang === 'zh'
      ? '**这份 brief 是冻结的执行规格，不是灵感板。** 不要替换字体、颜色或版式，不要"顺手优化"成你习惯的样子。若与全局禁令冲突，以禁令为准；若 twist 与分支冲突，以分支为准并在页面注释中写明。'
      : '**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment).',
  );
  out.push('');

  if (opts.trace !== false) {
    out.push('## 映射过程 Mapping trace');
    out.push('');
    out.push('| bytes | hex | dimension | rule | → result |');
    out.push('|---|---|---|---|---|');
    for (const t of design.trace) {
      const note = t.note ? ` _(${t.note})_` : '';
      out.push(
        `| ${t.bytes.join('+')} | \`${t.hex}\` | ${t.dimension} | ${t.rule}${note} | **${t.result}** |`,
      );
    }
    out.push(`| 13–31 | \`${design.unusedBytes.slice(0, 12)}…\` | (unused) | recorded, not used | — |`);
    out.push('');
  }

  out.push('## 内容 Content');
  out.push('');
  out.push(`**Subject:** ${c.subject}`);
  out.push('');
  if (c.facts.length) {
    out.push(
      lang === 'zh'
        ? '只能使用以下事实。不得编造数字、评价、奖项或客户；缺少的信息留空或写"待补"。'
        : 'Use only these facts. Do not invent numbers, reviews, awards or customers; leave gaps visibly empty.',
    );
    out.push('');
    for (const f of c.facts) out.push(`- ${f}`);
  } else {
    out.push(
      '_(no facts supplied — use clearly marked placeholders such as "【待补：营业时间】", never invented data)_',
    );
  }
  out.push('');

  out.push(`## 文案语气 Voice — ${design.voice.name.zh} / ${design.voice.name.en}`);
  out.push('');
  out.push(design.voice.description);
  out.push('');
  out.push(`Devices: ${design.voice.devices.join(' · ')}`);
  out.push('');
  out.push(`Example register (do not copy, match the register): “${design.voice.example}”`);
  out.push('');

  out.push(`## 版式 Layout — ${design.layout.name}`);
  out.push('');
  out.push(design.layout.description);
  out.push('');
  out.push(`- **Grid:** ${design.layout.grid}`);
  out.push(`- **Branch grid token:** ${b.tokens.grid}`);
  out.push('');
  out.push('Section order (top → bottom):');
  out.push('');
  design.layout.structure.forEach((s, i) => out.push(`${i + 1}. ${s}`));
  out.push('');
  out.push(`**First-screen anchor — ${design.anchor.name}:** ${design.anchor.description}`);
  out.push('');

  out.push(`## 字体 Typography — ${design.type.name}`);
  out.push('');
  out.push(fontLine('Display', design.type.display));
  out.push(fontLine('Body', design.type.body));
  out.push(fontLine('Mono', design.type.mono));
  out.push(`- **CJK**: display ${design.type.cjk.display}, body ${design.type.cjk.body}`);
  out.push(`- **Setting rules:** ${design.type.notes}`);
  out.push('');
  out.push(
    `Scale: **${design.scale.name}** on a ${design.density.baseSize}px base → ` +
      scale.map((s) => `${s.step}: ${s.px}px`).join(' · '),
  );
  out.push('');
  if (fontsUrl) {
    out.push('```html');
    out.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
    out.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    out.push(`<link rel="stylesheet" href="${fontsUrl}">`);
    out.push('```');
    out.push('');
  }

  out.push(`## 配色 Colour — ${design.palette.name}`);
  out.push('');
  out.push('| token | hex | role |');
  out.push('|---|---|---|');
  out.push(`| paper | ${swatch(pal.paper)} | page background |`);
  out.push(`| ink | ${swatch(pal.ink)} | primary text |`);
  out.push(`| muted | ${swatch(pal.muted)} | secondary text |`);
  out.push(`| accent | ${swatch(pal.accent)} | primary accent |`);
  out.push(`| accent2 | ${swatch(pal.accent2)} | secondary accent |`);
  out.push(`| rule | ${swatch(pal.rule)} | lines, borders |`);
  out.push(`| panel | ${swatch(pal.panel)} | secondary background |`);
  out.push('');
  out.push(`**Usage:** ${design.palette.usage}`);
  if (design.paletteOverride) {
    out.push('');
    out.push(
      `**Brand override:** base palette \`${design.paletteOverride.basePaletteId}\`; accent → ${design.paletteOverride.accent}` +
        (design.paletteOverride.accent2 ? `, accent2 → ${design.paletteOverride.accent2}` : '') +
        '. Check the contrast table below before using brand colours for text.',
    );
  }
  out.push('');
  out.push('Contrast (WCAG):');
  out.push('');
  for (const l of contrastInfo.lines) out.push(`- ${l.pair}: **${l.ratio}:1** — ${l.verdict}`);
  out.push('');

  out.push(`## 密度 Density — ${design.density.name.zh} / ${design.density.name.en}`);
  out.push('');
  out.push(
    `${design.density.description} Base ${design.density.baseSize}px, line-height ${design.density.lineHeight}, ` +
      `spacing unit ${design.density.unit}px, section gap ${design.density.sectionGap}px, max width ${design.density.maxWidth}px.`,
  );
  out.push('');

  out.push('## 形状与层次 Shape & depth');
  out.push('');
  out.push(`- **Radius:** ${b.tokens.radius}`);
  out.push(`- **Borders:** ${b.tokens.border}`);
  out.push(`- **Shadow:** ${b.tokens.shadow}`);
  out.push('');

  out.push(`## 材质 Surface — ${design.surface.name}`);
  out.push('');
  out.push(design.surface.description);
  if (design.surface.css) {
    out.push('');
    out.push('```css');
    out.push(design.surface.css);
    out.push('```');
  }
  out.push('');

  out.push(`## 母题 Motif — ${design.motif.name}`);
  out.push('');
  out.push(design.motif.description);
  out.push('');

  out.push(`## 动效 Motion — ${design.motion.name}`);
  out.push('');
  out.push(design.motion.description);
  out.push('');
  out.push(
    `- duration \`${design.motion.duration}\`, easing \`${design.motion.easing}\`\n- prefers-reduced-motion: ${design.motion.reduced}`,
  );
  out.push('');

  out.push(`## 变数 Twist — ${design.twist.name.zh} / ${design.twist.name.en}`);
  out.push('');
  out.push(design.twist.description);
  out.push('');

  out.push('## 必须 Must');
  out.push('');
  for (const m of b.must) out.push(`- ${m}`);
  out.push('');
  out.push('## 不要 Must not (branch)');
  out.push('');
  for (const m of b.mustNot) out.push(`- ${m}`);
  out.push('');

  out.push('## 全局禁令 Global bans');
  out.push('');
  for (const ban of BANS) out.push(`- **${ban.title.zh}** (${ban.id}, ${ban.severity}): ${ban.detail}`);
  out.push('');

  out.push('## tokens.css');
  out.push('');
  out.push('```css');
  out.push(tokensCss(design, lang));
  out.push('```');
  out.push('');

  out.push('## 交付前自检 Before you ship');
  out.push('');
  out.push(
    `- [ ] Fonts on the page are exactly: ${design.type.display.family} / ${design.type.body.family}${design.type.mono ? ` / ${design.type.mono.family}` : ''}${lang === 'zh' ? ` (+ ${design.type.cjk.display} / ${design.type.cjk.body})` : ''}`,
  );
  out.push(`- [ ] Every colour on the page comes from the 7 palette tokens above`);
  out.push(`- [ ] First screen is the "${design.anchor.name}" anchor, in the "${design.layout.name}" layout`);
  out.push(`- [ ] Copy is written in the "${design.voice.name.en}" voice using only the facts`);
  out.push(`- [ ] Twist "${design.twist.name.en}" is visibly applied`);
  out.push(
    `- [ ] \`critique_page\` (or \`hash-design critique --brief ${design.ref}\`) reports no critical/major findings`,
  );
  out.push('');
  return out.join('\n');
}

/** Machine-readable brief (stable JSON shape). */
export function briefJson(design: Design, content: Partial<Content> = {}) {
  const c = normalizeContent(content);
  const lang = c.language;
  return {
    ref: design.ref,
    hash: design.hash,
    short: design.short,
    probe: design.probe,
    algorithm: design.algorithm,
    library: design.library,
    constraints: design.constraints,
    content: c,
    branch: {
      id: design.branch.id,
      name: design.branch.name,
      family: design.branch.family,
      concept: design.branch.concept,
      references: design.branch.references,
      tokens: design.branch.tokens,
      must: design.branch.must,
      mustNot: design.branch.mustNot,
    },
    voice: design.voice,
    layout: design.layout,
    anchor: design.anchor,
    type: design.type,
    fonts: { stacks: fontStacks(design.type, lang), googleFontsUrl: googleFontsUrl(design.type, lang) },
    palette: design.palette,
    paletteOverride: design.paletteOverride ?? null,
    contrast: contrastReport(design.palette.colors),
    density: design.density,
    scale: { ...design.scale, steps: typeScale(design) },
    motion: design.motion,
    motif: design.motif,
    surface: design.surface,
    twist: design.twist,
    bans: BANS.map((b) => b.id),
    tokensCss: tokensCss(design, lang),
    trace: design.trace,
  };
}

export type BriefJson = ReturnType<typeof briefJson>;

/** File-system friendly slug for a design in a roll: "01-supermarket-circular". */
export function designSlug(design: Design, index: number): string {
  return `${String(index + 1).padStart(2, '0')}-${design.branch.id}`;
}

/** Compact overview of a roll (Markdown). */
export function renderRollSummary(r: Roll): string {
  const out: string[] = [];
  out.push(`# hash-design roll — ${r.content.subject}`);
  out.push('');
  out.push(
    `${r.designs.length} directions · source: ${r.source} · ${r.algorithm} · library \`${r.library}\` · constraints: ${describeConstraints(r.constraints)}`,
  );
  out.push('');
  out.push('| # | ref (short) | branch | layout | type | palette | density | voice | twist |');
  out.push('|---|---|---|---|---|---|---|---|---|');
  r.designs.forEach((d, i) => {
    const probe = d.probe ? ` (+${d.probe})` : '';
    out.push(
      `| ${i + 1} | \`${d.short}\`${probe} | **${d.branch.name.zh}** ${d.branch.name.en} | ${d.layout.name} | ${d.type.display.family} / ${d.type.body.family} | ${d.palette.name} | ${d.density.id} | ${d.voice.name.zh} | ${d.twist.name.zh} |`,
    );
  });
  out.push('');
  out.push(
    'Full refs (reproduce any brief with `get_brief` / `hash-design brief <ref>` + the same constraints):',
  );
  out.push('');
  r.designs.forEach((d, i) => out.push(`${i + 1}. \`${d.ref}\``));
  out.push('');
  return out.join('\n');
}

/** Full roll as Markdown: summary + every brief. */
export function renderRoll(r: Roll, opts: { trace?: boolean } = {}): string {
  const parts = [renderRollSummary(r)];
  r.designs.forEach((d, i) => {
    parts.push('---');
    parts.push(renderBrief(d, r.content, { number: i + 1, trace: opts.trace ?? true }));
  });
  return parts.join('\n\n');
}

/** Roll serialised for disk (roll.json): refs + content + constraints + brief JSON for each design. */
export function rollJson(r: Roll) {
  return {
    algorithm: r.algorithm,
    library: r.library,
    createdAt: r.createdAt,
    source: r.source,
    constraints: r.constraints,
    content: r.content,
    designs: r.designs.map((d, i) => ({ number: i + 1, slug: designSlug(d, i), ...briefJson(d, r.content) })),
  };
}

export type RollJson = ReturnType<typeof rollJson>;
