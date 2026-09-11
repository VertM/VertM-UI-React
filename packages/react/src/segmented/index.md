---
title: Segmented
group:
  title: 数据录入
  order: 7
---

# Segmented

分段控制器。

## 基本用法

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSegmented
      defaultValue="day"
      options={[
        { label: 'ᠡᠳᠦᠷ', value: 'day' },
        { label: 'ᠳᠣᠯᠣᠭᠠᠨ', value: 'week' },
        { label: 'ᠰᠠᠷ᠎ᠠ', value: 'month' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下选项沿 block 轴排列
- `block` 可撑满容器

## API

<API id="VertMSegmented"></API>
