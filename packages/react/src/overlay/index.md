---
title: Tooltip
group:
  title: 数据展示
  order: 10
---

# Tooltip

文字提示气泡。

## 基本用法

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="ᠲᠠᠢᠯᠪᠤᠷᠢ">
      <VertMButton>hover</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

## 位置

```tsx
import { Tooltip, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace>
      <Tooltip title="top" placement="top">
        <VertMButton>top</VertMButton>
      </Tooltip>
      <Tooltip title="bottom" placement="bottom">
        <VertMButton>bottom</VertMButton>
      </Tooltip>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 点击触发

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="ᠲᠠᠢᠯᠪᠤᠷᠢ" trigger="click">
      <VertMButton type="primary">click</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

## 竖排提示

- `placement` 随竖排自动适配边缘
- 需要自定义浮层时再组合 `Overlay` + `Portal`

## API

<API id="Tooltip"></API>
