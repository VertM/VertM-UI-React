---
title: Space
group:
  title: 布局
  order: 4
---

# Space

间距排列。可用 `split` 插入分隔元素。

## 基本用法

```tsx
import { VertMSpace, VertMButton, VertMDivider } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace size="middle" align="start" split={<VertMDivider />}>
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
      <VertMButton>ᠵᠠᠰᠠᠬᠤ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `direction` 未设时随竖排书写模式自动取向
- `size` 支持 `small` / `middle` / `large` 或数字

## API

<API id="VertMSpace"></API>
