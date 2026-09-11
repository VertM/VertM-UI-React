---
title: Descriptions
group:
  title: 数据展示
  order: 3
---

# Descriptions

描述列表，展示字段键值对。

## 基本用法

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMDescriptions
      title="ᠮᠡᠳᠡᠭᠡᠯᠡᠯ"
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠪᠠᠲᠤ' },
        { key: '2', label: 'ᠨᠠᠰᠤ', children: '28' },
        { key: '3', label: 'ᠬᠣᠲᠠ', children: 'ᠬᠥᠬᠡᠬᠣᠲᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 边框与列数

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMDescriptions
      bordered
      column={2}
      items={[
        { key: 'a', label: 'A', children: '1' },
        { key: 'b', label: 'B', children: '2' },
        { key: 'c', label: 'C', children: '3' },
        { key: 'd', label: 'D', children: '4' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 单列

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDescriptions
      column={1}
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠰᠠᠷᠠ' },
        { key: '2', label: 'ᠤᠲᠠᠰᠤ', children: '138****0000' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `column` 控制每行项数；竖排下按书写几何排布
- 字符串 label / children 走 `VertMText`

## API

<API id="VertMDescriptions"></API>
