---
title: Statistic
group:
  title: 数据展示
  order: 9
---

# Statistic

统计数值。展示标题 + 数值，支持前后缀与精度；另提供 `VertMStatistic.Countdown` 倒计时。

## 何时使用

- 仪表盘、摘要卡展示关键指标
- 需要前后缀单位（%、元、件）
- 倒计时截止时间展示
- 竖排卡片中突出数字阅读

## 基本用法

### 标题与数值

基础统计块。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic title="ᠨᠢᠭᠡᠳᠦᠭᠡᠷ" value={112893} />
  </VertMDemoFrame>
);
```

### 精度

`precision` 控制小数位。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic title="ratio" value={93.128} precision={2} />
  </VertMDemoFrame>
);
```

### 前后缀

`prefix` / `suffix` 标注单位。

```tsx
import { VertMStatistic, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMStatistic title="up" value={11.28} precision={2} suffix="%" />
      <VertMStatistic title="count" value={93} prefix="+" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 组合展示

### 多指标并排

用 Space 排列多个 Statistic。

```tsx
import { VertMStatistic, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMStatistic title="ᠨᠢᠭᠡ" value={120} />
      <VertMStatistic title="ᠬᠣᠶᠠᠷ" value={86} />
      <VertMStatistic title="ᠭᠤᠷᠪᠠ" value={34} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 字符串数值

`value` 可为字符串或节点。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic title="status" value="Active" />
  </VertMDemoFrame>
);
```

### 自定义样式

通过 `style` / `className` 微调。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic
      title="highlight"
      value={2048}
      style={{ color: 'var(--vertm-color-primary)' }}
    />
  </VertMDemoFrame>
);
```

## 倒计时

### Countdown

`VertMStatistic.Countdown` 按秒刷新剩余时间。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic.Countdown value={Date.now() + 1000 * 60 * 60 * 2} />
  </VertMDemoFrame>
);
```

### 倒计时结束回调

`onFinish` 在归零时触发。

```tsx
import { useState } from 'react';
import { VertMStatistic, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [done, setDone] = useState(false);
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMStatistic.Countdown
        value={Date.now() + 5000}
        onFinish={() => setDone(true)}
        suffix={done ? '✓' : undefined}
      />
      {done ? <VertMText text="finished" /> : null}
    </VertMDemoFrame>
  );
};
```

### 倒计时前后缀

与普通 Statistic 相同的 prefix/suffix。

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMStatistic.Countdown
      value={Date.now() + 1000 * 90}
      prefix="T-"
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 数值经 `VertMText` 且 `raw` 渲染，避免过度规范化数字
- 竖排卡片中标题在上、数值在下的结构保持扫读顺序
- Countdown 每秒更新，注意勿在超大列表中滥用

## API

<API id="VertMStatistic"></API>

### Countdown

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 目标时间戳或 Date | `number \| Date` | — |
| format | 倒计时格式（预留） | `string` | — |
| onFinish | 结束回调 | `() => void` | — |
| prefix | 前缀 | `ReactNode` | — |
| suffix | 后缀 | `ReactNode` | — |
| className | 自定义类名 | `string` | — |
| style | 自定义样式 | `CSSProperties` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-text` | 数值主色 |
| `--vertm-color-text-secondary` | 标题次要色 |
| `--vertm-font-size-heading-3` | 数值字号参考 |
| `--vertm-font-size-sm` | 标题字号参考 |
| `--vertm-color-primary` | 强调统计可覆盖为此色 |
| `--vertm-font-family` | 标题与数值字体 |
