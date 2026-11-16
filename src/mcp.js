#!/usr/bin/env node
import {BRANCHES,referenceRoll,referenceFromRef} from './reference.js';
import {critiquePage} from './generated/reference-critique.js';
import http from 'node:http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { generate, getPreset, PRESETS, RequestSchema, validateDesign, signature, distance, LIBRARY, RULES } from './core/index.js';
import { generateRecorded, mergeHistory } from './history.js';
import { pageHtml, tokensCss, brief } from './render.js';
import { graphicSvg } from './core/graphics.js';

const result = data => ({ content: [{ type: 'text', text: JSON.stringify(data) }], structuredContent: data });
export function createServer({ localHistory = false } = {}) {
  const server = new McpServer({ name: 'random-design', version: '0.5.0' }, { instructions: 'Use generate_reference_briefs for content-led design specifications from the 40-direction imported library; implement and inspect them rather than claiming a brief is a finished page. Use get_preset for a named fixed style and generate_directions for hash-based variants. Present comparable previews, preserve supplied copy and facts, and retain the selected visual JSON. History applies to generated variants.' });
  server.registerTool('list_reference_styles',{description:'List 40 MIT-licensed hash-design directions. Different from the 21 ready-to-render presets; some styles overlap.',inputSchema:{},annotations:{readOnlyHint:true}},async()=>result({styles:BRANCHES.map(({id,name,concept})=>({id,name,concept}))}));
  server.registerTool('generate_reference_briefs',{description:'Sample imported design specifications; does NOT render finished pages. Preserve supplied copy. Use the brief to build content-aware pages or slides. Pass exclude IDs to avoid recent directions.',inputSchema:{subject:z.string().max(1000),facts:z.array(z.string().max(4000)).max(100).default([]),count:z.number().int().min(1).max(12).default(5),language:z.enum(['zh','en']).default('zh'),seed:z.string().optional(),include:z.array(z.string()).default([]),exclude:z.array(z.string()).default([])},annotations:{readOnlyHint:true}},async args=>result(referenceRoll(args)));
  server.registerTool('reproduce_reference_brief',{description:'Reproduce a saved hash-design reference with the original constraints and supplied content.',inputSchema:{ref:z.string(),constraints:z.record(z.string(),z.any()).optional(),content:z.record(z.string(),z.any()).optional()},annotations:{readOnlyHint:true}},async({ref,...options})=>result(referenceFromRef(ref,options)));
  server.registerTool('critique_reference_page',{description:'Imported heuristic checker ONLY for reference-library pages. Scores are rule checks, NOT aesthetics. Do not use its bans against fixed styles such as glassmorphism.',inputSchema:{html:z.string().max(2000000),css:z.string().max(1000000).optional(),facts:z.array(z.string()).optional()},annotations:{readOnlyHint:true}},async args=>result({...critiquePage(args),scope:'reference-library-only',aestheticJudgment:false}));
  server.registerTool('list_presets', {
    description: 'List the 21 selectable fixed visual styles and their IDs.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async () => result({ presets: PRESETS.map(({ id, name, layout, role }) => ({ id, name, layout, role })) }));
  server.registerTool('get_preset', {
    description: 'Return the stable visual specification of a fixed style. Repeated calls return the same style without recording random history.',
    inputSchema: { id: z.enum(PRESETS.map(preset => preset.id)) },
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async ({ id }) => result({ design: getPreset(id) }));
  server.registerTool('generate_directions', {
    description: 'Generate 1–8 coherent procedural visual systems. Uses local history over stdio; HTTP uses supplied history only. Returns full JSON, diagnostics and portable history entries. No copywriting changes.',
    inputSchema: { ...RequestSchema.shape, history: z.array(z.any()).max(20000).optional() },
    annotations: { readOnlyHint: !localHistory, destructiveHint: false, idempotentHint: false, openWorldHint: false }
  }, async ({ history, ...request }) => {
    const h = history ? mergeHistory(history) : [];
    const bundle = localHistory && !history ? await generateRecorded(request) : generate(request, h);
    const { historyEntries } = await import('./core/index.js');
    return result({ ...bundle, historyEntries: historyEntries(bundle), historyScope: localHistory && !history ? 'local-machine' : 'client-supplied' });
  });
  server.registerTool('render_design', {
    description: 'Validate saved design JSON and return website HTML, CSS tokens, SVG and a visual brief. Use the studio or CLI for editable PPTX samples. Does not write files.',
    inputSchema: { design: z.any(), language: z.enum(['zh', 'en']).default('zh'), content: z.record(z.string(), z.any()).optional() },
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async ({ design, language, content }) => result({ html: pageHtml(design, { language, content }), css: tokensCss(design), svg: graphicSvg(design), brief: brief(design, { language }) }));
  server.registerTool('validate_design', { description: 'Check rule version, fingerprint, geometry and token text contrast. This is not a rendered aesthetic assessment.', inputSchema: { design: z.any() }, annotations: { readOnlyHint: true, openWorldHint: false } }, async ({ design }) => result(validateDesign(design)));
  server.registerTool('compare_designs', { description: 'Return the weighted attribute distance between two valid designs, 0–1. Not a human perceptual guarantee.', inputSchema: { a: z.any(), b: z.any() }, annotations: { readOnlyHint: true, openWorldHint: false } }, async ({ a, b }) => {
    if (![a, b].every(d => validateDesign(d).valid)) throw new Error('Invalid design');
    return result({ distance: distance(signature(a), signature(b)), method: 'weighted visual attributes' });
  });
  server.registerTool('get_capabilities', { description: 'Describe procedural operators, constraints, rule fingerprint and integration limits.', inputSchema: {}, annotations: { readOnlyHint: true, openWorldHint: false } }, async () => result({ library: LIBRARY, rules: RULES, referenceBranches: 40, fixedStyles: 21, referenceOutput: 'implementation briefs, not finished pages', referenceSource: 'qybaihe/hash-design (MIT)', referenceStudio: 'https://xingchenyd.github.io/random-design/reference/', studio: 'https://xingchenyd.github.io/random-design/', fontsEmbedded: false, webAndPptx: true, remoteHistory: 'client-supplied; no cloud account or synchronization', aestheticGuarantee: false }));
  return server;
}

export async function startHttp({ port = 3211, host = '127.0.0.1', token = process.env.RANDOM_DESIGN_TOKEN } = {}) {
  if (host !== '127.0.0.1' && host !== 'localhost' && !token) throw new Error('Set RANDOM_DESIGN_TOKEN before binding a public interface. Deploy behind HTTPS.');
  const web = http.createServer(async (req, res) => {
    if (req.url === '/health') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: true, library: LIBRARY })); return; }
    if (req.url !== '/mcp') { res.writeHead(404); res.end(); return; }
    if (token && req.headers.authorization !== `Bearer ${token}`) { res.writeHead(401); res.end('Unauthorized'); return; }
    const origin = req.headers.origin;
    const allowed = (process.env.RANDOM_DESIGN_ALLOWED_ORIGINS ?? '').split(',').filter(Boolean);
    if (origin && !allowed.includes(origin)) { res.writeHead(403); res.end('Origin not allowed'); return; }
    if (req.method !== 'POST') { res.writeHead(405, { Allow: 'POST' }); res.end(); return; }
    let body = '';
    try {
      for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 4 * 1024 * 1024) { res.writeHead(413); res.end(); return; } }
      const json = JSON.parse(body);
      const server = createServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
      res.on('close', () => { void transport.close(); void server.close(); });
      await server.connect(transport); await transport.handleRequest(req, res, json);
    } catch {
      if (!res.headersSent) res.writeHead(400, { 'Content-Type': 'application/json' });
      if (!res.writableEnded) res.end(JSON.stringify({ error: 'Invalid MCP request' }));
    }
  });
  await new Promise(resolve => web.listen(port, host, resolve)); return web;
}
if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--http')) {
    const server = await startHttp({ port: Number(process.env.PORT ?? 3211), host: process.env.HOST ?? '127.0.0.1' });
    console.error(`random-design HTTP MCP at http://${server.address().address}:${server.address().port}/mcp; supply portable history per request.`);
  } else await createServer({ localHistory: true }).connect(new StdioServerTransport());
}
