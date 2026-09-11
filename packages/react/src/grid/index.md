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

## 竖排提示

- `gutter` 在竖排下会交换行列间距语义
- 支持 `xs`–`xxl` 响应式 span

## API

<API id="VertMRow"></API>
