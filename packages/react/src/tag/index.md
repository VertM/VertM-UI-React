---
title: Tag
group:
  title: 数据展示
  order: 4
---

# Tag

标签。可用 `checkable` 或独立 `CheckableTag` / `VertMTag.Checkable`。

## 基本用法

```tsx
import { useState } from 'react';
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMSpace align="start">
        <VertMTag>ᠡᠩ ᠤᠨ</VertMTag>
        <VertMTag color="primary">ᠥᠩᠭᠡ</VertMTag>
        <VertMTag closable>ᠬᠠᠭᠠᠬᠤ</VertMTag>
        <VertMTag checkable checked={checked} onChange={setChecked}>
          ᠰᠣᠩᠭᠣᠬᠤ
        </VertMTag>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- Editorial 下 primary 为墨色
- 关闭与可选中态均可竖排展示文案

## API

<API id="VertMTag"></API>
