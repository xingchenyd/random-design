import { describe, expect, it } from 'vitest';
import { roll, rollJson } from '../src/brief.js';
import { buildComparePage, compareEntriesFromRoll, compareSubtitle } from '../src/compare.js';

describe('compare page', () => {
  const r = roll({ seed: 'compare', content: { subject: '第四巷 <面包>' } });

  it('lists one framed iframe per design with labels', () => {
    const entries = compareEntriesFromRoll(r);
    const html = buildComparePage({ title: r.content.subject, entries });
    expect(entries).toHaveLength(5);
    for (const e of entries) {
      expect(html).toContain(`src="${e.preview}"`);
      expect(html).toContain(e.branchZh);
      expect(e.preview).toMatch(/^previews\/0\d-[a-z0-9-]+\.html$/);
    }
    expect(html).toContain('第四巷 &lt;面包&gt;');
    expect(html).toContain('回复编号');
  });

  it('defaults to Chinese chrome and the Chinese subtitle', () => {
    const html = buildComparePage({
      title: 't',
      subtitle: compareSubtitle(r),
      entries: compareEntriesFromRoll(r),
    });
    expect(html).toContain('<html lang="zh-CN">');
    expect(compareSubtitle(r)).toMatch(/^5 个方向 · seed:compare · hash-design\/v1 · library [0-9a-f]{12}$/);
  });

  it('uses English chrome, voice and twist names for an English roll', () => {
    const en = roll({ seed: 'compare', content: { subject: 'Sluice', facts: ['A self-hosted inbox'] } });
    expect(en.content.language).toBe('en');
    const entries = compareEntriesFromRoll(en);
    const html = buildComparePage({
      title: en.content.subject,
      subtitle: compareSubtitle(en),
      entries,
      language: en.content.language,
    });
    expect(html).toContain('<html lang="en">');
    expect(compareSubtitle(en)).toMatch(/^5 directions · seed:compare/);
    expect(html).toContain('reply with a number (1–5)');
    for (const label of [
      'Layout',
      'Type',
      'Colour',
      'Density',
      'Voice',
      'Twist',
      'Open page ↗',
      'Zoom · 1',
    ]) {
      expect(html).toContain(label);
    }
    en.designs.forEach((d, i) => {
      expect(entries[i]!.voice).toBe(d.voice.name.en);
      expect(entries[i]!.twist).toBe(d.twist.name.en);
      expect(html).toContain(`<strong>${d.branch.name.en}</strong>`);
    });
    expect(html).not.toMatch(/回复编号|版式|放大看|打开整页|个方向/);
  });

  it('accepts roll.json shaped input with the same slugs', () => {
    const fromJson = compareEntriesFromRoll(JSON.parse(JSON.stringify(rollJson(r))), { previewDir: 'p' });
    const fromRoll = compareEntriesFromRoll(r, { previewDir: 'p' });
    expect(fromJson.map((e) => e.preview)).toEqual(fromRoll.map((e) => e.preview));
  });
});
