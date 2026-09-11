---
title: List
group:
  title: 数据展示
  order: 2
---

# List

列表。支持树形 `items` 或 antd 风格 `dataSource` + `renderItem`。

## 基本用法

```tsx
import { VertMList } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMList
      ordered
      fontSize={16}
      items={[
        { id: '1', text: 'ᠨᠢᠭᠡ' },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
        { id: '3', text: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 列表项文本经 `VertMText` 渲染
- `grid` / `pagination` 可用于数据密集型场景

## API

<API id="VertMList"></API>
