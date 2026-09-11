---
title: Statistic
group:
  title: 数据展示
  order: 9
---

# Statistic

统计数值。另含 `VertMStatistic.Countdown`。

## 基本用法

```tsx
import { VertMStatistic, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace size="large" align="start">
      <VertMStatistic title="ᠲᠣᠭ᠎ᠠ" value={112893} />
      <VertMStatistic title="ᠬᠤᠪᠢ" value={93.2} precision={1} suffix="%" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题与数值字符串走 `VertMText`
- Countdown 用 `value`（时间戳 / Date）与 `format`

## API

<API id="VertMStatistic"></API>
