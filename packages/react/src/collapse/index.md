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
import { VertMCollapse } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMCollapse
      defaultActiveKey={['1']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁' },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: 'ᠬᠣᠶᠠᠳᠤᠭᠠᠷ' },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: 'ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 手风琴

```tsx
import { VertMCollapse } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCollapse
      accordion
      defaultActiveKey="1"
      items={[
        { key: '1', label: 'A', children: 'only one open' },
        { key: '2', label: 'B', children: 'panel B' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 固定高度

```tsx
import { VertMCollapse } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMCollapse
      height={200}
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'ᠤᠷᠲᠤ',
          children: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠠᠭᠤᠯᠭ᠎ᠠ ᠠᠭᠤᠯᠭ᠎ᠠ ᠠᠭᠤᠯᠭ᠎ᠠ',
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
