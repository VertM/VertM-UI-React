---
title: Tooltip
group:
  title: 数据展示
  order: 10
---

# Tooltip

悬停提示。底层基于 `Overlay` / `Portal`（定位与挂载工具，一般直接用 Tooltip 即可）。

## 基本用法

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
      <VertMButton>Tooltip</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

## 竖排提示

- `placement` 随竖排自动适配边缘
- 需要自定义浮层时再组合 `Overlay` + `Portal`

## API

<API id="Tooltip"></API>
