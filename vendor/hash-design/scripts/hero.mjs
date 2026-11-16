#!/usr/bin/env node
// Renders the README hero and the GitHub social preview from one example's real roll and screenshots:
// one prompt at the top fans out into the five rolled directions, each labelled with its ref, branch and palette.
//
//   node scripts/hero.mjs [example]   default: causeway-festival
//
// Writes docs/assets/hero.png (1280×800 at 1.5×) and docs/assets/social-preview.png (exactly 1280×640).
// Needs `npx playwright install chromium`, the example's screenshots (npm run screenshots) and network access for
// Google Fonts (IBM Plex, as on the Pages index).
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { EXAMPLES } from './examples.mjs';

const name = process.argv[2] ?? 'causeway-festival';
if (!EXAMPLES.some((e) => e.dir === name)) {
  throw new Error(`Unknown example "${name}". Known: ${EXAMPLES.map((e) => e.dir).join(', ')}`);
}
const dir = resolve('examples', name);
const roll = JSON.parse(await readFile(join(dir, 'roll.json'), 'utf8'));
const outDir = resolve('docs/assets');

const FORMATS = [
  { file: 'hero.png', width: 1280, height: 800, scale: 1.5 },
  { file: 'social-preview.png', width: 1280, height: 640, scale: 1 },
];

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// The prompt names the subject; the card underneath quotes the first lines of the fact sheet verbatim.
const facts = roll.content.facts;
const nameFact = facts.find((f) => /^name:/i.test(f));
const title = nameFact ? nameFact.replace(/^name:\s*/i, '') : roll.content.subject;
const shown = facts.filter((f) => f !== nameFact).slice(0, 2);

function shot(slug) {
  for (const kind of ['full', 'desktop']) {
    const file = join(dir, 'screenshots', `${slug}-${kind}.png`);
    if (existsSync(file)) return pathToFileURL(file).href;
  }
  throw new Error(`No screenshot for ${slug}; run npm run screenshots -- ${name}`);
}

const cards = roll.designs
  .map((d) => {
    const ref = d.short + (d.probe ? `+${d.probe}` : '');
    const c = d.palette.colors;
    const chips = [c.paper, c.ink, c.accent, c.accent2]
      .map((hex) => `<i style="background:${esc(hex)}" title="${esc(hex)}"></i>`)
      .join('');
    return `
      <figure class="card">
        <span class="ref" data-ref>${esc(ref)}</span>
        <div class="page"><img src="${shot(d.slug)}" alt=""></div>
        <figcaption>
          <div class="name"><span class="n">${String(d.number).padStart(2, '0')}</span>${esc(d.branch.name.en)}</div>
          <div class="slug"><span class="chips">${chips}</span>${esc(d.branch.id)}</div>
        </figcaption>
      </figure>`;
  })
  .join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500&display=block">
<style>
  :root {
    --paper: #f6f4ef; --ink: #151412; --muted: #66625a; --faint: #a39e93; --hair: #dcd8cf;
    --mark: #e2401c; --w: 1280px; --h: 800px;
    --mono: "IBM Plex Mono", ui-monospace, monospace;
    --cond: "IBM Plex Sans Condensed", "Arial Narrow", sans-serif;
    --sans: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  }
  .social { --h: 640px; }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    width: var(--w); height: var(--h); overflow: hidden; position: relative; color: var(--ink);
    background:
      radial-gradient(circle at 1px 1px, rgba(21, 20, 18, 0.11) 1px, transparent 1.4px) 0 0 / 24px 24px,
      var(--paper);
    font: 15px/1.45 var(--sans);
    display: grid; grid-template-rows: auto 1fr auto; padding: 36px 44px 26px;
  }
  .top { display: grid; grid-template-columns: 1fr 404px 1fr; gap: 34px; align-items: start; }
  .brand { font: 600 15px/1 var(--mono); letter-spacing: 0.01em; display: flex; align-items: center; gap: 9px; }
  .brand::before { content: ""; width: 12px; height: 12px; background: var(--mark); }
  h1 { font: 600 41px/1 var(--cond); letter-spacing: -0.012em; margin: 16px 0 12px; }
  .sub { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.4; max-width: 33ch; }
  .sub b { color: var(--ink); font-weight: 500; }

  .prompt { background: #fff; border: 1.5px solid var(--ink); box-shadow: 5px 5px 0 var(--hair); position: relative; z-index: 2; }
  .prompt header {
    display: flex; justify-content: space-between; padding: 8px 14px 7px; border-bottom: 1px solid var(--hair);
    font: 500 11px/1 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted);
  }
  .prompt header b { color: var(--mark); font-weight: 600; }
  .prompt header .file { text-transform: none; letter-spacing: 0; font-size: 11.5px; }
  .prompt .ask { margin: 0; padding: 11px 14px 10px; font-size: 15.5px; line-height: 1.38; }
  .prompt .ask b { font-weight: 500; }
  .prompt ul { list-style: none; margin: 0; padding: 8px 14px 10px; border-top: 1px dashed var(--hair); font: 11.5px/1.6 var(--mono); color: var(--muted); }
  .prompt li { padding-left: 2ch; text-indent: -2ch; }
  .prompt li.more { color: var(--faint); }

  .steps { margin: 2px 0 0; padding: 0; list-style: none; font: 12px/1.5 var(--mono); color: var(--muted); justify-self: end; }
  .steps .kicker { display: block; font: 500 11px/1 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink); margin-bottom: 11px; border: 0; padding: 0; }
  .steps li { display: grid; grid-template-columns: 22px 54px auto; padding: 5px 0; border-top: 1px solid var(--hair); }
  .steps li:last-child { border-bottom: 1px solid var(--hair); }
  .steps .i { color: var(--mark); }
  .steps .v { color: var(--ink); font-weight: 600; }

  .fan { display: flex; flex-direction: column; min-height: 0; }
  .apex { align-self: center; margin-top: 26px; font: 500 12.5px/1 var(--mono); color: #fff; background: var(--ink); padding: 7px 12px 7px; position: relative; z-index: 2; }
  .apex b { color: #ffb39f; font-weight: 600; }
  .row { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 96px; }
  .card { margin: 0; display: flex; flex-direction: column; min-height: 0; position: relative; }
  .ref {
    position: absolute; top: 0; left: 50%; transform: translate(-50%, -55%); z-index: 2;
    font: 500 12px/1 var(--mono); background: #fff; border: 1.5px solid var(--ink); padding: 5px 8px 4px;
  }
  .page { flex: 1; min-height: 0; border: 1.5px solid var(--ink); background: #fff; overflow: hidden; }
  .page img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  figcaption { padding-top: 9px; }
  .name { font: 600 17px/1.1 var(--cond); display: flex; gap: 7px; align-items: baseline; }
  .name .n { font: 600 12px/1 var(--mono); color: var(--mark); }
  .slug { margin-top: 5px; font: 11px/1 var(--mono); color: var(--muted); display: flex; align-items: center; gap: 8px; }
  .chips { display: inline-flex; }
  .chips i { width: 11px; height: 11px; border: 1px solid rgba(21, 20, 18, 0.35); margin-right: -1px; }

  footer { display: flex; justify-content: space-between; gap: 24px; padding-top: 14px; font: 11px/1.3 var(--mono); color: var(--muted); }
  footer b { color: var(--ink); font-weight: 500; }
  svg.wires { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
  svg.wires path { fill: none; stroke: var(--ink); stroke-width: 1.25; }
  svg.wires circle { fill: var(--ink); }

  .social h1 { font-size: 40px; margin-top: 14px; }
  .social .prompt .ask { padding-bottom: 8px; }
  .social .prompt ul { padding-top: 6px; padding-bottom: 8px; }
  .social .prompt li.more { display: none; }
  .social .apex { margin-top: 18px; }
  .social .row { margin-top: 74px; }
</style>
</head>
<body>
  <section class="top">
    <div>
      <div class="brand">hash-design</div>
      <h1>One prompt,<br>five design directions.</h1>
      <p class="sub">Picked by <b>true-random SHA-256 hashes</b>, not by the model. Every direction is <b>reproducible from its ref</b>.</p>
    </div>
    <article class="prompt" id="prompt">
      <header><span><b>›</b> Prompt</span><span class="file">facts.md</span></header>
      <p class="ask">Use hash-design to build a one-page site for <b>${esc(title)}</b>.</p>
      <ul>${shown.map((f) => `<li>- ${esc(f)}</li>`).join('')}<li class="more">+ ${facts.length - 1 - shown.length} more facts</li></ul>
    </article>
    <ol class="steps">
      <li class="kicker">Agent Skill · MCP server · CLI</li>
      <li><span class="i">1</span><span class="v">roll</span><span>five SHA-256 hashes</span></li>
      <li><span class="i">2</span><span class="v">map</span><span>each hash → a frozen brief</span></li>
      <li><span class="i">3</span><span class="v">render</span><span>one sub-agent per brief</span></li>
      <li><span class="i">4</span><span class="v">pick</span><span>you reply with a number</span></li>
    </ol>
  </section>
  <section class="fan">
    <div class="apex" id="apex">roll → <b>5</b> × SHA-256</div>
    <div class="row">${cards}</div>
  </section>
  <footer>
    <span>Real output, not a mock-up: <b>examples/${esc(name)}</b> · seed <b>${esc(roll.source.replace(/^seed:/, ''))}</b>, fixed only so the example reproduces</span>
    <span><b>qybaihe.github.io/hash-design</b></span>
  </footer>
  <svg class="wires" id="wires"></svg>
  <script>
    function drawWires() {
      const svg = document.getElementById('wires');
      const box = (el) => el.getBoundingClientRect();
      const p = box(document.getElementById('prompt'));
      const a = box(document.getElementById('apex'));
      const cx = a.left + a.width / 2;
      let d = 'M' + cx + ' ' + p.bottom + 'V' + a.top;
      let dots = '';
      const y0 = a.bottom;
      const tabs = [...document.querySelectorAll('[data-ref]')];
      // One trunk out of the roll pill, splitting into one wire per hash.
      const ys = y0 + 14;
      d += 'M' + cx + ' ' + y0 + 'V' + ys;
      for (const el of tabs) {
        const r = box(el);
        const x1 = r.left + r.width / 2, y1 = r.top;
        const h = y1 - ys;
        d += 'M' + cx + ' ' + ys + 'C' + cx + ' ' + (ys + h * 0.55) + ' ' + x1 + ' ' + (y1 - h * 0.55) + ' ' + x1 + ' ' + y1;
        dots += '<circle cx="' + x1 + '" cy="' + y1 + '" r="2.5"/>';
      }
      dots += '<circle cx="' + cx + '" cy="' + ys + '" r="3"/>';
      svg.innerHTML = '<path d="' + d + '"/>' + dots;
    }
  </script>
</body>
</html>`;

const tmp = await mkdtemp(join(tmpdir(), 'hash-design-hero-'));
const page = join(tmp, 'hero.html');
await writeFile(page, html);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  for (const f of FORMATS) {
    const tab = await browser.newPage({
      viewport: { width: f.width, height: f.height },
      deviceScaleFactor: f.scale,
    });
    await tab.goto(pathToFileURL(page).href, { waitUntil: 'networkidle' });
    await tab.evaluate(() => document.fonts.ready);
    const missing = await tab.evaluate(() =>
      ['600 41px "IBM Plex Sans Condensed"', '500 12px "IBM Plex Mono"', '400 15px "IBM Plex Sans"'].filter(
        (font) => !document.fonts.check(font),
      ),
    );
    if (missing.length) throw new Error(`Fonts did not load (offline?): ${missing.join(', ')}`);
    if (f.file === 'social-preview.png') await tab.evaluate(() => document.body.classList.add('social'));
    await tab.evaluate('drawWires()');
    await tab.waitForTimeout(150);
    await tab.screenshot({ path: join(outDir, f.file) });
    await tab.close();
    console.log(`docs/assets/${f.file}  ${f.width * f.scale}×${f.height * f.scale}`);
  }
} finally {
  await browser.close();
  await rm(tmp, { recursive: true, force: true });
}
