import { assertDesign } from './engine.js';
import { rng, between, round } from './util.js';

// Every operator draws a single subject or a disciplined repeat. No automatic mirrored/rotated ghosts.
export function graphicSvg(design, { decorative = false } = {}) {
  const d = assertDesign(design), g = d.graphic, p = d.palette, r = rng(String(g.seed));
  const a = p.accent, b = p.accent2, c = p.panel;
  const paths = [], defs = [];
  const path = (data, fill, stroke = 'none', width = 1) => `<path d="${data}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;
  const line = (x1, y1, x2, y2, stroke = p.ink, width = g.stroke) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
  if (g.family === 'interlock') {
    // Three load-bearing forms share a 120px module and a vertical spine.
    const shift = round(g.amplitude * 35);
    paths.push(path(`M110 490V250A150 150 0 0 1 410 250V490H315V250A55 55 0 0 0 205 250V490Z`, c));
    paths.push(path(`M230 ${100 + shift}H490V230H230Z`, a));
    paths.push(`<circle cx="425" cy="395" r="105" fill="${b}"/>`);
    if (d.direction === 'edition') paths.unshift(path(`M${114 + d.surface.registration} 493V253A150 150 0 0 1 414 253V493Z`, b));
  } else if (g.family === 'fold') {
    const angle = round(g.amplitude * 70);
    paths.push(path(`M110 115L500 ${115 + angle}L365 475L110 390Z`, c));
    paths.push(path(`M110 115L365 285L365 475L110 390Z`, a));
    paths.push(path(`M365 285L500 ${115 + angle}L470 405L365 475Z`, b));
    paths.push(line(110, 115, 365, 285, p.paper, 1.5));
  } else if (g.family === 'cut-paper') {
    const lean = round(between(r, -22, 22));
    paths.push(path(`M90 490Q65 310 150 155Q225 55 335 125Q395 175 340 265Q255 375 330 490Z`, c));
    paths.push(path(`M250 510Q220 375 340 285Q${480 + lean} 165 540 280Q600 395 440 505Z`, a));
    paths.push(path('M155 230Q130 110 240 100Q330 100 320 175Q300 235 155 230Z', b));
    paths.push(line(205, 147, 275, 195, p.paper, 1));
  } else if (['seal', 'medallion'].includes(g.family)) {
    const petals = g.family === 'seal' ? g.count * 2 : g.count + 3;
    let outline = '';
    for (let i = 0; i <= petals * 8; i++) {
      const theta = i * Math.PI * 2 / (petals * 8), radius = 180 + (8 + g.amplitude * 10) * Math.cos(theta * petals);
      outline += `${i ? 'L' : 'M'}${round(320 + radius * Math.cos(theta))} ${round(300 + radius * Math.sin(theta))}`;
    }
    paths.push(path(outline + 'Z', a));
    paths.push(`<circle cx="320" cy="300" r="151" fill="none" stroke="${p.onAccent}" stroke-width="2"/><circle cx="320" cy="300" r="141" fill="none" stroke="${p.onAccent}" stroke-width="1"/>`);
    paths.push(path('M245 300L320 225L395 300L320 375Z', 'none', p.onAccent, 3));
    paths.push(line(320, 255, 320, 345, p.onAccent, 2), line(275, 300, 365, 300, p.onAccent, 2));
  } else if (g.family === 'botanical') {
    // Every petiole begins on the exact same cubic stem. Alternation, taper and veins
    // describe a specimen instead of stacking a repeated leaf logo.
    const stem = t => {
      const u = 1 - t;
      return [u ** 3 * 285 + 3 * u * u * t * 365 + 3 * u * t * t * 260 + t ** 3 * 345,
        u ** 3 * 520 + 3 * u * u * t * 360 + 3 * u * t * t * 210 + t ** 3 * 70];
    };
    paths.push(path('M285 520C365 360 260 210 345 70', 'none', a, 2.5));
    const leaves = Math.min(6, g.count) * 2;
    for (let i = 0; i < leaves; i++) {
      const t = 0.12 + i / leaves * 0.76, [sx, sy] = stem(t), sign = i % 2 ? 1 : -1;
      const angle = (sign < 0 ? -148 : -39) * Math.PI / 180 + between(r, -0.12, 0.12);
      const length = (110 + g.amplitude * 65) * (1 - t * 0.38), width = length * 0.20;
      const ux = Math.cos(angle), uy = Math.sin(angle), vx = -uy, vy = ux;
      const at = (along, across = 0) => `${round(sx + ux * along + vx * across)} ${round(sy + uy * along + vy * across)}`;
      paths.push(path(`M${at(0)}C${at(length * 0.22, width)} ${at(length * 0.70, width)} ${at(length)}C${at(length * 0.73, -width)} ${at(length * 0.25, -width * 0.7)} ${at(0)}Z`, i % 3 === 0 ? p.paper : a, a, 1.2));
      paths.push(path(`M${at(0)}Q${at(length * 0.52, -2)} ${at(length * 0.95)}`, 'none', i % 3 === 0 ? a : p.paper, 0.8));
      for (let j = 2; j < 7; j++) {
        const q = j / 9, breadth = width * Math.sin(Math.PI * q) * 0.73;
        paths.push(path(`M${at(length * q)}L${at(length * (q + 0.10), breadth)}M${at(length * q)}L${at(length * (q + 0.10), -breadth)}`, 'none', i % 3 === 0 ? a : p.paper, 0.55));
      }
    }
    for (let i = 0; i < 3; i++) {
      const [x, y] = stem(0.86 + i * 0.045), ex = x + (i % 2 ? -19 : 17), ey = y - 17;
      paths.push(line(x, y, ex, ey, a, 1), `<ellipse cx="${round(ex)}" cy="${round(ey - 7)}" rx="5" ry="10" fill="${b}" stroke="${a}" stroke-width="0.8"/>`);
    }
    paths.push(line(125, 551, 515, 551, a, 0.7), line(125, 547, 125, 555, a, 0.7), line(515, 547, 515, 555, a, 0.7));
  } else if (g.family === 'isometric') {
    // An axonometric vaulted study: ribs, rails and dimensions use one projection.
    const project = (x, y, z = 0) => [round(320 + x * 0.88 + y * 0.53), round(402 + x * 0.40 - y * 0.38 - z * 0.94)];
    const point = v => v.join(' '), radius = 106, spring = 78 + g.amplitude * 48, depth = 225;
    const projectedLine = (v, w, stroke = a, width = 1) => paths.push(line(...project(...v), ...project(...w), stroke, width));
    const outline = (y, inner = 0) => {
      const rad = radius - inner;
      let data = `M${point(project(-rad, y, 0))}L${point(project(-rad, y, spring))}`;
      for (let i = 0; i <= 40; i++) {
        const t = Math.PI - i / 40 * Math.PI;
        data += `L${point(project(rad * Math.cos(t), y, spring + rad * Math.sin(t)))}`;
      }
      return `${data}L${point(project(rad, y, 0))}`;
    };
    for (let i = 5; i >= 0; i--) {
      const y = -depth / 2 + i * depth / 5;
      paths.push(path(outline(y), 'none', a, i === 0 ? 2.8 : 1.25), path(outline(y, 10), 'none', a, 0.65));
      projectedLine([-radius, y, 0], [radius, y, 0], a, 0.7);
    }
    for (const [x, z] of [[-radius, 0], [radius, 0], [-radius, spring], [radius, spring], [0, spring + radius]]) projectedLine([x, -depth / 2, z], [x, depth / 2, z], a, 1.3);
    projectedLine([-145, -depth / 2, 0], [-145, depth / 2, 0], b, 1);
    projectedLine([-radius, -depth / 2, 0], [-160, -depth / 2, 0], a, 0.5);
    projectedLine([-radius, depth / 2, 0], [-160, depth / 2, 0], a, 0.5);
    for (const y of [-depth / 2, depth / 2]) projectedLine([-152, y, -5], [-138, y, 5], b, 1);
    projectedLine([-radius, -145, 0], [radius, -145, 0], b, 1);
    for (const x of [-radius, radius]) {
      projectedLine([x, -depth / 2, 0], [x, -155, 0], a, 0.5);
      projectedLine([x - 5, -150, 0], [x + 5, -140, 0], b, 1);
    }
  } else if (g.family === 'guilloche') {
    for (let j = 0; j < 7; j++) {
      let data = '';
      for (let i = 0; i <= 360; i++) {
        const t = i * Math.PI / 180, radius = 145 + (20 + g.amplitude * 30) * Math.sin(g.count * t + j * 0.25) + j * 6;
        data += `${i ? 'L' : 'M'}${round(320 + radius * Math.cos(t))} ${round(300 + radius * Math.sin(t))}`;
      }
      paths.push(path(data + 'Z', 'none', j === 3 ? b : a, g.stroke * 0.7));
    }
  } else if (g.family === 'weave') {
    const n = Math.min(g.count, 7), size = 420 / n;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const px = 100 + x * size, py = 90 + y * size, vertical = (x + y) % 2 === 0;
      const yarn = vertical ? p.paper : a;
      paths.push(`<rect x="${px + 1}" y="${py + 1}" width="${size - 2}" height="${size - 2}" fill="${yarn}"/>`);
      for (let k = 1; k < 11; k++) paths.push(vertical ? line(px + k * size / 11, py + 1, px + k * size / 11, py + size - 1, c, 0.65) : line(px + 1, py + k * size / 11, px + size - 1, py + k * size / 11, c, 0.65));
    }
    for (let i = 0; i <= n * 4; i++) paths.push(line(100 + i * 420 / (n * 4), 510, 100 + i * 420 / (n * 4), 523, a, 0.7));
  } else if (g.family === 'tiles') {
    const n = Math.min(5, g.count), size = 440 / n;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const px = 100 + x * size, py = 80 + y * size;
      paths.push(`<rect x="${px}" y="${py}" width="${size}" height="${size}" fill="${(x + y) % 2 ? a : c}"/>`);
      paths.push(path(`M${px} ${py}H${px + size}A${size} ${size} 0 0 1 ${px} ${py + size}Z`, (x + y) % 2 ? b : p.paper));
    }
  } else {
    // Ruled editorial mark, not a second illustration competing with the headline.
    paths.push(`<rect x="145" y="105" width="350" height="390" fill="${c}"/>`);
    paths.push(`<circle cx="320" cy="300" r="105" fill="${a}"/>`);
    paths.push(path('M215 300H425V405H215Z', p.paper));
    for (let i = 0; i < 5; i++) paths.push(line(165, 455 + i * 8, 475, 455 + i * 8, p.panelInk, 1));
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="600" viewBox="0 0 640 600" ${decorative ? 'aria-hidden="true"' : 'role="img" aria-label="Coherent procedural artwork"'}><defs>${defs.join('')}</defs>${paths.join('')}</svg>`;
}

export function textureSvg(design) {
  const d = assertDesign(design), ink = d.palette.ink, texture = d.surface.texture;
  const r = rng(`texture/${d.graphic.seed}`), lines = [];
  if (['grain', 'fibres'].includes(texture)) {
    for (let i = 0; i < 220; i++) {
      const x = round(r() * 240), y = round(r() * 240), length = texture === 'fibres' ? between(r, 1.5, 5) : 0.5;
      lines.push(`<path d="M${x} ${y}l${round(length)} ${round(r() * 0.7)}" stroke="${ink}" stroke-width="${between(r, 0.3, 0.9)}"/>`);
    }
  } else if (texture === 'halftone') {
    for (let y = 4; y < 240; y += 8) for (let x = 4; x < 240; x += 8) lines.push(`<circle cx="${x}" cy="${y}" r="0.65" fill="${ink}"/>`);
  } else if (texture === 'woven') {
    for (let i = 0; i < 240; i += 5) lines.push(`<path d="M${i} 0V240M0 ${i}H240" stroke="${ink}" stroke-width="0.6"/>`);
  } else if (['grid', 'fine-lines'].includes(texture)) {
    for (let i = 0; i < 240; i += 240 / (d.layout.columns / 2)) lines.push(`<path d="M0 ${i}H240${texture === 'grid' ? `M${i} 0V240` : ''}" stroke="${ink}" stroke-width="0.65"/>`);
  } else if (texture === 'enamel') {
    lines.push(`<path d="M0 5H240M0 8H240" stroke="${ink}" stroke-width="0.4"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><g opacity="${round(0.07 + d.surface.grain * 0.3)}">${lines.join('')}</g></svg>`;
}
