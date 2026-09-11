---
title: Radio
group:
  title: 数据录入
  order: 5
---

# Radio

单选与 `Radio.Group`。`optionType="button"` 可切按钮样式。

## 基本用法

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMRadio.Group
      defaultValue="a"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
        { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- Group 沿书写方向排布选项
- `optionType="button"` 适合紧凑切换

## API

<API id="VertMRadio"></API>
