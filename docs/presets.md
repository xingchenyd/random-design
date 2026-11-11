# 固定风格 / Fixed styles

顺序对应参考视频中的 01–21。新版图录以虚构的岚谷咖啡作对比示例，保留相同的三款饮品与价格。每种风格可在工作台打开，也可通过 CLI 和 MCP 按 ID 调用。[中文图录](https://xingchenyd.github.io/random-design/presets/) · [English catalogue](https://xingchenyd.github.io/random-design/presets/en.html)

| # | 中文 | English | ID | 首屏构图 |
|---|---|---|---|---|
| 01 | 赛博朋克 | Cyberpunk | `cyberpunk` | 霓虹图形与底部菜单 |
| 02 | 复古终端 | Retro Terminal | `retro-terminal` | 左侧命令行与右侧清单 |
| 03 | 拟物 | Skeuomorphism | `skeuomorphism` | 木质底板与独立菜单牌 |
| 04 | 玻璃拟态 | Glassmorphism | `glassmorphism` | 两块磨砂玻璃面板 |
| 05 | 粗野主义 | Brutalism | `brutalism` | 大字号标题与硬边菜单 |
| 06 | 波普艺术 | Pop Art | `pop-art` | 网点印刷与漫画菜单 |
| 07 | 孟菲斯 | Memphis | `memphis` | 几何单元与跳色条目 |
| 08 | 杂志排版 | Editorial | `editorial` | 衬线大字与细线分栏 |
| 09 | 瑞士风格 | Swiss Style | `swiss` | 网格、黑体与红色焦点 |
| 10 | 黏土拟态 | Claymorphism | `claymorphism` | 黏土杯与软圆角菜单 |
| 11 | 新拟态 | Neumorphism | `neumorphism` | 同色双影与凸起杯盘 |
| 12 | 千禧 Y2K | Y2K Aesthetic | `y2k` | 虹彩窗口与胶囊按钮 |
| 13 | 像素风 | Pixel Art | `pixel-art` | 像素咖啡吧与方格菜单 |
| 14 | 新粗野主义 | Neubrutalism | `neubrutalism` | 亮色卡片与硬投影 |
| 15 | 包豪斯 | Bauhaus | `bauhaus` | 三原色几何与底部色带 |
| 16 | 蒸汽波 | Vaporwave | `vaporwave` | 粉紫落日与透视地面 |
| 17 | 极光渐变 | Aurora Gradient | `aurora` | 中央标题与光幕 |
| 18 | 装饰艺术 | Art Deco | `art-deco` | 对称扇纹与金线边框 |
| 19 | 科幻 HUD 界面 | Sci-Fi HUD | `sci-fi-hud` | 居中取景器与读数框 |
| 20 | 便当盒布局 | Bento Grid | `bento` | 跨行主区与错落拼板 |
| 21 | 新中式 | New Chinese Style | `new-chinese` | 中文竖排、圆窗山水与菜单 |

```sh
node src/cli.js list-presets
node src/cli.js preset --style new-chinese --out output/chinese
node src/cli.js generate --direction new-chinese --count 1 --seed coffee-01 --out output/chinese-variation
```

`preset` 返回同一套固定配色和排版。用 `generate --direction` 可以在这个方向下抽取哈希变体。限定方向时，可用配色受该方向约束，过窄的约束可能耗尽候选。

The CLI and MCP use the same style IDs. `get_preset` returns the fixed design JSON. `generate_directions` with a direction generates a seeded variation. The browser deep link is `?preset=new-chinese&lang=en`.

PowerPoint uses the palette, type roles, cover composition and compatible illustrations of the selected style. Text, tables and charts remain editable. Web effects such as backdrop blur are translated into PowerPoint-compatible surfaces.
