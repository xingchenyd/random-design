import fs from 'node:fs/promises';
import { generate } from '../src/core/index.js';
import { writeBundle } from '../src/export.js';

// Deterministic fixtures are isolated from personal history. A new version must regenerate all fixtures.
const out = process.env.EXAMPLE_OUT ?? 'examples';
const bundle = generate({ seed: 'random-design-public-demo-v1', count: 5, scenario: 'general', language: 'zh' });
await writeBundle(bundle, out);
const english = { ...bundle, request: { ...bundle.request, language: 'en' } };
await writeBundle(english, `${out}/english`);
console.log(`Wrote ${bundle.designs.length * 2} web + six-slide PPTX examples into ${out}`);
