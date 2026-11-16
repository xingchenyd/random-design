#!/usr/bin/env node
// End-to-end smoke test of the built artifacts: the CLI binary and the MCP server over a real stdio pipe.
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => {
  if (!cond) {
    console.error(`✗ ${msg}`);
    process.exit(1);
  }
  console.log(`✓ ${msg}`);
};

const cli = join(root, 'packages/core/dist/bin.js');
const summary = execFileSync(
  process.execPath,
  [cli, 'roll', '--subject', 'smoke', '--seed', 'smoke', '--format', 'summary'],
  {
    encoding: 'utf8',
  },
);
assert(
  summary.includes('seed:smoke') && summary.split('\n').filter((l) => /^\| \d /.test(l)).length === 5,
  'CLI roll prints 5 designs',
);
const rollHelp = execFileSync(process.execPath, [cli, 'roll', '--help'], { encoding: 'utf8' });
assert(
  rollHelp.startsWith('hash-design roll — ') && rollHelp.includes('--light-only'),
  'CLI roll --help prints the command help',
);

const client = new Client({ name: 'smoke', version: '0.0.0' });
await client.connect(
  new StdioClientTransport({
    command: process.execPath,
    args: [join(root, 'packages/mcp/dist/bin.js')],
    stderr: 'ignore',
  }),
);
const { tools } = await client.listTools();
assert(tools.length === 6, `MCP lists 6 tools (${tools.map((t) => t.name).join(', ')})`);
const res = await client.callTool({ name: 'roll_designs', arguments: { subject: 'smoke', count: 3 } });
const machine = JSON.parse(res.content[1].text);
assert(
  machine.designs.length === 3 && machine.source === 'system-random',
  'MCP roll_designs uses system randomness',
);
const brief = await client.callTool({ name: 'get_brief', arguments: { ref: machine.designs[0].ref } });
assert(
  brief.content[0].text.includes(machine.designs[0].ref.split('+')[0]),
  'MCP get_brief reproduces the ref',
);
await client.close();
console.log('smoke test passed');
