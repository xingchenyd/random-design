#!/usr/bin/env node
// Copies the Skill, README and LICENSE into packages/core before `npm pack` / `npm publish`.
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = join(root, 'packages', 'core');
await mkdir(join(pkg, 'skill'), { recursive: true });
await copyFile(join(root, 'skills', 'hash-design', 'SKILL.md'), join(pkg, 'skill', 'SKILL.md'));
await copyFile(join(root, 'LICENSE'), join(pkg, 'LICENSE'));
console.log('prepack: copied SKILL.md + LICENSE into packages/core');
