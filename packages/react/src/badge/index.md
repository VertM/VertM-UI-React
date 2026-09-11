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

## 竖排提示

- 徽标偏移随书写方向调整
- `overflowCount` 默认 99

## API

<API id="VertMBadge"></API>
