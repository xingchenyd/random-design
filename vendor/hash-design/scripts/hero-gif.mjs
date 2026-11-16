#!/usr/bin/env node
// Renders the animated README hero from one example's real roll and screenshots:
//   1. a prompt box: "/hash-design" picked from an autocomplete, then a short request is typed
//   2. "roll → 5 × SHA-256": five hex refs tick, then lock to the roll's real refs and branches
//   3. the five real desktop screenshots pop in one after another, labelled with branch and ref
//   4. they shrink into a compare row: "Pick one · reproducible from its ref", then the loop restarts
//
//   node scripts/hero-gif.mjs [example] [--fps 20]   default: causeway-festival
//
// Frames are deterministic: the page exposes render(t) and every frame is a screenshot at t = i / fps, so the
// output does not depend on machine speed. Writes docs/assets/hero.gif (960 px wide, gifski if installed, else
// ffmpeg palettegen/paletteuse) and docs/assets/hero.mp4 (H.264, yuv420p, 1920 px wide).
// Needs `npx playwright install chromium`, ffmpeg on PATH, the example's screenshots (npm run screenshots) and network
// access for Google Fonts (IBM Plex, as in docs/assets/hero.png).
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { EXAMPLES } from './examples.mjs';

const args = process.argv.slice(2);
const fpsAt = args.indexOf('--fps');
const FPS = fpsAt >= 0 ? Number(args.splice(fpsAt, 2)[1]) : 20;
const name = args[0] ?? 'causeway-festival';
if (!EXAMPLES.some((e) => e.dir === name)) {
  throw new Error(`Unknown example "${name}". Known: ${EXAMPLES.map((e) => e.dir).join(', ')}`);
}
if (!(FPS >= 10 && FPS <= 30)) throw new Error('--fps must be between 10 and 30');

const DURATION = 6; // seconds, one loop
const W = 960;
const H = 600;
const SCALE = 2; // frames are captured at 1920×1200; the GIF is scaled down to 960 px
const GIF_WIDTH = 960;

const dir = resolve('examples', name);
const roll = JSON.parse(await readFile(join(dir, 'roll.json'), 'utf8'));
const outDir = resolve('docs/assets');
const PROMPT = `landing page for ${roll.content.subject}`;

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function shot(slug) {
  const file = join(dir, 'screenshots', `${slug}-desktop.png`);
  if (!existsSync(file)) throw new Error(`No screenshot for ${slug}; run npm run screenshots -- ${name}`);
  return pathToFileURL(file).href;
}

const designs = roll.designs.map((d) => ({
  n: String(d.number).padStart(2, '0'),
  short: d.short,
  probe: d.probe ? `+${d.probe}` : '',
  id: d.branch.id,
  label: d.branch.name.en,
  colors: [d.palette.colors.paper, d.palette.colors.ink, d.palette.colors.accent, d.palette.colors.accent2],
  img: shot(d.slug),
}));

const ref = (d) => `${esc(d.short)}<i>${esc(d.probe)}</i>`;
const chips = (d) => d.colors.map((c) => `<i style="background:${esc(c)}"></i>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500&display=block">
<style>
  :root {
    --paper: #f6f4ef; --ink: #151412; --muted: #66625a; --faint: #a39e93; --hair: #dcd8cf; --mark: #e2401c; --tint: #fde6df;
    --mono: "IBM Plex Mono", ui-monospace, monospace;
    --cond: "IBM Plex Sans Condensed", "Arial Narrow", sans-serif;
    --sans: "IBM Plex Sans", "Helvetica Neue", sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden; position: relative; color: var(--ink); font: 15px/1.4 var(--sans);
    background: radial-gradient(circle at 1px 1px, rgba(21, 20, 18, 0.1) 1px, transparent 1.4px) 0 0 / 24px 24px, var(--paper);
  }
  body > * { position: absolute; }
  .brand { left: 32px; top: 24px; font: 600 13px/1 var(--mono); display: flex; align-items: center; gap: 8px; }
  .brand::before { content: ""; width: 10px; height: 10px; background: var(--mark); }
  .site { right: 32px; top: 24px; font: 500 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }

  .input {
    display: flex; align-items: center; gap: 12px; padding: 0 12px 0 18px; z-index: 5;
    background: #fff; border: 1.5px solid var(--ink); box-shadow: 5px 5px 0 var(--hair); white-space: nowrap;
  }
  .input .mk { color: var(--mark); font: 600 1em/1 var(--mono); }
  .input .line { flex: 1; display: flex; align-items: center; overflow: hidden; }
  .chip { font: 500 0.86em/1 var(--mono); color: var(--mark); background: var(--tint); padding: 0.32em 0.45em; margin-right: 0.4em; }
  .ph { color: var(--faint); }
  .caret { width: 2px; height: 1.2em; background: var(--ink); margin-left: 1px; }
  .key { font: 500 12px/1 var(--mono); border: 1.5px solid var(--ink); padding: 5px 7px 4px; background: #fff; color: var(--ink); }
  .key.down { background: var(--mark); border-color: var(--mark); color: #fff; }

  .pop { width: 470px; background: #fff; border: 1.5px solid var(--ink); box-shadow: 5px 5px 0 var(--hair); z-index: 6; transform-origin: 0 0; }
  .pop .hd { font: 500 10px/1 var(--mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); padding: 9px 12px 7px; border-bottom: 1px solid var(--hair); }
  .opt { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 9px 10px 9px 9px; border-left: 3px solid var(--mark); }
  .opt .cmd { font: 500 14px/1 var(--mono); }
  .opt .cmd b { color: var(--mark); font-weight: 600; }
  .opt .desc { font-size: 12.5px; color: var(--muted); }

  .pill { left: 32px; top: 132px; font: 500 13px/1 var(--mono); color: #fff; background: var(--ink); padding: 8px 12px 7px; transform-origin: 0 50%; }
  .pill b { color: #ffb39f; font-weight: 600; }
  .row { left: 32px; width: 270px; height: 48px; padding: 0 12px 0 10px; border-left: 3px solid transparent; display: grid; grid-template-columns: 30px 1fr; grid-template-rows: 1fr 1fr; align-items: center; }
  .row.on { background: #fff; border-left-color: var(--mark); box-shadow: 0 0 0 1px var(--hair); }
  .row .n { grid-row: span 2; font: 600 12px/1 var(--mono); color: var(--mark); }
  .row .h { font: 500 17px/1 var(--mono); align-self: end; padding-bottom: 2px; }
  .row .h i { font-style: normal; color: var(--muted); }
  .row .h.spin { color: var(--faint); }
  .row .b { font: 11.5px/1 var(--mono); color: var(--muted); align-self: start; padding-top: 4px; }

  .card { left: 0; top: 0; width: 544px; height: 340px; border: 1.5px solid var(--ink); background: #fff; box-shadow: 6px 6px 0 var(--hair); transform-origin: 0 0; }
  .card img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .tag { position: absolute; left: 12px; bottom: 12px; display: flex; align-items: baseline; gap: 9px; background: #fff; border: 1.5px solid var(--ink); padding: 7px 11px 6px; }
  .tag .n, .lab .n { font: 600 12px/1 var(--mono); color: var(--mark); }
  .tag b { font: 600 19px/1 var(--cond); }
  .tag code, .lab code { font: 12px/1 var(--mono); color: var(--muted); }
  .tag code i, .lab code i { font-style: normal; }

  .lab { width: 168px; }
  .lab div { font: 600 15.5px/1.1 var(--cond); display: flex; gap: 6px; align-items: baseline; }
  .lab p { margin: 6px 0 0; display: flex; align-items: center; gap: 7px; }
  .lab .chips { display: inline-flex; }
  .lab .chips i { width: 9px; height: 9px; border: 1px solid rgba(21, 20, 18, 0.35); margin-right: -1px; }

  .cap { left: 32px; top: 386px; }
  .cap h2 { margin: 0; font: 600 44px/1 var(--cond); letter-spacing: -0.01em; }
  .cap h2 span { color: var(--mark); }
  .cap p { margin: 12px 0 0; font: 13px/1.4 var(--mono); color: var(--muted); }
  .cap p b { color: var(--ink); font-weight: 500; }

  .foot { left: 32px; right: 32px; bottom: 20px; display: flex; justify-content: space-between; font: 10.5px/1 var(--mono); color: var(--muted); }
  .foot b { color: var(--ink); font-weight: 500; }
</style>
</head>
<body>
  <div class="brand">hash-design</div>
  <div class="site" id="site">Agent Skill · MCP server · CLI</div>

  <div class="input" id="input">
    <span class="mk">›</span>
    <span class="line"><span class="chip" id="chip">/hash-design</span><span id="typed"></span><span class="ph" id="ph">Describe the page you want…</span><span class="caret" id="caret"></span></span>
    <span class="key" id="enter">↵</span>
  </div>
  <div class="pop" id="pop">
    <div class="hd">Skills</div>
    <div class="opt" id="opt"><span class="cmd">/<b>ha</b>sh-design</span><span class="desc">five design directions from true-random hashes</span><span class="key" id="pick">↵</span></div>
  </div>

  <div class="pill" id="pill">roll → <b>5</b> × SHA-256</div>
  ${designs
    .map(
      (d, i) =>
        `<div class="row" id="r${i}"><span class="n">${d.n}</span><span class="h" id="h${i}"></span><span class="b" id="b${i}">→ ${esc(d.id)}</span></div>`,
    )
    .join('\n  ')}

  ${designs
    .map(
      (d, i) =>
        `<div class="card" id="c${i}"><img src="${d.img}" alt=""><div class="tag" id="t${i}"><span class="n">${d.n}</span><b>${esc(d.label)}</b><code>${ref(d)}</code></div></div>`,
    )
    .join('\n  ')}
  ${designs
    .map(
      (d, i) =>
        `<div class="lab" id="l${i}"><div><span class="n">${d.n}</span>${esc(d.label)}</div><p><span class="chips">${chips(d)}</span><code>${ref(d)}</code></p></div>`,
    )
    .join('\n  ')}

  <div class="cap" id="cap">
    <h2>Pick one <span>·</span> reproducible from its ref</h2>
    <p><b>true-random SHA-256</b> → frozen brief → preview · same ref, same brief</p>
  </div>
  <div class="foot" id="foot">
    <span>Real output: <b>examples/${esc(name)}</b> · seed <b>${esc(roll.source.replace(/^seed:/, ''))}</b>, fixed only so the example reproduces</span>
    <span><b>qybaihe.github.io/hash-design</b></span>
  </div>

  <script>
    const FPS = ${FPS};
    const PROMPT = ${JSON.stringify(PROMPT)};
    const REFS = ${JSON.stringify(designs.map((d) => ({ short: d.short, probe: d.probe })))};
    const $ = (id) => document.getElementById(id);
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const lerp = (a, b, p) => a + (b - a) * p;
    const prog = (t, a, b) => clamp((t - a) / (b - a));
    const inOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    const out = (p) => 1 - Math.pow(1 - p, 3);
    const back = (p) => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
    function hex(seed) {
      // mulberry32: the "ticking" digits are pseudo-random per frame so every render is identical
      let a = seed >>> 0, s = '';
      for (let k = 0; k < 8; k++) {
        a = (a + 0x6d2b79f5) >>> 0;
        let x = Math.imul(a ^ (a >>> 15), 1 | a);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        s += (((x ^ (x >>> 14)) >>> 0) % 16).toString(16);
      }
      return s;
    }
    const show = (el, o, transform) => { el.style.opacity = o; el.style.visibility = o > 0.001 ? 'visible' : 'hidden'; if (transform !== undefined) el.style.transform = transform; };

    // Timeline (seconds)
    const SLASH = [0.1, 0.16, 0.22], POP = 0.26, PICK = 0.44, CHIP = 0.5, TYPE = [0.54, 1.02], ENTER = 1.08;
    const MOVE = [1.16, 1.4], PILL = 1.34, ROW = (i) => 1.4 + i * 0.04, LOCK = (i) => 1.6 + i * 0.09;
    const CARD = (i) => 2.04 + i * 0.44, ROWMOVE = (i) => 4.4 + i * 0.03, LAB = (i) => 4.74 + i * 0.03, CAP = 4.8;
    const FADE = [5.72, 5.86], BACK = [5.86, 5.99];
    const STACK = (i) => [340 + i * 10, 128 + i * 9], SLOT = (i) => [32 + i * 182, 200], CW = 544, CH = 340, S = 168 / 544;

    function render(t) {
      const frame = Math.round(t * FPS);
      const reset = t >= BACK[0];
      const scene = 1 - inOut(prog(t, FADE[0], FADE[1]));

      // Prompt box: centred while typing, then docked at the top.
      const m = reset ? 0 : inOut(prog(t, MOVE[0], MOVE[1]));
      const box = $('input');
      box.style.left = lerp(80, 32, m) + 'px';
      box.style.top = lerp(238, 62, m) + 'px';
      box.style.width = lerp(800, 896, m) + 'px';
      box.style.height = lerp(62, 46, m) + 'px';
      box.style.fontSize = lerp(18, 15, m) + 'px';
      box.style.opacity = reset ? inOut(prog(t, BACK[0], BACK[1])) : scene;
      const slash = reset ? 0 : SLASH.filter((s) => t >= s).length;
      const picked = !reset && t >= CHIP;
      const typed = reset ? '' : picked ? ' ' + PROMPT.slice(0, Math.round(PROMPT.length * prog(t, TYPE[0], TYPE[1]))) : '/ha'.slice(0, slash);
      $('chip').style.display = picked ? '' : 'none';
      $('typed').textContent = typed;
      $('ph').style.display = !picked && slash === 0 ? '' : 'none';
      const typing = (t >= SLASH[0] && t < CHIP) || (t >= TYPE[0] && t < TYPE[1] + 0.02);
      $('caret').style.visibility = !reset && t >= ENTER ? 'hidden' : typing || Math.floor(t / 0.3) % 2 === 0 ? 'visible' : 'hidden';
      $('enter').className = 'key' + (t >= ENTER && t < ENTER + 0.1 ? ' down' : '');

      // Autocomplete
      const pop = $('pop');
      const pin = out(prog(t, POP, POP + 0.08));
      pop.style.left = '120px';
      pop.style.top = '310px';
      show(pop, t >= POP && t < CHIP ? pin : 0, 'scale(' + lerp(0.94, 1, pin) + ')');
      const flash = t >= PICK && t < CHIP;
      $('opt').style.background = flash ? 'var(--tint)' : '#f3f0ea';
      $('pick').className = 'key' + (flash ? ' down' : '');

      // Roll: pill and five ticking refs that lock to the real ones.
      const fadeRoll = 1 - prog(t, ROWMOVE(0), ROWMOVE(0) + 0.14);
      const pp = prog(t, PILL, PILL + 0.14);
      show($('pill'), reset ? 0 : clamp(pp * 3) * fadeRoll * scene, 'scale(' + lerp(0.7, 1, back(pp)) + ')');
      let active = -1;
      for (let i = 0; i < 5; i++) if (t >= CARD(i)) active = i;
      REFS.forEach((r, i) => {
        const el = $('r' + i);
        const p = out(prog(t, ROW(i), ROW(i) + 0.1));
        el.style.top = 178 + i * 56 + 'px';
        show(el, reset ? 0 : p * fadeRoll * scene, 'translateX(' + lerp(-14, 0, p) + 'px)');
        const locked = t >= LOCK(i);
        const h = $('h' + i);
        h.className = 'h' + (locked ? '' : ' spin');
        h.innerHTML = locked ? r.short + '<i>' + r.probe + '</i>' : hex(frame * 7919 + i * 104729 + 17);
        $('b' + i).style.opacity = clamp((t - LOCK(i)) / 0.08);
        el.classList.toggle('on', i === active && t < ROWMOVE(0) || (t >= LOCK(i) && t < LOCK(i) + 0.08));
      });

      // Previews: pop into a stack, then shrink into a compare row.
      for (let i = 0; i < 5; i++) {
        const el = $('c' + i);
        const p = prog(t, CARD(i), CARD(i) + 0.2);
        const k = t < CARD(i) ? 0 : lerp(0.8, 1, back(p));
        const mv = inOut(prog(t, ROWMOVE(i), ROWMOVE(i) + 0.38));
        const [sx, sy] = STACK(i), [rx, ry] = SLOT(i);
        const sc = lerp(k, S, mv);
        const x = lerp(sx + ((1 - k) * CW) / 2, rx, mv), y = lerp(sy + ((1 - k) * CH) / 2, ry, mv);
        show(el, reset || t < CARD(i) ? 0 : clamp(p * 4) * scene, 'translate(' + x + 'px,' + y + 'px) scale(' + sc + ')');
        el.style.zIndex = 10 + i;
        $('t' + i).style.opacity = 1 - prog(t, ROWMOVE(0), ROWMOVE(0) + 0.1);
        const l = $('l' + i), lp = out(prog(t, LAB(i), LAB(i) + 0.14));
        l.style.left = rx + 'px';
        l.style.top = ry + CH * S + 12 + 'px';
        show(l, reset ? 0 : lp * scene, 'translateY(' + lerp(6, 0, lp) + 'px)');
      }
      const cp = out(prog(t, CAP, CAP + 0.18));
      show($('cap'), reset ? 0 : cp * scene, 'translateY(' + lerp(12, 0, cp) + 'px)');
      show($('foot'), reset ? 0 : prog(t, MOVE[0], MOVE[1]) * scene);
    }
    render(0);
  </script>
</body>
</html>`;

const tmp = await mkdtemp(join(tmpdir(), 'hash-design-gif-'));
const framesDir = join(tmp, 'frames');
await mkdir(framesDir);
await writeFile(join(tmp, 'hero.html'), html);
await mkdir(outDir, { recursive: true });

const frames = Math.round(DURATION * FPS);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
  await page.goto(pathToFileURL(join(tmp, 'hero.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode())));
  const missing = await page.evaluate(() =>
    ['600 44px "IBM Plex Sans Condensed"', '500 13px "IBM Plex Mono"', '400 15px "IBM Plex Sans"'].filter(
      (font) => !document.fonts.check(font),
    ),
  );
  if (missing.length) throw new Error(`Fonts did not load (offline?): ${missing.join(', ')}`);
  for (let i = 0; i < frames; i++) {
    await page.evaluate(`render(${i / FPS})`);
    await page.screenshot({ path: join(framesDir, `f${String(i).padStart(4, '0')}.png`) });
  }
} finally {
  await browser.close();
}

const gif = join(outDir, 'hero.gif');
const mp4 = join(outDir, 'hero.mp4');
const has = (bin) => {
  try {
    execFileSync(bin, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
const run = (bin, argv) => execFileSync(bin, argv, { stdio: ['ignore', 'ignore', 'inherit'] });
const input = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(framesDir, 'f%04d.png')];

if (has('gifski')) {
  const list = (await readdir(framesDir)).sort().map((f) => join(framesDir, f));
  run('gifski', [
    '--quiet',
    '--fps',
    String(FPS),
    '--width',
    String(GIF_WIDTH),
    '--quality',
    '80',
    '-o',
    gif,
    ...list,
  ]);
} else {
  const filter =
    `scale=${GIF_WIDTH}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192:stats_mode=full[p];` +
    '[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle';
  run('ffmpeg', [...input, '-vf', filter, '-loop', '0', gif]);
}
run('ffmpeg', [
  ...input,
  ...['-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-crf', '20'],
  ...['-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4],
]);
await rm(tmp, { recursive: true, force: true });

const kb = async (f) => `${Math.round((await stat(f)).size / 1024)} KB`;
console.log(
  `docs/assets/hero.gif  ${GIF_WIDTH}×${(GIF_WIDTH * H) / W}, ${frames} frames @ ${FPS} fps = ${DURATION} s, ${await kb(gif)}`,
);
console.log(`docs/assets/hero.mp4  ${W * SCALE}×${H * SCALE}, ${await kb(mp4)}`);
