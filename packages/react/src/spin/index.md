---
title: Spin
group:
  title: 反馈
  order: 6
---

# Spin

加载中。

## 基本用法

```tsx
import { VertMSpin, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpin spinning tip="ᠡᠷᠢᠵᠦ ᠪᠠᠢᠨ᠎ᠠ ᠁">
      <div style={{ minHeight: 80, padding: 12 }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" fontSize={16} />
      </div>
    </VertMSpin>
  </VertMDemoFrame>
);
```

## 竖排提示

- `tip` 字符串走 `VertMText`
- 可包裹任意内容作为遮罩目标

## API

<API id="VertMSpin"></API>
