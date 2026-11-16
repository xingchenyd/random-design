# 映射规范：`hash-design/v1`

[English](mapping.md) · [返回 README](../README.zh-CN.md)

本页说明一个 256 位哈希如何变成一个设计方向。这里的全部内容都实现在 [`packages/core/src/hash.ts`](../packages/core/src/hash.ts) 和 [`packages/core/src/mapping.ts`](../packages/core/src/mapping.ts) 中，并由 `packages/core/test/mapping.test.ts` 覆盖。

## 1. 哈希从哪里来

| 模式             | 来源                                                  | `roll.json` 中的 `source` 字段 |
| ---------------- | ----------------------------------------------------- | ------------------------------ |
| 真实使用（默认） | `sha256(crypto.randomBytes(32))`，即操作系统的 CSPRNG | `system-random`                |
| 示例和测试       | `sha256("hash-design/v1:<seed>:<index>")`             | `seed:<seed>`                  |
| 仅限库调用方     | `roll({ hashes: [...] })`，哈希由你提供               | `provided-hashes`              |

`seed` 的存在是为了让示例和测试可复现。Skill、MCP prompt 和 server instructions 都会告诉 Agent：真实工作中永远不要传 seed。

一次掷骰有 1–12 个哈希（默认 5 个）。请求的设计数不能超过约束过滤后池中剩下的分支数。

## 2. 字节 → 维度

一个哈希有 32 字节。`hash-design/v1` 按下表读取它们（见 `mapping.ts` 中的 `BYTE_MAP`）：

| 字节  | 维度            | 取值范围                               | 规则                   |
| ----- | --------------- | -------------------------------------- | ---------------------- |
| 0–1   | 分支 branch     | 分支池（40 个分支，约束过滤后）        | `uint16(b0, b1) mod N` |
| 2     | 文案语气 voice  | 14 种全局文案语气                      | `b2 mod 14`            |
| 3     | 版式 layout     | 该分支的版式（3）                      | `b3 mod len`           |
| 4     | 字体对 type     | 该分支的字体对（3）                    | `b4 mod len`           |
| 5     | 配色 palette    | 该分支的调色板（3），经浅色/深色过滤后 | `b5 mod len`           |
| 6     | 密度 density    | 该分支允许的密度（1–3）                | `b6 mod len`           |
| 7     | 动效 motion     | 该分支的动效选项（3）                  | `b7 mod len`           |
| 8     | 母题 motif      | 该分支的母题（3）                      | `b8 mod len`           |
| 9     | 首屏锚点 anchor | 该分支的首屏锚点（3）                  | `b9 mod len`           |
| 10    | 字号比例 scale  | 该分支允许的模数比例（1–3）            | `b10 mod len`          |
| 11    | 材质 surface    | 该分支的材质（3）                      | `b11 mod len`          |
| 12    | 变数 twist      | 16 个全局变数                          | `b12 mod 16`           |
| 13–31 | —               | 未使用                                 | 记录在每份 brief 里    |

每一步都会连同十六进制值、公式和结果写进 brief 的**映射过程**，任何人都可以手工核对算术。

有两个约束不是过滤池子，而是替换掉某个字节：

- `brand_colors`：忽略第 5 字节。选出 accent 色相与第一个品牌色最接近的调色板（无彩色的品牌色按明度匹配），然后覆盖 `accent`（如果给了第二个颜色，也覆盖 `accent2`）。brief 的对比度表按覆盖后的调色板计算。
- `reduced_motion`：忽略第 7 字节，选择最静止的动效选项（时长最短）。

## 3. 碰撞与家族分散

单个哈希映射到它的**主分支** `uint16(b0, b1) mod N`。在一次掷骰内，`mapRoll` 从主分支开始向后走（`+1`、`+2`……，到末尾绕回开头），直到找到一个不算碰撞的分支：

1. 本次掷骰已经用过的分支，一律算碰撞。
2. 只要池中还有至少一个**家族**没用到，所属家族已被用过的分支也算碰撞（家族分散）。

走过的步数就是该设计的 `probe`。`probe = 0` 时设计的 ref 是 `<hash>`，否则是 `<hash>+<probe>`。由于 probe 是 ref 的一部分，任何一个设计都可以脱离同次掷骰的其他设计单独复现。

当前库里的六个家族及其分支数：

| 家族               | 分支数 |
| ------------------ | ------ |
| 印刷品 print       | 9      |
| 文档票据 document  | 9      |
| 标识招牌 signage   | 5      |
| 屏幕仪器 screen    | 5      |
| 手作东方 craft     | 6      |
| 现代主义 modernist | 6      |

所以在没有家族约束时，5 连抽一定横跨五个不同家族，6 连抽则覆盖全部六个。

### 一次碰撞的逐步推演

掷骰 `hash-design roll --seed readme-demo` 得到：

| #   | 哈希（短） | 主分支              | Probe | 走法                                                                                  |
| --- | ---------- | ------------------- | ----- | ------------------------------------------------------------------------------------- |
| 1   | `bfc3d620` | 11 warm-handmade    | 0     | warm-handmade（craft）                                                                |
| 2   | `6081d15f` | 25 art-deco         | 0     | art-deco（modernist）                                                                 |
| 3   | `177b9bc6` | 11 warm-handmade    | 2     | warm-handmade（已用）→ bauhaus-primary（modernist 已用）→ **web1-homepage**（screen） |
| 4   | `5399c212` | 1 engineering-plate | 0     | engineering-plate（document）                                                         |
| 5   | `63438e2e` | 11 warm-handmade    | 3     | … → web1-homepage（已用）→ **risograph-duotone**（print）                             |

设计 3 的 ref 是 `177b9bc61fd1dd51498216c1defceaabb2204ce863923ee50657e427b769b792+2`，单独运行 `hash-design brief 177b9bc61fd1dd51498216c1defceaabb2204ce863923ee50657e427b769b792+2` 就能重建它。

## 4. 分支顺序

库的顺序（`packages/core/src/data/branches/index.ts` 中的 `BRANCH_ORDER`）就是映射顺序，而且是刻意安排的：每个家族的成员均匀分布在整圈上。如果同一家族的分支扎堆排在一起，向后走跳过已用家族时，概率就会集中到紧跟在这一堆后面的那个分支上。均匀分布之后，每个分支在 5 连抽中的出现率为 9–17%（完全均匀应为 12.5%）。

## 5. 约束

约束在读取任何字节**之前**通过过滤池子生效。因此约束也是设计身份的一部分：同一个哈希配上不同约束就是另一个设计，要复现它，必须给 `get_brief` / `hash-design brief` 传同样的约束。

| MCP 参数           | CLI 参数           | 效果                                                                        |
| ------------------ | ------------------ | --------------------------------------------------------------------------- |
| `light_only`       | `--light-only`     | 只用浅色调色板                                                              |
| `dark_only`        | `--dark-only`      | 只用深色调色板；没有深色调色板的分支移出池子                                |
| `reduced_motion`   | `--reduced-motion` | 每个分支取最静止的动效选项（不使用第 7 字节）                               |
| `brand_colors`     | `--brand <#hex>`   | 最多 2 个颜色：取色相最近的调色板，覆盖 accent / accent2（不使用第 5 字节） |
| `families`         | `--family <id>`    | 把分支池限制在这些家族内                                                    |
| `include_branches` | `--include <id>`   | 把分支池限制为这些分支 id                                                   |
| `exclude_branches` | `--exclude <id>`   | 从池中移除这些分支 id                                                       |

`light_only` 和 `dark_only` 不能同时使用。未知的分支 id 会被拒绝。约束过滤后池子为空会报错。

## 6. 可复现性与库指纹

一个设计是 `(hash, probe, constraints, library)` 的纯函数。每份 brief 和每个 `roll.json` 都会记录：

- `algorithm`：`hash-design/v1`。只有字节分配改变时它才会变。
- `library`：`sha256(JSON.stringify({ ALGORITHM, BRANCHES, VOICES, TWISTS, DENSITIES, SCALES }))` 的前 12 位十六进制数字，目前是 `c7b166fe6ec0`。

对分支数据或池子的任何修改都会改变指纹。旧 ref 仍然能解析，但可能已经映射到不同的设计，所以复现旧 ref 时，请使用指纹与之匹配的 hash-design 版本。仓库自带的示例就是这样锁定的：如果库指纹与 `examples/fourth-lane-bakery/roll.json` 不再一致，`packages/core/test/examples.test.ts` 就会失败。

## 7. 推演示例：#3 水墨印章

哈希 `7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4`，probe 0，无约束，来自[第四巷面包店示例](../examples/fourth-lane-bakery/briefs/03-ink-and-seal.md)：

| 字节 | 十六进制 | 维度            | 规则                        | 结果                  |
| ---- | -------- | --------------- | --------------------------- | --------------------- |
| 0+1  | `7f 18`  | 分支 branch     | 0x7f18 = 32536; mod 40 = 16 | **ink-and-seal**      |
| 2    | `e1`     | 文案语气 voice  | 225 mod 14 = 1              | **field-notes**       |
| 3    | `dc`     | 版式 layout     | 220 mod 3 = 1               | **handscroll**        |
| 4    | `68`     | 字体对 type     | 104 mod 3 = 2               | **caoshu-antique**    |
| 5    | `35`     | 配色 palette    | 53 mod 3 = 2                | **blue-green-silk**   |
| 6    | `9c`     | 密度 density    | 156 mod 2 = 0               | **airy**              |
| 7    | `51`     | 动效 motion     | 81 mod 3 = 0                | **ink-bleed**         |
| 8    | `db`     | 母题 motif      | 219 mod 3 = 0               | **seals**             |
| 9    | `6b`     | 首屏锚点 anchor | 107 mod 3 = 2               | **seal-as-title**     |
| 10   | `b6`     | 字号比例 scale  | 182 mod 3 = 2               | **perfect-fourth**    |
| 11   | `90`     | 材质 surface    | 144 mod 3 = 0               | **xuan-fibre**        |
| 12   | `3d`     | 变数 twist      | 61 mod 16 = 13              | **time-as-structure** |

复现：

```bash
node packages/core/dist/bin.js brief 7f18e1dc68359c51db6bb6903d7778c59556fad43c0b1bb2aa52adf7051e97a4
```

## 8. 修改映射

- 增加、删除或重新排列分支，或者修改任何选项，都会改变 `N` 和/或指纹。这是允许的，库就是这样扩充的。改完之后请重新掷示例（见 [CONTRIBUTING.md](../CONTRIBUTING.md)）。
- 改变哪个字节驱动哪个维度，或者修改碰撞规则，属于算法变更，必须升级 `ALGORITHM`（例如升到 `hash-design/v2`）。
