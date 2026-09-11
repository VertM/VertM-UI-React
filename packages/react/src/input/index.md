---
title: Input
group:
  title: 数据录入
  order: 1
---

# Input

竖排输入。含 `VertMSearch` 与 `TextArea`。

## 基本用法

```tsx
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMInput placeholder="ᠨᠡᠷ᠎ᠡ" style={{ width: 48 }} />
    <VertMInput placeholder="disabled" disabled style={{ width: 48 }} />
  </VertMDemoFrame>
);
```

## Search

```tsx
import { VertMSearch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSearch
      placeholder="ᠬᠠᠶᠢᠯᠲᠠ"
      style={{ width: 48 }}
      onSearch={(v) => console.log(v)}
    />
  </VertMDemoFrame>
);
```

## 多行 TextArea

```tsx
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMInput.TextArea
      placeholder="ᠠᠭᠤᠯᠭ᠎ᠠ"
      rows={3}
      columnDepth={4}
      style={{ width: 56 }}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 焦点态使用 block-end marker（Editorial）
- 复杂竖排编辑请优先考虑 `VertMTextField`（Mirror Input）

## API

<API id="VertMInput"></API>
