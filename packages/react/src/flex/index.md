---
title: Flex
group:
  title: 布局
  order: 3
---

# Flex

弹性布局容器。竖排书写模式下默认沿 block 轴堆叠。

## 基本用法

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMFlex gap={12} align="center">
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
      <VertMButton type="dashed">ᠵᠠᠰᠠᠬᠤ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 竖排提示

- 未指定 `vertical` 时，跟随当前 `writingMode`
- `justify` / `align` / `gap` 与 antd Flex 对齐

## API

<API id="VertMFlex"></API>
