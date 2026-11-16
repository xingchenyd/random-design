import {chromium} from 'playwright';
import {serve} from './serve.js';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=await serve({port:0}),base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('https://fonts.googleapis.com/**',r=>r.abort());await page.route('https://fonts.gstatic.com/**',r=>r.abort());
try{
 await page.goto(base+'/showcase/');assert.equal(await page.locator('.example').count(),20);
 await page.locator('.example').last().scrollIntoViewIfNeeded();await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'docs/assets/collection-v5.png'});
 const examples=JSON.parse(await fs.readFile('dist/reference/examples.json'));
 for(const e of examples){const name=`showcase/${e.caseId}/previews/${e.slug}.html`;const migrated=await fs.readFile('dist/'+name);assert(migrated.equals(await fs.readFile(`vendor/hash-design/examples/${e.caseId}/previews/${e.slug}.html`)));for(const width of [1440,390]){await page.setViewportSize({width,height:900});const r=await page.goto(base+'/'+name,{waitUntil:'domcontentloaded'});assert.equal(r.status(),200);assert(await page.locator('h1').count()>=1);}}
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/reference/');await page.locator('.branch-card').last().waitFor();assert.equal(await page.locator('.branch-card').count(),40);
 await page.locator('#search').fill('editorial-magazine');assert.equal(await page.locator('.branch-card').count(),1);await page.locator('#search').fill('');
 await page.locator('#subject').fill('Preserve this title');await page.locator('#facts').fill('Latte ¥18\n<script>window.injected=true</script>');await page.locator('#generate').click();assert.equal(await page.locator('.brief-card').count(),5);
 const download=page.waitForEvent('download');await page.locator('#results>.download').click();const file=await download;await fs.mkdir('.private/browser',{recursive:true});await file.saveAs('.private/browser/reference-roll.json');const saved=JSON.parse(await fs.readFile('.private/browser/reference-roll.json'));assert.equal(saved.roll.content.subject,'Preserve this title');assert(saved.briefs.every(b=>b.markdown.includes('Latte ¥18')));assert.equal(await page.evaluate(()=>window.injected),undefined);
 const first=saved.briefs.map(b=>b.id);await page.locator('#generate').click();const recents=await page.evaluate(()=>JSON.parse(localStorage.getItem('rd-reference-recent')));assert(recents.slice(-5).every(id=>!first.includes(id)));
 await page.goto(base+'/reference/?branch=editorial-magazine&lang=en');await page.locator('.branch-card').last().waitFor();assert.equal(await page.locator('#branch').inputValue(),'editorial-magazine');assert(await page.locator('#count').isDisabled());await page.locator('#generate').click();assert.equal(await page.locator('.brief-card').count(),1);assert.match(await page.locator('.brief-card h2').innerText(),/Editorial/);await page.screenshot({path:'docs/assets/reference-v5.png'});
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.goto(base+'/showcase/en.html');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);
 const report={importedPages:20,originalHtmlByteExact:true,originalPageLoadChecks:40,catalogueBranches:40,selectionSearchDownloadLanguage:true,copyPreserved:true,recentBranchExclusion:true,mobileGalleryAndPicker:true,jsErrors:errors,originalPagesAestheticallyRedesigned:false};await fs.writeFile('docs/validation/migration.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close();await new Promise(r=>server.close(r));}
