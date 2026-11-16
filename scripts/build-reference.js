import {build} from 'esbuild';
import path from 'node:path';
export async function buildReference(){
 await build({entryPoints:['src/reference-entry.js'],outfile:'src/generated/reference-runtime.js',bundle:true,format:'esm',platform:'neutral',target:'es2022',legalComments:'inline',banner:{js:'// Derived from qybaihe/hash-design e40a942 (MIT). See vendor/hash-design/LICENSE.'},plugins:[{name:'portable-crypto',setup(b){b.onResolve({filter:/^node:crypto$/},()=>({path:path.resolve('src/reference-crypto.js')}));}}]});
 await build({stdin:{contents:"export {critiquePage} from './vendor/hash-design/packages/core/src/critique.ts';",resolveDir:process.cwd()},outfile:'src/generated/reference-critique.js',bundle:true,format:'esm',platform:'node',packages:'external',target:'node22',banner:{js:'// Derived from qybaihe/hash-design e40a942 (MIT). See vendor/hash-design/LICENSE.'}});
}
if(process.argv[1]?.endsWith('build-reference.js'))await buildReference();
