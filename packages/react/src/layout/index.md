---
title: Layout
group:
  title: 布局
  order: 1
---

# Layout

页面骨架：`Header` / `Sider` / `Content` / `Footer`。侧栏宽度写入 `--vertm-sider-width`，支持收起。

## 何时使用

- 搭建后台或阅读页整体框架时
- 需要顶栏 + 内容 + 底栏经典结构时
- 侧栏导航可折叠以扩大正文区时
- 侧栏在左或右（`placement`）时
- 竖排应用中用 Sider 承载目录/导航列时

## 基本用法

### 顶栏与内容

最简 Header + Content + Footer。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMLayout style={{ minHeight: 280, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Header style={{ background: 'var(--vertm-color-bg-layout)' }}>
        <VertMText text="ᠲᠣᠯᠤᠭᠠᠢ" />
      </VertMLayout.Header>
      <VertMLayout.Content style={{ padding: 16 }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
      </VertMLayout.Content>
      <VertMLayout.Footer style={{ background: 'var(--vertm-color-bg-layout)' }}>
        <VertMText text="ᠬᠥᠯ" />
      </VertMLayout.Footer>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 侧栏

### 左侧 Sider

含侧栏时自动加 `has-sider` 布局类。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMLayout style={{ minHeight: 280, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Sider width={120} style={{ background: 'var(--vertm-color-bg-layout)' }}>
        <VertMText text="ᠬᠠᠵᠠᠭᠤ" />
      </VertMLayout.Sider>
      <VertMLayout>
        <VertMLayout.Header style={{ background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠲᠣᠯᠤᠭᠠᠢ" />
        </VertMLayout.Header>
        <VertMLayout.Content style={{ padding: 16 }}>
          <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
        </VertMLayout.Content>
      </VertMLayout>
    </VertMLayout>
  </VertMDemoFrame>
);
```

### 右侧 Sider

`placement="right"`。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMLayout style={{ minHeight: 260, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Content style={{ padding: 16 }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
      </VertMLayout.Content>
      <VertMLayout.Sider
        placement="right"
        width={100}
        style={{ background: 'var(--vertm-color-bg-layout)' }}
      >
        <VertMText text="ᠪᠠᠷᠠᠭᠤᠨ" />
      </VertMLayout.Sider>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 可折叠

### collapsible

点击触发器收起/展开侧栏。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMLayout style={{ minHeight: 280, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Sider
        collapsible
        width={140}
        collapsedWidth={48}
        style={{ background: 'var(--vertm-color-bg-layout)' }}
      >
        <VertMText text="ᠮᠡᠨᠦ" />
      </VertMLayout.Sider>
      <VertMLayout.Content style={{ padding: 16 }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
      </VertMLayout.Content>
    </VertMLayout>
  </VertMDemoFrame>
);
```

### 默认收起

`defaultCollapsed` 初始为收起态。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMLayout style={{ minHeight: 260, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Sider
        collapsible
        defaultCollapsed
        width={140}
        style={{ background: 'var(--vertm-color-bg-layout)' }}
      >
        <VertMText text="ᠮᠡᠨᠦ" />
      </VertMLayout.Sider>
      <VertMLayout.Content style={{ padding: 16 }}>
        <VertMText text="ᠨᠡᠬᠡᠭᠡᠬᠦ" />
      </VertMLayout.Content>
    </VertMLayout>
  </VertMDemoFrame>
);
```

### 隐藏触发器

`trigger={null}` 隐藏默认折叠按钮，改由业务控制。

```tsx
import { useState } from 'react';
import { VertMLayout, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace direction="vertical" size="middle" align="stretch" style={{ width: '100%' }}>
        <VertMButton onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? 'ᠨᠡᠬᠡᠭᠡᠬᠦ' : 'ᠬᠤᠤᠴᠠᠬᠤ'}
        </VertMButton>
        <VertMLayout style={{ minHeight: 220, border: '1px solid var(--vertm-color-border)' }}>
          <VertMLayout.Sider
            collapsed={collapsed}
            onCollapse={setCollapsed}
            collapsible
            trigger={null}
            width={140}
            style={{ background: 'var(--vertm-color-bg-layout)' }}
          >
            <VertMText text="ᠮᠡᠨᠦ" />
          </VertMLayout.Sider>
          <VertMLayout.Content style={{ padding: 16 }}>
            <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
          </VertMLayout.Content>
        </VertMLayout>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 组合

### 完整骨架

顶栏 + 侧栏 + 内容 + 底栏。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMLayout style={{ minHeight: 320, border: '1px solid var(--vertm-color-border)' }}>
      <VertMLayout.Header style={{ background: 'var(--vertm-color-bg-layout)' }}>
        <VertMText text="VertM" />
      </VertMLayout.Header>
      <VertMLayout>
        <VertMLayout.Sider width={100} style={{ background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠨᠠᠪᠢ" />
        </VertMLayout.Sider>
        <VertMLayout.Content style={{ padding: 16 }}>
          <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
        </VertMLayout.Content>
      </VertMLayout>
      <VertMLayout.Footer style={{ background: 'var(--vertm-color-bg-layout)' }}>
        <VertMText text="© VertM" />
      </VertMLayout.Footer>
    </VertMLayout>
  </VertMDemoFrame>
);
```

### hasSider

Sider 非直接子节点时可用 `hasSider` 强制布局类。

```tsx
import { VertMLayout, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMLayout
      hasSider
      style={{ minHeight: 240, border: '1px solid var(--vertm-color-border)' }}
    >
      <div style={{ display: 'contents' }}>
        <VertMLayout.Sider width={90} style={{ background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="S" />
        </VertMLayout.Sider>
        <VertMLayout.Content style={{ padding: 16 }}>
          <VertMText text="C" />
        </VertMLayout.Content>
      </div>
    </VertMLayout>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排下 Sider 折叠图标会传入 `vertical` 给 Chevron
- `--vertm-sider-width` 随展开/收起切换；竖排中它控制侧栏在交叉轴上的厚度
- 阅读型竖排页可用左侧/右侧 Sider 放目录，Content 放正文列

## API

<API id="VertMLayout"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-sider-width` | 侧栏当前宽度（展开/收起） |
| `--vertm-color-bg-layout` | 顶栏/底栏/侧栏常用底色 |
| `--vertm-color-bg-container` | 内容区背景参考 |
| `--vertm-color-border` | 骨架描边 |
| `--vertm-color-border-secondary` | 次级区域背景 |
| `--vertm-font-family` | 区域内文字字体 |
