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

## dataSource

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMList
      bordered
      header={<VertMText text="ᠲᠣᠯᠣᠭᠠᠢ" />}
      dataSource={[
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
      ]}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

## 树形嵌套

```tsx
import { VertMList } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMList
      items={[
        {
          id: '1',
          text: 'ᠡᠴᠡᠭᠡ',
          children: [
            { id: '1-1', text: 'ᠬᠡᠦᠬᠡᠳ' },
            { id: '1-2', text: 'ᠦᠷ᠎ᠡ' },
          ],
        },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
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
