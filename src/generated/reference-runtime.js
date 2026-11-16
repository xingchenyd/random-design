// Derived from qybaihe/hash-design e40a942 (MIT). See vendor/hash-design/LICENSE.

// vendor/hash-design/packages/core/src/data/branches/document.ts
var recipeCard = {
  id: "recipe-card",
  name: { zh: "\u83DC\u8C31\u5361", en: "Recipe card" },
  family: "craft",
  concept: {
    zh: "\u94C1\u76AE\u76D2\u91CC\u6309\u5206\u7C7B\u63D2\u7740\u7684 3\xD75 \u82F1\u5BF8\u83DC\u8C31\u7D22\u5F15\u5361\uFF1A\u6D45\u84DD\u6A2A\u7EBF\u3001\u9876\u7AEF\u4E00\u9053\u7EA2\u7EBF\uFF0C\u6253\u5B57\u673A\u6572\u51FA\u7684\u914D\u6599\u548C\u6B65\u9AA4\uFF0C\u9875\u8FB9\u662F\u94C5\u7B14\u8865\u7684\u201C\u7CD6\u51CF\u534A\u201D\u3002\u51F8\u51FA\u7684\u5206\u7C7B\u63D2\u9875\u6807\u7B7E\u5C31\u662F\u5BFC\u822A\uFF0C\u6CB9\u6E0D\u548C\u6298\u89D2\u8BC1\u660E\u8FD9\u5F20\u5361\u88AB\u53CD\u590D\u7528\u8FC7\u3002",
    en: "The 3\xD75 inch recipe index cards filed in a kitchen tin: pale blue feint lines under one red top rule, ingredients and steps struck on a typewriter, a pencilled \u201Chalf the sugar\u201D in the margin. Protruding divider tabs are the navigation; grease spots and dog-ears prove the card has been used."
  },
  references: [
    "Betty Crocker Recipe Card Library box sets (General Mills, 1971)",
    "Esselte / Oxford ruled 3\xD75 index cards (one red top line, blue feint lines)",
    "Lithographed tin recipe boxes by J. Chein & Co. and Ohio Art, 1950s",
    "Irma Rombauer, The Joy of Cooking (1931) \u2014 the \u201Caction method\u201D with ingredients introduced inside the steps",
    "US community-cookbook recipe-card swaps, 1940s\u201360s"
  ],
  keywords: ["\u7D22\u5F15\u5361", "\u7EA2\u8272\u9876\u7EBF", "\u6D45\u84DD\u6A2A\u7EBF", "\u6253\u5B57\u673A", "\u94C5\u7B14\u6279\u6CE8", "\u5206\u7C7B\u63D2\u9875", "\u6CB9\u6E0D"],
  tokens: {
    grid: "Cards are 5:3 landscape (600\xD7360px at desktop, 100% wide with aspect-ratio: 5/3 on mobile, growing in 28px steps when content overflows); inside each card a 28px line pitch carries every baseline; 40px left text inset; the red top rule sits 44px from the card top; filed cards stack with a 36px visible strip each.",
    radius: "3px on index-card corners only (die-cut card stock); divider tabs 6px 6px 0 0; 0 on everything else. No pills.",
    border: "Card edge 1px solid var(--rule); one 2px solid var(--accent) top rule per card; feint lines 1px var(--rule) every 28px; divider tabs 1px solid var(--muted).",
    shadow: "No blur. A filed deck shows its edges with stacked hard lines: box-shadow: 0 2px 0 var(--paper), 0 3px 0 var(--rule), 0 5px 0 var(--paper), 0 6px 0 var(--rule)."
  },
  layouts: [
    {
      id: "tin-box-deck",
      name: "Tin box deck",
      description: "The page is the recipe tin seen from above: divider tabs across the top, the active card pulled up and fully readable, the following cards visible only as their top strips.",
      grid: "Single column, max 720px; card aspect 5:3; tab row of 4\u20136 tabs, each 120px wide, staggered one position per divider (1/5 cut); 36px card strips stacked below the active card.",
      structure: [
        "Tab row: category dividers named after real sections (e.g. \u65E9\u9910 / \u6C64 / \u9762\u5305 / \u8282\u65E5), the current one raised 8px",
        "Active card: title sitting on the red rule, yield and time typed in the top-right corner, ingredients then method on the feint lines",
        "Card back (shown as a second card): continuation of the method plus pencilled notes and dates",
        "Card strips: 4\u20136 next-card tops showing only their typed titles, each one a link",
        "Lid label footer: a small framed plate with owner name, address and \u201CIf found, please return to\u2026\u201D"
      ]
    },
    {
      id: "printed-card-set",
      name: "Printed card set",
      description: "Commercial boxed-set card: a full-width colour band carrying the category and card number, a square photo window, ingredients in a narrow left column and numbered method on the right.",
      grid: "12 columns inside the card; ingredients span 4 with a 1px vertical rule, method spans 8; card max-width 960px at 5:3, flowing to a second card when longer; 8px baseline.",
      structure: [
        "Category band 48px tall: category name in italic + \u201CNo. 27\u201D card number at the right",
        "Title row with a 160\xD7160 photo window on the right (\u2264 25% of the card)",
        "Ingredients column with quantities right-aligned in tabular figures | numbered method column",
        "Footer strip: a ruled 3-cell table \u2014 serves / oven \xB0C (\xB0F) / prep + cook time",
        "Second, shorter card: variations and storage notes"
      ]
    },
    {
      id: "counter-spread",
      name: "Cards on the counter",
      description: "Several cards laid out on the kitchen counter, each one a different section of the page, slightly rotated and overlapping, read left to right like a recipe in progress.",
      grid: "3 columns of 360px cards (2 on tablet, 1 on mobile), \u221216px margins for 12\u201324px overlaps; rotations taken in order from [-1.5deg, 1deg, -0.5deg, 2deg]; counter background = panel colour.",
      structure: [
        "Lead card at 1.4\xD7 size: the subject typed as a recipe title with yield and \u201CFrom the kitchen of \u2026\u201D",
        "Ingredients card: list with pencil-drawn tick boxes",
        "Method cards (2\u20133): numbered steps, step numbers circled in pencil",
        "Note card on an unruled card back: handwritten tips, substitutions, dates tried",
        "Contact card typed like a library catalogue entry: address, hours, phone"
      ]
    }
  ],
  type: [
    {
      id: "typewriter-index",
      name: "Special Elite + Courier Prime",
      display: {
        family: "Special Elite",
        weights: [400],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      body: {
        family: "Courier Prime",
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Titles in Special Elite, uppercase, 0.04em tracking, line-height equal to the 28px pitch so the title sits ON the red rule; no size above 32px (a typewriter has one size \u2014 hierarchy comes from CAPS and underlining). Everything else Courier Prime 16px/28px. Quantities underlined (text-decoration-thickness 1px, underline-offset 3px), not bolded. Fractions typed as \u201C1/2\u201D, never \xBD glyphs."
    },
    {
      id: "script-and-pencil",
      name: "Homemade Apple + Kalam",
      display: {
        family: "Homemade Apple",
        weights: [400],
        fallback: '"Segoe Script", "Brush Script MT", cursive',
        source: "google"
      },
      body: {
        family: "Kalam",
        weights: [300, 400, 700],
        fallback: '"Segoe Print", "Bradley Hand", cursive',
        source: "google"
      },
      mono: {
        family: "Courier Prime",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Long Cang", body: "Noto Sans SC" },
      notes: "Recipe title in Homemade Apple at 40\u201356px, line-height 1.6 (tall loops), never uppercase or letter-spaced. Kalam 300 at 19px on a 28px line for method text; Kalam 700 only for an ingredient named inside a step. Courier Prime for the quantities column so numbers align. Pencil asides: Kalam 300, muted colour, rotated \u22122\xB0."
    },
    {
      id: "printed-library",
      name: "Vollkorn + Public Sans",
      display: {
        family: "Vollkorn",
        weights: [700, 900],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: "google"
      },
      body: {
        family: "Public Sans",
        weights: [400, 600, 800],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Sans SC" },
      notes: "Vollkorn 900 for the dish/section name in sentence case, \u22120.01em tracking, line-height 1.05; Vollkorn 700 italic for category bands. Public Sans 600 labels uppercase at 12px with 0.08em tracking (\u201CSERVES\u201D, \u201COVEN\u201D, \u201CTIME\u201D). Ingredients in Public Sans 400 with font-variant-numeric: tabular-nums lining-nums, quantities right-aligned. Card numbers in Vollkorn with oldstyle figures (onum)."
    }
  ],
  palettes: [
    {
      id: "index-card-cream",
      name: "Index-card cream",
      colors: {
        paper: "#f7f1e1",
        ink: "#1f1b16",
        muted: "#5a5046",
        accent: "#c8352b",
        accent2: "#2f5d8a",
        rule: "#9fc2dc",
        panel: "#efe3c4"
      },
      usage: "Cream card stock everywhere (\u224880%); pale blue rule only for the feint lines; red accent only for the single top rule per card and the raised tab (\u22483%); ballpoint blue (accent2) for handwritten corrections; panel for aged cards and the lid label."
    },
    {
      id: "harvest-gold-1970s",
      name: "Harvest gold & avocado",
      colors: {
        paper: "#fbf3dc",
        ink: "#2b2a1a",
        muted: "#5b5636",
        accent: "#c46a1b",
        accent2: "#7a8a2e",
        rule: "#d8c58c",
        panel: "#f0d488"
      },
      usage: "Harvest-gold panel for category bands and tab fills (\u224820%); avocado (accent2) for card numbers and divider tabs; orange (accent) for the top rule and oven-temperature numerals set \u2265 24px; body text dark olive ink."
    },
    {
      id: "enamel-tin",
      name: "Enamel tin interior",
      colors: {
        paper: "#233d3a",
        ink: "#f4ead2",
        muted: "#c4b896",
        accent: "#e2574c",
        accent2: "#f0c75e",
        rule: "#4d6b66",
        panel: "#2d4c48"
      },
      usage: "Dark teal enamel ground of the tin (\u224870%); cards drawn as panel-coloured blocks with cream ink; tomato red (accent) for tab fills and the top rule; mustard (accent2) for card numbers and stencilled lid lettering."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["minor-third", "major-third"],
  motion: [
    {
      id: "card-pull",
      name: "Card pull",
      description: "Selecting a divider tab lifts that card 24px up out of the box in one physical move (translateY); every other card stays put.",
      duration: "220ms",
      easing: "cubic-bezier(.3,.7,.2,1)",
      reduced: "Swap the active card instantly with no translation; mark the active tab with the accent rule."
    },
    {
      id: "card-flip",
      name: "Card flip",
      description: "\u201CSee back\u201D turns the card over around its horizontal axis (rotateX 180deg, perspective 1200px) to show the continuation on the unruled back.",
      duration: "420ms",
      easing: "cubic-bezier(.45,0,.2,1)",
      reduced: "Show the back as a second card below the front; no rotation."
    },
    {
      id: "typebar-strike",
      name: "Typebar strike",
      description: "On load the card title types itself once, one character per step, with a 1px downward jolt per strike; body text is static.",
      duration: "900ms",
      easing: "steps(24, end)",
      reduced: "Render the title fully typed; no jolt."
    }
  ],
  motifs: [
    {
      id: "red-top-rule",
      name: "Red top rule & feint lines",
      description: "One 2px red rule 44px below the card top and 1px pale blue lines every 28px (repeating-linear-gradient); text baselines sit exactly on them."
    },
    {
      id: "divider-tabs",
      name: "Divider tabs",
      description: "Category tabs protruding above the cards at staggered 1/5-cut positions, each with a typed or stamped label; the tabs are the navigation."
    },
    {
      id: "kitchen-marks",
      name: "Kitchen stains & pencil marks",
      description: "One SVG grease ring (irregular ellipse at 6\u201310% opacity) and pencil ticks, underlines or \u201C\xD72\u201D in the margin \u2014 never more than three marks per card."
    }
  ],
  anchors: [
    {
      id: "pulled-card",
      name: "Pulled card",
      description: "The first screen is one full index card, front-on, with the title on the red rule and the first ingredients visible; tab tops peek above it."
    },
    {
      id: "open-tin",
      name: "Open recipe tin",
      description: "The first screen shows the open tin in flat elevation (simple SVG outline) with the tab tops of 5\u20136 dividers and the page name on a lid label."
    },
    {
      id: "ingredients-lead",
      name: "Ingredients as lead",
      description: "The first screen leads with the typed list itself \u2014 quantities at 28\u201336px in tabular figures \u2014 with the title smaller above; the facts are the hero."
    }
  ],
  surfaces: [
    {
      id: "ruled-card",
      name: "Ruled index card",
      description: "Card stock with one red rule near the top and pale blue feint lines below it.",
      css: "background-color: var(--paper); background-image: linear-gradient(var(--accent), var(--accent)), repeating-linear-gradient(to bottom, transparent 0 27px, var(--rule) 27px 28px); background-size: 100% 2px, 100% calc(100% - 72px); background-position: 0 44px, 0 72px; background-repeat: no-repeat;"
    },
    {
      id: "aged-card",
      name: "Handled card",
      description: "Yellowed stock darkening toward the edges, with one faint grease ring \u2014 a card handled for decades.",
      css: "background-color: var(--paper); background-image: radial-gradient(ellipse 90px 60px at 72% 38%, transparent 70%, rgba(150,100,30,.10) 74%, transparent 80%), radial-gradient(ellipse at center, transparent 60%, rgba(110,80,30,.14) 100%);"
    },
    {
      id: "blank-back",
      name: "Blank card back",
      description: "The unruled back of a card: plain stock with fibre speckle, used for notes and continuations.",
      css: "background-color: var(--panel); background-image: radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size: 5px 7px;"
    }
  ],
  must: [
    "Every content block lives on an index card with the 5:3 proportion (or a stack of them), not on an open page.",
    "Body text baselines sit on the feint ruled lines: line-height equals the 28px rule pitch.",
    "Navigation is a row of divider tabs labelled with the real section names.",
    "Quantities, times and temperatures come from the facts and are set in tabular figures."
  ],
  mustNot: [
    "No food-blog layout: no hero photo banner, no \u201Cjump to recipe\u201D button, no lifestyle preamble.",
    "No more than three stains or pencil marks per card; the card must stay fully legible.",
    "No photo larger than 25% of a card; no rounded pill buttons \u2014 actions are typed links or tab labels."
  ]
};
var engineeringPlate = {
  id: "engineering-plate",
  name: { zh: "\u5DE5\u7A0B\u56FE\u7248", en: "Engineering plate" },
  family: "document",
  concept: {
    zh: "\u521A\u4ECE\u6652\u56FE\u5BA4\u53D6\u51FA\u7684\u5DE5\u7A0B\u56FE\u7EB8\uFF1A\u5E26\u5206\u533A\u7F16\u53F7\u7684\u56FE\u6846\u3001\u53F3\u4E0B\u89D2\u7684\u6807\u9898\u680F\u3001\u5C3A\u5BF8\u7EBF\u4E0E\u7BAD\u5934\u3001\u4FEE\u8BA2\u8868\u3001\u201C\u7B2C 3 \u5F20 / \u5171 12 \u5F20\u201D\u3002\u84DD\u6652\u3001\u6C28\u718F\u6652\u56FE\u6216\u63CF\u56FE\u7EB8\u4E0A\u7684\u5355\u7EBF\u5B57\uFF0C\u4E00\u5207\u90FD\u88AB\u6807\u6CE8\u3001\u7F16\u53F7\u3001\u53EF\u8FFD\u6EAF\u3002",
    en: "The engineering drawing as it leaves the print room: a border frame with zone markers, a title block in the bottom-right corner, dimension lines with arrowheads, a revision table, \u201CSheet 3 of 12\u201D. Cyanotype, diazo or drafting vellum with single-stroke lettering \u2014 everything labelled, numbered and traceable."
  },
  references: [
    "ISO 5457 / ISO 7200 drawing-sheet frames and title blocks",
    "ISO 3098 lettering and Leroy / Rotring stencil lettering templates",
    "Apollo-era engineering drawings (North American Aviation, Grumman Lunar Module)",
    "Cyanotype blueprints and Pellet-process prints, 1870s\u20131940s",
    "GB/T 14689 \u56FE\u7EB8\u5E45\u9762\u4E0E\u683C\u5F0F and GB/T 14691 \u957F\u4EFF\u5B8B\u4F53 lettering"
  ],
  keywords: ["\u6807\u9898\u680F", "\u5C3A\u5BF8\u7EBF", "\u4FEE\u8BA2\u8868", "\u56FE\u6846\u5206\u533A", "\u84DD\u6652", "\u63CF\u56FE\u7EB8", "\u5355\u7EBF\u5B57"],
  tokens: {
    grid: "Drawing sheet with a 24px border frame; the frame is divided into zones \u2014 columns 1\u20138 across the top and bottom, rows A\u2013F down both sides \u2014 mapped to CSS grid tracks; everything inside snaps to an 8px drafting grid.",
    radius: "0 everywhere. The only circles are balloon callouts (28px, border-radius 50%) and centre marks.",
    border: "Frame: 2px solid ink outer line + 1px zone ticks; object lines 1.5px; dimension and leader lines 1px; hidden lines 1px dashed (6px/3px); centre lines 1px dash-dot (stroke-dasharray 12 3 2 3).",
    shadow: "none. Depth is shown only by section hatching: 45\xB0 1px lines at a 6px pitch."
  },
  layouts: [
    {
      id: "title-block-sheet",
      name: "Single sheet",
      description: "The page is one drawing sheet: zoned frame, the main view (content) occupying the field, revision table top-right and the title block anchored bottom-right as the identity of the page.",
      grid: "Sheet = viewport minus 24px frame; field as an 8\xD76 zone grid; title block min(640px, 100%) wide \xD7 4 rows of 32px bottom-right; revision table 4 columns top-right, 280px wide.",
      structure: [
        "Frame with zone numerals 1\u20138 and letters A\u2013F on all four edges",
        "Revision table top-right: REV / DESCRIPTION / DATE / APPD, latest first",
        "Main view: the subject drawn as a labelled diagram with balloon callouts \u2460 \u2461 \u2462 keyed to notes",
        "General notes bottom-left: \u201CNOTES: 1. ALL DIMENSIONS IN mm \u2026\u201D mapped from the facts",
        "Title block bottom-right: title, drawing no., scale, date, sheet \u201C1 OF 4\u201D, drawn / checked / approved initials"
      ]
    },
    {
      id: "sheet-set",
      name: "Sheet set",
      description: "A multi-sheet set: every section is its own sheet with sheet number and cross-references (\u201CSEE SHEET 3, ZONE C4\u201D), stacked on the drafting table.",
      grid: "Each section a full-width sheet at 1.414:1 landscape (A-series) on desktop, 16px frame; sheets stacked with a 48px gap of panel colour; 12 columns inside each sheet.",
      structure: [
        "Cover sheet: drawing register as a ruled table (SHEET / TITLE / REV)",
        "Sheet 2: general arrangement \u2014 one large diagram with leaders to labels",
        "Sheet 3: details \u2014 2\u20134 detail circles \u201CDETAIL A  SCALE 2:1\u201D enlarging specific facts",
        "Sheet 4: schedule / bill of materials: ITEM / QTY / PART NO. / DESCRIPTION / MATERIAL",
        "Every sheet closes with its own compact title block"
      ]
    },
    {
      id: "exploded-assembly",
      name: "Exploded assembly",
      description: "An exploded view: the topic broken into parts floating along centre lines, each part ballooned and listed in a parts list beside it.",
      grid: "Two zones: 8-column field for the exploded view (parts positioned along a 30\xB0 axis), 4-column parts list; 8px grid; 28px balloons.",
      structure: [
        "Header strip: drawing title in wide caps, DWG NO. right-aligned",
        "Exploded view: 4\u20138 parts (content blocks) spaced along dash-dot centre lines with balloon numbers",
        "Parts list table aligned to the balloon numbers",
        "One dimension line spanning the whole view carrying the key figure (size, price, date range)",
        "Title block with approval signatures"
      ]
    }
  ],
  type: [
    {
      id: "b612-cockpit",
      name: "B612 Mono + B612",
      display: {
        family: "B612 Mono",
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "B612",
        weights: [400, 700],
        fallback: "Verdana, Tahoma, sans-serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "All drawing text UPPERCASE, 0.06em tracking, sizes taken only from the ISO 3098 \u221A2 series 2.5 / 3.5 / 5 / 7 / 10 / 14mm \u2192 10 / 14 / 20 / 28 / 40 / 56px. Title in B612 Mono 700 at 40px; notes and table cells in B612 400 at 14px, line-height 1.4. Never italic."
    },
    {
      id: "draftsman-hand",
      name: "Architects Daughter + IBM Plex Sans Condensed",
      display: {
        family: "Architects Daughter",
        weights: [400],
        fallback: '"Segoe Print", cursive',
        source: "google"
      },
      body: {
        family: "IBM Plex Sans Condensed",
        weights: [400, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      mono: {
        family: "IBM Plex Mono",
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Architects Daughter for titles and callouts, UPPERCASE ONLY with 0.08em tracking at 24\u201348px \u2014 the hand lettering of a draughtsman on vellum. IBM Plex Sans Condensed 400/600 for notes and schedules at 15px/1.35. IBM Plex Mono 500 for drawing numbers, part numbers and dimensions; thousands separated by a thin space (\u201C1 200\u201D)."
    },
    {
      id: "aerospace-extended",
      name: "Michroma + IBM Plex Sans",
      display: {
        family: "Michroma",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: { family: "IBM Plex Sans", weights: [400, 500], fallback: "Arial, sans-serif", source: "google" },
      mono: {
        family: "Share Tech Mono",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Michroma (Microgramma-style extended) only for the title-block title and sheet headers, uppercase, 0.12em tracking, max 32px \u2014 it is very wide. IBM Plex Sans 400/500 at 15px for notes. Share Tech Mono for zone references (C4), part numbers and dimensions at 13\u201314px. Field labels like \u201CDWG NO.\u201D in Plex Sans 500 at 10px with 0.1em tracking."
    }
  ],
  palettes: [
    {
      id: "cyanotype",
      name: "Cyanotype blueprint",
      colors: {
        paper: "#163f73",
        ink: "#f1f5f7",
        muted: "#b9cde0",
        accent: "#f2c14e",
        accent2: "#e86a4a",
        rule: "#7fa6cc",
        panel: "#1d4c86"
      },
      usage: "Prussian-blue ground for the whole sheet (\u224890%); all linework and lettering near-white; yellow (accent) only for revision clouds and the current revision triangle; red-orange (accent2) for checker\u2019s markups (\u22482%); title block and tables on the slightly lighter panel."
    },
    {
      id: "drafting-vellum",
      name: "Drafting vellum",
      colors: {
        paper: "#eef0ea",
        ink: "#1c2024",
        muted: "#4b535a",
        accent: "#b3261e",
        accent2: "#2e6e8e",
        rule: "#9aa5ab",
        panel: "#e1e5de"
      },
      usage: "Cool translucent vellum ground; graphite-black linework and lettering; red reserved for revision clouds, redlines and \u201CVOID\u201D stamps; steel blue (accent2) for dimension figures; grey rule for the 8px construction grid at low visibility."
    },
    {
      id: "sepia-diazo",
      name: "Sepia diazo print",
      colors: {
        paper: "#f3ead8",
        ink: "#3a2416",
        muted: "#6e5038",
        accent: "#8e3b1c",
        accent2: "#2f5f6f",
        rule: "#c9b394",
        panel: "#ebdcc0"
      },
      usage: "Warm ammonia whiteprint: every line prints sepia-brown; deeper rust (accent) for the frame, title-block outline and section hatching; one teal-grey (accent2) for approval stamps. No pure black anywhere."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["augmented-fourth", "perfect-fourth"],
  motion: [
    {
      id: "pen-plotter",
      name: "Pen plotter",
      description: "On load the linework draws itself once via stroke-dashoffset \u2014 object lines first, then dimensions, then lettering appears \u2014 like an HP pen plotter.",
      duration: "1200ms",
      easing: "linear",
      reduced: "Show the finished drawing immediately."
    },
    {
      id: "zone-locate",
      name: "Zone locate",
      description: "Hovering a cross-reference (\u201CSEE C4\u201D) highlights the matching zone markers on the frame and draws a 1px crosshair to that zone.",
      duration: "120ms",
      easing: "steps(2, end)",
      reduced: "Highlight the zone markers in accent without the crosshair."
    },
    {
      id: "still",
      name: "Still sheet",
      description: "No motion. Hover = 1px accent underline; balloon fills switch to ink.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "dimension-lines",
      name: "Dimension lines",
      description: "Thin lines with closed 15\xB0 arrowheads and extension lines with 2px gaps, carrying real figures from the facts (\u201C\u2190 1 200 \u2192\u201D)."
    },
    {
      id: "balloon-callouts",
      name: "Balloon callouts",
      description: "Numbered 28px circles with leader lines keying parts of a diagram or section to a parts list or notes."
    },
    {
      id: "revision-clouds",
      name: "Revision clouds & triangles",
      description: "A scalloped SVG cloud around whatever changed plus a triangle holding the revision letter, matching a row in the revision table."
    }
  ],
  anchors: [
    {
      id: "title-block-hero",
      name: "Title block as hero",
      description: "The first screen is dominated by an oversized title block (4\u20136 ruled rows: title, drawing no., scale, date, sheet count) inside the frame, with diagram linework above it."
    },
    {
      id: "general-arrangement",
      name: "General arrangement",
      description: "A large orthographic diagram (front / top / side views) of the subject in simple SVG shapes with dimensions, filling ~70% of the first screen."
    },
    {
      id: "drawing-register",
      name: "Drawing register",
      description: "The first screen is the cover sheet: a ruled drawing list with sheet numbers, titles and revision letters \u2014 the table of contents as hero."
    }
  ],
  surfaces: [
    {
      id: "blueprint-grid",
      name: "Blueprint grid",
      description: "Cyanotype ground with a faint 8px construction grid.",
      css: "background-color: var(--paper); background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px); background-size: 8px 8px;"
    },
    {
      id: "vellum",
      name: "Drafting vellum",
      description: "Translucent, slightly milky vellum with faint eraser smudges.",
      css: "background-color: var(--paper); background-image: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,.5), transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(0,0,0,.035), transparent 35%);"
    },
    {
      id: "diazo-drift",
      name: "Diazo exposure drift",
      description: "Ammonia whiteprint: warm paper with an uneven background tone where the exposure drifted at the edges.",
      css: "background-color: var(--paper); background-image: linear-gradient(90deg, rgba(120,80,40,.06), transparent 30%, transparent 70%, rgba(120,80,40,.08));"
    }
  ],
  must: [
    "A visible drawing frame with zone markers and a title block holding title, drawing number, scale or date, and \u201CSHEET n OF N\u201D.",
    "All labels uppercase in the ISO lettering sizes; every number carries its unit.",
    "At least one dimension line or balloon callout carries a real fact from the brief.",
    "A revision table or revision letter is present and consistent across the page."
  ],
  mustNot: [
    "No rendered 3D isometrics with gradients or glows \u2014 line drawing only.",
    "No sci-fi HUD styling (neon, scanlines, hexagon grids); this is paper.",
    "No decorative arrows: every arrowhead terminates a dimension or a leader."
  ]
};
var ledgerAccounting = {
  id: "ledger-accounting",
  name: { zh: "\u8D26\u672C", en: "Ledger" },
  family: "document",
  concept: {
    zh: "\u590D\u5F0F\u8BB0\u8D26\u7684\u603B\u8D26\u7C3F\uFF1A\u6D45\u9EC4\u6216\u6DE1\u7EFF\u7684\u8D26\u9875\uFF0C\u7EA2\u84DD\u4E24\u8272\u7AD6\u7EBF\u5206\u51FA\u65E5\u671F\u3001\u6458\u8981\u3001\u501F\u65B9\u3001\u8D37\u65B9\u548C\u4F59\u989D\uFF0C\u5408\u8BA1\u4E0B\u9762\u538B\u4E24\u9053\u7EA2\u7EBF\u3002\u6570\u5B57\u662F\u4E3B\u89D2\uFF0C\u94A2\u7B14\u5B57\u5199\u5728\u683C\u5B50\u91CC\uFF0C\u6BCF\u4E00\u680F\u90FD\u5FC5\u987B\u5BF9\u5F97\u4E0A\u3002",
    en: "The double-entry ledger: buff or pale-green ruled pages, red and blue vertical rules dividing date, particulars, debit, credit and balance, a double red rule under every total. Figures are the protagonists, written in fountain pen inside the columns, and every column has to foot."
  },
  references: [
    "Luca Pacioli, Summa de arithmetica (1494), \u201CParticularis de computis et scripturis\u201D",
    "Victorian bound ledgers and cash books by Waterlow & Sons, London",
    "Wilson Jones green columnar accounting pads, 1950s\u201380s",
    "NCR Class 31 and Burroughs Sensimatic posting-machine ledger cards, 1950s\u201360s",
    "\u4E2D\u5F0F\u8D26\u7C3F\uFF1A\u501F\u8D37\u8BB0\u8D26\u6CD5\u7684\u603B\u5206\u7C7B\u8D26\u9875\uFF08\u7EA2\u84DD\u683C\u7EBF\uFF09"
  ],
  keywords: ["\u501F\u8D37", "\u53CC\u7EA2\u7EBF", "\u8D26\u9875", "\u4F59\u989D", "\u94A2\u7B14", "\u8868\u683C\u6570\u5B57", "\u5BF9\u8D26"],
  tokens: {
    grid: "Ledger ruling: date (month 48px + day 32px) \xB7 particulars (flex) \xB7 folio (40px) \xB7 debit (112px whole units + 32px decimals) \xB7 credit (same) \xB7 balance (same); horizontal feint every 28px; 64px left margin for folio numbers and audit marks.",
    radius: "0. A ledger is ruled paper; nothing is rounded.",
    border: "Horizontal feint 1px var(--rule) every 28px; column boundaries 1px var(--accent2); money-column boundaries and decimal splits 1px var(--accent); totals: 1px ink rule above, border-bottom: 3px double var(--accent) below.",
    shadow: "none."
  },
  layouts: [
    {
      id: "ledger-folio",
      name: "Ledger folio",
      description: "A single ledger folio: account heading across the top, a full-width ruled table (date / particulars / folio / debit / credit / balance) and the page total carried forward.",
      grid: "One table spanning max 1100px with the column set from tokens; 28px row pitch; 64px left margin; on mobile particulars wrap under the date and debit/credit stay side by side.",
      structure: [
        "Account head: account name large, account number \u201CFo. 47\u201D at the right",
        "Brought-forward row: \u201CB/f\u201D with the opening figure",
        "Entries: 8\u201320 dated rows \u2014 each fact becomes a line item (particulars in words, amounts in figures)",
        "Footing: single rule, total, double red rule, \u201CC/f to Fo. 48\u201D",
        "Margin notes in the left margin: initials, audit ticks, cross-references"
      ]
    },
    {
      id: "debit-credit-spread",
      name: "Debit | Credit spread",
      description: "The T-account as a double-page spread: the left page Dr. (what comes in / what is offered), the right page Cr. (what it costs / what is required), balanced on one baseline at the bottom.",
      grid: "2 equal pages separated by an 8px spine in panel colour; each page its own ruled table (date / particulars / amount); identical 28px row pitch on both sides so lines align across the spine.",
      structure: [
        "Running head across both pages: \u201CDr.\u201D left, account name centred, \u201CCr.\u201D right",
        "Left page entries (e.g. what is offered, included, received)",
        "Right page entries (e.g. prices, conditions, obligations)",
        "Balancing line: both totals on the same baseline, each with its double rule",
        "Below the spread: a trial-balance summary table of the sections"
      ]
    },
    {
      id: "columnar-workpaper",
      name: "Columnar workpaper",
      description: "An accountant\u2019s analysis pad: one description column plus many narrow numeric columns with abbreviated headings, audit ticks and cross-footed totals.",
      grid: "Description column 280px + 6\u201312 numeric columns of 88px; horizontally scrollable on mobile with the description column sticky; 80px header row for abbreviated column heads.",
      structure: [
        "Pad header boxes: Prepared by / Approved by / Date / Page",
        "Column headings: 6\u201312 categories, abbreviated and numbered (1)\u2026(12)",
        "Rows: line items with figures and audit ticks",
        "Cross-foot row: column totals plus a circled grand total",
        "Notes keyed with letters a\u2013d to specific cells"
      ]
    }
  ],
  type: [
    {
      id: "roundhand-ledger",
      name: "Pinyon Script + EB Garamond",
      display: {
        family: "Pinyon Script",
        weights: [400],
        fallback: '"Snell Roundhand", cursive',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      cjk: { display: "Ma Shan Zheng", body: "Noto Serif SC" },
      notes: "Pinyon Script only for account heads and the grand-total line at 36\u201356px, never all caps (script capitals in caps are illegible). EB Garamond 400 for particulars at 17px on the 28px pitch; every amount in EB Garamond 500 with font-variant-numeric: lining-nums tabular-nums, right-aligned, decimals in their own 32px column. Dr. / Cr. / B/f / C/f in italic."
    },
    {
      id: "columnar-gothic",
      name: "Libre Franklin + IBM Plex Mono",
      display: {
        family: "Libre Franklin",
        weights: [700, 800],
        fallback: '"Franklin Gothic Medium", Arial, sans-serif',
        source: "google"
      },
      body: {
        family: "Libre Franklin",
        weights: [400, 500],
        fallback: '"Franklin Gothic Book", Arial, sans-serif',
        source: "google"
      },
      mono: {
        family: "IBM Plex Mono",
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Libre Franklin 800 uppercase for printed column headings at 11\u201312px with 0.06em tracking, and 700 at 32\u201348px for page titles. Body Libre Franklin 400 at 15px on 28px. Every figure in IBM Plex Mono with tabular figures, right-aligned; negatives in parentheses \u201C(1,240.00)\u201D, never a minus sign."
    },
    {
      id: "posting-machine",
      name: "Red Hat Mono + Atkinson Hyperlegible",
      display: {
        family: "Red Hat Mono",
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Atkinson Hyperlegible",
        weights: [400, 700],
        fallback: "Verdana, Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Red Hat Mono 500/700 for every figure, date and the account number \u2014 it plays the posting machine\u2019s print head; machine labels \u201COLD BAL.\u201D / \u201CNEW BAL.\u201D uppercase at 12px, 0.04em. Dates printed as \u201CNOV 01 26\u201D. Atkinson Hyperlegible 400/700 for prose at 16px/1.5. Credits printed in the second ribbon colour (accent2), debits in ink."
    }
  ],
  palettes: [
    {
      id: "buff-and-red",
      name: "Buff ledger, red & blue ruling",
      colors: {
        paper: "#f1e6c8",
        ink: "#221a14",
        muted: "#5b4a36",
        accent: "#b0262a",
        accent2: "#1f4d8c",
        rule: "#a9bccf",
        panel: "#e8d9b0"
      },
      usage: "Buff paper (\u224885%); pale blue feint (rule) for horizontal lines; blue (accent2) for column boundaries and printed headings; red (accent) for money-column verticals, double rules under totals and overdrawn figures; iron-gall ink for all writing."
    },
    {
      id: "eye-ease-green",
      name: "Eye-ease green pad",
      colors: {
        paper: "#e8f0dc",
        ink: "#14231a",
        muted: "#3f5546",
        accent: "#c23b22",
        accent2: "#2a6b3f",
        rule: "#8fb592",
        panel: "#d6e6c4"
      },
      usage: "Pale green pad paper; green rules every row, a heavier accent2 line every fifth row; red only for totals and the \u201COVER / SHORT\u201D line; panel green for the printed header strip."
    },
    {
      id: "half-calf-binding",
      name: "Half-calf binding",
      colors: {
        paper: "#2a1a16",
        ink: "#f3e9d2",
        muted: "#c9b79a",
        accent: "#d4a64a",
        accent2: "#7fae8c",
        rule: "#5a3d33",
        panel: "#3a2620"
      },
      usage: "Oxblood leather ground (\u224880%); cream text as on paper spine labels; gilt (accent) for titles, totals and double rules; marbled-endpaper green (accent2) for positive balances only."
    }
  ],
  densities: ["compact", "packed"],
  scales: ["minor-third", "major-second"],
  motion: [
    {
      id: "ruling-off",
      name: "Ruling off",
      description: "When a total is first shown, the single rule draws left\u2192right, the figure appears, then the double red rule draws \u2014 a bookkeeper ruling off the column.",
      duration: "600ms",
      easing: "cubic-bezier(.6,0,.4,1)",
      reduced: "Rules and totals appear already drawn."
    },
    {
      id: "posting-carriage",
      name: "Posting carriage",
      description: "Rows print one at a time with a carriage jump: each full row appears at once after a 90ms step and the card advances one 28px line.",
      duration: "90ms",
      easing: "steps(1, end)",
      reduced: "All rows visible immediately."
    },
    {
      id: "audit-tick",
      name: "Audit tick",
      description: "Hovering a row draws a handwritten tick in the margin (SVG stroke) and tints the row with the panel colour.",
      duration: "180ms",
      easing: "cubic-bezier(.3,.6,.3,1)",
      reduced: "Show the tick and tint without the stroke animation."
    }
  ],
  motifs: [
    {
      id: "double-red-rule",
      name: "Double rule under totals",
      description: "A 1px ink rule above every total and a 3px double red rule beneath it \u2014 the full stop of the genre."
    },
    {
      id: "split-money-columns",
      name: "Split money columns",
      description: "Amount columns split by a red vertical into whole units and two-digit decimals; the currency sign appears only at the column head, never on each line."
    },
    {
      id: "folio-references",
      name: "Folio refs & audit ticks",
      description: "Handwritten ticks, \u201CFo. 47\u201D cross-references and initials in the margin tying entries to each other."
    }
  ],
  anchors: [
    {
      id: "carried-balance",
      name: "Balance carried forward",
      description: "The first screen ends on one huge carried-forward figure (the key number from the facts) at 15\u201320vw in tabular figures, with its double red rule."
    },
    {
      id: "account-head",
      name: "Account head",
      description: "A full-width account heading across a ruled page, folio number at the right, the first ruled entries already visible below."
    },
    {
      id: "open-ledger",
      name: "Open ledger",
      description: "The first screen is the ruled table itself \u2014 column heads plus 8+ rows, no separate title block; the ruling is the hero."
    }
  ],
  surfaces: [
    {
      id: "feint-ruled",
      name: "Feint-ruled paper",
      description: "Horizontal feint lines every 28px across the whole page.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, transparent 0 27px, var(--rule) 27px 28px);"
    },
    {
      id: "pre-ruled-columns",
      name: "Pre-ruled money columns",
      description: "Red vertical money-column rules printed through the full height of the page behind the content.",
      css: "background-color: var(--paper); background-image: linear-gradient(90deg, transparent calc(100% - 241px), var(--accent) calc(100% - 241px) calc(100% - 240px), transparent calc(100% - 240px) calc(100% - 121px), var(--accent) calc(100% - 121px) calc(100% - 120px), transparent calc(100% - 120px));"
    },
    {
      id: "ledger-card-stock",
      name: "Ledger card stock",
      description: "Stiff posting-machine card with a printed tinted header band and a punched binder edge on the left.",
      css: "background-color: var(--paper); background-image: linear-gradient(var(--panel), var(--panel)), radial-gradient(circle, var(--rule) 5px, transparent 6px); background-size: 100% 72px, 24px 96px; background-position: 0 0, 8px 24px; background-repeat: no-repeat, repeat-y;"
    }
  ],
  must: [
    "Figures are right-aligned in tabular lining numerals; any total shown equals the sum of the figures above it.",
    "Content is presented as ruled entries (date \xB7 particulars \xB7 amount or count), not as paragraphs.",
    "Every total ends with a double rule."
  ],
  mustNot: [
    "No dashboards: no charts, KPI tiles, donut graphs or sparklines.",
    "No currency sign repeated on every line; no centred numbers.",
    "No invented amounts or balances \u2014 if the facts give no figures, use dates and counts."
  ]
};
var academicPaper = {
  id: "academic-paper",
  name: { zh: "\u5B66\u672F\u8BBA\u6587", en: "Academic paper" },
  family: "document",
  concept: {
    zh: "LaTeX \u6392\u51FA\u7684\u7814\u7A76\u8BBA\u6587\uFF1A\u6807\u9898\u548C\u4F5C\u8005\u5C45\u4E2D\uFF0C\u6458\u8981\u5355\u72EC\u6210\u5757\uFF0C\u7AE0\u8282\u6309 1\u30011.1 \u7F16\u53F7\uFF0C\u56FE\u6CE8\u8868\u6CE8\u90FD\u6709\u7F16\u53F7\uFF0C\u9875\u811A\u6709\u811A\u6CE8\uFF0C\u6587\u672B\u662F\u53C2\u8003\u6587\u732E\u3002\u53EF\u4FE1\u611F\u6765\u81EA\u4E25\u683C\u7684\u7F16\u53F7\u4F53\u7CFB\u548C\u4EA4\u53C9\u5F15\u7528\uFF0C\u800C\u4E0D\u662F\u88C5\u9970\u3002",
    en: "A research paper typeset in LaTeX: title and authors centred, a set-off abstract, sections numbered 1 and 1.1, numbered figure and table captions, footnotes and a references list. Authority comes from the numbering system and cross-references, not from decoration."
  },
  references: [
    "Donald Knuth, TeX and Computer Modern (1978\u201386); the AMS amsart document class",
    "Edward Tufte\u2019s handouts and the tufte-latex class (sidenotes, margin figures)",
    "Physical Review Letters and Nature two-column journal pages",
    "Simon Fear, the booktabs LaTeX package (1995) \u2014 three-rule tables",
    "arXiv preprints, 1991\u2013"
  ],
  keywords: ["\u6458\u8981", "\u7F16\u53F7\u7AE0\u8282", "\u56FE\u6CE8", "\u811A\u6CE8", "\u53C2\u8003\u6587\u732E", "\u4EA4\u53C9\u5F15\u7528", "\u4E09\u7EBF\u8868"],
  tokens: {
    grid: "Text block 34em (\u2248 600px) single column, or 2 \xD7 20em columns with a 2em gap; page margins in the LaTeX article proportion (text width \u2248 62% of the page); baseline = 1.25 \xD7 body size; floats span one column or the full text width.",
    radius: "0 everywhere.",
    border: "booktabs only: \\toprule and \\bottomrule 1.5px ink, \\midrule 1px ink, no vertical rules in tables; abstract framed by a 1px ink box or none; footnote separator 1px ink at 40% of the text width.",
    shadow: "none."
  },
  layouts: [
    {
      id: "single-column-article",
      name: "Article (amsart)",
      description: "Single-column article: centred title block, abstract, then numbered sections with numbered equations or statements and floats placed at the top of the column.",
      grid: "One 34em column centred; section numbers hang in a 3em left gutter; figures at column width with captions below; tables with captions above; equation numbers flush right.",
      structure: [
        "Title block: title, authors with superscript affiliations, date",
        "Abstract indented 2em both sides with a run-in bold \u201CAbstract.\u201D",
        "1 Introduction \u2192 2 \u2026 numbered sections with 2.1 subsections; numbered statements (1) at the right margin",
        "Figure 1 / Table 1 floats, each referenced in the text (\u201Csee Fig. 1\u201D)",
        "References [1]\u2026 with hanging indents; footnotes under a short rule"
      ]
    },
    {
      id: "tufte-handout",
      name: "Tufte handout",
      description: "A wide right margin carries sidenotes, margin figures and citations next to the text they support; there are no footnotes at the bottom.",
      grid: "12 columns: text spans 1\u20137 (\u2248 55%), sidenote column spans 9\u201312; full-width figures span 1\u201312; sidenote numbers superscript in text and on the baseline in the margin.",
      structure: [
        "Title in large italic + author in small caps; an epigraph instead of an abstract",
        "Section headings in italic; paragraphs open with \u201Cnew thought\u201D small caps",
        "Body paragraphs with sidenotes and margin figures alongside",
        "One full-width figure or small-multiples table",
        "Bibliography as short sidenote citations plus a compact list at the end"
      ]
    },
    {
      id: "two-column-journal",
      name: "Two-column journal",
      description: "A journal page: running head with journal name, volume and DOI, full-width title and abstract, then a two-column body with spanning figures and page numbers in the footer.",
      grid: "2 columns \xD7 20em, 2em gutter, max 1000px; running head over a 1px rule; spanning figures/tables across both columns; one column on mobile.",
      structure: [
        "Running head: journal name, \u201CVol. 12, No. 3, pp. 211\u2013229\u201D, DOI",
        "Full-width title, authors, received / accepted dates, abstract in a tinted panel",
        "Keywords line",
        "Two-column body with numbered sections and a spanning Table 1",
        "Acknowledgements, references in smaller type over two columns, corresponding-author footnote"
      ]
    }
  ],
  type: [
    {
      id: "stix-ams",
      name: "STIX Two Text + IBM Plex Mono",
      display: {
        family: "STIX Two Text",
        weights: [400, 600, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: "google"
      },
      body: {
        family: "STIX Two Text",
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: "google"
      },
      mono: {
        family: "IBM Plex Mono",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Title STIX Two Text 600 at 1.6\xD7 body, sentence case, centred; section heads 700 at 1.2\xD7 with hanging numbers \u201C2.1\u201D; body 400 at 17px/1.45, justified with hyphens: auto; abstract at 0.9\xD7. \u201CFig. 1.\u201D / \u201CTable 1.\u201D labels bold, caption text 0.9\xD7. Tables in tabular-nums. Identifiers, DOIs and code in IBM Plex Mono at 0.88\xD7."
    },
    {
      id: "tufte-crimson",
      name: "Crimson Pro",
      display: {
        family: "Crimson Pro",
        weights: [400],
        italic: true,
        fallback: 'Palatino, "Book Antiqua", serif',
        source: "google"
      },
      body: {
        family: "Crimson Pro",
        weights: [400, 600],
        italic: true,
        fallback: 'Palatino, "Book Antiqua", serif',
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Crimson Pro 400 italic for the title (2.4\xD7) and section headings (1.4\xD7), never bold; body 400 at 19px/1.5, ragged-right; paragraph openers in font-variant-caps: all-small-caps with 0.05em tracking; sidenotes at 0.75\xD7 with the number on the baseline. Oldstyle figures (onum) in prose, lining in tables."
    },
    {
      id: "journal-sans-heads",
      name: "Public Sans + Source Serif 4",
      display: {
        family: "Public Sans",
        weights: [400, 700],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      body: {
        family: "Source Serif 4",
        weights: [400, 600],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Public Sans 700 for the title (1.9\xD7); section headings uppercase 700 at 0.85\xD7 with 0.06em tracking (\u201C2  METHODS\u201D); running heads and caption labels in Public Sans. Source Serif 4 400 at 16px/1.45 for body, justified; abstract in Public Sans 400 at 0.9\xD7. Tables in Public Sans 400 at 0.85\xD7 with tabular-nums."
    }
  ],
  palettes: [
    {
      id: "preprint-white",
      name: "Preprint white",
      colors: {
        paper: "#fdfdfb",
        ink: "#111111",
        muted: "#4a4a4a",
        accent: "#8c1515",
        accent2: "#1d5e3a",
        rule: "#222222",
        panel: "#f2f1ec"
      },
      usage: "Practically monochrome: ink on white for ~97% of the page. Dark red (accent) only for cross-reference links (Fig. 1, Eq. 3, \xA72); green (accent2) only for citation brackets [12]; panel for the abstract box."
    },
    {
      id: "offprint-cream",
      name: "Journal offprint",
      colors: {
        paper: "#f5f0e3",
        ink: "#1d1b17",
        muted: "#57514a",
        accent: "#0f4c5c",
        accent2: "#b5651d",
        rule: "#a59d8b",
        panel: "#ebe4d2"
      },
      usage: "Warm cream offprint stock; deep teal (accent) for the journal name, section numbers and figure linework; ochre (accent2) only for the one highlighted data series in figures; panel for the abstract and table header rows."
    },
    {
      id: "annotated-photocopy",
      name: "Annotated photocopy",
      colors: {
        paper: "#e4e3dd",
        ink: "#161616",
        muted: "#474744",
        accent: "#f2d43a",
        accent2: "#c3241d",
        rule: "#8d8d88",
        panel: "#d6d5ce"
      },
      usage: "A reading-pack photocopy: cool grey stock, toner-black text; highlighter yellow (accent) only as a background behind key sentences, never as text colour; red pen (accent2) for marginal notes, circled numbers and underlines; panel for the darker copier edge."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["minor-third", "major-second", "major-third"],
  motion: [
    {
      id: "cross-ref-box",
      name: "Cross-reference box",
      description: "Following \u201CFig. 2\u201D or \u201C[12]\u201D jumps to the target and draws a 2px accent box around it (hyperref link box) that disappears after 1.2s.",
      duration: "1200ms",
      easing: "steps(1, end)",
      reduced: "Jump without smooth scrolling; the box stays static until the next interaction."
    },
    {
      id: "sidenote-expand",
      name: "Sidenote expand",
      description: "On narrow screens, tapping a sidenote number opens the note inline beneath the line, height stepping from 0 to its content.",
      duration: "160ms",
      easing: "cubic-bezier(.2,.6,.2,1)",
      reduced: "Expand instantly."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion: links are coloured, hover adds a 1px underline.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "numbered-captions",
      name: "Numbered captions",
      description: "Run-in bold \u201CFigure 3.\u201D / \u201CTable 2.\u201D labels with smaller caption text; every float is referenced from the body."
    },
    {
      id: "booktabs-tables",
      name: "Three-rule tables",
      description: "Tables with only top, mid and bottom rules, no verticals, numbers aligned on the decimal point, units in the column head."
    },
    {
      id: "footnote-apparatus",
      name: "Footnotes & references",
      description: "Superscript numbers or daggers linking to footnotes under a short rule; a numbered reference list with hanging indents and identifiers in mono."
    }
  ],
  anchors: [
    {
      id: "title-abstract",
      name: "Title + abstract",
      description: "The first screen is the centred title block plus the set-off abstract \u2014 dense, quiet and complete."
    },
    {
      id: "figure-one",
      name: "Figure 1",
      description: "The first screen leads with a full-width Figure 1 (diagram, plot or table of the key facts) and its numbered caption, with a modest title above."
    },
    {
      id: "main-result",
      name: "Main result",
      description: "A framed \u201CProposition 1 (Main result).\u201D or \u201CFinding 1.\u201D in italic directly under the title \u2014 the central claim of the page stated once, formally."
    }
  ],
  surfaces: [
    {
      id: "pdf-page",
      name: "PDF page",
      description: "A white page on a grey reader background with a hairline edge, like a PDF at 100% zoom.",
      css: "body { background: var(--panel); } main { background: var(--paper); max-width: 816px; margin: 32px auto; padding: 96px 72px; outline: 1px solid var(--rule); }"
    },
    {
      id: "photocopy-toner",
      name: "Photocopy toner",
      description: "Grey stock with toner speckle and a darker band along the spine edge.",
      css: "background-color: var(--paper); background-image: linear-gradient(90deg, rgba(0,0,0,.16), transparent 48px), radial-gradient(rgba(0,0,0,.06) 1px, transparent 1px); background-size: 100% 100%, 4px 4px;"
    },
    {
      id: "coated-journal",
      name: "Coated journal stock",
      description: "Smooth bright stock, no texture; the abstract sits in a flat tinted panel and the running head is a printed rule."
    }
  ],
  must: [
    "Sections, figures and tables are numbered, and every one is referenced in the text.",
    "A delimited abstract (or an epigraph in the Tufte layout) precedes section 1.",
    "Tables use only horizontal rules.",
    "Claims are tied to sources listed in the references, taken from the facts."
  ],
  mustNot: [
    "No cards, badges, icons or call-to-action buttons; links are inline text.",
    "No coloured section backgrounds; colour is limited to links and figure data.",
    "No invented authors, DOIs, journals or citations that are not in the facts."
  ]
};
var apothecaryLabel = {
  id: "apothecary-label",
  name: { zh: "\u836F\u623F\u6807\u7B7E", en: "Apothecary label" },
  family: "document",
  concept: {
    zh: "\u5341\u4E5D\u81F3\u4E8C\u5341\u4E16\u7EAA\u521D\u836F\u623F\u7684\u74F6\u7B7E\u4E0E\u5904\u65B9\u7B3A\uFF1A\u82B1\u8FB9\u6846\u91CC\u662F\u62C9\u4E01\u836F\u540D\u3001\u5242\u91CF\u8868\u548C\u74F6\u53F7\uFF0C\u5976\u6CB9\u8272\u7EB8\u4E0A\u5370\u58A8\u7EFF\u6216\u6731\u7EA2\u3002\u4E00\u5207\u90D1\u91CD\u3001\u5BF9\u79F0\u3001\u7F16\u4E86\u53F7\uFF0C\u50CF\u836F\u67DC\u4E0A\u4E00\u6392\u6392\u5199\u7740\u540D\u5B57\u7684\u836F\u74F6\u3002",
    en: "Nineteenth- and early twentieth-century pharmacy labels and prescription slips: Latin drug names inside ornamental borders, dosage tables and bottle numbers printed in dark green or vermilion on cream stock. Everything is formal, symmetrical and numbered, like a shelf of named bottles."
  },
  references: [
    "Victorian druggists\u2019 labels in the Wellcome Collection",
    "Shop-round bottles with gilt labels on black glass, 19th-century English pharmacies",
    "The British Pharmacopoeia, first edition (1864) \u2014 Latin nomenclature and abbreviations",
    "UK Pharmacy Act 1868 \u201CPOISON\u201D labelling and fluted poison bottles",
    "Boots the Chemist and Rexall drug-store packaging, 1920s\u201340s"
  ],
  keywords: ["\u62C9\u4E01\u836F\u540D", "\u82B1\u8FB9\u6846", "\u5242\u91CF\u8868", "\u7F16\u53F7\u74F6\u7B7E", "\u5904\u65B9\u7B3A", "\u5976\u6CB9\u8272", "\u58A8\u7EFF"],
  tokens: {
    grid: "Symmetric axis: text centred inside labels; labels in fixed proportions (rectangle 5:3, oval 3:2, tall 2:3); pages arranged as a shelf grid of 3\u20134 labels per row with 24px gaps and a shelf rule under each row; 6px baseline inside labels.",
    radius: "0 for rectangular labels; oval labels border-radius 50%; ornamental corners via an 8px notched clip-path polygon \u2014 never generic rounded corners.",
    border: "Label frame = 3px double var(--accent) outer border + 1px inner rule inset 6px (outline: 1px solid var(--accent); outline-offset: -9px); dosage tables 1px accent rules; leaders 1px dotted.",
    shadow: "none. Shelves are a hard 3px rule-colour ledge under each row; no blur."
  },
  layouts: [
    {
      id: "shelf-of-rounds",
      name: "Shelf of shop rounds",
      description: "The page is the dispensary shelf: each section is a labelled bottle (label only, no bottle drawing needed), arranged in numbered rows with shelf ledges between them.",
      grid: "4 columns on desktop (2 tablet, 1 mobile); labels 5:3 or oval 3:2 centred in each cell; 3px shelf rule under each row; row numerals \u201CI, II, III\u201D hanging in the left margin.",
      structure: [
        "Fascia: pharmacy/subject name on a long rectangular label with a trade line and an \u201CEst.\u201D date",
        "Shelf I: 3\u20134 labels, each a section title in abbreviated Latin-style caps with the plain name beneath",
        "Shelf II: labels holding facts (hours, services, prices) as dosage lines with leaders",
        "Poison cabinet: a separate red-framed label for warnings and conditions",
        "Counter: a prescription slip with address and contact"
      ]
    },
    {
      id: "prescription-slip",
      name: "Prescription slip",
      description: "One tall Rx blank as the page: letterhead, \u211E symbol, numbered prescription lines, directions, signature and a perforated counterfoil.",
      grid: "Single column 560px (A6 portrait, 1:1.41) centred on a panel-coloured counter; 24px inner margin; lines on a 28px pitch; perforated stub at the foot.",
      structure: [
        "Letterhead: name, address and registration number in small caps",
        "Patient and date lines with dotted leaders",
        "Large \u211E, then numbered lines: item \xB7 quantity (abbreviations such as \u201Cq.s.\u201D, \u201Cad\u201D)",
        "\u201CSig.\u201D directions line in italic",
        "Signature line, then a perforated tear-off counterfoil repeating the prescription number"
      ]
    },
    {
      id: "dosage-chart",
      name: "Dosage chart broadside",
      description: "A wall chart: an ornate cartouche header and a long ruled table of numbered items with columns for doses or prices, grouped under Latin section heads.",
      grid: "12 columns; cartouche spans 8, centred; table spans 12 with columns No. (60px) / Name (flex) / Adult / Child / Price, 32px rows; ornamental rule between groups.",
      structure: [
        "Ornate cartouche header with the subject name",
        "\u201CDirections for use\u201D paragraph in small type",
        "Numbered table \u2014 the main content \u2014 grouped under Latin-style section heads",
        "Footer label with warnings in vermilion and the dispenser\u2019s name",
        "Bottle-number index along the bottom edge"
      ]
    }
  ],
  type: [
    {
      id: "fell-druggist",
      name: "IM Fell English SC + IM Fell English",
      display: { family: "IM Fell English SC", weights: [400], fallback: "Georgia, serif", source: "google" },
      body: {
        family: "IM Fell English",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "IM Fell English SC for Latin-style names and label titles, 0.08em tracking, abbreviated with full stops (\u201CTINCT. CARDAM. CO.\u201D), 22\u201348px; IM Fell English roman and italic for English names and directions at 17px/1.45 \u2014 keep its irregular inking. Oldstyle figures as supplied. Everything centred inside labels."
    },
    {
      id: "bodoni-chemist",
      name: "Libre Bodoni + Sorts Mill Goudy",
      display: {
        family: "Libre Bodoni",
        weights: [400, 700],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: "google"
      },
      body: {
        family: "Sorts Mill Goudy",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Libre Bodoni 700 uppercase for the pharmacy name and big bottle numbers (\u201CNo. 14\u201D) at 32\u201372px, 0.02em tracking; Libre Bodoni 400 italic for the Latin-style line. Sorts Mill Goudy roman/italic body at 17px/1.5. Dosage tables in Libre Bodoni 400 with lining numerals, doses right-aligned."
    },
    {
      id: "gilt-roman",
      name: "Cinzel + EB Garamond",
      display: {
        family: "Cinzel",
        weights: [600, 700],
        fallback: '"Trajan Pro", Georgia, serif',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Ma Shan Zheng", body: "Noto Serif SC" },
      notes: "Cinzel 600/700 for shop-round inscriptions only \u2014 capitals by design, 0.14em tracking, 18\u201340px, never for sentences. EB Garamond 400/500 with italic for everything readable at 18px/1.5; small caps (font-variant-caps: small-caps) for abbreviations like \u201CB.P.\u201D and \u201CPh.C.\u201D."
    }
  ],
  palettes: [
    {
      id: "cream-bottle-green",
      name: "Cream & bottle green",
      colors: {
        paper: "#f3ecd6",
        ink: "#12261c",
        muted: "#4a5a4c",
        accent: "#1f4a33",
        accent2: "#a8322a",
        rule: "#1f4a33",
        panel: "#e6dcbc"
      },
      usage: "Cream label stock (\u224880%); dark bottle green for all type, frames and table rules; vermilion (accent2) only for \u201CPOISON\u201D, \u201CNOT TO BE TAKEN\u201D and the \u211E (\u2264 3%); panel for the counter and shelf background."
    },
    {
      id: "gilt-black-glass",
      name: "Gilt on black glass",
      colors: {
        paper: "#141412",
        ink: "#efe2b8",
        muted: "#c2b07c",
        accent: "#c99a3e",
        accent2: "#8a1f1f",
        rule: "#c99a3e",
        panel: "#23211c"
      },
      usage: "Black glass ground; gilt (accent) for label frames, inscriptions and rules; pale gold ink for readable text; deep red (accent2) only as a solid fill behind poison labels with gilt text on top, never as text on black."
    },
    {
      id: "poison-red-label",
      name: "Poison red & cobalt",
      colors: {
        paper: "#fbf4ec",
        ink: "#2a0c0a",
        muted: "#6a3a33",
        accent: "#b3201b",
        accent2: "#1b4a7a",
        rule: "#b3201b",
        panel: "#f2ddd2"
      },
      usage: "White label stock; vermilion frames and headings (\u224815%); near-black brown text; cobalt (accent2) for bottle numbers and a cobalt-glass shelf band; pink-tinted panel for dosage-table headers."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fourth", "augmented-fourth"],
  motion: [
    {
      id: "label-paste",
      name: "Label pasting",
      description: "On load each label settles onto its bottle: scale 1.02 \u2192 1 and rotation \u22121\xB0 \u2192 0 in one move, as if pressed flat by a thumb.",
      duration: "200ms",
      easing: "cubic-bezier(.2,.9,.3,1)",
      reduced: "Labels appear flat; no scale or rotation."
    },
    {
      id: "bottle-turn",
      name: "Bottle turn",
      description: "Hovering a shop-round label turns the bottle to show its back label (plain name, directions) with a rotateY 180\xB0 flip.",
      duration: "450ms",
      easing: "cubic-bezier(.4,0,.2,1)",
      reduced: "Show front and back labels stacked; no flip."
    },
    {
      id: "still",
      name: "Still shelf",
      description: "No motion. Hover darkens the label frame from accent to ink.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "ornamental-frames",
      name: "Ornamental label frames",
      description: "Double-rule frames with corner fleurons (\u2766 U+2766 or small SVG acanthus corners) in rectangle, oval and octagonal label shapes."
    },
    {
      id: "rx-numbering",
      name: "\u211E and bottle numbers",
      description: "The \u211E glyph (U+211E), \u201CNo. 1\u201348\u201D bottle numbers and Latin abbreviations (t.d.s., p.r.n., q.s.) used as structural labels."
    },
    {
      id: "dosage-leaders",
      name: "Dosage leaders",
      description: "Dotted leaders joining each item to its dose, quantity or price, with strict right alignment."
    }
  ],
  anchors: [
    {
      id: "shop-round-label",
      name: "Shop-round label",
      description: "One large gilt or printed label (oval or rectangle) centred on the first screen holding the name in Latin-style capitals, with a bottle number beneath."
    },
    {
      id: "rx-blank",
      name: "Prescription blank",
      description: "The first screen is the top of the Rx slip: letterhead, a large \u211E and the first three numbered lines."
    },
    {
      id: "chart-cartouche",
      name: "Chart cartouche",
      description: "An ornamental cartouche header above a dosage-style table whose first rows are visible on the first screen."
    }
  ],
  surfaces: [
    {
      id: "laid-label-paper",
      name: "Laid label paper",
      description: "Cream laid paper with faint chain lines every 24px and fine laid lines.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 1px, transparent 1px 24px), repeating-linear-gradient(0deg, rgba(0,0,0,.02) 0 1px, transparent 1px 3px);"
    },
    {
      id: "black-glass",
      name: "Black glass",
      description: "Deep black with one vertical highlight band, like the curve of a bottle.",
      css: "background-color: var(--paper); background-image: linear-gradient(90deg, transparent 18%, rgba(255,255,255,.06) 22%, transparent 30%);"
    },
    {
      id: "gummed-label",
      name: "Gummed label stock",
      description: "Crisp printed labels on a contrasting ground: each label is paper colour sitting on the panel colour, which plays the bottle.",
      css: "body { background: var(--panel); } .label { background: var(--paper); border: 3px double var(--accent); outline: 1px solid var(--accent); outline-offset: -9px; }"
    }
  ],
  must: [
    "Every section title sits inside a label shape with a double-rule frame.",
    "At least one numbered list or table of items with quantities, doses or prices joined by leaders.",
    "Warnings and conditions are set in the warning colour inside their own label."
  ],
  mustNot: [
    "No medical claims or dosages beyond the facts \u2014 the Rx devices are typographic, not advice.",
    "No \u201Cwellness\u201D look: no pastel gradients, watercolour botanicals or leaf glyphs.",
    "No asymmetric, off-centre text inside labels."
  ]
};
var bureaucraticForm = {
  id: "bureaucratic-form",
  name: { zh: "\u516C\u6587\u8868\u683C", en: "Bureaucratic form" },
  family: "document",
  concept: {
    zh: "\u653F\u5E9C\u8868\u683C\u4E0E\u516C\u6587\uFF1A\u89D2\u4E0A\u7684\u8868\u683C\u7F16\u53F7\u3001\u4E00\u683C\u4E00\u683C\u7684\u586B\u5199\u6846\u3001\u5C0F\u53F7\u5927\u5199\u7684\u586B\u8868\u8BF4\u660E\u3001\u52FE\u9009\u6846\u3001\u5370\u7AE0\u3001\u590D\u5199\u8054\u548C\u865A\u7EBF\u6495\u89D2\u3002\u9875\u9762\u50CF\u4E00\u4EFD\u9700\u8981\u9010\u9879\u586B\u5199\u7684\u6B63\u5F0F\u7533\u8BF7\uFF0C\u79E9\u5E8F\u672C\u8EAB\u5C31\u662F\u6743\u5A01\u3002",
    en: "Government forms and official documents: a form number in the corner, boxed fields, instructions in small capitals, checkboxes, rubber stamps, carbon copies and perforated tear-offs. The page reads like an official application you work through line by line; order itself is the authority."
  },
  references: [
    "IRS Form 1040 and US federal forms printed by the Government Printing Office",
    "British HMSO forms with \u201CFor official use only\u201D panels",
    "GB/T 9704-2012 \u515A\u653F\u673A\u5173\u516C\u6587\u683C\u5F0F\uFF08\u7EA2\u5934\u6587\u4EF6\uFF09",
    "Carbonless triplicate sets on white / canary / pink NCR paper",
    "Terry Gilliam, Brazil (1985) \u2014 Form 27B/6"
  ],
  keywords: ["\u8868\u683C\u7F16\u53F7", "\u586B\u5199\u6846", "\u52FE\u9009\u6846", "\u5370\u7AE0", "\u590D\u5199\u8054", "\u6495\u89D2\u7EBF", "\u586B\u8868\u8BF4\u660E"],
  tokens: {
    grid: "Form grid: 12 columns, 0 gutter \u2014 fields are cells sharing 1px borders (border-collapse); row heights 40px (single-line field) or 80px (multi-line); every field has a numbered label in its top-left corner at 10\u201311px.",
    radius: "0. Checkboxes are 14px squares. Only round seals use border-radius 50%.",
    border: "Cells 1px solid var(--accent) in dropout palettes, otherwise var(--ink); part headers as reversed 24px bars; heavy 3px rule under the form title; perforations 1px dashed (4px/3px).",
    shadow: "none. Carbon copies peek out by a 16px offset with a 1px rule outline \u2014 no blur."
  },
  layouts: [
    {
      id: "numbered-field-form",
      name: "Numbered field form",
      description: "A single form: header with form number and issuing body, then Parts I\u2013III of boxed fields, each fact typed into a labelled field.",
      grid: "12-column cell grid, max 960px; fields span 3, 4, 6 or 12 columns; part bars full width; a 120px shaded right column \u201CFor official use only\u201D.",
      structure: [
        "Header: form number large top-left (e.g. \u201CForm 27-B\u201D), issuing body centred, reference number and year top-right",
        "Instruction line in small caps: \u201CREAD THE NOTES ON PAGE 2 BEFORE COMPLETING THIS FORM\u201D",
        "Part I \u2014 Identification: name, address and contact as filled fields",
        "Part II \u2014 Particulars: checkbox matrix and numbered fields with the real facts typed in",
        "Part III \u2014 Declaration: signature, date and stamp area, then a perforated receipt stub"
      ]
    },
    {
      id: "red-header-notice",
      name: "Red-header notice",
      description: "The \u7EA2\u5934 official document: issuing body in large red type, a red rule, document number, centred title, numbered paragraphs, and a round seal stamped over the date.",
      grid: "Single column \u2248 590px (156mm text block) centred; header block 120px; body at 28 CJK characters or 65ch per line; seal 120px circle overlapping the date block by 40%.",
      structure: [
        "Issuing body in large red display type centred, then a 2px red rule across the text width",
        "Document number line \u201C\u30142026\u301512 \u53F7\u201D centred under the rule",
        "Title centred, at most two lines",
        "Addressee line, then numbered paragraphs \u4E00\u3001\u4E8C\u3001\u4E09 with (\u4E00)(\u4E8C) sub-items",
        "Attachments list; date right-aligned with the round seal across it; \u6284\u9001 block between two rules at the foot"
      ]
    },
    {
      id: "carbon-triplicate",
      name: "Carbon triplicate",
      description: "A three-part carbonless set fanned out: white original on top, canary and pink copies peeking beneath, each copy labelled for its recipient; sections are the copies.",
      grid: "Three stacked sheets, each offset 16px right and 16px down; top sheet a 12-column field grid max 880px; copy labels in each sheet\u2019s bottom margin (\u201CCOPY 1 \u2014 APPLICANT\u201D).",
      structure: [
        "Top sheet header with a red serial number (\u201CN\xBA 004817\u201D)",
        "Fields with typed fill-in over small printed labels",
        "Second copy strip: only its label and one summary line visible",
        "Third copy strip: \u201CFILE COPY\u201D with stamp marks",
        "Perforated tear-off strip with retention instructions"
      ]
    }
  ],
  type: [
    {
      id: "federal-public",
      name: "Public Sans + Courier Prime",
      display: {
        family: "Public Sans",
        weights: [700, 800],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      body: { family: "Public Sans", weights: [400, 600], fallback: "Arial, sans-serif", source: "google" },
      mono: {
        family: "Courier Prime",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Public Sans 800 for form numbers and part bars (uppercase, 0.02em), 700 for the form title at 28\u201340px; field labels Public Sans 600 at 10\u201311px uppercase with 0.06em tracking, field number first (\u201C7a\u201D); instructions Public Sans 400 at 12px with font-variant-caps: all-small-caps. Filled-in values in Courier Prime at 15px, as if typed into the box."
    },
    {
      id: "formular-condensed",
      name: "IBM Plex Sans Condensed + IBM Plex Sans",
      display: {
        family: "IBM Plex Sans Condensed",
        weights: [600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: { family: "IBM Plex Sans", weights: [400, 500], fallback: "Arial, sans-serif", source: "google" },
      mono: {
        family: "IBM Plex Mono",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "IBM Plex Sans Condensed 700 for titles and part bars at 24\u201336px; IBM Plex Sans 400 body at 15px/1.4; IBM Plex Mono for reference numbers, ISO dates (2026-11-01) and field values with tabular figures. For red-header notices the CJK issuing body is Noto Serif SC 900 (standing in for \u65B9\u6B63\u5C0F\u6807\u5B8B), body text 16px."
    },
    {
      id: "typed-carbon",
      name: "Courier Prime",
      display: {
        family: "Courier Prime",
        weights: [700],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      body: {
        family: "Courier Prime",
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Everything typed: Courier Prime 700 uppercase for titles and headers, never larger than 28px (a typewriter has one size; hierarchy is CAPS, underlining and spacing); body 400 at 15px with line-height 2 (double-spaced). Pre-printed labels in Courier Prime 400 at 11px uppercase with 0.1em tracking. Blanks shown as typed underscores."
    }
  ],
  palettes: [
    {
      id: "dropout-green",
      name: "Dropout-ink green",
      colors: {
        paper: "#fafcf6",
        ink: "#121a14",
        muted: "#445247",
        accent: "#2d7a4b",
        accent2: "#b23a2e",
        rule: "#8fc0a0",
        panel: "#e6f1e8"
      },
      usage: "The pre-printed form (labels, boxes, part bars) in dropout green (accent \u2248 20%); filled-in data in ink; red (accent2) only for the serial number and \u201COFFICIAL USE ONLY\u201D stamps; pale green panel for shaded official-use cells."
    },
    {
      id: "carbonless-canary",
      name: "Canary copy",
      colors: {
        paper: "#fbf0a8",
        ink: "#1f1d14",
        muted: "#575236",
        accent: "#b8322a",
        accent2: "#2b3448",
        rule: "#a39a5a",
        panel: "#f5e48a"
      },
      usage: "The whole sheet canary yellow; printed form in dark olive ink; carbon-transferred fill-in in carbon blue-black (accent2); red (accent) for the serial number and \u201CCOPY 2\u201D label; deeper yellow panel for field shading."
    },
    {
      id: "red-header-white",
      name: "Red header on white",
      colors: {
        paper: "#f6f3ea",
        ink: "#151515",
        muted: "#4a4743",
        accent: "#c8161d",
        accent2: "#1f3a5f",
        rule: "#151515",
        panel: "#ebe6d8"
      },
      usage: "Plain document paper and black text; official red (accent) only for the issuing-body header, the rule beneath it and the round seal (\u22485%); navy (accent2) for handwritten approval notes; panel for the attachments and \u6284\u9001 block."
    }
  ],
  densities: ["compact", "regular", "packed"],
  scales: ["major-second", "minor-third", "perfect-fourth"],
  motion: [
    {
      id: "rubber-stamp",
      name: "Rubber stamp",
      description: "On submit or click a stamp (\u201CRECEIVED 01 NOV 2026\u201D) lands: scale 1.3 \u2192 1 and rotate to \u22128\xB0 while accelerating into the paper, then stops dead with uneven ink (SVG turbulence mask).",
      duration: "160ms",
      easing: "cubic-bezier(.55,0,1,.45)",
      reduced: "The stamp appears in place at full size; no scale."
    },
    {
      id: "carbon-transfer",
      name: "Carbon transfer",
      description: "Typing into a field on the top sheet makes the same text appear on the copy strip beneath, 60ms later and in the lower-contrast carbon colour.",
      duration: "60ms",
      easing: "linear",
      reduced: "The copy updates at the same moment, with no delay."
    },
    {
      id: "tear-off",
      name: "Perforated tear-off",
      description: "Clicking the receipt stub tears it along the perforation: the stub drops 8px and rotates 3\xB0 from one corner, leaving a jagged edge.",
      duration: "260ms",
      easing: "cubic-bezier(.3,0,.6,1)",
      reduced: "The stub shows a separated (solid) edge instead of moving."
    }
  ],
  motifs: [
    {
      id: "numbered-fields",
      name: "Numbered field boxes",
      description: "Every value lives in a bordered box with a tiny numbered label in its top-left corner (\u201C12b  Postal code\u201D)."
    },
    {
      id: "checkbox-matrix",
      name: "Checkbox matrix",
      description: "Options presented as rows of square checkboxes, the applicable ones marked with a typed \u201CX\u201D."
    },
    {
      id: "stamps-seals",
      name: "Stamps & seals",
      description: "Rectangular date stamps and round seals in accent ink, rotated \u22124\xB0 to \u221210\xB0, partly overlapping a field, with uneven ink."
    }
  ],
  anchors: [
    {
      id: "form-masthead",
      name: "Form masthead",
      description: "The first screen is the form header: giant form number, issuing body, year box, \u201CPlease print in black ink\u201D, and Part I fields starting below."
    },
    {
      id: "red-header",
      name: "Red header",
      description: "The issuing body in large red type with the red rule and document number filling the top third \u2014 the \u7EA2\u5934."
    },
    {
      id: "stamped-approval",
      name: "Stamped approval",
      description: "A completed form fragment with a large \u201CAPPROVED / \u5DF2\u6279\u51C6\u201D stamp crossing it diagonally as the hero gesture."
    }
  ],
  surfaces: [
    {
      id: "bond-paper",
      name: "Bond paper",
      description: "Smooth white government bond, no texture, crisp printed rules."
    },
    {
      id: "carbonless-copy",
      name: "Carbonless copy",
      description: "Coloured copy stock with slightly soft, bluish transferred text.",
      css: "background-color: var(--paper); color: var(--accent2); text-shadow: 0 0 .5px currentColor;"
    },
    {
      id: "photocopied-form",
      name: "Nth-generation photocopy",
      description: "Grey speckle and slightly thickened rules from repeated copying.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.2px); background-size: 5px 5px; filter: contrast(1.05);"
    }
  ],
  must: [
    "Each fact sits in a labelled, numbered field or a numbered paragraph \u2014 no free-floating promotional copy.",
    "The page carries a form or document number and a date or version.",
    "Instructions are set smaller than field values, in small caps or uppercase.",
    "Calls to action are phrased as form steps (\u201CComplete Part III\u201D, \u201CSubmit at counter 4\u201D)."
  ],
  mustNot: [
    "No friendly onboarding UI: no rounded progress pills, illustrations or mascots.",
    "No empty-looking fields when the facts supply the value \u2014 show the value typed in.",
    "No real agency names, emblems or seals; the issuing body comes only from the facts."
  ]
};
var labNotebook = {
  id: "lab-notebook",
  name: { zh: "\u65B9\u683C\u5B9E\u9A8C\u672C", en: "Lab notebook" },
  family: "craft",
  concept: {
    zh: "\u79D1\u7814\u5B9E\u9A8C\u8BB0\u5F55\u672C\u548C\u5DE5\u7A0B\u65B9\u683C\u8BA1\u7B97\u7EB8\uFF1A\u65B9\u683C\u5E95\uFF0C\u624B\u5199\u7ED3\u8BBA\u65C1\u8FB9\u662F\u7B49\u5BBD\u5B57\u7684\u6CE8\u91CA\uFF0C\u6709\u8349\u56FE\u3001\u6D4B\u91CF\u6570\u636E\u8868\uFF0C\u6BCF\u6761\u8BB0\u5F55\u5199\u65E5\u671F\u5E76\u7B7E\u540D\uFF0C\u5199\u9519\u4E86\u5C31\u5212\u4E00\u9053\u7EBF\u800C\u4E0D\u662F\u64E6\u6389\u3002\u9875\u9762\u662F\u4E00\u4EFD\u6B63\u5728\u8FDB\u884C\u3001\u53EF\u4EE5\u8FFD\u6EAF\u7684\u5DE5\u4F5C\u8BB0\u5F55\u3002",
    en: "The research lab notebook and the engineer\u2019s computation pad: grid paper, handwritten conclusions beside monospace annotations, sketches, measurement tables, every entry dated and signed, mistakes struck through with a single line instead of erased. The page is a running, traceable record of work."
  },
  references: [
    "Michael Faraday\u2019s laboratory notebooks (Royal Institution, 1820s\u201360s)",
    "National Brand green computation notebooks with 4\xD74 quad ruling",
    "Engineering computation pads on green eye-ease paper (Ampad, Roaring Spring)",
    "Bell Labs engineering notebooks with dated, witnessed pages",
    "Leonardo da Vinci, Codex Arundel \u2014 mirror-written notes beside sketches"
  ],
  keywords: ["\u65B9\u683C\u7EB8", "\u624B\u5199", "\u65E5\u671F\u7B7E\u540D", "\u5212\u7EBF\u66F4\u6B63", "\u6D4B\u91CF\u8868", "\u8349\u56FE", "\u7F16\u53F7\u9875"],
  tokens: {
    grid: "20px square grid (5mm) across the page, major line every 100px; every block\u2019s width and height are multiples of 20px; 80px left margin (4 squares) with a 1px red margin line; baselines sit on grid lines (line-height 20px or 40px).",
    radius: "0. Circles around results are hand-drawn SVG ellipses with uneven strokes, not CSS radii.",
    border: "Grid 1px var(--rule), major lines slightly darker; boxes drawn as 1.5px ink \u201Chand\u201D strokes (SVG paths with \xB11px jitter) or 1px ruled tables on the grid; answer boxes double-outlined (3px double ink).",
    shadow: "none. Taped-in printouts get translucent tape strips at the corners, not shadows."
  },
  layouts: [
    {
      id: "dated-entries",
      name: "Dated entries",
      description: "The page is a sequence of notebook entries, each opening with a date, a hand-underlined title and an entry number; sections are entries.",
      grid: "20px grid; content from x = 80px to max 880px; dates in the 0\u201380px margin; entries separated by a full-width hand-drawn line.",
      structure: [
        "Page header in mono: notebook title, \u201CBook 3 \xB7 p. 47\u201D, owner",
        "Entry 1 (dated): aim written by hand, then mono notes",
        "Entry 2: measurement table ruled to the grid, units in the header",
        "Entry 3: an SVG line sketch with labelled arrows",
        "Signature and \u201CWitnessed by / date\u201D block at the page foot"
      ]
    },
    {
      id: "computation-sheet",
      name: "Computation sheet",
      description: "An engineering computation pad page: header strip with Project / Subject / By / Date / Sheet boxes, then Given \u2192 Find \u2192 Solution steps with the result boxed.",
      grid: "Header strip 2 rows \xD7 4 cells of 200px; body 40 squares wide; working lines start at x = 80px, results right-aligned in a 160px column; answer box double-outlined.",
      structure: [
        "Header strip: PROJECT / SUBJECT / BY / DATE / SHEET n OF m",
        "Given: the known facts with units",
        "Find: the question the page answers",
        "Solution: numbered steps with mono working and handwritten remarks",
        "Answer box with the key figure, then \u201CChecked by\u201D initials"
      ]
    },
    {
      id: "sketchbook-spread",
      name: "Notebook spread",
      description: "A two-page spread: left page dense notes and a small table, right page one large sketch and taped-in items, with annotation arrows crossing the spine.",
      grid: "Two pages of 20-square-wide grids with a 40px spine; elements placed on grid coordinates; collapses to one page on mobile.",
      structure: [
        "Left page top: date and the question being investigated",
        "Left page: bulleted observations and a small results table",
        "Right page: one large annotated sketch or diagram",
        "Taped-in printout (photo or quotation) with tape corners",
        "Foot of the spread: circled conclusions and a \u201Cnext \u2192\u201D list"
      ]
    }
  ],
  type: [
    {
      id: "ballpoint-plex",
      name: "Caveat + IBM Plex Mono",
      display: {
        family: "Caveat",
        weights: [500, 700],
        fallback: '"Segoe Print", "Bradley Hand", cursive',
        source: "google"
      },
      body: {
        family: "IBM Plex Mono",
        weights: [400, 600],
        italic: true,
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Long Cang", body: "Noto Sans SC" },
      notes: "Caveat 500/700 for entry titles, conclusions and margin remarks at 28\u201344px on a 40px line so it sits on the grid; remarks may rotate \u22121\xB0 to 1\xB0. IBM Plex Mono 400 at 14px/20px for data, notes and tables (one line per grid row); units always with a space (\u201C12.5 mL\u201D)."
    },
    {
      id: "pencil-hyperlegible",
      name: "Reenie Beanie + Atkinson Hyperlegible",
      display: {
        family: "Reenie Beanie",
        weights: [400],
        fallback: '"Bradley Hand", cursive',
        source: "google"
      },
      body: {
        family: "Atkinson Hyperlegible",
        weights: [400, 700],
        italic: true,
        fallback: "Verdana, Arial, sans-serif",
        source: "google"
      },
      mono: {
        family: "Red Hat Mono",
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Zhi Mang Xing", body: "Noto Sans SC" },
      notes: 'Reenie Beanie only for short pencil scribbles \u2014 titles, circled results, \u201C?!\u201D \u2014 at 36\u201356px; it is light, so never below 28px. Atkinson Hyperlegible 400/700 body at 16px on 20px/40px multiples. Red Hat Mono for readings, timestamps and tables, tabular figures with slashed zero (font-feature-settings: "zero").'
    },
    {
      id: "block-caps-engineer",
      name: "Patrick Hand SC + B612",
      display: {
        family: "Patrick Hand SC",
        weights: [400],
        fallback: '"Segoe Print", cursive',
        source: "google"
      },
      body: { family: "B612", weights: [400, 700], fallback: "Verdana, sans-serif", source: "google" },
      mono: { family: "B612 Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Patrick Hand SC for engineering block-capital lettering \u2014 titles, labels, answers \u2014 at 20\u201340px with 0.04em tracking on the grid. B612 400 body at 15px/20px. Working in B612 Mono aligned on \u201C=\u201D. Corrections: line-through 1.5px in the red palette colour with the corrected value written after it, never deleted."
    }
  ],
  palettes: [
    {
      id: "green-computation",
      name: "Green computation pad",
      colors: {
        paper: "#eaf2df",
        ink: "#1a2419",
        muted: "#435343",
        accent: "#c2412d",
        accent2: "#2b5d8a",
        rule: "#a9c9a4",
        panel: "#dce9cf"
      },
      usage: "Eye-ease green paper with green grid (rule); graphite ink text; red (accent) for corrections, the margin line and answer boxes; blue ballpoint (accent2) for handwritten remarks and arrows; panel for header strips and taped-in printouts."
    },
    {
      id: "white-quad-blue",
      name: "White quad-ruled",
      colors: {
        paper: "#fbfbf8",
        ink: "#15181c",
        muted: "#4d5258",
        accent: "#1e4f8f",
        accent2: "#d1462f",
        rule: "#b6cde3",
        panel: "#eef3f7"
      },
      usage: "Bright white page with pale blue quad ruling; blue-black ink (accent) for handwriting (\u224820% of the text), black for mono notes; red (accent2) for the margin line and struck-through corrections; panel for tables."
    },
    {
      id: "aged-sepia",
      name: "Aged archive notebook",
      colors: {
        paper: "#efe3c7",
        ink: "#2a2117",
        muted: "#5f5242",
        accent: "#8a3b12",
        accent2: "#3e6d6a",
        rule: "#cdb88f",
        panel: "#e4d3ae"
      },
      usage: "Yellowed archival paper (\u224885%); brown-black ink; fountain-pen sepia (accent) for titles and circled results; faded teal (accent2) for later annotations in a different pen; tan grid lines."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["major-third", "perfect-fourth"],
  motion: [
    {
      id: "strike-correction",
      name: "Strike-through correction",
      description: "A value that changes (updated hours, a new price) keeps the old value, a line draws through it left \u2192 right, then the new value is written beside it.",
      duration: "300ms",
      easing: "cubic-bezier(.5,0,.5,1)",
      reduced: "Show the struck-through old value and the new value without animation."
    },
    {
      id: "pen-sketch",
      name: "Pen sketch",
      description: "SVG sketches and the circles around results draw in once with stroke-dashoffset at a hand-like, uneven pace.",
      duration: "900ms",
      easing: "cubic-bezier(.4,.1,.6,.9)",
      reduced: "Show the finished drawings."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion; links carry a static hand-drawn SVG underline that thickens on hover.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "graph-grid",
      name: "Graph-paper grid",
      description: "20px minor / 100px major grid behind everything, with every block aligned to it."
    },
    {
      id: "struck-corrections",
      name: "Struck-through corrections",
      description: "Errors left visible under a single line, with the correction and initials beside \u2014 the honesty of the record."
    },
    {
      id: "annotation-arrows",
      name: "Annotation arrows & circled numbers",
      description: "Hand-drawn curved arrows from margin notes to values; key results circled; entry numbers boxed."
    }
  ],
  anchors: [
    {
      id: "boxed-result",
      name: "Boxed result",
      description: "The first screen centres on one double-boxed answer (the key fact or figure) with the working trail above it."
    },
    {
      id: "entry-header",
      name: "Dated entry header",
      description: "A big handwritten date and entry title across the top, the mono \u201CBook / page\u201D header above and the first observations below."
    },
    {
      id: "annotated-sketch",
      name: "Annotated sketch",
      description: "A large single-weight line sketch of the subject with 4\u20136 handwritten labels and arrows fills the first screen."
    }
  ],
  surfaces: [
    {
      id: "quad-ruled",
      name: "Quad-ruled",
      description: "Uniform 20px grid across the whole page.",
      css: "background-color: var(--paper); background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 20px 20px;"
    },
    {
      id: "major-minor-grid",
      name: "Engineering grid",
      description: "Engineering pad grid: faint 20px squares with stronger 100px major lines.",
      css: "background-color: var(--paper); background-image: linear-gradient(rgba(60,110,60,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(60,110,60,.12) 1px, transparent 1px), linear-gradient(rgba(60,110,60,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(60,110,60,.24) 1px, transparent 1px); background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;"
    },
    {
      id: "taped-printout",
      name: "Taped-in printout",
      description: "White printout rectangles taped onto the page with translucent tape strips at two corners, rotated about 1\xB0.",
      css: '.taped { background: #fffefa; position: relative; transform: rotate(-.8deg); } .taped::before { content: ""; position: absolute; top: -10px; left: 24px; width: 80px; height: 22px; background: rgba(240,232,200,.65); transform: rotate(-4deg); }'
    }
  ],
  must: [
    "A visible grid underlies the page and blocks align to it.",
    "Every entry or section carries a date and an entry or page number.",
    "Handwriting is used for titles and remarks, mono for data \u2014 both appear on the first screen.",
    "At least one table of values with units in its header."
  ],
  mustNot: [
    "No erasing: corrections are struck through, never silently replaced.",
    "Handwriting faces never set paragraphs longer than two lines.",
    "No stock science imagery: no beakers, DNA helices or glowing molecules."
  ]
};
var herbariumSpecimen = {
  id: "herbarium-specimen",
  name: { zh: "\u690D\u7269\u6807\u672C", en: "Herbarium specimen" },
  family: "document",
  concept: {
    zh: "\u6807\u672C\u9986\u7684\u53F0\u7EB8\uFF1A\u538B\u5E73\u7684\u690D\u7269\u5C45\u4E2D\u56FA\u5B9A\u5728\u65E0\u9178\u53F0\u7EB8\u4E0A\uFF0C\u53F3\u4E0B\u89D2\u8D34\u7740\u91C7\u96C6\u6807\u7B7E\u2014\u2014\u659C\u4F53\u62C9\u4E01\u5B66\u540D\u3001\u91C7\u96C6\u4EBA\u3001\u65E5\u671F\u3001\u4EA7\u5730\u3001\u9986\u85CF\u53F7\uFF0C\u65C1\u8FB9\u8FD8\u6709\u6761\u5F62\u7801\u548C\u9274\u5B9A\u7B7E\u3002\u5927\u7247\u7559\u767D\u91CC\u53EA\u6709\u4E00\u4EF6\u4E3B\u89D2\u548C\u4E00\u5F20\u7CBE\u786E\u7684\u5C0F\u6807\u7B7E\u3002",
    en: "The herbarium sheet: a pressed plant centred and strapped onto acid-free mounting paper, a collection label in the bottom-right corner \u2014 Latin binomial in italics, collector, date, locality, accession number \u2014 plus a barcode and determination slips. A wide white field holding one specimen and one precise little label."
  },
  references: [
    "Royal Botanic Gardens, Kew herbarium sheets",
    "Smithsonian US National Herbarium labels and red type-specimen folders",
    "The Linnaean Herbarium, Linnean Society of London",
    "Anna Atkins, Photographs of British Algae: Cyanotype Impressions (1843)",
    "Natural History Museum, London \u2014 entomology drawer labels"
  ],
  keywords: ["\u53F0\u7EB8", "\u91C7\u96C6\u6807\u7B7E", "\u62C9\u4E01\u5B66\u540D", "\u9986\u85CF\u7F16\u53F7", "\u9274\u5B9A\u7B7E", "\u6761\u5F62\u7801", "\u7559\u767D"],
  tokens: {
    grid: "Each section is a mounting sheet in herbarium proportion 29 \xD7 42 (\u2248 1 : 1.45) portrait, max 720px wide; specimen centred in the upper 70%; label block anchored bottom-right at 40% of the sheet width; 8px baseline inside labels; sheets laid in a 2\u20133 column cabinet grid when several are shown.",
    radius: "0. Labels are cut rectangles; the only curves are the specimen itself and round accession stamps.",
    border: "Labels: 1px ink frame plus a 1px inner rule 3px inside (printed label border); paper straps as 6 \xD7 24px panel-colour strips across stems; sheet edge 1px var(--rule).",
    shadow: "No soft shadows. A pressed specimen may carry a hard 1px edge: filter: drop-shadow(0 1px 0 rgba(0,0,0,.15))."
  },
  layouts: [
    {
      id: "single-sheet",
      name: "Single mounted sheet",
      description: "One sheet per screen: the subject (image or drawing) centred, the data label bottom-right, determination slips stacked above it, barcode top-right.",
      grid: "Sheet 1:1.45 portrait centred, max 720px; specimen area = top 68%; label 300px wide, 24px from bottom and right; det. slips 260px wide stacked above; barcode 160 \xD7 40 top-right.",
      structure: [
        "Barcode and institution code top-right (\u201CHD 0047213\u201D)",
        "Specimen: one centred image or SVG drawing held by paper straps",
        "Determination slips: 1\u20132 smaller labels \u201CDet. \u2026, date\u201D",
        "Main label bottom-right: institution, name in italics, locality, date, collector and number \u2014 all from the facts",
        "Below the sheet: a short catalogue paragraph in small type"
      ]
    },
    {
      id: "cabinet-drawer",
      name: "Cabinet drawer",
      description: "Looking into a specimen drawer: a grid of unit trays, each holding one item with its own tiny label; the drawer label sits on the front edge.",
      grid: "4\u20136 columns of equal unit trays (1:1.2), 1px rule tray walls, 16px gaps; a 72px drawer-front strip at the bottom with a label holder.",
      structure: [
        "Drawer header: cabinet number, category name, \u201CDrawer 12 of 40\u201D",
        "Unit trays: 8\u201316 items, each with a tiny label (name in italics, number, date)",
        "One tray singled out with a red \u201CTYPE\u201D label",
        "Drawer front: brass label holder carrying the page title",
        "Index list below: catalogue numbers in order"
      ]
    },
    {
      id: "accession-register",
      name: "Accession register",
      description: "The register behind the collection: a ruled table of accession numbers, names and localities with a sheet thumbnail beside each entry.",
      grid: "Table max 1100px: No. 100px / thumbnail 80px / name (italic, flex) / locality / date / collector; 40px rows; sticky header; on mobile each row becomes a small label block.",
      structure: [
        "Register title: institution, volume and year range",
        "Ruled entries with accession numbers in mono",
        "One expanded entry: the full specimen sheet opened inline",
        "Notes: duplicates distributed, loans out",
        "Colophon: curator\u2019s signature line and stamp"
      ]
    }
  ],
  type: [
    {
      id: "kew-garamond",
      name: "EB Garamond + Courier Prime",
      display: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      mono: {
        family: "Courier Prime",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "EB Garamond italic for every scientific-style name (genus capitalised, epithet lowercase, authority in roman: \u201CQuercus robur L.\u201D); institution names in 500 caps with 0.12em tracking; body 400 at 16px/1.5; labels 13px/18px. Oldstyle figures in prose; accession numbers in Courier Prime at 13px."
    },
    {
      id: "goudy-typed",
      name: "Sorts Mill Goudy + Cutive Mono",
      display: {
        family: "Sorts Mill Goudy",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      body: { family: "Cutive Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Sans SC" },
      notes: "Sorts Mill Goudy for the printed label headers (\u201CPLANTS OF \u2026\u201D) in letter-spaced caps (0.1em) at 11\u201314px, and italic at 32\u201348px for the big name on the sheet. Everything filled in on labels in Cutive Mono 400 at 14px/20px, as if typed on a 1950s machine, with text-shadow: 0 0 .5px currentColor for ink spread."
    },
    {
      id: "digitised-plex",
      name: "IBM Plex Sans + IBM Plex Serif",
      display: {
        family: "IBM Plex Sans",
        weights: [300, 600],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      body: {
        family: "IBM Plex Serif",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      mono: {
        family: "IBM Plex Mono",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Modern digitisation labels: IBM Plex Sans 600 for field labels (uppercase, 0.06em, 11px) and 300 at 40\u201364px for the page-title name; IBM Plex Serif italic for names, roman for body at 16px/1.5; IBM Plex Mono for the barcode\u2019s human-readable line, catalogue numbers and coordinates (\u201C51.4787\xB0 N, 0.2956\xB0 W\u201D)."
    }
  ],
  palettes: [
    {
      id: "archival-white",
      name: "Archival white sheet",
      colors: {
        paper: "#f8f6ef",
        ink: "#1b1a17",
        muted: "#55524a",
        accent: "#8a2a1e",
        accent2: "#3d5a3a",
        rule: "#c8c2b2",
        panel: "#efe8d4"
      },
      usage: "The acid-free sheet dominates (\u2265 75% \u2014 it is the white space); near-black ink for labels; red (accent) only for \u201CTYPE\u201D labels and the accession stamp; specimen green (accent2) for the plant drawing; cream panel for labels and determination slips."
    },
    {
      id: "foxed-antique",
      name: "Foxed antique sheet",
      colors: {
        paper: "#eadcbd",
        ink: "#2a1e12",
        muted: "#5d4a33",
        accent: "#6a7a3a",
        accent2: "#9c4a2a",
        rule: "#b9a079",
        panel: "#f3e9d1"
      },
      usage: "Nineteenth-century sheet: foxed tan paper, sepia-black ink; dried olive (accent) for the specimen; rust (accent2) for old museum stamps and collector numbers; labels lighter than the sheet (panel) so they read as pasted on."
    },
    {
      id: "cabinet-dark",
      name: "Cabinet interior",
      colors: {
        paper: "#1e231c",
        ink: "#ece6d3",
        muted: "#bdb59c",
        accent: "#c9a961",
        accent2: "#a9c48a",
        rule: "#3f4a3a",
        panel: "#283024"
      },
      usage: "Dark drawer interior as the ground; labels in the panel colour with cream ink; brass (accent) for label holders, numbers and rules; pale leaf green (accent2) for specimens drawn as line work."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["perfect-fourth", "major-third"],
  motion: [
    {
      id: "hand-lens",
      name: "Hand lens",
      description: "Over the specimen a 160px circular loupe follows the pointer showing a 2\xD7 view (background-position tracks the cursor), like examining the sheet with a hand lens.",
      duration: "0ms",
      easing: "linear",
      reduced: "Loupe disabled; a click opens the image at 2\xD7 in place."
    },
    {
      id: "sheet-lift",
      name: "Sheet lift",
      description: "Opening an entry from the drawer or register slides the sheet up out of the stack in one move; the label settles last, 80ms later.",
      duration: "380ms",
      easing: "cubic-bezier(.25,.8,.25,1)",
      reduced: "Swap to the sheet with no movement."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion; label links underlined 1px; hover darkens the label frame.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "collection-label",
      name: "Collection label",
      description: "A small framed label with fixed fields: institution, name (italic), locality, habitat, date (\u201C12 Aug 1934\u201D), collector and number, \u201CDet.\u201D line."
    },
    {
      id: "straps-packets",
      name: "Straps & fragment packets",
      description: "Narrow paper straps across stems and a folded fragment packet (envelope shape) used to hold images and small notes in place."
    },
    {
      id: "barcode-stamp",
      name: "Barcode & accession stamp",
      description: "An SVG Code 128-style barcode with its human-readable number beneath, plus a round or oval accession stamp in red or rust."
    }
  ],
  anchors: [
    {
      id: "centred-specimen",
      name: "Centred specimen",
      description: "The first screen is one mounted sheet: a single image or drawing centred in a wide white field, the label in the bottom-right corner."
    },
    {
      id: "oversized-label",
      name: "Oversized label",
      description: "The collection label blown up to fill the first screen \u2014 the name at 6\u20138vw in italics, fields beneath in small caps."
    },
    {
      id: "open-drawer",
      name: "Open drawer",
      description: "The first screen shows a drawer of 8\u201312 unit trays with tiny labels, the drawer-front label naming the page."
    }
  ],
  surfaces: [
    {
      id: "acid-free-sheet",
      name: "Acid-free mounting paper",
      description: "Heavy, flat, faintly warm white paper with no texture.",
      css: "background-color: var(--paper);"
    },
    {
      id: "foxed-paper",
      name: "Foxed paper",
      description: "Aged sheet with brown foxing spots and a darker edge tone.",
      css: "background-color: var(--paper); background-image: radial-gradient(circle at 12% 18%, rgba(140,90,40,.12) 0 6px, transparent 7px), radial-gradient(circle at 78% 64%, rgba(140,90,40,.10) 0 4px, transparent 5px), radial-gradient(ellipse at center, transparent 65%, rgba(120,90,50,.15));"
    },
    {
      id: "drawer-felt",
      name: "Drawer felt",
      description: "Dark felt drawer lining with a fine fibre texture under the trays.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px); background-size: 3px 3px;"
    }
  ],
  must: [
    "Each item is presented as a specimen with a label of fixed, filled fields (name, place, date, number).",
    "Names are set in italics, and the white field around the specimen is kept.",
    "Labels sit at the bottom-right of their sheet, never top-centre."
  ],
  mustNot: [
    "No botanical-wellness styling: no watercolour leaf frames, sage gradients or script fonts.",
    "No more than one specimen per sheet in the single-sheet layout.",
    "No fabricated scientific names: names from the facts are set in italics as given."
  ]
};
var fieldGuidePlate = {
  id: "field-guide-plate",
  name: { zh: "\u91CE\u5916\u56FE\u9274", en: "Field guide plate" },
  family: "document",
  concept: {
    zh: "Peterson\u3001Collins \u4E00\u7C7B\u91CE\u5916\u56FE\u9274\u7684\u5BF9\u9875\uFF1A\u4E00\u8FB9\u662F\u7F16\u53F7\u56FE\u7248\uFF0C\u76F8\u8FD1\u7684\u7269\u79CD\u6392\u6210\u4E00\u5217\uFF0C\u7EC6\u7EBF\u6307\u5411\u8FA8\u8BC6\u7279\u5F81\uFF1B\u53E6\u4E00\u8FB9\u662F\u7B80\u77ED\u7684\u8BC6\u522B\u6587\u5B57\u3001\u5C0F\u5206\u5E03\u56FE\u548C\u6570\u636E\u8868\u3002\u4E00\u5207\u90FD\u4E3A\u4E86\u5728\u91CE\u5916\u51E0\u79D2\u949F\u5185\u8BA4\u51FA\u773C\u524D\u7684\u4E1C\u897F\u3002",
    en: "The facing pages of a Peterson or Collins field guide: on one side a numbered plate with similar species lined up and fine pointer lines to field marks; on the other, terse identification text, small range maps and data tables. Everything serves recognising the thing in front of you within seconds."
  },
  references: [
    "Roger Tory Peterson, A Field Guide to the Birds (1934) and the Peterson Identification System",
    "Collins Bird Guide (Svensson, Mullarney, Zetterstr\xF6m, 1999)",
    "Golden Nature Guides (Herbert S. Zim, Golden Press, 1949\u2013)",
    "James Sowerby, English Botany (1790\u20131814), hand-coloured plates",
    "Audubon Society Field Guides (Knopf, 1977\u2013) with colour-coded thumb tabs"
  ],
  keywords: ["\u56FE\u7248", "\u7F16\u53F7", "\u8FA8\u8BC6\u7279\u5F81", "\u5206\u5E03\u56FE", "\u5BF9\u9875", "\u5C0F\u578B\u5927\u5199", "\u68C0\u7D22\u8868"],
  tokens: {
    grid: "Facing pages: plate page and text page 50% each (min 480px) with a 32px spine; plate items laid in a 6-row band grid with numbers at the left; text page in 2 columns of 18em with a 1em gap; 6px baseline.",
    radius: "0. Range maps are plain shapes; thumb tabs on the outer edge are square.",
    border: "Pointer lines 1px ink, no arrowheads (a 3px dot at the field mark); range-map frames 1px ink; entries separated by 1px var(--rule); a 12px thumb-tab colour bar on the outer page edge.",
    shadow: "none."
  },
  layouts: [
    {
      id: "plate-and-text",
      name: "Plate facing text",
      description: "The classic spread: left page a numbered plate of 4\u20138 comparable items with pointer lines to their marks; right page the matching numbered entries with tiny range maps.",
      grid: "2 equal pages; left page 2 \xD7 3 or 2 \xD7 4 plate cells with numbers; right page 2 columns of 18em entries; 32px spine in panel colour; on mobile plate cell \u2192 entry interleave.",
      structure: [
        "Running head: group name in small caps + \u201CPLATE 12\u201D",
        "Plate page: numbered items at the same scale and pose, field-mark pointer lines",
        "Text page: entries keyed by the same numbers \u2014 name, size, identification, notes",
        "Small range maps (two-colour areas) beside each entry",
        "Folio and thumb-tab colour bar on the outer edge"
      ]
    },
    {
      id: "species-account",
      name: "Species account",
      description: "A long single-subject account: a wide plate across the top, then a fact table, identification text, a similar-species comparison strip and a range map.",
      grid: "12 columns, max 1100px; plate spans 12 at 2.5:1; fact table 4 columns left; text 8 columns right in two 18em columns; comparison strip 12 columns of 3\u20134 thumbnails.",
      structure: [
        "Plate band with the subject and 3\u20135 pointer labels",
        "Name block: common name large, secondary name in italics, measurement line \u201CL 14 cm \xB7 WS 22 cm\u201D",
        "Fact table (habitat, season, size, status) next to the range map",
        "Identification text with field marks in bold small caps",
        "Similar-species strip: \u201CCompare with:\u201D thumbnails, one-line differences"
      ]
    },
    {
      id: "dichotomous-key",
      name: "Identification key",
      description: "A dichotomous key: numbered couplets (1a / 1b \u2192 go to 2) leading to named results, with thumbnail figures in the margin.",
      grid: "Main column 36em with couplet numbers hanging in a 3em gutter; dot leaders to right-aligned \u201C\u2192 4\u201D targets; 200px right margin for thumbnails; 6px baseline.",
      structure: [
        "\u201CKey to \u2026\u201D title with instructions for use",
        "Couplets 1a / 1b, 2a / 2b \u2026 each a pair of contrasting statements drawn from the facts",
        "Results as named entries with plate references \u201CPl. 4, fig. 7\u201D",
        "Glossary box of terms used in the key",
        "Index of names with plate numbers"
      ]
    }
  ],
  type: [
    {
      id: "alegreya-plates",
      name: "Alegreya SC + Alegreya",
      display: { family: "Alegreya SC", weights: [500, 700], fallback: "Georgia, serif", source: "google" },
      body: {
        family: "Alegreya",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Alegreya SC 500/700 for group names, plate titles and common names at 18\u201340px with 0.05em tracking; Alegreya 400 + italic for body at 15px/1.45 and secondary names; field marks in Alegreya 700 inside the text. Measurements with thin spaces (\u201CL 14 cm\u201D)."
    },
    {
      id: "golden-guide",
      name: "Jost + Literata",
      display: {
        family: "Jost",
        weights: [500, 700],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      body: {
        family: "Literata",
        weights: [400, 600],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Jost 500/700 \u2014 geometric, as in the 1950s\u201360s Golden Guides \u2014 for headings in sentence case at 22\u201348px and for plate numbers; Literata 400/italic body at 16px/1.5 with optical sizing; captions in Jost 400 at 12px. Lining figures throughout."
    },
    {
      id: "engraved-plate",
      name: "Cormorant SC + Spectral",
      display: {
        family: "Cormorant SC",
        weights: [500, 600],
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      body: {
        family: "Spectral",
        weights: [300, 400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Cormorant SC 500/600 for engraved-style plate titles (\u201CPLATE XII. \u2014 WARBLERS.\u201D) with roman numerals, 0.08em tracking, 20\u201344px. Figure captions under each item (\u201CFig. 3. Male, spring.\u201D) in Spectral italic 13px; body Spectral 300/400 at 16px/1.55."
    }
  ],
  palettes: [
    {
      id: "plate-white",
      name: "Plate white",
      colors: {
        paper: "#fbf8f0",
        ink: "#1c1a16",
        muted: "#575146",
        accent: "#c4442b",
        accent2: "#3b6ea5",
        rule: "#c9c1af",
        panel: "#f1ead9"
      },
      usage: "Clean plate white; ink for text and pointer lines; range-map colours only \u2014 red-orange (accent) for summer/breeding range, blue (accent2) for winter range, overlap shown as hatching of both (no blended fill); panel for the spine and fact tables; rule for table hairlines."
    },
    {
      id: "golden-guide",
      name: "Golden Guide",
      colors: {
        paper: "#f6efd9",
        ink: "#1f1a10",
        muted: "#5a4e33",
        accent: "#d99a1e",
        accent2: "#2f6b5a",
        rule: "#bfae82",
        panel: "#efe0b4"
      },
      usage: "Warm 1960s paper; golden yellow (accent) only as solid fills \u2014 thumb tabs, plate-number discs, the running-head band (\u224810%) \u2014 with ink text on top; teal-green (accent2) for range maps; pale-gold panel for fact boxes."
    },
    {
      id: "nocturnal-slate",
      name: "Night plate",
      colors: {
        paper: "#24282a",
        ink: "#eeebe2",
        muted: "#b8b4a8",
        accent: "#e0a43a",
        accent2: "#8fb58a",
        rule: "#45494b",
        panel: "#2e3335"
      },
      usage: "Night plate for nocturnal subjects: slate ground; specimens and text warm off-white; amber (accent) for plate numbers, pointer dots and the key result; sage (accent2) for range maps; panel for fact tables."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["major-third", "perfect-fourth"],
  motion: [
    {
      id: "pointer-draw",
      name: "Field-mark pointers",
      description: "Hovering an entry number highlights the matching plate item and draws its pointer lines (stroke-dashoffset) out to the field marks.",
      duration: "240ms",
      easing: "cubic-bezier(.3,.7,.3,1)",
      reduced: "Pointer lines always visible; hover changes colour only."
    },
    {
      id: "thumb-tab",
      name: "Thumb-tab jump",
      description: "Clicking a thumb tab on the page edge jumps to that group; the active tab slides out 8px like a finger holding the page.",
      duration: "140ms",
      easing: "steps(2, end)",
      reduced: "The active tab changes colour only."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion; plates are static, links underline on hover.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "peterson-pointers",
      name: "Pointer lines to field marks",
      description: "Thin leader lines from an item to a short label naming its distinguishing feature (\u201Cwhite wing-bar\u201D) \u2014 the Peterson system applied to the subject\u2019s features."
    },
    {
      id: "range-maps",
      name: "Range maps",
      description: "Small 120 \xD7 120 simplified maps or diagrams with two-colour areas and a 3-item legend, answering where and when (areas served, seasons, hours)."
    },
    {
      id: "numbered-figures",
      name: "Numbered plate figures",
      description: "Items drawn at a consistent scale and pose, each with a numeral and a short caption; plates titled with roman numerals."
    }
  ],
  anchors: [
    {
      id: "full-plate",
      name: "Full plate",
      description: "The first screen is the plate itself: 4\u20138 comparable items lined up with numbers and pointer lines under a small-caps \u201CPLATE I\u201D."
    },
    {
      id: "species-header",
      name: "Species header",
      description: "One large subject with 3\u20135 pointer labels, the common name huge, the secondary name in italics beneath and a measurement line."
    },
    {
      id: "key-couplet",
      name: "Opening couplet",
      description: "The first screen is the first two or three couplets of a key (\u201C1a \u2026 \u2192 2 / 1b \u2026 \u2192 5\u201D) guiding the visitor to an answer."
    }
  ],
  surfaces: [
    {
      id: "coated-plate",
      name: "Coated plate paper",
      description: "Smooth bright paper for colour plates, no texture."
    },
    {
      id: "uncoated-text",
      name: "Uncoated text stock",
      description: "Warm, slightly toothy text paper with fine grain.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(60,40,10,.035) 1px, transparent 1px); background-size: 4px 4px;"
    },
    {
      id: "tipped-in-plate",
      name: "Tipped-in plate",
      description: "Plates on separate stock pasted onto the text page: a panel-coloured rectangle with an inset 1px frame and a tissue guard along its top edge.",
      css: ".plate { background: var(--panel); outline: 1px solid var(--rule); outline-offset: -8px; border-top: 6px solid rgba(255,255,255,.45); }"
    }
  ],
  must: [
    "Items appear on plates at a comparable scale and pose, numbered and keyed to text entries by the same numbers.",
    "Identification text is terse: each entry \u2264 60 words with the distinguishing feature in bold.",
    "At least one small map or diagram answers \u201Cwhere / when\u201D."
  ],
  mustNot: [
    "No full-bleed hero photography; images sit on plates at a controlled scale.",
    "No outdoor-brand clich\xE9s: no leaf or mountain icons, no adventure copy.",
    "No range-map colours outside the palette and no blended overlap fills."
  ]
};
var editorialMagazine = {
  id: "editorial-magazine",
  name: { zh: "\u6742\u5FD7\u7F16\u8F91", en: "Editorial magazine" },
  family: "print",
  concept: {
    zh: "\u957F\u7BC7\u6742\u5FD7\u7279\u7A3F\uFF1A\u5927\u53F7\u9996\u5B57\u4E0B\u6C89\u3001\u6807\u9898\u4E0B\u7684\u5BFC\u8BED\u3001\u7F72\u540D\u884C\u3001\u591A\u680F\u6B63\u6587\u3001\u6253\u65AD\u680F\u4F4D\u7684\u5F15\u8BED\u548C\u9875\u811A\u9875\u7801\u3002\u8282\u594F\u6765\u81EA\u680F\u5BBD\u3001\u680F\u95F4\u7EC6\u7EBF\u548C\u6807\u9898\u5B57\u53F7\u7684\u5927\u843D\u5DEE\u2014\u2014\u662F\u5370\u5237\u6742\u5FD7\u7684\u7248\u9762\uFF0C\u800C\u4E0D\u662F\u5927\u7247\u7559\u767D\u7684\u201C\u751F\u6D3B\u65B9\u5F0F\u201D\u7F51\u9875\u3002",
    en: "The long-form magazine feature: a big drop cap, a deck under the headline, a byline, multi-column body text, a pull quote breaking the columns and folios at the foot. Rhythm comes from column measure, hairline column rules and dramatic headline scale \u2014 a printed magazine spread, not a whitespace-heavy lifestyle site."
  },
  references: [
    "The New Yorker feature pages (Rea Irvin display, Caslon body)",
    "Harper\u2019s Bazaar under Alexey Brodovitch (1934\u201358)",
    "Esquire under Harold Hayes and George Lois (1960s)",
    "The New York Times Magazine redesign by Matt Willey (2015)",
    "London Review of Books"
  ],
  keywords: ["\u9996\u5B57\u4E0B\u6C89", "\u5BFC\u8BED", "\u7F72\u540D", "\u8DE8\u680F\u5F15\u8BED", "\u680F\u95F4\u7EBF", "\u9875\u7801", "\u957F\u6587"],
  tokens: {
    grid: "12 columns, 18px gutter, max 1240px; body in 3 columns of 4 grid columns (\u2248 22em) on desktop, 2 on tablet, 1 on mobile (column-count with column-rule); 24px baseline; opening spreads split 6 + 6.",
    radius: "0.",
    border: "Column rules 1px var(--rule) (column-rule); folio rule 1px full width; pull quotes with a 3px accent rule above and 1px rule below; section breaks as a centred ornament (\u2767) or a 3em rule.",
    shadow: "none."
  },
  layouts: [
    {
      id: "opening-spread",
      name: "Opening spread",
      description: "A two-page opener: left page a full-height image or a giant typographic headline, right page deck, byline and the first columns with a drop cap.",
      grid: "6 + 6 columns at \u2265 1024px; left half headline or image at 100vh; right half: deck across 4 columns, body in 2 columns \xD7 3; folio row at the foot of both halves.",
      structure: [
        "Rubric (section name) top-left in small caps, folio number",
        "Left page: headline at 8\u201312vw or full-bleed image with a credit line",
        "Right page: deck/standfirst in italic, byline \u201CBy \u2026 \xB7 Photographs by \u2026\u201D",
        "Body starts with a 4-line drop cap and runs in 2\u20133 columns",
        "Pull quote spanning 2 columns mid-body; end mark \u25A0 or \u201CContinued on p. 74\u201D"
      ]
    },
    {
      id: "three-column-feature",
      name: "Three-column feature",
      description: "A classic feature page: headline across all columns, then three justified columns with column rules, subheads, a spot illustration and a pull quote.",
      grid: "12 columns; headline spans 12; deck spans 8; body column-count 3 with 1px column rules; spot illustration one column wide; pull quote column-span: all.",
      structure: [
        "Department heading + issue date strip",
        "Headline across 12 columns, deck beneath across 8",
        "Byline with a hairline above",
        "Three-column body: drop cap, 2\u20134 small-caps subheads, spot art inside a column",
        "Pull quote across all columns; end mark \u25A0; contributor note in italics at the foot"
      ]
    },
    {
      id: "front-of-book",
      name: "Front-of-book departments",
      description: "A departments page: several short items of different lengths in a modular grid, each with a kicker, a short headline and 60\u2013200 words, separated by rules.",
      grid: "12 columns; items span 3, 4, 5 or 8 columns; 1px rules between items; 24px baseline; one item carries a large figure or illustration.",
      structure: [
        "Department masthead: department name + issue",
        "Lead item across 8 columns with kicker and illustration",
        "Side column (4) of 3 short stacked items",
        "Bottom row of 3 unequal items with kickers",
        "Contributors / colophon strip"
      ]
    }
  ],
  type: [
    {
      id: "caslon-feature",
      name: "Libre Caslon Display + Libre Caslon Text",
      display: {
        family: "Libre Caslon Display",
        weights: [400],
        fallback: '"Big Caslon", Georgia, serif',
        source: "google"
      },
      body: {
        family: "Libre Caslon Text",
        weights: [400, 700],
        italic: true,
        fallback: '"Adobe Caslon Pro", Georgia, serif',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Libre Caslon Display for headlines at 56\u2013120px, line-height 1.0, \u22120.01em tracking, sentence case; Libre Caslon Text 400 body at 17px/24px, justified with hyphens; deck in Libre Caslon Text italic at 22px; rubrics and bylines in font-variant-caps: all-small-caps with 0.08em tracking. 4-line drop cap in the Display cut. Oldstyle figures in running text."
    },
    {
      id: "bodoni-fashion",
      name: "Bodoni Moda + Libre Baskerville",
      display: {
        family: "Bodoni Moda",
        weights: [400, 700],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: "google"
      },
      body: {
        family: "Libre Baskerville",
        weights: [400, 700],
        italic: true,
        fallback: "Baskerville, Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Bodoni Moda 400 italic and 700 roman mixed inside one headline at 72\u2013160px (optical sizing on so hairlines stay sharp), leading 0.92; deck Bodoni Moda 400 at 24px. Body Libre Baskerville 400 at 16px/26px, ragged-right. Bylines uppercase 11px with 0.2em tracking in Libre Baskerville 700. 6-line drop cap in Bodoni Moda 700."
    },
    {
      id: "grotesk-modern",
      name: "Schibsted Grotesk + Source Serif 4",
      display: {
        family: "Schibsted Grotesk",
        weights: [700, 900],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      body: {
        family: "Source Serif 4",
        weights: [300, 400, 600],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Schibsted Grotesk 900 for headlines at 64\u2013144px, \u22120.03em tracking, line-height 0.95, often two weights in one headline; kickers Schibsted Grotesk 700 uppercase 12px with 0.1em. Source Serif 4 400 body at 18px/1.5 with optical sizing; deck Source Serif 4 300 italic at 26px. Pull quotes Schibsted Grotesk 700 at 36px."
    }
  ],
  palettes: [
    {
      id: "weekly-white",
      name: "Weekly white",
      colors: {
        paper: "#fdfcf8",
        ink: "#111111",
        muted: "#505050",
        accent: "#a6192e",
        accent2: "#1d3f6e",
        rule: "#1a1a1a",
        panel: "#f1eee6"
      },
      usage: "Black on white for \u2265 95% of the page; red (accent) only for the rubric, the drop cap and the end mark \u25A0; navy (accent2) for links and illustration line work; panel for sidebars."
    },
    {
      id: "black-spread",
      name: "Black opening spread",
      colors: {
        paper: "#121110",
        ink: "#f5f1e8",
        muted: "#b7b0a3",
        accent: "#e4572e",
        accent2: "#d9c7a3",
        rule: "#3a3733",
        panel: "#1d1b19"
      },
      usage: "Opening spread printed solid black; cream type; orange (accent) for one highlighted headline word, the rule over pull quotes and the drop cap; sand (accent2) for captions and credits; panel for sidebars."
    },
    {
      id: "uncoated-ochre",
      name: "Uncoated literary",
      colors: {
        paper: "#efe7d6",
        ink: "#1e1a14",
        muted: "#5c5244",
        accent: "#2f5d50",
        accent2: "#c27b2a",
        rule: "#b5a88f",
        panel: "#e3d8c0"
      },
      usage: "Uncoated literary-magazine stock; bottle green (accent) for headlines, rubrics and drop caps; ochre (accent2) only as solid blocks behind pull quotes or illustration plates, with ink text on top; tan column rules."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fifth", "golden", "augmented-fourth"],
  motion: [
    {
      id: "page-turn",
      name: "Page turn",
      description: "Moving between spreads turns the page: the outgoing page rotates \u2212180\xB0 around the spine (rotateY, perspective 1600px) while the next spread is revealed beneath.",
      duration: "600ms",
      easing: "cubic-bezier(.45,.05,.2,1)",
      reduced: "Cut directly to the next spread."
    },
    {
      id: "two-plate-print",
      name: "Two-plate print",
      description: "The headline and drop cap print in two passes: the colour plate (accent) first, then the black plate overprints 120ms later, 1px out of register before snapping true.",
      duration: "240ms",
      easing: "steps(2, end)",
      reduced: "Show the final registered type."
    },
    {
      id: "still",
      name: "Still print",
      description: "No motion; hover underlines links with a 1px rule at 0.2em offset.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "drop-cap",
      name: "Drop cap",
      description: "A 3\u20136 line drop cap in the display face opening the feature and each major section, aligned to the baseline grid."
    },
    {
      id: "pull-quote",
      name: "Pull quote",
      description: "A large quotation lifted verbatim from the body text, breaking the column grid between a heavy and a hairline rule."
    },
    {
      id: "folios-rubrics",
      name: "Folios, rubrics & end marks",
      description: "Page numbers with magazine name and issue at the foot (\u201C94 \xB7 THE QUARTERLY \xB7 NOVEMBER 2026\u201D), section rubrics at the top, a \u25A0 end mark."
    }
  ],
  anchors: [
    {
      id: "giant-headline",
      name: "Giant headline",
      description: "The first screen is the headline at 10\u201314vw over 2\u20133 lines with deck and byline beneath; no image."
    },
    {
      id: "full-bleed-opener",
      name: "Full-bleed opener",
      description: "A half- or full-screen photograph or illustration with the headline set inside or beside it and a credit line."
    },
    {
      id: "drop-cap-columns",
      name: "Drop cap into columns",
      description: "The first screen already shows text: rubric, a modest headline and three columns opening with a giant drop cap."
    }
  ],
  surfaces: [
    {
      id: "coated-magazine",
      name: "Coated magazine stock",
      description: "Bright smooth paper with no texture; image areas at full saturation."
    },
    {
      id: "uncoated-literary",
      name: "Uncoated literary stock",
      description: "Warm, slightly rough paper with fine fibre texture.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(80,60,30,.04) 1px, transparent 1px); background-size: 3px 3px;"
    },
    {
      id: "solid-black-spread",
      name: "Solid black spread",
      description: "A full-bleed black opening page with cream type; the black is a flat ink solid, never a gradient.",
      css: "background-color: var(--paper); color: var(--ink);"
    }
  ],
  must: [
    "Body text runs in multiple columns on desktop at a 45\u201375 character measure.",
    "The feature opens with headline, deck and byline, and the body starts with a drop cap.",
    "At least one pull quote taken verbatim from the provided facts or body text.",
    "Folios or a running footer with issue and section information."
  ],
  mustNot: [
    "No Kinfolk-style minimal lifestyle layout: no expanses of beige whitespace around one centred paragraph.",
    "No card grids of article teasers with rounded thumbnails.",
    "No real magazine mastheads (The New Yorker, Vogue\u2026) used as branding."
  ]
};
var documentBranches = [
  recipeCard,
  engineeringPlate,
  ledgerAccounting,
  academicPaper,
  apothecaryLabel,
  bureaucraticForm,
  labNotebook,
  herbariumSpecimen,
  fieldGuidePlate,
  editorialMagazine
];

// vendor/hash-design/packages/core/src/data/branches/modernist-craft.ts
var swissGrid = {
  id: "swiss-grid",
  name: { zh: "\u745E\u58EB\u7F51\u683C", en: "Swiss grid" },
  family: "modernist",
  concept: {
    zh: "\u56FD\u9645\u4E3B\u4E49\u5B57\u4F53\u98CE\u683C\uFF1A\u7A46\u52D2-\u5E03\u7F57\u514B\u66FC\u7684\u82CF\u9ECE\u4E16\u97F3\u4E50\u5385\u6D77\u62A5\u3001\u9C81\u5FB7\u7684\u300A\u6392\u5370\u6708\u520A\u300B\u3001\u300A\u65B0\u5E73\u9762\u8BBE\u8BA1\u300B\u6742\u5FD7\u3002\u4E00\u5207\u670D\u4ECE\u6A21\u6570\u7F51\u683C\uFF0C\u5DE6\u9F50\u53F3\u4E0D\u9F50\uFF0C\u6807\u9898\u662F\u6392\u597D\u7684\u5B57\u5757\u800C\u4E0D\u662F\u88C5\u9970\u3002\u7EA2\u4E0E\u9ED1\u300101/02 \u7684\u7F16\u53F7\u672C\u8EAB\u5C31\u662F\u7ED3\u6784\u2014\u2014\u5BA2\u89C2\u3001\u51B7\u9759\uFF0C\u8BA9\u4FE1\u606F\u81EA\u5DF1\u8BF4\u8BDD\u3002",
    en: "The International Typographic Style: M\xFCller-Brockmann\u2019s Z\xFCrich Tonhalle posters, Emil Ruder\u2019s Typographische Monatsbl\xE4tter, the Neue Grafik journal. Everything answers to a modular grid, flush-left and ragged-right; headlines are typeset blocks, not decoration. Red, black and numbered sections are the structure \u2014 objective, cool, letting the information speak."
  },
  references: [
    "Josef M\xFCller-Brockmann, Z\xFCrich Tonhalle \u201Cmusica viva\u201D concert posters (1951\u20131972)",
    "Emil Ruder, Typographie: A Manual of Design (1967)",
    "Neue Grafik / New Graphic Design journal (1958\u20131965)",
    "Josef M\xFCller-Brockmann, Grid Systems in Graphic Design (1981)",
    "Karl Gerstner, Designing Programmes (1964)"
  ],
  keywords: ["\u6A21\u6570\u7F51\u683C", "\u5DE6\u9F50\u53F3\u4E0D\u9F50", "\u7EA2\u4E0E\u9ED1", "\u7F16\u53F7\u7ED3\u6784", "\u5BA2\u89C2\u6444\u5F71", "\u65E0\u886C\u7EBF"],
  tokens: {
    grid: "12 columns grouped into 6 fields, 24px gutter, 48px outer margin (24px on mobile); 8px baseline with body 16/24; every block top-aligns to a field row of 8 baselines (64px).",
    radius: "0 everywhere \u2014 buttons, images and inputs included.",
    border: "1px solid ink hairlines only on field boundaries; one 6px accent bar (exactly one field wide) as the only heavy rule; never a box around text.",
    shadow: "none."
  },
  layouts: [
    {
      id: "modular-poster",
      name: "Modular poster",
      description: "The first screen is a concert poster on a 6\xD78 field grid: the headline stacked as a flush-left block in the top-left fields and one geometric figure occupying a precise field range.",
      grid: "6 columns \xD7 8 rows of fields, 24px gutters, 48px margins; headline spans cols 1\u20134 / rows 1\u20133; figure spans cols 3\u20136 / rows 3\u20137; date block cols 1\u20132 / row 8.",
      structure: [
        "Poster field: headline block (3\u20135 lines, flush-left) top-left; concentric arcs or bars in a declared field range; date/place block bottom-left at body size",
        "Information table: facts in two columns \u2014 labels in cols 1\u20132 (muted), values in cols 3\u20136",
        "Programme list: numbered rows 01\u20130n, each on the grid with a 1px rule above",
        "Colophon strip: address, contact, credits at 12px in 3 columns aligned to the poster\u2019s column lines"
      ]
    },
    {
      id: "ruder-asymmetric",
      name: "Asymmetric text columns",
      description: "An Emil Ruder book spread: a narrow marginal column for headings and numbers, wide text columns, and large empty fields used as active space.",
      grid: "12 columns, 24px gutters, 64px margins; headings cols 1\u20133, text cols 5\u201310, marginal notes cols 11\u201312; 8px baseline, headings sit on the same baseline as the first text line.",
      structure: [
        "Running head: title left, section number right, 1px rule below",
        "Opening: large light headline across cols 1\u20138; introduction in cols 5\u201310 starting three field rows lower",
        "Text sections: each heading hangs in cols 1\u20133, aligned to the first baseline of its text in cols 5\u201310",
        "Figure field: one image or diagram across cols 5\u201312, caption in cols 1\u20133",
        "End matter: references and contact in cols 5\u201310 at 12px"
      ]
    },
    {
      id: "numbered-index",
      name: "Numbered index",
      description: "Numbers are the architecture: each section opens with a giant numeral spanning two columns with the content to its right; the page reads like a specification.",
      grid: "8 columns, 16px gutters, 40px margins; numeral column = cols 1\u20132 (numerals 12\u201318vw, tabular), content cols 3\u20138; 8px baseline.",
      structure: [
        "Top band: title flush-left, a 6px red bar spanning cols 1\u20132 only",
        "01 \u2014 giant red numeral left; statement and key facts right",
        "02 \u2014 a ruled table (label / value / note)",
        "03 \u2014 one objective black-and-white image or a solid colour field cropped to the grid",
        "04 \u2014 contact as plain lines, numbered like everything else"
      ]
    }
  ],
  type: [
    {
      id: "akzidenz-archivo",
      name: "Archivo (Akzidenz stand-in)",
      display: {
        family: "Archivo",
        weights: [500, 800],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      body: {
        family: "Archivo",
        weights: [400, 500, 700],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Headlines 800, sentence case, tracking -0.02em, line-height 0.95, set as a block of 3\u20135 lines. Body 16/24, weight 400, never justified. Numerals tabular (font-variant-numeric: tabular-nums). Only three sizes on a page: headline, body, 12px caption."
    },
    {
      id: "ruder-hanken",
      name: "Hanken Grotesk light (Univers mood)",
      display: {
        family: "Hanken Grotesk",
        weights: [300, 500],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      body: {
        family: "Hanken Grotesk",
        weights: [400, 500],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Ruder\u2019s light Univers voice: headlines weight 300 at 64\u2013120px, lowercase where the language allows, tracking -0.03em, line-height 1.0. Body 400 at 16/24; 500 for marginal labels at 12px uppercase tracking 0.08em. No bold anywhere."
    },
    {
      id: "neue-grafik-schibsted",
      name: "Schibsted Grotesk + Public Sans",
      display: {
        family: "Schibsted Grotesk",
        weights: [700, 900],
        fallback: '"Helvetica Neue", Arial, sans-serif',
        source: "google"
      },
      body: { family: "Public Sans", weights: [400, 600], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "Chiron Hei HK", body: "Noto Sans SC" },
      notes: "Schibsted 900 for numerals and short headlines, tracking -0.03em, line-height 0.9; numbers set at 6\u201312\xD7 body. Public Sans body 16/24, 600 for table labels. Tabular lining figures in all tables."
    }
  ],
  palettes: [
    {
      id: "red-black-white",
      name: "Red / black on white",
      colors: {
        paper: "#f7f6f2",
        ink: "#111111",
        muted: "#57554f",
        accent: "#e2001a",
        accent2: "#8f8d87",
        rule: "#111111",
        panel: "#e8e6df"
      },
      usage: "Ink on off-white for \u224880% of the page. Red only for the single geometric figure, section numerals and the 6px bar (\u224810\u201315%). Grey accent2 for secondary arcs/bars behind the red. Panel only behind the information table."
    },
    {
      id: "poster-yellow",
      name: "Poster yellow",
      colors: {
        paper: "#f2cd00",
        ink: "#141414",
        muted: "#4a3f00",
        accent: "#1d4f91",
        accent2: "#ffffff",
        rule: "#141414",
        panel: "#e0bc00"
      },
      usage: "Full-bleed yellow stock like a Kunstgewerbemuseum poster; black type and hairlines; blue only for the figure and numerals (\u224810%); white for knocked-out type on blue and one reversed bar."
    },
    {
      id: "tonhalle-night",
      name: "Tonhalle night",
      colors: {
        paper: "#121212",
        ink: "#f1eee6",
        muted: "#a3a097",
        accent: "#ff5a1f",
        accent2: "#4a8fd1",
        rule: "#f1eee6",
        panel: "#232323"
      },
      usage: "Black concert poster: off-white type (\u224885% of marks); orange for the main arc or numeral; blue only as one secondary overlapping figure; never more than two accent shapes per screen."
    }
  ],
  densities: ["regular", "airy"],
  scales: ["perfect-fourth", "perfect-fifth"],
  motion: [
    {
      id: "grid-snap",
      name: "Grid snap",
      description: "On load, blocks register into place field by field: each element jumps from its column origin to its final position in 3 discrete steps, staggered 40ms in reading order \u2014 a paste-up being aligned.",
      duration: "240ms",
      easing: "steps(3, end)",
      reduced: "Render everything in final position; no steps."
    },
    {
      id: "rule-draw",
      name: "Rule draw",
      description: "Only on the first screen, once on load: hairlines and the accent bar extend from the left margin to their column end (scaleX 0\u21921, transform-origin left). Type never moves.",
      duration: "420ms",
      easing: "cubic-bezier(.65,0,.35,1)",
      reduced: "Rules are drawn at full length immediately."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion. Hover = 2px accent underline with 3px offset; links switch to the accent colour.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "concentric-arcs",
      name: "Concentric arcs",
      description: "Beethoven-poster arcs: SVG quarter-circles with stepped stroke widths (4, 8, 16, 32px) radiating from one grid intersection and clipped to a declared field range."
    },
    {
      id: "section-numerals",
      name: "Section numerals",
      description: "Two-digit numerals (01, 02 \u2026) in the display weight at 4\u20136\xD7 body size, tabular figures, hanging in the left column; they double as navigation."
    },
    {
      id: "visible-grid",
      name: "Visible grid",
      description: "The field grid drawn as 1px lines at 8% ink across the poster area \u2014 the construction is shown, not hidden."
    }
  ],
  anchors: [
    {
      id: "headline-block",
      name: "Headline block",
      description: "A 3\u20135 line flush-left headline set tight (line-height 0.95) filling exactly the top-left 4 columns of the poster field; nothing else in those fields."
    },
    {
      id: "giant-numeral",
      name: "Giant numeral",
      description: "One number from the facts (year, date, edition, count) at 30\u201340vw in accent, cropped by the right margin, with the headline set small beside it."
    },
    {
      id: "geometric-field",
      name: "Geometric field",
      description: "An abstract figure (concentric arcs, a circle cut by the grid, or stacked bars) fills \u224860% of the first screen; the text is small and sits in two fields at the bottom-left."
    }
  ],
  surfaces: [
    {
      id: "offset-white",
      name: "Uncoated offset",
      description: "Flat uncoated stock, no texture; colours print solid with razor edges.",
      css: "background-color: var(--paper);"
    },
    {
      id: "construction-grid",
      name: "Construction grid",
      description: "The 6-field grid stays faintly visible behind the content, like a layout sheet.",
      css: "background-image: repeating-linear-gradient(to right, transparent 0 calc(100% / 6 - 1px), color-mix(in srgb, var(--ink) 8%, transparent) calc(100% / 6 - 1px) calc(100% / 6));"
    },
    {
      id: "silkscreen-solid",
      name: "Silkscreen overprint",
      description: "Large flat accent figures with perfectly sharp edges; where two figures overlap they multiply, showing the overprint.",
      css: "mix-blend-mode: multiply; /* on overlapping accent figures only */"
    }
  ],
  must: [
    "All text is flush-left, ragged-right; nothing centred or justified.",
    "Every element\u2019s left edge lands on a declared column line (\u2264 6 distinct x-positions per screen).",
    "A numeric system (01, 02 \u2026 or dates/times as large figures) organises the page.",
    "At most two type sizes per section besides the headline."
  ],
  mustNot: [
    "No centred headline and no symmetrical hero.",
    "No decorative imagery: photos are objective (object, building, person straight-on) or absent; no illustrations, no textures behind text.",
    "No more than one accent colour plus black inside the same field.",
    "No rounded corners, shadows or icons."
  ]
};
var rawBrutalist = {
  id: "raw-brutalist",
  name: { zh: "\u7C97\u91CE\u539F\u751F", en: "Raw brutalist" },
  family: "screen",
  concept: {
    zh: "\u7F51\u9875\u7C97\u91CE\u4E3B\u4E49\uFF1A\u6545\u610F\u4FDD\u7559\u6D4F\u89C8\u5668\u9ED8\u8BA4\u7684\u6837\u5B50\u2014\u2014Times \u5B57\u3001\u84DD\u8272\u4E0B\u5212\u7EBF\u94FE\u63A5\u3001\u7070\u8272\u539F\u751F\u6309\u94AE\u3001\u7C97\u9ED1\u8FB9\u6846\uFF0C\u7ED3\u6784\u5B8C\u5168\u5916\u9732\u3002\u50CF\u300A\u5F6D\u535A\u5546\u4E1A\u5468\u520A\u300B\u5C01\u9762\u90A3\u6837\u7C97\u66B4\u800C\u51C6\u786E\uFF0C\u50CF Experimental Jetset \u90A3\u6837\u53EA\u7528\u4E00\u79CD\u54CD\u4EAE\u7684\u989C\u8272\u3002\u4E0D\u7CBE\u81F4\uFF0C\u4F46\u6BCF\u4E2A\u51B3\u5B9A\u90FD\u662F\u6545\u610F\u7684\u3001\u53EF\u8BFB\u7684\u3002",
    en: "Web brutalism: the browser\u2019s defaults kept on purpose \u2014 Times, blue underlined links, grey native buttons, thick black borders, structure fully exposed. Blunt and exact like a Bloomberg Businessweek cover, with one loud colour like Experimental Jetset. No polish, but every decision is deliberate and legible."
  },
  references: [
    "Bloomberg Businessweek covers under Richard Turley (2010\u20132014)",
    "Experimental Jetset, Whitney Museum \u201CResponsive W\u201D identity (2013)",
    "W3C HTML 3.2 default rendering and Netscape Navigator 1.x pages (1994\u20131997)",
    "Dexter Sinister, \u201CJust-in-Time\u201D publications (2006\u2013)",
    "Alison & Peter Smithson, Robin Hood Gardens \u2014 brutalist b\xE9ton brut (1972)"
  ],
  keywords: ["\u9ED8\u8BA4\u6837\u5F0F", "\u7C97\u9ED1\u8FB9\u6846", "\u5916\u9732\u7ED3\u6784", "\u5355\u4E00\u54CD\u8272", "\u7B49\u5BBD", "\u84DD\u8272\u94FE\u63A5"],
  tokens: {
    grid: "No hidden grid: either a single column (max 70ch text, full-bleed headings and rules) or a full-bleed CSS grid with 0 gap whose cells are separated by 3px ink borders; spacing in multiples of 8px; content padded 16px, left-aligned.",
    radius: "0. Native buttons/inputs keep UA styling or get radius 0 with a 2px solid ink border.",
    border: "3px solid ink for structural boxes, 1px solid ink for table cells; borders collapse (negative margin -3px) instead of gapping; one element may carry a 12px accent border.",
    shadow: "none \u2014 except one optional hard 6px 6px 0 ink offset on the primary action, like a flattened Win95 bevel."
  },
  layouts: [
    {
      id: "document-dump",
      name: "Document dump",
      description: "Looks like an unstyled HTML document someone made deliberately huge: an h1 at 12vw, then raw lists, native horizontal rules and underlined links.",
      grid: "Single column; text max-width 70ch; h1 and <hr> run full-bleed; 16px base, 1em block margins, 16px side padding.",
      structure: [
        "h1 at 10\u201314vw, bold, broken onto 2\u20134 lines, followed by a 3px ink <hr>",
        "Plain paragraph of facts with underlined inline links",
        "Raw <ul>/<ol> with default bullets or numbers listing items/offers",
        "A real <table> with collapsed 1px borders for details (hours, prices, specs)",
        "<address> footer in italic, left-aligned, preceded by another <hr>"
      ]
    },
    {
      id: "cover-blast",
      name: "Cover blast",
      description: "Businessweek-cover energy: one gigantic word or number filling the viewport on a loud field, black text boxes slapped over it, a metadata strip.",
      grid: "Full-bleed 4-column CSS grid, 0 gap, 3px ink borders; headline sized in vw so it touches both edges; overlay boxes positioned on the grid lines, not centred.",
      structure: [
        "Masthead line: name, issue/date and other metadata in mono 12px across the top",
        "Blast field: one word/number at 25\u201340vw on the accent field, clipped by the viewport",
        "Overlay deck: two or three black boxes with paper-colour text laid over the blast at grid offsets",
        "Contents list: numbered items with right-aligned mono numbers",
        "Bottom strip: contact and links in a single bordered row"
      ]
    },
    {
      id: "exposed-table",
      name: "Exposed table",
      description: "The whole page is a visible table: every piece of content lives in a bordered cell, column headers in reversed bars, nothing floats.",
      grid: "CSS grid of 3\u20135 columns, 0 gap, every cell bordered 3px (collapsed), min-height 120px; mobile collapses to one column of cells.",
      structure: [
        "Header row: name cell spanning 3 columns + date/status cell",
        "Statement cell spanning full width in large mono",
        "Matrix of fact cells with spans of 1, 2 or 3 columns \u2014 no two neighbours the same size",
        "Link row: each link is a full cell, underlined, accent fill on hover",
        "Footer row with source/credit text at 12px"
      ]
    }
  ],
  type: [
    {
      id: "default-times",
      name: "Tinos + Cousine (browser defaults)",
      display: {
        family: "Tinos",
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: "google"
      },
      body: {
        family: "Tinos",
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: "google"
      },
      mono: {
        family: "Cousine",
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Set like a UA stylesheet: body 16px/1.25, h1 700 at 10\u201314vw with line-height 0.9, h2 1.5em, no letter-spacing anywhere. Italic only for <address>, <em> and captions. Cousine for <code>, metadata and table numbers."
    },
    {
      id: "mono-everything",
      name: "Space Mono + IBM Plex Mono",
      display: {
        family: "Space Mono",
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "IBM Plex Mono",
        weights: [400, 500, 700],
        fallback: "Menlo, Consolas, monospace",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: 'Everything monospaced. Headlines Space Mono 700 uppercase, tracking 0, line-height 0.95. Body Plex Mono 15px/1.5, max 72ch. Label/value pairs aligned by the mono width (e.g. "DATE ....... 12 MAY"). Bold only for labels.'
    },
    {
      id: "businessweek-black",
      name: "Archivo Black + Arimo",
      display: {
        family: "Archivo Black",
        weights: [400],
        fallback: '"Arial Black", Arial, sans-serif',
        source: "google"
      },
      body: {
        family: "Arimo",
        weights: [400, 700],
        fallback: 'Arial, "Liberation Sans", sans-serif',
        source: "google"
      },
      mono: { family: "Cousine", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Archivo Black at fit-to-width sizes (20\u201340vw), tracking -0.04em, line-height 0.82, mixed case. Arimo body 16/1.4, plain; 700 for labels. Never use Archivo Black below 32px. Cousine 12px for masthead metadata."
    }
  ],
  palettes: [
    {
      id: "orange-on-white",
      name: "International orange on white",
      colors: {
        paper: "#ffffff",
        ink: "#000000",
        muted: "#4a4a4a",
        accent: "#ff4f00",
        accent2: "#0000ee",
        rule: "#000000",
        panel: "#ececec"
      },
      usage: "White page, black type and borders (\u224885%). Orange is the one loud field \u2014 the blast block or one full cell (\u224810\u201315%). UA link blue (#0000ee) only on links; nothing else is blue."
    },
    {
      id: "system-grey",
      name: "System grey",
      colors: {
        paper: "#c0c0c0",
        ink: "#000000",
        muted: "#3a3a3a",
        accent: "#ff0000",
        accent2: "#000080",
        rule: "#000000",
        panel: "#ffffff"
      },
      usage: "Win95-grey page like an unstyled form; white panels for text and inputs; navy title bars with white text for headers; pure red for one alert-sized statement only."
    },
    {
      id: "acid-on-black",
      name: "Acid on black",
      colors: {
        paper: "#0a0a0a",
        ink: "#f5f5f0",
        muted: "#a3a39b",
        accent: "#c6ff00",
        accent2: "#ff5ec4",
        rule: "#f5f5f0",
        panel: "#1a1a1a"
      },
      usage: "Black page, off-white type, 3px off-white borders. Acid green is the single loud field (text on it is black). Pink only for visited links and :focus outlines."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "hard-invert",
      name: "Hard invert",
      description: "Hover/focus instantly inverts a cell or link (ink \u2194 paper, or paper \u2192 accent). No transition at all.",
      duration: "0ms",
      easing: "steps(1, end)",
      reduced: "Same \u2014 it is a colour swap, not movement."
    },
    {
      id: "marquee-strip",
      name: "Marquee strip",
      description: "One <marquee>-like metadata strip (translateX loop, constant speed) across the top; it pauses on hover. Nothing else moves.",
      duration: "18s",
      easing: "linear",
      reduced: "Stop the loop and show the strip as static wrapped text."
    },
    {
      id: "jump-cut",
      name: "Jump cut",
      description: "No transitions anywhere: anchor links jump (scroll-behavior: auto), the active nav item fills with accent in one frame, :active buttons shift 2px down-right.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "native-controls",
      name: "Native controls",
      description: "Real <button>, <input>, <select>, <details> with default or near-default rendering; a 2px ink border is the most styling allowed."
    },
    {
      id: "default-links",
      name: "Default links",
      description: "Links are underlined (text-decoration-thickness 2px) in link blue/accent2, visited in a second colour; no button-styled links."
    },
    {
      id: "exposed-markup",
      name: "Exposed markup",
      description: 'Element names or source fragments as labels: "<h1>", "\xA7 2", "[img 640\xD7480]" in mono 12px at the top-left corner of boxes.'
    }
  ],
  anchors: [
    {
      id: "h1-wall",
      name: "h1 wall",
      description: "A single unstyled-looking h1 at 12vw (bold serif or mono) filling the first screen in 3\u20134 broken lines; nothing else above the fold except an <hr>."
    },
    {
      id: "colour-blast",
      name: "Colour blast",
      description: "One word or number on a full-bleed accent field at 30vw+, cropped by the viewport edges, with black text boxes overlapping it."
    },
    {
      id: "bordered-matrix",
      name: "Bordered matrix",
      description: "The first screen is already the exposed table: 6\u20139 bordered cells of unequal spans carrying real facts."
    }
  ],
  surfaces: [
    {
      id: "bare-screen",
      name: "Bare screen",
      description: "Flat colour, no texture, no gradient \u2014 it looks undesigned, on purpose.",
      css: "background: var(--paper);"
    },
    {
      id: "loud-selection",
      name: "Loud selection",
      description: "Selection and focus are part of the look: accent fill, thick outlines.",
      css: "::selection { background: var(--accent); color: #000; } :focus-visible { outline: 4px solid var(--accent2); outline-offset: 0; }"
    },
    {
      id: "xerox-1bit",
      name: "1-bit xerox",
      description: "Images reduced to harsh black-and-white threshold, like a photocopy of a photocopy.",
      css: "filter: grayscale(1) contrast(400%) brightness(1.1);"
    }
  ],
  must: [
    "Structure is visible: every major block has a real border or rule; nothing is separated by whitespace alone.",
    "Links look like links: underlined, in the link colour.",
    "Exactly one loud accent colour per page besides ink and paper (link colour excepted).",
    "Body text stays \u2264 75ch and \u2265 15px \u2014 raw, never illegible."
  ],
  mustNot: [
    "No polish: no gradients, no rounded corners, no eased hover transitions.",
    "No illegible gimmicks: no overlapping that hides facts, no rotated body copy, no low-contrast text on the accent.",
    "No faux-glitch (RGB split, VHS noise, scanlines) \u2014 this is raw, not cyberpunk.",
    "No icon sets and no centred hero with buttons."
  ]
};
var bauhausPrimary = {
  id: "bauhaus-primary",
  name: { zh: "\u5305\u8C6A\u65AF", en: "Bauhaus primary" },
  family: "modernist",
  concept: {
    zh: "\u5305\u8C6A\u65AF\u7684\u57FA\u672C\u5F62\u4E0E\u4E09\u539F\u8272\uFF1A\u5EB7\u5B9A\u65AF\u57FA\u7684\u9EC4\u4E09\u89D2\u3001\u7EA2\u65B9\u5757\u3001\u84DD\u5706\uFF0C\u518D\u52A0\u9ED1\u8272\u7C97\u6761\u548C\u5706\u70B9\u505A\u9AA8\u67B6\u3002\u62DC\u5C14\u7684\u901A\u7528\u5B57\u4F53\u3001\u83AB\u970D\u5229-\u7EB3\u5409\u7684\u7248\u5F0F\u3001\u963F\u5C14\u4F2F\u65AF\u7684\u8272\u5F69\u7EC3\u4E60\u2014\u2014\u4E0D\u5BF9\u79F0\u7684\u5E73\u8861\uFF0C\u51E0\u4F55\u65E0\u886C\u7EBF\uFF0C\u50CF\u6559\u5B66\u6302\u56FE\u4E00\u6837\u6E05\u695A\u3002",
    en: "Bauhaus elementary forms and primaries: Kandinsky\u2019s yellow triangle, red square and blue circle, with black bars and dots as the skeleton. Herbert Bayer\u2019s universal alphabet, Moholy-Nagy\u2019s typophoto, Albers\u2019 colour exercises \u2014 asymmetric balance, geometric sans, as clear as a teaching chart."
  },
  references: [
    "Herbert Bayer, Universal alphabet (1925) and Bauhaus exhibition posters",
    "L\xE1szl\xF3 Moholy-Nagy, Bauhausb\xFCcher covers (1925\u20131930)",
    "Joost Schmidt, poster for the Bauhaus Exhibition Weimar (1923)",
    "Josef Albers, Interaction of Color (1963) and Homage to the Square",
    "Wassily Kandinsky, form\u2013colour questionnaire (1923)"
  ],
  keywords: ["\u57FA\u672C\u5F62", "\u4E09\u539F\u8272", "\u4E0D\u5BF9\u79F0", "\u51E0\u4F55\u65E0\u886C\u7EBF", "\u7C97\u9ED1\u6761", "\u5706\u70B9"],
  tokens: {
    grid: "12 columns, 16px gutter, 32px margins; 8px baseline; compositions balance on an off-centre vertical axis at 5/12 or 7/12 (or a 30\xB0 diagonal), never at 6/12.",
    radius: "0 for rectangles; 50% only for true circles (dots, discs); triangles via clip-path: polygon().",
    border: "12\u201324px solid ink bars as structural dividers (only at 0\xB0 or 90\xB0); 2px ink for small boxes; no hairlines.",
    shadow: "none."
  },
  layouts: [
    {
      id: "bayer-poster",
      name: "Exhibition poster",
      description: "Asymmetric poster: a heavy black vertical bar at the left third, a big disc or square overlapping it, text blocks set horizontally and one line rotated up the bar.",
      grid: "12 col; ink bar 24px wide on the col-4 line, full height; primary shape 5\u20137 columns wide on the 5/12 axis; text blocks in cols 6\u201312; 8px baseline.",
      structure: [
        "Poster: bar + two or three primary shapes + headline; one line rotated -90\xB0 up the bar",
        "Facts block: who / when / where as three stacked lines with 12px dots as bullets",
        "Programme: numbered rows with a red/yellow/blue square marking each category",
        "Footer: address and contact under a 12px black bar"
      ]
    },
    {
      id: "teaching-chart",
      name: "Teaching chart",
      description: "Like a Vorkurs teaching sheet: content broken into numbered exercises, each with a diagrammatic shape on the left and explanation on the right.",
      grid: "Two zones \u2014 4-column diagram column + 8-column text column, 32px gutter; each exercise row min 240px, separated by 12px ink bars.",
      structure: [
        "Title plate: name in geometric sans next to a row of square / circle / triangle",
        "Exercise 1: shape diagram + main statement",
        "Exercises 2\u20134: one row per offer or fact, each with a different elementary form",
        "Colour key: what each primary stands for on this page",
        "Signature line: contact set small"
      ]
    },
    {
      id: "bauhausbuch-cover",
      name: "Bauhausbuch cover",
      description: "Bauhausb\xFCcher-style: a cover of heavy horizontal bars and one huge numeral or initial, then strict two-column interior pages.",
      grid: "6 col, 24px gutter, 40px margin; bars 16px tall spanning 4\u20136 columns at staggered starts; interior text in 2 columns of 3.",
      structure: [
        "Cover: 2\u20133 horizontal black bars, one huge numeral or initial, title set between the bars",
        "Contents: list where bar length encodes size/duration/price",
        "Two-column body with section heads set on a coloured square",
        "Back cover: imprint-style colophon with contact"
      ]
    }
  ],
  type: [
    {
      id: "universal-lowercase",
      name: "Josefin Sans + Questrial (universal lowercase)",
      display: {
        family: "Josefin Sans",
        weights: [300, 700],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      body: {
        family: "Questrial",
        weights: [400],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Bayer\u2019s rule: no capitals at all \u2014 headlines, nav and labels all lowercase (text-transform: lowercase). Display 700 at line-height 1.0, tracking 0.02em; 300 for secondary lines. Body Questrial 17/1.55. No italics."
    },
    {
      id: "futura-jost",
      name: "Jost (Futura voice)",
      display: {
        family: "Jost",
        weights: [500, 800],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      body: {
        family: "Jost",
        weights: [400, 500],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Labels 800 uppercase, tracking 0.08em at 12\u201314px; headlines 500 mixed case at line-height 1.05, tracking -0.01em. Body 400 16/1.6. Numerals in 800 inside circles or squares."
    },
    {
      id: "spartan-kumbh",
      name: "League Spartan + Kumbh Sans",
      display: {
        family: "League Spartan",
        weights: [700, 900],
        fallback: "Futura, Arial, sans-serif",
        source: "google"
      },
      body: { family: "Kumbh Sans", weights: [400, 600], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "League Spartan 900 for blocky headlines set against or inside the bars, tracking -0.02em, line-height 0.9, uppercase allowed. Kumbh Sans body 16/1.55, 600 for labels."
    }
  ],
  palettes: [
    {
      id: "primaries-on-cream",
      name: "Primaries on cream",
      colors: {
        paper: "#f1ece0",
        ink: "#1b1b1b",
        muted: "#55524a",
        accent: "#d6261c",
        accent2: "#1f4fa3",
        rule: "#1b1b1b",
        panel: "#f2c21b"
      },
      usage: "Cream paper; black bars and type. Red square, blue circle and yellow triangle each appear at least once; yellow panel is the largest colour area (\u226420%), red \u226410%, blue \u226410%."
    },
    {
      id: "stage-black",
      name: "Stage black",
      colors: {
        paper: "#161514",
        ink: "#f3efe4",
        muted: "#a9a499",
        accent: "#e4b21c",
        accent2: "#c8321e",
        rule: "#f3efe4",
        panel: "#23408a"
      },
      usage: "Black ground like a Bauhaus stage-workshop poster; cream type and bars; yellow leads (triangle, numerals), red second, blue only as panel squares."
    },
    {
      id: "dessau-grey",
      name: "Dessau grey",
      colors: {
        paper: "#d9d6cf",
        ink: "#141414",
        muted: "#45433e",
        accent: "#2a5db0",
        accent2: "#e8b70d",
        rule: "#141414",
        panel: "#ffffff"
      },
      usage: "Concrete-grey ground; blue leads (discs, links); yellow for the triangle and highlight bars; white panels hold text. Red is absent \u2014 a two-primary variant."
    }
  ],
  densities: ["regular", "airy"],
  scales: ["perfect-fourth", "perfect-fifth", "golden"],
  motion: [
    {
      id: "form-turn",
      name: "Form turn",
      description: "On hover a primary shape turns 90\xB0 (square) or 120\xB0 (triangle) in one mechanical move, like a piece of Alma Siedhoff-Buscher\u2019s Bauhaus building game.",
      duration: "300ms",
      easing: "cubic-bezier(.5,0,.2,1)",
      reduced: "No rotation; swap the shape\u2019s colour instead."
    },
    {
      id: "bar-slide",
      name: "Bar slide",
      description: "Once on load, the black bars slide in along their own axis from the composition edge, one after another (60ms stagger); then everything is static.",
      duration: "360ms",
      easing: "cubic-bezier(.7,0,.3,1)",
      reduced: "Bars drawn in place."
    },
    {
      id: "still",
      name: "Still",
      description: "No motion; hover fills the item\u2019s square marker with its primary colour.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "elementary-forms",
      name: "Elementary forms",
      description: "Circle (blue), square (red), triangle (yellow) as flat SVG, used as bullets, section markers and large compositional weights."
    },
    {
      id: "bars-and-dots",
      name: "Bars and dots",
      description: "Heavy black rules (12\u201324px) at 0\xB0 or 90\xB0 with 16px dots at their ends or crossings, as in Bayer\u2019s and Schmidt\u2019s posters."
    },
    {
      id: "albers-squares",
      name: "Albers squares",
      description: "Nested squares in Homage-to-the-Square proportions (10:8:6:4 units, inner squares dropped toward the bottom) as an image stand-in or section mark."
    }
  ],
  anchors: [
    {
      id: "form-composition",
      name: "Form composition",
      description: "The first screen is an asymmetric arrangement of the three forms at large size (largest \u224845vw) with the headline set across one of them."
    },
    {
      id: "vertical-bar-title",
      name: "Vertical bar title",
      description: "The title runs rotated -90\xB0 up a full-height black bar at the left third; the rest of the screen is facts in small text plus one disc."
    },
    {
      id: "constructed-initial",
      name: "Constructed initial",
      description: "A single letter or numeral (40vh) built from circle and square segments, with the name set small at its base."
    }
  ],
  surfaces: [
    {
      id: "flat-gouache",
      name: "Flat gouache",
      description: "Matte, slightly warm card; colours flat like gouache.",
      css: "background: var(--paper);"
    },
    {
      id: "litho-grain",
      name: "Lithograph grain",
      description: "Very fine stone-litho grain over the whole page.",
      css: 'background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence baseFrequency=%27.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.06%27/%3E%3C/svg%3E");'
    },
    {
      id: "cut-card",
      name: "Cut card",
      description: "Shapes look cut from coloured card; where two overlap, the intersection multiplies.",
      css: "mix-blend-mode: multiply; /* on overlapping shapes */"
    }
  ],
  must: [
    "At least two of the three elementary forms appear in primary colours.",
    "The composition is asymmetric: main axis at 5/12 or 7/12 (or a diagonal), never at 6/12.",
    "Headlines in a geometric sans; with the universal option, no capitals at all."
  ],
  mustNot: [
    "No secondary or tertiary colours (purple, green, orange, pink) \u2014 only black, white/cream/grey and the primaries.",
    "No gradients and no rounded rectangles \u2014 only true circles and sharp polygons.",
    "No pictogram icons; shapes stay abstract.",
    "No centred, symmetrical hero."
  ]
};
var constructivistPoster = {
  id: "constructivist-poster",
  name: { zh: "\u6784\u6210\u4E3B\u4E49\u6D77\u62A5", en: "Constructivist poster" },
  family: "modernist",
  concept: {
    zh: '\u7F57\u7434\u79D1\u3001\u5229\u897F\u8328\u57FA\u4E0E\u65AF\u6ED5\u4F2F\u683C\u5144\u5F1F\u7684\u6D77\u62A5\uFF1A\u5F3A\u70C8\u7684\u5BF9\u89D2\u7EBF\uFF0C\u7EA2\u9ED1\u4E24\u8272\u538B\u5728\u5976\u6CB9\u8272\u7EB8\u4E0A\uFF0C\u7167\u7247\u526A\u5F71\u8499\u592A\u5947\uFF0C\u5587\u53ED\u822C\u7684\u7C97\u4F53\u5927\u5B57\uFF0C\u4E00\u5C42\u5C42\u53E0\u538B\u7684\u5E73\u9762\u3002\u753B\u9762\u4E0D\u662F\u88AB\u6446\u653E\u7684\uFF0C\u800C\u662F\u88AB"\u6784\u9020"\u51FA\u6765\u7684\u2014\u2014\u5B83\u5728\u5927\u58F0\u5BA3\u544A\u3002',
    en: "Rodchenko, El Lissitzky and the Stenberg brothers: violent diagonals, red and black on cream stock, photomontage silhouettes, megaphone lettering and overlapping planes. The page isn\u2019t arranged, it is constructed \u2014 and it is making an announcement at full volume."
  },
  references: [
    "Alexander Rodchenko, \u201CBooks!\u201D poster for Lengiz (1924)",
    "El Lissitzky, \u201CBeat the Whites with the Red Wedge\u201D (1919)",
    "Vladimir & Georgii Stenberg, poster for \u201CMan with a Movie Camera\u201D (1929)",
    "El Lissitzky, \u201CAbout Two Squares\u201D (1922)",
    "Gustav Klutsis, photomontage posters (1920s\u201330s)"
  ],
  keywords: ["\u5BF9\u89D2\u7EBF", "\u7EA2\u9ED1", "\u7167\u7247\u8499\u592A\u5947", "\u5587\u53ED\u5B57", "\u53E0\u538B\u5E73\u9762", "\u5BA3\u544A"],
  tokens: {
    grid: "A 12-column grid (0 gutter, 24px margin) for small text only; big planes and headlines follow a primary axis rotated -15\xB0 to -30\xB0, and a secondary axis at 90\xB0 to it.",
    radius: "0; circles (50%) only for discs and target motifs.",
    border: 'No boxes around text; planes are solid fills; 4\u20138px ink "rails" run along the diagonal across the page.',
    shadow: "none; depth comes from overlap and overprint (mix-blend-mode: multiply)."
  },
  layouts: [
    {
      id: "diagonal-thrust",
      name: "Diagonal thrust",
      description: "The whole first screen pivots on one diagonal: a red band from bottom-left to top-right with the headline running along it, a black disc at its end.",
      grid: "Diagonal at -22\xB0; headline baseline on the diagonal; orthogonal (0\xB0) text blocks in cols 1\u20135 and 9\u201312; 24px margins.",
      structure: [
        "Diagonal hero: red band + headline on it + black disc overlapping the band\u2019s end",
        "Manifesto block: 3\u20135 short numbered statements, one per line, at 0\xB0",
        "Facts plane: date / place / contact on a black plane tilted -6\xB0",
        "Slogan strip: one line of megaphone caps across the bottom edge"
      ]
    },
    {
      id: "megaphone-cone",
      name: "Megaphone",
      description: "Rodchenko \u201CBooks!\u201D structure: a cone (or a cut-out figure) shouting the headline, whose words step up in size along the cone.",
      grid: "12 col; cone from a point in cols 1\u20132 widening to cols 4\u201312; headline words at 1\xD7, 2\xD7, 4\xD7 steps along the cone axis.",
      structure: [
        "Shout: cone + headline words stepping up in size",
        "Response column: facts set in a narrow 0\xB0 column",
        "Overlapping planes: 2\u20133 rectangles with offers/dates, rotated \xB18\xB0",
        "Ticket stub: address and contact in a ruled box"
      ]
    },
    {
      id: "film-poster-stack",
      name: "Film-poster stack",
      description: "Stenberg film-poster logic: a big photomontage or cut-out shape at left, title stacked in condensed caps at right, credits on tilted strips.",
      grid: "8 col; image plane cols 1\u20135, type plane cols 4\u20138 offset 40px down so they overlap one column; credits strips rotated 90\xB0 along the right edge.",
      structure: [
        "Poster plane: duotone cut-out + title stacked in 3\u20134 lines",
        "Credits strips: names and roles on tilted bars",
        "Schedule as a bordered timetable with red day headers",
        "Footer: city/date stamp inside a black disc"
      ]
    }
  ],
  type: [
    {
      id: "russo-pt",
      name: "Russo One + PT Sans",
      display: {
        family: "Russo One",
        weights: [400],
        fallback: 'Impact, "Arial Black", sans-serif',
        source: "google"
      },
      body: { family: "PT Sans", weights: [400, 700], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Russo One uppercase, tracking 0.02em, line-height 0.9, set along the diagonal by rotating the whole block (never skew glyphs). PT Sans body 16/1.45; 700 for numbered statements. Cyrillic only if the facts supply it."
    },
    {
      id: "stencil-narrow",
      name: "Big Shoulders Stencil + PT Sans Narrow",
      display: {
        family: "Big Shoulders Stencil Display",
        weights: [800, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "PT Sans Narrow",
        weights: [400, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Stencil caps at 15\u201325vw stacked with line-height 0.82, tracking -0.01em. PT Sans Narrow 17/1.35 for credits and timetables; labels uppercase 700 with tracking 0.08em."
    },
    {
      id: "dela-gothic-archivo",
      name: "Dela Gothic One + Archivo",
      display: {
        family: "Dela Gothic One",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: { family: "Archivo", weights: [400, 700], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Dela Gothic One as blocky megaphone lettering: uppercase, tracking 0, line-height 0.95, sizes stepping \xD72 along the cone, never below 28px (it has Cyrillic if the facts supply any). Archivo body 16/1.5, 700 for numbered points."
    }
  ],
  palettes: [
    {
      id: "red-black-cream",
      name: "Red and black on cream",
      colors: {
        paper: "#efe6d2",
        ink: "#1a1714",
        muted: "#5a5048",
        accent: "#d2281e",
        accent2: "#9a8d78",
        rule: "#1a1714",
        panel: "#e2d6bc"
      },
      usage: "Cream poster stock; red wedges and bands \u224825% of area; black planes and type \u224830%; photomontage in a grey-brown duotone (accent2)."
    },
    {
      id: "black-red-ochre",
      name: "Black poster",
      colors: {
        paper: "#191614",
        ink: "#efe6d2",
        muted: "#a89d8d",
        accent: "#e03a22",
        accent2: "#e3c26a",
        rule: "#efe6d2",
        panel: "#2a2522"
      },
      usage: "Black stock; cream type; red diagonal planes; ochre only for small stamps, numbers and one disc."
    },
    {
      id: "newsprint-red-blue",
      name: "Grey newsprint, red and blue",
      colors: {
        paper: "#e4e1d8",
        ink: "#121212",
        muted: "#4c4a45",
        accent: "#c8202a",
        accent2: "#24467f",
        rule: "#121212",
        panel: "#cfc9ba"
      },
      usage: "Cool grey newsprint (Lissitzky exhibition-catalogue feel); red leads, a single blue plane counterweights it; black for text and rails."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["perfect-fifth", "golden", "augmented-fourth"],
  motion: [
    {
      id: "wedge-strike",
      name: "Wedge strike",
      description: "On load the red wedge/band slides along its own diagonal into place in one hard move and stops dead (no bounce); the headline then appears with no fade.",
      duration: "280ms",
      easing: "cubic-bezier(.9,0,.1,1)",
      reduced: "Wedge rendered in place."
    },
    {
      id: "plane-shift",
      name: "Plane shift",
      description: "Hovering a rotated plane turns it back by 3\xB0 and pushes it 4px along the diagonal, like a paper cut-out nudged on the paste-up table.",
      duration: "160ms",
      easing: "cubic-bezier(.3,0,.2,1)",
      reduced: "No rotation; the plane\u2019s fill switches to accent."
    },
    {
      id: "still",
      name: "Still",
      description: "Nothing moves; the diagonal does all the work. Hover = colour swap to accent.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "red-wedge",
      name: "Red wedge",
      description: "A sharp triangular wedge (clip-path polygon) piercing a disc or plane, Lissitzky-style."
    },
    {
      id: "photomontage-cutout",
      name: "Photomontage cut-out",
      description: "Supplied photos masked to a hard-edged silhouette, turned into high-contrast duotone (ink + paper) and placed on coloured planes \u2014 never a plain photo rectangle."
    },
    {
      id: "sound-cone",
      name: "Sound cone",
      description: "A triangle radiating from a point toward the headline with 2\u20134 thin rays inside \u2014 Rodchenko\u2019s megaphone."
    }
  ],
  anchors: [
    {
      id: "diagonal-headline",
      name: "Diagonal headline",
      description: "Headline at -15\xB0 to -30\xB0 across the full viewport width on a red band, overlapping a black disc."
    },
    {
      id: "shout",
      name: "Shout",
      description: "Cone + words stepping 1\xD7\u21924\xD7 in size form the first screen \u2014 the page literally shouts the name."
    },
    {
      id: "stacked-title",
      name: "Stacked title",
      description: "Title stacked in 3\u20134 lines of stencil caps on the right, crossing a duotone cut-out on the left."
    }
  ],
  surfaces: [
    {
      id: "poster-stock",
      name: "Poster stock",
      description: "Cream uncoated poster paper with a faint grain.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px); background-size: 4px 4px;"
    },
    {
      id: "overprint",
      name: "Overprint",
      description: "Red and black planes overlap and multiply, darkening where they cross, as in two-pass printing.",
      css: "mix-blend-mode: multiply;"
    },
    {
      id: "duotone-photo",
      name: "Duotone photo",
      description: "Images in two colours: grayscale + contrast, multiplied over the accent or panel.",
      css: "filter: grayscale(1) contrast(1.6); mix-blend-mode: multiply;"
    }
  ],
  must: [
    "At least one dominant diagonal (\u2265 12\xB0 off horizontal) crosses most of the first screen.",
    "Red and black (or the palette equivalents) carry \u2265 50% of the non-paper area.",
    "Headline lettering is heavy, uppercase and sized to the viewport (\u2265 8vw).",
    "At least two planes visibly overlap."
  ],
  mustNot: [
    "No pastels and no gradients other than overprint.",
    "No skewed faux-italic glyphs \u2014 rotate blocks, never skewX the text.",
    "No Soviet iconography (hammer and sickle, red star, leader portraits) \u2014 use the formal language, not the politics.",
    "No body copy on the diagonal; only headlines and short labels rotate."
  ]
};
var artDeco = {
  id: "art-deco",
  name: { zh: "\u88C5\u9970\u827A\u672F", en: "Art Deco" },
  family: "modernist",
  concept: {
    zh: "1920\u201330 \u5E74\u4EE3\u7684\u88C5\u9970\u827A\u672F\uFF1A\u996D\u5E97\u7684\u94DC\u5B57\u62DB\u724C\u3001\u5361\u6851\u5FB7\u5C14\u7684\u90AE\u8F6E\u6D77\u62A5\u3001\u4E0A\u6D77\u5916\u6EE9\u5927\u697C\u7684\u7ACB\u9762\u3002\u653E\u5C04\u7684\u592A\u9633\u5149\u8292\u4E0E\u6247\u5F62\u3001\u9636\u68AF\u5F0F\u7684\u51E0\u4F55\u3001\u9ED1\u5E95\u91D1\u7EBF\u6216\u5976\u6CB9\u5E95\u91D1\u5B57\uFF0C\u9AD8\u6311\u7684\u5927\u5199\u6216\u9AD8\u53CD\u5DEE\u886C\u7EBF\u3002\u5141\u8BB8\u5BF9\u79F0\u2014\u2014\u90A3\u662F\u5E84\u91CD\uFF0C\u4E0D\u662F\u5077\u61D2\u3002",
    en: "Art Deco of the 1920s\u201330s: brass hotel signage, Cassandre\u2019s ocean-liner posters, the fa\xE7ades of the Shanghai Bund. Sunbursts and fans, stepped ziggurat geometry, gold lines on black or gilt letters on cream, tall capitals or high-contrast serifs. Symmetry is allowed \u2014 it means ceremony, not laziness."
  },
  references: [
    "A. M. Cassandre, \u201CNormandie\u201D poster (1935)",
    "William Van Alen, Chrysler Building lobby and crown (1930)",
    "\u4E0A\u6D77\u5916\u6EE9\u6C99\u900A\u5927\u53A6\uFF08\u4ECA\u548C\u5E73\u996D\u5E97\u5317\u697C\uFF09, 1929",
    "Exposition internationale des Arts d\xE9coratifs, Paris (1925)",
    "Ert\xE9, Harper\u2019s Bazaar covers (1915\u20131937)"
  ],
  keywords: ["\u653E\u5C04\u7EB9", "\u6247\u5F62", "\u9636\u68AF\u51E0\u4F55", "\u9ED1\u91D1", "\u5BF9\u79F0", "\u9AD8\u6311\u5927\u5199"],
  tokens: {
    grid: "12 columns, 24px gutter, 64px margin; a central symmetry axis is allowed; vertical rhythm 12px; nested frames step inward by 8px.",
    radius: "0 for frames; one arched top (border-radius: 50% 50% 0 0 / 30% 30% 0 0) allowed for a doorway/window frame; fans via SVG or conic-gradient.",
    border: "Double/triple fine lines: border: 5px double var(--accent) (1px + 3px gap + 1px); stepped corners via clip-path; 2px accent rules with a centred lozenge.",
    shadow: "none; depth from stepped frames and tone shifts, never blur."
  },
  layouts: [
    {
      id: "lobby-symmetry",
      name: "Hotel lobby",
      description: "Ceremonial symmetric page: a sunburst-crowned title inside a stepped frame on the centre axis, flanked by narrow pilaster columns.",
      grid: "12 col: pilasters cols 1\u20132 and 11\u201312 (ornament bands or small text), nave cols 3\u201310; 24px gutters; the axis is used for title and ornaments only.",
      structure: [
        "Crown: half-sunburst above the title; title in tall caps on the axis inside a stepped triple-line frame",
        "Directory board: facts as a lobby directory \u2014 name left, floor/time right, dotted leaders",
        "Twin panels: two mirrored framed panels with services or offers",
        "Lift dial: a semicircular dial whose ticks are the page\u2019s sections",
        "Foot: address in small spaced caps on the axis"
      ]
    },
    {
      id: "liner-poster",
      name: "Liner poster",
      description: "Cassandre\u2019s Normandie: one monumental shape seen from below, foreshortened, filling the screen, with a tall-caps title band at the base.",
      grid: "First screen full-bleed: object 70% of height with its base at 78% from top; title band 22% high, caps tracking 0.2em; below, 8-column content with 24px gutters.",
      structure: [
        "Monument: one large shape (bow, tower, fan) in flat banded tones from a low viewpoint",
        "Title band: tall caps across the full width",
        "Itinerary: stops/times as a horizontal line with lozenge markers",
        "Services in two columns divided by a 1px accent rule",
        "Ticket-office footer: contact inside a stepped frame"
      ]
    },
    {
      id: "facade-setbacks",
      name: "Fa\xE7ade setbacks",
      description: "The page reads like a Bund fa\xE7ade from top to bottom: content floors that step inward like setbacks, separated by ornament bands.",
      grid: "10 col; floor 1 = 10 col, floor 2 = 8 col, floor 3 = 6 col (setbacks of 1 col each side); 24px chevron/fan bands between floors.",
      structure: [
        "Spire: name in a narrow vertical stack crowned by a fan",
        "Floor 1 (widest): main statement + key facts",
        "Ornament band of chevrons or scallops",
        "Floor 2: services in two columns",
        "Floor 3 (narrowest): hours and address at the base of a stepped frame"
      ]
    }
  ],
  type: [
    {
      id: "poiret-josefin",
      name: "Poiret One + Josefin Sans",
      display: {
        family: "Poiret One",
        weights: [400],
        fallback: '"Century Gothic", Futura, sans-serif',
        source: "google"
      },
      body: {
        family: "Josefin Sans",
        weights: [400, 600],
        fallback: '"Century Gothic", sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Poiret One uppercase only at \u2265 36px (it is hairline-thin), tracking 0.18em, line-height 1.1, on solid high-contrast grounds. Josefin Sans body 16/1.6; labels 600 uppercase, tracking 0.2em, 12px."
    },
    {
      id: "limelight-marcellus",
      name: "Limelight + Marcellus",
      display: { family: "Limelight", weights: [400], fallback: "Didot, Georgia, serif", source: "google" },
      body: { family: "Marcellus", weights: [400], fallback: "Optima, Georgia, serif", source: "google" },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Limelight for marquee titles in caps or mixed case, tracking 0.04em, line-height 1.0; also for floor numbers and times. Marcellus body 17/1.6 \u2014 its flared strokes echo the display. No italics."
    },
    {
      id: "gilda-tenor",
      name: "Gilda Display + Tenor Sans",
      display: {
        family: "Gilda Display",
        weights: [400],
        fallback: 'Didot, "Bodoni 72", serif',
        source: "google"
      },
      body: {
        family: "Tenor Sans",
        weights: [400],
        fallback: 'Optima, "Gill Sans", sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Sans SC" },
      notes: "High-contrast Gilda for titles at 48px+, caps tracking 0.12em or mixed case at 0.02em. Tenor Sans body 16/1.6; labels uppercase tracking 0.25em at 11\u201312px. Old-style elegance, no bold weights at all."
    }
  ],
  palettes: [
    {
      id: "gold-on-black",
      name: "Gold on black lacquer",
      colors: {
        paper: "#0f0e0c",
        ink: "#efe3c2",
        muted: "#b0a17a",
        accent: "#c9a24a",
        accent2: "#2e6b5a",
        rule: "#c9a24a",
        panel: "#1c1a16"
      },
      usage: "Lacquer black ground (\u224875%); champagne type; gold for every rule, frame and fan (\u224810%); jade only in one inset panel or ornament band (\u22485%)."
    },
    {
      id: "cream-and-gilt",
      name: "Cream and gilt",
      colors: {
        paper: "#f3ead6",
        ink: "#1d1a14",
        muted: "#5c5240",
        accent: "#a8812f",
        accent2: "#12403c",
        rule: "#a8812f",
        panel: "#e8dbbd"
      },
      usage: "Cream plaster; near-black type; gilt hairlines, frames and fans; deep teal for one band or title panel (\u224815%) with cream type on it."
    },
    {
      id: "liner-navy",
      name: "Liner navy and red",
      colors: {
        paper: "#142238",
        ink: "#f2ead8",
        muted: "#a9b0bd",
        accent: "#d23a2a",
        accent2: "#d9b45a",
        rule: "#d9b45a",
        panel: "#1d3150"
      },
      usage: "Cassandre deep navy (\u224870%); cream type; liner red for the monument\u2019s band and one title word; brass for rules and frames. No bright cyan or neon."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["golden", "perfect-fifth"],
  motion: [
    {
      id: "fan-unfold",
      name: "Fan unfold",
      description: "Once on load the sunburst/fan unfolds from its pivot (conic mask angle 0\xB0 \u2192 180\xB0), like a hand fan or a lift indicator sweeping.",
      duration: "700ms",
      easing: "cubic-bezier(.25,.1,.25,1)",
      reduced: "Show the full fan statically."
    },
    {
      id: "lift-needle",
      name: "Lift needle",
      description: "A needle on a semicircular floor-indicator dial rotates to point at the current section as you navigate \u2014 the only moving part on the page.",
      duration: "500ms",
      easing: "cubic-bezier(.4,0,.2,1)",
      reduced: "The needle jumps to position without rotating."
    },
    {
      id: "marquee-bulbs",
      name: "Marquee bulbs",
      description: "A row of small dots around the title frame lights in sequence (muted \u2192 accent) in 3 steps, like theatre bulbs, for two cycles, then stays lit.",
      duration: "900ms",
      easing: "steps(3, end)",
      reduced: "Bulbs static, all lit."
    }
  ],
  motifs: [
    {
      id: "sunburst",
      name: "Sunburst",
      description: "Rays from a point at the bottom centre of a frame: 24\u201336 alternating accent/paper wedges via repeating-conic-gradient, clipped to a semicircle."
    },
    {
      id: "stepped-frame",
      name: "Ziggurat frame",
      description: "Frames whose corners step inward three times (8px steps) via clip-path; titles sit inside like a building plaque."
    },
    {
      id: "chevron-band",
      name: "Chevron band",
      description: "Horizontal 16\u201324px bands of zigzag chevrons or repeating scallop fans between sections, in accent."
    }
  ],
  anchors: [
    {
      id: "crowned-title",
      name: "Crowned title",
      description: "Symmetric first screen: a half-sunburst crowning the name in tall spaced caps, inside a triple-line stepped frame."
    },
    {
      id: "monument",
      name: "Monument",
      description: "One monumental shape (tower, bow, fan) in flat banded tones from a low viewpoint fills the screen, the title running along its base."
    },
    {
      id: "directory-board",
      name: "Directory board",
      description: "A lobby directory: dark board with gilt letters listing the key facts on leader-dotted rows, framed \u2014 the information is the ornament."
    }
  ],
  surfaces: [
    {
      id: "lacquer",
      name: "Lacquer",
      description: "Deep, flat lacquer with no texture; gilt lines stay crisp.",
      css: "background: var(--paper);"
    },
    {
      id: "brushed-brass",
      name: "Brushed brass",
      description: "Panels with fine horizontal brushed-metal lines in accent tints (no specular highlight).",
      css: "background-image: repeating-linear-gradient(0deg, color-mix(in srgb, var(--accent) 22%, var(--panel)) 0 1px, var(--panel) 1px 3px);"
    },
    {
      id: "plaster-relief",
      name: "Plaster relief",
      description: "Cream plaster with a faint embossed scallop pattern at 5% ink.",
      css: "background-image: radial-gradient(circle at 50% 100%, transparent 58%, rgba(0,0,0,.05) 59% 61%, transparent 62%); background-size: 48px 24px;"
    }
  ],
  must: [
    "At least one radiating motif (sunburst, fan or dial).",
    "Titles in tall caps or a high-contrast serif; caps tracked \u2265 0.1em.",
    "Frames use double/triple fine lines or stepped corners \u2014 never a single plain box."
  ],
  mustNot: [
    "No Gatsby-party clich\xE9s: champagne glasses, flapper silhouettes, feathers.",
    "No shiny gold-foil imitations (specular gradients, glitter, rainbow shimmer).",
    "No soft rounded cards; the only curves are fans and one arch.",
    "No more than two metal/accent colours on a screen."
  ]
};
var seventiesSupergraphic = {
  id: "seventies-supergraphic",
  name: { zh: "\u4E03\u5341\u5E74\u4EE3\u8D85\u7EA7\u56FE\u5F62", en: "70s supergraphic" },
  family: "modernist",
  concept: {
    zh: '\u4E03\u5341\u5E74\u4EE3\u7684\u8D85\u7EA7\u56FE\u5F62\uFF1A\u82AD\u82AD\u62C9\xB7\u65AF\u6258\u6CD5\u8D6B\xB7\u6240\u7F57\u95E8\u753B\u6EE1\u6574\u9762\u5899\u7684\u5DE8\u5927\u6761\u7EB9\uFF0C\u5E93\u73C0\u9ED1\u65F6\u4EE3\u7684\u5706\u80D6\u5B57\u4F53\uFF0CNASA \u7684"\u8815\u866B"\u6807\u5FD7\uFF0C\u4F01\u9E45\u4E1B\u4E66\u7684\u5C01\u9762\u3002\u6A59\u3001\u68D5\u3001\u82A5\u672B\u9EC4\u7684\u5927\u5730\u8272\u5F69\u8679\u6761\u5E26\u6CBF\u7740\u8F6C\u89D2\u5F2F\u66F2\u6D41\u52A8\u2014\u2014\u4E00\u5207\u90FD\u5706\u6DA6\u3001\u539A\u5B9E\u3001\u4E50\u89C2\u3002',
    en: "1970s supergraphics: Barbara Stauffacher Solomon\u2019s wall-sized stripes, the Cooper Black era of fat rounded letters, the NASA \u201Cworm\u201D, Penguin paperback covers. Rainbow bands in earth tones \u2014 orange, brown, mustard \u2014 bend around corners; everything is round, thick and optimistic."
  },
  references: [
    "Barbara Stauffacher Solomon, Sea Ranch supergraphics (1966\u20131970)",
    "Danne & Blackburn, NASA Graphics Standards Manual (1975)",
    "Cooper Black on 1970s record sleeves and shopfronts",
    "Penguin Books covers by David Pelham and Germano Facetti (1960s\u201370s)",
    "Alexander Girard, Braniff International \u201CEnd of the Plain Plane\u201D (1965)"
  ],
  keywords: ["\u5F69\u8679\u6761\u5E26", "\u5927\u5730\u8272", "\u5706\u80D6\u5B57", "\u5F2F\u66F2\u8F6C\u89D2", "\u6A59\u68D5\u82A5\u672B", "\u4E50\u89C2"],
  tokens: {
    grid: "12 columns, 20px gutter, 40px margin; stripe stacks are 4\u20135 bands of equal width (20\u201332px each) with 0 gap; content sits inside the space a stripe bend encloses.",
    radius: "Large radii only where stripes turn corners (outer radius = 1.5 \xD7 stack height, e.g. 180\u2013240px); content boxes 0; full circles for number dots; no medium radii (8\u201324px).",
    border: "none on content; stripes are fills. Labels may take a 3px ink outline.",
    shadow: "none."
  },
  layouts: [
    {
      id: "stripe-wrap",
      name: "Stripe wrap",
      description: "A 5-band stripe enters from the left edge, runs horizontally and bends 90\xB0 downward around a big rounded corner, framing the content like Sea Ranch wall graphics.",
      grid: "12 col; stripe stack 5 \xD7 24px = 120px, outer corner radius 200px; content in cols 3\u201310 inside the bend; 8px baseline.",
      structure: [
        "Stripe entrance with the title set in fat type riding on the top band",
        "Intro inside the bend: 2\u20133 sentences, large",
        "Offer list as big numbered rows, each number in a round dot",
        "Stripes exit bottom-right carrying contact info reversed out of the darkest band"
      ]
    },
    {
      id: "paperback-cover",
      name: "Paperback cover",
      description: "Penguin-style tripartite cover: coloured top band with the name, central field with one bold stripe graphic, coloured bottom band \u2014 interior below.",
      grid: "Cover = 100vh split 20 / 60 / 20; central graphic 8 col; interior below in 2 columns across 10 col, 32px gutter.",
      structure: [
        "Top band: name in fat type plus a small imprint-style mark",
        "Central field: one rounded stripe graphic",
        "Bottom band: date, place or edition line",
        "Interior: blurb and facts in two columns",
        "Back-cover footer: imprint block with contact"
      ]
    },
    {
      id: "wayfinding-wall",
      name: "Wayfinding wall",
      description: "Like a 1970s civic-building wall: a huge rounded wordmark, painted section numbers and arrows at architectural scale, text in tidy blocks.",
      grid: "6 col, 32px gutter; wordmark spans all 6 columns; section numbers in 160px circles in col 1; content cols 2\u20135.",
      structure: [
        "Wordmark across the top at 18vw, with continuous worm-like strokes",
        "Sections 1\u2013n, each led by a painted number in a circle and an arrow",
        "A stripe divider bending between sections",
        "Directory/contact block on a mustard panel"
      ]
    }
  ],
  type: [
    {
      id: "shrikhand-young",
      name: "Shrikhand + Young Serif",
      display: {
        family: "Shrikhand",
        weights: [400],
        fallback: '"Cooper Black", Georgia, serif',
        source: "google"
      },
      body: { family: "Young Serif", weights: [400], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Serif SC" },
      notes: "Shrikhand (fat swash italic, Cooper-era swagger) for titles at 48px+, tracking -0.01em, line-height 0.95, mixed case only. Young Serif body 17/1.55. Never set paragraphs in Shrikhand."
    },
    {
      id: "righteous-varela",
      name: "Righteous + Varela Round",
      display: {
        family: "Righteous",
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: "google"
      },
      body: {
        family: "Varela Round",
        weights: [400],
        fallback: '"Arial Rounded MT Bold", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Righteous for wordmarks and section labels, lowercase where possible so it reads as one continuous worm; tracking 0.01em, line-height 1.0. Varela Round body 16/1.6. Numbers in Righteous inside circles."
    },
    {
      id: "tilt-warp-franklin",
      name: "Tilt Warp + Libre Franklin",
      display: {
        family: "Tilt Warp",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Libre Franklin",
        weights: [400, 600, 800],
        fallback: '"Franklin Gothic", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Tilt Warp for chunky headlines at 40\u2013120px, line-height 1.0, never tracked out. Libre Franklin body 16/1.55; 800 uppercase labels tracking 0.06em, like ITC Franklin on 70s signage."
    }
  ],
  palettes: [
    {
      id: "harvest-stripes",
      name: "Harvest stripes",
      colors: {
        paper: "#f5ead3",
        ink: "#3a2314",
        muted: "#6b4a33",
        accent: "#e2611b",
        accent2: "#e9a917",
        rule: "#8a3b1a",
        panel: "#f0d9a8"
      },
      usage: "Stripe order top\u2192bottom: mustard (accent2), orange (accent), rust (rule), brown (ink). Stripes \u224825% of the first screen; type in dark brown; wheat panels behind lists."
    },
    {
      id: "chocolate-shag",
      name: "Chocolate shag",
      colors: {
        paper: "#2b1a10",
        ink: "#f6e6c8",
        muted: "#c4a988",
        accent: "#f08a24",
        accent2: "#d9b23a",
        rule: "#b5481f",
        panel: "#3d2718"
      },
      usage: "Chocolate ground; cream type; orange and gold bands with a rust outer stripe; panels one step lighter brown."
    },
    {
      id: "avocado-teal",
      name: "Avocado and teal",
      colors: {
        paper: "#eceadb",
        ink: "#22261a",
        muted: "#4f5440",
        accent: "#6f7d2c",
        accent2: "#2f7d86",
        rule: "#c4672a",
        panel: "#dcd8b8"
      },
      usage: "Kitchen-appliance 70s: avocado and teal bands with one burnt-orange stripe (rule); pale celery paper; deep olive-black type."
    }
  ],
  densities: ["regular", "airy"],
  scales: ["perfect-fifth", "golden", "perfect-fourth"],
  motion: [
    {
      id: "stripe-paint-out",
      name: "Stripe paint-out",
      description: "Once on load, stripes extend along their path like a paint roller, following the bend (stroke-dashoffset on SVG paths), each band 60ms after the one above.",
      duration: "900ms",
      easing: "cubic-bezier(.45,0,.2,1)",
      reduced: "Stripes drawn complete."
    },
    {
      id: "sliding-panel",
      name: "Sliding panel",
      description: "Hovering a stripe-labelled link slides its band 8px to the right with a small overshoot, like a sliding wardrobe door.",
      duration: "220ms",
      easing: "cubic-bezier(.34,1.56,.64,1)",
      reduced: "No slide; the band changes colour."
    },
    {
      id: "still",
      name: "Still",
      description: "Nothing moves; hover swaps a number dot\u2019s fill to the next stripe colour.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "rainbow-bands",
      name: "Rainbow bands",
      description: "4\u20135 parallel bands in palette order, equal widths, hard edges, bending with large radii; built from stacked SVG paths or nested borders with border-radius."
    },
    {
      id: "number-dots",
      name: "Number dots",
      description: "Section numbers or prices inside solid circles 1.5\xD7 the cap height, colour-coded by band."
    },
    {
      id: "sunset-arcs",
      name: "Sunset arcs",
      description: "Five concentric half-circles in stripe colours sitting on a horizon line, used as a section terminator."
    }
  ],
  anchors: [
    {
      id: "bent-rainbow",
      name: "Bent rainbow",
      description: "The stripe stack wraps the first screen from the left edge down to the bottom with a 200px corner; the title sits on the top band at 12vw."
    },
    {
      id: "fat-wordmark",
      name: "Fat wordmark",
      description: "The name at fit-to-width size in fat rounded type, brown on wheat, with a short stripe stack beneath like a shop fascia."
    },
    {
      id: "paperback-front",
      name: "Paperback front",
      description: "The first screen is a tripartite book cover (band / field / band) with one stripe graphic in the middle."
    }
  ],
  surfaces: [
    {
      id: "wall-emulsion",
      name: "Wall emulsion",
      description: "Flat matte painted-wall colour; stripes look rolled on.",
      css: "background: var(--paper);"
    },
    {
      id: "sun-faded",
      name: "Sun-faded print",
      description: "Colours slightly faded with a warm yellow cast, like a poster left in a shop window.",
      css: "background-image: linear-gradient(rgba(240,200,120,.08), rgba(240,200,120,.08)); filter: saturate(.92);"
    },
    {
      id: "paperback-stock",
      name: "Paperback stock",
      description: "Off-white pulp paper with sparse fibre speckle.",
      css: "background-image: radial-gradient(rgba(90,60,30,.07) 1px, transparent 1.5px); background-size: 7px 9px;"
    }
  ],
  must: [
    "At least one stripe group of 3\u20135 parallel bands that bends around a large-radius corner or forms an arc.",
    "Headlines in a fat, rounded or swashy display face \u2014 no thin weights.",
    "Orange, brown and mustard (or the palette\u2019s earth equivalents) are all present."
  ],
  mustNot: [
    "No neon pinks or purples \u2014 that is the 80s, not the 70s.",
    "No smooth blends between bands; every band edge is hard.",
    "No disco clich\xE9s: mirror balls, flared-trouser silhouettes, peace signs as decoration.",
    "No hairline type for titles."
  ]
};
var memphisPop = {
  id: "memphis-pop",
  name: { zh: "\u5B5F\u83F2\u65AF", en: "Memphis pop" },
  family: "modernist",
  concept: {
    zh: "\u7D22\u7279\u8428\u65AF\u4E0E\u675C\xB7\u5E15\u65AF\u594E\u5C14\u7684\u5B5F\u83F2\u65AF\u5C0F\u7EC4\uFF1A\u5F2F\u5F2F\u66F2\u66F2\u7684\u7C97\u7EBF\u3001\u6C34\u78E8\u77F3\u6591\u70B9\u3001\u5F69\u7EB8\u5C51\u56FE\u6848\u3001\u9ED1\u767D\u5C0F\u65B9\u683C\uFF0C\u7C89\u5F69\u548C\u539F\u8272\u6B63\u9762\u76F8\u649E\u3002\u5BB6\u5177\u50CF\u73A9\u5177\uFF0C\u56FE\u5F62\u50CF\u5728\u5F00\u6D3E\u5BF9\u2014\u2014\u6545\u610F\u7684\u4E0D\u548C\u8C10\uFF0C\u4F46\u6BCF\u5757\u989C\u8272\u90FD\u8FB9\u7F18\u6E05\u695A\u3002",
    en: "The Memphis Group of Sottsass and du Pasquier: squiggles, terrazzo flecks, confetti prints, black-and-white grids, pastels colliding with primaries. Furniture like toys, graphics like a party \u2014 deliberate clashes, but every colour field has a crisp outline."
  },
  references: [
    "Ettore Sottsass, Carlton room divider (1981)",
    "Nathalie du Pasquier, laminate and textile patterns for Memphis (1981\u20131987)",
    "Peter Shire, Bel Air armchair (1982)",
    "Christoph Radl, Memphis catalogues and posters (1981\u20131988)",
    "Ettore Sottsass, \u201CBacterio\u201D print for Abet Laminati (1978)"
  ],
  keywords: ["\u5F2F\u66F2\u7EBF", "\u6C34\u78E8\u77F3", "\u5F69\u7EB8\u5C51", "\u9ED1\u767D\u65B9\u683C", "\u7C89\u5F69\u649E\u8272", "\u73A9\u5177\u611F"],
  tokens: {
    grid: "12 columns, 16px gutter, 32px margins; coloured blocks may be offset by one column or rotated \xB13\u20138\xB0, but text inside a block is always straight and aligned.",
    radius: "0 for laminate blocks; 50% for discs; half- and quarter-discs via one- or two-corner radii (e.g. border-radius: 0 0 0 100%).",
    border: "3px solid ink outline on every coloured block; patterns meet along 3px ink lines.",
    shadow: "Hard offsets only: 8px 8px 0 var(--ink) (or a pattern-filled offset block). Never blurred."
  },
  layouts: [
    {
      id: "furniture-stack",
      name: "Furniture stack",
      description: "Content blocks stacked like a Sottsass totem: each block a different shape and pattern, balanced on the one below.",
      grid: "12 col; stack axis cols 4\u20139; blocks 4\u20138 columns wide, offset \xB11 col; side columns carry small text and confetti.",
      structure: [
        "Top piece: name on a half-disc or pyramid",
        "Statement block on a terrazzo panel",
        "Offer blocks of different widths stacked off-axis",
        "Plinth: black-and-white grid block carrying contact details"
      ]
    },
    {
      id: "pattern-patchwork",
      name: "Pattern patchwork",
      description: "A collage of rectangular patches, each with a different fill (grid, squiggle, terrazzo, solid), with paper-coloured content panels pinned on top.",
      grid: "CSS grid 6 \xD7 n, 0 gap, patches span 1\u20133 cells; content panels span 2\u20134 cells and overlap patch borders by 16px.",
      structure: [
        "Patchwork hero: 6\u20138 patterned patches with the title panel overlapping three of them",
        "Facts as tilted label panels (rotated \xB14\xB0)",
        "Schedule/table on a black-and-white grid ground",
        "Footer row of patches with contact"
      ]
    },
    {
      id: "catalogue-object",
      name: "Catalogue page",
      description: "Like a Memphis catalogue: one object (or the product) on a coloured ground with geometric props around it, captions in tidy columns.",
      grid: "8 col, 24px gutter; object field cols 1\u20135 (square), caption cols 6\u20138; sections alternate sides.",
      structure: [
        "Catalogue cover: name + year/edition with a squiggle and a disc prop",
        "Object spreads: 2\u20134 items alternating left/right, each with a caption (name, material, size/price)",
        "Pattern index: small swatches naming the patterns used",
        "Colophon in two columns"
      ]
    }
  ],
  type: [
    {
      id: "bungee-shade-kumbh",
      name: "Bungee Shade + Kumbh Sans",
      display: {
        family: "Bungee Shade",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: { family: "Kumbh Sans", weights: [400, 700], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Bungee Shade (caps only) for 1\u20133 word titles at 48px+, tracking 0.02em, always on a solid panel, never on a pattern. Kumbh Sans body 16/1.55; 700 for caption labels."
    },
    {
      id: "chango-questrial",
      name: "Chango + Questrial",
      display: { family: "Chango", weights: [400], fallback: '"Arial Black", sans-serif', source: "google" },
      body: { family: "Questrial", weights: [400], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Chango (wide, heavy, toy-like) for titles at 40\u201396px, mixed case, line-height 1.05. Questrial body 16/1.6; captions 13px uppercase tracking 0.1em."
    },
    {
      id: "titan-karla",
      name: "Titan One + Karla",
      display: {
        family: "Titan One",
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: "google"
      },
      body: { family: "Karla", weights: [400, 700], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Titan One for chunky round titles at 36\u201380px, mixed case; the whole title block may sit at -4\xB0. Karla body 16/1.55, 700 for item names."
    }
  ],
  palettes: [
    {
      id: "pastel-clash",
      name: "Pastel clash",
      colors: {
        paper: "#fff8ee",
        ink: "#121212",
        muted: "#4a4a4a",
        accent: "#f06e9c",
        accent2: "#2a5bd7",
        rule: "#121212",
        panel: "#a8e6d4"
      },
      usage: "Ivory ground; black outlines and grids; flamingo pink and cobalt as the clashing pair on blocks (\u224830% combined); mint panels behind text; yellow only inside patterns."
    },
    {
      id: "laminate-yellow",
      name: "Laminate yellow",
      colors: {
        paper: "#ffd84a",
        ink: "#141414",
        muted: "#4a3d00",
        accent: "#e8412c",
        accent2: "#1b8a6b",
        rule: "#141414",
        panel: "#ffffff"
      },
      usage: "Bright laminate-yellow ground; red and green blocks; white outlined panels carry all text; black grids and squiggles."
    },
    {
      id: "bacterio-black",
      name: "Bacterio black",
      colors: {
        paper: "#141414",
        ink: "#fbf3e6",
        muted: "#b3aca0",
        accent: "#f4a6c0",
        accent2: "#8fd3c7",
        rule: "#fbf3e6",
        panel: "#2a2a2a"
      },
      usage: "Black ground with cream squiggles and flecks; pastel pink and aqua blocks with black text on them; outlines in cream. Pastels stay chalky, never neon."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fifth", "augmented-fourth", "major-third"],
  motion: [
    {
      id: "toy-wobble",
      name: "Toy wobble",
      description: "Hovering a block rocks it -3\xB0 \u2192 +2\xB0 \u2192 0\xB0, like a stacked toy settling.",
      duration: "420ms",
      easing: "cubic-bezier(.34,1.56,.64,1)",
      reduced: "No rotation; swap the block\u2019s pattern fill."
    },
    {
      id: "pattern-shuffle",
      name: "Pattern shuffle",
      description: "Hovering a patch cycles its fill through three patterns in hard steps.",
      duration: "300ms",
      easing: "steps(3, end)",
      reduced: "The pattern changes once, without stepping."
    },
    {
      id: "squiggle-draw",
      name: "Squiggle draw",
      description: "The signature squiggle draws itself once on load (stroke-dashoffset), nothing else moves.",
      duration: "800ms",
      easing: "cubic-bezier(.6,0,.4,1)",
      reduced: "Squiggle drawn complete."
    }
  ],
  motifs: [
    {
      id: "squiggles",
      name: "Squiggles",
      description: "Thick (6\u201310px) wavy SVG strokes with round caps in ink or accent, scattered at \xB130\xB0 across panels; at most 5 per screen."
    },
    {
      id: "terrazzo-confetti",
      name: "Terrazzo / confetti",
      description: "Random flecks \u2014 triangles, dashes, dots 4\u201312px \u2014 in three palette colours, like du Pasquier laminates."
    },
    {
      id: "bw-grid",
      name: "Black-and-white grid",
      description: "2px ink grid at 12\u201314px pitch on paper, Abet-laminate style, filling one large shape per screen."
    }
  ],
  anchors: [
    {
      id: "object-totem",
      name: "Object totem",
      description: "A stacked sculpture of 4\u20136 geometric shapes with different fills stands at the left; the title sits on the right."
    },
    {
      id: "patch-collage",
      name: "Patch collage",
      description: "The first screen is 6\u20138 patterned rectangles with the title on a solid panel overlapping them, rotated -4\xB0."
    },
    {
      id: "squiggle-title",
      name: "Squiggle title",
      description: "A huge title with a 12px squiggle underline and two geometric props (disc, triangle) touching the letters."
    }
  ],
  surfaces: [
    {
      id: "plastic-laminate",
      name: "Plastic laminate",
      description: "Flat colour fields with 3px ink outlines \u2014 the Abet Laminati look.",
      css: "background: var(--panel); outline: 3px solid var(--ink);"
    },
    {
      id: "terrazzo",
      name: "Terrazzo",
      description: "Scattered coloured flecks on paper.",
      css: "background-image: radial-gradient(circle at 20% 30%, var(--accent) 0 3px, transparent 4px), radial-gradient(circle at 70% 60%, var(--accent2) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, var(--ink) 0 2px, transparent 3px); background-size: 60px 60px, 44px 44px, 36px 36px;"
    },
    {
      id: "grid-laminate",
      name: "Grid laminate",
      description: "Black grid on paper for one large shape per screen.",
      css: "background-color: var(--paper); background-image: linear-gradient(var(--ink) 2px, transparent 2px), linear-gradient(90deg, var(--ink) 2px, transparent 2px); background-size: 14px 14px;"
    }
  ],
  must: [
    "At least three different pattern fills (grid, squiggle, terrazzo/confetti) appear on the page.",
    "Every coloured block has a visible ink outline or a hard offset \u2014 crisp edges.",
    "At least one pastel and one primary colour collide in the same view.",
    "Body copy always sits on a solid panel."
  ],
  mustNot: [
    "No gradients and no glows \u2014 Memphis is flat laminate.",
    "No synthwave clich\xE9s: neon grids to the horizon, chrome lettering, sunsets.",
    "No pattern behind body text.",
    "No blurred shadows; only hard offsets."
  ]
};
var warmHandmade = {
  id: "warm-handmade",
  name: { zh: "\u624B\u4F5C\u6E29\u5EA6", en: "Warm handmade" },
  family: "craft",
  concept: {
    zh: "\u8857\u89D2\u624B\u4F5C\u5C0F\u5E97\u7684\u6E29\u5EA6\uFF1A\u725B\u76AE\u7EB8\u3001\u6A61\u76AE\u7AE0\u3001\u624B\u5199\u6807\u7B7E\u3001\u9EBB\u7EF3\u3001\u6728\u523B\u7248\u753B\u5C0F\u63D2\u56FE\uFF0C\u4EE5\u53CA\u6B6A\u4E00\u70B9\u7684\u624B\u7ED8\u8FB9\u6846\u3002\u4E0D\u5B8C\u7F8E\u662F\u8BC1\u636E\u2014\u2014\u8BF4\u660E\u771F\u7684\u6709\u4EBA\u4E00\u4EF6\u4EF6\u505A\u51FA\u6765\u3001\u4E00\u4E2A\u4E2A\u5199\u4E0A\u53BB\u3002",
    en: "The warmth of a corner shop that makes things by hand: kraft paper, rubber stamps, handwritten labels, twine, linocut vignettes and slightly crooked hand-drawn borders. The imperfection is evidence \u2014 someone really made each thing and wrote each label."
  },
  references: [
    "Edward Bawden linocuts and shop posters (1950s\u20131980s)",
    "Whole Earth Catalog hand-pasted layouts (1968\u20131972)",
    "Hand-written POP price cards in Japanese \u96D1\u8CA8 shops",
    "Kraft-paper bakery bags with rubber-stamped logos",
    "Farmers\u2019 market chalkboards"
  ],
  keywords: ["\u725B\u76AE\u7EB8", "\u6A61\u76AE\u7AE0", "\u624B\u5199\u6807\u7B7E", "\u9EBB\u7EF3", "\u6728\u523B\u7248\u753B", "\u624B\u7ED8\u8FB9\u6846"],
  tokens: {
    grid: "Loose 6-column grid, 24px gutter, 32px margins; at most one element in three sits \xB11\u20132\xB0 off-axis or \xB14px off-grid; 8px baseline for body only.",
    radius: "0\u20133px on paper tags; tag corners cut with clip-path; hand-drawn borders are SVG paths, not border-radius.",
    border: 'Hand-drawn: SVG strokes 1.5\u20132.5px with slight wobble (feTurbulence + feDisplacementMap, scale 2\u20133); 2px dashed "stitch" lines for sewn edges.',
    shadow: "Paper only: 1px 2px 0 rgba(60,40,20,.25) under taped or pinned labels; no blurred shadows."
  },
  layouts: [
    {
      id: "shop-counter",
      name: "Shop counter",
      description: "Like the counter of a small shop: a hand-lettered sign at the top, tags hanging from a twine line in the middle, a notice board at the bottom.",
      grid: "6 col; sign spans cols 1\u20134 rotated -1\xB0; twine line full width with 3\u20135 tags of 1\u20132 columns each; notice board cols 3\u20136.",
      structure: [
        'Sign: name hand-lettered on a kraft board with a stamped "est./since" line',
        "Twine line: each hanging tag is one product or offer with a handwritten price",
        "Notice board: hours and news as pinned paper notes",
        "Stamp footer: address inside a circular rubber stamp + contact"
      ]
    },
    {
      id: "recipe-cards",
      name: "Recipe cards",
      description: "An index-card system: each section is a lined card with a handwritten title and typed body, stacked with slight offsets.",
      grid: "Cards 560px wide in one column, alternating \xB112px x-offset and \xB11.5\xB0 rotation; ruled lines every 28px; 40px between cards.",
      structure: [
        "Cover card: name in handwriting, linocut vignette in a corner",
        "Card 1: what we make \u2014 a typed list",
        "Cards 2\u20133: one per product or service, each with a stamped label",
        "Last card: how to find us \u2014 address, hours, a small hand-drawn map"
      ]
    },
    {
      id: "kraft-bag",
      name: "Kraft bag",
      description: "The page is a kraft bag: a big rubber-stamp logo on the front, a paper label band wrapped around, the back panel printed with details.",
      grid: "8 col; stamp 4 col wide in the first screen; label band full width rotated -2\xB0; back panel in 2 columns of 4, 24px gutter.",
      structure: [
        "Front: stamp logo + a handwritten note on a small label",
        "Label band: one-line statement across the width",
        "Back panel: materials/ingredients list + care or usage notes",
        "Seal sticker: contact info inside a round sticker",
        "Footer with a stitched (dashed) bottom edge"
      ]
    }
  ],
  type: [
    {
      id: "caveat-alegreya-sans",
      name: "Caveat + Alegreya Sans",
      display: {
        family: "Caveat",
        weights: [500, 700],
        fallback: '"Bradley Hand", "Segoe Print", cursive',
        source: "google"
      },
      body: {
        family: "Alegreya Sans",
        weights: [400, 500, 700],
        fallback: '"Gill Sans", Calibri, sans-serif',
        source: "google"
      },
      cjk: { display: "Long Cang", body: "Noto Sans SC" },
      notes: "Caveat for handwritten labels, prices and titles at 28\u201372px; rotate whole labels -2\xB0 to +2\xB0, never individual letters; never for paragraphs. Alegreya Sans body 17/1.6. Prices in Caveat 700 with a smaller currency sign."
    },
    {
      id: "stamp-courier",
      name: "Rubik Dirt + Courier Prime",
      display: { family: "Rubik Dirt", weights: [400], fallback: "Impact, sans-serif", source: "google" },
      body: {
        family: "Courier Prime",
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Serif SC" },
      notes: "Rubik Dirt as the rubber stamp: uppercase, tracking 0.06em, in accent at 85% opacity with mix-blend-mode: multiply, block rotated -3\xB0. Courier Prime body 16/1.55 like typed tags; underline with a hand-drawn SVG stroke, not CSS."
    },
    {
      id: "amatic-alegreya",
      name: "Amatic SC + Alegreya",
      display: {
        family: "Amatic SC",
        weights: [700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Alegreya",
        weights: [400, 500, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "LXGW WenKai TC", body: "Noto Serif SC" },
      notes: "Amatic SC tall hand-drawn capitals for chalkboard signs at 48\u2013120px, tracking 0.04em, line-height 1.0; never below 28px. Alegreya body 17/1.6, italic for notes and origins."
    }
  ],
  palettes: [
    {
      id: "kraft-and-stamp",
      name: "Kraft and stamp ink",
      colors: {
        paper: "#d8bf96",
        ink: "#2a1d12",
        muted: "#5a4127",
        accent: "#b5352a",
        accent2: "#2f4d6b",
        rule: "#6b4e2f",
        panel: "#f3ead8"
      },
      usage: "Kraft ground (\u224860%); off-white tags and labels carry text (\u224830%); stamp red for logos and prices; indigo stamp ink for secondary marks; twine and rules in brown."
    },
    {
      id: "linen-sage",
      name: "Linen and sage",
      colors: {
        paper: "#f6f0e4",
        ink: "#2b2620",
        muted: "#645a4d",
        accent: "#5c7a3a",
        accent2: "#c06a2b",
        rule: "#8a7a64",
        panel: "#e9dfcb"
      },
      usage: "Unbleached linen page; sage for stamps and headings; terracotta for prices and one linocut; kraft-tone panels behind tags."
    },
    {
      id: "chalkboard",
      name: "Chalkboard",
      colors: {
        paper: "#2e3430",
        ink: "#f1ede2",
        muted: "#b9b9ae",
        accent: "#f2c14e",
        accent2: "#e98a7d",
        rule: "#c8c6bb",
        panel: "#3a413c"
      },
      usage: "Green-black board; chalk-white handwriting and body; yellow chalk for prices, pink chalk for one highlight per section; panels a step lighter like a cleaner patch of board."
    }
  ],
  densities: ["regular", "airy"],
  scales: ["major-third", "perfect-fourth"],
  motion: [
    {
      id: "stamp-press",
      name: "Stamp press",
      description: "Rubber stamps arrive by pressing: scale 1.15 \u2192 0.97 \u2192 1 and opacity 0 \u2192 0.85, once when first visible; the ink stays slightly uneven.",
      duration: "260ms",
      easing: "cubic-bezier(.2,.9,.3,1.2)",
      reduced: "Stamps shown at rest."
    },
    {
      id: "tag-swing",
      name: "Tag swing",
      description: "Hovering a hanging tag swings it from its hole: 0\xB0 \u2192 4\xB0 \u2192 -2\xB0 \u2192 0\xB0.",
      duration: "600ms",
      easing: "cubic-bezier(.36,.07,.19,.97)",
      reduced: "No swing; the tag text gets a hand-drawn underline."
    },
    {
      id: "still",
      name: "Still",
      description: "Nothing moves; links get a hand-drawn SVG squiggle underline on hover.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "rubber-stamps",
      name: "Rubber stamps",
      description: 'Round or rectangular stamps (logo, date, "HANDMADE", \u624B\u4F5C) with uneven ink: an SVG noise mask knocks 15\u201325% out of the fill.'
    },
    {
      id: "twine-tags",
      name: "Twine and tags",
      description: "Paper tags with a punched hole and a 2px dashed brown twine line tying them to a line or item."
    },
    {
      id: "linocut-vignettes",
      name: "Linocut vignettes",
      description: "Small one-colour SVG illustrations with gouged-line texture (solid shapes, white carving lines), depicting the actual products (bread, cup, leaf, needle)."
    }
  ],
  anchors: [
    {
      id: "hand-sign",
      name: "Hand-lettered sign",
      description: "The name hand-lettered at 10\u201314vw on a kraft or chalk board, rotated -1\xB0, with a stamped date line below."
    },
    {
      id: "tag-line-up",
      name: "Tag line-up",
      description: "A twine line crosses the first screen with 3\u20135 hanging tags of different sizes, each a real item and price from the facts."
    },
    {
      id: "big-stamp",
      name: "Big stamp",
      description: "One large circular rubber stamp (40vw) with the name around the ring and a linocut vignette in the centre."
    }
  ],
  surfaces: [
    {
      id: "kraft-fibre",
      name: "Kraft fibre",
      description: "Brown kraft with visible fibre streaks and specks.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(83deg, rgba(90,60,30,.05) 0 1px, transparent 1px 7px), radial-gradient(rgba(60,40,20,.08) 1px, transparent 1px); background-size: auto, 5px 5px;"
    },
    {
      id: "masking-tape",
      name: "Masking tape",
      description: "Labels held by tape strips at the corners: 64\xD720px, rotated \xB112\xB0, with torn ends.",
      css: "background: rgba(236,222,180,.8); clip-path: polygon(0 10%, 4% 0, 96% 8%, 100% 0, 100% 90%, 96% 100%, 4% 92%, 0 100%);"
    },
    {
      id: "chalk-dust",
      name: "Chalk dust",
      description: "A board with faint smudged eraser marks.",
      css: "background-image: radial-gradient(ellipse at 30% 40%, rgba(255,255,255,.05), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,.04), transparent 55%);"
    }
  ],
  must: [
    "At least one genuinely hand-made element: hand-lettered display, a stamp with uneven ink, or a wobbly hand-drawn border.",
    "Prices, hours and items are written as labels or tags, not as a generic table.",
    "Illustrations, if any, are one-colour linocut-style and depict real items from the facts."
  ],
  mustNot: [
    'No farmhouse clip-art clich\xE9s: "Live Laugh Love" script, mason-jar icons, wood-plank photo backgrounds.',
    "No handwriting face for body paragraphs \u2014 labels and titles only.",
    "No glossy gradients, no perfect geometric icon sets.",
    "Do not tilt everything: at most one element in three is off-axis."
  ]
};
var maWhitespace = {
  id: "ma-whitespace",
  name: { zh: "\u4F59\u767D", en: "Ma whitespace" },
  family: "craft",
  concept: {
    zh: '\u65E5\u672C\u7684"\u95F4"\uFF1A\u65E0\u5370\u826F\u54C1\u7684\u76EE\u5F55\u3001\u539F\u7814\u54C9\u7684\u5C55\u89C8\u4E66\u3001Nendo \u7684\u4F5C\u54C1\u96C6\u4E0E\u65E5\u672C\u7684\u4E66\u7C4D\u88C5\u5E27\u3002\u5927\u9762\u79EF\u7684\u7559\u767D\u4E0D\u662F\u7A7A\uFF0C\u800C\u662F\u8BA9\u4E00\u4EF6\u7269\u3001\u4E00\u884C\u5B57\u88AB\u5B89\u9759\u5730\u770B\u89C1\uFF1B\u7AD6\u6392\u3001\u7EC6\u5C0F\u800C\u7CBE\u786E\u7684\u5B57\u53F7\uFF0C\u53EA\u7559\u4E00\u4E2A\u514B\u5236\u7684\u70B9\u8272\u3002',
    en: "Japanese ma (\u9593): Muji catalogues, Kenya Hara\u2019s exhibition books, Nendo monographs and Japanese book design. The vast emptiness is not absence \u2014 it lets one object or one line be seen in quiet. Vertical setting, tiny precise type, a single restrained accent."
  },
  references: [
    "Kenya Hara, \u201CWhite\u201D (2008) and \u201CDesigning Design\u201D (2007)",
    "Ikko Tanaka, early Muji posters and catalogues (1980s)",
    "Nendo monographs and exhibition catalogues",
    "Iwanami Bunko paperback bindings (\u5CA9\u6CE2\u6587\u5EAB)",
    "Kenya Hara, \u201CHaptic\u201D exhibition catalogue (2004)"
  ],
  keywords: ["\u4F59\u767D", "\u7AD6\u6392", "\u7EC6\u5C0F\u5B57\u53F7", "\u660E\u671D\u4F53", "\u4E00\u70B9\u8272", "\u5B89\u9759"],
  tokens: {
    grid: "12 columns, 32px gutter, 10vw outer margin; content occupies \u2264 40% of any screen; 6px baseline; vertical blocks use writing-mode: vertical-rl with line length 18\u201328em.",
    radius: "0.",
    border: "Hairlines only (1px at 40% ink), never full-width: short 24\u201380px rules mark the start or end of a block.",
    shadow: "none."
  },
  layouts: [
    {
      id: "vertical-colophon",
      name: "Vertical colophon",
      description: "A book page: the title set vertically at the right edge, a short vertical text column to its left, the rest of the first screen empty.",
      grid: "12 col; vertical title in cols 11\u201312 from 12vh; vertical text block in cols 8\u201310; cols 1\u20137 empty except a tiny page number bottom-left; 6px baseline.",
      structure: [
        "Right edge: vertical title + small vertical subtitle",
        "Vertical text block (writing-mode: vertical-rl) of 3\u20136 short lines",
        "Turn: one object image, or an empty field with a single 11px caption",
        "Horizontal end matter: facts in a small label/value table starting at col 2",
        "Colophon: 11px lines under a 40px hairline"
      ]
    },
    {
      id: "object-catalogue",
      name: "Object catalogue",
      description: "A Muji catalogue: one object (or one fact) per screen, small and low, a three-line caption beside it, vast paper around.",
      grid: "12 col; object box 3\u20134 columns wide in cols 5\u20138, bottom third of each 100vh section; caption cols 9\u201310 aligned to the object\u2019s base.",
      structure: [
        "Opening: name at 14px top-left; one line of text near the bottom; nothing else",
        "Object 1: image or typographic object + caption (name / material / price)",
        "Objects 2\u2026n: the same quiet rhythm, alternating left and right",
        "Index: tiny numbered list of all items",
        "Closing: address and hours at 12px bottom-right"
      ]
    },
    {
      id: "exhibition-book",
      name: "Exhibition book",
      description: "A Kenya Hara exhibition catalogue: horizontal text in a narrow measure, a large field of paper, one accent hairline as a bookmark.",
      grid: "12 col; text measure 26\u201332em in cols 3\u20136; marginal notes cols 9\u201310; top margin 30vh; 6px baseline.",
      structure: [
        "Title page: title 18\u201324px at 30vh, date/author below, one 40px accent hairline",
        "Essay: 2\u20134 short paragraphs in narrow measure with marginal notes",
        "Plate: one full-width image or a bare paper field with a caption",
        "Facts: label/value pairs with 2em gaps between rows",
        "Back matter: contact at 11px"
      ]
    }
  ],
  type: [
    {
      id: "shippori-garamond",
      name: "Shippori Mincho + EB Garamond",
      display: {
        family: "Shippori Mincho",
        weights: [400, 600],
        fallback: '"Hiragino Mincho ProN", "Yu Mincho", serif',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: 'Titles small and quiet: 20\u201332px, weight 400, tracking 0.08em (Latin) / 0.12em (CJK). Body 14\u201315px/1.9 (CJK) or 16/1.7 (Latin) with font-feature-settings: "palt" for CJK and old-style figures in Garamond. Vertical CJK with text-orientation: mixed.'
    },
    {
      id: "zen-kaku-label",
      name: "Zen Kaku Gothic New (Muji label)",
      display: {
        family: "Zen Kaku Gothic New",
        weights: [300, 500],
        fallback: '"Hiragino Sans", "Yu Gothic", sans-serif',
        source: "google"
      },
      body: {
        family: "Zen Kaku Gothic New",
        weights: [400],
        fallback: '"Hiragino Sans", "Yu Gothic", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Label voice: everything 11\u201314px, weights 300\u2013500, tracking 0.04em; only the name may reach 20px. Captions as three stacked lines: name / material / price. Tabular figures. No bold, no uppercase."
    },
    {
      id: "klee-old-mincho",
      name: "Klee One + Zen Old Mincho",
      display: {
        family: "Klee One",
        weights: [400, 600],
        fallback: '"Hiragino Mincho ProN", serif',
        source: "google"
      },
      body: { family: "Zen Old Mincho", weights: [400], fallback: '"Yu Mincho", serif', source: "google" },
      cjk: { display: "LXGW WenKai TC", body: "Noto Serif SC" },
      notes: "Klee One (pencil textbook hand) for titles and captions at 18\u201328px, tracking 0.05em \u2014 like a note in a notebook margin. Body Zen Old Mincho 15/1.9. Nothing on the page exceeds 32px."
    }
  ],
  palettes: [
    {
      id: "paper-white-muji-red",
      name: "Paper white, Muji red",
      colors: {
        paper: "#f7f5f0",
        ink: "#1f1f1d",
        muted: "#6b6862",
        accent: "#7f0019",
        accent2: "#8a8578",
        rule: "#c9c5bb",
        panel: "#efece4"
      },
      usage: "Paper \u224890% of every screen; ink text tiny; the burgundy accent appears once per screen (a hairline, a dot or one word); panel only behind the facts table."
    },
    {
      id: "unbleached-pine",
      name: "Unbleached paper, pine",
      colors: {
        paper: "#e9e2d4",
        ink: "#2a2723",
        muted: "#5f584e",
        accent: "#3e5a4a",
        accent2: "#a89f8d",
        rule: "#bfb5a3",
        panel: "#f2ede3"
      },
      usage: "Unbleached kraft tone; warm dark ink; pine green as the single accent for the current item; panels lighter than the paper, like an inset label."
    },
    {
      id: "sumi-evening",
      name: "Sumi evening",
      colors: {
        paper: "#1c1b19",
        ink: "#e9e5dc",
        muted: "#9b968b",
        accent: "#b8a37e",
        accent2: "#6b675f",
        rule: "#3a3833",
        panel: "#24231f"
      },
      usage: "Charcoal page like an evening catalogue; warm off-white type; one pale washi-gold hairline or dot per screen."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["major-second", "minor-third"],
  motion: [
    {
      id: "page-turn",
      name: "Page turn",
      description: "Sections behave like pages: scroll-snap-type: y mandatory, each section 100vh. Arriving on a page, nothing animates \u2014 only the small page number changes.",
      duration: "0ms",
      easing: "linear",
      reduced: "Same behaviour; drop scroll-snap if it fights the user."
    },
    {
      id: "shoji-light",
      name: "Light through paper",
      description: "Hovering an item lifts its caption from muted to ink and its hairline from rule to accent over a long, calm curve \u2014 like light shifting behind a shoji. Nothing changes position.",
      duration: "600ms",
      easing: "cubic-bezier(.25,.1,.25,1)",
      reduced: "Instant colour change."
    },
    {
      id: "still",
      name: "Still",
      description: "Nothing moves. Hover only turns a short hairline from rule colour to accent.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "short-hairline",
      name: "Short hairline",
      description: "A single 40\u201380px hairline marks the start of a block or page; never full width."
    },
    {
      id: "vertical-lines",
      name: "Vertical lines",
      description: "Key lines set in writing-mode: vertical-rl (CJK upright, Latin sideways), aligned to the right edge of their column."
    },
    {
      id: "single-dot",
      name: "One dot",
      description: "One 6\u20138px accent dot per screen marking the current item, page or the one thing that matters."
    }
  ],
  anchors: [
    {
      id: "empty-field",
      name: "The empty field",
      description: "The first screen is almost empty: the name at 14\u201318px in one corner and one short line at the opposite corner. Nothing else."
    },
    {
      id: "vertical-title",
      name: "Vertical title",
      description: "A vertical title of 4\u201310 characters at the right edge (32\u201348px) with a vertical sub-line; the rest is paper."
    },
    {
      id: "single-object",
      name: "Single object",
      description: "One object (a supplied photo on plain ground or a drawn outline) small in the lower centre, \u224815% of the screen, with a 3-line caption."
    }
  ],
  surfaces: [
    {
      id: "smooth-white",
      name: "Smooth paper",
      description: "Warm uncoated paper with no visible texture.",
      css: "background: var(--paper);"
    },
    {
      id: "washi-fibre",
      name: "Washi fibre",
      description: "Very faint long fibres crossing the page.",
      css: "background-image: repeating-linear-gradient(12deg, rgba(0,0,0,.018) 0 1px, transparent 1px 23px), repeating-linear-gradient(-34deg, rgba(0,0,0,.014) 0 1px, transparent 1px 31px);"
    },
    {
      id: "book-cloth",
      name: "Book cloth",
      description: "Panels textured like a cloth binding: a fine 3px cross-weave at 3% ink.",
      css: "background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.03) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0 1px, transparent 1px 3px);"
    }
  ],
  must: [
    "Text and images together occupy \u2264 40% of each screen; the rest is paper.",
    "At least one vertical text block (writing-mode: vertical-rl) when the page is Chinese or Japanese.",
    "Body and captions are small (11\u201315px) and precise; the largest type on the page is \u2264 48px.",
    "Exactly one accent colour, used at most once per screen."
  ],
  mustNot: [
    "No big bold headlines, hero banners or stacked cards.",
    "No Zen clich\xE9s: ens\u014D brush circles, bamboo, cherry blossom, stacked stones, or pseudo-Asian Latin fonts.",
    "No full-width rules, borders or boxes around content.",
    'Do not fill space because it "looks empty".'
  ]
};
var inkAndSeal = {
  id: "ink-and-seal",
  name: { zh: "\u6C34\u58A8\u5370\u7AE0", en: "Ink and seal" },
  family: "craft",
  concept: {
    zh: "\u4E2D\u56FD\u6C34\u58A8\u4E0E\u7BC6\u523B\uFF1A\u5C71\u6C34\u7684\u58A8\u5206\u4E94\u8272\uFF0C\u4ECE\u7126\u58A8\u6655\u5F00\u5230\u6DE1\u58A8\u518D\u5230\u7EB8\u767D\uFF1B\u6587\u4EBA\u753B\u7684\u9898\u8DCB\u7AD6\u5199\u5728\u7559\u767D\u5904\uFF0C\u6731\u6587\u3001\u767D\u6587\u5370\u7AE0\u538B\u5728\u843D\u6B3E\u4E0B\u3002\u5BA3\u7EB8\u7684\u7EA4\u7EF4\u3001\u624B\u5377\u4E0E\u7ACB\u8F74\u7684\u6BD4\u4F8B\u2014\u2014\u9875\u9762\u50CF\u4E00\u5E45\u53EF\u4EE5\u5C55\u5F00\u7684\u753B\u3002",
    en: "Chinese ink painting and seal carving: ink in its five tones, from scorched black through washes to bare paper; literati inscriptions written vertically into the empty sky; red seals in relief (\u6731\u6587) or intaglio (\u767D\u6587) pressed under the signature. Rice-paper fibre and the proportions of handscrolls and hanging scrolls \u2014 the page unrolls like a painting."
  },
  references: [
    "\u9EC4\u516C\u671B\u300A\u5BCC\u6625\u5C71\u5C45\u56FE\u300B(1350)",
    "\u516B\u5927\u5C71\u4EBA (Bada Shanren) ink paintings, late 17th century",
    "\u5434\u660C\u7855 seal carving and calligraphy (1844\u20131927)",
    "\u9F50\u767D\u77F3 paintings with inscriptions and seals",
    "\u8363\u5B9D\u658B \u6728\u7248\u6C34\u5370 woodblock reproductions"
  ],
  keywords: ["\u58A8\u5206\u4E94\u8272", "\u6731\u6587\u767D\u6587", "\u9898\u8DCB", "\u5BA3\u7EB8", "\u624B\u5377", "\u7ACB\u8F74"],
  tokens: {
    grid: "Scroll proportions: hanging-scroll column at 1:3 (\u2248520px wide, left of centre) or a horizontal handscroll track of 80\u2013100vw sections; 24px gutters; mounting bands (\u5929\u5934 / \u5730\u5934) of 8\u201312vh.",
    radius: "0 for mounts and square seals; 50% for round seals; seal edges roughened with an SVG displacement filter.",
    border: "Mounting only: 12\u201324px panel-coloured silk border with a 1px ink inner line (\u9694\u6C34); no other boxes.",
    shadow: "none; depth only through ink-wash tone."
  },
  layouts: [
    {
      id: "hanging-scroll",
      name: "Hanging scroll (\u7ACB\u8F74)",
      description: "The page is a vertical scroll: a top mounting band, a tall narrow painting field with the title written vertically at its right, a seal at the bottom-left, inscription below.",
      grid: "Central column 1:3 (\u2248520px), 10vh \u5929\u5934 band on top; vertical inscription in a 72px column at the painting\u2019s right edge; all content below in the same column width.",
      structure: [
        "\u5929\u5934: plain mounting band with two thin vertical \u60CA\u71D5 strips (2px ink lines)",
        "Painting field: ink-wash landscape (SVG/CSS) with the vertical title and one seal",
        "\u9898\u8DCB: 3\u20138 vertical lines of facts, read right to left",
        "Seal row: name seal + a leisure seal (\u95F2\u7AE0) beside the contact details",
        "\u5730\u5934: closing mounting band"
      ]
    },
    {
      id: "handscroll",
      name: "Handscroll (\u624B\u5377)",
      description: "A horizontal handscroll: content unrolls sideways in a scrolling track, each section a scene with its own inscription and seal.",
      grid: "Horizontal track (overflow-x: auto; scroll-snap-type: x proximity); sections 90vw \xD7 80vh; vertical-rl inscriptions in 64px columns; on mobile the scenes stack vertically.",
      structure: [
        "\u5F15\u9996: the title in large calligraphy on the first panel",
        "Scene 1: ink landscape with the main statement inscribed",
        "Scenes 2\u20133: one per offering or fact group, each with a seal",
        "\u8DCB: colophon with dates, names and contact, several small seals"
      ]
    },
    {
      id: "album-leaf",
      name: "Album leaves (\u518C\u9875)",
      description: "Square album leaves in pairs: a painting square on one side, the inscription square on the other, like a bound \u518C\u9875.",
      grid: "Pairs of squares, each min(44vw, 520px), 32px gutter; on mobile the painting stacks above its text.",
      structure: [
        "Cover board: a title strip (\u7B7E\u6761) on a silk-coloured board",
        "Leaf pairs: painting square + vertical inscription square, 2\u20134 pairs",
        "Seal index: the seals used, each with its reading",
        "Back board: contact details on a label strip"
      ]
    }
  ],
  type: [
    {
      id: "kaishu-mincho",
      name: "Ma Shan Zheng (\u6977) + Zen Old Mincho",
      display: {
        family: "Zen Old Mincho",
        weights: [400, 700],
        fallback: '"Songti SC", "Yu Mincho", serif',
        source: "google"
      },
      body: { family: "Noto Serif", weights: [400, 700], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "Ma Shan Zheng", body: "Noto Serif SC" },
      notes: "CJK titles in Ma Shan Zheng (regular script) at 48\u201396px, vertical (writing-mode: vertical-rl), tracking 0.1em. CJK body Noto Serif SC 16/1.9; inscriptions vertical at 18px. Latin titles in Zen Old Mincho, Latin body Noto Serif 16/1.7 \u2014 never a brush face for Latin."
    },
    {
      id: "xingshu-marcellus",
      name: "Zhi Mang Xing (\u884C) + Marcellus SC",
      display: {
        family: "Marcellus SC",
        weights: [400],
        fallback: '"Trajan Pro", Georgia, serif',
        source: "google"
      },
      body: { family: "Spectral", weights: [300, 400], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "Zhi Mang Xing", body: "Noto Serif SC" },
      notes: "Zhi Mang Xing (running script) for vertical titles and inscriptions at \u2265 28px, one column per 6\u201310 characters. Latin titles in Marcellus SC with tracking 0.12em \u2014 carved inscription, the Latin parallel to seal script on stone. Spectral body 17/1.65."
    },
    {
      id: "caoshu-antique",
      name: "Liu Jian Mao Cao (\u8349) + Zen Antique",
      display: { family: "Zen Antique", weights: [400], fallback: '"Songti SC", serif', source: "google" },
      body: { family: "Crimson Pro", weights: [400, 600], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "Liu Jian Mao Cao", body: "Noto Serif SC" },
      notes: "Liu Jian Mao Cao (cursive script) only for one or two expressive words \u2014 the name or a single character \u2014 at 120px+, as the painted gesture; never for information. All other CJK in Noto Serif SC 16/1.9. Latin headings Zen Antique, body Crimson Pro 17/1.6."
    }
  ],
  palettes: [
    {
      id: "xuan-paper",
      name: "Xuan paper",
      colors: {
        paper: "#f2ecdf",
        ink: "#1b1a17",
        muted: "#5d5850",
        accent: "#b8321f",
        accent2: "#8c8576",
        rule: "#2b2925",
        panel: "#e4dac5"
      },
      usage: "Rice-paper ground (\u224880%); ink black plus washes at 85/55/30/12% for painting and text; vermilion only for seals (\u22643% of area, 1\u20133 seals per screen); silk-tone panel for mounts."
    },
    {
      id: "stele-rubbing",
      name: "Stele rubbing",
      colors: {
        paper: "#121211",
        ink: "#ece6d8",
        muted: "#a29d92",
        accent: "#c4472f",
        accent2: "#5a5850",
        rule: "#ece6d8",
        panel: "#1f1e1c"
      },
      usage: "A stone rubbing (\u7891\u62D3): characters appear paper-white on mottled black; seals in red; panel tone for the mounting strips."
    },
    {
      id: "blue-green-silk",
      name: "Blue-green landscape on silk",
      colors: {
        paper: "#e8dcc0",
        ink: "#1f2420",
        muted: "#545a4f",
        accent: "#2f6f62",
        accent2: "#ad3b26",
        rule: "#7a6a4c",
        panel: "#d6c6a0"
      },
      usage: "\u9752\u7EFF\u5C71\u6C34 on aged silk: malachite green (and its 40% tint) for mountain washes (\u224830% of the painting area); ink for outlines and text; seals in accent2; rule for mount lines."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["golden", "perfect-fifth", "perfect-fourth"],
  motion: [
    {
      id: "ink-bleed",
      name: "Ink bleed",
      description: "On the first screen only, ink washes and calligraphy appear by spreading: a radial mask grows from the brush entry point while blur(6px) settles to 0, like ink soaking into xuan paper.",
      duration: "1200ms",
      easing: "cubic-bezier(.2,.6,.2,1)",
      reduced: "Show the ink at rest."
    },
    {
      id: "seal-press",
      name: "Seal press",
      description: "Seals press in once: scale 1.08 \u2192 1 and opacity 0 \u2192 1 with slightly uneven red (noise mask) \u2014 one firm press.",
      duration: "200ms",
      easing: "cubic-bezier(.3,1.4,.6,1)",
      reduced: "Seals shown in place."
    },
    {
      id: "scroll-unroll",
      name: "Scroll unroll",
      description: "Once on load the mount opens: the painting field\u2019s clip-path insets from 50% to 0 \u2014 vertically for \u7ACB\u8F74, horizontally for \u624B\u5377.",
      duration: "900ms",
      easing: "cubic-bezier(.65,0,.35,1)",
      reduced: "Scroll shown fully open."
    }
  ],
  motifs: [
    {
      id: "seals",
      name: "Seals (\u6731\u6587 / \u767D\u6587)",
      description: "Square or round seals: \u6731\u6587 = red strokes and thin red border on paper; \u767D\u6587 = paper strokes cut out of a solid red block. Seal text in the CJK display face or SVG; edges roughened with feTurbulence + feDisplacementMap (scale 2\u20133)."
    },
    {
      id: "wash-mountains",
      name: "Ink-wash mountains",
      description: "3\u20135 layered mountain silhouettes (SVG paths) in ink at 85/55/30/12%, bottoms fading into paper through a mask; the farthest is the faintest."
    },
    {
      id: "inscription",
      name: "Inscription (\u9898\u8DCB)",
      description: "Facts written in vertical columns right-to-left, ending with a signature and a seal, placed in the painting\u2019s empty sky."
    }
  ],
  anchors: [
    {
      id: "mountain-painting",
      name: "Mountain painting",
      description: "The first screen is a painting: layered ink-wash peaks with paper mist between them, the name inscribed vertically in the sky, one red seal."
    },
    {
      id: "giant-character",
      name: "Giant character",
      description: "One calligraphic character or the name in running/cursive script at 40\u201360vh, wet black on paper, with a small seal and a two-line inscription."
    },
    {
      id: "seal-as-title",
      name: "Seal as title",
      description: "A large carved \u767D\u6587 seal (30\u201340vw) bearing the name is the title; the rest of the first screen is paper and one vertical line of text."
    }
  ],
  surfaces: [
    {
      id: "xuan-fibre",
      name: "Xuan paper",
      description: "Rice paper with long soft fibres, faintly visible.",
      css: 'background-color: var(--paper); background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27f%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.015 .35%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23f)%27 opacity=%27.07%27/%3E%3C/svg%3E");'
    },
    {
      id: "silk-mount",
      name: "Silk mount",
      description: "Mounting bands in damask silk: panel colour with a subtle diagonal weave.",
      css: "background-color: var(--panel); background-image: repeating-linear-gradient(45deg, rgba(0,0,0,.025) 0 2px, transparent 2px 6px);"
    },
    {
      id: "rubbing-black",
      name: "Rubbing black",
      description: "Mottled black like a stele rubbing, with uneven ink density.",
      css: "background-color: var(--paper); background-image: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.04), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,.03), transparent 45%);"
    }
  ],
  must: [
    "At least one red seal (\u6731\u6587 or \u767D\u6587), and it is the only saturated colour on its screen.",
    "On Chinese pages, titles or inscriptions are set vertically (writing-mode: vertical-rl) in a calligraphic CJK face.",
    "Ink appears in at least three tonal values (e.g. 85/55/12%), after \u58A8\u5206\u4E94\u8272.",
    "Bare paper (\u7559\u767D) covers at least 40% of the first screen."
  ],
  mustNot: [
    "No pseudo-Asian \u201Cchop suey\u201D Latin fonts and no brush-styled Latin text.",
    "No dragons, lanterns, red-and-gold festival clich\xE9s.",
    "No seal larger than the inscription it signs, except in the seal-as-title anchor.",
    "No glossy gradients; washes fade into paper, never into colour."
  ]
};
var modernistCraftBranches = [
  swissGrid,
  rawBrutalist,
  bauhausPrimary,
  constructivistPoster,
  artDeco,
  seventiesSupergraphic,
  memphisPop,
  warmHandmade,
  maWhitespace,
  inkAndSeal
];

// vendor/hash-design/packages/core/src/data/branches/_exemplar.ts
var supermarketCircular = {
  id: "supermarket-circular",
  name: { zh: "\u8D85\u5E02\u4FC3\u9500\u5355", en: "Supermarket circular" },
  family: "print",
  concept: {
    zh: "\u5468\u672B\u585E\u8FDB\u4FE1\u7BB1\u7684\u8D85\u5E02\u4FC3\u9500\u5355\uFF1A\u65B0\u95FB\u7EB8\u3001\u538B\u6EE1\u7684\u4EF7\u683C\u3001\u7206\u70B8\u661F\u4EF7\u7B7E\u3001\u7EA2\u9EC4\u4E24\u8272\u5957\u5370\u3002\u4FE1\u606F\u8D8A\u591A\u8D8A\u53EF\u4FE1\uFF0C\u79E9\u5E8F\u6765\u81EA\u7C97\u7EBF\u5206\u683C\u4E0E\u5DE8\u5927\u7684\u6570\u5B57\uFF0C\u800C\u4E0D\u662F\u7559\u767D\u3002",
    en: "The weekend supermarket flyer: newsprint, crammed prices, starburst price tags, red-and-yellow two-colour print. Credibility comes from abundance; order comes from heavy rules and giant numerals, not whitespace."
  },
  references: [
    "1990s Tesco / Safeway weekly circulars",
    "\u534E\u6DA6\u4E07\u5BB6\u3001\u5927\u6DA6\u53D1 DM \u4FC3\u9500\u5355",
    "Japanese \u30C1\u30E9\u30B7 supermarket flyers",
    "Sale signage with hand-cut price cards"
  ],
  keywords: ["\u4EF7\u7B7E", "\u7206\u70B8\u661F", "\u65B0\u95FB\u7EB8", "\u7C97\u7EBF\u5206\u683C", "\u9650\u65F6", "\u5957\u5370"],
  tokens: {
    grid: "12 columns, 8px gutter, 16px outer margin; modules snap to a 4px baseline; cells are separated by 3px ink rules, never by gaps alone.",
    radius: "0 for every box. Price bursts are SVG star polygons (16\u201324 points). Only coupon corners may use a 50% notch made with radial-gradient.",
    border: "3px solid ink between modules; 2px dashed ink for cut-out coupons; 6px accent band under the masthead.",
    shadow: "none. The only allowed depth is a hard 4px 4px 0 offset in accent2 behind price bursts (misregistration)."
  },
  layouts: [
    {
      id: "grid-of-deals",
      name: "Grid of deals",
      description: "A dense mosaic of unequal deal cells; the hero is simply the biggest cell (2\xD72) holding the headline item.",
      grid: "12 col; cells span 3, 4 or 6 columns; one 6\xD72 hero cell top-left; rows auto, min 160px.",
      structure: [
        "Masthead band: store name huge, flush-left; validity dates in a reversed strip on the right",
        "Deal mosaic: 1 hero cell (6 col \xD7 2 rows) + 6\u20139 smaller cells of mixed widths",
        "Coupon strip: 2\u20133 dashed coupons with cut marks",
        "Opening hours + address set as a ruled table",
        "Fine print footer in 11px condensed"
      ]
    },
    {
      id: "front-page-splash",
      name: "Front-page splash",
      description: 'Cover of the circular: one giant product name with a giant price, diagonal "THIS WEEK" banner, then aisle-by-aisle listings.',
      grid: "12 col; splash spans full width; listings run in 3 columns with 3px vertical rules.",
      structure: [
        "Splash: headline item, price at 30vw, diagonal banner crossing the corner",
        "Aisle index: numbered aisles as a horizontal strip",
        "Three-column listings with dot leaders to prices",
        "Coupon + hours side by side",
        "Footer with fine print and store map as a simple ruled diagram"
      ]
    },
    {
      id: "aisle-columns",
      name: "Aisle columns",
      description: "Organised like aisle signage: each section is a coloured column header (aisle number + category) with items stacked below.",
      grid: "4 equal columns on desktop (2 on tablet, 1 on mobile); headers are 64px reversed bands.",
      structure: [
        "Thin masthead with store name and date range",
        "Four aisle columns, each with a reversed header band and 3\u20135 items",
        'Full-width "manager\u2019s special" band across the middle',
        "Hours/contact as a receipt-like block"
      ]
    }
  ],
  type: [
    {
      id: "anton-archivo",
      name: "Anton + Archivo Narrow",
      display: {
        family: "Anton",
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Archivo Narrow",
        weights: [400, 600, 700],
        fallback: '"Arial Narrow", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Display always uppercase, tracking 0, line-height 0.86. Prices: currency sign at 40% size, superscript cents. Body 600 for item names, 400 for specs."
    },
    {
      id: "bebas-barlow",
      name: "Bebas Neue + Barlow Semi Condensed",
      display: { family: "Bebas Neue", weights: [400], fallback: "Impact, sans-serif", source: "google" },
      body: {
        family: "Barlow Semi Condensed",
        weights: [500, 700, 800],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: 'Bebas for prices and section headers only; Barlow 800 italic for "SAVE" call-outs. Tabular figures in tables (font-variant-numeric: tabular-nums).'
    },
    {
      id: "alfa-chivo",
      name: "Alfa Slab One + Chivo",
      display: { family: "Alfa Slab One", weights: [400], fallback: "Rockwell, serif", source: "google" },
      body: { family: "Chivo", weights: [400, 700, 900], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Slab display for the store name and prices \u2014 feels like a 1970s independent grocer. Chivo 900 for item names. Never letter-space the slab."
    }
  ],
  palettes: [
    {
      id: "red-yellow-newsprint",
      name: "Red / yellow on newsprint",
      colors: {
        paper: "#f4f0e4",
        ink: "#161412",
        muted: "#4f4a42",
        accent: "#d7261e",
        accent2: "#ffd400",
        rule: "#161412",
        panel: "#ffd400"
      },
      usage: "Red for prices and bursts (\u224815% of area); yellow for panels behind deals (\u224825%); everything else ink on newsprint."
    },
    {
      id: "green-grocer",
      name: "Green grocer",
      colors: {
        paper: "#fbfaf3",
        ink: "#10231a",
        muted: "#3e5247",
        accent: "#0d8a3f",
        accent2: "#ff6a13",
        rule: "#10231a",
        panel: "#e3f1d4"
      },
      usage: 'Green headers and price bursts; orange only for "today only" flags. Panels pale green.'
    },
    {
      id: "discount-blue",
      name: "Discount blue",
      colors: {
        paper: "#ffffff",
        ink: "#0a1a3c",
        muted: "#3a4766",
        accent: "#0047bb",
        accent2: "#ffde17",
        rule: "#0a1a3c",
        panel: "#e8eefb"
      },
      usage: "Blue reversed bands for aisle headers, yellow bursts with blue prices. No gradients: flat process colours only."
    }
  ],
  densities: ["packed", "compact"],
  scales: ["perfect-fifth", "golden", "augmented-fourth"],
  motion: [
    {
      id: "price-flip",
      name: "Price flip",
      description: "On hover a price card flips its colours (accent \u2194 paper) instantly, like a hand-turned card.",
      duration: "0ms",
      easing: "steps(1, end)",
      reduced: "Same behaviour \u2014 it is a colour swap, not movement."
    },
    {
      id: "burst-wobble",
      name: "Burst wobble",
      description: "Price bursts rotate \xB14\xB0 in two steps on hover; nothing else moves.",
      duration: "240ms",
      easing: "steps(2, jump-none)",
      reduced: "Disable rotation; keep a colour change."
    },
    {
      id: "still",
      name: "Still print",
      description: "No motion at all. Hover states are underline + colour only.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "starburst",
      name: "Starburst price tags",
      description: "SVG polygon bursts (18 points, inner radius 82%) holding prices; slight -6\xB0 rotation."
    },
    {
      id: "coupon-cut",
      name: "Coupon cut lines",
      description: 'Dashed 2px borders with a \u2702 glyph (typographic, not emoji) at the corner and "\u526A\u4E0B / CUT" labels.'
    },
    {
      id: "diagonal-banner",
      name: "Diagonal banner",
      description: 'A full-bleed 45\xB0 band crossing one corner carrying "\u672C\u5468\u7279\u4EF7 / THIS WEEK ONLY".'
    }
  ],
  anchors: [
    {
      id: "giant-price",
      name: "Giant price",
      description: "The first screen is dominated by one price set at 25\u201335vw in the display face."
    },
    {
      id: "masthead-band",
      name: "Masthead band",
      description: "A full-width reversed masthead with the store name at maximum width (fit-to-width) and a date strip."
    },
    {
      id: "deal-mosaic",
      name: "Deal mosaic",
      description: "No single hero: the first screen is already the dense mosaic of 6+ deal cells."
    }
  ],
  surfaces: [
    {
      id: "newsprint",
      name: "Newsprint",
      description: "Off-white newsprint with faint grain; ink looks slightly heavy.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.035) 1px, transparent 1px); background-size: 3px 3px;"
    },
    {
      id: "glossy-insert",
      name: "Glossy insert",
      description: "Bright white coated stock: flat colours, very crisp edges, no texture."
    },
    {
      id: "halftone",
      name: "Halftone tint",
      description: "Panels filled with an accent halftone dot screen instead of flat tints.",
      css: "background-image: radial-gradient(var(--accent) 28%, transparent 30%); background-size: 6px 6px;"
    }
  ],
  must: [
    "Prices and times are the largest typographic elements on the page.",
    "Every module is separated by a visible ink rule.",
    "At least one dashed coupon with a real, specific offer taken from the facts (or omit coupons)."
  ],
  mustNot: [
    "No whitespace-led luxury layout; empty areas larger than one module are a failure.",
    "No rounded cards, no photos with drop shadows.",
    "Do not invent discounts or prices that are not in the facts."
  ]
};

// vendor/hash-design/packages/core/src/data/branches/print.ts
var letterpressWoodtype = {
  id: "letterpress-woodtype",
  name: { zh: "\u51F8\u7248\u6728\u6D3B\u5B57", en: "Letterpress wood type" },
  family: "print",
  concept: {
    zh: "\u7EF4\u591A\u5229\u4E9A\u65F6\u4EE3\u7684\u6728\u6D3B\u5B57\u6D77\u62A5\u4E0E\u620F\u5355\uFF1A\u4E00\u884C\u6362\u4E00\u79CD\u5B57\u4F53\uFF0C\u6BCF\u884C\u5B57\u53F7\u90FD\u6491\u6EE1\u7248\u5FC3\uFF0C\u7C97\u7EC6\u7EBF\u4E0E\u82B1\u9970\u628A\u6BCF\u4E00\u6863\u4FE1\u606F\u9694\u5F00\u3002\u6CB9\u58A8\u5728\u5B57\u8FB9\u6324\u51FA\u66F4\u6DF1\u7684\u8F6E\u5ED3\uFF0C\u7EB8\u9762\u7559\u4E0B\u8F7B\u5FAE\u538B\u75D5\uFF0C\u7B2C\u4E8C\u4E2A\u989C\u8272\u8981\u518D\u8FC7\u4E00\u6B21\u5370\u673A\u3002",
    en: "The Victorian wood-type poster and playbill: a different typeface on every line, each line sized to fill the measure, printer's rules and fleurons between every tier of information. Ink squeezes into a darker rim at the letter edges, the paper keeps a faint bite, and the second colour needs a second pass through the press."
  },
  references: [
    "P.T. Barnum circus & American Museum broadsides (1850s\u20131880s)",
    "Hatch Show Print, Nashville \u2014 Grand Ole Opry & concert posters",
    "William H. Page and Hamilton wood type specimen books (1870s\u20131900s)",
    'Rob Roy Kelly, "American Wood Type 1828\u20131900" (1969)',
    "Theatre Royal Drury Lane playbills (1830s\u20131840s)"
  ],
  keywords: ["\u6728\u6D3B\u5B57", "\u620F\u5355", "\u4E00\u884C\u4E00\u5B57\u4F53", "\u6491\u6EE1\u884C\u5BBD", "\u538B\u75D5", "\u53CC\u8272\u8FC7\u7248", "\u82B1\u9970\u5206\u9694\u7EBF"],
  tokens: {
    grid: "One composing measure, max 920px, 24px outer margin; every line is its own slug fitted to the full measure; vertical rhythm in multiples of 12px (one nonpareil).",
    radius: "0 everywhere. Corners are made with typographic units (\u2723 \u2766 or SVG fleurons) placed in the corner, never border-radius.",
    border: "Printer's rules only: 1px hairline, 3px thick, and the Oxford rule (6px solid + 1px solid, 3px apart, built with border-top + an ::after line). Dotted brass rule = 2px dotted ink.",
    shadow: "none. Ink squeeze = text-shadow: 0 0 .6px currentColor; second-colour misregistration = a 1\u20132px offset copy in accent2 behind display lines."
  },
  layouts: [
    {
      id: "playbill-tiers",
      name: "Playbill tiers",
      description: "A tall broadside where every line is a separate tier: face, size and colour change line by line, all lines justified to the same width, tiers separated by rules and fleuron rows.",
      grid: "1 column, measure min(860px, 100% - 48px); each tier fit-to-width with clamp() font-size; 12px baseline; 1px or Oxford rule between tiers.",
      structure: [
        'Header tier: presenter or venue in small spaced caps between two hairlines (e.g. "THEATRE ROYAL \xB7 TONIGHT")',
        "Headline tier: the subject name in the biggest wood face, fitted to the full measure, in accent",
        "Three to five descending tiers \u2014 what, who, where \u2014 each in a different face and size, separated by an Oxford rule or a fleuron row",
        "Time & admission tier: a two-cell ruled table with \u261E manicules pointing at the hour and the price",
        "Imprint line at the foot: printer's credit and date in 10px caps flanked by 40px rules"
      ]
    },
    {
      id: "hatch-show-split",
      name: "Hatch Show split",
      description: 'A Hatch Show-style concert poster: the top half is a solid block of colour with letters reversed out, a flat "cut-wood" shape overprints the seam, and the lower half is black type on raw paper.',
      grid: "Top band 55vh solid accent; lower band 6 columns, 16px gutter; type blocks span 2, 4 or 6 columns.",
      structure: [
        "Top colour block: date strip along its top edge, headline reversed out in the heaviest wood face across the full width",
        "Cut-wood block: one flat SVG shape (star, banner, arrow) in accent2 straddling the seam between the two halves",
        "Lower half: who/what stacked in two faces on 4 columns, times and dates on the remaining 2 columns",
        "Bottom tier: venue in wide caps, address and price in small type, the whole tier boxed by 3px rules"
      ]
    },
    {
      id: "specimen-sheet",
      name: "Type-specimen sheet",
      description: "Laid out like a wood-type foundry specimen page: every fact is a numbered specimen row set in its own face, with the line size noted in a left rail.",
      grid: '12 col, 20px gutter; columns 1\u20132 are a rail for specimen numbers and line sizes ("No. 117 \xB7 10-LINE"); content in 3\u201312; 12px baseline.',
      structure: [
        "Specimen header: the subject name set like a foundry title, with a year and a place line under an Oxford rule",
        'Specimen rows: one fact per row, each row a different face, with "No. 5xx \xB7 n-LINE" in the rail',
        "Ornament specimen strip (a row of fleurons and rules) used as the section divider",
        'Price list styled as the foundry price table ("per font / per line") holding real prices or times from the facts',
        "Colophon block: printer, address, date in the body face, centred under a short rule"
      ]
    }
  ],
  type: [
    {
      id: "rye-oldstandard",
      name: "Rye + Old Standard TT",
      display: { family: "Rye", weights: [400], fallback: "Rockwell, Georgia, serif", source: "google" },
      body: {
        family: "Old Standard TT",
        weights: [400, 700],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: 'Rye only in capitals at \u226548px, tracking 0.02em, line-height 0.9; never two Rye lines in a row \u2014 alternate with Old Standard TT 700 caps and Old Standard 400 italic connective lines ("for one night only"). Each display line is sized to fill the measure, not to a scale step. Body 18px/1.45, lining figures. Use real glyphs \u261E \u2766 \u2723 from the font, never emoji.'
    },
    {
      id: "abril-caslon",
      name: "Abril Fatface + Libre Caslon Text",
      display: {
        family: "Abril Fatface",
        weights: [400],
        fallback: '"Bodoni 72", Didot, serif',
        source: "google"
      },
      body: {
        family: "Libre Caslon Text",
        weights: [400, 700],
        italic: true,
        fallback: "Caslon, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: 'Fat-face for the main tier in caps or upper/lower, tracking -0.01em, line-height 0.95. Secondary tiers in Libre Caslon Text 700 caps tracked +0.12em; italic Caslon at 1.6\xD7 body size for "and", "with", "at". Body 17px/1.5. Chinese display in Noto Serif SC 900.'
    },
    {
      id: "holtwood-fell",
      name: "Holtwood One SC + IM Fell English",
      display: {
        family: "Holtwood One SC",
        weights: [400],
        fallback: "Rockwell, Georgia, serif",
        source: "google"
      },
      body: {
        family: "IM Fell English",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Chiron Sung HK", body: "Noto Serif SC" },
      notes: "Holtwood is caps-only: line-height 0.9, tracking 0.04em, never below 28px; use it for at most 3 tiers. IM Fell English roman for body 18px/1.5 and italic for connective tiers; its rough edges stand in for worn metal. A rule separates every change of face."
    }
  ],
  palettes: [
    {
      id: "vermilion-on-cream",
      name: "Black & vermilion on cream",
      colors: {
        paper: "#f2e8d5",
        ink: "#1b1714",
        muted: "#5a4e42",
        accent: "#c8321e",
        accent2: "#d9a23a",
        rule: "#1b1714",
        panel: "#e6d6b8"
      },
      usage: "Ink black for ~70% of the type; vermilion for the headline tier and one fleuron row (~15%); ochre only as the misregistered second-pass offset and a single tint band; cream paper everywhere else."
    },
    {
      id: "canary-stock",
      name: "Canary poster stock",
      colors: {
        paper: "#f2d74a",
        ink: "#151210",
        muted: "#4a3d14",
        accent: "#b8241c",
        accent2: "#1a3f73",
        rule: "#151210",
        panel: "#e3c331"
      },
      usage: "The whole sheet is canary-yellow stock; black carries all text and rules; red on 1\u20132 tiers only; dark blue reserved for the cut-wood shape or the date tablet (<10%)."
    },
    {
      id: "gold-on-black-stock",
      name: "Gold & white on black stock",
      colors: {
        paper: "#1c1a17",
        ink: "#efe6d2",
        muted: "#b3a78f",
        accent: "#e2b33c",
        accent2: "#c9452f",
        rule: "#efe6d2",
        panel: "#2a2622"
      },
      usage: "Opaque cream ink on black board for text and rules; gold for the headline tier and fleurons (~15%); red only for a single date tablet. No other colours."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "platen-kiss",
      name: "Platen kiss",
      description: 'On first paint the headline tier "prints": it goes from scale(1.015) with 60% ink to scale(1) with full ink in one press stroke \u2014 the platen meeting the forme.',
      duration: "220ms",
      easing: "cubic-bezier(.7,0,.3,1)",
      reduced: "Render the printed state immediately."
    },
    {
      id: "second-pass",
      name: "Second-colour pass",
      description: "On hover of a tier, its accent2 offset copy travels from 6px off to its 1\u20132px resting misregistration in three jerky steps, like re-feeding the sheet.",
      duration: "160ms",
      easing: "steps(3, end)",
      reduced: "Keep the static 1px offset; no travel."
    },
    {
      id: "still",
      name: "Still broadside",
      description: "No motion. Links change to accent and gain a 1px rule underneath on hover.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "manicules-fleurons",
      name: "Manicules & fleurons",
      description: "\u261E pointing hands before key lines and rows of \u2766 / \u2723 fleurons (set from the body font at 0.6em, letter-spacing 0.6em) between tiers."
    },
    {
      id: "oxford-rules",
      name: "Oxford & Scotch rules",
      description: "Thick-thin double rules (6px + 1px, 3px apart) across the full measure, and short centred 60px rules flanking small-caps lines."
    },
    {
      id: "border-tablet",
      name: "Cast-border tablet",
      description: "Key facts (date, price) inside a rectangular tablet framed by a double rule with a \u2723 unit in each corner, like a cast border made from metal units."
    }
  ],
  anchors: [
    {
      id: "full-measure-headline",
      name: "Full-measure headline",
      description: "The subject name fitted to the full measure (clamp(64px, 14vw, 220px)) in accent, sitting between two Oxford rules."
    },
    {
      id: "five-face-stack",
      name: "Five-face stack",
      description: "The first screen is a stack of 5\u20137 justified lines, each in a different face/size/colour combination; no single line dominates by more than 2\xD7."
    },
    {
      id: "reversed-date-tablet",
      name: "Reversed date tablet",
      description: "A solid accent tablet holding the date in reversed wood letters at 12vw, sitting top-right and overlapping the headline tier by one line."
    }
  ],
  surfaces: [
    {
      id: "cotton-rag-bite",
      name: "Cotton rag with bite",
      description: "Soft rag paper with fibre speckle; display type looks pressed in (debossed) by a light highlight under each letter.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(60,40,20,.05) 1px, transparent 1.2px), radial-gradient(rgba(60,40,20,.035) 1px, transparent 1.2px); background-size: 5px 5px, 7px 7px; background-position: 0 0, 2px 3px; /* headline */ text-shadow: 0 1px 0 rgba(255,255,255,.35), 0 -1px 0 rgba(0,0,0,.15);"
    },
    {
      id: "worn-wood",
      name: "Worn wood type",
      description: "Large letters show speckled voids where the end-grain is worn, applied only to display tiers through an SVG filter.",
      css: 'filter: url(#worn); /* <filter id="worn"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.4"/><feComposite in="SourceGraphic" operator="in"/></filter> */'
    },
    {
      id: "coloured-stock",
      name: "Coloured poster stock",
      description: "The whole page is one flat sheet of coloured paper (palette paper) with no texture; the second colour appears only as solid shapes.",
      css: "background: var(--paper);"
    }
  ],
  must: [
    "Every display line is fitted to the full measure, and consecutive lines change face, size or colour.",
    "Tiers are separated by printer's rules or fleuron rows, never by empty space alone.",
    "No more than two ink colours plus paper, as in a two-pass press run."
  ],
  mustNot: [
    "No sans-serif anywhere \u2014 wood-type bills had no geometric or humanist sans.",
    "No gradients, drop shadows or rounded corners; depth only from ink squeeze and misregistration.",
    "No ragged left-aligned headline blocks; display lines are centred and justified to the measure."
  ]
};
var photocopyZine = {
  id: "photocopy-zine",
  name: { zh: "\u590D\u5370\u5C0F\u5FD7", en: "Photocopy zine" },
  family: "print",
  concept: {
    zh: "\u4E03\u5341\u5230\u4E5D\u5341\u5E74\u4EE3\u7684\u670B\u514B\u4E0E DIY \u5C0F\u5FD7\uFF1A\u590D\u5370\u673A\u5410\u51FA\u7684\u9ED1\u767D\u9875\u9762\uFF0C\u526A\u8D34\u62FC\u8D34\u3001\u900F\u660E\u80F6\u5E26\u3001\u52D2\u7D22\u4FE1\u5F0F\u6807\u9898\u3001\u624B\u5199\u6279\u6CE8\uFF0C\u58A8\u7C89\u9897\u7C92\u7C97\u3001\u5BF9\u6BD4\u8FC7\u5934\uFF0C\u8BA2\u4E66\u9489\u9489\u5728\u9875\u8FB9\u3002\u5B83\u770B\u8D77\u6765\u662F\u526A\u5200\u548C\u80F6\u68D2\u505A\u51FA\u6765\u7684\uFF0C\u4E0D\u662F\u6392\u7248\u8F6F\u4EF6\u3002",
    en: "The 1970s\u201390s punk and DIY zine: black-and-white pages straight off the photocopier, cut-and-paste collage, tape, ransom-note headlines, handwritten captions, toner grain pushed to harsh contrast, staples in the margin. It looks made with scissors and a glue stick, not with layout software."
  },
  references: [
    "Sniffin' Glue (Mark Perry, 1976\u201377)",
    'Jamie Reid \u2014 Sex Pistols "God Save the Queen" sleeve & posters (1977)',
    "Raymond Pettibon \u2014 Black Flag / SST flyers (1978\u201385)",
    "Riot grrrl zines: Bikini Kill, Jigsaw (1990\u201393)",
    "Gee Vaucher \u2014 Crass Records booklets and posters"
  ],
  keywords: ["\u590D\u5370", "\u526A\u8D34", "\u52D2\u7D22\u4FE1\u6807\u9898", "\u80F6\u5E26", "\u624B\u5199\u6279\u6CE8", "\u8BA2\u4E66\u9489", "\u58A8\u7C89\u9897\u7C92"],
  tokens: {
    grid: 'A5 spread logic: two "pages" side by side (each max 560px) with an 8px fold gutter; inside, blocks sit on a loose 8px grid and are rotated \u22123\xB0 to +3\xB0.',
    radius: "0. Torn edges via clip-path polygons with 10\u201316 jagged points; never border-radius.",
    border: "1.5px solid ink for pasted boxes; 2px dashed ink for cut lines; tape = 64\xD722px strips in paper colour at 70% opacity with 1px edges, rotated \xB18\xB0.",
    shadow: "none \u2014 the copier flattens everything. Allowed: a hard 2px 2px 0 ink offset on a pasted block (copier edge)."
  },
  layouts: [
    {
      id: "cut-and-paste-spread",
      name: "Cut-and-paste spread",
      description: "Two facing A5 pages with pasted fragments crossing the fold: a ransom headline across the top, typed text on torn scraps, a big high-contrast image box on the right page.",
      grid: "2 pages \xD7 4 columns, 8px gutter; blocks snap loosely, rotate \xB13\xB0 and may overlap neighbours by up to 20%.",
      structure: [
        "Ransom headline straddling the top of both pages, each letter on its own cut scrap",
        "Left page: typed intro on a torn scrap, taped at two corners",
        "Right page: threshold image (or a solid toner-black block with a reversed handwritten caption) with a jagged cut edge",
        "Lower band: 2\u20133 typed boxes (listings, letters, Q&A) with 1.5px rules, each rotated differently",
        "Back strip: issue number, price, contact address hand-lettered, staple marks in the margin"
      ]
    },
    {
      id: "flyer-wall",
      name: "Flyer wall",
      description: "A wall of overlapping gig flyers: one dominant A4 sheet holds the headline and date, with half-hidden sheets pasted behind it at different angles.",
      grid: "Free collage over a 12-col reference grid; the primary sheet spans 7 columns rotated 2\xB0; secondary sheets 3\u20135 columns, z-stacked.",
      structure: [
        "Primary flyer: subject name hand-markered, date and place typed on a pasted strip",
        "Second sheet peeking out on the right: typewritten facts, partly covered by the first",
        "Row of tear-off tabs along the bottom with the contact repeated vertically",
        "Rubber-stamped box with a single fact (date or price) slapped across a sheet edge"
      ]
    },
    {
      id: "typewritten-issue",
      name: "Typewritten issue",
      description: "A single typed column like a zine editorial: masthead pasted on top, then typewriter text with crossed-out words, inserted corrections and margin scrawls.",
      grid: "Single 640px column on a 1ch grid; 96px left margin reserved for handwritten notes rotated \u22124\xB0.",
      structure: [
        "Pasted masthead: zine title in marker over a crooked black bar, issue number and date typed beside it",
        "Editorial: typewritten paragraphs with strike-throughs and handwritten ^ insertions",
        "Margin notes in hand lettering connected to the text by drawn SVG arrows",
        "Pasted Q&A block: questions in typed caps, answers in regular",
        'Footer: "copy & pass on" line, mailing address, two staple marks'
      ]
    }
  ],
  type: [
    {
      id: "marker-elite",
      name: "Permanent Marker + Special Elite",
      display: {
        family: "Permanent Marker",
        weights: [400],
        fallback: '"Marker Felt", cursive',
        source: "google"
      },
      body: {
        family: "Special Elite",
        weights: [400],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "Zhi Mang Xing", body: "Noto Serif SC" },
      notes: "Marker headlines in uppercase, each word rotated between \u22124\xB0 and 1\xB0, line-height 0.95, word sizes stepping irregularly (never two words the same size). Special Elite body 17px/1.55 keeps its worn texture; no bold \u2014 emphasis by a 2px hand-drawn SVG underline or CAPS."
    },
    {
      id: "rubik-courier",
      name: "Rubik Mono One + Courier Prime",
      display: {
        family: "Rubik Mono One",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Courier Prime",
        weights: [400, 700],
        italic: true,
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Ransom letters: each headline letter is its own span alternating Rubik Mono One / Courier Prime 700 / Courier italic, rotated \u22126\xB0\u20266\xB0, every third letter reversed (paper on ink), padding 0.05em 0.12em. Courier Prime body 16px/1.5. Never set a whole sentence in Rubik."
    },
    {
      id: "rocksalt-cutive",
      name: "Rock Salt + Cutive Mono",
      display: { family: "Rock Salt", weights: [400], fallback: '"Bradley Hand", cursive', source: "google" },
      body: { family: "Cutive Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "Long Cang", body: "LXGW WenKai TC" },
      notes: "Rock Salt for headlines and captions only, \u226522px, mixed case, line-height 1.3 (its strokes need room). Cutive Mono body 16px/1.6, ragged right, hyphenation off. Captions sit at \u22123\xB0 next to what they describe, joined by a drawn arrow."
    }
  ],
  palettes: [
    {
      id: "toner-on-bond",
      name: "Toner on bond",
      colors: {
        paper: "#f4f3ef",
        ink: "#111111",
        muted: "#4b4a46",
        accent: "#d4201f",
        accent2: "#f5e400",
        rule: "#111111",
        panel: "#dcdbd5"
      },
      usage: "Toner black for \u226585% of everything inked; red only for hand-drawn circles and strikes (<5%); yellow only as highlighter swipes behind 1\u20133 phrases; grey panel = an over-copied scrap."
    },
    {
      id: "yellow-pink-reid",
      name: "Yellow & pink (Jamie Reid)",
      colors: {
        paper: "#f7e43a",
        ink: "#0b0b0b",
        muted: "#4a4310",
        accent: "#ec2f7b",
        accent2: "#f4f3ef",
        rule: "#0b0b0b",
        panel: "#ec2f7b"
      },
      usage: "Page is flat fluoro-yellow stock; black for all type; hot pink as 1\u20132 big flat blocks behind ransom letters (~20%); white scraps pasted on top carry the typed text."
    },
    {
      id: "lid-open-black",
      name: "Lid-open black",
      colors: {
        paper: "#121212",
        ink: "#efeee8",
        muted: "#a9a79f",
        accent: "#ff4a1c",
        accent2: "#bdbcb5",
        rule: "#efeee8",
        panel: "#2b2b29"
      },
      usage: "The copier lid left open: near-black page, pasted white-ish scraps carry the text; orange marker for one or two scrawls; grey for toner-dust scraps."
    }
  ],
  densities: ["packed", "compact"],
  scales: ["augmented-fourth", "perfect-fifth", "golden"],
  motion: [
    {
      id: "copier-light-bar",
      name: "Copier light bar",
      description: "Once on load, a 6px paper-coloured bar with mix-blend-mode: difference sweeps top-to-bottom across the first screen, as if the page were being copied.",
      duration: "900ms",
      easing: "linear",
      reduced: "No sweep; the page simply appears."
    },
    {
      id: "tape-slap",
      name: "Tape slap",
      description: "On hover a pasted scrap jumps to a new angle (\xB12\xB0) in a single frame, as if peeled and re-taped.",
      duration: "120ms",
      easing: "steps(1, end)",
      reduced: "No rotation; hover adds a 2px ink outline instead."
    },
    {
      id: "still",
      name: "Dead copy",
      description: "No motion; hover reverses colours (paper text on ink).",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "ransom-letters",
      name: "Ransom letters",
      description: "Headline letters each on their own cut scrap: mixed faces and sizes, some reversed, rotated \u22126\xB0 to 6\xB0, scraps touching but never aligned."
    },
    {
      id: "tape-and-staples",
      name: "Tape & staples",
      description: "Tape strips (64\xD722px, paper at 70% opacity, 1px edge lines) across scrap corners; staples as two 14\xD73px ink bars in the outer margin."
    },
    {
      id: "scrawl-annotations",
      name: "Scrawl annotations",
      description: "Hand-drawn SVG circles, arrows and strike-throughs (stroke 2.5px, round caps, wobbly paths) in accent marking real facts."
    }
  ],
  anchors: [
    {
      id: "ransom-headline",
      name: "Ransom-note headline",
      description: "The subject name built from 6\u201314 individually cut letters across the first screen at 10\u201316vw."
    },
    {
      id: "blackout-image",
      name: "Blackout image box",
      description: "A user-provided image thresholded to pure black and white, filling ~60% of the first screen; without imagery, a solid toner-black block with a reversed handwritten caption."
    },
    {
      id: "masthead-bar",
      name: "Pasted masthead bar",
      description: "Zine title hand-markered across a crooked black bar (\u22122\xB0) with issue number and price typed on a scrap taped to its end."
    }
  ],
  surfaces: [
    {
      id: "toner-grain",
      name: "Toner grain",
      description: "Copy paper with speckled toner dust everywhere, slightly heavier towards the edges.",
      css: `background-color: var(--paper); background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.4 -.55'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.22'/></svg>");`
    },
    {
      id: "threshold-copy",
      name: "Threshold copy",
      description: "Images and grey areas pushed to pure black/white; grey panels replaced by a coarse dot screen instead of a flat tint.",
      css: "img { filter: grayscale(1) contrast(3.2) brightness(1.1); } .panel { background-image: radial-gradient(var(--ink) 30%, transparent 32%); background-size: 4px 4px; }"
    },
    {
      id: "torn-scraps",
      name: "Torn scraps",
      description: "Every text block is a torn scrap with jagged edges laid on the page.",
      css: "clip-path: polygon(0 3%, 9% 0, 22% 2%, 37% 0, 55% 3%, 71% 0, 88% 2%, 100% 0, 99% 96%, 84% 100%, 63% 97%, 41% 100%, 24% 97%, 6% 100%, 1% 94%);"
    }
  ],
  must: [
    "Every block looks pasted: rotated by a non-zero angle (\u22124\xB0\u20264\xB0) or taped, and no two neighbouring blocks share the same angle.",
    "The headline is built from visibly separate cut letters or hand lettering, never one clean typeset line.",
    "Black and paper dominate (\u226585% of inked area); colour only as marker or highlighter accents.",
    "At least one handwritten caption or annotation points at a real fact."
  ],
  mustNot: [
    "No smooth gradients, glows or soft grey tints; tone only via toner black, paper or a dot screen.",
    "No tidy grid of equal boxes; nothing snaps into a clean card layout.",
    "No crisp vector icons or stock illustrations; graphics are hand-drawn strokes or thresholded images."
  ]
};
var risographDuotone = {
  id: "risograph-duotone",
  name: { zh: "Riso \u53CC\u8272\u5957\u5370", en: "Risograph duotone" },
  family: "print",
  concept: {
    zh: "Riso \u5B54\u7248\u5370\u5237\u7684\u53CC\u8272\u5957\u5370\uFF1A\u8367\u5149\u7C89\u548C\u8054\u90A6\u84DD\u4E24\u79CD\u5927\u8C46\u6CB9\u58A8\u53E0\u5728\u4E00\u8D77\uFF0C\u538B\u51FA\u7B2C\u4E09\u79CD\u989C\u8272\uFF1B\u7248\u4F4D\u603B\u5DEE\u4E00\u4E24\u6BEB\u7C73\uFF0C\u5E73\u7F51\u7684\u9897\u7C92\u6E05\u6E05\u695A\u695A\u3002\u6BCF\u4E2A\u989C\u8272\u90FD\u662F\u4E00\u5F20\u72EC\u7ACB\u7684\u7248\uFF0C\u8BBE\u8BA1\u5C31\u53D1\u751F\u5728\u4E24\u5F20\u7248\u91CD\u53E0\u7684\u5730\u65B9\u3002",
    en: "Risograph two-colour printing: fluorescent pink and federal blue soy inks overprint to make a third colour, registration drifts by a millimetre or two, and every flat tint shows its grain. Each colour is a separate drum, and the design happens where the two layers overlap."
  },
  references: [
    "Hato Press (London) risograph publications",
    "Colorama riso print studio (Berlin)",
    "Nieves Books zines (Zurich)",
    "Risotto Studio (Glasgow) prints and editions",
    "Tokyo Art Book Fair riso zines"
  ],
  keywords: ["\u5B54\u7248", "\u53E0\u5370", "\u8367\u5149\u7C89", "\u5957\u5370\u504F\u79FB", "\u5E73\u7F51\u9897\u7C92", "\u4E13\u8272", "\u53CC\u8272\u7248"],
  tokens: {
    grid: '8 columns, 16px gutter, 32px margin; artwork lives on two "drum" layers that share the grid, with drum 2 offset 2px 3px from drum 1.',
    radius: "0 on text boxes; purely graphic shapes may be full circles or semicircles (border-radius: 50% only on shapes that carry no text).",
    border: "No black outlines. Rules are 2px in one spot ink. Overlaps use mix-blend-mode: multiply.",
    shadow: "none. The misregistration offset (drum 2 translated 2px 3px) is the only depth."
  },
  layouts: [
    {
      id: "overprint-poster",
      name: "Overprint poster",
      description: "A poster where a giant shape on drum 1 and a giant word on drum 2 overlap; the overlap prints the third colour; small information blocks sit in the corners.",
      grid: "8 col; shape layer spans col 1\u20136, type layer col 3\u20138, overlapping across 4 columns; corner blocks 2 columns each.",
      structure: [
        "Top-left corner block: edition or issue number and date in small spot-ink type",
        "Overlap field: giant circle or arch on drum 1 crossed by the subject name on drum 2, multiplied where they meet",
        "Bottom band: three facts as a 3-column list with 2px spot-ink rules",
        'Colophon strip: inks used ("fluorescent pink + federal blue"), paper stock, edition size if given in the facts'
      ]
    },
    {
      id: "zine-spreads",
      name: "Zine spreads",
      description: "The page is a run of riso zine spreads; each section is a two-page spread where one ink dominates each page.",
      grid: "Spreads of 2 \xD7 4 columns with a visible 1px centre fold; each spread swaps which drum leads.",
      structure: [
        "Cover spread: title in drum-2 ink on a 40% grain tint of drum 1; back cover holds the colophon",
        "Spread 1: left page all text in drum-1 ink, right page a duotone image or a giant drum-2 numeral",
        "Spread 2: numbered list where numerals print in drum 2 and text in drum 1",
        "Final spread: where/when/contact set as a centred colophon block with registration marks"
      ]
    },
    {
      id: "layer-split",
      name: "Layer split",
      description: "The page shows how it was printed: the two separated plates side by side first, then the composite print below.",
      grid: "2 equal columns of 4 for the plates, 24px gutter, then a full-width composite; 8-col grid below.",
      structure: [
        'Plate A and plate B side by side, each single-colour, labelled "DRUM 1 / DRUM 2" with ink names',
        "Composite: the same artwork with both plates multiplied and 3px off-register",
        "Facts listed under swatch chips of each ink (ink name + a short label)",
        "Footer with crosshair registration marks in all four corners"
      ]
    }
  ],
  type: [
    {
      id: "unbounded-familjen",
      name: "Unbounded + Familjen Grotesk",
      display: {
        family: "Unbounded",
        weights: [700, 800],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Familjen Grotesk",
        weights: [400, 600],
        italic: true,
        fallback: "Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Unbounded 800 headlines, lowercase allowed, tracking -0.03em, line-height 0.92, up to 18vw; headlines always in a spot ink, never ink-black. Familjen Grotesk 400/600 body 17px/1.5; labels 600 uppercase +0.08em at 12px."
    },
    {
      id: "dela-zenkaku",
      name: "Dela Gothic One + Zen Kaku Gothic New",
      display: {
        family: "Dela Gothic One",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Zen Kaku Gothic New",
        weights: [400, 700],
        fallback: '"Hiragino Sans", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Tokyo art-book-fair voice. Dela Gothic One for headlines and numerals only, line-height 1.0, tracking 0; mix Latin and CJK in one headline at a shared cap height. Zen Kaku Gothic New body 16px/1.7, 700 for labels."
    },
    {
      id: "krona-xanh",
      name: "Krona One + Xanh Mono",
      display: {
        family: "Krona One",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Xanh Mono",
        weights: [400],
        italic: true,
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Krona One wide caps for titles, line-height 0.9, tracking 0.02em, max 3 words per line. Xanh Mono for body 16px/1.6 and all metadata (ink names, edition, dimensions); its italic for captions. Chinese display in Noto Sans SC 900."
    }
  ],
  palettes: [
    {
      id: "pink-federal-blue",
      name: "Fluorescent pink + federal blue",
      colors: {
        paper: "#f7f3ea",
        ink: "#1f2a4a",
        muted: "#4c5677",
        accent: "#ff48b0",
        accent2: "#3d5588",
        rule: "#3d5588",
        panel: "#ffd3ea"
      },
      usage: "Pink drum for big shapes and grain tints (~35%); federal blue drum for all text and rules; their multiply overlap is the only third colour; cream paper shows through \u226540%."
    },
    {
      id: "orange-teal-kraft",
      name: "Orange + teal on kraft",
      colors: {
        paper: "#d9c4a0",
        ink: "#1a1a1a",
        muted: "#4d4332",
        accent: "#ff6c2f",
        accent2: "#00838a",
        rule: "#00838a",
        panel: "#e8d7b8"
      },
      usage: "Kraft stock dulls both inks; orange for shapes and numerals (~30%), teal for headlines and rules, riso black only for small body text; overlaps go brown-olive."
    },
    {
      id: "red-green-white",
      name: "Bright red + green on white",
      colors: {
        paper: "#fbfbf8",
        ink: "#14352a",
        muted: "#3f5a4f",
        accent: "#ff665e",
        accent2: "#00a95c",
        rule: "#00a95c",
        panel: "#ffe0dc"
      },
      usage: "Crisp white stock; bright red for the big shapes, green for type and grain; dark green (both drums overprinted) for body text; at least 45% paper visible."
    }
  ],
  densities: ["regular", "airy"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "drum-drift",
      name: "Drum drift",
      description: "On hover, the drum-2 layer slides from its 2px 3px misregistration into perfect register, then back on leave.",
      duration: "200ms",
      easing: "cubic-bezier(.4,0,.2,1)",
      reduced: "Keep the static misregistration; no slide."
    },
    {
      id: "second-drum",
      name: "Second drum",
      description: "On load drum 1 is shown alone, then drum 2 prints over it: it appears in 4 stepped frames with a 4px paper-feed jolt.",
      duration: "320ms",
      easing: "steps(4, end)",
      reduced: "Show both layers at once."
    },
    {
      id: "still",
      name: "Still print",
      description: "No motion; hover swaps a link from drum 2 to drum 1 ink.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "registration-marks",
      name: "Registration marks",
      description: "Crosshair-in-circle marks (SVG, 24px, 1px strokes), one copy per drum so they visibly double, at sheet corners and beside the colophon."
    },
    {
      id: "overprint-shapes",
      name: "Overprint shapes",
      description: "Flat circles, arches and stair-steps in accent overlapping type in accent2 with mix-blend-mode: multiply to make the third colour."
    },
    {
      id: "grain-tints",
      name: "Grain tints",
      description: "Every tint is a stochastic grain or coarse halftone of a spot ink at 20\u201360% coverage, never an opacity fade."
    }
  ],
  anchors: [
    {
      id: "overprint-title",
      name: "Overprint title",
      description: "Subject name at 14\u201320vw in drum-2 ink crossing a giant drum-1 circle; the overlap shows the multiply colour."
    },
    {
      id: "duotone-image",
      name: "Duotone image",
      description: "One user-provided image split into two inks (thresholded in accent2, offset copy in accent) filling two thirds of the first screen; without imagery, a giant numeral from the facts treated the same way."
    },
    {
      id: "swatch-cover",
      name: "Swatch cover",
      description: "Two big overlapping colour fields with the title knocked out of one, plus the ink names printed like a colour chart along the edge."
    }
  ],
  surfaces: [
    {
      id: "riso-grain",
      name: "Riso grain",
      description: "Every ink area carries fine stochastic grain and slightly uneven coverage.",
      css: `background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='1'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -1.6 1'/></filter><rect width='100%' height='100%' filter='url(%23g)' opacity='.35'/></svg>"); mix-blend-mode: multiply;`
    },
    {
      id: "uncoated-stock",
      name: "Uncoated stock",
      description: "Soft uncoated paper; inks sit slightly flat and muted and multiply over each other.",
      css: "background-color: var(--paper); .ink-layer { mix-blend-mode: multiply; filter: saturate(.92); }"
    },
    {
      id: "coarse-screen",
      name: "Coarse screen",
      description: "Tint areas printed as a 45\xB0 halftone with a 6px cell.",
      css: "background-image: radial-gradient(var(--accent) 34%, transparent 36%), radial-gradient(var(--accent) 34%, transparent 36%); background-size: 6px 6px; background-position: 0 0, 3px 3px;"
    }
  ],
  must: [
    "Exactly two spot inks (accent + accent2) plus paper; any third colour is their multiply overlap.",
    "The first screen shows at least one visible overprint (mix-blend-mode: multiply) and one deliberate 2\u20134px misregistration.",
    "Tints are grain or halftone screens of a spot ink, never opacity fades of black."
  ],
  mustNot: [
    "No pure #000000 and no full-colour (CMYK-style) imagery.",
    "No gradients between the two inks; transitions only via grain or halftone.",
    "No drop shadows, outlines in black or glossy effects; riso ink is flat and slightly chalky."
  ]
};
var ticketStub = {
  id: "ticket-stub",
  name: { zh: "\u7968\u6839", en: "Ticket stub" },
  family: "document",
  concept: {
    zh: "\u5267\u9662\u3001\u94C1\u8DEF\u4E0E\u7535\u5F71\u9662\u7684\u7968\u636E\uFF1A\u5B58\u6839\u548C\u7968\u8EAB\u4E4B\u95F4\u4E00\u6761\u6253\u5B54\u7EBF\uFF0C\u6D41\u6C34\u53F7\u3001\u6392\u53F7\u3001\u5EA7\u53F7\u3001\u65E5\u671F\u90FD\u5173\u5728\u5C0F\u683C\u5B50\u91CC\uFF0C\u5E95\u4E0B\u538B\u7740\u9632\u4F2A\u626D\u7D22\u7EB9\u3002\u4FE1\u606F\u5F88\u5BC6\uFF0C\u4F46\u6BCF\u4E00\u9879\u90FD\u6709\u56FA\u5B9A\u4F4D\u7F6E\uFF1B\u6495\u4E0B\u6765\u7684\u90A3\u4E00\u534A\uFF0C\u5C31\u662F\u51ED\u8BC1\u3002",
    en: "Theatre, railway and cinema tickets: a perforated line between stub and body, serial, row, seat and date each locked in a small ruled cell, a guilloche security pattern underneath. Dense with information, yet every item has a fixed place \u2014 and the half you tear off is the proof."
  },
  references: [
    "Edmondson railway card tickets (1840s\u20131990, British Rail)",
    "Broadway hard tickets & Ticketron stubs (1970s\u201380s)",
    'Globe Ticket Co. "ADMIT ONE" roll tickets',
    "\u4E2D\u56FD\u94C1\u8DEF\u786C\u677F\u7968\u4E0E\u7EA2\u8272\u8F6F\u7EB8\u706B\u8F66\u7968",
    "Odeon cinema tickets (1950s)"
  ],
  keywords: ["\u5B58\u6839", "\u6253\u5B54\u7EBF", "\u6D41\u6C34\u53F7", "\u5EA7\u4F4D\u683C", "\u626D\u7D22\u7EB9", "\u68C0\u7968", "ADMIT ONE"],
  tokens: {
    grid: "Ticket module at a 4:1 ratio (e.g. 960\xD7240): body 75% + stub 25%; inside, an 8-column cell grid with 1px rules; the page is a stack of modules with 24px gaps.",
    radius: "0 on corners. Stubs get semicircular notches at both ends of the perforation via radial-gradient(circle at 0 50%, transparent 10px, var(--panel) 10.5px).",
    border: "1px solid rule for cells; perforation = a row of 4px holes every 8px (or 2px dotted rule); ticket outline 1.5px solid ink.",
    shadow: "none. Tickets lie flat on the page."
  },
  layouts: [
    {
      id: "ticket-stack",
      name: "Ticket stack",
      description: "The page is a column of full-width tickets, one per section, each split into body and stub; the first ticket is the event ticket.",
      grid: "Modules max 1040px, 4:1 on desktop; body 75% / stub 25% split by a vertical perforation; on mobile the stub moves below with a horizontal perforation.",
      structure: [
        "Event ticket: headline and venue in the body; date, time and serial in the stub",
        "Seat ticket: row / seat / gate / price as a ruled cell table",
        'Conditions ticket: numbered terms in 11px type across the body, "NOT TRANSFERABLE / \u4E0D\u5F97\u8F6C\u8BA9" in the stub',
        "Booking strip: contact, address and the issuing office in a narrow ticket with a serial"
      ]
    },
    {
      id: "roll-strip",
      name: "Roll-ticket strip",
      description: "A long horizontal strip of roll tickets joined by perforations; each ticket carries one fact and the serial numbers increment.",
      grid: "Scroll-snap row of tickets 280\xD7140px with 4px perforated joins; below the strip, a 6-col box-office table.",
      structure: [
        'Header: subject name printed on one long ribbon ticket with a serial like "N\xBA 20261101"',
        "Roll strip: 5\u20139 roll tickets in a horizontal scroll-snap row, one fact each, serials counting up",
        "Box-office table: sessions \xD7 prices with tabular figures",
        'Footer: "keep this ticket / \u8BF7\u4FDD\u7559\u7968\u6839" and the issuing office'
      ]
    },
    {
      id: "oversized-card",
      name: "Oversized card ticket",
      description: "The first screen is one enormous Edmondson card ticket (57:30) with FROM \u2192 TO, class, fare and a dating-press stamp; the rest of the page reads as its reverse side.",
      grid: "Card max 1100px at 1.9:1 with an internal 12-col cell grid and 1px rules; the reverse side below uses 2 columns at 1:2.",
      structure: [
        "Card front: issuing company small caps at top, FROM \u2192 TO huge, class and fare in cells, serial top-right",
        "Dating-press stamp: the date embossed at \u22128\xB0 overprinting a corner of the card",
        "Reverse side: conditions of issue in two narrow columns of 11px type",
        "Timetable or fare table with dot leaders",
        "Inspector's clip: a bite-shaped notch cut from one edge of the card"
      ]
    }
  ],
  type: [
    {
      id: "staatliches-courier",
      name: "Staatliches + Courier Prime",
      display: {
        family: "Staatliches",
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Courier Prime",
        weights: [400, 700],
        fallback: '"Courier New", Courier, monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: 'Staatliches uppercase for ADMIT ONE and titles, tracking 0.06em, line-height 0.95. Courier Prime for every number (serials, seats, prices) with tabular-nums; serials zero-padded to 7\u20138 digits and prefixed "N\xBA". Cell labels 10\u201311px Courier Prime uppercase +0.1em.'
    },
    {
      id: "saira-cutive",
      name: "Saira Extra Condensed + Cutive Mono",
      display: {
        family: "Saira Extra Condensed",
        weights: [700, 800],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: { family: "Cutive Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Railway voice. Saira Extra Condensed 800 uppercase for station names and FROM \u2192 TO at very large sizes, tracking 0.01em, line-height 0.9. Cutive Mono for dates, serials and conditions 15px/1.5 \u2014 it reads as dating-press struck. Class labels in Saira 700 at 14px +0.12em."
    },
    {
      id: "bevan-oldstandard",
      name: "Bevan + Old Standard TT",
      display: { family: "Bevan", weights: [400], fallback: "Rockwell, Georgia, serif", source: "google" },
      body: {
        family: "Old Standard TT",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Theatre hard-ticket voice. Bevan for the production title in upper/lower case, line-height 1.0. Old Standard TT small caps +0.12em for ORCHESTRA / ROW / SEAT labels, 16px/1.45 body, lining figures; prices with the currency sign at 60% size, raised."
    }
  ],
  palettes: [
    {
      id: "security-green",
      name: "Security green",
      colors: {
        paper: "#e6f0e4",
        ink: "#14261c",
        muted: "#46594c",
        accent: "#c22a2a",
        accent2: "#2f7a5a",
        rule: "#14261c",
        panel: "#cfe2cf"
      },
      usage: "Pale green security stock; ink for all text and cells; red only for serial numbers and the date stamp (<8%); green guilloche underprint at ~25% tone behind the body."
    },
    {
      id: "buff-railway-card",
      name: "Buff railway card",
      colors: {
        paper: "#e9dcb8",
        ink: "#1d1b16",
        muted: "#5a5240",
        accent: "#2f5d3a",
        accent2: "#c8541f",
        rule: "#1d1b16",
        panel: "#d8c792"
      },
      usage: "Buff pressboard; black text; a green horizontal band for class (~12%); orange-red for the dating-press stamp and one route arrow; panel = the reverse side."
    },
    {
      id: "velvet-house",
      name: "Velvet house",
      colors: {
        paper: "#2a0f14",
        ink: "#f4ead8",
        muted: "#c4ad9d",
        accent: "#e7b53b",
        accent2: "#7fb6a4",
        rule: "#7a4b4f",
        panel: "#3a161c"
      },
      usage: "Dark velvet page like a theatre seat; ticket modules in panel with cream type; gold for titles and serials (~10%); celadon only for the guilloche lines."
    }
  ],
  densities: ["compact", "packed"],
  scales: ["perfect-fourth", "augmented-fourth", "major-third"],
  motion: [
    {
      id: "perforation-tear",
      name: "Tear at the perforation",
      description: "On click or hover the stub swings 4\xB0 away from the perforation and drops 6px, accelerating like paper giving way.",
      duration: "260ms",
      easing: "cubic-bezier(.5,0,.75,0)",
      reduced: "The stub dims to 55% opacity instead of moving."
    },
    {
      id: "dating-press",
      name: "Dating press",
      description: "The date stamp lands in two frames: scale 1.15 \u2192 1 while settling at \u22128\xB0.",
      duration: "140ms",
      easing: "steps(2, end)",
      reduced: "Stamp is simply present."
    },
    {
      id: "serial-tick",
      name: "Numbering machine",
      description: "The serial number ticks forward digit by digit like a numbering machine wheel.",
      duration: "480ms",
      easing: "steps(6, end)",
      reduced: "Show the final number."
    }
  ],
  motifs: [
    {
      id: "perforation",
      name: "Perforation line",
      description: "A row of 4px holes every 8px (radial-gradient circles in page colour) between stub and body, with semicircle notches at both ends."
    },
    {
      id: "guilloche",
      name: "Guilloche underprint",
      description: "A fine SVG guilloche of overlapping sine rosettes (0.5px strokes in accent2 at ~25% tone) behind the ticket body as a security pattern."
    },
    {
      id: "serial-cells",
      name: "Serial & seat cells",
      description: '"N\xBA 20261101"-style serials in accent at top-right of body and stub; ROW / SEAT / GATE / DATE cells as a 1px ruled table with 9px labels.'
    }
  ],
  anchors: [
    {
      id: "admit-one",
      name: "Admit-one ticket",
      description: "The first screen is one huge ticket (body + stub) with the subject as the event title and the real date/time in the stub."
    },
    {
      id: "from-to",
      name: "From \u2192 To",
      description: "Two place or state names at 10vw joined by an arrow, as on a railway card; class and fare cells beneath."
    },
    {
      id: "seat-grid",
      name: "Seat grid",
      description: "A seating plan (rows of small cells) fills the right half; one cell is filled in accent and labelled with the key fact (date or session); title stacked on the left."
    }
  ],
  surfaces: [
    {
      id: "pressboard",
      name: "Pressboard card",
      description: "Stiff card ticket with faint horizontal fibre lines and a crisp 1.5px outline.",
      css: "background-color: var(--panel); border: 1.5px solid var(--ink); background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.025) 0 1px, transparent 1px 3px);"
    },
    {
      id: "security-paper",
      name: "Security paper",
      description: "Concentric fine-line rosettes behind all text panels, like banknote paper.",
      css: "background-image: repeating-radial-gradient(circle at 30% 50%, transparent 0 6px, color-mix(in srgb, var(--accent2) 18%, transparent) 6px 6.6px);"
    },
    {
      id: "tickets-on-counter",
      name: "Tickets on the counter",
      description: "The page is the box-office counter (panel tone); each ticket is paper-coloured and set at a slight \xB11\xB0 angle, so the page edge frames every module.",
      css: "body { background: var(--panel); } .ticket { background: var(--paper); transform: rotate(-0.8deg); }"
    }
  ],
  must: [
    "Every section is a ticket module with a perforated split into body and stub.",
    "All numbers (dates, times, prices, rows, seats) sit in labelled 1px-ruled cells and use tabular figures.",
    "Serial numbers are derived from a real fact such as the date (N\xBA 20261101), never a fake count."
  ],
  mustNot: [
    "No rounded-rectangle cards; ticket corners are square or notched only.",
    "No information floating outside a ticket module except a page-level header.",
    "No QR codes or barcodes that encode nothing; use guilloche and serials instead."
  ]
};
var thermalReceipt = {
  id: "thermal-receipt",
  name: { zh: "\u70ED\u654F\u5C0F\u7968", en: "Thermal receipt" },
  family: "document",
  concept: {
    zh: "\u6536\u94F6\u53F0\u5410\u51FA\u6765\u7684\u70ED\u654F\u5C0F\u7968\uFF1A\u4E00\u6761\u7A84\u7A84\u7684\u7EB8\u5E26\uFF0C\u7B49\u5BBD\u5B57\u4E00\u884C\u4E00\u884C\u6253\u51FA\u6765\uFF0C\u865A\u7EBF\u9694\u5F00\u6BCF\u4E00\u6BB5\uFF0C\u5408\u8BA1\u7528\u7B26\u53F7\u6846\u4F4F\uFF0C\u5E95\u90E8\u4E00\u6761\u6761\u5F62\u7801\u3002\u7EB8\u662F\u5FAE\u5FAE\u53D1\u7070\u7684\u767D\uFF0C\u5B57\u5DF2\u7ECF\u5F00\u59CB\u892A\u8272\uFF0C\u8D8A\u5F80\u4E0B\u8BFB\u8D8A\u50CF\u4E00\u672C\u6D41\u6C34\u8D26\u3002",
    en: "The till receipt: a narrow strip of thermal paper, monospaced lines printed one at a time, dashed separators between blocks, totals boxed in ASCII characters and a barcode at the foot. Grey-white paper, print already fading, and the further down you read the more it becomes a ledger of everything."
  },
  references: [
    "Epson TM-T88 thermal printer output (Font A, 12\xD724 dots, 42 columns)",
    "Japanese konbini receipts (7-Eleven Japan, FamilyMart, Lawson)",
    "\u4E2D\u56FD\u4FBF\u5229\u5E97\u4E0E\u8D85\u5E02\u6536\u94F6\u5C0F\u7968",
    "Card-terminal merchant slips (Verifone, Ingenico, 1990s\u20132000s)"
  ],
  keywords: ["\u70ED\u654F\u7EB8", "\u7B49\u5BBD", "\u865A\u7EBF\u5206\u9694", "\u5408\u8BA1", "\u6761\u5F62\u7801", "\u892A\u8272", "\u7A84\u680F"],
  tokens: {
    grid: "One narrow column of 42 characters (42ch \u2248 380\u2013420px) on a contrasting counter background; all alignment in whole characters (ch units).",
    radius: "0. Top and bottom edges are 8px saw-tooth tear edges (mask with conic-gradient teeth).",
    border: 'No CSS borders inside the strip: separators are typed lines of "-", "=" or "*" exactly 42 characters long; the strip itself has no outline.',
    shadow: "none. At most a 1px rule-coloured outline where the strip meets the counter."
  },
  layouts: [
    {
      id: "till-receipt",
      name: "Till receipt",
      description: "One receipt strip: merchant header, itemised lines with right-aligned values, a totals block, barcode, footer.",
      grid: "42ch column; label left, value right (flex with space or dot fill); 24px counter padding around the strip.",
      structure: [
        "Header: subject name in double-width bold, address and phone, date/time and a terminal line",
        'Items: each fact as an item line "QTY  DESCRIPTION ........ VALUE", wrapped continuations indented 2ch',
        'Totals block: the key figure as TOTAL in double height between "=" separators',
        "Barcode built from a real number (date, phone) with the digits printed beneath",
        'Footer: "THANK YOU / \u8C22\u8C22\u60E0\u987E", terms taken from the facts, "*** CUSTOMER COPY ***"'
      ]
    },
    {
      id: "receipt-spike",
      name: "Receipt spike",
      description: "Several receipts of different lengths laid side by side on the counter, each one a section (list, hours, contact).",
      grid: "3 strips of 32ch, 42ch and 24ch in a row, offset vertically by 40\u2013120px, 24px gap; stacked on mobile.",
      structure: [
        "Counter header: subject name stencilled on the counter background, not on paper",
        "Strip 1 (long): the main itemised list",
        "Strip 2 (medium): opening hours or schedule as a time table",
        'Strip 3 (short): card-slip style with "SIGNATURE ______" and contact details',
        "A spike/pin mark (SVG circle) at the top of each strip"
      ]
    },
    {
      id: "continuous-roll",
      name: "Continuous roll",
      description: 'The page is one endless roll; sections are separate "transactions" divided by cut lines, each with its own numbered header.',
      grid: "Single 48ch column, full height, roll edges on both sides; transactions numbered TRX 0001, 0002\u2026",
      structure: [
        "TRX 0001: who/what with a logo built from block characters (\u2588 \u2580 \u2584)",
        "TRX 0002: itemised facts",
        "TRX 0003: table of times or prices aligned in ch columns",
        "End-of-roll warning stripe in accent2 along one edge, as on the last metre of a real roll",
        'Cut line "- - - \u2702 - - -" with partial-cut teeth'
      ]
    }
  ],
  type: [
    {
      id: "dotgothic-plex",
      name: "DotGothic16 + IBM Plex Mono",
      display: {
        family: "DotGothic16",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "IBM Plex Mono",
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "DotGothic16 imitates the printer's dot font: use it for the merchant name and TOTAL at double width (transform: scaleX(2), transform-origin left) and double height. IBM Plex Mono 400 at 14\u201315px/1.35 for lines, uppercase item names, tabular figures; every line \u2264 42 characters (CJK counts as 2)."
    },
    {
      id: "xanh-cutive",
      name: "Xanh Mono + Cutive Mono",
      display: {
        family: "Xanh Mono",
        weights: [400],
        italic: true,
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: { family: "Cutive Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: 'Older cash-register / impact-printer voice. Xanh Mono for header and totals (italic for "Thank you"), Cutive Mono for lines at 15px/1.4. Uppercase item names, lowercase notes; amounts right-aligned to the last character column.'
    },
    {
      id: "rubikmono-azeret",
      name: "Rubik Mono One + Azeret Mono",
      display: {
        family: "Rubik Mono One",
        weights: [400],
        fallback: '"Arial Black", monospace',
        source: "google"
      },
      body: {
        family: "Azeret Mono",
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Modern POS voice. Rubik Mono One only for the merchant name and the word TOTAL, caps, tracking 0. Azeret Mono 400 at 14px/1.4 for lines, 600 for subtotals. Section titles as reversed bars (paper text on ink) the full 42ch wide."
    }
  ],
  palettes: [
    {
      id: "two-colour-thermal",
      name: "Two-colour thermal",
      colors: {
        paper: "#f2f1ec",
        ink: "#1c1c1e",
        muted: "#55555a",
        accent: "#c4262e",
        accent2: "#e7a1b0",
        rule: "#1c1c1e",
        panel: "#c9c3b6"
      },
      usage: "Strip in paper; black print for ~95% of text; red (two-colour thermal) only for TOTAL and one notice; pink for the end-of-roll stripe; panel is the counter around the strip."
    },
    {
      id: "faded-yellowed",
      name: "Faded & yellowed",
      colors: {
        paper: "#eeeae0",
        ink: "#2a3240",
        muted: "#5f6672",
        accent: "#a3473a",
        accent2: "#d8a33b",
        rule: "#6b717c",
        panel: "#3b3a36"
      },
      usage: "A receipt kept in a wallet: yellowed paper, print faded to blue-grey; rust for totals; ochre for a tape stain; dark panel is the counter, making the strip glow."
    },
    {
      id: "carbon-copy-slip",
      name: "Pink carbon-copy slip",
      colors: {
        paper: "#f5d6dc",
        ink: "#24161b",
        muted: "#5f4650",
        accent: "#1e4f8a",
        accent2: "#8c2a3c",
        rule: "#24161b",
        panel: "#e9bcc6"
      },
      usage: 'Pink merchant-copy stock; dark ink for the printed lines; carbon blue only for "handwritten" signature and ticks (<5%); maroon for the reversed section bars.'
    }
  ],
  densities: ["compact", "packed"],
  scales: ["major-second", "minor-third", "perfect-fourth"],
  motion: [
    {
      id: "line-feed",
      name: "Line feed",
      description: "The receipt prints line by line from the top: each new line appears in one step while the strip advances one line height, 40ms per line.",
      duration: "40ms",
      easing: "steps(1, end)",
      reduced: "Print the entire receipt instantly."
    },
    {
      id: "auto-cutter",
      name: "Auto-cutter",
      description: "At the end of printing the saw-tooth edge appears and the strip drops 12px, as when the cutter fires.",
      duration: "180ms",
      easing: "cubic-bezier(.6,0,.9,.4)",
      reduced: "Show the cut edge; no drop."
    },
    {
      id: "thermal-warm",
      name: "Thermal warm-up",
      description: "On hover, a faded line darkens from muted to full ink, as if warmed by a thumb.",
      duration: "600ms",
      easing: "ease-out",
      reduced: "Lines are always full ink."
    }
  ],
  motifs: [
    {
      id: "ascii-separators",
      name: "ASCII separators",
      description: 'Lines of ------, ======, ****** and "\xB7 \xB7 \xB7" exactly 42 characters long; totals boxed with +----+ corners.'
    },
    {
      id: "barcode-from-fact",
      name: "Barcode from a real number",
      description: "Code-128-looking bars drawn with repeating-linear-gradient from a real number (date, phone, postcode) with its digits printed beneath in mono."
    },
    {
      id: "tear-edge",
      name: "Saw-tooth tear",
      description: "Top and bottom edges cut in 8px saw teeth (conic-gradient mask), like the auto-cutter."
    }
  ],
  anchors: [
    {
      id: "merchant-header",
      name: "Double-width merchant header",
      description: "The first screen shows the top of the receipt: block-character logo or double-width name, address, date/time, terminal line."
    },
    {
      id: "blown-up-total",
      name: "Blown-up TOTAL",
      description: 'One line of the receipt cropped and enlarged: "TOTAL ........ value" at 8\u201310vw across the screen, dot leaders included.'
    },
    {
      id: "whole-strip",
      name: "Whole strip in view",
      description: "The entire short receipt (18\u201330 lines) fits in the first screen at 1:1, standing alone on the counter colour."
    }
  ],
  surfaces: [
    {
      id: "thermal-paper",
      name: "Thermal paper",
      description: "Smooth grey-white paper that curls slightly at both edges.",
      css: "background-color: var(--paper); background-image: linear-gradient(90deg, rgba(0,0,0,.05), transparent 6%, transparent 94%, rgba(0,0,0,.05));"
    },
    {
      id: "print-head-banding",
      name: "Print-head banding",
      description: "Faint horizontal banding in the print where the head runs slightly cold.",
      css: ".receipt { -webkit-mask-image: repeating-linear-gradient(0deg, #000 0 2px, rgba(0,0,0,.82) 2px 3px); mask-image: repeating-linear-gradient(0deg, #000 0 2px, rgba(0,0,0,.82) 2px 3px); }"
    },
    {
      id: "counter-laminate",
      name: "Counter laminate",
      description: "The page around the strip is a speckled formica counter; the receipt is the only paper.",
      css: "body { background-color: var(--panel); background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1.5px), radial-gradient(rgba(0,0,0,.14) 1px, transparent 1.5px); background-size: 9px 9px, 13px 13px; }"
    }
  ],
  must: [
    "All text inside the strip is monospaced and aligned to a character grid; values right-align to the same column.",
    "The strip is at most 48ch wide; nothing inside spans wider.",
    "Separators are typed characters (- = * \xB7), not CSS borders.",
    "Only facts appear as line items and values; a missing value is left blank, never invented."
  ],
  mustNot: [
    "No proportional fonts inside the strip.",
    "No more than ink + one accent + paper inside the strip.",
    "No cards, icons, rounded containers or buttons styled as UI; links look like printed lines."
  ]
};
var recordSleeve = {
  id: "record-sleeve",
  name: { zh: "\u5531\u7247\u5C01\u5957", en: "Record sleeve" },
  family: "print",
  concept: {
    zh: "\u4E94\u5341\u5230\u516B\u5341\u5E74\u4EE3\u7684\u9ED1\u80F6\u5C01\u5957\uFF1A\u6B63\u9762\u662F\u4E00\u4E2A\u6B63\u65B9\u5F62\u2014\u2014\u72E0\u72E0\u88C1\u5207\u7684\u7167\u7247\u3001\u5DE8\u5927\u7684\u5B57\uFF0C\u6216\u51E0\u4E4E\u4EC0\u4E48\u90FD\u6CA1\u6709\uFF1B\u80CC\u9762\u662F\u5BC6\u5BC6\u7684\u66F2\u76EE\u8868\u3001\u5F55\u97F3\u4FE1\u606F\u548C\u76EE\u5F55\u53F7\u3002Blue Note \u7684\u7235\u58EB\u5F20\u529B\uFF0CECM \u7684\u51B7\u9759\u7559\u767D\uFF0CFactory \u7684\u7F16\u53F7\u4E0E\u514B\u5236\u3002",
    en: "The 1950s\u201380s LP sleeve: the front is a square \u2014 a brutally cropped photo, enormous type, or almost nothing; the back is a dense track listing, recording credits and a catalogue number. Blue Note's jazz tension, ECM's cool silence, Factory's numbering and restraint."
  },
  references: [
    "Reid Miles \u2014 Blue Note Records sleeves (1956\u201367)",
    "Barbara Wojirsch & Dieter Rehm \u2014 ECM Records covers",
    'Peter Saville \u2014 Factory Records (FAC numbers, "Unknown Pleasures", "Power, Corruption & Lies")',
    "Alex Steinweiss \u2014 Columbia Records sleeves (1940s)",
    "Hipgnosis \u2014 sleeves for Pink Floyd and Led Zeppelin"
  ],
  keywords: ["\u6B63\u65B9\u5F62", "\u5C01\u9762/\u5C01\u5E95", "\u66F2\u76EE\u8868", "\u76EE\u5F55\u53F7", "\u72E0\u88C1\u5207", "A\u9762/B\u9762", "\u5185\u9875\u8BF4\u660E"],
  tokens: {
    grid: "Square module: the cover is 1:1 at min(92vw, 88vh) with an internal 12\xD712 square grid; the back cover uses 3 columns with 12px gutters.",
    radius: "0 for sleeves; the disc is a circle (border-radius: 50%) with a label circle at 33% of its diameter.",
    border: "No borders on the cover; back-cover credits use 1px rules; a 12px spine strip where needed.",
    shadow: "none. Wear is shown with a ring-wear mark (thin radial ring) instead of a shadow."
  },
  layouts: [
    {
      id: "front-and-back",
      name: "Front & back cover",
      description: "The page literally is the sleeve: a square front cover, then a square back cover with track listing and liner notes.",
      grid: "Front: 1:1 square up to 880px; back: another square with 3 columns (2 for liner notes + 1 for the track list).",
      structure: [
        "Front cover square: cropped image or type-only composition; name, title, catalogue number",
        "Spine strip: 12px band with title and catalogue number rotated 90\xB0",
        "Back cover: listing A1\u2013A4 / B1\u2013B4 with durations (any ordered facts), personnel, recording date & place",
        "Liner notes: 2 columns of 12\u201313px serif with a signed byline (only from the facts)",
        "Centre label: a disc label with side, speed (33\u2153) and catalogue number"
      ]
    },
    {
      id: "blue-note-crop",
      name: "Blue Note crop",
      description: "Reid Miles-style: an extreme tight crop (photo or giant letters) fills two thirds of the square; the title stacks in condensed caps against one edge inside a single strong colour band.",
      grid: "12\xD712 square grid; crop occupies rows 1\u20138, type band rows 9\u201312; type may bleed off the square edge.",
      structure: [
        "Square with a photo or letterform crop in rows 1\u20138, tinted in one colour",
        "Type band: name in giant condensed caps, title in a contrasting weight",
        `Catalogue label top-right in the "BLUE NOTE 1577" manner, using the subject's own code`,
        "Under the sleeve: session details table (date, place, people) with 1px rules"
      ]
    },
    {
      id: "ecm-silence",
      name: "ECM silence",
      description: "A huge field of near-empty colour or a soft landscape, with tiny lowercase type set off-centre near one edge; information is minimal and quiet.",
      grid: "1:1 square with a 12% inner margin; type sits on a 6-col grid in the lower third, never above 22px.",
      structure: [
        "Square: a misty photo or a flat tone field across all of it",
        "Tiny type block (name / title / label) aligned to the lower third, left of centre",
        "Below the square: a single column of titles with durations, wide line spacing",
        "Footer line: catalogue number, year, recording location"
      ]
    }
  ],
  type: [
    {
      id: "league-franklin",
      name: "League Gothic + Libre Franklin",
      display: {
        family: "League Gothic",
        weights: [400],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Libre Franklin",
        weights: [400, 700, 900],
        italic: true,
        fallback: '"Franklin Gothic Medium", Arial, sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "League Gothic uppercase at huge sizes (up to 30vw), line-height 0.82, tracking 0; it is allowed to be cut by the square edge. Libre Franklin 900 for the title line in mixed case, 400 for credits at 13px/1.5. Durations in tabular figures, right-aligned."
    },
    {
      id: "jost-crimson",
      name: "Jost + Crimson Pro",
      display: {
        family: "Jost",
        weights: [300, 400],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      body: {
        family: "Crimson Pro",
        weights: [400],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "ECM voice. Jost 400 lowercase at 14\u201322px, tracking 0.04em \u2014 never larger than 32px, even for the title; space does the work. Crimson Pro 400 and italic for liner notes 16px/1.6 and titles; durations in Jost 300 tabular."
    },
    {
      id: "krona-schibsted",
      name: "Krona One + Schibsted Grotesk",
      display: {
        family: "Krona One",
        weights: [400],
        fallback: '"Arial Black", sans-serif',
        source: "google"
      },
      body: {
        family: "Schibsted Grotesk",
        weights: [400, 700],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "Chiron Hei HK", body: "Noto Sans SC" },
      notes: 'Factory / post-punk voice. Krona One uppercase either small (16\u201328px, tracking 0.1em) or huge (12vw) \u2014 nothing in between. Schibsted Grotesk 400/700 for credits at 13px/1.45. A catalogue number in the "FAC 73" form is always present, set in Krona One.'
    }
  ],
  palettes: [
    {
      id: "blue-note-tint",
      name: "Blue Note tint",
      colors: {
        paper: "#f1ece1",
        ink: "#121212",
        muted: "#4b4740",
        accent: "#0a6fa6",
        accent2: "#e86a1c",
        rule: "#121212",
        panel: "#cfe0ea"
      },
      usage: "Cover photo or crop tinted in the blue accent (~50% of the square); title band in black or orange; orange also for the catalogue label; back cover is cream paper with black text."
    },
    {
      id: "ecm-fog",
      name: "ECM fog",
      colors: {
        paper: "#d9dad5",
        ink: "#1a1c1d",
        muted: "#4f5354",
        accent: "#6f7e83",
        accent2: "#2f3a3d",
        rule: "#8a9093",
        panel: "#c3c6c1"
      },
      usage: "Grey-fog paper; the cover field in the slate accent or a soft photo (~85% of the square); type in ink at small sizes only; no warm colour at all."
    },
    {
      id: "factory-black",
      name: "Factory black",
      colors: {
        paper: "#0e0e0e",
        ink: "#f0eee9",
        muted: "#a7a49d",
        accent: "#e8452c",
        accent2: "#f2c230",
        rule: "#3a3a3a",
        panel: "#1c1c1c"
      },
      usage: "Black sleeve and page; off-white type; red and yellow as small solid colour-code blocks or a single line of type (<10%); grey rules on the back cover."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["golden", "perfect-fifth", "major-third"],
  motion: [
    {
      id: "disc-slide-out",
      name: "Record slides out",
      description: "On hover the black disc slides out of the right edge of the sleeve by 35% of its width, as when pulling a record.",
      duration: "420ms",
      easing: "cubic-bezier(.22,.61,.36,1)",
      reduced: "Show the disc half out, statically."
    },
    {
      id: "turntable",
      name: "Turntable",
      description: 'While a "play" state is active, the centre label rotates at 33\u2153 rpm (1.8s per turn) and stops dead on pause.',
      duration: "1800ms",
      easing: "linear",
      reduced: "No rotation; static label."
    },
    {
      id: "still",
      name: "Still sleeve",
      description: "No motion; hover underlines a title and turns its duration to accent.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "catalogue-number",
      name: "Catalogue number",
      description: `A label code (e.g. "BLP 4003", "ECM 1064", "FAC 51") built from the subject's initials and a real number such as the year, on the cover corner and the back.`
    },
    {
      id: "side-a-side-b",
      name: "Side A / Side B",
      description: "Any ordered facts listed as SIDE A / SIDE B with A1\u2026B4 numbering, titles and right-aligned tabular durations or values."
    },
    {
      id: "ring-wear",
      name: "Ring wear",
      description: "A faint circular ring on the cover (2px band at ~6% ink) where the disc has rubbed through."
    }
  ],
  anchors: [
    {
      id: "square-cover",
      name: "Square cover",
      description: "A perfect square fills the first-screen height with the cover composition; the page around it is plain."
    },
    {
      id: "cropped-giant-type",
      name: "Cropped giant type",
      description: "The name in condensed caps so large the square edges cut it; only 60\u201370% of the letters are visible."
    },
    {
      id: "half-out-disc",
      name: "Half-out disc",
      description: "Square sleeve on the left and the black disc pulled half out to the right, its label carrying the title and catalogue number."
    }
  ],
  surfaces: [
    {
      id: "laminated-flipback",
      name: "Laminated flipback",
      description: "Crisp, flat front; the back cover has a 6px folded flipback strip on its left edge.",
      css: '.sleeve { background: var(--panel); } .back { position: relative; } .back::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 6px; background: var(--rule); }'
    },
    {
      id: "ring-worn-board",
      name: "Ring-worn board",
      description: "Matte board with a visible ring where the record has worn through the print.",
      css: "background-color: var(--paper); background-image: radial-gradient(circle at 50% 50%, transparent 0 44%, rgba(0,0,0,.07) 44.5% 45.5%, transparent 46%);"
    },
    {
      id: "vinyl-grooves",
      name: "Vinyl grooves",
      description: "The disc itself is drawn with fine concentric grooves around a flat label.",
      css: ".disc { border-radius: 50%; background: radial-gradient(circle, var(--accent) 0 16%, #111 16.2% 17%, transparent 17%), repeating-radial-gradient(circle, #111 0 1px, #1c1c1c 1px 2px); }"
    }
  ],
  must: [
    "The first screen contains a perfect 1:1 square composition.",
    "A catalogue number and an ordered listing (A1, A2\u2026 or 01, 02\u2026) appear on the page.",
    "Type or image is cropped by the square edge at least once \u2014 or, in the ECM option, the square is \u226585% empty."
  ],
  mustNot: [
    "No wide rectangular hero banner; the cover is square.",
    "No streaming-app UI: no circular play buttons, progress bars or heart icons.",
    "No invented track names, credits or durations \u2014 only items from the facts."
  ]
};
var varsitySports = {
  id: "varsity-sports",
  name: { zh: "\u8D5B\u4E8B\u79E9\u5E8F\u518C", en: "Varsity sports programme" },
  family: "print",
  concept: {
    zh: "\u7403\u8D5B\u79E9\u5E8F\u518C\u4E0E\u5927\u5B66\u6821\u961F\u7684\u89C6\u89C9\uFF1A\u7403\u8863\u53F7\u7801\u3001\u8896\u53E3\u6761\u7EB9\u3001\u94FE\u5F0F\u523A\u7EE3\u5B57\u6BCD\u3001\u5BF9\u9635\u8868\u548C\u6BD4\u5206\u724C\u6570\u5B57\u3002\u989C\u8272\u5C31\u662F\u961F\u8272\uFF0C\u4E24\u79CD\uFF0C\u7EDD\u4E0D\u66F4\u591A\uFF1B\u5185\u5BB9\u662F\u8D5B\u7A0B\u3001\u540D\u5355\u548C\u6BD4\u5206\uFF0C\u4E00\u5207\u90FD\u6392\u6210\u8868\u683C\u3002",
    en: "The matchday programme and varsity kit: jersey numerals, sleeve stripes, chain-stitched letters, fixtures tables and scoreboard figures. Colour means team colours \u2014 two, never more \u2014 and the content is fixtures, rosters and scores, all of it set as tables."
  },
  references: [
    "English Football League matchday programmes (1950s\u201370s)",
    "US college football programmes (Notre Dame, Michigan, 1940s\u201360s)",
    "Varsity letterman jackets and chenille patches",
    "Otl Aicher \u2014 Munich 1972 Olympics schedules and pictograms",
    "\u5168\u8FD0\u4F1A\u3001\u6821\u8FD0\u4F1A\u79E9\u5E8F\u518C"
  ],
  keywords: ["\u79E9\u5E8F\u518C", "\u7403\u8863\u53F7\u7801", "\u961F\u8272", "\u8896\u53E3\u6761\u7EB9", "\u5BF9\u9635\u8868", "\u6BD4\u5206\u724C", "\u94FE\u5F0F\u523A\u7EE3"],
  tokens: {
    grid: "12 col, 12px gutter, 24px margin; tables on a 28px row; numerals sized in multiples of the row (2\xD7, 4\xD7, 8\xD7, 16\xD7).",
    radius: "0 for tables, bands and containers. Patch and pennant shapes are cut with clip-path (arched or triangular), never border-radius.",
    border: "Sleeve stripes: three bands (8px colour / 4px paper / 8px colour); table rules 1px; header underline 4px accent.",
    shadow: "none. Chain-stitch letters get a double outline (2px paper + 3px accent2 via -webkit-text-stroke and paint-order) instead of a shadow."
  },
  layouts: [
    {
      id: "matchday-programme",
      name: "Matchday programme",
      description: "A programme cover in team colours with a badge and the fixture, then interior pages: fixtures table, line-up, club notes.",
      grid: "12 col; cover full width at 70vh crossed by a diagonal stripe; interior 8 col main + 4 col fixtures sidebar.",
      structure: [
        'Cover: competition name band at top, "A v B" (or subject v occasion) huge, date / kick-off strip, price in a corner',
        "Fixtures & results table with home/away columns and scoreboard numerals",
        "Line-up: two numbered columns 1\u201311 holding facts as roster entries",
        "Club notes: a narrow column of text with a bold kicker",
        "Back page: ground plan as a simple ruled diagram + next fixture"
      ]
    },
    {
      id: "letterman-jacket",
      name: "Letterman jacket",
      description: "Built like a jacket: a giant chenille letter patch on one side, sleeve stripes running down beside the text, and small arm patches carrying numbers.",
      grid: "Asymmetric 5/7 split: 5 col for a 1:1 letter patch, 7 col for text; a 48px vertical stripe band at the far right edge.",
      structure: [
        "Chenille letter patch: the subject initial at ~40vw in the display face with a stitched double outline",
        "Vertical sleeve-stripe band (three stripes) running beside the text column",
        "Roster / info list with year numerals ('26) as round-cut arm patches",
        "Pennant-shaped headers for each section",
        "Footer with year and place in chain-stitch outline letters"
      ]
    },
    {
      id: "scoreboard",
      name: "Scoreboard",
      description: "The first screen is a stadium scoreboard: a dark board with lamp-style numerals in labelled cells, followed by an event schedule.",
      grid: "Board: 6 equal square cells across in 2 rows, each with a label strip; below, a 12-col schedule table.",
      structure: [
        "Scoreboard: two big number cells with real figures from the facts (year, count, time) plus period / clock cells",
        "Ribbon of team-colour stripes under the board",
        "Schedule table: time | event | place | note, alternating row tints",
        "Roster or officials list in two columns",
        "Footer: league or school name and season"
      ]
    }
  ],
  type: [
    {
      id: "graduate-baskerville",
      name: "Graduate + Libre Baskerville",
      display: {
        family: "Graduate",
        weights: [400],
        fallback: 'Rockwell, "Courier New", serif',
        source: "google"
      },
      body: {
        family: "Libre Baskerville",
        weights: [400, 700],
        italic: true,
        fallback: "Baskerville, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Graduate (collegiate block) uppercase only, tracking 0.04em, line-height 0.9; jersey numbers get a 3px paper + 3px accent2 double outline (paint-order: stroke fill). Libre Baskerville 400/italic body 16px/1.55, like a 1950s college programme; tables in Baskerville with lining figures."
    },
    {
      id: "bigshoulders-barlow",
      name: "Big Shoulders Display + Barlow Condensed",
      display: {
        family: "Big Shoulders Display",
        weights: [800, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Barlow Condensed",
        weights: [500, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Big Shoulders Display 900 uppercase for numerals and headers, line-height 0.85; numerals may reach 40vw. Barlow Condensed 500 body 16px/1.35, 700 uppercase labels +0.06em; tabular-nums in every table."
    },
    {
      id: "ultra-plexcond",
      name: "Ultra + IBM Plex Sans Condensed",
      display: { family: "Ultra", weights: [400], fallback: "Rockwell, Georgia, serif", source: "google" },
      body: {
        family: "IBM Plex Sans Condensed",
        weights: [400, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Ultra (fat slab) for team names and badge letters, arched along an SVG textPath for pennant headings; never letter-spaced. IBM Plex Sans Condensed 400 for fixtures and rosters 15px/1.4 with tabular figures, 600 for scores; position abbreviations uppercase +0.08em."
    }
  ],
  palettes: [
    {
      id: "maroon-gold",
      name: "Maroon & gold",
      colors: {
        paper: "#f5f0e2",
        ink: "#1d1416",
        muted: "#5a4a48",
        accent: "#7a1b2b",
        accent2: "#d9a521",
        rule: "#1d1416",
        panel: "#ecdcb4"
      },
      usage: "Maroon for cover fields, patches and big numerals (~30%); gold only in stripes and stitched outlines (~8%); ink-on-cream for every table."
    },
    {
      id: "green-orange",
      name: "Forest green & orange",
      colors: {
        paper: "#f3f5ef",
        ink: "#0f1f17",
        muted: "#3f5248",
        accent: "#00563f",
        accent2: "#f47321",
        rule: "#0f1f17",
        panel: "#dde8dc"
      },
      usage: "Cool white programme stock; forest green for bands and numerals (~25%); orange for stripes, kick-off times and one pennant (~8%); pale green alternating table rows."
    },
    {
      id: "scoreboard-night",
      name: "Scoreboard at night",
      colors: {
        paper: "#101211",
        ink: "#f3efe3",
        muted: "#a8a597",
        accent: "#ffb000",
        accent2: "#e0352b",
        rule: "#3a3d3a",
        panel: "#1d201e"
      },
      usage: "Black board; amber lamp numerals (~15%) and red for the guest/second team only; off-white for tables; panel cells hold each lamp figure."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "score-flip",
      name: "Score flip",
      description: "Changing numerals flip like hanging score cards: the top half folds down over 90\xB0 and the new card drops in.",
      duration: "260ms",
      easing: "cubic-bezier(.5,0,.5,1)",
      reduced: "Swap the digits instantly."
    },
    {
      id: "lamp-matrix",
      name: "Lamp board",
      description: "Scoreboard digits are 5\xD77 lamp matrices whose dots switch on in four stepped frames.",
      duration: "320ms",
      easing: "steps(4, end)",
      reduced: "Show the lit digits."
    },
    {
      id: "stitch-stripe",
      name: "Stitched stripe",
      description: "On hover or focus of a section heading, its sleeve stripes extend from 0 to full width, like a stripe being stitched on.",
      duration: "200ms",
      easing: "cubic-bezier(.2,.8,.2,1)",
      reduced: "Stripes are always full width."
    }
  ],
  motifs: [
    {
      id: "sleeve-stripes",
      name: "Sleeve stripes",
      description: "Three-band stripes (colour / paper / colour at 8/4/8px) used as rules under headers and down page edges, always in the same order."
    },
    {
      id: "jersey-numerals",
      name: "Jersey numerals",
      description: "Huge outlined numerals (paper + accent2 double outline) marking each section 01, 02\u2026 like shirt numbers."
    },
    {
      id: "patch-and-pennant",
      name: "Patch & pennant",
      description: "Felt-letter patches with a dashed chain-stitch outline in accent2, and triangular pennants (clip-path) carrying section titles."
    }
  ],
  anchors: [
    {
      id: "shirt-number",
      name: "Shirt number",
      description: "One real number from the facts (year, founding date, count) set as a jersey numeral at 40\u201350vh on a team-colour field with stripes."
    },
    {
      id: "versus-cover",
      name: "Versus cover",
      description: 'A programme cover: two names in display type split by a big "v" across the stripes, with date and kick-off time below.'
    },
    {
      id: "scoreboard-panel",
      name: "Scoreboard panel",
      description: "A dark scoreboard with 4\u20136 lit cells across the first screen showing real figures (date, time, numbers from the facts)."
    }
  ],
  surfaces: [
    {
      id: "programme-stock",
      name: "Programme stock",
      description: "Slightly yellowed uncoated programme paper printed in two colours.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(80,60,20,.05) 1px, transparent 1.4px); background-size: 4px 4px;"
    },
    {
      id: "felt-chenille",
      name: "Felt chenille",
      description: "Patches look like felt with a chain-stitched edge.",
      css: `background-color: var(--accent); background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .25 0'/></filter><rect width='100%' height='100%' filter='url(%23f)'/></svg>"); outline: 3px dashed var(--accent2); outline-offset: -8px;`
    },
    {
      id: "jersey-mesh",
      name: "Jersey mesh",
      description: "Large team-colour fields carry a fine knitted mesh.",
      css: "background-color: var(--accent); background-image: radial-gradient(rgba(0,0,0,.18) 1.2px, transparent 1.6px), radial-gradient(rgba(0,0,0,.18) 1.2px, transparent 1.6px); background-size: 6px 6px; background-position: 0 0, 3px 3px;"
    }
  ],
  must: [
    "Exactly two team colours (accent, accent2) plus paper and ink; stripes repeat them in the same order everywhere.",
    "Fixtures, schedules and rosters are real tables with tabular figures and a header rule.",
    "At least one numeral is set at jersey scale (\u226530vh)."
  ],
  mustNot: [
    'No sporting-goods advertising look: no action-photo collage, speed lines or italic "dynamic" skew.',
    "No invented scores, results or names; only facts.",
    "No gradients on team-colour fields; flat print or felt colour only."
  ]
};
var coutureLookbook = {
  id: "couture-lookbook",
  name: { zh: "\u65F6\u88C5\u753B\u518C", en: "Couture lookbook" },
  family: "print",
  concept: {
    zh: "\u65F6\u88C5\u753B\u518C\u4E0E\u5DF4\u9ECE\u7248 Vogue \u7684\u7F16\u8F91\u7248\u9762\uFF1ADidone \u5B57\u4F53\u5728\u6781\u5927\u548C\u6781\u5C0F\u4E4B\u95F4\u6765\u56DE\u5207\u6362\uFF0C\u53D1\u4E1D\u7EC6\u7EBF\uFF0C\u5927\u7247\u7559\u767D\uFF0C\u5B57\u6781\u5C11\u3002\u6BCF\u4E00\u9875\u53EA\u6709\u4E00\u4E2A\u4E3B\u4F53\uFF0C\u6309 LOOK 01\u300102\u2026\u2026\u7F16\u53F7\uFF0C\u50CF\u8D70\u79C0\u51FA\u573A\u987A\u5E8F\u3002",
    en: "The fashion lookbook and the Vogue Paris editorial spread: a Didone face swinging between enormous and tiny, hairline rules, vast whitespace, very few words. Each page holds one subject, numbered LOOK 01, 02\u2026 in runway order."
  },
  references: [
    "Vogue Paris covers and editorial spreads (1970s\u20132000s)",
    "Alexey Brodovitch \u2014 Harper's Bazaar (1934\u201358)",
    "Fabien Baron \u2014 Harper's Bazaar redesign (1992)",
    "Jil Sander and Maison Martin Margiela lookbooks (1990s)",
    "M/M (Paris) \u2014 Yohji Yamamoto catalogues"
  ],
  keywords: ["Didone", "\u6781\u7AEF\u5B57\u53F7\u5BF9\u6BD4", "\u53D1\u4E1D\u7EBF", "\u5927\u7559\u767D", "LOOK \u7F16\u53F7", "\u8DE8\u9875", "\u5C11\u5B57"],
  tokens: {
    grid: "12 col, 40px gutters, 8vw outer margins, 8px baseline; blocks snap to columns, and whole columns are left empty on purpose.",
    radius: "0 everywhere.",
    border: "Hairlines only: 1px at 40% ink (or 0.5px on 2\xD7 screens); no boxes around anything.",
    shadow: "none."
  },
  layouts: [
    {
      id: "look-sequence",
      name: "Look sequence",
      description: 'Each section is one "look": a single image or a single block of text placed asymmetrically on an otherwise empty page, with its look number.',
      grid: "12 col; each look occupies 4\u20136 columns, alternating left/right; one look per 100vh on desktop.",
      structure: [
        "Cover: title at ~22vw running past the right margin, season line in 11px caps on its baseline",
        "LOOK 01: image on 5 columns at the right, number and a two-line caption bottom-left",
        "LOOK 02: text-only \u2014 one sentence at 6vw italic, nothing else on the page",
        "LOOK 03: two narrow images on 3 columns each separated by a hairline",
        "Credits page: tiny two-column list of credits / facts in small caps around a centred vertical hairline"
      ]
    },
    {
      id: "editorial-spread",
      name: "Editorial spread",
      description: "Vogue-style double-page spreads: the left page is one giant letter or word, the right page a narrow column of body text with a drop cap.",
      grid: "Spread = 2 pages \xD7 6 col with an 80px fold; text column 3 columns wide, ragged right.",
      structure: [
        "Spread 1: left page an initial at 60vh cropped by the fold; right page italic headline + standfirst",
        "Spread 2: full-page image on the left; 3-column text on the right with a drop cap and a 32px italic pull-quote",
        "Spread 3: index of items as a hairline-ruled list with page numbers",
        "Back page: masthead-style credits in 10px caps"
      ]
    },
    {
      id: "index-catalogue",
      name: "Index catalogue",
      description: "A Margiela-like sparse catalogue: very large numbers in a left rail, a minimal text index, and a great deal of off-white.",
      grid: "12 col; columns 1\u20133 form a rail for numbers at 18vw; content in columns 5\u201310; 160px vertical spacing.",
      structure: [
        "Header: subject in 13px caps on a hairline, season code at the far right",
        "Number rail: 01, 02, 03 in hairline Didone, each paired with a short description block",
        "Material / detail table: 3-column hairline table (item / material / detail) from the facts",
        "Contact / press line at the very bottom in 11px"
      ]
    }
  ],
  type: [
    {
      id: "bodoni-jost",
      name: "Bodoni Moda + Jost",
      display: {
        family: "Bodoni Moda",
        weights: [400, 500],
        italic: true,
        fallback: 'Didot, "Bodoni 72", serif',
        source: "google"
      },
      body: {
        family: "Jost",
        weights: [400, 500],
        fallback: 'Futura, "Century Gothic", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Bodoni Moda at extremes only: \u2265120px (up to 25vw, high optical size, weight 400\u2013500, tracking -0.03em, line-height 0.85) or \u226413px caps +0.2em. Nothing between 16 and 96px except an italic standfirst. Jost 400 body 15px/1.7; captions Jost 500 uppercase 11px +0.18em. Chinese display in Noto Serif SC 200\u2013300."
    },
    {
      id: "italiana-cormorant",
      name: "Italiana + Cormorant Garamond",
      display: { family: "Italiana", weights: [400], fallback: "Didot, serif", source: "google" },
      body: {
        family: "Cormorant Garamond",
        weights: [300, 400],
        italic: true,
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "Italiana uppercase for titles, tracking 0.12em, 64\u2013180px; look numbers in Italiana at 10vw. Cormorant Garamond 300 italic for standfirsts at 28\u201336px, 400 roman for body 18px/1.6. Never bold anything."
    },
    {
      id: "gilda-tenor",
      name: "Gilda Display + Tenor Sans",
      display: {
        family: "Gilda Display",
        weights: [400],
        fallback: "Didot, Georgia, serif",
        source: "google"
      },
      body: {
        family: "Tenor Sans",
        weights: [400],
        fallback: "Optima, Candara, sans-serif",
        source: "google"
      },
      cjk: { display: "Chiron Sung HK", body: "Noto Sans SC" },
      notes: "Gilda Display mixed case for headlines at 72\u2013200px, line-height 0.9, tracking -0.02em. Tenor Sans for captions and body at 14px/1.75; caps labels +0.22em. Only one heavy-looking element per page; everything else stays light."
    }
  ],
  palettes: [
    {
      id: "atelier-white",
      name: "Atelier white",
      colors: {
        paper: "#faf8f4",
        ink: "#0b0b0b",
        muted: "#5e5a55",
        accent: "#9b1b1f",
        accent2: "#c9b79c",
        rule: "#0b0b0b",
        panel: "#efebe4"
      },
      usage: "Off-white \u226570% of every page; black type; couture red for one word or one look number per page only (<2%); sand for image mats."
    },
    {
      id: "fog-bottle-green",
      name: "Fog & bottle green",
      colors: {
        paper: "#e6e7e3",
        ink: "#121414",
        muted: "#4d5251",
        accent: "#264d3b",
        accent2: "#b9a27a",
        rule: "#121414",
        panel: "#d5d8d3"
      },
      usage: "Cool fog-grey stock; ink type; bottle green for the giant numerals or the masthead (~5%); camel only as a thin rule or one mat."
    },
    {
      id: "noir-champagne",
      name: "Noir & champagne",
      colors: {
        paper: "#0d0c0b",
        ink: "#f2eee6",
        muted: "#a39d92",
        accent: "#c8a46a",
        accent2: "#8e1a1f",
        rule: "#f2eee6",
        panel: "#1a1816"
      },
      usage: "Evening-collection black; ivory type; champagne for the masthead and look numbers (~4%); deep red only as a single fill behind one image."
    }
  ],
  densities: ["airy"],
  scales: ["golden", "perfect-fifth"],
  motion: [
    {
      id: "page-turn",
      name: "Slow page turn",
      description: "Moving between looks (click / key), the next page is revealed from the right edge with clip-path: inset(0 0 0 100%) \u2192 inset(0), like turning a heavy page.",
      duration: "700ms",
      easing: "cubic-bezier(.77,0,.18,1)",
      reduced: "Cut directly between pages."
    },
    {
      id: "runway-step",
      name: "Runway step",
      description: "On hover a look steps forward: image scale 1 \u2192 1.015 while its caption hairline draws from 0 to full width.",
      duration: "450ms",
      easing: "cubic-bezier(.16,1,.3,1)",
      reduced: "Only the hairline appears; no scale."
    },
    {
      id: "still",
      name: "Still editorial",
      description: "No motion; hover adds a hairline underline.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "look-numbers",
      name: "Look numbers",
      description: "LOOK 01 / 02 \u2026 in tiny caps beside huge hairline numerals; the numbering is the navigation."
    },
    {
      id: "hairline-axis",
      name: "Hairline axis",
      description: "One vertical hairline running the full page height off-centre (at column 7) from which captions hang."
    },
    {
      id: "scale-collision",
      name: "Scale collision",
      description: "A 200px+ word sharing a baseline with 11px caps text set directly against it."
    }
  ],
  anchors: [
    {
      id: "cropped-masthead",
      name: "Cropped masthead",
      description: "The subject name at 24\u201330vw in Didone, cropped by the right edge of the viewport, with a season code in 11px caps on its baseline."
    },
    {
      id: "single-image-void",
      name: "Single image in a void",
      description: "One user-provided image on 4\u20135 columns placed off-centre in a sea of off-white; without imagery, one italic sentence at 5vw in the same spot."
    },
    {
      id: "giant-initial",
      name: "Giant initial",
      description: "One initial or numeral at ~70vh in hairline Didone filling the left half; the right half empty except a three-line caption."
    }
  ],
  surfaces: [
    {
      id: "matte-coated",
      name: "Matte coated stock",
      description: "Clean, flat paper with no texture at all.",
      css: "background: var(--paper);"
    },
    {
      id: "tissue-interleaf",
      name: "Tissue interleaf",
      description: "A tissue sheet over the cover: a paper-coloured layer at 82% opacity (no blur) laid over the first image, its lower edge slightly deckled.",
      css: ".tissue { background: color-mix(in srgb, var(--paper) 82%, transparent); clip-path: polygon(0 0, 100% 0, 100% 97%, 80% 99%, 55% 97%, 30% 100%, 0 98%); }"
    },
    {
      id: "laid-board",
      name: "Laid board",
      description: "Heavy uncoated board with a faint laid-line texture.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,.02) 0 1px, transparent 1px 4px);"
    }
  ],
  must: [
    "The first screen has at least a 15:1 ratio between its largest and smallest type size.",
    "At least 50% of the first screen is empty paper.",
    "Every section carries a look or page number."
  ],
  mustNot: [
    "No paragraph longer than 60 words on any one page; no bullet lists.",
    "No boxes, cards, filled buttons or badges; links are underlined words or numbers.",
    "No mid-size type between 16 and 64px except one italic standfirst."
  ]
};
var broadsheetNewspaper = {
  id: "broadsheet-newspaper",
  name: { zh: "\u5927\u62A5\u7248\u9762", en: "Broadsheet newspaper" },
  family: "print",
  concept: {
    zh: "\u5927\u62A5\u7684\u5934\u7248\uFF1A\u54E5\u7279\u4F53\u6216\u886C\u7EBF\u62A5\u5934\uFF0C\u516D\u680F\u7F51\u683C\u52A0\u680F\u95F4\u7EC6\u7EBF\uFF0C\u7535\u5934\u3001\u7709\u9898\u3001\u8F6C\u7248\u63D0\u793A\uFF0C\u6B63\u6587\u5BC6\u800C\u6574\u9F50\u3002\u7248\u9762\u7B49\u7EA7\u5B8C\u5168\u9760\u6807\u9898\u5B57\u53F7\u548C\u8DE8\u680F\u5BBD\u5EA6\u5EFA\u7ACB\u2014\u2014\u6700\u91CD\u8981\u7684\u4E8B\u4E0A\u5934\u6761\uFF0C\u5176\u4F59\u4F9D\u6B21\u9012\u51CF\u3002",
    en: "The broadsheet front page: a blackletter or serif masthead, a six-column grid with column rules, datelines, kickers and jump lines, dense justified body copy. Hierarchy comes entirely from headline size and column span \u2014 the main story leads, everything else steps down in order of importance."
  },
  references: [
    "The New York Times front pages (1950s\u20131990s)",
    "The Times (London) after Stanley Morison's Times New Roman (1932)",
    "The Guardian Berliner redesign by Mark Porter (2005)",
    "Financial Times salmon broadsheet",
    "\u300A\u5927\u516C\u62A5\u300B\u300A\u4EBA\u6C11\u65E5\u62A5\u300B\u5934\u7248"
  ],
  keywords: ["\u62A5\u5934", "\u516D\u680F", "\u680F\u7EBF", "\u7535\u5934", "\u7709\u9898", "\u8F6C\u7248", "\u5934\u6761"],
  tokens: {
    grid: "6 columns, 16px gutter with a 1px column rule centred in each gutter, 24px page margin; body on a 22px baseline (17/22); masthead and headlines span 2\u20136 columns.",
    radius: "0.",
    border: "1px column rules; 3px + 1px double rule under the masthead; 0.5px (or 1px at 50%) cut-off rules between stories in a column; 4px rule above section flags.",
    shadow: "none."
  },
  layouts: [
    {
      id: "front-page",
      name: "Front page",
      description: "A full front page: masthead with ears, a 4-column lead story with a large headline, two side columns of briefs, and stories below the fold.",
      grid: "6 col; lead = col 1\u20134, right rail = col 5\u20136; below the fold = three 2-col stories.",
      structure: [
        'Masthead: title between two ear boxes (edition / price), then the folio line "Vol. \xB7 No. \xB7 date \xB7 price" between double rules',
        'Lead story: 4-col headline with 2\u20133 decks, byline, dateline "CITY, Nov. 1 \u2014", body in 4 justified columns ending with "Continued on Page A6"',
        "Right rail: 2 columns of briefs with bold kickers separated by cut-off rules",
        "Below the fold: three 2-col stories with smaller heads",
        'Index box: "INSIDE / \u672C\u671F\u5BFC\u8BFB" with page numbers'
      ]
    },
    {
      id: "stacked-decks",
      name: "Stacked decks",
      description: "Nineteenth-century style: narrow single-column stories with headlines stacked in multiple decks (caps, italic, small caps), no images.",
      grid: "6 col; every story is 1 column wide; decks separated by short centred 30px rules.",
      structure: [
        "Masthead: full-width title with the folio line and a ruled ear on each side",
        "Columns 1\u20132: lead story with 4 decks of headlines (caps, italic, small caps, roman)",
        "Columns 3\u20136: running stories, each with a 2-deck head and dense body",
        "Boxed notices at the foot of columns, carrying facts like times and addresses",
        "Folio line at the bottom with page number and edition"
      ]
    },
    {
      id: "section-front",
      name: "Section front",
      description: "A modern section front: big section flag, one dominant block (image or a ruled table of facts), a pull-quote and a 3-column story.",
      grid: "6 col; flag full width; dominant block 4 col; story text 3 col with column 6 holding the pull-quote.",
      structure: [
        'Section flag: "ARTS / \u6587\u5316" on a 4px rule with the date',
        "Dominant block: user-provided image or a ruled table of facts across 4 columns, with caption",
        "Headline + standfirst across 4 columns",
        "Story in 3 columns with a large pull-quote hanging in column 6 (quote only from the facts)",
        "Footer: jump line and section index"
      ]
    }
  ],
  type: [
    {
      id: "fraktur-newsreader",
      name: "UnifrakturMaguntia + Newsreader",
      display: {
        family: "UnifrakturMaguntia",
        weights: [400],
        fallback: '"Old English Text MT", serif',
        source: "google"
      },
      body: {
        family: "Newsreader",
        weights: [400, 600, 700],
        italic: true,
        fallback: 'Georgia, "Times New Roman", serif',
        source: "google"
      },
      cjk: { display: "Ma Shan Zheng", body: "Noto Serif SC" },
      notes: "Blackletter only for the masthead (and at most one section flag), never for headlines. Headlines Newsreader 700 at display optical size, tracking -0.01em, line-height 1.02; decks Newsreader 400 italic. Body 16\u201317px/22px justified with hyphens: auto, 1em first-line indent, no space between paragraphs. Bylines caps 11px +0.08em. Chinese masthead in Ma Shan Zheng (brush, like \u4EBA\u6C11\u65E5\u62A5)."
    },
    {
      id: "oldstandard-caslon",
      name: "Old Standard TT + Libre Caslon Text",
      display: {
        family: "Old Standard TT",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      body: {
        family: "Libre Caslon Text",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Old Standard TT for the masthead (caps, +0.04em) and headlines: 700 caps for the top deck, italic for the second. Libre Caslon Text body 15px/1.4 justified and hyphenated. Kickers in all-small-caps; datelines in caps followed by an em dash."
    },
    {
      id: "zilla-sourceserif",
      name: "Zilla Slab + Source Serif 4",
      display: {
        family: "Zilla Slab",
        weights: [600, 700],
        fallback: "Rockwell, Georgia, serif",
        source: "google"
      },
      body: {
        family: "Source Serif 4",
        weights: [400, 600],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Chiron Hei HK", body: "Noto Serif SC" },
      notes: "Berliner voice. Zilla Slab 600/700 for headlines in sentence case, tracking -0.015em, line-height 1.0, from 28px (briefs) to 88px (lead). Source Serif 4 body 16px/1.45 ragged right; standfirsts 22px. Section flags in Zilla Slab 700 lowercase."
    }
  ],
  palettes: [
    {
      id: "newsprint-grey",
      name: "Newsprint grey",
      colors: {
        paper: "#efece4",
        ink: "#141414",
        muted: "#4f4d48",
        accent: "#b0191e",
        accent2: "#2f4f6f",
        rule: "#141414",
        panel: "#e2ddd0"
      },
      usage: "Ink on newsprint for ~95%; red for the section flag and one rule (<3%); blue-grey for the index box heading; panel for boxed notices."
    },
    {
      id: "salmon-financial",
      name: "Salmon financial",
      colors: {
        paper: "#f6d4ba",
        ink: "#1a1715",
        muted: "#5b4b40",
        accent: "#0d5c63",
        accent2: "#990f3d",
        rule: "#1a1715",
        panel: "#efc6a6"
      },
      usage: "Whole page salmon; black text; teal for figures and table headers (~4%); claret for the masthead underline and kickers."
    },
    {
      id: "berliner-white",
      name: "Berliner white",
      colors: {
        paper: "#f8f9f7",
        ink: "#121212",
        muted: "#545a5c",
        accent: "#0b2c55",
        accent2: "#c70000",
        rule: "#121212",
        panel: "#e8ecef"
      },
      usage: 'Bright white stock; ink text; deep navy masthead bar and section flags (~6%); red only for kickers and the "live" marker; pale grey panel for the index.'
    }
  ],
  densities: ["packed", "compact"],
  scales: ["perfect-fourth", "augmented-fourth", "perfect-fifth"],
  motion: [
    {
      id: "edition-stamp",
      name: "Edition stamp",
      description: 'A "LATE EDITION / \u665A\u7248" flag stamps into the ear on load: scale 1.2 \u2192 1 in two frames.',
      duration: "150ms",
      easing: "steps(2, end)",
      reduced: "The flag is simply present."
    },
    {
      id: "jump-flash",
      name: "Jump-line flash",
      description: 'Clicking "Continued on A6" jumps instantly (no smooth scroll) and the target column rule turns accent for 600ms.',
      duration: "600ms",
      easing: "steps(1, end)",
      reduced: "Same jump; the target rule turns accent and stays, no flash."
    },
    {
      id: "still",
      name: "Still page",
      description: "No motion; links are underlined in ink and turn accent on hover.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "masthead-ears",
      name: "Masthead ears",
      description: "Two small boxed ears either side of the masthead (edition, price or a one-line fact), 1px rule boxes 140px wide."
    },
    {
      id: "datelines-jumps",
      name: "Datelines & jump lines",
      description: 'Stories open with "CITY, Date \u2014" in caps and end with "Continued on Page 4, Column 3" in italic.'
    },
    {
      id: "column-rules",
      name: "Column rules & cut-offs",
      description: "1px vertical rules between all columns, thin horizontal cut-off rules between stories, a double rule under the masthead."
    }
  ],
  anchors: [
    {
      id: "masthead",
      name: "Masthead",
      description: "Full-width title at 9\u201312vw between two ears, with the folio line under a double rule."
    },
    {
      id: "banner-headline",
      name: "Banner headline",
      description: 'A 6-column "war-type" headline in caps at 7\u20139vw across the whole page width, two lines maximum, above the fold.'
    },
    {
      id: "above-the-fold",
      name: "Above the fold",
      description: "The first screen is the dense top half of a front page: a small masthead (5vw) and four stories of different weights already visible."
    }
  ],
  surfaces: [
    {
      id: "groundwood-newsprint",
      name: "Groundwood newsprint",
      description: "Grey-cream newsprint with fine speckle and a faint centre fold.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.03) .8px, transparent 1px), linear-gradient(90deg, transparent 49.7%, rgba(0,0,0,.04) 50%, transparent 50.3%); background-size: 3px 3px, 100% 100%;"
    },
    {
      id: "fold-crease",
      name: "Folded copy",
      description: 'A horizontal crease at the fold (\u2248100vh): a 1px darker line with a slight tone either side \u2014 "above the fold" made literal.',
      css: ".fold { height: 32px; background: linear-gradient(180deg, transparent, rgba(0,0,0,.05) 48%, rgba(0,0,0,.12) 50%, rgba(255,255,255,.4) 51%, transparent); }"
    },
    {
      id: "bright-stock",
      name: "Bright stock",
      description: "Bright, flat white paper with crisp ink and no texture, for the Berliner voice.",
      css: "background: var(--paper);"
    }
  ],
  must: [
    "A 6-column grid with visible 1px column rules.",
    "Body copy in narrow justified (or Berliner ragged) columns of 35\u201345 characters with hyphenation.",
    "Headline size strictly follows story importance: one lead, then at least two smaller tiers.",
    "Every story has a dateline or kicker and ends with a full stop or a jump line."
  ],
  mustNot: [
    "No grid of teaser cards with images on top; stories are columns of text.",
    "No blackletter anywhere except the masthead and at most one flag.",
    "No invented quotes, sources or news; all copy comes from the facts."
  ]
};
var printBranches = [
  supermarketCircular,
  letterpressWoodtype,
  photocopyZine,
  risographDuotone,
  ticketStub,
  thermalReceipt,
  recordSleeve,
  varsitySports,
  coutureLookbook,
  broadsheetNewspaper
];

// vendor/hash-design/packages/core/src/data/branches/signage-screen.ts
var transitWayfinding = {
  id: "transit-wayfinding",
  name: { zh: "\u4EA4\u901A\u5BFC\u89C6", en: "Transit wayfinding" },
  family: "signage",
  concept: {
    zh: "\u5730\u94C1\u7AD9\u4E0E\u673A\u573A\u7684\u5BFC\u89C6\u7CFB\u7EDF\uFF1A\u9ED1\u5E95\u767D\u5B57\u7684\u65B9\u724C\u3001\u5706\u5F62\u7EBF\u8DEF\u8272\u6807\uFF0C\u7BAD\u5934\u6C38\u8FDC\u6392\u5728\u6587\u5B57\u524D\u9762\u3002Vignelli \u7684\u7EBD\u7EA6\u5730\u94C1\u6807\u51C6\u624B\u518C\u3001Kinneir \u4E0E Calvert \u7684\u82F1\u56FD\u9053\u8DEF\u6807\u5FD7\u3001\u6E2F\u94C1\u7684\u4E2D\u82F1\u53CC\u8BED\u7AD9\u540D\u90FD\u5728\u6559\u540C\u4E00\u4EF6\u4E8B\u2014\u2014\u4E00\u773C\u8BFB\u61C2\uFF0C\u6309\u987A\u5E8F\u884C\u52A8\u3002\u4FE1\u606F\u4EE5\u201C\u724C\u201D\u4E3A\u5355\u4F4D\uFF0C\u800C\u4E0D\u662F\u4EE5\u201C\u5361\u7247\u201D\u4E3A\u5355\u4F4D\u3002",
    en: "The signage system of a metro or an airport: white-on-black panels, coloured line bullets, the arrow always ahead of the words. Vignelli's NYC Transit Authority manual, Kinneir & Calvert's British road signs and Hong Kong MTR's bilingual station names all teach one lesson \u2014 read at a glance, act in sequence. Information comes in signs, not cards."
  },
  references: [
    "Unimark (Massimo Vignelli & Bob Noorda) \u2014 NYCTA Graphics Standards Manual (1970)",
    "Jock Kinneir & Margaret Calvert \u2014 Transport typeface and UK road signs (1957\u201367)",
    "Hong Kong MTR station signage and line colours (1979\u2013)",
    "Paul Mijksenaar \u2014 Schiphol Airport wayfinding system (1991)",
    "Solari di Udine split-flap departure boards (1956\u2013)",
    "Otl Aicher \u2014 Munich 1972 Olympics pictograms"
  ],
  keywords: ["\u7EBF\u8DEF\u8272\u6807", "\u7BAD\u5934", "\u7AD9\u53F0\u53F7", "\u9ED1\u5E95\u767D\u5B57", "\u7FFB\u724C\u663E\u793A\u5C4F", "\u53CC\u8BED\u7AD9\u540D"],
  tokens: {
    grid: "Sign-module grid: 1 module = 96px (64px on mobile); sign panels are 1 or 2 modules tall and span full width or whole columns of a 12-col, 24px-gutter grid; 24px inner padding (\xBC module); every text line in a panel shares one left edge; an 8px gap between panels shows the wall behind.",
    radius: "0 for every sign panel. Line bullets are perfect circles (border-radius: 50%); express/variant markers are squares rotated 45\xB0. Nothing else is rounded.",
    border: "Panels are solid fills with no outline. Black panels carry the NYCTA stripe: a 2px paper-coloured line 10px below the top edge. Rows of signs are divided by 2px solid var(--rule); platform/exit squares have no border, only fill.",
    shadow: "none. Signs are flat enamel; depth comes only from the 8px wall gap between panels."
  },
  layouts: [
    {
      id: "sign-band",
      name: "Overhead sign band",
      description: "The page is a corridor: a stack of full-width overhead sign bands, each with an arrow, bullets and a destination, and the content follows like the platform beyond.",
      grid: "Full-bleed bands 1 or 2 modules (96/192px) tall; inside each band a 12-col grid with 24px gutter; a fixed 96\xD796 arrow cell at the left or right end of the band.",
      structure: [
        "Overhead band: arrow (96px) + 2\u20134 line bullets + destination (the title), paper on black, full width",
        "Station-name frieze: title in Chinese above, English below, on a line-coloured band across a tiled wall",
        "Route strip: horizontal line diagram; each page section is a labelled stop with a tick",
        "Exit directory: ruled table \u2014 exit letter in a square, street/place names, landmarks from the facts",
        "Service-notice panel in accent2 for times and caveats, then a thin operator band as the footer"
      ]
    },
    {
      id: "departure-board",
      name: "Departure board",
      description: "The first screen is a split-flap board; each fact becomes a departure row (time \xB7 destination \xB7 platform \xB7 remark), with detail panels below.",
      grid: "Board columns 6ch time / 1fr destination / 4ch platform / 14ch remarks; each character in a flap cell 0.66em \xD7 1.15em with 2px gaps; board sits inside a 32px solid frame of var(--panel).",
      structure: [
        'Board header: "\u51FA\u53D1 DEPARTURES" left, live clock HH:MM in tabular figures right',
        "6\u201310 board rows built from the facts: time \xB7 name \xB7 platform number in a square \xB7 status word",
        'Platform legend strip: numbered squares with what each "platform" leads to',
        "Detail panels on light paper, one per row, in the same order as the board",
        "Operator footer with a row of drawn pictograms (stairs, lift, exit) and address"
      ]
    },
    {
      id: "manual-spread",
      name: "Standards-manual spread",
      description: "A page from the NYCTA manual: white page, one black sign specimen across the top third, numbered specifications and colour chips below.",
      grid: "6 col, 32px gutter, 64px outer margins; specimen spans 6 col \xD7 1 module; spec text in two 3-col columns; section code top-left, folio top-right.",
      structure: [
        'Section code + title (e.g. "1.3 Station identification") top-left in small caps, folio top-right',
        "Sign specimen: one black panel carrying the main message at true sign scale",
        "Dimension callouts: hairline arrows labelling cap height, spacing and module",
        "Numbered specification paragraphs in two columns (the facts)",
        "Colour-chip row: line colours as circles with names and codes"
      ]
    }
  ],
  type: [
    {
      id: "overpass-highway",
      name: "Overpass + Overpass Mono",
      display: {
        family: "Overpass",
        weights: [700, 800],
        fallback: '"Highway Gothic", "Arial Narrow", Arial, sans-serif',
        source: "google"
      },
      body: { family: "Overpass", weights: [400, 600], fallback: "Arial, sans-serif", source: "google" },
      mono: {
        family: "Overpass Mono",
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Chiron Hei HK", body: "Noto Sans TC" },
      notes: "Destinations in Title Case, never all caps (Kinneir/Calvert: word shapes read faster); tracking -0.01em, line-height 1.0 on signs. Platform numbers and times in Overpass Mono 600, tabular figures, 24-hour HH:MM. Minimum sign text 28px; body 17px/1.5."
    },
    {
      id: "instrument-standard",
      name: "Instrument Sans + Hanken Grotesk",
      display: {
        family: "Instrument Sans",
        weights: [500, 600, 700],
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      body: {
        family: "Hanken Grotesk",
        weights: [400, 500],
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "Noto Sans TC", body: "Noto Sans TC" },
      notes: "Vignelli discipline: one weight per panel (600 for destinations), tracking -0.015em, everything flush-left. Bullet letters 700 at 0.62\xD7 the bullet diameter, optically centred. Bilingual pairs: Chinese above English, Chinese at 1.15\xD7 the English cap height."
    },
    {
      id: "barlow-flap",
      name: "Barlow Condensed + Barlow + Azeret Mono",
      display: {
        family: "Barlow Condensed",
        weights: [500, 600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: { family: "Barlow", weights: [400, 500], fallback: "Arial, sans-serif", source: "google" },
      mono: {
        family: "Azeret Mono",
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Board characters in Azeret Mono 700 uppercase, one glyph per flap cell, tracking 0. Destinations in Barlow Condensed 600 uppercase, +0.02em. Status words (\u51C6\u70B9 ON TIME / \u5EF6\u8BEF DELAYED) in accent2. Body Barlow 16px/1.5."
    }
  ],
  palettes: [
    {
      id: "nycta-black-band",
      name: "NYCTA black band",
      colors: {
        paper: "#f2f1ec",
        ink: "#121212",
        muted: "#4a4a47",
        accent: "#ee352e",
        accent2: "#fccc0a",
        rule: "#121212",
        panel: "#121212"
      },
      usage: "Black sign panels carry ~35% of the first screen with paper-coloured type; tile-white wall elsewhere. Red and yellow appear only as line bullets (\u2264 56px circles); yellow also fills service-change notices with ink text."
    },
    {
      id: "schiphol-yellow",
      name: "Schiphol yellow",
      colors: {
        paper: "#ffd100",
        ink: "#141414",
        muted: "#4a3d00",
        accent: "#00783c",
        accent2: "#333333",
        rule: "#141414",
        panel: "#333333"
      },
      usage: 'The whole page is the yellow directional sign with ink type; dark-grey panels (\u224825%) hold facility information in yellow type; green only for exits and "way out" items. No other hues.'
    },
    {
      id: "flap-board-night",
      name: "Flap board at night",
      colors: {
        paper: "#0e0f0f",
        ink: "#f2efe6",
        muted: "#a3a097",
        accent: "#f6b40e",
        accent2: "#5cbf52",
        rule: "#2e302f",
        panel: "#1e2020"
      },
      usage: "Near-black board body; every character sits in a panel-grey flap cell split by a 1px paper-black line at mid-height. Amber for the clock and DELAYED, green only for ON TIME; ink for all characters."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fifth", "augmented-fourth", "perfect-fourth"],
  motion: [
    {
      id: "split-flap",
      name: "Split-flap",
      description: "Changing text (times, destinations) flips per character: each cell falls through 3\u20136 intermediate glyphs as a top half-flap rotating rotateX(0 \u2192 -90deg), staggered 30ms per character left to right.",
      duration: "60ms",
      easing: "cubic-bezier(.5, 0, .75, 0)",
      reduced: "Swap to the final text instantly; no intermediate glyphs."
    },
    {
      id: "arrow-nudge",
      name: "Arrow nudge",
      description: "On hover/focus the arrow of a sign slides 6px in the direction it points and returns, once; the panel and text never move.",
      duration: "220ms",
      easing: "cubic-bezier(.3, 0, .2, 1)",
      reduced: "Arrow stays still; the panel inverts (black \u2194 paper) instead."
    },
    {
      id: "route-progress",
      name: "Route progress",
      description: 'A "you are here" dot moves along the route strip to the stop of the current section, jumping stop to stop like an in-car LED line map.',
      duration: "400ms",
      easing: "steps(4, end)",
      reduced: "The dot appears at the current stop with no travel."
    }
  ],
  motifs: [
    {
      id: "line-bullets",
      name: "Line bullets",
      description: "Line identifiers as filled circles (32\u201364px) holding one letter or digit in 700 paper-coloured type; rotated squares for express variants. Max two line colours per panel."
    },
    {
      id: "directional-arrows",
      name: "Directional arrows",
      description: "Drawn SVG arrows in the AIGA/DOT manner \u2014 45\xB0 heads, stem width one-fifth of the head \u2014 always placed before the label in reading direction; only the 8 compass directions."
    },
    {
      id: "route-strip",
      name: "Route strip",
      description: "Horizontal line diagram: a 6px bar in the line colour with paper-filled stop ticks; interchange stops as paper circles with a 3px ink ring; labels set at 45\xB0 or alternating above/below."
    }
  ],
  anchors: [
    {
      id: "overhead-sign",
      name: "Overhead sign",
      description: "The first screen opens on one full-width black overhead sign: arrow, 2\u20133 line bullets, then the title as the destination at 6\u20138vw."
    },
    {
      id: "flap-board",
      name: "Flap board",
      description: "The first screen is a split-flap departure board listing 6\u20138 rows built from the facts."
    },
    {
      id: "station-name-wall",
      name: "Station-name wall",
      description: "The title set as a station name on a tiled wall \u2014 Chinese large, English below \u2014 on a line-coloured frieze band, with platform-number squares at both ends."
    }
  ],
  surfaces: [
    {
      id: "porcelain-enamel",
      name: "Porcelain enamel",
      description: "Flat vitreous-enamel panels with four drawn screw heads 14px in from the corners; perfectly even fill, crisp edges.",
      css: "background-color: var(--panel); background-repeat: no-repeat; background-image: radial-gradient(circle at 14px 14px, #8c8c88 3px, transparent 3.5px), radial-gradient(circle at calc(100% - 14px) 14px, #8c8c88 3px, transparent 3.5px), radial-gradient(circle at 14px calc(100% - 14px), #8c8c88 3px, transparent 3.5px), radial-gradient(circle at calc(100% - 14px) calc(100% - 14px), #8c8c88 3px, transparent 3.5px);"
    },
    {
      id: "ceramic-tile-wall",
      name: "Ceramic tile wall",
      description: "Station wall of stack-bonded 96\xD748 tiles behind the signs: paper colour with faint grout lines.",
      css: "background-color: var(--paper); background-image: linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px); background-size: 96px 48px;"
    },
    {
      id: "backlit-lightbox",
      name: "Backlit lightbox",
      description: "Airport lightbox: the panel is slightly brighter at its centre (backlit acrylic) inside a 6px darker aluminium frame.",
      css: "background: radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--panel) 88%, white), var(--panel) 70%); border: 6px solid color-mix(in srgb, var(--panel) 70%, black);"
    }
  ],
  must: [
    "Every directional item has an arrow placed before its label, pointing in a real direction (one of 8).",
    "Line/route identifiers are circles or squares with one character \u2014 never text pills.",
    "Bilingual labels are stacked pairs with a fixed size ratio; times are 24-hour HH:MM in tabular figures.",
    "Sign text is flush-left; only characters inside bullets and squares are centred."
  ],
  mustNot: [
    "No rounded-rectangle chips or pill tags for lines or categories.",
    "No photos, illustrations or gradients on sign panels \u2014 only type, arrows, bullets and pictograms.",
    "No all-caps running text; caps only inside flap-board cells.",
    "No more than two line colours on one sign panel."
  ]
};
var hkShopSign = {
  id: "hk-shop-sign",
  name: { zh: "\u6E2F\u5F0F\u62DB\u724C", en: "Hong Kong shop sign" },
  family: "signage",
  concept: {
    zh: "\u5F25\u6566\u9053\u4E0A\u7A7A\u6A2A\u4F38\u51FA\u6765\u7684\u62DB\u724C\u3001\u4E0A\u6D77\u8001\u8857\u7684\u7AD6\u533E\uFF1A\u4E2D\u6587\u5927\u5B57\u4E3A\u4E3B\uFF0C\u82F1\u6587\u5C0F\u4E00\u53F7\u8DDF\u5728\u4E0B\u9762\uFF1B\u7EA2\u5E95\u91D1\u5B57\u3001\u7EFF\u5E95\u767D\u5B57\u3001\u9ED1\u6F06\u63CF\u91D1\uFF0C\u591C\u91CC\u9713\u8679\u706F\u7BA1\u6CBF\u7740\u540C\u6837\u7684\u7B14\u753B\u52FE\u51FA\u6765\u3002\u6BCF\u5757\u724C\u90FD\u5199\u7740\u94FA\u53F7\u3001\u884C\u4E1A\u3001\u7535\u8BDD\u2014\u2014\u5B83\u65E2\u662F\u5E7F\u544A\uFF0C\u4E5F\u662F\u95E8\u724C\u3002",
    en: "The signs cantilevered over Nathan Road and the vertical plaques of old Shanghai streets: Chinese characters huge, English a size smaller beneath; gold on red, white on green, gilt on black lacquer, and at night neon tubes trace the same strokes. Every sign carries a shop number, a trade and a phone number \u2014 advertisement and address at once."
  },
  references: [
    "Nathan Road and Mong Kok projecting neon signs (1960s\u20132000s)",
    "\u5340\u5EFA\u516C Au Kin-kung \u2014 hand-written shop-sign calligraphy, Hong Kong",
    'M+ Museum \u2014 NEONSIGNS.HK collection and "Mobile M+: NEONSIGNS.HK" (2014)',
    "Nanjing Road department stores \u5148\u65BD Sincere / \u6C38\u5B89 Wing On, Shanghai 1920s\u201330s",
    "Hong Kong pawnshop \u62BC signs with the bat-and-coin emblem"
  ],
  keywords: ["\u62DB\u724C", "\u4E2D\u82F1\u53CC\u8BED", "\u7EA2\u5E95\u91D1\u5B57", "\u9713\u8679\u706F\u7BA1", "\u94FA\u53F7", "\u7AD6\u6392"],
  tokens: {
    grid: "Sign-board grid: content is built from boards \u2014 horizontal boards 3:1 to 5:1, vertical boards 1:3 to 1:5. One CJK character = one square cell (1em \xD7 1em) with a 0.12em gutter, so a board is N characters wide plus 2 \xD7 0.4em frame.",
    radius: "0 for all boards. Only the shop-number roundel is a circle (border-radius: 50%); neon tubes use stroke-linecap: round and stroke-linejoin: round.",
    border: "Boards are framed: 0.4em solid var(--accent2) outer frame plus a 2px inner line (outline: 2px solid var(--accent2); outline-offset: -10px). Section rules 3px solid var(--ink).",
    shadow: "none on boards. Neon tubes may carry a tight 0 0 2px edge of their own colour (max 3px blur) \u2014 never a halo."
  },
  layouts: [
    {
      id: "projecting-stack",
      name: "Projecting sign stack",
      description: "A street canyon: vertical boards hang from the right edge at staggered heights while horizontal boards carry the content on the left.",
      grid: "12 col, 16px gutter; cols 1\u20138 content boards; cols 10\u201312 hold 2\u20133 vertical boards (1:4) stacked with 24px gaps, each dropped by one-third of the previous; vertical text uses writing-mode: vertical-rl.",
      structure: [
        "Vertical shop-name board at the right, 4\u20136 characters, gold on red, upright characters",
        "Horizontal trade board at the left: what the place sells, English line beneath at \u2153 size",
        "Shop-number roundel + address line (\u5730\u94FA / 1/F / street number from the facts)",
        "Price or service list as a lacquered board: items left, prices right in lining figures",
        "Hours and phone on a narrow green strip board; footer repeats the name as a neon outline"
      ]
    },
    {
      id: "shopfront-fascia",
      name: "Shopfront fascia",
      description: "The full-width lintel board over the shutter, then the shopfront below divided into unequal window bays.",
      grid: "Fascia band full width, 22vh tall, 4\u20138 characters fit to width; below, 3 bays of 5/4/3 columns separated by 12px ink pilasters.",
      structure: [
        "Fascia board: name in 4\u20138 huge CJK characters; English name and shop number in a gold sub-band",
        "Three window bays of unequal width: goods / prices / opening hours",
        "Rolling-shutter band: 4px horizontal stripes in var(--muted) with closing days lettered on it",
        "Pilaster boards with vertical couplet text left and right of the contact panel",
        "Pavement strip: address, phone and established year (if given) in one ruled line"
      ]
    },
    {
      id: "neon-night",
      name: "Neon night stack",
      description: "The dark-street view: overlapping neon outlines drawn as line work, with lit boards hung between them carrying the content.",
      grid: "8 col, 24px gutter; boards may overhang a neighbouring column by 1 col; neon paths snap to a 24px grid with 3\u20134px strokes.",
      structure: [
        "Main neon sign: the name as stroked outline characters plus a tube border with dead (black-painted) gaps",
        "Smaller lit boards: trade and specialities, each with its own tube colour",
        "Bilingual menu or service board in lightbox style",
        "Building directory like a tong-lau lobby: G/F, 1/F, 2/F rows mapped to sections",
        "Footer: address with the nearest MTR exit letter in a square, if given"
      ]
    }
  ],
  type: [
    {
      id: "sung-plaque",
      name: "Chiron Sung HK + Marcellus + Bitter",
      display: {
        family: "Marcellus",
        weights: [400],
        fallback: '"Times New Roman", serif',
        source: "google"
      },
      body: { family: "Bitter", weights: [400, 600], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "Chiron Sung HK", body: "Noto Sans TC" },
      notes: "Chinese leads: Chiron Sung HK 900 at 2.5\u20134\xD7 the Latin cap height, tracking 0.06em. Latin in Marcellus uppercase +0.08em, one line beneath the Chinese. Shop numbers in Bitter 600 lining figures. Vertical boards: writing-mode: vertical-rl; text-orientation: upright; letter-spacing 0.1em."
    },
    {
      id: "brush-signboard",
      name: "Ma Shan Zheng + Antonio + Hanken Grotesk",
      display: {
        family: "Antonio",
        weights: [600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Hanken Grotesk",
        weights: [400, 600],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "Ma Shan Zheng", body: "Noto Sans TC" },
      notes: "Brush characters (Ma Shan Zheng, single weight) at 120\u2013200px, tracking 0.05em, one board = one phrase. English in Antonio 700 uppercase +0.04em at \u2153 of the CJK size, like the small English on a Mong Kok sign. Prices in Antonio 600 with the currency sign at 60%."
    },
    {
      id: "neon-tube",
      name: "Tilt Neon + ZCOOL XiaoWei + Schibsted Grotesk",
      display: {
        family: "Tilt Neon",
        weights: [400],
        fallback: '"Arial Rounded MT Bold", sans-serif',
        source: "google"
      },
      body: {
        family: "Schibsted Grotesk",
        weights: [400, 500],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Sans TC" },
      notes: "Tilt Neon only for neon layers, \u2265 48px, in the tube colour with a 0 0 2px same-colour edge. Chinese neon: ZCOOL XiaoWei with -webkit-text-stroke: 2px var(--accent) and color: transparent so it reads as a bent tube. Body stays small (15px) and plain so the tubes carry the voice."
    }
  ],
  palettes: [
    {
      id: "red-gold-lacquer",
      name: "Red lacquer, gold leaf",
      colors: {
        paper: "#f5ecd9",
        ink: "#1c1410",
        muted: "#5b4a3a",
        accent: "#b8121b",
        accent2: "#e5b84b",
        rule: "#1c1410",
        panel: "#b8121b"
      },
      usage: "Boards are lacquer red with gold characters and gold frames (~40% of the first screen); cream wall behind; ink for body text and rules; muted for address and phone fine print."
    },
    {
      id: "jade-enamel",
      name: "Jade-green enamel",
      colors: {
        paper: "#f7f6f0",
        ink: "#0f2a22",
        muted: "#3f5a50",
        accent: "#0b6b4f",
        accent2: "#d8261c",
        rule: "#0f2a22",
        panel: "#0b6b4f"
      },
      usage: "Green enamel boards with paper-white characters (~35%); red only for the shop-number roundel and one seal-like mark; ink text on an off-white wall."
    },
    {
      id: "neon-street",
      name: "Neon street at night",
      colors: {
        paper: "#120d0c",
        ink: "#f3ead8",
        muted: "#a99c8a",
        accent: "#ff3b5c",
        accent2: "#36d6c3",
        rule: "#3a2e2a",
        panel: "#1e1715"
      },
      usage: "Warm near-black street; neon tubes in pink (accent) and teal (accent2) as 3\u20134px strokes and outline text only (\u2264 10% of pixels); boards are panel brown-black with cream characters."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "neon-ignite",
      name: "Neon ignite",
      description: "On load each tube ignites in turn with a starter flicker \u2014 opacity 0 \u2192 .4 \u2192 .1 \u2192 1 \u2014 one tube every 120ms; at most 3 flickers per tube, never looping.",
      duration: "600ms",
      easing: "steps(4, jump-none)",
      reduced: "Tubes are lit from the start; no flicker."
    },
    {
      id: "shutter-roll",
      name: "Shutter roll",
      description: "The fascia alone is revealed by a striped rolling shutter translating from 0 to -100% on first view; nothing else on the page animates.",
      duration: "700ms",
      easing: "cubic-bezier(.6, 0, .4, 1)",
      reduced: "Shutter is already up."
    },
    {
      id: "lacquer-swap",
      name: "Lacquer swap",
      description: "No movement. Hovering a board swaps gold \u2194 red (frame and characters reverse), like a night-lit board.",
      duration: "0ms",
      easing: "steps(1, end)",
      reduced: "Same \u2014 it is a colour swap only."
    }
  ],
  motifs: [
    {
      id: "vertical-board",
      name: "Vertical board",
      description: "Tall boards with upright CJK characters (writing-mode: vertical-rl; text-orientation: upright), a gold double frame, and small English running along the bottom edge."
    },
    {
      id: "neon-outline",
      name: "Neon outline",
      description: "Neon drawn as SVG paths: 4px stroke, round caps and joins, continuous lines with visible dead gaps (stroke-dasharray breaks) where the tube jumps between characters."
    },
    {
      id: "shop-number-roundel",
      name: "Shop-number roundel",
      description: "A gold-ringed disk with the street number and a small \u865F / No., like the plaque screwed beside a shutter; reused for floor marks (G/F, 1/F)."
    }
  ],
  anchors: [
    {
      id: "fascia-name",
      name: "Fascia name",
      description: "The first screen is the fascia: the name in 4\u20138 CJK characters fit to width across a red or green board, English and shop number in a gold sub-band beneath."
    },
    {
      id: "hanging-vertical",
      name: "Hanging vertical",
      description: "A tall 1:4 vertical board hangs at the right, cut off by the top of the viewport as seen from the pavement, beside a horizontal trade board."
    },
    {
      id: "neon-cluster",
      name: "Neon cluster",
      description: "Two or three overlapping neon outline signs (name, trade, a simple drawn emblem) on the night-street palette."
    }
  ],
  surfaces: [
    {
      id: "lacquer-board",
      name: "Lacquer board",
      description: "High-gloss lacquer: flat fill with one 1px light highlight line 4px inside the top edge.",
      css: "background-color: var(--panel); background-image: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.3)); background-size: calc(100% - 16px) 1px; background-position: 8px 4px; background-repeat: no-repeat;"
    },
    {
      id: "gold-leaf-type",
      name: "Gold-leaf characters",
      description: "Characters in flat gold with a 1px darker edge \u2014 no metallic gradients.",
      css: "color: var(--accent2); -webkit-text-stroke: 1px color-mix(in srgb, var(--accent2) 70%, black);"
    },
    {
      id: "tong-lau-concrete",
      name: "Tong-lau concrete",
      description: "Weathered concrete fa\xE7ade behind the boards: paper colour with large, faint water stains.",
      css: "background-color: var(--paper); background-image: radial-gradient(ellipse at 20% 30%, rgba(60,40,20,.06), transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(60,40,20,.045), transparent 35%); background-size: 420px 360px, 300px 260px;"
    }
  ],
  must: [
    "Chinese characters are the largest element on every board; English never exceeds 40% of the CJK size.",
    "At least one vertical board using writing-mode: vertical-rl with upright characters.",
    "Every sign carries a concrete address element from the facts: shop number, floor, street or phone.",
    "Neon is drawn as line work \u2014 the path of the tube is visible."
  ],
  mustNot: [
    "No glow blobs, blurred halos or text-shadow larger than 4px; no cyberpunk gradients.",
    "No sideways-rotated Chinese in vertical text.",
    "No Latin-only boards; every board is bilingual or Chinese-only.",
    'No faux-oriental "chop suey" Latin typefaces.'
  ]
};
var dinerMenuBoard = {
  id: "diner-menu-board",
  name: { zh: "\u9910\u9986\u83DC\u5355\u677F", en: "Diner menu board" },
  family: "signage",
  concept: {
    zh: "\u7F8E\u5F0F\u9910\u9986\u67DC\u53F0\u4E0A\u65B9\u7684\u83DC\u5355\u677F\uFF1A\u9ED1\u8272\u6BDB\u6BE1\u4E0A\u63D2\u7740\u767D\u8272\u5851\u6599\u5B57\u6BCD\uFF0C\u83DC\u540D\u7528\u70B9\u7EBF\u4E00\u8DEF\u62C9\u5230\u53F3\u8FB9\u7684\u4EF7\u683C\u680F\uFF0C\u65C1\u8FB9\u4E00\u5757\u9ED1\u677F\u5199\u7740\u4ECA\u65E5\u7279\u4F9B\u3002\u642A\u74F7\u62DB\u724C\u3001\u6D3E\u997C\u67DC\u3001\u70E4\u7089\u4E0A\u65B9\u7684\u949F\u2014\u2014\u6240\u6709\u4FE1\u606F\u90FD\u5BF9\u9F50\u5728\u540C\u4E00\u6761\u4EF7\u683C\u680F\u4E0A\u3002",
    en: "The menu board above an American diner counter: white plastic letters pushed into black felt, dot leaders running every item to the price column, a chalkboard of today's specials beside it. Enamel signs, a pie case, a clock over the grill \u2014 everything lines up on the price column."
  },
  references: [
    "Changeable-letter felt menu boards, 1950s\u201380s American lunch counters",
    "Worcester Lunch Car Co. and Jerry O\u2019Mahony dining cars (1920s\u201350s)",
    "Katz's Delicatessen menu boards, New York",
    "Edward Hopper \u2014 Nighthawks (1942)",
    "Porcelain-enamel roadside signage along US Route 66"
  ],
  keywords: ["\u5B57\u6BCD\u677F", "\u70B9\u7EBF\u5F15\u5BFC", "\u4EF7\u683C\u680F", "\u4ECA\u65E5\u7279\u4F9B", "\u642A\u74F7\u62DB\u724C", "\u67DC\u53F0"],
  tokens: {
    grid: "Letter-board grid: felt grooves every 1.5em (1em letter + 0.5em groove); every text line snaps to a groove; item column flex: 1 with dot leaders, price column a fixed 6ch right-aligned column; boards sit on a 12-col, 16px-gutter wall.",
    radius: "0 for boards and panels. Porcelain-enamel signs may use 8px corners (pressed steel) \u2014 the only rounding; plates, cups and the clock face are drawn circles.",
    border: "Board frame 14px solid var(--accent2) (chrome/wood) around the felt; grooves 1px at 6\u20138% opacity. Paper menu sections ruled with a 6px double line (border-top: 6px double var(--rule)).",
    shadow: "none, except 1px 1px 0 rgba(0,0,0,.45) under plastic letters to show they stand proud of the felt."
  },
  layouts: [
    {
      id: "counter-board",
      name: "Counter board",
      description: "The big felt letter board spans the width with two menu columns; a tilted chalkboard of specials hangs at its right.",
      grid: "12 col; felt board 8 col, chalkboard 4 col; inside the felt two menu columns with a 48px gutter; every line on a 1.5em groove.",
      structure: [
        'Board header in letters: place name + "MENU" across the top of the felt',
        "Two felt columns of categories, items with dot leaders to prices",
        "Chalkboard panel at -1.5\xB0: today's special(s) from the facts, price circled",
        "Enamel strip under the board: hours, payment notes, phone",
        "Paper placemat footer: address, a simple ruled street diagram, the date"
      ]
    },
    {
      id: "laminated-menu",
      name: "Laminated menu",
      description: "A folded paper menu laid open: cover panel plus inside panels with numbered combos and a boxed special \u2014 the light-palette view.",
      grid: "Tri-fold: 3 panels of 4 col with 24px inner margins and 2px vertical fold rules; items in a two-column table (name + description | price).",
      structure: [
        "Cover panel: name on an enamel-style badge, established year (if given), one line on what is served",
        "Numbered combos #1\u2013#n: number in a filled circle, name, description, price right",
        "Boxed special from the facts inside a 6px double-rule frame",
        "Sides and drinks in small type with dot leaders",
        "Back panel: hours, address, payment notes"
      ]
    },
    {
      id: "wall-of-signs",
      name: "Wall of signs",
      description: "The diner wall: enamel signs, a felt board and a chalk strip of different sizes hung on tile, each carrying one section.",
      grid: "6-col masonry with 16px gaps; signs span 2\u20136 col; at least three shapes \u2014 wide felt board, square enamel sign, narrow vertical chalk strip.",
      structure: [
        "Wide enamel sign: the name, set like a porcelain roadside sign",
        "Square felt board: menu items with prices",
        "Narrow vertical chalk strip: specials",
        "Clock sign: opening hours drawn around a clock face",
        'Small counter sign ("PAY HERE" style) holding payment and address details'
      ]
    }
  ],
  type: [
    {
      id: "oswald-letterboard",
      name: "Oswald + Zilla Slab",
      display: {
        family: "Oswald",
        weights: [500, 600],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Zilla Slab",
        weights: [400, 600],
        fallback: "Rockwell, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: "Letter-board text in Oswald 500 UPPERCASE, tracking +0.06em (plastic letters never kern), one fixed letter height per board. Prices Oswald 600, tabular-nums, cents raised at 60%. Zilla Slab 400 for descriptions, sentence case, 16\u201317px."
    },
    {
      id: "shrikhand-enamel",
      name: "Shrikhand + Bitter",
      display: {
        family: "Shrikhand",
        weights: [400],
        fallback: '"Cooper Black", Georgia, serif',
        source: "google"
      },
      body: { family: "Bitter", weights: [400, 700], fallback: "Georgia, serif", source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Shrikhand only for the name and category headers (\u2265 40px), optionally on a -4\xB0 baseline swing; never for prices or lists. Bitter 700 small caps for item names, 400 for descriptions; lining tabular figures for prices."
    },
    {
      id: "shoulders-counter",
      name: "Big Shoulders Display + Hanken Grotesk",
      display: {
        family: "Big Shoulders Display",
        weights: [700, 900],
        fallback: 'Impact, "Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "Hanken Grotesk",
        weights: [400, 500],
        fallback: "Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Big Shoulders 900 uppercase for counter headings, tracking 0.02em, line-height 0.9; prices in 700 at 1.6\xD7 the item size. Chalk specials use the same face at 700 rotated -1.5\xB0 \u2014 chalkiness comes from colour, not a handwriting font. Hanken 400 for descriptions."
    }
  ],
  palettes: [
    {
      id: "felt-and-chrome",
      name: "Black felt and chrome",
      colors: {
        paper: "#1a1918",
        ink: "#f5f2ea",
        muted: "#b3aea2",
        accent: "#e8382f",
        accent2: "#c7c9c8",
        rule: "#3a3836",
        panel: "#262422"
      },
      usage: 'Black felt dominates (~70%); white letters for everything; red letters only for prices or "NEW"; chrome grey for the board frame and thin trims.'
    },
    {
      id: "mint-formica",
      name: "Mint formica, cherry red",
      colors: {
        paper: "#fbf7ee",
        ink: "#1d1a17",
        muted: "#55504a",
        accent: "#c8102e",
        accent2: "#5fb7a9",
        rule: "#1d1a17",
        panel: "#cfe7e0"
      },
      usage: "Cream menu paper; mint formica panels behind specials and category headers (~20%); cherry red for prices, combo-number circles and enamel signs; mint accent2 for the board frame only."
    },
    {
      id: "chalk-and-mustard",
      name: "Chalkboard and mustard",
      colors: {
        paper: "#24302a",
        ink: "#f1efe6",
        muted: "#b4b9ae",
        accent: "#f2c230",
        accent2: "#ef8a7a",
        rule: "#5b675f",
        panel: "#2f3c35"
      },
      usage: 'Green-slate ground; chalk-white text; mustard chalk for prices and circles around the special; pink chalk only for one underline or "TODAY" per board.'
    }
  ],
  densities: ["compact", "packed"],
  scales: ["perfect-fourth", "augmented-fourth", "major-third"],
  motion: [
    {
      id: "letter-push",
      name: "Letter push-in",
      description: "Letters of a board line appear one by one as if pushed into the felt: each scales 1.06 \u2192 1 and drops 2px into its groove, 25ms stagger.",
      duration: "90ms",
      easing: "cubic-bezier(.3, 1.4, .5, 1)",
      reduced: "The whole line appears at once."
    },
    {
      id: "letter-swap",
      name: "Letter swap",
      description: "On hover (or when a price changes) the old letters drop out 8px downward and the new ones push in from above \u2014 swapping plastic letters.",
      duration: "160ms",
      easing: "cubic-bezier(.5, 0, .2, 1)",
      reduced: "Instant text swap."
    },
    {
      id: "still-board",
      name: "Still board",
      description: "No motion; hover underlines the item with a 2px dashed chalk-coloured line.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "dot-leaders",
      name: "Dot leaders",
      description: "A flex filler between item and price drawn with radial-gradient dots (2px every 8px) sitting on the text baseline."
    },
    {
      id: "felt-grooves",
      name: "Felt grooves",
      description: "Horizontal grooves every 1.5em behind letter-board text, 1px at 8% opacity, with letters sitting exactly between them."
    },
    {
      id: "enamel-badge",
      name: "Enamel badge",
      description: 'Porcelain-enamel sign shape: rectangle with 8px corners, a 3px contrasting inner border and a drawn screw hole at each end, carrying the name or "OPEN".'
    }
  ],
  anchors: [
    {
      id: "felt-board-hero",
      name: "Felt board",
      description: "The first screen is the felt letter board itself: name across the top, two columns of items with dot leaders and prices visible at once."
    },
    {
      id: "special-chalkboard",
      name: "Specials chalkboard",
      description: "A wood-framed chalkboard tilted -1.5\xB0 with the special(s) from the facts, price circled in mustard, dominates the first screen."
    },
    {
      id: "enamel-sign-name",
      name: "Enamel sign",
      description: "A large porcelain-enamel sign with the place name (and real established year if given) over a strip of counter info: hours, phone."
    }
  ],
  surfaces: [
    {
      id: "black-felt",
      name: "Black felt",
      description: "Grooved felt behind letter-board text.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, transparent 0 calc(1.5em - 1px), rgba(255,255,255,.07) calc(1.5em - 1px) 1.5em);"
    },
    {
      id: "chalk-slate",
      name: "Chalk slate",
      description: "Slate with faint chalk haze where it was wiped.",
      css: "background-color: var(--panel); background-image: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.06), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,.04), transparent 45%);"
    },
    {
      id: "formica-fleck",
      name: "Formica fleck",
      description: "Laminate with a small scattered fleck behind paper menus.",
      css: "background-color: var(--panel); background-image: radial-gradient(rgba(0,0,0,.06) 1px, transparent 1.5px), radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.5px); background-size: 14px 14px, 22px 22px; background-position: 0 0, 7px 11px;"
    }
  ],
  must: [
    "Every menu item has a price aligned in a single right-hand column with tabular figures.",
    "Item and price are connected by dot leaders or a groove \u2014 never by a gap alone.",
    "Letter-board text is uppercase with fixed spacing on visible grooves.",
    "Only items and prices present in the facts appear; empty categories are omitted."
  ],
  mustNot: [
    "No food photography, stock images or illustrated food icons.",
    'No handwriting or "chalk" novelty fonts \u2014 chalk comes from colour and tilt.',
    "No card grid for menu items; items are lines on a board."
  ]
};
var galleryCatalogue = {
  id: "gallery-catalogue",
  name: { zh: "\u7F8E\u672F\u9986\u56FE\u5F55", en: "Gallery catalogue" },
  family: "signage",
  concept: {
    zh: "\u767D\u7ACB\u65B9\u5C55\u5385\u7684\u5899\u9762\u8BF4\u660E\u4E0E\u5C55\u89C8\u56FE\u5F55\uFF1A\u4E00\u9762\u5899\u53EA\u6302\u4E00\u4EF6\u4F5C\u54C1\uFF0C\u65C1\u8FB9\u4E00\u5F20\u5C0F\u5C0F\u7684\u5C55\u7B7E\u5199\u7740\u4F5C\u8005\u3001\u6807\u9898\u3001\u5E74\u4EE3\u3001\u6750\u8D28\u3001\u5C3A\u5BF8\u3002\u56FE\u5F55\u91CC\u5927\u91CF\u7559\u767D\u3001\u8FDE\u7EED\u7684\u56FE\u7248\u7F16\u53F7\u3001\u6863\u6848\u7070\u2014\u2014\u514B\u5236\u672C\u8EAB\u5C31\u662F\u6743\u5A01\u3002",
    en: "White-cube wall texts and exhibition catalogues: one work per wall, a small label beside it giving artist, title, year, medium and dimensions. In the catalogue: wide margins, continuous plate numbers, archival grey \u2014 restraint is the authority."
  },
  references: [
    "MoMA exhibition catalogues and wall labels (1960s\u2013)",
    "Wim Crouwel \u2014 Stedelijk Museum Amsterdam catalogues (1964\u201385)",
    "documenta 5 catalogue, Kassel (1972)",
    "Brian O\u2019Doherty \u2014 Inside the White Cube (1976)",
    "Steidl and Walther K\xF6nig artist monographs"
  ],
  keywords: ["\u5C55\u7B7E", "\u56FE\u7248\u7F16\u53F7", "\u7559\u767D", "\u4F5C\u8005/\u6807\u9898/\u5E74\u4EE3/\u6750\u8D28", "\u6863\u6848\u7070", "\u767D\u7ACB\u65B9"],
  tokens: {
    grid: "Catalogue grid: 12 col, 24px gutter, outer margins \u2265 12vw on desktop; a hanging line at 40% of viewport height on which works/plates are centred; captions on a 4px baseline grid.",
    radius: "0 everywhere \u2014 images, labels, buttons.",
    border: "Almost none: 1px solid var(--rule) hairlines for the running head and under plate captions; images unbordered except white-on-white works (1px var(--rule)).",
    shadow: "none. Foam-board labels are shown by a 1px var(--rule) outline, not by shadow."
  },
  layouts: [
    {
      id: "single-wall",
      name: "One work per wall",
      description: "Each viewport is a wall: one work (image or typographic stand-in) on the hanging line, a small label at its lower right.",
      grid: "12 col; work spans col 3\u20139 centred on the 40vh hanging line; label in col 10\u201311, aligned to the lower third of the work; each wall section min-height 100vh.",
      structure: [
        "Entry wall: exhibition title in vinyl lettering top-left, dates and venue below, curatorial text \u2264 60ch",
        "Wall 1\u2026n: one work + tombstone label (artist, dates, title in italic, year, medium, dimensions, credit)",
        "Room-change wall: room number and room title alone",
        "Checklist: every work as a numbered table",
        "Colophon: lenders, curator, design credits at 11\u201312px"
      ]
    },
    {
      id: "catalogue-plates",
      name: "Catalogue plates",
      description: "Book spreads: text on the verso, a full-page plate with its plate number on the recto, repeated through the page.",
      grid: "Spread of two pages; verso 5 col of text (max 52ch) + 1 col margin notes; recto 6 col plate area; folios at the outer bottom corners; running head over a 1px rule.",
      structure: [
        "Half-title spread: the title alone on the recto, small",
        "Essay pages: text with note numbers set in the margin column",
        'Plate spreads: "Pl. 12" + plate on the recto, 4-line caption below',
        "List of plates: ruled index with plate and page numbers",
        "Colophon: edition, printer, paper stock (only as given)"
      ]
    },
    {
      id: "checklist-index",
      name: "Archive checklist",
      description: "An archival register: tombstone entries in a measured grid with plate boxes and accession-style numbers, sections in a sticky left rail.",
      grid: "12 col; left 2 col sticky section rail; entries span 3 col each (4:3 plate box + 5-line tombstone); 48px row gap.",
      structure: [
        "Register header: title, date range, number of works (from the facts)",
        "Sticky section labels in the left rail",
        "Entries: number, plate box, tombstone lines",
        "Notes on the works: numbered endnotes",
        "Credits and lenders"
      ]
    }
  ],
  type: [
    {
      id: "cormorant-catalogue",
      name: "Cormorant + EB Garamond",
      display: {
        family: "Cormorant",
        weights: [400, 500],
        italic: true,
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        italic: true,
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: 'Titles of works always italic. Exhibition title Cormorant 400 at \u2264 64px \u2014 the catalogue never shouts. Plate numbers in all-small-caps ("Pl. 12"); old-style figures in running text, lining in dimensions ("120 \xD7 90 cm" with a true \xD7). Body 17px/1.6, max 58ch.'
    },
    {
      id: "hanken-walltext",
      name: "Hanken Grotesk + IBM Plex Mono",
      display: {
        family: "Hanken Grotesk",
        weights: [400, 500],
        italic: true,
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      body: {
        family: "Hanken Grotesk",
        weights: [400],
        italic: true,
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      mono: {
        family: "IBM Plex Mono",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "One family, sizes do the work (Stedelijk discipline): title 40px/500, labels 13px/1.45 400, flush-left ragged-right, never justified. Artist 500, work title italic. Dimensions and inventory numbers in Plex Mono 12px."
    },
    {
      id: "marcellus-inscription",
      name: "Marcellus + Instrument Sans",
      display: {
        family: "Marcellus",
        weights: [400],
        fallback: '"Times New Roman", serif',
        source: "google"
      },
      body: {
        family: "Instrument Sans",
        weights: [400, 500],
        italic: true,
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Sans SC" },
      notes: "Marcellus uppercase +0.12em only for exhibition and room titles, as if cut in vinyl at the entrance \u2014 never for labels. Labels in Instrument Sans 400 at 14px/1.6; artist names 500; work titles italic."
    }
  ],
  palettes: [
    {
      id: "white-cube",
      name: "White cube",
      colors: {
        paper: "#fafaf7",
        ink: "#161616",
        muted: "#5e5e5a",
        accent: "#c8332b",
        accent2: "#7d7a72",
        rule: "#d8d6cf",
        panel: "#efeee9"
      },
      usage: "Wall paper \u2265 85% of the area; ink text; muted for credit lines and dimensions; accent only as the 10px red dot and the current room number; panel behind the checklist."
    },
    {
      id: "archive-board",
      name: "Archive board",
      colors: {
        paper: "#e6e3dc",
        ink: "#1d1c1a",
        muted: "#55524c",
        accent: "#2f4a3a",
        accent2: "#a07e46",
        rule: "#b9b4a8",
        panel: "#d8d4ca"
      },
      usage: "Grey archive-board page; bookcloth green for plate numbers and section labels; brass only for the rule under the running head; panel for plate boxes."
    },
    {
      id: "black-box",
      name: "Black-box room",
      colors: {
        paper: "#151413",
        ink: "#ece8e0",
        muted: "#9d978c",
        accent: "#e8c27a",
        accent2: "#7f8a8c",
        rule: "#34322f",
        panel: "#1f1d1b"
      },
      usage: "Dark room for screen and light works: near-black walls, warm-white labels; the spot-lit accent only on room numbers and the current work title."
    }
  ],
  densities: ["airy", "regular"],
  scales: ["major-third", "perfect-fourth", "golden"],
  motion: [
    {
      id: "spot-refocus",
      name: "Spotlight refocus",
      description: "When a work or plate is focused or hovered, the rest of the wall dims slightly (paper \u2192 panel), as if the track lights were refocused.",
      duration: "400ms",
      easing: "cubic-bezier(.25, .1, .25, 1)",
      reduced: "No dimming; the focused label gets a 1px rule underline."
    },
    {
      id: "plate-slide",
      name: "Plate slide",
      description: "Catalogue navigation: the next plate slides in horizontally by one page width with no fade \u2014 paper over paper.",
      duration: "520ms",
      easing: "cubic-bezier(.65, 0, .35, 1)",
      reduced: "Instant page swap."
    },
    {
      id: "still-wall",
      name: "Still wall",
      description: "No motion; links are 1px underlines offset 3px.",
      duration: "0ms",
      easing: "linear",
      reduced: "Nothing to change."
    }
  ],
  motifs: [
    {
      id: "tombstone-label",
      name: "Tombstone label",
      description: "The museum label in fixed order \u2014 artist (500), dates, title (italic), year, medium, dimensions, credit line \u2014 small and flush-left."
    },
    {
      id: "plate-number",
      name: "Plate number",
      description: '"Pl. 12" / "\u56FE 12" in small caps beside every image or stand-in, numbered continuously through the page.'
    },
    {
      id: "red-dot",
      name: "Red dot",
      description: 'A single 10px solid accent circle \u2014 the gallery "sold" dot \u2014 used at most once per screen for the one item that matters.'
    }
  ],
  anchors: [
    {
      id: "vinyl-title-wall",
      name: "Vinyl title wall",
      description: "The entry wall: exhibition title in vinyl lettering top-left at modest size, dates and venue below, everything else empty wall."
    },
    {
      id: "single-plate",
      name: "Single plate",
      description: "One large plate (image, or a typographic stand-in on panel colour) with its plate number and 4-line caption \u2014 nothing else above the fold."
    },
    {
      id: "checklist-first",
      name: "Checklist first",
      description: "The first screen is the checklist: a numbered table of works (no., artist, title, year, medium) with generous row height."
    }
  ],
  surfaces: [
    {
      id: "matte-wall",
      name: "Matte wall",
      description: "Matte emulsion wall: flat paper colour, no texture at all.",
      css: "background: var(--paper);"
    },
    {
      id: "uncoated-stock",
      name: "Uncoated stock",
      description: "Uncoated catalogue paper with a barely visible fibre grain.",
      css: "background-color: var(--paper); background-image: radial-gradient(rgba(0,0,0,.025) .6px, transparent .8px); background-size: 4px 5px;"
    },
    {
      id: "foam-board-label",
      name: "Foam-board label",
      description: "Labels as 1mm foam board on the wall: panel fill, 1px rule outline, no shadow.",
      css: "background: var(--panel); border: 1px solid var(--rule); padding: 12px 14px;"
    }
  ],
  must: [
    "Every work or item has a tombstone with maker, title and year from the facts \u2014 omit a line rather than invent it.",
    "At least 40% of each first screen is empty wall.",
    "Titles of works are italic; plate numbers are continuous.",
    "The exhibition title is never larger than 72px."
  ],
  mustNot: [
    "No carousels, hover-zoom or captions overlaid on images.",
    "No centred or justified body text; labels are flush-left ragged-right.",
    "No more than one accent mark per screen."
  ]
};
var topographicMap = {
  id: "topographic-map",
  name: { zh: "\u5730\u5F62\u56FE", en: "Topographic map" },
  family: "signage",
  concept: {
    zh: "\u6D4B\u7ED8\u5C40\u51FA\u7248\u7684\u5730\u5F62\u56FE\uFF1A\u7B49\u9AD8\u7EBF\u4E00\u5708\u5708\u6536\u7D27\uFF0C\u56FE\u5ED3\u4E0A\u523B\u6EE1\u5750\u6807\u523B\u5EA6\uFF0C\u56FE\u4F8B\u65B9\u6846\u3001\u6BD4\u4F8B\u5C3A\u548C\u51FA\u7248\u8BF4\u660E\u6574\u9F50\u5730\u6392\u5728\u56FE\u8FB9\u3002\u6C34\u7CFB\u662F\u84DD\u8272\u659C\u4F53\uFF0C\u7B49\u9AD8\u7EBF\u662F\u8D6D\u8272\uFF0C\u6797\u5730\u662F\u6DE1\u7EFF\u8272\u5757\u2014\u2014\u6BCF\u4E00\u79CD\u989C\u8272\u90FD\u662F\u4E00\u5C42\u6570\u636E\u3002",
    en: "The survey office\u2019s topographic sheet: contours tightening ring by ring, grid references ticked along the neat-line, legend boxes, scale bar and imprint lined up in the margin. Water is blue italic, contours ochre, woodland a pale green tint \u2014 every colour is a data layer."
  },
  references: [
    "Ordnance Survey 1:50 000 Landranger and 1:25 000 Explorer sheets",
    "USGS 7.5-minute topographic quadrangles",
    "swisstopo Landeskarte der Schweiz 1:25 000",
    "Eduard Imhof \u2014 Cartographic Relief Presentation (1965)",
    "\u56FD\u5BB6\u6D4B\u7ED8\u5C40 1:5 \u4E07\u5730\u5F62\u56FE"
  ],
  keywords: ["\u7B49\u9AD8\u7EBF", "\u65B9\u683C\u7F51", "\u56FE\u4F8B", "\u6BD4\u4F8B\u5C3A", "\u56FE\u5ED3", "\u5750\u6807\u523B\u5EA6"],
  tokens: {
    grid: "Map sheet: a neat-line frame inset 48px from the viewport; inside, a grid square every 96px drawn as hairlines with two-digit references at both ends of every line in the margin; content panels snap to whole grid squares.",
    radius: "0. Only symbols are round (spot heights, survey points); trig points are triangles.",
    border: "Neat-line: 1px ink inner line + 6px ink outer line, 8px apart. Grid lines 1px var(--rule); legend boxes 1px ink; scale bar segments 1px ink outline.",
    shadow: "none. Relief, if any, is a hillshade tint inside the map field \u2014 never a drop shadow on UI."
  },
  layouts: [
    {
      id: "sheet-with-margin",
      name: "Sheet with margin",
      description: "The map field takes three-quarters; a right margin column holds title block, legend, scale bar and imprint, like an OS sheet.",
      grid: "12 col; map field col 1\u20139 inside the neat-line, margin col 10\u201312 with 32px padding; 96px grid squares in the field; margin items on a 4px baseline.",
      structure: [
        'Title block at the top of the margin: sheet number, title, series, scale "1:25 000"',
        "Map field: contour drawing with the key content placed as labelled features (spot heights, place names)",
        "Legend panel: symbols + labels in two columns, one entry per fact category",
        "Scale bar (alternating ink/paper segments) and north arrow with a declination note",
        "Imprint: publisher, survey date, edition, grid note at 10\u201311px"
      ]
    },
    {
      id: "legend-led",
      name: "Legend-led",
      description: "The legend is the page: content arranged as entries of a large two-column key, with a small locator map inset at the top right.",
      grid: "8 col; legend entries in 2 columns, each entry = a 48px symbol cell + text; locator inset 3 col \xD7 3 rows with its own neat-line.",
      structure: [
        "Series header band: series name, sheet number, edition",
        "Locator inset map with the current area outlined",
        "Legend sections (roads & paths / water / vegetation / buildings) relabelled as the facts\u2019 categories",
        'Reference table: grid reference for each item, e.g. "SD 284 093" format',
        "Margin notes and publication imprint"
      ]
    },
    {
      id: "folded-sheet",
      name: "Folded sheet",
      description: "The map as folded: a cover panel with a series colour band, then panels of map and data separated by visible fold lines.",
      grid: "Panels at 1:1.4 in a 4 \xD7 2 fold grid; 1px dashed fold lines between panels; cover panel top-left with a coloured series band.",
      structure: [
        "Cover panel: series band, sheet number huge, title, scale, a small sheet-index diagram",
        "Map panels: contour areas carrying sections of content as annotations",
        "Elevation-profile panel: a drawn cross-section line",
        "Data panel: tables of coordinates, heights or distances from the facts",
        "Back panel: imprint, edition and legend summary"
      ]
    }
  ],
  type: [
    {
      id: "barlow-landeskarte",
      name: "Barlow Condensed + Barlow + Azeret Mono",
      display: {
        family: "Barlow Condensed",
        weights: [500, 600],
        italic: true,
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: { family: "Barlow", weights: [400, 500], fallback: "Arial, sans-serif", source: "google" },
      mono: { family: "Azeret Mono", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Place names in Barlow Condensed: settlements upright 600; area names letter-spaced +0.15em across their feature; water names italic. Spot heights and grid numbers in Azeret Mono 11px tabular. Hierarchy by size and spacing, not colour."
    },
    {
      id: "bitter-ordnance",
      name: "Bitter + IBM Plex Sans Condensed",
      display: {
        family: "Bitter",
        weights: [500, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      body: {
        family: "IBM Plex Sans Condensed",
        weights: [400, 500],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: "Water features in Bitter italic in the water colour, everything else upright \u2014 the cartographic italic-for-water rule. Sheet title Bitter 700 uppercase +0.04em. Margin text Plex Sans Condensed 12\u201313px; grid numbers 10px tabular-nums."
    },
    {
      id: "martian-survey",
      name: "Martian Mono + Zilla Slab",
      display: {
        family: "Martian Mono",
        weights: [400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Zilla Slab",
        weights: [400, 500],
        italic: true,
        fallback: "Rockwell, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Serif SC" },
      notes: 'Survey-data voice: coordinates, elevations and sheet codes in Martian Mono uppercase +0.04em; descriptive text in Zilla Slab 400, water names in its italic. Elevations always carry units ("1 284 m"), thin-space thousands.'
    }
  ],
  palettes: [
    {
      id: "os-explorer",
      name: "Survey sheet",
      colors: {
        paper: "#fbf8ef",
        ink: "#1e1c18",
        muted: "#575247",
        accent: "#0072bc",
        accent2: "#b5602a",
        rule: "#a7bfd2",
        panel: "#e3eed6"
      },
      usage: "Paper is the map; contours in accent2 brown at 1px (index contours 1.75px); water, water names and grid in accent blue; woodland panels pale green (~15%); ink for names and margin text; muted for imprint."
    },
    {
      id: "hypsometric-tint",
      name: "Hypsometric tint",
      colors: {
        paper: "#e9edd8",
        ink: "#1b1f14",
        muted: "#4b5140",
        accent: "#8a5a2b",
        accent2: "#3d79a8",
        rule: "#b6a77f",
        panel: "#f1e2bf"
      },
      usage: "Lowland green ground; highland tan panels for raised content blocks; upland brown for contours and headings; blue only for water; ink for all names."
    },
    {
      id: "cyanotype-field",
      name: "Cyanotype field copy",
      colors: {
        paper: "#16457a",
        ink: "#f2f5f7",
        muted: "#b9cde0",
        accent: "#ffffff",
        accent2: "#f0c75e",
        rule: "#5d82ab",
        panel: "#1d5590"
      },
      usage: "Prussian-blue blueprint of the field sheet: all line work and text in white/ink; muted for grid labels; yellow survey-crayon accent2 only for the current-location mark and corrections."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["major-second", "minor-third", "major-third"],
  motion: [
    {
      id: "contour-plot",
      name: "Contour plot",
      description: "Contours draw themselves on first load via stroke-dashoffset, innermost ring first, at constant plotter speed; 40ms stagger per contour.",
      duration: "900ms",
      easing: "linear",
      reduced: "Contours drawn complete."
    },
    {
      id: "crosshair-readout",
      name: "Crosshair readout",
      description: "Over the map field a hairline crosshair snaps to grid squares and the margin shows the live grid reference \u2014 no easing, instrument-like.",
      duration: "0ms",
      easing: "steps(1, end)",
      reduced: "Same behaviour (it follows the pointer, nothing animates on its own)."
    },
    {
      id: "fold-open",
      name: "Fold open",
      description: "Folded-sheet panels unfold in sequence, rotateY 90\xB0 \u2192 0 around their fold edge, like opening the map.",
      duration: "480ms",
      easing: "cubic-bezier(.3, .7, .2, 1)",
      reduced: "Panels shown flat."
    }
  ],
  motifs: [
    {
      id: "contour-lines",
      name: "Contour lines",
      description: "SVG contours: concentric, non-crossing 1px lines at even intervals; every fifth an index contour at 1.75px with its height label breaking the line."
    },
    {
      id: "grid-ticks",
      name: "Grid ticks",
      description: "Coordinate ticks along the neat-line: 6px ticks every grid square with two-digit eastings/northings, 3px minor ticks every tenth."
    },
    {
      id: "scale-bar",
      name: "Scale bar",
      description: 'Alternating ink/paper segmented bar (0\u20131\u20132 km) with "1:25 000" above and small numbers under each division.'
    }
  ],
  anchors: [
    {
      id: "contour-field",
      name: "Contour field",
      description: "The first screen is a field of contours with the title set as a feature name along the slope (letter-spaced on an SVG textPath)."
    },
    {
      id: "sheet-title-block",
      name: "Sheet title block",
      description: "A large sheet title block: series name, sheet number at 15vw, title, scale, edition \u2014 beside a small index diagram of adjacent sheets."
    },
    {
      id: "legend-panel",
      name: "Legend panel",
      description: "A framed legend panel with 6\u201310 symbol entries that double as the page navigation."
    }
  ],
  surfaces: [
    {
      id: "map-paper",
      name: "Map paper with grid",
      description: "Flat, slightly warm map paper with the grid printed across it.",
      css: "background-color: var(--paper); background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 96px 96px; background-position: -1px -1px;"
    },
    {
      id: "hillshade",
      name: "Hillshade",
      description: "Imhof-style relief shading lit from the north-west, inside the map field only.",
      css: "background-image: linear-gradient(135deg, rgba(255,255,255,.35), transparent 40%, rgba(60,50,30,.08) 75%);"
    },
    {
      id: "woodland-stipple",
      name: "Woodland stipple",
      description: "Vegetation areas as a regular stipple of small dots on the panel tint.",
      css: "background-color: var(--panel); background-image: radial-gradient(color-mix(in srgb, var(--ink) 25%, transparent) 1px, transparent 1.4px); background-size: 10px 8px;"
    }
  ],
  must: [
    "A neat-line frame with coordinate ticks and labels on at least two sides.",
    "A legend explains every symbol and colour used; a scale bar appears on the page.",
    "Water-related or secondary names are italic; colours are assigned by layer, never decoratively."
  ],
  mustNot: [
    "No satellite imagery, web-map pins or rounded map controls.",
    "No random squiggles: contours are concentric, non-crossing and evenly stepped.",
    "No more than four layer colours plus ink."
  ]
};
var terminalPhosphor = {
  id: "terminal-phosphor",
  name: { zh: "\u7EC8\u7AEF\u8367\u5149", en: "Terminal phosphor" },
  family: "screen",
  concept: {
    zh: "\u5927\u578B\u673A\u4E0E\u54D1\u7EC8\u7AEF\u7684\u5C4F\u5E55\uFF1A\u9ED1\u5E95\u4E0A\u53D1\u5149\u7684\u7EFF\u8272\u6216\u7425\u73C0\u8272\u7B49\u5BBD\u5B57\uFF0C\u5236\u8868\u7B26\u753B\u51FA\u7684\u65B9\u6846\u548C\u8868\u683C\uFF0C\u63D0\u793A\u7B26\u540E\u9762\u4E00\u4E2A\u95EA\u70C1\u7684\u5149\u6807\u3002\u7ED3\u6784\u6765\u81EA man page\uFF1ANAME\u3001SYNOPSIS\u3001DESCRIPTION\uFF0C\u4E00\u5207\u90FD\u88C5\u8FDB 80 \u5217\u3002",
    en: "The screen of a mainframe or dumb terminal: green or amber phosphor monospace on black, box-drawing characters for panels and tables, a blinking cursor after the prompt. Structure comes from the man page \u2014 NAME, SYNOPSIS, DESCRIPTION \u2014 and everything fits in 80 columns."
  },
  references: [
    "DEC VT100 / VT220 terminals (1978\u201383)",
    "IBM 3270 display stations and ISPF panels",
    "Unix Programmer\u2019s Manual and the man(1) page format, Bell Labs (1971\u201379)",
    "Lear Siegler ADM-3A and Zenith Z-19 green/amber phosphor screens",
    "IBM 1403 line printer and green-bar continuous paper"
  ],
  keywords: ["\u8367\u5149\u7EFF", "\u7425\u73C0\u8272", "\u7B49\u5BBD", "\u65B9\u6846\u7EBF", "\u63D0\u793A\u7B26", "\u5149\u6807"],
  tokens: {
    grid: "Character grid: everything in ch and line units \u2014 80ch max width (132ch for wide tables), line-height 1.25; columns are integer ch widths (e.g. 24ch | 56ch); spacing in whole lines, never px gaps that break the cell grid.",
    radius: "0 for all UI. The only curve is the optional CRT bezel around the whole screen (border-radius 18px on the outer frame).",
    border: "Boxes drawn with box-drawing characters (\u250C\u2500\u2510\u2502\u2514\u2518, double \u2554\u2550\u2557 for the primary panel) as text, or at most 1px solid var(--accent); nothing thicker.",
    shadow: "none on elements. Phosphor bloom only as text-shadow: 0 0 2px currentColor (\u2264 3px blur); nothing else glows."
  },
  layouts: [
    {
      id: "man-page",
      name: "Man page",
      description: "The page reads as a man page: header line, NAME, SYNOPSIS, DESCRIPTION, OPTIONS, SEE ALSO, with 7ch indentation.",
      grid: "One 80ch column at 2ch from the left; section heads at col 0, body indented 7ch, option flags hanging-indented 7ch / 14ch.",
      structure: [
        "Header line: TITLE(1) at both ends with the manual name centred",
        "NAME: the title \u2014 one-line summary",
        "SYNOPSIS: the core offer written as a command with [options]",
        "DESCRIPTION: paragraphs indented 7ch",
        "OPTIONS / FILES / SEE ALSO built from the facts; footer line with date and version"
      ]
    },
    {
      id: "split-session",
      name: "Split session",
      description: "A multiplexed terminal: a large session pane with prompt and output, side panes for a status table and a log, and a reverse-video status bar.",
      grid: "Panes divided by box-drawing lines: left 56ch, right 24ch; right split 60/40 vertically; 1-line reversed status bar at the bottom.",
      structure: [
        'Main pane: prompt "$ " + a command that lists the content, output below',
        "Right-top pane: key facts as a top(1)-style table in fixed ch columns",
        "Right-bottom pane: timestamped log lines (dates from the facts)",
        "Status bar: reverse video with session name, clock, pane numbers",
        "Below: further command/output blocks, one per section"
      ]
    },
    {
      id: "mainframe-form",
      name: "3270 form panel",
      description: "An IBM 3270 / ISPF panel: protected labels, underlined input fields, a numbered option menu and a PF-key legend at the bottom.",
      grid: "80 \xD7 24 cell layout; labels in col 2\u201320, fields from col 22; title on row 1; PF-key legend on rows 23\u201324.",
      structure: [
        "Row 1: panel ID left, title centred, date right",
        "COMMAND ===> line with an underlined input field",
        "Numbered option menu (0\u20139), one line each \u2014 each option is a section",
        'Field block: labels with dot leaders to values ("Phone . . . . :")',
        'PF-key legend: "F1=Help  F3=Exit  F7=Up  F8=Down"'
      ]
    }
  ],
  type: [
    {
      id: "vt323-plex",
      name: "VT323 + IBM Plex Mono",
      display: { family: "VT323", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      body: {
        family: "IBM Plex Mono",
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "VT323 for headings and the prompt line at multiples of 16px (bitmap face: 32/48/64px). Body Plex Mono 15\u201316px, line-height 1.25. Section names UPPERCASE without letter-spacing; emphasis is 500 or reverse video, never italic."
    },
    {
      id: "plex-3270",
      name: "IBM Plex Mono + Fira Code",
      display: {
        family: "IBM Plex Mono",
        weights: [600, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Fira Code",
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: 'Mainframe panel voice: titles in Plex Mono 700 uppercase at 1\u20132\xD7 body only (no big type on a 3270). Body Fira Code 15px with font-variant-ligatures: none. Field labels followed by ". . . :" leaders; protected text in muted, input in ink.'
    },
    {
      id: "azeret-teletype",
      name: "Azeret Mono",
      display: {
        family: "Azeret Mono",
        weights: [700, 800],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Azeret Mono",
        weights: [400, 500],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      cjk: { display: "Noto Sans TC", body: "Noto Sans TC" },
      notes: "Line-printer/teletype voice: one family; headings Azeret 800 uppercase at 2\xD7 body with +0.04em, body 400 at 15px/1.25. ASCII banners built from \u2588 \u2580 \u2584 characters in the display weight. Tabular figures throughout."
    }
  ],
  palettes: [
    {
      id: "p1-green",
      name: "P1 green phosphor",
      colors: {
        paper: "#0a0f0a",
        ink: "#66f28a",
        muted: "#3aa95a",
        accent: "#c8ffd4",
        accent2: "#1f6b34",
        rule: "#1f6b34",
        panel: "#0f1a11"
      },
      usage: "Monochrome phosphor: ink for all text; high-intensity accent for headings, prompts and reverse-video bars (accent background, paper text); muted for comments and timestamps; panel for inactive panes. No second hue."
    },
    {
      id: "p3-amber",
      name: "P3 amber phosphor",
      colors: {
        paper: "#120b02",
        ink: "#ffb84a",
        muted: "#c4842a",
        accent: "#ffe2a8",
        accent2: "#ff7a1a",
        rule: "#5a3a0c",
        panel: "#1e1305"
      },
      usage: "Warm amber monochrome: ink for text, pale accent for headings and the cursor, orange accent2 only for errors; rule-brown box lines; panel for inactive panes."
    },
    {
      id: "greenbar-printout",
      name: "Green-bar printout",
      colors: {
        paper: "#f6f8f1",
        ink: "#1b1d1a",
        muted: "#4f564c",
        accent: "#1f6e3a",
        accent2: "#b5291f",
        rule: "#9fbf9a",
        panel: "#dcebd8"
      },
      usage: "Hardcopy terminal: green-bar paper with alternating 3-line panel stripes behind the text (~50%); ink for all text; accent green for headings and box lines; red ribbon accent2 only for errors and warnings; tractor holes in rule."
    }
  ],
  densities: ["compact", "packed"],
  scales: ["major-second", "minor-third"],
  motion: [
    {
      id: "type-on",
      name: "Type-on",
      description: "The first command block is typed after the prompt one character per tick with the cursor leading; output then prints line by line. Nothing else types.",
      duration: "16ms",
      easing: "steps(1, end)",
      reduced: "Print the complete text instantly; cursor static."
    },
    {
      id: "cursor-blink",
      name: "Cursor blink",
      description: "A block cursor (\u2588, 1ch \xD7 1.25em) after the last prompt blinks 530ms on / 530ms off \u2014 the only moving thing on the screen.",
      duration: "1060ms",
      easing: "steps(2, jump-none)",
      reduced: "Solid cursor, no blink."
    },
    {
      id: "screen-redraw",
      name: "Screen redraw",
      description: "Changing section redraws the screen top to bottom, line by line, like a 9600-baud refresh (24 lines in 240ms).",
      duration: "240ms",
      easing: "steps(24, end)",
      reduced: "Instant redraw."
    }
  ],
  motifs: [
    {
      id: "box-drawing",
      name: "Box drawing",
      description: "Panels and tables drawn with box-drawing characters (\u250C\u2500\u252C\u2500\u2510 \u2502 \u251C\u2500\u253C\u2500\u2524 \u2514\u2500\u2534\u2500\u2518; double \u2554\u2550\u2557 for the primary panel) as text aligned on the ch grid."
    },
    {
      id: "prompt-lines",
      name: "Prompt lines",
      description: 'Sections start as a shell prompt: "$ " in muted followed by a command in ink; output follows unindented.'
    },
    {
      id: "reverse-video",
      name: "Reverse video",
      description: "Headings, the selected menu item and the status bar in reverse video (accent background, paper text) spanning whole ch widths."
    }
  ],
  anchors: [
    {
      id: "boot-screen",
      name: "Boot screen",
      description: "The first screen is a boot/login sequence of 6\u201310 lines built from the facts (dates, places, versions), ending at a prompt with a blinking cursor."
    },
    {
      id: "man-header",
      name: "Man header",
      description: "The man-page head: three-part header line, NAME with the title as a command and its one-line description, then SYNOPSIS."
    },
    {
      id: "ascii-banner",
      name: "ASCII banner",
      description: "The title as a large block-character banner (\u2588 \u2580 \u2584) inside a double-line \u2554\u2550\u2557 frame."
    }
  ],
  surfaces: [
    {
      id: "crt-scanlines",
      name: "CRT scanlines",
      description: "Phosphor screen with horizontal scanlines across everything (a pointer-events: none overlay).",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,.22) 0 1px, transparent 1px 3px);"
    },
    {
      id: "crt-bezel",
      name: "CRT bezel",
      description: "The whole page inside a dark plastic bezel; the screen gets a slight vignette toward the corners.",
      css: "border: 24px solid #2a2824; border-radius: 18px; background: radial-gradient(ellipse at center, var(--paper) 60%, color-mix(in srgb, var(--paper) 85%, black));"
    },
    {
      id: "greenbar-paper",
      name: "Green-bar paper",
      description: "Continuous line-printer paper: 3 lines of panel tint, 3 lines of paper, tractor holes in the margins.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(to bottom, var(--panel) 0 3.75em, transparent 3.75em 7.5em);"
    }
  ],
  must: [
    "All text is monospace on a ch grid; line length \u2264 80ch (132ch for tables).",
    "At least one structure borrowed from terminals: prompt + output, man-page sections, or a PF-key form panel.",
    "Emphasis by reverse video, brightness (accent) or underline \u2014 never size jumps larger than 2\xD7, except one ASCII banner."
  ],
  mustNot: [
    'No neon blur, chromatic aberration or "matrix rain".',
    "No proportional fonts anywhere, including nav and buttons.",
    "No invented system output or hacker jargon \u2014 every line carries a fact.",
    "No rounded buttons; controls are [ bracketed ] or underlined fields."
  ]
};
var web1Homepage = {
  id: "web1-homepage",
  name: { zh: "\u65E9\u671F\u4E2A\u4EBA\u4E3B\u9875", en: "Web 1.0 homepage" },
  family: "screen",
  concept: {
    zh: "1996\u20132001 \u5E74\u7684\u4E2A\u4EBA\u4E3B\u9875\uFF1ATimes New Roman \u9ED8\u8BA4\u5B57\u4F53\u3001\u8868\u683C\u6392\u7248\u3001\u5E73\u94FA\u80CC\u666F\u3001\u84DD\u8272\u5E26\u4E0B\u5212\u7EBF\u7684\u94FE\u63A5\u3001<hr> \u5206\u9694\u7EBF\uFF0C\u9875\u811A\u6709\u8BBF\u5BA2\u8BA1\u6570\u5668\u548C\u7559\u8A00\u672C\u3002\u9EC4\u9ED1\u6761\u7EB9\u7684\u201C\u65BD\u5DE5\u4E2D\u201D\u662F\u8BDA\u5B9E\u7684\u2014\u2014\u8FD9\u4E00\u9875\u662F\u4E00\u4E2A\u4EBA\u4EB2\u624B\u642D\u7684\u3002\u6000\u65E7\uFF0C\u4F46\u5FC5\u987B\u597D\u8BFB\u3002",
    en: 'The 1996\u20132001 personal homepage: Times New Roman by default, tables for layout, tiled backgrounds, blue underlined links, <hr> rules, a hit counter and a guestbook in the footer. The yellow-and-black "under construction" stripe is honest \u2014 one person built this by hand. Affectionate, but legible.'
  },
  references: [
    "GeoCities neighbourhoods (1995\u20132009)",
    "Olia Lialina & Dragan Espenschied \u2014 One Terabyte of Kilobyte Age (2010\u2013)",
    "Netscape Navigator 3/4 default rendering: grey #c0c0c0 page, #0000ee links",
    "Microsoft Core Fonts for the Web (1996): Verdana, Georgia, Trebuchet MS",
    "Space Jam official website (1996)"
  ],
  keywords: ["\u8868\u683C\u6392\u7248", "\u5E73\u94FA\u80CC\u666F", "\u84DD\u8272\u4E0B\u5212\u7EBF\u94FE\u63A5", "\u8BBF\u5BA2\u8BA1\u6570\u5668", "\u7559\u8A00\u672C", "\u65BD\u5DE5\u4E2D"],
  tokens: {
    grid: "HTML-table grid for an 800\xD7600 screen: one 760px table (cellpadding 8, cellspacing 2) with a 160px nav cell and a 600px content cell, or a single 600px column; below 760px it collapses to one column.",
    radius: "0. Controls are rectangular; buttons use a 2px outset bevel.",
    border: 'Table borders 1px solid var(--rule) or the "border=1" look (border: 2px ridge var(--rule)); <hr> as 2px groove, full width or 50%.',
    shadow: "none, except the 2px outset/inset bevel on buttons and 88\xD731 badges (border-style: outset / inset)."
  },
  layouts: [
    {
      id: "nav-table",
      name: "Left-nav table",
      description: "The classic two-cell table: a coloured nav column of text links at left, content at right.",
      grid: "Table 760px; nav cell 160px with panel background; content cell 600px; cellpadding 10; banner row spans both cells.",
      structure: [
        'Banner row across both cells: title in bold serif + "Last updated:" date from the facts',
        "Nav cell: bulleted text links (sections + links from the facts) and a stack of 88\xD731 badges",
        "Content cell: welcome paragraph, <hr>, then sections each with an <h2> and paragraphs",
        "Links section: a plain <ul> of blue underlined links with one-line descriptions",
        'Footer: counter (real number or "since" date), guestbook link, mailto contact'
      ]
    },
    {
      id: "hr-column",
      name: "Single column with <hr>s",
      description: "One 600px column, left-aligned like an unstyled page: a table of contents of anchor links, then sections separated by <hr>s.",
      grid: "Single 600px column, 8px browser-default body margin; <hr> 2px groove full column width between sections.",
      structure: [
        'H1 title flush-left with a one-line "Welcome to\u2026" style sentence from the facts',
        "Under-construction stripe, only above genuinely unfinished sections",
        "Contents: an ordered list of #anchor links",
        'Sections separated by <hr>, each ending with "[Back to top]"',
        "Footer table: related links in webring form ([Prev] [List] [Next]) if the facts give links, then counter and email"
      ]
    },
    {
      id: "faux-frameset",
      name: "Frameset",
      description: "A faux <frameset>: a top banner frame, a left nav frame and a main frame that scrolls on its own, divided by bevelled frame borders.",
      grid: 'CSS grid mimicking rows="80,*" cols="180,*": top 80px, left 180px, main scrolls independently; 6px bevelled frame borders.',
      structure: [
        "Top frame: banner with the title and one static tagline",
        'Left frame: nav links + "Frames | No frames" toggle',
        "Main frame: content with <h2> sections and <blockquote> notes",
        "Main-frame footer: last-updated date, counter, guestbook link"
      ]
    }
  ],
  type: [
    {
      id: "times-default",
      name: "Times New Roman + Courier New",
      display: {
        family: "Times New Roman",
        weights: [400, 700],
        italic: true,
        fallback: 'Times, "Liberation Serif", serif',
        source: "system"
      },
      body: {
        family: "Times New Roman",
        weights: [400, 700],
        italic: true,
        fallback: 'Times, "Liberation Serif", serif',
        source: "system"
      },
      mono: {
        family: "Courier New",
        weights: [400, 700],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: "system"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Serif SC" },
      notes: "Unstyled-browser voice, kept legible: body 18px/1.45 (not the 1996 12pt), h1 36px bold, h2 26px bold, no letter-spacing. Links underlined in accent, visited in muted. Counters, code and email in Courier New."
    },
    {
      id: "georgia-verdana",
      name: "Georgia + Verdana",
      display: {
        family: "Georgia",
        weights: [400, 700],
        italic: true,
        fallback: '"Times New Roman", Times, serif',
        source: "system"
      },
      body: {
        family: "Verdana",
        weights: [400, 700],
        fallback: 'Tahoma, "DejaVu Sans", sans-serif',
        source: "system"
      },
      mono: {
        family: "Courier New",
        weights: [400],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: "system"
      },
      cjk: { display: "Noto Serif SC", body: "Noto Sans SC" },
      notes: 'The "designed" late-90s page: Verdana 15px/1.6 (wide x-height, so smaller than serif); Georgia 700 headings 26\u201334px with its old-style figures; "Last updated" in Verdana 11px uppercase +0.05em.'
    },
    {
      id: "impact-arial",
      name: "Impact + Arial",
      display: {
        family: "Impact",
        weights: [400],
        fallback: '"Arial Black", "Arial Narrow", sans-serif',
        source: "system"
      },
      body: {
        family: "Arial",
        weights: [400, 700],
        fallback: 'Helvetica, "Liberation Sans", sans-serif',
        source: "system"
      },
      mono: {
        family: "Courier New",
        weights: [400],
        fallback: 'Courier, "Liberation Mono", monospace',
        source: "system"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: 'Fan-page voice: Impact only for the banner title and section banners, 36\u201364px, tracking 0.02em; Arial 16px/1.55 for text; "NEW!" markers in Arial 700 11px uppercase in accent2 beside updated items. Max two text colours per paragraph.'
    }
  ],
  palettes: [
    {
      id: "netscape-grey",
      name: "Netscape grey",
      colors: {
        paper: "#c0c0c0",
        ink: "#000000",
        muted: "#3c3c3c",
        accent: "#0000ee",
        accent2: "#cc0000",
        rule: "#808080",
        panel: "#ffffff"
      },
      usage: "Browser-default grey page; reading text in white table cells (panel, ~60%); links #0000ee underlined, visited links muted; red only for NEW! markers; grooves in rule grey."
    },
    {
      id: "starfield-black",
      name: "Black-background fan page",
      colors: {
        paper: "#000000",
        ink: "#ffffcc",
        muted: "#c9c9a3",
        accent: "#66ccff",
        accent2: "#ff9933",
        rule: "#808080",
        panel: "#1a1a1a"
      },
      usage: "Black page with pale-yellow text; light-blue underlined links; orange for NEW! and the counter digits; grey grooves; dark panel cells for the nav."
    },
    {
      id: "parchment-tile",
      name: "Parchment tile",
      colors: {
        paper: "#f3ead2",
        ink: "#2b1d0e",
        muted: "#5e4a30",
        accent: "#0033cc",
        accent2: "#990000",
        rule: "#a08a5c",
        panel: "#fffdf3"
      },
      usage: "Tiled parchment background; content in near-white panel cells; deep-blue underlined links; maroon for headings and <hr> accents; brown-gold rules."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fourth", "major-third"],
  motion: [
    {
      id: "blink-new",
      name: "Blink NEW!",
      description: 'A "NEW!" marker blinks (visibility toggle) three times on load, then stays \u2014 homage to <blink> without a loop.',
      duration: "500ms",
      easing: "steps(1, end)",
      reduced: "Static NEW! marker."
    },
    {
      id: "bevel-press",
      name: "Bevel press",
      description: "Buttons and 88\xD731 badges press in on :active \u2014 border-style outset \u2192 inset and the label shifts 1px right and down.",
      duration: "0ms",
      easing: "steps(1, end)",
      reduced: "Same; it is a 1px state change."
    },
    {
      id: "news-ticker",
      name: "News ticker",
      description: "One optional scrolling line (CSS, not <marquee>) carrying the latest update from the facts, at about 40px/s, pausing on hover.",
      duration: "12000ms",
      easing: "linear",
      reduced: "Ticker is static text on one line."
    }
  ],
  motifs: [
    {
      id: "under-construction",
      name: "Under construction",
      description: 'A yellow/black 45\xB0 hazard stripe bar (repeating-linear-gradient, 12px stripes) with "UNDER CONSTRUCTION / \u65BD\u5DE5\u4E2D" in bold \u2014 only on genuinely unfinished sections.'
    },
    {
      id: "hit-counter",
      name: "Hit counter",
      description: 'Odometer counter: digits in individual black boxes with Courier New digits \u2014 a real number from the facts, or "since <date>".'
    },
    {
      id: "badges-88x31",
      name: "88\xD731 badges",
      description: "88\xD731px buttons drawn in CSS (2px outset border, two lines of 9px text, two-tone fill) for email, guestbook and links \u2014 never images of real brands."
    }
  ],
  anchors: [
    {
      id: "welcome-banner",
      name: "Welcome banner",
      description: 'A banner cell with the title in big bold serif, a "Welcome to\u2026" line, the last-updated date and a NEW! marker by the latest item.'
    },
    {
      id: "nav-as-hero",
      name: "Nav as hero",
      description: "Nav table and content cell visible at once, with 6\u201310 blue underlined links \u2014 the link list itself is the first impression."
    },
    {
      id: "guestbook-counter",
      name: "Guestbook and counter",
      description: 'A bordered table at the top with the visitor counter (real number or since-date), a "Sign my guestbook" link and a mailto link.'
    }
  ],
  surfaces: [
    {
      id: "tiled-background",
      name: "Tiled background",
      description: "A small tiled background drawn in CSS (two close tints in a checker); content always sits in solid table cells above it.",
      css: "background-color: var(--paper); background-image: linear-gradient(45deg, rgba(0,0,0,.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.05) 75%), linear-gradient(45deg, rgba(0,0,0,.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.05) 75%); background-size: 40px 40px; background-position: 0 0, 20px 20px;"
    },
    {
      id: "bevel-chrome",
      name: "Bevel chrome",
      description: "Windows 95 / Netscape chrome: grey panels with a 2px light-top-left, dark-bottom-right bevel.",
      css: "background: var(--panel); border: 2px solid; border-color: #ffffff #808080 #808080 #ffffff;"
    },
    {
      id: "flat-default",
      name: "Flat default",
      description: "Unstyled browser default: flat paper colour, 8px body margin, nothing else.",
      css: "margin: 8px; background: var(--paper);"
    }
  ],
  must: [
    "Links are underlined and coloured; visited links visibly different.",
    "Layout reads as table cells (visible borders or cell backgrounds), max 760px wide.",
    "Footer has a last-updated date and a mailto contact from the facts; a counter only with a real number or a since-date.",
    "Body text \u2265 15px with \u2265 7:1 contrast \u2014 nostalgia never costs legibility."
  ],
  mustNot: [
    "No animated-GIF clutter, auto-playing audio, or more than one moving element per screen.",
    "No modern patterns: cards with shadows, hamburger menus, sticky blurred headers.",
    "No Comic Sans, rainbow text or ironic parody."
  ]
};
var gameManual = {
  id: "game-manual",
  name: { zh: "\u6E38\u620F\u8BF4\u660E\u4E66", en: "Game manual" },
  family: "screen",
  concept: {
    zh: "8 \u4F4D\u4E0E 16 \u4F4D\u6E38\u620F\u7684\u8BF4\u660E\u4E66\u548C\u50CF\u7D20\u754C\u9762\uFF1A\u53CC\u7EBF\u8FB9\u6846\u7684\u5BF9\u8BDD\u6846\u3001HP/MP \u6761\u3001\u624B\u67C4\u6309\u952E\u793A\u610F\u56FE\u3001\u9053\u5177\u6E05\u5355\uFF0C\u4EE5\u53CA\u6709\u9650\u7684\u8C03\u8272\u677F\u2014\u2014Game Boy \u7684\u56DB\u9636\u7EFF\u3001FC \u7684 54 \u8272\u3002\u9650\u5236\u8BA9\u6BCF\u4E00\u4E2A\u50CF\u7D20\u90FD\u6709\u610F\u4E49\u3002",
    en: "Manuals and pixel UIs of 8- and 16-bit games: double-bordered dialogue boxes, HP/MP bars, controller diagrams, item lists and limited palettes \u2014 the Game Boy's four greens, the NES's 54 colours. Constraint makes every pixel mean something."
  },
  references: [
    "Nintendo Entertainment System instruction booklets (1985\u201394)",
    "Dragon Quest / Dragon Warrior (Enix, 1986) command windows",
    "Nintendo Game Boy DMG-01 (1989) screen and manuals",
    "Final Fantasy VI (Square, 1994) menu screens",
    "Nintendo Power magazine maps and strategy pages (1988\u2013)"
  ],
  keywords: ["\u50CF\u7D20\u5B57", "\u53CC\u7EBF\u8FB9\u6846", "HP/MP \u6761", "\u624B\u67C4\u793A\u610F\u56FE", "\u9053\u5177\u6E05\u5355", "\u9650\u5236\u8C03\u8272\u677F"],
  tokens: {
    grid: "Tile grid: 8px tiles scaled \xD73 (24px) on desktop, \xD72 (16px) on mobile; every size, gap and border is a multiple of the scaled pixel; a screen is 32 \xD7 28 tiles (NES 256 \xD7 224).",
    radius: "0 \u2014 window corners are notched by one scaled pixel with clip-path polygon, never CSS-rounded.",
    border: "Windows: double border \u2014 3px line, 3px gap, 3px line (border: 9px double var(--ink); on dark windows border-color: var(--paper)); image-rendering: pixelated on every bitmap.",
    shadow: "Hard one-tile drop (8px 8px 0 var(--rule)) on screenshot boxes only; no blur anywhere."
  },
  layouts: [
    {
      id: "manual-booklet",
      name: "Instruction booklet",
      description: "Portrait booklet pages side by side: contents, a controls page with a controller diagram, an items page and boxed fine print.",
      grid: "Booklet pages at 5:7, max 640px each, two side by side on desktop; 6 col, 16px gutter; page numbers in boxes at the outer bottom corners.",
      structure: [
        "Cover page: title in the pixel face, a drawn pixel emblem panel (no photos)",
        "Contents page: numbered sections with dot leaders to page numbers",
        "Controls page: controller diagram with callout lines, each button = one fact",
        "Items page: list with drawn 16\xD716 icons and one-line descriptions",
        "Back page: boxed fine print \u2014 address, contact"
      ]
    },
    {
      id: "command-window",
      name: "RPG command window",
      description: "The page is a game screen: status window top-left, command menu with a \u25B6 cursor, dialogue box along the bottom.",
      grid: "32-tile screen; status window 10 tiles wide, command window 8 tiles, dialogue box full width \xD7 6 tiles; windows may overlap by one tile.",
      structure: [
        "Status window: name and key numbers as bars (real values only)",
        "Command menu (TALK / ITEM / MAP style) mapped to page sections, \u25B6 on the current one",
        "Dialogue box: text typed out, \u25BC to continue",
        'Item window: list with quantities right-aligned ("\xD73")',
        "Closing screen: CONTINUE / SAVE options holding contact information"
      ]
    },
    {
      id: "strategy-guide",
      name: "Strategy-guide spread",
      description: "A Nintendo Power-style spread: a world map drawn as tiles with numbered callouts and a sidebar of matching tip boxes.",
      grid: "12-col spread; map panel 8 col \xD7 6 rows of 48px tiles; sidebar 4 col with numbered tip boxes; callouts as 32px squares.",
      structure: [
        'Title band with a stage number ("WORLD 1-1" pattern used for section numbering)',
        "Tile map with numbered callouts over it",
        "Numbered tip boxes matching the callouts",
        "Stats table for the facts that have real numbers",
        'A "secret" note at the bottom in a dashed box'
      ]
    }
  ],
  type: [
    {
      id: "press-start-chakra",
      name: "Press Start 2P + Chakra Petch",
      display: {
        family: "Press Start 2P",
        weights: [400],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: { family: "Chakra Petch", weights: [400, 600], fallback: "Arial, sans-serif", source: "google" },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: "Press Start 2P only at multiples of 8px (16/24/32/48), uppercase, line-height 1.5, never for paragraphs; -webkit-font-smoothing: none. Chakra Petch for booklet text 16\u201317px/1.5, 600 for button names (A, B, START, SELECT)."
    },
    {
      id: "silkscreen-dotgothic",
      name: "Silkscreen + DotGothic16",
      display: {
        family: "Silkscreen",
        weights: [400, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: { family: "DotGothic16", weights: [400], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "ZCOOL KuaiLe", body: "Noto Sans SC" },
      notes: "Handheld-screen voice: Silkscreen uppercase at 16/24/32px for labels and menus; DotGothic16 at its native 16px (or 32px) for dialogue, line-height 1.5, \u2264 28 characters per line inside dialogue boxes. All text in palette colours only."
    },
    {
      id: "pixelify-bitter",
      name: "Pixelify Sans + Bitter",
      display: {
        family: "Pixelify Sans",
        weights: [500, 700],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Bitter",
        weights: [400, 600],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Serif SC" },
      notes: '16-bit RPG manual voice: Pixelify Sans for window titles, menus and numbers at multiples of 8px; Bitter 17px/1.6 for story and lore paragraphs, italic for quoted dialogue. Menu numbers right-aligned tabular ("\xD712").'
    }
  ],
  palettes: [
    {
      id: "dmg-greens",
      name: "Handheld four greens",
      colors: {
        paper: "#c5d58a",
        ink: "#0f2e12",
        muted: "#2f5a2a",
        accent: "#306230",
        accent2: "#8bac0f",
        rule: "#0f2e12",
        panel: "#9bbc0f"
      },
      usage: "Four-shade LCD: pale green ground, darkest green for text and window borders, mid greens for window fills (panel) and bars (accent2); no colour outside these greens."
    },
    {
      id: "nes-booklet",
      name: "NES booklet",
      colors: {
        paper: "#fcfcfc",
        ink: "#0f0f0f",
        muted: "#4c4c4c",
        accent: "#d82800",
        accent2: "#0058f8",
        rule: "#0f0f0f",
        panel: "#bcbcbc"
      },
      usage: "White booklet pages, black text; red title bars and A/B button labels; NES blue for the \u25B6 cursor and selected items; console-grey panels for controller diagrams; dialogue windows filled ink with paper text."
    },
    {
      id: "title-screen-black",
      name: "Title-screen black",
      colors: {
        paper: "#111010",
        ink: "#fcfcfc",
        muted: "#a4a4a4",
        accent: "#fca044",
        accent2: "#3cbcfc",
        rule: "#7c7c7c",
        panel: "#000000"
      },
      usage: "Black title screen; white text; orange for the title and selected menu item; sky blue for bars and the \u25BC prompt; windows pure black with a white double border."
    }
  ],
  densities: ["compact", "regular"],
  scales: ["perfect-fifth", "perfect-fourth"],
  motion: [
    {
      id: "dialogue-type",
      name: "Dialogue typing",
      description: "Dialogue text prints character by character at ~30 chars/s; \u25BC blinks when the box is full; click or Enter completes the box.",
      duration: "33ms",
      easing: "steps(1, end)",
      reduced: "Full text appears at once; \u25BC static."
    },
    {
      id: "menu-cursor",
      name: "Menu cursor",
      description: "The \u25B6 cursor jumps between menu items in whole-tile steps with no tweening, and the selected row flashes for two frames.",
      duration: "33ms",
      easing: "steps(1, end)",
      reduced: "Cursor jumps without the flash."
    },
    {
      id: "bar-fill",
      name: "Bar fill",
      description: "Stat bars showing real values fill tile by tile on load, one step per 8px segment.",
      duration: "600ms",
      easing: "steps(12, end)",
      reduced: "Bars drawn at their final value."
    }
  ],
  motifs: [
    {
      id: "double-border-window",
      name: "Double-border window",
      description: "Dialogue and command windows: solid fill, double border (3px line, 3px gap, 3px line), notched corners, \u25B6 cursor and \u25BC prompt drawn as pixel triangles."
    },
    {
      id: "stat-bars",
      name: "Stat bars",
      description: 'Segmented bars: label left (HP-style), an 8px-high bar of 8px segments, value right ("42/60") \u2014 only for real numbers in the facts.'
    },
    {
      id: "controller-diagram",
      name: "Controller diagram",
      description: "A line drawing of a D-pad, A/B and SELECT/START with leader lines to labels, used to map 4\u20136 key facts."
    }
  ],
  anchors: [
    {
      id: "title-screen",
      name: "Title screen",
      description: 'A title screen: pixel title at 48\u201364px, a drawn pixel emblem, "PRESS START" and a \u25B6 menu (START / CONTINUE / OPTIONS) that maps to sections.'
    },
    {
      id: "dialogue-open",
      name: "Dialogue opening",
      description: "A full-width dialogue box in the lower third with a name tag, typing the first fact, under a small pixel scene drawn in CSS/SVG."
    },
    {
      id: "booklet-cover",
      name: "Booklet cover",
      description: 'A booklet cover: title, a drawn badge strip (no real logos), "INSTRUCTION BOOKLET" label, and the numbered contents list beside it.'
    }
  ],
  surfaces: [
    {
      id: "lcd-pixel-grid",
      name: "LCD pixel grid",
      description: "Handheld LCD: a faint pixel grid over the screen area.",
      css: "background-color: var(--paper); background-image: linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px); background-size: 3px 3px;"
    },
    {
      id: "booklet-matte",
      name: "Booklet matte",
      description: "Matte booklet paper, flat white, with two staple marks drawn at the spine.",
      css: "background: var(--paper);"
    },
    {
      id: "ordered-dither",
      name: "Ordered dither",
      description: 'A 2\xD72 checker dither between two palette colours \u2014 the only permitted "gradient".',
      css: "background-image: conic-gradient(var(--accent) 25%, var(--panel) 0 50%, var(--accent) 0 75%, var(--panel) 0); background-size: 4px 4px; image-rendering: pixelated;"
    }
  ],
  must: [
    "All sizes, gaps and borders are multiples of the scaled pixel/tile.",
    "No more than four colours in any one screen area.",
    "At least one double-border window with a \u25B6 cursor or \u25BC prompt.",
    "Pixel fonts only at native multiples; long text uses the body face."
  ],
  mustNot: [
    "No anti-aliased or fractionally scaled pixel art; image-rendering: pixelated.",
    "No real console logos, trademarked characters or sprites from actual games.",
    "No gradients except a two-colour ordered dither.",
    "Stat bars never show invented numbers."
  ]
};
var instrumentPanel = {
  id: "instrument-panel",
  name: { zh: "\u5DE5\u4E1A\u4EEA\u8868", en: "Instrument panel" },
  family: "screen",
  concept: {
    zh: "Dieter Rams \u65F6\u4EE3\u7684\u535A\u6717\u7535\u5668\u4E0E Teenage Engineering \u7684\u5408\u6210\u5668\uFF1A\u7C73\u767D\u5916\u58F3\uFF0C\u65CB\u94AE\u4E0E\u5F00\u5173\u6392\u6210\u4E25\u683C\u7684\u884C\u5217\uFF0C\u6BCF\u4E2A\u63A7\u4EF6\u4E0B\u9762\u4E00\u884C\u5C0F\u5B57\u6807\u7B7E\uFF0C\u4E00\u4E2A\u6A59\u8272\u6216\u7EFF\u8272\u7684\u72B6\u6001\u706F\u3002\u754C\u9762\u5C31\u662F\u9762\u677F\u2014\u2014\u529F\u80FD\u51B3\u5B9A\u4F4D\u7F6E\uFF0C\u6807\u7B7E\u8BF4\u660E\u4E00\u5207\u3002",
    en: "Braun appliances of the Dieter Rams era and Teenage Engineering synthesizers: off-white housings, knobs and switches in strict rows, a small label under every control, one orange or green status light. The interface is the panel \u2014 function decides position, the label explains everything."
  },
  references: [
    "Dieter Rams & Dietrich Lubs \u2014 Braun ET 66 calculator (1987)",
    "Braun T3 pocket radio (1958) and SK 4 radio-phonograph (1956)",
    "Teenage Engineering OP-1 (2011) and Pocket Operators",
    "Hewlett-Packard test-equipment front panels (1960s\u201370s)",
    "Braun Atelier and regie hi-fi components (1970s\u201380s)"
  ],
  keywords: ["\u65CB\u94AE", "\u72B6\u6001\u706F", "\u6570\u7801\u7BA1", "\u7C73\u767D\u5916\u58F3", "\u63A7\u4EF6\u6807\u7B7E", "\u5F00\u5173\u77E9\u9635"],
  tokens: {
    grid: "Panel grid: 8px base; controls on a 48px pitch (knob centres 48 or 96px apart); housings with 24px inner margin; labels 8px below each control and centred on it; a row of controls shares one baseline.",
    radius: "Housing panels 10px (moulded plastic); keys 4px; knobs and LEDs 50%; recessed display windows 2px. Nothing else rounded.",
    border: "1px solid var(--rule) panel seams; display windows 2px inset border in var(--rule); keys outlined 1px var(--ink) when unfilled.",
    shadow: "Short and physical only: knobs 0 1px 0 rgba(0,0,0,.25), 0 2px 3px rgba(0,0,0,.12); display windows inset 0 1px 2px rgba(0,0,0,.35). Never large soft card shadows."
  },
  layouts: [
    {
      id: "front-panel",
      name: "Front panel",
      description: "The page is one wide device front: display window top-left, a knob row, a switch matrix, sections separated by seams and engraved labels.",
      grid: "12 col inside a 24px housing margin; display window 5 col \xD7 2 rows; control rows on a 96px pitch; sections split by 1px seams with 9\u201310px engraved labels.",
      structure: [
        "Display window: the title as the readout, small mode labels around it",
        "Knob row: 4\u20136 knobs each labelled with a section; the current one points to it",
        "Switch matrix: 2\xD74 or 4\xD74 square keys with labels, used as navigation",
        "Spec plate: model-plate block with technical facts in small type",
        "Bottom seam strip: power LED, and contact/address set as port labels"
      ]
    },
    {
      id: "operating-manual",
      name: "Operating manual",
      description: "A Braun manual page: a line drawing of the device face with numbered callouts, then numbered paragraphs explaining each control.",
      grid: "Two columns: drawing 7 col (sticky on desktop), numbered list 5 col; callout numbers in 20px circles; text on a 4px baseline.",
      structure: [
        'Manual header: model name and "Gebrauchsanweisung / Operating instructions / \u4F7F\u7528\u8BF4\u660E"',
        "Line drawing of the panel with numbered callouts \u2460 \u2013 \u2467",
        "Numbered paragraphs, one per callout, each carrying a fact",
        "Technical data: label/value rows with units",
        "Service and contact block in small type"
      ]
    },
    {
      id: "module-rack",
      name: "Module rack",
      description: "A modular rack: modules of different widths side by side, each a section with its own controls, between screw rails.",
      grid: "Rack rows 380px tall; module widths 80/120/160/240px; 12px rails top and bottom with screw holes every 40px.",
      structure: [
        "Top rail with screw holes and a model plate carrying the title",
        "Row 1: modules of varied widths, one per section, each with a header label and 2\u20135 controls",
        "Patch cables (SVG curves) only between modules whose facts relate",
        "Row 2: readout module (numbers, times) and I/O module (contact links as jacks)",
        "Bottom rail with imprint text"
      ]
    }
  ],
  type: [
    {
      id: "red-hat-braun",
      name: "Red Hat Display + Red Hat Text",
      display: {
        family: "Red Hat Display",
        weights: [500, 700],
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      body: {
        family: "Red Hat Text",
        weights: [400, 500],
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Braun labelling: control labels lowercase or sentence case, never all caps, Red Hat Text 500 at 11\u201312px, +0.02em. Model names Red Hat Display 700, -0.02em. All numbers lining tabular."
    },
    {
      id: "martian-te",
      name: "Martian Mono + Schibsted Grotesk",
      display: {
        family: "Martian Mono",
        weights: [300, 400, 600],
        fallback: '"Courier New", monospace',
        source: "google"
      },
      body: {
        family: "Schibsted Grotesk",
        weights: [400, 500],
        fallback: "Helvetica, Arial, sans-serif",
        source: "google"
      },
      cjk: { display: "Noto Sans SC", body: "Noto Sans SC" },
      notes: "Synth-panel voice: control labels Martian Mono uppercase 10\u201312px +0.06em, values in 600; readout numbers Martian Mono 300 at 64\u201396px. Body Schibsted Grotesk 15px/1.5."
    },
    {
      id: "rajdhani-control",
      name: "Rajdhani + IBM Plex Sans Condensed + Azeret Mono",
      display: {
        family: "Rajdhani",
        weights: [500, 600, 700],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      body: {
        family: "IBM Plex Sans Condensed",
        weights: [400, 500],
        fallback: '"Arial Narrow", sans-serif',
        source: "google"
      },
      mono: { family: "Azeret Mono", weights: [500], fallback: '"Courier New", monospace', source: "google" },
      cjk: { display: "ZCOOL QingKe HuangYou", body: "Noto Sans SC" },
      notes: 'Test-equipment voice: Rajdhani 600 uppercase +0.08em for engraved section labels; segment-style readouts in Azeret Mono 500 tabular with a dim "8888" ghost behind the lit digits; Plex Sans Condensed 14\u201315px for manual text.'
    }
  ],
  palettes: [
    {
      id: "braun-off-white",
      name: "Braun off-white",
      colors: {
        paper: "#ecebe6",
        ink: "#1f1f1d",
        muted: "#5a5955",
        accent: "#e35205",
        accent2: "#6f9a3a",
        rule: "#c9c7bf",
        panel: "#d9d7d0"
      },
      usage: "Off-white housing (~80%); panel grey for recesses and display surrounds; ink for knobs and labels; one orange control (power, record or the primary key) per area; green only for the confirm key or a running LED."
    },
    {
      id: "anodised-black",
      name: "Anodised black",
      colors: {
        paper: "#1c1d1e",
        ink: "#eceae4",
        muted: "#a3a19b",
        accent: "#57e08a",
        accent2: "#ffb21a",
        rule: "#3a3b3c",
        panel: "#121314"
      },
      usage: "Black anodised faceplate; engraved labels in ink; LED green for active indicators and segment digits (\u2264 5%); amber only for peak/warning; displays recessed in panel black with ghost segments in rule."
    },
    {
      id: "lab-putty",
      name: "Lab putty grey",
      colors: {
        paper: "#cfd4cf",
        ink: "#141716",
        muted: "#414744",
        accent: "#1d5f99",
        accent2: "#d6402c",
        rule: "#9ba29d",
        panel: "#b9c0bb"
      },
      usage: "Cool putty-grey test-equipment case; darker panel for control fields; ink labels; blue for function keys; red only for the power switch."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["perfect-fifth", "major-third"],
  motion: [
    {
      id: "knob-detent",
      name: "Knob detent",
      description: "When a section is selected its knob rotates in 30\xB0 detent steps to point at it, with a tiny overshoot at the last step.",
      duration: "120ms",
      easing: "cubic-bezier(.3, 1.6, .6, 1)",
      reduced: "The pointer jumps to its position without rotation."
    },
    {
      id: "segment-count",
      name: "Segment count",
      description: "Segment readouts step to their value in 6 discrete updates while ghost segments stay visible; status LEDs switch on with no fade.",
      duration: "360ms",
      easing: "steps(6, end)",
      reduced: "Final digits shown immediately."
    },
    {
      id: "key-travel",
      name: "Key travel",
      description: "Keys travel 2px down on press (translateY(2px), shadow removed) and spring back; toggles snap with no tween.",
      duration: "80ms",
      easing: "cubic-bezier(.2, 0, 0, 1)",
      reduced: "Colour change only."
    }
  ],
  motifs: [
    {
      id: "labelled-knob",
      name: "Labelled knob",
      description: "A 40\u201364px SVG knob with one pointer line, a tick arc (11 ticks over 270\xB0) and its label centred below."
    },
    {
      id: "segment-display",
      name: "Segment display",
      description: 'A recessed seven-segment / LCD window with lit digits over dim ghost "8"s at 12% opacity.'
    },
    {
      id: "switch-grid",
      name: "Switch grid",
      description: "Square keys on a 48px pitch with labels printed above or on them; exactly one key in the accent colour."
    }
  ],
  anchors: [
    {
      id: "readout-hero",
      name: "Readout",
      description: "A large recessed display window shows the title or a key number as a segment/LCD readout, with mode labels and two status LEDs."
    },
    {
      id: "control-row",
      name: "Control row",
      description: "A full-width row of 5\u20136 labelled knobs or sliders acting as navigation, under a model plate carrying the title."
    },
    {
      id: "device-elevation",
      name: "Device elevation",
      description: "A precise line drawing of the device face (front elevation) with numbered callouts; the title sits on its model plate."
    }
  ],
  surfaces: [
    {
      id: "moulded-plastic",
      name: "Moulded plastic",
      description: "Matte ABS housing: flat colour with a 1px highlight on the top edge of each panel.",
      css: "background: var(--paper); border-top: 1px solid rgba(255,255,255,.6); border-radius: 10px;"
    },
    {
      id: "brushed-aluminium",
      name: "Brushed aluminium",
      description: "A brushed-aluminium faceplate made of fine horizontal hairlines.",
      css: "background-color: var(--panel); background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,.04) 0 1px, transparent 1px 7px);"
    },
    {
      id: "speaker-grille",
      name: "Speaker grille",
      description: "A perforated grille field (T3 / SK 4) as a regular hole grid.",
      css: "background-color: var(--panel); background-image: radial-gradient(circle, var(--ink) 1.6px, transparent 2px); background-size: 9px 9px;"
    }
  ],
  must: [
    "Every interactive element is drawn as a physical control (knob, key, toggle, slider) with a label directly above or below it.",
    "Controls sit on a fixed 48px pitch and labels share baselines across a row.",
    "At most one accent-coloured control per panel area; status colours mean on / active / warning."
  ],
  mustNot: [
    "No glossy gradients, chrome reflections or 3D-rendered product photos.",
    "No fake readout numbers \u2014 readouts show facts (times, counts, prices) or the title.",
    "No large soft shadows; depth is 1\u20133px at most."
  ]
};
var chineseAlmanac = {
  id: "chinese-almanac",
  name: { zh: "\u8001\u9EC4\u5386", en: "Chinese almanac" },
  family: "craft",
  concept: {
    zh: "\u8001\u901A\u4E66\u4E0E\u6495\u9875\u9EC4\u5386\uFF1A\u7C73\u9EC4\u7EB8\u4E0A\u7EA2\u9ED1\u4E24\u8272\u5957\u5370\uFF0C\u7AD6\u6392\u6587\u5B57\u4ECE\u53F3\u5F80\u5DE6\u8BFB\uFF0C\u5E72\u652F\u7EAA\u65E5\u7684\u65B9\u6846\u3001\u5B9C\u4E0E\u5FCC\u5BF9\u5F00\u7684\u683C\u5B50\u3001\u89D2\u4E0A\u4E00\u65B9\u6731\u5370\uFF1B\u6708\u4EFD\u724C\u5219\u628A\u8282\u6C14\u4E0E\u65E5\u671F\u6846\u8FDB\u6728\u523B\u82B1\u8FB9\u3002\u6BCF\u4E00\u9879\u90FD\u6709\u56FA\u5B9A\u7684\u4F4D\u7F6E\uFF0C\u8BFB\u8005\u51ED\u4F4D\u7F6E\u5C31\u77E5\u9053\u53BB\u54EA\u91CC\u627E\u3002",
    en: "The traditional tongshu almanac and the tear-off huangli: red and black ink on rice paper, vertical text read right to left, boxes for the ganzhi day, paired grids of \u5B9C (do) and \u5FCC (avoid), a cinnabar seal in the corner; the yuefenpai calendar poster frames dates and solar terms in woodblock borders. Every item has a fixed place, so readers find things by position alone."
  },
  references: [
    "\u901A\u4E66 / \u901A\u52DD almanacs, Qing woodblock editions and Hong Kong \u8521\u771F\u6B65\u5802 editions",
    "\u300A\u6642\u61B2\u66F8\u300B Qing imperial calendar, woodblock printed",
    "\u6495\u9875\u65E5\u5386 tear-off daily calendars, mainland China 1960s\u201390s",
    "\u6708\u4EFD\u724C Shanghai calendar posters \u2014 \u90D1\u66FC\u9640, \u676D\u7A49\u82F1 (1910s\u201330s)",
    "\u300A\u82A5\u5B50\u56ED\u753B\u4F20\u300B woodblock page frames and fish-tail \u7248\u5FC3"
  ],
  keywords: ["\u5B9C\u5FCC", "\u5E72\u652F", "\u7AD6\u6392", "\u6731\u5370", "\u7EA2\u9ED1\u5957\u5370", "\u6728\u523B\u8FB9\u6846"],
  tokens: {
    grid: "Woodblock page grid: a framed block (\u7248\u6846) divided into vertical columns (\u884C) of 1em + 0.5em with 1px dividers (\u754C\u680F), read right to left with writing-mode: vertical-rl; horizontal Latin blocks outside the frame on a 12-col, 16px-gutter grid.",
    radius: "0. Seals are squares or circles; nothing else is round.",
    border: "Frame: 4px solid var(--ink) outer + 1px inner line 5px inside (outline: 1px solid var(--ink); outline-offset: -9px); column dividers 1px solid var(--rule); \u5B9C/\u5FCC boxes 2px solid var(--accent).",
    shadow: "none. Ink only; seal edges may be roughened with an SVG filter, never shadowed."
  },
  layouts: [
    {
      id: "tear-off-day",
      name: "Tear-off day sheet",
      description: "The page is one daily sheet: a giant date numeral, lunar/ganzhi columns at its sides, \u5B9C/\u5FCC boxes at the foot; further sections are the following sheets.",
      grid: "Sheet 3:4 portrait, max 720px; header band 15%; numeral zone 55% flanked by two 18%-wide vertical columns; \u5B9C | \u5FCC halves in the bottom 25%.",
      structure: [
        "Header band: Gregorian year and month, weekday; red for Sundays and holidays",
        "Giant date numeral (a key date or number from the facts) between vertical columns: \u519C\u5386 date, \u5E72\u652F, solar term",
        "\u5B9C / \u5FCC boxes: \u5B9C lists what to do (offers, actions from the facts), \u5FCC lists constraints",
        "Bottom strip: one short line from the facts, and a perforation line",
        "Following sheets stacked below, one per section, each with its own date box"
      ]
    },
    {
      id: "tongshu-page",
      name: "Almanac page",
      description: "An open tongshu leaf: two half-leaves of vertical columns read right to left around a central \u7248\u5FC3 strip with a fish-tail ornament.",
      grid: "Two half-leaves of 8\u201310 vertical columns (writing-mode: vertical-rl) with 1px dividers; 48px \u7248\u5FC3 strip in the centre; double frame around everything.",
      structure: [
        "Rightmost column: book title and section name in large type",
        "Columns 2\u20138: one fact per column, a \u5E72\u652F-style date box at the top, text below",
        "\u7248\u5FC3 strip: running title, fish-tail ornament, page number in Chinese numerals",
        "Left half-leaf: tables (\u5B9C/\u5FCC or a \u65F6\u8FB0 hours grid) mapped to the facts",
        "Seal impression at the end with the issuer\u2019s name"
      ]
    },
    {
      id: "yuefenpai-poster",
      name: "Calendar poster",
      description: "A \u6708\u4EFD\u724C poster: ornamental frame, a central framed panel for the main message, couplet columns at the sides and a month grid along the bottom.",
      grid: "Poster 2:3; 48px ornamental border; central panel 70% of the height; bottom band a 6 \xD7 2 grid of month/section blocks; side borders carry vertical couplets.",
      structure: [
        "Top cartouche: the issuer\u2019s name in large display",
        "Central framed panel: title and main message \u2014 typographic or drawn ornament, no photos",
        "Side couplet columns carrying two key facts vertically",
        "Bottom 6 \xD7 2 calendar grid: each block a date or a section",
        "Imprint line: address and contact in small horizontal type"
      ]
    }
  ],
  type: [
    {
      id: "woodblock-song",
      name: "Noto Serif TC + Cormorant",
      display: {
        family: "Cormorant",
        weights: [500, 700],
        fallback: 'Garamond, "Times New Roman", serif',
        source: "google"
      },
      body: {
        family: "EB Garamond",
        weights: [400, 500],
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      cjk: { display: "Noto Serif TC", body: "Noto Serif TC" },
      notes: "Chinese leads: Noto Serif TC 900 for \u5B9C/\u5FCC and giant dates (woodblock \u5B8B\u4F53 weight); 500 for vertical running text, letter-spacing 0.08em, line-height 1.9. Calendrical dates in Chinese numerals (\u521D\u4E00, \u5EFF\u4E09). Latin only for transliterations, Cormorant small caps."
    },
    {
      id: "brush-kaishu",
      name: "Ma Shan Zheng + LXGW WenKai TC + Old Standard TT",
      display: {
        family: "Old Standard TT",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      body: {
        family: "Libre Caslon Text",
        weights: [400, 700],
        italic: true,
        fallback: "Georgia, serif",
        source: "google"
      },
      cjk: { display: "Ma Shan Zheng", body: "LXGW WenKai TC" },
      notes: "Ma Shan Zheng only for \u5B9C/\u5FCC and the giant day character (\u2265 64px); LXGW WenKai TC for all running Chinese \u2014 kaishu reads like a hand-copied almanac \u2014 17px/1.8, vertical or horizontal. Latin in Old Standard TT, sentence case, small."
    },
    {
      id: "yuefenpai-deco",
      name: "ZCOOL XiaoWei + Limelight",
      display: { family: "Limelight", weights: [400], fallback: '"Didot", Georgia, serif', source: "google" },
      body: {
        family: "Cormorant Garamond",
        weights: [500, 600],
        fallback: "Garamond, Georgia, serif",
        source: "google"
      },
      cjk: { display: "ZCOOL XiaoWei", body: "Noto Serif SC" },
      notes: "1930s Shanghai poster voice: ZCOOL XiaoWei for the issuer\u2019s name and month names, tracking 0.1em; Limelight for Latin (issuer name, month abbreviations) uppercase +0.06em and for numerals inside the month blocks. Chinese body Noto Serif SC 16px/1.8."
    }
  ],
  palettes: [
    {
      id: "red-black-rice",
      name: "Red and black on rice paper",
      colors: {
        paper: "#f3e9d2",
        ink: "#1a1512",
        muted: "#5a4d3f",
        accent: "#c1272d",
        accent2: "#8a6a3a",
        rule: "#b3a07e",
        panel: "#ece0c4"
      },
      usage: "Rice-paper ground; black ink for text and frames; red for significant dates, \u5B9C headers, Sundays and the seal (~12%); faded brown accent2 only for marginal annotations."
    },
    {
      id: "spring-couplet-red",
      name: "Spring-couplet red",
      colors: {
        paper: "#8c1c1c",
        ink: "#ffe9b0",
        muted: "#f0c27a",
        accent: "#f2c14e",
        accent2: "#f6ecd8",
        rule: "#d9a24a",
        panel: "#741414"
      },
      usage: "Deep \u6625\u8054-red ground (dark palette); gold for characters, frames and the seal outline; cream accent2 fills date boxes holding red numerals; darker red panels behind \u5B9C/\u5FCC."
    },
    {
      id: "celadon-poster",
      name: "Celadon poster",
      colors: {
        paper: "#e6eee5",
        ink: "#1d2420",
        muted: "#4a554e",
        accent: "#2f7a5f",
        accent2: "#c95a45",
        rule: "#8fa79a",
        panel: "#f5efe2"
      },
      usage: "\u6708\u4EFD\u724C pastel: celadon ground; cream panels for calendar blocks; jade for borders and month names; persimmon accent2 for dates and the seal; ink for text."
    }
  ],
  densities: ["regular", "compact"],
  scales: ["golden", "perfect-fifth", "augmented-fourth"],
  motion: [
    {
      id: "seal-stamp",
      name: "Seal stamp",
      description: "After the main block appears, the seal presses on once: scale 1.15 \u2192 1 with opacity 0 \u2192 1 at contact, a slight settle.",
      duration: "260ms",
      easing: "cubic-bezier(.2, 1.4, .4, 1)",
      reduced: "Seal shown in place."
    },
    {
      id: "tear-off",
      name: "Tear off",
      description: "Advancing a day sheet: the top sheet tilts 8\xB0 around its top-left binding and slides up out of view, revealing the next sheet.",
      duration: "420ms",
      easing: "cubic-bezier(.55, 0, .8, .2)",
      reduced: "Instant sheet swap."
    },
    {
      id: "ink-soak",
      name: "Ink soak",
      description: "Red characters print first at 60% opacity with blur(0.6px) and settle to crisp full ink, like ink soaking into paper.",
      duration: "300ms",
      easing: "ease-out",
      reduced: "Rendered crisp immediately."
    }
  ],
  motifs: [
    {
      id: "yi-ji-grid",
      name: "\u5B9C/\u5FCC grid",
      description: "Paired boxes: a red-headed \u5B9C box and a black-headed \u5FCC box side by side, each listing 3\u20138 short items in vertical or horizontal columns."
    },
    {
      id: "ganzhi-box",
      name: "Ganzhi date box",
      description: "A double-framed date box stacking \u5E72\u652F / \u519C\u5386 / \u8282\u6C14 lines, with the Gregorian date as a big numeral beside it."
    },
    {
      id: "cinnabar-seal",
      name: "Cinnabar seal",
      description: "A square cinnabar seal (red fill with white relief characters, or red outline intaglio) carrying 2\u20134 characters from the facts, edge roughened via feTurbulence + feDisplacementMap."
    }
  ],
  anchors: [
    {
      id: "giant-day",
      name: "Giant day",
      description: "A tear-off sheet with a giant date or numeral (\u2248 40vh) in red or black, flanked by vertical \u519C\u5386/\u5E72\u652F columns."
    },
    {
      id: "yi-ji-split",
      name: "\u5B9C/\u5FCC split",
      description: "The first screen is the split: \u5B9C and \u5FCC at 20vw, each heading a list of facts."
    },
    {
      id: "framed-column-page",
      name: "Framed column page",
      description: "A woodblock-framed page of vertical columns read right to left, title in the rightmost column, a seal at the end."
    }
  ],
  surfaces: [
    {
      id: "rice-paper",
      name: "Rice paper",
      description: "Thin rice paper with faint diagonal fibres and specks.",
      css: "background-color: var(--paper); background-image: repeating-linear-gradient(105deg, rgba(120,90,40,.035) 0 1px, transparent 1px 7px), radial-gradient(rgba(120,90,40,.05) 1px, transparent 1.5px); background-size: auto, 5px 5px;"
    },
    {
      id: "woodblock-ink",
      name: "Woodblock ink",
      description: "Slightly uneven woodblock impression: headings and frames roughened by an inline SVG filter (feTurbulence baseFrequency .9 + feDisplacementMap scale 1.5).",
      css: "filter: url(#woodblock-rough);"
    },
    {
      id: "perforated-pad",
      name: "Perforated pad",
      description: "Tear-off pad: a row of perforation holes along the top edge of each sheet.",
      css: "background-image: radial-gradient(circle, var(--rule) 2px, transparent 2.5px); background-size: 12px 12px; background-repeat: repeat-x; background-position: 0 6px;"
    }
  ],
  must: [
    "At least one block set vertically (writing-mode: vertical-rl) and read right to left.",
    "Two inks dominate: black + red make up \u2265 90% of the non-paper colour (light palettes).",
    "A \u5B9C/\u5FCC or date-box structure organises the facts.",
    "Calendrical dates in Chinese numerals when the content is Chinese."
  ],
  mustNot: [
    "No fortune-telling or invented auspicious judgements \u2014 \u5B9C/\u5FCC hold practical do / avoid items from the facts.",
    'No dragons, lanterns or clip-art "Chinese" decoration; ornament is frames, fish-tails and seals.',
    "No sideways-rotated Chinese characters in vertical text.",
    "No gradient gold or 3D metallic effects."
  ]
};
var signageScreenBranches = [
  transitWayfinding,
  hkShopSign,
  dinerMenuBoard,
  galleryCatalogue,
  topographicMap,
  terminalPhosphor,
  web1Homepage,
  gameManual,
  instrumentPanel,
  chineseAlmanac
];

// vendor/hash-design/packages/core/src/data/branches/index.ts
var BRANCH_ORDER = [
  "supermarket-circular",
  "engineering-plate",
  "transit-wayfinding",
  "terminal-phosphor",
  "recipe-card",
  "letterpress-woodtype",
  "ledger-accounting",
  "swiss-grid",
  "photocopy-zine",
  "ticket-stub",
  "hk-shop-sign",
  "warm-handmade",
  "bauhaus-primary",
  "web1-homepage",
  "risograph-duotone",
  "academic-paper",
  "ink-and-seal",
  "record-sleeve",
  "apothecary-label",
  "constructivist-poster",
  "diner-menu-board",
  "game-manual",
  "varsity-sports",
  "bureaucratic-form",
  "chinese-almanac",
  "art-deco",
  "couture-lookbook",
  "gallery-catalogue",
  "thermal-receipt",
  "instrument-panel",
  "ma-whitespace",
  "broadsheet-newspaper",
  "seventies-supergraphic",
  "herbarium-specimen",
  "topographic-map",
  "editorial-magazine",
  "raw-brutalist",
  "field-guide-plate",
  "lab-notebook",
  "memphis-pop"
];
var all = [...printBranches, ...documentBranches, ...signageScreenBranches, ...modernistCraftBranches];
var byId = new Map(all.map((b) => [b.id, b]));
if (byId.size !== all.length) throw new Error("Duplicate branch id in branch files");
for (const id of byId.keys())
  if (!BRANCH_ORDER.includes(id)) throw new Error(`Branch ${id} missing from BRANCH_ORDER`);
var BRANCHES = Object.freeze(
  BRANCH_ORDER.map((id) => {
    const b = byId.get(id);
    if (!b) throw new Error(`BRANCH_ORDER lists unknown branch ${id}`);
    return b;
  })
);

// vendor/hash-design/packages/core/src/data/bans.ts
var BANNED_FONTS = [
  "Inter",
  "Inter Tight",
  "Inter Display",
  "Roboto",
  "Roboto Flex",
  "Open Sans",
  "Lato",
  "Poppins",
  "Montserrat",
  "Nunito",
  "Nunito Sans",
  "Plus Jakarta Sans",
  "Manrope",
  "DM Sans",
  "Outfit",
  "Figtree",
  "Geist",
  "Urbanist",
  "Sora",
  "Lexend",
  "Raleway",
  "Work Sans",
  "Space Grotesk"
];
var BUZZWORDS_EN = [
  "unlock",
  "unleash",
  "seamless",
  "seamlessly",
  "supercharge",
  "elevate",
  "empower",
  "revolutionize",
  "revolutionary",
  "effortless",
  "effortlessly",
  "next-level",
  "game-changer",
  "game-changing",
  "cutting-edge",
  "leverage",
  "synergy",
  "all-in-one",
  "world-class",
  "best-in-class",
  "transform your",
  "reimagine",
  "reimagined",
  "harness the power",
  "take it to the next level",
  "skyrocket",
  "streamline",
  "robust",
  "delightful"
];
var BUZZWORDS_ZH = [
  "\u8D4B\u80FD",
  "\u65E0\u7F1D",
  "\u4E00\u7AD9\u5F0F",
  "\u6781\u81F4\u4F53\u9A8C",
  "\u98A0\u8986",
  "\u5F15\u9886\u672A\u6765",
  "\u5168\u65B9\u4F4D",
  "\u52A9\u529B",
  "\u91CA\u653E\u6F5C\u80FD",
  "\u5F00\u542F\u5168\u65B0",
  "\u5F00\u542F\u4F60\u7684",
  "\u91CD\u65B0\u5B9A\u4E49",
  "\u667A\u6167\u5316",
  "\u964D\u672C\u589E\u6548",
  "\u6253\u9020\u6781\u81F4",
  "\u5320\u5FC3\u6253\u9020",
  "\u54C1\u8D28\u751F\u6D3B",
  "\u5C3D\u5728\u638C\u63E1"
];
var BANS = [
  {
    id: "generic-sans",
    title: { zh: "\u7981\u7528 Inter \u53CA\u540C\u7C7B\u9ED8\u8BA4\u65E0\u886C\u7EBF", en: "No Inter-class default sans" },
    detail: `\u4E0D\u5F97\u4F7F\u7528 ${BANNED_FONTS.join(" / ")}\uFF0C\u4E5F\u4E0D\u5F97\u53EA\u5199 system-ui / sans-serif \u5F53\u4F5C"\u8BBE\u8BA1\u9009\u62E9"\u3002\u5B57\u4F53\u5FC5\u987B\u6765\u81EA brief \u6307\u5B9A\u7684\u5B57\u4F53\u5BF9\u3002`,
    severity: "critical",
    detectable: true
  },
  {
    id: "purple-blue-gradient",
    title: { zh: "\u7981\u7528\u7D2B\u84DD\u6E10\u53D8", en: "No purple-to-blue gradients" },
    detail: "\u7981\u6B62\u7D2B/\u975B/\u84DD\u7CFB\u6E10\u53D8\u80CC\u666F\u3001\u6E10\u53D8\u6587\u5B57\uFF08background-clip:text\uFF09\u3001\u6A21\u7CCA\u5F69\u8272\u5149\u6591\uFF08mesh blob / glow orb\uFF09\u3002\u9700\u8981\u6E10\u53D8\u65F6\u53EA\u80FD\u7528 brief \u8C03\u8272\u677F\u5185\u7684\u989C\u8272\uFF0C\u4E14\u5FC5\u987B\u6709\u6750\u8D28\u7406\u7531\uFF08\u5982\u6CB9\u58A8\u53E0\u5370\u3001\u65E5\u6652\u892A\u8272\uFF09\u3002",
    severity: "critical",
    detectable: true
  },
  {
    id: "centered-hero-two-buttons",
    title: { zh: "\u7981\u7528\u5C45\u4E2D hero + \u53CC\u6309\u94AE", en: "No centered hero with two buttons" },
    detail: '\u7981\u6B62"\u5C45\u4E2D\u5927\u6807\u9898 + \u4E00\u884C\u526F\u6807\u9898 + \u4E3B\u6309\u94AE/\u5E7D\u7075\u6309\u94AE\u5E76\u6392"\u7684\u9996\u5C4F\u3002\u9996\u5C4F\u7ED3\u6784\u5FC5\u987B\u6765\u81EA brief \u7684 layout \u4E0E anchor\u3002',
    severity: "critical",
    detectable: true
  },
  {
    id: "identical-cards",
    title: { zh: "\u7981\u7528\u4E09\u5F20\u540C\u6B3E\u5361\u7247", en: "No row of identical feature cards" },
    detail: '\u7981\u6B62 3/4/6 \u5F20\u7ED3\u6784\u76F8\u540C\u7684"\u56FE\u6807 + \u6807\u9898 + \u4E24\u884C\u8BF4\u660E"\u5361\u7247\u6392\u6210\u4E00\u884C\u3002\u4FE1\u606F\u5206\u7EC4\u8981\u7528 brief \u6307\u5B9A\u7684\u7248\u5F0F\u624B\u6BB5\uFF08\u8868\u683C\u3001\u6E05\u5355\u3001\u7F16\u53F7\u6761\u6B3E\u3001\u4EF7\u7B7E\u3001\u6807\u7B7E\u2026\u2026\uFF09\uFF0C\u4E14\u5404\u9879\u5C3A\u5BF8/\u6743\u91CD\u5E94\u6709\u5DEE\u5F02\u3002',
    severity: "major",
    detectable: true
  },
  {
    id: "glassmorphism",
    title: { zh: "\u7981\u7528\u73BB\u7483\u6001", en: "No glassmorphism" },
    detail: "\u7981\u6B62 backdrop-filter \u6BDB\u73BB\u7483\u3001\u534A\u900F\u660E\u767D\u5361\u7247\u53E0\u5728\u5F69\u8272\u80CC\u666F\u4E0A\u3002",
    severity: "major",
    detectable: true
  },
  {
    id: "emoji-icons",
    title: { zh: "\u7981\u7528 emoji \u5F53\u56FE\u6807", en: "No emoji as icons" },
    detail: "\u7981\u6B62\u7528 emoji\uFF08\u2728\u{1F680}\u26A1\uFE0F\u{1F3AF} \u7B49\uFF09\u5145\u5F53\u56FE\u6807\u3001\u9879\u76EE\u7B26\u53F7\u6216\u88C5\u9970\uFF1B\u4E5F\u4E0D\u8981\u62FF\u901A\u7528\u56FE\u6807\u5E93\uFF08Heroicons/Lucide/Feather\uFF09\u5F53\u88C5\u9970\u3002\u9700\u8981\u56FE\u5F62\u65F6\u7528 brief \u6BCD\u9898\u81EA\u7ED8 SVG \u6216\u7EAF\u6392\u7248\u7B26\u53F7\u3002",
    severity: "major",
    detectable: true
  },
  {
    id: "buzzword-copy",
    title: { zh: "\u7981\u7528\u7A7A\u6D1E\u8425\u9500\u6587\u6848", en: "No empty marketing copy" },
    detail: `\u7981\u6B62 ${BUZZWORDS_EN.slice(0, 10).join(" / ")} \u7B49\u82F1\u6587\u7A7A\u8BDD\uFF0C\u4EE5\u53CA ${BUZZWORDS_ZH.slice(0, 8).join(" / ")} \u7B49\u4E2D\u6587\u7A7A\u8BDD\u3002\u6587\u6848\u53EA\u80FD\u7531\u7528\u6237\u63D0\u4F9B\u7684\u4E8B\u5B9E\u6784\u6210\uFF0C\u6309 brief \u7684 voice \u5199\u3002`,
    severity: "major",
    detectable: true
  },
  {
    id: "soft-shadow-rounded",
    title: { zh: '\u7981\u7528"\u5706\u89D2 + \u67D4\u548C\u5927\u9634\u5F71"\u4E00\u5207', en: "No rounded-2xl + soft shadow on everything" },
    detail: "\u7981\u6B62\u6240\u6709\u5757\u90FD\u662F 12\u201324px \u5706\u89D2\u52A0 0 10px 30px \u7EA7\u522B\u7684\u67D4\u548C\u6295\u5F71\u3002\u5706\u89D2\u4E0E\u9634\u5F71\u53EA\u80FD\u6309 brief tokens \u4F7F\u7528\uFF08\u5F88\u591A\u5206\u652F\u662F 0 \u5706\u89D2\u3001\u96F6\u9634\u5F71\uFF09\u3002",
    severity: "major",
    detectable: true
  },
  {
    id: "invented-facts",
    title: { zh: "\u7981\u6B62\u7F16\u9020\u4E8B\u5B9E\u4E0E\u793E\u4F1A\u8BC1\u660E", en: "No invented facts or social proof" },
    detail: '\u7981\u6B62\u865A\u6784\u6570\u636E\u6761\uFF08"10K+ \u7528\u6237 / 99.9% \u53EF\u7528"\uFF09\u3001"Trusted by" logo \u5899\u3001\u5E26\u5934\u50CF\u7684\u5047\u8BC4\u4EF7\u3001\u5047\u5956\u9879\u3002\u53EA\u7528 facts \u4E2D\u7ED9\u51FA\u7684\u4FE1\u606F\uFF1B\u7F3A\u4FE1\u606F\u5C31\u7559\u7A7A\u4F4D\u6216\u5199\u660E\u5F85\u8865\u3002',
    severity: "critical",
    detectable: true
  },
  {
    id: "tailwind-default-palette",
    title: { zh: "\u7981\u7528\u6846\u67B6\u9ED8\u8BA4\u8272\u677F", en: "No framework default palette" },
    detail: '\u7981\u6B62\u76F4\u63A5\u7528 Tailwind slate/indigo/violet/sky \u9ED8\u8BA4\u8272\u503C\uFF08\u5982 #6366f1\u3001#8b5cf6\u3001#0f172a\u3001#3b82f6\uFF09\uFF0C\u7981\u6B62"\u6DF1\u6D77\u519B\u84DD\u5E95 + \u9713\u8679\u5F3A\u8C03\u8272"\u7684\u5F00\u53D1\u8005\u5DE5\u5177\u5916\u89C2\uFF08\u9664\u975E brief \u660E\u786E\u5982\u6B64\uFF09\u3002\u989C\u8272\u53EA\u80FD\u6765\u81EA brief \u8C03\u8272\u677F\u3002',
    severity: "major",
    detectable: true
  },
  {
    id: "scroll-fade-everything",
    title: { zh: '\u7981\u7528"\u6BCF\u6BB5\u90FD\u6DE1\u5165\u4E0A\u6D6E"', en: "No fade-up on every section" },
    detail: "\u7981\u6B62\u7ED9\u6BCF\u4E2A\u533A\u5757\u90FD\u52A0\u6EDA\u52A8\u6DE1\u5165\u4E0A\u6D6E\uFF08AOS / data-aos / IntersectionObserver fade-up\uFF09\u3002\u52A8\u6548\u53EA\u80FD\u6309 brief motion \u89C4\u683C\uFF0C\u4E14\u5FC5\u987B\u5C0A\u91CD prefers-reduced-motion\u3002",
    severity: "minor",
    detectable: true
  },
  {
    id: "pill-badge-sparkle",
    title: { zh: "\u7981\u7528\u6807\u9898\u4E0A\u65B9\u7684\u80F6\u56CA\u5FBD\u6807", en: "No pill badge above the headline" },
    detail: '\u7981\u6B62\u5728\u5927\u6807\u9898\u4E0A\u65B9\u653E "New \u2728 / Now in beta \u2192" \u4E00\u7C7B\u5706\u89D2\u80F6\u56CA\u5C0F\u6807\u7B7E\u3002',
    severity: "minor",
    detectable: true
  },
  {
    id: "placeholder-content",
    title: { zh: "\u7981\u7528\u5360\u4F4D\u5185\u5BB9", en: "No placeholder content" },
    detail: '\u7981\u6B62 Lorem ipsum\u3001"Feature One"\u3001\u901A\u7528\u56FE\u5E93\u4EBA\u7269\u7167\u3001\u968F\u673A Unsplash \u56FE\u3002\u6CA1\u6709\u771F\u5B9E\u56FE\u7247\u65F6\uFF0C\u7528\u6392\u7248\u3001\u8272\u5757\u3001\u81EA\u7ED8 SVG \u6216 brief \u6BCD\u9898\u4EE3\u66FF\u3002',
    severity: "major",
    detectable: true
  },
  {
    id: "template-sections",
    title: { zh: "\u7981\u7528 SaaS \u6A21\u677F\u5206\u8282", en: "No SaaS template section order" },
    detail: "\u7981\u6B62 Hero \u2192 Features \u2192 Testimonials \u2192 Pricing \u2192 FAQ \u2192 CTA \u7684\u56FA\u5B9A\u5957\u8DEF\u3002\u5206\u8282\u987A\u5E8F\u6765\u81EA brief layout \u7684 structure\uFF0C\u5185\u5BB9\u6309\u4E8B\u5B9E\u7EC4\u7EC7\u3002",
    severity: "minor",
    detectable: true
  }
];

// vendor/hash-design/packages/core/src/color.ts
var HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
function normalizeHex(value) {
  const m = HEX_RE.exec(value.trim());
  if (!m || !m[1]) throw new Error(`Not a hex colour: ${value}`);
  let h = m[1].toLowerCase();
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  return `#${h}`;
}
function hexToRgb(hex) {
  const h = normalizeHex(hex).slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}
function channel(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return { h: h * 60, s, l };
}
function hexToHsl(hex) {
  return rgbToHsl(hexToRgb(hex));
}
function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}
function isLightPaper(paper) {
  return luminance(paper) > 0.4;
}
function bestTextOn(bg, options) {
  let best = options[0] ?? "#000000";
  let bestRatio = -1;
  for (const o of options) {
    const r = contrast(bg, o);
    if (r > bestRatio) {
      best = o;
      bestRatio = r;
    }
  }
  return best;
}

// vendor/hash-design/packages/core/src/derive.ts
var CJK_RE = /[㐀-鿿豈-﫿]/;
function detectLanguage(...texts) {
  return texts.some((t) => CJK_RE.test(t)) ? "zh" : "en";
}
function typeScale(design) {
  const base = design.density.baseSize;
  const steps = [];
  for (let s = -2; s <= 7; s++) {
    const px = base * design.scale.ratio ** s;
    steps.push({ step: s, px: Math.round(px * 10) / 10, rem: Math.round(px / 16 * 1e3) / 1e3 });
  }
  return steps;
}
function quote(family) {
  return /^[a-z-]+$/i.test(family) && !family.includes(" ") ? family : `"${family}"`;
}
function fontStack(font, cjk) {
  const parts = [quote(font.family)];
  if (cjk) parts.push(quote(cjk));
  parts.push(font.fallback);
  return parts.join(", ");
}
function fontStacks(type, lang) {
  const cjkDisplay = lang === "zh" ? type.cjk.display : void 0;
  const cjkBody = lang === "zh" ? type.cjk.body : void 0;
  return {
    display: fontStack(type.display, cjkDisplay),
    body: fontStack(type.body, cjkBody),
    mono: type.mono ? fontStack(type.mono) : 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace'
  };
}
var CJK_VARIABLE = /* @__PURE__ */ new Set(["Noto Sans SC", "Noto Serif SC", "Noto Sans TC", "Noto Serif TC"]);
function familyParam(family, weights, italic) {
  const name = family.replace(/ /g, "+");
  if (!weights || weights.length === 0) return `family=${name}`;
  const ws = [...new Set(weights)].sort((a, b) => a - b);
  if (italic) {
    const tuples = [...ws.map((w) => `0,${w}`), ...ws.map((w) => `1,${w}`)];
    return `family=${name}:ital,wght@${tuples.join(";")}`;
  }
  if (ws.length === 1 && ws[0] === 400) return `family=${name}`;
  return `family=${name}:wght@${ws.join(";")}`;
}
function googleFontsUrl(type, lang) {
  const params = [];
  const seen = /* @__PURE__ */ new Set();
  const merged = /* @__PURE__ */ new Map();
  for (const f of [type.display, type.body, type.mono]) {
    if (!f || f.source !== "google") continue;
    const entry = merged.get(f.family) ?? { weights: /* @__PURE__ */ new Set(), italic: false };
    f.weights.forEach((w) => entry.weights.add(w));
    entry.italic ||= Boolean(f.italic);
    merged.set(f.family, entry);
  }
  for (const [family, { weights, italic }] of merged) {
    params.push(familyParam(family, [...weights], italic));
    seen.add(family);
  }
  if (lang === "zh") {
    for (const fam of [type.cjk.display, type.cjk.body]) {
      if (seen.has(fam)) continue;
      seen.add(fam);
      params.push(familyParam(fam, CJK_VARIABLE.has(fam) ? [400, 700] : null, false));
    }
  }
  if (params.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}
function contrastReport(colors) {
  const verdict = (r, role) => {
    if (r >= 7) return "AAA \u2014 any text";
    if (r >= 4.5) return "AA \u2014 body text OK";
    if (r >= 3)
      return role === "accent" ? "large text / UI marks only (\u226524px or bold \u226519px)" : "large text only";
    return "decorative only \u2014 never for text";
  };
  const onAccent = bestTextOn(colors.accent, [colors.paper, colors.ink, "#ffffff", "#000000"]);
  const onAccent2 = bestTextOn(colors.accent2, [colors.paper, colors.ink, "#ffffff", "#000000"]);
  const pairs = [
    ["ink on paper", colors.ink, colors.paper, "text"],
    ["muted on paper", colors.muted, colors.paper, "text"],
    ["ink on panel", colors.ink, colors.panel, "text"],
    ["accent on paper", colors.accent, colors.paper, "accent"],
    ["accent2 on paper", colors.accent2, colors.paper, "accent"],
    [`${onAccent} on accent`, onAccent, colors.accent, "text"],
    [`${onAccent2} on accent2`, onAccent2, colors.accent2, "text"]
  ];
  return {
    lines: pairs.map(([pair, a, b, role]) => {
      const ratio = Math.round(contrast(a, b) * 100) / 100;
      return { pair, ratio, verdict: verdict(ratio, role) };
    }),
    onAccent,
    onAccent2
  };
}
function tokensCss(design, lang) {
  const c = design.palette.colors;
  const stacks = fontStacks(design.type, lang);
  const { onAccent, onAccent2 } = contrastReport(c);
  const d = design.density;
  const lines = [];
  lines.push(`/* hash-design ${design.short} \xB7 ${design.branch.id} \xB7 ${design.palette.id} */`);
  lines.push(":root {");
  lines.push(`  --paper: ${c.paper};`);
  lines.push(`  --ink: ${c.ink};`);
  lines.push(`  --muted: ${c.muted};`);
  lines.push(`  --accent: ${c.accent};`);
  lines.push(`  --on-accent: ${onAccent};`);
  lines.push(`  --accent2: ${c.accent2};`);
  lines.push(`  --on-accent2: ${onAccent2};`);
  lines.push(`  --rule: ${c.rule};`);
  lines.push(`  --panel: ${c.panel};`);
  lines.push("");
  lines.push(`  --font-display: ${stacks.display};`);
  lines.push(`  --font-body: ${stacks.body};`);
  lines.push(`  --font-mono: ${stacks.mono};`);
  lines.push("");
  for (const s of typeScale(design)) {
    lines.push(`  --step-${s.step < 0 ? `n${-s.step}` : s.step}: ${s.rem}rem; /* ${s.px}px */`);
  }
  lines.push(`  --leading: ${d.lineHeight};`);
  lines.push("");
  for (let i = 1; i <= 8; i++) lines.push(`  --space-${i}: ${d.unit * i}px;`);
  lines.push(`  --section-gap: ${d.sectionGap}px;`);
  lines.push(`  --max-width: ${d.maxWidth}px;`);
  lines.push("");
  lines.push(`  --motion-duration: ${design.motion.duration};`);
  lines.push(`  --motion-easing: ${design.motion.easing};`);
  lines.push("}");
  lines.push("");
  lines.push(`html { font-size: ${Math.round(d.baseSize / 16 * 1e3) / 10}%; }`);
  lines.push(
    "body { background: var(--paper); color: var(--ink); font-family: var(--font-body); line-height: var(--leading); }"
  );
  lines.push("@media (prefers-reduced-motion: reduce) {");
  lines.push("  *, *::before, *::after { animation: none !important; transition: none !important; }");
  lines.push("}");
  return lines.join("\n");
}

// node_modules/@noble/hashes/_u64.js
var fromNumH = (n) => n / 2 ** 32 | 0;
var fromNumL = (n) => n >>> 0;
function setU64FromNum(view, byteOffset, n, isLE) {
  const h = fromNumH(n);
  const l = fromNumL(n);
  view.setUint32(byteOffset, isLE ? l : h, isLE);
  view.setUint32(byteOffset + 4, isLE ? h : l, isLE);
}

// node_modules/@noble/hashes/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
var atitle = (title) => title ? `"${title}" ` : "";
function anumber(n, title = "") {
  if (typeof n !== "number")
    throw new TypeError(atitle(title) + "expected number, got " + typeof n);
  if (!Number.isSafeInteger(n) || n < 0)
    throw new RangeError(atitle(title) + "expected integer >= 0, got " + n);
  return n;
}
function abytes(value, length, title = "") {
  if (isBytes(value) && (length === void 0 || value.length === length))
    return value;
  if (length !== void 0)
    anumber(length, "length");
  const bytes = isBytes(value);
  const ofLen = length !== void 0 ? ` of length ${length}` : "";
  const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
  const message = atitle(title) + "expected Uint8Array" + ofLen + ", got " + got;
  if (!bytes)
    throw new TypeError(message);
  throw new RangeError(message);
}
var aobject = (value, label) => {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    throw new TypeError((label === "object" ? "" : `"${label}" `) + "expected object, got type=" + typeof value);
};
var aopts = (value, label) => {
  aobject(value, label);
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null)
    throw new TypeError(`"${label}" expected plain object`);
  if (Object.hasOwn(value, "__proto__"))
    throw new TypeError(`"${label}.__proto__" is not allowed`);
};
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("hash was destroyed");
  if (checkFinished && instance.finished)
    throw new Error("digest() was already called");
}
function aoutput(out, instance) {
  abytes(out, void 0, "output");
  const min = instance.outputLen;
  if (!(out.length >= min)) {
    throw new RangeError('"output" expected length >= ' + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new TypeError("string expected");
  const encoded = new TextEncoder().encode(str);
  try {
    return new Uint8Array(encoded);
  } finally {
    clean(encoded);
  }
}
function checkOpts(defaults, opts, title = "opts") {
  aopts(defaults, "defaults");
  if (opts !== void 0)
    aopts(opts, title);
  const merged = Object.assign(/* @__PURE__ */ Object.create(null), defaults, opts);
  return merged;
}
function createHasher(hashCons, info = {}) {
  if (typeof hashCons !== "function")
    throw new TypeError('"hashCons" expected function, got type=' + typeof hashCons);
  info = checkOpts({}, info, "info");
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.canXOF = tmp.canXOF;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
var oidNist = (suffix) => ({
  // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
  // Larger suffix values would need base-128 OID encoding and a different length byte.
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, suffix])
});

// node_modules/@noble/hashes/_md.js
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class {
  blockLen;
  outputLen;
  canXOF = false;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(blockLen, outputLen, padOffset, isLE) {
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    let processed = false;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        processed = true;
        continue;
      }
      buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
        processed = true;
      }
    }
    this.length += data.length;
    if (processed)
      this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    buffer.fill(0, pos);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      buffer.fill(0);
    }
    setU64FromNum(view, blockLen - 8, this.length * 8, isLE);
    this.process(view, 0);
    this.roundClean();
    const oview = out === buffer ? view : createView(out);
    const len = this.outputLen;
    const outLen = len / 4;
    const state = this.get();
    if (len % 4 || outLen > state.length)
      throw new Error("invalid outputLen");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneIntoMeta(to) {
    const { buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (pos)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// node_modules/@noble/hashes/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA2_32B = class extends HashMD {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  // Numeric initializers matter: starting the fields as `undefined` changes
  // V8's field representation and makes sha256 3x slower (measured).
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  constructor(outputLen, IV) {
    super(64, outputLen, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  _cloneInto(to) {
    (to ||= new this.constructor()).set(...this.get());
    return this._cloneIntoMeta(to);
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.destroyed = true;
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var _SHA256 = class extends SHA2_32B {
  constructor() {
    super(32, SHA256_IV);
  }
};
var sha256 = /* @__PURE__ */ createHasher(
  () => new _SHA256(),
  /* @__PURE__ */ oidNist(1)
);

// src/reference-crypto.js
function createHash(algorithm) {
  if (algorithm !== "sha256") throw new Error("Unsupported hash");
  let chunks = [];
  return { update(value) {
    chunks.push(typeof value === "string" ? utf8ToBytes(value) : value);
    return this;
  }, digest(encoding) {
    const n = chunks.reduce((n2, c) => n2 + c.length, 0), data = new Uint8Array(n);
    let i = 0;
    for (const c of chunks) {
      data.set(c, i);
      i += c.length;
    }
    const result = sha256(data);
    return encoding === "hex" ? bytesToHex(result) : result;
  } };
}
function randomBytes(n) {
  return globalThis.crypto.getRandomValues(new Uint8Array(n));
}

// vendor/hash-design/packages/core/src/hash.ts
var ALGORITHM = "hash-design/v1";
var HASH_RE = /^[0-9a-f]{64}$/;
function sha256Hex(input) {
  return createHash("sha256").update(input).digest("hex");
}
function randomHash() {
  return sha256Hex(randomBytes(32));
}
function seededHash(seed, index) {
  return sha256Hex(`${ALGORITHM}:${seed}:${index}`);
}
function rollHashes(count, seed) {
  if (!Number.isInteger(count) || count < 1)
    throw new Error(`count must be a positive integer (got ${count})`);
  return Array.from({ length: count }, (_, i) => seed === void 0 ? randomHash() : seededHash(seed, i));
}
function isHash(value) {
  return HASH_RE.test(value);
}
function hashBytes(hash) {
  const h = hash.trim().toLowerCase();
  if (!isHash(h)) throw new Error(`Expected a 64-char lowercase hex SHA-256 hash, got "${hash}"`);
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}
function formatRef(hash, probe) {
  return probe > 0 ? `${hash}+${probe}` : hash;
}
function parseRef(ref) {
  const m = /^([0-9a-fA-F]{64})(?:\+(\d+))?$/.exec(ref.trim());
  if (!m || !m[1]) {
    throw new Error(
      `Invalid design ref "${ref}". Expected a 64-char hex hash, optionally followed by +<probe>.`
    );
  }
  return { hash: m[1].toLowerCase(), probe: m[2] ? Number(m[2]) : 0 };
}
function shortHash(hash) {
  return hash.slice(0, 8);
}

// vendor/hash-design/packages/core/src/data/pools.ts
var DENSITIES = {
  airy: {
    id: "airy",
    name: { zh: "\u758F\u6717", en: "Airy" },
    baseSize: 18,
    lineHeight: 1.65,
    unit: 10,
    sectionGap: 168,
    maxWidth: 1080,
    description: "\u5927\u7559\u767D\uFF0C\u4E00\u5C4F\u53EA\u8BB2\u4E00\u4EF6\u4E8B\uFF1B\u6B63\u6587\u884C\u957F 60\u201368 \u5B57\u7B26\uFF08\u4E2D\u6587 30\u201336 \u5B57\uFF09\u3002"
  },
  regular: {
    id: "regular",
    name: { zh: "\u5E38\u89C4", en: "Regular" },
    baseSize: 17,
    lineHeight: 1.55,
    unit: 8,
    sectionGap: 112,
    maxWidth: 1200,
    description: "\u5E38\u89C4\u9605\u8BFB\u8282\u594F\uFF1B\u533A\u5757\u4E4B\u95F4\u7528\u660E\u786E\u7684\u5206\u9694\uFF08\u7EBF\u3001\u8272\u5757\u6216\u7F16\u53F7\uFF09\uFF0C\u4E0D\u9760\u7A7A\u767D\u786C\u6491\u3002"
  },
  compact: {
    id: "compact",
    name: { zh: "\u7D27\u51D1", en: "Compact" },
    baseSize: 15,
    lineHeight: 1.45,
    unit: 6,
    sectionGap: 64,
    maxWidth: 1320,
    description: "\u4FE1\u606F\u5BC6\u96C6\uFF0C\u591A\u680F\u5E76\u884C\uFF1B\u7528\u7EC6\u7EBF\u548C\u5BF9\u9F50\u5EFA\u7ACB\u79E9\u5E8F\uFF0C\u9996\u5C4F\u5C31\u80FD\u770B\u5230 3 \u4E2A\u4EE5\u4E0A\u4FE1\u606F\u5757\u3002"
  },
  packed: {
    id: "packed",
    name: { zh: "\u6EE1\u7248", en: "Packed" },
    baseSize: 14,
    lineHeight: 1.35,
    unit: 4,
    sectionGap: 32,
    maxWidth: 1440,
    description: "\u50CF\u62A5\u7EB8/\u4FC3\u9500\u5355\u4E00\u6837\u585E\u6EE1\uFF1A\u51E0\u4E4E\u6CA1\u6709\u7A7A\u767D\u533A\uFF0C\u9760\u5B57\u53F7\u53CD\u5DEE\u3001\u7C97\u7EBF\u548C\u8272\u5757\u5206\u533A\u3002"
  }
};
var SCALES = {
  "major-second": { id: "major-second", name: "Major second 1.125", ratio: 1.125 },
  "minor-third": { id: "minor-third", name: "Minor third 1.2", ratio: 1.2 },
  "major-third": { id: "major-third", name: "Major third 1.25", ratio: 1.25 },
  "perfect-fourth": { id: "perfect-fourth", name: "Perfect fourth 1.333", ratio: 1.333 },
  "augmented-fourth": { id: "augmented-fourth", name: "Augmented fourth 1.414", ratio: 1.414 },
  "perfect-fifth": { id: "perfect-fifth", name: "Perfect fifth 1.5", ratio: 1.5 },
  golden: { id: "golden", name: "Golden ratio 1.618", ratio: 1.618 }
};
var VOICES = [
  {
    id: "shopkeeper-chalkboard",
    name: { zh: "\u5E97\u4E3B\u9ED1\u677F", en: "Shopkeeper chalkboard" },
    description: "\u5E97\u4E3B\u4EB2\u624B\u5199\u5728\u95E8\u53E3\u9ED1\u677F\u4E0A\u7684\u8BDD\uFF1A\u77ED\u53E5\u3001\u73B0\u5728\u65F6\u3001\u5177\u4F53\u5230\u65F6\u95F4\u548C\u4EF7\u683C\uFF0C\u5076\u5C14\u4E00\u53E5\u73A9\u7B11\u3002",
    devices: ["\u4ECA\u65E5/\u6B64\u523B\u5F00\u5934", "\u4EF7\u683C\u76F4\u63A5\u5199\u6570\u5B57", "\u4E00\u884C\u4E0D\u8D85\u8FC7 14 \u4E2A\u5B57", "\u53EF\u4EE5\u6709\u4E00\u53E5\u624B\u5199\u6279\u6CE8"],
    example: "\u4ECA\u5929 7:00 \u7B2C\u4E00\u7089\u3002\u5356\u5B8C\u5C31\u5173\u706F\u3002"
  },
  {
    id: "field-notes",
    name: { zh: "\u7530\u91CE\u7B14\u8BB0", en: "Field notes" },
    description: "\u89C2\u5BDF\u8005\u7684\u8BB0\u5F55\uFF1A\u5E26\u65E5\u671F\u3001\u65F6\u95F4\u3001\u5EA6\u91CF\u548C\u7B2C\u4E00\u624B\u7EC6\u8282\uFF0C\u514B\u5236\u3001\u4E0D\u8BC4\u4EF7\u3002",
    devices: ["\u65E5\u671F/\u65F6\u95F4\u6233", "\u5EA6\u91CF\u5355\u4F4D", '"\u89C2\u5BDF\u5230\u2026"\u5F0F\u9648\u8FF0', "\u62EC\u53F7\u8865\u5145"],
    example: "06:40 \u2014 \u7A97\u5185\u6E29\u5EA6 31\xB0C\uFF0C\u9762\u56E2\u7B2C\u4E8C\u6B21\u53D1\u9175\u5B8C\u6210\uFF08\u76EE\u6D4B\u4F53\u79EF \xD72\uFF09\u3002"
  },
  {
    id: "technical-manual",
    name: { zh: "\u6280\u672F\u624B\u518C", en: "Technical manual" },
    description: "\u8BF4\u660E\u4E66\u53E3\u543B\uFF1A\u7F16\u53F7\u6761\u6B3E\u3001\u52A8\u8BCD\u5F00\u5934\u3001\u89C4\u683C\u5199\u5168\uFF0C\u96F6\u5F62\u5BB9\u8BCD\u3002",
    devices: ["1.1 / 1.2 \u7F16\u53F7", "\u89C4\u683C\u8868", "\u6CE8\u610F/\u8B66\u544A\u6846", "\u52A8\u8BCD\u5F00\u5934\u7684\u6B65\u9AA4"],
    example: "3.2 \u53D6\u8D27\uFF1A\u62A5\u9884\u8BA2\u53F7 \u2192 \u6838\u5BF9 \u2192 \u53D6\u8D70\u3002\u903E\u65F6 30 \u5206\u949F\u91CA\u653E\u5E93\u5B58\u3002"
  },
  {
    id: "personal-letter",
    name: { zh: "\u4EB2\u7B14\u4FE1", en: "Personal letter" },
    description: "\u5199\u7ED9\u4E00\u4E2A\u5177\u4F53\u8BFB\u8005\u7684\u4FE1\uFF1A\u7B2C\u4E00\u4EBA\u79F0\u3001\u7B2C\u4E8C\u4EBA\u79F0\u3001\u5177\u4F53\u7684\u56DE\u5FC6\u548C\u9080\u8BF7\uFF0C\u6709\u843D\u6B3E\u3002",
    devices: ["\u79F0\u547C", "\u7B2C\u4E00\u4EBA\u79F0\u56DE\u5FC6", "\u843D\u6B3E\u4E0E\u65E5\u671F", "\u9644\u8A00 P.S."],
    example: "\u4F60\u597D\u2014\u2014\u5982\u679C\u4F60\u5468\u516D\u65E9\u4E0A\u8DEF\u8FC7\uFF0C\u95E8\u4F1A\u5F00\u7740\uFF0C\u684C\u4E0A\u6709\u521A\u5207\u7684\u9762\u5305\u3002"
  },
  {
    id: "museum-label",
    name: { zh: "\u5C55\u7B7E", en: "Museum label" },
    description: "\u535A\u7269\u9986\u85CF\u54C1\u6807\u7B7E\uFF1A\u540D\u79F0\u3001\u5E74\u4EE3\u3001\u6750\u8D28\u3001\u5C3A\u5BF8\uFF0C\u6700\u540E\u4E00\u53E5\u51B7\u9759\u7684\u6CE8\u89E3\u3002",
    devices: ["\u540D\u79F0 / \u5E74\u4EE3 / \u6750\u8D28 \u4E09\u884C", "\u9986\u85CF\u7F16\u53F7", "\u4E00\u53E5\u6CE8\u89E3", "\u5C3A\u5BF8"],
    example: "\u4E61\u6751\u9762\u5305\uFF0C2026\u3002\u5C0F\u9EA6\u3001\u6C34\u3001\u76D0\u3001\u4E5D\u5E74\u9175\u79CD\u3002\u76F4\u5F84 22 cm\u3002"
  },
  {
    id: "recipe-method",
    name: { zh: "\u914D\u65B9\u6B65\u9AA4", en: "Recipe method" },
    description: '\u914D\u65B9\u4E66\u5199\u6CD5\uFF1A\u914D\u6599\u6E05\u5355 + \u6709\u5E8F\u6B65\u9AA4 + \u65F6\u95F4/\u6E29\u5EA6\uFF0C\u4EFB\u4F55\u4ECB\u7ECD\u90FD\u5199\u6210"\u505A\u6CD5"\u3002',
    devices: ["\u914D\u6599\u6E05\u5355\uFF08\u6570\u91CF\u5BF9\u9F50\uFF09", "\u7F16\u53F7\u6B65\u9AA4", "\u65F6\u95F4\u4E0E\u6E29\u5EA6", "\u5C0F\u8D34\u58EB"],
    example: "\u2460 \u524D\u4E00\u665A 21:00 \u5582\u9175\u79CD \u2461 \u6B21\u65E5 06:00 \u5165\u7089 \u2462 230\xB0C \u70E4 40 \u5206\u949F\u3002"
  },
  {
    id: "classified-ad",
    name: { zh: "\u5206\u7C7B\u5E7F\u544A", en: "Classified ad" },
    description: "\u62A5\u7EB8\u5206\u7C7B\u5E7F\u544A\u7535\u62A5\u4F53\uFF1A\u7701\u7565\u4E3B\u8BED\u3001\u7F29\u5199\u3001\u5173\u952E\u4FE1\u606F\u524D\u7F6E\uFF0C\u6309\u5B57\u8BA1\u4EF7\u822C\u7684\u8282\u7701\u3002",
    devices: ["\u5168\u5927\u5199\u6216\u52A0\u7C97\u9996\u8BCD", "\u7F29\u5199", "\u7535\u8BDD/\u5730\u5740\u6536\u5C3E", "\u5206\u9694\u7B26 \xB7"],
    example: "\u9762\u5305\u3002\u6BCF\u65E5\u73B0\u70E4\u3002\u9175\u79CD\u4E5D\u5E74\u3002\u7B2C\u56DB\u5DF717\u53F7\u3002\u5468\u4E00\u4F11\u3002"
  },
  {
    id: "timetable",
    name: { zh: "\u65F6\u523B\u8868", en: "Timetable" },
    description: "\u628A\u5185\u5BB9\u7EC4\u7EC7\u6210\u65F6\u95F4\u8868/\u73ED\u6B21\u8868\uFF1A\u65F6\u95F4\u662F\u4E3B\u8F74\uFF0C\u4E8B\u4EF6\u662F\u6761\u76EE\u3002",
    devices: ["\u65F6\u95F4\u5217\u53F3\u5BF9\u9F50", "\u73ED\u6B21/\u6279\u6B21\u7F16\u53F7", "\u72B6\u6001\uFF08\u51C6\u70B9/\u552E\u7F44\uFF09", "\u56FE\u4F8B"],
    example: "07:00 \u7B2C\u4E00\u7089 \xB7 \u53EF\u9882 / \u4E61\u6751 \u2014\u2014 11:00 \u7B2C\u4E8C\u7089 \xB7 \u8089\u6842\u5377"
  },
  {
    id: "almanac",
    name: { zh: "\u5386\u4E66", en: "Almanac" },
    description: "\u9EC4\u5386/\u5E74\u9274\u53E3\u543B\uFF1A\u5B9C\u5FCC\u3001\u8282\u4EE4\u3001\u65B9\u4F4D\uFF0C\u77ED\u53E5\u5E76\u5217\uFF0C\u5E26\u4E00\u70B9\u53E4\u610F\u4F46\u4FE1\u606F\u51C6\u786E\u3002",
    devices: ["\u5B9C / \u5FCC \u5E76\u5217", "\u8282\u6C14\u6216\u65E5\u671F", "\u56DB\u5B57\u77ED\u8BED", "\u65B9\u4F4D\u4E0E\u65F6\u8FB0"],
    example: "\u5B9C\uFF1A\u65E9\u8D77\u3001\u8D81\u70ED\u3002\u5FCC\uFF1A\u5468\u4E00\u6765\u8BBF\u3002"
  },
  {
    id: "catalogue-entry",
    name: { zh: "\u5546\u54C1\u76EE\u5F55", en: "Catalogue entry" },
    description: "\u90AE\u8D2D\u76EE\u5F55\u6761\u76EE\uFF1A\u8D27\u53F7\u3001\u54C1\u540D\u3001\u89C4\u683C\u3001\u4EF7\u683C\uFF0C\u6BCF\u6761\u7ED3\u6784\u4E00\u81F4\uFF0C\u9760\u6392\u7248\u800C\u975E\u5F62\u5BB9\u8BCD\u53D6\u80DC\u3002",
    devices: ["\u8D27\u53F7 No.", "\u54C1\u540D + \u89C4\u683C", "\u4EF7\u683C\u53F3\u5BF9\u9F50", "\u5E93\u5B58/\u6279\u6B21\u8BF4\u660E"],
    example: "No.07 \u9ED1\u9EA6\u9762\u5305 \xB7 750 g \xB7 \u6BCF\u65E5\u9650 12 \u4E2A \xB7 \xA542"
  },
  {
    id: "interview-qa",
    name: { zh: "\u95EE\u7B54\u8BBF\u8C08", en: "Interview Q&A" },
    description: "\u8BBF\u8C08\u7A3F\uFF1A\u95EE\u53E5\u77ED\uFF0C\u7B54\u53E5\u662F\u5F53\u4E8B\u4EBA\u7684\u539F\u8BDD\u98CE\u683C\uFF0C\u5177\u4F53\u3001\u53E3\u8BED\u3001\u6709\u7EC6\u8282\u3002",
    devices: ["\u95EE\uFF1A/\u7B54\uFF1A", "\u5F15\u8BED", "\u5177\u4F53\u4EBA\u540D/\u65F6\u95F4", "\u4E00\u53E5\u505C\u987F\u6216\u7B11\u58F0\u6CE8"],
    example: "\u95EE\uFF1A\u4E3A\u4EC0\u4E48\u5468\u4E00\u4F11\u606F\uFF1F\u7B54\uFF1A\u9175\u79CD\u4E5F\u8981\u6B47\u4E00\u5929\u3002"
  },
  {
    id: "dictionary-entry",
    name: { zh: "\u8BCD\u6761", en: "Dictionary entry" },
    description: "\u628A\u4E3B\u9898\u5199\u6210\u8BCD\u5178\u8BCD\u6761\uFF1A\u8BCD\u5934\u3001\u6CE8\u97F3/\u8BCD\u6027\u3001\u7F16\u53F7\u91CA\u4E49\u3001\u4F8B\u53E5\u3001\u53C2\u89C1\u3002",
    devices: ["\u8BCD\u5934\u52A0\u7C97", "\u6CE8\u97F3\u6216\u8BCD\u6027", "\u2460 \u2461 \u91CA\u4E49", "\u4F8B\u53E5 / \u53C2\u89C1 \u2192"],
    example: "\u7B2C\u56DB\u5DF7 d\xEC s\xEC xi\xE0ng \u27E8\u540D\u27E9 \u2460 \u4E00\u6761\u53EA\u6709\u4E00\u5BB6\u9762\u5305\u5E97\u7684\u5DF7\u5B50\u3002"
  },
  {
    id: "logbook",
    name: { zh: "\u503C\u73ED\u65E5\u5FD7", en: "Logbook" },
    description: "\u8239\u957F/\u503C\u73ED\u65E5\u5FD7\uFF1A\u6309\u6761\u76EE\u8BB0\u5F55\uFF0C\u65F6\u95F4\u6233 + \u4E8B\u4EF6 + \u7B7E\u540D\u7F29\u5199\uFF0C\u4E8B\u5B9E\u5316\u3001\u7565\u5E26\u5E7D\u9ED8\u3002",
    devices: ["\u65F6\u95F4\u6233", "\u4E8B\u4EF6\u4EE3\u7801", "\u7B7E\u540D\u7F29\u5199", "\u5929\u6C14/\u72B6\u6001\u680F"],
    example: "0630 \u7089\u6E29\u8FBE\u6807\u30020700 \u5F00\u95E8\uFF0C\u95E8\u5916 4 \u4EBA\u3002\u2014\u2014 L."
  },
  {
    id: "announcer",
    name: { zh: "\u5E7F\u64AD\u901A\u544A", en: "Public announcement" },
    description: "\u8F66\u7AD9/\u5546\u573A\u5E7F\u64AD\uFF1A\u793C\u8C8C\u3001\u91CD\u590D\u5173\u952E\u4FE1\u606F\u3001\u6307\u793A\u65B9\u5411\uFF0C\u53E5\u5B50\u6E05\u695A\u5230\u53EF\u4EE5\u5FF5\u51FA\u6765\u3002",
    devices: ['"\u5404\u4F4D\u987E\u5BA2\u8BF7\u6CE8\u610F"\u5F0F\u5F00\u5934', "\u5173\u952E\u4FE1\u606F\u91CD\u590D\u4E00\u6B21", "\u65B9\u5411\u6307\u793A", "\u65F6\u95F4\u70B9"],
    example: "\u5404\u4F4D\u90BB\u5C45\u8BF7\u6CE8\u610F\uFF1A\u7B2C\u4E8C\u7089\u8089\u6842\u5377\u5C06\u4E8E 11:00 \u51FA\u7089\uFF0C11:00 \u51FA\u7089\u3002"
  }
];
var TWISTS = [
  {
    id: "numerals-as-display",
    name: { zh: "\u6570\u5B57\u5373\u4E3B\u89D2", en: "Numerals as display" },
    description: "\u9875\u9762\u91CC\u6240\u6709\u5173\u952E\u6570\u5B57\uFF08\u65F6\u95F4\u3001\u4EF7\u683C\u3001\u7F16\u53F7\uFF09\u7528\u5C55\u793A\u5B57\u4F53\u3001\u653E\u5927\u5230\u6B63\u6587 3 \u500D\u4EE5\u4E0A\uFF0C\u4F5C\u4E3A\u89C6\u89C9\u4E3B\u89D2\u3002"
  },
  {
    id: "one-element-breaks-grid",
    name: { zh: "\u552F\u4E00\u8D8A\u754C", en: "One element breaks the grid" },
    description: "\u5168\u9875\u6070\u597D\u4E00\u4E2A\u5143\u7D20\u6253\u7834\u6805\u683C\uFF1A\u65CB\u8F6C\u3001\u51FA\u8840\u6216\u8D8A\u8FC7\u8FB9\u8DDD\u3002\u5176\u4F59\u4E00\u5207\u4E25\u683C\u5BF9\u9F50\u3002"
  },
  {
    id: "nav-elsewhere",
    name: { zh: "\u5BFC\u822A\u4E0D\u5728\u9876\u90E8", en: "Navigation not on top" },
    description: "\u5BFC\u822A\u653E\u5728\u5E95\u90E8\u3001\u4FA7\u8FB9\u7AD6\u6392\u6216\u505A\u6210\u76EE\u5F55/\u7D22\u5F15\uFF0C\u800C\u4E0D\u662F\u9876\u90E8\u6A2A\u6761\u3002"
  },
  {
    id: "table-carries-a-section",
    name: { zh: "\u4E00\u5F20\u8868\u6491\u8D77\u4E00\u8282", en: "A table carries a section" },
    description: "\u81F3\u5C11\u4E00\u4E2A\u4E3B\u8981\u533A\u5757\u5B8C\u5168\u7531\u4E00\u5F20\u771F\u6B63\u7684 <table> \u627F\u62C5\uFF08\u4EF7\u76EE\u3001\u65F6\u523B\u3001\u89C4\u683C\uFF09\uFF0C\u5E76\u7CBE\u5FC3\u6392\u7248\u3002"
  },
  {
    id: "accent-rationed",
    name: { zh: "\u5F3A\u8C03\u8272\u914D\u7ED9", en: "Accent rationed" },
    description: "\u5F3A\u8C03\u8272\u5728\u5168\u9875\u6700\u591A\u51FA\u73B0 3 \u5904\uFF1B\u5176\u4F59\u4E00\u5207\u53EA\u7528 ink / paper / rule\u3002"
  },
  {
    id: "vertical-text",
    name: { zh: "\u7AD6\u6392\u4E00\u5904", en: "Vertical text once" },
    description: "\u81F3\u5C11\u4E00\u5904\u4F7F\u7528\u7AD6\u6392\u6587\u5B57\uFF08\u4E2D\u6587 writing-mode: vertical-rl\uFF09\u6216\u65CB\u8F6C 90\xB0 \u7684\u6807\u7B7E\u4F5C\u4E3A\u7ED3\u6784\u5143\u7D20\u3002"
  },
  {
    id: "no-photography",
    name: { zh: "\u96F6\u7167\u7247", en: "No photography" },
    description: "\u4E0D\u4F7F\u7528\u4EFB\u4F55\u7167\u7247\u6216\u56FE\u7247\u5360\u4F4D\uFF1B\u6240\u6709\u89C6\u89C9\u90FD\u7531\u6392\u7248\u3001\u8272\u5757\u3001\u81EA\u7ED8 SVG \u6216 CSS \u56FE\u5F62\u5B8C\u6210\u3002"
  },
  {
    id: "numbered-sections",
    name: { zh: "\u5206\u8282\u7F16\u53F7", en: "Numbered sections" },
    description: "\u6BCF\u4E2A\u533A\u5757\u6709\u663E\u773C\u7684\u7F16\u53F7\uFF08\xA71\u3001No.2\u300103\u2026\uFF09\uFF0C\u7F16\u53F7\u672C\u8EAB\u662F\u8BBE\u8BA1\u5143\u7D20\u3002"
  },
  {
    id: "marginalia",
    name: { zh: "\u65C1\u6CE8", en: "Marginalia" },
    description: "\u6B21\u8981\u4FE1\u606F\u653E\u8FDB\u9875\u8FB9\u65C1\u6CE8/\u811A\u6CE8\uFF08\u5E26\u7F16\u53F7\u5F15\u7528\uFF09\uFF0C\u6B63\u6587\u4FDD\u6301\u5E72\u51C0\u3002"
  },
  {
    id: "giant-glyph",
    name: { zh: "\u5DE8\u5B57", en: "Giant glyph" },
    description: "\u4E00\u4E2A\u5DE8\u5927\u7684\u5355\u5B57\u3001\u5355\u5B57\u6BCD\u6216\u5355\u6570\u5B57\u4F5C\u4E3A\u9996\u5C4F\u89C6\u89C9\u951A\u70B9\uFF08\u5360\u89C6\u53E3\u9AD8\u5EA6 40% \u4EE5\u4E0A\uFF09\u3002"
  },
  {
    id: "zero-shadow",
    name: { zh: "\u96F6\u9634\u5F71", en: "Zero shadows" },
    description: "\u5168\u9875\u6CA1\u6709\u4EFB\u4F55 box-shadow / drop-shadow\uFF1B\u5C42\u7EA7\u53EA\u9760\u8FB9\u6846\u3001\u8272\u5757\u548C\u7559\u767D\u3002"
  },
  {
    id: "two-alignments",
    name: { zh: "\u53CC\u5BF9\u9F50", en: "Two alignment systems" },
    description: "\u5DE6\u5BF9\u9F50\u7684\u6587\u5B57\u4E0E\u53F3\u5BF9\u9F50\u7684\u6570\u636E\u5E76\u7F6E\uFF0C\u5F62\u6210\u6E05\u6670\u7684\u4E24\u6761\u5BF9\u9F50\u8F74\u3002"
  },
  {
    id: "no-button-above-fold",
    name: { zh: "\u9996\u5C4F\u65E0\u6309\u94AE", en: "No button above the fold" },
    description: "\u9996\u5C4F\u4E0D\u51FA\u73B0\u4EFB\u4F55\u6309\u94AE\uFF1B\u884C\u52A8\u5165\u53E3\uFF08\u7535\u8BDD\u3001\u9884\u8BA2\u3001\u5730\u5740\uFF09\u5728\u7B2C\u4E8C\u5C4F\u4E4B\u540E\uFF0C\u4EE5\u6587\u5B57\u94FE\u63A5\u6216\u8868\u683C\u884C\u51FA\u73B0\u3002"
  },
  {
    id: "time-as-structure",
    name: { zh: "\u65F6\u95F4\u4E3A\u9AA8", en: "Time as structure" },
    description: "\u7528\u771F\u5B9E\u7684\u65F6\u95F4/\u65E5\u671F\uFF08\u8425\u4E1A\u65F6\u95F4\u3001\u51FA\u7089\u65F6\u523B\u3001\u65E5\u7A0B\uFF09\u4F5C\u4E3A\u9875\u9762\u7684\u4E3B\u7ED3\u6784\u8F74\u3002"
  },
  {
    id: "footer-as-colophon",
    name: { zh: "\u7248\u6743\u9875\u5F0F\u9875\u811A", en: "Footer as colophon" },
    description: "\u9875\u811A\u5199\u6210\u4E66\u7C4D\u7248\u6743\u9875\uFF1A\u5B57\u4F53\u3001\u7EB8\u5F20/\u914D\u8272\u3001\u5370\u6B21\u3001\u5730\u5740\u7B49\uFF0C\u662F\u5168\u9875\u4FE1\u606F\u6700\u5BC6\u7684\u533A\u5757\u3002"
  },
  {
    id: "oversized-rule",
    name: { zh: "\u7C97\u7EBF\u5206\u533A", en: "Oversized rules" },
    description: "\u81F3\u5C11\u4E00\u6761 8px \u4EE5\u4E0A\u7684\u7C97\u7EBF\uFF08\u6216\u53CC\u7EBF\uFF09\u4F5C\u4E3A\u4E3B\u5206\u533A\u624B\u6BB5\uFF0C\u66FF\u4EE3\u7A7A\u767D\u3002"
  }
];

// vendor/hash-design/packages/core/src/mapping.ts
var cachedFingerprint;
function libraryFingerprint() {
  cachedFingerprint ??= sha256Hex(
    JSON.stringify({ ALGORITHM, BRANCHES, VOICES, TWISTS, DENSITIES, SCALES })
  ).slice(0, 12);
  return cachedFingerprint;
}
function normalizeConstraints(c = {}) {
  const n = {
    lightOnly: Boolean(c.lightOnly),
    darkOnly: Boolean(c.darkOnly),
    reducedMotion: Boolean(c.reducedMotion),
    brandColors: (c.brandColors ?? []).map((h) => normalizeHex(h)),
    families: [...new Set(c.families ?? [])].sort(),
    include: [...new Set(c.include ?? [])].sort(),
    exclude: [...new Set(c.exclude ?? [])].sort()
  };
  if (n.lightOnly && n.darkOnly) throw new Error("lightOnly and darkOnly cannot both be set");
  if (n.brandColors.length > 2) throw new Error("At most 2 brand colours are supported (accent, accent2)");
  const known = new Set(BRANCHES.map((b) => b.id));
  for (const id of [...n.include, ...n.exclude]) {
    if (!known.has(id)) throw new Error(`Unknown branch id "${id}". Use list_branches to see valid ids.`);
  }
  return n;
}
function describeConstraints(c) {
  const parts = [];
  if (c.lightOnly) parts.push("light-only");
  if (c.darkOnly) parts.push("dark-only");
  if (c.reducedMotion) parts.push("reduced-motion");
  if (c.brandColors.length) parts.push(`brand=${c.brandColors.join(",")}`);
  if (c.families.length) parts.push(`families=${c.families.join(",")}`);
  if (c.include.length) parts.push(`include=${c.include.join(",")}`);
  if (c.exclude.length) parts.push(`exclude=${c.exclude.join(",")}`);
  return parts.length ? parts.join("; ") : "none";
}
function isDarkPalette(p) {
  return !isLightPaper(p.colors.paper);
}
function paletteCandidates(branch, c) {
  if (c.lightOnly) return branch.palettes.filter((p) => !isDarkPalette(p));
  if (c.darkOnly) return branch.palettes.filter(isDarkPalette);
  return branch.palettes;
}
function branchPool(c) {
  let pool = [...BRANCHES];
  if (c.families.length) pool = pool.filter((b) => c.families.includes(b.family));
  if (c.include.length) pool = pool.filter((b) => c.include.includes(b.id));
  if (c.exclude.length) pool = pool.filter((b) => !c.exclude.includes(b.id));
  if (c.darkOnly) pool = pool.filter((b) => b.palettes.some(isDarkPalette));
  if (pool.length === 0) throw new Error("Constraints leave no design branches to choose from");
  return pool;
}
var hx = (n) => n.toString(16).padStart(2, "0");
function pick(list, byte, dimension, byteIndex, trace, note) {
  const index = byte % list.length;
  const item = list[index];
  trace.push({
    dimension,
    bytes: [byteIndex],
    hex: hx(byte),
    rule: `0x${hx(byte)} = ${byte}; ${byte} mod ${list.length} = ${index}`,
    poolSize: list.length,
    index,
    result: item.id,
    ...note ? { note } : {}
  });
  return item;
}
function primaryBranchIndex(hash, poolSize) {
  const b = hashBytes(hash);
  return (b[0] << 8 | b[1]) % poolSize;
}
function mapDesign(hash, opts = {}) {
  const constraints = normalizeConstraints(opts.constraints);
  const probe = opts.probe ?? 0;
  if (!Number.isInteger(probe) || probe < 0) throw new Error(`probe must be a non-negative integer`);
  const bytes = hashBytes(hash);
  const h = hash.toLowerCase();
  const pool = branchPool(constraints);
  const byte = (i) => bytes[i];
  const trace = [];
  const u16 = byte(0) << 8 | byte(1);
  const primary = u16 % pool.length;
  const index = (primary + probe) % pool.length;
  const branch = pool[index];
  trace.push({
    dimension: "branch",
    bytes: [0, 1],
    hex: `${hx(byte(0))} ${hx(byte(1))}`,
    rule: `0x${hx(byte(0))}${hx(byte(1))} = ${u16}; ${u16} mod ${pool.length} = ${primary}` + (probe ? `; collision \u2192 +${probe} = ${index}` : ""),
    poolSize: pool.length,
    index,
    result: branch.id,
    ...probe ? { note: `primary branch (or its family) already used in this roll; walked forward ${probe} step(s)` } : {}
  });
  const voice = pick(VOICES, byte(2), "voice", 2, trace);
  const layout = pick(branch.layouts, byte(3), "layout", 3, trace);
  const type = pick(branch.type, byte(4), "type", 4, trace);
  const candidates = paletteCandidates(branch, constraints);
  let palette;
  let paletteOverride;
  const filterNote = constraints.lightOnly ? "light-only filter" : constraints.darkOnly ? "dark-only filter" : "";
  const brand = constraints.brandColors;
  if (brand.length) {
    const target = hexToHsl(brand[0]);
    let bestIdx = 0;
    let bestDist = Infinity;
    candidates.forEach((p, i) => {
      const a = hexToHsl(p.colors.accent);
      const d = target.s < 0.12 ? Math.abs(a.l - target.l) * 180 : hueDistance(a.h, target.h);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    const base = candidates[bestIdx];
    paletteOverride = {
      basePaletteId: base.id,
      accent: brand[0],
      ...brand[1] ? { accent2: brand[1] } : {}
    };
    palette = {
      ...base,
      id: `${base.id}+brand`,
      name: `${base.name} (brand override)`,
      colors: { ...base.colors, accent: brand[0], ...brand[1] ? { accent2: brand[1] } : {} }
    };
    trace.push({
      dimension: "palette",
      bytes: [5],
      hex: hx(byte(5)),
      rule: `brand colour ${brand[0]} \u2192 nearest accent hue among ${candidates.length} palette(s) = ${base.id}`,
      poolSize: candidates.length,
      index: bestIdx,
      result: palette.id,
      note: ["byte 5 not used because brand colours were given", filterNote].filter(Boolean).join("; ")
    });
  } else {
    palette = pick(candidates, byte(5), "palette", 5, trace, filterNote || void 0);
  }
  const densityId = branch.densities[byte(6) % branch.densities.length];
  const density = DENSITIES[densityId];
  trace.push({
    dimension: "density",
    bytes: [6],
    hex: hx(byte(6)),
    rule: `0x${hx(byte(6))} = ${byte(6)}; ${byte(6)} mod ${branch.densities.length} = ${byte(6) % branch.densities.length}`,
    poolSize: branch.densities.length,
    index: byte(6) % branch.densities.length,
    result: density.id
  });
  let motion;
  if (constraints.reducedMotion) {
    const ms = (m) => parseFloat(m.duration) * (m.duration.trim().endsWith("ms") ? 1 : 1e3) || 0;
    const sorted = branch.motion.map((m, i) => ({ m, i })).sort((a, b) => ms(a.m) - ms(b.m) || a.i - b.i);
    const chosen = sorted[0];
    motion = chosen.m;
    trace.push({
      dimension: "motion",
      bytes: [7],
      hex: hx(byte(7)),
      rule: `reduced-motion \u2192 stillest option (shortest duration) = ${motion.id}`,
      poolSize: branch.motion.length,
      index: chosen.i,
      result: motion.id,
      note: "byte 7 not used because reduced-motion was requested"
    });
  } else {
    motion = pick(branch.motion, byte(7), "motion", 7, trace);
  }
  const motif = pick(branch.motifs, byte(8), "motif", 8, trace);
  const anchor = pick(branch.anchors, byte(9), "anchor", 9, trace);
  const scaleId = branch.scales[byte(10) % branch.scales.length];
  const scale = SCALES[scaleId];
  trace.push({
    dimension: "scale",
    bytes: [10],
    hex: hx(byte(10)),
    rule: `0x${hx(byte(10))} = ${byte(10)}; ${byte(10)} mod ${branch.scales.length} = ${byte(10) % branch.scales.length}`,
    poolSize: branch.scales.length,
    index: byte(10) % branch.scales.length,
    result: scale.id
  });
  const surface = pick(branch.surfaces, byte(11), "surface", 11, trace);
  const twist = pick(TWISTS, byte(12), "twist", 12, trace);
  return {
    algorithm: ALGORITHM,
    library: libraryFingerprint(),
    hash: h,
    short: shortHash(h),
    probe,
    ref: formatRef(h, probe),
    constraints,
    branch,
    voice,
    layout,
    type,
    palette,
    ...paletteOverride ? { paletteOverride } : {},
    density,
    motion,
    motif,
    anchor,
    scale,
    surface,
    twist,
    trace,
    unusedBytes: h.slice(26)
  };
}
function mapRoll(hashes, constraints = {}) {
  const norm = normalizeConstraints(constraints);
  const pool = branchPool(norm);
  if (hashes.length > pool.length) {
    throw new Error(`Cannot roll ${hashes.length} distinct designs from a pool of ${pool.length} branches`);
  }
  const familyCount = new Set(pool.map((b) => b.family)).size;
  const usedBranches = /* @__PURE__ */ new Set();
  const usedFamilies = /* @__PURE__ */ new Set();
  return hashes.map((hash) => {
    const primary = primaryBranchIndex(hash, pool.length);
    const spread = usedFamilies.size < familyCount;
    let probe = 0;
    for (; ; ) {
      const idx2 = (primary + probe) % pool.length;
      const family = pool[idx2].family;
      if (!usedBranches.has(idx2) && !(spread && usedFamilies.has(family))) break;
      probe++;
    }
    const idx = (primary + probe) % pool.length;
    usedBranches.add(idx);
    usedFamilies.add(pool[idx].family);
    return mapDesign(hash, { probe, constraints: norm });
  });
}
function getBranch(id) {
  return BRANCHES.find((b) => b.id === id);
}

// vendor/hash-design/packages/core/src/brief.ts
function normalizeContent(content = {}) {
  const subject = content.subject?.trim() || "(untitled)";
  const facts = (content.facts ?? []).map((f) => f.trim()).filter(Boolean);
  return { subject, facts, language: content.language ?? detectLanguage(subject, ...facts) };
}
function roll(opts = {}) {
  const count = opts.count ?? 5;
  if (count < 1 || count > 12) throw new Error(`count must be between 1 and 12 (got ${count})`);
  const hashes = opts.hashes ?? rollHashes(count, opts.seed);
  const designs = mapRoll(hashes, opts.constraints);
  const first = designs[0];
  return {
    algorithm: first?.algorithm ?? "hash-design/v1",
    library: first?.library ?? "",
    createdAt: (opts.now ?? /* @__PURE__ */ new Date()).toISOString(),
    source: opts.hashes ? "provided-hashes" : opts.seed !== void 0 ? `seed:${opts.seed}` : "system-random",
    constraints: normalizeConstraints(opts.constraints),
    content: normalizeContent(opts.content),
    designs
  };
}
function reproduce(ref, constraints) {
  return mapDesign(ref.hash, { probe: ref.probe ?? 0, ...constraints ? { constraints } : {} });
}
function fontLine(label, f) {
  if (!f) return `- **${label}**: \u2014`;
  const ital = f.italic ? " + italic" : "";
  const src = f.source === "system" ? " (system font)" : "";
  return `- **${label}**: ${f.family} ${f.weights.join("/")}${ital}${src} \u2014 fallback \`${f.fallback}\``;
}
function swatch(hex) {
  return `\`${hex}\``;
}
function renderBrief(design, content = {}, opts = {}) {
  const c = normalizeContent(content);
  const lang = c.language;
  const b = design.branch;
  const pal = design.palette.colors;
  const fontsUrl = googleFontsUrl(design.type, lang);
  const contrastInfo = contrastReport(pal);
  const scale = typeScale(design);
  const n = opts.number ? `#${opts.number} ` : "";
  const out = [];
  out.push(`# ${n}${b.name.zh} \xB7 ${b.name.en}`);
  out.push("");
  out.push(`> ${lang === "zh" ? b.concept.zh : b.concept.en}`);
  out.push("");
  out.push("| | |");
  out.push("|---|---|");
  out.push(`| hash | \`${design.hash}\` |`);
  out.push(`| ref | \`${design.ref}\` |`);
  out.push(`| algorithm / library | ${design.algorithm} / \`${design.library}\` |`);
  out.push(`| constraints | ${describeConstraints(design.constraints)} |`);
  out.push(`| family | ${b.family} |`);
  out.push(`| references | ${b.references.join("; ")} |`);
  out.push("");
  out.push(
    lang === "zh" ? '**\u8FD9\u4EFD brief \u662F\u51BB\u7ED3\u7684\u6267\u884C\u89C4\u683C\uFF0C\u4E0D\u662F\u7075\u611F\u677F\u3002** \u4E0D\u8981\u66FF\u6362\u5B57\u4F53\u3001\u989C\u8272\u6216\u7248\u5F0F\uFF0C\u4E0D\u8981"\u987A\u624B\u4F18\u5316"\u6210\u4F60\u4E60\u60EF\u7684\u6837\u5B50\u3002\u82E5\u4E0E\u5168\u5C40\u7981\u4EE4\u51B2\u7A81\uFF0C\u4EE5\u7981\u4EE4\u4E3A\u51C6\uFF1B\u82E5 twist \u4E0E\u5206\u652F\u51B2\u7A81\uFF0C\u4EE5\u5206\u652F\u4E3A\u51C6\u5E76\u5728\u9875\u9762\u6CE8\u91CA\u4E2D\u5199\u660E\u3002' : "**This brief is a frozen spec, not a mood board.** Do not swap fonts, colours or layout for ones you prefer. Global bans override everything; if the twist conflicts with the branch, the branch wins (note it in an HTML comment)."
  );
  out.push("");
  if (opts.trace !== false) {
    out.push("## \u6620\u5C04\u8FC7\u7A0B Mapping trace");
    out.push("");
    out.push("| bytes | hex | dimension | rule | \u2192 result |");
    out.push("|---|---|---|---|---|");
    for (const t of design.trace) {
      const note = t.note ? ` _(${t.note})_` : "";
      out.push(
        `| ${t.bytes.join("+")} | \`${t.hex}\` | ${t.dimension} | ${t.rule}${note} | **${t.result}** |`
      );
    }
    out.push(`| 13\u201331 | \`${design.unusedBytes.slice(0, 12)}\u2026\` | (unused) | recorded, not used | \u2014 |`);
    out.push("");
  }
  out.push("## \u5185\u5BB9 Content");
  out.push("");
  out.push(`**Subject:** ${c.subject}`);
  out.push("");
  if (c.facts.length) {
    out.push(
      lang === "zh" ? '\u53EA\u80FD\u4F7F\u7528\u4EE5\u4E0B\u4E8B\u5B9E\u3002\u4E0D\u5F97\u7F16\u9020\u6570\u5B57\u3001\u8BC4\u4EF7\u3001\u5956\u9879\u6216\u5BA2\u6237\uFF1B\u7F3A\u5C11\u7684\u4FE1\u606F\u7559\u7A7A\u6216\u5199"\u5F85\u8865"\u3002' : "Use only these facts. Do not invent numbers, reviews, awards or customers; leave gaps visibly empty."
    );
    out.push("");
    for (const f of c.facts) out.push(`- ${f}`);
  } else {
    out.push(
      '_(no facts supplied \u2014 use clearly marked placeholders such as "\u3010\u5F85\u8865\uFF1A\u8425\u4E1A\u65F6\u95F4\u3011", never invented data)_'
    );
  }
  out.push("");
  out.push(`## \u6587\u6848\u8BED\u6C14 Voice \u2014 ${design.voice.name.zh} / ${design.voice.name.en}`);
  out.push("");
  out.push(design.voice.description);
  out.push("");
  out.push(`Devices: ${design.voice.devices.join(" \xB7 ")}`);
  out.push("");
  out.push(`Example register (do not copy, match the register): \u201C${design.voice.example}\u201D`);
  out.push("");
  out.push(`## \u7248\u5F0F Layout \u2014 ${design.layout.name}`);
  out.push("");
  out.push(design.layout.description);
  out.push("");
  out.push(`- **Grid:** ${design.layout.grid}`);
  out.push(`- **Branch grid token:** ${b.tokens.grid}`);
  out.push("");
  out.push("Section order (top \u2192 bottom):");
  out.push("");
  design.layout.structure.forEach((s, i) => out.push(`${i + 1}. ${s}`));
  out.push("");
  out.push(`**First-screen anchor \u2014 ${design.anchor.name}:** ${design.anchor.description}`);
  out.push("");
  out.push(`## \u5B57\u4F53 Typography \u2014 ${design.type.name}`);
  out.push("");
  out.push(fontLine("Display", design.type.display));
  out.push(fontLine("Body", design.type.body));
  out.push(fontLine("Mono", design.type.mono));
  out.push(`- **CJK**: display ${design.type.cjk.display}, body ${design.type.cjk.body}`);
  out.push(`- **Setting rules:** ${design.type.notes}`);
  out.push("");
  out.push(
    `Scale: **${design.scale.name}** on a ${design.density.baseSize}px base \u2192 ` + scale.map((s) => `${s.step}: ${s.px}px`).join(" \xB7 ")
  );
  out.push("");
  if (fontsUrl) {
    out.push("```html");
    out.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
    out.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
    out.push(`<link rel="stylesheet" href="${fontsUrl}">`);
    out.push("```");
    out.push("");
  }
  out.push(`## \u914D\u8272 Colour \u2014 ${design.palette.name}`);
  out.push("");
  out.push("| token | hex | role |");
  out.push("|---|---|---|");
  out.push(`| paper | ${swatch(pal.paper)} | page background |`);
  out.push(`| ink | ${swatch(pal.ink)} | primary text |`);
  out.push(`| muted | ${swatch(pal.muted)} | secondary text |`);
  out.push(`| accent | ${swatch(pal.accent)} | primary accent |`);
  out.push(`| accent2 | ${swatch(pal.accent2)} | secondary accent |`);
  out.push(`| rule | ${swatch(pal.rule)} | lines, borders |`);
  out.push(`| panel | ${swatch(pal.panel)} | secondary background |`);
  out.push("");
  out.push(`**Usage:** ${design.palette.usage}`);
  if (design.paletteOverride) {
    out.push("");
    out.push(
      `**Brand override:** base palette \`${design.paletteOverride.basePaletteId}\`; accent \u2192 ${design.paletteOverride.accent}` + (design.paletteOverride.accent2 ? `, accent2 \u2192 ${design.paletteOverride.accent2}` : "") + ". Check the contrast table below before using brand colours for text."
    );
  }
  out.push("");
  out.push("Contrast (WCAG):");
  out.push("");
  for (const l of contrastInfo.lines) out.push(`- ${l.pair}: **${l.ratio}:1** \u2014 ${l.verdict}`);
  out.push("");
  out.push(`## \u5BC6\u5EA6 Density \u2014 ${design.density.name.zh} / ${design.density.name.en}`);
  out.push("");
  out.push(
    `${design.density.description} Base ${design.density.baseSize}px, line-height ${design.density.lineHeight}, spacing unit ${design.density.unit}px, section gap ${design.density.sectionGap}px, max width ${design.density.maxWidth}px.`
  );
  out.push("");
  out.push("## \u5F62\u72B6\u4E0E\u5C42\u6B21 Shape & depth");
  out.push("");
  out.push(`- **Radius:** ${b.tokens.radius}`);
  out.push(`- **Borders:** ${b.tokens.border}`);
  out.push(`- **Shadow:** ${b.tokens.shadow}`);
  out.push("");
  out.push(`## \u6750\u8D28 Surface \u2014 ${design.surface.name}`);
  out.push("");
  out.push(design.surface.description);
  if (design.surface.css) {
    out.push("");
    out.push("```css");
    out.push(design.surface.css);
    out.push("```");
  }
  out.push("");
  out.push(`## \u6BCD\u9898 Motif \u2014 ${design.motif.name}`);
  out.push("");
  out.push(design.motif.description);
  out.push("");
  out.push(`## \u52A8\u6548 Motion \u2014 ${design.motion.name}`);
  out.push("");
  out.push(design.motion.description);
  out.push("");
  out.push(
    `- duration \`${design.motion.duration}\`, easing \`${design.motion.easing}\`
- prefers-reduced-motion: ${design.motion.reduced}`
  );
  out.push("");
  out.push(`## \u53D8\u6570 Twist \u2014 ${design.twist.name.zh} / ${design.twist.name.en}`);
  out.push("");
  out.push(design.twist.description);
  out.push("");
  out.push("## \u5FC5\u987B Must");
  out.push("");
  for (const m of b.must) out.push(`- ${m}`);
  out.push("");
  out.push("## \u4E0D\u8981 Must not (branch)");
  out.push("");
  for (const m of b.mustNot) out.push(`- ${m}`);
  out.push("");
  out.push("## \u5168\u5C40\u7981\u4EE4 Global bans");
  out.push("");
  for (const ban of BANS) out.push(`- **${ban.title.zh}** (${ban.id}, ${ban.severity}): ${ban.detail}`);
  out.push("");
  out.push("## tokens.css");
  out.push("");
  out.push("```css");
  out.push(tokensCss(design, lang));
  out.push("```");
  out.push("");
  out.push("## \u4EA4\u4ED8\u524D\u81EA\u68C0 Before you ship");
  out.push("");
  out.push(
    `- [ ] Fonts on the page are exactly: ${design.type.display.family} / ${design.type.body.family}${design.type.mono ? ` / ${design.type.mono.family}` : ""}${lang === "zh" ? ` (+ ${design.type.cjk.display} / ${design.type.cjk.body})` : ""}`
  );
  out.push(`- [ ] Every colour on the page comes from the 7 palette tokens above`);
  out.push(`- [ ] First screen is the "${design.anchor.name}" anchor, in the "${design.layout.name}" layout`);
  out.push(`- [ ] Copy is written in the "${design.voice.name.en}" voice using only the facts`);
  out.push(`- [ ] Twist "${design.twist.name.en}" is visibly applied`);
  out.push(
    `- [ ] \`critique_page\` (or \`hash-design critique --brief ${design.ref}\`) reports no critical/major findings`
  );
  out.push("");
  return out.join("\n");
}
function briefJson(design, content = {}) {
  const c = normalizeContent(content);
  const lang = c.language;
  return {
    ref: design.ref,
    hash: design.hash,
    short: design.short,
    probe: design.probe,
    algorithm: design.algorithm,
    library: design.library,
    constraints: design.constraints,
    content: c,
    branch: {
      id: design.branch.id,
      name: design.branch.name,
      family: design.branch.family,
      concept: design.branch.concept,
      references: design.branch.references,
      tokens: design.branch.tokens,
      must: design.branch.must,
      mustNot: design.branch.mustNot
    },
    voice: design.voice,
    layout: design.layout,
    anchor: design.anchor,
    type: design.type,
    fonts: { stacks: fontStacks(design.type, lang), googleFontsUrl: googleFontsUrl(design.type, lang) },
    palette: design.palette,
    paletteOverride: design.paletteOverride ?? null,
    contrast: contrastReport(design.palette.colors),
    density: design.density,
    scale: { ...design.scale, steps: typeScale(design) },
    motion: design.motion,
    motif: design.motif,
    surface: design.surface,
    twist: design.twist,
    bans: BANS.map((b) => b.id),
    tokensCss: tokensCss(design, lang),
    trace: design.trace
  };
}
function designSlug(design, index) {
  return `${String(index + 1).padStart(2, "0")}-${design.branch.id}`;
}
function rollJson(r) {
  return {
    algorithm: r.algorithm,
    library: r.library,
    createdAt: r.createdAt,
    source: r.source,
    constraints: r.constraints,
    content: r.content,
    designs: r.designs.map((d, i) => ({ number: i + 1, slug: designSlug(d, i), ...briefJson(d, r.content) }))
  };
}

// vendor/hash-design/packages/core/src/catalog.ts
function renderBranchList(opts = {}) {
  const list = opts.family ? BRANCHES.filter((b) => b.family === opts.family) : BRANCHES;
  const out = [
    `${list.length} branches${opts.family ? ` in family "${opts.family}"` : ""} (library order = mapping order)`,
    "",
    "| # | id | \u4E2D\u6587 | English | family | keywords |",
    "|---|---|---|---|---|---|"
  ];
  for (const b of list) {
    const idx = BRANCHES.indexOf(b);
    out.push(
      `| ${idx} | \`${b.id}\` | ${b.name.zh} | ${b.name.en} | ${b.family} | ${b.keywords.slice(0, 4).join(" \xB7 ")} |`
    );
  }
  return out.join("\n");
}
function renderBranch(b) {
  const out = [];
  out.push(`# ${b.name.zh} \xB7 ${b.name.en} (\`${b.id}\`)`);
  out.push("");
  out.push(`family: **${b.family}** \xB7 library index ${BRANCHES.indexOf(b)}`);
  out.push("");
  out.push(`> ${b.concept.zh}`);
  out.push(">");
  out.push(`> ${b.concept.en}`);
  out.push("");
  out.push(`**References:** ${b.references.join("; ")}`);
  out.push("");
  out.push(`**Keywords:** ${b.keywords.join(" \xB7 ")}`);
  out.push("");
  out.push("## Tokens");
  out.push("");
  out.push(`- grid: ${b.tokens.grid}`);
  out.push(`- radius: ${b.tokens.radius}`);
  out.push(`- border: ${b.tokens.border}`);
  out.push(`- shadow: ${b.tokens.shadow}`);
  out.push("");
  out.push("## Layouts (byte 3)");
  for (const l of b.layouts) {
    out.push("");
    out.push(`### ${l.name} (\`${l.id}\`)`);
    out.push(l.description);
    out.push(`- grid: ${l.grid}`);
    l.structure.forEach((s, i) => out.push(`${i + 1}. ${s}`));
  }
  out.push("");
  out.push("## Type (byte 4)");
  out.push("");
  for (const t of b.type) {
    const mono = t.mono ? ` \xB7 mono ${t.mono.family}` : "";
    out.push(
      `- **${t.name}** (\`${t.id}\`): display ${t.display.family} ${t.display.weights.join("/")} \xB7 body ${t.body.family} ${t.body.weights.join("/")}${mono} \xB7 CJK ${t.cjk.display} / ${t.cjk.body} \u2014 ${t.notes}`
    );
  }
  out.push("");
  out.push("## Palettes (byte 5)");
  out.push("");
  for (const p of b.palettes) {
    const c = p.colors;
    out.push(
      `- **${p.name}** (\`${p.id}\`): paper \`${c.paper}\` ink \`${c.ink}\` muted \`${c.muted}\` accent \`${c.accent}\` accent2 \`${c.accent2}\` rule \`${c.rule}\` panel \`${c.panel}\` \u2014 ${p.usage}`
    );
  }
  out.push("");
  out.push(`## Density (byte 6): ${b.densities.map((d) => `${d} (${DENSITIES[d].name.zh})`).join(" \xB7 ")}`);
  out.push("");
  out.push("## Motion (byte 7)");
  out.push("");
  for (const m of b.motion)
    out.push(
      `- **${m.name}** (\`${m.id}\`, ${m.duration} ${m.easing}): ${m.description} Reduced: ${m.reduced}`
    );
  out.push("");
  out.push("## Motifs (byte 8)");
  out.push("");
  for (const m of b.motifs) out.push(`- **${m.name}** (\`${m.id}\`): ${m.description}`);
  out.push("");
  out.push("## Anchors (byte 9)");
  out.push("");
  for (const m of b.anchors) out.push(`- **${m.name}** (\`${m.id}\`): ${m.description}`);
  out.push("");
  out.push(`## Scale (byte 10): ${b.scales.map((s) => SCALES[s].name).join(" \xB7 ")}`);
  out.push("");
  out.push("## Surfaces (byte 11)");
  out.push("");
  for (const s of b.surfaces)
    out.push(`- **${s.name}** (\`${s.id}\`): ${s.description}${s.css ? ` \u2014 \`${s.css}\`` : ""}`);
  out.push("");
  out.push("## Must");
  out.push("");
  for (const m of b.must) out.push(`- ${m}`);
  out.push("");
  out.push("## Must not");
  out.push("");
  for (const m of b.mustNot) out.push(`- ${m}`);
  return out.join("\n");
}
var FAMILY_ZH = {
  print: "\u5370\u5237\u54C1",
  document: "\u6587\u6863/\u7968\u636E",
  signage: "\u6807\u8BC6/\u62DB\u724C",
  screen: "\u5C4F\u5E55/\u4EEA\u5668",
  craft: "\u624B\u4F5C/\u4E1C\u65B9",
  modernist: "\u73B0\u4EE3\u4E3B\u4E49"
};
function renderBranchCatalog() {
  const out = [];
  out.push("<!-- GENERATED by `npm run sync` from packages/core/src/data \u2014 do not edit by hand -->");
  out.push("");
  out.push(`# \u5206\u652F\u5E93 Branch library (${BRANCHES.length})`);
  out.push("");
  out.push(
    "\u6BCF\u4E2A\u5206\u652F\u90FD\u662F\u4E00\u4E2A\u771F\u5B9E\u4E16\u754C\u7684\u8BBE\u8BA1\u95E8\u7C7B\uFF0C\u5E26\u5B8C\u6574 token\u3002\u54C8\u5E0C\u7684\u7B2C 0\u20131 \u5B57\u8282\u9009\u5206\u652F\uFF0C\u7B2C 3\u201311 \u5B57\u8282\u5728\u5206\u652F\u5185\u9009\u5177\u4F53\u9009\u9879\u3002\u987A\u5E8F\u5373\u6620\u5C04\u987A\u5E8F\u3002"
  );
  out.push("");
  out.push(renderBranchList());
  out.push("");
  for (const b of BRANCHES) {
    out.push(`## ${BRANCHES.indexOf(b)}. ${b.name.zh} \xB7 ${b.name.en} \u2014 \`${b.id}\``);
    out.push("");
    out.push(`*${FAMILY_ZH[b.family]} / ${b.family}* \u2014 ${b.concept.zh}`);
    out.push("");
    out.push(`- **\u53C2\u8003 References:** ${b.references.join("; ")}`);
    out.push(`- **\u5B57\u4F53 Type:** ${b.type.map((t) => `${t.display.family} + ${t.body.family}`).join(" \xB7 ")}`);
    out.push(
      `- **\u914D\u8272 Palettes:** ${b.palettes.map((p) => `${p.name} (\`${p.colors.paper}\` \`${p.colors.ink}\` \`${p.colors.accent}\`)`).join(" \xB7 ")}`
    );
    out.push(`- **\u7248\u5F0F Layouts:** ${b.layouts.map((l) => l.name).join(" \xB7 ")}`);
    out.push(`- **\u9996\u5C4F\u951A\u70B9 Anchors:** ${b.anchors.map((a) => a.name).join(" \xB7 ")}`);
    out.push(`- **Tokens:** radius \u2014 ${b.tokens.radius} / shadow \u2014 ${b.tokens.shadow}`);
    out.push("");
  }
  return out.join("\n");
}
export {
  BANS,
  BRANCHES,
  briefJson,
  fontStacks,
  getBranch,
  googleFontsUrl,
  libraryFingerprint,
  normalizeConstraints,
  parseRef,
  randomHash,
  renderBranch,
  renderBranchCatalog,
  renderBrief,
  reproduce,
  roll,
  rollJson,
  seededHash,
  tokensCss
};
