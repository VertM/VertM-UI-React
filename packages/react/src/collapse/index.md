---
title: Collapse
group:
  title: 数据展示
  order: 7
---

# Collapse

折叠面板。

## 基本用法

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCollapse
      height={240}
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'ᠨᠢᠭᠡ',
          children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" fontSize={14} />,
        },
        {
          key: '2',
          label: 'ᠬᠣᠶᠠᠷ',
          children: <VertMText text="ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠬᠠᠪᠲᠠᠰᠤ" fontSize={14} />,
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `height` 固定容器高度，内容在竖排区域内滚动
- `accordion` 可限制同时只开一面板

## API

<API id="VertMCollapse"></API>
