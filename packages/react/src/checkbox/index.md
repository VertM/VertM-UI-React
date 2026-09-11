---
title: Checkbox
group:
  title: 数据录入
  order: 3
---

# Checkbox

竖排复选框与复选组。

## 基本用法

```tsx
import { VertMCheckbox, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace align="start">
      <VertMCheckbox defaultChecked>ᠨᠢᠭᠡ</VertMCheckbox>
      <VertMCheckbox>ᠬᠣᠶᠠᠷ</VertMCheckbox>
      <VertMCheckbox disabled>ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ</VertMCheckbox>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 半选

```tsx
import { useState } from 'react';
import { VertMCheckbox } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMCheckbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(next) => {
          setChecked(next);
          setIndeterminate(false);
        }}
      >
        ᠪᠦᠷᠢᠨ
      </VertMCheckbox>
    </VertMDemoFrame>
  );
};
```

## 复选组

```tsx
import { VertMCheckbox } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCheckbox.Group
      defaultValue={['a']}
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

- 标签字符串经 `VertMText` 竖排渲染
- Editorial 下选中态使用墨色勾选

## API

<API id="VertMCheckbox"></API>
