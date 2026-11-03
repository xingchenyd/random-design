#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { generate, reproduce, validateDesign, historyEntries } from './core/index.js';
import { historyPath, readHistory, writeHistory, withHistory, mergeHistory, selectDesign } from './history.js';
import { writeBundle } from './export.js';
import { pageHtml, brief } from './render.js';
import { writePresentation } from './pptx.js';

const help = `random-design v0.2.0 — art-directed visual systems

  node src/cli.js generate --out output/run-01 [--scenario academic] [--language zh]
    --count 5 --mode mixed --colorfulness rich --intensity balanced --brand '#336699'
    --direction edition  # optional visual grammar, otherwise varied automatically
    --seed example --history /absolute/history.json --no-history --no-pptx
    --lock design.json --lock-fields palette,font,graphic --content content.json
    --min-distance 0.22 --recent-window 40
  node src/cli.js reproduce --file roll.json --out output/reproduced
  node src/cli.js render --file design.json --out page.html [--language en]
  node src/cli.js pptx --file design.json --out theme.pptx [--content content.json]
  node src/cli.js brief --file design.json [--language en]
  node src/cli.js validate --file design.json
  node src/cli.js select --id FULL_ID [--history history.json]
  node src/cli.js history-export --out history.json
  node src/cli.js history-import --file history.json
  node src/cli.js skill-install --target codex --dir /project
    targets: codex, claude, cursor; WorkBuddy: import the skill ZIP via its UI.

History is local to this machine by default. --no-history neither reads nor writes it.
Seed + request + identical history reproduces selection; saved JSON reproduces the chosen visual rules.
Never overwrite a prior output directory. Font files are not embedded.
`;
const flags = ['out', 'file', 'count', 'scenario', 'language', 'mode', 'colorfulness', 'direction', 'intensity', 'brand', 'seed', 'history', 'content', 'lock', 'lock-fields', 'min-distance', 'recent-window', 'id', 'target', 'dir'];
export async function main(args = process.argv.slice(2)) {
  const command = args[0];
  if (!command || ['help', '--help', '-h'].includes(command)) { console.log(help); return; }
  const { values: v } = parseArgs({ args: args.slice(1), options: { ...Object.fromEntries(flags.map(k => [k, { type: 'string' }])), 'no-history': { type: 'boolean' }, 'no-pptx': { type: 'boolean' } }, strict: true });
  const read = async file => JSON.parse(await fs.readFile(file, 'utf8'));
  const hfile = v.history ?? historyPath();
  const language = v.language ?? 'zh';
  if (!['zh', 'en'].includes(language)) throw new Error('language must be zh or en');
  const content = v.content ? await read(v.content) : {};
  if (command === 'generate') {
    const request = {};
    for (const k of ['scenario', 'language', 'mode', 'colorfulness', 'direction', 'intensity', 'brand', 'seed']) if (v[k] !== undefined) request[k] = v[k];
    for (const [flag, name] of [['count', 'count'], ['min-distance', 'minDistance'], ['recent-window', 'recentWindow']]) if (v[flag] !== undefined) request[name] = Number(v[flag]);
    if (v.lock) {
      const d = reproduce(await read(v.lock))[0]; request.locks = {};
      for (const field of (v['lock-fields'] ?? 'palette').split(',')) {
        if (!['palette', 'font', 'graphic', 'composition'].includes(field)) throw new Error(`Unknown lock field: ${field}`);
        request.locks[field] = field === 'font' ? d.typography.id : field === 'graphic' ? d.graphic.family : field === 'composition' ? d.layout.composition : d.palette;
      }
    }
    const out = v.out ?? path.join('output', `run-${Date.now()}`);
    const run = async history => {
      const bundle = generate(request, history);
      await writeBundle(bundle, out, { content, pptx: !v['no-pptx'] });
      if (!v['no-history']) await writeHistory(hfile, [...history, ...historyEntries(bundle)]);
      console.log(JSON.stringify({ out: path.resolve(out), designs: bundle.designs.map(d => ({ id: d.id, name: d.name[language], novelty: d.novelty })), diagnostics: bundle.diagnostics }, null, 2));
    };
    if (v['no-history']) await run([]); else await withHistory(hfile, run);
    return;
  }
  if (command === 'history-export') { if (!v.out) throw new Error('--out required'); await writeHistory(v.out, await readHistory(hfile)); return; }
  if (command === 'history-import') { if (!v.file) throw new Error('--file required'); await withHistory(hfile, async history => { await writeHistory(hfile, mergeHistory(history, await readHistory(v.file))); }); return; }
  if (command === 'select') { console.log(JSON.stringify(await selectDesign(v.id, hfile))); return; }
  if (command === 'skill-install') {
    const roots = { codex: '.codex', claude: '.claude', cursor: '.cursor' };
    if (!roots[v.target]) throw new Error('target must be codex, claude or cursor');
    const dest = path.resolve(v.dir ?? '.', roots[v.target], 'skills/random-design');
    await fs.cp(fileURLToPath(new URL('../skills/random-design', import.meta.url)), dest, { recursive: true, errorOnExist: true, force: false });
    console.log(dest); return;
  }
  if (!v.file) throw new Error('--file required');
  const data = await read(v.file);
  if (command === 'validate') { const result = (data.designs ?? [data]).map(validateDesign); console.log(JSON.stringify(result, null, 2)); if (result.some(r => !r.valid)) process.exitCode = 1; return; }
  const d = reproduce(data)[0];
  if (command === 'brief') { console.log(brief(d, { language })); return; }
  if (!v.out) throw new Error('--out required');
  if (command === 'reproduce') {
    const bundle = data.designs ? data : { schema: 1, algorithm: d.algorithm, library: d.library, request: { language }, designs: [d] };
    reproduce(bundle); await writeBundle(bundle, v.out, { content, pptx: !v['no-pptx'] }); return;
  }
  await fs.access(v.out).then(() => { throw new Error('Output exists; choose another file'); }, err => { if (err.code !== 'ENOENT') throw err; });
  await fs.mkdir(path.dirname(path.resolve(v.out)), { recursive: true });
  if (command === 'render') await fs.writeFile(v.out, pageHtml(d, { language, content }));
  else if (command === 'pptx') await writePresentation(d, v.out, { language, content });
  else throw new Error(`Unknown command: ${command}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(err => { console.error(err.message); process.exitCode = 1; });
