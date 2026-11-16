/**
 * hash-design — random-hash–driven design directions.
 *
 *   roll()          true-random (or seeded) hashes → distinct designs via a fixed decision tree
 *   renderBrief()   one design → frozen Markdown brief (tokens, fonts, palette, layout, bans)
 *   critiquePage()  static "AI-template" critique of an HTML page (+ brief adherence)
 *   buildComparePage() side-by-side light table for the rendered previews
 */
export * from './types.js';
export { BANS, BANNED_FONTS, BUZZWORDS_EN, BUZZWORDS_ZH, banIds, isBannedFont } from './data/bans.js';
export { BRANCHES } from './data/branches/index.js';
export { DENSITIES, DENSITY_ORDER, SCALES, SCALE_ORDER, TWISTS, VOICES } from './data/pools.js';
export {
  ALGORITHM,
  formatRef,
  hashBytes,
  isHash,
  parseRef,
  randomHash,
  rollHashes,
  seededHash,
  sha256Hex,
  shortHash,
  type DesignRef,
} from './hash.js';
export {
  BYTE_MAP,
  branchPool,
  describeConstraints,
  getBranch,
  libraryFingerprint,
  mapDesign,
  mapRoll,
  normalizeConstraints,
  primaryBranchIndex,
  type Constraints,
  type Design,
  type MapOptions,
  type NormalizedConstraints,
  type TraceStep,
} from './mapping.js';
export {
  briefJson,
  designSlug,
  normalizeContent,
  renderBrief,
  renderRoll,
  renderRollSummary,
  reproduce,
  roll,
  rollJson,
  type BriefJson,
  type BriefOptions,
  type Content,
  type Roll,
  type RollJson,
  type RollOptions,
} from './brief.js';
export {
  contrastReport,
  detectLanguage,
  fontStack,
  fontStacks,
  googleFontsUrl,
  tokensCss,
  typeScale,
  type Language,
} from './derive.js';
export {
  critiquePage,
  renderCritique,
  type CritiqueInput,
  type CritiqueResult,
  type Finding,
} from './critique.js';
export {
  buildComparePage,
  compareEntriesFromRoll,
  compareSubtitle,
  type CompareEntry,
  type CompareOptions,
} from './compare.js';
export { contrast, hexToHsl, isLightPaper, luminance, normalizeHex, parseCssColor } from './color.js';
export { FRAMEWORK_DEFAULT_HEX, validateBranch, validateLibrary } from './validate.js';
export { renderBranch, renderBranchCatalog, renderBranchList } from './catalog.js';
export { writeRoll, type WrittenRoll } from './files.js';
export {
  SKILL_BLOCK_BEGIN,
  SKILL_BLOCK_END,
  applySkillGeneratedBlock,
  readSkill,
  skillGeneratedBlock,
  skillPath,
} from './skill.js';
