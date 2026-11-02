# Integrations / 跨环境调用

Last documentation check: 2026-11-03. Standard protocol tests are recorded in [validation/mcp.json](validation/mcp.json); they are not account-specific integration proof.

## Browser / 浏览器（无需本机 Node）

Open **https://xingchenyd.github.io/random-design/**. The engine runs in the browser; generate directions and download selected JSON, CSS, SVG, brief, HTML or a six-slide editable PPTX. History stays in this browser and can be exported/imported. No account, model API or server-side generation is required. Font stylesheets are optional external Google Fonts requests; fallback fonts apply offline.

In an ordinary ChatGPT web conversation: use the studio, download JSON + brief (and assets as needed), then upload them with your content. Instruct the assistant to preserve the specification and create the requested website or deck. Merely linking the GitHub repository does not automatically install a tool or guarantee code execution.

Cloud coding environments can clone the source and use Node just as local environments do. A sandbox history file is ephemeral unless retained or exported. Do not claim machine-wide history persists across independent cloud sessions.

## Codex

From a source checkout:

```sh
npm ci
node src/cli.js skill-install --target codex --dir /ABSOLUTE/PROJECT
codex mcp add random-design -- node /ABSOLUTE/PATH/random-design/src/mcp.js
```

The install command copies the skill into `.codex/skills/random-design` and refuses to overwrite an existing installation. MCP configuration is separate. Verify with the client's tool list. Restart/reload the client when required by that client.

## WorkBuddy

Official WorkBuddy documentation describes **Plugins → MCP servers → Configure MCP** and supports user-level `~/.workbuddy/mcp.json` and project-level `.workbuddy/mcp.json`:

```json
{
  "mcpServers": {
    "random-design": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/random-design/src/mcp.js"]
    }
  }
}
```

On Windows use a full path to `node.exe` if it is not on PATH, and use forward slashes or escaped backslashes in JSON. `npm ci` must already have completed in the checkout. For WorkBuddy versions with a skill import UI, import `random-design-skill.zip`; the plain `skills/random-design/SKILL.md` is also portable. Version-specific automatic skill discovery is not assumed.

[Official WorkBuddy MCP guide](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/MCP-Guide) · [Official plugin overview](https://www.codebuddy.cn/docs/workbuddy/Plugins)

## Claude Code / Cursor / other MCP clients

Use the same stdio JSON structure in the client's documented MCP config. The CLI can install the skill for Claude or Cursor via `--target claude` or `--target cursor`. The MCP server itself is host-independent.

## Remote Streamable HTTP MCP

```sh
# Local protocol test server
node src/mcp.js --http
# http://127.0.0.1:3211/mcp
```

Public binding requires environment variables:

```text
HOST=0.0.0.0
PORT=3211
RANDOM_DESIGN_TOKEN=<your-secret>
RANDOM_DESIGN_ALLOWED_ORIGINS=https://your-client.example
```

Set these using your platform's environment configuration; do not commit secrets. Use an HTTPS reverse proxy and an authentication method supported by the intended client. The bundled server checks a Bearer token when configured and rejects unapproved browser Origins. It does not implement OAuth, TLS termination, account management, persistent cloud history or a hosted public endpoint. It exposes no filesystem export tool. Request body limit: 4 MiB. `GET /health` is a health check; `/mcp` uses POST in stateless JSON response mode.

For a compatible remote MCP client, point it at `https://YOUR-HOST/mcp` and configure its Authorization header. Send history entries to `generate_directions`, retain returned entries, and pass them again to avoid recent recurrence. Do not mix users' histories.

## ChatGPT custom MCP

OpenAI's current documentation describes adding a custom MCP server in ChatGPT web, subject to workspace permissions and restrictions. A deployed compatible server (or supported tunnel), and authentication matching that account's connection flow, are required. A local stdio command cannot be used as a public server URL. The included Bearer-token server may require an authentication gateway for a client expecting OAuth; no such gateway is provided or claimed.

Use the browser/file route immediately; deploy and register HTTP MCP separately when desired. This release has tested standard stdio and Streamable HTTP clients locally. It has **not** been registered or tested inside the user's ChatGPT or WorkBuddy account.

[Official OpenAI custom MCP guide](https://developers.openai.com/api/docs/guides/custom-mcp-server) · [Official Codex MCP configuration example](https://developers.openai.com/learn/docs-mcp)

## JavaScript API

```js
import { generate, historyEntries, reproduce } from './src/core/index.js';

const previous = []; // load your own retained history
const roll = generate({ count: 5, scenario: 'academic', language: 'zh' }, previous);
const nextHistory = [...previous, ...historyEntries(roll)];
const designs = reproduce(roll); // same saved visual rules, matching release
```

After `npm run build`, `dist/random-design.js` is a browser ESM entry with generated sibling chunks. Host the complete `dist/` directory; do not copy only one entry file. A hosted JS module can be imported by a browser application, but importing code in a webpage does not grant an assistant access to it.
