---
title: Grid
group:
  title: 布局
  order: 2
---

# Grid

24 栅格：`VertMRow` + `VertMCol`。

## 基本用法

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMRow gutter={16}>
      <VertMCol span={8}>
        <VertMText text="ᠨᠢᠭᠡ" fontSize={16} />
      </VertMCol>
      <VertMCol span={8}>
        <VertMText text="ᠬᠣᠶᠠᠷ" fontSize={16} />
      </VertMCol>
      <VertMCol span={8}>
        <VertMText text="ᠭᠤᠷᠪᠠ" fontSize={16} />
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 偏移

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMRow gutter={12}>
      <VertMCol span={6} offset={6}>
        <VertMText text="offset 6" fontSize={14} />
      </VertMCol>
      <VertMCol span={6}>
        <VertMText text="ᠪᠠᠷᠠᠭᠤᠨ" fontSize={14} />
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 对齐

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMRow gutter={8} justify="space-between" align="middle">
      <VertMCol span={6}>
        <VertMText text="ᠠ" fontSize={18} />
      </VertMCol>
      <VertMCol span={6}>
        <VertMText text="ᠪ" fontSize={14} />
      </VertMCol>
      <VertMCol span={6}>
        <VertMText text="ᠴ" fontSize={18} />
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 竖排提示

- `gutter` 在竖排下会交换行列间距语义
- 支持 `xs`–`xxl` 响应式 span

## API

<API id="VertMRow"></API>
