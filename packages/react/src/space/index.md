---
title: Space
group:
  title: 布局
  order: 4
---

# Space

间距。在子组件之间设置一致间隙；未指定 `direction` 时，竖排书写模式默认为 `vertical`。

## 何时使用

- 一组按钮、标签、图标需要均匀间距
- 用 `split` 在项之间插入分隔符
- 需要换行（`wrap`）的标签云或操作组
- 竖排界面中沿列轴堆叠控件

## 基本用法

### 默认间距

跟随 ConfigProvider 尺寸，方向随书写模式。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace>
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMButton>ᠬᠠᠰᠤᠬᠤ</VertMButton>
      <VertMButton type="dashed">ᠨᠠᠶᠢᠷᠠᠭᠤᠯᠬᠤ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 尺寸档位

`size` 支持 `small` / `middle` / `large`。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMSpace size="small">
        <VertMButton size="small">S</VertMButton>
        <VertMButton size="small">S</VertMButton>
      </VertMSpace>
      <VertMSpace size="middle">
        <VertMButton>M</VertMButton>
        <VertMButton>M</VertMButton>
      </VertMSpace>
      <VertMSpace size="large">
        <VertMButton size="large">L</VertMButton>
        <VertMButton size="large">L</VertMButton>
      </VertMSpace>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 数字间距

传入 number 以像素精确控制 gap。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size={32}>
      <VertMButton>A</VertMButton>
      <VertMButton>B</VertMButton>
      <VertMButton>C</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 方向与对齐

### 水平排列

显式 `direction="horizontal"`。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace direction="horizontal" size="middle">
      <VertMButton type="primary">1</VertMButton>
      <VertMButton>2</VertMButton>
      <VertMButton>3</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 垂直排列

显式 `direction="vertical"`。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace direction="vertical" size="middle" align="start">
      <VertMButton block type="primary">
        ᠨᠡᠮᠡᠬᠦ
      </VertMButton>
      <VertMButton block>ᠬᠠᠰᠤᠬᠤ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 对齐方式

`align` 控制交叉轴对齐。

```tsx
import { VertMSpace, VertMButton, VertMTag } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace direction="horizontal" align="start" size="middle">
      <VertMButton size="large">L</VertMButton>
      <VertMTag>tag</VertMTag>
      <VertMButton size="small">S</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 分隔与换行

### 分隔符

`split` 插在相邻子元素之间。

```tsx
import { VertMSpace, VertMButton, VertMDivider } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace split={<VertMDivider />} size="middle">
      <VertMButton>ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 自动换行

`wrap` 在空间不足时换行。

```tsx
import { VertMSpace, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <div style={{ width: 120 }}>
      <VertMSpace wrap size="small">
        <VertMButton size="small">1</VertMButton>
        <VertMButton size="small">2</VertMButton>
        <VertMButton size="small">3</VertMButton>
        <VertMButton size="small">4</VertMButton>
        <VertMButton size="small">5</VertMButton>
        <VertMButton size="small">6</VertMButton>
      </VertMSpace>
    </div>
  </VertMDemoFrame>
);
```

### 双向间距数组

`size={[水平, 垂直]}` 分别控制两轴 gap。

```tsx
import { VertMSpace, VertMTag } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace wrap size={[8, 16]} direction="horizontal">
      <VertMTag>A</VertMTag>
      <VertMTag color="primary">B</VertMTag>
      <VertMTag color="success">C</VertMTag>
      <VertMTag color="warning">D</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `direction` 未设：竖排 → `vertical`，横排 → `horizontal`
- `align="start"` 在竖排列堆叠时更常见，避免居中造成参差
- 与 `VertMDivider` 组合作工具栏分隔

## API

<API id="VertMSpace"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-margin-xs` | 对应 small 间距量级 |
| `--vertm-margin` | middle 间距量级 |
| `--vertm-margin-lg` | large 间距量级 |
| `--vertm-color-border` | 与 Divider split 搭配时的分隔线色 |
| `--vertm-padding-sm` | 内边距参考，影响密集布局 |
