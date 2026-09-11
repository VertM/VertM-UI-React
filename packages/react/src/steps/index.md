---
title: Steps
group:
  title: 导航
  order: 6
---

# Steps

步骤条。`items` 描述各步标题与说明。

## 基本用法

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSteps
      current={1}
      items={[
        { title: 'ᠨᠢᠭᠡᠳᠦᠭᠡᠷ', description: 'ᠭᠦᠢᠴᠡᠳᠬᠡᠭᠰᠡᠨ' },
        { title: 'ᠬᠣᠶᠠᠳᠤᠭᠠᠷ', description: 'ᠭᠦᠢᠴᠡᠳᠬᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ' },
        { title: 'ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ', description: 'ᠬᠦᠯᠢᠶᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ' },
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
