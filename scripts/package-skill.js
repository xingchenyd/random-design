import fs from 'node:fs/promises';
import JSZip from 'jszip';
import path from 'node:path';
const zip = new JSZip();
async function add(directory, relative) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name), name = `${relative}/${entry.name}`;
    if (entry.isDirectory()) await add(source, name); else zip.file(name, await fs.readFile(source));
  }
}
await add('skills/random-design', 'random-design');
await fs.mkdir('releases', { recursive: true });
await fs.writeFile('releases/random-design-skill.zip', await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log('releases/random-design-skill.zip');
