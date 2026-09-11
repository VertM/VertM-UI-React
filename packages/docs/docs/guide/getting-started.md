---
title: 快速开始
order: 2
---

# 快速开始

## 安装

```bash
npm install @vertm/react @vertm/styles @vertm/tokens
```

可选：`@vertm/icons`、`@vertm/core`、`@vertm/wasm`。

## 最小示例

```tsx
import { ConfigProvider, Button, Input } from '@vertm/react';
import '@vertm/styles/index.css';

export default function App() {
  return (
    <ConfigProvider writingMode="vertical-lr">
      <Button type="primary">ᠨᠡᠮᠡᠬᠦ</Button>
      <Input placeholder="ᠪᠢᠴᠢᠭ" />
    </ConfigProvider>
  );
}
```

## Editorial 外观

```tsx
import { ConfigProvider } from '@vertm/react';

<ConfigProvider appearance="editorial">
  {/* 自动采用 editorialTheme + 列式状态语言 */}
</ConfigProvider>
```

## 本地文档站

```bash
npm run docs
# → http://localhost:8000/VertM-UI-React/
```

> 示例代码以文档站为准；`packages/react-demo` 已冻结为内部 playground，不再新增面向用户的示例。
