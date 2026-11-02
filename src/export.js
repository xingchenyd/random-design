import fs from 'node:fs/promises';
import path from 'node:path';
import { brief, compareHtml, pageHtml, tokensCss } from './render.js';
import { graphicSvg } from './core/graphics.js';
import { writePresentation } from './pptx.js';

export async function writeBundle(bundle, directory, { content = {}, pptx = true } = {}) {
  const target = path.resolve(directory);
  // Never overwrite a prior roll or a user's directory.
  await fs.mkdir(path.dirname(target), { recursive: true });
  try { await fs.access(target); throw new Error(`Output already exists: ${target}. Choose a new directory.`); } catch (err) { if (err.code !== 'ENOENT') throw err; }
  const staging = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.mkdir(staging);
  const language = bundle.request.language;
  try {
    await fs.writeFile(path.join(staging, 'roll.json'), JSON.stringify(bundle, null, 2));
    await fs.writeFile(path.join(staging, 'compare.html'), compareHtml(bundle, { language, content, pptx }));
    await fs.writeFile(path.join(staging, 'history.json'), JSON.stringify({ schema: 1, entries: (await import('./core/index.js')).historyEntries(bundle) }, null, 2));
    for (const [index, d] of bundle.designs.entries()) {
      const dest = path.join(staging, String(index + 1).padStart(2, '0'));
      await fs.mkdir(dest);
      await Promise.all([
        fs.writeFile(path.join(dest, 'design.json'), JSON.stringify(d, null, 2)),
        fs.writeFile(path.join(dest, 'tokens.css'), tokensCss(d)),
        fs.writeFile(path.join(dest, 'graphic.svg'), graphicSvg(d)),
        fs.writeFile(path.join(dest, 'brief.md'), brief(d, { language })),
        fs.writeFile(path.join(dest, 'page.html'), pageHtml(d, { language, content }))
      ]);
      if (pptx) await writePresentation(d, path.join(dest, 'theme.pptx'), { language, content });
    }
    await fs.rename(staging, target);
    return target;
  } catch (err) {
    // Only our freshly created staging directory is removed.
    await fs.rm(staging, { recursive: true, force: true }); throw err;
  }
}
