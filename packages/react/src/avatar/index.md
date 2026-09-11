---
title: Avatar
group:
  title: 数据展示
  order: 5
---

# Avatar

头像。支持 `Group` 与文字头像。

## 基本用法

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center" size="middle">
      <VertMAvatar size="large">ᠪ</VertMAvatar>
      <VertMAvatar shape="square">ᠤ</VertMAvatar>
      <VertMAvatar.Group maxCount={2}>
        <VertMAvatar>ᠠ</VertMAvatar>
        <VertMAvatar>ᠪ</VertMAvatar>
        <VertMAvatar>ᠴ</VertMAvatar>
      </VertMAvatar.Group>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center" size="middle">
      <VertMAvatar size="small">S</VertMAvatar>
      <VertMAvatar>M</VertMAvatar>
      <VertMAvatar size="large">L</VertMAvatar>
      <VertMAvatar size={48}>48</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 方形

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center">
      <VertMAvatar shape="square" size="large">
        ᠪ
      </VertMAvatar>
      <VertMAvatar shape="square">ᠤ</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 文字子节点走 `VertMText`
- `size` 可为 `small` / `default` / `large` 或数字

## API

<API id="VertMAvatar"></API>
