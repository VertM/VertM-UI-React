---
title: Layout
group:
  title: 布局
  order: 1
---

# Layout

页面骨架布局，含 `Header` / `Sider` / `Content` / `Footer`。

## 基本用法

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const { Header, Sider, Content, Footer } = VertMLayout;

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMLayout style={{ minHeight: 300, border: '1px solid var(--vertm-color-border)' }}>
      <Header>
        <VertMText text="ᠲᠣᠯᠣᠭᠠᠢ" fontSize={16} />
      </Header>
      <VertMLayout>
        <Sider width={72} collapsible defaultCollapsed={false}>
          <VertMText text="ᠬᠠᠵᠠᠭᠤ" fontSize={14} />
        </Sider>
        <Content style={{ padding: 12 }}>
          <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" fontSize={16} />
        </Content>
      </VertMLayout>
      <Footer>
        <VertMText text="ᠬᠥᠯ" fontSize={14} />
      </Footer>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下 Sider 折叠方向随书写模式适配
- `hasSider` 可在 Sider 非直接子节点时强制布局类名

## API

<API id="VertMLayout"></API>
