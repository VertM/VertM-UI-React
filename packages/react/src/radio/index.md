---
title: Radio
group:
  title: 数据录入
  order: 4
---

# Radio

竖排单选框与单选组。

## 基本用法

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMRadio.Group defaultValue="a">
      <VertMRadio value="a">ᠨᠢᠭᠡ</VertMRadio>
      <VertMRadio value="b">ᠬᠣᠶᠠᠷ</VertMRadio>
      <VertMRadio value="c" disabled>
        ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ
      </VertMRadio>
    </VertMRadio.Group>
  </VertMDemoFrame>
);
```

## 选项配置

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMRadio.Group
      defaultValue="1"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 按钮样式

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMRadio.Group
      optionType="button"
      defaultValue="a"
      options={[
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
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
