import { COLOUR_FAMILIES, colorCoordinates, contrast, oklchHex, textOn } from './color.js';
import { between, clamp, pick } from './util.js';
import { presetById } from './presets.js';
import { UPSTREAM_PALETTES } from './upstream-palettes.js';

export const UPSTREAM_BY_DIRECTION = {
  edition: 'risograph-duotone', atelier: 'warm-handmade', enamel: 'hk-shop-sign', botanical: 'herbarium-specimen',
  blueprint: 'engineering-plate', textile: 'warm-handmade', journal: 'broadsheet-newspaper', play: 'memphis-pop'
};
const canvasMode = hex => colorCoordinates(hex).l < 0.57 ? 'dark' : 'light';

export function swatchChoices(id, mode) {
  const preset = presetById(id);
  const upstream = preset?.upstream ?? UPSTREAM_BY_DIRECTION[id];
  const options = Object.values(UPSTREAM_PALETTES[upstream] ?? {});
  if (preset) options.unshift(preset.palette);
  return options.filter(palette => mode === 'mixed' || canvasMode(palette[0]) === mode);
}

function canvasFamily(hue, chroma, mode) {
  if (chroma < 0.047) return 'neutral';
  const difference = family => {
    const mid = (family.hue[0] + family.hue[1]) / 2;
    return Math.abs(((hue - mid + 540) % 360) - 180);
  };
  return COLOUR_FAMILIES.filter(family => family.mode === mode)
    .sort((first, second) => difference(first) - difference(second))[0].id;
}

export function curatedPalette(id, request, random, fixed) {
  const preset = presetById(id);
  const options = swatchChoices(id, request.mode);
  if (!fixed && !options.length) return undefined;
  const swatches = fixed ? preset.palette : pick(random, options);
  let [paper, ink, accent, accent2, panel] = swatches;
  const mode = canvasMode(paper);
  if (!fixed) {
    // Move the hues together to preserve the relationship of the source inks.
    const hueOffset = between(random, -8, 8);
    [paper, ink, accent, accent2, panel] = swatches.map(hex => {
      const { l, c, h } = colorCoordinates(hex);
      return oklchHex(clamp(l + between(random, -0.021, 0.021), 0.10, 0.98), c, h + hueOffset);
    });
    const { l, c, h } = colorCoordinates(paper);
    if (request.colorfulness === 'rich') {
      const family = COLOUR_FAMILIES.find(item => item.id === preset?.colour);
      const hue = c < 0.035 && family ? (family.hue[0] + family.hue[1]) / 2 + hueOffset : h;
      paper = oklchHex(clamp(l, mode === 'dark' ? 0.34 : 0.73, mode === 'dark' ? 0.55 : 0.90), Math.max(c, 0.082), hue);
    } else if (request.colorfulness === 'neutral') {
      paper = oklchHex(clamp(l, mode === 'dark' ? 0.18 : 0.81, mode === 'dark' ? 0.49 : 0.97), 0.017, h);
    }
  }
  accent = request.brand ?? accent;
  const { h: hue, c: chroma } = colorCoordinates(paper);
  const accentHue = colorCoordinates(accent).h;
  if (contrast(ink, paper) < 4.5) ink = textOn(paper, hue, 0.025, 7);
  return {
    mode, family: canvasFamily(hue, chroma, mode), hue, chroma,
    harmony: (accentHue - hue + 360) % 360,
    paper, ink, accent, accent2, panel,
    muted: textOn(paper, hue, 0.02, 4.7),
    accentInk: contrast(accent, paper) >= 4.5 ? accent : textOn(paper, accentHue, 0.09, 4.6),
    panelInk: contrast(ink, panel) >= 4.5 ? ink : textOn(panel, colorCoordinates(panel).h, 0.025, 7),
    rule: textOn(paper, hue, 0.025, 3),
    onAccent: textOn(accent, accentHue, 0.025, 4.6)
  };
}
