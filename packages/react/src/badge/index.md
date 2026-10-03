---
title: Badge
group:
  title: 数据展示
  order: 6
---

# Badge

徽标数与状态点。可包裹子元素显示角标，也可独立展示状态文案；竖排下偏移用 `--vertm-badge-offset-*`。

## 何时使用

- 图标、头像上需要未读数或提醒时
- 仅需小红点、不必显示数字时
- 列表旁用状态点 + 文案描述进度/结果时
- 数字过大需封顶（如 `99+`）时
- 竖排 UI 中角标相对位置需要微调时

## 基本用法

### 数字徽标

包裹子元素，在角落显示 `count`。

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="large" align="center">
      <VertMBadge count={5}>
        <VertMAvatar shape="square">ᠨ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={0} showZero>
        <VertMAvatar shape="square">ᠣ</VertMAvatar>
      </VertMBadge>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 红点与封顶

### 小红点

`dot` 不展示数字，仅显示圆点。

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="large" align="center">
      <VertMBadge dot>
        <VertMAvatar shape="square">ᠮ</VertMAvatar>
      </VertMBadge>
      <VertMBadge dot>
        <span style={{ color: 'var(--vertm-color-link)' }}>ᠮᠡᠳᠡᠭᠡ</span>
      </VertMBadge>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 溢出封顶

超过 `overflowCount`（默认 99）显示为 `N+`。

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="large" align="center">
      <VertMBadge count={99}>
        <VertMAvatar shape="square">ᠠ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={100}>
        <VertMAvatar shape="square">ᠪ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={1000} overflowCount={999}>
        <VertMAvatar shape="square">ᠴ</VertMAvatar>
      </VertMBadge>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 状态点

### 独立状态

无子元素时，用 `status` + `text` 作状态说明。

```tsx
import { VertMBadge, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="vertical" size="small">
      <VertMBadge status="success" text="ᠠᠮᠵᠢᠯᠲᠠ" />
      <VertMBadge status="processing" text="ᠰᠢᠢᠳᠬᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ" />
      <VertMBadge status="default" text="ᠡᠩ ᠦᠨ" />
      <VertMBadge status="error" text="ᠠᠯᠳᠠᠭ᠎ᠠ" />
      <VertMBadge status="warning" text="ᠠᠩᠬᠠᠷᠤᠯᠭ᠎ᠠ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 仅状态点

不传 `text` 时只显示色点。

```tsx
import { VertMBadge, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSpace size="middle" align="center">
      <VertMBadge status="success" />
      <VertMBadge status="processing" />
      <VertMBadge status="error" />
      <VertMBadge status="warning" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 偏移与自定义

### offset

`offset={[x, y]}` 微调徽标相对位置。

```tsx
import { VertMBadge, VertMAvatar } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMBadge count={8} offset={[6, -4]}>
      <VertMAvatar shape="square" size="large">
        ᠪ
      </VertMAvatar>
    </VertMBadge>
  </VertMDemoFrame>
);
```

### 自定义 count 节点

`count` 可为任意 React 节点（非数字）。

```tsx
import { VertMBadge, VertMAvatar } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMBadge count={<span style={{ color: 'var(--vertm-color-error)' }}>!</span>}>
      <VertMAvatar shape="square">ᠠ</VertMAvatar>
    </VertMBadge>
  </VertMDemoFrame>
);
```

### 隐藏零值

默认 `count={0}` 不显示；`showZero` 可强制显示。

```tsx
import { VertMBadge, VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="large" align="center">
      <VertMBadge count={0}>
        <VertMAvatar shape="square">ᠠ</VertMAvatar>
      </VertMBadge>
      <VertMBadge count={0} showZero>
        <VertMAvatar shape="square">ᠪ</VertMAvatar>
      </VertMBadge>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下徽标仍贴在子元素逻辑角上；可用 `offset` 微调
- 独立 `status` + `text` 的文案字符串走 `VertMText`
- 状态色来自 `--vertm-color-success` 等语义 token

## API

<API id="VertMBadge"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-badge-offset-x` | 徽标水平偏移（由 `offset` 注入） |
| `--vertm-badge-offset-y` | 徽标垂直偏移（由 `offset` 注入） |
| `--vertm-color-error` | 默认数字徽标背景 |
| `--vertm-color-success` | success 状态点 |
| `--vertm-color-primary` | processing 状态点 |
| `--vertm-color-warning` | warning 状态点 |
