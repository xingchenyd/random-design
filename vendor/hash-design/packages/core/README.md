# hash-design

Core library + CLI of [hash-design](https://github.com/qybaihe/hash-design): roll true-random hashes and map them,
through a fixed and reproducible decision tree, onto concrete design directions — so AI-built pages stop collapsing into
the same template (Inter, purple gradients, centered hero with two buttons, three identical cards…).

> **Not published on npm yet.** Until it is, install from source:
>
> ```bash
> git clone https://github.com/qybaihe/hash-design.git && cd hash-design && npm install && npm run build
> node packages/core/dist/bin.js --help
> ```
>
> Once published, the commands below will also work through `npx -y hash-design`.

```bash
hash-design roll --subject "Fourth Lane Bakery" --fact "Open Tue–Sun 7:00–19:00" --out design/hash-design
hash-design critique design/hash-design/previews/01-*.html --roll design/hash-design/roll.json --pick 1
hash-design compare --roll design/hash-design/roll.json
hash-design skill install --target both
```

```ts
import { roll, renderBrief, critiquePage } from 'hash-design';

const r = roll({ count: 5, content: { subject: '第四巷面包店', facts: ['周一休息'] } });
console.log(renderBrief(r.designs[0], r.content));
```

See the [main README](https://github.com/qybaihe/hash-design#readme) for the method, the MCP server, the Skill and a
live demo. Also in [简体中文](https://github.com/qybaihe/hash-design/blob/main/README.zh-CN.md) ·
[日本語](https://github.com/qybaihe/hash-design/blob/main/README.ja.md) ·
[한국어](https://github.com/qybaihe/hash-design/blob/main/README.ko.md) ·
[Español](https://github.com/qybaihe/hash-design/blob/main/README.es.md). MIT.
