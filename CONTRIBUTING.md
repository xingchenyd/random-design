# Contributing

Use Node.js 22 or later. Run `npm ci`, `npm run check`, `npm run test:mcp` and the relevant browser checks after changes. Keep Node/browser generation identical and preserve content separately from style.

For a new visual operator, add its parameterized implementation, compatibility constraints, meaningful distance attributes and representative rendered examples. Do not add a new name for an existing theme and count it as diversity. Do not inflate style counts with seed-only differences or invisible parameters.

Sampling, distance, font-pool or rendering changes require a reproduction/version decision. Regenerate examples into a fresh directory, compare, then replace only the tracked generated fixture directory. Preserve the user's history. Never migrate incompatible histories silently.

Record what was actually checked: rules, export structure, browser rendering, PPTX rendering and native application/account tests are separate. Avoid publishing private content or personal history as fixtures.
