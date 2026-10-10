---
title: 常见问题 FAQ
order: 9
---

# 常见问题 FAQ

## 蒙古文显示成方块 / 豆腐块？

1. 确认已 `import '@vertm/styles/index.css'`（含字体）。
2. 用 `detectMongolFonts` / `isFontLoaded` 检测系统是否有蒙古文字体。
3. 通过 `registerFont` 或 `ConfigProvider fontFamily` 显式接入 webfont。

## 页面没有竖排？

- 外层需要 `ConfigProvider`（或 `VertMConfigProvider`）且 `writingMode="vertical-lr"`（默认即是）。
- 检查父级 CSS 是否把 `writing-mode` 重置成了 `horizontal-tb`。
- 文档站可用顶部「竖排 / 横排」切换验证；业务代码里请显式配置。

## `message` / `notification` / `Modal.confirm` 不跟主题？

全局函数会挂独立 React 根，**读不到**外层 `ConfigProvider`。请用：

```tsx | pure
import { App, ConfigProvider } from '@vertm/react';

<ConfigProvider appearance="editorial">
  <App>
    <Page /> {/* 内用 App.useApp() */}
  </App>
</ConfigProvider>
```

详见 [App](/components/app) 与 [Modal](/components/modal)。

## Editorial 开了还是蓝色？

确认同时有：

1. `appearance="editorial"`（或自动采用的 `editorialTheme`）
2. 样式包版本含 `editorial.css`
3. 浮层在 Portal 内（新版本会重挂 CSS 变量）

选中 marker / checkbox 填充应为墨色；只有链接与 caret 用钴蓝。

## 旧 Safari / 竖排输入异常？

见 [浏览器兼容](/guide/browser-matrix)。表单竖排输入走 Mirror Input（`VertMTextField`）；Canvas 导出可选用 `@vertm/wasm`。

## 文档站 demo 主题怎么统一切？

顶部导航栏搜索框左侧的下拉为**全站唯一**切换器，选择会写入 `localStorage`（`vertm-docs-controls`）。个别专题可用 `VertMDemoFrame forceTheme="editorial"` 锁定。
