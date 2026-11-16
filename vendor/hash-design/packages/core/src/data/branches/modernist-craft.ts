import type { Branch } from '../../types.js';

/**
 * Modernist schools (Swiss, brutalist, Bauhaus, constructivist, deco, 70s, Memphis, ma)
 * and craft traditions (handmade shop, Chinese ink and seal).
 */

const swissGrid: Branch = {
  id: 'swiss-grid',
  name: { zh: '瑞士网格', en: 'Swiss grid' },
  family: 'modernist',
  concept: {
    zh: '国际主义字体风格：穆勒-布罗克曼的苏黎世音乐厅海报、鲁德的《排印月刊》、《新平面设计》杂志。一切服从模数网格，左齐右不齐，标题是排好的字块而不是装饰。红与黑、01/02 的编号本身就是结构——客观、冷静，让信息自己说话。',
    en: 'The International Typographic Style: Müller-Brockmann’s Zürich Tonhalle posters, Emil Ruder’s Typographische Monatsblätter, the Neue Grafik journal. Everything answers to a modular grid, flush-left and ragged-right; headlines are typeset blocks, not decoration. Red, black and numbered sections are the structure — objective, cool, letting the information speak.',
  },
  references: [
    'Josef Müller-Brockmann, Zürich Tonhalle “musica viva” concert posters (1951–1972)',
    'Emil Ruder, Typographie: A Manual of Design (1967)',
    'Neue Grafik / New Graphic Design journal (1958–1965)',
    'Josef Müller-Brockmann, Grid Systems in Graphic Design (1981)',
    'Karl Gerstner, Designing Programmes (1964)',
  ],
  keywords: ['模数网格', '左齐右不齐', '红与黑', '编号结构', '客观摄影', '无衬线'],
  tokens: {
    grid: '12 columns grouped into 6 fields, 24px gutter, 48px outer margin (24px on mobile); 8px baseline with body 16/24; every block top-aligns to a field row of 8 baselines (64px).',
    radius: '0 everywhere — buttons, images and inputs included.',
    border:
      '1px solid ink hairlines only on field boundaries; one 6px accent bar (exactly one field wide) as the only heavy rule; never a box around text.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'modular-poster',
      name: 'Modular poster',
      description:
        'The first screen is a concert poster on a 6×8 field grid: the headline stacked as a flush-left block in the top-left fields and one geometric figure occupying a precise field range.',
      grid: '6 columns × 8 rows of fields, 24px gutters, 48px margins; headline spans cols 1–4 / rows 1–3; figure spans cols 3–6 / rows 3–7; date block cols 1–2 / row 8.',
      structure: [
        'Poster field: headline block (3–5 lines, flush-left) top-left; concentric arcs or bars in a declared field range; date/place block bottom-left at body size',
        'Information table: facts in two columns — labels in cols 1–2 (muted), values in cols 3–6',
        'Programme list: numbered rows 01–0n, each on the grid with a 1px rule above',
        'Colophon strip: address, contact, credits at 12px in 3 columns aligned to the poster’s column lines',
      ],
    },
    {
      id: 'ruder-asymmetric',
      name: 'Asymmetric text columns',
      description:
        'An Emil Ruder book spread: a narrow marginal column for headings and numbers, wide text columns, and large empty fields used as active space.',
      grid: '12 columns, 24px gutters, 64px margins; headings cols 1–3, text cols 5–10, marginal notes cols 11–12; 8px baseline, headings sit on the same baseline as the first text line.',
      structure: [
        'Running head: title left, section number right, 1px rule below',
        'Opening: large light headline across cols 1–8; introduction in cols 5–10 starting three field rows lower',
        'Text sections: each heading hangs in cols 1–3, aligned to the first baseline of its text in cols 5–10',
        'Figure field: one image or diagram across cols 5–12, caption in cols 1–3',
        'End matter: references and contact in cols 5–10 at 12px',
      ],
    },
    {
      id: 'numbered-index',
      name: 'Numbered index',
      description:
        'Numbers are the architecture: each section opens with a giant numeral spanning two columns with the content to its right; the page reads like a specification.',
      grid: '8 columns, 16px gutters, 40px margins; numeral column = cols 1–2 (numerals 12–18vw, tabular), content cols 3–8; 8px baseline.',
      structure: [
        'Top band: title flush-left, a 6px red bar spanning cols 1–2 only',
        '01 — giant red numeral left; statement and key facts right',
        '02 — a ruled table (label / value / note)',
        '03 — one objective black-and-white image or a solid colour field cropped to the grid',
        '04 — contact as plain lines, numbered like everything else',
      ],
    },
  ],
  type: [
    {
      id: 'akzidenz-archivo',
      name: 'Archivo (Akzidenz stand-in)',
      display: {
        family: 'Archivo',
        weights: [500, 800],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Archivo',
        weights: [400, 500, 700],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Headlines 800, sentence case, tracking -0.02em, line-height 0.95, set as a block of 3–5 lines. Body 16/24, weight 400, never justified. Numerals tabular (font-variant-numeric: tabular-nums). Only three sizes on a page: headline, body, 12px caption.',
    },
    {
      id: 'ruder-hanken',
      name: 'Hanken Grotesk light (Univers mood)',
      display: {
        family: 'Hanken Grotesk',
        weights: [300, 500],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Hanken Grotesk',
        weights: [400, 500],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Ruder’s light Univers voice: headlines weight 300 at 64–120px, lowercase where the language allows, tracking -0.03em, line-height 1.0. Body 400 at 16/24; 500 for marginal labels at 12px uppercase tracking 0.08em. No bold anywhere.',
    },
    {
      id: 'neue-grafik-schibsted',
      name: 'Schibsted Grotesk + Public Sans',
      display: {
        family: 'Schibsted Grotesk',
        weights: [700, 900],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      body: { family: 'Public Sans', weights: [400, 600], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'Chiron Hei HK', body: 'Noto Sans SC' },
      notes:
        'Schibsted 900 for numerals and short headlines, tracking -0.03em, line-height 0.9; numbers set at 6–12× body. Public Sans body 16/24, 600 for table labels. Tabular lining figures in all tables.',
    },
  ],
  palettes: [
    {
      id: 'red-black-white',
      name: 'Red / black on white',
      colors: {
        paper: '#f7f6f2',
        ink: '#111111',
        muted: '#57554f',
        accent: '#e2001a',
        accent2: '#8f8d87',
        rule: '#111111',
        panel: '#e8e6df',
      },
      usage:
        'Ink on off-white for ≈80% of the page. Red only for the single geometric figure, section numerals and the 6px bar (≈10–15%). Grey accent2 for secondary arcs/bars behind the red. Panel only behind the information table.',
    },
    {
      id: 'poster-yellow',
      name: 'Poster yellow',
      colors: {
        paper: '#f2cd00',
        ink: '#141414',
        muted: '#4a3f00',
        accent: '#1d4f91',
        accent2: '#ffffff',
        rule: '#141414',
        panel: '#e0bc00',
      },
      usage:
        'Full-bleed yellow stock like a Kunstgewerbemuseum poster; black type and hairlines; blue only for the figure and numerals (≈10%); white for knocked-out type on blue and one reversed bar.',
    },
    {
      id: 'tonhalle-night',
      name: 'Tonhalle night',
      colors: {
        paper: '#121212',
        ink: '#f1eee6',
        muted: '#a3a097',
        accent: '#ff5a1f',
        accent2: '#4a8fd1',
        rule: '#f1eee6',
        panel: '#232323',
      },
      usage:
        'Black concert poster: off-white type (≈85% of marks); orange for the main arc or numeral; blue only as one secondary overlapping figure; never more than two accent shapes per screen.',
    },
  ],
  densities: ['regular', 'airy'],
  scales: ['perfect-fourth', 'perfect-fifth'],
  motion: [
    {
      id: 'grid-snap',
      name: 'Grid snap',
      description:
        'On load, blocks register into place field by field: each element jumps from its column origin to its final position in 3 discrete steps, staggered 40ms in reading order — a paste-up being aligned.',
      duration: '240ms',
      easing: 'steps(3, end)',
      reduced: 'Render everything in final position; no steps.',
    },
    {
      id: 'rule-draw',
      name: 'Rule draw',
      description:
        'Only on the first screen, once on load: hairlines and the accent bar extend from the left margin to their column end (scaleX 0→1, transform-origin left). Type never moves.',
      duration: '420ms',
      easing: 'cubic-bezier(.65,0,.35,1)',
      reduced: 'Rules are drawn at full length immediately.',
    },
    {
      id: 'still',
      name: 'Still',
      description:
        'No motion. Hover = 2px accent underline with 3px offset; links switch to the accent colour.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'concentric-arcs',
      name: 'Concentric arcs',
      description:
        'Beethoven-poster arcs: SVG quarter-circles with stepped stroke widths (4, 8, 16, 32px) radiating from one grid intersection and clipped to a declared field range.',
    },
    {
      id: 'section-numerals',
      name: 'Section numerals',
      description:
        'Two-digit numerals (01, 02 …) in the display weight at 4–6× body size, tabular figures, hanging in the left column; they double as navigation.',
    },
    {
      id: 'visible-grid',
      name: 'Visible grid',
      description:
        'The field grid drawn as 1px lines at 8% ink across the poster area — the construction is shown, not hidden.',
    },
  ],
  anchors: [
    {
      id: 'headline-block',
      name: 'Headline block',
      description:
        'A 3–5 line flush-left headline set tight (line-height 0.95) filling exactly the top-left 4 columns of the poster field; nothing else in those fields.',
    },
    {
      id: 'giant-numeral',
      name: 'Giant numeral',
      description:
        'One number from the facts (year, date, edition, count) at 30–40vw in accent, cropped by the right margin, with the headline set small beside it.',
    },
    {
      id: 'geometric-field',
      name: 'Geometric field',
      description:
        'An abstract figure (concentric arcs, a circle cut by the grid, or stacked bars) fills ≈60% of the first screen; the text is small and sits in two fields at the bottom-left.',
    },
  ],
  surfaces: [
    {
      id: 'offset-white',
      name: 'Uncoated offset',
      description: 'Flat uncoated stock, no texture; colours print solid with razor edges.',
      css: 'background-color: var(--paper);',
    },
    {
      id: 'construction-grid',
      name: 'Construction grid',
      description: 'The 6-field grid stays faintly visible behind the content, like a layout sheet.',
      css: 'background-image: repeating-linear-gradient(to right, transparent 0 calc(100% / 6 - 1px), color-mix(in srgb, var(--ink) 8%, transparent) calc(100% / 6 - 1px) calc(100% / 6));',
    },
    {
      id: 'silkscreen-solid',
      name: 'Silkscreen overprint',
      description:
        'Large flat accent figures with perfectly sharp edges; where two figures overlap they multiply, showing the overprint.',
      css: 'mix-blend-mode: multiply; /* on overlapping accent figures only */',
    },
  ],
  must: [
    'All text is flush-left, ragged-right; nothing centred or justified.',
    'Every element’s left edge lands on a declared column line (≤ 6 distinct x-positions per screen).',
    'A numeric system (01, 02 … or dates/times as large figures) organises the page.',
    'At most two type sizes per section besides the headline.',
  ],
  mustNot: [
    'No centred headline and no symmetrical hero.',
    'No decorative imagery: photos are objective (object, building, person straight-on) or absent; no illustrations, no textures behind text.',
    'No more than one accent colour plus black inside the same field.',
    'No rounded corners, shadows or icons.',
  ],
};

const rawBrutalist: Branch = {
  id: 'raw-brutalist',
  name: { zh: '粗野原生', en: 'Raw brutalist' },
  family: 'screen',
  concept: {
    zh: '网页粗野主义：故意保留浏览器默认的样子——Times 字、蓝色下划线链接、灰色原生按钮、粗黑边框，结构完全外露。像《彭博商业周刊》封面那样粗暴而准确，像 Experimental Jetset 那样只用一种响亮的颜色。不精致，但每个决定都是故意的、可读的。',
    en: 'Web brutalism: the browser’s defaults kept on purpose — Times, blue underlined links, grey native buttons, thick black borders, structure fully exposed. Blunt and exact like a Bloomberg Businessweek cover, with one loud colour like Experimental Jetset. No polish, but every decision is deliberate and legible.',
  },
  references: [
    'Bloomberg Businessweek covers under Richard Turley (2010–2014)',
    'Experimental Jetset, Whitney Museum “Responsive W” identity (2013)',
    'W3C HTML 3.2 default rendering and Netscape Navigator 1.x pages (1994–1997)',
    'Dexter Sinister, “Just-in-Time” publications (2006–)',
    'Alison & Peter Smithson, Robin Hood Gardens — brutalist béton brut (1972)',
  ],
  keywords: ['默认样式', '粗黑边框', '外露结构', '单一响色', '等宽', '蓝色链接'],
  tokens: {
    grid: 'No hidden grid: either a single column (max 70ch text, full-bleed headings and rules) or a full-bleed CSS grid with 0 gap whose cells are separated by 3px ink borders; spacing in multiples of 8px; content padded 16px, left-aligned.',
    radius: '0. Native buttons/inputs keep UA styling or get radius 0 with a 2px solid ink border.',
    border:
      '3px solid ink for structural boxes, 1px solid ink for table cells; borders collapse (negative margin -3px) instead of gapping; one element may carry a 12px accent border.',
    shadow:
      'none — except one optional hard 6px 6px 0 ink offset on the primary action, like a flattened Win95 bevel.',
  },
  layouts: [
    {
      id: 'document-dump',
      name: 'Document dump',
      description:
        'Looks like an unstyled HTML document someone made deliberately huge: an h1 at 12vw, then raw lists, native horizontal rules and underlined links.',
      grid: 'Single column; text max-width 70ch; h1 and <hr> run full-bleed; 16px base, 1em block margins, 16px side padding.',
      structure: [
        'h1 at 10–14vw, bold, broken onto 2–4 lines, followed by a 3px ink <hr>',
        'Plain paragraph of facts with underlined inline links',
        'Raw <ul>/<ol> with default bullets or numbers listing items/offers',
        'A real <table> with collapsed 1px borders for details (hours, prices, specs)',
        '<address> footer in italic, left-aligned, preceded by another <hr>',
      ],
    },
    {
      id: 'cover-blast',
      name: 'Cover blast',
      description:
        'Businessweek-cover energy: one gigantic word or number filling the viewport on a loud field, black text boxes slapped over it, a metadata strip.',
      grid: 'Full-bleed 4-column CSS grid, 0 gap, 3px ink borders; headline sized in vw so it touches both edges; overlay boxes positioned on the grid lines, not centred.',
      structure: [
        'Masthead line: name, issue/date and other metadata in mono 12px across the top',
        'Blast field: one word/number at 25–40vw on the accent field, clipped by the viewport',
        'Overlay deck: two or three black boxes with paper-colour text laid over the blast at grid offsets',
        'Contents list: numbered items with right-aligned mono numbers',
        'Bottom strip: contact and links in a single bordered row',
      ],
    },
    {
      id: 'exposed-table',
      name: 'Exposed table',
      description:
        'The whole page is a visible table: every piece of content lives in a bordered cell, column headers in reversed bars, nothing floats.',
      grid: 'CSS grid of 3–5 columns, 0 gap, every cell bordered 3px (collapsed), min-height 120px; mobile collapses to one column of cells.',
      structure: [
        'Header row: name cell spanning 3 columns + date/status cell',
        'Statement cell spanning full width in large mono',
        'Matrix of fact cells with spans of 1, 2 or 3 columns — no two neighbours the same size',
        'Link row: each link is a full cell, underlined, accent fill on hover',
        'Footer row with source/credit text at 12px',
      ],
    },
  ],
  type: [
    {
      id: 'default-times',
      name: 'Tinos + Cousine (browser defaults)',
      display: {
        family: 'Tinos',
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: 'google',
      },
      body: {
        family: 'Tinos',
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: 'google',
      },
      mono: {
        family: 'Cousine',
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Set like a UA stylesheet: body 16px/1.25, h1 700 at 10–14vw with line-height 0.9, h2 1.5em, no letter-spacing anywhere. Italic only for <address>, <em> and captions. Cousine for <code>, metadata and table numbers.',
    },
    {
      id: 'mono-everything',
      name: 'Space Mono + IBM Plex Mono',
      display: {
        family: 'Space Mono',
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Mono',
        weights: [400, 500, 700],
        fallback: 'Menlo, Consolas, monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Everything monospaced. Headlines Space Mono 700 uppercase, tracking 0, line-height 0.95. Body Plex Mono 15px/1.5, max 72ch. Label/value pairs aligned by the mono width (e.g. "DATE ....... 12 MAY"). Bold only for labels.',
    },
    {
      id: 'businessweek-black',
      name: 'Archivo Black + Arimo',
      display: {
        family: 'Archivo Black',
        weights: [400],
        fallback: '"Arial Black", Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Arimo',
        weights: [400, 700],
        fallback: 'Arial, "Liberation Sans", sans-serif',
        source: 'google',
      },
      mono: { family: 'Cousine', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Archivo Black at fit-to-width sizes (20–40vw), tracking -0.04em, line-height 0.82, mixed case. Arimo body 16/1.4, plain; 700 for labels. Never use Archivo Black below 32px. Cousine 12px for masthead metadata.',
    },
  ],
  palettes: [
    {
      id: 'orange-on-white',
      name: 'International orange on white',
      colors: {
        paper: '#ffffff',
        ink: '#000000',
        muted: '#4a4a4a',
        accent: '#ff4f00',
        accent2: '#0000ee',
        rule: '#000000',
        panel: '#ececec',
      },
      usage:
        'White page, black type and borders (≈85%). Orange is the one loud field — the blast block or one full cell (≈10–15%). UA link blue (#0000ee) only on links; nothing else is blue.',
    },
    {
      id: 'system-grey',
      name: 'System grey',
      colors: {
        paper: '#c0c0c0',
        ink: '#000000',
        muted: '#3a3a3a',
        accent: '#ff0000',
        accent2: '#000080',
        rule: '#000000',
        panel: '#ffffff',
      },
      usage:
        'Win95-grey page like an unstyled form; white panels for text and inputs; navy title bars with white text for headers; pure red for one alert-sized statement only.',
    },
    {
      id: 'acid-on-black',
      name: 'Acid on black',
      colors: {
        paper: '#0a0a0a',
        ink: '#f5f5f0',
        muted: '#a3a39b',
        accent: '#c6ff00',
        accent2: '#ff5ec4',
        rule: '#f5f5f0',
        panel: '#1a1a1a',
      },
      usage:
        'Black page, off-white type, 3px off-white borders. Acid green is the single loud field (text on it is black). Pink only for visited links and :focus outlines.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'hard-invert',
      name: 'Hard invert',
      description:
        'Hover/focus instantly inverts a cell or link (ink ↔ paper, or paper → accent). No transition at all.',
      duration: '0ms',
      easing: 'steps(1, end)',
      reduced: 'Same — it is a colour swap, not movement.',
    },
    {
      id: 'marquee-strip',
      name: 'Marquee strip',
      description:
        'One <marquee>-like metadata strip (translateX loop, constant speed) across the top; it pauses on hover. Nothing else moves.',
      duration: '18s',
      easing: 'linear',
      reduced: 'Stop the loop and show the strip as static wrapped text.',
    },
    {
      id: 'jump-cut',
      name: 'Jump cut',
      description:
        'No transitions anywhere: anchor links jump (scroll-behavior: auto), the active nav item fills with accent in one frame, :active buttons shift 2px down-right.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'native-controls',
      name: 'Native controls',
      description:
        'Real <button>, <input>, <select>, <details> with default or near-default rendering; a 2px ink border is the most styling allowed.',
    },
    {
      id: 'default-links',
      name: 'Default links',
      description:
        'Links are underlined (text-decoration-thickness 2px) in link blue/accent2, visited in a second colour; no button-styled links.',
    },
    {
      id: 'exposed-markup',
      name: 'Exposed markup',
      description:
        'Element names or source fragments as labels: "<h1>", "§ 2", "[img 640×480]" in mono 12px at the top-left corner of boxes.',
    },
  ],
  anchors: [
    {
      id: 'h1-wall',
      name: 'h1 wall',
      description:
        'A single unstyled-looking h1 at 12vw (bold serif or mono) filling the first screen in 3–4 broken lines; nothing else above the fold except an <hr>.',
    },
    {
      id: 'colour-blast',
      name: 'Colour blast',
      description:
        'One word or number on a full-bleed accent field at 30vw+, cropped by the viewport edges, with black text boxes overlapping it.',
    },
    {
      id: 'bordered-matrix',
      name: 'Bordered matrix',
      description:
        'The first screen is already the exposed table: 6–9 bordered cells of unequal spans carrying real facts.',
    },
  ],
  surfaces: [
    {
      id: 'bare-screen',
      name: 'Bare screen',
      description: 'Flat colour, no texture, no gradient — it looks undesigned, on purpose.',
      css: 'background: var(--paper);',
    },
    {
      id: 'loud-selection',
      name: 'Loud selection',
      description: 'Selection and focus are part of the look: accent fill, thick outlines.',
      css: '::selection { background: var(--accent); color: #000; } :focus-visible { outline: 4px solid var(--accent2); outline-offset: 0; }',
    },
    {
      id: 'xerox-1bit',
      name: '1-bit xerox',
      description: 'Images reduced to harsh black-and-white threshold, like a photocopy of a photocopy.',
      css: 'filter: grayscale(1) contrast(400%) brightness(1.1);',
    },
  ],
  must: [
    'Structure is visible: every major block has a real border or rule; nothing is separated by whitespace alone.',
    'Links look like links: underlined, in the link colour.',
    'Exactly one loud accent colour per page besides ink and paper (link colour excepted).',
    'Body text stays ≤ 75ch and ≥ 15px — raw, never illegible.',
  ],
  mustNot: [
    'No polish: no gradients, no rounded corners, no eased hover transitions.',
    'No illegible gimmicks: no overlapping that hides facts, no rotated body copy, no low-contrast text on the accent.',
    'No faux-glitch (RGB split, VHS noise, scanlines) — this is raw, not cyberpunk.',
    'No icon sets and no centred hero with buttons.',
  ],
};

const bauhausPrimary: Branch = {
  id: 'bauhaus-primary',
  name: { zh: '包豪斯', en: 'Bauhaus primary' },
  family: 'modernist',
  concept: {
    zh: '包豪斯的基本形与三原色：康定斯基的黄三角、红方块、蓝圆，再加黑色粗条和圆点做骨架。拜尔的通用字体、莫霍利-纳吉的版式、阿尔伯斯的色彩练习——不对称的平衡，几何无衬线，像教学挂图一样清楚。',
    en: 'Bauhaus elementary forms and primaries: Kandinsky’s yellow triangle, red square and blue circle, with black bars and dots as the skeleton. Herbert Bayer’s universal alphabet, Moholy-Nagy’s typophoto, Albers’ colour exercises — asymmetric balance, geometric sans, as clear as a teaching chart.',
  },
  references: [
    'Herbert Bayer, Universal alphabet (1925) and Bauhaus exhibition posters',
    'László Moholy-Nagy, Bauhausbücher covers (1925–1930)',
    'Joost Schmidt, poster for the Bauhaus Exhibition Weimar (1923)',
    'Josef Albers, Interaction of Color (1963) and Homage to the Square',
    'Wassily Kandinsky, form–colour questionnaire (1923)',
  ],
  keywords: ['基本形', '三原色', '不对称', '几何无衬线', '粗黑条', '圆点'],
  tokens: {
    grid: '12 columns, 16px gutter, 32px margins; 8px baseline; compositions balance on an off-centre vertical axis at 5/12 or 7/12 (or a 30° diagonal), never at 6/12.',
    radius: '0 for rectangles; 50% only for true circles (dots, discs); triangles via clip-path: polygon().',
    border:
      '12–24px solid ink bars as structural dividers (only at 0° or 90°); 2px ink for small boxes; no hairlines.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'bayer-poster',
      name: 'Exhibition poster',
      description:
        'Asymmetric poster: a heavy black vertical bar at the left third, a big disc or square overlapping it, text blocks set horizontally and one line rotated up the bar.',
      grid: '12 col; ink bar 24px wide on the col-4 line, full height; primary shape 5–7 columns wide on the 5/12 axis; text blocks in cols 6–12; 8px baseline.',
      structure: [
        'Poster: bar + two or three primary shapes + headline; one line rotated -90° up the bar',
        'Facts block: who / when / where as three stacked lines with 12px dots as bullets',
        'Programme: numbered rows with a red/yellow/blue square marking each category',
        'Footer: address and contact under a 12px black bar',
      ],
    },
    {
      id: 'teaching-chart',
      name: 'Teaching chart',
      description:
        'Like a Vorkurs teaching sheet: content broken into numbered exercises, each with a diagrammatic shape on the left and explanation on the right.',
      grid: 'Two zones — 4-column diagram column + 8-column text column, 32px gutter; each exercise row min 240px, separated by 12px ink bars.',
      structure: [
        'Title plate: name in geometric sans next to a row of square / circle / triangle',
        'Exercise 1: shape diagram + main statement',
        'Exercises 2–4: one row per offer or fact, each with a different elementary form',
        'Colour key: what each primary stands for on this page',
        'Signature line: contact set small',
      ],
    },
    {
      id: 'bauhausbuch-cover',
      name: 'Bauhausbuch cover',
      description:
        'Bauhausbücher-style: a cover of heavy horizontal bars and one huge numeral or initial, then strict two-column interior pages.',
      grid: '6 col, 24px gutter, 40px margin; bars 16px tall spanning 4–6 columns at staggered starts; interior text in 2 columns of 3.',
      structure: [
        'Cover: 2–3 horizontal black bars, one huge numeral or initial, title set between the bars',
        'Contents: list where bar length encodes size/duration/price',
        'Two-column body with section heads set on a coloured square',
        'Back cover: imprint-style colophon with contact',
      ],
    },
  ],
  type: [
    {
      id: 'universal-lowercase',
      name: 'Josefin Sans + Questrial (universal lowercase)',
      display: {
        family: 'Josefin Sans',
        weights: [300, 700],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Questrial',
        weights: [400],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Bayer’s rule: no capitals at all — headlines, nav and labels all lowercase (text-transform: lowercase). Display 700 at line-height 1.0, tracking 0.02em; 300 for secondary lines. Body Questrial 17/1.55. No italics.',
    },
    {
      id: 'futura-jost',
      name: 'Jost (Futura voice)',
      display: {
        family: 'Jost',
        weights: [500, 800],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Jost',
        weights: [400, 500],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Labels 800 uppercase, tracking 0.08em at 12–14px; headlines 500 mixed case at line-height 1.05, tracking -0.01em. Body 400 16/1.6. Numerals in 800 inside circles or squares.',
    },
    {
      id: 'spartan-kumbh',
      name: 'League Spartan + Kumbh Sans',
      display: {
        family: 'League Spartan',
        weights: [700, 900],
        fallback: 'Futura, Arial, sans-serif',
        source: 'google',
      },
      body: { family: 'Kumbh Sans', weights: [400, 600], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'League Spartan 900 for blocky headlines set against or inside the bars, tracking -0.02em, line-height 0.9, uppercase allowed. Kumbh Sans body 16/1.55, 600 for labels.',
    },
  ],
  palettes: [
    {
      id: 'primaries-on-cream',
      name: 'Primaries on cream',
      colors: {
        paper: '#f1ece0',
        ink: '#1b1b1b',
        muted: '#55524a',
        accent: '#d6261c',
        accent2: '#1f4fa3',
        rule: '#1b1b1b',
        panel: '#f2c21b',
      },
      usage:
        'Cream paper; black bars and type. Red square, blue circle and yellow triangle each appear at least once; yellow panel is the largest colour area (≤20%), red ≤10%, blue ≤10%.',
    },
    {
      id: 'stage-black',
      name: 'Stage black',
      colors: {
        paper: '#161514',
        ink: '#f3efe4',
        muted: '#a9a499',
        accent: '#e4b21c',
        accent2: '#c8321e',
        rule: '#f3efe4',
        panel: '#23408a',
      },
      usage:
        'Black ground like a Bauhaus stage-workshop poster; cream type and bars; yellow leads (triangle, numerals), red second, blue only as panel squares.',
    },
    {
      id: 'dessau-grey',
      name: 'Dessau grey',
      colors: {
        paper: '#d9d6cf',
        ink: '#141414',
        muted: '#45433e',
        accent: '#2a5db0',
        accent2: '#e8b70d',
        rule: '#141414',
        panel: '#ffffff',
      },
      usage:
        'Concrete-grey ground; blue leads (discs, links); yellow for the triangle and highlight bars; white panels hold text. Red is absent — a two-primary variant.',
    },
  ],
  densities: ['regular', 'airy'],
  scales: ['perfect-fourth', 'perfect-fifth', 'golden'],
  motion: [
    {
      id: 'form-turn',
      name: 'Form turn',
      description:
        'On hover a primary shape turns 90° (square) or 120° (triangle) in one mechanical move, like a piece of Alma Siedhoff-Buscher’s Bauhaus building game.',
      duration: '300ms',
      easing: 'cubic-bezier(.5,0,.2,1)',
      reduced: 'No rotation; swap the shape’s colour instead.',
    },
    {
      id: 'bar-slide',
      name: 'Bar slide',
      description:
        'Once on load, the black bars slide in along their own axis from the composition edge, one after another (60ms stagger); then everything is static.',
      duration: '360ms',
      easing: 'cubic-bezier(.7,0,.3,1)',
      reduced: 'Bars drawn in place.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'No motion; hover fills the item’s square marker with its primary colour.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'elementary-forms',
      name: 'Elementary forms',
      description:
        'Circle (blue), square (red), triangle (yellow) as flat SVG, used as bullets, section markers and large compositional weights.',
    },
    {
      id: 'bars-and-dots',
      name: 'Bars and dots',
      description:
        'Heavy black rules (12–24px) at 0° or 90° with 16px dots at their ends or crossings, as in Bayer’s and Schmidt’s posters.',
    },
    {
      id: 'albers-squares',
      name: 'Albers squares',
      description:
        'Nested squares in Homage-to-the-Square proportions (10:8:6:4 units, inner squares dropped toward the bottom) as an image stand-in or section mark.',
    },
  ],
  anchors: [
    {
      id: 'form-composition',
      name: 'Form composition',
      description:
        'The first screen is an asymmetric arrangement of the three forms at large size (largest ≈45vw) with the headline set across one of them.',
    },
    {
      id: 'vertical-bar-title',
      name: 'Vertical bar title',
      description:
        'The title runs rotated -90° up a full-height black bar at the left third; the rest of the screen is facts in small text plus one disc.',
    },
    {
      id: 'constructed-initial',
      name: 'Constructed initial',
      description:
        'A single letter or numeral (40vh) built from circle and square segments, with the name set small at its base.',
    },
  ],
  surfaces: [
    {
      id: 'flat-gouache',
      name: 'Flat gouache',
      description: 'Matte, slightly warm card; colours flat like gouache.',
      css: 'background: var(--paper);',
    },
    {
      id: 'litho-grain',
      name: 'Lithograph grain',
      description: 'Very fine stone-litho grain over the whole page.',
      css: 'background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence baseFrequency=%27.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.06%27/%3E%3C/svg%3E");',
    },
    {
      id: 'cut-card',
      name: 'Cut card',
      description: 'Shapes look cut from coloured card; where two overlap, the intersection multiplies.',
      css: 'mix-blend-mode: multiply; /* on overlapping shapes */',
    },
  ],
  must: [
    'At least two of the three elementary forms appear in primary colours.',
    'The composition is asymmetric: main axis at 5/12 or 7/12 (or a diagonal), never at 6/12.',
    'Headlines in a geometric sans; with the universal option, no capitals at all.',
  ],
  mustNot: [
    'No secondary or tertiary colours (purple, green, orange, pink) — only black, white/cream/grey and the primaries.',
    'No gradients and no rounded rectangles — only true circles and sharp polygons.',
    'No pictogram icons; shapes stay abstract.',
    'No centred, symmetrical hero.',
  ],
};

const constructivistPoster: Branch = {
  id: 'constructivist-poster',
  name: { zh: '构成主义海报', en: 'Constructivist poster' },
  family: 'modernist',
  concept: {
    zh: '罗琴科、利西茨基与斯滕伯格兄弟的海报：强烈的对角线，红黑两色压在奶油色纸上，照片剪影蒙太奇，喇叭般的粗体大字，一层层叠压的平面。画面不是被摆放的，而是被"构造"出来的——它在大声宣告。',
    en: 'Rodchenko, El Lissitzky and the Stenberg brothers: violent diagonals, red and black on cream stock, photomontage silhouettes, megaphone lettering and overlapping planes. The page isn’t arranged, it is constructed — and it is making an announcement at full volume.',
  },
  references: [
    'Alexander Rodchenko, “Books!” poster for Lengiz (1924)',
    'El Lissitzky, “Beat the Whites with the Red Wedge” (1919)',
    'Vladimir & Georgii Stenberg, poster for “Man with a Movie Camera” (1929)',
    'El Lissitzky, “About Two Squares” (1922)',
    'Gustav Klutsis, photomontage posters (1920s–30s)',
  ],
  keywords: ['对角线', '红黑', '照片蒙太奇', '喇叭字', '叠压平面', '宣告'],
  tokens: {
    grid: 'A 12-column grid (0 gutter, 24px margin) for small text only; big planes and headlines follow a primary axis rotated -15° to -30°, and a secondary axis at 90° to it.',
    radius: '0; circles (50%) only for discs and target motifs.',
    border:
      'No boxes around text; planes are solid fills; 4–8px ink "rails" run along the diagonal across the page.',
    shadow: 'none; depth comes from overlap and overprint (mix-blend-mode: multiply).',
  },
  layouts: [
    {
      id: 'diagonal-thrust',
      name: 'Diagonal thrust',
      description:
        'The whole first screen pivots on one diagonal: a red band from bottom-left to top-right with the headline running along it, a black disc at its end.',
      grid: 'Diagonal at -22°; headline baseline on the diagonal; orthogonal (0°) text blocks in cols 1–5 and 9–12; 24px margins.',
      structure: [
        'Diagonal hero: red band + headline on it + black disc overlapping the band’s end',
        'Manifesto block: 3–5 short numbered statements, one per line, at 0°',
        'Facts plane: date / place / contact on a black plane tilted -6°',
        'Slogan strip: one line of megaphone caps across the bottom edge',
      ],
    },
    {
      id: 'megaphone-cone',
      name: 'Megaphone',
      description:
        'Rodchenko “Books!” structure: a cone (or a cut-out figure) shouting the headline, whose words step up in size along the cone.',
      grid: '12 col; cone from a point in cols 1–2 widening to cols 4–12; headline words at 1×, 2×, 4× steps along the cone axis.',
      structure: [
        'Shout: cone + headline words stepping up in size',
        'Response column: facts set in a narrow 0° column',
        'Overlapping planes: 2–3 rectangles with offers/dates, rotated ±8°',
        'Ticket stub: address and contact in a ruled box',
      ],
    },
    {
      id: 'film-poster-stack',
      name: 'Film-poster stack',
      description:
        'Stenberg film-poster logic: a big photomontage or cut-out shape at left, title stacked in condensed caps at right, credits on tilted strips.',
      grid: '8 col; image plane cols 1–5, type plane cols 4–8 offset 40px down so they overlap one column; credits strips rotated 90° along the right edge.',
      structure: [
        'Poster plane: duotone cut-out + title stacked in 3–4 lines',
        'Credits strips: names and roles on tilted bars',
        'Schedule as a bordered timetable with red day headers',
        'Footer: city/date stamp inside a black disc',
      ],
    },
  ],
  type: [
    {
      id: 'russo-pt',
      name: 'Russo One + PT Sans',
      display: {
        family: 'Russo One',
        weights: [400],
        fallback: 'Impact, "Arial Black", sans-serif',
        source: 'google',
      },
      body: { family: 'PT Sans', weights: [400, 700], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Russo One uppercase, tracking 0.02em, line-height 0.9, set along the diagonal by rotating the whole block (never skew glyphs). PT Sans body 16/1.45; 700 for numbered statements. Cyrillic only if the facts supply it.',
    },
    {
      id: 'stencil-narrow',
      name: 'Big Shoulders Stencil + PT Sans Narrow',
      display: {
        family: 'Big Shoulders Stencil Display',
        weights: [800, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'PT Sans Narrow',
        weights: [400, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Stencil caps at 15–25vw stacked with line-height 0.82, tracking -0.01em. PT Sans Narrow 17/1.35 for credits and timetables; labels uppercase 700 with tracking 0.08em.',
    },
    {
      id: 'dela-gothic-archivo',
      name: 'Dela Gothic One + Archivo',
      display: {
        family: 'Dela Gothic One',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: { family: 'Archivo', weights: [400, 700], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Dela Gothic One as blocky megaphone lettering: uppercase, tracking 0, line-height 0.95, sizes stepping ×2 along the cone, never below 28px (it has Cyrillic if the facts supply any). Archivo body 16/1.5, 700 for numbered points.',
    },
  ],
  palettes: [
    {
      id: 'red-black-cream',
      name: 'Red and black on cream',
      colors: {
        paper: '#efe6d2',
        ink: '#1a1714',
        muted: '#5a5048',
        accent: '#d2281e',
        accent2: '#9a8d78',
        rule: '#1a1714',
        panel: '#e2d6bc',
      },
      usage:
        'Cream poster stock; red wedges and bands ≈25% of area; black planes and type ≈30%; photomontage in a grey-brown duotone (accent2).',
    },
    {
      id: 'black-red-ochre',
      name: 'Black poster',
      colors: {
        paper: '#191614',
        ink: '#efe6d2',
        muted: '#a89d8d',
        accent: '#e03a22',
        accent2: '#e3c26a',
        rule: '#efe6d2',
        panel: '#2a2522',
      },
      usage:
        'Black stock; cream type; red diagonal planes; ochre only for small stamps, numbers and one disc.',
    },
    {
      id: 'newsprint-red-blue',
      name: 'Grey newsprint, red and blue',
      colors: {
        paper: '#e4e1d8',
        ink: '#121212',
        muted: '#4c4a45',
        accent: '#c8202a',
        accent2: '#24467f',
        rule: '#121212',
        panel: '#cfc9ba',
      },
      usage:
        'Cool grey newsprint (Lissitzky exhibition-catalogue feel); red leads, a single blue plane counterweights it; black for text and rails.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['perfect-fifth', 'golden', 'augmented-fourth'],
  motion: [
    {
      id: 'wedge-strike',
      name: 'Wedge strike',
      description:
        'On load the red wedge/band slides along its own diagonal into place in one hard move and stops dead (no bounce); the headline then appears with no fade.',
      duration: '280ms',
      easing: 'cubic-bezier(.9,0,.1,1)',
      reduced: 'Wedge rendered in place.',
    },
    {
      id: 'plane-shift',
      name: 'Plane shift',
      description:
        'Hovering a rotated plane turns it back by 3° and pushes it 4px along the diagonal, like a paper cut-out nudged on the paste-up table.',
      duration: '160ms',
      easing: 'cubic-bezier(.3,0,.2,1)',
      reduced: 'No rotation; the plane’s fill switches to accent.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'Nothing moves; the diagonal does all the work. Hover = colour swap to accent.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'red-wedge',
      name: 'Red wedge',
      description: 'A sharp triangular wedge (clip-path polygon) piercing a disc or plane, Lissitzky-style.',
    },
    {
      id: 'photomontage-cutout',
      name: 'Photomontage cut-out',
      description:
        'Supplied photos masked to a hard-edged silhouette, turned into high-contrast duotone (ink + paper) and placed on coloured planes — never a plain photo rectangle.',
    },
    {
      id: 'sound-cone',
      name: 'Sound cone',
      description:
        'A triangle radiating from a point toward the headline with 2–4 thin rays inside — Rodchenko’s megaphone.',
    },
  ],
  anchors: [
    {
      id: 'diagonal-headline',
      name: 'Diagonal headline',
      description:
        'Headline at -15° to -30° across the full viewport width on a red band, overlapping a black disc.',
    },
    {
      id: 'shout',
      name: 'Shout',
      description:
        'Cone + words stepping 1×→4× in size form the first screen — the page literally shouts the name.',
    },
    {
      id: 'stacked-title',
      name: 'Stacked title',
      description:
        'Title stacked in 3–4 lines of stencil caps on the right, crossing a duotone cut-out on the left.',
    },
  ],
  surfaces: [
    {
      id: 'poster-stock',
      name: 'Poster stock',
      description: 'Cream uncoated poster paper with a faint grain.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size: 4px 4px;',
    },
    {
      id: 'overprint',
      name: 'Overprint',
      description:
        'Red and black planes overlap and multiply, darkening where they cross, as in two-pass printing.',
      css: 'mix-blend-mode: multiply;',
    },
    {
      id: 'duotone-photo',
      name: 'Duotone photo',
      description: 'Images in two colours: grayscale + contrast, multiplied over the accent or panel.',
      css: 'filter: grayscale(1) contrast(1.6); mix-blend-mode: multiply;',
    },
  ],
  must: [
    'At least one dominant diagonal (≥ 12° off horizontal) crosses most of the first screen.',
    'Red and black (or the palette equivalents) carry ≥ 50% of the non-paper area.',
    'Headline lettering is heavy, uppercase and sized to the viewport (≥ 8vw).',
    'At least two planes visibly overlap.',
  ],
  mustNot: [
    'No pastels and no gradients other than overprint.',
    'No skewed faux-italic glyphs — rotate blocks, never skewX the text.',
    'No Soviet iconography (hammer and sickle, red star, leader portraits) — use the formal language, not the politics.',
    'No body copy on the diagonal; only headlines and short labels rotate.',
  ],
};

const artDeco: Branch = {
  id: 'art-deco',
  name: { zh: '装饰艺术', en: 'Art Deco' },
  family: 'modernist',
  concept: {
    zh: '1920–30 年代的装饰艺术：饭店的铜字招牌、卡桑德尔的邮轮海报、上海外滩大楼的立面。放射的太阳光芒与扇形、阶梯式的几何、黑底金线或奶油底金字，高挑的大写或高反差衬线。允许对称——那是庄重，不是偷懒。',
    en: 'Art Deco of the 1920s–30s: brass hotel signage, Cassandre’s ocean-liner posters, the façades of the Shanghai Bund. Sunbursts and fans, stepped ziggurat geometry, gold lines on black or gilt letters on cream, tall capitals or high-contrast serifs. Symmetry is allowed — it means ceremony, not laziness.',
  },
  references: [
    'A. M. Cassandre, “Normandie” poster (1935)',
    'William Van Alen, Chrysler Building lobby and crown (1930)',
    '上海外滩沙逊大厦（今和平饭店北楼）, 1929',
    'Exposition internationale des Arts décoratifs, Paris (1925)',
    'Erté, Harper’s Bazaar covers (1915–1937)',
  ],
  keywords: ['放射纹', '扇形', '阶梯几何', '黑金', '对称', '高挑大写'],
  tokens: {
    grid: '12 columns, 24px gutter, 64px margin; a central symmetry axis is allowed; vertical rhythm 12px; nested frames step inward by 8px.',
    radius:
      '0 for frames; one arched top (border-radius: 50% 50% 0 0 / 30% 30% 0 0) allowed for a doorway/window frame; fans via SVG or conic-gradient.',
    border:
      'Double/triple fine lines: border: 5px double var(--accent) (1px + 3px gap + 1px); stepped corners via clip-path; 2px accent rules with a centred lozenge.',
    shadow: 'none; depth from stepped frames and tone shifts, never blur.',
  },
  layouts: [
    {
      id: 'lobby-symmetry',
      name: 'Hotel lobby',
      description:
        'Ceremonial symmetric page: a sunburst-crowned title inside a stepped frame on the centre axis, flanked by narrow pilaster columns.',
      grid: '12 col: pilasters cols 1–2 and 11–12 (ornament bands or small text), nave cols 3–10; 24px gutters; the axis is used for title and ornaments only.',
      structure: [
        'Crown: half-sunburst above the title; title in tall caps on the axis inside a stepped triple-line frame',
        'Directory board: facts as a lobby directory — name left, floor/time right, dotted leaders',
        'Twin panels: two mirrored framed panels with services or offers',
        'Lift dial: a semicircular dial whose ticks are the page’s sections',
        'Foot: address in small spaced caps on the axis',
      ],
    },
    {
      id: 'liner-poster',
      name: 'Liner poster',
      description:
        'Cassandre’s Normandie: one monumental shape seen from below, foreshortened, filling the screen, with a tall-caps title band at the base.',
      grid: 'First screen full-bleed: object 70% of height with its base at 78% from top; title band 22% high, caps tracking 0.2em; below, 8-column content with 24px gutters.',
      structure: [
        'Monument: one large shape (bow, tower, fan) in flat banded tones from a low viewpoint',
        'Title band: tall caps across the full width',
        'Itinerary: stops/times as a horizontal line with lozenge markers',
        'Services in two columns divided by a 1px accent rule',
        'Ticket-office footer: contact inside a stepped frame',
      ],
    },
    {
      id: 'facade-setbacks',
      name: 'Façade setbacks',
      description:
        'The page reads like a Bund façade from top to bottom: content floors that step inward like setbacks, separated by ornament bands.',
      grid: '10 col; floor 1 = 10 col, floor 2 = 8 col, floor 3 = 6 col (setbacks of 1 col each side); 24px chevron/fan bands between floors.',
      structure: [
        'Spire: name in a narrow vertical stack crowned by a fan',
        'Floor 1 (widest): main statement + key facts',
        'Ornament band of chevrons or scallops',
        'Floor 2: services in two columns',
        'Floor 3 (narrowest): hours and address at the base of a stepped frame',
      ],
    },
  ],
  type: [
    {
      id: 'poiret-josefin',
      name: 'Poiret One + Josefin Sans',
      display: {
        family: 'Poiret One',
        weights: [400],
        fallback: '"Century Gothic", Futura, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Josefin Sans',
        weights: [400, 600],
        fallback: '"Century Gothic", sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Poiret One uppercase only at ≥ 36px (it is hairline-thin), tracking 0.18em, line-height 1.1, on solid high-contrast grounds. Josefin Sans body 16/1.6; labels 600 uppercase, tracking 0.2em, 12px.',
    },
    {
      id: 'limelight-marcellus',
      name: 'Limelight + Marcellus',
      display: { family: 'Limelight', weights: [400], fallback: 'Didot, Georgia, serif', source: 'google' },
      body: { family: 'Marcellus', weights: [400], fallback: 'Optima, Georgia, serif', source: 'google' },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Limelight for marquee titles in caps or mixed case, tracking 0.04em, line-height 1.0; also for floor numbers and times. Marcellus body 17/1.6 — its flared strokes echo the display. No italics.',
    },
    {
      id: 'gilda-tenor',
      name: 'Gilda Display + Tenor Sans',
      display: {
        family: 'Gilda Display',
        weights: [400],
        fallback: 'Didot, "Bodoni 72", serif',
        source: 'google',
      },
      body: {
        family: 'Tenor Sans',
        weights: [400],
        fallback: 'Optima, "Gill Sans", sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Sans SC' },
      notes:
        'High-contrast Gilda for titles at 48px+, caps tracking 0.12em or mixed case at 0.02em. Tenor Sans body 16/1.6; labels uppercase tracking 0.25em at 11–12px. Old-style elegance, no bold weights at all.',
    },
  ],
  palettes: [
    {
      id: 'gold-on-black',
      name: 'Gold on black lacquer',
      colors: {
        paper: '#0f0e0c',
        ink: '#efe3c2',
        muted: '#b0a17a',
        accent: '#c9a24a',
        accent2: '#2e6b5a',
        rule: '#c9a24a',
        panel: '#1c1a16',
      },
      usage:
        'Lacquer black ground (≈75%); champagne type; gold for every rule, frame and fan (≈10%); jade only in one inset panel or ornament band (≈5%).',
    },
    {
      id: 'cream-and-gilt',
      name: 'Cream and gilt',
      colors: {
        paper: '#f3ead6',
        ink: '#1d1a14',
        muted: '#5c5240',
        accent: '#a8812f',
        accent2: '#12403c',
        rule: '#a8812f',
        panel: '#e8dbbd',
      },
      usage:
        'Cream plaster; near-black type; gilt hairlines, frames and fans; deep teal for one band or title panel (≈15%) with cream type on it.',
    },
    {
      id: 'liner-navy',
      name: 'Liner navy and red',
      colors: {
        paper: '#142238',
        ink: '#f2ead8',
        muted: '#a9b0bd',
        accent: '#d23a2a',
        accent2: '#d9b45a',
        rule: '#d9b45a',
        panel: '#1d3150',
      },
      usage:
        'Cassandre deep navy (≈70%); cream type; liner red for the monument’s band and one title word; brass for rules and frames. No bright cyan or neon.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['golden', 'perfect-fifth'],
  motion: [
    {
      id: 'fan-unfold',
      name: 'Fan unfold',
      description:
        'Once on load the sunburst/fan unfolds from its pivot (conic mask angle 0° → 180°), like a hand fan or a lift indicator sweeping.',
      duration: '700ms',
      easing: 'cubic-bezier(.25,.1,.25,1)',
      reduced: 'Show the full fan statically.',
    },
    {
      id: 'lift-needle',
      name: 'Lift needle',
      description:
        'A needle on a semicircular floor-indicator dial rotates to point at the current section as you navigate — the only moving part on the page.',
      duration: '500ms',
      easing: 'cubic-bezier(.4,0,.2,1)',
      reduced: 'The needle jumps to position without rotating.',
    },
    {
      id: 'marquee-bulbs',
      name: 'Marquee bulbs',
      description:
        'A row of small dots around the title frame lights in sequence (muted → accent) in 3 steps, like theatre bulbs, for two cycles, then stays lit.',
      duration: '900ms',
      easing: 'steps(3, end)',
      reduced: 'Bulbs static, all lit.',
    },
  ],
  motifs: [
    {
      id: 'sunburst',
      name: 'Sunburst',
      description:
        'Rays from a point at the bottom centre of a frame: 24–36 alternating accent/paper wedges via repeating-conic-gradient, clipped to a semicircle.',
    },
    {
      id: 'stepped-frame',
      name: 'Ziggurat frame',
      description:
        'Frames whose corners step inward three times (8px steps) via clip-path; titles sit inside like a building plaque.',
    },
    {
      id: 'chevron-band',
      name: 'Chevron band',
      description:
        'Horizontal 16–24px bands of zigzag chevrons or repeating scallop fans between sections, in accent.',
    },
  ],
  anchors: [
    {
      id: 'crowned-title',
      name: 'Crowned title',
      description:
        'Symmetric first screen: a half-sunburst crowning the name in tall spaced caps, inside a triple-line stepped frame.',
    },
    {
      id: 'monument',
      name: 'Monument',
      description:
        'One monumental shape (tower, bow, fan) in flat banded tones from a low viewpoint fills the screen, the title running along its base.',
    },
    {
      id: 'directory-board',
      name: 'Directory board',
      description:
        'A lobby directory: dark board with gilt letters listing the key facts on leader-dotted rows, framed — the information is the ornament.',
    },
  ],
  surfaces: [
    {
      id: 'lacquer',
      name: 'Lacquer',
      description: 'Deep, flat lacquer with no texture; gilt lines stay crisp.',
      css: 'background: var(--paper);',
    },
    {
      id: 'brushed-brass',
      name: 'Brushed brass',
      description: 'Panels with fine horizontal brushed-metal lines in accent tints (no specular highlight).',
      css: 'background-image: repeating-linear-gradient(0deg, color-mix(in srgb, var(--accent) 22%, var(--panel)) 0 1px, var(--panel) 1px 3px);',
    },
    {
      id: 'plaster-relief',
      name: 'Plaster relief',
      description: 'Cream plaster with a faint embossed scallop pattern at 5% ink.',
      css: 'background-image: radial-gradient(circle at 50% 100%, transparent 58%, rgba(0,0,0,.05) 59% 61%, transparent 62%); background-size: 48px 24px;',
    },
  ],
  must: [
    'At least one radiating motif (sunburst, fan or dial).',
    'Titles in tall caps or a high-contrast serif; caps tracked ≥ 0.1em.',
    'Frames use double/triple fine lines or stepped corners — never a single plain box.',
  ],
  mustNot: [
    'No Gatsby-party clichés: champagne glasses, flapper silhouettes, feathers.',
    'No shiny gold-foil imitations (specular gradients, glitter, rainbow shimmer).',
    'No soft rounded cards; the only curves are fans and one arch.',
    'No more than two metal/accent colours on a screen.',
  ],
};

const seventiesSupergraphic: Branch = {
  id: 'seventies-supergraphic',
  name: { zh: '七十年代超级图形', en: '70s supergraphic' },
  family: 'modernist',
  concept: {
    zh: '七十年代的超级图形：芭芭拉·斯托法赫·所罗门画满整面墙的巨大条纹，库珀黑时代的圆胖字体，NASA 的"蠕虫"标志，企鹅丛书的封面。橙、棕、芥末黄的大地色彩虹条带沿着转角弯曲流动——一切都圆润、厚实、乐观。',
    en: '1970s supergraphics: Barbara Stauffacher Solomon’s wall-sized stripes, the Cooper Black era of fat rounded letters, the NASA “worm”, Penguin paperback covers. Rainbow bands in earth tones — orange, brown, mustard — bend around corners; everything is round, thick and optimistic.',
  },
  references: [
    'Barbara Stauffacher Solomon, Sea Ranch supergraphics (1966–1970)',
    'Danne & Blackburn, NASA Graphics Standards Manual (1975)',
    'Cooper Black on 1970s record sleeves and shopfronts',
    'Penguin Books covers by David Pelham and Germano Facetti (1960s–70s)',
    'Alexander Girard, Braniff International “End of the Plain Plane” (1965)',
  ],
  keywords: ['彩虹条带', '大地色', '圆胖字', '弯曲转角', '橙棕芥末', '乐观'],
  tokens: {
    grid: '12 columns, 20px gutter, 40px margin; stripe stacks are 4–5 bands of equal width (20–32px each) with 0 gap; content sits inside the space a stripe bend encloses.',
    radius:
      'Large radii only where stripes turn corners (outer radius = 1.5 × stack height, e.g. 180–240px); content boxes 0; full circles for number dots; no medium radii (8–24px).',
    border: 'none on content; stripes are fills. Labels may take a 3px ink outline.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'stripe-wrap',
      name: 'Stripe wrap',
      description:
        'A 5-band stripe enters from the left edge, runs horizontally and bends 90° downward around a big rounded corner, framing the content like Sea Ranch wall graphics.',
      grid: '12 col; stripe stack 5 × 24px = 120px, outer corner radius 200px; content in cols 3–10 inside the bend; 8px baseline.',
      structure: [
        'Stripe entrance with the title set in fat type riding on the top band',
        'Intro inside the bend: 2–3 sentences, large',
        'Offer list as big numbered rows, each number in a round dot',
        'Stripes exit bottom-right carrying contact info reversed out of the darkest band',
      ],
    },
    {
      id: 'paperback-cover',
      name: 'Paperback cover',
      description:
        'Penguin-style tripartite cover: coloured top band with the name, central field with one bold stripe graphic, coloured bottom band — interior below.',
      grid: 'Cover = 100vh split 20 / 60 / 20; central graphic 8 col; interior below in 2 columns across 10 col, 32px gutter.',
      structure: [
        'Top band: name in fat type plus a small imprint-style mark',
        'Central field: one rounded stripe graphic',
        'Bottom band: date, place or edition line',
        'Interior: blurb and facts in two columns',
        'Back-cover footer: imprint block with contact',
      ],
    },
    {
      id: 'wayfinding-wall',
      name: 'Wayfinding wall',
      description:
        'Like a 1970s civic-building wall: a huge rounded wordmark, painted section numbers and arrows at architectural scale, text in tidy blocks.',
      grid: '6 col, 32px gutter; wordmark spans all 6 columns; section numbers in 160px circles in col 1; content cols 2–5.',
      structure: [
        'Wordmark across the top at 18vw, with continuous worm-like strokes',
        'Sections 1–n, each led by a painted number in a circle and an arrow',
        'A stripe divider bending between sections',
        'Directory/contact block on a mustard panel',
      ],
    },
  ],
  type: [
    {
      id: 'shrikhand-young',
      name: 'Shrikhand + Young Serif',
      display: {
        family: 'Shrikhand',
        weights: [400],
        fallback: '"Cooper Black", Georgia, serif',
        source: 'google',
      },
      body: { family: 'Young Serif', weights: [400], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Serif SC' },
      notes:
        'Shrikhand (fat swash italic, Cooper-era swagger) for titles at 48px+, tracking -0.01em, line-height 0.95, mixed case only. Young Serif body 17/1.55. Never set paragraphs in Shrikhand.',
    },
    {
      id: 'righteous-varela',
      name: 'Righteous + Varela Round',
      display: {
        family: 'Righteous',
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Varela Round',
        weights: [400],
        fallback: '"Arial Rounded MT Bold", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Righteous for wordmarks and section labels, lowercase where possible so it reads as one continuous worm; tracking 0.01em, line-height 1.0. Varela Round body 16/1.6. Numbers in Righteous inside circles.',
    },
    {
      id: 'tilt-warp-franklin',
      name: 'Tilt Warp + Libre Franklin',
      display: {
        family: 'Tilt Warp',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Libre Franklin',
        weights: [400, 600, 800],
        fallback: '"Franklin Gothic", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Tilt Warp for chunky headlines at 40–120px, line-height 1.0, never tracked out. Libre Franklin body 16/1.55; 800 uppercase labels tracking 0.06em, like ITC Franklin on 70s signage.',
    },
  ],
  palettes: [
    {
      id: 'harvest-stripes',
      name: 'Harvest stripes',
      colors: {
        paper: '#f5ead3',
        ink: '#3a2314',
        muted: '#6b4a33',
        accent: '#e2611b',
        accent2: '#e9a917',
        rule: '#8a3b1a',
        panel: '#f0d9a8',
      },
      usage:
        'Stripe order top→bottom: mustard (accent2), orange (accent), rust (rule), brown (ink). Stripes ≈25% of the first screen; type in dark brown; wheat panels behind lists.',
    },
    {
      id: 'chocolate-shag',
      name: 'Chocolate shag',
      colors: {
        paper: '#2b1a10',
        ink: '#f6e6c8',
        muted: '#c4a988',
        accent: '#f08a24',
        accent2: '#d9b23a',
        rule: '#b5481f',
        panel: '#3d2718',
      },
      usage:
        'Chocolate ground; cream type; orange and gold bands with a rust outer stripe; panels one step lighter brown.',
    },
    {
      id: 'avocado-teal',
      name: 'Avocado and teal',
      colors: {
        paper: '#eceadb',
        ink: '#22261a',
        muted: '#4f5440',
        accent: '#6f7d2c',
        accent2: '#2f7d86',
        rule: '#c4672a',
        panel: '#dcd8b8',
      },
      usage:
        'Kitchen-appliance 70s: avocado and teal bands with one burnt-orange stripe (rule); pale celery paper; deep olive-black type.',
    },
  ],
  densities: ['regular', 'airy'],
  scales: ['perfect-fifth', 'golden', 'perfect-fourth'],
  motion: [
    {
      id: 'stripe-paint-out',
      name: 'Stripe paint-out',
      description:
        'Once on load, stripes extend along their path like a paint roller, following the bend (stroke-dashoffset on SVG paths), each band 60ms after the one above.',
      duration: '900ms',
      easing: 'cubic-bezier(.45,0,.2,1)',
      reduced: 'Stripes drawn complete.',
    },
    {
      id: 'sliding-panel',
      name: 'Sliding panel',
      description:
        'Hovering a stripe-labelled link slides its band 8px to the right with a small overshoot, like a sliding wardrobe door.',
      duration: '220ms',
      easing: 'cubic-bezier(.34,1.56,.64,1)',
      reduced: 'No slide; the band changes colour.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'Nothing moves; hover swaps a number dot’s fill to the next stripe colour.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'rainbow-bands',
      name: 'Rainbow bands',
      description:
        '4–5 parallel bands in palette order, equal widths, hard edges, bending with large radii; built from stacked SVG paths or nested borders with border-radius.',
    },
    {
      id: 'number-dots',
      name: 'Number dots',
      description:
        'Section numbers or prices inside solid circles 1.5× the cap height, colour-coded by band.',
    },
    {
      id: 'sunset-arcs',
      name: 'Sunset arcs',
      description:
        'Five concentric half-circles in stripe colours sitting on a horizon line, used as a section terminator.',
    },
  ],
  anchors: [
    {
      id: 'bent-rainbow',
      name: 'Bent rainbow',
      description:
        'The stripe stack wraps the first screen from the left edge down to the bottom with a 200px corner; the title sits on the top band at 12vw.',
    },
    {
      id: 'fat-wordmark',
      name: 'Fat wordmark',
      description:
        'The name at fit-to-width size in fat rounded type, brown on wheat, with a short stripe stack beneath like a shop fascia.',
    },
    {
      id: 'paperback-front',
      name: 'Paperback front',
      description:
        'The first screen is a tripartite book cover (band / field / band) with one stripe graphic in the middle.',
    },
  ],
  surfaces: [
    {
      id: 'wall-emulsion',
      name: 'Wall emulsion',
      description: 'Flat matte painted-wall colour; stripes look rolled on.',
      css: 'background: var(--paper);',
    },
    {
      id: 'sun-faded',
      name: 'Sun-faded print',
      description: 'Colours slightly faded with a warm yellow cast, like a poster left in a shop window.',
      css: 'background-image: linear-gradient(rgba(240,200,120,.08), rgba(240,200,120,.08)); filter: saturate(.92);',
    },
    {
      id: 'paperback-stock',
      name: 'Paperback stock',
      description: 'Off-white pulp paper with sparse fibre speckle.',
      css: 'background-image: radial-gradient(rgba(90,60,30,.07) 1px, transparent 1.5px); background-size: 7px 9px;',
    },
  ],
  must: [
    'At least one stripe group of 3–5 parallel bands that bends around a large-radius corner or forms an arc.',
    'Headlines in a fat, rounded or swashy display face — no thin weights.',
    'Orange, brown and mustard (or the palette’s earth equivalents) are all present.',
  ],
  mustNot: [
    'No neon pinks or purples — that is the 80s, not the 70s.',
    'No smooth blends between bands; every band edge is hard.',
    'No disco clichés: mirror balls, flared-trouser silhouettes, peace signs as decoration.',
    'No hairline type for titles.',
  ],
};

const memphisPop: Branch = {
  id: 'memphis-pop',
  name: { zh: '孟菲斯', en: 'Memphis pop' },
  family: 'modernist',
  concept: {
    zh: '索特萨斯与杜·帕斯奎尔的孟菲斯小组：弯弯曲曲的粗线、水磨石斑点、彩纸屑图案、黑白小方格，粉彩和原色正面相撞。家具像玩具，图形像在开派对——故意的不和谐，但每块颜色都边缘清楚。',
    en: 'The Memphis Group of Sottsass and du Pasquier: squiggles, terrazzo flecks, confetti prints, black-and-white grids, pastels colliding with primaries. Furniture like toys, graphics like a party — deliberate clashes, but every colour field has a crisp outline.',
  },
  references: [
    'Ettore Sottsass, Carlton room divider (1981)',
    'Nathalie du Pasquier, laminate and textile patterns for Memphis (1981–1987)',
    'Peter Shire, Bel Air armchair (1982)',
    'Christoph Radl, Memphis catalogues and posters (1981–1988)',
    'Ettore Sottsass, “Bacterio” print for Abet Laminati (1978)',
  ],
  keywords: ['弯曲线', '水磨石', '彩纸屑', '黑白方格', '粉彩撞色', '玩具感'],
  tokens: {
    grid: '12 columns, 16px gutter, 32px margins; coloured blocks may be offset by one column or rotated ±3–8°, but text inside a block is always straight and aligned.',
    radius:
      '0 for laminate blocks; 50% for discs; half- and quarter-discs via one- or two-corner radii (e.g. border-radius: 0 0 0 100%).',
    border: '3px solid ink outline on every coloured block; patterns meet along 3px ink lines.',
    shadow: 'Hard offsets only: 8px 8px 0 var(--ink) (or a pattern-filled offset block). Never blurred.',
  },
  layouts: [
    {
      id: 'furniture-stack',
      name: 'Furniture stack',
      description:
        'Content blocks stacked like a Sottsass totem: each block a different shape and pattern, balanced on the one below.',
      grid: '12 col; stack axis cols 4–9; blocks 4–8 columns wide, offset ±1 col; side columns carry small text and confetti.',
      structure: [
        'Top piece: name on a half-disc or pyramid',
        'Statement block on a terrazzo panel',
        'Offer blocks of different widths stacked off-axis',
        'Plinth: black-and-white grid block carrying contact details',
      ],
    },
    {
      id: 'pattern-patchwork',
      name: 'Pattern patchwork',
      description:
        'A collage of rectangular patches, each with a different fill (grid, squiggle, terrazzo, solid), with paper-coloured content panels pinned on top.',
      grid: 'CSS grid 6 × n, 0 gap, patches span 1–3 cells; content panels span 2–4 cells and overlap patch borders by 16px.',
      structure: [
        'Patchwork hero: 6–8 patterned patches with the title panel overlapping three of them',
        'Facts as tilted label panels (rotated ±4°)',
        'Schedule/table on a black-and-white grid ground',
        'Footer row of patches with contact',
      ],
    },
    {
      id: 'catalogue-object',
      name: 'Catalogue page',
      description:
        'Like a Memphis catalogue: one object (or the product) on a coloured ground with geometric props around it, captions in tidy columns.',
      grid: '8 col, 24px gutter; object field cols 1–5 (square), caption cols 6–8; sections alternate sides.',
      structure: [
        'Catalogue cover: name + year/edition with a squiggle and a disc prop',
        'Object spreads: 2–4 items alternating left/right, each with a caption (name, material, size/price)',
        'Pattern index: small swatches naming the patterns used',
        'Colophon in two columns',
      ],
    },
  ],
  type: [
    {
      id: 'bungee-shade-kumbh',
      name: 'Bungee Shade + Kumbh Sans',
      display: {
        family: 'Bungee Shade',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: { family: 'Kumbh Sans', weights: [400, 700], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Bungee Shade (caps only) for 1–3 word titles at 48px+, tracking 0.02em, always on a solid panel, never on a pattern. Kumbh Sans body 16/1.55; 700 for caption labels.',
    },
    {
      id: 'chango-questrial',
      name: 'Chango + Questrial',
      display: { family: 'Chango', weights: [400], fallback: '"Arial Black", sans-serif', source: 'google' },
      body: { family: 'Questrial', weights: [400], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Chango (wide, heavy, toy-like) for titles at 40–96px, mixed case, line-height 1.05. Questrial body 16/1.6; captions 13px uppercase tracking 0.1em.',
    },
    {
      id: 'titan-karla',
      name: 'Titan One + Karla',
      display: {
        family: 'Titan One',
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: 'google',
      },
      body: { family: 'Karla', weights: [400, 700], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Titan One for chunky round titles at 36–80px, mixed case; the whole title block may sit at -4°. Karla body 16/1.55, 700 for item names.',
    },
  ],
  palettes: [
    {
      id: 'pastel-clash',
      name: 'Pastel clash',
      colors: {
        paper: '#fff8ee',
        ink: '#121212',
        muted: '#4a4a4a',
        accent: '#f06e9c',
        accent2: '#2a5bd7',
        rule: '#121212',
        panel: '#a8e6d4',
      },
      usage:
        'Ivory ground; black outlines and grids; flamingo pink and cobalt as the clashing pair on blocks (≈30% combined); mint panels behind text; yellow only inside patterns.',
    },
    {
      id: 'laminate-yellow',
      name: 'Laminate yellow',
      colors: {
        paper: '#ffd84a',
        ink: '#141414',
        muted: '#4a3d00',
        accent: '#e8412c',
        accent2: '#1b8a6b',
        rule: '#141414',
        panel: '#ffffff',
      },
      usage:
        'Bright laminate-yellow ground; red and green blocks; white outlined panels carry all text; black grids and squiggles.',
    },
    {
      id: 'bacterio-black',
      name: 'Bacterio black',
      colors: {
        paper: '#141414',
        ink: '#fbf3e6',
        muted: '#b3aca0',
        accent: '#f4a6c0',
        accent2: '#8fd3c7',
        rule: '#fbf3e6',
        panel: '#2a2a2a',
      },
      usage:
        'Black ground with cream squiggles and flecks; pastel pink and aqua blocks with black text on them; outlines in cream. Pastels stay chalky, never neon.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fifth', 'augmented-fourth', 'major-third'],
  motion: [
    {
      id: 'toy-wobble',
      name: 'Toy wobble',
      description: 'Hovering a block rocks it -3° → +2° → 0°, like a stacked toy settling.',
      duration: '420ms',
      easing: 'cubic-bezier(.34,1.56,.64,1)',
      reduced: 'No rotation; swap the block’s pattern fill.',
    },
    {
      id: 'pattern-shuffle',
      name: 'Pattern shuffle',
      description: 'Hovering a patch cycles its fill through three patterns in hard steps.',
      duration: '300ms',
      easing: 'steps(3, end)',
      reduced: 'The pattern changes once, without stepping.',
    },
    {
      id: 'squiggle-draw',
      name: 'Squiggle draw',
      description:
        'The signature squiggle draws itself once on load (stroke-dashoffset), nothing else moves.',
      duration: '800ms',
      easing: 'cubic-bezier(.6,0,.4,1)',
      reduced: 'Squiggle drawn complete.',
    },
  ],
  motifs: [
    {
      id: 'squiggles',
      name: 'Squiggles',
      description:
        'Thick (6–10px) wavy SVG strokes with round caps in ink or accent, scattered at ±30° across panels; at most 5 per screen.',
    },
    {
      id: 'terrazzo-confetti',
      name: 'Terrazzo / confetti',
      description:
        'Random flecks — triangles, dashes, dots 4–12px — in three palette colours, like du Pasquier laminates.',
    },
    {
      id: 'bw-grid',
      name: 'Black-and-white grid',
      description:
        '2px ink grid at 12–14px pitch on paper, Abet-laminate style, filling one large shape per screen.',
    },
  ],
  anchors: [
    {
      id: 'object-totem',
      name: 'Object totem',
      description:
        'A stacked sculpture of 4–6 geometric shapes with different fills stands at the left; the title sits on the right.',
    },
    {
      id: 'patch-collage',
      name: 'Patch collage',
      description:
        'The first screen is 6–8 patterned rectangles with the title on a solid panel overlapping them, rotated -4°.',
    },
    {
      id: 'squiggle-title',
      name: 'Squiggle title',
      description:
        'A huge title with a 12px squiggle underline and two geometric props (disc, triangle) touching the letters.',
    },
  ],
  surfaces: [
    {
      id: 'plastic-laminate',
      name: 'Plastic laminate',
      description: 'Flat colour fields with 3px ink outlines — the Abet Laminati look.',
      css: 'background: var(--panel); outline: 3px solid var(--ink);',
    },
    {
      id: 'terrazzo',
      name: 'Terrazzo',
      description: 'Scattered coloured flecks on paper.',
      css: 'background-image: radial-gradient(circle at 20% 30%, var(--accent) 0 3px, transparent 4px), radial-gradient(circle at 70% 60%, var(--accent2) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, var(--ink) 0 2px, transparent 3px); background-size: 60px 60px, 44px 44px, 36px 36px;',
    },
    {
      id: 'grid-laminate',
      name: 'Grid laminate',
      description: 'Black grid on paper for one large shape per screen.',
      css: 'background-color: var(--paper); background-image: linear-gradient(var(--ink) 2px, transparent 2px), linear-gradient(90deg, var(--ink) 2px, transparent 2px); background-size: 14px 14px;',
    },
  ],
  must: [
    'At least three different pattern fills (grid, squiggle, terrazzo/confetti) appear on the page.',
    'Every coloured block has a visible ink outline or a hard offset — crisp edges.',
    'At least one pastel and one primary colour collide in the same view.',
    'Body copy always sits on a solid panel.',
  ],
  mustNot: [
    'No gradients and no glows — Memphis is flat laminate.',
    'No synthwave clichés: neon grids to the horizon, chrome lettering, sunsets.',
    'No pattern behind body text.',
    'No blurred shadows; only hard offsets.',
  ],
};

const warmHandmade: Branch = {
  id: 'warm-handmade',
  name: { zh: '手作温度', en: 'Warm handmade' },
  family: 'craft',
  concept: {
    zh: '街角手作小店的温度：牛皮纸、橡皮章、手写标签、麻绳、木刻版画小插图，以及歪一点的手绘边框。不完美是证据——说明真的有人一件件做出来、一个个写上去。',
    en: 'The warmth of a corner shop that makes things by hand: kraft paper, rubber stamps, handwritten labels, twine, linocut vignettes and slightly crooked hand-drawn borders. The imperfection is evidence — someone really made each thing and wrote each label.',
  },
  references: [
    'Edward Bawden linocuts and shop posters (1950s–1980s)',
    'Whole Earth Catalog hand-pasted layouts (1968–1972)',
    'Hand-written POP price cards in Japanese 雑貨 shops',
    'Kraft-paper bakery bags with rubber-stamped logos',
    'Farmers’ market chalkboards',
  ],
  keywords: ['牛皮纸', '橡皮章', '手写标签', '麻绳', '木刻版画', '手绘边框'],
  tokens: {
    grid: 'Loose 6-column grid, 24px gutter, 32px margins; at most one element in three sits ±1–2° off-axis or ±4px off-grid; 8px baseline for body only.',
    radius:
      '0–3px on paper tags; tag corners cut with clip-path; hand-drawn borders are SVG paths, not border-radius.',
    border:
      'Hand-drawn: SVG strokes 1.5–2.5px with slight wobble (feTurbulence + feDisplacementMap, scale 2–3); 2px dashed "stitch" lines for sewn edges.',
    shadow: 'Paper only: 1px 2px 0 rgba(60,40,20,.25) under taped or pinned labels; no blurred shadows.',
  },
  layouts: [
    {
      id: 'shop-counter',
      name: 'Shop counter',
      description:
        'Like the counter of a small shop: a hand-lettered sign at the top, tags hanging from a twine line in the middle, a notice board at the bottom.',
      grid: '6 col; sign spans cols 1–4 rotated -1°; twine line full width with 3–5 tags of 1–2 columns each; notice board cols 3–6.',
      structure: [
        'Sign: name hand-lettered on a kraft board with a stamped "est./since" line',
        'Twine line: each hanging tag is one product or offer with a handwritten price',
        'Notice board: hours and news as pinned paper notes',
        'Stamp footer: address inside a circular rubber stamp + contact',
      ],
    },
    {
      id: 'recipe-cards',
      name: 'Recipe cards',
      description:
        'An index-card system: each section is a lined card with a handwritten title and typed body, stacked with slight offsets.',
      grid: 'Cards 560px wide in one column, alternating ±12px x-offset and ±1.5° rotation; ruled lines every 28px; 40px between cards.',
      structure: [
        'Cover card: name in handwriting, linocut vignette in a corner',
        'Card 1: what we make — a typed list',
        'Cards 2–3: one per product or service, each with a stamped label',
        'Last card: how to find us — address, hours, a small hand-drawn map',
      ],
    },
    {
      id: 'kraft-bag',
      name: 'Kraft bag',
      description:
        'The page is a kraft bag: a big rubber-stamp logo on the front, a paper label band wrapped around, the back panel printed with details.',
      grid: '8 col; stamp 4 col wide in the first screen; label band full width rotated -2°; back panel in 2 columns of 4, 24px gutter.',
      structure: [
        'Front: stamp logo + a handwritten note on a small label',
        'Label band: one-line statement across the width',
        'Back panel: materials/ingredients list + care or usage notes',
        'Seal sticker: contact info inside a round sticker',
        'Footer with a stitched (dashed) bottom edge',
      ],
    },
  ],
  type: [
    {
      id: 'caveat-alegreya-sans',
      name: 'Caveat + Alegreya Sans',
      display: {
        family: 'Caveat',
        weights: [500, 700],
        fallback: '"Bradley Hand", "Segoe Print", cursive',
        source: 'google',
      },
      body: {
        family: 'Alegreya Sans',
        weights: [400, 500, 700],
        fallback: '"Gill Sans", Calibri, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Long Cang', body: 'Noto Sans SC' },
      notes:
        'Caveat for handwritten labels, prices and titles at 28–72px; rotate whole labels -2° to +2°, never individual letters; never for paragraphs. Alegreya Sans body 17/1.6. Prices in Caveat 700 with a smaller currency sign.',
    },
    {
      id: 'stamp-courier',
      name: 'Rubik Dirt + Courier Prime',
      display: { family: 'Rubik Dirt', weights: [400], fallback: 'Impact, sans-serif', source: 'google' },
      body: {
        family: 'Courier Prime',
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Serif SC' },
      notes:
        'Rubik Dirt as the rubber stamp: uppercase, tracking 0.06em, in accent at 85% opacity with mix-blend-mode: multiply, block rotated -3°. Courier Prime body 16/1.55 like typed tags; underline with a hand-drawn SVG stroke, not CSS.',
    },
    {
      id: 'amatic-alegreya',
      name: 'Amatic SC + Alegreya',
      display: {
        family: 'Amatic SC',
        weights: [700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Alegreya',
        weights: [400, 500, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'LXGW WenKai TC', body: 'Noto Serif SC' },
      notes:
        'Amatic SC tall hand-drawn capitals for chalkboard signs at 48–120px, tracking 0.04em, line-height 1.0; never below 28px. Alegreya body 17/1.6, italic for notes and origins.',
    },
  ],
  palettes: [
    {
      id: 'kraft-and-stamp',
      name: 'Kraft and stamp ink',
      colors: {
        paper: '#d8bf96',
        ink: '#2a1d12',
        muted: '#5a4127',
        accent: '#b5352a',
        accent2: '#2f4d6b',
        rule: '#6b4e2f',
        panel: '#f3ead8',
      },
      usage:
        'Kraft ground (≈60%); off-white tags and labels carry text (≈30%); stamp red for logos and prices; indigo stamp ink for secondary marks; twine and rules in brown.',
    },
    {
      id: 'linen-sage',
      name: 'Linen and sage',
      colors: {
        paper: '#f6f0e4',
        ink: '#2b2620',
        muted: '#645a4d',
        accent: '#5c7a3a',
        accent2: '#c06a2b',
        rule: '#8a7a64',
        panel: '#e9dfcb',
      },
      usage:
        'Unbleached linen page; sage for stamps and headings; terracotta for prices and one linocut; kraft-tone panels behind tags.',
    },
    {
      id: 'chalkboard',
      name: 'Chalkboard',
      colors: {
        paper: '#2e3430',
        ink: '#f1ede2',
        muted: '#b9b9ae',
        accent: '#f2c14e',
        accent2: '#e98a7d',
        rule: '#c8c6bb',
        panel: '#3a413c',
      },
      usage:
        'Green-black board; chalk-white handwriting and body; yellow chalk for prices, pink chalk for one highlight per section; panels a step lighter like a cleaner patch of board.',
    },
  ],
  densities: ['regular', 'airy'],
  scales: ['major-third', 'perfect-fourth'],
  motion: [
    {
      id: 'stamp-press',
      name: 'Stamp press',
      description:
        'Rubber stamps arrive by pressing: scale 1.15 → 0.97 → 1 and opacity 0 → 0.85, once when first visible; the ink stays slightly uneven.',
      duration: '260ms',
      easing: 'cubic-bezier(.2,.9,.3,1.2)',
      reduced: 'Stamps shown at rest.',
    },
    {
      id: 'tag-swing',
      name: 'Tag swing',
      description: 'Hovering a hanging tag swings it from its hole: 0° → 4° → -2° → 0°.',
      duration: '600ms',
      easing: 'cubic-bezier(.36,.07,.19,.97)',
      reduced: 'No swing; the tag text gets a hand-drawn underline.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'Nothing moves; links get a hand-drawn SVG squiggle underline on hover.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'rubber-stamps',
      name: 'Rubber stamps',
      description:
        'Round or rectangular stamps (logo, date, "HANDMADE", 手作) with uneven ink: an SVG noise mask knocks 15–25% out of the fill.',
    },
    {
      id: 'twine-tags',
      name: 'Twine and tags',
      description:
        'Paper tags with a punched hole and a 2px dashed brown twine line tying them to a line or item.',
    },
    {
      id: 'linocut-vignettes',
      name: 'Linocut vignettes',
      description:
        'Small one-colour SVG illustrations with gouged-line texture (solid shapes, white carving lines), depicting the actual products (bread, cup, leaf, needle).',
    },
  ],
  anchors: [
    {
      id: 'hand-sign',
      name: 'Hand-lettered sign',
      description:
        'The name hand-lettered at 10–14vw on a kraft or chalk board, rotated -1°, with a stamped date line below.',
    },
    {
      id: 'tag-line-up',
      name: 'Tag line-up',
      description:
        'A twine line crosses the first screen with 3–5 hanging tags of different sizes, each a real item and price from the facts.',
    },
    {
      id: 'big-stamp',
      name: 'Big stamp',
      description:
        'One large circular rubber stamp (40vw) with the name around the ring and a linocut vignette in the centre.',
    },
  ],
  surfaces: [
    {
      id: 'kraft-fibre',
      name: 'Kraft fibre',
      description: 'Brown kraft with visible fibre streaks and specks.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(83deg, rgba(90,60,30,.05) 0 1px, transparent 1px 7px), radial-gradient(rgba(60,40,20,.08) 1px, transparent 1px); background-size: auto, 5px 5px;',
    },
    {
      id: 'masking-tape',
      name: 'Masking tape',
      description: 'Labels held by tape strips at the corners: 64×20px, rotated ±12°, with torn ends.',
      css: 'background: rgba(236,222,180,.8); clip-path: polygon(0 10%, 4% 0, 96% 8%, 100% 0, 100% 90%, 96% 100%, 4% 92%, 0 100%);',
    },
    {
      id: 'chalk-dust',
      name: 'Chalk dust',
      description: 'A board with faint smudged eraser marks.',
      css: 'background-image: radial-gradient(ellipse at 30% 40%, rgba(255,255,255,.05), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,.04), transparent 55%);',
    },
  ],
  must: [
    'At least one genuinely hand-made element: hand-lettered display, a stamp with uneven ink, or a wobbly hand-drawn border.',
    'Prices, hours and items are written as labels or tags, not as a generic table.',
    'Illustrations, if any, are one-colour linocut-style and depict real items from the facts.',
  ],
  mustNot: [
    'No farmhouse clip-art clichés: "Live Laugh Love" script, mason-jar icons, wood-plank photo backgrounds.',
    'No handwriting face for body paragraphs — labels and titles only.',
    'No glossy gradients, no perfect geometric icon sets.',
    'Do not tilt everything: at most one element in three is off-axis.',
  ],
};

const maWhitespace: Branch = {
  id: 'ma-whitespace',
  name: { zh: '余白', en: 'Ma whitespace' },
  family: 'craft',
  concept: {
    zh: '日本的"间"：无印良品的目录、原研哉的展览书、Nendo 的作品集与日本的书籍装帧。大面积的留白不是空，而是让一件物、一行字被安静地看见；竖排、细小而精确的字号，只留一个克制的点色。',
    en: 'Japanese ma (間): Muji catalogues, Kenya Hara’s exhibition books, Nendo monographs and Japanese book design. The vast emptiness is not absence — it lets one object or one line be seen in quiet. Vertical setting, tiny precise type, a single restrained accent.',
  },
  references: [
    'Kenya Hara, “White” (2008) and “Designing Design” (2007)',
    'Ikko Tanaka, early Muji posters and catalogues (1980s)',
    'Nendo monographs and exhibition catalogues',
    'Iwanami Bunko paperback bindings (岩波文庫)',
    'Kenya Hara, “Haptic” exhibition catalogue (2004)',
  ],
  keywords: ['余白', '竖排', '细小字号', '明朝体', '一点色', '安静'],
  tokens: {
    grid: '12 columns, 32px gutter, 10vw outer margin; content occupies ≤ 40% of any screen; 6px baseline; vertical blocks use writing-mode: vertical-rl with line length 18–28em.',
    radius: '0.',
    border:
      'Hairlines only (1px at 40% ink), never full-width: short 24–80px rules mark the start or end of a block.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'vertical-colophon',
      name: 'Vertical colophon',
      description:
        'A book page: the title set vertically at the right edge, a short vertical text column to its left, the rest of the first screen empty.',
      grid: '12 col; vertical title in cols 11–12 from 12vh; vertical text block in cols 8–10; cols 1–7 empty except a tiny page number bottom-left; 6px baseline.',
      structure: [
        'Right edge: vertical title + small vertical subtitle',
        'Vertical text block (writing-mode: vertical-rl) of 3–6 short lines',
        'Turn: one object image, or an empty field with a single 11px caption',
        'Horizontal end matter: facts in a small label/value table starting at col 2',
        'Colophon: 11px lines under a 40px hairline',
      ],
    },
    {
      id: 'object-catalogue',
      name: 'Object catalogue',
      description:
        'A Muji catalogue: one object (or one fact) per screen, small and low, a three-line caption beside it, vast paper around.',
      grid: '12 col; object box 3–4 columns wide in cols 5–8, bottom third of each 100vh section; caption cols 9–10 aligned to the object’s base.',
      structure: [
        'Opening: name at 14px top-left; one line of text near the bottom; nothing else',
        'Object 1: image or typographic object + caption (name / material / price)',
        'Objects 2…n: the same quiet rhythm, alternating left and right',
        'Index: tiny numbered list of all items',
        'Closing: address and hours at 12px bottom-right',
      ],
    },
    {
      id: 'exhibition-book',
      name: 'Exhibition book',
      description:
        'A Kenya Hara exhibition catalogue: horizontal text in a narrow measure, a large field of paper, one accent hairline as a bookmark.',
      grid: '12 col; text measure 26–32em in cols 3–6; marginal notes cols 9–10; top margin 30vh; 6px baseline.',
      structure: [
        'Title page: title 18–24px at 30vh, date/author below, one 40px accent hairline',
        'Essay: 2–4 short paragraphs in narrow measure with marginal notes',
        'Plate: one full-width image or a bare paper field with a caption',
        'Facts: label/value pairs with 2em gaps between rows',
        'Back matter: contact at 11px',
      ],
    },
  ],
  type: [
    {
      id: 'shippori-garamond',
      name: 'Shippori Mincho + EB Garamond',
      display: {
        family: 'Shippori Mincho',
        weights: [400, 600],
        fallback: '"Hiragino Mincho ProN", "Yu Mincho", serif',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Titles small and quiet: 20–32px, weight 400, tracking 0.08em (Latin) / 0.12em (CJK). Body 14–15px/1.9 (CJK) or 16/1.7 (Latin) with font-feature-settings: "palt" for CJK and old-style figures in Garamond. Vertical CJK with text-orientation: mixed.',
    },
    {
      id: 'zen-kaku-label',
      name: 'Zen Kaku Gothic New (Muji label)',
      display: {
        family: 'Zen Kaku Gothic New',
        weights: [300, 500],
        fallback: '"Hiragino Sans", "Yu Gothic", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Zen Kaku Gothic New',
        weights: [400],
        fallback: '"Hiragino Sans", "Yu Gothic", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Label voice: everything 11–14px, weights 300–500, tracking 0.04em; only the name may reach 20px. Captions as three stacked lines: name / material / price. Tabular figures. No bold, no uppercase.',
    },
    {
      id: 'klee-old-mincho',
      name: 'Klee One + Zen Old Mincho',
      display: {
        family: 'Klee One',
        weights: [400, 600],
        fallback: '"Hiragino Mincho ProN", serif',
        source: 'google',
      },
      body: { family: 'Zen Old Mincho', weights: [400], fallback: '"Yu Mincho", serif', source: 'google' },
      cjk: { display: 'LXGW WenKai TC', body: 'Noto Serif SC' },
      notes:
        'Klee One (pencil textbook hand) for titles and captions at 18–28px, tracking 0.05em — like a note in a notebook margin. Body Zen Old Mincho 15/1.9. Nothing on the page exceeds 32px.',
    },
  ],
  palettes: [
    {
      id: 'paper-white-muji-red',
      name: 'Paper white, Muji red',
      colors: {
        paper: '#f7f5f0',
        ink: '#1f1f1d',
        muted: '#6b6862',
        accent: '#7f0019',
        accent2: '#8a8578',
        rule: '#c9c5bb',
        panel: '#efece4',
      },
      usage:
        'Paper ≈90% of every screen; ink text tiny; the burgundy accent appears once per screen (a hairline, a dot or one word); panel only behind the facts table.',
    },
    {
      id: 'unbleached-pine',
      name: 'Unbleached paper, pine',
      colors: {
        paper: '#e9e2d4',
        ink: '#2a2723',
        muted: '#5f584e',
        accent: '#3e5a4a',
        accent2: '#a89f8d',
        rule: '#bfb5a3',
        panel: '#f2ede3',
      },
      usage:
        'Unbleached kraft tone; warm dark ink; pine green as the single accent for the current item; panels lighter than the paper, like an inset label.',
    },
    {
      id: 'sumi-evening',
      name: 'Sumi evening',
      colors: {
        paper: '#1c1b19',
        ink: '#e9e5dc',
        muted: '#9b968b',
        accent: '#b8a37e',
        accent2: '#6b675f',
        rule: '#3a3833',
        panel: '#24231f',
      },
      usage:
        'Charcoal page like an evening catalogue; warm off-white type; one pale washi-gold hairline or dot per screen.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['major-second', 'minor-third'],
  motion: [
    {
      id: 'page-turn',
      name: 'Page turn',
      description:
        'Sections behave like pages: scroll-snap-type: y mandatory, each section 100vh. Arriving on a page, nothing animates — only the small page number changes.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Same behaviour; drop scroll-snap if it fights the user.',
    },
    {
      id: 'shoji-light',
      name: 'Light through paper',
      description:
        'Hovering an item lifts its caption from muted to ink and its hairline from rule to accent over a long, calm curve — like light shifting behind a shoji. Nothing changes position.',
      duration: '600ms',
      easing: 'cubic-bezier(.25,.1,.25,1)',
      reduced: 'Instant colour change.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'Nothing moves. Hover only turns a short hairline from rule colour to accent.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'short-hairline',
      name: 'Short hairline',
      description: 'A single 40–80px hairline marks the start of a block or page; never full width.',
    },
    {
      id: 'vertical-lines',
      name: 'Vertical lines',
      description:
        'Key lines set in writing-mode: vertical-rl (CJK upright, Latin sideways), aligned to the right edge of their column.',
    },
    {
      id: 'single-dot',
      name: 'One dot',
      description:
        'One 6–8px accent dot per screen marking the current item, page or the one thing that matters.',
    },
  ],
  anchors: [
    {
      id: 'empty-field',
      name: 'The empty field',
      description:
        'The first screen is almost empty: the name at 14–18px in one corner and one short line at the opposite corner. Nothing else.',
    },
    {
      id: 'vertical-title',
      name: 'Vertical title',
      description:
        'A vertical title of 4–10 characters at the right edge (32–48px) with a vertical sub-line; the rest is paper.',
    },
    {
      id: 'single-object',
      name: 'Single object',
      description:
        'One object (a supplied photo on plain ground or a drawn outline) small in the lower centre, ≈15% of the screen, with a 3-line caption.',
    },
  ],
  surfaces: [
    {
      id: 'smooth-white',
      name: 'Smooth paper',
      description: 'Warm uncoated paper with no visible texture.',
      css: 'background: var(--paper);',
    },
    {
      id: 'washi-fibre',
      name: 'Washi fibre',
      description: 'Very faint long fibres crossing the page.',
      css: 'background-image: repeating-linear-gradient(12deg, rgba(0,0,0,.018) 0 1px, transparent 1px 23px), repeating-linear-gradient(-34deg, rgba(0,0,0,.014) 0 1px, transparent 1px 31px);',
    },
    {
      id: 'book-cloth',
      name: 'Book cloth',
      description: 'Panels textured like a cloth binding: a fine 3px cross-weave at 3% ink.',
      css: 'background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.03) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0 1px, transparent 1px 3px);',
    },
  ],
  must: [
    'Text and images together occupy ≤ 40% of each screen; the rest is paper.',
    'At least one vertical text block (writing-mode: vertical-rl) when the page is Chinese or Japanese.',
    'Body and captions are small (11–15px) and precise; the largest type on the page is ≤ 48px.',
    'Exactly one accent colour, used at most once per screen.',
  ],
  mustNot: [
    'No big bold headlines, hero banners or stacked cards.',
    'No Zen clichés: ensō brush circles, bamboo, cherry blossom, stacked stones, or pseudo-Asian Latin fonts.',
    'No full-width rules, borders or boxes around content.',
    'Do not fill space because it "looks empty".',
  ],
};

const inkAndSeal: Branch = {
  id: 'ink-and-seal',
  name: { zh: '水墨印章', en: 'Ink and seal' },
  family: 'craft',
  concept: {
    zh: '中国水墨与篆刻：山水的墨分五色，从焦墨晕开到淡墨再到纸白；文人画的题跋竖写在留白处，朱文、白文印章压在落款下。宣纸的纤维、手卷与立轴的比例——页面像一幅可以展开的画。',
    en: 'Chinese ink painting and seal carving: ink in its five tones, from scorched black through washes to bare paper; literati inscriptions written vertically into the empty sky; red seals in relief (朱文) or intaglio (白文) pressed under the signature. Rice-paper fibre and the proportions of handscrolls and hanging scrolls — the page unrolls like a painting.',
  },
  references: [
    '黄公望《富春山居图》(1350)',
    '八大山人 (Bada Shanren) ink paintings, late 17th century',
    '吴昌硕 seal carving and calligraphy (1844–1927)',
    '齐白石 paintings with inscriptions and seals',
    '荣宝斋 木版水印 woodblock reproductions',
  ],
  keywords: ['墨分五色', '朱文白文', '题跋', '宣纸', '手卷', '立轴'],
  tokens: {
    grid: 'Scroll proportions: hanging-scroll column at 1:3 (≈520px wide, left of centre) or a horizontal handscroll track of 80–100vw sections; 24px gutters; mounting bands (天头 / 地头) of 8–12vh.',
    radius:
      '0 for mounts and square seals; 50% for round seals; seal edges roughened with an SVG displacement filter.',
    border:
      'Mounting only: 12–24px panel-coloured silk border with a 1px ink inner line (隔水); no other boxes.',
    shadow: 'none; depth only through ink-wash tone.',
  },
  layouts: [
    {
      id: 'hanging-scroll',
      name: 'Hanging scroll (立轴)',
      description:
        'The page is a vertical scroll: a top mounting band, a tall narrow painting field with the title written vertically at its right, a seal at the bottom-left, inscription below.',
      grid: 'Central column 1:3 (≈520px), 10vh 天头 band on top; vertical inscription in a 72px column at the painting’s right edge; all content below in the same column width.',
      structure: [
        '天头: plain mounting band with two thin vertical 惊燕 strips (2px ink lines)',
        'Painting field: ink-wash landscape (SVG/CSS) with the vertical title and one seal',
        '题跋: 3–8 vertical lines of facts, read right to left',
        'Seal row: name seal + a leisure seal (闲章) beside the contact details',
        '地头: closing mounting band',
      ],
    },
    {
      id: 'handscroll',
      name: 'Handscroll (手卷)',
      description:
        'A horizontal handscroll: content unrolls sideways in a scrolling track, each section a scene with its own inscription and seal.',
      grid: 'Horizontal track (overflow-x: auto; scroll-snap-type: x proximity); sections 90vw × 80vh; vertical-rl inscriptions in 64px columns; on mobile the scenes stack vertically.',
      structure: [
        '引首: the title in large calligraphy on the first panel',
        'Scene 1: ink landscape with the main statement inscribed',
        'Scenes 2–3: one per offering or fact group, each with a seal',
        '跋: colophon with dates, names and contact, several small seals',
      ],
    },
    {
      id: 'album-leaf',
      name: 'Album leaves (册页)',
      description:
        'Square album leaves in pairs: a painting square on one side, the inscription square on the other, like a bound 册页.',
      grid: 'Pairs of squares, each min(44vw, 520px), 32px gutter; on mobile the painting stacks above its text.',
      structure: [
        'Cover board: a title strip (签条) on a silk-coloured board',
        'Leaf pairs: painting square + vertical inscription square, 2–4 pairs',
        'Seal index: the seals used, each with its reading',
        'Back board: contact details on a label strip',
      ],
    },
  ],
  type: [
    {
      id: 'kaishu-mincho',
      name: 'Ma Shan Zheng (楷) + Zen Old Mincho',
      display: {
        family: 'Zen Old Mincho',
        weights: [400, 700],
        fallback: '"Songti SC", "Yu Mincho", serif',
        source: 'google',
      },
      body: { family: 'Noto Serif', weights: [400, 700], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'Ma Shan Zheng', body: 'Noto Serif SC' },
      notes:
        'CJK titles in Ma Shan Zheng (regular script) at 48–96px, vertical (writing-mode: vertical-rl), tracking 0.1em. CJK body Noto Serif SC 16/1.9; inscriptions vertical at 18px. Latin titles in Zen Old Mincho, Latin body Noto Serif 16/1.7 — never a brush face for Latin.',
    },
    {
      id: 'xingshu-marcellus',
      name: 'Zhi Mang Xing (行) + Marcellus SC',
      display: {
        family: 'Marcellus SC',
        weights: [400],
        fallback: '"Trajan Pro", Georgia, serif',
        source: 'google',
      },
      body: { family: 'Spectral', weights: [300, 400], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'Zhi Mang Xing', body: 'Noto Serif SC' },
      notes:
        'Zhi Mang Xing (running script) for vertical titles and inscriptions at ≥ 28px, one column per 6–10 characters. Latin titles in Marcellus SC with tracking 0.12em — carved inscription, the Latin parallel to seal script on stone. Spectral body 17/1.65.',
    },
    {
      id: 'caoshu-antique',
      name: 'Liu Jian Mao Cao (草) + Zen Antique',
      display: { family: 'Zen Antique', weights: [400], fallback: '"Songti SC", serif', source: 'google' },
      body: { family: 'Crimson Pro', weights: [400, 600], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'Liu Jian Mao Cao', body: 'Noto Serif SC' },
      notes:
        'Liu Jian Mao Cao (cursive script) only for one or two expressive words — the name or a single character — at 120px+, as the painted gesture; never for information. All other CJK in Noto Serif SC 16/1.9. Latin headings Zen Antique, body Crimson Pro 17/1.6.',
    },
  ],
  palettes: [
    {
      id: 'xuan-paper',
      name: 'Xuan paper',
      colors: {
        paper: '#f2ecdf',
        ink: '#1b1a17',
        muted: '#5d5850',
        accent: '#b8321f',
        accent2: '#8c8576',
        rule: '#2b2925',
        panel: '#e4dac5',
      },
      usage:
        'Rice-paper ground (≈80%); ink black plus washes at 85/55/30/12% for painting and text; vermilion only for seals (≤3% of area, 1–3 seals per screen); silk-tone panel for mounts.',
    },
    {
      id: 'stele-rubbing',
      name: 'Stele rubbing',
      colors: {
        paper: '#121211',
        ink: '#ece6d8',
        muted: '#a29d92',
        accent: '#c4472f',
        accent2: '#5a5850',
        rule: '#ece6d8',
        panel: '#1f1e1c',
      },
      usage:
        'A stone rubbing (碑拓): characters appear paper-white on mottled black; seals in red; panel tone for the mounting strips.',
    },
    {
      id: 'blue-green-silk',
      name: 'Blue-green landscape on silk',
      colors: {
        paper: '#e8dcc0',
        ink: '#1f2420',
        muted: '#545a4f',
        accent: '#2f6f62',
        accent2: '#ad3b26',
        rule: '#7a6a4c',
        panel: '#d6c6a0',
      },
      usage:
        '青绿山水 on aged silk: malachite green (and its 40% tint) for mountain washes (≈30% of the painting area); ink for outlines and text; seals in accent2; rule for mount lines.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['golden', 'perfect-fifth', 'perfect-fourth'],
  motion: [
    {
      id: 'ink-bleed',
      name: 'Ink bleed',
      description:
        'On the first screen only, ink washes and calligraphy appear by spreading: a radial mask grows from the brush entry point while blur(6px) settles to 0, like ink soaking into xuan paper.',
      duration: '1200ms',
      easing: 'cubic-bezier(.2,.6,.2,1)',
      reduced: 'Show the ink at rest.',
    },
    {
      id: 'seal-press',
      name: 'Seal press',
      description:
        'Seals press in once: scale 1.08 → 1 and opacity 0 → 1 with slightly uneven red (noise mask) — one firm press.',
      duration: '200ms',
      easing: 'cubic-bezier(.3,1.4,.6,1)',
      reduced: 'Seals shown in place.',
    },
    {
      id: 'scroll-unroll',
      name: 'Scroll unroll',
      description:
        'Once on load the mount opens: the painting field’s clip-path insets from 50% to 0 — vertically for 立轴, horizontally for 手卷.',
      duration: '900ms',
      easing: 'cubic-bezier(.65,0,.35,1)',
      reduced: 'Scroll shown fully open.',
    },
  ],
  motifs: [
    {
      id: 'seals',
      name: 'Seals (朱文 / 白文)',
      description:
        'Square or round seals: 朱文 = red strokes and thin red border on paper; 白文 = paper strokes cut out of a solid red block. Seal text in the CJK display face or SVG; edges roughened with feTurbulence + feDisplacementMap (scale 2–3).',
    },
    {
      id: 'wash-mountains',
      name: 'Ink-wash mountains',
      description:
        '3–5 layered mountain silhouettes (SVG paths) in ink at 85/55/30/12%, bottoms fading into paper through a mask; the farthest is the faintest.',
    },
    {
      id: 'inscription',
      name: 'Inscription (题跋)',
      description:
        'Facts written in vertical columns right-to-left, ending with a signature and a seal, placed in the painting’s empty sky.',
    },
  ],
  anchors: [
    {
      id: 'mountain-painting',
      name: 'Mountain painting',
      description:
        'The first screen is a painting: layered ink-wash peaks with paper mist between them, the name inscribed vertically in the sky, one red seal.',
    },
    {
      id: 'giant-character',
      name: 'Giant character',
      description:
        'One calligraphic character or the name in running/cursive script at 40–60vh, wet black on paper, with a small seal and a two-line inscription.',
    },
    {
      id: 'seal-as-title',
      name: 'Seal as title',
      description:
        'A large carved 白文 seal (30–40vw) bearing the name is the title; the rest of the first screen is paper and one vertical line of text.',
    },
  ],
  surfaces: [
    {
      id: 'xuan-fibre',
      name: 'Xuan paper',
      description: 'Rice paper with long soft fibres, faintly visible.',
      css: 'background-color: var(--paper); background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27f%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.015 .35%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23f)%27 opacity=%27.07%27/%3E%3C/svg%3E");',
    },
    {
      id: 'silk-mount',
      name: 'Silk mount',
      description: 'Mounting bands in damask silk: panel colour with a subtle diagonal weave.',
      css: 'background-color: var(--panel); background-image: repeating-linear-gradient(45deg, rgba(0,0,0,.025) 0 2px, transparent 2px 6px);',
    },
    {
      id: 'rubbing-black',
      name: 'Rubbing black',
      description: 'Mottled black like a stele rubbing, with uneven ink density.',
      css: 'background-color: var(--paper); background-image: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.04), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,.03), transparent 45%);',
    },
  ],
  must: [
    'At least one red seal (朱文 or 白文), and it is the only saturated colour on its screen.',
    'On Chinese pages, titles or inscriptions are set vertically (writing-mode: vertical-rl) in a calligraphic CJK face.',
    'Ink appears in at least three tonal values (e.g. 85/55/12%), after 墨分五色.',
    'Bare paper (留白) covers at least 40% of the first screen.',
  ],
  mustNot: [
    'No pseudo-Asian “chop suey” Latin fonts and no brush-styled Latin text.',
    'No dragons, lanterns, red-and-gold festival clichés.',
    'No seal larger than the inscription it signs, except in the seal-as-title anchor.',
    'No glossy gradients; washes fade into paper, never into colour.',
  ],
};

export const modernistCraftBranches: Branch[] = [
  swissGrid,
  rawBrutalist,
  bauhausPrimary,
  constructivistPoster,
  artDeco,
  seventiesSupergraphic,
  memphisPop,
  warmHandmade,
  maWhitespace,
  inkAndSeal,
];
