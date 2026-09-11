---
title: Avatar
group:
  title: 数据展示
  order: 5
---

# Avatar

用户或对象头像。支持图片、图标、文字；`Group` 可折叠溢出人数。字符串走 `VertMText`。

## 何时使用

- 展示用户、作者、联系人身份时
- 评论、列表、卡片中需要紧凑身份标识时
- 图片加载失败需回退到文字/图标时
- 多人场景用 `Group` + `maxCount` 折叠显示时
- 竖排界面中与姓名并排的圆形/方形标识时

## 基本用法

### 文字头像

无 `src` 时用字符串子节点（最多取前两字）作为头像。

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="middle" align="center">
      <VertMAvatar>ᠠ</VertMAvatar>
      <VertMAvatar>ᠮᠣ</VertMAvatar>
      <VertMAvatar style={{ background: 'var(--vertm-color-primary)', color: '#fff' }}>
        U
      </VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸

### 预设尺寸

`size` 支持 `small` / `default` / `large`。

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="middle" align="center">
      <VertMAvatar size="small">ᠪ</VertMAvatar>
      <VertMAvatar size="default">ᠪ</VertMAvatar>
      <VertMAvatar size="large">ᠪ</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 自定义像素

传入数字可指定边长（px）。

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace size="middle" align="center">
      <VertMAvatar size={48}>ᠮ</VertMAvatar>
      <VertMAvatar size={64}>ᠮ</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 形状

### 圆形与方形

`shape` 为 `circle`（默认）或 `square`。

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="middle" align="center">
      <VertMAvatar shape="circle">ᠴ</VertMAvatar>
      <VertMAvatar shape="square">ᠴ</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 图片与图标

### 图片头像

`src` 加载失败时自动回退到子节点或图标。

```tsx
import { VertMAvatar, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="middle" align="center">
      <VertMAvatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=vertm"
        alt="user"
      />
      <VertMAvatar src="https://invalid.example/avatar.png">ᠪ</VertMAvatar>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 图标头像

无图片时可用 `icon` 节点。

```tsx
import { VertMAvatar } from '@vertm/react';
import { Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMAvatar icon={<Search size="small" />} />
  </VertMDemoFrame>
);
```

## 头像组

### Group 基础

`VertMAvatar.Group` 横向叠放多个头像。

```tsx
import { VertMAvatar } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMAvatar.Group>
      <VertMAvatar>ᠠ</VertMAvatar>
      <VertMAvatar>ᠪ</VertMAvatar>
      <VertMAvatar>ᠴ</VertMAvatar>
    </VertMAvatar.Group>
  </VertMDemoFrame>
);
```

### 最大显示数

`maxCount` 超出后显示 `+N`。

```tsx
import { VertMAvatar } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMAvatar.Group maxCount={2} size="large">
      <VertMAvatar>ᠠ</VertMAvatar>
      <VertMAvatar>ᠪ</VertMAvatar>
      <VertMAvatar>ᠴ</VertMAvatar>
      <VertMAvatar>ᠳ</VertMAvatar>
    </VertMAvatar.Group>
  </VertMDemoFrame>
);
```

## 竖排提示

- 文字头像字符串经 `VertMText` 渲染，竖排下字形随书写模式
- `Group` 仍按横向叠放；竖排页面注意与姓名列的间距
- 图片失败会回退，建议始终提供文字或 `icon` 兜底

## API

<API id="VertMAvatar"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-primary` | 自定义背景常用主色 |
| `--vertm-color-bg-container` | 默认头像底色参考 |
| `--vertm-color-border` | 头像边框/叠放描边 |
| `--vertm-font-family` | 文字头像字体 |
| `--vertm-font-size` | 基准字号（影响文字缩放） |
