---
title: Tabs
group:
  title: 导航
  order: 2
---

# Tabs

竖排标签页。默认 `tabPosition="left"`。

## 基本用法

```tsx
import { VertMTabs } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMTabs
      defaultActiveKey="a"
      items={[
        { key: 'a', label: 'ᠨᠢᠭᠡ', children: 'ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠬᠠᠪᠲᠠᠰᠤ' },
        { key: 'b', label: 'ᠬᠣᠶᠠᠷ', children: 'ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠬᠠᠪᠲᠠᠰᠤ' },
        { key: 'c', label: 'ᠭᠤᠷᠪᠠ', children: 'ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠬᠠᠪᠲᠠᠰᠤ', disabled: true },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- Editorial：始终用左右键在 tab 列之间切换（`aria-orientation="horizontal"`）
- 激活态墨色 marker

## API

<API id="VertMTabs"></API>
