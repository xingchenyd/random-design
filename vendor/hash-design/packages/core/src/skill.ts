import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BANNED_FONTS, BANS } from './data/bans.js';
import { BRANCHES } from './data/branches/index.js';

/**
 * Locate SKILL.md: inside the published package it lives at <pkg>/skill/SKILL.md;
 * in a repo checkout it lives at <repo>/skills/hash-design/SKILL.md.
 */
export function skillPath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, '..', 'skill', 'SKILL.md'),
    join(here, '..', '..', '..', 'skills', 'hash-design', 'SKILL.md'),
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error(`SKILL.md not found (looked in ${candidates.join(', ')})`);
  return found;
}

export function readSkill(): string {
  return readFileSync(skillPath(), 'utf8');
}

export const SKILL_BLOCK_BEGIN = '<!-- BEGIN GENERATED: bans (npm run sync) -->';
export const SKILL_BLOCK_END = '<!-- END GENERATED: bans -->';

/** The part of SKILL.md that is generated from data (bans, banned fonts, branch count). */
export function skillGeneratedBlock(): string {
  const lines = [
    SKILL_BLOCK_BEGIN,
    `### 全局禁令（${BANS.length} 条，与 hash-design 数据同步）`,
    '',
    ...BANS.map((b) => `- **${b.title.zh}** (\`${b.id}\`, ${b.severity})`),
    '',
    `禁用字体：${BANNED_FONTS.join(', ')}。`,
    '',
    `分支库：${BRANCHES.length} 个分支（\`list_branches\` 查看，\`get_branch\` 看细节）。`,
    SKILL_BLOCK_END,
  ];
  return lines.join('\n');
}

/** Replace the generated block inside a SKILL.md text. */
export function applySkillGeneratedBlock(text: string): string {
  const start = text.indexOf(SKILL_BLOCK_BEGIN);
  const end = text.indexOf(SKILL_BLOCK_END);
  if (start < 0 || end < 0) throw new Error('SKILL.md is missing the generated-block markers');
  return text.slice(0, start) + skillGeneratedBlock() + text.slice(end + SKILL_BLOCK_END.length);
}
