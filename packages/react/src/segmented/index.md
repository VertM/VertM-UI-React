---
title: Segmented
group:
  title: 数据录入
  order: 7
---

# Segmented

分段控制器。在少量互斥选项间切换视图或模式；竖排下滑块沿列轴移动。

## 何时使用

- 2～5 个互斥选项，比 Radio 更紧凑、比 Tabs 更轻
- 切换列表/卡片、日/周/月、语言模式等
- 需要禁用单项或整组
- 竖排工具栏中作为模式切换

## 基本用法

### 非受控

默认选中首项或 `defaultValue`。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSegmented
      defaultValue="a"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
        { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 受控

`value` + `onChange` 同步外部状态。

```tsx
import { useState } from 'react';
import { VertMSegmented, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [val, setVal] = useState('day');
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMSegmented
        value={val}
        onChange={setVal}
        options={[
          { label: 'ᠡᠳᠦᠷ', value: 'day' },
          { label: 'ᠭᠠᠷᠠᠭ', value: 'week' },
          { label: 'ᠰᠠᠷᠠ', value: 'month' },
        ]}
      />
      <VertMText text={val} />
    </VertMDemoFrame>
  );
};
```

### 撑满宽度

`block` 使分段条占满父容器。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <div style={{ width: 160 }}>
      <VertMSegmented
        block
        defaultValue="list"
        options={[
          { label: 'list', value: 'list' },
          { label: 'card', value: 'card' },
        ]}
      />
    </div>
  </VertMDemoFrame>
);
```

## 选项变体

### 禁用单项

选项上设 `disabled`。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSegmented
      defaultValue="a"
      options={[
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b', disabled: true },
        { label: 'C', value: 'c' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 整组禁用

`disabled` 作用于整个分段器。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSegmented
      disabled
      defaultValue="a"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 带图标

`icon` 可与 label 组合。

```tsx
import { VertMSegmented } from '@vertm/react';
import { Eye, Edit, Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSegmented
      defaultValue="view"
      options={[
        { label: 'view', value: 'view', icon: <Eye vertical /> },
        { label: 'edit', value: 'edit', icon: <Edit vertical /> },
        { label: 'find', value: 'find', icon: <Search vertical /> },
      ]}
    />
  </VertMDemoFrame>
);
```

## 边界场景

### 两项切换

最简开关式分段。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSegmented
      defaultValue="on"
      options={[
        { label: 'ᠨᠡᠭᠡᠭᠡᠬᠦ', value: 'on' },
        { label: 'ᠤᠨᠲᠠᠷᠠᠬᠤ', value: 'off' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 较多选项

选项增多时仍保持单选滑块。

```tsx
import { VertMSegmented } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSegmented
      defaultValue="1"
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 空选项兜底

无 options 时不渲染可选项（边界行为演示）。

```tsx
import { VertMSegmented, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSegmented options={[]} />
    <VertMText text="empty options" />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下滑块用 `translateY`（`--vertm-segmented-index` / `--vertm-segmented-count`）
- 字符串 label 经 `VertMText` 渲染
- `block` 在竖排容器中会沿交叉轴撑满

## API

<API id="VertMSegmented"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-segmented-index` | 当前选中索引（运行时） |
| `--vertm-segmented-count` | 选项数量（运行时） |
| `--vertm-color-primary` | 选中态强调 |
| `--vertm-color-bg-container` | 分段条背景 |
| `--vertm-color-border` | 外边框 |
| `--vertm-border-radius` | 圆角 |
