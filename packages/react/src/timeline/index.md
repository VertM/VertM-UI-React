---
title: Timeline
group:
  title: 数据展示
  order: 8
---

# Timeline

时间轴。

## 基本用法

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      items={[
        { children: 'ᠡᠬᠢᠯᠡᠭᠰᠡᠨ' },
        { children: 'ᠶᠠᠪᠤᠵᠤ ᠪᠠᠢᠨ᠎ᠠ' },
        { children: 'ᠲᠡᠭᠦᠰᠪᠡ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 交替模式

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      mode="alternate"
      items={[
        { children: 'A' },
        { children: 'B' },
        { children: 'C' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 进行中

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      pending="ᠬᠦᠯᠢᠶᠡᠵᠦ..."
      items={[
        { children: 'ᠨᠢᠭᠡ' },
        { children: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下轴线沿 block 方向延伸
- `mode`：`left` / `alternate` / `right`

## API

<API id="VertMTimeline"></API>
