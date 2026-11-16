# Third-party notices

random-design is independently maintained and licensed under MIT. Version 0.3 incorporates 45 palette sets from 15 historical branches of [qybaihe/hash-design](https://github.com/qybaihe/hash-design/tree/7e344d74de621ee595f6d83b50da9b5c04205368/packages/core/src/data/branches). The extracted swatches are in `src/core/upstream-palettes.js`. The original [MIT copyright and permission notice](licenses/hash-design-MIT.txt) accompanies the source and prebuilt site. The random-design sampling, renderers, interfaces and preset artwork are maintained in this repository.

Dependencies retain their respective licenses. `package-lock.json` pins installed versions. Bundled browser distributions include generated legal comment files; retain them when redistributing `dist/`.

| Dependency | Purpose | License / source |
|---|---|---|
| @modelcontextprotocol/sdk | MCP transports and tool interfaces | [MIT](https://github.com/modelcontextprotocol/typescript-sdk) |
| @noble/hashes | SHA-256 | [MIT](https://github.com/paulmillr/noble-hashes) |
| Culori | OKLCH conversion and gamut handling | [MIT](https://github.com/Evercoder/culori) |
| PptxGenJS | Native Office Open XML export | [MIT](https://github.com/gitbrent/PptxGenJS) |
| proper-lockfile | Local history concurrency control | [MIT](https://github.com/moxystudio/node-proper-lockfile) |
| Zod | Runtime schema validation | [MIT](https://github.com/colinhacks/zod) |
| esbuild | Browser bundling, development only | [MIT](https://github.com/evanw/esbuild) |
| Playwright | Browser checks, development only | [Apache-2.0](https://github.com/microsoft/playwright) |
| JSZip | ZIP packaging / export checks; also a PptxGenJS dependency | [MIT or GPL-3.0-or-later](https://github.com/Stuk/jszip) (used under MIT) |

Transitive dependencies are also governed by their package licenses; inspect installed `node_modules/*/LICENSE*` and the lockfile before redistribution.

## Complete hash-design integration in v0.5

The unmodified source snapshot at [vendor/hash-design](vendor/hash-design) is from
[qybaihe/hash-design](https://github.com/qybaihe/hash-design), via the user's former fork,
commit e40a94239b50eaecf4b007af68d43237d7dded76. Copyright (c) 2026 qybaihe.
Its [MIT license](vendor/hash-design/LICENSE) is retained. The snapshot includes 40
branch rules, 20 finished examples, briefs, screenshots, original documentation and
implementation. [The manifest](vendor/hash-design.provenance.json) records SHA-256
digests for all 227 files.

The bundled reference runtime and optional heuristic checker are derived from that
source. The portable crypto adapter preserves the original hash mapping, verified
against all 20 saved examples. Our wrapper preserves user copy instead of applying
the upstream sampled voice/twist. Example pages are copied byte-for-byte to the
published showcase and remain credited to qybaihe. Their original forms and buttons
are demonstrations, not real businesses or transaction services.

node-html-parser is used by the imported checker under its
[MIT license](https://github.com/taoqf/node-html-parser). Generated bundles retain
legal comments. Independent repository ownership does not imply sole authorship
of imported designs.

## Fonts

Font files are **not redistributed or embedded** in the source examples or PPTX. Web output references Google Fonts and provides generic fallbacks. Families are declared in `src/core/fonts.js`; see [Google Fonts](https://fonts.google.com/) and the [upstream font repository](https://github.com/google/fonts) for each family's actual license and source files. Downloaded fonts remain subject to their licenses, including reserved font names and notices where applicable.

Using a font name does not install it on a PowerPoint user's machine. The web preview and an office editor may therefore differ. Rendering evidence records the renderer used, not universal fidelity across applications.
