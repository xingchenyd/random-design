import {BRANCHES,roll,renderBrief,reproduce,parseRef,rollJson,getBranch,renderBranch} from './generated/reference-runtime.js';
export {BRANCHES,getBranch,renderBranch};
export const REFERENCE_SOURCE={repository:'qybaihe/hash-design',commit:'e40a94239b50eaecf4b007af68d43237d7dded76',license:'MIT',integration:'random-design/reference-1'};
export function referenceBrief(design,content={}){
 // The user's wording is fixed. Upstream voice and copy-changing twists remain
 // in the archived source but are explicitly excluded from our active workflow.
 const raw=renderBrief(design,content).replace(/## 文案语气 Voice[\s\S]*?(?=\n## )/,'## Content preservation / 保留文案\n\nUse the supplied copy and facts verbatim. Do not apply a sampled copy voice.\n').replace(/## 变数 Twist[\s\S]*?(?=\n## )/,'## Content-aware composition / 根据内容编排\n\nUse the selected layout to organize the supplied information. No copy rewrite or arbitrary decoration.\n').replace(/^- \[ \] Copy is written.*$/m,'- [ ] Supplied wording and facts are preserved').replace(/^- \[ \] Twist .*$/m,'- [ ] Layout and illustrations serve the supplied content');
 return `> Imported visual rules by qybaihe (MIT), integrated in random-design. This specification requires content-aware execution; it is not a generated finished page.\n\n${raw.replace(/^- \[ \] `critique_page`.*$/m,'- [ ] Review the rendered page on desktop and mobile; automated checks are not an aesthetic judgment')}`;
}
export function referenceRoll({subject='Untitled',facts=[],language='zh',count=5,seed,include=[],exclude=[]}={}){
 if(typeof subject!=='string'||subject.length>1000||!Array.isArray(facts)||facts.length>100||facts.some(v=>typeof v!=='string'||v.length>4000))throw new Error('Invalid reference content');
 if(!Number.isInteger(count)||count<1||count>12)throw new Error('count must be 1–12');
 if(!['zh','en'].includes(language))throw new Error('Unsupported language');
 const r=roll({count,seed,content:{subject,facts,language},constraints:{include,exclude}});
 return {source:REFERENCE_SOURCE,roll:rollJson(r),briefs:r.designs.map(d=>({id:d.branch.id,name:d.branch.name,ref:d.ref,markdown:referenceBrief(d,r.content)})),contentPolicy:'preserve supplied wording; ignore archived voice and twist',finishedPagesGenerated:false};
}
export function referenceFromRef(ref,{constraints={},content={}}={}){const design=reproduce(parseRef(ref),constraints);return {source:REFERENCE_SOURCE,design,markdown:referenceBrief(design,content)};}
