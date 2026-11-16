// Derived from qybaihe/hash-design e40a942 (MIT). See vendor/hash-design/LICENSE.

// vendor/hash-design/packages/core/src/critique.ts
import { parse } from "node-html-parser";

// vendor/hash-design/packages/core/src/color.ts
var HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
function isHex(value) {
  return HEX_RE.test(value.trim());
}
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
function rgbToHex({ r, g, b }) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
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
function isPurpleBlue(hex) {
  const { h, s, l } = hexToHsl(hex);
  return h >= 215 && h <= 300 && s >= 0.35 && l >= 0.2 && l <= 0.85;
}
var NAMED = {
  purple: "#800080",
  violet: "#ee82ee",
  indigo: "#4b0082",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  mediumpurple: "#9370db",
  slateblue: "#6a5acd",
  royalblue: "#4169e1",
  magenta: "#ff00ff",
  fuchsia: "#ff00ff",
  white: "#ffffff",
  black: "#000000"
};
function parseCssColor(raw) {
  const v = raw.trim().toLowerCase();
  if (isHex(v)) return normalizeHex(v);
  if (/^#[0-9a-f]{8}$/.test(v)) return v.slice(0, 7);
  if (/^#[0-9a-f]{4}$/.test(v)) return normalizeHex(v.slice(0, 4));
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(v);
  if (rgb) return rgbToHex({ r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) });
  const hsl = /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(v);
  if (hsl) return hslToHex(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100);
  return NAMED[v] ?? null;
}
function hslToHex(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex({ r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 });
}

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
function isBannedFont(family) {
  const f = family.trim().replace(/^["']|["']$/g, "").toLowerCase();
  return BANNED_FONTS.some((b) => b.toLowerCase() === f);
}

// vendor/hash-design/packages/core/src/validate.ts
var FRAMEWORK_DEFAULT_HEX = [
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#a855f7",
  "#9333ea",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#0ea5e9",
  "#06b6d4",
  "#0f172a",
  "#1e293b",
  "#334155",
  "#64748b",
  "#94a3b8",
  "#e2e8f0",
  "#f1f5f9",
  "#f8fafc",
  "#111827",
  "#1f2937",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#e5e7eb",
  "#f3f4f6",
  "#f9fafb",
  "#10b981",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#eab308",
  "#ec4899",
  "#d946ef"
];

// vendor/hash-design/packages/core/src/critique.ts
var PENALTY = { critical: 25, major: 10, minor: 4 };
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}
function parseDecls(block) {
  const out = [];
  for (const part of block.split(";")) {
    const i = part.indexOf(":");
    if (i <= 0) continue;
    const prop = part.slice(0, i).trim().toLowerCase();
    const value = part.slice(i + 1).trim();
    if (prop && value) out.push([prop, value]);
  }
  return out;
}
function parseCss(css) {
  const rules = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  const clean = stripComments(css);
  let m;
  while (m = re.exec(clean)) {
    const selector = (m[1] ?? "").trim();
    if (selector.startsWith("@font-face")) continue;
    rules.push({ selector, decls: parseDecls(m[2] ?? "") });
  }
  return rules;
}
function collectCss(root, extra) {
  const blocks = root.querySelectorAll("style").map((s) => s.textContent);
  const inline = root.querySelectorAll("[style]").map((el) => el.getAttribute("style") ?? "").filter(Boolean);
  const css = [...blocks, extra ?? "", ...inline.map((s) => `[inline]{${s}}`)].join("\n");
  return { css, inline };
}
function buildVarMap(rules) {
  const vars = /* @__PURE__ */ new Map();
  for (const r of rules) for (const [p, v] of r.decls) if (p.startsWith("--")) vars.set(p, v);
  return vars;
}
function resolveVars(value, vars, depth = 0) {
  if (depth > 8 || !value.includes("var(")) return value;
  const next = value.replace(
    /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g,
    (_m, name, fb) => {
      return vars.get(name) ?? fb?.trim() ?? "";
    }
  );
  return resolveVars(next, vars, depth + 1);
}
var COLOR_TOKEN_RE = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:purple|violet|indigo|blue|blueviolet|mediumpurple|slateblue|royalblue|magenta|fuchsia)\b/gi;
function colorsIn(value) {
  return (value.match(COLOR_TOKEN_RE) ?? []).map((c) => parseCssColor(c)).filter((c) => Boolean(c));
}
function firstFamily(value) {
  return (value.split(",")[0] ?? "").trim().replace(/^["']|["']$/g, "");
}
var GENERIC_FAMILIES = /* @__PURE__ */ new Set([
  "system-ui",
  "sans-serif",
  "serif",
  "monospace",
  "-apple-system",
  "blinkmacsystemfont",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "segoe ui",
  "helvetica neue",
  "helvetica",
  "arial",
  "inherit",
  "initial",
  "unset"
]);
function visibleText(root) {
  const clone = parse(root.toString());
  clone.querySelectorAll("script, style, noscript, template").forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, " ").trim();
}
function classOf(el) {
  return (el.getAttribute("class") ?? "").trim();
}
function snippet(s, n = 120) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n)}\u2026` : t;
}
function lengthPx(v) {
  const m = /(-?[\d.]+)(px|rem|em)?/.exec(v);
  if (!m) return null;
  const n = Number(m[1]);
  if (m[2] === "rem" || m[2] === "em") return n * 16;
  return n;
}
function colorDistance(a, b) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return Math.sqrt((x.r - y.r) ** 2 + (x.g - y.g) ** 2 + (x.b - y.b) ** 2);
}
function critiquePage(input) {
  const root = parse(input.html, {
    comment: false,
    blockTextElements: { script: true, style: true, noscript: true }
  });
  const { css } = collectCss(root, input.css);
  const rules = parseCss(css);
  const vars = buildVarMap(rules);
  const allDecls = [];
  for (const r of rules)
    for (const [prop, value] of r.decls)
      allDecls.push({ selector: r.selector, prop, value: resolveVars(value, vars) });
  const classAttr = root.querySelectorAll("[class]").map((el) => classOf(el)).join(" ");
  const htmlLower = input.html.toLowerCase();
  const text = visibleText(root);
  const findings = [];
  const checked = /* @__PURE__ */ new Set();
  const add = (f) => findings.push(f);
  checked.add("generic-sans");
  const families = allDecls.filter((d) => d.prop === "font-family" || d.prop === "font").map(
    (d) => d.prop === "font" ? d.value.replace(/^.*?\d+(?:px|rem|em|%)?(?:\/[\d.]+\w*)?\s+/, "") : d.value
  );
  const bannedUsed = /* @__PURE__ */ new Set();
  for (const f of families)
    for (const part of f.split(","))
      if (isBannedFont(part)) bannedUsed.add(part.trim().replace(/^["']|["']$/g, ""));
  for (const m of input.html.matchAll(/fonts\.googleapis\.com\/css2?\?([^"'\s>]+)/g)) {
    for (const fam of (m[1] ?? "").matchAll(/family=([^:&]+)/g)) {
      const name = decodeURIComponent((fam[1] ?? "").replace(/\+/g, " "));
      if (isBannedFont(name)) bannedUsed.add(name);
    }
  }
  if (/\bfont-sans\b/.test(classAttr) && !/fontfamily/i.test(input.html))
    bannedUsed.add("Tailwind font-sans default");
  if (bannedUsed.size) {
    add({
      rule: "generic-sans",
      severity: "critical",
      message: `Default-AI font(s) in use: ${[...bannedUsed].join(", ")}`,
      fix: "Use the display/body pairing from the brief."
    });
  } else if (families.length > 0 && families.every((f) => GENERIC_FAMILIES.has(firstFamily(f).toLowerCase()))) {
    add({
      rule: "generic-sans",
      severity: "major",
      message: "Only generic/system font families are declared \u2014 no designed typeface.",
      evidence: snippet(families.join(" | ")),
      fix: "Load and use the brief\u2019s font pairing."
    });
  } else if (families.length === 0) {
    add({
      rule: "generic-sans",
      severity: "major",
      message: "No font-family declared at all; the browser default will be used.",
      fix: "Load and use the brief\u2019s font pairing."
    });
  }
  checked.add("purple-blue-gradient");
  const gradientHits = [];
  for (const d of allDecls) {
    if (!/gradient\(/i.test(d.value)) continue;
    for (const g of d.value.match(
      /(?:repeating-)?(?:linear|radial|conic)-gradient\((?:[^()]|\([^()]*\))*\)/gi
    ) ?? []) {
      const cols = colorsIn(g);
      const pb = cols.filter(isPurpleBlue);
      if (pb.length >= 2 || pb.length >= 1 && cols.length >= 2 && cols.every((c) => isPurpleBlue(c) || /^#(?:fff|ffffff|000|000000)$/.test(c))) {
        gradientHits.push(snippet(`${d.selector} { ${d.prop}: ${g} }`));
      }
    }
  }
  if (/\bfrom-(?:purple|violet|indigo|fuchsia|blue)-\d{2,3}\b/.test(classAttr) && /\b(?:to|via)-(?:purple|violet|indigo|blue|pink|fuchsia|cyan)-\d{2,3}\b/.test(classAttr)) {
    gradientHits.push("Tailwind gradient classes from-purple/indigo \u2026 to-blue");
  }
  if (gradientHits.length) {
    add({
      rule: "purple-blue-gradient",
      severity: "critical",
      message: `Purple/blue gradient detected (${gradientHits.length}).`,
      evidence: gradientHits.slice(0, 3).join("\n"),
      fix: "Remove it. Use flat palette colours; any gradient must use brief colours and have a material reason."
    });
  }
  const clipText = allDecls.some((d) => /background-clip/.test(d.prop) && /text/.test(d.value)) || /\bbg-clip-text\b/.test(classAttr);
  if (clipText) {
    add({
      rule: "purple-blue-gradient",
      severity: "major",
      message: "Gradient text (background-clip: text) is a template tell.",
      fix: "Set headline text in a solid palette colour."
    });
  }
  checked.add("centered-hero-two-buttons");
  const h1 = root.querySelector("h1");
  if (h1) {
    let container = h1.parentNode;
    for (let i = 0; i < 3 && container && container.tagName !== "BODY"; i++) {
      const buttons = container.querySelectorAll("button, a").filter((el) => {
        const cls = classOf(el).toLowerCase();
        return el.tagName === "BUTTON" || /\b(?:btn|button|cta)\b|btn-|button-|-btn|-button|rounded-full|px-\d/.test(cls);
      });
      if (buttons.length >= 2) {
        const chain = [h1];
        let p = h1.parentNode;
        while (p && p !== container.parentNode) {
          chain.push(p);
          p = p.parentNode;
        }
        const classes = chain.map((el) => classOf(el)).join(" ");
        const styles = chain.map((el) => el.getAttribute("style") ?? "").join(";");
        const centeredByClass = /\btext-center\b|\bcenter(?:ed)?\b|\bhero\b|items-center/.test(classes);
        const centeredByStyle = /text-align\s*:\s*center/.test(styles);
        const centeredByCss = chain.some((el) => {
          const cls = classOf(el).split(/\s+/).filter(Boolean);
          const tag = el.tagName.toLowerCase();
          return allDecls.some(
            (d) => d.prop === "text-align" && d.value.startsWith("center") && (cls.some(
              (c) => new RegExp(`\\.${c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(d.selector)
            ) || new RegExp(`(^|[\\s,>])${tag}(?![\\w-])`).test(d.selector))
          );
        });
        if (centeredByClass || centeredByStyle || centeredByCss) {
          add({
            rule: "centered-hero-two-buttons",
            severity: "critical",
            message: "Centered hero headline with two call-to-action buttons.",
            evidence: snippet(
              `<h1>${h1.textContent}</h1> + ${buttons.slice(0, 2).map((b) => b.textContent.trim()).join(" / ")}`
            ),
            fix: "Rebuild the first screen from the brief\u2019s layout + anchor; at most one action, placed per the layout."
          });
        }
        break;
      }
      container = container.parentNode;
    }
  }
  checked.add("identical-cards");
  const cardHits = [];
  for (const parent of root.querySelectorAll("*")) {
    const kids = parent.childNodes.filter((n) => n.nodeType === 1);
    if (kids.length < 3 || kids.length > 6) continue;
    const sig = (el) => `${el.tagName}.${classOf(el)}`;
    const first = kids[0];
    if (!first || kids.some((k) => sig(k) !== sig(first))) continue;
    if (["LI", "TR", "TD", "OPTION", "SPAN", "A", "P"].includes(first.tagName)) continue;
    const cardLike = kids.every((k) => k.querySelector("h2, h3, h4, h5") && k.querySelector("p"));
    if (!cardLike) continue;
    const structure = (el) => el.childNodes.filter((n) => n.nodeType === 1).map((n) => n.tagName).join(",");
    const sameStructure = kids.every((k) => structure(k) === structure(first));
    if (sameStructure && [3, 4, 6].includes(kids.length)) {
      const withIcon = kids.every((k) => k.querySelector('svg, i, img, .icon, [class*="icon"]'));
      cardHits.push(
        `${kids.length}\xD7 <${first.tagName.toLowerCase()} class="${snippet(classOf(first), 40)}">${withIcon ? " (icon + heading + text)" : ""}`
      );
    }
  }
  if (cardHits.length) {
    add({
      rule: "identical-cards",
      severity: "major",
      message: "Row(s) of structurally identical cards (heading + text, same class).",
      evidence: cardHits.slice(0, 3).join("\n"),
      fix: "Regroup the information with the branch\u2019s devices (table, list, price tags, numbered clauses); vary size and weight."
    });
  }
  checked.add("glassmorphism");
  if (allDecls.some((d) => /backdrop-filter/.test(d.prop) && /blur/.test(d.value)) || /\bbackdrop-blur/.test(classAttr)) {
    add({
      rule: "glassmorphism",
      severity: "major",
      message: "backdrop-filter blur (glassmorphism) detected.",
      fix: "Use opaque panels from the palette; separate layers with rules or solid fills."
    });
  }
  checked.add("emoji-icons");
  const emoji = text.match(new RegExp("\\p{Emoji_Presentation}|\\p{Extended_Pictographic}\uFE0F", "gu")) ?? [];
  if (emoji.length) {
    add({
      rule: "emoji-icons",
      severity: emoji.length >= 3 ? "major" : "minor",
      message: `${emoji.length} emoji in visible text.`,
      evidence: [...new Set(emoji)].slice(0, 12).join(" "),
      fix: "Replace with typographic symbols, numbers, or SVG drawn from the brief motif."
    });
  }
  if (/data-lucide|class="[^"]*\blucide\b|heroicons|feather-icons|class="[^"]*\bfa[srb]?\s+fa-|material-icons|material-symbols/i.test(
    input.html
  )) {
    add({
      rule: "emoji-icons",
      severity: "minor",
      message: "Generic icon library detected (Lucide / Heroicons / Font Awesome / Material).",
      fix: "Draw the few marks you need from the brief motif instead."
    });
  }
  checked.add("buzzword-copy");
  const lower = text.toLowerCase();
  const buzz = [];
  for (const w of BUZZWORDS_EN) {
    const re = new RegExp(`(^|[^a-z])${w.replace(/[-\s]/g, "[-\\s]")}([^a-z]|$)`, "i");
    if (re.test(lower)) buzz.push(w);
  }
  for (const w of BUZZWORDS_ZH) if (text.includes(w)) buzz.push(w);
  if (buzz.length) {
    add({
      rule: "buzzword-copy",
      severity: buzz.length >= 3 ? "major" : "minor",
      message: `Marketing filler: ${buzz.join(", ")}`,
      fix: "Rewrite with concrete facts in the brief\u2019s voice."
    });
  }
  checked.add("soft-shadow-rounded");
  const softShadows = allDecls.filter((d) => {
    if (d.prop !== "box-shadow" || /^none$/i.test(d.value)) return false;
    const nums = (d.value.match(/-?[\d.]+(?:px|rem)?/g) ?? []).map((n) => lengthPx(n) ?? 0);
    const blur = nums[2] ?? 0;
    return blur >= 12;
  });
  const bigRadius = allDecls.filter((d) => {
    if (d.prop !== "border-radius") return false;
    if (/50%|999|9999/.test(d.value)) return false;
    const px = lengthPx(d.value);
    return px !== null && px >= 12;
  });
  const twRounded = (classAttr.match(/\brounded-(?:xl|2xl|3xl)\b/g) ?? []).length;
  const twShadow = (classAttr.match(/\bshadow-(?:md|lg|xl|2xl)\b/g) ?? []).length;
  const roundedCount = bigRadius.length + twRounded;
  const shadowCount = softShadows.length + twShadow;
  if (roundedCount >= 2 && shadowCount >= 2) {
    add({
      rule: "soft-shadow-rounded",
      severity: "major",
      message: `Rounded corners (${roundedCount}) + soft blurred shadows (${shadowCount}) everywhere.`,
      evidence: snippet(
        [...bigRadius, ...softShadows].slice(0, 3).map((d) => `${d.selector} { ${d.prop}: ${d.value} }`).join(" ")
      ),
      fix: "Follow the branch radius/shadow tokens \u2014 most branches are 0 radius with rules or hard offsets."
    });
  } else if (shadowCount >= 3) {
    add({
      rule: "soft-shadow-rounded",
      severity: "minor",
      message: `${shadowCount} soft blurred shadows.`,
      fix: "Use rules, solid fills or hard offsets for depth."
    });
  }
  checked.add("invented-facts");
  const proof = [];
  const proofPatterns = [
    [
      /\b\d+(?:[.,]\d+)?\s?[kKmM]\+?\s+(?:users|customers|clients|downloads|teams|developers|companies)\b/,
      "user-count stat"
    ],
    [/\b99(?:\.9+)?%\s*(?:uptime|satisfaction)/i, "uptime / satisfaction stat"],
    [/trusted by|as seen (?:in|on)|loved by/i, "social-proof line"],
    [/★★★★★|⭐⭐⭐⭐⭐|5\/5 stars/, "star rating"],
    [/万\+?\s*(?:用户|客户|下载)|好评率|深受.{0,6}信赖/, "\u4E2D\u6587\u793E\u4F1A\u8BC1\u660E"]
  ];
  for (const [re, label] of proofPatterns) {
    const m = re.exec(text);
    if (m) proof.push(`${label}: \u201C${m[0]}\u201D`);
  }
  const testimonialAvatars = root.querySelectorAll('blockquote, figure, [class*="testimonial"]').filter((el) => el.querySelector("img"));
  if (testimonialAvatars.length >= 2)
    proof.push(`${testimonialAvatars.length} quote blocks with avatar images`);
  if (proof.length) {
    add({
      rule: "invented-facts",
      severity: "critical",
      message: "Social-proof / stats patterns that are usually invented.",
      evidence: proof.join("\n"),
      fix: "Remove unless the exact claim is in the supplied facts."
    });
  }
  if (input.facts?.length) {
    const factText = input.facts.join(" ");
    const numbers = new Set(text.match(/\d+(?:[.:,]\d+)*/g) ?? []);
    const unknown = [...numbers].filter((n) => n.length >= 2 && !factText.includes(n));
    if (unknown.length) {
      add({
        rule: "invented-facts",
        severity: "minor",
        message: `Numbers on the page that do not appear in the facts: ${unknown.slice(0, 12).join(", ")}`,
        fix: "Verify each one; delete anything invented."
      });
    }
  }
  checked.add("tailwind-default-palette");
  const allHex = /* @__PURE__ */ new Set();
  for (const d of allDecls) for (const c of colorsIn(d.value)) allHex.add(c);
  const frameworkHex = [...allHex].filter((h) => FRAMEWORK_DEFAULT_HEX.includes(h));
  const twColors = classAttr.match(/\b(?:bg|text|border|from|to|via|ring)-(?:indigo|violet|purple|slate|sky)-\d{2,3}\b/g) ?? [];
  if (frameworkHex.length + twColors.length >= 2) {
    add({
      rule: "tailwind-default-palette",
      severity: "major",
      message: "Framework default colours in use.",
      evidence: [...frameworkHex, ...new Set(twColors)].slice(0, 10).join(", "),
      fix: "Use only the 7 brief palette tokens."
    });
  }
  checked.add("scroll-fade-everything");
  const aos = /data-aos|aos\.init|fadeinup|fade-up|fade-in-up|wow\.js|scrollreveal/i.test(input.html);
  const ioFade = /intersectionobserver/i.test(input.html) && /translatey\(\s*\d{2}px|opacity\s*:\s*0\b/i.test(htmlLower);
  if (aos || ioFade) {
    add({
      rule: "scroll-fade-everything",
      severity: "minor",
      message: "Scroll-triggered fade/slide-in reveal detected.",
      fix: "Use only the brief motion spec, tied to the branch\u2019s physical metaphor."
    });
  }
  const animates = allDecls.some(
    (d) => (d.prop === "animation" || d.prop === "animation-name" || d.prop === "transition") && !/^none\b/.test(d.value)
  );
  if (animates && !/prefers-reduced-motion/.test(css)) {
    add({
      rule: "reduced-motion",
      severity: "minor",
      message: "Animations/transitions without a prefers-reduced-motion fallback.",
      fix: "Add @media (prefers-reduced-motion: reduce) { \u2026 } per the brief motion spec."
    });
  }
  checked.add("pill-badge-sparkle");
  if (h1) {
    const prev = h1.previousElementSibling;
    if (prev) {
      const cls = classOf(prev).toLowerCase();
      const isPill = /badge|pill|chip|eyebrow-pill|rounded-full/.test(cls) && prev.textContent.trim().length < 48;
      if (isPill) {
        add({
          rule: "pill-badge-sparkle",
          severity: "minor",
          message: "Pill badge directly above the headline.",
          evidence: snippet(prev.toString()),
          fix: "Remove it, or turn it into the branch\u2019s own label device (kicker, form number, dateline\u2026)."
        });
      }
    }
  }
  checked.add("placeholder-content");
  const ph = [];
  if (/lorem ipsum/i.test(text)) ph.push("Lorem ipsum");
  if (/source\.unsplash\.com|images\.unsplash\.com|picsum\.photos|placehold\.co|placeholder\.com|via\.placeholder|placekitten|randomuser\.me/i.test(
    input.html
  ))
    ph.push("stock/placeholder image URL");
  if (/feature (?:one|two|three|1|2|3)\b/i.test(text)) ph.push("\u201CFeature One\u201D style headings");
  if (ph.length) {
    add({
      rule: "placeholder-content",
      severity: "major",
      message: `Placeholder content: ${ph.join(", ")}`,
      fix: "Use real facts; replace images with typography, palette blocks or motif SVG."
    });
  }
  checked.add("template-sections");
  const headings = root.querySelectorAll("h2, h3").map((h) => h.textContent.trim().toLowerCase());
  const templ = [
    /^features?$|^key features|^our features|产品特色|核心功能/,
    /testimonials?|what (?:our|people) (?:customers )?say|用户评价|客户评价/,
    /^pricing|^plans|价格方案|套餐/,
    /^faq|frequently asked|常见问题/,
    /how it works|工作原理|如何运作/,
    /why choose us|为什么选择我们/,
    /get started|立即开始|开始使用/
  ];
  const templHits = templ.filter((re) => headings.some((h) => re.test(h))).length;
  if (templHits >= 3) {
    add({
      rule: "template-sections",
      severity: "minor",
      message: `SaaS template section headings (${templHits} of Features/Testimonials/Pricing/FAQ/How it works\u2026).`,
      fix: "Order and name sections per the brief layout structure."
    });
  }
  const lowContrast = [];
  for (const r of rules) {
    const get = (p) => r.decls.find(([k]) => k === p)?.[1];
    const fg = get("color");
    const bg = get("background-color") ?? get("background");
    if (!fg || !bg || /gradient|url\(/.test(bg)) continue;
    const f = colorsIn(resolveVars(fg, vars))[0];
    const b = colorsIn(resolveVars(bg, vars))[0];
    if (f && b && contrast(f, b) < 3)
      lowContrast.push(`${snippet(r.selector, 40)}: ${f} on ${b} = ${contrast(f, b).toFixed(2)}:1`);
  }
  if (lowContrast.length) {
    add({
      rule: "low-contrast",
      severity: "major",
      message: "Text/background pairs below 3:1.",
      evidence: lowContrast.slice(0, 5).join("\n"),
      fix: "Use ink/paper or the on-accent colour from the brief contrast table."
    });
  }
  if (!/<meta[^>]+name=["']viewport/i.test(input.html)) {
    add({
      rule: "viewport",
      severity: "minor",
      message: 'Missing <meta name="viewport">.',
      fix: "Add width=device-width, initial-scale=1."
    });
  }
  if (!/<html[^>]*\blang=/i.test(input.html)) {
    add({
      rule: "lang",
      severity: "minor",
      message: "Missing lang attribute on <html>.",
      fix: 'Add lang="zh-CN" or lang="en".'
    });
  }
  const noAlt = root.querySelectorAll("img").filter((img) => !img.hasAttribute("alt")).length;
  if (noAlt)
    add({
      rule: "img-alt",
      severity: "minor",
      message: `${noAlt} <img> without alt.`,
      fix: 'Describe or mark decorative with alt="".'
    });
  let adherence = null;
  if (input.design) {
    const d = input.design;
    let points = 100;
    const fontBlob = `${families.join(" ")} ${decodeURIComponent(input.html.match(/fonts\.googleapis\.com[^"'\s>]*/g)?.join(" ") ?? "").replace(/\+/g, " ")}`.toLowerCase();
    const needFonts = [d.type.display.family, d.type.body.family];
    const missingFonts = needFonts.filter((f) => !fontBlob.includes(f.toLowerCase()));
    if (missingFonts.length) {
      points -= 20 * missingFonts.length;
      add({
        rule: "brief-fonts",
        severity: "major",
        message: `Brief fonts not used: ${missingFonts.join(", ")}`,
        fix: `Load and apply ${needFonts.join(" + ")} as specified.`
      });
    }
    const palette = Object.entries(d.palette.colors);
    const requiredKeys = ["paper", "ink", "accent"];
    const missingKeys = requiredKeys.filter((k) => {
      const hex = d.palette.colors[k];
      return ![...allHex].some((h) => colorDistance(h, hex) < 6);
    });
    if (missingKeys.length) {
      points -= 10 * missingKeys.length;
      add({
        rule: "brief-palette",
        severity: "major",
        message: `Brief colours missing from the CSS: ${missingKeys.join(", ")}`,
        fix: "Paste the brief tokens.css and use its custom properties."
      });
    }
    const foreign = [...allHex].filter(
      (h) => !palette.some(([, p]) => colorDistance(h, p) < 24) && !["#ffffff", "#000000"].includes(h)
    );
    if (foreign.length > 4) {
      points -= Math.min(20, foreign.length * 2);
      add({
        rule: "brief-palette",
        severity: "minor",
        message: `${foreign.length} colours outside the brief palette.`,
        evidence: foreign.slice(0, 10).join(", "),
        fix: "Map every colour to one of the 7 palette tokens."
      });
    }
    const zeroRadius = /^0\b|^0px|^none/i.test(d.branch.tokens.radius.trim());
    const radiusUse = allDecls.filter(
      (x) => x.prop === "border-radius" && !/50%|999/.test(x.value) && (lengthPx(x.value) ?? 0) > 3
    );
    if (zeroRadius && radiusUse.length) {
      points -= 10;
      add({
        rule: "brief-shape",
        severity: "minor",
        message: `Branch radius policy is "${snippet(d.branch.tokens.radius, 60)}" but ${radiusUse.length} rounded declarations found.`,
        fix: "Remove border-radius except where the branch tokens allow it."
      });
    }
    const noShadow = /^none/i.test(d.branch.tokens.shadow.trim());
    const shadowUse = allDecls.filter((x) => x.prop === "box-shadow" && !/^none/i.test(x.value));
    if (noShadow && shadowUse.length) {
      points -= 10;
      add({
        rule: "brief-shape",
        severity: "minor",
        message: `Branch shadow policy is "${snippet(d.branch.tokens.shadow, 60)}" but ${shadowUse.length} box-shadow declarations found.`,
        fix: "Remove shadows unless the branch token explicitly allows a specific one."
      });
    }
    adherence = Math.max(0, points);
  }
  const counts = { critical: 0, major: 0, minor: 0 };
  for (const f of findings) counts[f.severity]++;
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + PENALTY[f.severity], 0));
  const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";
  const failed = new Set(findings.map((f) => f.rule));
  const order = { critical: 0, major: 1, minor: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity]);
  return {
    score,
    grade,
    adherence,
    counts,
    findings,
    passed: [...checked].filter((r) => !failed.has(r))
  };
}
export {
  critiquePage
};
