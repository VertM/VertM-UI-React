---
title: Space
group:
  title: 布局
  order: 4
---

# Space

设置组件之间的间距。

## 基本用法

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace>
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
      <VertMButton type="dashed">ᠵᠠᠰᠠᠬᠤ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMSpace size="small">
        <VertMButton size="small">S</VertMButton>
        <VertMButton size="small">S</VertMButton>
      </VertMSpace>
      <VertMSpace size="middle">
        <VertMButton>M</VertMButton>
        <VertMButton>M</VertMButton>
      </VertMSpace>
      <VertMSpace size={24}>
        <VertMButton size="large">L</VertMButton>
        <VertMButton size="large">L</VertMButton>
      </VertMSpace>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 分割与换行

```tsx
import { VertMSpace, VertMButton, VertMDivider } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace
      wrap
      split={<VertMDivider />}
      size="middle"
    >
      <VertMButton>ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
      <VertMButton>ᠳᠥᠷᠪᠡ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `direction` 未设时随竖排书写模式自动取向
- `size` 支持 `small` / `middle` / `large` 或数字

## API

<API id="VertMSpace"></API>
