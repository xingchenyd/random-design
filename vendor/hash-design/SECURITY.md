# Security policy

## Supported versions

hash-design has not been published to npm yet. Security fixes are made on the `main` branch; once releases exist, the latest minor version will receive fixes.

| Version        | Supported |
| -------------- | --------- |
| `main` / 0.1.x | yes       |

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Report privately through GitHub: go to the repository's **Security** tab and click **Report a vulnerability** ([direct link](https://github.com/qybaihe/hash-design/security/advisories/new)). Private vulnerability reporting is enabled for this repository.

Include what you can of the following:

- the affected component (core library, CLI, MCP server, Skill, example pages)
- the version or commit
- steps to reproduce, or a proof of concept
- the impact you expect

You should get an acknowledgement within 7 days. Once a fix is ready, it will be released with a GitHub Security Advisory crediting you, unless you prefer to stay anonymous.

## Threat model

Knowing what the code does helps decide whether something is a vulnerability:

- **Local only.** The CLI and the MCP server run on your machine with your user's permissions. The MCP server speaks stdio only; it opens no network ports and makes no network requests.
- **Filesystem access.** `roll_designs` (with `out_dir`) and `build_compare_page` write files; `critique_page` (`path`, `roll_path`) and `build_compare_page` (`roll_path`) read files. Paths are resolved against the server's working directory and are not sandboxed: an MCP client, or a model driving it, can ask the server to read or write any path your user can access. Only connect hash-design to clients and agents you trust, and review tool calls if your client allows it.
- **Untrusted HTML.** `critique_page` parses HTML and CSS with `node-html-parser` and regular expressions. It never executes scripts or loads remote resources. Crashes or pathological slowness on crafted input are in scope.
- **Generated pages.** Briefs and previews reference Google Fonts, so opening a generated page in a browser makes requests to `fonts.googleapis.com` / `fonts.gstatic.com`. The compare page embeds previews in iframes from the same directory.
- **Randomness.** Real rolls use `crypto.randomBytes`. Rolls are not secrets: the hashes are design seeds, not credentials, and `seed` is deliberately predictable.

Out of scope: problems that need an already-compromised machine or a malicious MCP client that you configured yourself, and the design quality of generated pages.
