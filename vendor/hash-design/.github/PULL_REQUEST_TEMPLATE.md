## What and why

<!-- What does this change, and why? Link the issue it closes, e.g. "Closes #12". -->

## Type

- [ ] Bug fix
- [ ] New feature
- [ ] New or changed design branch / pool / bans data
- [ ] Critique rule
- [ ] Docs or translation
- [ ] Tooling / CI

## Checklist

- [ ] `npm run check` passes locally (typecheck, lint, prettier, tests)
- [ ] `node scripts/smoke.mjs` passes
- [ ] User-visible changes are listed under `[Unreleased]` in `CHANGELOG.md`
- [ ] Docs match the code (README tool / CLI tables, `docs/mcp-tools.md`, `SKILL.md` if tools or flags changed)
- [ ] Every MCP change has a matching CLI change, or vice versa

### If you changed branch data, pools or bans

- [ ] `node scripts/verify-fonts.mjs` passes
- [ ] `npm run sync` was run (`docs/branches.md`, `SKILL.md` and its copies are up to date)
- [ ] The example was re-rolled and its previews, compare page and screenshots rebuilt, or I explain below why not

### If you changed the English README

- [ ] The translations (`README.zh-CN.md`, `README.ja.md`, `README.ko.md`, `README.es.md`) are updated, or a follow-up issue is linked

## Notes for reviewers

<!-- Screenshots, trade-offs, anything you are unsure about. -->
