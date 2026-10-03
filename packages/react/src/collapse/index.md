---
title: Collapse
group:
  title: 数据展示
  order: 7
---

# Collapse

折叠面板。通过 `items` 配置多段内容；支持手风琴、固定高度与面板级 `collapsible`。

## 何时使用

- 需要在有限空间内收纳多段说明时
- FAQ、设置分组、详情分段展示时
- 同时只允许展开一项（手风琴）时
- 某面板需要禁用折叠或仅点图标折叠时
- 竖排长文中按主题折叠阅读块时

## 基本用法

### 默认展开一项

`defaultActiveKey` 指定初始展开面板。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCollapse
      defaultActiveKey="1"
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠨᠢᠭᠡ" /> },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠬᠣᠶᠠᠷ" /> },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠭᠤᠷᠪᠠ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

## 手风琴与高度

### 手风琴

`accordion` 同时仅展开一项。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCollapse
      accordion
      defaultActiveKey="1"
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠭᠠᠭᠴᠠ ᠨᠢᠭᠡ" /> },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠭᠠᠭᠴᠠ ᠬᠣᠶᠠᠷ" /> },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠭᠠᠭᠴᠠ ᠭᠤᠷᠪᠠ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

### 固定高度

`height` 限制折叠容器高度，内容区可滚动。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMCollapse
      height={240}
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'ᠨᠢᠭᠡ',
          children: <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠣᠯ ᠮᠣᠩᠭᠣᠯᠴᠤᠳ ᠤᠨ ᠡᠷᠲᠡ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠴᠢᠭ ᠮᠥᠨ᠃ ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃" />,
        },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠬᠣᠶᠠᠷ" /> },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠭᠤᠷᠪᠠ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

## 面板能力

### extra

面板标题右侧附加内容。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCollapse
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'ᠨᠢᠭᠡ',
          extra: 'ᠨᠡᠮᠡᠯᠲᠡ',
          children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />,
        },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠬᠣᠶᠠᠷ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

### 禁用折叠

`collapsible="disabled"` 禁止展开/收起。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCollapse
      defaultActiveKey={['1', '2']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠨᠢᠭᠡ" /> },
        {
          key: '2',
          label: 'ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ',
          collapsible: 'disabled',
          children: <VertMText text="ᠨᠡᠭᠡᠭᠡᠬᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠦᠭᠡᠢ" />,
        },
      ]}
    />
  </VertMDemoFrame>
);
```

### 仅图标可点

`collapsible="icon"` 时只有箭头区域可切换。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCollapse
      items={[
        {
          key: '1',
          label: 'ᠰᠤᠮᠤ ᠶᠢ ᠳᠠᠷᠤᠵᠤ ᠳᠡᠯᠭᠡᠬᠦ',
          collapsible: 'icon',
          children: <VertMText text="ᠵᠥᠪᠬᠡᠨ ᠰᠤᠮᠤ ᠶᠢ ᠳᠠᠷᠤᠪᠠᠯ ᠳᠡᠯᠭᠡᠷᠡᠨ᠎ᠡ" />,
        },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠬᠣᠶᠠᠷ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

## 受控

### activeKey

外部控制展开项，适合与路由/筛选联动。

```tsx
import { useState } from 'react';
import { VertMCollapse, VertMButton, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [activeKey, setActiveKey] = useState<string | string[]>('1');
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace direction="vertical" size="middle" align="stretch" style={{ width: '100%' }}>
        <VertMButton onClick={() => setActiveKey('2')}>ᠬᠣᠶᠠᠷ ᠨᠡᠭᠡᠭᠡᠬᠦ</VertMButton>
        <VertMCollapse
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠨᠢᠭᠡ" /> },
            { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠬᠣᠶᠠᠷ" /> },
          ]}
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 多开

非手风琴模式下可同时展开多项。

```tsx
import { VertMCollapse, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMCollapse
      defaultActiveKey={['1', '2']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠨᠢᠭᠡ" /> },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠬᠣᠶᠠᠷ" /> },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠭᠤᠷᠪᠠ" /> },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `label` / 字符串内容走 `VertMText`；展开箭头在竖排下会旋转适配
- `height` 写入 `--vertm-collapse-height`，竖排舞台中请按列高设定
- 手风琴适合窄列 FAQ，避免多面板同时撑开列宽

## API

<API id="VertMCollapse"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-collapse-height` | 由 `height` 注入的容器高度 |
| `--vertm-motion-duration-fast` | 箭头旋转过渡 |
| `--vertm-color-border` | 面板分割线 |
| `--vertm-color-bg-container` | 面板背景 |
| `--vertm-color-text` | 标题文字色 |
