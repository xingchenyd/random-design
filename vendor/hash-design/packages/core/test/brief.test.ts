import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  briefJson,
  renderBrief,
  renderRoll,
  renderRollSummary,
  reproduce,
  roll,
  rollJson,
} from '../src/brief.js';
import { BANS } from '../src/data/bans.js';
import { detectLanguage, googleFontsUrl, tokensCss, typeScale } from '../src/derive.js';
import { writeRoll } from '../src/files.js';
import { mapDesign } from '../src/mapping.js';
import { seededHash } from '../src/hash.js';

const facts = ['营业：周二至周日 7:00–19:00，周一休息', '乡村面包 ¥38', '地址：第四巷 17 号'];

describe('roll()', () => {
  it('defaults to 5 distinct designs from system randomness', () => {
    const r = roll({ content: { subject: 'x' } });
    expect(r.designs).toHaveLength(5);
    expect(r.source).toBe('system-random');
    expect(new Set(r.designs.map((d) => d.branch.id)).size).toBe(5);
  });

  it('is reproducible with a seed', () => {
    const a = roll({ seed: 's', content: { subject: 'x', facts } });
    const b = roll({ seed: 's', content: { subject: 'x', facts } });
    expect(a.designs.map((d) => d.ref)).toEqual(b.designs.map((d) => d.ref));
    expect(renderRoll(a)).toBe(renderRoll(b));
    expect(a.source).toBe('seed:s');
  });

  it('rejects silly counts', () => {
    expect(() => roll({ count: 0 })).toThrow();
    expect(() => roll({ count: 13 })).toThrow();
  });

  it('rebuilds from provided hashes', () => {
    const a = roll({ seed: 'h', count: 3 });
    const b = roll({ hashes: a.designs.map((d) => d.hash) });
    expect(b.designs.map((d) => d.ref)).toEqual(a.designs.map((d) => d.ref));
    expect(b.source).toBe('provided-hashes');
  });

  it('reproduce() returns the same design as the roll', () => {
    const r = roll({ seed: 'repro', count: 8, constraints: { lightOnly: true } });
    for (const d of r.designs) {
      expect(reproduce(d, r.constraints).palette).toEqual(d.palette);
      expect(reproduce(d, r.constraints).branch.id).toBe(d.branch.id);
    }
  });
});

describe('brief rendering', () => {
  const d = mapDesign(seededHash('brief', 0));
  const md = renderBrief(d, { subject: '第四巷面包店', facts }, { number: 2 });

  it('contains identity, decisions, tokens and every ban', () => {
    expect(md).toContain(d.hash);
    expect(md).toContain(d.branch.name.zh);
    expect(md).toContain(d.type.display.family);
    expect(md).toContain(d.palette.colors.accent);
    expect(md).toContain(d.layout.name);
    expect(md).toContain(d.voice.name.zh);
    expect(md).toContain(d.twist.name.zh);
    expect(md).toContain(':root {');
    for (const ban of BANS) expect(md).toContain(ban.id);
    for (const f of facts) expect(md).toContain(f);
    expect(md).toMatch(/^# #2 /);
  });

  it('includes the mapping trace unless disabled', () => {
    expect(md).toContain('Mapping trace');
    expect(renderBrief(d, {}, { trace: false })).not.toContain('Mapping trace');
  });

  it('warns about missing facts instead of inventing them', () => {
    expect(renderBrief(d, { subject: 'x' })).toMatch(/no facts supplied/);
  });

  it('detects Chinese and adds CJK fonts', () => {
    expect(detectLanguage('第四巷')).toBe('zh');
    expect(detectLanguage('Fourth Lane')).toBe('en');
    expect(tokensCss(d, 'zh')).toContain(d.type.cjk.body);
    expect(tokensCss(d, 'en')).not.toContain(`"${d.type.cjk.body}"`);
  });

  it('builds a valid Google Fonts URL', () => {
    const url = googleFontsUrl(d.type, 'zh');
    if (d.type.display.source === 'google') {
      expect(url).toMatch(/^https:\/\/fonts\.googleapis\.com\/css2\?family=/);
      expect(url).toContain(d.type.display.family.replace(/ /g, '+'));
      expect(url).toContain('display=swap');
    }
  });

  it('type scale grows by the ratio', () => {
    const s = typeScale(d);
    const zero = s.find((x) => x.step === 0)!;
    const one = s.find((x) => x.step === 1)!;
    expect(zero.px).toBe(d.density.baseSize);
    expect(one.px / zero.px).toBeCloseTo(d.scale.ratio, 1);
  });

  it('json brief has a stable shape', () => {
    const j = briefJson(d, { subject: 'x', facts });
    expect(j.ref).toBe(d.ref);
    expect(j.bans).toEqual(BANS.map((b) => b.id));
    expect(j.tokensCss).toContain('--paper');
    expect(j.contrast.lines.length).toBeGreaterThan(3);
  });
});

describe('writeRoll()', () => {
  it('freezes roll.json, ROLL.md and one brief per design', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'hd-'));
    const r = roll({ seed: 'disk', content: { subject: '第四巷面包店', facts } });
    const out = await writeRoll(r, dir);
    expect(out.files).toContain('roll.json');
    expect(out.files).toContain('ROLL.md');
    const briefs = await readdir(join(dir, 'briefs'));
    expect(briefs).toHaveLength(5);
    expect(briefs[0]).toMatch(/^01-[a-z0-9-]+\.md$/);
    const json = JSON.parse(await readFile(join(dir, 'roll.json'), 'utf8'));
    expect(json).toEqual(JSON.parse(JSON.stringify(rollJson(r))));
    expect(await readFile(join(dir, 'ROLL.md'), 'utf8')).toContain(renderRollSummary(r).split('\n')[0]);
  });
});
