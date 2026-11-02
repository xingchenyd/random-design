import { build } from 'esbuild';
import fs from 'node:fs/promises';
await fs.mkdir('dist', { recursive: true });
await build({ entryPoints: { app: 'studio/app.js', 'random-design': 'src/core/index.js' }, bundle: true, splitting: true, format: 'esm', platform: 'browser', outdir: 'dist', target: 'es2022', minify: true, sourcemap: false, legalComments: 'linked' });
await Promise.all(['index.html', 'studio.css'].map(f => fs.copyFile(`studio/${f}`, `dist/${f}`)));
await fs.cp('examples', 'dist/examples', { recursive: true }).catch(err => { if (err.code !== 'ENOENT') throw err; });
console.log('Built static studio + standalone browser engine in dist/');
