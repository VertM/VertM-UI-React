---
title: Icon
group:
  title: 通用
  order: 2
---

# Icon

`@vertm/icons` 提供竖排友好图标。`vertical` 控制是否随书写方向旋转。

## 基本用法

```tsx
import { Check, Search, Loading, ChevronRight, Close } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <Check vertical />
    <Search vertical />
    <Loading spin vertical />
    <ChevronRight vertical />
    <Close vertical />
  </VertMDemoFrame>
);
```

## 尺寸

```tsx
import { Check, Search, InfoCircle } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <Check vertical size="small" />
    <Search vertical size="middle" />
    <InfoCircle vertical size="large" />
    <Check vertical size={28} />
  </VertMDemoFrame>
);
```

## 旋转与方向

```tsx
import { Loading, ChevronRight, ArrowRight } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <Loading spin vertical />
    <ChevronRight vertical />
    <ChevronRight />
    <ArrowRight vertical />
  </VertMDemoFrame>
);
```

## 竖排提示

- 在竖排 UI 中优先传 `vertical`
- `spin` 用于加载态旋转

## API

图标为独立 SVG 组件；通用 props 见 `VertMIconProps`（`size` / `vertical` / `spin` / `className`）。
