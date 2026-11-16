import type { Ban } from '../types.js';

/**
 * Font families that signal "default AI page". Matching is case-insensitive on the family name.
 * Branch data must never use these (enforced by tests) and critique_page flags them.
 */
export const BANNED_FONTS: readonly string[] = [
  'Inter',
  'Inter Tight',
  'Inter Display',
  'Roboto',
  'Roboto Flex',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Nunito',
  'Nunito Sans',
  'Plus Jakarta Sans',
  'Manrope',
  'DM Sans',
  'Outfit',
  'Figtree',
  'Geist',
  'Urbanist',
  'Sora',
  'Lexend',
  'Raleway',
  'Work Sans',
  'Space Grotesk',
];

/** Marketing filler words. English matched as whole words, case-insensitive. */
export const BUZZWORDS_EN: readonly string[] = [
  'unlock',
  'unleash',
  'seamless',
  'seamlessly',
  'supercharge',
  'elevate',
  'empower',
  'revolutionize',
  'revolutionary',
  'effortless',
  'effortlessly',
  'next-level',
  'game-changer',
  'game-changing',
  'cutting-edge',
  'leverage',
  'synergy',
  'all-in-one',
  'world-class',
  'best-in-class',
  'transform your',
  'reimagine',
  'reimagined',
  'harness the power',
  'take it to the next level',
  'skyrocket',
  'streamline',
  'robust',
  'delightful',
];

/** Chinese marketing filler. Matched as substrings. */
export const BUZZWORDS_ZH: readonly string[] = [
  '赋能',
  '无缝',
  '一站式',
  '极致体验',
  '颠覆',
  '引领未来',
  '全方位',
  '助力',
  '释放潜能',
  '开启全新',
  '开启你的',
  '重新定义',
  '智慧化',
  '降本增效',
  '打造极致',
  '匠心打造',
  '品质生活',
  '尽在掌握',
];

/**
 * Global bans. Every generated brief copies this list verbatim.
 * IDs are stable: critique rules reference them.
 */
export const BANS: readonly Ban[] = [
  {
    id: 'generic-sans',
    title: { zh: '禁用 Inter 及同类默认无衬线', en: 'No Inter-class default sans' },
    detail: `不得使用 ${BANNED_FONTS.join(' / ')}，也不得只写 system-ui / sans-serif 当作"设计选择"。字体必须来自 brief 指定的字体对。`,
    severity: 'critical',
    detectable: true,
  },
  {
    id: 'purple-blue-gradient',
    title: { zh: '禁用紫蓝渐变', en: 'No purple-to-blue gradients' },
    detail:
      '禁止紫/靛/蓝系渐变背景、渐变文字（background-clip:text）、模糊彩色光斑（mesh blob / glow orb）。需要渐变时只能用 brief 调色板内的颜色，且必须有材质理由（如油墨叠印、日晒褪色）。',
    severity: 'critical',
    detectable: true,
  },
  {
    id: 'centered-hero-two-buttons',
    title: { zh: '禁用居中 hero + 双按钮', en: 'No centered hero with two buttons' },
    detail:
      '禁止"居中大标题 + 一行副标题 + 主按钮/幽灵按钮并排"的首屏。首屏结构必须来自 brief 的 layout 与 anchor。',
    severity: 'critical',
    detectable: true,
  },
  {
    id: 'identical-cards',
    title: { zh: '禁用三张同款卡片', en: 'No row of identical feature cards' },
    detail:
      '禁止 3/4/6 张结构相同的"图标 + 标题 + 两行说明"卡片排成一行。信息分组要用 brief 指定的版式手段（表格、清单、编号条款、价签、标签……），且各项尺寸/权重应有差异。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'glassmorphism',
    title: { zh: '禁用玻璃态', en: 'No glassmorphism' },
    detail: '禁止 backdrop-filter 毛玻璃、半透明白卡片叠在彩色背景上。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'emoji-icons',
    title: { zh: '禁用 emoji 当图标', en: 'No emoji as icons' },
    detail:
      '禁止用 emoji（✨🚀⚡️🎯 等）充当图标、项目符号或装饰；也不要拿通用图标库（Heroicons/Lucide/Feather）当装饰。需要图形时用 brief 母题自绘 SVG 或纯排版符号。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'buzzword-copy',
    title: { zh: '禁用空洞营销文案', en: 'No empty marketing copy' },
    detail: `禁止 ${BUZZWORDS_EN.slice(0, 10).join(' / ')} 等英文空话，以及 ${BUZZWORDS_ZH.slice(0, 8).join(' / ')} 等中文空话。文案只能由用户提供的事实构成，按 brief 的 voice 写。`,
    severity: 'major',
    detectable: true,
  },
  {
    id: 'soft-shadow-rounded',
    title: { zh: '禁用"圆角 + 柔和大阴影"一切', en: 'No rounded-2xl + soft shadow on everything' },
    detail:
      '禁止所有块都是 12–24px 圆角加 0 10px 30px 级别的柔和投影。圆角与阴影只能按 brief tokens 使用（很多分支是 0 圆角、零阴影）。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'invented-facts',
    title: { zh: '禁止编造事实与社会证明', en: 'No invented facts or social proof' },
    detail:
      '禁止虚构数据条（"10K+ 用户 / 99.9% 可用"）、"Trusted by" logo 墙、带头像的假评价、假奖项。只用 facts 中给出的信息；缺信息就留空位或写明待补。',
    severity: 'critical',
    detectable: true,
  },
  {
    id: 'tailwind-default-palette',
    title: { zh: '禁用框架默认色板', en: 'No framework default palette' },
    detail:
      '禁止直接用 Tailwind slate/indigo/violet/sky 默认色值（如 #6366f1、#8b5cf6、#0f172a、#3b82f6），禁止"深海军蓝底 + 霓虹强调色"的开发者工具外观（除非 brief 明确如此）。颜色只能来自 brief 调色板。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'scroll-fade-everything',
    title: { zh: '禁用"每段都淡入上浮"', en: 'No fade-up on every section' },
    detail:
      '禁止给每个区块都加滚动淡入上浮（AOS / data-aos / IntersectionObserver fade-up）。动效只能按 brief motion 规格，且必须尊重 prefers-reduced-motion。',
    severity: 'minor',
    detectable: true,
  },
  {
    id: 'pill-badge-sparkle',
    title: { zh: '禁用标题上方的胶囊徽标', en: 'No pill badge above the headline' },
    detail: '禁止在大标题上方放 "New ✨ / Now in beta →" 一类圆角胶囊小标签。',
    severity: 'minor',
    detectable: true,
  },
  {
    id: 'placeholder-content',
    title: { zh: '禁用占位内容', en: 'No placeholder content' },
    detail:
      '禁止 Lorem ipsum、"Feature One"、通用图库人物照、随机 Unsplash 图。没有真实图片时，用排版、色块、自绘 SVG 或 brief 母题代替。',
    severity: 'major',
    detectable: true,
  },
  {
    id: 'template-sections',
    title: { zh: '禁用 SaaS 模板分节', en: 'No SaaS template section order' },
    detail:
      '禁止 Hero → Features → Testimonials → Pricing → FAQ → CTA 的固定套路。分节顺序来自 brief layout 的 structure，内容按事实组织。',
    severity: 'minor',
    detectable: true,
  },
];

export function banIds(): string[] {
  return BANS.map((b) => b.id);
}

export function isBannedFont(family: string): boolean {
  const f = family
    .trim()
    .replace(/^["']|["']$/g, '')
    .toLowerCase();
  return BANNED_FONTS.some((b) => b.toLowerCase() === f);
}
