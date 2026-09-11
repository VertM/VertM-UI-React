---
title: Skeleton
group:
  title: 反馈
  order: 7
---

# Skeleton

骨架屏占位。

## 基本用法

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSkeleton />
  </VertMDemoFrame>
);
```

## 头像与段落

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSkeleton avatar paragraph={{ rows: 3 }} />
  </VertMDemoFrame>
);
```

## 动画

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSkeleton active round paragraph={{ rows: 2 }} />
  </VertMDemoFrame>
);
```

## 竖排提示

- 段落骨架沿书写方向排布
- `active` 开启闪烁动画

## API

<API id="VertMSkeleton"></API>
