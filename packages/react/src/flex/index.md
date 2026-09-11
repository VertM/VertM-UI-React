---
title: Flex
group:
  title: 布局
  order: 3
---

# Flex

弹性布局容器，默认跟随书写模式取向。

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

## 主轴方向

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMFlex vertical gap={8}>
      <VertMButton>ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 分布对齐

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMFlex
      justify="space-between"
      align="center"
      gap={8}
      style={{ width: '100%', minHeight: 120 }}
    >
      <VertMButton type="primary">ᠡᠬᠢᠯᠡ</VertMButton>
      <VertMButton>ᠳᠤᠮᠳᠠ</VertMButton>
      <VertMButton>ᠲᠡᠭᠦᠰ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 竖排提示

- 未指定 `vertical` 时，跟随当前 `writingMode`
- `justify` / `align` / `gap` 与 antd Flex 对齐

## API

<API id="VertMFlex"></API>
