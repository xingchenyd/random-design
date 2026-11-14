import fs from 'node:fs/promises';
import {chromium} from 'playwright';
import {PRESETS,getPreset} from '../src/core/index.js';
import {pageHtml} from '../src/render.js';
const out=process.env.REVIEW_OUTPUT || '.private/material-review';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1280,height:760}});
for(const [i,p] of PRESETS.entries()){
 await page.setContent(pageHtml(getPreset(p.id),{fonts:false}));
 await page.evaluate(() => document.fonts.ready);
 await page.screenshot({path:`${out}/${String(i+1).padStart(2,'0')}-${p.id}.png`});
}
await browser.close();
