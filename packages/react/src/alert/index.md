---
title: Alert
group:
  title: 反馈
  order: 1
---

# Alert

页面级警告提示。字符串 `message` / `description` 经 `VertMText` 渲染，竖排下随书写模式排版。

## 何时使用

- 需要在当前页内展示重要提示、成功或失败结果时
- 表单校验、操作反馈等需要持续可见（非浮层）的文案时
- 顶部横幅（`banner`）通告全站/全页状态时
- 可关闭提示，允许用户主动消隐时
- 竖排界面中需要带类型图标的短文案提示时

## 基本用法

### 成功与警告

展示可关闭的成功提示，以及带说明文案的警告。

```tsx
import { VertMAlert, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMAlert type="success" message="ᠵᠥᠪ !" showIcon closable />
      <VertMAlert
        type="warning"
        message="ᠠᠩᠬᠠᠷ !"
        description="ᠪᠤᠷᠤᠭᠤ ᠭᠠᠷᠪᠠ"
        showIcon
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 类型

### 四种类型

`type` 支持 `success` / `info` / `warning` / `error`，图标随类型变化。

```tsx
import { VertMAlert, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMAlert type="success" message="ᠠᠮᠵᠢᠯᠲᠠ" showIcon />
      <VertMAlert type="info" message="ᠮᠡᠳᠡᠭᠡ" showIcon />
      <VertMAlert type="warning" message="ᠠᠩᠬᠠᠷ" showIcon />
      <VertMAlert type="error" message="ᠠᠯᠳᠠᠭ᠎ᠠ" showIcon />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 带描述

主文案 + 辅助说明，适合较长反馈。

```tsx
import { VertMAlert, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMAlert
        type="info"
        message="ᠮᠡᠳᠡᠭᠡ"
        description="ᠡᠨᠡ ᠪᠣᠯ ᠨᠡᠮᠡᠯᠲᠡ ᠲᠠᠢᠯᠪᠤᠷᠢ ᠮᠥᠨ"
        showIcon
      />
      <VertMAlert
        type="error"
        message="ᠠᠯᠳᠠᠭ᠎ᠠ"
        description="ᠳᠠᠬᠢᠨ ᠣᠷᠤᠯᠳᠤᠭᠠᠷᠠᠢ"
        showIcon
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 图标与关闭

### 隐藏图标

`showIcon={false}` 仅保留文案区域。

```tsx
import { VertMAlert } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMAlert type="info" message="ᠳᠦᠷᠰᠦ ᠲᠡᠮᠳᠡᠭ ᠦᠭᠡᠢ ᠮᠡᠳᠡᠭᠡ" showIcon={false} />
  </VertMDemoFrame>
);
```

### 可关闭

`closable` 显示关闭按钮，关闭后组件卸载。

```tsx
import { VertMAlert } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMAlert type="warning" message="ᠬᠠᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ" showIcon closable />
  </VertMDemoFrame>
);
```

## 横幅

### 顶部横幅

`banner` 以通栏样式展示，适合页头通告。

```tsx
import { VertMAlert } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMAlert banner type="info" message="ᠮᠡᠳᠡᠭᠡ ᠁" showIcon />
  </VertMDemoFrame>
);
```

### 错误横幅

错误类型的横幅用于紧急全页提示。

```tsx
import { VertMAlert } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMAlert banner type="error" message="ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ ᠲᠦᠷ ᠵᠣᠭᠰᠣᠪᠠ" showIcon closable />
  </VertMDemoFrame>
);
```

## 组合

### 竖向堆叠多种状态

用 `VertMSpace` 纵向排列多条 Alert。

```tsx
import { VertMAlert, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMSpace direction="vertical" size="small" align="stretch" style={{ width: '100%' }}>
      <VertMAlert type="success" message="ᠬᠠᠳᠠᠭᠠᠯᠠᠪᠠ" showIcon />
      <VertMAlert type="info" message="ᠰᠢᠨ᠎ᠡ ᠬᠤᠪᠢᠯᠪᠤᠷᠢ ᠪᠠᠢᠨ᠎ᠠ" showIcon />
      <VertMAlert type="warning" message="ᠬᠤᠭᠤᠴᠠᠭ᠎ᠠ ᠨᠢ ᠳᠥᠬᠦᠮ ᠳᠠᠭᠤᠰᠤᠨ᠎ᠠ" showIcon closable />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 字符串节点走 `VertMText`，竖排书写模式下按列阅读
- `banner` 在竖排舞台中仍占满演示区交叉轴，注意与侧栏/顶栏留白
- Editorial 主题下类型色随 token 变化，语义不变

## API

<API id="VertMAlert"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-success` | 成功类型主色 |
| `--vertm-color-info` | 信息类型主色 |
| `--vertm-color-warning` | 警告类型主色 |
| `--vertm-color-error` | 错误类型主色 |
| `--vertm-color-bg-container` | 提示背景容器色 |
| `--vertm-color-border` | 边框色 |
