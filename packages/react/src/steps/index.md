---
title: Steps
group:
  title: 导航
  order: 6
---

# Steps

步骤条，展示流程进度。

## 基本用法

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMSteps
      current={1}
      items={[
        { title: 'ᠨᠢᠭᠡ', description: 'ᠡᠬᠢᠯᠡ' },
        { title: 'ᠬᠣᠶᠠᠷ', description: 'ᠶᠠᠪᠤᠵᠤ' },
        { title: 'ᠭᠤᠷᠪᠠ', description: 'ᠲᠡᠭᠦᠰ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 错误态

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSteps
      current={1}
      items={[
        { title: 'ᠨᠢᠭᠡ', status: 'finish' },
        { title: 'ᠬᠣᠶᠠᠷ', status: 'error', description: 'ᠠᠯᠳᠠᠭ᠎ᠠ' },
        { title: 'ᠭᠤᠷᠪᠠ', status: 'wait' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 强制横向

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSteps
      direction="horizontal"
      current={0}
      items={[
        { title: 'A' },
        { title: 'B' },
        { title: 'C' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下步骤沿 block 轴推进
- `direction` 可强制横/竖

## API

<API id="VertMSteps"></API>
