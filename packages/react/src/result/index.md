---
title: Result
group:
  title: 反馈
  order: 8
---

# Result

结果页。

## 基本用法

```tsx
import { VertMResult, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMResult
      status="success"
      title="ᠳᠠᠭᠤᠰᠪᠡ"
      subTitle="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁"
      extra={<VertMButton type="primary">ᠪᠤᠴᠠᠬᠤ</VertMButton>}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `title` / `subTitle` 字符串自动竖排
- `status`：`success` / `error` / `info` / `warning` / `404` 等

## API

<API id="VertMResult"></API>
