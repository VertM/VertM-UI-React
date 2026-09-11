---
title: Skeleton
group:
  title: 反馈
  order: 7
---

# Skeleton

骨架屏。在内容加载完成前占位，减少布局跳动；竖排下段落块沿列方向排布。

## 何时使用

- 首屏或列表数据尚未返回时的占位
- 需要头像 + 标题 + 段落的卡片式预览
- 希望用闪烁动画提示「正在加载」
- 竖排页面中保持与真实内容相近的列结构

## 基本用法

### 默认骨架

默认显示标题与段落占位。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSkeleton />
  </VertMDemoFrame>
);
```

### 激活动画

`active` 开启扫光动画。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSkeleton active />
  </VertMDemoFrame>
);
```

### 带头像

`avatar` 显示圆形头像占位。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSkeleton active avatar />
  </VertMDemoFrame>
);
```

## 结构配置

### 方形头像与尺寸

`avatar` 可配置 `shape` / `size`。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSkeleton active avatar={{ shape: 'square', size: 48 }} />
  </VertMDemoFrame>
);
```

### 段落行数

`paragraph.rows` 控制段落占位行数。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSkeleton active paragraph={{ rows: 4 }} />
  </VertMDemoFrame>
);
```

### 标题宽度

`title.width` 自定义标题条宽度。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSkeleton active title={{ width: '40%' }} paragraph={{ rows: 2 }} />
  </VertMDemoFrame>
);
```

### 圆角段落

`round` 让段落块更圆润。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSkeleton active round paragraph={{ rows: 3 }} />
  </VertMDemoFrame>
);
```

## 边界组合

### 仅标题

关闭段落。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={160}>
    <VertMSkeleton active title paragraph={false} />
  </VertMDemoFrame>
);
```

### 仅段落

关闭标题，适合正文预加载。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSkeleton active title={false} paragraph={{ rows: 5 }} />
  </VertMDemoFrame>
);
```

### 无动画静态占位

不加 `active` 时为静态灰块。

```tsx
import { VertMSkeleton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSkeleton avatar paragraph={{ rows: 2 }} />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排模式下增加 `vertm-skeleton--vertical`，行块按列阅读习惯排布
- 段落宽度可用百分比或像素数组精细控制
- 加载结束后用真实内容替换整个 Skeleton，避免局部闪烁

## API

<API id="VertMSkeleton"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-border-secondary` | 骨架底色 |
| `--vertm-color-bg-layout` | 扫光高亮色 |
| `--vertm-border-radius-sm` | 占位块圆角 |
| `--vertm-margin-sm` | 块间距参考 |
| `--vertm-color-bg-container` | 页面容器底，影响对比度 |
