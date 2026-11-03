# Visual direction / 视觉规则

v0.2.0 is an art-direction revision. Its acceptance criterion is a coherent rendered design, not a large count of different parameter hashes.

## The problem in v0.1

Backgrounds were sampled at almost-white or almost-black lightness with very little chroma. Most visual difference lived in the accent colour. Fonts, graphics and layouts were selected independently. Graphic operators could then receive a mirrored or rotated translucent duplicate. This produced numerous specifications with weak visual differences and unmotivated ornament.

## The v0.2 hierarchy

1. Choose a visual language with a concrete material/graphic logic.
2. Choose colours from that language's allowed colour families, then generate actual continuous OKLCH values. A coloured ground is a major area, not an accent swatch.
3. Select compatible font roles, a supported spatial arrangement and a graphic with a defined purpose.
4. Construct one subject or one repeat system. Generate its meaningful internal parameters; do not pile unrelated shapes on top.
5. Apply the corresponding material treatment and render it on web and PowerPoint.
6. Compare the actual outputs for hierarchy, coherence, graphic purpose, colour-area balance, content fit and craft. Rule and distance checks remain engineering checks only.

## Current visual grammars

| Grammar | Graphic purpose | Relationships that must hold |
|---|---|---|
| Colour edition / 套色版画 | One print emblem | Two inks on coloured stock, limited registration offset, forceful display type |
| Paper atelier / 剪纸工坊 | One cut-paper study | Three connected paper forms, paper edge/shadow, a caption block |
| Enamel sign / 珐琅招牌 | Name and sign frame | Main typography, nested border and one small ornament; no competing hero illustration |
| Botanical folio / 植物图鉴 | One specimen-like plant | Alternating tapered leaves attached to the exact same curved stem, fine veins and a plate border; not a botanical identification claim |
| Cyanotype study / 蓝晒图纸 | One constructed form | Blue/cyan colour range, projection lines that refer to the same object, precise type and grid |
| Woven rhythm / 织物图样 | A coherent repeat | One warp/weft or tile unit, consistent direction and selvedge |
| Editorial colour / 艺术刊物 | Typography as image | Large editorial title, columns/rules and one secondary publisher-style mark |
| Constructed play / 几何游乐 | A modular composition | A shared axis, limited geometric units, strong colour relationships |

These are finite curated grammars, not eight magically unlimited art movements. Continuous colours, proportions, type metrics, meaningful graphic parameters and alternative compatible arrangements produce variants. Expanding meaningful visual variety requires designing and reviewing additional grammars, not multiplying random numbers.

## Colour-area policy

The default `rich` mode samples twelve chromatic canvas families. Lightness and chroma ranges deliberately avoid near-white and near-black defaults. Different colour families are used within an unconstrained five-direction set. `balanced` can include neutral stocks; `neutral` explicitly requests a restrained ground. The separate light/dark preference controls luminance, not whether the canvas is colourful.

Text colour is selected for its actual background. `panelInk` is checked against `panel`, in addition to main-text, secondary-text and button pairs. Readability constraints do not require a black/white canvas.

Auxiliary colours obey direction-specific relationships. A botanical plate uses sage foliage and a warm seed ink; a cyanotype uses related linework and one ochre annotation ink; an enamel sign uses one warm sign ink for its ornament; a woven study uses related yarn colours. The palette is not a set of unrelated independently sampled swatches.

## Validation limits

Regression tests check actual canvas chroma/lightness and compatible type/graphic/material choices. They cannot decide whether a design is elegant. Screenshots and actual PPTX renders are therefore the primary review artifacts. No benchmark count or generated ID should be presented as evidence of beautiful, original or human-distinct styles.
