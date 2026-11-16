#!/usr/bin/env node
// Screenshots every preview (desktop first screen, desktop full page, mobile first screen) and the compare page.
// Usage: node scripts/screenshot.mjs [example] [only]   (requires: npx playwright install chromium)
//   example  a directory (examples/sluice) or an example name (sluice); default: every example in scripts/examples.mjs
//   only     a preview prefix (e.g. 03) or "compare"
import { existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { EXAMPLES } from './examples.mjs';

const arg = process.argv[2];
const dirs = arg
  ? [existsSync(arg) ? resolve(arg) : resolve('examples', arg)]
  : EXAMPLES.map((e) => resolve('examples', e.dir));
const only = process.argv[3];
let outDir;

const browser = await chromium.launch();
async function shoot(
  file,
  name,
  viewport,
  { fullPage = false, maxHeight = 6000, query = '', wait = 400 } = {},
) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: viewport.width < 500 ? 2 : 1 });
  await page.goto(pathToFileURL(file).href + query, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(wait);
  let clip;
  if (fullPage) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    clip = { x: 0, y: 0, width: viewport.width, height: Math.min(h, maxHeight) };
  }
  await page.screenshot({ path: join(outDir, name), fullPage, ...(clip ? { clip } : {}) });
  await page.close();
  console.log(`  ${name}`);
}

/** Pages built as horizontal scrolls (e.g. a handscroll) get extra shots along the scroll axis. */
async function shootHorizontal(file, slug) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const found = await page.evaluate(() => {
    const el = [...document.querySelectorAll('*')].find(
      (e) =>
        e.scrollWidth > e.clientWidth + 200 && ['auto', 'scroll'].includes(getComputedStyle(e).overflowX),
    );
    if (!el) return null;
    el.setAttribute('data-hd-scroller', '');
    return { max: el.scrollWidth - el.clientWidth, rtl: getComputedStyle(el).direction === 'rtl' };
  });
  if (found) {
    for (const [i, frac] of [0.22, 0.48, 0.74, 1].entries()) {
      const left = Math.round(found.max * frac) * (found.rtl ? -1 : 1);
      await page.evaluate((l) => (document.querySelector('[data-hd-scroller]').scrollLeft = l), left);
      await page.waitForTimeout(250);
      const name = `${slug}-scroll-${i + 1}.png`;
      await page.screenshot({ path: join(outDir, name) });
      console.log(`  ${name}`);
    }
  }
  await page.close();
}

for (const dir of dirs) {
  if (!existsSync(join(dir, 'previews'))) throw new Error(`No previews/ in ${dir}`);
  console.log(dir);
  outDir = join(dir, 'screenshots');
  await mkdir(outDir, { recursive: true });
  const previews = (await readdir(join(dir, 'previews'))).filter((f) => f.endsWith('.html')).sort();
  for (const f of previews) {
    const slug = basename(f, '.html');
    if (only && !slug.startsWith(only)) continue;
    const file = join(dir, 'previews', f);
    await shoot(file, `${slug}-desktop.png`, { width: 1440, height: 900 });
    await shoot(file, `${slug}-full.png`, { width: 1440, height: 900 }, { fullPage: true });
    await shoot(file, `${slug}-mobile.png`, { width: 390, height: 844 });
    await shootHorizontal(file, slug);
  }
  if ((!only || only === 'compare') && existsSync(join(dir, 'compare.html'))) {
    const compare = join(dir, 'compare.html');
    await shoot(compare, 'compare.png', { width: 1800, height: 660 }, { wait: 2500 });
    await shoot(
      compare,
      'compare-mobile.png',
      { width: 1800, height: 1080 },
      { query: '?device=mobile', wait: 2500 },
    );
  }
}
await browser.close();
