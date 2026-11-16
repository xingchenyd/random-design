import type { Branch } from '../../types.js';

/**
 * Document family: forms, papers, ledgers, labels, notebooks, specimen sheets, field guides, magazines.
 * Order is part of the mapping — append only.
 */

const recipeCard: Branch = {
  id: 'recipe-card',
  name: { zh: '菜谱卡', en: 'Recipe card' },
  family: 'craft',
  concept: {
    zh: '铁皮盒里按分类插着的 3×5 英寸菜谱索引卡：浅蓝横线、顶端一道红线，打字机敲出的配料和步骤，页边是铅笔补的“糖减半”。凸出的分类插页标签就是导航，油渍和折角证明这张卡被反复用过。',
    en: 'The 3×5 inch recipe index cards filed in a kitchen tin: pale blue feint lines under one red top rule, ingredients and steps struck on a typewriter, a pencilled “half the sugar” in the margin. Protruding divider tabs are the navigation; grease spots and dog-ears prove the card has been used.',
  },
  references: [
    'Betty Crocker Recipe Card Library box sets (General Mills, 1971)',
    'Esselte / Oxford ruled 3×5 index cards (one red top line, blue feint lines)',
    'Lithographed tin recipe boxes by J. Chein & Co. and Ohio Art, 1950s',
    'Irma Rombauer, The Joy of Cooking (1931) — the “action method” with ingredients introduced inside the steps',
    'US community-cookbook recipe-card swaps, 1940s–60s',
  ],
  keywords: ['索引卡', '红色顶线', '浅蓝横线', '打字机', '铅笔批注', '分类插页', '油渍'],
  tokens: {
    grid: 'Cards are 5:3 landscape (600×360px at desktop, 100% wide with aspect-ratio: 5/3 on mobile, growing in 28px steps when content overflows); inside each card a 28px line pitch carries every baseline; 40px left text inset; the red top rule sits 44px from the card top; filed cards stack with a 36px visible strip each.',
    radius:
      '3px on index-card corners only (die-cut card stock); divider tabs 6px 6px 0 0; 0 on everything else. No pills.',
    border:
      'Card edge 1px solid var(--rule); one 2px solid var(--accent) top rule per card; feint lines 1px var(--rule) every 28px; divider tabs 1px solid var(--muted).',
    shadow:
      'No blur. A filed deck shows its edges with stacked hard lines: box-shadow: 0 2px 0 var(--paper), 0 3px 0 var(--rule), 0 5px 0 var(--paper), 0 6px 0 var(--rule).',
  },
  layouts: [
    {
      id: 'tin-box-deck',
      name: 'Tin box deck',
      description:
        'The page is the recipe tin seen from above: divider tabs across the top, the active card pulled up and fully readable, the following cards visible only as their top strips.',
      grid: 'Single column, max 720px; card aspect 5:3; tab row of 4–6 tabs, each 120px wide, staggered one position per divider (1/5 cut); 36px card strips stacked below the active card.',
      structure: [
        'Tab row: category dividers named after real sections (e.g. 早餐 / 汤 / 面包 / 节日), the current one raised 8px',
        'Active card: title sitting on the red rule, yield and time typed in the top-right corner, ingredients then method on the feint lines',
        'Card back (shown as a second card): continuation of the method plus pencilled notes and dates',
        'Card strips: 4–6 next-card tops showing only their typed titles, each one a link',
        'Lid label footer: a small framed plate with owner name, address and “If found, please return to…”',
      ],
    },
    {
      id: 'printed-card-set',
      name: 'Printed card set',
      description:
        'Commercial boxed-set card: a full-width colour band carrying the category and card number, a square photo window, ingredients in a narrow left column and numbered method on the right.',
      grid: '12 columns inside the card; ingredients span 4 with a 1px vertical rule, method spans 8; card max-width 960px at 5:3, flowing to a second card when longer; 8px baseline.',
      structure: [
        'Category band 48px tall: category name in italic + “No. 27” card number at the right',
        'Title row with a 160×160 photo window on the right (≤ 25% of the card)',
        'Ingredients column with quantities right-aligned in tabular figures | numbered method column',
        'Footer strip: a ruled 3-cell table — serves / oven °C (°F) / prep + cook time',
        'Second, shorter card: variations and storage notes',
      ],
    },
    {
      id: 'counter-spread',
      name: 'Cards on the counter',
      description:
        'Several cards laid out on the kitchen counter, each one a different section of the page, slightly rotated and overlapping, read left to right like a recipe in progress.',
      grid: '3 columns of 360px cards (2 on tablet, 1 on mobile), −16px margins for 12–24px overlaps; rotations taken in order from [-1.5deg, 1deg, -0.5deg, 2deg]; counter background = panel colour.',
      structure: [
        'Lead card at 1.4× size: the subject typed as a recipe title with yield and “From the kitchen of …”',
        'Ingredients card: list with pencil-drawn tick boxes',
        'Method cards (2–3): numbered steps, step numbers circled in pencil',
        'Note card on an unruled card back: handwritten tips, substitutions, dates tried',
        'Contact card typed like a library catalogue entry: address, hours, phone',
      ],
    },
  ],
  type: [
    {
      id: 'typewriter-index',
      name: 'Special Elite + Courier Prime',
      display: {
        family: 'Special Elite',
        weights: [400],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      body: {
        family: 'Courier Prime',
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Titles in Special Elite, uppercase, 0.04em tracking, line-height equal to the 28px pitch so the title sits ON the red rule; no size above 32px (a typewriter has one size — hierarchy comes from CAPS and underlining). Everything else Courier Prime 16px/28px. Quantities underlined (text-decoration-thickness 1px, underline-offset 3px), not bolded. Fractions typed as “1/2”, never ½ glyphs.',
    },
    {
      id: 'script-and-pencil',
      name: 'Homemade Apple + Kalam',
      display: {
        family: 'Homemade Apple',
        weights: [400],
        fallback: '"Segoe Script", "Brush Script MT", cursive',
        source: 'google',
      },
      body: {
        family: 'Kalam',
        weights: [300, 400, 700],
        fallback: '"Segoe Print", "Bradley Hand", cursive',
        source: 'google',
      },
      mono: {
        family: 'Courier Prime',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Long Cang', body: 'Noto Sans SC' },
      notes:
        'Recipe title in Homemade Apple at 40–56px, line-height 1.6 (tall loops), never uppercase or letter-spaced. Kalam 300 at 19px on a 28px line for method text; Kalam 700 only for an ingredient named inside a step. Courier Prime for the quantities column so numbers align. Pencil asides: Kalam 300, muted colour, rotated −2°.',
    },
    {
      id: 'printed-library',
      name: 'Vollkorn + Public Sans',
      display: {
        family: 'Vollkorn',
        weights: [700, 900],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: 'google',
      },
      body: {
        family: 'Public Sans',
        weights: [400, 600, 800],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Sans SC' },
      notes:
        'Vollkorn 900 for the dish/section name in sentence case, −0.01em tracking, line-height 1.05; Vollkorn 700 italic for category bands. Public Sans 600 labels uppercase at 12px with 0.08em tracking (“SERVES”, “OVEN”, “TIME”). Ingredients in Public Sans 400 with font-variant-numeric: tabular-nums lining-nums, quantities right-aligned. Card numbers in Vollkorn with oldstyle figures (onum).',
    },
  ],
  palettes: [
    {
      id: 'index-card-cream',
      name: 'Index-card cream',
      colors: {
        paper: '#f7f1e1',
        ink: '#1f1b16',
        muted: '#5a5046',
        accent: '#c8352b',
        accent2: '#2f5d8a',
        rule: '#9fc2dc',
        panel: '#efe3c4',
      },
      usage:
        'Cream card stock everywhere (≈80%); pale blue rule only for the feint lines; red accent only for the single top rule per card and the raised tab (≈3%); ballpoint blue (accent2) for handwritten corrections; panel for aged cards and the lid label.',
    },
    {
      id: 'harvest-gold-1970s',
      name: 'Harvest gold & avocado',
      colors: {
        paper: '#fbf3dc',
        ink: '#2b2a1a',
        muted: '#5b5636',
        accent: '#c46a1b',
        accent2: '#7a8a2e',
        rule: '#d8c58c',
        panel: '#f0d488',
      },
      usage:
        'Harvest-gold panel for category bands and tab fills (≈20%); avocado (accent2) for card numbers and divider tabs; orange (accent) for the top rule and oven-temperature numerals set ≥ 24px; body text dark olive ink.',
    },
    {
      id: 'enamel-tin',
      name: 'Enamel tin interior',
      colors: {
        paper: '#233d3a',
        ink: '#f4ead2',
        muted: '#c4b896',
        accent: '#e2574c',
        accent2: '#f0c75e',
        rule: '#4d6b66',
        panel: '#2d4c48',
      },
      usage:
        'Dark teal enamel ground of the tin (≈70%); cards drawn as panel-coloured blocks with cream ink; tomato red (accent) for tab fills and the top rule; mustard (accent2) for card numbers and stencilled lid lettering.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['minor-third', 'major-third'],
  motion: [
    {
      id: 'card-pull',
      name: 'Card pull',
      description:
        'Selecting a divider tab lifts that card 24px up out of the box in one physical move (translateY); every other card stays put.',
      duration: '220ms',
      easing: 'cubic-bezier(.3,.7,.2,1)',
      reduced:
        'Swap the active card instantly with no translation; mark the active tab with the accent rule.',
    },
    {
      id: 'card-flip',
      name: 'Card flip',
      description:
        '“See back” turns the card over around its horizontal axis (rotateX 180deg, perspective 1200px) to show the continuation on the unruled back.',
      duration: '420ms',
      easing: 'cubic-bezier(.45,0,.2,1)',
      reduced: 'Show the back as a second card below the front; no rotation.',
    },
    {
      id: 'typebar-strike',
      name: 'Typebar strike',
      description:
        'On load the card title types itself once, one character per step, with a 1px downward jolt per strike; body text is static.',
      duration: '900ms',
      easing: 'steps(24, end)',
      reduced: 'Render the title fully typed; no jolt.',
    },
  ],
  motifs: [
    {
      id: 'red-top-rule',
      name: 'Red top rule & feint lines',
      description:
        'One 2px red rule 44px below the card top and 1px pale blue lines every 28px (repeating-linear-gradient); text baselines sit exactly on them.',
    },
    {
      id: 'divider-tabs',
      name: 'Divider tabs',
      description:
        'Category tabs protruding above the cards at staggered 1/5-cut positions, each with a typed or stamped label; the tabs are the navigation.',
    },
    {
      id: 'kitchen-marks',
      name: 'Kitchen stains & pencil marks',
      description:
        'One SVG grease ring (irregular ellipse at 6–10% opacity) and pencil ticks, underlines or “×2” in the margin — never more than three marks per card.',
    },
  ],
  anchors: [
    {
      id: 'pulled-card',
      name: 'Pulled card',
      description:
        'The first screen is one full index card, front-on, with the title on the red rule and the first ingredients visible; tab tops peek above it.',
    },
    {
      id: 'open-tin',
      name: 'Open recipe tin',
      description:
        'The first screen shows the open tin in flat elevation (simple SVG outline) with the tab tops of 5–6 dividers and the page name on a lid label.',
    },
    {
      id: 'ingredients-lead',
      name: 'Ingredients as lead',
      description:
        'The first screen leads with the typed list itself — quantities at 28–36px in tabular figures — with the title smaller above; the facts are the hero.',
    },
  ],
  surfaces: [
    {
      id: 'ruled-card',
      name: 'Ruled index card',
      description: 'Card stock with one red rule near the top and pale blue feint lines below it.',
      css: 'background-color: var(--paper); background-image: linear-gradient(var(--accent), var(--accent)), repeating-linear-gradient(to bottom, transparent 0 27px, var(--rule) 27px 28px); background-size: 100% 2px, 100% calc(100% - 72px); background-position: 0 44px, 0 72px; background-repeat: no-repeat;',
    },
    {
      id: 'aged-card',
      name: 'Handled card',
      description:
        'Yellowed stock darkening toward the edges, with one faint grease ring — a card handled for decades.',
      css: 'background-color: var(--paper); background-image: radial-gradient(ellipse 90px 60px at 72% 38%, transparent 70%, rgba(150,100,30,.10) 74%, transparent 80%), radial-gradient(ellipse at center, transparent 60%, rgba(110,80,30,.14) 100%);',
    },
    {
      id: 'blank-back',
      name: 'Blank card back',
      description:
        'The unruled back of a card: plain stock with fibre speckle, used for notes and continuations.',
      css: 'background-color: var(--panel); background-image: radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size: 5px 7px;',
    },
  ],
  must: [
    'Every content block lives on an index card with the 5:3 proportion (or a stack of them), not on an open page.',
    'Body text baselines sit on the feint ruled lines: line-height equals the 28px rule pitch.',
    'Navigation is a row of divider tabs labelled with the real section names.',
    'Quantities, times and temperatures come from the facts and are set in tabular figures.',
  ],
  mustNot: [
    'No food-blog layout: no hero photo banner, no “jump to recipe” button, no lifestyle preamble.',
    'No more than three stains or pencil marks per card; the card must stay fully legible.',
    'No photo larger than 25% of a card; no rounded pill buttons — actions are typed links or tab labels.',
  ],
};

const engineeringPlate: Branch = {
  id: 'engineering-plate',
  name: { zh: '工程图版', en: 'Engineering plate' },
  family: 'document',
  concept: {
    zh: '刚从晒图室取出的工程图纸：带分区编号的图框、右下角的标题栏、尺寸线与箭头、修订表、“第 3 张 / 共 12 张”。蓝晒、氨熏晒图或描图纸上的单线字，一切都被标注、编号、可追溯。',
    en: 'The engineering drawing as it leaves the print room: a border frame with zone markers, a title block in the bottom-right corner, dimension lines with arrowheads, a revision table, “Sheet 3 of 12”. Cyanotype, diazo or drafting vellum with single-stroke lettering — everything labelled, numbered and traceable.',
  },
  references: [
    'ISO 5457 / ISO 7200 drawing-sheet frames and title blocks',
    'ISO 3098 lettering and Leroy / Rotring stencil lettering templates',
    'Apollo-era engineering drawings (North American Aviation, Grumman Lunar Module)',
    'Cyanotype blueprints and Pellet-process prints, 1870s–1940s',
    'GB/T 14689 图纸幅面与格式 and GB/T 14691 长仿宋体 lettering',
  ],
  keywords: ['标题栏', '尺寸线', '修订表', '图框分区', '蓝晒', '描图纸', '单线字'],
  tokens: {
    grid: 'Drawing sheet with a 24px border frame; the frame is divided into zones — columns 1–8 across the top and bottom, rows A–F down both sides — mapped to CSS grid tracks; everything inside snaps to an 8px drafting grid.',
    radius: '0 everywhere. The only circles are balloon callouts (28px, border-radius 50%) and centre marks.',
    border:
      'Frame: 2px solid ink outer line + 1px zone ticks; object lines 1.5px; dimension and leader lines 1px; hidden lines 1px dashed (6px/3px); centre lines 1px dash-dot (stroke-dasharray 12 3 2 3).',
    shadow: 'none. Depth is shown only by section hatching: 45° 1px lines at a 6px pitch.',
  },
  layouts: [
    {
      id: 'title-block-sheet',
      name: 'Single sheet',
      description:
        'The page is one drawing sheet: zoned frame, the main view (content) occupying the field, revision table top-right and the title block anchored bottom-right as the identity of the page.',
      grid: 'Sheet = viewport minus 24px frame; field as an 8×6 zone grid; title block min(640px, 100%) wide × 4 rows of 32px bottom-right; revision table 4 columns top-right, 280px wide.',
      structure: [
        'Frame with zone numerals 1–8 and letters A–F on all four edges',
        'Revision table top-right: REV / DESCRIPTION / DATE / APPD, latest first',
        'Main view: the subject drawn as a labelled diagram with balloon callouts ① ② ③ keyed to notes',
        'General notes bottom-left: “NOTES: 1. ALL DIMENSIONS IN mm …” mapped from the facts',
        'Title block bottom-right: title, drawing no., scale, date, sheet “1 OF 4”, drawn / checked / approved initials',
      ],
    },
    {
      id: 'sheet-set',
      name: 'Sheet set',
      description:
        'A multi-sheet set: every section is its own sheet with sheet number and cross-references (“SEE SHEET 3, ZONE C4”), stacked on the drafting table.',
      grid: 'Each section a full-width sheet at 1.414:1 landscape (A-series) on desktop, 16px frame; sheets stacked with a 48px gap of panel colour; 12 columns inside each sheet.',
      structure: [
        'Cover sheet: drawing register as a ruled table (SHEET / TITLE / REV)',
        'Sheet 2: general arrangement — one large diagram with leaders to labels',
        'Sheet 3: details — 2–4 detail circles “DETAIL A  SCALE 2:1” enlarging specific facts',
        'Sheet 4: schedule / bill of materials: ITEM / QTY / PART NO. / DESCRIPTION / MATERIAL',
        'Every sheet closes with its own compact title block',
      ],
    },
    {
      id: 'exploded-assembly',
      name: 'Exploded assembly',
      description:
        'An exploded view: the topic broken into parts floating along centre lines, each part ballooned and listed in a parts list beside it.',
      grid: 'Two zones: 8-column field for the exploded view (parts positioned along a 30° axis), 4-column parts list; 8px grid; 28px balloons.',
      structure: [
        'Header strip: drawing title in wide caps, DWG NO. right-aligned',
        'Exploded view: 4–8 parts (content blocks) spaced along dash-dot centre lines with balloon numbers',
        'Parts list table aligned to the balloon numbers',
        'One dimension line spanning the whole view carrying the key figure (size, price, date range)',
        'Title block with approval signatures',
      ],
    },
  ],
  type: [
    {
      id: 'b612-cockpit',
      name: 'B612 Mono + B612',
      display: {
        family: 'B612 Mono',
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'B612',
        weights: [400, 700],
        fallback: 'Verdana, Tahoma, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'All drawing text UPPERCASE, 0.06em tracking, sizes taken only from the ISO 3098 √2 series 2.5 / 3.5 / 5 / 7 / 10 / 14mm → 10 / 14 / 20 / 28 / 40 / 56px. Title in B612 Mono 700 at 40px; notes and table cells in B612 400 at 14px, line-height 1.4. Never italic.',
    },
    {
      id: 'draftsman-hand',
      name: 'Architects Daughter + IBM Plex Sans Condensed',
      display: {
        family: 'Architects Daughter',
        weights: [400],
        fallback: '"Segoe Print", cursive',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Sans Condensed',
        weights: [400, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Architects Daughter for titles and callouts, UPPERCASE ONLY with 0.08em tracking at 24–48px — the hand lettering of a draughtsman on vellum. IBM Plex Sans Condensed 400/600 for notes and schedules at 15px/1.35. IBM Plex Mono 500 for drawing numbers, part numbers and dimensions; thousands separated by a thin space (“1 200”).',
    },
    {
      id: 'aerospace-extended',
      name: 'Michroma + IBM Plex Sans',
      display: {
        family: 'Michroma',
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: 'google',
      },
      body: { family: 'IBM Plex Sans', weights: [400, 500], fallback: 'Arial, sans-serif', source: 'google' },
      mono: {
        family: 'Share Tech Mono',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Michroma (Microgramma-style extended) only for the title-block title and sheet headers, uppercase, 0.12em tracking, max 32px — it is very wide. IBM Plex Sans 400/500 at 15px for notes. Share Tech Mono for zone references (C4), part numbers and dimensions at 13–14px. Field labels like “DWG NO.” in Plex Sans 500 at 10px with 0.1em tracking.',
    },
  ],
  palettes: [
    {
      id: 'cyanotype',
      name: 'Cyanotype blueprint',
      colors: {
        paper: '#163f73',
        ink: '#f1f5f7',
        muted: '#b9cde0',
        accent: '#f2c14e',
        accent2: '#e86a4a',
        rule: '#7fa6cc',
        panel: '#1d4c86',
      },
      usage:
        'Prussian-blue ground for the whole sheet (≈90%); all linework and lettering near-white; yellow (accent) only for revision clouds and the current revision triangle; red-orange (accent2) for checker’s markups (≈2%); title block and tables on the slightly lighter panel.',
    },
    {
      id: 'drafting-vellum',
      name: 'Drafting vellum',
      colors: {
        paper: '#eef0ea',
        ink: '#1c2024',
        muted: '#4b535a',
        accent: '#b3261e',
        accent2: '#2e6e8e',
        rule: '#9aa5ab',
        panel: '#e1e5de',
      },
      usage:
        'Cool translucent vellum ground; graphite-black linework and lettering; red reserved for revision clouds, redlines and “VOID” stamps; steel blue (accent2) for dimension figures; grey rule for the 8px construction grid at low visibility.',
    },
    {
      id: 'sepia-diazo',
      name: 'Sepia diazo print',
      colors: {
        paper: '#f3ead8',
        ink: '#3a2416',
        muted: '#6e5038',
        accent: '#8e3b1c',
        accent2: '#2f5f6f',
        rule: '#c9b394',
        panel: '#ebdcc0',
      },
      usage:
        'Warm ammonia whiteprint: every line prints sepia-brown; deeper rust (accent) for the frame, title-block outline and section hatching; one teal-grey (accent2) for approval stamps. No pure black anywhere.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['augmented-fourth', 'perfect-fourth'],
  motion: [
    {
      id: 'pen-plotter',
      name: 'Pen plotter',
      description:
        'On load the linework draws itself once via stroke-dashoffset — object lines first, then dimensions, then lettering appears — like an HP pen plotter.',
      duration: '1200ms',
      easing: 'linear',
      reduced: 'Show the finished drawing immediately.',
    },
    {
      id: 'zone-locate',
      name: 'Zone locate',
      description:
        'Hovering a cross-reference (“SEE C4”) highlights the matching zone markers on the frame and draws a 1px crosshair to that zone.',
      duration: '120ms',
      easing: 'steps(2, end)',
      reduced: 'Highlight the zone markers in accent without the crosshair.',
    },
    {
      id: 'still',
      name: 'Still sheet',
      description: 'No motion. Hover = 1px accent underline; balloon fills switch to ink.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'dimension-lines',
      name: 'Dimension lines',
      description:
        'Thin lines with closed 15° arrowheads and extension lines with 2px gaps, carrying real figures from the facts (“← 1 200 →”).',
    },
    {
      id: 'balloon-callouts',
      name: 'Balloon callouts',
      description:
        'Numbered 28px circles with leader lines keying parts of a diagram or section to a parts list or notes.',
    },
    {
      id: 'revision-clouds',
      name: 'Revision clouds & triangles',
      description:
        'A scalloped SVG cloud around whatever changed plus a triangle holding the revision letter, matching a row in the revision table.',
    },
  ],
  anchors: [
    {
      id: 'title-block-hero',
      name: 'Title block as hero',
      description:
        'The first screen is dominated by an oversized title block (4–6 ruled rows: title, drawing no., scale, date, sheet count) inside the frame, with diagram linework above it.',
    },
    {
      id: 'general-arrangement',
      name: 'General arrangement',
      description:
        'A large orthographic diagram (front / top / side views) of the subject in simple SVG shapes with dimensions, filling ~70% of the first screen.',
    },
    {
      id: 'drawing-register',
      name: 'Drawing register',
      description:
        'The first screen is the cover sheet: a ruled drawing list with sheet numbers, titles and revision letters — the table of contents as hero.',
    },
  ],
  surfaces: [
    {
      id: 'blueprint-grid',
      name: 'Blueprint grid',
      description: 'Cyanotype ground with a faint 8px construction grid.',
      css: 'background-color: var(--paper); background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px); background-size: 8px 8px;',
    },
    {
      id: 'vellum',
      name: 'Drafting vellum',
      description: 'Translucent, slightly milky vellum with faint eraser smudges.',
      css: 'background-color: var(--paper); background-image: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,.5), transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(0,0,0,.035), transparent 35%);',
    },
    {
      id: 'diazo-drift',
      name: 'Diazo exposure drift',
      description:
        'Ammonia whiteprint: warm paper with an uneven background tone where the exposure drifted at the edges.',
      css: 'background-color: var(--paper); background-image: linear-gradient(90deg, rgba(120,80,40,.06), transparent 30%, transparent 70%, rgba(120,80,40,.08));',
    },
  ],
  must: [
    'A visible drawing frame with zone markers and a title block holding title, drawing number, scale or date, and “SHEET n OF N”.',
    'All labels uppercase in the ISO lettering sizes; every number carries its unit.',
    'At least one dimension line or balloon callout carries a real fact from the brief.',
    'A revision table or revision letter is present and consistent across the page.',
  ],
  mustNot: [
    'No rendered 3D isometrics with gradients or glows — line drawing only.',
    'No sci-fi HUD styling (neon, scanlines, hexagon grids); this is paper.',
    'No decorative arrows: every arrowhead terminates a dimension or a leader.',
  ],
};

const ledgerAccounting: Branch = {
  id: 'ledger-accounting',
  name: { zh: '账本', en: 'Ledger' },
  family: 'document',
  concept: {
    zh: '复式记账的总账簿：浅黄或淡绿的账页，红蓝两色竖线分出日期、摘要、借方、贷方和余额，合计下面压两道红线。数字是主角，钢笔字写在格子里，每一栏都必须对得上。',
    en: 'The double-entry ledger: buff or pale-green ruled pages, red and blue vertical rules dividing date, particulars, debit, credit and balance, a double red rule under every total. Figures are the protagonists, written in fountain pen inside the columns, and every column has to foot.',
  },
  references: [
    'Luca Pacioli, Summa de arithmetica (1494), “Particularis de computis et scripturis”',
    'Victorian bound ledgers and cash books by Waterlow & Sons, London',
    'Wilson Jones green columnar accounting pads, 1950s–80s',
    'NCR Class 31 and Burroughs Sensimatic posting-machine ledger cards, 1950s–60s',
    '中式账簿：借贷记账法的总分类账页（红蓝格线）',
  ],
  keywords: ['借贷', '双红线', '账页', '余额', '钢笔', '表格数字', '对账'],
  tokens: {
    grid: 'Ledger ruling: date (month 48px + day 32px) · particulars (flex) · folio (40px) · debit (112px whole units + 32px decimals) · credit (same) · balance (same); horizontal feint every 28px; 64px left margin for folio numbers and audit marks.',
    radius: '0. A ledger is ruled paper; nothing is rounded.',
    border:
      'Horizontal feint 1px var(--rule) every 28px; column boundaries 1px var(--accent2); money-column boundaries and decimal splits 1px var(--accent); totals: 1px ink rule above, border-bottom: 3px double var(--accent) below.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'ledger-folio',
      name: 'Ledger folio',
      description:
        'A single ledger folio: account heading across the top, a full-width ruled table (date / particulars / folio / debit / credit / balance) and the page total carried forward.',
      grid: 'One table spanning max 1100px with the column set from tokens; 28px row pitch; 64px left margin; on mobile particulars wrap under the date and debit/credit stay side by side.',
      structure: [
        'Account head: account name large, account number “Fo. 47” at the right',
        'Brought-forward row: “B/f” with the opening figure',
        'Entries: 8–20 dated rows — each fact becomes a line item (particulars in words, amounts in figures)',
        'Footing: single rule, total, double red rule, “C/f to Fo. 48”',
        'Margin notes in the left margin: initials, audit ticks, cross-references',
      ],
    },
    {
      id: 'debit-credit-spread',
      name: 'Debit | Credit spread',
      description:
        'The T-account as a double-page spread: the left page Dr. (what comes in / what is offered), the right page Cr. (what it costs / what is required), balanced on one baseline at the bottom.',
      grid: '2 equal pages separated by an 8px spine in panel colour; each page its own ruled table (date / particulars / amount); identical 28px row pitch on both sides so lines align across the spine.',
      structure: [
        'Running head across both pages: “Dr.” left, account name centred, “Cr.” right',
        'Left page entries (e.g. what is offered, included, received)',
        'Right page entries (e.g. prices, conditions, obligations)',
        'Balancing line: both totals on the same baseline, each with its double rule',
        'Below the spread: a trial-balance summary table of the sections',
      ],
    },
    {
      id: 'columnar-workpaper',
      name: 'Columnar workpaper',
      description:
        'An accountant’s analysis pad: one description column plus many narrow numeric columns with abbreviated headings, audit ticks and cross-footed totals.',
      grid: 'Description column 280px + 6–12 numeric columns of 88px; horizontally scrollable on mobile with the description column sticky; 80px header row for abbreviated column heads.',
      structure: [
        'Pad header boxes: Prepared by / Approved by / Date / Page',
        'Column headings: 6–12 categories, abbreviated and numbered (1)…(12)',
        'Rows: line items with figures and audit ticks',
        'Cross-foot row: column totals plus a circled grand total',
        'Notes keyed with letters a–d to specific cells',
      ],
    },
  ],
  type: [
    {
      id: 'roundhand-ledger',
      name: 'Pinyon Script + EB Garamond',
      display: {
        family: 'Pinyon Script',
        weights: [400],
        fallback: '"Snell Roundhand", cursive',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      cjk: { display: 'Ma Shan Zheng', body: 'Noto Serif SC' },
      notes:
        'Pinyon Script only for account heads and the grand-total line at 36–56px, never all caps (script capitals in caps are illegible). EB Garamond 400 for particulars at 17px on the 28px pitch; every amount in EB Garamond 500 with font-variant-numeric: lining-nums tabular-nums, right-aligned, decimals in their own 32px column. Dr. / Cr. / B/f / C/f in italic.',
    },
    {
      id: 'columnar-gothic',
      name: 'Libre Franklin + IBM Plex Mono',
      display: {
        family: 'Libre Franklin',
        weights: [700, 800],
        fallback: '"Franklin Gothic Medium", Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Libre Franklin',
        weights: [400, 500],
        fallback: '"Franklin Gothic Book", Arial, sans-serif',
        source: 'google',
      },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Libre Franklin 800 uppercase for printed column headings at 11–12px with 0.06em tracking, and 700 at 32–48px for page titles. Body Libre Franklin 400 at 15px on 28px. Every figure in IBM Plex Mono with tabular figures, right-aligned; negatives in parentheses “(1,240.00)”, never a minus sign.',
    },
    {
      id: 'posting-machine',
      name: 'Red Hat Mono + Atkinson Hyperlegible',
      display: {
        family: 'Red Hat Mono',
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Atkinson Hyperlegible',
        weights: [400, 700],
        fallback: 'Verdana, Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Red Hat Mono 500/700 for every figure, date and the account number — it plays the posting machine’s print head; machine labels “OLD BAL.” / “NEW BAL.” uppercase at 12px, 0.04em. Dates printed as “NOV 01 26”. Atkinson Hyperlegible 400/700 for prose at 16px/1.5. Credits printed in the second ribbon colour (accent2), debits in ink.',
    },
  ],
  palettes: [
    {
      id: 'buff-and-red',
      name: 'Buff ledger, red & blue ruling',
      colors: {
        paper: '#f1e6c8',
        ink: '#221a14',
        muted: '#5b4a36',
        accent: '#b0262a',
        accent2: '#1f4d8c',
        rule: '#a9bccf',
        panel: '#e8d9b0',
      },
      usage:
        'Buff paper (≈85%); pale blue feint (rule) for horizontal lines; blue (accent2) for column boundaries and printed headings; red (accent) for money-column verticals, double rules under totals and overdrawn figures; iron-gall ink for all writing.',
    },
    {
      id: 'eye-ease-green',
      name: 'Eye-ease green pad',
      colors: {
        paper: '#e8f0dc',
        ink: '#14231a',
        muted: '#3f5546',
        accent: '#c23b22',
        accent2: '#2a6b3f',
        rule: '#8fb592',
        panel: '#d6e6c4',
      },
      usage:
        'Pale green pad paper; green rules every row, a heavier accent2 line every fifth row; red only for totals and the “OVER / SHORT” line; panel green for the printed header strip.',
    },
    {
      id: 'half-calf-binding',
      name: 'Half-calf binding',
      colors: {
        paper: '#2a1a16',
        ink: '#f3e9d2',
        muted: '#c9b79a',
        accent: '#d4a64a',
        accent2: '#7fae8c',
        rule: '#5a3d33',
        panel: '#3a2620',
      },
      usage:
        'Oxblood leather ground (≈80%); cream text as on paper spine labels; gilt (accent) for titles, totals and double rules; marbled-endpaper green (accent2) for positive balances only.',
    },
  ],
  densities: ['compact', 'packed'],
  scales: ['minor-third', 'major-second'],
  motion: [
    {
      id: 'ruling-off',
      name: 'Ruling off',
      description:
        'When a total is first shown, the single rule draws left→right, the figure appears, then the double red rule draws — a bookkeeper ruling off the column.',
      duration: '600ms',
      easing: 'cubic-bezier(.6,0,.4,1)',
      reduced: 'Rules and totals appear already drawn.',
    },
    {
      id: 'posting-carriage',
      name: 'Posting carriage',
      description:
        'Rows print one at a time with a carriage jump: each full row appears at once after a 90ms step and the card advances one 28px line.',
      duration: '90ms',
      easing: 'steps(1, end)',
      reduced: 'All rows visible immediately.',
    },
    {
      id: 'audit-tick',
      name: 'Audit tick',
      description:
        'Hovering a row draws a handwritten tick in the margin (SVG stroke) and tints the row with the panel colour.',
      duration: '180ms',
      easing: 'cubic-bezier(.3,.6,.3,1)',
      reduced: 'Show the tick and tint without the stroke animation.',
    },
  ],
  motifs: [
    {
      id: 'double-red-rule',
      name: 'Double rule under totals',
      description:
        'A 1px ink rule above every total and a 3px double red rule beneath it — the full stop of the genre.',
    },
    {
      id: 'split-money-columns',
      name: 'Split money columns',
      description:
        'Amount columns split by a red vertical into whole units and two-digit decimals; the currency sign appears only at the column head, never on each line.',
    },
    {
      id: 'folio-references',
      name: 'Folio refs & audit ticks',
      description:
        'Handwritten ticks, “Fo. 47” cross-references and initials in the margin tying entries to each other.',
    },
  ],
  anchors: [
    {
      id: 'carried-balance',
      name: 'Balance carried forward',
      description:
        'The first screen ends on one huge carried-forward figure (the key number from the facts) at 15–20vw in tabular figures, with its double red rule.',
    },
    {
      id: 'account-head',
      name: 'Account head',
      description:
        'A full-width account heading across a ruled page, folio number at the right, the first ruled entries already visible below.',
    },
    {
      id: 'open-ledger',
      name: 'Open ledger',
      description:
        'The first screen is the ruled table itself — column heads plus 8+ rows, no separate title block; the ruling is the hero.',
    },
  ],
  surfaces: [
    {
      id: 'feint-ruled',
      name: 'Feint-ruled paper',
      description: 'Horizontal feint lines every 28px across the whole page.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, transparent 0 27px, var(--rule) 27px 28px);',
    },
    {
      id: 'pre-ruled-columns',
      name: 'Pre-ruled money columns',
      description:
        'Red vertical money-column rules printed through the full height of the page behind the content.',
      css: 'background-color: var(--paper); background-image: linear-gradient(90deg, transparent calc(100% - 241px), var(--accent) calc(100% - 241px) calc(100% - 240px), transparent calc(100% - 240px) calc(100% - 121px), var(--accent) calc(100% - 121px) calc(100% - 120px), transparent calc(100% - 120px));',
    },
    {
      id: 'ledger-card-stock',
      name: 'Ledger card stock',
      description:
        'Stiff posting-machine card with a printed tinted header band and a punched binder edge on the left.',
      css: 'background-color: var(--paper); background-image: linear-gradient(var(--panel), var(--panel)), radial-gradient(circle, var(--rule) 5px, transparent 6px); background-size: 100% 72px, 24px 96px; background-position: 0 0, 8px 24px; background-repeat: no-repeat, repeat-y;',
    },
  ],
  must: [
    'Figures are right-aligned in tabular lining numerals; any total shown equals the sum of the figures above it.',
    'Content is presented as ruled entries (date · particulars · amount or count), not as paragraphs.',
    'Every total ends with a double rule.',
  ],
  mustNot: [
    'No dashboards: no charts, KPI tiles, donut graphs or sparklines.',
    'No currency sign repeated on every line; no centred numbers.',
    'No invented amounts or balances — if the facts give no figures, use dates and counts.',
  ],
};

const academicPaper: Branch = {
  id: 'academic-paper',
  name: { zh: '学术论文', en: 'Academic paper' },
  family: 'document',
  concept: {
    zh: 'LaTeX 排出的研究论文：标题和作者居中，摘要单独成块，章节按 1、1.1 编号，图注表注都有编号，页脚有脚注，文末是参考文献。可信感来自严格的编号体系和交叉引用，而不是装饰。',
    en: 'A research paper typeset in LaTeX: title and authors centred, a set-off abstract, sections numbered 1 and 1.1, numbered figure and table captions, footnotes and a references list. Authority comes from the numbering system and cross-references, not from decoration.',
  },
  references: [
    'Donald Knuth, TeX and Computer Modern (1978–86); the AMS amsart document class',
    'Edward Tufte’s handouts and the tufte-latex class (sidenotes, margin figures)',
    'Physical Review Letters and Nature two-column journal pages',
    'Simon Fear, the booktabs LaTeX package (1995) — three-rule tables',
    'arXiv preprints, 1991–',
  ],
  keywords: ['摘要', '编号章节', '图注', '脚注', '参考文献', '交叉引用', '三线表'],
  tokens: {
    grid: 'Text block 34em (≈ 600px) single column, or 2 × 20em columns with a 2em gap; page margins in the LaTeX article proportion (text width ≈ 62% of the page); baseline = 1.25 × body size; floats span one column or the full text width.',
    radius: '0 everywhere.',
    border:
      'booktabs only: \\toprule and \\bottomrule 1.5px ink, \\midrule 1px ink, no vertical rules in tables; abstract framed by a 1px ink box or none; footnote separator 1px ink at 40% of the text width.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'single-column-article',
      name: 'Article (amsart)',
      description:
        'Single-column article: centred title block, abstract, then numbered sections with numbered equations or statements and floats placed at the top of the column.',
      grid: 'One 34em column centred; section numbers hang in a 3em left gutter; figures at column width with captions below; tables with captions above; equation numbers flush right.',
      structure: [
        'Title block: title, authors with superscript affiliations, date',
        'Abstract indented 2em both sides with a run-in bold “Abstract.”',
        '1 Introduction → 2 … numbered sections with 2.1 subsections; numbered statements (1) at the right margin',
        'Figure 1 / Table 1 floats, each referenced in the text (“see Fig. 1”)',
        'References [1]… with hanging indents; footnotes under a short rule',
      ],
    },
    {
      id: 'tufte-handout',
      name: 'Tufte handout',
      description:
        'A wide right margin carries sidenotes, margin figures and citations next to the text they support; there are no footnotes at the bottom.',
      grid: '12 columns: text spans 1–7 (≈ 55%), sidenote column spans 9–12; full-width figures span 1–12; sidenote numbers superscript in text and on the baseline in the margin.',
      structure: [
        'Title in large italic + author in small caps; an epigraph instead of an abstract',
        'Section headings in italic; paragraphs open with “new thought” small caps',
        'Body paragraphs with sidenotes and margin figures alongside',
        'One full-width figure or small-multiples table',
        'Bibliography as short sidenote citations plus a compact list at the end',
      ],
    },
    {
      id: 'two-column-journal',
      name: 'Two-column journal',
      description:
        'A journal page: running head with journal name, volume and DOI, full-width title and abstract, then a two-column body with spanning figures and page numbers in the footer.',
      grid: '2 columns × 20em, 2em gutter, max 1000px; running head over a 1px rule; spanning figures/tables across both columns; one column on mobile.',
      structure: [
        'Running head: journal name, “Vol. 12, No. 3, pp. 211–229”, DOI',
        'Full-width title, authors, received / accepted dates, abstract in a tinted panel',
        'Keywords line',
        'Two-column body with numbered sections and a spanning Table 1',
        'Acknowledgements, references in smaller type over two columns, corresponding-author footnote',
      ],
    },
  ],
  type: [
    {
      id: 'stix-ams',
      name: 'STIX Two Text + IBM Plex Mono',
      display: {
        family: 'STIX Two Text',
        weights: [400, 600, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: 'google',
      },
      body: {
        family: 'STIX Two Text',
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: 'google',
      },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Title STIX Two Text 600 at 1.6× body, sentence case, centred; section heads 700 at 1.2× with hanging numbers “2.1”; body 400 at 17px/1.45, justified with hyphens: auto; abstract at 0.9×. “Fig. 1.” / “Table 1.” labels bold, caption text 0.9×. Tables in tabular-nums. Identifiers, DOIs and code in IBM Plex Mono at 0.88×.',
    },
    {
      id: 'tufte-crimson',
      name: 'Crimson Pro',
      display: {
        family: 'Crimson Pro',
        weights: [400],
        italic: true,
        fallback: 'Palatino, "Book Antiqua", serif',
        source: 'google',
      },
      body: {
        family: 'Crimson Pro',
        weights: [400, 600],
        italic: true,
        fallback: 'Palatino, "Book Antiqua", serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Crimson Pro 400 italic for the title (2.4×) and section headings (1.4×), never bold; body 400 at 19px/1.5, ragged-right; paragraph openers in font-variant-caps: all-small-caps with 0.05em tracking; sidenotes at 0.75× with the number on the baseline. Oldstyle figures (onum) in prose, lining in tables.',
    },
    {
      id: 'journal-sans-heads',
      name: 'Public Sans + Source Serif 4',
      display: {
        family: 'Public Sans',
        weights: [400, 700],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Source Serif 4',
        weights: [400, 600],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Public Sans 700 for the title (1.9×); section headings uppercase 700 at 0.85× with 0.06em tracking (“2  METHODS”); running heads and caption labels in Public Sans. Source Serif 4 400 at 16px/1.45 for body, justified; abstract in Public Sans 400 at 0.9×. Tables in Public Sans 400 at 0.85× with tabular-nums.',
    },
  ],
  palettes: [
    {
      id: 'preprint-white',
      name: 'Preprint white',
      colors: {
        paper: '#fdfdfb',
        ink: '#111111',
        muted: '#4a4a4a',
        accent: '#8c1515',
        accent2: '#1d5e3a',
        rule: '#222222',
        panel: '#f2f1ec',
      },
      usage:
        'Practically monochrome: ink on white for ~97% of the page. Dark red (accent) only for cross-reference links (Fig. 1, Eq. 3, §2); green (accent2) only for citation brackets [12]; panel for the abstract box.',
    },
    {
      id: 'offprint-cream',
      name: 'Journal offprint',
      colors: {
        paper: '#f5f0e3',
        ink: '#1d1b17',
        muted: '#57514a',
        accent: '#0f4c5c',
        accent2: '#b5651d',
        rule: '#a59d8b',
        panel: '#ebe4d2',
      },
      usage:
        'Warm cream offprint stock; deep teal (accent) for the journal name, section numbers and figure linework; ochre (accent2) only for the one highlighted data series in figures; panel for the abstract and table header rows.',
    },
    {
      id: 'annotated-photocopy',
      name: 'Annotated photocopy',
      colors: {
        paper: '#e4e3dd',
        ink: '#161616',
        muted: '#474744',
        accent: '#f2d43a',
        accent2: '#c3241d',
        rule: '#8d8d88',
        panel: '#d6d5ce',
      },
      usage:
        'A reading-pack photocopy: cool grey stock, toner-black text; highlighter yellow (accent) only as a background behind key sentences, never as text colour; red pen (accent2) for marginal notes, circled numbers and underlines; panel for the darker copier edge.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['minor-third', 'major-second', 'major-third'],
  motion: [
    {
      id: 'cross-ref-box',
      name: 'Cross-reference box',
      description:
        'Following “Fig. 2” or “[12]” jumps to the target and draws a 2px accent box around it (hyperref link box) that disappears after 1.2s.',
      duration: '1200ms',
      easing: 'steps(1, end)',
      reduced: 'Jump without smooth scrolling; the box stays static until the next interaction.',
    },
    {
      id: 'sidenote-expand',
      name: 'Sidenote expand',
      description:
        'On narrow screens, tapping a sidenote number opens the note inline beneath the line, height stepping from 0 to its content.',
      duration: '160ms',
      easing: 'cubic-bezier(.2,.6,.2,1)',
      reduced: 'Expand instantly.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'No motion: links are coloured, hover adds a 1px underline.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'numbered-captions',
      name: 'Numbered captions',
      description:
        'Run-in bold “Figure 3.” / “Table 2.” labels with smaller caption text; every float is referenced from the body.',
    },
    {
      id: 'booktabs-tables',
      name: 'Three-rule tables',
      description:
        'Tables with only top, mid and bottom rules, no verticals, numbers aligned on the decimal point, units in the column head.',
    },
    {
      id: 'footnote-apparatus',
      name: 'Footnotes & references',
      description:
        'Superscript numbers or daggers linking to footnotes under a short rule; a numbered reference list with hanging indents and identifiers in mono.',
    },
  ],
  anchors: [
    {
      id: 'title-abstract',
      name: 'Title + abstract',
      description:
        'The first screen is the centred title block plus the set-off abstract — dense, quiet and complete.',
    },
    {
      id: 'figure-one',
      name: 'Figure 1',
      description:
        'The first screen leads with a full-width Figure 1 (diagram, plot or table of the key facts) and its numbered caption, with a modest title above.',
    },
    {
      id: 'main-result',
      name: 'Main result',
      description:
        'A framed “Proposition 1 (Main result).” or “Finding 1.” in italic directly under the title — the central claim of the page stated once, formally.',
    },
  ],
  surfaces: [
    {
      id: 'pdf-page',
      name: 'PDF page',
      description: 'A white page on a grey reader background with a hairline edge, like a PDF at 100% zoom.',
      css: 'body { background: var(--panel); } main { background: var(--paper); max-width: 816px; margin: 32px auto; padding: 96px 72px; outline: 1px solid var(--rule); }',
    },
    {
      id: 'photocopy-toner',
      name: 'Photocopy toner',
      description: 'Grey stock with toner speckle and a darker band along the spine edge.',
      css: 'background-color: var(--paper); background-image: linear-gradient(90deg, rgba(0,0,0,.16), transparent 48px), radial-gradient(rgba(0,0,0,.06) 1px, transparent 1px); background-size: 100% 100%, 4px 4px;',
    },
    {
      id: 'coated-journal',
      name: 'Coated journal stock',
      description:
        'Smooth bright stock, no texture; the abstract sits in a flat tinted panel and the running head is a printed rule.',
    },
  ],
  must: [
    'Sections, figures and tables are numbered, and every one is referenced in the text.',
    'A delimited abstract (or an epigraph in the Tufte layout) precedes section 1.',
    'Tables use only horizontal rules.',
    'Claims are tied to sources listed in the references, taken from the facts.',
  ],
  mustNot: [
    'No cards, badges, icons or call-to-action buttons; links are inline text.',
    'No coloured section backgrounds; colour is limited to links and figure data.',
    'No invented authors, DOIs, journals or citations that are not in the facts.',
  ],
};

const apothecaryLabel: Branch = {
  id: 'apothecary-label',
  name: { zh: '药房标签', en: 'Apothecary label' },
  family: 'document',
  concept: {
    zh: '十九至二十世纪初药房的瓶签与处方笺：花边框里是拉丁药名、剂量表和瓶号，奶油色纸上印墨绿或朱红。一切郑重、对称、编了号，像药柜上一排排写着名字的药瓶。',
    en: 'Nineteenth- and early twentieth-century pharmacy labels and prescription slips: Latin drug names inside ornamental borders, dosage tables and bottle numbers printed in dark green or vermilion on cream stock. Everything is formal, symmetrical and numbered, like a shelf of named bottles.',
  },
  references: [
    'Victorian druggists’ labels in the Wellcome Collection',
    'Shop-round bottles with gilt labels on black glass, 19th-century English pharmacies',
    'The British Pharmacopoeia, first edition (1864) — Latin nomenclature and abbreviations',
    'UK Pharmacy Act 1868 “POISON” labelling and fluted poison bottles',
    'Boots the Chemist and Rexall drug-store packaging, 1920s–40s',
  ],
  keywords: ['拉丁药名', '花边框', '剂量表', '编号瓶签', '处方笺', '奶油色', '墨绿'],
  tokens: {
    grid: 'Symmetric axis: text centred inside labels; labels in fixed proportions (rectangle 5:3, oval 3:2, tall 2:3); pages arranged as a shelf grid of 3–4 labels per row with 24px gaps and a shelf rule under each row; 6px baseline inside labels.',
    radius:
      '0 for rectangular labels; oval labels border-radius 50%; ornamental corners via an 8px notched clip-path polygon — never generic rounded corners.',
    border:
      'Label frame = 3px double var(--accent) outer border + 1px inner rule inset 6px (outline: 1px solid var(--accent); outline-offset: -9px); dosage tables 1px accent rules; leaders 1px dotted.',
    shadow: 'none. Shelves are a hard 3px rule-colour ledge under each row; no blur.',
  },
  layouts: [
    {
      id: 'shelf-of-rounds',
      name: 'Shelf of shop rounds',
      description:
        'The page is the dispensary shelf: each section is a labelled bottle (label only, no bottle drawing needed), arranged in numbered rows with shelf ledges between them.',
      grid: '4 columns on desktop (2 tablet, 1 mobile); labels 5:3 or oval 3:2 centred in each cell; 3px shelf rule under each row; row numerals “I, II, III” hanging in the left margin.',
      structure: [
        'Fascia: pharmacy/subject name on a long rectangular label with a trade line and an “Est.” date',
        'Shelf I: 3–4 labels, each a section title in abbreviated Latin-style caps with the plain name beneath',
        'Shelf II: labels holding facts (hours, services, prices) as dosage lines with leaders',
        'Poison cabinet: a separate red-framed label for warnings and conditions',
        'Counter: a prescription slip with address and contact',
      ],
    },
    {
      id: 'prescription-slip',
      name: 'Prescription slip',
      description:
        'One tall Rx blank as the page: letterhead, ℞ symbol, numbered prescription lines, directions, signature and a perforated counterfoil.',
      grid: 'Single column 560px (A6 portrait, 1:1.41) centred on a panel-coloured counter; 24px inner margin; lines on a 28px pitch; perforated stub at the foot.',
      structure: [
        'Letterhead: name, address and registration number in small caps',
        'Patient and date lines with dotted leaders',
        'Large ℞, then numbered lines: item · quantity (abbreviations such as “q.s.”, “ad”)',
        '“Sig.” directions line in italic',
        'Signature line, then a perforated tear-off counterfoil repeating the prescription number',
      ],
    },
    {
      id: 'dosage-chart',
      name: 'Dosage chart broadside',
      description:
        'A wall chart: an ornate cartouche header and a long ruled table of numbered items with columns for doses or prices, grouped under Latin section heads.',
      grid: '12 columns; cartouche spans 8, centred; table spans 12 with columns No. (60px) / Name (flex) / Adult / Child / Price, 32px rows; ornamental rule between groups.',
      structure: [
        'Ornate cartouche header with the subject name',
        '“Directions for use” paragraph in small type',
        'Numbered table — the main content — grouped under Latin-style section heads',
        'Footer label with warnings in vermilion and the dispenser’s name',
        'Bottle-number index along the bottom edge',
      ],
    },
  ],
  type: [
    {
      id: 'fell-druggist',
      name: 'IM Fell English SC + IM Fell English',
      display: { family: 'IM Fell English SC', weights: [400], fallback: 'Georgia, serif', source: 'google' },
      body: {
        family: 'IM Fell English',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'IM Fell English SC for Latin-style names and label titles, 0.08em tracking, abbreviated with full stops (“TINCT. CARDAM. CO.”), 22–48px; IM Fell English roman and italic for English names and directions at 17px/1.45 — keep its irregular inking. Oldstyle figures as supplied. Everything centred inside labels.',
    },
    {
      id: 'bodoni-chemist',
      name: 'Libre Bodoni + Sorts Mill Goudy',
      display: {
        family: 'Libre Bodoni',
        weights: [400, 700],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: 'google',
      },
      body: {
        family: 'Sorts Mill Goudy',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Libre Bodoni 700 uppercase for the pharmacy name and big bottle numbers (“No. 14”) at 32–72px, 0.02em tracking; Libre Bodoni 400 italic for the Latin-style line. Sorts Mill Goudy roman/italic body at 17px/1.5. Dosage tables in Libre Bodoni 400 with lining numerals, doses right-aligned.',
    },
    {
      id: 'gilt-roman',
      name: 'Cinzel + EB Garamond',
      display: {
        family: 'Cinzel',
        weights: [600, 700],
        fallback: '"Trajan Pro", Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Ma Shan Zheng', body: 'Noto Serif SC' },
      notes:
        'Cinzel 600/700 for shop-round inscriptions only — capitals by design, 0.14em tracking, 18–40px, never for sentences. EB Garamond 400/500 with italic for everything readable at 18px/1.5; small caps (font-variant-caps: small-caps) for abbreviations like “B.P.” and “Ph.C.”.',
    },
  ],
  palettes: [
    {
      id: 'cream-bottle-green',
      name: 'Cream & bottle green',
      colors: {
        paper: '#f3ecd6',
        ink: '#12261c',
        muted: '#4a5a4c',
        accent: '#1f4a33',
        accent2: '#a8322a',
        rule: '#1f4a33',
        panel: '#e6dcbc',
      },
      usage:
        'Cream label stock (≈80%); dark bottle green for all type, frames and table rules; vermilion (accent2) only for “POISON”, “NOT TO BE TAKEN” and the ℞ (≤ 3%); panel for the counter and shelf background.',
    },
    {
      id: 'gilt-black-glass',
      name: 'Gilt on black glass',
      colors: {
        paper: '#141412',
        ink: '#efe2b8',
        muted: '#c2b07c',
        accent: '#c99a3e',
        accent2: '#8a1f1f',
        rule: '#c99a3e',
        panel: '#23211c',
      },
      usage:
        'Black glass ground; gilt (accent) for label frames, inscriptions and rules; pale gold ink for readable text; deep red (accent2) only as a solid fill behind poison labels with gilt text on top, never as text on black.',
    },
    {
      id: 'poison-red-label',
      name: 'Poison red & cobalt',
      colors: {
        paper: '#fbf4ec',
        ink: '#2a0c0a',
        muted: '#6a3a33',
        accent: '#b3201b',
        accent2: '#1b4a7a',
        rule: '#b3201b',
        panel: '#f2ddd2',
      },
      usage:
        'White label stock; vermilion frames and headings (≈15%); near-black brown text; cobalt (accent2) for bottle numbers and a cobalt-glass shelf band; pink-tinted panel for dosage-table headers.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fourth', 'augmented-fourth'],
  motion: [
    {
      id: 'label-paste',
      name: 'Label pasting',
      description:
        'On load each label settles onto its bottle: scale 1.02 → 1 and rotation −1° → 0 in one move, as if pressed flat by a thumb.',
      duration: '200ms',
      easing: 'cubic-bezier(.2,.9,.3,1)',
      reduced: 'Labels appear flat; no scale or rotation.',
    },
    {
      id: 'bottle-turn',
      name: 'Bottle turn',
      description:
        'Hovering a shop-round label turns the bottle to show its back label (plain name, directions) with a rotateY 180° flip.',
      duration: '450ms',
      easing: 'cubic-bezier(.4,0,.2,1)',
      reduced: 'Show front and back labels stacked; no flip.',
    },
    {
      id: 'still',
      name: 'Still shelf',
      description: 'No motion. Hover darkens the label frame from accent to ink.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'ornamental-frames',
      name: 'Ornamental label frames',
      description:
        'Double-rule frames with corner fleurons (❦ U+2766 or small SVG acanthus corners) in rectangle, oval and octagonal label shapes.',
    },
    {
      id: 'rx-numbering',
      name: '℞ and bottle numbers',
      description:
        'The ℞ glyph (U+211E), “No. 1–48” bottle numbers and Latin abbreviations (t.d.s., p.r.n., q.s.) used as structural labels.',
    },
    {
      id: 'dosage-leaders',
      name: 'Dosage leaders',
      description:
        'Dotted leaders joining each item to its dose, quantity or price, with strict right alignment.',
    },
  ],
  anchors: [
    {
      id: 'shop-round-label',
      name: 'Shop-round label',
      description:
        'One large gilt or printed label (oval or rectangle) centred on the first screen holding the name in Latin-style capitals, with a bottle number beneath.',
    },
    {
      id: 'rx-blank',
      name: 'Prescription blank',
      description:
        'The first screen is the top of the Rx slip: letterhead, a large ℞ and the first three numbered lines.',
    },
    {
      id: 'chart-cartouche',
      name: 'Chart cartouche',
      description:
        'An ornamental cartouche header above a dosage-style table whose first rows are visible on the first screen.',
    },
  ],
  surfaces: [
    {
      id: 'laid-label-paper',
      name: 'Laid label paper',
      description: 'Cream laid paper with faint chain lines every 24px and fine laid lines.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 1px, transparent 1px 24px), repeating-linear-gradient(0deg, rgba(0,0,0,.02) 0 1px, transparent 1px 3px);',
    },
    {
      id: 'black-glass',
      name: 'Black glass',
      description: 'Deep black with one vertical highlight band, like the curve of a bottle.',
      css: 'background-color: var(--paper); background-image: linear-gradient(90deg, transparent 18%, rgba(255,255,255,.06) 22%, transparent 30%);',
    },
    {
      id: 'gummed-label',
      name: 'Gummed label stock',
      description:
        'Crisp printed labels on a contrasting ground: each label is paper colour sitting on the panel colour, which plays the bottle.',
      css: 'body { background: var(--panel); } .label { background: var(--paper); border: 3px double var(--accent); outline: 1px solid var(--accent); outline-offset: -9px; }',
    },
  ],
  must: [
    'Every section title sits inside a label shape with a double-rule frame.',
    'At least one numbered list or table of items with quantities, doses or prices joined by leaders.',
    'Warnings and conditions are set in the warning colour inside their own label.',
  ],
  mustNot: [
    'No medical claims or dosages beyond the facts — the Rx devices are typographic, not advice.',
    'No “wellness” look: no pastel gradients, watercolour botanicals or leaf glyphs.',
    'No asymmetric, off-centre text inside labels.',
  ],
};

const bureaucraticForm: Branch = {
  id: 'bureaucratic-form',
  name: { zh: '公文表格', en: 'Bureaucratic form' },
  family: 'document',
  concept: {
    zh: '政府表格与公文：角上的表格编号、一格一格的填写框、小号大写的填表说明、勾选框、印章、复写联和虚线撕角。页面像一份需要逐项填写的正式申请，秩序本身就是权威。',
    en: 'Government forms and official documents: a form number in the corner, boxed fields, instructions in small capitals, checkboxes, rubber stamps, carbon copies and perforated tear-offs. The page reads like an official application you work through line by line; order itself is the authority.',
  },
  references: [
    'IRS Form 1040 and US federal forms printed by the Government Printing Office',
    'British HMSO forms with “For official use only” panels',
    'GB/T 9704-2012 党政机关公文格式（红头文件）',
    'Carbonless triplicate sets on white / canary / pink NCR paper',
    'Terry Gilliam, Brazil (1985) — Form 27B/6',
  ],
  keywords: ['表格编号', '填写框', '勾选框', '印章', '复写联', '撕角线', '填表说明'],
  tokens: {
    grid: 'Form grid: 12 columns, 0 gutter — fields are cells sharing 1px borders (border-collapse); row heights 40px (single-line field) or 80px (multi-line); every field has a numbered label in its top-left corner at 10–11px.',
    radius: '0. Checkboxes are 14px squares. Only round seals use border-radius 50%.',
    border:
      'Cells 1px solid var(--accent) in dropout palettes, otherwise var(--ink); part headers as reversed 24px bars; heavy 3px rule under the form title; perforations 1px dashed (4px/3px).',
    shadow: 'none. Carbon copies peek out by a 16px offset with a 1px rule outline — no blur.',
  },
  layouts: [
    {
      id: 'numbered-field-form',
      name: 'Numbered field form',
      description:
        'A single form: header with form number and issuing body, then Parts I–III of boxed fields, each fact typed into a labelled field.',
      grid: '12-column cell grid, max 960px; fields span 3, 4, 6 or 12 columns; part bars full width; a 120px shaded right column “For official use only”.',
      structure: [
        'Header: form number large top-left (e.g. “Form 27-B”), issuing body centred, reference number and year top-right',
        'Instruction line in small caps: “READ THE NOTES ON PAGE 2 BEFORE COMPLETING THIS FORM”',
        'Part I — Identification: name, address and contact as filled fields',
        'Part II — Particulars: checkbox matrix and numbered fields with the real facts typed in',
        'Part III — Declaration: signature, date and stamp area, then a perforated receipt stub',
      ],
    },
    {
      id: 'red-header-notice',
      name: 'Red-header notice',
      description:
        'The 红头 official document: issuing body in large red type, a red rule, document number, centred title, numbered paragraphs, and a round seal stamped over the date.',
      grid: 'Single column ≈ 590px (156mm text block) centred; header block 120px; body at 28 CJK characters or 65ch per line; seal 120px circle overlapping the date block by 40%.',
      structure: [
        'Issuing body in large red display type centred, then a 2px red rule across the text width',
        'Document number line “〔2026〕12 号” centred under the rule',
        'Title centred, at most two lines',
        'Addressee line, then numbered paragraphs 一、二、三 with (一)(二) sub-items',
        'Attachments list; date right-aligned with the round seal across it; 抄送 block between two rules at the foot',
      ],
    },
    {
      id: 'carbon-triplicate',
      name: 'Carbon triplicate',
      description:
        'A three-part carbonless set fanned out: white original on top, canary and pink copies peeking beneath, each copy labelled for its recipient; sections are the copies.',
      grid: 'Three stacked sheets, each offset 16px right and 16px down; top sheet a 12-column field grid max 880px; copy labels in each sheet’s bottom margin (“COPY 1 — APPLICANT”).',
      structure: [
        'Top sheet header with a red serial number (“Nº 004817”)',
        'Fields with typed fill-in over small printed labels',
        'Second copy strip: only its label and one summary line visible',
        'Third copy strip: “FILE COPY” with stamp marks',
        'Perforated tear-off strip with retention instructions',
      ],
    },
  ],
  type: [
    {
      id: 'federal-public',
      name: 'Public Sans + Courier Prime',
      display: {
        family: 'Public Sans',
        weights: [700, 800],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      body: { family: 'Public Sans', weights: [400, 600], fallback: 'Arial, sans-serif', source: 'google' },
      mono: {
        family: 'Courier Prime',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Public Sans 800 for form numbers and part bars (uppercase, 0.02em), 700 for the form title at 28–40px; field labels Public Sans 600 at 10–11px uppercase with 0.06em tracking, field number first (“7a”); instructions Public Sans 400 at 12px with font-variant-caps: all-small-caps. Filled-in values in Courier Prime at 15px, as if typed into the box.',
    },
    {
      id: 'formular-condensed',
      name: 'IBM Plex Sans Condensed + IBM Plex Sans',
      display: {
        family: 'IBM Plex Sans Condensed',
        weights: [600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: { family: 'IBM Plex Sans', weights: [400, 500], fallback: 'Arial, sans-serif', source: 'google' },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'IBM Plex Sans Condensed 700 for titles and part bars at 24–36px; IBM Plex Sans 400 body at 15px/1.4; IBM Plex Mono for reference numbers, ISO dates (2026-11-01) and field values with tabular figures. For red-header notices the CJK issuing body is Noto Serif SC 900 (standing in for 方正小标宋), body text 16px.',
    },
    {
      id: 'typed-carbon',
      name: 'Courier Prime',
      display: {
        family: 'Courier Prime',
        weights: [700],
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      body: {
        family: 'Courier Prime',
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Everything typed: Courier Prime 700 uppercase for titles and headers, never larger than 28px (a typewriter has one size; hierarchy is CAPS, underlining and spacing); body 400 at 15px with line-height 2 (double-spaced). Pre-printed labels in Courier Prime 400 at 11px uppercase with 0.1em tracking. Blanks shown as typed underscores.',
    },
  ],
  palettes: [
    {
      id: 'dropout-green',
      name: 'Dropout-ink green',
      colors: {
        paper: '#fafcf6',
        ink: '#121a14',
        muted: '#445247',
        accent: '#2d7a4b',
        accent2: '#b23a2e',
        rule: '#8fc0a0',
        panel: '#e6f1e8',
      },
      usage:
        'The pre-printed form (labels, boxes, part bars) in dropout green (accent ≈ 20%); filled-in data in ink; red (accent2) only for the serial number and “OFFICIAL USE ONLY” stamps; pale green panel for shaded official-use cells.',
    },
    {
      id: 'carbonless-canary',
      name: 'Canary copy',
      colors: {
        paper: '#fbf0a8',
        ink: '#1f1d14',
        muted: '#575236',
        accent: '#b8322a',
        accent2: '#2b3448',
        rule: '#a39a5a',
        panel: '#f5e48a',
      },
      usage:
        'The whole sheet canary yellow; printed form in dark olive ink; carbon-transferred fill-in in carbon blue-black (accent2); red (accent) for the serial number and “COPY 2” label; deeper yellow panel for field shading.',
    },
    {
      id: 'red-header-white',
      name: 'Red header on white',
      colors: {
        paper: '#f6f3ea',
        ink: '#151515',
        muted: '#4a4743',
        accent: '#c8161d',
        accent2: '#1f3a5f',
        rule: '#151515',
        panel: '#ebe6d8',
      },
      usage:
        'Plain document paper and black text; official red (accent) only for the issuing-body header, the rule beneath it and the round seal (≈5%); navy (accent2) for handwritten approval notes; panel for the attachments and 抄送 block.',
    },
  ],
  densities: ['compact', 'regular', 'packed'],
  scales: ['major-second', 'minor-third', 'perfect-fourth'],
  motion: [
    {
      id: 'rubber-stamp',
      name: 'Rubber stamp',
      description:
        'On submit or click a stamp (“RECEIVED 01 NOV 2026”) lands: scale 1.3 → 1 and rotate to −8° while accelerating into the paper, then stops dead with uneven ink (SVG turbulence mask).',
      duration: '160ms',
      easing: 'cubic-bezier(.55,0,1,.45)',
      reduced: 'The stamp appears in place at full size; no scale.',
    },
    {
      id: 'carbon-transfer',
      name: 'Carbon transfer',
      description:
        'Typing into a field on the top sheet makes the same text appear on the copy strip beneath, 60ms later and in the lower-contrast carbon colour.',
      duration: '60ms',
      easing: 'linear',
      reduced: 'The copy updates at the same moment, with no delay.',
    },
    {
      id: 'tear-off',
      name: 'Perforated tear-off',
      description:
        'Clicking the receipt stub tears it along the perforation: the stub drops 8px and rotates 3° from one corner, leaving a jagged edge.',
      duration: '260ms',
      easing: 'cubic-bezier(.3,0,.6,1)',
      reduced: 'The stub shows a separated (solid) edge instead of moving.',
    },
  ],
  motifs: [
    {
      id: 'numbered-fields',
      name: 'Numbered field boxes',
      description:
        'Every value lives in a bordered box with a tiny numbered label in its top-left corner (“12b  Postal code”).',
    },
    {
      id: 'checkbox-matrix',
      name: 'Checkbox matrix',
      description:
        'Options presented as rows of square checkboxes, the applicable ones marked with a typed “X”.',
    },
    {
      id: 'stamps-seals',
      name: 'Stamps & seals',
      description:
        'Rectangular date stamps and round seals in accent ink, rotated −4° to −10°, partly overlapping a field, with uneven ink.',
    },
  ],
  anchors: [
    {
      id: 'form-masthead',
      name: 'Form masthead',
      description:
        'The first screen is the form header: giant form number, issuing body, year box, “Please print in black ink”, and Part I fields starting below.',
    },
    {
      id: 'red-header',
      name: 'Red header',
      description:
        'The issuing body in large red type with the red rule and document number filling the top third — the 红头.',
    },
    {
      id: 'stamped-approval',
      name: 'Stamped approval',
      description:
        'A completed form fragment with a large “APPROVED / 已批准” stamp crossing it diagonally as the hero gesture.',
    },
  ],
  surfaces: [
    {
      id: 'bond-paper',
      name: 'Bond paper',
      description: 'Smooth white government bond, no texture, crisp printed rules.',
    },
    {
      id: 'carbonless-copy',
      name: 'Carbonless copy',
      description: 'Coloured copy stock with slightly soft, bluish transferred text.',
      css: 'background-color: var(--paper); color: var(--accent2); text-shadow: 0 0 .5px currentColor;',
    },
    {
      id: 'photocopied-form',
      name: 'Nth-generation photocopy',
      description: 'Grey speckle and slightly thickened rules from repeated copying.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.2px); background-size: 5px 5px; filter: contrast(1.05);',
    },
  ],
  must: [
    'Each fact sits in a labelled, numbered field or a numbered paragraph — no free-floating promotional copy.',
    'The page carries a form or document number and a date or version.',
    'Instructions are set smaller than field values, in small caps or uppercase.',
    'Calls to action are phrased as form steps (“Complete Part III”, “Submit at counter 4”).',
  ],
  mustNot: [
    'No friendly onboarding UI: no rounded progress pills, illustrations or mascots.',
    'No empty-looking fields when the facts supply the value — show the value typed in.',
    'No real agency names, emblems or seals; the issuing body comes only from the facts.',
  ],
};

const labNotebook: Branch = {
  id: 'lab-notebook',
  name: { zh: '方格实验本', en: 'Lab notebook' },
  family: 'craft',
  concept: {
    zh: '科研实验记录本和工程方格计算纸：方格底，手写结论旁边是等宽字的注释，有草图、测量数据表，每条记录写日期并签名，写错了就划一道线而不是擦掉。页面是一份正在进行、可以追溯的工作记录。',
    en: 'The research lab notebook and the engineer’s computation pad: grid paper, handwritten conclusions beside monospace annotations, sketches, measurement tables, every entry dated and signed, mistakes struck through with a single line instead of erased. The page is a running, traceable record of work.',
  },
  references: [
    'Michael Faraday’s laboratory notebooks (Royal Institution, 1820s–60s)',
    'National Brand green computation notebooks with 4×4 quad ruling',
    'Engineering computation pads on green eye-ease paper (Ampad, Roaring Spring)',
    'Bell Labs engineering notebooks with dated, witnessed pages',
    'Leonardo da Vinci, Codex Arundel — mirror-written notes beside sketches',
  ],
  keywords: ['方格纸', '手写', '日期签名', '划线更正', '测量表', '草图', '编号页'],
  tokens: {
    grid: '20px square grid (5mm) across the page, major line every 100px; every block’s width and height are multiples of 20px; 80px left margin (4 squares) with a 1px red margin line; baselines sit on grid lines (line-height 20px or 40px).',
    radius: '0. Circles around results are hand-drawn SVG ellipses with uneven strokes, not CSS radii.',
    border:
      'Grid 1px var(--rule), major lines slightly darker; boxes drawn as 1.5px ink “hand” strokes (SVG paths with ±1px jitter) or 1px ruled tables on the grid; answer boxes double-outlined (3px double ink).',
    shadow: 'none. Taped-in printouts get translucent tape strips at the corners, not shadows.',
  },
  layouts: [
    {
      id: 'dated-entries',
      name: 'Dated entries',
      description:
        'The page is a sequence of notebook entries, each opening with a date, a hand-underlined title and an entry number; sections are entries.',
      grid: '20px grid; content from x = 80px to max 880px; dates in the 0–80px margin; entries separated by a full-width hand-drawn line.',
      structure: [
        'Page header in mono: notebook title, “Book 3 · p. 47”, owner',
        'Entry 1 (dated): aim written by hand, then mono notes',
        'Entry 2: measurement table ruled to the grid, units in the header',
        'Entry 3: an SVG line sketch with labelled arrows',
        'Signature and “Witnessed by / date” block at the page foot',
      ],
    },
    {
      id: 'computation-sheet',
      name: 'Computation sheet',
      description:
        'An engineering computation pad page: header strip with Project / Subject / By / Date / Sheet boxes, then Given → Find → Solution steps with the result boxed.',
      grid: 'Header strip 2 rows × 4 cells of 200px; body 40 squares wide; working lines start at x = 80px, results right-aligned in a 160px column; answer box double-outlined.',
      structure: [
        'Header strip: PROJECT / SUBJECT / BY / DATE / SHEET n OF m',
        'Given: the known facts with units',
        'Find: the question the page answers',
        'Solution: numbered steps with mono working and handwritten remarks',
        'Answer box with the key figure, then “Checked by” initials',
      ],
    },
    {
      id: 'sketchbook-spread',
      name: 'Notebook spread',
      description:
        'A two-page spread: left page dense notes and a small table, right page one large sketch and taped-in items, with annotation arrows crossing the spine.',
      grid: 'Two pages of 20-square-wide grids with a 40px spine; elements placed on grid coordinates; collapses to one page on mobile.',
      structure: [
        'Left page top: date and the question being investigated',
        'Left page: bulleted observations and a small results table',
        'Right page: one large annotated sketch or diagram',
        'Taped-in printout (photo or quotation) with tape corners',
        'Foot of the spread: circled conclusions and a “next →” list',
      ],
    },
  ],
  type: [
    {
      id: 'ballpoint-plex',
      name: 'Caveat + IBM Plex Mono',
      display: {
        family: 'Caveat',
        weights: [500, 700],
        fallback: '"Segoe Print", "Bradley Hand", cursive',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Mono',
        weights: [400, 600],
        italic: true,
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Long Cang', body: 'Noto Sans SC' },
      notes:
        'Caveat 500/700 for entry titles, conclusions and margin remarks at 28–44px on a 40px line so it sits on the grid; remarks may rotate −1° to 1°. IBM Plex Mono 400 at 14px/20px for data, notes and tables (one line per grid row); units always with a space (“12.5 mL”).',
    },
    {
      id: 'pencil-hyperlegible',
      name: 'Reenie Beanie + Atkinson Hyperlegible',
      display: {
        family: 'Reenie Beanie',
        weights: [400],
        fallback: '"Bradley Hand", cursive',
        source: 'google',
      },
      body: {
        family: 'Atkinson Hyperlegible',
        weights: [400, 700],
        italic: true,
        fallback: 'Verdana, Arial, sans-serif',
        source: 'google',
      },
      mono: {
        family: 'Red Hat Mono',
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Zhi Mang Xing', body: 'Noto Sans SC' },
      notes:
        'Reenie Beanie only for short pencil scribbles — titles, circled results, “?!” — at 36–56px; it is light, so never below 28px. Atkinson Hyperlegible 400/700 body at 16px on 20px/40px multiples. Red Hat Mono for readings, timestamps and tables, tabular figures with slashed zero (font-feature-settings: "zero").',
    },
    {
      id: 'block-caps-engineer',
      name: 'Patrick Hand SC + B612',
      display: {
        family: 'Patrick Hand SC',
        weights: [400],
        fallback: '"Segoe Print", cursive',
        source: 'google',
      },
      body: { family: 'B612', weights: [400, 700], fallback: 'Verdana, sans-serif', source: 'google' },
      mono: { family: 'B612 Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Patrick Hand SC for engineering block-capital lettering — titles, labels, answers — at 20–40px with 0.04em tracking on the grid. B612 400 body at 15px/20px. Working in B612 Mono aligned on “=”. Corrections: line-through 1.5px in the red palette colour with the corrected value written after it, never deleted.',
    },
  ],
  palettes: [
    {
      id: 'green-computation',
      name: 'Green computation pad',
      colors: {
        paper: '#eaf2df',
        ink: '#1a2419',
        muted: '#435343',
        accent: '#c2412d',
        accent2: '#2b5d8a',
        rule: '#a9c9a4',
        panel: '#dce9cf',
      },
      usage:
        'Eye-ease green paper with green grid (rule); graphite ink text; red (accent) for corrections, the margin line and answer boxes; blue ballpoint (accent2) for handwritten remarks and arrows; panel for header strips and taped-in printouts.',
    },
    {
      id: 'white-quad-blue',
      name: 'White quad-ruled',
      colors: {
        paper: '#fbfbf8',
        ink: '#15181c',
        muted: '#4d5258',
        accent: '#1e4f8f',
        accent2: '#d1462f',
        rule: '#b6cde3',
        panel: '#eef3f7',
      },
      usage:
        'Bright white page with pale blue quad ruling; blue-black ink (accent) for handwriting (≈20% of the text), black for mono notes; red (accent2) for the margin line and struck-through corrections; panel for tables.',
    },
    {
      id: 'aged-sepia',
      name: 'Aged archive notebook',
      colors: {
        paper: '#efe3c7',
        ink: '#2a2117',
        muted: '#5f5242',
        accent: '#8a3b12',
        accent2: '#3e6d6a',
        rule: '#cdb88f',
        panel: '#e4d3ae',
      },
      usage:
        'Yellowed archival paper (≈85%); brown-black ink; fountain-pen sepia (accent) for titles and circled results; faded teal (accent2) for later annotations in a different pen; tan grid lines.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['major-third', 'perfect-fourth'],
  motion: [
    {
      id: 'strike-correction',
      name: 'Strike-through correction',
      description:
        'A value that changes (updated hours, a new price) keeps the old value, a line draws through it left → right, then the new value is written beside it.',
      duration: '300ms',
      easing: 'cubic-bezier(.5,0,.5,1)',
      reduced: 'Show the struck-through old value and the new value without animation.',
    },
    {
      id: 'pen-sketch',
      name: 'Pen sketch',
      description:
        'SVG sketches and the circles around results draw in once with stroke-dashoffset at a hand-like, uneven pace.',
      duration: '900ms',
      easing: 'cubic-bezier(.4,.1,.6,.9)',
      reduced: 'Show the finished drawings.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'No motion; links carry a static hand-drawn SVG underline that thickens on hover.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'graph-grid',
      name: 'Graph-paper grid',
      description: '20px minor / 100px major grid behind everything, with every block aligned to it.',
    },
    {
      id: 'struck-corrections',
      name: 'Struck-through corrections',
      description:
        'Errors left visible under a single line, with the correction and initials beside — the honesty of the record.',
    },
    {
      id: 'annotation-arrows',
      name: 'Annotation arrows & circled numbers',
      description:
        'Hand-drawn curved arrows from margin notes to values; key results circled; entry numbers boxed.',
    },
  ],
  anchors: [
    {
      id: 'boxed-result',
      name: 'Boxed result',
      description:
        'The first screen centres on one double-boxed answer (the key fact or figure) with the working trail above it.',
    },
    {
      id: 'entry-header',
      name: 'Dated entry header',
      description:
        'A big handwritten date and entry title across the top, the mono “Book / page” header above and the first observations below.',
    },
    {
      id: 'annotated-sketch',
      name: 'Annotated sketch',
      description:
        'A large single-weight line sketch of the subject with 4–6 handwritten labels and arrows fills the first screen.',
    },
  ],
  surfaces: [
    {
      id: 'quad-ruled',
      name: 'Quad-ruled',
      description: 'Uniform 20px grid across the whole page.',
      css: 'background-color: var(--paper); background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 20px 20px;',
    },
    {
      id: 'major-minor-grid',
      name: 'Engineering grid',
      description: 'Engineering pad grid: faint 20px squares with stronger 100px major lines.',
      css: 'background-color: var(--paper); background-image: linear-gradient(rgba(60,110,60,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(60,110,60,.12) 1px, transparent 1px), linear-gradient(rgba(60,110,60,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(60,110,60,.24) 1px, transparent 1px); background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;',
    },
    {
      id: 'taped-printout',
      name: 'Taped-in printout',
      description:
        'White printout rectangles taped onto the page with translucent tape strips at two corners, rotated about 1°.',
      css: '.taped { background: #fffefa; position: relative; transform: rotate(-.8deg); } .taped::before { content: ""; position: absolute; top: -10px; left: 24px; width: 80px; height: 22px; background: rgba(240,232,200,.65); transform: rotate(-4deg); }',
    },
  ],
  must: [
    'A visible grid underlies the page and blocks align to it.',
    'Every entry or section carries a date and an entry or page number.',
    'Handwriting is used for titles and remarks, mono for data — both appear on the first screen.',
    'At least one table of values with units in its header.',
  ],
  mustNot: [
    'No erasing: corrections are struck through, never silently replaced.',
    'Handwriting faces never set paragraphs longer than two lines.',
    'No stock science imagery: no beakers, DNA helices or glowing molecules.',
  ],
};

const herbariumSpecimen: Branch = {
  id: 'herbarium-specimen',
  name: { zh: '植物标本', en: 'Herbarium specimen' },
  family: 'document',
  concept: {
    zh: '标本馆的台纸：压平的植物居中固定在无酸台纸上，右下角贴着采集标签——斜体拉丁学名、采集人、日期、产地、馆藏号，旁边还有条形码和鉴定签。大片留白里只有一件主角和一张精确的小标签。',
    en: 'The herbarium sheet: a pressed plant centred and strapped onto acid-free mounting paper, a collection label in the bottom-right corner — Latin binomial in italics, collector, date, locality, accession number — plus a barcode and determination slips. A wide white field holding one specimen and one precise little label.',
  },
  references: [
    'Royal Botanic Gardens, Kew herbarium sheets',
    'Smithsonian US National Herbarium labels and red type-specimen folders',
    'The Linnaean Herbarium, Linnean Society of London',
    'Anna Atkins, Photographs of British Algae: Cyanotype Impressions (1843)',
    'Natural History Museum, London — entomology drawer labels',
  ],
  keywords: ['台纸', '采集标签', '拉丁学名', '馆藏编号', '鉴定签', '条形码', '留白'],
  tokens: {
    grid: 'Each section is a mounting sheet in herbarium proportion 29 × 42 (≈ 1 : 1.45) portrait, max 720px wide; specimen centred in the upper 70%; label block anchored bottom-right at 40% of the sheet width; 8px baseline inside labels; sheets laid in a 2–3 column cabinet grid when several are shown.',
    radius:
      '0. Labels are cut rectangles; the only curves are the specimen itself and round accession stamps.',
    border:
      'Labels: 1px ink frame plus a 1px inner rule 3px inside (printed label border); paper straps as 6 × 24px panel-colour strips across stems; sheet edge 1px var(--rule).',
    shadow:
      'No soft shadows. A pressed specimen may carry a hard 1px edge: filter: drop-shadow(0 1px 0 rgba(0,0,0,.15)).',
  },
  layouts: [
    {
      id: 'single-sheet',
      name: 'Single mounted sheet',
      description:
        'One sheet per screen: the subject (image or drawing) centred, the data label bottom-right, determination slips stacked above it, barcode top-right.',
      grid: 'Sheet 1:1.45 portrait centred, max 720px; specimen area = top 68%; label 300px wide, 24px from bottom and right; det. slips 260px wide stacked above; barcode 160 × 40 top-right.',
      structure: [
        'Barcode and institution code top-right (“HD 0047213”)',
        'Specimen: one centred image or SVG drawing held by paper straps',
        'Determination slips: 1–2 smaller labels “Det. …, date”',
        'Main label bottom-right: institution, name in italics, locality, date, collector and number — all from the facts',
        'Below the sheet: a short catalogue paragraph in small type',
      ],
    },
    {
      id: 'cabinet-drawer',
      name: 'Cabinet drawer',
      description:
        'Looking into a specimen drawer: a grid of unit trays, each holding one item with its own tiny label; the drawer label sits on the front edge.',
      grid: '4–6 columns of equal unit trays (1:1.2), 1px rule tray walls, 16px gaps; a 72px drawer-front strip at the bottom with a label holder.',
      structure: [
        'Drawer header: cabinet number, category name, “Drawer 12 of 40”',
        'Unit trays: 8–16 items, each with a tiny label (name in italics, number, date)',
        'One tray singled out with a red “TYPE” label',
        'Drawer front: brass label holder carrying the page title',
        'Index list below: catalogue numbers in order',
      ],
    },
    {
      id: 'accession-register',
      name: 'Accession register',
      description:
        'The register behind the collection: a ruled table of accession numbers, names and localities with a sheet thumbnail beside each entry.',
      grid: 'Table max 1100px: No. 100px / thumbnail 80px / name (italic, flex) / locality / date / collector; 40px rows; sticky header; on mobile each row becomes a small label block.',
      structure: [
        'Register title: institution, volume and year range',
        'Ruled entries with accession numbers in mono',
        'One expanded entry: the full specimen sheet opened inline',
        'Notes: duplicates distributed, loans out',
        'Colophon: curator’s signature line and stamp',
      ],
    },
  ],
  type: [
    {
      id: 'kew-garamond',
      name: 'EB Garamond + Courier Prime',
      display: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      mono: {
        family: 'Courier Prime',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'EB Garamond italic for every scientific-style name (genus capitalised, epithet lowercase, authority in roman: “Quercus robur L.”); institution names in 500 caps with 0.12em tracking; body 400 at 16px/1.5; labels 13px/18px. Oldstyle figures in prose; accession numbers in Courier Prime at 13px.',
    },
    {
      id: 'goudy-typed',
      name: 'Sorts Mill Goudy + Cutive Mono',
      display: {
        family: 'Sorts Mill Goudy',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      body: { family: 'Cutive Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Sans SC' },
      notes:
        'Sorts Mill Goudy for the printed label headers (“PLANTS OF …”) in letter-spaced caps (0.1em) at 11–14px, and italic at 32–48px for the big name on the sheet. Everything filled in on labels in Cutive Mono 400 at 14px/20px, as if typed on a 1950s machine, with text-shadow: 0 0 .5px currentColor for ink spread.',
    },
    {
      id: 'digitised-plex',
      name: 'IBM Plex Sans + IBM Plex Serif',
      display: {
        family: 'IBM Plex Sans',
        weights: [300, 600],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Serif',
        weights: [400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Modern digitisation labels: IBM Plex Sans 600 for field labels (uppercase, 0.06em, 11px) and 300 at 40–64px for the page-title name; IBM Plex Serif italic for names, roman for body at 16px/1.5; IBM Plex Mono for the barcode’s human-readable line, catalogue numbers and coordinates (“51.4787° N, 0.2956° W”).',
    },
  ],
  palettes: [
    {
      id: 'archival-white',
      name: 'Archival white sheet',
      colors: {
        paper: '#f8f6ef',
        ink: '#1b1a17',
        muted: '#55524a',
        accent: '#8a2a1e',
        accent2: '#3d5a3a',
        rule: '#c8c2b2',
        panel: '#efe8d4',
      },
      usage:
        'The acid-free sheet dominates (≥ 75% — it is the white space); near-black ink for labels; red (accent) only for “TYPE” labels and the accession stamp; specimen green (accent2) for the plant drawing; cream panel for labels and determination slips.',
    },
    {
      id: 'foxed-antique',
      name: 'Foxed antique sheet',
      colors: {
        paper: '#eadcbd',
        ink: '#2a1e12',
        muted: '#5d4a33',
        accent: '#6a7a3a',
        accent2: '#9c4a2a',
        rule: '#b9a079',
        panel: '#f3e9d1',
      },
      usage:
        'Nineteenth-century sheet: foxed tan paper, sepia-black ink; dried olive (accent) for the specimen; rust (accent2) for old museum stamps and collector numbers; labels lighter than the sheet (panel) so they read as pasted on.',
    },
    {
      id: 'cabinet-dark',
      name: 'Cabinet interior',
      colors: {
        paper: '#1e231c',
        ink: '#ece6d3',
        muted: '#bdb59c',
        accent: '#c9a961',
        accent2: '#a9c48a',
        rule: '#3f4a3a',
        panel: '#283024',
      },
      usage:
        'Dark drawer interior as the ground; labels in the panel colour with cream ink; brass (accent) for label holders, numbers and rules; pale leaf green (accent2) for specimens drawn as line work.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['perfect-fourth', 'major-third'],
  motion: [
    {
      id: 'hand-lens',
      name: 'Hand lens',
      description:
        'Over the specimen a 160px circular loupe follows the pointer showing a 2× view (background-position tracks the cursor), like examining the sheet with a hand lens.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Loupe disabled; a click opens the image at 2× in place.',
    },
    {
      id: 'sheet-lift',
      name: 'Sheet lift',
      description:
        'Opening an entry from the drawer or register slides the sheet up out of the stack in one move; the label settles last, 80ms later.',
      duration: '380ms',
      easing: 'cubic-bezier(.25,.8,.25,1)',
      reduced: 'Swap to the sheet with no movement.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'No motion; label links underlined 1px; hover darkens the label frame.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'collection-label',
      name: 'Collection label',
      description:
        'A small framed label with fixed fields: institution, name (italic), locality, habitat, date (“12 Aug 1934”), collector and number, “Det.” line.',
    },
    {
      id: 'straps-packets',
      name: 'Straps & fragment packets',
      description:
        'Narrow paper straps across stems and a folded fragment packet (envelope shape) used to hold images and small notes in place.',
    },
    {
      id: 'barcode-stamp',
      name: 'Barcode & accession stamp',
      description:
        'An SVG Code 128-style barcode with its human-readable number beneath, plus a round or oval accession stamp in red or rust.',
    },
  ],
  anchors: [
    {
      id: 'centred-specimen',
      name: 'Centred specimen',
      description:
        'The first screen is one mounted sheet: a single image or drawing centred in a wide white field, the label in the bottom-right corner.',
    },
    {
      id: 'oversized-label',
      name: 'Oversized label',
      description:
        'The collection label blown up to fill the first screen — the name at 6–8vw in italics, fields beneath in small caps.',
    },
    {
      id: 'open-drawer',
      name: 'Open drawer',
      description:
        'The first screen shows a drawer of 8–12 unit trays with tiny labels, the drawer-front label naming the page.',
    },
  ],
  surfaces: [
    {
      id: 'acid-free-sheet',
      name: 'Acid-free mounting paper',
      description: 'Heavy, flat, faintly warm white paper with no texture.',
      css: 'background-color: var(--paper);',
    },
    {
      id: 'foxed-paper',
      name: 'Foxed paper',
      description: 'Aged sheet with brown foxing spots and a darker edge tone.',
      css: 'background-color: var(--paper); background-image: radial-gradient(circle at 12% 18%, rgba(140,90,40,.12) 0 6px, transparent 7px), radial-gradient(circle at 78% 64%, rgba(140,90,40,.10) 0 4px, transparent 5px), radial-gradient(ellipse at center, transparent 65%, rgba(120,90,50,.15));',
    },
    {
      id: 'drawer-felt',
      name: 'Drawer felt',
      description: 'Dark felt drawer lining with a fine fibre texture under the trays.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px); background-size: 3px 3px;',
    },
  ],
  must: [
    'Each item is presented as a specimen with a label of fixed, filled fields (name, place, date, number).',
    'Names are set in italics, and the white field around the specimen is kept.',
    'Labels sit at the bottom-right of their sheet, never top-centre.',
  ],
  mustNot: [
    'No botanical-wellness styling: no watercolour leaf frames, sage gradients or script fonts.',
    'No more than one specimen per sheet in the single-sheet layout.',
    'No fabricated scientific names: names from the facts are set in italics as given.',
  ],
};

const fieldGuidePlate: Branch = {
  id: 'field-guide-plate',
  name: { zh: '野外图鉴', en: 'Field guide plate' },
  family: 'document',
  concept: {
    zh: 'Peterson、Collins 一类野外图鉴的对页：一边是编号图版，相近的物种排成一列，细线指向辨识特征；另一边是简短的识别文字、小分布图和数据表。一切都为了在野外几秒钟内认出眼前的东西。',
    en: 'The facing pages of a Peterson or Collins field guide: on one side a numbered plate with similar species lined up and fine pointer lines to field marks; on the other, terse identification text, small range maps and data tables. Everything serves recognising the thing in front of you within seconds.',
  },
  references: [
    'Roger Tory Peterson, A Field Guide to the Birds (1934) and the Peterson Identification System',
    'Collins Bird Guide (Svensson, Mullarney, Zetterström, 1999)',
    'Golden Nature Guides (Herbert S. Zim, Golden Press, 1949–)',
    'James Sowerby, English Botany (1790–1814), hand-coloured plates',
    'Audubon Society Field Guides (Knopf, 1977–) with colour-coded thumb tabs',
  ],
  keywords: ['图版', '编号', '辨识特征', '分布图', '对页', '小型大写', '检索表'],
  tokens: {
    grid: 'Facing pages: plate page and text page 50% each (min 480px) with a 32px spine; plate items laid in a 6-row band grid with numbers at the left; text page in 2 columns of 18em with a 1em gap; 6px baseline.',
    radius: '0. Range maps are plain shapes; thumb tabs on the outer edge are square.',
    border:
      'Pointer lines 1px ink, no arrowheads (a 3px dot at the field mark); range-map frames 1px ink; entries separated by 1px var(--rule); a 12px thumb-tab colour bar on the outer page edge.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'plate-and-text',
      name: 'Plate facing text',
      description:
        'The classic spread: left page a numbered plate of 4–8 comparable items with pointer lines to their marks; right page the matching numbered entries with tiny range maps.',
      grid: '2 equal pages; left page 2 × 3 or 2 × 4 plate cells with numbers; right page 2 columns of 18em entries; 32px spine in panel colour; on mobile plate cell → entry interleave.',
      structure: [
        'Running head: group name in small caps + “PLATE 12”',
        'Plate page: numbered items at the same scale and pose, field-mark pointer lines',
        'Text page: entries keyed by the same numbers — name, size, identification, notes',
        'Small range maps (two-colour areas) beside each entry',
        'Folio and thumb-tab colour bar on the outer edge',
      ],
    },
    {
      id: 'species-account',
      name: 'Species account',
      description:
        'A long single-subject account: a wide plate across the top, then a fact table, identification text, a similar-species comparison strip and a range map.',
      grid: '12 columns, max 1100px; plate spans 12 at 2.5:1; fact table 4 columns left; text 8 columns right in two 18em columns; comparison strip 12 columns of 3–4 thumbnails.',
      structure: [
        'Plate band with the subject and 3–5 pointer labels',
        'Name block: common name large, secondary name in italics, measurement line “L 14 cm · WS 22 cm”',
        'Fact table (habitat, season, size, status) next to the range map',
        'Identification text with field marks in bold small caps',
        'Similar-species strip: “Compare with:” thumbnails, one-line differences',
      ],
    },
    {
      id: 'dichotomous-key',
      name: 'Identification key',
      description:
        'A dichotomous key: numbered couplets (1a / 1b → go to 2) leading to named results, with thumbnail figures in the margin.',
      grid: 'Main column 36em with couplet numbers hanging in a 3em gutter; dot leaders to right-aligned “→ 4” targets; 200px right margin for thumbnails; 6px baseline.',
      structure: [
        '“Key to …” title with instructions for use',
        'Couplets 1a / 1b, 2a / 2b … each a pair of contrasting statements drawn from the facts',
        'Results as named entries with plate references “Pl. 4, fig. 7”',
        'Glossary box of terms used in the key',
        'Index of names with plate numbers',
      ],
    },
  ],
  type: [
    {
      id: 'alegreya-plates',
      name: 'Alegreya SC + Alegreya',
      display: { family: 'Alegreya SC', weights: [500, 700], fallback: 'Georgia, serif', source: 'google' },
      body: {
        family: 'Alegreya',
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Alegreya SC 500/700 for group names, plate titles and common names at 18–40px with 0.05em tracking; Alegreya 400 + italic for body at 15px/1.45 and secondary names; field marks in Alegreya 700 inside the text. Measurements with thin spaces (“L 14 cm”).',
    },
    {
      id: 'golden-guide',
      name: 'Jost + Literata',
      display: {
        family: 'Jost',
        weights: [500, 700],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Literata',
        weights: [400, 600],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Jost 500/700 — geometric, as in the 1950s–60s Golden Guides — for headings in sentence case at 22–48px and for plate numbers; Literata 400/italic body at 16px/1.5 with optical sizing; captions in Jost 400 at 12px. Lining figures throughout.',
    },
    {
      id: 'engraved-plate',
      name: 'Cormorant SC + Spectral',
      display: {
        family: 'Cormorant SC',
        weights: [500, 600],
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'Spectral',
        weights: [300, 400],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Cormorant SC 500/600 for engraved-style plate titles (“PLATE XII. — WARBLERS.”) with roman numerals, 0.08em tracking, 20–44px. Figure captions under each item (“Fig. 3. Male, spring.”) in Spectral italic 13px; body Spectral 300/400 at 16px/1.55.',
    },
  ],
  palettes: [
    {
      id: 'plate-white',
      name: 'Plate white',
      colors: {
        paper: '#fbf8f0',
        ink: '#1c1a16',
        muted: '#575146',
        accent: '#c4442b',
        accent2: '#3b6ea5',
        rule: '#c9c1af',
        panel: '#f1ead9',
      },
      usage:
        'Clean plate white; ink for text and pointer lines; range-map colours only — red-orange (accent) for summer/breeding range, blue (accent2) for winter range, overlap shown as hatching of both (no blended fill); panel for the spine and fact tables; rule for table hairlines.',
    },
    {
      id: 'golden-guide',
      name: 'Golden Guide',
      colors: {
        paper: '#f6efd9',
        ink: '#1f1a10',
        muted: '#5a4e33',
        accent: '#d99a1e',
        accent2: '#2f6b5a',
        rule: '#bfae82',
        panel: '#efe0b4',
      },
      usage:
        'Warm 1960s paper; golden yellow (accent) only as solid fills — thumb tabs, plate-number discs, the running-head band (≈10%) — with ink text on top; teal-green (accent2) for range maps; pale-gold panel for fact boxes.',
    },
    {
      id: 'nocturnal-slate',
      name: 'Night plate',
      colors: {
        paper: '#24282a',
        ink: '#eeebe2',
        muted: '#b8b4a8',
        accent: '#e0a43a',
        accent2: '#8fb58a',
        rule: '#45494b',
        panel: '#2e3335',
      },
      usage:
        'Night plate for nocturnal subjects: slate ground; specimens and text warm off-white; amber (accent) for plate numbers, pointer dots and the key result; sage (accent2) for range maps; panel for fact tables.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['major-third', 'perfect-fourth'],
  motion: [
    {
      id: 'pointer-draw',
      name: 'Field-mark pointers',
      description:
        'Hovering an entry number highlights the matching plate item and draws its pointer lines (stroke-dashoffset) out to the field marks.',
      duration: '240ms',
      easing: 'cubic-bezier(.3,.7,.3,1)',
      reduced: 'Pointer lines always visible; hover changes colour only.',
    },
    {
      id: 'thumb-tab',
      name: 'Thumb-tab jump',
      description:
        'Clicking a thumb tab on the page edge jumps to that group; the active tab slides out 8px like a finger holding the page.',
      duration: '140ms',
      easing: 'steps(2, end)',
      reduced: 'The active tab changes colour only.',
    },
    {
      id: 'still',
      name: 'Still',
      description: 'No motion; plates are static, links underline on hover.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'peterson-pointers',
      name: 'Pointer lines to field marks',
      description:
        'Thin leader lines from an item to a short label naming its distinguishing feature (“white wing-bar”) — the Peterson system applied to the subject’s features.',
    },
    {
      id: 'range-maps',
      name: 'Range maps',
      description:
        'Small 120 × 120 simplified maps or diagrams with two-colour areas and a 3-item legend, answering where and when (areas served, seasons, hours).',
    },
    {
      id: 'numbered-figures',
      name: 'Numbered plate figures',
      description:
        'Items drawn at a consistent scale and pose, each with a numeral and a short caption; plates titled with roman numerals.',
    },
  ],
  anchors: [
    {
      id: 'full-plate',
      name: 'Full plate',
      description:
        'The first screen is the plate itself: 4–8 comparable items lined up with numbers and pointer lines under a small-caps “PLATE I”.',
    },
    {
      id: 'species-header',
      name: 'Species header',
      description:
        'One large subject with 3–5 pointer labels, the common name huge, the secondary name in italics beneath and a measurement line.',
    },
    {
      id: 'key-couplet',
      name: 'Opening couplet',
      description:
        'The first screen is the first two or three couplets of a key (“1a … → 2 / 1b … → 5”) guiding the visitor to an answer.',
    },
  ],
  surfaces: [
    {
      id: 'coated-plate',
      name: 'Coated plate paper',
      description: 'Smooth bright paper for colour plates, no texture.',
    },
    {
      id: 'uncoated-text',
      name: 'Uncoated text stock',
      description: 'Warm, slightly toothy text paper with fine grain.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(60,40,10,.035) 1px, transparent 1px); background-size: 4px 4px;',
    },
    {
      id: 'tipped-in-plate',
      name: 'Tipped-in plate',
      description:
        'Plates on separate stock pasted onto the text page: a panel-coloured rectangle with an inset 1px frame and a tissue guard along its top edge.',
      css: '.plate { background: var(--panel); outline: 1px solid var(--rule); outline-offset: -8px; border-top: 6px solid rgba(255,255,255,.45); }',
    },
  ],
  must: [
    'Items appear on plates at a comparable scale and pose, numbered and keyed to text entries by the same numbers.',
    'Identification text is terse: each entry ≤ 60 words with the distinguishing feature in bold.',
    'At least one small map or diagram answers “where / when”.',
  ],
  mustNot: [
    'No full-bleed hero photography; images sit on plates at a controlled scale.',
    'No outdoor-brand clichés: no leaf or mountain icons, no adventure copy.',
    'No range-map colours outside the palette and no blended overlap fills.',
  ],
};

const editorialMagazine: Branch = {
  id: 'editorial-magazine',
  name: { zh: '杂志编辑', en: 'Editorial magazine' },
  family: 'print',
  concept: {
    zh: '长篇杂志特稿：大号首字下沉、标题下的导语、署名行、多栏正文、打断栏位的引语和页脚页码。节奏来自栏宽、栏间细线和标题字号的大落差——是印刷杂志的版面，而不是大片留白的“生活方式”网页。',
    en: 'The long-form magazine feature: a big drop cap, a deck under the headline, a byline, multi-column body text, a pull quote breaking the columns and folios at the foot. Rhythm comes from column measure, hairline column rules and dramatic headline scale — a printed magazine spread, not a whitespace-heavy lifestyle site.',
  },
  references: [
    'The New Yorker feature pages (Rea Irvin display, Caslon body)',
    'Harper’s Bazaar under Alexey Brodovitch (1934–58)',
    'Esquire under Harold Hayes and George Lois (1960s)',
    'The New York Times Magazine redesign by Matt Willey (2015)',
    'London Review of Books',
  ],
  keywords: ['首字下沉', '导语', '署名', '跨栏引语', '栏间线', '页码', '长文'],
  tokens: {
    grid: '12 columns, 18px gutter, max 1240px; body in 3 columns of 4 grid columns (≈ 22em) on desktop, 2 on tablet, 1 on mobile (column-count with column-rule); 24px baseline; opening spreads split 6 + 6.',
    radius: '0.',
    border:
      'Column rules 1px var(--rule) (column-rule); folio rule 1px full width; pull quotes with a 3px accent rule above and 1px rule below; section breaks as a centred ornament (❧) or a 3em rule.',
    shadow: 'none.',
  },
  layouts: [
    {
      id: 'opening-spread',
      name: 'Opening spread',
      description:
        'A two-page opener: left page a full-height image or a giant typographic headline, right page deck, byline and the first columns with a drop cap.',
      grid: '6 + 6 columns at ≥ 1024px; left half headline or image at 100vh; right half: deck across 4 columns, body in 2 columns × 3; folio row at the foot of both halves.',
      structure: [
        'Rubric (section name) top-left in small caps, folio number',
        'Left page: headline at 8–12vw or full-bleed image with a credit line',
        'Right page: deck/standfirst in italic, byline “By … · Photographs by …”',
        'Body starts with a 4-line drop cap and runs in 2–3 columns',
        'Pull quote spanning 2 columns mid-body; end mark ■ or “Continued on p. 74”',
      ],
    },
    {
      id: 'three-column-feature',
      name: 'Three-column feature',
      description:
        'A classic feature page: headline across all columns, then three justified columns with column rules, subheads, a spot illustration and a pull quote.',
      grid: '12 columns; headline spans 12; deck spans 8; body column-count 3 with 1px column rules; spot illustration one column wide; pull quote column-span: all.',
      structure: [
        'Department heading + issue date strip',
        'Headline across 12 columns, deck beneath across 8',
        'Byline with a hairline above',
        'Three-column body: drop cap, 2–4 small-caps subheads, spot art inside a column',
        'Pull quote across all columns; end mark ■; contributor note in italics at the foot',
      ],
    },
    {
      id: 'front-of-book',
      name: 'Front-of-book departments',
      description:
        'A departments page: several short items of different lengths in a modular grid, each with a kicker, a short headline and 60–200 words, separated by rules.',
      grid: '12 columns; items span 3, 4, 5 or 8 columns; 1px rules between items; 24px baseline; one item carries a large figure or illustration.',
      structure: [
        'Department masthead: department name + issue',
        'Lead item across 8 columns with kicker and illustration',
        'Side column (4) of 3 short stacked items',
        'Bottom row of 3 unequal items with kickers',
        'Contributors / colophon strip',
      ],
    },
  ],
  type: [
    {
      id: 'caslon-feature',
      name: 'Libre Caslon Display + Libre Caslon Text',
      display: {
        family: 'Libre Caslon Display',
        weights: [400],
        fallback: '"Big Caslon", Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'Libre Caslon Text',
        weights: [400, 700],
        italic: true,
        fallback: '"Adobe Caslon Pro", Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Libre Caslon Display for headlines at 56–120px, line-height 1.0, −0.01em tracking, sentence case; Libre Caslon Text 400 body at 17px/24px, justified with hyphens; deck in Libre Caslon Text italic at 22px; rubrics and bylines in font-variant-caps: all-small-caps with 0.08em tracking. 4-line drop cap in the Display cut. Oldstyle figures in running text.',
    },
    {
      id: 'bodoni-fashion',
      name: 'Bodoni Moda + Libre Baskerville',
      display: {
        family: 'Bodoni Moda',
        weights: [400, 700],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: 'google',
      },
      body: {
        family: 'Libre Baskerville',
        weights: [400, 700],
        italic: true,
        fallback: 'Baskerville, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        'Bodoni Moda 400 italic and 700 roman mixed inside one headline at 72–160px (optical sizing on so hairlines stay sharp), leading 0.92; deck Bodoni Moda 400 at 24px. Body Libre Baskerville 400 at 16px/26px, ragged-right. Bylines uppercase 11px with 0.2em tracking in Libre Baskerville 700. 6-line drop cap in Bodoni Moda 700.',
    },
    {
      id: 'grotesk-modern',
      name: 'Schibsted Grotesk + Source Serif 4',
      display: {
        family: 'Schibsted Grotesk',
        weights: [700, 900],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Source Serif 4',
        weights: [300, 400, 600],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Schibsted Grotesk 900 for headlines at 64–144px, −0.03em tracking, line-height 0.95, often two weights in one headline; kickers Schibsted Grotesk 700 uppercase 12px with 0.1em. Source Serif 4 400 body at 18px/1.5 with optical sizing; deck Source Serif 4 300 italic at 26px. Pull quotes Schibsted Grotesk 700 at 36px.',
    },
  ],
  palettes: [
    {
      id: 'weekly-white',
      name: 'Weekly white',
      colors: {
        paper: '#fdfcf8',
        ink: '#111111',
        muted: '#505050',
        accent: '#a6192e',
        accent2: '#1d3f6e',
        rule: '#1a1a1a',
        panel: '#f1eee6',
      },
      usage:
        'Black on white for ≥ 95% of the page; red (accent) only for the rubric, the drop cap and the end mark ■; navy (accent2) for links and illustration line work; panel for sidebars.',
    },
    {
      id: 'black-spread',
      name: 'Black opening spread',
      colors: {
        paper: '#121110',
        ink: '#f5f1e8',
        muted: '#b7b0a3',
        accent: '#e4572e',
        accent2: '#d9c7a3',
        rule: '#3a3733',
        panel: '#1d1b19',
      },
      usage:
        'Opening spread printed solid black; cream type; orange (accent) for one highlighted headline word, the rule over pull quotes and the drop cap; sand (accent2) for captions and credits; panel for sidebars.',
    },
    {
      id: 'uncoated-ochre',
      name: 'Uncoated literary',
      colors: {
        paper: '#efe7d6',
        ink: '#1e1a14',
        muted: '#5c5244',
        accent: '#2f5d50',
        accent2: '#c27b2a',
        rule: '#b5a88f',
        panel: '#e3d8c0',
      },
      usage:
        'Uncoated literary-magazine stock; bottle green (accent) for headlines, rubrics and drop caps; ochre (accent2) only as solid blocks behind pull quotes or illustration plates, with ink text on top; tan column rules.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fifth', 'golden', 'augmented-fourth'],
  motion: [
    {
      id: 'page-turn',
      name: 'Page turn',
      description:
        'Moving between spreads turns the page: the outgoing page rotates −180° around the spine (rotateY, perspective 1600px) while the next spread is revealed beneath.',
      duration: '600ms',
      easing: 'cubic-bezier(.45,.05,.2,1)',
      reduced: 'Cut directly to the next spread.',
    },
    {
      id: 'two-plate-print',
      name: 'Two-plate print',
      description:
        'The headline and drop cap print in two passes: the colour plate (accent) first, then the black plate overprints 120ms later, 1px out of register before snapping true.',
      duration: '240ms',
      easing: 'steps(2, end)',
      reduced: 'Show the final registered type.',
    },
    {
      id: 'still',
      name: 'Still print',
      description: 'No motion; hover underlines links with a 1px rule at 0.2em offset.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'drop-cap',
      name: 'Drop cap',
      description:
        'A 3–6 line drop cap in the display face opening the feature and each major section, aligned to the baseline grid.',
    },
    {
      id: 'pull-quote',
      name: 'Pull quote',
      description:
        'A large quotation lifted verbatim from the body text, breaking the column grid between a heavy and a hairline rule.',
    },
    {
      id: 'folios-rubrics',
      name: 'Folios, rubrics & end marks',
      description:
        'Page numbers with magazine name and issue at the foot (“94 · THE QUARTERLY · NOVEMBER 2026”), section rubrics at the top, a ■ end mark.',
    },
  ],
  anchors: [
    {
      id: 'giant-headline',
      name: 'Giant headline',
      description:
        'The first screen is the headline at 10–14vw over 2–3 lines with deck and byline beneath; no image.',
    },
    {
      id: 'full-bleed-opener',
      name: 'Full-bleed opener',
      description:
        'A half- or full-screen photograph or illustration with the headline set inside or beside it and a credit line.',
    },
    {
      id: 'drop-cap-columns',
      name: 'Drop cap into columns',
      description:
        'The first screen already shows text: rubric, a modest headline and three columns opening with a giant drop cap.',
    },
  ],
  surfaces: [
    {
      id: 'coated-magazine',
      name: 'Coated magazine stock',
      description: 'Bright smooth paper with no texture; image areas at full saturation.',
    },
    {
      id: 'uncoated-literary',
      name: 'Uncoated literary stock',
      description: 'Warm, slightly rough paper with fine fibre texture.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(80,60,30,.04) 1px, transparent 1px); background-size: 3px 3px;',
    },
    {
      id: 'solid-black-spread',
      name: 'Solid black spread',
      description:
        'A full-bleed black opening page with cream type; the black is a flat ink solid, never a gradient.',
      css: 'background-color: var(--paper); color: var(--ink);',
    },
  ],
  must: [
    'Body text runs in multiple columns on desktop at a 45–75 character measure.',
    'The feature opens with headline, deck and byline, and the body starts with a drop cap.',
    'At least one pull quote taken verbatim from the provided facts or body text.',
    'Folios or a running footer with issue and section information.',
  ],
  mustNot: [
    'No Kinfolk-style minimal lifestyle layout: no expanses of beige whitespace around one centred paragraph.',
    'No card grids of article teasers with rounded thumbnails.',
    'No real magazine mastheads (The New Yorker, Vogue…) used as branding.',
  ],
};

export const documentBranches: Branch[] = [
  recipeCard,
  engineeringPlate,
  ledgerAccounting,
  academicPaper,
  apothecaryLabel,
  bureaucraticForm,
  labNotebook,
  herbariumSpecimen,
  fieldGuidePlate,
  editorialMagazine,
];
