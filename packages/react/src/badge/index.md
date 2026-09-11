---
title: Badge
group:
  title: 数据展示
  order: 6
---

# Badge

徽标数 / 状态点。

## 基本用法

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace size="large" align="center">
      <VertMBadge count={5}>
        <VertMAvatar shape="square">ᠨ</VertMAvatar>
      </VertMBadge>
      <VertMBadge dot>
        <VertMAvatar shape="square">ᠪ</VertMAvatar>
      </VertMBadge>
      <VertMBadge status="success" text="ᠵᠥᠪ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 溢出

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace size="large" align="center">
      <VertMBadge count={100}>
        <VertMAvatar shape="square">ᠨ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={1000} overflowCount={999}>
        <VertMAvatar shape="square">ᠮ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={0} showZero>
        <VertMAvatar shape="square">0</VertMAvatar>
      </VertMBadge>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 状态点

```tsx
import { VertMBadge, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMBadge status="success" text="success" />
      <VertMBadge status="processing" text="processing" />
      <VertMBadge status="default" text="default" />
      <VertMBadge status="error" text="error" />
      <VertMBadge status="warning" text="warning" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 徽标偏移随书写方向调整
- `overflowCount` 默认 99

## API

<API id="VertMBadge"></API>
