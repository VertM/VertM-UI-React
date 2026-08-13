# VertM UI — 传统蒙古文竖排 React 组件库

[![CI](https://github.com/VertM/VertM-UI-React/actions/workflows/ci.yml/badge.svg)](https://github.com/VertM/VertM-UI-React/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**VertM UI** 是面向传统蒙古文竖排（`vertical-lr`）的 React 组件库，组件 API 尽量贴近 [Ant Design](https://ant.design/components/overview-cn/) 的使用习惯，便于上手。名称取 **Vert**(ical) + **M**(ongolian) 之意。

采用 **CSS-native 渲染路径**（`writing-mode: vertical-lr`，符合 [W3C mlreq](https://www.w3.org/TR/mlreq/)），输入交互使用 Mirror Input 模式。

## 预览

### 基础组件

Button、Input、Tag 等：

![Button / Input / Tag](./images/buttons.jpg)

### 表单与选择

Radio、Checkbox、Switch、Select、Form：

![Radio / Checkbox / Select / Form](./images/selection.jpg)

### 导航与布局

Menu、Tabs、Dropdown、Pagination、Steps、Collapse：

![Menu / Tabs / Pagination / Steps](./images/menu.jpg)

## 包结构

| 包 | 说明 |
|----|------|
| `@vertm/core` | 框架无关：文本规范化、检索归一化、字体检测、浏览器能力检测、元音和谐、后缀表、换行分段、光标映射 |
| `@vertm/tokens` | 设计令牌：颜色、间距、圆角、字号、竖排专属令牌（`columnSize`、`columnGap` 等） |
| `@vertm/styles` | CSS 变量（`--vertm-*`）与 vertical-lr 竖排原子样式 |
| `@vertm/icons` | 方向感知 SVG 图标（竖排自动旋转） |
| `@vertm/react` | VertM UI React 组件库 |
| `@vertm/wasm` | 可选：Harfbuzz WASM shaping（Canvas 导出 / 旧浏览器 fallback） |

## 快速开始

```bash
npm install @vertm/react @vertm/styles @vertm/tokens
```

本地开发：

```bash
npm install
npm run build
npm run dev   # 启动 Demo (http://localhost:5173)
```

## 使用示例

```tsx
import { VertMConfigProvider, Typography, VertMText, VertMTextField } from '@vertm/react';
import { createTheme } from '@vertm/tokens';
import '@vertm/styles/index.css';

<VertMConfigProvider theme={createTheme()}>
  <Typography.Title level={2}>ᠮᠣᠩᠭᠣᠯ</Typography.Title>
  <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ" fontSize={24} />
  <VertMTextField
    value={text}
    onChange={setText}
    placeholder="ᠪᠢᠴᠢᠭ ᠣᠷᠤᠭᠤᠯ..."
    rows={4}
  />
</VertMConfigProvider>
```

### 命令式反馈（App）

`message` / `notification` / `Modal.confirm` 的全局导出会各自挂载一个独立的 React 根，读不到外层 `VertMConfigProvider` 的主题、书写模式与 locale。用 `App` 包住应用，再通过 `App.useApp()` 取实例，就能让这些浮层跟随当前配置：

```tsx
import { VertMConfigProvider, App } from '@vertm/react';
import { createTheme } from '@vertm/tokens';

function Page() {
  const { message, notification, modal } = App.useApp();

  return (
    <button
      onClick={() =>
        modal.confirm({
          title: 'ᠤᠰᠠᠳᠬᠠᠬᠤ ᠤᠤ',
          content: 'ᠡᠨᠡ ᠦᠢᠯᠡᠳᠦᠯ ᠢ ᠪᠤᠴᠠᠭᠠᠵᠤ ᠪᠣᠯᠬᠤ ᠦᠭᠡᠢ',
          // 返回 Promise 时确认按钮进入 loading，reject 则保持弹窗打开
          onOk: () => remove().then(() => message.success('ᠠᠮᠵᠢᠯᠲᠠ')),
        })
      }
    >
      ᠤᠰᠠᠳᠬᠠᠬᠤ
    </button>
  );
}

<VertMConfigProvider theme={createTheme({ colorPrimary: '#c0392b' })}>
  <App>
    <Page />
  </App>
</VertMConfigProvider>;
```

### 检索归一化（解决 O/U 搜索歧义）

```ts
import { normalizeForSearch, genderOfString } from '@vertm/core';

normalizeForSearch('ᠮᠣᠩᠭᠣᠯ') === normalizeForSearch('ᠮᠤᠩᠭᠤᠯ'); // true
genderOfString('ᠮᠣᠩᠭᠣᠯ'); // 'masculine'
```

## 开发

```bash
npm run typecheck
npm run build
npm test
```

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。浏览器兼容说明见 [docs/browser-matrix.md](docs/browser-matrix.md)。

## 致谢与归属

`@vertm/core` 中的部分内容移植/改编自 [suragch/mongol_code](https://github.com/suragch/mongol_code)（**CC0-1.0**）。

## 许可证

[MIT](./LICENSE) © 2026 VertM
