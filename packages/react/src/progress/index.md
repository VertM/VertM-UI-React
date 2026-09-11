---
title: Progress
group:
  title: 反馈
  order: 5
---

# Progress

进度条。竖排书写模式下线型进度沿列轴展示；另支持环形与分段样式。

## 何时使用

- 展示操作完成百分比（上传、导出、批处理）
- 需要成功 / 异常 / 进行中等状态反馈
- 竖排面板中用列向进度条节省横向空间
- 环形进度适合仪表盘或卡片摘要

## 基本用法

### 线型进度

默认 `type="line"`，竖排下自动变为竖直条。

```tsx
import { VertMProgress } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMProgress percent={65} />
  </VertMDemoFrame>
);
```

### 环形进度

`type="circle"` 以 SVG 圆环展示百分比。

```tsx
import { VertMProgress } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMProgress type="circle" percent={75} />
  </VertMDemoFrame>
);
```

### 隐藏数值

`showInfo={false}` 只保留轨道与填充。

```tsx
import { VertMProgress } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMProgress percent={40} showInfo={false} />
  </VertMDemoFrame>
);
```

## 状态

### 成功 / 异常 / 进行中

`status` 控制语义色与样式。

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMProgress percent={100} status="success" />
      <VertMProgress percent={70} status="exception" />
      <VertMProgress percent={50} status="active" />
      <VertMProgress percent={30} status="normal" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 环形状态

圆环同样支持 status。

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace>
      <VertMProgress type="circle" percent={100} status="success" />
      <VertMProgress type="circle" percent={40} status="exception" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 变体

### 分段进度

设置 `steps` 渲染等分段指示器。

```tsx
import { VertMProgress } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMProgress percent={60} steps={5} />
  </VertMDemoFrame>
);
```

### 自定义颜色

`strokeColor` 覆盖进度填充色。

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" align="start" size="middle">
      <VertMProgress percent={80} strokeColor="#16a34a" />
      <VertMProgress type="circle" percent={55} strokeColor="#d97706" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 边界百分比

0% 与 100% 的展示。

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" align="start" size="middle">
      <VertMProgress percent={0} />
      <VertMProgress percent={100} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 多进度对比

并排多条进度便于对照任务。

```tsx
import { VertMProgress, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMProgress percent={20} />
      <VertMProgress percent={55} status="active" />
      <VertMProgress percent={90} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下线型进度使用竖直轨道（`--vertical`）
- 百分比数字为横排数字排版，便于扫读
- Editorial 主题下填充色跟随主色（墨色 / 钴蓝）

## API

<API id="VertMProgress"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 默认进度填充色 |
| `--vertm-color-border-secondary` | 轨道背景色 |
| `--vertm-color-success` | success 状态色 |
| `--vertm-color-error` | exception 状态色 |
| `--vertm-motion-duration-mid` | 进度变化过渡时长 |
| `--vertm-border-radius-sm` | 线型轨道圆角 |
