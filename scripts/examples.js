import fs from 'node:fs/promises';
import { generate } from '../src/core/index.js';
import { writeBundle } from '../src/export.js';
import { DIRECTIONS } from '../src/core/directions.js';

// Deterministic fixtures are isolated from personal history. A new version must regenerate all fixtures.
const out = process.env.EXAMPLE_OUT ?? 'examples';
const bundle = generate({ seed: 'random-design-public-demo-v2', count: 5, scenario: 'general', language: 'zh' });
await writeBundle(bundle, out);
const english = { ...bundle, request: { ...bundle.request, language: 'en' } };
await writeBundle(english, `${out}/english`);
await fs.mkdir(`${out}/catalogue`, { recursive: true });
for (const direction of DIRECTIONS) {
  // Fixed representative seeds keep the catalogue reviewable across releases.
  const fixtureSeed = direction.id === 'enamel' ? 'random-design-catalogue-v2/enamel/0' : `random-design-catalogue-v2/${direction.id}`;
  const fixture = generate({ seed: fixtureSeed, count: 1, direction: direction.id });
  await writeBundle(fixture, `${out}/catalogue/${direction.id}`, { pptx: false });
}
await fs.writeFile(`${out}/catalogue/index.html`, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>random-design · 视觉语法图录</title><style>body{margin:0;padding:5%;background:#eeece4;color:#273d35;font:15px system-ui}a{color:inherit}h1{font-size:40px;font-weight:500}header{margin-bottom:45px;max-width:900px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr));gap:40px 25px}iframe{width:100%;height:600px;border:0}h2{font-size:20px;font-weight:500}p{line-height:1.8}</style><header><a href="../../">← random-design</a><h1>八种视觉语言，八种组织画面的逻辑</h1><p>同一份内容的实际网页。每个方向展示一份固定规范；规则生成的是变体，并不凭随机数字创造新的艺术流派。打开原页面检查完整构图。</p></header><main>${DIRECTIONS.map((d, i) => `<article><h2>0${i + 1} · ${d.name.zh} / ${d.name.en}</h2><p><a href="${d.id}/01/page.html">打开网页 ↗</a> · <a href="${d.id}/01/brief.md">设计规范</a></p><iframe title="${d.name.en}" loading="lazy" src="${d.id}/01/page.html"></iframe></article>`).join('')}</main></html>`);
console.log(`Wrote ${bundle.designs.length * 2} web + six-slide PPTX examples into ${out}`);
