---
title: Progress
group:
  title: 反馈
  order: 5
---

# Progress

进度条 / 环形进度。

## 基本用法

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace size="large" align="start">
      <VertMProgress percent={65} />
      <VertMProgress type="circle" percent={75} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 线型进度在竖排下沿 block 轴展开
- `status`：`success` / `exception` / `active` / `normal`

## API

<API id="VertMProgress"></API>
