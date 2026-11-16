/**
 * hash-design data model.
 *
 * A *branch* is a design school / real-world artifact genre (supermarket circular, engineering plate, …).
 * Each branch owns several concrete options per dimension; bytes of a hash pick one option per dimension.
 * Everything here is plain data so it can be serialised into briefs, MCP responses and tests.
 */

/** Bilingual text. `zh` is the primary language of briefs; `en` is used for English briefs and docs. */
export interface Bilingual {
  zh: string;
  en: string;
}

export type BranchFamily =
  | 'print' // printed ephemera: flyers, posters, zines, letterpress
  | 'document' // forms, papers, ledgers, labels, manuals
  | 'signage' // wayfinding, shop signs, menus, boards
  | 'screen' // terminals, early web, game UIs, instruments
  | 'craft' // handmade, ink, textile, scrapbook
  | 'modernist'; // Swiss, Bauhaus, constructivism, deco, Memphis

export type FontSource = 'google' | 'system';

export interface FontSpec {
  /** Exact family name as published on Google Fonts (or a system font name when source = 'system'). */
  family: string;
  /** Weights to load / use. */
  weights: number[];
  /** Whether italics are part of the voice. */
  italic?: boolean;
  /** CSS fallback stack appended after the family. Never include banned families. */
  fallback: string;
  source: FontSource;
}

export interface TypePairing {
  id: string;
  name: string;
  display: FontSpec;
  body: FontSpec;
  mono?: FontSpec;
  /** CJK pairing for Chinese pages (Google Fonts family names, e.g. "Noto Serif SC"). */
  cjk: { display: string; body: string };
  /** Concrete setting rules: tracking, case, figures, features, sizes. */
  notes: string;
}

export interface PaletteColors {
  /** Page background. */
  paper: string;
  /** Primary text. Must reach ≥ 7:1 against paper. */
  ink: string;
  /** Secondary text. Must reach ≥ 4.5:1 against paper. */
  muted: string;
  /** Primary accent (fills, marks, big type). */
  accent: string;
  /** Secondary accent. */
  accent2: string;
  /** Hairlines, borders, rules. */
  rule: string;
  /** Secondary background for panels / blocks. */
  panel: string;
}

export interface Palette {
  id: string;
  name: string;
  colors: PaletteColors;
  /** How the colors are distributed (which element gets which color, proportions). */
  usage: string;
}

/** A generic named option with a concrete description. */
export interface Option {
  id: string;
  name: string;
  description: string;
}

export interface LayoutOption extends Option {
  /** Grid spec: columns, gutters, margins, baseline. */
  grid: string;
  /** Ordered section sketch, top to bottom. */
  structure: string[];
}

export interface MotionOption extends Option {
  /** e.g. "160ms" or "0ms" */
  duration: string;
  /** CSS easing, e.g. "steps(3, end)" or "cubic-bezier(.2,.7,.1,1)" */
  easing: string;
  /** What to do under prefers-reduced-motion. */
  reduced: string;
}

export interface SurfaceOption extends Option {
  /** Optional CSS hint that achieves the material (background-image, filters, borders). */
  css?: string;
}

export interface BranchTokens {
  /** Base grid description (overridden per layout where needed). */
  grid: string;
  /** Corner radius policy with concrete values. */
  radius: string;
  /** Border / rule policy with concrete values. */
  border: string;
  /** Shadow policy with concrete values ("none" is a valid, common answer). */
  shadow: string;
}

export type DensityId = 'airy' | 'regular' | 'compact' | 'packed';
export type ScaleId =
  | 'major-second'
  | 'minor-third'
  | 'major-third'
  | 'perfect-fourth'
  | 'augmented-fourth'
  | 'perfect-fifth'
  | 'golden';

export interface Branch {
  /** kebab-case, unique, stable (part of the mapping). */
  id: string;
  name: Bilingual;
  family: BranchFamily;
  /** 2–3 sentences: what this direction is and what it feels like. */
  concept: Bilingual;
  /** Real-world reference artifacts / designers / periods. Not websites. */
  references: string[];
  keywords: string[];
  tokens: BranchTokens;
  layouts: LayoutOption[];
  type: TypePairing[];
  palettes: Palette[];
  /** Allowed densities (subset of the global pool), in preference order. */
  densities: DensityId[];
  /** Allowed modular scales (subset of the global pool), in preference order. */
  scales: ScaleId[];
  motion: MotionOption[];
  motifs: Option[];
  /** The signature hero / first-screen element. */
  anchors: Option[];
  surfaces: SurfaceOption[];
  /** Branch-specific musts. */
  must: string[];
  /** Branch-specific don'ts (in addition to global bans). */
  mustNot: string[];
}

export interface Density {
  id: DensityId;
  name: Bilingual;
  /** Root font size in px. */
  baseSize: number;
  /** Body line-height. */
  lineHeight: number;
  /** Spacing unit in px. */
  unit: number;
  /** Vertical padding between major sections, px. */
  sectionGap: number;
  /** Max content width, px. */
  maxWidth: number;
  description: string;
}

export interface Scale {
  id: ScaleId;
  name: string;
  ratio: number;
}

export interface Voice {
  id: string;
  name: Bilingual;
  /** How copy should be written. */
  description: string;
  /** Structural devices that the copy should use. */
  devices: string[];
  /** One short example line (subject-agnostic). */
  example: string;
}

export interface Twist {
  id: string;
  name: Bilingual;
  description: string;
}

export type BanSeverity = 'critical' | 'major' | 'minor';

export interface Ban {
  id: string;
  title: Bilingual;
  /** What exactly is banned and why. */
  detail: string;
  severity: BanSeverity;
  /** Whether critique_page can detect it automatically. */
  detectable: boolean;
}
