import { chromium } from 'playwright';
import { serve } from './serve.js';
import fs from 'node:fs/promises';
const server = await serve({ root: '.', port: 0 });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
await fs.mkdir('.private/web', { recursive: true });
try {
  for (const language of ['zh', 'en']) for (let i = 1; i <= 5; i++) {
    const directory = `examples/${language === 'en' ? 'english/' : ''}${String(i).padStart(2, '0')}`;
    await page.goto(`http://127.0.0.1:${server.address().port}/${directory}/page.html`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.screenshot({ path: `.private/web/${language}-${i}.png` });
  }
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
