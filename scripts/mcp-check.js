import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { startHttp } from '../src/mcp.js';

await fs.mkdir('.private/mcp', { recursive: true });
await fs.rm('.private/mcp/history.json', { force: true });
const report = [];
async function exercise(transport, name) {
  const client = new Client({ name: 'random-design-test', version: '1.0.0' });
  await client.connect(transport);
  try {
    const list = await client.listTools(); assert.equal(list.tools.length, 11);
    const references = await client.callTool({name:'list_reference_styles',arguments:{}});
    assert.equal(references.structuredContent.styles.length,40);
    const rb=await client.callTool({name:'generate_reference_briefs',arguments:{subject:'Coffee',facts:['Latte 18'],count:2,seed:'mcp-reference'}});
    assert(!rb.isError);assert.equal(rb.structuredContent.briefs.length,2);assert.equal(rb.structuredContent.finishedPagesGenerated,false);
    const saved=rb.structuredContent.roll;
    const reproduced=await client.callTool({name:'reproduce_reference_brief',arguments:{ref:saved.designs[0].ref,constraints:saved.constraints,content:saved.content}});
    assert(!reproduced.isError);assert.equal(reproduced.structuredContent.markdown,rb.structuredContent.briefs[0].markdown);
    const critique=await client.callTool({name:'critique_reference_page',arguments:{html:'<h1>Coffee</h1>'}});
    assert(!critique.isError);assert.equal(critique.structuredContent.aestheticJudgment,false);
    const catalogue = await client.callTool({ name: 'list_presets', arguments: {} });
    assert.equal(catalogue.structuredContent.presets.length, 21);
    const fixed = await client.callTool({ name: 'get_preset', arguments: { id: 'new-chinese' } });
    assert.equal(fixed.structuredContent.design.source, 'preset');
    if (name === 'stdio') {
      const local = await client.callTool({ name: 'generate_directions', arguments: { seed: 'local-ledger', count: 1 } });
      assert(!local.isError);
      assert.equal(JSON.parse(await fs.readFile('.private/mcp/history.json', 'utf8')).entries.length, 1);
    }
    const response = await client.callTool({ name: 'generate_directions', arguments: { seed: 'mcp-smoke', count: 2, history: [] } });
    assert(!response.isError); const data = response.structuredContent ?? JSON.parse(response.content[0].text);
    assert.equal(data.designs.length, 2);
    const second = await client.callTool({ name: 'generate_directions', arguments: { seed: 'mcp-smoke', count: 2, history: data.historyEntries } });
    const next = second.structuredContent ?? JSON.parse(second.content[0].text); assert(next.designs.every(d => !data.designs.some(x => x.id === d.id)));
    const validation = await client.callTool({ name: 'validate_design', arguments: { design: data.designs[0] } });
    assert((validation.structuredContent ?? JSON.parse(validation.content[0].text)).valid);
    const rendered = await client.callTool({ name: 'render_design', arguments: { design: data.designs[0], language: 'en' } });
    assert((rendered.structuredContent ?? JSON.parse(rendered.content[0].text)).html.includes('<!doctype html>'));
    report.push({ transport: name, tools: list.tools.map(t => t.name), generation: true, portableHistory: true, validation: true, rendering: true });
  } finally { await client.close(); }
}
await exercise(new StdioClientTransport({ command: process.execPath, args: ['src/mcp.js'], env: { ...process.env, RANDOM_DESIGN_HISTORY: '.private/mcp/history.json' } }), 'stdio');
const server = await startHttp({ port: 0, token: 'test-only-token' });
const url = new URL(`http://127.0.0.1:${server.address().port}/mcp`);
try {
  const unauthorized = await fetch(url, { method: 'POST' }); assert.equal(unauthorized.status, 401);
  await exercise(new StreamableHTTPClientTransport(url, { requestInit: { headers: { Authorization: 'Bearer test-only-token' } } }), 'streamable-http');
} finally { await new Promise(resolve => server.close(resolve)); }
await fs.mkdir('docs/validation', { recursive: true }); await fs.writeFile('docs/validation/mcp.json', JSON.stringify({ report, actualWorkBuddyConnection: false, actualChatGPTAccountConnection: false, deployedRemoteMcp: false }, null, 2));
console.log(JSON.stringify(report, null, 2));
