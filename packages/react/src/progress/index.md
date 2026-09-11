---
title: Progress
group:
  title: 反馈
  order: 5
---

# Progress

进度条。

## 基本用法

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMProgress percent={65} />
      <VertMProgress type="circle" percent={75} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 状态

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMProgress percent={100} status="success" />
      <VertMProgress percent={70} status="exception" />
      <VertMProgress percent={50} status="active" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 步骤条

```tsx
import { VertMProgress } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMProgress percent={60} steps={5} />
  </VertMDemoFrame>
);
```

## 竖排提示

- 线型进度在竖排下沿 block 轴展开
- `status`：`success` / `exception` / `active` / `normal`

## API

<API id="VertMProgress"></API>
