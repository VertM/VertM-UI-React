---
title: Tooltip
group:
  title: 数据展示
  order: 10
---

# Tooltip

文字提示气泡。基于 `Overlay`，适合简短说明；字符串标题走 `VertMText`，竖排下自动适配边缘翻转。

## 何时使用

- 图标、按钮旁需要一句话说明，又不想打断当前操作流
- 空间不足以常驻展示完整文案时
- 需要悬停 / 聚焦 / 点击触发的轻量浮层（比 Popover 更短）
- 竖排界面里要保持提示方向与书写轴一致时

## 基本用法

### 悬停提示

最常见的 hover 触发，鼠标移入显示、移出关闭。

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="ᠲᠠᠢᠯᠪᠤᠷᠢ">
      <VertMButton>hover</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

### 点击触发

用 `trigger="click"` 固定打开，适合触控或需要停留阅读的场景。

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="ᠲᠠᠢᠯᠪᠤᠷᠢ" trigger="click">
      <VertMButton type="primary">click</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

### 聚焦触发

`trigger="focus"` 在键盘聚焦时显示，便于无障碍场景。

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="focus tip" trigger="focus">
      <VertMButton>focus me</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

## 位置

### 上下左右

`placement` 控制弹出方向，视口不足时会自动翻转。

```tsx
import { Tooltip, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace wrap>
      <Tooltip title="top" placement="top">
        <VertMButton>top</VertMButton>
      </Tooltip>
      <Tooltip title="bottom" placement="bottom">
        <VertMButton>bottom</VertMButton>
      </Tooltip>
      <Tooltip title="left" placement="left">
        <VertMButton>left</VertMButton>
      </Tooltip>
      <Tooltip title="right" placement="right">
        <VertMButton>right</VertMButton>
      </Tooltip>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 角向位置

支持 `topLeft` / `topRight` 等 12 个 antd 兼容位置。

```tsx
import { Tooltip, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace wrap>
      <Tooltip title="topLeft" placement="topLeft">
        <VertMButton>TL</VertMButton>
      </Tooltip>
      <Tooltip title="topRight" placement="topRight">
        <VertMButton>TR</VertMButton>
      </Tooltip>
      <Tooltip title="bottomLeft" placement="bottomLeft">
        <VertMButton>BL</VertMButton>
      </Tooltip>
      <Tooltip title="bottomRight" placement="bottomRight">
        <VertMButton>BR</VertMButton>
      </Tooltip>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 样式与状态

### 自定义背景色

`color` 会写入 `--vertm-tooltip-bg`，覆盖默认半透明黑底。

```tsx
import { Tooltip, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace>
      <Tooltip title="primary" color="#1266d9">
        <VertMButton type="primary">blue</VertMButton>
      </Tooltip>
      <Tooltip title="ink" color="#1c1917">
        <VertMButton>ink</VertMButton>
      </Tooltip>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 禁用

`disabled` 时不弹出，子元素交互不受影响。

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <Tooltip title="won't show" disabled>
      <VertMButton disabled>disabled tip</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

### 受控显示

通过 `open` / `onOpenChange` 完全控制显隐。

```tsx
import { useState } from 'react';
import { Tooltip, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMSpace>
        <VertMButton onClick={() => setOpen((v) => !v)}>toggle</VertMButton>
        <Tooltip title="controlled" open={open} onOpenChange={setOpen} trigger="click">
          <VertMButton type="primary">target</VertMButton>
        </Tooltip>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 无箭头

`showArrow={false}` 隐藏箭头，适合贴边密排。

```tsx
import { Tooltip, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <Tooltip title="no arrow" showArrow={false}>
      <VertMButton>no arrow</VertMButton>
    </Tooltip>
  </VertMDemoFrame>
);
```

## 竖排提示

- `placement` 在竖排书写模式下会按视口边缘自动翻转
- `title` 为字符串时经 `VertMText` 渲染，保持蒙文竖排字形
- 需要标题 + 富内容时改用 `VertMPopover`；底层定位可直接用 `Overlay` + `Portal`

## API

<API id="Tooltip"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-tooltip-bg` | 提示背景色（可由 `color` prop 覆盖） |
| `--vertm-z-index-tooltip` | Tooltip 层级，默认高于普通浮层 |
| `--vertm-z-index-popup` | Overlay / Popover 等通用弹出层层级 |
| `--vertm-color-text` | 正文色，影响触发器与周边文案 |
| `--vertm-font-family` | 蒙文字体栈，浮层内文本继承 |
