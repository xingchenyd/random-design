import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { serve } from './serve.js';
import { generate } from '../src/core/index.js';
import { DIRECTIONS } from '../src/core/directions.js';
import { pageHtml } from '../src/render.js';

const server = await serve({ port: 0 });
const browser = await chromium.launch({ headless: true });
const errors = [], checks = [];
await fs.mkdir('.private/browser', { recursive: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
page.on('pageerror', err => errors.push(err.message));
try {
  await page.goto(`http://127.0.0.1:${server.address().port}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('.design-card').first().waitFor();
  assert.equal(await page.locator('.design-card').count(), 5);
  checks.push('studio generates five directions');
  const first = await page.locator('.design-head small').allTextContents();
  await page.screenshot({ path: 'docs/assets/studio-desktop.png' });
  await page.locator('#language').click(); assert.match(await page.locator('h1').innerText(), /Every time/);
  await page.locator('#language').click();
  await page.locator('#generate').click(); await page.waitForFunction(() => !document.querySelector('#generate').disabled);
  const second = await page.locator('.design-head small').allTextContents(); assert(second.every(id => !first.includes(id)));
  checks.push('language switch and repeated generation');
  await page.locator('.actions button').first().click(); assert(await page.locator('.design-card.selected').count());
  const colour = await page.locator('.design-card').first().locator('.swatches span').nth(2).evaluate(el => el.style.background);
  await page.locator('.design-card').first().locator('[data-lock="palette"]').check();
  await page.locator('.design-card').first().getByRole('button', { name: '锁定后继续探索', exact: true }).click();
  await page.waitForFunction(() => !document.querySelector('#generate').disabled);
  const accents = await page.locator('.swatches span:nth-child(3)').evaluateAll(elements => elements.map(el => el.style.background));
  assert(accents.length === 5 && accents.every(c => c === colour));
  checks.push('palette-locked exploration');
  const download = page.waitForEvent('download');
  await page.locator('.design-card').first().getByRole('button', { name: 'PPTX', exact: true }).click();
  const item = await download; await item.saveAs('.private/browser/browser-export.pptx');
  checks.push('native browser PPTX download');
  const jsonDownload = page.waitForEvent('download'); await page.locator('.design-card').first().getByRole('button', { name: 'JSON', exact: true }).click();
  await (await jsonDownload).saveAs('.private/browser/design.json');
  await page.locator('#design-import').setInputFiles('.private/browser/design.json');
  await page.waitForFunction(() => document.querySelectorAll('.design-card').length === 1);
  checks.push('design import reproduces saved theme');
  await page.setViewportSize({ width: 390, height: 844 });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await page.screenshot({ path: 'docs/assets/studio-mobile.png', fullPage: true });
  checks.push('390px studio layout');
  // Exercise every supported direction/layout pair at desktop + mobile with both languages.
  let pages = 0;
  for (const language of ['zh', 'en']) for (const direction of DIRECTIONS) for (const composition of direction.layouts) {
    const d = generate({ seed: `browser/${direction.id}/${composition}/${language}`, count: 1, direction: direction.id, locks: { composition } }).designs[0];
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 }); await page.setContent(pageHtml(d, { language, fonts: false }));
      const report = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, h1: (() => { const r = document.querySelector('h1').getBoundingClientRect(); return r.x >= -1 && r.right <= innerWidth + 1; })() }));
      assert(!report.overflow && report.h1, `${language}/${direction.id}/${composition}/${width} overflow`); pages++;
    }
  }
  checks.push(`${pages} website layouts across all supported direction/layout pairs / languages / widths`);
  assert.deepEqual(errors, []);
  const report = { checks, javascriptErrors: errors, actualDeviceTest: false, powerpointDesktopTest: false };
  await fs.mkdir('docs/validation', { recursive: true }); await fs.writeFile('docs/validation/browser.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
