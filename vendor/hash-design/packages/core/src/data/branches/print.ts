import type { Branch } from '../../types.js';
import { supermarketCircular } from './_exemplar.js';

const letterpressWoodtype: Branch = {
  id: 'letterpress-woodtype',
  name: { zh: '凸版木活字', en: 'Letterpress wood type' },
  family: 'print',
  concept: {
    zh: '维多利亚时代的木活字海报与戏单：一行换一种字体，每行字号都撑满版心，粗细线与花饰把每一档信息隔开。油墨在字边挤出更深的轮廓，纸面留下轻微压痕，第二个颜色要再过一次印机。',
    en: "The Victorian wood-type poster and playbill: a different typeface on every line, each line sized to fill the measure, printer's rules and fleurons between every tier of information. Ink squeezes into a darker rim at the letter edges, the paper keeps a faint bite, and the second colour needs a second pass through the press.",
  },
  references: [
    'P.T. Barnum circus & American Museum broadsides (1850s–1880s)',
    'Hatch Show Print, Nashville — Grand Ole Opry & concert posters',
    'William H. Page and Hamilton wood type specimen books (1870s–1900s)',
    'Rob Roy Kelly, "American Wood Type 1828–1900" (1969)',
    'Theatre Royal Drury Lane playbills (1830s–1840s)',
  ],
  keywords: ['木活字', '戏单', '一行一字体', '撑满行宽', '压痕', '双色过版', '花饰分隔线'],
  tokens: {
    grid: 'One composing measure, max 920px, 24px outer margin; every line is its own slug fitted to the full measure; vertical rhythm in multiples of 12px (one nonpareil).',
    radius:
      '0 everywhere. Corners are made with typographic units (✣ ❦ or SVG fleurons) placed in the corner, never border-radius.',
    border:
      "Printer's rules only: 1px hairline, 3px thick, and the Oxford rule (6px solid + 1px solid, 3px apart, built with border-top + an ::after line). Dotted brass rule = 2px dotted ink.",
    shadow:
      'none. Ink squeeze = text-shadow: 0 0 .6px currentColor; second-colour misregistration = a 1–2px offset copy in accent2 behind display lines.',
  },
  layouts: [
    {
      id: 'playbill-tiers',
      name: 'Playbill tiers',
      description:
        'A tall broadside where every line is a separate tier: face, size and colour change line by line, all lines justified to the same width, tiers separated by rules and fleuron rows.',
      grid: '1 column, measure min(860px, 100% - 48px); each tier fit-to-width with clamp() font-size; 12px baseline; 1px or Oxford rule between tiers.',
      structure: [
        'Header tier: presenter or venue in small spaced caps between two hairlines (e.g. "THEATRE ROYAL · TONIGHT")',
        'Headline tier: the subject name in the biggest wood face, fitted to the full measure, in accent',
        'Three to five descending tiers — what, who, where — each in a different face and size, separated by an Oxford rule or a fleuron row',
        'Time & admission tier: a two-cell ruled table with ☞ manicules pointing at the hour and the price',
        "Imprint line at the foot: printer's credit and date in 10px caps flanked by 40px rules",
      ],
    },
    {
      id: 'hatch-show-split',
      name: 'Hatch Show split',
      description:
        'A Hatch Show-style concert poster: the top half is a solid block of colour with letters reversed out, a flat "cut-wood" shape overprints the seam, and the lower half is black type on raw paper.',
      grid: 'Top band 55vh solid accent; lower band 6 columns, 16px gutter; type blocks span 2, 4 or 6 columns.',
      structure: [
        'Top colour block: date strip along its top edge, headline reversed out in the heaviest wood face across the full width',
        'Cut-wood block: one flat SVG shape (star, banner, arrow) in accent2 straddling the seam between the two halves',
        'Lower half: who/what stacked in two faces on 4 columns, times and dates on the remaining 2 columns',
        'Bottom tier: venue in wide caps, address and price in small type, the whole tier boxed by 3px rules',
      ],
    },
    {
      id: 'specimen-sheet',
      name: 'Type-specimen sheet',
      description:
        'Laid out like a wood-type foundry specimen page: every fact is a numbered specimen row set in its own face, with the line size noted in a left rail.',
      grid: '12 col, 20px gutter; columns 1–2 are a rail for specimen numbers and line sizes ("No. 117 · 10-LINE"); content in 3–12; 12px baseline.',
      structure: [
        'Specimen header: the subject name set like a foundry title, with a year and a place line under an Oxford rule',
        'Specimen rows: one fact per row, each row a different face, with "No. 5xx · n-LINE" in the rail',
        'Ornament specimen strip (a row of fleurons and rules) used as the section divider',
        'Price list styled as the foundry price table ("per font / per line") holding real prices or times from the facts',
        'Colophon block: printer, address, date in the body face, centred under a short rule',
      ],
    },
  ],
  type: [
    {
      id: 'rye-oldstandard',
      name: 'Rye + Old Standard TT',
      display: { family: 'Rye', weights: [400], fallback: 'Rockwell, Georgia, serif', source: 'google' },
      body: {
        family: 'Old Standard TT',
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Rye only in capitals at ≥48px, tracking 0.02em, line-height 0.9; never two Rye lines in a row — alternate with Old Standard TT 700 caps and Old Standard 400 italic connective lines ("for one night only"). Each display line is sized to fill the measure, not to a scale step. Body 18px/1.45, lining figures. Use real glyphs ☞ ❦ ✣ from the font, never emoji.',
    },
    {
      id: 'abril-caslon',
      name: 'Abril Fatface + Libre Caslon Text',
      display: {
        family: 'Abril Fatface',
        weights: [400],
        fallback: '"Bodoni 72", Didot, serif',
        source: 'google',
      },
      body: {
        family: 'Libre Caslon Text',
        weights: [400, 700],
        italic: true,
        fallback: 'Caslon, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Fat-face for the main tier in caps or upper/lower, tracking -0.01em, line-height 0.95. Secondary tiers in Libre Caslon Text 700 caps tracked +0.12em; italic Caslon at 1.6× body size for "and", "with", "at". Body 17px/1.5. Chinese display in Noto Serif SC 900.',
    },
    {
      id: 'holtwood-fell',
      name: 'Holtwood One SC + IM Fell English',
      display: {
        family: 'Holtwood One SC',
        weights: [400],
        fallback: 'Rockwell, Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'IM Fell English',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Chiron Sung HK', body: 'Noto Serif SC' },
      notes:
        'Holtwood is caps-only: line-height 0.9, tracking 0.04em, never below 28px; use it for at most 3 tiers. IM Fell English roman for body 18px/1.5 and italic for connective tiers; its rough edges stand in for worn metal. A rule separates every change of face.',
    },
  ],
  palettes: [
    {
      id: 'vermilion-on-cream',
      name: 'Black & vermilion on cream',
      colors: {
        paper: '#f2e8d5',
        ink: '#1b1714',
        muted: '#5a4e42',
        accent: '#c8321e',
        accent2: '#d9a23a',
        rule: '#1b1714',
        panel: '#e6d6b8',
      },
      usage:
        'Ink black for ~70% of the type; vermilion for the headline tier and one fleuron row (~15%); ochre only as the misregistered second-pass offset and a single tint band; cream paper everywhere else.',
    },
    {
      id: 'canary-stock',
      name: 'Canary poster stock',
      colors: {
        paper: '#f2d74a',
        ink: '#151210',
        muted: '#4a3d14',
        accent: '#b8241c',
        accent2: '#1a3f73',
        rule: '#151210',
        panel: '#e3c331',
      },
      usage:
        'The whole sheet is canary-yellow stock; black carries all text and rules; red on 1–2 tiers only; dark blue reserved for the cut-wood shape or the date tablet (<10%).',
    },
    {
      id: 'gold-on-black-stock',
      name: 'Gold & white on black stock',
      colors: {
        paper: '#1c1a17',
        ink: '#efe6d2',
        muted: '#b3a78f',
        accent: '#e2b33c',
        accent2: '#c9452f',
        rule: '#efe6d2',
        panel: '#2a2622',
      },
      usage:
        'Opaque cream ink on black board for text and rules; gold for the headline tier and fleurons (~15%); red only for a single date tablet. No other colours.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'platen-kiss',
      name: 'Platen kiss',
      description:
        'On first paint the headline tier "prints": it goes from scale(1.015) with 60% ink to scale(1) with full ink in one press stroke — the platen meeting the forme.',
      duration: '220ms',
      easing: 'cubic-bezier(.7,0,.3,1)',
      reduced: 'Render the printed state immediately.',
    },
    {
      id: 'second-pass',
      name: 'Second-colour pass',
      description:
        'On hover of a tier, its accent2 offset copy travels from 6px off to its 1–2px resting misregistration in three jerky steps, like re-feeding the sheet.',
      duration: '160ms',
      easing: 'steps(3, end)',
      reduced: 'Keep the static 1px offset; no travel.',
    },
    {
      id: 'still',
      name: 'Still broadside',
      description: 'No motion. Links change to accent and gain a 1px rule underneath on hover.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'manicules-fleurons',
      name: 'Manicules & fleurons',
      description:
        '☞ pointing hands before key lines and rows of ❦ / ✣ fleurons (set from the body font at 0.6em, letter-spacing 0.6em) between tiers.',
    },
    {
      id: 'oxford-rules',
      name: 'Oxford & Scotch rules',
      description:
        'Thick-thin double rules (6px + 1px, 3px apart) across the full measure, and short centred 60px rules flanking small-caps lines.',
    },
    {
      id: 'border-tablet',
      name: 'Cast-border tablet',
      description:
        'Key facts (date, price) inside a rectangular tablet framed by a double rule with a ✣ unit in each corner, like a cast border made from metal units.',
    },
  ],
  anchors: [
    {
      id: 'full-measure-headline',
      name: 'Full-measure headline',
      description:
        'The subject name fitted to the full measure (clamp(64px, 14vw, 220px)) in accent, sitting between two Oxford rules.',
    },
    {
      id: 'five-face-stack',
      name: 'Five-face stack',
      description:
        'The first screen is a stack of 5–7 justified lines, each in a different face/size/colour combination; no single line dominates by more than 2×.',
    },
    {
      id: 'reversed-date-tablet',
      name: 'Reversed date tablet',
      description:
        'A solid accent tablet holding the date in reversed wood letters at 12vw, sitting top-right and overlapping the headline tier by one line.',
    },
  ],
  surfaces: [
    {
      id: 'cotton-rag-bite',
      name: 'Cotton rag with bite',
      description:
        'Soft rag paper with fibre speckle; display type looks pressed in (debossed) by a light highlight under each letter.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(60,40,20,.05) 1px, transparent 1.2px), radial-gradient(rgba(60,40,20,.035) 1px, transparent 1.2px); background-size: 5px 5px, 7px 7px; background-position: 0 0, 2px 3px; /* headline */ text-shadow: 0 1px 0 rgba(255,255,255,.35), 0 -1px 0 rgba(0,0,0,.15);',
    },
    {
      id: 'worn-wood',
      name: 'Worn wood type',
      description:
        'Large letters show speckled voids where the end-grain is worn, applied only to display tiers through an SVG filter.',
      css: 'filter: url(#worn); /* <filter id="worn"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.4"/><feComposite in="SourceGraphic" operator="in"/></filter> */',
    },
    {
      id: 'coloured-stock',
      name: 'Coloured poster stock',
      description:
        'The whole page is one flat sheet of coloured paper (palette paper) with no texture; the second colour appears only as solid shapes.',
      css: 'background: var(--paper);',
    },
  ],
  must: [
    'Every display line is fitted to the full measure, and consecutive lines change face, size or colour.',
    "Tiers are separated by printer's rules or fleuron rows, never by empty space alone.",
    'No more than two ink colours plus paper, as in a two-pass press run.',
  ],
  mustNot: [
    'No sans-serif anywhere — wood-type bills had no geometric or humanist sans.',
    'No gradients, drop shadows or rounded corners; depth only from ink squeeze and misregistration.',
    'No ragged left-aligned headline blocks; display lines are centred and justified to the measure.',
  ],
};

const photocopyZine: Branch = {
  id: 'photocopy-zine',
  name: { zh: '复印小志', en: 'Photocopy zine' },
  family: 'print',
  concept: {
    zh: '七十到九十年代的朋克与 DIY 小志：复印机吐出的黑白页面，剪贴拼贴、透明胶带、勒索信式标题、手写批注，墨粉颗粒粗、对比过头，订书钉钉在页边。它看起来是剪刀和胶棒做出来的，不是排版软件。',
    en: 'The 1970s–90s punk and DIY zine: black-and-white pages straight off the photocopier, cut-and-paste collage, tape, ransom-note headlines, handwritten captions, toner grain pushed to harsh contrast, staples in the margin. It looks made with scissors and a glue stick, not with layout software.',
  },
  references: [
    "Sniffin' Glue (Mark Perry, 1976–77)",
    'Jamie Reid — Sex Pistols "God Save the Queen" sleeve & posters (1977)',
    'Raymond Pettibon — Black Flag / SST flyers (1978–85)',
    'Riot grrrl zines: Bikini Kill, Jigsaw (1990–93)',
    'Gee Vaucher — Crass Records booklets and posters',
  ],
  keywords: ['复印', '剪贴', '勒索信标题', '胶带', '手写批注', '订书钉', '墨粉颗粒'],
  tokens: {
    grid: 'A5 spread logic: two "pages" side by side (each max 560px) with an 8px fold gutter; inside, blocks sit on a loose 8px grid and are rotated −3° to +3°.',
    radius: '0. Torn edges via clip-path polygons with 10–16 jagged points; never border-radius.',
    border:
      '1.5px solid ink for pasted boxes; 2px dashed ink for cut lines; tape = 64×22px strips in paper colour at 70% opacity with 1px edges, rotated ±8°.',
    shadow:
      'none — the copier flattens everything. Allowed: a hard 2px 2px 0 ink offset on a pasted block (copier edge).',
  },
  layouts: [
    {
      id: 'cut-and-paste-spread',
      name: 'Cut-and-paste spread',
      description:
        'Two facing A5 pages with pasted fragments crossing the fold: a ransom headline across the top, typed text on torn scraps, a big high-contrast image box on the right page.',
      grid: '2 pages × 4 columns, 8px gutter; blocks snap loosely, rotate ±3° and may overlap neighbours by up to 20%.',
      structure: [
        'Ransom headline straddling the top of both pages, each letter on its own cut scrap',
        'Left page: typed intro on a torn scrap, taped at two corners',
        'Right page: threshold image (or a solid toner-black block with a reversed handwritten caption) with a jagged cut edge',
        'Lower band: 2–3 typed boxes (listings, letters, Q&A) with 1.5px rules, each rotated differently',
        'Back strip: issue number, price, contact address hand-lettered, staple marks in the margin',
      ],
    },
    {
      id: 'flyer-wall',
      name: 'Flyer wall',
      description:
        'A wall of overlapping gig flyers: one dominant A4 sheet holds the headline and date, with half-hidden sheets pasted behind it at different angles.',
      grid: 'Free collage over a 12-col reference grid; the primary sheet spans 7 columns rotated 2°; secondary sheets 3–5 columns, z-stacked.',
      structure: [
        'Primary flyer: subject name hand-markered, date and place typed on a pasted strip',
        'Second sheet peeking out on the right: typewritten facts, partly covered by the first',
        'Row of tear-off tabs along the bottom with the contact repeated vertically',
        'Rubber-stamped box with a single fact (date or price) slapped across a sheet edge',
      ],
    },
    {
      id: 'typewritten-issue',
      name: 'Typewritten issue',
      description:
        'A single typed column like a zine editorial: masthead pasted on top, then typewriter text with crossed-out words, inserted corrections and margin scrawls.',
      grid: 'Single 640px column on a 1ch grid; 96px left margin reserved for handwritten notes rotated −4°.',
      structure: [
        'Pasted masthead: zine title in marker over a crooked black bar, issue number and date typed beside it',
        'Editorial: typewritten paragraphs with strike-throughs and handwritten ^ insertions',
        'Margin notes in hand lettering connected to the text by drawn SVG arrows',
        'Pasted Q&A block: questions in typed caps, answers in regular',
        'Footer: "copy & pass on" line, mailing address, two staple marks',
      ],
    },
  ],
  type: [
    {
      id: 'marker-elite',
      name: 'Permanent Marker + Special Elite',
      display: {
        family: 'Permanent Marker',
        weights: [400],
        fallback: '"Marker Felt", cursive',
        source: 'google',
      },
      body: {
        family: 'Special Elite',
        weights: [400],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'Zhi Mang Xing', body: 'Noto Serif SC' },
      notes:
        'Marker headlines in uppercase, each word rotated between −4° and 1°, line-height 0.95, word sizes stepping irregularly (never two words the same size). Special Elite body 17px/1.55 keeps its worn texture; no bold — emphasis by a 2px hand-drawn SVG underline or CAPS.',
    },
    {
      id: 'rubik-courier',
      name: 'Rubik Mono One + Courier Prime',
      display: {
        family: 'Rubik Mono One',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Courier Prime',
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Ransom letters: each headline letter is its own span alternating Rubik Mono One / Courier Prime 700 / Courier italic, rotated −6°…6°, every third letter reversed (paper on ink), padding 0.05em 0.12em. Courier Prime body 16px/1.5. Never set a whole sentence in Rubik.',
    },
    {
      id: 'rocksalt-cutive',
      name: 'Rock Salt + Cutive Mono',
      display: { family: 'Rock Salt', weights: [400], fallback: '"Bradley Hand", cursive', source: 'google' },
      body: { family: 'Cutive Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'Long Cang', body: 'LXGW WenKai TC' },
      notes:
        'Rock Salt for headlines and captions only, ≥22px, mixed case, line-height 1.3 (its strokes need room). Cutive Mono body 16px/1.6, ragged right, hyphenation off. Captions sit at −3° next to what they describe, joined by a drawn arrow.',
    },
  ],
  palettes: [
    {
      id: 'toner-on-bond',
      name: 'Toner on bond',
      colors: {
        paper: '#f4f3ef',
        ink: '#111111',
        muted: '#4b4a46',
        accent: '#d4201f',
        accent2: '#f5e400',
        rule: '#111111',
        panel: '#dcdbd5',
      },
      usage:
        'Toner black for ≥85% of everything inked; red only for hand-drawn circles and strikes (<5%); yellow only as highlighter swipes behind 1–3 phrases; grey panel = an over-copied scrap.',
    },
    {
      id: 'yellow-pink-reid',
      name: 'Yellow & pink (Jamie Reid)',
      colors: {
        paper: '#f7e43a',
        ink: '#0b0b0b',
        muted: '#4a4310',
        accent: '#ec2f7b',
        accent2: '#f4f3ef',
        rule: '#0b0b0b',
        panel: '#ec2f7b',
      },
      usage:
        'Page is flat fluoro-yellow stock; black for all type; hot pink as 1–2 big flat blocks behind ransom letters (~20%); white scraps pasted on top carry the typed text.',
    },
    {
      id: 'lid-open-black',
      name: 'Lid-open black',
      colors: {
        paper: '#121212',
        ink: '#efeee8',
        muted: '#a9a79f',
        accent: '#ff4a1c',
        accent2: '#bdbcb5',
        rule: '#efeee8',
        panel: '#2b2b29',
      },
      usage:
        'The copier lid left open: near-black page, pasted white-ish scraps carry the text; orange marker for one or two scrawls; grey for toner-dust scraps.',
    },
  ],
  densities: ['packed', 'compact'],
  scales: ['augmented-fourth', 'perfect-fifth', 'golden'],
  motion: [
    {
      id: 'copier-light-bar',
      name: 'Copier light bar',
      description:
        'Once on load, a 6px paper-coloured bar with mix-blend-mode: difference sweeps top-to-bottom across the first screen, as if the page were being copied.',
      duration: '900ms',
      easing: 'linear',
      reduced: 'No sweep; the page simply appears.',
    },
    {
      id: 'tape-slap',
      name: 'Tape slap',
      description:
        'On hover a pasted scrap jumps to a new angle (±2°) in a single frame, as if peeled and re-taped.',
      duration: '120ms',
      easing: 'steps(1, end)',
      reduced: 'No rotation; hover adds a 2px ink outline instead.',
    },
    {
      id: 'still',
      name: 'Dead copy',
      description: 'No motion; hover reverses colours (paper text on ink).',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'ransom-letters',
      name: 'Ransom letters',
      description:
        'Headline letters each on their own cut scrap: mixed faces and sizes, some reversed, rotated −6° to 6°, scraps touching but never aligned.',
    },
    {
      id: 'tape-and-staples',
      name: 'Tape & staples',
      description:
        'Tape strips (64×22px, paper at 70% opacity, 1px edge lines) across scrap corners; staples as two 14×3px ink bars in the outer margin.',
    },
    {
      id: 'scrawl-annotations',
      name: 'Scrawl annotations',
      description:
        'Hand-drawn SVG circles, arrows and strike-throughs (stroke 2.5px, round caps, wobbly paths) in accent marking real facts.',
    },
  ],
  anchors: [
    {
      id: 'ransom-headline',
      name: 'Ransom-note headline',
      description:
        'The subject name built from 6–14 individually cut letters across the first screen at 10–16vw.',
    },
    {
      id: 'blackout-image',
      name: 'Blackout image box',
      description:
        'A user-provided image thresholded to pure black and white, filling ~60% of the first screen; without imagery, a solid toner-black block with a reversed handwritten caption.',
    },
    {
      id: 'masthead-bar',
      name: 'Pasted masthead bar',
      description:
        'Zine title hand-markered across a crooked black bar (−2°) with issue number and price typed on a scrap taped to its end.',
    },
  ],
  surfaces: [
    {
      id: 'toner-grain',
      name: 'Toner grain',
      description: 'Copy paper with speckled toner dust everywhere, slightly heavier towards the edges.',
      css: "background-color: var(--paper); background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.4 -.55'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.22'/></svg>\");",
    },
    {
      id: 'threshold-copy',
      name: 'Threshold copy',
      description:
        'Images and grey areas pushed to pure black/white; grey panels replaced by a coarse dot screen instead of a flat tint.',
      css: 'img { filter: grayscale(1) contrast(3.2) brightness(1.1); } .panel { background-image: radial-gradient(var(--ink) 30%, transparent 32%); background-size: 4px 4px; }',
    },
    {
      id: 'torn-scraps',
      name: 'Torn scraps',
      description: 'Every text block is a torn scrap with jagged edges laid on the page.',
      css: 'clip-path: polygon(0 3%, 9% 0, 22% 2%, 37% 0, 55% 3%, 71% 0, 88% 2%, 100% 0, 99% 96%, 84% 100%, 63% 97%, 41% 100%, 24% 97%, 6% 100%, 1% 94%);',
    },
  ],
  must: [
    'Every block looks pasted: rotated by a non-zero angle (−4°…4°) or taped, and no two neighbouring blocks share the same angle.',
    'The headline is built from visibly separate cut letters or hand lettering, never one clean typeset line.',
    'Black and paper dominate (≥85% of inked area); colour only as marker or highlighter accents.',
    'At least one handwritten caption or annotation points at a real fact.',
  ],
  mustNot: [
    'No smooth gradients, glows or soft grey tints; tone only via toner black, paper or a dot screen.',
    'No tidy grid of equal boxes; nothing snaps into a clean card layout.',
    'No crisp vector icons or stock illustrations; graphics are hand-drawn strokes or thresholded images.',
  ],
};

const risographDuotone: Branch = {
  id: 'risograph-duotone',
  name: { zh: 'Riso 双色套印', en: 'Risograph duotone' },
  family: 'print',
  concept: {
    zh: 'Riso 孔版印刷的双色套印：荧光粉和联邦蓝两种大豆油墨叠在一起，压出第三种颜色；版位总差一两毫米，平网的颗粒清清楚楚。每个颜色都是一张独立的版，设计就发生在两张版重叠的地方。',
    en: 'Risograph two-colour printing: fluorescent pink and federal blue soy inks overprint to make a third colour, registration drifts by a millimetre or two, and every flat tint shows its grain. Each colour is a separate drum, and the design happens where the two layers overlap.',
  },
  references: [
    'Hato Press (London) risograph publications',
    'Colorama riso print studio (Berlin)',
    'Nieves Books zines (Zurich)',
    'Risotto Studio (Glasgow) prints and editions',
    'Tokyo Art Book Fair riso zines',
  ],
  keywords: ['孔版', '叠印', '荧光粉', '套印偏移', '平网颗粒', '专色', '双色版'],
  tokens: {
    grid: '8 columns, 16px gutter, 32px margin; artwork lives on two "drum" layers that share the grid, with drum 2 offset 2px 3px from drum 1.',
    radius:
      '0 on text boxes; purely graphic shapes may be full circles or semicircles (border-radius: 50% only on shapes that carry no text).',
    border: 'No black outlines. Rules are 2px in one spot ink. Overlaps use mix-blend-mode: multiply.',
    shadow: 'none. The misregistration offset (drum 2 translated 2px 3px) is the only depth.',
  },
  layouts: [
    {
      id: 'overprint-poster',
      name: 'Overprint poster',
      description:
        'A poster where a giant shape on drum 1 and a giant word on drum 2 overlap; the overlap prints the third colour; small information blocks sit in the corners.',
      grid: '8 col; shape layer spans col 1–6, type layer col 3–8, overlapping across 4 columns; corner blocks 2 columns each.',
      structure: [
        'Top-left corner block: edition or issue number and date in small spot-ink type',
        'Overlap field: giant circle or arch on drum 1 crossed by the subject name on drum 2, multiplied where they meet',
        'Bottom band: three facts as a 3-column list with 2px spot-ink rules',
        'Colophon strip: inks used ("fluorescent pink + federal blue"), paper stock, edition size if given in the facts',
      ],
    },
    {
      id: 'zine-spreads',
      name: 'Zine spreads',
      description:
        'The page is a run of riso zine spreads; each section is a two-page spread where one ink dominates each page.',
      grid: 'Spreads of 2 × 4 columns with a visible 1px centre fold; each spread swaps which drum leads.',
      structure: [
        'Cover spread: title in drum-2 ink on a 40% grain tint of drum 1; back cover holds the colophon',
        'Spread 1: left page all text in drum-1 ink, right page a duotone image or a giant drum-2 numeral',
        'Spread 2: numbered list where numerals print in drum 2 and text in drum 1',
        'Final spread: where/when/contact set as a centred colophon block with registration marks',
      ],
    },
    {
      id: 'layer-split',
      name: 'Layer split',
      description:
        'The page shows how it was printed: the two separated plates side by side first, then the composite print below.',
      grid: '2 equal columns of 4 for the plates, 24px gutter, then a full-width composite; 8-col grid below.',
      structure: [
        'Plate A and plate B side by side, each single-colour, labelled "DRUM 1 / DRUM 2" with ink names',
        'Composite: the same artwork with both plates multiplied and 3px off-register',
        'Facts listed under swatch chips of each ink (ink name + a short label)',
        'Footer with crosshair registration marks in all four corners',
      ],
    },
  ],
  type: [
    {
      id: 'unbounded-familjen',
      name: 'Unbounded + Familjen Grotesk',
      display: {
        family: 'Unbounded',
        weights: [700, 800],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Familjen Grotesk',
        weights: [400, 600],
        italic: true,
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Unbounded 800 headlines, lowercase allowed, tracking -0.03em, line-height 0.92, up to 18vw; headlines always in a spot ink, never ink-black. Familjen Grotesk 400/600 body 17px/1.5; labels 600 uppercase +0.08em at 12px.',
    },
    {
      id: 'dela-zenkaku',
      name: 'Dela Gothic One + Zen Kaku Gothic New',
      display: {
        family: 'Dela Gothic One',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Zen Kaku Gothic New',
        weights: [400, 700],
        fallback: '"Hiragino Sans", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Tokyo art-book-fair voice. Dela Gothic One for headlines and numerals only, line-height 1.0, tracking 0; mix Latin and CJK in one headline at a shared cap height. Zen Kaku Gothic New body 16px/1.7, 700 for labels.',
    },
    {
      id: 'krona-xanh',
      name: 'Krona One + Xanh Mono',
      display: {
        family: 'Krona One',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Xanh Mono',
        weights: [400],
        italic: true,
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Krona One wide caps for titles, line-height 0.9, tracking 0.02em, max 3 words per line. Xanh Mono for body 16px/1.6 and all metadata (ink names, edition, dimensions); its italic for captions. Chinese display in Noto Sans SC 900.',
    },
  ],
  palettes: [
    {
      id: 'pink-federal-blue',
      name: 'Fluorescent pink + federal blue',
      colors: {
        paper: '#f7f3ea',
        ink: '#1f2a4a',
        muted: '#4c5677',
        accent: '#ff48b0',
        accent2: '#3d5588',
        rule: '#3d5588',
        panel: '#ffd3ea',
      },
      usage:
        'Pink drum for big shapes and grain tints (~35%); federal blue drum for all text and rules; their multiply overlap is the only third colour; cream paper shows through ≥40%.',
    },
    {
      id: 'orange-teal-kraft',
      name: 'Orange + teal on kraft',
      colors: {
        paper: '#d9c4a0',
        ink: '#1a1a1a',
        muted: '#4d4332',
        accent: '#ff6c2f',
        accent2: '#00838a',
        rule: '#00838a',
        panel: '#e8d7b8',
      },
      usage:
        'Kraft stock dulls both inks; orange for shapes and numerals (~30%), teal for headlines and rules, riso black only for small body text; overlaps go brown-olive.',
    },
    {
      id: 'red-green-white',
      name: 'Bright red + green on white',
      colors: {
        paper: '#fbfbf8',
        ink: '#14352a',
        muted: '#3f5a4f',
        accent: '#ff665e',
        accent2: '#00a95c',
        rule: '#00a95c',
        panel: '#ffe0dc',
      },
      usage:
        'Crisp white stock; bright red for the big shapes, green for type and grain; dark green (both drums overprinted) for body text; at least 45% paper visible.',
    },
  ],
  densities: ['regular', 'airy'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'drum-drift',
      name: 'Drum drift',
      description:
        'On hover, the drum-2 layer slides from its 2px 3px misregistration into perfect register, then back on leave.',
      duration: '200ms',
      easing: 'cubic-bezier(.4,0,.2,1)',
      reduced: 'Keep the static misregistration; no slide.',
    },
    {
      id: 'second-drum',
      name: 'Second drum',
      description:
        'On load drum 1 is shown alone, then drum 2 prints over it: it appears in 4 stepped frames with a 4px paper-feed jolt.',
      duration: '320ms',
      easing: 'steps(4, end)',
      reduced: 'Show both layers at once.',
    },
    {
      id: 'still',
      name: 'Still print',
      description: 'No motion; hover swaps a link from drum 2 to drum 1 ink.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'registration-marks',
      name: 'Registration marks',
      description:
        'Crosshair-in-circle marks (SVG, 24px, 1px strokes), one copy per drum so they visibly double, at sheet corners and beside the colophon.',
    },
    {
      id: 'overprint-shapes',
      name: 'Overprint shapes',
      description:
        'Flat circles, arches and stair-steps in accent overlapping type in accent2 with mix-blend-mode: multiply to make the third colour.',
    },
    {
      id: 'grain-tints',
      name: 'Grain tints',
      description:
        'Every tint is a stochastic grain or coarse halftone of a spot ink at 20–60% coverage, never an opacity fade.',
    },
  ],
  anchors: [
    {
      id: 'overprint-title',
      name: 'Overprint title',
      description:
        'Subject name at 14–20vw in drum-2 ink crossing a giant drum-1 circle; the overlap shows the multiply colour.',
    },
    {
      id: 'duotone-image',
      name: 'Duotone image',
      description:
        'One user-provided image split into two inks (thresholded in accent2, offset copy in accent) filling two thirds of the first screen; without imagery, a giant numeral from the facts treated the same way.',
    },
    {
      id: 'swatch-cover',
      name: 'Swatch cover',
      description:
        'Two big overlapping colour fields with the title knocked out of one, plus the ink names printed like a colour chart along the edge.',
    },
  ],
  surfaces: [
    {
      id: 'riso-grain',
      name: 'Riso grain',
      description: 'Every ink area carries fine stochastic grain and slightly uneven coverage.',
      css: "background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='1'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -1.6 1'/></filter><rect width='100%' height='100%' filter='url(%23g)' opacity='.35'/></svg>\"); mix-blend-mode: multiply;",
    },
    {
      id: 'uncoated-stock',
      name: 'Uncoated stock',
      description: 'Soft uncoated paper; inks sit slightly flat and muted and multiply over each other.',
      css: 'background-color: var(--paper); .ink-layer { mix-blend-mode: multiply; filter: saturate(.92); }',
    },
    {
      id: 'coarse-screen',
      name: 'Coarse screen',
      description: 'Tint areas printed as a 45° halftone with a 6px cell.',
      css: 'background-image: radial-gradient(var(--accent) 34%, transparent 36%), radial-gradient(var(--accent) 34%, transparent 36%); background-size: 6px 6px; background-position: 0 0, 3px 3px;',
    },
  ],
  must: [
    'Exactly two spot inks (accent + accent2) plus paper; any third colour is their multiply overlap.',
    'The first screen shows at least one visible overprint (mix-blend-mode: multiply) and one deliberate 2–4px misregistration.',
    'Tints are grain or halftone screens of a spot ink, never opacity fades of black.',
  ],
  mustNot: [
    'No pure #000000 and no full-colour (CMYK-style) imagery.',
    'No gradients between the two inks; transitions only via grain or halftone.',
    'No drop shadows, outlines in black or glossy effects; riso ink is flat and slightly chalky.',
  ],
};

const ticketStub: Branch = {
  id: 'ticket-stub',
  name: { zh: '票根', en: 'Ticket stub' },
  family: 'document',
  concept: {
    zh: '剧院、铁路与电影院的票据：存根和票身之间一条打孔线，流水号、排号、座号、日期都关在小格子里，底下压着防伪扭索纹。信息很密，但每一项都有固定位置；撕下来的那一半，就是凭证。',
    en: 'Theatre, railway and cinema tickets: a perforated line between stub and body, serial, row, seat and date each locked in a small ruled cell, a guilloche security pattern underneath. Dense with information, yet every item has a fixed place — and the half you tear off is the proof.',
  },
  references: [
    'Edmondson railway card tickets (1840s–1990, British Rail)',
    'Broadway hard tickets & Ticketron stubs (1970s–80s)',
    'Globe Ticket Co. "ADMIT ONE" roll tickets',
    '中国铁路硬板票与红色软纸火车票',
    'Odeon cinema tickets (1950s)',
  ],
  keywords: ['存根', '打孔线', '流水号', '座位格', '扭索纹', '检票', 'ADMIT ONE'],
  tokens: {
    grid: 'Ticket module at a 4:1 ratio (e.g. 960×240): body 75% + stub 25%; inside, an 8-column cell grid with 1px rules; the page is a stack of modules with 24px gaps.',
    radius:
      '0 on corners. Stubs get semicircular notches at both ends of the perforation via radial-gradient(circle at 0 50%, transparent 10px, var(--panel) 10.5px).',
    border:
      '1px solid rule for cells; perforation = a row of 4px holes every 8px (or 2px dotted rule); ticket outline 1.5px solid ink.',
    shadow: 'none. Tickets lie flat on the page.',
  },
  layouts: [
    {
      id: 'ticket-stack',
      name: 'Ticket stack',
      description:
        'The page is a column of full-width tickets, one per section, each split into body and stub; the first ticket is the event ticket.',
      grid: 'Modules max 1040px, 4:1 on desktop; body 75% / stub 25% split by a vertical perforation; on mobile the stub moves below with a horizontal perforation.',
      structure: [
        'Event ticket: headline and venue in the body; date, time and serial in the stub',
        'Seat ticket: row / seat / gate / price as a ruled cell table',
        'Conditions ticket: numbered terms in 11px type across the body, "NOT TRANSFERABLE / 不得转让" in the stub',
        'Booking strip: contact, address and the issuing office in a narrow ticket with a serial',
      ],
    },
    {
      id: 'roll-strip',
      name: 'Roll-ticket strip',
      description:
        'A long horizontal strip of roll tickets joined by perforations; each ticket carries one fact and the serial numbers increment.',
      grid: 'Scroll-snap row of tickets 280×140px with 4px perforated joins; below the strip, a 6-col box-office table.',
      structure: [
        'Header: subject name printed on one long ribbon ticket with a serial like "Nº 20261101"',
        'Roll strip: 5–9 roll tickets in a horizontal scroll-snap row, one fact each, serials counting up',
        'Box-office table: sessions × prices with tabular figures',
        'Footer: "keep this ticket / 请保留票根" and the issuing office',
      ],
    },
    {
      id: 'oversized-card',
      name: 'Oversized card ticket',
      description:
        'The first screen is one enormous Edmondson card ticket (57:30) with FROM → TO, class, fare and a dating-press stamp; the rest of the page reads as its reverse side.',
      grid: 'Card max 1100px at 1.9:1 with an internal 12-col cell grid and 1px rules; the reverse side below uses 2 columns at 1:2.',
      structure: [
        'Card front: issuing company small caps at top, FROM → TO huge, class and fare in cells, serial top-right',
        'Dating-press stamp: the date embossed at −8° overprinting a corner of the card',
        'Reverse side: conditions of issue in two narrow columns of 11px type',
        'Timetable or fare table with dot leaders',
        "Inspector's clip: a bite-shaped notch cut from one edge of the card",
      ],
    },
  ],
  type: [
    {
      id: 'staatliches-courier',
      name: 'Staatliches + Courier Prime',
      display: {
        family: 'Staatliches',
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Courier Prime',
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Staatliches uppercase for ADMIT ONE and titles, tracking 0.06em, line-height 0.95. Courier Prime for every number (serials, seats, prices) with tabular-nums; serials zero-padded to 7–8 digits and prefixed "Nº". Cell labels 10–11px Courier Prime uppercase +0.1em.',
    },
    {
      id: 'saira-cutive',
      name: 'Saira Extra Condensed + Cutive Mono',
      display: {
        family: 'Saira Extra Condensed',
        weights: [700, 800],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: { family: 'Cutive Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Railway voice. Saira Extra Condensed 800 uppercase for station names and FROM → TO at very large sizes, tracking 0.01em, line-height 0.9. Cutive Mono for dates, serials and conditions 15px/1.5 — it reads as dating-press struck. Class labels in Saira 700 at 14px +0.12em.',
    },
    {
      id: 'bevan-oldstandard',
      name: 'Bevan + Old Standard TT',
      display: { family: 'Bevan', weights: [400], fallback: 'Rockwell, Georgia, serif', source: 'google' },
      body: {
        family: 'Old Standard TT',
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Theatre hard-ticket voice. Bevan for the production title in upper/lower case, line-height 1.0. Old Standard TT small caps +0.12em for ORCHESTRA / ROW / SEAT labels, 16px/1.45 body, lining figures; prices with the currency sign at 60% size, raised.',
    },
  ],
  palettes: [
    {
      id: 'security-green',
      name: 'Security green',
      colors: {
        paper: '#e6f0e4',
        ink: '#14261c',
        muted: '#46594c',
        accent: '#c22a2a',
        accent2: '#2f7a5a',
        rule: '#14261c',
        panel: '#cfe2cf',
      },
      usage:
        'Pale green security stock; ink for all text and cells; red only for serial numbers and the date stamp (<8%); green guilloche underprint at ~25% tone behind the body.',
    },
    {
      id: 'buff-railway-card',
      name: 'Buff railway card',
      colors: {
        paper: '#e9dcb8',
        ink: '#1d1b16',
        muted: '#5a5240',
        accent: '#2f5d3a',
        accent2: '#c8541f',
        rule: '#1d1b16',
        panel: '#d8c792',
      },
      usage:
        'Buff pressboard; black text; a green horizontal band for class (~12%); orange-red for the dating-press stamp and one route arrow; panel = the reverse side.',
    },
    {
      id: 'velvet-house',
      name: 'Velvet house',
      colors: {
        paper: '#2a0f14',
        ink: '#f4ead8',
        muted: '#c4ad9d',
        accent: '#e7b53b',
        accent2: '#7fb6a4',
        rule: '#7a4b4f',
        panel: '#3a161c',
      },
      usage:
        'Dark velvet page like a theatre seat; ticket modules in panel with cream type; gold for titles and serials (~10%); celadon only for the guilloche lines.',
    },
  ],
  densities: ['compact', 'packed'],
  scales: ['perfect-fourth', 'augmented-fourth', 'major-third'],
  motion: [
    {
      id: 'perforation-tear',
      name: 'Tear at the perforation',
      description:
        'On click or hover the stub swings 4° away from the perforation and drops 6px, accelerating like paper giving way.',
      duration: '260ms',
      easing: 'cubic-bezier(.5,0,.75,0)',
      reduced: 'The stub dims to 55% opacity instead of moving.',
    },
    {
      id: 'dating-press',
      name: 'Dating press',
      description: 'The date stamp lands in two frames: scale 1.15 → 1 while settling at −8°.',
      duration: '140ms',
      easing: 'steps(2, end)',
      reduced: 'Stamp is simply present.',
    },
    {
      id: 'serial-tick',
      name: 'Numbering machine',
      description: 'The serial number ticks forward digit by digit like a numbering machine wheel.',
      duration: '480ms',
      easing: 'steps(6, end)',
      reduced: 'Show the final number.',
    },
  ],
  motifs: [
    {
      id: 'perforation',
      name: 'Perforation line',
      description:
        'A row of 4px holes every 8px (radial-gradient circles in page colour) between stub and body, with semicircle notches at both ends.',
    },
    {
      id: 'guilloche',
      name: 'Guilloche underprint',
      description:
        'A fine SVG guilloche of overlapping sine rosettes (0.5px strokes in accent2 at ~25% tone) behind the ticket body as a security pattern.',
    },
    {
      id: 'serial-cells',
      name: 'Serial & seat cells',
      description:
        '"Nº 20261101"-style serials in accent at top-right of body and stub; ROW / SEAT / GATE / DATE cells as a 1px ruled table with 9px labels.',
    },
  ],
  anchors: [
    {
      id: 'admit-one',
      name: 'Admit-one ticket',
      description:
        'The first screen is one huge ticket (body + stub) with the subject as the event title and the real date/time in the stub.',
    },
    {
      id: 'from-to',
      name: 'From → To',
      description:
        'Two place or state names at 10vw joined by an arrow, as on a railway card; class and fare cells beneath.',
    },
    {
      id: 'seat-grid',
      name: 'Seat grid',
      description:
        'A seating plan (rows of small cells) fills the right half; one cell is filled in accent and labelled with the key fact (date or session); title stacked on the left.',
    },
  ],
  surfaces: [
    {
      id: 'pressboard',
      name: 'Pressboard card',
      description: 'Stiff card ticket with faint horizontal fibre lines and a crisp 1.5px outline.',
      css: 'background-color: var(--panel); border: 1.5px solid var(--ink); background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.025) 0 1px, transparent 1px 3px);',
    },
    {
      id: 'security-paper',
      name: 'Security paper',
      description: 'Concentric fine-line rosettes behind all text panels, like banknote paper.',
      css: 'background-image: repeating-radial-gradient(circle at 30% 50%, transparent 0 6px, color-mix(in srgb, var(--accent2) 18%, transparent) 6px 6.6px);',
    },
    {
      id: 'tickets-on-counter',
      name: 'Tickets on the counter',
      description:
        'The page is the box-office counter (panel tone); each ticket is paper-coloured and set at a slight ±1° angle, so the page edge frames every module.',
      css: 'body { background: var(--panel); } .ticket { background: var(--paper); transform: rotate(-0.8deg); }',
    },
  ],
  must: [
    'Every section is a ticket module with a perforated split into body and stub.',
    'All numbers (dates, times, prices, rows, seats) sit in labelled 1px-ruled cells and use tabular figures.',
    'Serial numbers are derived from a real fact such as the date (Nº 20261101), never a fake count.',
  ],
  mustNot: [
    'No rounded-rectangle cards; ticket corners are square or notched only.',
    'No information floating outside a ticket module except a page-level header.',
    'No QR codes or barcodes that encode nothing; use guilloche and serials instead.',
  ],
};

const thermalReceipt: Branch = {
  id: 'thermal-receipt',
  name: { zh: '热敏小票', en: 'Thermal receipt' },
  family: 'document',
  concept: {
    zh: '收银台吐出来的热敏小票：一条窄窄的纸带，等宽字一行一行打出来，虚线隔开每一段，合计用符号框住，底部一条条形码。纸是微微发灰的白，字已经开始褪色，越往下读越像一本流水账。',
    en: 'The till receipt: a narrow strip of thermal paper, monospaced lines printed one at a time, dashed separators between blocks, totals boxed in ASCII characters and a barcode at the foot. Grey-white paper, print already fading, and the further down you read the more it becomes a ledger of everything.',
  },
  references: [
    'Epson TM-T88 thermal printer output (Font A, 12×24 dots, 42 columns)',
    'Japanese konbini receipts (7-Eleven Japan, FamilyMart, Lawson)',
    '中国便利店与超市收银小票',
    'Card-terminal merchant slips (Verifone, Ingenico, 1990s–2000s)',
  ],
  keywords: ['热敏纸', '等宽', '虚线分隔', '合计', '条形码', '褪色', '窄栏'],
  tokens: {
    grid: 'One narrow column of 42 characters (42ch ≈ 380–420px) on a contrasting counter background; all alignment in whole characters (ch units).',
    radius: '0. Top and bottom edges are 8px saw-tooth tear edges (mask with conic-gradient teeth).',
    border:
      'No CSS borders inside the strip: separators are typed lines of "-", "=" or "*" exactly 42 characters long; the strip itself has no outline.',
    shadow: 'none. At most a 1px rule-coloured outline where the strip meets the counter.',
  },
  layouts: [
    {
      id: 'till-receipt',
      name: 'Till receipt',
      description:
        'One receipt strip: merchant header, itemised lines with right-aligned values, a totals block, barcode, footer.',
      grid: '42ch column; label left, value right (flex with space or dot fill); 24px counter padding around the strip.',
      structure: [
        'Header: subject name in double-width bold, address and phone, date/time and a terminal line',
        'Items: each fact as an item line "QTY  DESCRIPTION ........ VALUE", wrapped continuations indented 2ch',
        'Totals block: the key figure as TOTAL in double height between "=" separators',
        'Barcode built from a real number (date, phone) with the digits printed beneath',
        'Footer: "THANK YOU / 谢谢惠顾", terms taken from the facts, "*** CUSTOMER COPY ***"',
      ],
    },
    {
      id: 'receipt-spike',
      name: 'Receipt spike',
      description:
        'Several receipts of different lengths laid side by side on the counter, each one a section (list, hours, contact).',
      grid: '3 strips of 32ch, 42ch and 24ch in a row, offset vertically by 40–120px, 24px gap; stacked on mobile.',
      structure: [
        'Counter header: subject name stencilled on the counter background, not on paper',
        'Strip 1 (long): the main itemised list',
        'Strip 2 (medium): opening hours or schedule as a time table',
        'Strip 3 (short): card-slip style with "SIGNATURE ______" and contact details',
        'A spike/pin mark (SVG circle) at the top of each strip',
      ],
    },
    {
      id: 'continuous-roll',
      name: 'Continuous roll',
      description:
        'The page is one endless roll; sections are separate "transactions" divided by cut lines, each with its own numbered header.',
      grid: 'Single 48ch column, full height, roll edges on both sides; transactions numbered TRX 0001, 0002…',
      structure: [
        'TRX 0001: who/what with a logo built from block characters (█ ▀ ▄)',
        'TRX 0002: itemised facts',
        'TRX 0003: table of times or prices aligned in ch columns',
        'End-of-roll warning stripe in accent2 along one edge, as on the last metre of a real roll',
        'Cut line "- - - ✂ - - -" with partial-cut teeth',
      ],
    },
  ],
  type: [
    {
      id: 'dotgothic-plex',
      name: 'DotGothic16 + IBM Plex Mono',
      display: {
        family: 'DotGothic16',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Mono',
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        "DotGothic16 imitates the printer's dot font: use it for the merchant name and TOTAL at double width (transform: scaleX(2), transform-origin left) and double height. IBM Plex Mono 400 at 14–15px/1.35 for lines, uppercase item names, tabular figures; every line ≤ 42 characters (CJK counts as 2).",
    },
    {
      id: 'xanh-cutive',
      name: 'Xanh Mono + Cutive Mono',
      display: {
        family: 'Xanh Mono',
        weights: [400],
        italic: true,
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: { family: 'Cutive Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Older cash-register / impact-printer voice. Xanh Mono for header and totals (italic for "Thank you"), Cutive Mono for lines at 15px/1.4. Uppercase item names, lowercase notes; amounts right-aligned to the last character column.',
    },
    {
      id: 'rubikmono-azeret',
      name: 'Rubik Mono One + Azeret Mono',
      display: {
        family: 'Rubik Mono One',
        weights: [400],
        fallback: '"Arial Black", monospace',
        source: 'google',
      },
      body: {
        family: 'Azeret Mono',
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Modern POS voice. Rubik Mono One only for the merchant name and the word TOTAL, caps, tracking 0. Azeret Mono 400 at 14px/1.4 for lines, 600 for subtotals. Section titles as reversed bars (paper text on ink) the full 42ch wide.',
    },
  ],
  palettes: [
    {
      id: 'two-colour-thermal',
      name: 'Two-colour thermal',
      colors: {
        paper: '#f2f1ec',
        ink: '#1c1c1e',
        muted: '#55555a',
        accent: '#c4262e',
        accent2: '#e7a1b0',
        rule: '#1c1c1e',
        panel: '#c9c3b6',
      },
      usage:
        'Strip in paper; black print for ~95% of text; red (two-colour thermal) only for TOTAL and one notice; pink for the end-of-roll stripe; panel is the counter around the strip.',
    },
    {
      id: 'faded-yellowed',
      name: 'Faded & yellowed',
      colors: {
        paper: '#eeeae0',
        ink: '#2a3240',
        muted: '#5f6672',
        accent: '#a3473a',
        accent2: '#d8a33b',
        rule: '#6b717c',
        panel: '#3b3a36',
      },
      usage:
        'A receipt kept in a wallet: yellowed paper, print faded to blue-grey; rust for totals; ochre for a tape stain; dark panel is the counter, making the strip glow.',
    },
    {
      id: 'carbon-copy-slip',
      name: 'Pink carbon-copy slip',
      colors: {
        paper: '#f5d6dc',
        ink: '#24161b',
        muted: '#5f4650',
        accent: '#1e4f8a',
        accent2: '#8c2a3c',
        rule: '#24161b',
        panel: '#e9bcc6',
      },
      usage:
        'Pink merchant-copy stock; dark ink for the printed lines; carbon blue only for "handwritten" signature and ticks (<5%); maroon for the reversed section bars.',
    },
  ],
  densities: ['compact', 'packed'],
  scales: ['major-second', 'minor-third', 'perfect-fourth'],
  motion: [
    {
      id: 'line-feed',
      name: 'Line feed',
      description:
        'The receipt prints line by line from the top: each new line appears in one step while the strip advances one line height, 40ms per line.',
      duration: '40ms',
      easing: 'steps(1, end)',
      reduced: 'Print the entire receipt instantly.',
    },
    {
      id: 'auto-cutter',
      name: 'Auto-cutter',
      description:
        'At the end of printing the saw-tooth edge appears and the strip drops 12px, as when the cutter fires.',
      duration: '180ms',
      easing: 'cubic-bezier(.6,0,.9,.4)',
      reduced: 'Show the cut edge; no drop.',
    },
    {
      id: 'thermal-warm',
      name: 'Thermal warm-up',
      description: 'On hover, a faded line darkens from muted to full ink, as if warmed by a thumb.',
      duration: '600ms',
      easing: 'ease-out',
      reduced: 'Lines are always full ink.',
    },
  ],
  motifs: [
    {
      id: 'ascii-separators',
      name: 'ASCII separators',
      description:
        'Lines of ------, ======, ****** and "· · ·" exactly 42 characters long; totals boxed with +----+ corners.',
    },
    {
      id: 'barcode-from-fact',
      name: 'Barcode from a real number',
      description:
        'Code-128-looking bars drawn with repeating-linear-gradient from a real number (date, phone, postcode) with its digits printed beneath in mono.',
    },
    {
      id: 'tear-edge',
      name: 'Saw-tooth tear',
      description: 'Top and bottom edges cut in 8px saw teeth (conic-gradient mask), like the auto-cutter.',
    },
  ],
  anchors: [
    {
      id: 'merchant-header',
      name: 'Double-width merchant header',
      description:
        'The first screen shows the top of the receipt: block-character logo or double-width name, address, date/time, terminal line.',
    },
    {
      id: 'blown-up-total',
      name: 'Blown-up TOTAL',
      description:
        'One line of the receipt cropped and enlarged: "TOTAL ........ value" at 8–10vw across the screen, dot leaders included.',
    },
    {
      id: 'whole-strip',
      name: 'Whole strip in view',
      description:
        'The entire short receipt (18–30 lines) fits in the first screen at 1:1, standing alone on the counter colour.',
    },
  ],
  surfaces: [
    {
      id: 'thermal-paper',
      name: 'Thermal paper',
      description: 'Smooth grey-white paper that curls slightly at both edges.',
      css: 'background-color: var(--paper); background-image: linear-gradient(90deg, rgba(0,0,0,.05), transparent 6%, transparent 94%, rgba(0,0,0,.05));',
    },
    {
      id: 'print-head-banding',
      name: 'Print-head banding',
      description: 'Faint horizontal banding in the print where the head runs slightly cold.',
      css: '.receipt { -webkit-mask-image: repeating-linear-gradient(0deg, #000 0 2px, rgba(0,0,0,.82) 2px 3px); mask-image: repeating-linear-gradient(0deg, #000 0 2px, rgba(0,0,0,.82) 2px 3px); }',
    },
    {
      id: 'counter-laminate',
      name: 'Counter laminate',
      description: 'The page around the strip is a speckled formica counter; the receipt is the only paper.',
      css: 'body { background-color: var(--panel); background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1.5px), radial-gradient(rgba(0,0,0,.14) 1px, transparent 1.5px); background-size: 9px 9px, 13px 13px; }',
    },
  ],
  must: [
    'All text inside the strip is monospaced and aligned to a character grid; values right-align to the same column.',
    'The strip is at most 48ch wide; nothing inside spans wider.',
    'Separators are typed characters (- = * ·), not CSS borders.',
    'Only facts appear as line items and values; a missing value is left blank, never invented.',
  ],
  mustNot: [
    'No proportional fonts inside the strip.',
    'No more than ink + one accent + paper inside the strip.',
    'No cards, icons, rounded containers or buttons styled as UI; links look like printed lines.',
  ],
};

const recordSleeve: Branch = {
  id: 'record-sleeve',
  name: { zh: '唱片封套', en: 'Record sleeve' },
  family: 'print',
  concept: {
    zh: '五十到八十年代的黑胶封套：正面是一个正方形——狠狠裁切的照片、巨大的字，或几乎什么都没有；背面是密密的曲目表、录音信息和目录号。Blue Note 的爵士张力，ECM 的冷静留白，Factory 的编号与克制。',
    en: "The 1950s–80s LP sleeve: the front is a square — a brutally cropped photo, enormous type, or almost nothing; the back is a dense track listing, recording credits and a catalogue number. Blue Note's jazz tension, ECM's cool silence, Factory's numbering and restraint.",
  },
  references: [
    'Reid Miles — Blue Note Records sleeves (1956–67)',
    'Barbara Wojirsch & Dieter Rehm — ECM Records covers',
    'Peter Saville — Factory Records (FAC numbers, "Unknown Pleasures", "Power, Corruption & Lies")',
    'Alex Steinweiss — Columbia Records sleeves (1940s)',
    'Hipgnosis — sleeves for Pink Floyd and Led Zeppelin',
  ],
  keywords: ['正方形', '封面/封底', '曲目表', '目录号', '狠裁切', 'A面/B面', '内页说明'],
  tokens: {
    grid: 'Square module: the cover is 1:1 at min(92vw, 88vh) with an internal 12×12 square grid; the back cover uses 3 columns with 12px gutters.',
    radius:
      '0 for sleeves; the disc is a circle (border-radius: 50%) with a label circle at 33% of its diameter.',
    border: 'No borders on the cover; back-cover credits use 1px rules; a 12px spine strip where needed.',
    shadow: 'none. Wear is shown with a ring-wear mark (thin radial ring) instead of a shadow.',
  },
  layouts: [
    {
      id: 'front-and-back',
      name: 'Front & back cover',
      description:
        'The page literally is the sleeve: a square front cover, then a square back cover with track listing and liner notes.',
      grid: 'Front: 1:1 square up to 880px; back: another square with 3 columns (2 for liner notes + 1 for the track list).',
      structure: [
        'Front cover square: cropped image or type-only composition; name, title, catalogue number',
        'Spine strip: 12px band with title and catalogue number rotated 90°',
        'Back cover: listing A1–A4 / B1–B4 with durations (any ordered facts), personnel, recording date & place',
        'Liner notes: 2 columns of 12–13px serif with a signed byline (only from the facts)',
        'Centre label: a disc label with side, speed (33⅓) and catalogue number',
      ],
    },
    {
      id: 'blue-note-crop',
      name: 'Blue Note crop',
      description:
        'Reid Miles-style: an extreme tight crop (photo or giant letters) fills two thirds of the square; the title stacks in condensed caps against one edge inside a single strong colour band.',
      grid: '12×12 square grid; crop occupies rows 1–8, type band rows 9–12; type may bleed off the square edge.',
      structure: [
        'Square with a photo or letterform crop in rows 1–8, tinted in one colour',
        'Type band: name in giant condensed caps, title in a contrasting weight',
        'Catalogue label top-right in the "BLUE NOTE 1577" manner, using the subject\'s own code',
        'Under the sleeve: session details table (date, place, people) with 1px rules',
      ],
    },
    {
      id: 'ecm-silence',
      name: 'ECM silence',
      description:
        'A huge field of near-empty colour or a soft landscape, with tiny lowercase type set off-centre near one edge; information is minimal and quiet.',
      grid: '1:1 square with a 12% inner margin; type sits on a 6-col grid in the lower third, never above 22px.',
      structure: [
        'Square: a misty photo or a flat tone field across all of it',
        'Tiny type block (name / title / label) aligned to the lower third, left of centre',
        'Below the square: a single column of titles with durations, wide line spacing',
        'Footer line: catalogue number, year, recording location',
      ],
    },
  ],
  type: [
    {
      id: 'league-franklin',
      name: 'League Gothic + Libre Franklin',
      display: {
        family: 'League Gothic',
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Libre Franklin',
        weights: [400, 700, 900],
        italic: true,
        fallback: '"Franklin Gothic Medium", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'League Gothic uppercase at huge sizes (up to 30vw), line-height 0.82, tracking 0; it is allowed to be cut by the square edge. Libre Franklin 900 for the title line in mixed case, 400 for credits at 13px/1.5. Durations in tabular figures, right-aligned.',
    },
    {
      id: 'jost-crimson',
      name: 'Jost + Crimson Pro',
      display: {
        family: 'Jost',
        weights: [300, 400],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Crimson Pro',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'ECM voice. Jost 400 lowercase at 14–22px, tracking 0.04em — never larger than 32px, even for the title; space does the work. Crimson Pro 400 and italic for liner notes 16px/1.6 and titles; durations in Jost 300 tabular.',
    },
    {
      id: 'krona-schibsted',
      name: 'Krona One + Schibsted Grotesk',
      display: {
        family: 'Krona One',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Schibsted Grotesk',
        weights: [400, 700],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Chiron Hei HK', body: 'Noto Sans SC' },
      notes:
        'Factory / post-punk voice. Krona One uppercase either small (16–28px, tracking 0.1em) or huge (12vw) — nothing in between. Schibsted Grotesk 400/700 for credits at 13px/1.45. A catalogue number in the "FAC 73" form is always present, set in Krona One.',
    },
  ],
  palettes: [
    {
      id: 'blue-note-tint',
      name: 'Blue Note tint',
      colors: {
        paper: '#f1ece1',
        ink: '#121212',
        muted: '#4b4740',
        accent: '#0a6fa6',
        accent2: '#e86a1c',
        rule: '#121212',
        panel: '#cfe0ea',
      },
      usage:
        'Cover photo or crop tinted in the blue accent (~50% of the square); title band in black or orange; orange also for the catalogue label; back cover is cream paper with black text.',
    },
    {
      id: 'ecm-fog',
      name: 'ECM fog',
      colors: {
        paper: '#d9dad5',
        ink: '#1a1c1d',
        muted: '#4f5354',
        accent: '#6f7e83',
        accent2: '#2f3a3d',
        rule: '#8a9093',
        panel: '#c3c6c1',
      },
      usage:
        'Grey-fog paper; the cover field in the slate accent or a soft photo (~85% of the square); type in ink at small sizes only; no warm colour at all.',
    },
    {
      id: 'factory-black',
      name: 'Factory black',
      colors: {
        paper: '#0e0e0e',
        ink: '#f0eee9',
        muted: '#a7a49d',
        accent: '#e8452c',
        accent2: '#f2c230',
        rule: '#3a3a3a',
        panel: '#1c1c1c',
      },
      usage:
        'Black sleeve and page; off-white type; red and yellow as small solid colour-code blocks or a single line of type (<10%); grey rules on the back cover.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['golden', 'perfect-fifth', 'major-third'],
  motion: [
    {
      id: 'disc-slide-out',
      name: 'Record slides out',
      description:
        'On hover the black disc slides out of the right edge of the sleeve by 35% of its width, as when pulling a record.',
      duration: '420ms',
      easing: 'cubic-bezier(.22,.61,.36,1)',
      reduced: 'Show the disc half out, statically.',
    },
    {
      id: 'turntable',
      name: 'Turntable',
      description:
        'While a "play" state is active, the centre label rotates at 33⅓ rpm (1.8s per turn) and stops dead on pause.',
      duration: '1800ms',
      easing: 'linear',
      reduced: 'No rotation; static label.',
    },
    {
      id: 'still',
      name: 'Still sleeve',
      description: 'No motion; hover underlines a title and turns its duration to accent.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'catalogue-number',
      name: 'Catalogue number',
      description:
        'A label code (e.g. "BLP 4003", "ECM 1064", "FAC 51") built from the subject\'s initials and a real number such as the year, on the cover corner and the back.',
    },
    {
      id: 'side-a-side-b',
      name: 'Side A / Side B',
      description:
        'Any ordered facts listed as SIDE A / SIDE B with A1…B4 numbering, titles and right-aligned tabular durations or values.',
    },
    {
      id: 'ring-wear',
      name: 'Ring wear',
      description:
        'A faint circular ring on the cover (2px band at ~6% ink) where the disc has rubbed through.',
    },
  ],
  anchors: [
    {
      id: 'square-cover',
      name: 'Square cover',
      description:
        'A perfect square fills the first-screen height with the cover composition; the page around it is plain.',
    },
    {
      id: 'cropped-giant-type',
      name: 'Cropped giant type',
      description:
        'The name in condensed caps so large the square edges cut it; only 60–70% of the letters are visible.',
    },
    {
      id: 'half-out-disc',
      name: 'Half-out disc',
      description:
        'Square sleeve on the left and the black disc pulled half out to the right, its label carrying the title and catalogue number.',
    },
  ],
  surfaces: [
    {
      id: 'laminated-flipback',
      name: 'Laminated flipback',
      description: 'Crisp, flat front; the back cover has a 6px folded flipback strip on its left edge.',
      css: '.sleeve { background: var(--panel); } .back { position: relative; } .back::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 6px; background: var(--rule); }',
    },
    {
      id: 'ring-worn-board',
      name: 'Ring-worn board',
      description: 'Matte board with a visible ring where the record has worn through the print.',
      css: 'background-color: var(--paper); background-image: radial-gradient(circle at 50% 50%, transparent 0 44%, rgba(0,0,0,.07) 44.5% 45.5%, transparent 46%);',
    },
    {
      id: 'vinyl-grooves',
      name: 'Vinyl grooves',
      description: 'The disc itself is drawn with fine concentric grooves around a flat label.',
      css: '.disc { border-radius: 50%; background: radial-gradient(circle, var(--accent) 0 16%, #111 16.2% 17%, transparent 17%), repeating-radial-gradient(circle, #111 0 1px, #1c1c1c 1px 2px); }',
    },
  ],
  must: [
    'The first screen contains a perfect 1:1 square composition.',
    'A catalogue number and an ordered listing (A1, A2… or 01, 02…) appear on the page.',
    'Type or image is cropped by the square edge at least once — or, in the ECM option, the square is ≥85% empty.',
  ],
  mustNot: [
    'No wide rectangular hero banner; the cover is square.',
    'No streaming-app UI: no circular play buttons, progress bars or heart icons.',
    'No invented track names, credits or durations — only items from the facts.',
  ],
};

const varsitySports: Branch = {
  id: 'varsity-sports',
  name: { zh: '赛事秩序册', en: 'Varsity sports programme' },
  family: 'print',
  concept: {
    zh: '球赛秩序册与大学校队的视觉：球衣号码、袖口条纹、链式刺绣字母、对阵表和比分牌数字。颜色就是队色，两种，绝不更多；内容是赛程、名单和比分，一切都排成表格。',
    en: 'The matchday programme and varsity kit: jersey numerals, sleeve stripes, chain-stitched letters, fixtures tables and scoreboard figures. Colour means team colours — two, never more — and the content is fixtures, rosters and scores, all of it set as tables.',
  },
  references: [
    'English Football League matchday programmes (1950s–70s)',
    'US college football programmes (Notre Dame, Michigan, 1940s–60s)',
    'Varsity letterman jackets and chenille patches',
    'Otl Aicher — Munich 1972 Olympics schedules and pictograms',
    '全运会、校运会秩序册',
  ],
  keywords: ['秩序册', '球衣号码', '队色', '袖口条纹', '对阵表', '比分牌', '链式刺绣'],
  tokens: {
    grid: '12 col, 12px gutter, 24px margin; tables on a 28px row; numerals sized in multiples of the row (2×, 4×, 8×, 16×).',
    radius:
      '0 for tables, bands and containers. Patch and pennant shapes are cut with clip-path (arched or triangular), never border-radius.',
    border:
      'Sleeve stripes: three bands (8px colour / 4px paper / 8px colour); table rules 1px; header underline 4px accent.',
    shadow:
      'none. Chain-stitch letters get a double outline (2px paper + 3px accent2 via -webkit-text-stroke and paint-order) instead of a shadow.',
  },
  layouts: [
    {
      id: 'matchday-programme',
      name: 'Matchday programme',
      description:
        'A programme cover in team colours with a badge and the fixture, then interior pages: fixtures table, line-up, club notes.',
      grid: '12 col; cover full width at 70vh crossed by a diagonal stripe; interior 8 col main + 4 col fixtures sidebar.',
      structure: [
        'Cover: competition name band at top, "A v B" (or subject v occasion) huge, date / kick-off strip, price in a corner',
        'Fixtures & results table with home/away columns and scoreboard numerals',
        'Line-up: two numbered columns 1–11 holding facts as roster entries',
        'Club notes: a narrow column of text with a bold kicker',
        'Back page: ground plan as a simple ruled diagram + next fixture',
      ],
    },
    {
      id: 'letterman-jacket',
      name: 'Letterman jacket',
      description:
        'Built like a jacket: a giant chenille letter patch on one side, sleeve stripes running down beside the text, and small arm patches carrying numbers.',
      grid: 'Asymmetric 5/7 split: 5 col for a 1:1 letter patch, 7 col for text; a 48px vertical stripe band at the far right edge.',
      structure: [
        'Chenille letter patch: the subject initial at ~40vw in the display face with a stitched double outline',
        'Vertical sleeve-stripe band (three stripes) running beside the text column',
        "Roster / info list with year numerals ('26) as round-cut arm patches",
        'Pennant-shaped headers for each section',
        'Footer with year and place in chain-stitch outline letters',
      ],
    },
    {
      id: 'scoreboard',
      name: 'Scoreboard',
      description:
        'The first screen is a stadium scoreboard: a dark board with lamp-style numerals in labelled cells, followed by an event schedule.',
      grid: 'Board: 6 equal square cells across in 2 rows, each with a label strip; below, a 12-col schedule table.',
      structure: [
        'Scoreboard: two big number cells with real figures from the facts (year, count, time) plus period / clock cells',
        'Ribbon of team-colour stripes under the board',
        'Schedule table: time | event | place | note, alternating row tints',
        'Roster or officials list in two columns',
        'Footer: league or school name and season',
      ],
    },
  ],
  type: [
    {
      id: 'graduate-baskerville',
      name: 'Graduate + Libre Baskerville',
      display: {
        family: 'Graduate',
        weights: [400],
        fallback: 'Rockwell, "Courier New", serif',
        source: 'google',
      },
      body: {
        family: 'Libre Baskerville',
        weights: [400, 700],
        italic: true,
        fallback: 'Baskerville, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Graduate (collegiate block) uppercase only, tracking 0.04em, line-height 0.9; jersey numbers get a 3px paper + 3px accent2 double outline (paint-order: stroke fill). Libre Baskerville 400/italic body 16px/1.55, like a 1950s college programme; tables in Baskerville with lining figures.',
    },
    {
      id: 'bigshoulders-barlow',
      name: 'Big Shoulders Display + Barlow Condensed',
      display: {
        family: 'Big Shoulders Display',
        weights: [800, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Barlow Condensed',
        weights: [500, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Big Shoulders Display 900 uppercase for numerals and headers, line-height 0.85; numerals may reach 40vw. Barlow Condensed 500 body 16px/1.35, 700 uppercase labels +0.06em; tabular-nums in every table.',
    },
    {
      id: 'ultra-plexcond',
      name: 'Ultra + IBM Plex Sans Condensed',
      display: { family: 'Ultra', weights: [400], fallback: 'Rockwell, Georgia, serif', source: 'google' },
      body: {
        family: 'IBM Plex Sans Condensed',
        weights: [400, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Ultra (fat slab) for team names and badge letters, arched along an SVG textPath for pennant headings; never letter-spaced. IBM Plex Sans Condensed 400 for fixtures and rosters 15px/1.4 with tabular figures, 600 for scores; position abbreviations uppercase +0.08em.',
    },
  ],
  palettes: [
    {
      id: 'maroon-gold',
      name: 'Maroon & gold',
      colors: {
        paper: '#f5f0e2',
        ink: '#1d1416',
        muted: '#5a4a48',
        accent: '#7a1b2b',
        accent2: '#d9a521',
        rule: '#1d1416',
        panel: '#ecdcb4',
      },
      usage:
        'Maroon for cover fields, patches and big numerals (~30%); gold only in stripes and stitched outlines (~8%); ink-on-cream for every table.',
    },
    {
      id: 'green-orange',
      name: 'Forest green & orange',
      colors: {
        paper: '#f3f5ef',
        ink: '#0f1f17',
        muted: '#3f5248',
        accent: '#00563f',
        accent2: '#f47321',
        rule: '#0f1f17',
        panel: '#dde8dc',
      },
      usage:
        'Cool white programme stock; forest green for bands and numerals (~25%); orange for stripes, kick-off times and one pennant (~8%); pale green alternating table rows.',
    },
    {
      id: 'scoreboard-night',
      name: 'Scoreboard at night',
      colors: {
        paper: '#101211',
        ink: '#f3efe3',
        muted: '#a8a597',
        accent: '#ffb000',
        accent2: '#e0352b',
        rule: '#3a3d3a',
        panel: '#1d201e',
      },
      usage:
        'Black board; amber lamp numerals (~15%) and red for the guest/second team only; off-white for tables; panel cells hold each lamp figure.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'score-flip',
      name: 'Score flip',
      description:
        'Changing numerals flip like hanging score cards: the top half folds down over 90° and the new card drops in.',
      duration: '260ms',
      easing: 'cubic-bezier(.5,0,.5,1)',
      reduced: 'Swap the digits instantly.',
    },
    {
      id: 'lamp-matrix',
      name: 'Lamp board',
      description: 'Scoreboard digits are 5×7 lamp matrices whose dots switch on in four stepped frames.',
      duration: '320ms',
      easing: 'steps(4, end)',
      reduced: 'Show the lit digits.',
    },
    {
      id: 'stitch-stripe',
      name: 'Stitched stripe',
      description:
        'On hover or focus of a section heading, its sleeve stripes extend from 0 to full width, like a stripe being stitched on.',
      duration: '200ms',
      easing: 'cubic-bezier(.2,.8,.2,1)',
      reduced: 'Stripes are always full width.',
    },
  ],
  motifs: [
    {
      id: 'sleeve-stripes',
      name: 'Sleeve stripes',
      description:
        'Three-band stripes (colour / paper / colour at 8/4/8px) used as rules under headers and down page edges, always in the same order.',
    },
    {
      id: 'jersey-numerals',
      name: 'Jersey numerals',
      description:
        'Huge outlined numerals (paper + accent2 double outline) marking each section 01, 02… like shirt numbers.',
    },
    {
      id: 'patch-and-pennant',
      name: 'Patch & pennant',
      description:
        'Felt-letter patches with a dashed chain-stitch outline in accent2, and triangular pennants (clip-path) carrying section titles.',
    },
  ],
  anchors: [
    {
      id: 'shirt-number',
      name: 'Shirt number',
      description:
        'One real number from the facts (year, founding date, count) set as a jersey numeral at 40–50vh on a team-colour field with stripes.',
    },
    {
      id: 'versus-cover',
      name: 'Versus cover',
      description:
        'A programme cover: two names in display type split by a big "v" across the stripes, with date and kick-off time below.',
    },
    {
      id: 'scoreboard-panel',
      name: 'Scoreboard panel',
      description:
        'A dark scoreboard with 4–6 lit cells across the first screen showing real figures (date, time, numbers from the facts).',
    },
  ],
  surfaces: [
    {
      id: 'programme-stock',
      name: 'Programme stock',
      description: 'Slightly yellowed uncoated programme paper printed in two colours.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(80,60,20,.05) 1px, transparent 1.4px); background-size: 4px 4px;',
    },
    {
      id: 'felt-chenille',
      name: 'Felt chenille',
      description: 'Patches look like felt with a chain-stitched edge.',
      css: "background-color: var(--accent); background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .25 0'/></filter><rect width='100%' height='100%' filter='url(%23f)'/></svg>\"); outline: 3px dashed var(--accent2); outline-offset: -8px;",
    },
    {
      id: 'jersey-mesh',
      name: 'Jersey mesh',
      description: 'Large team-colour fields carry a fine knitted mesh.',
      css: 'background-color: var(--accent); background-image: radial-gradient(rgba(0,0,0,.18) 1.2px, transparent 1.6px), radial-gradient(rgba(0,0,0,.18) 1.2px, transparent 1.6px); background-size: 6px 6px; background-position: 0 0, 3px 3px;',
    },
  ],
  must: [
    'Exactly two team colours (accent, accent2) plus paper and ink; stripes repeat them in the same order everywhere.',
    'Fixtures, schedules and rosters are real tables with tabular figures and a header rule.',
    'At least one numeral is set at jersey scale (≥30vh).',
  ],
  mustNot: [
    'No sporting-goods advertising look: no action-photo collage, speed lines or italic "dynamic" skew.',
    'No invented scores, results or names; only facts.',
    'No gradients on team-colour fields; flat print or felt colour only.',
  ],
};

const coutureLookbook: Branch = {
  id: 'couture-lookbook',
  name: { zh: '时装画册', en: 'Couture lookbook' },
  family: 'print',
  concept: {
    zh: '时装画册与巴黎版 Vogue 的编辑版面：Didone 字体在极大和极小之间来回切换，发丝细线，大片留白，字极少。每一页只有一个主体，按 LOOK 01、02……编号，像走秀出场顺序。',
    en: 'The fashion lookbook and the Vogue Paris editorial spread: a Didone face swinging between enormous and tiny, hairline rules, vast whitespace, very few words. Each page holds one subject, numbered LOOK 01, 02… in runway order.',
  },
  references: [
    'Vogue Paris covers and editorial spreads (1970s–2000s)',
    "Alexey Brodovitch — Harper's Bazaar (1934–58)",
    "Fabien Baron — Harper's Bazaar redesign (1992)",
    'Jil Sander and Maison Martin Margiela lookbooks (1990s)',
    'M/M (Paris) — Yohji Yamamoto catalogues',
  ],
  keywords: ['Didone', '极端字号对比', '发丝线', '大留白', 'LOOK 编号', '跨页', '少字'],
  tokens: {
    grid: '12 col, 40px gutters, 8vw outer margins, 8px baseline; blocks snap to columns, and whole columns are left empty on purpose.',
    radius: '0 everywhere.',
    border: 'Hairlines only: 1px at 40% ink (or 0.5px on 2× screens); no boxes around anything.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'look-sequence',
      name: 'Look sequence',
      description:
        'Each section is one "look": a single image or a single block of text placed asymmetrically on an otherwise empty page, with its look number.',
      grid: '12 col; each look occupies 4–6 columns, alternating left/right; one look per 100vh on desktop.',
      structure: [
        'Cover: title at ~22vw running past the right margin, season line in 11px caps on its baseline',
        'LOOK 01: image on 5 columns at the right, number and a two-line caption bottom-left',
        'LOOK 02: text-only — one sentence at 6vw italic, nothing else on the page',
        'LOOK 03: two narrow images on 3 columns each separated by a hairline',
        'Credits page: tiny two-column list of credits / facts in small caps around a centred vertical hairline',
      ],
    },
    {
      id: 'editorial-spread',
      name: 'Editorial spread',
      description:
        'Vogue-style double-page spreads: the left page is one giant letter or word, the right page a narrow column of body text with a drop cap.',
      grid: 'Spread = 2 pages × 6 col with an 80px fold; text column 3 columns wide, ragged right.',
      structure: [
        'Spread 1: left page an initial at 60vh cropped by the fold; right page italic headline + standfirst',
        'Spread 2: full-page image on the left; 3-column text on the right with a drop cap and a 32px italic pull-quote',
        'Spread 3: index of items as a hairline-ruled list with page numbers',
        'Back page: masthead-style credits in 10px caps',
      ],
    },
    {
      id: 'index-catalogue',
      name: 'Index catalogue',
      description:
        'A Margiela-like sparse catalogue: very large numbers in a left rail, a minimal text index, and a great deal of off-white.',
      grid: '12 col; columns 1–3 form a rail for numbers at 18vw; content in columns 5–10; 160px vertical spacing.',
      structure: [
        'Header: subject in 13px caps on a hairline, season code at the far right',
        'Number rail: 01, 02, 03 in hairline Didone, each paired with a short description block',
        'Material / detail table: 3-column hairline table (item / material / detail) from the facts',
        'Contact / press line at the very bottom in 11px',
      ],
    },
  ],
  type: [
    {
      id: 'bodoni-jost',
      name: 'Bodoni Moda + Jost',
      display: {
        family: 'Bodoni Moda',
        weights: [400, 500],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: 'google',
      },
      body: {
        family: 'Jost',
        weights: [400, 500],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Bodoni Moda at extremes only: ≥120px (up to 25vw, high optical size, weight 400–500, tracking -0.03em, line-height 0.85) or ≤13px caps +0.2em. Nothing between 16 and 96px except an italic standfirst. Jost 400 body 15px/1.7; captions Jost 500 uppercase 11px +0.18em. Chinese display in Noto Serif SC 200–300.',
    },
    {
      id: 'italiana-cormorant',
      name: 'Italiana + Cormorant Garamond',
      display: { family: 'Italiana', weights: [400], fallback: 'Didot, serif', source: 'google' },
      body: {
        family: 'Cormorant Garamond',
        weights: [300, 400],
        italic: true,
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Italiana uppercase for titles, tracking 0.12em, 64–180px; look numbers in Italiana at 10vw. Cormorant Garamond 300 italic for standfirsts at 28–36px, 400 roman for body 18px/1.6. Never bold anything.',
    },
    {
      id: 'gilda-tenor',
      name: 'Gilda Display + Tenor Sans',
      display: {
        family: 'Gilda Display',
        weights: [400],
        fallback: 'Didot, Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'Tenor Sans',
        weights: [400],
        fallback: 'Optima, Candara, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Chiron Sung HK', body: 'Noto Sans SC' },
      notes:
        'Gilda Display mixed case for headlines at 72–200px, line-height 0.9, tracking -0.02em. Tenor Sans for captions and body at 14px/1.75; caps labels +0.22em. Only one heavy-looking element per page; everything else stays light.',
    },
  ],
  palettes: [
    {
      id: 'atelier-white',
      name: 'Atelier white',
      colors: {
        paper: '#faf8f4',
        ink: '#0b0b0b',
        muted: '#5e5a55',
        accent: '#9b1b1f',
        accent2: '#c9b79c',
        rule: '#0b0b0b',
        panel: '#efebe4',
      },
      usage:
        'Off-white ≥70% of every page; black type; couture red for one word or one look number per page only (<2%); sand for image mats.',
    },
    {
      id: 'fog-bottle-green',
      name: 'Fog & bottle green',
      colors: {
        paper: '#e6e7e3',
        ink: '#121414',
        muted: '#4d5251',
        accent: '#264d3b',
        accent2: '#b9a27a',
        rule: '#121414',
        panel: '#d5d8d3',
      },
      usage:
        'Cool fog-grey stock; ink type; bottle green for the giant numerals or the masthead (~5%); camel only as a thin rule or one mat.',
    },
    {
      id: 'noir-champagne',
      name: 'Noir & champagne',
      colors: {
        paper: '#0d0c0b',
        ink: '#f2eee6',
        muted: '#a39d92',
        accent: '#c8a46a',
        accent2: '#8e1a1f',
        rule: '#f2eee6',
        panel: '#1a1816',
      },
      usage:
        'Evening-collection black; ivory type; champagne for the masthead and look numbers (~4%); deep red only as a single fill behind one image.',
    },
  ],
  densities: ['airy'],
  scales: ['golden', 'perfect-fifth'],
  motion: [
    {
      id: 'page-turn',
      name: 'Slow page turn',
      description:
        'Moving between looks (click / key), the next page is revealed from the right edge with clip-path: inset(0 0 0 100%) → inset(0), like turning a heavy page.',
      duration: '700ms',
      easing: 'cubic-bezier(.77,0,.18,1)',
      reduced: 'Cut directly between pages.',
    },
    {
      id: 'runway-step',
      name: 'Runway step',
      description:
        'On hover a look steps forward: image scale 1 → 1.015 while its caption hairline draws from 0 to full width.',
      duration: '450ms',
      easing: 'cubic-bezier(.16,1,.3,1)',
      reduced: 'Only the hairline appears; no scale.',
    },
    {
      id: 'still',
      name: 'Still editorial',
      description: 'No motion; hover adds a hairline underline.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'look-numbers',
      name: 'Look numbers',
      description:
        'LOOK 01 / 02 … in tiny caps beside huge hairline numerals; the numbering is the navigation.',
    },
    {
      id: 'hairline-axis',
      name: 'Hairline axis',
      description:
        'One vertical hairline running the full page height off-centre (at column 7) from which captions hang.',
    },
    {
      id: 'scale-collision',
      name: 'Scale collision',
      description: 'A 200px+ word sharing a baseline with 11px caps text set directly against it.',
    },
  ],
  anchors: [
    {
      id: 'cropped-masthead',
      name: 'Cropped masthead',
      description:
        'The subject name at 24–30vw in Didone, cropped by the right edge of the viewport, with a season code in 11px caps on its baseline.',
    },
    {
      id: 'single-image-void',
      name: 'Single image in a void',
      description:
        'One user-provided image on 4–5 columns placed off-centre in a sea of off-white; without imagery, one italic sentence at 5vw in the same spot.',
    },
    {
      id: 'giant-initial',
      name: 'Giant initial',
      description:
        'One initial or numeral at ~70vh in hairline Didone filling the left half; the right half empty except a three-line caption.',
    },
  ],
  surfaces: [
    {
      id: 'matte-coated',
      name: 'Matte coated stock',
      description: 'Clean, flat paper with no texture at all.',
      css: 'background: var(--paper);',
    },
    {
      id: 'tissue-interleaf',
      name: 'Tissue interleaf',
      description:
        'A tissue sheet over the cover: a paper-coloured layer at 82% opacity (no blur) laid over the first image, its lower edge slightly deckled.',
      css: '.tissue { background: color-mix(in srgb, var(--paper) 82%, transparent); clip-path: polygon(0 0, 100% 0, 100% 97%, 80% 99%, 55% 97%, 30% 100%, 0 98%); }',
    },
    {
      id: 'laid-board',
      name: 'Laid board',
      description: 'Heavy uncoated board with a faint laid-line texture.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,.02) 0 1px, transparent 1px 4px);',
    },
  ],
  must: [
    'The first screen has at least a 15:1 ratio between its largest and smallest type size.',
    'At least 50% of the first screen is empty paper.',
    'Every section carries a look or page number.',
  ],
  mustNot: [
    'No paragraph longer than 60 words on any one page; no bullet lists.',
    'No boxes, cards, filled buttons or badges; links are underlined words or numbers.',
    'No mid-size type between 16 and 64px except one italic standfirst.',
  ],
};

const broadsheetNewspaper: Branch = {
  id: 'broadsheet-newspaper',
  name: { zh: '大报版面', en: 'Broadsheet newspaper' },
  family: 'print',
  concept: {
    zh: '大报的头版：哥特体或衬线报头，六栏网格加栏间细线，电头、眉题、转版提示，正文密而整齐。版面等级完全靠标题字号和跨栏宽度建立——最重要的事上头条，其余依次递减。',
    en: 'The broadsheet front page: a blackletter or serif masthead, a six-column grid with column rules, datelines, kickers and jump lines, dense justified body copy. Hierarchy comes entirely from headline size and column span — the main story leads, everything else steps down in order of importance.',
  },
  references: [
    'The New York Times front pages (1950s–1990s)',
    "The Times (London) after Stanley Morison's Times New Roman (1932)",
    'The Guardian Berliner redesign by Mark Porter (2005)',
    'Financial Times salmon broadsheet',
    '《大公报》《人民日报》头版',
  ],
  keywords: ['报头', '六栏', '栏线', '电头', '眉题', '转版', '头条'],
  tokens: {
    grid: '6 columns, 16px gutter with a 1px column rule centred in each gutter, 24px page margin; body on a 22px baseline (17/22); masthead and headlines span 2–6 columns.',
    radius: '0.',
    border:
      '1px column rules; 3px + 1px double rule under the masthead; 0.5px (or 1px at 50%) cut-off rules between stories in a column; 4px rule above section flags.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'front-page',
      name: 'Front page',
      description:
        'A full front page: masthead with ears, a 4-column lead story with a large headline, two side columns of briefs, and stories below the fold.',
      grid: '6 col; lead = col 1–4, right rail = col 5–6; below the fold = three 2-col stories.',
      structure: [
        'Masthead: title between two ear boxes (edition / price), then the folio line "Vol. · No. · date · price" between double rules',
        'Lead story: 4-col headline with 2–3 decks, byline, dateline "CITY, Nov. 1 —", body in 4 justified columns ending with "Continued on Page A6"',
        'Right rail: 2 columns of briefs with bold kickers separated by cut-off rules',
        'Below the fold: three 2-col stories with smaller heads',
        'Index box: "INSIDE / 本期导读" with page numbers',
      ],
    },
    {
      id: 'stacked-decks',
      name: 'Stacked decks',
      description:
        'Nineteenth-century style: narrow single-column stories with headlines stacked in multiple decks (caps, italic, small caps), no images.',
      grid: '6 col; every story is 1 column wide; decks separated by short centred 30px rules.',
      structure: [
        'Masthead: full-width title with the folio line and a ruled ear on each side',
        'Columns 1–2: lead story with 4 decks of headlines (caps, italic, small caps, roman)',
        'Columns 3–6: running stories, each with a 2-deck head and dense body',
        'Boxed notices at the foot of columns, carrying facts like times and addresses',
        'Folio line at the bottom with page number and edition',
      ],
    },
    {
      id: 'section-front',
      name: 'Section front',
      description:
        'A modern section front: big section flag, one dominant block (image or a ruled table of facts), a pull-quote and a 3-column story.',
      grid: '6 col; flag full width; dominant block 4 col; story text 3 col with column 6 holding the pull-quote.',
      structure: [
        'Section flag: "ARTS / 文化" on a 4px rule with the date',
        'Dominant block: user-provided image or a ruled table of facts across 4 columns, with caption',
        'Headline + standfirst across 4 columns',
        'Story in 3 columns with a large pull-quote hanging in column 6 (quote only from the facts)',
        'Footer: jump line and section index',
      ],
    },
  ],
  type: [
    {
      id: 'fraktur-newsreader',
      name: 'UnifrakturMaguntia + Newsreader',
      display: {
        family: 'UnifrakturMaguntia',
        weights: [400],
        fallback: '"Old English Text MT", serif',
        source: 'google',
      },
      body: {
        family: 'Newsreader',
        weights: [400, 600, 700],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: 'google',
      },
      cjk: { display: 'Ma Shan Zheng', body: 'Noto Serif SC' },
      notes:
        'Blackletter only for the masthead (and at most one section flag), never for headlines. Headlines Newsreader 700 at display optical size, tracking -0.01em, line-height 1.02; decks Newsreader 400 italic. Body 16–17px/22px justified with hyphens: auto, 1em first-line indent, no space between paragraphs. Bylines caps 11px +0.08em. Chinese masthead in Ma Shan Zheng (brush, like 人民日报).',
    },
    {
      id: 'oldstandard-caslon',
      name: 'Old Standard TT + Libre Caslon Text',
      display: {
        family: 'Old Standard TT',
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'Libre Caslon Text',
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Old Standard TT for the masthead (caps, +0.04em) and headlines: 700 caps for the top deck, italic for the second. Libre Caslon Text body 15px/1.4 justified and hyphenated. Kickers in all-small-caps; datelines in caps followed by an em dash.',
    },
    {
      id: 'zilla-sourceserif',
      name: 'Zilla Slab + Source Serif 4',
      display: {
        family: 'Zilla Slab',
        weights: [600, 700],
        fallback: 'Rockwell, Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'Source Serif 4',
        weights: [400, 600],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Chiron Hei HK', body: 'Noto Serif SC' },
      notes:
        'Berliner voice. Zilla Slab 600/700 for headlines in sentence case, tracking -0.015em, line-height 1.0, from 28px (briefs) to 88px (lead). Source Serif 4 body 16px/1.45 ragged right; standfirsts 22px. Section flags in Zilla Slab 700 lowercase.',
    },
  ],
  palettes: [
    {
      id: 'newsprint-grey',
      name: 'Newsprint grey',
      colors: {
        paper: '#efece4',
        ink: '#141414',
        muted: '#4f4d48',
        accent: '#b0191e',
        accent2: '#2f4f6f',
        rule: '#141414',
        panel: '#e2ddd0',
      },
      usage:
        'Ink on newsprint for ~95%; red for the section flag and one rule (<3%); blue-grey for the index box heading; panel for boxed notices.',
    },
    {
      id: 'salmon-financial',
      name: 'Salmon financial',
      colors: {
        paper: '#f6d4ba',
        ink: '#1a1715',
        muted: '#5b4b40',
        accent: '#0d5c63',
        accent2: '#990f3d',
        rule: '#1a1715',
        panel: '#efc6a6',
      },
      usage:
        'Whole page salmon; black text; teal for figures and table headers (~4%); claret for the masthead underline and kickers.',
    },
    {
      id: 'berliner-white',
      name: 'Berliner white',
      colors: {
        paper: '#f8f9f7',
        ink: '#121212',
        muted: '#545a5c',
        accent: '#0b2c55',
        accent2: '#c70000',
        rule: '#121212',
        panel: '#e8ecef',
      },
      usage:
        'Bright white stock; ink text; deep navy masthead bar and section flags (~6%); red only for kickers and the "live" marker; pale grey panel for the index.',
    },
  ],
  densities: ['packed', 'compact'],
  scales: ['perfect-fourth', 'augmented-fourth', 'perfect-fifth'],
  motion: [
    {
      id: 'edition-stamp',
      name: 'Edition stamp',
      description: 'A "LATE EDITION / 晚版" flag stamps into the ear on load: scale 1.2 → 1 in two frames.',
      duration: '150ms',
      easing: 'steps(2, end)',
      reduced: 'The flag is simply present.',
    },
    {
      id: 'jump-flash',
      name: 'Jump-line flash',
      description:
        'Clicking "Continued on A6" jumps instantly (no smooth scroll) and the target column rule turns accent for 600ms.',
      duration: '600ms',
      easing: 'steps(1, end)',
      reduced: 'Same jump; the target rule turns accent and stays, no flash.',
    },
    {
      id: 'still',
      name: 'Still page',
      description: 'No motion; links are underlined in ink and turn accent on hover.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'masthead-ears',
      name: 'Masthead ears',
      description:
        'Two small boxed ears either side of the masthead (edition, price or a one-line fact), 1px rule boxes 140px wide.',
    },
    {
      id: 'datelines-jumps',
      name: 'Datelines & jump lines',
      description:
        'Stories open with "CITY, Date —" in caps and end with "Continued on Page 4, Column 3" in italic.',
    },
    {
      id: 'column-rules',
      name: 'Column rules & cut-offs',
      description:
        '1px vertical rules between all columns, thin horizontal cut-off rules between stories, a double rule under the masthead.',
    },
  ],
  anchors: [
    {
      id: 'masthead',
      name: 'Masthead',
      description: 'Full-width title at 9–12vw between two ears, with the folio line under a double rule.',
    },
    {
      id: 'banner-headline',
      name: 'Banner headline',
      description:
        'A 6-column "war-type" headline in caps at 7–9vw across the whole page width, two lines maximum, above the fold.',
    },
    {
      id: 'above-the-fold',
      name: 'Above the fold',
      description:
        'The first screen is the dense top half of a front page: a small masthead (5vw) and four stories of different weights already visible.',
    },
  ],
  surfaces: [
    {
      id: 'groundwood-newsprint',
      name: 'Groundwood newsprint',
      description: 'Grey-cream newsprint with fine speckle and a faint centre fold.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.03) .8px, transparent 1px), linear-gradient(90deg, transparent 49.7%, rgba(0,0,0,.04) 50%, transparent 50.3%); background-size: 3px 3px, 100% 100%;',
    },
    {
      id: 'fold-crease',
      name: 'Folded copy',
      description:
        'A horizontal crease at the fold (≈100vh): a 1px darker line with a slight tone either side — "above the fold" made literal.',
      css: '.fold { height: 32px; background: linear-gradient(180deg, transparent, rgba(0,0,0,.05) 48%, rgba(0,0,0,.12) 50%, rgba(255,255,255,.4) 51%, transparent); }',
    },
    {
      id: 'bright-stock',
      name: 'Bright stock',
      description: 'Bright, flat white paper with crisp ink and no texture, for the Berliner voice.',
      css: 'background: var(--paper);',
    },
  ],
  must: [
    'A 6-column grid with visible 1px column rules.',
    'Body copy in narrow justified (or Berliner ragged) columns of 35–45 characters with hyphenation.',
    'Headline size strictly follows story importance: one lead, then at least two smaller tiers.',
    'Every story has a dateline or kicker and ends with a full stop or a jump line.',
  ],
  mustNot: [
    'No grid of teaser cards with images on top; stories are columns of text.',
    'No blackletter anywhere except the masthead and at most one flag.',
    'No invented quotes, sources or news; all copy comes from the facts.',
  ],
};

export const printBranches: Branch[] = [
  supermarketCircular,
  letterpressWoodtype,
  photocopyZine,
  risographDuotone,
  ticketStub,
  thermalReceipt,
  recordSleeve,
  varsitySports,
  coutureLookbook,
  broadsheetNewspaper,
];
