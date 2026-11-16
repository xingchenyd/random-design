import { readFileSync } from 'node:fs';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { BANS, BRANCHES, readSkill } from 'hash-design';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer } from '../src/server.js';

type TextContent = { type: 'text'; text: string };

let client: Client;

beforeAll(async () => {
  const server = createServer();
  const [a, b] = InMemoryTransport.createLinkedPair();
  client = new Client({ name: 'test', version: '0.0.0' });
  await Promise.all([server.connect(a), client.connect(b)]);
});

afterAll(async () => {
  await client.close();
});

async function call(name: string, args: Record<string, unknown>) {
  const res = await client.callTool({ name, arguments: args });
  const content = res.content as TextContent[];
  return { res, text: content.map((c) => c.text).join('\n') };
}

const EXPECTED_TOOLS = [
  'roll_designs',
  'get_brief',
  'list_branches',
  'get_branch',
  'critique_page',
  'build_compare_page',
];

describe('hash-design MCP server', () => {
  it('exposes the documented tools, and the Skill documents exactly those tools', async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual([...EXPECTED_TOOLS].sort());
    const skill = readSkill();
    for (const n of names) expect(skill, `SKILL.md should mention ${n}`).toContain(`\`${n}\``);
    for (const t of tools) expect((t.description ?? '').length).toBeGreaterThan(40);
  });

  it('roll_designs returns 5 distinct briefs with refs and a trace', async () => {
    const { text, res } = await call('roll_designs', {
      subject: '第四巷面包店',
      facts: ['周一休息'],
      seed: 'mcp',
    });
    expect(res.isError).toBeFalsy();
    expect(text).toContain('Mapping trace');
    expect(text).toContain('周一休息');
    const machine = JSON.parse((res.content as TextContent[])[1]!.text);
    expect(machine.designs).toHaveLength(5);
    expect(new Set(machine.designs.map((d: { branch: string }) => d.branch)).size).toBe(5);
    expect(machine.source).toBe('seed:mcp');
  });

  it('roll_designs without a seed uses system randomness', async () => {
    const a = JSON.parse(
      (
        (await client.callTool({ name: 'roll_designs', arguments: { subject: 'x', detail: 'summary' } }))
          .content as TextContent[]
      )[1]!.text,
    );
    const b = JSON.parse(
      (
        (await client.callTool({ name: 'roll_designs', arguments: { subject: 'x', detail: 'summary' } }))
          .content as TextContent[]
      )[1]!.text,
    );
    expect(a.source).toBe('system-random');
    expect(a.designs[0].ref).not.toBe(b.designs[0].ref);
  });

  it('get_brief reproduces a design from roll_designs', async () => {
    const r = await client.callTool({
      name: 'roll_designs',
      arguments: { subject: 'x', seed: 'rep', light_only: true },
    });
    const machine = JSON.parse((r.content as TextContent[])[1]!.text);
    const first = machine.designs[0];
    const { text } = await call('get_brief', { ref: first.ref, light_only: true, format: 'json' });
    const brief = JSON.parse(text);
    expect(brief.branch.id).toBe(first.branch);
    expect(brief.constraints.lightOnly).toBe(true);
  });

  it('get_brief reports bad refs as tool errors', async () => {
    const { res, text } = await call('get_brief', { ref: 'not-a-hash' });
    expect(res.isError).toBe(true);
    expect(text).toMatch(/Invalid design ref/);
  });

  it('roll_designs with out_dir freezes files and build_compare_page writes the light table', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'hd-mcp-'));
    const { text } = await call('roll_designs', { subject: '面包', seed: 'disk', out_dir: dir });
    expect(text).toContain('briefs/01-');
    const roll = JSON.parse(await readFile(join(dir, 'roll.json'), 'utf8'));
    expect(roll.designs).toHaveLength(5);
    const cmp = await call('build_compare_page', { roll_path: join(dir, 'roll.json') });
    expect(cmp.text).toContain('Missing previews');
    expect(await readFile(join(dir, 'compare.html'), 'utf8')).toContain('<iframe');
  });

  it('list_branches / get_branch', async () => {
    const list = await call('list_branches', {});
    expect(list.text).toContain(`${BRANCHES.length} branches`);
    const one = await call('get_branch', { id: BRANCHES[0]!.id, format: 'json' });
    expect(JSON.parse(one.text).id).toBe(BRANCHES[0]!.id);
    const bad = await call('get_branch', { id: 'nope' });
    expect(bad.res.isError).toBe(true);
  });

  it('critique_page flags an AI-template page', async () => {
    const html = `<html><style>body{font-family:Inter}.h{text-align:center;background:linear-gradient(#8b5cf6,#3b82f6)}</style>
      <section class="h"><h1>Unlock seamless growth</h1><a class="btn">Start</a><a class="btn">Demo</a></section></html>`;
    const { text } = await call('critique_page', { html, format: 'json' });
    const r = JSON.parse(text);
    const rules = r.findings.map((f: { rule: string }) => f.rule);
    expect(rules).toEqual(
      expect.arrayContaining([
        'generic-sans',
        'purple-blue-gradient',
        'centered-hero-two-buttons',
        'buzzword-copy',
      ]),
    );
    expect(r.score).toBeLessThan(50);
  });

  it('serves resources and the workflow prompt', async () => {
    const { resources } = await client.listResources();
    const uris = resources.map((r) => r.uri);
    expect(uris).toEqual(
      expect.arrayContaining(['hash-design://bans', 'hash-design://workflow', 'hash-design://branches']),
    );
    const bans = await client.readResource({ uri: 'hash-design://bans' });
    const bansText = (bans.contents[0] as { text: string }).text;
    for (const b of BANS) expect(bansText).toContain(b.id);
    const branch = await client.readResource({ uri: `hash-design://branch/${BRANCHES[0]!.id}` });
    expect((branch.contents[0] as { text: string }).text).toContain(BRANCHES[0]!.name.en);
    const { prompts } = await client.listPrompts();
    expect(prompts.map((p) => p.name)).toContain('hash-design');
    const p = await client.getPrompt({ name: 'hash-design', arguments: { subject: '面包店' } });
    expect(JSON.stringify(p.messages)).toContain('roll_designs');
  });

  it('reproduces the CLI-generated example roll exactly (MCP ≡ CLI)', async () => {
    const ex = (p: string) => new URL(`../../../examples/fourth-lane-bakery/${p}`, import.meta.url);
    const saved = JSON.parse(readFileSync(ex('roll.json'), 'utf8'));
    const res = await client.callTool({
      name: 'roll_designs',
      arguments: {
        subject: saved.content.subject,
        facts: saved.content.facts,
        seed: 'fourth-lane-bakery',
        detail: 'summary',
      },
    });
    const machine = JSON.parse((res.content as TextContent[])[1]!.text);
    expect(machine.designs.map((d: { ref: string }) => d.ref)).toEqual(
      saved.designs.map((d: { ref: string }) => d.ref),
    );
  });
});
