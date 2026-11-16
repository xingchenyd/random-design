import type { Density, DensityId, Scale, ScaleId, Twist, Voice } from '../types.js';

/** Global density pool. Branches pick an allowed subset. */
export const DENSITIES: Record<DensityId, Density> = {
  airy: {
    id: 'airy',
    name: { zh: '疏朗', en: 'Airy' },
    baseSize: 18,
    lineHeight: 1.65,
    unit: 10,
    sectionGap: 168,
    maxWidth: 1080,
    description: '大留白，一屏只讲一件事；正文行长 60–68 字符（中文 30–36 字）。',
  },
  regular: {
    id: 'regular',
    name: { zh: '常规', en: 'Regular' },
    baseSize: 17,
    lineHeight: 1.55,
    unit: 8,
    sectionGap: 112,
    maxWidth: 1200,
    description: '常规阅读节奏；区块之间用明确的分隔（线、色块或编号），不靠空白硬撑。',
  },
  compact: {
    id: 'compact',
    name: { zh: '紧凑', en: 'Compact' },
    baseSize: 15,
    lineHeight: 1.45,
    unit: 6,
    sectionGap: 64,
    maxWidth: 1320,
    description: '信息密集，多栏并行；用细线和对齐建立秩序，首屏就能看到 3 个以上信息块。',
  },
  packed: {
    id: 'packed',
    name: { zh: '满版', en: 'Packed' },
    baseSize: 14,
    lineHeight: 1.35,
    unit: 4,
    sectionGap: 32,
    maxWidth: 1440,
    description: '像报纸/促销单一样塞满：几乎没有空白区，靠字号反差、粗线和色块分区。',
  },
};

export const DENSITY_ORDER: DensityId[] = ['airy', 'regular', 'compact', 'packed'];

/** Global modular-scale pool. Branches pick an allowed subset. */
export const SCALES: Record<ScaleId, Scale> = {
  'major-second': { id: 'major-second', name: 'Major second 1.125', ratio: 1.125 },
  'minor-third': { id: 'minor-third', name: 'Minor third 1.2', ratio: 1.2 },
  'major-third': { id: 'major-third', name: 'Major third 1.25', ratio: 1.25 },
  'perfect-fourth': { id: 'perfect-fourth', name: 'Perfect fourth 1.333', ratio: 1.333 },
  'augmented-fourth': { id: 'augmented-fourth', name: 'Augmented fourth 1.414', ratio: 1.414 },
  'perfect-fifth': { id: 'perfect-fifth', name: 'Perfect fifth 1.5', ratio: 1.5 },
  golden: { id: 'golden', name: 'Golden ratio 1.618', ratio: 1.618 },
};

export const SCALE_ORDER: ScaleId[] = [
  'major-second',
  'minor-third',
  'major-third',
  'perfect-fourth',
  'augmented-fourth',
  'perfect-fifth',
  'golden',
];

/**
 * Copy voices (byte 2). The voice decides how the facts are *written*, which is half of what makes a page
 * feel templated. Voices are global: any branch can be paired with any voice.
 */
export const VOICES: Voice[] = [
  {
    id: 'shopkeeper-chalkboard',
    name: { zh: '店主黑板', en: 'Shopkeeper chalkboard' },
    description: '店主亲手写在门口黑板上的话：短句、现在时、具体到时间和价格，偶尔一句玩笑。',
    devices: ['今日/此刻开头', '价格直接写数字', '一行不超过 14 个字', '可以有一句手写批注'],
    example: '今天 7:00 第一炉。卖完就关灯。',
  },
  {
    id: 'field-notes',
    name: { zh: '田野笔记', en: 'Field notes' },
    description: '观察者的记录：带日期、时间、度量和第一手细节，克制、不评价。',
    devices: ['日期/时间戳', '度量单位', '"观察到…"式陈述', '括号补充'],
    example: '06:40 — 窗内温度 31°C，面团第二次发酵完成（目测体积 ×2）。',
  },
  {
    id: 'technical-manual',
    name: { zh: '技术手册', en: 'Technical manual' },
    description: '说明书口吻：编号条款、动词开头、规格写全，零形容词。',
    devices: ['1.1 / 1.2 编号', '规格表', '注意/警告框', '动词开头的步骤'],
    example: '3.2 取货：报预订号 → 核对 → 取走。逾时 30 分钟释放库存。',
  },
  {
    id: 'personal-letter',
    name: { zh: '亲笔信', en: 'Personal letter' },
    description: '写给一个具体读者的信：第一人称、第二人称、具体的回忆和邀请，有落款。',
    devices: ['称呼', '第一人称回忆', '落款与日期', '附言 P.S.'],
    example: '你好——如果你周六早上路过，门会开着，桌上有刚切的面包。',
  },
  {
    id: 'museum-label',
    name: { zh: '展签', en: 'Museum label' },
    description: '博物馆藏品标签：名称、年代、材质、尺寸，最后一句冷静的注解。',
    devices: ['名称 / 年代 / 材质 三行', '馆藏编号', '一句注解', '尺寸'],
    example: '乡村面包，2026。小麦、水、盐、九年酵种。直径 22 cm。',
  },
  {
    id: 'recipe-method',
    name: { zh: '配方步骤', en: 'Recipe method' },
    description: '配方书写法：配料清单 + 有序步骤 + 时间/温度，任何介绍都写成"做法"。',
    devices: ['配料清单（数量对齐）', '编号步骤', '时间与温度', '小贴士'],
    example: '① 前一晚 21:00 喂酵种 ② 次日 06:00 入炉 ③ 230°C 烤 40 分钟。',
  },
  {
    id: 'classified-ad',
    name: { zh: '分类广告', en: 'Classified ad' },
    description: '报纸分类广告电报体：省略主语、缩写、关键信息前置，按字计价般的节省。',
    devices: ['全大写或加粗首词', '缩写', '电话/地址收尾', '分隔符 ·'],
    example: '面包。每日现烤。酵种九年。第四巷17号。周一休。',
  },
  {
    id: 'timetable',
    name: { zh: '时刻表', en: 'Timetable' },
    description: '把内容组织成时间表/班次表：时间是主轴，事件是条目。',
    devices: ['时间列右对齐', '班次/批次编号', '状态（准点/售罄）', '图例'],
    example: '07:00 第一炉 · 可颂 / 乡村 —— 11:00 第二炉 · 肉桂卷',
  },
  {
    id: 'almanac',
    name: { zh: '历书', en: 'Almanac' },
    description: '黄历/年鉴口吻：宜忌、节令、方位，短句并列，带一点古意但信息准确。',
    devices: ['宜 / 忌 并列', '节气或日期', '四字短语', '方位与时辰'],
    example: '宜：早起、趁热。忌：周一来访。',
  },
  {
    id: 'catalogue-entry',
    name: { zh: '商品目录', en: 'Catalogue entry' },
    description: '邮购目录条目：货号、品名、规格、价格，每条结构一致，靠排版而非形容词取胜。',
    devices: ['货号 No.', '品名 + 规格', '价格右对齐', '库存/批次说明'],
    example: 'No.07 黑麦面包 · 750 g · 每日限 12 个 · ¥42',
  },
  {
    id: 'interview-qa',
    name: { zh: '问答访谈', en: 'Interview Q&A' },
    description: '访谈稿：问句短，答句是当事人的原话风格，具体、口语、有细节。',
    devices: ['问：/答：', '引语', '具体人名/时间', '一句停顿或笑声注'],
    example: '问：为什么周一休息？答：酵种也要歇一天。',
  },
  {
    id: 'dictionary-entry',
    name: { zh: '词条', en: 'Dictionary entry' },
    description: '把主题写成词典词条：词头、注音/词性、编号释义、例句、参见。',
    devices: ['词头加粗', '注音或词性', '① ② 释义', '例句 / 参见 →'],
    example: '第四巷 dì sì xiàng ⟨名⟩ ① 一条只有一家面包店的巷子。',
  },
  {
    id: 'logbook',
    name: { zh: '值班日志', en: 'Logbook' },
    description: '船长/值班日志：按条目记录，时间戳 + 事件 + 签名缩写，事实化、略带幽默。',
    devices: ['时间戳', '事件代码', '签名缩写', '天气/状态栏'],
    example: '0630 炉温达标。0700 开门，门外 4 人。—— L.',
  },
  {
    id: 'announcer',
    name: { zh: '广播通告', en: 'Public announcement' },
    description: '车站/商场广播：礼貌、重复关键信息、指示方向，句子清楚到可以念出来。',
    devices: ['"各位顾客请注意"式开头', '关键信息重复一次', '方向指示', '时间点'],
    example: '各位邻居请注意：第二炉肉桂卷将于 11:00 出炉，11:00 出炉。',
  },
];

/**
 * Twists (byte 12): one deliberate, specific constraint that breaks symmetry.
 * If a twist genuinely conflicts with the branch, the branch wins and the brief says so.
 */
export const TWISTS: Twist[] = [
  {
    id: 'numerals-as-display',
    name: { zh: '数字即主角', en: 'Numerals as display' },
    description: '页面里所有关键数字（时间、价格、编号）用展示字体、放大到正文 3 倍以上，作为视觉主角。',
  },
  {
    id: 'one-element-breaks-grid',
    name: { zh: '唯一越界', en: 'One element breaks the grid' },
    description: '全页恰好一个元素打破栅格：旋转、出血或越过边距。其余一切严格对齐。',
  },
  {
    id: 'nav-elsewhere',
    name: { zh: '导航不在顶部', en: 'Navigation not on top' },
    description: '导航放在底部、侧边竖排或做成目录/索引，而不是顶部横条。',
  },
  {
    id: 'table-carries-a-section',
    name: { zh: '一张表撑起一节', en: 'A table carries a section' },
    description: '至少一个主要区块完全由一张真正的 <table> 承担（价目、时刻、规格），并精心排版。',
  },
  {
    id: 'accent-rationed',
    name: { zh: '强调色配给', en: 'Accent rationed' },
    description: '强调色在全页最多出现 3 处；其余一切只用 ink / paper / rule。',
  },
  {
    id: 'vertical-text',
    name: { zh: '竖排一处', en: 'Vertical text once' },
    description: '至少一处使用竖排文字（中文 writing-mode: vertical-rl）或旋转 90° 的标签作为结构元素。',
  },
  {
    id: 'no-photography',
    name: { zh: '零照片', en: 'No photography' },
    description: '不使用任何照片或图片占位；所有视觉都由排版、色块、自绘 SVG 或 CSS 图形完成。',
  },
  {
    id: 'numbered-sections',
    name: { zh: '分节编号', en: 'Numbered sections' },
    description: '每个区块有显眼的编号（§1、No.2、03…），编号本身是设计元素。',
  },
  {
    id: 'marginalia',
    name: { zh: '旁注', en: 'Marginalia' },
    description: '次要信息放进页边旁注/脚注（带编号引用），正文保持干净。',
  },
  {
    id: 'giant-glyph',
    name: { zh: '巨字', en: 'Giant glyph' },
    description: '一个巨大的单字、单字母或单数字作为首屏视觉锚点（占视口高度 40% 以上）。',
  },
  {
    id: 'zero-shadow',
    name: { zh: '零阴影', en: 'Zero shadows' },
    description: '全页没有任何 box-shadow / drop-shadow；层级只靠边框、色块和留白。',
  },
  {
    id: 'two-alignments',
    name: { zh: '双对齐', en: 'Two alignment systems' },
    description: '左对齐的文字与右对齐的数据并置，形成清晰的两条对齐轴。',
  },
  {
    id: 'no-button-above-fold',
    name: { zh: '首屏无按钮', en: 'No button above the fold' },
    description: '首屏不出现任何按钮；行动入口（电话、预订、地址）在第二屏之后，以文字链接或表格行出现。',
  },
  {
    id: 'time-as-structure',
    name: { zh: '时间为骨', en: 'Time as structure' },
    description: '用真实的时间/日期（营业时间、出炉时刻、日程）作为页面的主结构轴。',
  },
  {
    id: 'footer-as-colophon',
    name: { zh: '版权页式页脚', en: 'Footer as colophon' },
    description: '页脚写成书籍版权页：字体、纸张/配色、印次、地址等，是全页信息最密的区块。',
  },
  {
    id: 'oversized-rule',
    name: { zh: '粗线分区', en: 'Oversized rules' },
    description: '至少一条 8px 以上的粗线（或双线）作为主分区手段，替代空白。',
  },
];
