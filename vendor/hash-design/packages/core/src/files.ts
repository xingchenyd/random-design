import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { type Roll, designSlug, renderBrief, renderRollSummary, rollJson } from './brief.js';

export interface WrittenRoll {
  dir: string;
  files: string[];
}

/**
 * Freeze a roll on disk:
 *   <dir>/roll.json            machine-readable (refs, constraints, content, brief JSON)
 *   <dir>/ROLL.md              summary table + refs
 *   <dir>/briefs/01-<branch>.md one frozen brief per design
 */
export async function writeRoll(r: Roll, dir: string): Promise<WrittenRoll> {
  const root = resolve(dir);
  await mkdir(join(root, 'briefs'), { recursive: true });
  const files: string[] = [];
  const write = async (rel: string, body: string) => {
    await writeFile(join(root, rel), body.endsWith('\n') ? body : `${body}\n`, 'utf8');
    files.push(rel);
  };
  await write('roll.json', JSON.stringify(rollJson(r), null, 2));
  await write('ROLL.md', renderRollSummary(r));
  for (const [i, d] of r.designs.entries()) {
    await write(`briefs/${designSlug(d, i)}.md`, renderBrief(d, r.content, { number: i + 1 }));
  }
  return { dir: root, files };
}
