# Integration routes

Full maintained guide: https://github.com/xingchenyd/random-design/blob/main/docs/integrations.md

## Source checkout

```sh
git clone https://github.com/xingchenyd/random-design.git
cd random-design
npm ci
node src/cli.js generate --scenario academic --language zh --out output/session-01
```

Use a new output directory. Read `compare.html`; saved roll files contain the full visual specifications. Explicit seed values are allowed for repeatable tests or a user-requested reproduction; normal exploration uses fresh randomness.

## MCP

Local process: `node /ABSOLUTE/PATH/random-design/src/mcp.js`.

Streamable HTTP: `node src/mcp.js --http`, default `127.0.0.1:3211/mcp`. Public binding requires `RANDOM_DESIGN_TOKEN`; use an HTTPS reverse proxy. HTTP requests supply their own portable history; the server stores no shared user history. Authentication/account registration and public hosting are separate tasks, not performed by this skill.

Tools: `generate_directions`, `render_design`, `validate_design`, `compare_designs`, `get_capabilities`.

## Environments without terminal access

Use the public studio to download a design JSON, brief, CSS and SVG, or an editable sample PPTX. Upload these files to the design conversation. WorkBuddy supports MCP configuration in its plugin UI. ChatGPT custom MCP support depends on the account and workspace; a standard HTTP server must be deployed and its authentication matched to the client. Ordinary chats can use the file handoff route.
