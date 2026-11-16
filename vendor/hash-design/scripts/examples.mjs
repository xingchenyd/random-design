#!/usr/bin/env node
// The example runs under examples/, each reproducible from a fixed seed.
//
//   node scripts/examples.mjs roll     [name]   re-roll: rewrite roll.json, ROLL.md and briefs/ (after data changes)
//   node scripts/examples.mjs compare  [name]   rebuild compare.html from roll.json and previews/
//   node scripts/examples.mjs critique [name]   critique every preview against its brief; exit 1 below 90
//   node scripts/examples.mjs list              print the examples
//
// Run `npm run build` first. Without a name the command runs for every example.
// Seeds: each example takes the first of `<dir>`, `<dir>-2`, `<dir>-3`, … whose five branches overlap no earlier
// example, so the examples together show 20 different branches (packages/core/test/examples.test.ts checks this).
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const EXAMPLES = [
  { dir: 'fourth-lane-bakery', subject: '第四巷面包店', seed: 'fourth-lane-bakery' },
  { dir: 'sluice', subject: 'Sluice — self-hosted webhook inbox', seed: 'sluice' },
  { dir: 'bridge-two-bikes', subject: '二号桥单车铺', seed: 'bridge-two-bikes-5' },
  {
    dir: 'causeway-festival',
    subject: 'Causeway — a music festival on Skerrow Island',
    seed: 'causeway-festival-6',
  },
];

export const MIN_SCORE = 90;

const bin = fileURLToPath(new URL('../packages/core/dist/bin.js', import.meta.url));
const cli = (args, opts = {}) =>
  execFileSync(process.execPath, [bin, ...args], { encoding: 'utf8', ...opts });

function select(name) {
  if (!name) return EXAMPLES;
  const found = EXAMPLES.filter((e) => e.dir === name);
  if (!found.length)
    throw new Error(`Unknown example "${name}". Known: ${EXAMPLES.map((e) => e.dir).join(', ')}`);
  return found;
}

const commands = {
  roll(examples) {
    for (const e of examples) {
      const dir = `examples/${e.dir}`;
      const args = ['roll', '--subject', e.subject, '--facts-file', `${dir}/facts.md`, '--seed', e.seed];
      process.stdout.write(cli([...args, '--out', dir, '--format', 'summary']));
    }
  },
  compare(examples) {
    for (const e of examples) process.stdout.write(cli(['compare', '--roll', `examples/${e.dir}/roll.json`]));
  },
  critique(examples) {
    let failed = 0;
    for (const e of examples) {
      const dir = `examples/${e.dir}`;
      const roll = JSON.parse(readFileSync(`${dir}/roll.json`, 'utf8'));
      console.log(`\n${e.dir}`);
      for (const d of roll.designs) {
        const page = `${dir}/previews/${d.slug}.html`;
        const pick = String(d.number);
        const r = JSON.parse(cli(['critique', page, '--roll', `${dir}/roll.json`, '--pick', pick, '--json']));
        const ok = r.score >= MIN_SCORE && r.counts.critical === 0 && r.counts.major === 0;
        if (!ok) failed++;
        const minors = r.findings.map((f) => f.rule).join(', ') || '—';
        console.log(
          `  ${ok ? 'ok  ' : 'FAIL'} #${d.number} ${d.slug.padEnd(26)} score ${r.score}  adherence ${r.adherence}  ${minors}`,
        );
      }
    }
    if (failed) {
      console.error(`\n${failed} preview(s) below ${MIN_SCORE} or with critical/major findings`);
      process.exitCode = 1;
    }
  },
  list(examples) {
    for (const e of examples) console.log(`${e.dir.padEnd(20)} seed ${e.seed.padEnd(22)} ${e.subject}`);
  },
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [cmd, name] = process.argv.slice(2);
  const run = commands[cmd];
  if (!run) {
    console.error(`Usage: node scripts/examples.mjs <${Object.keys(commands).join('|')}> [name]`);
    process.exit(2);
  }
  try {
    run(select(name));
  } catch (err) {
    console.error(`examples: ${err.message}`);
    process.exit(1);
  }
}
