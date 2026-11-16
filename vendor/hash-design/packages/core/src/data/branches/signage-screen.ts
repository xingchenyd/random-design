import type { Branch } from '../../types.js';

/**
 * Signage & screen branches: wayfinding, shop signs, menu boards, gallery labels, maps,
 * terminals, early web, game manuals, instrument panels, almanacs.
 */

const transitWayfinding: Branch = {
  id: 'transit-wayfinding',
  name: { zh: '交通导视', en: 'Transit wayfinding' },
  family: 'signage',
  concept: {
    zh: '地铁站与机场的导视系统：黑底白字的方牌、圆形线路色标，箭头永远排在文字前面。Vignelli 的纽约地铁标准手册、Kinneir 与 Calvert 的英国道路标志、港铁的中英双语站名都在教同一件事——一眼读懂，按顺序行动。信息以“牌”为单位，而不是以“卡片”为单位。',
    en: "The signage system of a metro or an airport: white-on-black panels, coloured line bullets, the arrow always ahead of the words. Vignelli's NYC Transit Authority manual, Kinneir & Calvert's British road signs and Hong Kong MTR's bilingual station names all teach one lesson — read at a glance, act in sequence. Information comes in signs, not cards.",
  },
  references: [
    'Unimark (Massimo Vignelli & Bob Noorda) — NYCTA Graphics Standards Manual (1970)',
    'Jock Kinneir & Margaret Calvert — Transport typeface and UK road signs (1957–67)',
    'Hong Kong MTR station signage and line colours (1979–)',
    'Paul Mijksenaar — Schiphol Airport wayfinding system (1991)',
    'Solari di Udine split-flap departure boards (1956–)',
    'Otl Aicher — Munich 1972 Olympics pictograms',
  ],
  keywords: ['线路色标', '箭头', '站台号', '黑底白字', '翻牌显示屏', '双语站名'],
  tokens: {
    grid: 'Sign-module grid: 1 module = 96px (64px on mobile); sign panels are 1 or 2 modules tall and span full width or whole columns of a 12-col, 24px-gutter grid; 24px inner padding (¼ module); every text line in a panel shares one left edge; an 8px gap between panels shows the wall behind.',
    radius:
      '0 for every sign panel. Line bullets are perfect circles (border-radius: 50%); express/variant markers are squares rotated 45°. Nothing else is rounded.',
    border:
      'Panels are solid fills with no outline. Black panels carry the NYCTA stripe: a 2px paper-coloured line 10px below the top edge. Rows of signs are divided by 2px solid var(--rule); platform/exit squares have no border, only fill.',
    shadow: 'none. Signs are flat enamel; depth comes only from the 8px wall gap between panels.',
  },
  layouts: [
    {
      id: 'sign-band',
      name: 'Overhead sign band',
      description:
        'The page is a corridor: a stack of full-width overhead sign bands, each with an arrow, bullets and a destination, and the content follows like the platform beyond.',
      grid: 'Full-bleed bands 1 or 2 modules (96/192px) tall; inside each band a 12-col grid with 24px gutter; a fixed 96×96 arrow cell at the left or right end of the band.',
      structure: [
        'Overhead band: arrow (96px) + 2–4 line bullets + destination (the title), paper on black, full width',
        'Station-name frieze: title in Chinese above, English below, on a line-coloured band across a tiled wall',
        'Route strip: horizontal line diagram; each page section is a labelled stop with a tick',
        'Exit directory: ruled table — exit letter in a square, street/place names, landmarks from the facts',
        'Service-notice panel in accent2 for times and caveats, then a thin operator band as the footer',
      ],
    },
    {
      id: 'departure-board',
      name: 'Departure board',
      description:
        'The first screen is a split-flap board; each fact becomes a departure row (time · destination · platform · remark), with detail panels below.',
      grid: 'Board columns 6ch time / 1fr destination / 4ch platform / 14ch remarks; each character in a flap cell 0.66em × 1.15em with 2px gaps; board sits inside a 32px solid frame of var(--panel).',
      structure: [
        'Board header: "出发 DEPARTURES" left, live clock HH:MM in tabular figures right',
        '6–10 board rows built from the facts: time · name · platform number in a square · status word',
        'Platform legend strip: numbered squares with what each "platform" leads to',
        'Detail panels on light paper, one per row, in the same order as the board',
        'Operator footer with a row of drawn pictograms (stairs, lift, exit) and address',
      ],
    },
    {
      id: 'manual-spread',
      name: 'Standards-manual spread',
      description:
        'A page from the NYCTA manual: white page, one black sign specimen across the top third, numbered specifications and colour chips below.',
      grid: '6 col, 32px gutter, 64px outer margins; specimen spans 6 col × 1 module; spec text in two 3-col columns; section code top-left, folio top-right.',
      structure: [
        'Section code + title (e.g. "1.3 Station identification") top-left in small caps, folio top-right',
        'Sign specimen: one black panel carrying the main message at true sign scale',
        'Dimension callouts: hairline arrows labelling cap height, spacing and module',
        'Numbered specification paragraphs in two columns (the facts)',
        'Colour-chip row: line colours as circles with names and codes',
      ],
    },
  ],
  type: [
    {
      id: 'overpass-highway',
      name: 'Overpass + Overpass Mono',
      display: {
        family: 'Overpass',
        weights: [700, 800],
        fallback: '"Highway Gothic", "Arial Narrow", Arial, sans-serif',
        source: 'google',
      },
      body: { family: 'Overpass', weights: [400, 600], fallback: 'Arial, sans-serif', source: 'google' },
      mono: {
        family: 'Overpass Mono',
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Chiron Hei HK', body: 'Noto Sans TC' },
      notes:
        'Destinations in Title Case, never all caps (Kinneir/Calvert: word shapes read faster); tracking -0.01em, line-height 1.0 on signs. Platform numbers and times in Overpass Mono 600, tabular figures, 24-hour HH:MM. Minimum sign text 28px; body 17px/1.5.',
    },
    {
      id: 'instrument-standard',
      name: 'Instrument Sans + Hanken Grotesk',
      display: {
        family: 'Instrument Sans',
        weights: [500, 600, 700],
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Hanken Grotesk',
        weights: [400, 500],
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans TC', body: 'Noto Sans TC' },
      notes:
        'Vignelli discipline: one weight per panel (600 for destinations), tracking -0.015em, everything flush-left. Bullet letters 700 at 0.62× the bullet diameter, optically centred. Bilingual pairs: Chinese above English, Chinese at 1.15× the English cap height.',
    },
    {
      id: 'barlow-flap',
      name: 'Barlow Condensed + Barlow + Azeret Mono',
      display: {
        family: 'Barlow Condensed',
        weights: [500, 600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: { family: 'Barlow', weights: [400, 500], fallback: 'Arial, sans-serif', source: 'google' },
      mono: {
        family: 'Azeret Mono',
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Board characters in Azeret Mono 700 uppercase, one glyph per flap cell, tracking 0. Destinations in Barlow Condensed 600 uppercase, +0.02em. Status words (准点 ON TIME / 延误 DELAYED) in accent2. Body Barlow 16px/1.5.',
    },
  ],
  palettes: [
    {
      id: 'nycta-black-band',
      name: 'NYCTA black band',
      colors: {
        paper: '#f2f1ec',
        ink: '#121212',
        muted: '#4a4a47',
        accent: '#ee352e',
        accent2: '#fccc0a',
        rule: '#121212',
        panel: '#121212',
      },
      usage:
        'Black sign panels carry ~35% of the first screen with paper-coloured type; tile-white wall elsewhere. Red and yellow appear only as line bullets (≤ 56px circles); yellow also fills service-change notices with ink text.',
    },
    {
      id: 'schiphol-yellow',
      name: 'Schiphol yellow',
      colors: {
        paper: '#ffd100',
        ink: '#141414',
        muted: '#4a3d00',
        accent: '#00783c',
        accent2: '#333333',
        rule: '#141414',
        panel: '#333333',
      },
      usage:
        'The whole page is the yellow directional sign with ink type; dark-grey panels (≈25%) hold facility information in yellow type; green only for exits and "way out" items. No other hues.',
    },
    {
      id: 'flap-board-night',
      name: 'Flap board at night',
      colors: {
        paper: '#0e0f0f',
        ink: '#f2efe6',
        muted: '#a3a097',
        accent: '#f6b40e',
        accent2: '#5cbf52',
        rule: '#2e302f',
        panel: '#1e2020',
      },
      usage:
        'Near-black board body; every character sits in a panel-grey flap cell split by a 1px paper-black line at mid-height. Amber for the clock and DELAYED, green only for ON TIME; ink for all characters.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fifth', 'augmented-fourth', 'perfect-fourth'],
  motion: [
    {
      id: 'split-flap',
      name: 'Split-flap',
      description:
        'Changing text (times, destinations) flips per character: each cell falls through 3–6 intermediate glyphs as a top half-flap rotating rotateX(0 → -90deg), staggered 30ms per character left to right.',
      duration: '60ms',
      easing: 'cubic-bezier(.5, 0, .75, 0)',
      reduced: 'Swap to the final text instantly; no intermediate glyphs.',
    },
    {
      id: 'arrow-nudge',
      name: 'Arrow nudge',
      description:
        'On hover/focus the arrow of a sign slides 6px in the direction it points and returns, once; the panel and text never move.',
      duration: '220ms',
      easing: 'cubic-bezier(.3, 0, .2, 1)',
      reduced: 'Arrow stays still; the panel inverts (black ↔ paper) instead.',
    },
    {
      id: 'route-progress',
      name: 'Route progress',
      description:
        'A "you are here" dot moves along the route strip to the stop of the current section, jumping stop to stop like an in-car LED line map.',
      duration: '400ms',
      easing: 'steps(4, end)',
      reduced: 'The dot appears at the current stop with no travel.',
    },
  ],
  motifs: [
    {
      id: 'line-bullets',
      name: 'Line bullets',
      description:
        'Line identifiers as filled circles (32–64px) holding one letter or digit in 700 paper-coloured type; rotated squares for express variants. Max two line colours per panel.',
    },
    {
      id: 'directional-arrows',
      name: 'Directional arrows',
      description:
        'Drawn SVG arrows in the AIGA/DOT manner — 45° heads, stem width one-fifth of the head — always placed before the label in reading direction; only the 8 compass directions.',
    },
    {
      id: 'route-strip',
      name: 'Route strip',
      description:
        'Horizontal line diagram: a 6px bar in the line colour with paper-filled stop ticks; interchange stops as paper circles with a 3px ink ring; labels set at 45° or alternating above/below.',
    },
  ],
  anchors: [
    {
      id: 'overhead-sign',
      name: 'Overhead sign',
      description:
        'The first screen opens on one full-width black overhead sign: arrow, 2–3 line bullets, then the title as the destination at 6–8vw.',
    },
    {
      id: 'flap-board',
      name: 'Flap board',
      description: 'The first screen is a split-flap departure board listing 6–8 rows built from the facts.',
    },
    {
      id: 'station-name-wall',
      name: 'Station-name wall',
      description:
        'The title set as a station name on a tiled wall — Chinese large, English below — on a line-coloured frieze band, with platform-number squares at both ends.',
    },
  ],
  surfaces: [
    {
      id: 'porcelain-enamel',
      name: 'Porcelain enamel',
      description:
        'Flat vitreous-enamel panels with four drawn screw heads 14px in from the corners; perfectly even fill, crisp edges.',
      css: 'background-color: var(--panel); background-repeat: no-repeat; background-image: radial-gradient(circle at 14px 14px, #8c8c88 3px, transparent 3.5px), radial-gradient(circle at calc(100% - 14px) 14px, #8c8c88 3px, transparent 3.5px), radial-gradient(circle at 14px calc(100% - 14px), #8c8c88 3px, transparent 3.5px), radial-gradient(circle at calc(100% - 14px) calc(100% - 14px), #8c8c88 3px, transparent 3.5px);',
    },
    {
      id: 'ceramic-tile-wall',
      name: 'Ceramic tile wall',
      description:
        'Station wall of stack-bonded 96×48 tiles behind the signs: paper colour with faint grout lines.',
      css: 'background-color: var(--paper); background-image: linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px); background-size: 96px 48px;',
    },
    {
      id: 'backlit-lightbox',
      name: 'Backlit lightbox',
      description:
        'Airport lightbox: the panel is slightly brighter at its centre (backlit acrylic) inside a 6px darker aluminium frame.',
      css: 'background: radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--panel) 88%, white), var(--panel) 70%); border: 6px solid color-mix(in srgb, var(--panel) 70%, black);',
    },
  ],
  must: [
    'Every directional item has an arrow placed before its label, pointing in a real direction (one of 8).',
    'Line/route identifiers are circles or squares with one character — never text pills.',
    'Bilingual labels are stacked pairs with a fixed size ratio; times are 24-hour HH:MM in tabular figures.',
    'Sign text is flush-left; only characters inside bullets and squares are centred.',
  ],
  mustNot: [
    'No rounded-rectangle chips or pill tags for lines or categories.',
    'No photos, illustrations or gradients on sign panels — only type, arrows, bullets and pictograms.',
    'No all-caps running text; caps only inside flap-board cells.',
    'No more than two line colours on one sign panel.',
  ],
};

const hkShopSign: Branch = {
  id: 'hk-shop-sign',
  name: { zh: '港式招牌', en: 'Hong Kong shop sign' },
  family: 'signage',
  concept: {
    zh: '弥敦道上空横伸出来的招牌、上海老街的竖匾：中文大字为主，英文小一号跟在下面；红底金字、绿底白字、黑漆描金，夜里霓虹灯管沿着同样的笔画勾出来。每块牌都写着铺号、行业、电话——它既是广告，也是门牌。',
    en: 'The signs cantilevered over Nathan Road and the vertical plaques of old Shanghai streets: Chinese characters huge, English a size smaller beneath; gold on red, white on green, gilt on black lacquer, and at night neon tubes trace the same strokes. Every sign carries a shop number, a trade and a phone number — advertisement and address at once.',
  },
  references: [
    'Nathan Road and Mong Kok projecting neon signs (1960s–2000s)',
    '區建公 Au Kin-kung — hand-written shop-sign calligraphy, Hong Kong',
    'M+ Museum — NEONSIGNS.HK collection and "Mobile M+: NEONSIGNS.HK" (2014)',
    'Nanjing Road department stores 先施 Sincere / 永安 Wing On, Shanghai 1920s–30s',
    'Hong Kong pawnshop 押 signs with the bat-and-coin emblem',
  ],
  keywords: ['招牌', '中英双语', '红底金字', '霓虹灯管', '铺号', '竖排'],
  tokens: {
    grid: 'Sign-board grid: content is built from boards — horizontal boards 3:1 to 5:1, vertical boards 1:3 to 1:5. One CJK character = one square cell (1em × 1em) with a 0.12em gutter, so a board is N characters wide plus 2 × 0.4em frame.',
    radius:
      '0 for all boards. Only the shop-number roundel is a circle (border-radius: 50%); neon tubes use stroke-linecap: round and stroke-linejoin: round.',
    border:
      'Boards are framed: 0.4em solid var(--accent2) outer frame plus a 2px inner line (outline: 2px solid var(--accent2); outline-offset: -10px). Section rules 3px solid var(--ink).',
    shadow:
      'none on boards. Neon tubes may carry a tight 0 0 2px edge of their own colour (max 3px blur) — never a halo.',
  },
  layouts: [
    {
      id: 'projecting-stack',
      name: 'Projecting sign stack',
      description:
        'A street canyon: vertical boards hang from the right edge at staggered heights while horizontal boards carry the content on the left.',
      grid: '12 col, 16px gutter; cols 1–8 content boards; cols 10–12 hold 2–3 vertical boards (1:4) stacked with 24px gaps, each dropped by one-third of the previous; vertical text uses writing-mode: vertical-rl.',
      structure: [
        'Vertical shop-name board at the right, 4–6 characters, gold on red, upright characters',
        'Horizontal trade board at the left: what the place sells, English line beneath at ⅓ size',
        'Shop-number roundel + address line (地铺 / 1/F / street number from the facts)',
        'Price or service list as a lacquered board: items left, prices right in lining figures',
        'Hours and phone on a narrow green strip board; footer repeats the name as a neon outline',
      ],
    },
    {
      id: 'shopfront-fascia',
      name: 'Shopfront fascia',
      description:
        'The full-width lintel board over the shutter, then the shopfront below divided into unequal window bays.',
      grid: 'Fascia band full width, 22vh tall, 4–8 characters fit to width; below, 3 bays of 5/4/3 columns separated by 12px ink pilasters.',
      structure: [
        'Fascia board: name in 4–8 huge CJK characters; English name and shop number in a gold sub-band',
        'Three window bays of unequal width: goods / prices / opening hours',
        'Rolling-shutter band: 4px horizontal stripes in var(--muted) with closing days lettered on it',
        'Pilaster boards with vertical couplet text left and right of the contact panel',
        'Pavement strip: address, phone and established year (if given) in one ruled line',
      ],
    },
    {
      id: 'neon-night',
      name: 'Neon night stack',
      description:
        'The dark-street view: overlapping neon outlines drawn as line work, with lit boards hung between them carrying the content.',
      grid: '8 col, 24px gutter; boards may overhang a neighbouring column by 1 col; neon paths snap to a 24px grid with 3–4px strokes.',
      structure: [
        'Main neon sign: the name as stroked outline characters plus a tube border with dead (black-painted) gaps',
        'Smaller lit boards: trade and specialities, each with its own tube colour',
        'Bilingual menu or service board in lightbox style',
        'Building directory like a tong-lau lobby: G/F, 1/F, 2/F rows mapped to sections',
        'Footer: address with the nearest MTR exit letter in a square, if given',
      ],
    },
  ],
  type: [
    {
      id: 'sung-plaque',
      name: 'Chiron Sung HK + Marcellus + Bitter',
      display: {
        family: 'Marcellus',
        weights: [400],
        fallback: '"Times New Roman", serif',
        source: 'google',
      },
      body: { family: 'Bitter', weights: [400, 600], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'Chiron Sung HK', body: 'Noto Sans TC' },
      notes:
        'Chinese leads: Chiron Sung HK 900 at 2.5–4× the Latin cap height, tracking 0.06em. Latin in Marcellus uppercase +0.08em, one line beneath the Chinese. Shop numbers in Bitter 600 lining figures. Vertical boards: writing-mode: vertical-rl; text-orientation: upright; letter-spacing 0.1em.',
    },
    {
      id: 'brush-signboard',
      name: 'Ma Shan Zheng + Antonio + Hanken Grotesk',
      display: {
        family: 'Antonio',
        weights: [600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Hanken Grotesk',
        weights: [400, 600],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Ma Shan Zheng', body: 'Noto Sans TC' },
      notes:
        'Brush characters (Ma Shan Zheng, single weight) at 120–200px, tracking 0.05em, one board = one phrase. English in Antonio 700 uppercase +0.04em at ⅓ of the CJK size, like the small English on a Mong Kok sign. Prices in Antonio 600 with the currency sign at 60%.',
    },
    {
      id: 'neon-tube',
      name: 'Tilt Neon + ZCOOL XiaoWei + Schibsted Grotesk',
      display: {
        family: 'Tilt Neon',
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Schibsted Grotesk',
        weights: [400, 500],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Sans TC' },
      notes:
        'Tilt Neon only for neon layers, ≥ 48px, in the tube colour with a 0 0 2px same-colour edge. Chinese neon: ZCOOL XiaoWei with -webkit-text-stroke: 2px var(--accent) and color: transparent so it reads as a bent tube. Body stays small (15px) and plain so the tubes carry the voice.',
    },
  ],
  palettes: [
    {
      id: 'red-gold-lacquer',
      name: 'Red lacquer, gold leaf',
      colors: {
        paper: '#f5ecd9',
        ink: '#1c1410',
        muted: '#5b4a3a',
        accent: '#b8121b',
        accent2: '#e5b84b',
        rule: '#1c1410',
        panel: '#b8121b',
      },
      usage:
        'Boards are lacquer red with gold characters and gold frames (~40% of the first screen); cream wall behind; ink for body text and rules; muted for address and phone fine print.',
    },
    {
      id: 'jade-enamel',
      name: 'Jade-green enamel',
      colors: {
        paper: '#f7f6f0',
        ink: '#0f2a22',
        muted: '#3f5a50',
        accent: '#0b6b4f',
        accent2: '#d8261c',
        rule: '#0f2a22',
        panel: '#0b6b4f',
      },
      usage:
        'Green enamel boards with paper-white characters (~35%); red only for the shop-number roundel and one seal-like mark; ink text on an off-white wall.',
    },
    {
      id: 'neon-street',
      name: 'Neon street at night',
      colors: {
        paper: '#120d0c',
        ink: '#f3ead8',
        muted: '#a99c8a',
        accent: '#ff3b5c',
        accent2: '#36d6c3',
        rule: '#3a2e2a',
        panel: '#1e1715',
      },
      usage:
        'Warm near-black street; neon tubes in pink (accent) and teal (accent2) as 3–4px strokes and outline text only (≤ 10% of pixels); boards are panel brown-black with cream characters.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'neon-ignite',
      name: 'Neon ignite',
      description:
        'On load each tube ignites in turn with a starter flicker — opacity 0 → .4 → .1 → 1 — one tube every 120ms; at most 3 flickers per tube, never looping.',
      duration: '600ms',
      easing: 'steps(4, jump-none)',
      reduced: 'Tubes are lit from the start; no flicker.',
    },
    {
      id: 'shutter-roll',
      name: 'Shutter roll',
      description:
        'The fascia alone is revealed by a striped rolling shutter translating from 0 to -100% on first view; nothing else on the page animates.',
      duration: '700ms',
      easing: 'cubic-bezier(.6, 0, .4, 1)',
      reduced: 'Shutter is already up.',
    },
    {
      id: 'lacquer-swap',
      name: 'Lacquer swap',
      description:
        'No movement. Hovering a board swaps gold ↔ red (frame and characters reverse), like a night-lit board.',
      duration: '0ms',
      easing: 'steps(1, end)',
      reduced: 'Same — it is a colour swap only.',
    },
  ],
  motifs: [
    {
      id: 'vertical-board',
      name: 'Vertical board',
      description:
        'Tall boards with upright CJK characters (writing-mode: vertical-rl; text-orientation: upright), a gold double frame, and small English running along the bottom edge.',
    },
    {
      id: 'neon-outline',
      name: 'Neon outline',
      description:
        'Neon drawn as SVG paths: 4px stroke, round caps and joins, continuous lines with visible dead gaps (stroke-dasharray breaks) where the tube jumps between characters.',
    },
    {
      id: 'shop-number-roundel',
      name: 'Shop-number roundel',
      description:
        'A gold-ringed disk with the street number and a small 號 / No., like the plaque screwed beside a shutter; reused for floor marks (G/F, 1/F).',
    },
  ],
  anchors: [
    {
      id: 'fascia-name',
      name: 'Fascia name',
      description:
        'The first screen is the fascia: the name in 4–8 CJK characters fit to width across a red or green board, English and shop number in a gold sub-band beneath.',
    },
    {
      id: 'hanging-vertical',
      name: 'Hanging vertical',
      description:
        'A tall 1:4 vertical board hangs at the right, cut off by the top of the viewport as seen from the pavement, beside a horizontal trade board.',
    },
    {
      id: 'neon-cluster',
      name: 'Neon cluster',
      description:
        'Two or three overlapping neon outline signs (name, trade, a simple drawn emblem) on the night-street palette.',
    },
  ],
  surfaces: [
    {
      id: 'lacquer-board',
      name: 'Lacquer board',
      description: 'High-gloss lacquer: flat fill with one 1px light highlight line 4px inside the top edge.',
      css: 'background-color: var(--panel); background-image: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.3)); background-size: calc(100% - 16px) 1px; background-position: 8px 4px; background-repeat: no-repeat;',
    },
    {
      id: 'gold-leaf-type',
      name: 'Gold-leaf characters',
      description: 'Characters in flat gold with a 1px darker edge — no metallic gradients.',
      css: 'color: var(--accent2); -webkit-text-stroke: 1px color-mix(in srgb, var(--accent2) 70%, black);',
    },
    {
      id: 'tong-lau-concrete',
      name: 'Tong-lau concrete',
      description:
        'Weathered concrete façade behind the boards: paper colour with large, faint water stains.',
      css: 'background-color: var(--paper); background-image: radial-gradient(ellipse at 20% 30%, rgba(60,40,20,.06), transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(60,40,20,.045), transparent 35%); background-size: 420px 360px, 300px 260px;',
    },
  ],
  must: [
    'Chinese characters are the largest element on every board; English never exceeds 40% of the CJK size.',
    'At least one vertical board using writing-mode: vertical-rl with upright characters.',
    'Every sign carries a concrete address element from the facts: shop number, floor, street or phone.',
    'Neon is drawn as line work — the path of the tube is visible.',
  ],
  mustNot: [
    'No glow blobs, blurred halos or text-shadow larger than 4px; no cyberpunk gradients.',
    'No sideways-rotated Chinese in vertical text.',
    'No Latin-only boards; every board is bilingual or Chinese-only.',
    'No faux-oriental "chop suey" Latin typefaces.',
  ],
};

const dinerMenuBoard: Branch = {
  id: 'diner-menu-board',
  name: { zh: '餐馆菜单板', en: 'Diner menu board' },
  family: 'signage',
  concept: {
    zh: '美式餐馆柜台上方的菜单板：黑色毛毡上插着白色塑料字母，菜名用点线一路拉到右边的价格栏，旁边一块黑板写着今日特供。搪瓷招牌、派饼柜、烤炉上方的钟——所有信息都对齐在同一条价格栏上。',
    en: "The menu board above an American diner counter: white plastic letters pushed into black felt, dot leaders running every item to the price column, a chalkboard of today's specials beside it. Enamel signs, a pie case, a clock over the grill — everything lines up on the price column.",
  },
  references: [
    'Changeable-letter felt menu boards, 1950s–80s American lunch counters',
    'Worcester Lunch Car Co. and Jerry O’Mahony dining cars (1920s–50s)',
    "Katz's Delicatessen menu boards, New York",
    'Edward Hopper — Nighthawks (1942)',
    'Porcelain-enamel roadside signage along US Route 66',
  ],
  keywords: ['字母板', '点线引导', '价格栏', '今日特供', '搪瓷招牌', '柜台'],
  tokens: {
    grid: 'Letter-board grid: felt grooves every 1.5em (1em letter + 0.5em groove); every text line snaps to a groove; item column flex: 1 with dot leaders, price column a fixed 6ch right-aligned column; boards sit on a 12-col, 16px-gutter wall.',
    radius:
      '0 for boards and panels. Porcelain-enamel signs may use 8px corners (pressed steel) — the only rounding; plates, cups and the clock face are drawn circles.',
    border:
      'Board frame 14px solid var(--accent2) (chrome/wood) around the felt; grooves 1px at 6–8% opacity. Paper menu sections ruled with a 6px double line (border-top: 6px double var(--rule)).',
    shadow:
      'none, except 1px 1px 0 rgba(0,0,0,.45) under plastic letters to show they stand proud of the felt.',
  },
  layouts: [
    {
      id: 'counter-board',
      name: 'Counter board',
      description:
        'The big felt letter board spans the width with two menu columns; a tilted chalkboard of specials hangs at its right.',
      grid: '12 col; felt board 8 col, chalkboard 4 col; inside the felt two menu columns with a 48px gutter; every line on a 1.5em groove.',
      structure: [
        'Board header in letters: place name + "MENU" across the top of the felt',
        'Two felt columns of categories, items with dot leaders to prices',
        "Chalkboard panel at -1.5°: today's special(s) from the facts, price circled",
        'Enamel strip under the board: hours, payment notes, phone',
        'Paper placemat footer: address, a simple ruled street diagram, the date',
      ],
    },
    {
      id: 'laminated-menu',
      name: 'Laminated menu',
      description:
        'A folded paper menu laid open: cover panel plus inside panels with numbered combos and a boxed special — the light-palette view.',
      grid: 'Tri-fold: 3 panels of 4 col with 24px inner margins and 2px vertical fold rules; items in a two-column table (name + description | price).',
      structure: [
        'Cover panel: name on an enamel-style badge, established year (if given), one line on what is served',
        'Numbered combos #1–#n: number in a filled circle, name, description, price right',
        'Boxed special from the facts inside a 6px double-rule frame',
        'Sides and drinks in small type with dot leaders',
        'Back panel: hours, address, payment notes',
      ],
    },
    {
      id: 'wall-of-signs',
      name: 'Wall of signs',
      description:
        'The diner wall: enamel signs, a felt board and a chalk strip of different sizes hung on tile, each carrying one section.',
      grid: '6-col masonry with 16px gaps; signs span 2–6 col; at least three shapes — wide felt board, square enamel sign, narrow vertical chalk strip.',
      structure: [
        'Wide enamel sign: the name, set like a porcelain roadside sign',
        'Square felt board: menu items with prices',
        'Narrow vertical chalk strip: specials',
        'Clock sign: opening hours drawn around a clock face',
        'Small counter sign ("PAY HERE" style) holding payment and address details',
      ],
    },
  ],
  type: [
    {
      id: 'oswald-letterboard',
      name: 'Oswald + Zilla Slab',
      display: {
        family: 'Oswald',
        weights: [500, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Zilla Slab',
        weights: [400, 600],
        fallback: 'Rockwell, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Letter-board text in Oswald 500 UPPERCASE, tracking +0.06em (plastic letters never kern), one fixed letter height per board. Prices Oswald 600, tabular-nums, cents raised at 60%. Zilla Slab 400 for descriptions, sentence case, 16–17px.',
    },
    {
      id: 'shrikhand-enamel',
      name: 'Shrikhand + Bitter',
      display: {
        family: 'Shrikhand',
        weights: [400],
        fallback: '"Cooper Black", Georgia, serif',
        source: 'google',
      },
      body: { family: 'Bitter', weights: [400, 700], fallback: 'Georgia, serif', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Shrikhand only for the name and category headers (≥ 40px), optionally on a -4° baseline swing; never for prices or lists. Bitter 700 small caps for item names, 400 for descriptions; lining tabular figures for prices.',
    },
    {
      id: 'shoulders-counter',
      name: 'Big Shoulders Display + Hanken Grotesk',
      display: {
        family: 'Big Shoulders Display',
        weights: [700, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'Hanken Grotesk',
        weights: [400, 500],
        fallback: 'Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Big Shoulders 900 uppercase for counter headings, tracking 0.02em, line-height 0.9; prices in 700 at 1.6× the item size. Chalk specials use the same face at 700 rotated -1.5° — chalkiness comes from colour, not a handwriting font. Hanken 400 for descriptions.',
    },
  ],
  palettes: [
    {
      id: 'felt-and-chrome',
      name: 'Black felt and chrome',
      colors: {
        paper: '#1a1918',
        ink: '#f5f2ea',
        muted: '#b3aea2',
        accent: '#e8382f',
        accent2: '#c7c9c8',
        rule: '#3a3836',
        panel: '#262422',
      },
      usage:
        'Black felt dominates (~70%); white letters for everything; red letters only for prices or "NEW"; chrome grey for the board frame and thin trims.',
    },
    {
      id: 'mint-formica',
      name: 'Mint formica, cherry red',
      colors: {
        paper: '#fbf7ee',
        ink: '#1d1a17',
        muted: '#55504a',
        accent: '#c8102e',
        accent2: '#5fb7a9',
        rule: '#1d1a17',
        panel: '#cfe7e0',
      },
      usage:
        'Cream menu paper; mint formica panels behind specials and category headers (~20%); cherry red for prices, combo-number circles and enamel signs; mint accent2 for the board frame only.',
    },
    {
      id: 'chalk-and-mustard',
      name: 'Chalkboard and mustard',
      colors: {
        paper: '#24302a',
        ink: '#f1efe6',
        muted: '#b4b9ae',
        accent: '#f2c230',
        accent2: '#ef8a7a',
        rule: '#5b675f',
        panel: '#2f3c35',
      },
      usage:
        'Green-slate ground; chalk-white text; mustard chalk for prices and circles around the special; pink chalk only for one underline or "TODAY" per board.',
    },
  ],
  densities: ['compact', 'packed'],
  scales: ['perfect-fourth', 'augmented-fourth', 'major-third'],
  motion: [
    {
      id: 'letter-push',
      name: 'Letter push-in',
      description:
        'Letters of a board line appear one by one as if pushed into the felt: each scales 1.06 → 1 and drops 2px into its groove, 25ms stagger.',
      duration: '90ms',
      easing: 'cubic-bezier(.3, 1.4, .5, 1)',
      reduced: 'The whole line appears at once.',
    },
    {
      id: 'letter-swap',
      name: 'Letter swap',
      description:
        'On hover (or when a price changes) the old letters drop out 8px downward and the new ones push in from above — swapping plastic letters.',
      duration: '160ms',
      easing: 'cubic-bezier(.5, 0, .2, 1)',
      reduced: 'Instant text swap.',
    },
    {
      id: 'still-board',
      name: 'Still board',
      description: 'No motion; hover underlines the item with a 2px dashed chalk-coloured line.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'dot-leaders',
      name: 'Dot leaders',
      description:
        'A flex filler between item and price drawn with radial-gradient dots (2px every 8px) sitting on the text baseline.',
    },
    {
      id: 'felt-grooves',
      name: 'Felt grooves',
      description:
        'Horizontal grooves every 1.5em behind letter-board text, 1px at 8% opacity, with letters sitting exactly between them.',
    },
    {
      id: 'enamel-badge',
      name: 'Enamel badge',
      description:
        'Porcelain-enamel sign shape: rectangle with 8px corners, a 3px contrasting inner border and a drawn screw hole at each end, carrying the name or "OPEN".',
    },
  ],
  anchors: [
    {
      id: 'felt-board-hero',
      name: 'Felt board',
      description:
        'The first screen is the felt letter board itself: name across the top, two columns of items with dot leaders and prices visible at once.',
    },
    {
      id: 'special-chalkboard',
      name: 'Specials chalkboard',
      description:
        'A wood-framed chalkboard tilted -1.5° with the special(s) from the facts, price circled in mustard, dominates the first screen.',
    },
    {
      id: 'enamel-sign-name',
      name: 'Enamel sign',
      description:
        'A large porcelain-enamel sign with the place name (and real established year if given) over a strip of counter info: hours, phone.',
    },
  ],
  surfaces: [
    {
      id: 'black-felt',
      name: 'Black felt',
      description: 'Grooved felt behind letter-board text.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, transparent 0 calc(1.5em - 1px), rgba(255,255,255,.07) calc(1.5em - 1px) 1.5em);',
    },
    {
      id: 'chalk-slate',
      name: 'Chalk slate',
      description: 'Slate with faint chalk haze where it was wiped.',
      css: 'background-color: var(--panel); background-image: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.06), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,.04), transparent 45%);',
    },
    {
      id: 'formica-fleck',
      name: 'Formica fleck',
      description: 'Laminate with a small scattered fleck behind paper menus.',
      css: 'background-color: var(--panel); background-image: radial-gradient(rgba(0,0,0,.06) 1px, transparent 1.5px), radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.5px); background-size: 14px 14px, 22px 22px; background-position: 0 0, 7px 11px;',
    },
  ],
  must: [
    'Every menu item has a price aligned in a single right-hand column with tabular figures.',
    'Item and price are connected by dot leaders or a groove — never by a gap alone.',
    'Letter-board text is uppercase with fixed spacing on visible grooves.',
    'Only items and prices present in the facts appear; empty categories are omitted.',
  ],
  mustNot: [
    'No food photography, stock images or illustrated food icons.',
    'No handwriting or "chalk" novelty fonts — chalk comes from colour and tilt.',
    'No card grid for menu items; items are lines on a board.',
  ],
};

const galleryCatalogue: Branch = {
  id: 'gallery-catalogue',
  name: { zh: '美术馆图录', en: 'Gallery catalogue' },
  family: 'signage',
  concept: {
    zh: '白立方展厅的墙面说明与展览图录：一面墙只挂一件作品，旁边一张小小的展签写着作者、标题、年代、材质、尺寸。图录里大量留白、连续的图版编号、档案灰——克制本身就是权威。',
    en: 'White-cube wall texts and exhibition catalogues: one work per wall, a small label beside it giving artist, title, year, medium and dimensions. In the catalogue: wide margins, continuous plate numbers, archival grey — restraint is the authority.',
  },
  references: [
    'MoMA exhibition catalogues and wall labels (1960s–)',
    'Wim Crouwel — Stedelijk Museum Amsterdam catalogues (1964–85)',
    'documenta 5 catalogue, Kassel (1972)',
    'Brian O’Doherty — Inside the White Cube (1976)',
    'Steidl and Walther König artist monographs',
  ],
  keywords: ['展签', '图版编号', '留白', '作者/标题/年代/材质', '档案灰', '白立方'],
  tokens: {
    grid: 'Catalogue grid: 12 col, 24px gutter, outer margins ≥ 12vw on desktop; a hanging line at 40% of viewport height on which works/plates are centred; captions on a 4px baseline grid.',
    radius: '0 everywhere — images, labels, buttons.',
    border:
      'Almost none: 1px solid var(--rule) hairlines for the running head and under plate captions; images unbordered except white-on-white works (1px var(--rule)).',
    shadow: 'none. Foam-board labels are shown by a 1px var(--rule) outline, not by shadow.',
  },
  layouts: [
    {
      id: 'single-wall',
      name: 'One work per wall',
      description:
        'Each viewport is a wall: one work (image or typographic stand-in) on the hanging line, a small label at its lower right.',
      grid: '12 col; work spans col 3–9 centred on the 40vh hanging line; label in col 10–11, aligned to the lower third of the work; each wall section min-height 100vh.',
      structure: [
        'Entry wall: exhibition title in vinyl lettering top-left, dates and venue below, curatorial text ≤ 60ch',
        'Wall 1…n: one work + tombstone label (artist, dates, title in italic, year, medium, dimensions, credit)',
        'Room-change wall: room number and room title alone',
        'Checklist: every work as a numbered table',
        'Colophon: lenders, curator, design credits at 11–12px',
      ],
    },
    {
      id: 'catalogue-plates',
      name: 'Catalogue plates',
      description:
        'Book spreads: text on the verso, a full-page plate with its plate number on the recto, repeated through the page.',
      grid: 'Spread of two pages; verso 5 col of text (max 52ch) + 1 col margin notes; recto 6 col plate area; folios at the outer bottom corners; running head over a 1px rule.',
      structure: [
        'Half-title spread: the title alone on the recto, small',
        'Essay pages: text with note numbers set in the margin column',
        'Plate spreads: "Pl. 12" + plate on the recto, 4-line caption below',
        'List of plates: ruled index with plate and page numbers',
        'Colophon: edition, printer, paper stock (only as given)',
      ],
    },
    {
      id: 'checklist-index',
      name: 'Archive checklist',
      description:
        'An archival register: tombstone entries in a measured grid with plate boxes and accession-style numbers, sections in a sticky left rail.',
      grid: '12 col; left 2 col sticky section rail; entries span 3 col each (4:3 plate box + 5-line tombstone); 48px row gap.',
      structure: [
        'Register header: title, date range, number of works (from the facts)',
        'Sticky section labels in the left rail',
        'Entries: number, plate box, tombstone lines',
        'Notes on the works: numbered endnotes',
        'Credits and lenders',
      ],
    },
  ],
  type: [
    {
      id: 'cormorant-catalogue',
      name: 'Cormorant + EB Garamond',
      display: {
        family: 'Cormorant',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Titles of works always italic. Exhibition title Cormorant 400 at ≤ 64px — the catalogue never shouts. Plate numbers in all-small-caps ("Pl. 12"); old-style figures in running text, lining in dimensions ("120 × 90 cm" with a true ×). Body 17px/1.6, max 58ch.',
    },
    {
      id: 'hanken-walltext',
      name: 'Hanken Grotesk + IBM Plex Mono',
      display: {
        family: 'Hanken Grotesk',
        weights: [400, 500],
        italic: true,
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Hanken Grotesk',
        weights: [400],
        italic: true,
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      mono: {
        family: 'IBM Plex Mono',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'One family, sizes do the work (Stedelijk discipline): title 40px/500, labels 13px/1.45 400, flush-left ragged-right, never justified. Artist 500, work title italic. Dimensions and inventory numbers in Plex Mono 12px.',
    },
    {
      id: 'marcellus-inscription',
      name: 'Marcellus + Instrument Sans',
      display: {
        family: 'Marcellus',
        weights: [400],
        fallback: '"Times New Roman", serif',
        source: 'google',
      },
      body: {
        family: 'Instrument Sans',
        weights: [400, 500],
        italic: true,
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Sans SC' },
      notes:
        'Marcellus uppercase +0.12em only for exhibition and room titles, as if cut in vinyl at the entrance — never for labels. Labels in Instrument Sans 400 at 14px/1.6; artist names 500; work titles italic.',
    },
  ],
  palettes: [
    {
      id: 'white-cube',
      name: 'White cube',
      colors: {
        paper: '#fafaf7',
        ink: '#161616',
        muted: '#5e5e5a',
        accent: '#c8332b',
        accent2: '#7d7a72',
        rule: '#d8d6cf',
        panel: '#efeee9',
      },
      usage:
        'Wall paper ≥ 85% of the area; ink text; muted for credit lines and dimensions; accent only as the 10px red dot and the current room number; panel behind the checklist.',
    },
    {
      id: 'archive-board',
      name: 'Archive board',
      colors: {
        paper: '#e6e3dc',
        ink: '#1d1c1a',
        muted: '#55524c',
        accent: '#2f4a3a',
        accent2: '#a07e46',
        rule: '#b9b4a8',
        panel: '#d8d4ca',
      },
      usage:
        'Grey archive-board page; bookcloth green for plate numbers and section labels; brass only for the rule under the running head; panel for plate boxes.',
    },
    {
      id: 'black-box',
      name: 'Black-box room',
      colors: {
        paper: '#151413',
        ink: '#ece8e0',
        muted: '#9d978c',
        accent: '#e8c27a',
        accent2: '#7f8a8c',
        rule: '#34322f',
        panel: '#1f1d1b',
      },
      usage:
        'Dark room for screen and light works: near-black walls, warm-white labels; the spot-lit accent only on room numbers and the current work title.',
    },
  ],
  densities: ['airy', 'regular'],
  scales: ['major-third', 'perfect-fourth', 'golden'],
  motion: [
    {
      id: 'spot-refocus',
      name: 'Spotlight refocus',
      description:
        'When a work or plate is focused or hovered, the rest of the wall dims slightly (paper → panel), as if the track lights were refocused.',
      duration: '400ms',
      easing: 'cubic-bezier(.25, .1, .25, 1)',
      reduced: 'No dimming; the focused label gets a 1px rule underline.',
    },
    {
      id: 'plate-slide',
      name: 'Plate slide',
      description:
        'Catalogue navigation: the next plate slides in horizontally by one page width with no fade — paper over paper.',
      duration: '520ms',
      easing: 'cubic-bezier(.65, 0, .35, 1)',
      reduced: 'Instant page swap.',
    },
    {
      id: 'still-wall',
      name: 'Still wall',
      description: 'No motion; links are 1px underlines offset 3px.',
      duration: '0ms',
      easing: 'linear',
      reduced: 'Nothing to change.',
    },
  ],
  motifs: [
    {
      id: 'tombstone-label',
      name: 'Tombstone label',
      description:
        'The museum label in fixed order — artist (500), dates, title (italic), year, medium, dimensions, credit line — small and flush-left.',
    },
    {
      id: 'plate-number',
      name: 'Plate number',
      description:
        '"Pl. 12" / "图 12" in small caps beside every image or stand-in, numbered continuously through the page.',
    },
    {
      id: 'red-dot',
      name: 'Red dot',
      description:
        'A single 10px solid accent circle — the gallery "sold" dot — used at most once per screen for the one item that matters.',
    },
  ],
  anchors: [
    {
      id: 'vinyl-title-wall',
      name: 'Vinyl title wall',
      description:
        'The entry wall: exhibition title in vinyl lettering top-left at modest size, dates and venue below, everything else empty wall.',
    },
    {
      id: 'single-plate',
      name: 'Single plate',
      description:
        'One large plate (image, or a typographic stand-in on panel colour) with its plate number and 4-line caption — nothing else above the fold.',
    },
    {
      id: 'checklist-first',
      name: 'Checklist first',
      description:
        'The first screen is the checklist: a numbered table of works (no., artist, title, year, medium) with generous row height.',
    },
  ],
  surfaces: [
    {
      id: 'matte-wall',
      name: 'Matte wall',
      description: 'Matte emulsion wall: flat paper colour, no texture at all.',
      css: 'background: var(--paper);',
    },
    {
      id: 'uncoated-stock',
      name: 'Uncoated stock',
      description: 'Uncoated catalogue paper with a barely visible fibre grain.',
      css: 'background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.025) .6px, transparent .8px); background-size: 4px 5px;',
    },
    {
      id: 'foam-board-label',
      name: 'Foam-board label',
      description: 'Labels as 1mm foam board on the wall: panel fill, 1px rule outline, no shadow.',
      css: 'background: var(--panel); border: 1px solid var(--rule); padding: 12px 14px;',
    },
  ],
  must: [
    'Every work or item has a tombstone with maker, title and year from the facts — omit a line rather than invent it.',
    'At least 40% of each first screen is empty wall.',
    'Titles of works are italic; plate numbers are continuous.',
    'The exhibition title is never larger than 72px.',
  ],
  mustNot: [
    'No carousels, hover-zoom or captions overlaid on images.',
    'No centred or justified body text; labels are flush-left ragged-right.',
    'No more than one accent mark per screen.',
  ],
};

const topographicMap: Branch = {
  id: 'topographic-map',
  name: { zh: '地形图', en: 'Topographic map' },
  family: 'signage',
  concept: {
    zh: '测绘局出版的地形图：等高线一圈圈收紧，图廓上刻满坐标刻度，图例方框、比例尺和出版说明整齐地排在图边。水系是蓝色斜体，等高线是赭色，林地是淡绿色块——每一种颜色都是一层数据。',
    en: 'The survey office’s topographic sheet: contours tightening ring by ring, grid references ticked along the neat-line, legend boxes, scale bar and imprint lined up in the margin. Water is blue italic, contours ochre, woodland a pale green tint — every colour is a data layer.',
  },
  references: [
    'Ordnance Survey 1:50 000 Landranger and 1:25 000 Explorer sheets',
    'USGS 7.5-minute topographic quadrangles',
    'swisstopo Landeskarte der Schweiz 1:25 000',
    'Eduard Imhof — Cartographic Relief Presentation (1965)',
    '国家测绘局 1:5 万地形图',
  ],
  keywords: ['等高线', '方格网', '图例', '比例尺', '图廓', '坐标刻度'],
  tokens: {
    grid: 'Map sheet: a neat-line frame inset 48px from the viewport; inside, a grid square every 96px drawn as hairlines with two-digit references at both ends of every line in the margin; content panels snap to whole grid squares.',
    radius: '0. Only symbols are round (spot heights, survey points); trig points are triangles.',
    border:
      'Neat-line: 1px ink inner line + 6px ink outer line, 8px apart. Grid lines 1px var(--rule); legend boxes 1px ink; scale bar segments 1px ink outline.',
    shadow: 'none. Relief, if any, is a hillshade tint inside the map field — never a drop shadow on UI.',
  },
  layouts: [
    {
      id: 'sheet-with-margin',
      name: 'Sheet with margin',
      description:
        'The map field takes three-quarters; a right margin column holds title block, legend, scale bar and imprint, like an OS sheet.',
      grid: '12 col; map field col 1–9 inside the neat-line, margin col 10–12 with 32px padding; 96px grid squares in the field; margin items on a 4px baseline.',
      structure: [
        'Title block at the top of the margin: sheet number, title, series, scale "1:25 000"',
        'Map field: contour drawing with the key content placed as labelled features (spot heights, place names)',
        'Legend panel: symbols + labels in two columns, one entry per fact category',
        'Scale bar (alternating ink/paper segments) and north arrow with a declination note',
        'Imprint: publisher, survey date, edition, grid note at 10–11px',
      ],
    },
    {
      id: 'legend-led',
      name: 'Legend-led',
      description:
        'The legend is the page: content arranged as entries of a large two-column key, with a small locator map inset at the top right.',
      grid: '8 col; legend entries in 2 columns, each entry = a 48px symbol cell + text; locator inset 3 col × 3 rows with its own neat-line.',
      structure: [
        'Series header band: series name, sheet number, edition',
        'Locator inset map with the current area outlined',
        'Legend sections (roads & paths / water / vegetation / buildings) relabelled as the facts’ categories',
        'Reference table: grid reference for each item, e.g. "SD 284 093" format',
        'Margin notes and publication imprint',
      ],
    },
    {
      id: 'folded-sheet',
      name: 'Folded sheet',
      description:
        'The map as folded: a cover panel with a series colour band, then panels of map and data separated by visible fold lines.',
      grid: 'Panels at 1:1.4 in a 4 × 2 fold grid; 1px dashed fold lines between panels; cover panel top-left with a coloured series band.',
      structure: [
        'Cover panel: series band, sheet number huge, title, scale, a small sheet-index diagram',
        'Map panels: contour areas carrying sections of content as annotations',
        'Elevation-profile panel: a drawn cross-section line',
        'Data panel: tables of coordinates, heights or distances from the facts',
        'Back panel: imprint, edition and legend summary',
      ],
    },
  ],
  type: [
    {
      id: 'barlow-landeskarte',
      name: 'Barlow Condensed + Barlow + Azeret Mono',
      display: {
        family: 'Barlow Condensed',
        weights: [500, 600],
        italic: true,
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: { family: 'Barlow', weights: [400, 500], fallback: 'Arial, sans-serif', source: 'google' },
      mono: { family: 'Azeret Mono', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Place names in Barlow Condensed: settlements upright 600; area names letter-spaced +0.15em across their feature; water names italic. Spot heights and grid numbers in Azeret Mono 11px tabular. Hierarchy by size and spacing, not colour.',
    },
    {
      id: 'bitter-ordnance',
      name: 'Bitter + IBM Plex Sans Condensed',
      display: {
        family: 'Bitter',
        weights: [500, 700],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Sans Condensed',
        weights: [400, 500],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'Water features in Bitter italic in the water colour, everything else upright — the cartographic italic-for-water rule. Sheet title Bitter 700 uppercase +0.04em. Margin text Plex Sans Condensed 12–13px; grid numbers 10px tabular-nums.',
    },
    {
      id: 'martian-survey',
      name: 'Martian Mono + Zilla Slab',
      display: {
        family: 'Martian Mono',
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Zilla Slab',
        weights: [400, 500],
        italic: true,
        fallback: 'Rockwell, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Serif SC' },
      notes:
        'Survey-data voice: coordinates, elevations and sheet codes in Martian Mono uppercase +0.04em; descriptive text in Zilla Slab 400, water names in its italic. Elevations always carry units ("1 284 m"), thin-space thousands.',
    },
  ],
  palettes: [
    {
      id: 'os-explorer',
      name: 'Survey sheet',
      colors: {
        paper: '#fbf8ef',
        ink: '#1e1c18',
        muted: '#575247',
        accent: '#0072bc',
        accent2: '#b5602a',
        rule: '#a7bfd2',
        panel: '#e3eed6',
      },
      usage:
        'Paper is the map; contours in accent2 brown at 1px (index contours 1.75px); water, water names and grid in accent blue; woodland panels pale green (~15%); ink for names and margin text; muted for imprint.',
    },
    {
      id: 'hypsometric-tint',
      name: 'Hypsometric tint',
      colors: {
        paper: '#e9edd8',
        ink: '#1b1f14',
        muted: '#4b5140',
        accent: '#8a5a2b',
        accent2: '#3d79a8',
        rule: '#b6a77f',
        panel: '#f1e2bf',
      },
      usage:
        'Lowland green ground; highland tan panels for raised content blocks; upland brown for contours and headings; blue only for water; ink for all names.',
    },
    {
      id: 'cyanotype-field',
      name: 'Cyanotype field copy',
      colors: {
        paper: '#16457a',
        ink: '#f2f5f7',
        muted: '#b9cde0',
        accent: '#ffffff',
        accent2: '#f0c75e',
        rule: '#5d82ab',
        panel: '#1d5590',
      },
      usage:
        'Prussian-blue blueprint of the field sheet: all line work and text in white/ink; muted for grid labels; yellow survey-crayon accent2 only for the current-location mark and corrections.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['major-second', 'minor-third', 'major-third'],
  motion: [
    {
      id: 'contour-plot',
      name: 'Contour plot',
      description:
        'Contours draw themselves on first load via stroke-dashoffset, innermost ring first, at constant plotter speed; 40ms stagger per contour.',
      duration: '900ms',
      easing: 'linear',
      reduced: 'Contours drawn complete.',
    },
    {
      id: 'crosshair-readout',
      name: 'Crosshair readout',
      description:
        'Over the map field a hairline crosshair snaps to grid squares and the margin shows the live grid reference — no easing, instrument-like.',
      duration: '0ms',
      easing: 'steps(1, end)',
      reduced: 'Same behaviour (it follows the pointer, nothing animates on its own).',
    },
    {
      id: 'fold-open',
      name: 'Fold open',
      description:
        'Folded-sheet panels unfold in sequence, rotateY 90° → 0 around their fold edge, like opening the map.',
      duration: '480ms',
      easing: 'cubic-bezier(.3, .7, .2, 1)',
      reduced: 'Panels shown flat.',
    },
  ],
  motifs: [
    {
      id: 'contour-lines',
      name: 'Contour lines',
      description:
        'SVG contours: concentric, non-crossing 1px lines at even intervals; every fifth an index contour at 1.75px with its height label breaking the line.',
    },
    {
      id: 'grid-ticks',
      name: 'Grid ticks',
      description:
        'Coordinate ticks along the neat-line: 6px ticks every grid square with two-digit eastings/northings, 3px minor ticks every tenth.',
    },
    {
      id: 'scale-bar',
      name: 'Scale bar',
      description:
        'Alternating ink/paper segmented bar (0–1–2 km) with "1:25 000" above and small numbers under each division.',
    },
  ],
  anchors: [
    {
      id: 'contour-field',
      name: 'Contour field',
      description:
        'The first screen is a field of contours with the title set as a feature name along the slope (letter-spaced on an SVG textPath).',
    },
    {
      id: 'sheet-title-block',
      name: 'Sheet title block',
      description:
        'A large sheet title block: series name, sheet number at 15vw, title, scale, edition — beside a small index diagram of adjacent sheets.',
    },
    {
      id: 'legend-panel',
      name: 'Legend panel',
      description: 'A framed legend panel with 6–10 symbol entries that double as the page navigation.',
    },
  ],
  surfaces: [
    {
      id: 'map-paper',
      name: 'Map paper with grid',
      description: 'Flat, slightly warm map paper with the grid printed across it.',
      css: 'background-color: var(--paper); background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 96px 96px; background-position: -1px -1px;',
    },
    {
      id: 'hillshade',
      name: 'Hillshade',
      description: 'Imhof-style relief shading lit from the north-west, inside the map field only.',
      css: 'background-image: linear-gradient(135deg, rgba(255,255,255,.35), transparent 40%, rgba(60,50,30,.08) 75%);',
    },
    {
      id: 'woodland-stipple',
      name: 'Woodland stipple',
      description: 'Vegetation areas as a regular stipple of small dots on the panel tint.',
      css: 'background-color: var(--panel); background-image: radial-gradient(color-mix(in srgb, var(--ink) 25%, transparent) 1px, transparent 1.4px); background-size: 10px 8px;',
    },
  ],
  must: [
    'A neat-line frame with coordinate ticks and labels on at least two sides.',
    'A legend explains every symbol and colour used; a scale bar appears on the page.',
    'Water-related or secondary names are italic; colours are assigned by layer, never decoratively.',
  ],
  mustNot: [
    'No satellite imagery, web-map pins or rounded map controls.',
    'No random squiggles: contours are concentric, non-crossing and evenly stepped.',
    'No more than four layer colours plus ink.',
  ],
};

const terminalPhosphor: Branch = {
  id: 'terminal-phosphor',
  name: { zh: '终端荧光', en: 'Terminal phosphor' },
  family: 'screen',
  concept: {
    zh: '大型机与哑终端的屏幕：黑底上发光的绿色或琥珀色等宽字，制表符画出的方框和表格，提示符后面一个闪烁的光标。结构来自 man page：NAME、SYNOPSIS、DESCRIPTION，一切都装进 80 列。',
    en: 'The screen of a mainframe or dumb terminal: green or amber phosphor monospace on black, box-drawing characters for panels and tables, a blinking cursor after the prompt. Structure comes from the man page — NAME, SYNOPSIS, DESCRIPTION — and everything fits in 80 columns.',
  },
  references: [
    'DEC VT100 / VT220 terminals (1978–83)',
    'IBM 3270 display stations and ISPF panels',
    'Unix Programmer’s Manual and the man(1) page format, Bell Labs (1971–79)',
    'Lear Siegler ADM-3A and Zenith Z-19 green/amber phosphor screens',
    'IBM 1403 line printer and green-bar continuous paper',
  ],
  keywords: ['荧光绿', '琥珀色', '等宽', '方框线', '提示符', '光标'],
  tokens: {
    grid: 'Character grid: everything in ch and line units — 80ch max width (132ch for wide tables), line-height 1.25; columns are integer ch widths (e.g. 24ch | 56ch); spacing in whole lines, never px gaps that break the cell grid.',
    radius:
      '0 for all UI. The only curve is the optional CRT bezel around the whole screen (border-radius 18px on the outer frame).',
    border:
      'Boxes drawn with box-drawing characters (┌─┐│└┘, double ╔═╗ for the primary panel) as text, or at most 1px solid var(--accent); nothing thicker.',
    shadow:
      'none on elements. Phosphor bloom only as text-shadow: 0 0 2px currentColor (≤ 3px blur); nothing else glows.',
  },
  layouts: [
    {
      id: 'man-page',
      name: 'Man page',
      description:
        'The page reads as a man page: header line, NAME, SYNOPSIS, DESCRIPTION, OPTIONS, SEE ALSO, with 7ch indentation.',
      grid: 'One 80ch column at 2ch from the left; section heads at col 0, body indented 7ch, option flags hanging-indented 7ch / 14ch.',
      structure: [
        'Header line: TITLE(1) at both ends with the manual name centred',
        'NAME: the title — one-line summary',
        'SYNOPSIS: the core offer written as a command with [options]',
        'DESCRIPTION: paragraphs indented 7ch',
        'OPTIONS / FILES / SEE ALSO built from the facts; footer line with date and version',
      ],
    },
    {
      id: 'split-session',
      name: 'Split session',
      description:
        'A multiplexed terminal: a large session pane with prompt and output, side panes for a status table and a log, and a reverse-video status bar.',
      grid: 'Panes divided by box-drawing lines: left 56ch, right 24ch; right split 60/40 vertically; 1-line reversed status bar at the bottom.',
      structure: [
        'Main pane: prompt "$ " + a command that lists the content, output below',
        'Right-top pane: key facts as a top(1)-style table in fixed ch columns',
        'Right-bottom pane: timestamped log lines (dates from the facts)',
        'Status bar: reverse video with session name, clock, pane numbers',
        'Below: further command/output blocks, one per section',
      ],
    },
    {
      id: 'mainframe-form',
      name: '3270 form panel',
      description:
        'An IBM 3270 / ISPF panel: protected labels, underlined input fields, a numbered option menu and a PF-key legend at the bottom.',
      grid: '80 × 24 cell layout; labels in col 2–20, fields from col 22; title on row 1; PF-key legend on rows 23–24.',
      structure: [
        'Row 1: panel ID left, title centred, date right',
        'COMMAND ===> line with an underlined input field',
        'Numbered option menu (0–9), one line each — each option is a section',
        'Field block: labels with dot leaders to values ("Phone . . . . :")',
        'PF-key legend: "F1=Help  F3=Exit  F7=Up  F8=Down"',
      ],
    },
  ],
  type: [
    {
      id: 'vt323-plex',
      name: 'VT323 + IBM Plex Mono',
      display: { family: 'VT323', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      body: {
        family: 'IBM Plex Mono',
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'VT323 for headings and the prompt line at multiples of 16px (bitmap face: 32/48/64px). Body Plex Mono 15–16px, line-height 1.25. Section names UPPERCASE without letter-spacing; emphasis is 500 or reverse video, never italic.',
    },
    {
      id: 'plex-3270',
      name: 'IBM Plex Mono + Fira Code',
      display: {
        family: 'IBM Plex Mono',
        weights: [600, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Fira Code',
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Mainframe panel voice: titles in Plex Mono 700 uppercase at 1–2× body only (no big type on a 3270). Body Fira Code 15px with font-variant-ligatures: none. Field labels followed by ". . . :" leaders; protected text in muted, input in ink.',
    },
    {
      id: 'azeret-teletype',
      name: 'Azeret Mono',
      display: {
        family: 'Azeret Mono',
        weights: [700, 800],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Azeret Mono',
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      cjk: { display: 'Noto Sans TC', body: 'Noto Sans TC' },
      notes:
        'Line-printer/teletype voice: one family; headings Azeret 800 uppercase at 2× body with +0.04em, body 400 at 15px/1.25. ASCII banners built from █ ▀ ▄ characters in the display weight. Tabular figures throughout.',
    },
  ],
  palettes: [
    {
      id: 'p1-green',
      name: 'P1 green phosphor',
      colors: {
        paper: '#0a0f0a',
        ink: '#66f28a',
        muted: '#3aa95a',
        accent: '#c8ffd4',
        accent2: '#1f6b34',
        rule: '#1f6b34',
        panel: '#0f1a11',
      },
      usage:
        'Monochrome phosphor: ink for all text; high-intensity accent for headings, prompts and reverse-video bars (accent background, paper text); muted for comments and timestamps; panel for inactive panes. No second hue.',
    },
    {
      id: 'p3-amber',
      name: 'P3 amber phosphor',
      colors: {
        paper: '#120b02',
        ink: '#ffb84a',
        muted: '#c4842a',
        accent: '#ffe2a8',
        accent2: '#ff7a1a',
        rule: '#5a3a0c',
        panel: '#1e1305',
      },
      usage:
        'Warm amber monochrome: ink for text, pale accent for headings and the cursor, orange accent2 only for errors; rule-brown box lines; panel for inactive panes.',
    },
    {
      id: 'greenbar-printout',
      name: 'Green-bar printout',
      colors: {
        paper: '#f6f8f1',
        ink: '#1b1d1a',
        muted: '#4f564c',
        accent: '#1f6e3a',
        accent2: '#b5291f',
        rule: '#9fbf9a',
        panel: '#dcebd8',
      },
      usage:
        'Hardcopy terminal: green-bar paper with alternating 3-line panel stripes behind the text (~50%); ink for all text; accent green for headings and box lines; red ribbon accent2 only for errors and warnings; tractor holes in rule.',
    },
  ],
  densities: ['compact', 'packed'],
  scales: ['major-second', 'minor-third'],
  motion: [
    {
      id: 'type-on',
      name: 'Type-on',
      description:
        'The first command block is typed after the prompt one character per tick with the cursor leading; output then prints line by line. Nothing else types.',
      duration: '16ms',
      easing: 'steps(1, end)',
      reduced: 'Print the complete text instantly; cursor static.',
    },
    {
      id: 'cursor-blink',
      name: 'Cursor blink',
      description:
        'A block cursor (█, 1ch × 1.25em) after the last prompt blinks 530ms on / 530ms off — the only moving thing on the screen.',
      duration: '1060ms',
      easing: 'steps(2, jump-none)',
      reduced: 'Solid cursor, no blink.',
    },
    {
      id: 'screen-redraw',
      name: 'Screen redraw',
      description:
        'Changing section redraws the screen top to bottom, line by line, like a 9600-baud refresh (24 lines in 240ms).',
      duration: '240ms',
      easing: 'steps(24, end)',
      reduced: 'Instant redraw.',
    },
  ],
  motifs: [
    {
      id: 'box-drawing',
      name: 'Box drawing',
      description:
        'Panels and tables drawn with box-drawing characters (┌─┬─┐ │ ├─┼─┤ └─┴─┘; double ╔═╗ for the primary panel) as text aligned on the ch grid.',
    },
    {
      id: 'prompt-lines',
      name: 'Prompt lines',
      description:
        'Sections start as a shell prompt: "$ " in muted followed by a command in ink; output follows unindented.',
    },
    {
      id: 'reverse-video',
      name: 'Reverse video',
      description:
        'Headings, the selected menu item and the status bar in reverse video (accent background, paper text) spanning whole ch widths.',
    },
  ],
  anchors: [
    {
      id: 'boot-screen',
      name: 'Boot screen',
      description:
        'The first screen is a boot/login sequence of 6–10 lines built from the facts (dates, places, versions), ending at a prompt with a blinking cursor.',
    },
    {
      id: 'man-header',
      name: 'Man header',
      description:
        'The man-page head: three-part header line, NAME with the title as a command and its one-line description, then SYNOPSIS.',
    },
    {
      id: 'ascii-banner',
      name: 'ASCII banner',
      description: 'The title as a large block-character banner (█ ▀ ▄) inside a double-line ╔═╗ frame.',
    },
  ],
  surfaces: [
    {
      id: 'crt-scanlines',
      name: 'CRT scanlines',
      description:
        'Phosphor screen with horizontal scanlines across everything (a pointer-events: none overlay).',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,.22) 0 1px, transparent 1px 3px);',
    },
    {
      id: 'crt-bezel',
      name: 'CRT bezel',
      description:
        'The whole page inside a dark plastic bezel; the screen gets a slight vignette toward the corners.',
      css: 'border: 24px solid #2a2824; border-radius: 18px; background: radial-gradient(ellipse at center, var(--paper) 60%, color-mix(in srgb, var(--paper) 85%, black));',
    },
    {
      id: 'greenbar-paper',
      name: 'Green-bar paper',
      description:
        'Continuous line-printer paper: 3 lines of panel tint, 3 lines of paper, tractor holes in the margins.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, var(--panel) 0 3.75em, transparent 3.75em 7.5em);',
    },
  ],
  must: [
    'All text is monospace on a ch grid; line length ≤ 80ch (132ch for tables).',
    'At least one structure borrowed from terminals: prompt + output, man-page sections, or a PF-key form panel.',
    'Emphasis by reverse video, brightness (accent) or underline — never size jumps larger than 2×, except one ASCII banner.',
  ],
  mustNot: [
    'No neon blur, chromatic aberration or "matrix rain".',
    'No proportional fonts anywhere, including nav and buttons.',
    'No invented system output or hacker jargon — every line carries a fact.',
    'No rounded buttons; controls are [ bracketed ] or underlined fields.',
  ],
};

const web1Homepage: Branch = {
  id: 'web1-homepage',
  name: { zh: '早期个人主页', en: 'Web 1.0 homepage' },
  family: 'screen',
  concept: {
    zh: '1996–2001 年的个人主页：Times New Roman 默认字体、表格排版、平铺背景、蓝色带下划线的链接、<hr> 分隔线，页脚有访客计数器和留言本。黄黑条纹的“施工中”是诚实的——这一页是一个人亲手搭的。怀旧，但必须好读。',
    en: 'The 1996–2001 personal homepage: Times New Roman by default, tables for layout, tiled backgrounds, blue underlined links, <hr> rules, a hit counter and a guestbook in the footer. The yellow-and-black "under construction" stripe is honest — one person built this by hand. Affectionate, but legible.',
  },
  references: [
    'GeoCities neighbourhoods (1995–2009)',
    'Olia Lialina & Dragan Espenschied — One Terabyte of Kilobyte Age (2010–)',
    'Netscape Navigator 3/4 default rendering: grey #c0c0c0 page, #0000ee links',
    'Microsoft Core Fonts for the Web (1996): Verdana, Georgia, Trebuchet MS',
    'Space Jam official website (1996)',
  ],
  keywords: ['表格排版', '平铺背景', '蓝色下划线链接', '访客计数器', '留言本', '施工中'],
  tokens: {
    grid: 'HTML-table grid for an 800×600 screen: one 760px table (cellpadding 8, cellspacing 2) with a 160px nav cell and a 600px content cell, or a single 600px column; below 760px it collapses to one column.',
    radius: '0. Controls are rectangular; buttons use a 2px outset bevel.',
    border:
      'Table borders 1px solid var(--rule) or the "border=1" look (border: 2px ridge var(--rule)); <hr> as 2px groove, full width or 50%.',
    shadow:
      'none, except the 2px outset/inset bevel on buttons and 88×31 badges (border-style: outset / inset).',
  },
  layouts: [
    {
      id: 'nav-table',
      name: 'Left-nav table',
      description:
        'The classic two-cell table: a coloured nav column of text links at left, content at right.',
      grid: 'Table 760px; nav cell 160px with panel background; content cell 600px; cellpadding 10; banner row spans both cells.',
      structure: [
        'Banner row across both cells: title in bold serif + "Last updated:" date from the facts',
        'Nav cell: bulleted text links (sections + links from the facts) and a stack of 88×31 badges',
        'Content cell: welcome paragraph, <hr>, then sections each with an <h2> and paragraphs',
        'Links section: a plain <ul> of blue underlined links with one-line descriptions',
        'Footer: counter (real number or "since" date), guestbook link, mailto contact',
      ],
    },
    {
      id: 'hr-column',
      name: 'Single column with <hr>s',
      description:
        'One 600px column, left-aligned like an unstyled page: a table of contents of anchor links, then sections separated by <hr>s.',
      grid: 'Single 600px column, 8px browser-default body margin; <hr> 2px groove full column width between sections.',
      structure: [
        'H1 title flush-left with a one-line "Welcome to…" style sentence from the facts',
        'Under-construction stripe, only above genuinely unfinished sections',
        'Contents: an ordered list of #anchor links',
        'Sections separated by <hr>, each ending with "[Back to top]"',
        'Footer table: related links in webring form ([Prev] [List] [Next]) if the facts give links, then counter and email',
      ],
    },
    {
      id: 'faux-frameset',
      name: 'Frameset',
      description:
        'A faux <frameset>: a top banner frame, a left nav frame and a main frame that scrolls on its own, divided by bevelled frame borders.',
      grid: 'CSS grid mimicking rows="80,*" cols="180,*": top 80px, left 180px, main scrolls independently; 6px bevelled frame borders.',
      structure: [
        'Top frame: banner with the title and one static tagline',
        'Left frame: nav links + "Frames | No frames" toggle',
        'Main frame: content with <h2> sections and <blockquote> notes',
        'Main-frame footer: last-updated date, counter, guestbook link',
      ],
    },
  ],
  type: [
    {
      id: 'times-default',
      name: 'Times New Roman + Courier New',
      display: {
        family: 'Times New Roman',
        weights: [400, 700],
        italic: true,
        fallback: 'Times, "Liberation Serif", serif',
        source: 'system',
      },
      body: {
        family: 'Times New Roman',
        weights: [400, 700],
        italic: true,
        fallback: 'Times, "Liberation Serif", serif',
        source: 'system',
      },
      mono: {
        family: 'Courier New',
        weights: [400, 700],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: 'system',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Serif SC' },
      notes:
        'Unstyled-browser voice, kept legible: body 18px/1.45 (not the 1996 12pt), h1 36px bold, h2 26px bold, no letter-spacing. Links underlined in accent, visited in muted. Counters, code and email in Courier New.',
    },
    {
      id: 'georgia-verdana',
      name: 'Georgia + Verdana',
      display: {
        family: 'Georgia',
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: 'system',
      },
      body: {
        family: 'Verdana',
        weights: [400, 700],
        fallback: 'Tahoma, "DejaVu Sans", sans-serif',
        source: 'system',
      },
      mono: {
        family: 'Courier New',
        weights: [400],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: 'system',
      },
      cjk: { display: 'Noto Serif SC', body: 'Noto Sans SC' },
      notes:
        'The "designed" late-90s page: Verdana 15px/1.6 (wide x-height, so smaller than serif); Georgia 700 headings 26–34px with its old-style figures; "Last updated" in Verdana 11px uppercase +0.05em.',
    },
    {
      id: 'impact-arial',
      name: 'Impact + Arial',
      display: {
        family: 'Impact',
        weights: [400],
        fallback: '"Arial Black", "Arial Narrow", sans-serif',
        source: 'system',
      },
      body: {
        family: 'Arial',
        weights: [400, 700],
        fallback: 'Helvetica, "Liberation Sans", sans-serif',
        source: 'system',
      },
      mono: {
        family: 'Courier New',
        weights: [400],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: 'system',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Fan-page voice: Impact only for the banner title and section banners, 36–64px, tracking 0.02em; Arial 16px/1.55 for text; "NEW!" markers in Arial 700 11px uppercase in accent2 beside updated items. Max two text colours per paragraph.',
    },
  ],
  palettes: [
    {
      id: 'netscape-grey',
      name: 'Netscape grey',
      colors: {
        paper: '#c0c0c0',
        ink: '#000000',
        muted: '#3c3c3c',
        accent: '#0000ee',
        accent2: '#cc0000',
        rule: '#808080',
        panel: '#ffffff',
      },
      usage:
        'Browser-default grey page; reading text in white table cells (panel, ~60%); links #0000ee underlined, visited links muted; red only for NEW! markers; grooves in rule grey.',
    },
    {
      id: 'starfield-black',
      name: 'Black-background fan page',
      colors: {
        paper: '#000000',
        ink: '#ffffcc',
        muted: '#c9c9a3',
        accent: '#66ccff',
        accent2: '#ff9933',
        rule: '#808080',
        panel: '#1a1a1a',
      },
      usage:
        'Black page with pale-yellow text; light-blue underlined links; orange for NEW! and the counter digits; grey grooves; dark panel cells for the nav.',
    },
    {
      id: 'parchment-tile',
      name: 'Parchment tile',
      colors: {
        paper: '#f3ead2',
        ink: '#2b1d0e',
        muted: '#5e4a30',
        accent: '#0033cc',
        accent2: '#990000',
        rule: '#a08a5c',
        panel: '#fffdf3',
      },
      usage:
        'Tiled parchment background; content in near-white panel cells; deep-blue underlined links; maroon for headings and <hr> accents; brown-gold rules.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fourth', 'major-third'],
  motion: [
    {
      id: 'blink-new',
      name: 'Blink NEW!',
      description:
        'A "NEW!" marker blinks (visibility toggle) three times on load, then stays — homage to <blink> without a loop.',
      duration: '500ms',
      easing: 'steps(1, end)',
      reduced: 'Static NEW! marker.',
    },
    {
      id: 'bevel-press',
      name: 'Bevel press',
      description:
        'Buttons and 88×31 badges press in on :active — border-style outset → inset and the label shifts 1px right and down.',
      duration: '0ms',
      easing: 'steps(1, end)',
      reduced: 'Same; it is a 1px state change.',
    },
    {
      id: 'news-ticker',
      name: 'News ticker',
      description:
        'One optional scrolling line (CSS, not <marquee>) carrying the latest update from the facts, at about 40px/s, pausing on hover.',
      duration: '12000ms',
      easing: 'linear',
      reduced: 'Ticker is static text on one line.',
    },
  ],
  motifs: [
    {
      id: 'under-construction',
      name: 'Under construction',
      description:
        'A yellow/black 45° hazard stripe bar (repeating-linear-gradient, 12px stripes) with "UNDER CONSTRUCTION / 施工中" in bold — only on genuinely unfinished sections.',
    },
    {
      id: 'hit-counter',
      name: 'Hit counter',
      description:
        'Odometer counter: digits in individual black boxes with Courier New digits — a real number from the facts, or "since <date>".',
    },
    {
      id: 'badges-88x31',
      name: '88×31 badges',
      description:
        '88×31px buttons drawn in CSS (2px outset border, two lines of 9px text, two-tone fill) for email, guestbook and links — never images of real brands.',
    },
  ],
  anchors: [
    {
      id: 'welcome-banner',
      name: 'Welcome banner',
      description:
        'A banner cell with the title in big bold serif, a "Welcome to…" line, the last-updated date and a NEW! marker by the latest item.',
    },
    {
      id: 'nav-as-hero',
      name: 'Nav as hero',
      description:
        'Nav table and content cell visible at once, with 6–10 blue underlined links — the link list itself is the first impression.',
    },
    {
      id: 'guestbook-counter',
      name: 'Guestbook and counter',
      description:
        'A bordered table at the top with the visitor counter (real number or since-date), a "Sign my guestbook" link and a mailto link.',
    },
  ],
  surfaces: [
    {
      id: 'tiled-background',
      name: 'Tiled background',
      description:
        'A small tiled background drawn in CSS (two close tints in a checker); content always sits in solid table cells above it.',
      css: 'background-color: var(--paper); background-image: linear-gradient(45deg, rgba(0,0,0,.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.05) 75%), linear-gradient(45deg, rgba(0,0,0,.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.05) 75%); background-size: 40px 40px; background-position: 0 0, 20px 20px;',
    },
    {
      id: 'bevel-chrome',
      name: 'Bevel chrome',
      description:
        'Windows 95 / Netscape chrome: grey panels with a 2px light-top-left, dark-bottom-right bevel.',
      css: 'background: var(--panel); border: 2px solid; border-color: #ffffff #808080 #808080 #ffffff;',
    },
    {
      id: 'flat-default',
      name: 'Flat default',
      description: 'Unstyled browser default: flat paper colour, 8px body margin, nothing else.',
      css: 'margin: 8px; background: var(--paper);',
    },
  ],
  must: [
    'Links are underlined and coloured; visited links visibly different.',
    'Layout reads as table cells (visible borders or cell backgrounds), max 760px wide.',
    'Footer has a last-updated date and a mailto contact from the facts; a counter only with a real number or a since-date.',
    'Body text ≥ 15px with ≥ 7:1 contrast — nostalgia never costs legibility.',
  ],
  mustNot: [
    'No animated-GIF clutter, auto-playing audio, or more than one moving element per screen.',
    'No modern patterns: cards with shadows, hamburger menus, sticky blurred headers.',
    'No Comic Sans, rainbow text or ironic parody.',
  ],
};

const gameManual: Branch = {
  id: 'game-manual',
  name: { zh: '游戏说明书', en: 'Game manual' },
  family: 'screen',
  concept: {
    zh: '8 位与 16 位游戏的说明书和像素界面：双线边框的对话框、HP/MP 条、手柄按键示意图、道具清单，以及有限的调色板——Game Boy 的四阶绿、FC 的 54 色。限制让每一个像素都有意义。',
    en: "Manuals and pixel UIs of 8- and 16-bit games: double-bordered dialogue boxes, HP/MP bars, controller diagrams, item lists and limited palettes — the Game Boy's four greens, the NES's 54 colours. Constraint makes every pixel mean something.",
  },
  references: [
    'Nintendo Entertainment System instruction booklets (1985–94)',
    'Dragon Quest / Dragon Warrior (Enix, 1986) command windows',
    'Nintendo Game Boy DMG-01 (1989) screen and manuals',
    'Final Fantasy VI (Square, 1994) menu screens',
    'Nintendo Power magazine maps and strategy pages (1988–)',
  ],
  keywords: ['像素字', '双线边框', 'HP/MP 条', '手柄示意图', '道具清单', '限制调色板'],
  tokens: {
    grid: 'Tile grid: 8px tiles scaled ×3 (24px) on desktop, ×2 (16px) on mobile; every size, gap and border is a multiple of the scaled pixel; a screen is 32 × 28 tiles (NES 256 × 224).',
    radius: '0 — window corners are notched by one scaled pixel with clip-path polygon, never CSS-rounded.',
    border:
      'Windows: double border — 3px line, 3px gap, 3px line (border: 9px double var(--ink); on dark windows border-color: var(--paper)); image-rendering: pixelated on every bitmap.',
    shadow: 'Hard one-tile drop (8px 8px 0 var(--rule)) on screenshot boxes only; no blur anywhere.',
  },
  layouts: [
    {
      id: 'manual-booklet',
      name: 'Instruction booklet',
      description:
        'Portrait booklet pages side by side: contents, a controls page with a controller diagram, an items page and boxed fine print.',
      grid: 'Booklet pages at 5:7, max 640px each, two side by side on desktop; 6 col, 16px gutter; page numbers in boxes at the outer bottom corners.',
      structure: [
        'Cover page: title in the pixel face, a drawn pixel emblem panel (no photos)',
        'Contents page: numbered sections with dot leaders to page numbers',
        'Controls page: controller diagram with callout lines, each button = one fact',
        'Items page: list with drawn 16×16 icons and one-line descriptions',
        'Back page: boxed fine print — address, contact',
      ],
    },
    {
      id: 'command-window',
      name: 'RPG command window',
      description:
        'The page is a game screen: status window top-left, command menu with a ▶ cursor, dialogue box along the bottom.',
      grid: '32-tile screen; status window 10 tiles wide, command window 8 tiles, dialogue box full width × 6 tiles; windows may overlap by one tile.',
      structure: [
        'Status window: name and key numbers as bars (real values only)',
        'Command menu (TALK / ITEM / MAP style) mapped to page sections, ▶ on the current one',
        'Dialogue box: text typed out, ▼ to continue',
        'Item window: list with quantities right-aligned ("×3")',
        'Closing screen: CONTINUE / SAVE options holding contact information',
      ],
    },
    {
      id: 'strategy-guide',
      name: 'Strategy-guide spread',
      description:
        'A Nintendo Power-style spread: a world map drawn as tiles with numbered callouts and a sidebar of matching tip boxes.',
      grid: '12-col spread; map panel 8 col × 6 rows of 48px tiles; sidebar 4 col with numbered tip boxes; callouts as 32px squares.',
      structure: [
        'Title band with a stage number ("WORLD 1-1" pattern used for section numbering)',
        'Tile map with numbered callouts over it',
        'Numbered tip boxes matching the callouts',
        'Stats table for the facts that have real numbers',
        'A "secret" note at the bottom in a dashed box',
      ],
    },
  ],
  type: [
    {
      id: 'press-start-chakra',
      name: 'Press Start 2P + Chakra Petch',
      display: {
        family: 'Press Start 2P',
        weights: [400],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: { family: 'Chakra Petch', weights: [400, 600], fallback: 'Arial, sans-serif', source: 'google' },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Press Start 2P only at multiples of 8px (16/24/32/48), uppercase, line-height 1.5, never for paragraphs; -webkit-font-smoothing: none. Chakra Petch for booklet text 16–17px/1.5, 600 for button names (A, B, START, SELECT).',
    },
    {
      id: 'silkscreen-dotgothic',
      name: 'Silkscreen + DotGothic16',
      display: {
        family: 'Silkscreen',
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: { family: 'DotGothic16', weights: [400], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'ZCOOL KuaiLe', body: 'Noto Sans SC' },
      notes:
        'Handheld-screen voice: Silkscreen uppercase at 16/24/32px for labels and menus; DotGothic16 at its native 16px (or 32px) for dialogue, line-height 1.5, ≤ 28 characters per line inside dialogue boxes. All text in palette colours only.',
    },
    {
      id: 'pixelify-bitter',
      name: 'Pixelify Sans + Bitter',
      display: {
        family: 'Pixelify Sans',
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Bitter',
        weights: [400, 600],
        italic: true,
        fallback: 'Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Serif SC' },
      notes:
        '16-bit RPG manual voice: Pixelify Sans for window titles, menus and numbers at multiples of 8px; Bitter 17px/1.6 for story and lore paragraphs, italic for quoted dialogue. Menu numbers right-aligned tabular ("×12").',
    },
  ],
  palettes: [
    {
      id: 'dmg-greens',
      name: 'Handheld four greens',
      colors: {
        paper: '#c5d58a',
        ink: '#0f2e12',
        muted: '#2f5a2a',
        accent: '#306230',
        accent2: '#8bac0f',
        rule: '#0f2e12',
        panel: '#9bbc0f',
      },
      usage:
        'Four-shade LCD: pale green ground, darkest green for text and window borders, mid greens for window fills (panel) and bars (accent2); no colour outside these greens.',
    },
    {
      id: 'nes-booklet',
      name: 'NES booklet',
      colors: {
        paper: '#fcfcfc',
        ink: '#0f0f0f',
        muted: '#4c4c4c',
        accent: '#d82800',
        accent2: '#0058f8',
        rule: '#0f0f0f',
        panel: '#bcbcbc',
      },
      usage:
        'White booklet pages, black text; red title bars and A/B button labels; NES blue for the ▶ cursor and selected items; console-grey panels for controller diagrams; dialogue windows filled ink with paper text.',
    },
    {
      id: 'title-screen-black',
      name: 'Title-screen black',
      colors: {
        paper: '#111010',
        ink: '#fcfcfc',
        muted: '#a4a4a4',
        accent: '#fca044',
        accent2: '#3cbcfc',
        rule: '#7c7c7c',
        panel: '#000000',
      },
      usage:
        'Black title screen; white text; orange for the title and selected menu item; sky blue for bars and the ▼ prompt; windows pure black with a white double border.',
    },
  ],
  densities: ['compact', 'regular'],
  scales: ['perfect-fifth', 'perfect-fourth'],
  motion: [
    {
      id: 'dialogue-type',
      name: 'Dialogue typing',
      description:
        'Dialogue text prints character by character at ~30 chars/s; ▼ blinks when the box is full; click or Enter completes the box.',
      duration: '33ms',
      easing: 'steps(1, end)',
      reduced: 'Full text appears at once; ▼ static.',
    },
    {
      id: 'menu-cursor',
      name: 'Menu cursor',
      description:
        'The ▶ cursor jumps between menu items in whole-tile steps with no tweening, and the selected row flashes for two frames.',
      duration: '33ms',
      easing: 'steps(1, end)',
      reduced: 'Cursor jumps without the flash.',
    },
    {
      id: 'bar-fill',
      name: 'Bar fill',
      description: 'Stat bars showing real values fill tile by tile on load, one step per 8px segment.',
      duration: '600ms',
      easing: 'steps(12, end)',
      reduced: 'Bars drawn at their final value.',
    },
  ],
  motifs: [
    {
      id: 'double-border-window',
      name: 'Double-border window',
      description:
        'Dialogue and command windows: solid fill, double border (3px line, 3px gap, 3px line), notched corners, ▶ cursor and ▼ prompt drawn as pixel triangles.',
    },
    {
      id: 'stat-bars',
      name: 'Stat bars',
      description:
        'Segmented bars: label left (HP-style), an 8px-high bar of 8px segments, value right ("42/60") — only for real numbers in the facts.',
    },
    {
      id: 'controller-diagram',
      name: 'Controller diagram',
      description:
        'A line drawing of a D-pad, A/B and SELECT/START with leader lines to labels, used to map 4–6 key facts.',
    },
  ],
  anchors: [
    {
      id: 'title-screen',
      name: 'Title screen',
      description:
        'A title screen: pixel title at 48–64px, a drawn pixel emblem, "PRESS START" and a ▶ menu (START / CONTINUE / OPTIONS) that maps to sections.',
    },
    {
      id: 'dialogue-open',
      name: 'Dialogue opening',
      description:
        'A full-width dialogue box in the lower third with a name tag, typing the first fact, under a small pixel scene drawn in CSS/SVG.',
    },
    {
      id: 'booklet-cover',
      name: 'Booklet cover',
      description:
        'A booklet cover: title, a drawn badge strip (no real logos), "INSTRUCTION BOOKLET" label, and the numbered contents list beside it.',
    },
  ],
  surfaces: [
    {
      id: 'lcd-pixel-grid',
      name: 'LCD pixel grid',
      description: 'Handheld LCD: a faint pixel grid over the screen area.',
      css: 'background-color: var(--paper); background-image: linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px); background-size: 3px 3px;',
    },
    {
      id: 'booklet-matte',
      name: 'Booklet matte',
      description: 'Matte booklet paper, flat white, with two staple marks drawn at the spine.',
      css: 'background: var(--paper);',
    },
    {
      id: 'ordered-dither',
      name: 'Ordered dither',
      description: 'A 2×2 checker dither between two palette colours — the only permitted "gradient".',
      css: 'background-image: conic-gradient(var(--accent) 25%, var(--panel) 0 50%, var(--accent) 0 75%, var(--panel) 0); background-size: 4px 4px; image-rendering: pixelated;',
    },
  ],
  must: [
    'All sizes, gaps and borders are multiples of the scaled pixel/tile.',
    'No more than four colours in any one screen area.',
    'At least one double-border window with a ▶ cursor or ▼ prompt.',
    'Pixel fonts only at native multiples; long text uses the body face.',
  ],
  mustNot: [
    'No anti-aliased or fractionally scaled pixel art; image-rendering: pixelated.',
    'No real console logos, trademarked characters or sprites from actual games.',
    'No gradients except a two-colour ordered dither.',
    'Stat bars never show invented numbers.',
  ],
};

const instrumentPanel: Branch = {
  id: 'instrument-panel',
  name: { zh: '工业仪表', en: 'Instrument panel' },
  family: 'screen',
  concept: {
    zh: 'Dieter Rams 时代的博朗电器与 Teenage Engineering 的合成器：米白外壳，旋钮与开关排成严格的行列，每个控件下面一行小字标签，一个橙色或绿色的状态灯。界面就是面板——功能决定位置，标签说明一切。',
    en: 'Braun appliances of the Dieter Rams era and Teenage Engineering synthesizers: off-white housings, knobs and switches in strict rows, a small label under every control, one orange or green status light. The interface is the panel — function decides position, the label explains everything.',
  },
  references: [
    'Dieter Rams & Dietrich Lubs — Braun ET 66 calculator (1987)',
    'Braun T3 pocket radio (1958) and SK 4 radio-phonograph (1956)',
    'Teenage Engineering OP-1 (2011) and Pocket Operators',
    'Hewlett-Packard test-equipment front panels (1960s–70s)',
    'Braun Atelier and regie hi-fi components (1970s–80s)',
  ],
  keywords: ['旋钮', '状态灯', '数码管', '米白外壳', '控件标签', '开关矩阵'],
  tokens: {
    grid: 'Panel grid: 8px base; controls on a 48px pitch (knob centres 48 or 96px apart); housings with 24px inner margin; labels 8px below each control and centred on it; a row of controls shares one baseline.',
    radius:
      'Housing panels 10px (moulded plastic); keys 4px; knobs and LEDs 50%; recessed display windows 2px. Nothing else rounded.',
    border:
      '1px solid var(--rule) panel seams; display windows 2px inset border in var(--rule); keys outlined 1px var(--ink) when unfilled.',
    shadow:
      'Short and physical only: knobs 0 1px 0 rgba(0,0,0,.25), 0 2px 3px rgba(0,0,0,.12); display windows inset 0 1px 2px rgba(0,0,0,.35). Never large soft card shadows.',
  },
  layouts: [
    {
      id: 'front-panel',
      name: 'Front panel',
      description:
        'The page is one wide device front: display window top-left, a knob row, a switch matrix, sections separated by seams and engraved labels.',
      grid: '12 col inside a 24px housing margin; display window 5 col × 2 rows; control rows on a 96px pitch; sections split by 1px seams with 9–10px engraved labels.',
      structure: [
        'Display window: the title as the readout, small mode labels around it',
        'Knob row: 4–6 knobs each labelled with a section; the current one points to it',
        'Switch matrix: 2×4 or 4×4 square keys with labels, used as navigation',
        'Spec plate: model-plate block with technical facts in small type',
        'Bottom seam strip: power LED, and contact/address set as port labels',
      ],
    },
    {
      id: 'operating-manual',
      name: 'Operating manual',
      description:
        'A Braun manual page: a line drawing of the device face with numbered callouts, then numbered paragraphs explaining each control.',
      grid: 'Two columns: drawing 7 col (sticky on desktop), numbered list 5 col; callout numbers in 20px circles; text on a 4px baseline.',
      structure: [
        'Manual header: model name and "Gebrauchsanweisung / Operating instructions / 使用说明"',
        'Line drawing of the panel with numbered callouts ① – ⑧',
        'Numbered paragraphs, one per callout, each carrying a fact',
        'Technical data: label/value rows with units',
        'Service and contact block in small type',
      ],
    },
    {
      id: 'module-rack',
      name: 'Module rack',
      description:
        'A modular rack: modules of different widths side by side, each a section with its own controls, between screw rails.',
      grid: 'Rack rows 380px tall; module widths 80/120/160/240px; 12px rails top and bottom with screw holes every 40px.',
      structure: [
        'Top rail with screw holes and a model plate carrying the title',
        'Row 1: modules of varied widths, one per section, each with a header label and 2–5 controls',
        'Patch cables (SVG curves) only between modules whose facts relate',
        'Row 2: readout module (numbers, times) and I/O module (contact links as jacks)',
        'Bottom rail with imprint text',
      ],
    },
  ],
  type: [
    {
      id: 'red-hat-braun',
      name: 'Red Hat Display + Red Hat Text',
      display: {
        family: 'Red Hat Display',
        weights: [500, 700],
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      body: {
        family: 'Red Hat Text',
        weights: [400, 500],
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Braun labelling: control labels lowercase or sentence case, never all caps, Red Hat Text 500 at 11–12px, +0.02em. Model names Red Hat Display 700, -0.02em. All numbers lining tabular.',
    },
    {
      id: 'martian-te',
      name: 'Martian Mono + Schibsted Grotesk',
      display: {
        family: 'Martian Mono',
        weights: [300, 400, 600],
        fallback: '"Courier New", monospace',
        source: 'google',
      },
      body: {
        family: 'Schibsted Grotesk',
        weights: [400, 500],
        fallback: 'Helvetica, Arial, sans-serif',
        source: 'google',
      },
      cjk: { display: 'Noto Sans SC', body: 'Noto Sans SC' },
      notes:
        'Synth-panel voice: control labels Martian Mono uppercase 10–12px +0.06em, values in 600; readout numbers Martian Mono 300 at 64–96px. Body Schibsted Grotesk 15px/1.5.',
    },
    {
      id: 'rajdhani-control',
      name: 'Rajdhani + IBM Plex Sans Condensed + Azeret Mono',
      display: {
        family: 'Rajdhani',
        weights: [500, 600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      body: {
        family: 'IBM Plex Sans Condensed',
        weights: [400, 500],
        fallback: '"Arial Narrow", sans-serif',
        source: 'google',
      },
      mono: { family: 'Azeret Mono', weights: [500], fallback: '"Courier New", monospace', source: 'google' },
      cjk: { display: 'ZCOOL QingKe HuangYou', body: 'Noto Sans SC' },
      notes:
        'Test-equipment voice: Rajdhani 600 uppercase +0.08em for engraved section labels; segment-style readouts in Azeret Mono 500 tabular with a dim "8888" ghost behind the lit digits; Plex Sans Condensed 14–15px for manual text.',
    },
  ],
  palettes: [
    {
      id: 'braun-off-white',
      name: 'Braun off-white',
      colors: {
        paper: '#ecebe6',
        ink: '#1f1f1d',
        muted: '#5a5955',
        accent: '#e35205',
        accent2: '#6f9a3a',
        rule: '#c9c7bf',
        panel: '#d9d7d0',
      },
      usage:
        'Off-white housing (~80%); panel grey for recesses and display surrounds; ink for knobs and labels; one orange control (power, record or the primary key) per area; green only for the confirm key or a running LED.',
    },
    {
      id: 'anodised-black',
      name: 'Anodised black',
      colors: {
        paper: '#1c1d1e',
        ink: '#eceae4',
        muted: '#a3a19b',
        accent: '#57e08a',
        accent2: '#ffb21a',
        rule: '#3a3b3c',
        panel: '#121314',
      },
      usage:
        'Black anodised faceplate; engraved labels in ink; LED green for active indicators and segment digits (≤ 5%); amber only for peak/warning; displays recessed in panel black with ghost segments in rule.',
    },
    {
      id: 'lab-putty',
      name: 'Lab putty grey',
      colors: {
        paper: '#cfd4cf',
        ink: '#141716',
        muted: '#414744',
        accent: '#1d5f99',
        accent2: '#d6402c',
        rule: '#9ba29d',
        panel: '#b9c0bb',
      },
      usage:
        'Cool putty-grey test-equipment case; darker panel for control fields; ink labels; blue for function keys; red only for the power switch.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['perfect-fifth', 'major-third'],
  motion: [
    {
      id: 'knob-detent',
      name: 'Knob detent',
      description:
        'When a section is selected its knob rotates in 30° detent steps to point at it, with a tiny overshoot at the last step.',
      duration: '120ms',
      easing: 'cubic-bezier(.3, 1.6, .6, 1)',
      reduced: 'The pointer jumps to its position without rotation.',
    },
    {
      id: 'segment-count',
      name: 'Segment count',
      description:
        'Segment readouts step to their value in 6 discrete updates while ghost segments stay visible; status LEDs switch on with no fade.',
      duration: '360ms',
      easing: 'steps(6, end)',
      reduced: 'Final digits shown immediately.',
    },
    {
      id: 'key-travel',
      name: 'Key travel',
      description:
        'Keys travel 2px down on press (translateY(2px), shadow removed) and spring back; toggles snap with no tween.',
      duration: '80ms',
      easing: 'cubic-bezier(.2, 0, 0, 1)',
      reduced: 'Colour change only.',
    },
  ],
  motifs: [
    {
      id: 'labelled-knob',
      name: 'Labelled knob',
      description:
        'A 40–64px SVG knob with one pointer line, a tick arc (11 ticks over 270°) and its label centred below.',
    },
    {
      id: 'segment-display',
      name: 'Segment display',
      description:
        'A recessed seven-segment / LCD window with lit digits over dim ghost "8"s at 12% opacity.',
    },
    {
      id: 'switch-grid',
      name: 'Switch grid',
      description:
        'Square keys on a 48px pitch with labels printed above or on them; exactly one key in the accent colour.',
    },
  ],
  anchors: [
    {
      id: 'readout-hero',
      name: 'Readout',
      description:
        'A large recessed display window shows the title or a key number as a segment/LCD readout, with mode labels and two status LEDs.',
    },
    {
      id: 'control-row',
      name: 'Control row',
      description:
        'A full-width row of 5–6 labelled knobs or sliders acting as navigation, under a model plate carrying the title.',
    },
    {
      id: 'device-elevation',
      name: 'Device elevation',
      description:
        'A precise line drawing of the device face (front elevation) with numbered callouts; the title sits on its model plate.',
    },
  ],
  surfaces: [
    {
      id: 'moulded-plastic',
      name: 'Moulded plastic',
      description: 'Matte ABS housing: flat colour with a 1px highlight on the top edge of each panel.',
      css: 'background: var(--paper); border-top: 1px solid rgba(255,255,255,.6); border-radius: 10px;',
    },
    {
      id: 'brushed-aluminium',
      name: 'Brushed aluminium',
      description: 'A brushed-aluminium faceplate made of fine horizontal hairlines.',
      css: 'background-color: var(--panel); background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,.04) 0 1px, transparent 1px 7px);',
    },
    {
      id: 'speaker-grille',
      name: 'Speaker grille',
      description: 'A perforated grille field (T3 / SK 4) as a regular hole grid.',
      css: 'background-color: var(--panel); background-image: radial-gradient(circle, var(--ink) 1.6px, transparent 2px); background-size: 9px 9px;',
    },
  ],
  must: [
    'Every interactive element is drawn as a physical control (knob, key, toggle, slider) with a label directly above or below it.',
    'Controls sit on a fixed 48px pitch and labels share baselines across a row.',
    'At most one accent-coloured control per panel area; status colours mean on / active / warning.',
  ],
  mustNot: [
    'No glossy gradients, chrome reflections or 3D-rendered product photos.',
    'No fake readout numbers — readouts show facts (times, counts, prices) or the title.',
    'No large soft shadows; depth is 1–3px at most.',
  ],
};

const chineseAlmanac: Branch = {
  id: 'chinese-almanac',
  name: { zh: '老黄历', en: 'Chinese almanac' },
  family: 'craft',
  concept: {
    zh: '老通书与撕页黄历：米黄纸上红黑两色套印，竖排文字从右往左读，干支纪日的方框、宜与忌对开的格子、角上一方朱印；月份牌则把节气与日期框进木刻花边。每一项都有固定的位置，读者凭位置就知道去哪里找。',
    en: 'The traditional tongshu almanac and the tear-off huangli: red and black ink on rice paper, vertical text read right to left, boxes for the ganzhi day, paired grids of 宜 (do) and 忌 (avoid), a cinnabar seal in the corner; the yuefenpai calendar poster frames dates and solar terms in woodblock borders. Every item has a fixed place, so readers find things by position alone.',
  },
  references: [
    '通书 / 通勝 almanacs, Qing woodblock editions and Hong Kong 蔡真步堂 editions',
    '《時憲書》 Qing imperial calendar, woodblock printed',
    '撕页日历 tear-off daily calendars, mainland China 1960s–90s',
    '月份牌 Shanghai calendar posters — 郑曼陀, 杭穉英 (1910s–30s)',
    '《芥子园画传》 woodblock page frames and fish-tail 版心',
  ],
  keywords: ['宜忌', '干支', '竖排', '朱印', '红黑套印', '木刻边框'],
  tokens: {
    grid: 'Woodblock page grid: a framed block (版框) divided into vertical columns (行) of 1em + 0.5em with 1px dividers (界栏), read right to left with writing-mode: vertical-rl; horizontal Latin blocks outside the frame on a 12-col, 16px-gutter grid.',
    radius: '0. Seals are squares or circles; nothing else is round.',
    border:
      'Frame: 4px solid var(--ink) outer + 1px inner line 5px inside (outline: 1px solid var(--ink); outline-offset: -9px); column dividers 1px solid var(--rule); 宜/忌 boxes 2px solid var(--accent).',
    shadow: 'none. Ink only; seal edges may be roughened with an SVG filter, never shadowed.',
  },
  layouts: [
    {
      id: 'tear-off-day',
      name: 'Tear-off day sheet',
      description:
        'The page is one daily sheet: a giant date numeral, lunar/ganzhi columns at its sides, 宜/忌 boxes at the foot; further sections are the following sheets.',
      grid: 'Sheet 3:4 portrait, max 720px; header band 15%; numeral zone 55% flanked by two 18%-wide vertical columns; 宜 | 忌 halves in the bottom 25%.',
      structure: [
        'Header band: Gregorian year and month, weekday; red for Sundays and holidays',
        'Giant date numeral (a key date or number from the facts) between vertical columns: 农历 date, 干支, solar term',
        '宜 / 忌 boxes: 宜 lists what to do (offers, actions from the facts), 忌 lists constraints',
        'Bottom strip: one short line from the facts, and a perforation line',
        'Following sheets stacked below, one per section, each with its own date box',
      ],
    },
    {
      id: 'tongshu-page',
      name: 'Almanac page',
      description:
        'An open tongshu leaf: two half-leaves of vertical columns read right to left around a central 版心 strip with a fish-tail ornament.',
      grid: 'Two half-leaves of 8–10 vertical columns (writing-mode: vertical-rl) with 1px dividers; 48px 版心 strip in the centre; double frame around everything.',
      structure: [
        'Rightmost column: book title and section name in large type',
        'Columns 2–8: one fact per column, a 干支-style date box at the top, text below',
        '版心 strip: running title, fish-tail ornament, page number in Chinese numerals',
        'Left half-leaf: tables (宜/忌 or a 时辰 hours grid) mapped to the facts',
        'Seal impression at the end with the issuer’s name',
      ],
    },
    {
      id: 'yuefenpai-poster',
      name: 'Calendar poster',
      description:
        'A 月份牌 poster: ornamental frame, a central framed panel for the main message, couplet columns at the sides and a month grid along the bottom.',
      grid: 'Poster 2:3; 48px ornamental border; central panel 70% of the height; bottom band a 6 × 2 grid of month/section blocks; side borders carry vertical couplets.',
      structure: [
        'Top cartouche: the issuer’s name in large display',
        'Central framed panel: title and main message — typographic or drawn ornament, no photos',
        'Side couplet columns carrying two key facts vertically',
        'Bottom 6 × 2 calendar grid: each block a date or a section',
        'Imprint line: address and contact in small horizontal type',
      ],
    },
  ],
  type: [
    {
      id: 'woodblock-song',
      name: 'Noto Serif TC + Cormorant',
      display: {
        family: 'Cormorant',
        weights: [500, 700],
        fallback: 'Garamond, "Times New Roman", serif',
        source: 'google',
      },
      body: {
        family: 'EB Garamond',
        weights: [400, 500],
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'Noto Serif TC', body: 'Noto Serif TC' },
      notes:
        'Chinese leads: Noto Serif TC 900 for 宜/忌 and giant dates (woodblock 宋体 weight); 500 for vertical running text, letter-spacing 0.08em, line-height 1.9. Calendrical dates in Chinese numerals (初一, 廿三). Latin only for transliterations, Cormorant small caps.',
    },
    {
      id: 'brush-kaishu',
      name: 'Ma Shan Zheng + LXGW WenKai TC + Old Standard TT',
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
      cjk: { display: 'Ma Shan Zheng', body: 'LXGW WenKai TC' },
      notes:
        'Ma Shan Zheng only for 宜/忌 and the giant day character (≥ 64px); LXGW WenKai TC for all running Chinese — kaishu reads like a hand-copied almanac — 17px/1.8, vertical or horizontal. Latin in Old Standard TT, sentence case, small.',
    },
    {
      id: 'yuefenpai-deco',
      name: 'ZCOOL XiaoWei + Limelight',
      display: { family: 'Limelight', weights: [400], fallback: '"Didot", Georgia, serif', source: 'google' },
      body: {
        family: 'Cormorant Garamond',
        weights: [500, 600],
        fallback: 'Garamond, Georgia, serif',
        source: 'google',
      },
      cjk: { display: 'ZCOOL XiaoWei', body: 'Noto Serif SC' },
      notes:
        '1930s Shanghai poster voice: ZCOOL XiaoWei for the issuer’s name and month names, tracking 0.1em; Limelight for Latin (issuer name, month abbreviations) uppercase +0.06em and for numerals inside the month blocks. Chinese body Noto Serif SC 16px/1.8.',
    },
  ],
  palettes: [
    {
      id: 'red-black-rice',
      name: 'Red and black on rice paper',
      colors: {
        paper: '#f3e9d2',
        ink: '#1a1512',
        muted: '#5a4d3f',
        accent: '#c1272d',
        accent2: '#8a6a3a',
        rule: '#b3a07e',
        panel: '#ece0c4',
      },
      usage:
        'Rice-paper ground; black ink for text and frames; red for significant dates, 宜 headers, Sundays and the seal (~12%); faded brown accent2 only for marginal annotations.',
    },
    {
      id: 'spring-couplet-red',
      name: 'Spring-couplet red',
      colors: {
        paper: '#8c1c1c',
        ink: '#ffe9b0',
        muted: '#f0c27a',
        accent: '#f2c14e',
        accent2: '#f6ecd8',
        rule: '#d9a24a',
        panel: '#741414',
      },
      usage:
        'Deep 春联-red ground (dark palette); gold for characters, frames and the seal outline; cream accent2 fills date boxes holding red numerals; darker red panels behind 宜/忌.',
    },
    {
      id: 'celadon-poster',
      name: 'Celadon poster',
      colors: {
        paper: '#e6eee5',
        ink: '#1d2420',
        muted: '#4a554e',
        accent: '#2f7a5f',
        accent2: '#c95a45',
        rule: '#8fa79a',
        panel: '#f5efe2',
      },
      usage:
        '月份牌 pastel: celadon ground; cream panels for calendar blocks; jade for borders and month names; persimmon accent2 for dates and the seal; ink for text.',
    },
  ],
  densities: ['regular', 'compact'],
  scales: ['golden', 'perfect-fifth', 'augmented-fourth'],
  motion: [
    {
      id: 'seal-stamp',
      name: 'Seal stamp',
      description:
        'After the main block appears, the seal presses on once: scale 1.15 → 1 with opacity 0 → 1 at contact, a slight settle.',
      duration: '260ms',
      easing: 'cubic-bezier(.2, 1.4, .4, 1)',
      reduced: 'Seal shown in place.',
    },
    {
      id: 'tear-off',
      name: 'Tear off',
      description:
        'Advancing a day sheet: the top sheet tilts 8° around its top-left binding and slides up out of view, revealing the next sheet.',
      duration: '420ms',
      easing: 'cubic-bezier(.55, 0, .8, .2)',
      reduced: 'Instant sheet swap.',
    },
    {
      id: 'ink-soak',
      name: 'Ink soak',
      description:
        'Red characters print first at 60% opacity with blur(0.6px) and settle to crisp full ink, like ink soaking into paper.',
      duration: '300ms',
      easing: 'ease-out',
      reduced: 'Rendered crisp immediately.',
    },
  ],
  motifs: [
    {
      id: 'yi-ji-grid',
      name: '宜/忌 grid',
      description:
        'Paired boxes: a red-headed 宜 box and a black-headed 忌 box side by side, each listing 3–8 short items in vertical or horizontal columns.',
    },
    {
      id: 'ganzhi-box',
      name: 'Ganzhi date box',
      description:
        'A double-framed date box stacking 干支 / 农历 / 节气 lines, with the Gregorian date as a big numeral beside it.',
    },
    {
      id: 'cinnabar-seal',
      name: 'Cinnabar seal',
      description:
        'A square cinnabar seal (red fill with white relief characters, or red outline intaglio) carrying 2–4 characters from the facts, edge roughened via feTurbulence + feDisplacementMap.',
    },
  ],
  anchors: [
    {
      id: 'giant-day',
      name: 'Giant day',
      description:
        'A tear-off sheet with a giant date or numeral (≈ 40vh) in red or black, flanked by vertical 农历/干支 columns.',
    },
    {
      id: 'yi-ji-split',
      name: '宜/忌 split',
      description: 'The first screen is the split: 宜 and 忌 at 20vw, each heading a list of facts.',
    },
    {
      id: 'framed-column-page',
      name: 'Framed column page',
      description:
        'A woodblock-framed page of vertical columns read right to left, title in the rightmost column, a seal at the end.',
    },
  ],
  surfaces: [
    {
      id: 'rice-paper',
      name: 'Rice paper',
      description: 'Thin rice paper with faint diagonal fibres and specks.',
      css: 'background-color: var(--paper); background-image: repeating-linear-gradient(105deg, rgba(120,90,40,.035) 0 1px, transparent 1px 7px), radial-gradient(rgba(120,90,40,.05) 1px, transparent 1.5px); background-size: auto, 5px 5px;',
    },
    {
      id: 'woodblock-ink',
      name: 'Woodblock ink',
      description:
        'Slightly uneven woodblock impression: headings and frames roughened by an inline SVG filter (feTurbulence baseFrequency .9 + feDisplacementMap scale 1.5).',
      css: 'filter: url(#woodblock-rough);',
    },
    {
      id: 'perforated-pad',
      name: 'Perforated pad',
      description: 'Tear-off pad: a row of perforation holes along the top edge of each sheet.',
      css: 'background-image: radial-gradient(circle, var(--rule) 2px, transparent 2.5px); background-size: 12px 12px; background-repeat: repeat-x; background-position: 0 6px;',
    },
  ],
  must: [
    'At least one block set vertically (writing-mode: vertical-rl) and read right to left.',
    'Two inks dominate: black + red make up ≥ 90% of the non-paper colour (light palettes).',
    'A 宜/忌 or date-box structure organises the facts.',
    'Calendrical dates in Chinese numerals when the content is Chinese.',
  ],
  mustNot: [
    'No fortune-telling or invented auspicious judgements — 宜/忌 hold practical do / avoid items from the facts.',
    'No dragons, lanterns or clip-art "Chinese" decoration; ornament is frames, fish-tails and seals.',
    'No sideways-rotated Chinese characters in vertical text.',
    'No gradient gold or 3D metallic effects.',
  ],
};

export const signageScreenBranches: Branch[] = [
  transitWayfinding,
  hkShopSign,
  dinerMenuBoard,
  galleryCatalogue,
  topographicMap,
  terminalPhosphor,
  web1Homepage,
  gameManual,
  instrumentPanel,
  chineseAlmanac,
];
