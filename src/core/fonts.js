// Open-source font families; fonts are referenced, not redistributed or embedded.
export const FONTS = [
  { id: 'literary', display: 'Lora', body: 'Source Sans 3', cjk: 'Noto Serif SC', kind: 'serif', weight: 600 },
  { id: 'editorial', display: 'Bodoni Moda', body: 'Manrope', cjk: 'Noto Serif SC', kind: 'serif', weight: 600 },
  { id: 'humanist', display: 'Fraunces', body: 'Source Sans 3', cjk: 'Noto Serif SC', kind: 'serif', weight: 600 },
  { id: 'classic', display: 'Libre Baskerville', body: 'Lato', cjk: 'Noto Serif SC', kind: 'serif', weight: 700 },
  { id: 'geometric', display: 'Space Grotesk', body: 'DM Sans', cjk: 'Noto Sans SC', kind: 'sans', weight: 700 },
  { id: 'architect', display: 'Outfit', body: 'Manrope', cjk: 'Noto Sans SC', kind: 'sans', weight: 600 },
  { id: 'rounded', display: 'Nunito Sans', body: 'Nunito Sans', cjk: 'Noto Sans SC', kind: 'sans', weight: 800 },
  { id: 'industrial', display: 'Barlow Condensed', body: 'Barlow', cjk: 'Noto Sans SC', kind: 'condensed', weight: 600 },
  { id: 'poster', display: 'Archivo Black', body: 'Archivo', cjk: 'Noto Sans SC', kind: 'condensed', weight: 400 },
  { id: 'technical', display: 'IBM Plex Mono', body: 'IBM Plex Sans', cjk: 'Noto Sans SC', kind: 'mono', weight: 600 },
  { id: 'instrument', display: 'Space Mono', body: 'DM Sans', cjk: 'Noto Sans SC', kind: 'mono', weight: 700 },
  { id: 'book', display: 'Cormorant Garamond', body: 'Source Sans 3', cjk: 'Noto Serif SC', kind: 'serif', weight: 600 },
  { id: 'cjk-literary', display: 'ZCOOL XiaoWei', body: 'Source Sans 3', cjk: 'ZCOOL XiaoWei', kind: 'serif', weight: 400 },
  { id: 'cjk-condensed', display: 'ZCOOL QingKe HuangYou', body: 'Barlow', cjk: 'ZCOOL QingKe HuangYou', kind: 'condensed', weight: 400 },
  { id: 'cjk-playful', display: 'ZCOOL KuaiLe', body: 'Nunito Sans', cjk: 'ZCOOL KuaiLe', kind: 'handwritten', weight: 400 },
  { id: 'cjk-brush', display: 'Ma Shan Zheng', body: 'Source Sans 3', cjk: 'Ma Shan Zheng', kind: 'handwritten', weight: 400 }
];
export function fontUrl(font) {
  const families = [...new Set([font.display, font.body, font.cjk])];
  return 'https://fonts.googleapis.com/css2?' + families.map(f => `family=${encodeURIComponent(f).replace(/%20/g, '+')}`).join('&') + '&display=swap';
}
