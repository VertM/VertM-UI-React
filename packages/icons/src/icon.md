---
title: Icon
group:
  title: 通用
  order: 2
---

# Icon

`@vertm/icons` 提供竖排友好 SVG 图标。方向性图标在 `vertical` 下可旋转 90°；`spin` 用于加载态。

## 何时使用

- 按钮、菜单、状态反馈需要统一线框图标
- 竖排 UI 中箭头/chevron 需要随书写方向旋转
- 加载中用 `Loading` + `spin`
- 自定义尺寸（预设或像素）与颜色

## 基本用法

### 常用图标

导入具名图标组件直接使用。

```tsx
import { Check, Search, Loading, ChevronRight, Close } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <Check vertical />
    <Search vertical />
    <Loading spin vertical />
    <ChevronRight vertical />
    <Close vertical />
  </VertMDemoFrame>
);
```

### 状态图标

成功 / 警告 / 错误 / 信息圆标。

```tsx
import { CheckCircle, WarningCircle, CloseCircle, InfoCircle } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSpace size="large" align="center">
      <CheckCircle vertical color="#16a34a" />
      <WarningCircle vertical color="#d97706" />
      <CloseCircle vertical color="#dc2626" />
      <InfoCircle vertical color="#1266d9" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 编辑与可见性

表单与输入相关图标。

```tsx
import { Edit, Copy, Eye, EyeInvisible } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSpace size="large">
      <Edit vertical />
      <Copy vertical />
      <Eye vertical />
      <EyeInvisible vertical />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸

### 预设尺寸

`small` / `middle` / `large`（14 / 16 / 20）。

```tsx
import { Check, Search, InfoCircle } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="center" size="middle">
      <Check vertical size="small" />
      <Search vertical size="middle" />
      <InfoCircle vertical size="large" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 像素尺寸

传入 number 精确控制 px。

```tsx
import { Check, Plus, Minus } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="center" size="middle">
      <Check vertical size={12} />
      <Plus vertical size={24} />
      <Minus vertical size={32} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 方向与动画

### 竖排旋转对比

同一箭头在 `vertical` 开关下的朝向差异。

```tsx
import { ChevronRight, ArrowRight } from '@vertm/icons';
import { VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMSpace direction="vertical" align="center">
        <VertMText text="vertical" />
        <ChevronRight vertical />
        <ArrowRight vertical />
      </VertMSpace>
      <VertMSpace direction="vertical" align="center">
        <VertMText text="ltr" />
        <ChevronRight />
        <ArrowRight />
      </VertMSpace>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 旋转加载

`spin` 持续旋转，常用于 Loading。

```tsx
import { Loading } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace size="large" align="center">
      <Loading spin vertical size="small" />
      <Loading spin vertical />
      <Loading spin vertical size="large" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 关闭旋转

`rotateForVertical={false}` 强制不随竖排旋转（关闭按钮等）。

```tsx
import { Close, ChevronDown } from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace size="large">
      <Close vertical rotateForVertical={false} />
      <ChevronDown vertical />
      <ChevronDown vertical rotateForVertical={false} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 更多方向图标

展开/折叠与双向箭头。

```tsx
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Expand,
  Collapse,
  Ellipsis,
} from '@vertm/icons';
import { VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSpace size="middle" wrap>
      <ChevronUp vertical />
      <ChevronDown vertical />
      <ChevronLeft vertical />
      <Expand vertical />
      <Collapse vertical />
      <Ellipsis vertical />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排 UI 中优先传 `vertical`，方向性图标才会旋转
- `spin` 仅视觉旋转，不改变语义方向
- 关闭类图标常设 `rotateForVertical={false}`，避免「×」被转成「+」观感

## API

图标为独立 SVG 组件，通用 props 见 `VertMIconProps`：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 尺寸（px 或预设） | `number \| 'small' \| 'middle' \| 'large'` | `'middle'` |
| color | 颜色 | `string` | `'currentColor'` |
| spin | 旋转动画 | `boolean` | `false` |
| rotateForVertical | 竖排时是否旋转方向性图标 | `boolean` | `true` |
| vertical | 当前是否竖排书写 | `boolean` | `false` |
| className | 自定义类名 | `string` | — |

另导出 `createIconComponent` / `resolveIconSize` / `VertMIcon` 用于扩展自定义图标。可用图标见 `@vertm/icons` 的具名导出（Check、Search、Loading、各类 Circle / Chevron / Arrow 等）。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-text` | 默认 `currentColor` 继承色 |
| `--vertm-color-primary` | 主题色图标常用覆盖 |
| `--vertm-color-success` / `--vertm-color-warning` / `--vertm-color-error` | 状态图标色 |
| `--vertm-motion-duration-mid` | spin 动画节奏参考 |
| `--vertm-font-size` | 与 middle 图标视觉对齐参考 |
