#!/usr/bin/env node
// Verifies that the exact Google Fonts URL every brief would emit (families + weights + italics, Latin and CJK)
// resolves. Network-dependent, so it is not part of CI. Usage: npm run build && node scripts/verify-fonts.mjs
import { BRANCHES, googleFontsUrl } from '../packages/core/dist/index.js';

const urls = new Map();
for (const b of BRANCHES) {
  for (const t of b.type) {
    for (const lang of ['en', 'zh']) {
      const url = googleFontsUrl(t, lang);
      if (url) urls.set(url, `${b.id}/${t.id} (${lang})`);
    }
  }
}
let bad = 0;
const entries = [...urls];
for (let i = 0; i < entries.length; i += 8) {
  await Promise.all(
    entries.slice(i, i + 8).map(async ([url, label]) => {
      const res = await fetch(url, {
        headers: { 'user-agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36' },
      });
      if (!res.ok) {
        bad++;
        console.log(`✗ ${label} ${res.status}\n  ${url}`);
      }
    }),
  );
}
console.log(`${entries.length - bad}/${entries.length} font URLs resolve on Google Fonts`);
process.exit(bad ? 1 : 0);
