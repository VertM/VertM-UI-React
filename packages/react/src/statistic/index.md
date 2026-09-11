---
title: Statistic
group:
  title: 数据展示
  order: 9
---

# Statistic

统计数值与倒计时。

## 基本用法

```tsx
import { VertMStatistic, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace size="large" align="start">
      <VertMStatistic title="ᠨᠡᠭᠡᠭᠳᠡᠯ" value={112893} />
      <VertMStatistic title="ᠬᠤᠪᠢ" value={93.2} precision={1} suffix="%" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 前后缀

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMStatistic title="¥" value={1128} prefix="¥" suffix="CNY" />
  </VertMDemoFrame>
);
```

## 倒计时

```tsx
import { VertMStatistic } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMStatistic.Countdown
      value={Date.now() + 1000 * 60 * 60 * 24}
      format="HH:mm:ss"
      onFinish={() => console.log('done')}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题与数值字符串走 `VertMText`
- Countdown 用 `value`（时间戳 / Date）与 `format`

## API

<API id="VertMStatistic"></API>
