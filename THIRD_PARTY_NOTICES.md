# Third-party notices

random-design is independently implemented and licensed under MIT. The compare/select/freeze workflow was inspired by [qybaihe/hash-design](https://github.com/qybaihe/hash-design); its source code and design-branch catalogue are not included or copied. This is not a fork or an official derivative release of that project.

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

## Fonts

Font files are **not redistributed or embedded** in the source examples or PPTX. Web output references Google Fonts and provides generic fallbacks. Families are declared in `src/core/fonts.js`; see [Google Fonts](https://fonts.google.com/) and the [upstream font repository](https://github.com/google/fonts) for each family's actual license and source files. Downloaded fonts remain subject to their licenses, including reserved font names and notices where applicable.

Using a font name does not install it on a PowerPoint user's machine. The web preview and an office editor may therefore differ. Rendering evidence records the renderer used, not universal fidelity across applications.
