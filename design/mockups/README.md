# Docs site mockups

可复用样机（引用真实 editorial token 色与 Noto Sans Mongolian 字体路径）。

| 样机 | 源码 | 渲染图 |
|------|------|--------|
| 首页 Hero | [hero.html](./hero.html) | [renders/hero.png](./renders/hero.png) |
| DemoFrame / 文档壳对照 | [demo-frame.html](./demo-frame.html) | [renders/demo-frame.png](./renders/demo-frame.png) |

## 工程落地约定

- **Hero** → `packages/docs/docs/index.md` + `packages/docs/src/layouts/site.css`（`.vertm-docs-hero*`）
- **DemoFrame chrome** → `VertMDemoFrame` 顶栏（dot / title / writingMode badge）
- **全局切换器** → 顶栏搜索框左侧下拉（不以本样机 sticky 分段条为准；样机仅作视觉对照）

本地预览样机：用浏览器直接打开对应 HTML（需能访问 `../../packages/styles/src/fonts/...`）。
