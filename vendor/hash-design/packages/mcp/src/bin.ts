#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, SERVER_VERSION } from './server.js';

async function main(): Promise<void> {
  const arg = process.argv[2];
  if (arg === '--version' || arg === '-v') {
    process.stdout.write(`${SERVER_VERSION}\n`);
    return;
  }
  if (arg === '--help' || arg === '-h') {
    process.stdout.write(
      `hash-design-mcp ${SERVER_VERSION}\nStdio MCP server. Configure it in your MCP client, e.g.\n` +
        `  { "mcpServers": { "hash-design": { "command": "npx", "args": ["-y", "hash-design-mcp"] } } }\n`,
    );
    return;
  }
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdout belongs to the protocol; log to stderr only.
  console.error(`hash-design-mcp ${SERVER_VERSION} ready on stdio (cwd: ${process.cwd()})`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
