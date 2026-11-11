// Order and names follow the supplied 21-style comparison video.
// Palette roles: canvas, ink, accent, secondary accent, surface.
const definitions = [
  ['cyberpunk', '赛博朋克', 'Cyberpunk', 'cards', 'industrial', 'neon', 'grid', 'wine', 0,
    ['#1c1032','#fff2ff','#ecff5b','#ff45bc','#2f194a'], '霓虹轮廓、信号图和斜切菜单卡'],
  ['retro-terminal', '复古终端', 'Retro Terminal', 'menu', 'technical', 'terminal', 'fine-lines', 'jade', 0,
    ['#0a0f0a','#66f28a','#c8ffd4','#1f6b34','#0f1a11'], '磷光绿、扫描线和命令式菜单', 'terminal-phosphor'],
  ['skeuomorphism', '拟物', 'Skeuomorphism', 'menu', 'classic', 'ceramic', 'grain', 'umber', 5,
    ['#3b251c','#fff0d4','#ddb16f','#b85e45','#243a31'], '暖木菜单板、压边纸签与陶瓷杯'],
  ['glassmorphism', '玻璃拟态', 'Glassmorphism', 'menu', 'architect', 'lens', 'none', 'ocean', 22,
    ['#123945','#f2fffc','#a6f2db','#efab77','#20505a'], '彩色背景映在带细边的磨砂玻璃上'],
  ['brutalism', '粗野主义', 'Brutalism', 'menu', 'poster', 'none', 'none', 'citrus', 0,
    ['#f4f1df','#161714','#ffdf24','#f74832','#fffdf5'], '硬边分栏和大字号的菜单信息', 'raw-brutalist'],
  ['pop-art', '波普艺术', 'Pop Art', 'menu', 'poster', 'pop', 'halftone', 'citrus', 0,
    ['#ffcc3b','#241b28','#ff5395','#315bd8','#fdf4db'], '套色印刷网点、重描边和漫画价格章'],
  ['memphis', '孟菲斯', 'Memphis', 'menu', 'geometric', 'memphis', 'none', 'apricot', 3,
    ['#fff1bd','#271e39','#ed7cae','#574ac9','#8bdfc7'], '有限的圆、波纹和斜纹单元组成节奏', 'memphis-pop'],
  ['editorial', '杂志排版', 'Editorial', 'menu', 'editorial', 'editorial-cup', 'grain', 'apricot', 0,
    ['#efe7d6','#1e1a14','#2f5d50','#c27b2a','#e3d8c0'], '衬线标题、细线分栏和一幅杯影', 'editorial-magazine'],
  ['swiss', '瑞士风格', 'Swiss Style', 'menu', 'geometric', 'swiss-mark', 'none', 'neutral', 0,
    ['#f7f6f2','#111111','#e2001a','#8f8d87','#e8e6df'], '严格网格、无衬线标题和红色圆点', 'swiss-grid'],
  ['claymorphism', '黏土拟态', 'Claymorphism', 'cards', 'rounded', 'clay-cup', 'none', 'apricot', 28,
    ['#fce4d9','#51302d','#ed8c73','#b49de8','#fff2e8'], '柔软圆角、漫反射高光和黏土杯'],
  ['neumorphism', '新拟态', 'Neumorphism', 'cards', 'geometric', 'ceramic', 'none', 'aqua', 24,
    ['#dce7ec','#243946','#53756c','#aab9c6','#dce7ec'], '同色表面上的凸起杯盘和凹陷双影'],
  ['y2k', '千禧 Y2K', 'Y2K Aesthetic', 'cards', 'cjk-condensed', 'chrome', 'none', 'lilac', 16,
    ['#e4d8fb','#382251','#5c39bd','#f38acf','#f6ebff'], '虹彩镀铬、胶囊按钮和老式窗口框'],
  ['pixel-art', '像素风', 'Pixel Art', 'cards', 'technical', 'pixel-counter', 'none', 'pistachio', 0,
    ['#f4e8b9','#263b32','#b74531','#6c9b72','#fff4d8'], '像素咖啡吧、方角与分格菜单'],
  ['neubrutalism', '新粗野主义', 'Neubrutalism', 'cards', 'geometric', 'pop', 'dots', 'pistachio', 3,
    ['#fff3cd','#1c2723','#ffdc56','#ff83a9','#a5e9cd'], '亮色模块、厚描边和硬投影'],
  ['bauhaus', '包豪斯', 'Bauhaus', 'cards', 'geometric', 'bauhaus-cup', 'none', 'citrus', 0,
    ['#f1ece0','#1b1b1b','#d6261c','#1f4fa3','#f2c21b'], '圆、方、三角与三原色沿网格对齐', 'bauhaus-primary'],
  ['vaporwave', '蒸汽波', 'Vaporwave', 'cards', 'cjk-condensed', 'sunset', 'none', 'lilac', 0,
    ['#342061','#fff4ff','#6ef6db','#f96ec3','#543483'], '粉紫落日、透视地平线与复古屏幕'],
  ['aurora', '极光渐变', 'Aurora Gradient', 'center', 'architect', 'none', 'none', 'ocean', 18,
    ['#102944','#effbff','#91eee3','#ad9ff7','#203957'], '流动光幕和高对比中央标题'],
  ['art-deco', '装饰艺术', 'Art Deco', 'center', 'deco', 'deco-fan', 'none', 'jade', 0,
    ['#102923','#fff2ce','#e0bb69','#6aa28e','#193a30'], '黄铜细线、对称放射纹与阶梯边框', 'art-deco'],
  ['sci-fi-hud', '科幻 HUD 界面', 'Sci-Fi HUD', 'center', 'instrument', 'reticle', 'grid', 'ocean', 0,
    ['#10303a','#d9fff9','#72e4dc','#f2bd72','#17434c'], '坐标网格、读数框与取景器刻度', 'instrument-panel'],
  ['bento', '便当盒布局', 'Bento Grid', 'bento', 'humanist', 'ceramic', 'none', 'jade', 20,
    ['#f3ecd9','#26332a','#bc593e','#edc26b','#244437'], '主标题跨行，菜单用不同大小的格子组成'],
  ['new-chinese', '新中式', 'New Chinese Style', 'scroll', 'cjk-brush', 'ink-landscape', 'fibres', 'apricot', 0,
    ['#f2ecdf','#1b1a17','#b8321f','#8c8576','#e4dac5'], '竖排书法、圆窗山水和朱砂印记', 'ink-and-seal']
];

export const PRESETS = definitions.map(([id, zh, en, layout, font, graphic, texture, colour, radius, palette, role, upstream]) => ({
  id, name: { zh, en }, layout, font, graphic, texture, colour, radius, palette, role, upstream: upstream ?? null
}));
export const presetById = id => PRESETS.find(preset => preset.id === id);
