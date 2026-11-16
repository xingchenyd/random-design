import type { Branch } from '../../types.js';

/**
 * Exemplar branch. This is the quality bar for every other branch:
 * concrete tokens, real hex values, real Google Fonts families, specific layout sketches,
 * and options that are genuinely different from each other.
 */
export const supermarketCircular: Branch = {
  id: 'supermarket-circular',
  name: { zh: '超市促销单', en: 'Supermarket circular' },
  family: 'print',
  concept: {
    zh: '周末塞进信箱的超市促销单：新闻纸、压满的价格、爆炸星价签、红黄两色套印。信息越多越可信，秩序来自粗线分格与巨大的数字，而不是留白。',
    en: 'The weekend supermarket flyer: newsprint, crammed prices, starburst price tags, red-and-yellow two-colour print. Credibility comes from abundance; order comes from heavy rules and giant numerals, not whitespace.',
  },
  references: [
    '1990s Tesco / Safeway weekly circulars',
    '华润万家、大润发 DM 促销单',
    'Japanese チラシ supermarket flyers',
    'Sale signage with hand-cut price cards',
  ],
  keywords: ['价签', '爆炸星', '新闻纸', '粗线分格', '限时', '套印'],
  tokens: {
    grid: '12 columns, 8px gutter, 16px outer margin; modules snap to a 4px baseline; cells are separated by 3px ink rules, never by gaps alone.',
    radius:
      '0 for every box. Price bursts are SVG star polygons (16–24 points). Only coupon corners may use a 50% notch made with radial-gradient.',
    border:
      '3px solid ink between modules; 2px dashed ink for cut-out coupons; 6px accent band under the masthead.',
    shadow:
      'none. The only allowed depth is a hard 4px 4px 0 offset in accent2 behind price bursts (misregistration).',
  },
  layouts: [
    {
      id: 'grid-of-deals',
      name: 'Grid of deals',
      description:
        'A dense mosaic of unequal deal cells; the hero is simply the biggest cell (2×2) holding the headline item.',
      grid: '12 col; cells span 3, 4 or 6 columns; one 6×2 hero cell top-left; rows auto, min 160px.',
      structure: [
        'Masthead band: store name huge, flush-left; validity dates in a reversed strip on the right',
        'Deal mosaic: 1 hero cell (6 col × 2 rows) + 6–9 smaller cells of mixed widths',
        'Coupon strip: 2–3 dashed coupons with cut marks',
        'Opening hours + address set as a ruled table',
        'Fine print footer in 11px condensed',
      ],
    },
    {
      id: 'front-page-splash',
      name: 'Front-page splash',
      description:
        'Cover of the circular: one giant product name with a giant price, diagonal "THIS WEEK" banner, then aisle-by-aisle listings.',
      grid: '12 col; splash spans full width; listings run in 3 columns with 3px vertical rules.',
      structure: [
        'Splash: headline item, price at 30vw, diagonal banner crossing the corner',
        'Aisle index: numbered aisles as a horizontal strip',
        'Three-column listings with dot leaders to prices',
        'Coupon + hours side by side',
        'Footer with fine print and store map as a simple ruled diagram',
      ],
    },
    {
      id: 'aisle-columns',
      name: 'Aisle columns',
      description:
        'Organised like aisle signage: each section is a coloured column header (aisle number + category) with items stacked below.',
      grid: '4 equal columns on desktop (2 on tablet, 1 on mobile); headers are 64px reversed bands.',
      structure: [
        'Thin masthead with store name and date range',
        'Four aisle columns, each with a reversed header band and 3–5 items',
        'Full-width "manager’s special" band across the middle',
        'Hours/contact as a receipt-like block',
      ],
    },
  ],
  type: [
    {
      id: 'anton-archivo',
      name: 'Anton + Archivo Narrow',
      display: {
        family: 'Anton',
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Archivo Narrow',
        weights: [400, 600, 700],
        fallback: '"Arial Narrow", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Display always uppercase, tracking 0, line-height 0.86. Prices: currency sign at 40% size, superscript cents. Body 600 for item names, 400 for specs.',
    },
    {
      id: 'bebas-barlow',
      name: 'Bebas Neue + Barlow Semi Condensed',
      display: { family: 'Bebas Neue', weights: [400], fallback: 'Impact, sans-serif', source: 'google' },
      body: {
        family: 'Barlow Semi Condensed',
        weights: [500, 700, 800],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Bebas for prices and section headers only; Barlow 800 italic for "SAVE" call-outs. Tabular figures in tables (font-variant-numeric: tabular-nums).',
    },
    {
      id: 'alfa-chivo',
      name: 'Alfa Slab One + Chivo',
      display: { family: 'Alfa Slab One', weights: [400], fallback: 'Rockwell, serif', source: 'google' },
      body: { family: 'Chivo', weights: [400, 700, 900], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Slab display for the store name and prices — feels like a 1970s independent grocer. Chivo 900 for item names. Never letter-space the slab.',
    },
  ],
  palettes: [
    {
      id: 'red-yellow-newsprint',
      name: 'Red / yellow on newsprint',
      colors: {
        paper: '#f4f0e4',
        ink: '#161412',
        muted: '#4f4a42',
        accent: '#d7261e',
        accent2: '#ffd400',
        rule: '#161412',
        panel: '#ffd400',
      },
      usage:
        'Red for prices and bursts (≈15% of area); yellow for panels behind deals (≈25%); everything else ink on newsprint.',
    },
    {
      id: 'green-grocer',
      name: 'Green grocer',
      colors: {
        paper: '#fbfaf3',
        ink: '#10231a',
        muted: '#3e5247',
        accent: '#0d8a3f',
        accent2: '#ff6a13',
        rule: '#10231a',
        panel: '#e3f1d4',
      },
      usage: 'Green headers and price bursts; orange only for "today only" flags. Panels pale green.',
    },
    {
      id: 'discount-blue',
      name: 'Discount blue',
      colors: {
        paper: '#ffffff',
        ink: '#0a1a3c',
        muted: '#3a4766',
        accent: '#0047bb',
        accent2: '#ffde17',
        rule: '#0a1a3c',
        panel: '#e8eefb',
      },
      usage:
        'Blue reversed bands for aisle headers, yellow bursts with blue prices. No gradients: flat process colours only.',
    },
  ],
  densities: ['packed', 'compact'],
  scales: ['perfect-fifth', 'golden', 'augmented-fourth'],
  motion: [
    {
      id: 'price-flip',
      name: 'Price flip',
      description:
        'On hover a price card flips its colours (accent ↔ paper) instantly, like a hand-turned card.',
      duration: '0ms',
      easing: 'steps(1, end)',
      reduced: 'Same behaviour — it is a colour swap, not movement.',
    },
    {
      id: 'burst-wobble',
      name: 'Burst wobble',
      description: 'Price bursts rotate ±4° in two steps on hover; nothing else moves.',
      duration: '240ms',
      easing: 'steps(2, jump-none)',
      reduced: 'Disable rotation; keep a colour change.',
    },
    {
      id: 'still',
      name: 'Still print',
      description: 'No motion at all. Hover states are underline + colour only.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'starburst',
      name: 'Starburst price tags',
      description: 'SVG polygon bursts (18 points, inner radius 82%) holding prices; slight -6° rotation.',
    },
    {
      id: 'coupon-cut',
      name: 'Coupon cut lines',
      description:
        'Dashed 2px borders with a ✂ glyph (typographic, not emoji) at the corner and "剪下 / CUT" labels.',
    },
    {
      id: 'diagonal-banner',
      name: 'Diagonal banner',
      description: 'A full-bleed 45° band crossing one corner carrying "本周特价 / THIS WEEK ONLY".',
    },
  ],
  anchors: [
    {
      id: 'giant-price',
      name: 'Giant price',
      description: 'The first screen is dominated by one price set at 25–35vw in the display face.',
    },
    {
      id: 'masthead-band',
      name: 'Masthead band',
      description:
        'A full-width reversed masthead with the store name at maximum width (fit-to-width) and a date strip.',
    },
    {
      id: 'deal-mosaic',
      name: 'Deal mosaic',
      description: 'No single hero: the first screen is already the dense mosaic of 6+ deal cells.',
    },
  ],
  surfaces: [
    {
      id: 'newsprint',
      name: 'Newsprint',
      description: 'Off-white newsprint with faint grain; ink looks slightly heavy.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.035) 1px, transparent 1px); background-size: 3px 3px;',
    },
    {
      id: 'glossy-insert',
      name: 'Glossy insert',
      description: 'Bright white coated stock: flat colours, very crisp edges, no texture.',
    },
    {
      id: 'halftone',
      name: 'Halftone tint',
      description: 'Panels filled with an accent halftone dot screen instead of flat tints.',
      css: 'background-image: radial-gradient(var(--accent) 28%, transparent 30%); background-size: 6px 6px;',
    },
  ],
  must: [
    'Prices and times are the largest typographic elements on the page.',
    'Every module is separated by a visible ink rule.',
    'At least one dashed coupon with a real, specific offer taken from the facts (or omit coupons).',
  ],
  mustNot: [
    'No whitespace-led luxury layout; empty areas larger than one module are a failure.',
    'No rounded cards, no photos with drop shadows.',
    'Do not invent discounts or prices that are not in the facts.',
  ],
};
