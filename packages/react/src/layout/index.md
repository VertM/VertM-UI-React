---
title: Layout
group:
  title: 布局
  order: 1
---

# Layout

页面骨架布局，含 Header / Sider / Content / Footer。

## 基本用法

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMLayout style={{ minHeight: 280 }}>
      <VertMLayout.Header>
        <VertMText text="ᠲᠣᠯᠣᠭᠠᠢ" />
      </VertMLayout.Header>
      <VertMLayout>
        <VertMLayout.Sider width={72}>
          <VertMText text="ᠬᠠᠵᠠᠭᠤ" />
        </VertMLayout.Sider>
        <VertMLayout.Content>
          <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
        </VertMLayout.Content>
      </VertMLayout>
      <VertMLayout.Footer>
        <VertMText text="ᠬᠥᠯ" />
      </VertMLayout.Footer>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 可折叠侧栏

```tsx
import { useState } from 'react';
import { VertMLayout, VertMText, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMLayout style={{ minHeight: 260 }}>
        <VertMLayout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={96}
        >
          <VertMText text="ᠬᠠᠵᠠᠭᠤ" />
        </VertMLayout.Sider>
        <VertMLayout.Content>
          <VertMButton onClick={() => setCollapsed((v) => !v)}>
            ᠰᠣᠯᠢᠬᠤ
          </VertMButton>
        </VertMLayout.Content>
      </VertMLayout>
    </VertMDemoFrame>
  );
};
```

## 仅内容区

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMLayout style={{ minHeight: 200 }}>
      <VertMLayout.Header>
        <VertMText text="ᠲᠣᠯᠣᠭᠠᠢ" />
      </VertMLayout.Header>
      <VertMLayout.Content style={{ padding: 16 }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" fontSize={16} />
      </VertMLayout.Content>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下 Sider 折叠方向随书写模式适配
- `hasSider` 可在 Sider 非直接子节点时强制布局类名

## API

<API id="VertMLayout"></API>
