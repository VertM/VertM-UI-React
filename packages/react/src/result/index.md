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
  <VertMDemoFrame minHeight={320}>
    <VertMResult
      status="success"
      title="ᠵᠥᠪ !"
      subTitle="ᠠᠮᠵᠢᠯᠲᠠᠲᠠᠢ"
      extra={<VertMButton type="primary">ᠪᠤᠴᠠᠬᠤ</VertMButton>}
    />
  </VertMDemoFrame>
);
```

## 错误

```tsx
import { VertMResult, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMResult
      status="error"
      title="ᠠᠯᠳᠠᠭ᠎ᠠ"
      subTitle="ᠳᠠᠬᠢᠨ ᠣᠷᠤᠯᠳᠤ"
      extra={<VertMButton>retry</VertMButton>}
    />
  </VertMDemoFrame>
);
```

## 404

```tsx
import { VertMResult } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMResult status="404" title="404" subTitle="ᠣᠯᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ" />
  </VertMDemoFrame>
);
```

## 竖排提示

- `title` / `subTitle` 字符串自动竖排
- `status`：`success` / `error` / `info` / `warning` / `404` 等

## API

<API id="VertMResult"></API>
