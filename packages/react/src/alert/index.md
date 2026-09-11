---
title: Alert
group:
  title: 反馈
  order: 1
---

# Alert

警告提示。

## 基本用法

```tsx
import { VertMAlert, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMAlert type="success" message="ᠵᠥᠪ !" showIcon closable />
      <VertMAlert
        type="warning"
        message="ᠠᠩᠬᠠᠷ !"
        description="ᠪᠤᠷᠤᠭᠤ ᠭᠠᠷᠪᠠ"
        showIcon
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `message` / `description` 字符串走 `VertMText`
- `type`：`success` / `info` / `warning` / `error`

## API

<API id="VertMAlert"></API>
