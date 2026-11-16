import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderBrief, reproduce, roll } from '../src/brief.js';
import { parseFactsText } from '../src/cli.js';
import { critiquePage } from '../src/critique.js';
import { parseRef } from '../src/hash.js';
import { libraryFingerprint } from '../src/mapping.js';

const root = new URL('../../../', import.meta.url);
const examplesDir = new URL('examples/', root);

/** Every directory under examples/ that holds a roll.json is a full example run. */
const EXAMPLES = readdirSync(examplesDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(new URL(`${e.name}/roll.json`, examplesDir)))
  .map((e) => e.name)
  .sort();

interface SavedDesign {
  number: number;
  slug: string;
  ref: string;
  branch: { id: string };
}

const load = (name: string) => {
  const ex = (p: string) => new URL(`${name}/${p}`, examplesDir);
  const saved = JSON.parse(readFileSync(ex('roll.json'), 'utf8'));
  const designs = saved.designs as SavedDesign[];
  return { ex, saved, designs };
};

it('finds the examples', () => {
  expect(EXAMPLES).toContain('fourth-lane-bakery');
  expect(EXAMPLES.length).toBeGreaterThanOrEqual(4);
});

describe.each(EXAMPLES)('examples/%s', (name) => {
  const { ex, saved, designs } = load(name);
  const facts = parseFactsText(readFileSync(ex('facts.md'), 'utf8'));
  const seed = String(saved.source).replace(/^seed:/, '');
  const fresh = roll({
    seed,
    constraints: saved.constraints,
    content: { subject: saved.content.subject, facts },
  });

  it('was rolled from a fixed seed with the current library (re-roll it if the data changed)', () => {
    expect(saved.source).toMatch(/^seed:/);
    expect(saved.library).toBe(libraryFingerprint());
    expect(designs.map((d) => d.ref)).toEqual(fresh.designs.map((d) => d.ref));
    expect(saved.content.facts).toEqual(facts);
    expect(saved.content.language).toBe(fresh.content.language);
  });

  it('frozen briefs match what the library renders today', () => {
    fresh.designs.forEach((d, i) => {
      const slug = designs[i]!.slug;
      const md = readFileSync(ex(`briefs/${slug}.md`), 'utf8');
      const expected = renderBrief(d, fresh.content, { number: i + 1 });
      expect(md).toBe(expected.endsWith('\n') ? expected : `${expected}\n`);
    });
  });

  it('has a preview and screenshots per brief, a compare page and a README', () => {
    for (const d of designs) {
      expect(existsSync(ex(`previews/${d.slug}.html`)), d.slug).toBe(true);
      for (const shot of ['desktop', 'mobile']) {
        expect(existsSync(ex(`screenshots/${d.slug}-${shot}.png`)), `${d.slug}-${shot}`).toBe(true);
      }
    }
    for (const f of ['compare.html', 'screenshots/compare.png', 'README.md', 'ROLL.md']) {
      expect(existsSync(ex(f)), f).toBe(true);
    }
  });

  it.each(designs.map((d) => [d.slug, d] as const))(
    'preview %s scores ≥ 90 with no critical or major findings',
    (_slug, d) => {
      const html = readFileSync(ex(`previews/${d.slug}.html`), 'utf8');
      expect(html).toContain(`hash-design #${d.number} · ${d.branch.id} · ref ${d.ref}`);
      const result = critiquePage({
        html,
        design: reproduce(parseRef(d.ref), saved.constraints),
        facts,
      });
      const serious = result.findings.filter((f) => f.severity !== 'minor');
      expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
      expect(result.score).toBeGreaterThanOrEqual(90);
      expect(result.adherence).toBeGreaterThanOrEqual(90);
    },
  );
});

describe('the examples together', () => {
  it('never reuse a branch, so every example shows new directions', () => {
    const seen = new Map<string, string>();
    for (const name of EXAMPLES) {
      for (const d of load(name).designs) {
        expect(seen.get(d.branch.id), `${d.branch.id} in ${name}`).toBeUndefined();
        seen.set(d.branch.id, name);
      }
    }
  });

  it('are all linked from the Pages index and every README', () => {
    const index = readFileSync(new URL('index.html', examplesDir), 'utf8');
    const readmes = ['README.md', 'README.zh-CN.md', 'README.ja.md', 'README.ko.md', 'README.es.md'];
    for (const name of EXAMPLES) {
      expect(index, `index.html → ${name}`).toContain(`href="${name}/compare.html"`);
      for (const file of readmes) {
        const md = readFileSync(new URL(file, root), 'utf8');
        expect(md, `${file} → ${name}`).toContain(
          `https://qybaihe.github.io/hash-design/${name}/compare.html`,
        );
        expect(md, `${file} → ${name}`).toContain(`examples/${name}/screenshots/compare.png`);
      }
    }
  });
});
