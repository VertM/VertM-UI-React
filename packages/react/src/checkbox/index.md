---
title: Checkbox
group:
  title: 数据录入
  order: 4
---

# Checkbox

复选框与 `Checkbox.Group`。

## 基本用法

```tsx
import { VertMCheckbox } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCheckbox.Group
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
        { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
      ]}
      defaultValue={['a']}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 标签字符串经 `VertMText` 竖排渲染
- Editorial 下选中态使用墨色勾选

## API

<API id="VertMCheckbox"></API>
