import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
export async function serve({ root = 'dist', port = Number(process.env.PORT ?? 4173) } = {}) {
  const absolute = path.resolve(root);
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '.md': 'text/plain; charset=utf-8' };
  const server = http.createServer(async (req, res) => {
    try {
      const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const target = path.resolve(absolute, '.' + (name.endsWith('/') ? name + 'index.html' : name));
      if (target !== absolute && !target.startsWith(absolute + path.sep)) { res.writeHead(403); res.end(); return; }
      const data = await fs.readFile(target); res.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream' }); res.end(data);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve)); return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) { const server = await serve(); console.log(`Studio: http://127.0.0.1:${server.address().port}`); }
