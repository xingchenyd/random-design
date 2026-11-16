import type { Branch } from '../../types.js';
import { documentBranches } from './document.js';
import { modernistCraftBranches } from './modernist-craft.js';
import { printBranches } from './print.js';
import { signageScreenBranches } from './signage-screen.js';

/**
 * Mapping order. ORDER IS PART OF THE ALGORITHM (branch = uint16(b0,b1) mod N, collisions walk forward).
 * Each family's members are spaced evenly around the cycle (position (k + offset) / familySize), so "walk
 * forward to the next free family" spreads the walked probability across many branches instead of piling it
 * onto whichever branch follows a family block.
 * Any change here changes the library fingerprint.
 */
export const BRANCH_ORDER: readonly string[] = [
  'supermarket-circular',
  'engineering-plate',
  'transit-wayfinding',
  'terminal-phosphor',
  'recipe-card',
  'letterpress-woodtype',
  'ledger-accounting',
  'swiss-grid',
  'photocopy-zine',
  'ticket-stub',
  'hk-shop-sign',
  'warm-handmade',
  'bauhaus-primary',
  'web1-homepage',
  'risograph-duotone',
  'academic-paper',
  'ink-and-seal',
  'record-sleeve',
  'apothecary-label',
  'constructivist-poster',
  'diner-menu-board',
  'game-manual',
  'varsity-sports',
  'bureaucratic-form',
  'chinese-almanac',
  'art-deco',
  'couture-lookbook',
  'gallery-catalogue',
  'thermal-receipt',
  'instrument-panel',
  'ma-whitespace',
  'broadsheet-newspaper',
  'seventies-supergraphic',
  'herbarium-specimen',
  'topographic-map',
  'editorial-magazine',
  'raw-brutalist',
  'field-guide-plate',
  'lab-notebook',
  'memphis-pop',
];

const all = [...printBranches, ...documentBranches, ...signageScreenBranches, ...modernistCraftBranches];
const byId = new Map(all.map((b) => [b.id, b]));
if (byId.size !== all.length) throw new Error('Duplicate branch id in branch files');
for (const id of byId.keys())
  if (!BRANCH_ORDER.includes(id)) throw new Error(`Branch ${id} missing from BRANCH_ORDER`);

/** The branch library, in mapping order. */
export const BRANCHES: readonly Branch[] = Object.freeze(
  BRANCH_ORDER.map((id) => {
    const b = byId.get(id);
    if (!b) throw new Error(`BRANCH_ORDER lists unknown branch ${id}`);
    return b;
  }),
);
