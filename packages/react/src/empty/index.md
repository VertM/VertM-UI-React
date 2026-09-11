---
title: Empty
group:
  title: 反馈
  order: 9
---

# Empty

空状态。

## 基本用法

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty />
  </VertMDemoFrame>
);
```

## 自定义描述

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty description="ᠮᠡᠳᠡᠭᠡ ᠦᠭᠡᠢ" />
  </VertMDemoFrame>
);
```

## 附加操作

```tsx
import { VertMEmpty, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMEmpty description="ᠬᠣᠭᠣᠰᠣᠨ">
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
    </VertMEmpty>
  </VertMDemoFrame>
);
```

## 竖排提示

- `description` 字符串走 `VertMText`
- 可通过 `image` 自定义插图

## API

<API id="VertMEmpty"></API>
