import fs from 'node:fs/promises';
import path from 'node:path';
import { generate, getPreset, PRESETS } from '../src/core/index.js';
import { pageHtml, compareHtml, brief } from '../src/render.js';
import { escapeHtml as escape } from '../src/core/util.js';

function galleryHtml(language) {
  const zh = language === 'zh';
  const cards = PRESETS.map(preset => {
    const name = escape(preset.name[language]);
    const page = `${preset.id}/${zh ? 'page' : 'en'}.html`;
    return `<article>
      <a class="preview" href="${page}" aria-label="${name}">
        <iframe title="${name}" src="${page}" loading="lazy" tabindex="-1" sandbox="allow-same-origin"></iframe>
      </a>
      <h2>${name}</h2>
      ${zh ? `<p>${escape(preset.role)}</p>` : ''}
      <div class="links"><a href="${page}">${zh ? '打开网页' : 'Open page'}</a><a href="../?preset=${preset.id}&amp;lang=${language}">${zh ? '在工作台使用 ↗' : 'Use in studio ↗'}</a></div>
    </article>`;
  }).join('\n');
  return `<!doctype html><html lang="${zh ? 'zh-CN' : 'en'}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${zh ? '21 种固定风格' : '21 fixed styles'} · Random Design</title>
  <style>
  *{box-sizing:border-box}
  body{max-width:1600px;margin:auto;padding:24px 5% 64px;background:#f5f3ed;color:#253c32;font:15px/1.6 system-ui,sans-serif}
  header{padding-bottom:30px;border-bottom:1px solid #9daba1;margin-bottom:32px}
  nav,.links{display:flex;flex-wrap:wrap;gap:16px}
  a{color:inherit;text-underline-offset:4px}
  h1{font-size:clamp(32px,5vw,60px);line-height:1.2;margin:30px 0 12px}
  main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:34px 20px}
  article{min-width:0}
  h2{font-size:20px;margin:12px 0 3px}
  p{margin:0 0 12px}
  .preview{display:block;position:relative;aspect-ratio:1200/780;overflow:hidden;background:#e4e5dc;border:1px solid #bbc1b5}
  .preview iframe{position:absolute;inset:0;border:0;width:1200px;height:780px;transform-origin:top left;pointer-events:none}
  .links{font-size:13px}
  </style></head><body>
  <header><nav><a href="../?lang=${language}">${zh ? '工作台' : 'Studio'}</a><a href="${zh ? 'en.html' : 'index.html'}">${zh ? 'English' : '简体中文'}</a><a href="${zh ? 'hash.html' : 'hash-en.html'}">${zh ? '随机哈希示例' : 'Hash example'}</a></nav>
  <h1>${zh ? '21 种固定风格' : '21 fixed styles'}</h1>
  <p>${zh ? '同一家示例咖啡店，21 套配色、排印和布局。点击任意预览查看完整网页。' : 'One fictional coffee shop, 21 palettes, typographic systems and layouts. Open any preview to see the full page.'}</p></header>
  <main>${cards}</main>
  <script>
  const observer = new ResizeObserver(entries => {
    for (const {target} of entries) target.firstElementChild.style.transform = 'scale(' + target.clientWidth / 1200 + ')';
  });
  for (const preview of document.querySelectorAll('.preview')) observer.observe(preview);
  </script></body></html>`;
}

export async function writePresetGallery(out) {
  await fs.mkdir(out, { recursive: true });
  for (const preset of PRESETS) {
    const directory = path.join(out, preset.id);
    const design = getPreset(preset.id);
    await fs.mkdir(directory, { recursive: true });
    await Promise.all([
      fs.writeFile(path.join(directory, 'page.html'), pageHtml(design)),
      fs.writeFile(path.join(directory, 'en.html'), pageHtml(design, { language: 'en' })),
      fs.writeFile(path.join(directory, 'design.json'), JSON.stringify(design, null, 2))
    ]);
  }
  await Promise.all([
    fs.writeFile(path.join(out, 'index.html'), galleryHtml('zh')),
    fs.writeFile(path.join(out, 'en.html'), galleryHtml('en'))
  ]);

  const bundle = generate({ seed: 'random-design-v3-public-demo', count: 5 });
  const examples = [
    { language: 'zh', page: 'hash.html', directory: 'hash' },
    { language: 'en', page: 'hash-en.html', directory: 'hash-en' }
  ];
  for (const { language, page, directory } of examples) {
    const comparison = compareHtml(bundle, { language, pptx: false });
    const prefixPaths = comparison.replace(/href="(\d\d)\//g, `href="${directory}/$1/`);
    await fs.writeFile(path.join(out, page), prefixPaths);
    for (const [index, design] of bundle.designs.entries()) {
      const folder = path.join(out, directory, String(index + 1).padStart(2, '0'));
      await fs.mkdir(folder, { recursive: true });
      await fs.writeFile(path.join(folder, 'page.html'), pageHtml(design, { language }));
      await fs.writeFile(path.join(folder, 'design.json'), JSON.stringify(design, null, 2));
      // The comparison page links to the visual brief.
      await fs.writeFile(path.join(folder, 'brief.md'), brief(design, { language }));
    }
  }
}
