import type { Roll, RollJson } from './brief.js';
import { designSlug } from './brief.js';
import type { Language } from './derive.js';

export interface CompareEntry {
  number: number;
  ref: string;
  short: string;
  branchZh: string;
  branchEn: string;
  layout: string;
  display: string;
  body: string;
  palette: string;
  colors: Record<string, string>;
  density: string;
  voice: string;
  twist: string;
  /** Path of the preview HTML, relative to the compare page. */
  preview: string;
  /** Path of the brief Markdown, relative to the compare page (optional). */
  brief?: string;
}

export interface CompareOptions {
  title: string;
  subtitle?: string;
  entries: CompareEntry[];
  generatedAt?: string;
  /** Language of the page chrome (labels, buttons, instructions). Default "zh". */
  language?: Language;
}

const STRINGS = {
  zh: {
    lang: 'zh-CN',
    titleSuffix: 'hash-design 对比',
    labels: ['版式', '字体', '配色', '密度', '语气', '变数'],
    open: '打开整页 ↗',
    zoom: '放大看',
    toolbar: '视图',
    views: ['并排', '两列', '单张'],
    devices: ['桌面 1440', '手机 390'],
    directions: (n: number) => `${n} 个方向`,
    pick: (n: number) =>
      `看完后，<b>回复编号（1–${n}）</b>选定一个方向，Agent 会按该编号的 brief 落地正式页面。默认整套采用，不混搭；确需混搭请明确说出“取 #a 的什么 + #b 的什么”。键盘：<b>1–${n}</b> 放大 · <b>←/→</b> 切换 · <b>D/M</b> 桌面/手机 · <b>Esc</b> 返回并排。`,
  },
  en: {
    lang: 'en',
    titleSuffix: 'hash-design compare',
    labels: ['Layout', 'Type', 'Colour', 'Density', 'Voice', 'Twist'],
    open: 'Open page ↗',
    zoom: 'Zoom',
    toolbar: 'View',
    views: ['Strip', '2 columns', 'Single'],
    devices: ['Desktop 1440', 'Mobile 390'],
    directions: (n: number) => `${n} directions`,
    pick: (n: number) =>
      `When you have looked, <b>reply with a number (1–${n})</b> to choose a direction, and the agent builds the final page from that brief. A brief is used whole; to mix, say exactly what to take: “X from #a + Y from #b”. Keys: <b>1–${n}</b> zoom · <b>←/→</b> previous/next · <b>D/M</b> desktop/mobile · <b>Esc</b> back to the strip.`,
  },
} as const;

/** The compare page's subtitle line for a roll: count, source, algorithm and library fingerprint. */
export function compareSubtitle(roll: Roll | RollJson): string {
  const t = STRINGS[roll.content.language] ?? STRINGS.zh;
  return `${t.directions(roll.designs.length)} · ${roll.source} · ${roll.algorithm} · library ${roll.library}`;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Default file layout used by the CLI and the Skill: previews/01-<branch>.html, briefs/01-<branch>.md.
 * Voice and twist names follow the roll's language.
 */
export function compareEntriesFromRoll(
  roll: Roll | RollJson,
  paths: { previewDir?: string; briefDir?: string } = {},
): CompareEntry[] {
  const previewDir = paths.previewDir ?? 'previews';
  const briefDir = paths.briefDir ?? 'briefs';
  const lang: Language = roll.content.language === 'en' ? 'en' : 'zh';
  return roll.designs.map((d, i) => {
    const slug = 'slug' in d ? (d as { slug: string }).slug : designSlug(d as Roll['designs'][number], i);
    const type = d.type;
    return {
      number: i + 1,
      ref: d.ref,
      short: d.short,
      branchZh: d.branch.name.zh,
      branchEn: d.branch.name.en,
      layout: d.layout.name,
      display: type.display.family,
      body: type.body.family,
      palette: d.palette.name,
      colors: { ...d.palette.colors },
      density: typeof d.density === 'string' ? d.density : d.density.id,
      voice: d.voice.name[lang],
      twist: d.twist.name[lang],
      preview: `${previewDir}/${slug}.html`,
      brief: `${briefDir}/${slug}.md`,
    };
  });
}

/**
 * A neutral "light table" page that shows every preview side by side in scaled iframes,
 * with desktop/mobile toggles, a focus mode and keyboard shortcuts (1–9, ←/→, D/M).
 */
export function buildComparePage(opts: CompareOptions): string {
  const en = opts.language === 'en';
  const t = en ? STRINGS.en : STRINGS.zh;
  const [lLayout, lType, lColour, lDensity, lVoice, lTwist] = t.labels;
  const n = opts.entries.length;
  const cards = opts.entries
    .map((e) => {
      const swatches = ['paper', 'ink', 'accent', 'accent2', 'panel', 'muted', 'rule']
        .filter((k) => e.colors[k])
        .map(
          (k) =>
            `<i style="background:${esc(e.colors[k] as string)}" title="${k} ${esc(e.colors[k] as string)}"></i>`,
        )
        .join('');
      return `
    <article class="frame" id="d${e.number}" data-n="${e.number}">
      <header class="frame-head">
        <span class="num">${String(e.number).padStart(2, '0')}</span>
        <div class="who">
          <strong>${esc(en ? e.branchEn : e.branchZh)}</strong>
          ${en ? `<span lang="zh-CN">${esc(e.branchZh)}</span>` : `<span>${esc(e.branchEn)}</span>`}
        </div>
        <code class="hash" title="${esc(e.ref)}">${esc(e.short)}</code>
      </header>
      <div class="screen" data-src="${esc(e.preview)}">
        <iframe src="${esc(e.preview)}" title="${esc(`#${e.number} ${e.branchEn}`)}" loading="lazy"></iframe>
      </div>
      <dl class="spec">
        <dt>${lLayout}</dt><dd>${esc(e.layout)}</dd>
        <dt>${lType}</dt><dd>${esc(e.display)} / ${esc(e.body)}</dd>
        <dt>${lColour}</dt><dd><span class="sw">${swatches}</span> ${esc(e.palette)}</dd>
        <dt>${lDensity}</dt><dd>${esc(e.density)}</dd>
        <dt>${lVoice}</dt><dd>${esc(e.voice)}</dd>
        <dt>${lTwist}</dt><dd>${esc(e.twist)}</dd>
      </dl>
      <footer class="frame-foot">
        <a href="${esc(e.preview)}" target="_blank" rel="noopener">${t.open}</a>
        ${e.brief ? `<a href="${esc(e.brief)}" target="_blank" rel="noopener">brief.md</a>` : ''}
        <button type="button" class="focus-btn" data-n="${e.number}">${t.zoom} · ${e.number}</button>
      </footer>
    </article>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opts.title)} — ${t.titleSuffix}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans+Condensed:wght@400;600&family=Noto+Sans+SC:wght@400;700&display=swap">
<style>
  :root {
    --table: #d8d5ce; --ink: #151412; --muted: #55524b; --line: #151412; --mark: #e2401c; --card: #f3f1ec;
    --mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
    --sans: "IBM Plex Sans Condensed", "Noto Sans SC", "Arial Narrow", sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body { background: var(--table); color: var(--ink); font: 14px/1.45 var(--sans); }
  .bar { display: grid; grid-template-columns: 1fr auto; gap: 8px 24px; align-items: end; padding: 20px 24px 16px; border-bottom: 2px solid var(--line); }
  .bar h1 { margin: 0; font: 600 28px/1.1 var(--sans); letter-spacing: -0.01em; }
  .bar p { margin: 4px 0 0; font: 12px/1.4 var(--mono); color: var(--muted); }
  .controls { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .controls button { font: 600 12px var(--mono); padding: 6px 10px; border: 1.5px solid var(--line); background: transparent; color: var(--ink); cursor: pointer; }
  .controls button[aria-pressed="true"] { background: var(--ink); color: var(--table); }
  .strip { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(300px, 1fr); gap: 16px; padding: 16px 24px 24px; overflow-x: auto; scroll-snap-type: x mandatory; }
  body.cols-2 .strip { grid-auto-flow: row; grid-template-columns: repeat(2, 1fr); }
  body.focus .strip { grid-auto-flow: row; grid-template-columns: 1fr; }
  body.focus .frame:not(.on) { display: none; }
  .frame { scroll-snap-align: start; background: var(--card); border: 2px solid var(--line); display: flex; flex-direction: column; min-width: 0; }
  .frame.on { outline: 4px solid var(--mark); outline-offset: 2px; }
  .frame-head { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; padding: 8px 10px; border-bottom: 2px solid var(--line); }
  .num { font: 600 30px/1 var(--mono); }
  .who { display: flex; flex-direction: column; min-width: 0; }
  .who strong { font-size: 16px; }
  .who span { font: 11px var(--mono); color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hash { font: 11px var(--mono); background: var(--ink); color: var(--card); padding: 2px 6px; }
  .screen { position: relative; overflow: hidden; background: #fff; border-bottom: 2px solid var(--line); }
  .screen iframe { position: absolute; top: 0; left: 0; border: 0; transform-origin: 0 0; background: #fff; }
  .spec { display: grid; grid-template-columns: auto 1fr; gap: 3px 10px; margin: 0; padding: 10px; font-size: 12.5px; }
  .spec dt { font: 600 11px/1.6 var(--mono); color: var(--muted); }
  .spec dd { margin: 0; min-width: 0; }
  .sw { display: inline-flex; vertical-align: -2px; margin-right: 4px; border: 1px solid var(--line); }
  .sw i { width: 12px; height: 12px; display: block; }
  .frame-foot { margin-top: auto; display: flex; gap: 12px; align-items: center; padding: 8px 10px; border-top: 1px dashed var(--line); font: 12px var(--mono); }
  .frame-foot a { color: var(--ink); }
  .focus-btn { margin-left: auto; font: 600 12px var(--mono); border: 1.5px solid var(--line); background: transparent; padding: 4px 8px; cursor: pointer; }
  .pick { margin: 0 24px 32px; padding: 14px 16px; border: 2px dashed var(--line); font-size: 15px; }
  .pick b { font-family: var(--mono); }
  @media (max-width: 720px) { .bar { grid-template-columns: 1fr; } .controls { justify-content: flex-start; } body.cols-2 .strip { grid-template-columns: 1fr; } }
</style>
</head>
<body>
  <header class="bar">
    <div>
      <h1>${esc(opts.title)}</h1>
      <p>${esc(opts.subtitle ?? '')}${opts.generatedAt ? ` · ${esc(opts.generatedAt)}` : ''}</p>
    </div>
    <div class="controls" role="toolbar" aria-label="${t.toolbar}">
      <button type="button" data-view="strip" aria-pressed="true">${t.views[0]}</button>
      <button type="button" data-view="cols-2" aria-pressed="false">${t.views[1]}</button>
      <button type="button" data-view="focus" aria-pressed="false">${t.views[2]}</button>
      <button type="button" data-device="desktop" aria-pressed="true">${t.devices[0]}</button>
      <button type="button" data-device="mobile" aria-pressed="false">${t.devices[1]}</button>
    </div>
  </header>
  <main class="strip">
${cards}
  </main>
  <p class="pick">${t.pick(n)}</p>
<script>
(() => {
  const devices = { desktop: [1440, 900], mobile: [390, 844] };
  let device = 'desktop';
  const body = document.body;
  const frames = [...document.querySelectorAll('.frame')];
  function fit() {
    const [w, h] = devices[device];
    for (const screen of document.querySelectorAll('.screen')) {
      const iframe = screen.querySelector('iframe');
      const avail = screen.clientWidth;
      const scale = Math.min(1, avail / w);
      iframe.style.width = w + 'px';
      iframe.style.height = h + 'px';
      iframe.style.transform = 'scale(' + scale + ')';
      screen.style.height = Math.round(h * scale) + 'px';
      if (device === 'mobile') { iframe.style.left = Math.max(0, (avail - w * scale) / 2) + 'px'; } else { iframe.style.left = '0'; }
    }
  }
  function setView(view) {
    body.classList.remove('cols-2', 'focus');
    if (view !== 'strip') body.classList.add(view);
    for (const b of document.querySelectorAll('[data-view]')) b.setAttribute('aria-pressed', String(b.dataset.view === view));
    if (view !== 'focus') frames.forEach((f) => f.classList.remove('on'));
    requestAnimationFrame(fit);
  }
  function focus(n) {
    const target = frames.find((f) => f.dataset.n === String(n));
    if (!target) return;
    frames.forEach((f) => f.classList.toggle('on', f === target));
    setView('focus');
    target.scrollIntoView({ block: 'start' });
  }
  function setDevice(d) {
    device = d;
    for (const b of document.querySelectorAll('[data-device]')) b.setAttribute('aria-pressed', String(b.dataset.device === d));
    fit();
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    if (t.dataset.view) setView(t.dataset.view);
    if (t.dataset.device) setDevice(t.dataset.device);
    if (t.classList.contains('focus-btn')) focus(t.dataset.n);
  });
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea')) return;
    const n = Number(e.key);
    if (n >= 1 && n <= frames.length) focus(n);
    const cur = frames.findIndex((f) => f.classList.contains('on'));
    if (e.key === 'ArrowRight' && cur >= 0) focus(((cur + 1) % frames.length) + 1);
    if (e.key === 'ArrowLeft' && cur >= 0) focus(((cur - 1 + frames.length) % frames.length) + 1);
    if (e.key === 'Escape') setView('strip');
    if (e.key === 'd' || e.key === 'D') setDevice('desktop');
    if (e.key === 'm' || e.key === 'M') setDevice('mobile');
  });
  const params = new URLSearchParams(location.search);
  if (params.get('device') === 'mobile') setDevice('mobile');
  if (params.get('view')) setView(params.get('view'));
  if (params.get('focus')) focus(params.get('focus'));
  addEventListener('resize', fit);
  fit();
})();
</script>
</body>
</html>
`;
}
