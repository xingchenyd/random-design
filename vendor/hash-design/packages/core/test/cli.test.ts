import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { COMMAND_HELP, COMMAND_OPTIONS, main, parseFactsText } from '../src/cli.js';
import { BRANCHES } from '../src/data/branches/index.js';

let out = '';
beforeEach(() => {
  out = '';
  vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
    out += String(chunk);
    return true;
  });
  process.exitCode = undefined;
});
afterEach(() => {
  vi.restoreAllMocks();
  process.exitCode = undefined;
});

describe('cli', () => {
  it('prints help and version', async () => {
    await main(['--help']);
    expect(out).toContain('hash-design roll');
    out = '';
    await main(['--version']);
    expect(out.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('roll --seed is reproducible', async () => {
    await main(['roll', '--subject', '面包店', '--seed', 'cli', '--format', 'summary']);
    const first = out;
    out = '';
    await main(['roll', '--subject', '面包店', '--seed', 'cli', '--format', 'summary']);
    expect(out).toBe(first);
    expect(out).toContain('seed:cli');
  });

  it('roll --format json is parseable and honours constraints', async () => {
    await main(['roll', '--seed', 'j', '--count', '3', '--light-only', '--format', 'json']);
    const j = JSON.parse(out);
    expect(j.designs).toHaveLength(3);
    expect(j.constraints.lightOnly).toBe(true);
  });

  it('roll --out writes files and compare builds the light table', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'hd-cli-'));
    const facts = join(dir, 'facts.md');
    await writeFile(facts, '# facts\n- 周一休息\n- 乡村面包 ¥38\n\n2. 地址：第四巷 17 号\n');
    await main(['roll', '--subject', '第四巷面包店', '--facts-file', facts, '--seed', 'o', '--out', dir]);
    const roll = JSON.parse(await readFile(join(dir, 'roll.json'), 'utf8'));
    expect(roll.content.facts).toEqual(['周一休息', '乡村面包 ¥38', '地址：第四巷 17 号']);
    out = '';
    await main(['compare', '--roll', join(dir, 'roll.json')]);
    expect(out).toContain('missing previews');
    const html = await readFile(join(dir, 'compare.html'), 'utf8');
    expect(html).toContain('previews/01-');
  });

  it('brief reproduces a ref', async () => {
    await main(['roll', '--seed', 'b', '--count', '1', '--format', 'json']);
    const ref = JSON.parse(out).designs[0].ref as string;
    out = '';
    await main(['brief', ref]);
    expect(out).toContain(ref.split('+')[0]);
  });

  it('branches and branch', async () => {
    await main(['branches']);
    expect(out).toContain(BRANCHES[0]!.id);
    out = '';
    await main(['branch', BRANCHES[1]!.id]);
    expect(out).toContain(BRANCHES[1]!.name.en);
    await expect(main(['branch', 'nope'])).rejects.toThrow(/Unknown branch/);
  });

  it('critique sets a failing exit code under --fail-under', async () => {
    const slop = new URL('./fixtures/slop.html', import.meta.url).pathname;
    await main(['critique', slop, '--fail-under', '80']);
    expect(out).toContain('generic-sans');
    expect(process.exitCode).toBe(1);
  });

  it('skill install copies SKILL.md for claude and cursor', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'hd-skill-'));
    await main(['skill', 'install', '--dir', dir]);
    const a = await readFile(join(dir, '.claude/skills/hash-design/SKILL.md'), 'utf8');
    const b = await readFile(join(dir, '.cursor/skills/hash-design/SKILL.md'), 'utf8');
    expect(a).toBe(b);
    expect(a).toMatch(/^---\nname: hash-design\n/);
  });

  it('rejects unknown commands', async () => {
    await expect(main(['frobnicate'])).rejects.toThrow(/Unknown command/);
  });

  const commands = ['roll', 'brief', 'branches', 'branch', 'critique', 'compare', 'skill'];

  it.each(commands)('%s --help and -h print the command help without running it', async (cmd) => {
    await main([cmd, '--help']);
    expect(out).toMatch(new RegExp(`^hash-design ${cmd} — `));
    expect(out).toContain('Usage');
    expect(out).not.toContain('# hash-design roll —'); // roll --help must not roll
    const help = out;
    out = '';
    await main([cmd, '-h']);
    expect(out).toBe(help);
    out = '';
    await main(['help', cmd]);
    expect(out).toBe(help);
  });

  it('honours --help anywhere before "--", including after other arguments', async () => {
    await main(['roll', '--seed', 'x', '--help']);
    expect(out).toBe(`${COMMAND_HELP.get('roll')}`);
    out = '';
    await main(['skill', 'install', '--help']);
    expect(out).toBe(`${COMMAND_HELP.get('skill')}`);
    await expect(main(['brief', '--', '--help'])).rejects.toThrow(/Invalid design ref "--help"/);
  });

  it('documents every option each command accepts', () => {
    expect([...COMMAND_OPTIONS.keys()].sort()).toEqual([...commands].sort());
    for (const [cmd, options] of COMMAND_OPTIONS) {
      const help = COMMAND_HELP.get(cmd) ?? '';
      for (const [name, spec] of Object.entries(options)) {
        const flag = spec.short ? `-${spec.short}, --${name}` : `--${name}`;
        expect(help, `${cmd} help should document ${flag}`).toMatch(
          new RegExp(`^ {2}${flag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'm'),
        );
      }
    }
  });

  it('points at the command help on argument errors', async () => {
    await expect(main(['roll', '--bogus'])).rejects.toThrow(
      /Unknown option '--bogus'\nRun "hash-design roll --help"/,
    );
    await expect(main(['help', 'nope'])).rejects.toThrow(/Unknown command "nope"/);
    out = '';
    await main(['help']);
    expect(out).toContain('hash-design <command> --help');
  });

  it('parses facts files leniently', () => {
    expect(parseFactsText('# t\n- a\n* b\n1. c\n\n d \n')).toEqual(['a', 'b', 'c', 'd']);
  });
});
