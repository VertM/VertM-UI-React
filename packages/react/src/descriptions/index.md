---
title: Descriptions
group:
  title: 数据展示
  order: 3
---

# Descriptions

描述列表。以键值对展示字段信息；`column` 控制列数，写入 `--vertm-descriptions-columns`。

## 何时使用

- 详情页、档案页展示只读字段时
- 需要标题 + 多组 label/value 时
- 某字段需跨列（`span`）强调时
- 带边框表格感的只读信息时
- 竖排界面中按列阅读字段清单时

## 基本用法

### 单列描述

默认 `column={1}`，自上而下（或竖排下沿阅读方向）排列。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDescriptions
      title="ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ"
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠪᠠᠲᠤ' },
        { key: '2', label: 'ᠤᠲᠠᠰᠤᠨ', children: '138****0000' },
        { key: '3', label: 'ᠬᠣᠲᠠ', children: 'ᠬᠥᠬᠡᠬᠣᠲᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 多列

### 两列布局

`column={2}` 一行两列描述项。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDescriptions
      title="ᠮᠡᠳᠡᠭᠡᠯᠡᠯ"
      column={2}
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠪᠠᠲᠤ' },
        { key: '2', label: 'ᠨᠠᠰᠤ', children: '28' },
        { key: '3', label: 'ᠬᠦᠢᠰᠦ', children: 'ᠡᠷᠡ' },
        { key: '4', label: 'ᠬᠣᠲᠠ', children: 'ᠪᠡᠭᠡᠵᠢᠩ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 三列布局

更紧凑的字段矩阵。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMDescriptions
      column={3}
      items={[
        { key: '1', label: 'A', children: 'ᠠ' },
        { key: '2', label: 'B', children: 'ᠪ' },
        { key: '3', label: 'C', children: 'ᠴ' },
        { key: '4', label: 'D', children: 'ᠳ' },
        { key: '5', label: 'E', children: 'ᠡ' },
        { key: '6', label: 'F', children: 'ᠹ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 跨列与边框

### span 跨列

单项 `span` 占据多列。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDescriptions
      column={2}
      bordered
      items={[
        { key: '1', label: 'ᠨᠡᠷ᠎ᠡ', children: 'ᠪᠠᠲᠤ' },
        { key: '2', label: 'ᠨᠠᠰᠤ', children: '28' },
        { key: '3', label: 'ᠬᠠᠶᠠᠭ', children: 'ᠥᠪᠦᠷ ᠮᠣᠩᠭᠣᠯ', span: 2 },
      ]}
    />
  </VertMDemoFrame>
);
```

### 带边框

`bordered` 呈现表格感边框。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDescriptions
      title="ᠬᠢᠯᠪᠠᠷᠲᠠᠢ"
      bordered
      column={1}
      items={[
        { key: '1', label: 'ᠲᠥᠷᠥᠯ', children: 'ᠮᠣᠩᠭᠣᠯ' },
        { key: '2', label: 'ᠬᠡᠯᠡ', children: 'ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 无标题与自定义

### 无标题

省略 `title` 仅展示字段列表。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMDescriptions
      items={[
        { key: '1', label: 'ID', children: '10086' },
        { key: '2', label: 'ᠪᠠᠢᠳᠠᠯ', children: 'ᠢᠳᠡᠪᠬᠢᠲᠡᠢ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 节点型 value

`children` 可为任意 React 节点。

```tsx
import { VertMDescriptions, VertMTag } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMDescriptions
      bordered
      items={[
        { key: '1', label: 'ᠲᠠᠭ', children: <VertMTag color="primary">ᠰᠢᠨ᠎ᠡ</VertMTag> },
        { key: '2', label: 'ᠲᠡᠺᠰᠲ', children: 'ᠡᠨᠡ ᠨᠢ ᠲᠡᠺᠰᠲ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 自定义容器样式

通过 `style` 限制宽度或背景。

```tsx
import { VertMDescriptions } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMDescriptions
      title="ᠵᠠᠭᠤᠰᠤ"
      style={{
        maxWidth: 360,
        padding: 12,
        background: 'var(--vertm-color-bg-layout)',
        borderRadius: 8,
      }}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ', children: 'ᠠ' },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: 'ᠪ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `label` / `children` 字符串走 `VertMText`
- `column` 映射为 `--vertm-descriptions-columns`；竖排下网格仍按列数排布
- 长 value 建议配合 `span` 或减小 `column`，避免挤在一列

## API

<API id="VertMDescriptions"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-descriptions-columns` | 描述列数（由 `column` 注入） |
| `--vertm-color-border` | 边框模式下的分隔线 |
| `--vertm-color-bg-container` | 内容区背景 |
| `--vertm-color-text-secondary` | label 次要色参考 |
| `--vertm-font-family` | 字段文字字体 |
