---
title: Anchor
group:
  title: 导航
  order: 7
---

# Anchor

页面内锚点导航。

## 基本用法

```tsx
import { VertMAnchor, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <div style={{ display: 'flex', gap: 24, minHeight: 280 }}>
      <VertMAnchor
        items={[
          { key: 'a', href: '#sec-a', title: 'ᠨᠢᠭᠡ' },
          { key: 'b', href: '#sec-b', title: 'ᠬᠣᠶᠠᠷ' },
          { key: 'c', href: '#sec-c', title: 'ᠭᠤᠷᠪᠠ' },
        ]}
      />
      <div style={{ flex: 1 }}>
        <div id="sec-a">
          <VertMText text="ᠨᠢᠭᠡ" fontSize={16} />
        </div>
        <div id="sec-b" style={{ marginBlockStart: 48 }}>
          <VertMText text="ᠬᠣᠶᠠᠷ" fontSize={16} />
        </div>
        <div id="sec-c" style={{ marginBlockStart: 48 }}>
          <VertMText text="ᠭᠤᠷᠪᠠ" fontSize={16} />
        </div>
      </div>
    </div>
  </VertMDemoFrame>
);
```

## 点击回调

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMAnchor
      items={[
        { key: 'x', href: '#x', title: 'X' },
        { key: 'y', href: '#y', title: 'Y' },
      ]}
      onClick={(e, link) => {
        e.preventDefault();
        console.log(link);
      }}
    />
  </VertMDemoFrame>
);
```

## 偏移高亮

```tsx
import { VertMAnchor, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMAnchor
      offsetTop={12}
      bounds={8}
      items={[
        { key: 'p1', href: '#p1', title: 'ᠨᠢᠭᠡ' },
        { key: 'p2', href: '#p2', title: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
    <div id="p1" style={{ marginBlockStart: 24 }}>
      <VertMText text="p1" />
    </div>
    <div id="p2" style={{ marginBlockStart: 80 }}>
      <VertMText text="p2" />
    </div>
  </VertMDemoFrame>
);
```

## 竖排提示

- `offsetTop` / `bounds` 控制高亮判定
- 标题字符串自动走 `VertMText`

## API

<API id="VertMAnchor"></API>
