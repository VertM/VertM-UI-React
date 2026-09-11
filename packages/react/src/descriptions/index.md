---
title: Descriptions
group:
  title: 数据展示
  order: 3
---

# Descriptions

描述列表。

## 基本用法

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMDescriptions
      title="ᠮᠡᠳᠡᠭᠡᠯᠡᠯ"
      bordered
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠪᠠᠲᠤ' },
        { key: '2', label: 'ᠨᠠᠰᠤ', children: 'ᠬᠤᠶᠢᠨ' },
        { key: '3', label: 'ᠣᠷᠤᠨ', children: 'ᠬᠥᠬᠡᠬᠣᠲᠠ' },
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
