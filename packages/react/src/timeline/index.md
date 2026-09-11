---
title: Timeline
group:
  title: 数据展示
  order: 8
---

# Timeline

时间轴。按时间顺序展示事件；支持 left / alternate / right 模式与 pending 末节点。

## 何时使用

- 操作日志、审批记录、版本历程
- 需要在节点上标注颜色或自定义圆点
- 末尾仍在进行中的 pending 状态
- 竖排页面中时间轴向列方向延伸

## 基本用法

### 基础时间轴

默认 `mode="left"`。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMTimeline
      items={[
        { children: 'ᠡᠬᠢᠯᠡᠪᠡ' },
        { children: 'ᠳᠤᠮᠳᠠ' },
        { children: 'ᠲᠡᠭᠦᠰᠪᠡ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 带 label

`label` 显示时间或阶段名。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      items={[
        { label: '09:00', children: 'ᠨᠡᠭᠡᠭᠡᠪᠡ' },
        { label: '12:00', children: 'ᠳᠤᠮᠳᠠ' },
        { label: '18:00', children: 'ᠲᠡᠭᠦᠰᠪᠡ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 节点颜色

`color` 自定义圆点色。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMTimeline
      items={[
        { color: 'green', children: 'success' },
        { color: 'red', children: 'error' },
        { color: 'blue', children: 'processing' },
        { children: 'default' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 模式

### alternate

左右交替。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      mode="alternate"
      items={[
        { children: 'ᠨᠢᠭᠡ' },
        { children: 'ᠬᠣᠶᠠᠷ' },
        { children: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### right

内容靠右。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMTimeline
      mode="right"
      items={[
        { children: 'A' },
        { children: 'B' },
        { children: 'C' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 进行中与定制

### pending 末节点

`pending` 追加「仍在进行」节点。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      pending="ᠦᠷᠭᠦᠯᠵᠢᠯᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..."
      items={[
        { children: 'step 1' },
        { children: 'step 2' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 自定义圆点

`dot` 替换默认圆点。

```tsx
import { VertMTimeline } from '@vertm/react';
import { CheckCircle, Loading } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMTimeline
      items={[
        { dot: <CheckCircle vertical size="small" />, children: 'done' },
        { dot: <Loading spin vertical size="small" />, children: 'loading' },
        { children: 'wait' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 富内容节点

children 可为复杂节点。

```tsx
import { VertMTimeline, VertMTag, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMTimeline
      items={[
        {
          label: 'v0.1',
          children: (
            <VertMSpace direction="vertical" align="start" size="small">
              <VertMText text="release" />
              <VertMTag color="success">ok</VertMTag>
            </VertMSpace>
          ),
        },
        { label: 'v0.2', children: 'planning' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 单项 pending 标记

item 上 `pending` 标记该节点为待定样式。

```tsx
import { VertMTimeline } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMTimeline
      items={[
        { children: 'done' },
        { children: 'next', pending: true },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下时间轴沿列延伸，`data-vertical-writing` 标记样式
- 字符串 label / children 经 `VertMText` 渲染
- alternate 在窄列中可能拥挤，竖排长文优先用 left

## API

<API id="VertMTimeline"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 默认节点/连线强调 |
| `--vertm-color-border` | 轴线颜色 |
| `--vertm-color-text-secondary` | label 次要色 |
| `--vertm-margin-sm` | 节点间距参考 |
| `--vertm-font-family` | 事件正文字体 |
| `--vertm-border-radius` | 自定义圆点容器参考 |
