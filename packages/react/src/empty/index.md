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
    <VertMEmpty description="ᠬᠣᠭᠣᠰᠤᠨ ᠪᠠᠢᠨ᠎ᠠ ᠁" />
  </VertMDemoFrame>
);
```

## 竖排提示

- `description` 字符串走 `VertMText`
- 可通过 `image` 自定义插图

## API

<API id="VertMEmpty"></API>
