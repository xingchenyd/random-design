import { type HTMLElement, parse } from 'node-html-parser';
import { contrast, hexToRgb, isPurpleBlue, parseCssColor } from './color.js';
import { BANNED_FONTS, BANS, BUZZWORDS_EN, BUZZWORDS_ZH, isBannedFont } from './data/bans.js';
import type { Design } from './mapping.js';
import type { BanSeverity } from './types.js';
import { FRAMEWORK_DEFAULT_HEX } from './validate.js';

export type Severity = BanSeverity;

export interface Finding {
  /** Ban id (see BANS) or an extra check id (e.g. "low-contrast", "brief-fonts"). */
  rule: string;
  severity: Severity;
  message: string;
  evidence?: string;
  fix?: string;
}

export interface CritiqueInput {
  html: string;
  /** Extra CSS that is not inlined in the HTML (e.g. a linked stylesheet's contents). */
  css?: string;
  /** When given, the page is also checked for adherence to this brief. */
  design?: Design;
  /** When given, numbers on the page that do not appear in the facts are flagged for verification. */
  facts?: string[];
}

export interface CritiqueResult {
  /** 0–100, higher is better. */
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  /** Adherence to the brief, 0–100 (only when a design was given). */
  adherence: number | null;
  counts: Record<Severity, number>;
  findings: Finding[];
  /** Rules that were checked and passed. */
  passed: string[];
}

const PENALTY: Record<Severity, number> = { critical: 25, major: 10, minor: 4 };

interface CssRule {
  selector: string;
  decls: Array<[string, string]>;
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function parseDecls(block: string): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const part of block.split(';')) {
    const i = part.indexOf(':');
    if (i <= 0) continue;
    const prop = part.slice(0, i).trim().toLowerCase();
    const value = part.slice(i + 1).trim();
    if (prop && value) out.push([prop, value]);
  }
  return out;
}

function parseCss(css: string): CssRule[] {
  const rules: CssRule[] = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  const clean = stripComments(css);
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    const selector = (m[1] ?? '').trim();
    if (selector.startsWith('@font-face')) continue;
    rules.push({ selector, decls: parseDecls(m[2] ?? '') });
  }
  return rules;
}

function collectCss(root: HTMLElement, extra?: string): { css: string; inline: string[] } {
  const blocks = root.querySelectorAll('style').map((s) => s.textContent);
  const inline = root
    .querySelectorAll('[style]')
    .map((el) => el.getAttribute('style') ?? '')
    .filter(Boolean);
  const css = [...blocks, extra ?? '', ...inline.map((s) => `[inline]{${s}}`)].join('\n');
  return { css, inline };
}

function buildVarMap(rules: CssRule[]): Map<string, string> {
  const vars = new Map<string, string>();
  for (const r of rules) for (const [p, v] of r.decls) if (p.startsWith('--')) vars.set(p, v);
  return vars;
}

function resolveVars(value: string, vars: Map<string, string>, depth = 0): string {
  if (depth > 8 || !value.includes('var(')) return value;
  const next = value.replace(
    /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g,
    (_m, name: string, fb?: string) => {
      return vars.get(name) ?? fb?.trim() ?? '';
    },
  );
  return resolveVars(next, vars, depth + 1);
}

const COLOR_TOKEN_RE =
  /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:purple|violet|indigo|blue|blueviolet|mediumpurple|slateblue|royalblue|magenta|fuchsia)\b/gi;

function colorsIn(value: string): string[] {
  return (value.match(COLOR_TOKEN_RE) ?? [])
    .map((c) => parseCssColor(c))
    .filter((c): c is string => Boolean(c));
}

function firstFamily(value: string): string {
  return (value.split(',')[0] ?? '').trim().replace(/^["']|["']$/g, '');
}

const GENERIC_FAMILIES = new Set([
  'system-ui',
  'sans-serif',
  'serif',
  'monospace',
  '-apple-system',
  'blinkmacsystemfont',
  'ui-sans-serif',
  'ui-serif',
  'ui-monospace',
  'segoe ui',
  'helvetica neue',
  'helvetica',
  'arial',
  'inherit',
  'initial',
  'unset',
]);

function visibleText(root: HTMLElement): string {
  const clone = parse(root.toString());
  clone.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function classOf(el: HTMLElement): string {
  return (el.getAttribute('class') ?? '').trim();
}

function snippet(s: string, n = 120): string {
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n)}…` : t;
}

function lengthPx(v: string): number | null {
  const m = /(-?[\d.]+)(px|rem|em)?/.exec(v);
  if (!m) return null;
  const n = Number(m[1]);
  if (m[2] === 'rem' || m[2] === 'em') return n * 16;
  return n;
}

function colorDistance(a: string, b: string): number {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return Math.sqrt((x.r - y.r) ** 2 + (x.g - y.g) ** 2 + (x.b - y.b) ** 2);
}

/** Static critique of an HTML page against the global bans (and optionally a brief). */
export function critiquePage(input: CritiqueInput): CritiqueResult {
  const root = parse(input.html, {
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true },
  });
  const { css } = collectCss(root, input.css);
  const rules = parseCss(css);
  const vars = buildVarMap(rules);
  const allDecls: Array<{ selector: string; prop: string; value: string }> = [];
  for (const r of rules)
    for (const [prop, value] of r.decls)
      allDecls.push({ selector: r.selector, prop, value: resolveVars(value, vars) });
  const classAttr = root
    .querySelectorAll('[class]')
    .map((el) => classOf(el))
    .join(' ');
  const htmlLower = input.html.toLowerCase();
  const text = visibleText(root);
  const findings: Finding[] = [];
  const checked = new Set<string>();
  const add = (f: Finding) => findings.push(f);

  // ── generic-sans ───────────────────────────────────────────────────────────
  checked.add('generic-sans');
  const families = allDecls
    .filter((d) => d.prop === 'font-family' || d.prop === 'font')
    .map((d) =>
      d.prop === 'font' ? d.value.replace(/^.*?\d+(?:px|rem|em|%)?(?:\/[\d.]+\w*)?\s+/, '') : d.value,
    );
  const bannedUsed = new Set<string>();
  for (const f of families)
    for (const part of f.split(','))
      if (isBannedFont(part)) bannedUsed.add(part.trim().replace(/^["']|["']$/g, ''));
  for (const m of input.html.matchAll(/fonts\.googleapis\.com\/css2?\?([^"'\s>]+)/g)) {
    for (const fam of (m[1] ?? '').matchAll(/family=([^:&]+)/g)) {
      const name = decodeURIComponent((fam[1] ?? '').replace(/\+/g, ' '));
      if (isBannedFont(name)) bannedUsed.add(name);
    }
  }
  if (/\bfont-sans\b/.test(classAttr) && !/fontfamily/i.test(input.html))
    bannedUsed.add('Tailwind font-sans default');
  if (bannedUsed.size) {
    add({
      rule: 'generic-sans',
      severity: 'critical',
      message: `Default-AI font(s) in use: ${[...bannedUsed].join(', ')}`,
      fix: 'Use the display/body pairing from the brief.',
    });
  } else if (
    families.length > 0 &&
    families.every((f) => GENERIC_FAMILIES.has(firstFamily(f).toLowerCase()))
  ) {
    add({
      rule: 'generic-sans',
      severity: 'major',
      message: 'Only generic/system font families are declared — no designed typeface.',
      evidence: snippet(families.join(' | ')),
      fix: 'Load and use the brief’s font pairing.',
    });
  } else if (families.length === 0) {
    add({
      rule: 'generic-sans',
      severity: 'major',
      message: 'No font-family declared at all; the browser default will be used.',
      fix: 'Load and use the brief’s font pairing.',
    });
  }

  // ── purple-blue-gradient ───────────────────────────────────────────────────
  checked.add('purple-blue-gradient');
  const gradientHits: string[] = [];
  for (const d of allDecls) {
    if (!/gradient\(/i.test(d.value)) continue;
    for (const g of d.value.match(
      /(?:repeating-)?(?:linear|radial|conic)-gradient\((?:[^()]|\([^()]*\))*\)/gi,
    ) ?? []) {
      const cols = colorsIn(g);
      const pb = cols.filter(isPurpleBlue);
      if (
        pb.length >= 2 ||
        (pb.length >= 1 &&
          cols.length >= 2 &&
          cols.every((c) => isPurpleBlue(c) || /^#(?:fff|ffffff|000|000000)$/.test(c)))
      ) {
        gradientHits.push(snippet(`${d.selector} { ${d.prop}: ${g} }`));
      }
    }
  }
  if (
    /\bfrom-(?:purple|violet|indigo|fuchsia|blue)-\d{2,3}\b/.test(classAttr) &&
    /\b(?:to|via)-(?:purple|violet|indigo|blue|pink|fuchsia|cyan)-\d{2,3}\b/.test(classAttr)
  ) {
    gradientHits.push('Tailwind gradient classes from-purple/indigo … to-blue');
  }
  if (gradientHits.length) {
    add({
      rule: 'purple-blue-gradient',
      severity: 'critical',
      message: `Purple/blue gradient detected (${gradientHits.length}).`,
      evidence: gradientHits.slice(0, 3).join('\n'),
      fix: 'Remove it. Use flat palette colours; any gradient must use brief colours and have a material reason.',
    });
  }
  const clipText =
    allDecls.some((d) => /background-clip/.test(d.prop) && /text/.test(d.value)) ||
    /\bbg-clip-text\b/.test(classAttr);
  if (clipText) {
    add({
      rule: 'purple-blue-gradient',
      severity: 'major',
      message: 'Gradient text (background-clip: text) is a template tell.',
      fix: 'Set headline text in a solid palette colour.',
    });
  }

  // ── centered-hero-two-buttons ──────────────────────────────────────────────
  checked.add('centered-hero-two-buttons');
  const h1 = root.querySelector('h1');
  if (h1) {
    let container: HTMLElement | null = h1.parentNode as HTMLElement | null;
    for (let i = 0; i < 3 && container && container.tagName !== 'BODY'; i++) {
      const buttons = container.querySelectorAll('button, a').filter((el) => {
        const cls = classOf(el).toLowerCase();
        return (
          el.tagName === 'BUTTON' ||
          /\b(?:btn|button|cta)\b|btn-|button-|-btn|-button|rounded-full|px-\d/.test(cls)
        );
      });
      if (buttons.length >= 2) {
        const chain: HTMLElement[] = [h1];
        let p: HTMLElement | null = h1.parentNode as HTMLElement | null;
        while (p && p !== container.parentNode) {
          chain.push(p);
          p = p.parentNode as HTMLElement | null;
        }
        const classes = chain.map((el) => classOf(el)).join(' ');
        const styles = chain.map((el) => el.getAttribute('style') ?? '').join(';');
        const centeredByClass = /\btext-center\b|\bcenter(?:ed)?\b|\bhero\b|items-center/.test(classes);
        const centeredByStyle = /text-align\s*:\s*center/.test(styles);
        const centeredByCss = chain.some((el) => {
          const cls = classOf(el).split(/\s+/).filter(Boolean);
          const tag = el.tagName.toLowerCase();
          return allDecls.some(
            (d) =>
              d.prop === 'text-align' &&
              d.value.startsWith('center') &&
              (cls.some((c) =>
                new RegExp(`\\.${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(d.selector),
              ) ||
                new RegExp(`(^|[\\s,>])${tag}(?![\\w-])`).test(d.selector)),
          );
        });
        if (centeredByClass || centeredByStyle || centeredByCss) {
          add({
            rule: 'centered-hero-two-buttons',
            severity: 'critical',
            message: 'Centered hero headline with two call-to-action buttons.',
            evidence: snippet(
              `<h1>${h1.textContent}</h1> + ${buttons
                .slice(0, 2)
                .map((b) => b.textContent.trim())
                .join(' / ')}`,
            ),
            fix: 'Rebuild the first screen from the brief’s layout + anchor; at most one action, placed per the layout.',
          });
        }
        break;
      }
      container = container.parentNode as HTMLElement | null;
    }
  }

  // ── identical-cards ────────────────────────────────────────────────────────
  checked.add('identical-cards');
  const cardHits: string[] = [];
  for (const parent of root.querySelectorAll('*')) {
    const kids = parent.childNodes.filter((n): n is HTMLElement => n.nodeType === 1) as HTMLElement[];
    if (kids.length < 3 || kids.length > 6) continue;
    const sig = (el: HTMLElement) => `${el.tagName}.${classOf(el)}`;
    const first = kids[0];
    if (!first || kids.some((k) => sig(k) !== sig(first))) continue;
    if (['LI', 'TR', 'TD', 'OPTION', 'SPAN', 'A', 'P'].includes(first.tagName)) continue;
    const cardLike = kids.every((k) => k.querySelector('h2, h3, h4, h5') && k.querySelector('p'));
    if (!cardLike) continue;
    const structure = (el: HTMLElement) =>
      el.childNodes
        .filter((n): n is HTMLElement => n.nodeType === 1)
        .map((n) => (n as HTMLElement).tagName)
        .join(',');
    const sameStructure = kids.every((k) => structure(k) === structure(first));
    if (sameStructure && [3, 4, 6].includes(kids.length)) {
      const withIcon = kids.every((k) => k.querySelector('svg, i, img, .icon, [class*="icon"]'));
      cardHits.push(
        `${kids.length}× <${first.tagName.toLowerCase()} class="${snippet(classOf(first), 40)}">${withIcon ? ' (icon + heading + text)' : ''}`,
      );
    }
  }
  if (cardHits.length) {
    add({
      rule: 'identical-cards',
      severity: 'major',
      message: 'Row(s) of structurally identical cards (heading + text, same class).',
      evidence: cardHits.slice(0, 3).join('\n'),
      fix: 'Regroup the information with the branch’s devices (table, list, price tags, numbered clauses); vary size and weight.',
    });
  }

  // ── glassmorphism ──────────────────────────────────────────────────────────
  checked.add('glassmorphism');
  if (
    allDecls.some((d) => /backdrop-filter/.test(d.prop) && /blur/.test(d.value)) ||
    /\bbackdrop-blur/.test(classAttr)
  ) {
    add({
      rule: 'glassmorphism',
      severity: 'major',
      message: 'backdrop-filter blur (glassmorphism) detected.',
      fix: 'Use opaque panels from the palette; separate layers with rules or solid fills.',
    });
  }

  // ── emoji-icons ────────────────────────────────────────────────────────────
  checked.add('emoji-icons');
  const emoji = text.match(/\p{Emoji_Presentation}|\p{Extended_Pictographic}️/gu) ?? [];
  if (emoji.length) {
    add({
      rule: 'emoji-icons',
      severity: emoji.length >= 3 ? 'major' : 'minor',
      message: `${emoji.length} emoji in visible text.`,
      evidence: [...new Set(emoji)].slice(0, 12).join(' '),
      fix: 'Replace with typographic symbols, numbers, or SVG drawn from the brief motif.',
    });
  }
  if (
    /data-lucide|class="[^"]*\blucide\b|heroicons|feather-icons|class="[^"]*\bfa[srb]?\s+fa-|material-icons|material-symbols/i.test(
      input.html,
    )
  ) {
    add({
      rule: 'emoji-icons',
      severity: 'minor',
      message: 'Generic icon library detected (Lucide / Heroicons / Font Awesome / Material).',
      fix: 'Draw the few marks you need from the brief motif instead.',
    });
  }

  // ── buzzword-copy ──────────────────────────────────────────────────────────
  checked.add('buzzword-copy');
  const lower = text.toLowerCase();
  const buzz: string[] = [];
  for (const w of BUZZWORDS_EN) {
    const re = new RegExp(`(^|[^a-z])${w.replace(/[-\s]/g, '[-\\s]')}([^a-z]|$)`, 'i');
    if (re.test(lower)) buzz.push(w);
  }
  for (const w of BUZZWORDS_ZH) if (text.includes(w)) buzz.push(w);
  if (buzz.length) {
    add({
      rule: 'buzzword-copy',
      severity: buzz.length >= 3 ? 'major' : 'minor',
      message: `Marketing filler: ${buzz.join(', ')}`,
      fix: 'Rewrite with concrete facts in the brief’s voice.',
    });
  }

  // ── soft-shadow-rounded ────────────────────────────────────────────────────
  checked.add('soft-shadow-rounded');
  const softShadows = allDecls.filter((d) => {
    if (d.prop !== 'box-shadow' || /^none$/i.test(d.value)) return false;
    const nums = (d.value.match(/-?[\d.]+(?:px|rem)?/g) ?? []).map((n) => lengthPx(n) ?? 0);
    const blur = nums[2] ?? 0;
    return blur >= 12;
  });
  const bigRadius = allDecls.filter((d) => {
    if (d.prop !== 'border-radius') return false;
    if (/50%|999|9999/.test(d.value)) return false;
    const px = lengthPx(d.value);
    return px !== null && px >= 12;
  });
  const twRounded = (classAttr.match(/\brounded-(?:xl|2xl|3xl)\b/g) ?? []).length;
  const twShadow = (classAttr.match(/\bshadow-(?:md|lg|xl|2xl)\b/g) ?? []).length;
  const roundedCount = bigRadius.length + twRounded;
  const shadowCount = softShadows.length + twShadow;
  if (roundedCount >= 2 && shadowCount >= 2) {
    add({
      rule: 'soft-shadow-rounded',
      severity: 'major',
      message: `Rounded corners (${roundedCount}) + soft blurred shadows (${shadowCount}) everywhere.`,
      evidence: snippet(
        [...bigRadius, ...softShadows]
          .slice(0, 3)
          .map((d) => `${d.selector} { ${d.prop}: ${d.value} }`)
          .join(' '),
      ),
      fix: 'Follow the branch radius/shadow tokens — most branches are 0 radius with rules or hard offsets.',
    });
  } else if (shadowCount >= 3) {
    add({
      rule: 'soft-shadow-rounded',
      severity: 'minor',
      message: `${shadowCount} soft blurred shadows.`,
      fix: 'Use rules, solid fills or hard offsets for depth.',
    });
  }

  // ── invented-facts ─────────────────────────────────────────────────────────
  checked.add('invented-facts');
  const proof: string[] = [];
  const proofPatterns: Array<[RegExp, string]> = [
    [
      /\b\d+(?:[.,]\d+)?\s?[kKmM]\+?\s+(?:users|customers|clients|downloads|teams|developers|companies)\b/,
      'user-count stat',
    ],
    [/\b99(?:\.9+)?%\s*(?:uptime|satisfaction)/i, 'uptime / satisfaction stat'],
    [/trusted by|as seen (?:in|on)|loved by/i, 'social-proof line'],
    [/★★★★★|⭐⭐⭐⭐⭐|5\/5 stars/, 'star rating'],
    [/万\+?\s*(?:用户|客户|下载)|好评率|深受.{0,6}信赖/, '中文社会证明'],
  ];
  for (const [re, label] of proofPatterns) {
    const m = re.exec(text);
    if (m) proof.push(`${label}: “${m[0]}”`);
  }
  const testimonialAvatars = root
    .querySelectorAll('blockquote, figure, [class*="testimonial"]')
    .filter((el) => el.querySelector('img'));
  if (testimonialAvatars.length >= 2)
    proof.push(`${testimonialAvatars.length} quote blocks with avatar images`);
  if (proof.length) {
    add({
      rule: 'invented-facts',
      severity: 'critical',
      message: 'Social-proof / stats patterns that are usually invented.',
      evidence: proof.join('\n'),
      fix: 'Remove unless the exact claim is in the supplied facts.',
    });
  }
  if (input.facts?.length) {
    const factText = input.facts.join(' ');
    const numbers = new Set(text.match(/\d+(?:[.:,]\d+)*/g) ?? []);
    const unknown = [...numbers].filter((n) => n.length >= 2 && !factText.includes(n));
    if (unknown.length) {
      add({
        rule: 'invented-facts',
        severity: 'minor',
        message: `Numbers on the page that do not appear in the facts: ${unknown.slice(0, 12).join(', ')}`,
        fix: 'Verify each one; delete anything invented.',
      });
    }
  }

  // ── tailwind-default-palette ───────────────────────────────────────────────
  checked.add('tailwind-default-palette');
  const allHex = new Set<string>();
  for (const d of allDecls) for (const c of colorsIn(d.value)) allHex.add(c);
  const frameworkHex = [...allHex].filter((h) => FRAMEWORK_DEFAULT_HEX.includes(h));
  const twColors =
    classAttr.match(/\b(?:bg|text|border|from|to|via|ring)-(?:indigo|violet|purple|slate|sky)-\d{2,3}\b/g) ??
    [];
  if (frameworkHex.length + twColors.length >= 2) {
    add({
      rule: 'tailwind-default-palette',
      severity: 'major',
      message: 'Framework default colours in use.',
      evidence: [...frameworkHex, ...new Set(twColors)].slice(0, 10).join(', '),
      fix: 'Use only the 7 brief palette tokens.',
    });
  }

  // ── scroll-fade-everything + reduced motion ────────────────────────────────
  checked.add('scroll-fade-everything');
  const aos = /data-aos|aos\.init|fadeinup|fade-up|fade-in-up|wow\.js|scrollreveal/i.test(input.html);
  const ioFade =
    /intersectionobserver/i.test(input.html) && /translatey\(\s*\d{2}px|opacity\s*:\s*0\b/i.test(htmlLower);
  if (aos || ioFade) {
    add({
      rule: 'scroll-fade-everything',
      severity: 'minor',
      message: 'Scroll-triggered fade/slide-in reveal detected.',
      fix: 'Use only the brief motion spec, tied to the branch’s physical metaphor.',
    });
  }
  const animates = allDecls.some(
    (d) =>
      (d.prop === 'animation' || d.prop === 'animation-name' || d.prop === 'transition') &&
      !/^none\b/.test(d.value),
  );
  if (animates && !/prefers-reduced-motion/.test(css)) {
    add({
      rule: 'reduced-motion',
      severity: 'minor',
      message: 'Animations/transitions without a prefers-reduced-motion fallback.',
      fix: 'Add @media (prefers-reduced-motion: reduce) { … } per the brief motion spec.',
    });
  }

  // ── pill-badge-sparkle ─────────────────────────────────────────────────────
  checked.add('pill-badge-sparkle');
  if (h1) {
    const prev = h1.previousElementSibling;
    if (prev) {
      const cls = classOf(prev).toLowerCase();
      const isPill =
        /badge|pill|chip|eyebrow-pill|rounded-full/.test(cls) && prev.textContent.trim().length < 48;
      if (isPill) {
        add({
          rule: 'pill-badge-sparkle',
          severity: 'minor',
          message: 'Pill badge directly above the headline.',
          evidence: snippet(prev.toString()),
          fix: 'Remove it, or turn it into the branch’s own label device (kicker, form number, dateline…).',
        });
      }
    }
  }

  // ── placeholder-content ────────────────────────────────────────────────────
  checked.add('placeholder-content');
  const ph: string[] = [];
  if (/lorem ipsum/i.test(text)) ph.push('Lorem ipsum');
  if (
    /source\.unsplash\.com|images\.unsplash\.com|picsum\.photos|placehold\.co|placeholder\.com|via\.placeholder|placekitten|randomuser\.me/i.test(
      input.html,
    )
  )
    ph.push('stock/placeholder image URL');
  if (/feature (?:one|two|three|1|2|3)\b/i.test(text)) ph.push('“Feature One” style headings');
  if (ph.length) {
    add({
      rule: 'placeholder-content',
      severity: 'major',
      message: `Placeholder content: ${ph.join(', ')}`,
      fix: 'Use real facts; replace images with typography, palette blocks or motif SVG.',
    });
  }

  // ── template-sections ──────────────────────────────────────────────────────
  checked.add('template-sections');
  const headings = root.querySelectorAll('h2, h3').map((h) => h.textContent.trim().toLowerCase());
  const templ = [
    /^features?$|^key features|^our features|产品特色|核心功能/,
    /testimonials?|what (?:our|people) (?:customers )?say|用户评价|客户评价/,
    /^pricing|^plans|价格方案|套餐/,
    /^faq|frequently asked|常见问题/,
    /how it works|工作原理|如何运作/,
    /why choose us|为什么选择我们/,
    /get started|立即开始|开始使用/,
  ];
  const templHits = templ.filter((re) => headings.some((h) => re.test(h))).length;
  if (templHits >= 3) {
    add({
      rule: 'template-sections',
      severity: 'minor',
      message: `SaaS template section headings (${templHits} of Features/Testimonials/Pricing/FAQ/How it works…).`,
      fix: 'Order and name sections per the brief layout structure.',
    });
  }

  // ── extra hygiene ──────────────────────────────────────────────────────────
  const lowContrast: string[] = [];
  for (const r of rules) {
    const get = (p: string) => r.decls.find(([k]) => k === p)?.[1];
    const fg = get('color');
    const bg = get('background-color') ?? get('background');
    if (!fg || !bg || /gradient|url\(/.test(bg)) continue;
    const f = colorsIn(resolveVars(fg, vars))[0];
    const b = colorsIn(resolveVars(bg, vars))[0];
    if (f && b && contrast(f, b) < 3)
      lowContrast.push(`${snippet(r.selector, 40)}: ${f} on ${b} = ${contrast(f, b).toFixed(2)}:1`);
  }
  if (lowContrast.length) {
    add({
      rule: 'low-contrast',
      severity: 'major',
      message: 'Text/background pairs below 3:1.',
      evidence: lowContrast.slice(0, 5).join('\n'),
      fix: 'Use ink/paper or the on-accent colour from the brief contrast table.',
    });
  }
  if (!/<meta[^>]+name=["']viewport/i.test(input.html)) {
    add({
      rule: 'viewport',
      severity: 'minor',
      message: 'Missing <meta name="viewport">.',
      fix: 'Add width=device-width, initial-scale=1.',
    });
  }
  if (!/<html[^>]*\blang=/i.test(input.html)) {
    add({
      rule: 'lang',
      severity: 'minor',
      message: 'Missing lang attribute on <html>.',
      fix: 'Add lang="zh-CN" or lang="en".',
    });
  }
  const noAlt = root.querySelectorAll('img').filter((img) => !img.hasAttribute('alt')).length;
  if (noAlt)
    add({
      rule: 'img-alt',
      severity: 'minor',
      message: `${noAlt} <img> without alt.`,
      fix: 'Describe or mark decorative with alt="".',
    });

  // ── brief adherence ────────────────────────────────────────────────────────
  let adherence: number | null = null;
  if (input.design) {
    const d = input.design;
    let points = 100;
    const fontBlob =
      `${families.join(' ')} ${decodeURIComponent(input.html.match(/fonts\.googleapis\.com[^"'\s>]*/g)?.join(' ') ?? '').replace(/\+/g, ' ')}`.toLowerCase();
    const needFonts = [d.type.display.family, d.type.body.family];
    const missingFonts = needFonts.filter((f) => !fontBlob.includes(f.toLowerCase()));
    if (missingFonts.length) {
      points -= 20 * missingFonts.length;
      add({
        rule: 'brief-fonts',
        severity: 'major',
        message: `Brief fonts not used: ${missingFonts.join(', ')}`,
        fix: `Load and apply ${needFonts.join(' + ')} as specified.`,
      });
    }
    const palette = Object.entries(d.palette.colors) as Array<[string, string]>;
    const requiredKeys = ['paper', 'ink', 'accent'];
    const missingKeys = requiredKeys.filter((k) => {
      const hex = d.palette.colors[k as keyof typeof d.palette.colors];
      return ![...allHex].some((h) => colorDistance(h, hex) < 6);
    });
    if (missingKeys.length) {
      points -= 10 * missingKeys.length;
      add({
        rule: 'brief-palette',
        severity: 'major',
        message: `Brief colours missing from the CSS: ${missingKeys.join(', ')}`,
        fix: 'Paste the brief tokens.css and use its custom properties.',
      });
    }
    const foreign = [...allHex].filter(
      (h) => !palette.some(([, p]) => colorDistance(h, p) < 24) && !['#ffffff', '#000000'].includes(h),
    );
    if (foreign.length > 4) {
      points -= Math.min(20, foreign.length * 2);
      add({
        rule: 'brief-palette',
        severity: 'minor',
        message: `${foreign.length} colours outside the brief palette.`,
        evidence: foreign.slice(0, 10).join(', '),
        fix: 'Map every colour to one of the 7 palette tokens.',
      });
    }
    const zeroRadius = /^0\b|^0px|^none/i.test(d.branch.tokens.radius.trim());
    const radiusUse = allDecls.filter(
      (x) => x.prop === 'border-radius' && !/50%|999/.test(x.value) && (lengthPx(x.value) ?? 0) > 3,
    );
    if (zeroRadius && radiusUse.length) {
      points -= 10;
      add({
        rule: 'brief-shape',
        severity: 'minor',
        message: `Branch radius policy is "${snippet(d.branch.tokens.radius, 60)}" but ${radiusUse.length} rounded declarations found.`,
        fix: 'Remove border-radius except where the branch tokens allow it.',
      });
    }
    const noShadow = /^none/i.test(d.branch.tokens.shadow.trim());
    const shadowUse = allDecls.filter((x) => x.prop === 'box-shadow' && !/^none/i.test(x.value));
    if (noShadow && shadowUse.length) {
      points -= 10;
      add({
        rule: 'brief-shape',
        severity: 'minor',
        message: `Branch shadow policy is "${snippet(d.branch.tokens.shadow, 60)}" but ${shadowUse.length} box-shadow declarations found.`,
        fix: 'Remove shadows unless the branch token explicitly allows a specific one.',
      });
    }
    adherence = Math.max(0, points);
  }

  const counts: Record<Severity, number> = { critical: 0, major: 0, minor: 0 };
  for (const f of findings) counts[f.severity]++;
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + PENALTY[f.severity], 0));
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
  const failed = new Set(findings.map((f) => f.rule));
  const order: Record<Severity, number> = { critical: 0, major: 1, minor: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity]);
  return {
    score,
    grade,
    adherence,
    counts,
    findings,
    passed: [...checked].filter((r) => !failed.has(r)),
  };
}

/** Render a critique as Markdown. */
export function renderCritique(r: CritiqueResult): string {
  const out: string[] = [];
  out.push(
    `# Critique — score ${r.score}/100 (${r.grade})${r.adherence !== null ? ` · brief adherence ${r.adherence}/100` : ''}`,
  );
  out.push('');
  out.push(`critical ${r.counts.critical} · major ${r.counts.major} · minor ${r.counts.minor}`);
  out.push('');
  if (r.findings.length === 0) out.push('No findings. ✓ (Static checks only — still look at the page.)');
  for (const f of r.findings) {
    out.push(`- **[${f.severity}] ${f.rule}** — ${f.message}`);
    if (f.evidence) out.push(`  - evidence: ${f.evidence.replace(/\n/g, ' | ')}`);
    if (f.fix) out.push(`  - fix: ${f.fix}`);
  }
  out.push('');
  out.push(`Passed: ${r.passed.join(', ') || '—'}`);
  out.push('');
  out.push(
    `Not machine-checkable — verify by eye: does the first screen match the brief anchor? Is the copy in the brief voice? Would a designer recognise the branch (${BANS.length} bans checked, ${BANNED_FONTS.length} banned fonts)?`,
  );
  return out.join('\n');
}
