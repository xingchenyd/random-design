import { assertDesign } from './engine.js';
import { between, rng, round } from './util.js';

export function graphicSvg(design, { decorative = false } = {}) {
  const d = assertDesign(design), g = d.graphic, p = d.palette;
  const r = rng(String(g.seed)), n = g.count, amp = g.amplitude;
  const shapes = [];
  const line = (x1, y1, x2, y2, color = p.accent, width = g.stroke) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
  const circle = (x, y, radius, fill = 'none', color = p.accent) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${color}" stroke-width="${g.stroke}"/>`;
  if (g.family === 'orbits') {
    for (let i = 0; i < n; i++) shapes.push(`<ellipse cx="320" cy="240" rx="${55 + i * 210 / n}" ry="${35 + i * (70 + amp * 100) / n}" fill="none" stroke="${i % 3 ? p.accent : p.ink}" stroke-width="${g.stroke}" transform="rotate(${i * 180 / n} 320 240)"/>`);
    shapes.push(circle(320 + 160 * amp, 160, 14 + amp * 25, p.accent2, p.accent2));
  } else if (['contours', 'waves', 'ribbon'].includes(g.family)) {
    for (let i = 0; i < n; i++) {
      const y = 35 + i * 400 / n;
      const height = 30 + amp * 150;
      const path = `M-20 ${y} C100 ${y - height} 180 ${y + height} 320 ${y} S530 ${y - height} 660 ${y}`;
      shapes.push(`<path d="${path}" fill="none" stroke="${i % 4 ? p.accent : p.accent2}" stroke-width="${g.family === 'ribbon' ? 10 + amp * 18 : g.stroke}" stroke-linecap="round"/>`);
    }
  } else if (g.family === 'cells') {
    const columns = Math.ceil(Math.sqrt(n * 2));
    for (let i = 0; i < n * 2; i++) {
      const x = 65 + i % columns * 500 / columns, y = 60 + Math.floor(i / columns) * 370 / Math.ceil(n * 2 / columns);
      const size = between(r, 12, 28 + amp * 20);
      shapes.push(i % 2 ? circle(x, y, size, g.filled ? (i % 3 ? p.accent : p.accent2) : 'none') : `<rect x="${x - size}" y="${y - size}" width="${2 * size}" height="${2 * size}" rx="${d.surface.radius}" fill="${g.filled ? p.accent : 'none'}" stroke="${p.accent}" stroke-width="${g.stroke}"/>`);
    }
  } else if (g.family === 'lattice') {
    for (let i = 0; i <= n; i++) {
      const x = 30 + i * 580 / n, y = 30 + i * 420 / n;
      shapes.push(line(x, 30, x + (320 - x) * amp, 450), line(30, y, 610, y));
    }
    shapes.push(`<rect x="${120 + 100 * amp}" y="130" width="140" height="180" fill="${p.accent2}" opacity="0.9"/>`);
  } else if (g.family === 'rays') {
    const x = 140 + amp * 300, y = 100 + amp * 200;
    for (let i = 0; i < n * 2; i++) {
      const angle = i * Math.PI / n;
      shapes.push(line(x, y, round(x + Math.cos(angle) * 350), round(y + Math.sin(angle) * 350), i % 3 ? p.accent : p.accent2, g.stroke * 1.5));
    }
  } else if (g.family === 'steps') {
    for (let i = 0; i < n; i++) {
      const w = 500 - i * 400 / n, h = 22 + amp * 12;
      shapes.push(`<rect x="${60 + i * 200 / n}" y="${40 + i * 380 / n}" width="${w}" height="${h}" fill="${i % 3 ? p.accent : p.accent2}"/>`);
    }
  } else if (g.family === 'arches') {
    for (let i = 0; i < n; i++) {
      const x = 50 + i * 220 / n, w = 540 - i * 440 / n;
      shapes.push(`<path d="M${x} 460 V240 a${w / 2} ${100 + amp * 120} 0 0 1 ${w} 0 V460" fill="none" stroke="${i % 3 ? p.accent : p.accent2}" stroke-width="${g.stroke}"/>`);
    }
  } else {
    const pts = Array.from({ length: n }, () => [round(between(r, 50, 590)), round(between(r, 50, 430))]);
    for (let i = 1; i < pts.length; i++) shapes.push(line(...pts[i - 1], ...pts[i], p.accent, g.stroke));
    pts.forEach(([x, y], i) => shapes.push(circle(x, y, 4 + r() * (8 + amp * 14), i % 3 ? p.accent : p.accent2)));
  }
  const body = shapes.join('');
  const symmetry = g.symmetry === 'bilateral' ? `<g transform="translate(640 0) scale(-1 1)" opacity="0.3">${body}</g>` : g.symmetry === 'radial' ? `<g transform="rotate(90 320 240)" opacity="0.2">${body}</g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480" ${decorative ? 'aria-hidden="true"' : 'role="img" aria-label="Procedural geometric artwork"'}><defs><clipPath id="art-clip"><rect width="640" height="480"/></clipPath></defs><g clip-path="url(#art-clip)"><g transform="rotate(${g.rotation} 320 240)">${body}${symmetry}</g></g></svg>`;
}
