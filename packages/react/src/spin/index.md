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
import { VertMSpin } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpin />
  </VertMDemoFrame>
);
```

## 包裹内容

```tsx
import { useState } from 'react';
import { VertMSpin, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [spinning, setSpinning] = useState(true);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMSpace align="start" size="middle">
        <VertMButton onClick={() => setSpinning((v) => !v)}>toggle</VertMButton>
        <VertMSpin spinning={spinning} tip="ᠡᠷᠢᠵᠦ ᠪᠠᠢᠨ᠎ᠠ ᠁">
          <div style={{ minHeight: 80, minWidth: 80 }}>
            <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
          </div>
        </VertMSpin>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 尺寸

```tsx
import { VertMSpin, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center" size="large">
      <VertMSpin size="small" />
      <VertMSpin />
      <VertMSpin size="large" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `tip` 字符串走 `VertMText`
- 可包裹任意内容作为遮罩目标

## API

<API id="VertMSpin"></API>
