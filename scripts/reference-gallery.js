import fs from 'node:fs/promises';
import {BRANCHES,renderBranch} from '../src/reference.js';
import {escapeHtml as e} from '../src/core/util.js';
export async function writeReferenceGallery(){
 const source='vendor/hash-design';
 await fs.mkdir('dist/showcase',{recursive:true});
 const existing=await fs.readdir(`${source}/examples`,{withFileTypes:true});
 const cases=[];
 for(const f of existing.filter(f=>f.isDirectory())){
  const roll=JSON.parse(await fs.readFile(`${source}/examples/${f.name}/roll.json`,'utf8'));
  await fs.cp(`${source}/examples/${f.name}`,`dist/showcase/${f.name}`,{recursive:true});
  cases.push({id:f.name,subject:roll.content.subject,designs:roll.designs});
 }
 await fs.copyFile(`${source}/LICENSE`,'dist/showcase/LICENSE');
 await fs.mkdir('dist/reference/branches',{recursive:true});
 await fs.writeFile('dist/reference/catalogue.json',JSON.stringify(BRANCHES));
 for(const b of BRANCHES)await fs.writeFile(`dist/reference/branches/${b.id}.md`,renderBranch(b));
 const meta=cases.flatMap(c=>c.designs.map(d=>({caseId:c.id,slug:d.slug,branchId:d.branch.id,name:d.branch.name,subject:c.subject})));
 await fs.writeFile('dist/reference/examples.json',JSON.stringify(meta));
 const css=await fs.readFile('studio/reference.css','utf8');
 for(const lang of ['zh','en']){
 const zh=lang==='zh';const groups=cases.map((c,i)=>`<section class="case" id="${e(c.id)}"><div class="section-head"><span class="index">0${i+1}</span><div><h2>${e(c.subject)}</h2><p>${zh?'同一份内容，五个独立设计方向':'One fact sheet, five distinct design executions'}</p></div><a class="text-link" href="${c.id}/compare.html">${zh?'并排比较':'Compare all five'} ↗</a></div><div class="case-grid">${c.designs.map(d=>`<article class="example"><a href="${c.id}/previews/${d.slug}.html"><img src="${c.id}/screenshots/${d.slug}-desktop.png" alt="${e(d.branch.name[lang])}" loading="lazy"></a><div class="caption"><h3>${e(d.branch.name[lang])}</h3><span>${e(d.short)}</span></div><div class="links"><a href="${c.id}/previews/${d.slug}.html">${zh?'打开完整网页':'Open full page'} ↗</a><a href="${c.id}/briefs/${d.slug}.md">Brief</a><a href="../reference/?branch=${d.branch.id}&lang=${lang}">${zh?'使用这套规则':'Use this direction'}</a></div></article>`).join('')}</div></section>`).join('');
 const html=`<!doctype html><html lang="${zh?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Random Design · ${zh?'设计作品集':'Design collection'}</title><style>${css}</style></head><body><div class="wrap"><nav><a class="wordmark" href="../">RANDOM DESIGN<span>↗</span></a><div><a href="../reference/?lang=${lang}">${zh?'40 套设计规则':'40 design directions'}</a><a href="../presets/${zh?'':'en.html'}">${zh?'21 种固定风格':'21 fixed styles'}</a><a href="${zh?'en.html':'index.html'}">${zh?'EN':'中文'}</a></div></nav><header class="collection-header"><p class="eyebrow">THE DESIGN COLLECTION / 20 REAL PAGES</p><h1>${zh?'设计，落在内容里。':'Design follows<br>the story.'}</h1><p class="lead">${zh?'四个项目，二十种完整表达。保留 hash-design 中的原始页面、字体、细节与设计 brief，直接打开比较。':'Four projects, twenty full executions. Original hash-design pages, typography, details and briefs, preserved together.'}</p><p class="credit">${zh?'原始示例设计来自 qybaihe/hash-design，MIT 许可；迁入 random-design 独立仓库。':'Original examples by qybaihe/hash-design, MIT licensed; integrated into the independent random-design repository.'} <a href="LICENSE">MIT</a></p></header>${groups}<footer><a href="https://github.com/xingchenyd/random-design">xingchenyd/random-design</a> · ${zh?'独立维护 · 来源完整保留':'Independent maintenance · attribution preserved'}</footer></div></body></html>`;
 await fs.writeFile(`dist/showcase/${zh?'index':'en'}.html`,html);
 }
 console.log(`Preserved ${cases.length} example projects / ${meta.length} pages / ${BRANCHES.length} reference branches`);
}
