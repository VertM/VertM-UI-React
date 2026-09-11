---
title: Popover
group:
  title: 数据展示
  order: 11
---

# Popover

气泡卡片。比 Tooltip 更适合放标题、短段落或小型操作区；默认 `trigger="click"`。

## 何时使用

- 需要展示比 Tooltip 更丰富的内容（标题 + 正文）
- 点击触发的就近面板，而不是整页 Modal / Drawer
- 可选关闭按钮，让用户主动收起
- 竖排阅读流中补充说明、快捷操作入口

## 基本用法

### 点击气泡

默认 click 触发，适合触控与固定阅读。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover title="ᠭᠠᠷᠴᠠᠭ" content="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
      <VertMButton type="primary">Popover</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

### 仅内容

不传 `title` 时渲染紧凑内容区。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMPopover content="ᠲᠠᠢᠯᠪᠤᠷᠢ ᠁">
      <VertMButton>content only</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

### 悬停触发

改为 `trigger="hover"` 时行为接近 Tooltip，但可承载更长内容。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover
      trigger="hover"
      title="hover"
      content="ᠠᠭᠤᠯᠭ᠎ᠠ"
    >
      <VertMButton>hover</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

## 位置与关闭

### 弹出位置

`placement` 与 Overlay 一致，支持上下左右及角向。

```tsx
import { VertMPopover, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace wrap>
      <VertMPopover placement="top" content="top">
        <VertMButton>top</VertMButton>
      </VertMPopover>
      <VertMPopover placement="bottom" content="bottom">
        <VertMButton>bottom</VertMButton>
      </VertMPopover>
      <VertMPopover placement="left" content="left">
        <VertMButton>left</VertMButton>
      </VertMPopover>
      <VertMPopover placement="right" content="right">
        <VertMButton>right</VertMButton>
      </VertMPopover>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 可关闭

`closable` 在标题区展示关闭按钮。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover
      closable
      title="ᠭᠠᠷᠴᠠᠭ"
      content="ᠬᠠᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ"
    >
      <VertMButton>closable</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

### 受控

`open` / `onOpenChange` 控制显隐。

```tsx
import { useState } from 'react';
import { VertMPopover, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMSpace>
        <VertMButton onClick={() => setOpen(true)}>open</VertMButton>
        <VertMPopover
          open={open}
          onOpenChange={setOpen}
          title="controlled"
          content="ᠠᠭᠤᠯᠭ᠎ᠠ"
        >
          <VertMButton type="primary">anchor</VertMButton>
        </VertMPopover>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 内容与状态

### React 节点内容

`content` / `title` 可为任意 React 节点。

```tsx
import { VertMPopover, VertMButton, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMPopover
      title={<VertMText text="ᠭᠠᠷᠴᠠᠭ" />}
      content={
        <VertMSpace direction="vertical" align="start">
          <VertMText text="ᠮᠥᠷ ᠨᠢᠭᠡ" />
          <VertMButton size="small" type="primary">
            action
          </VertMButton>
        </VertMSpace>
      }
    >
      <VertMButton>rich</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

### 禁用

`disabled` 时不弹出。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMPopover content="hidden" disabled>
      <VertMButton disabled>disabled</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

### 无箭头

`showArrow={false}` 隐藏箭头。

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMPopover content="flat" showArrow={false}>
      <VertMButton>no arrow</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

## 竖排提示

- 字符串 `title` / `content` 经 `VertMText` 渲染
- 默认 click；若只需一句说明优先用 `Tooltip`
- 竖排下气泡定位跟随触发器与视口边缘自动翻转

## API

<API id="VertMPopover"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-bg-elevated` | 气泡背景 |
| `--vertm-box-shadow-secondary` | 气泡阴影 |
| `--vertm-z-index-popup` | 弹出层级 |
| `--vertm-border-radius` | 气泡圆角 |
| `--vertm-padding` | 内容区内边距参考 |
| `--vertm-font-family` | 气泡正文字体 |
