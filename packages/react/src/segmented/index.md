---
title: Segmented
group:
  title: 数据录入
  order: 7
---

# Segmented

分段控制器，用于在少数选项间切换。

## 基本用法

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSegmented
      defaultValue="a"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
        { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 撑满容器

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSegmented
      block
      defaultValue="day"
      options={[
        { label: 'ᠡᠳᠦᠷ', value: 'day' },
        { label: 'ᠳᠣᠯᠣᠭ᠎ᠠ', value: 'week' },
        { label: 'ᠰᠠᠷ᠎ᠠ', value: 'month' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 受控

```tsx
import { useState } from 'react';
import { VertMSegmented, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('a');
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMSpace align="start" size="middle">
        <VertMSegmented
          value={value}
          onChange={setValue}
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
        <VertMText text={String(value)} />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 竖排下选项沿 block 轴排列
- `block` 可撑满容器

## API

<API id="VertMSegmented"></API>
