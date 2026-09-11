---
title: Tag
group:
  title: 数据展示
  order: 4
---

# Tag

标签，支持关闭与可选中。

## 基本用法

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="start" size="middle">
      <VertMTag>ᠡᠩ</VertMTag>
      <VertMTag color="primary">ᠥᠩᠭᠡ</VertMTag>
      <VertMTag color="success">ᠵᠥᠪ</VertMTag>
      <VertMTag color="warning">ᠠᠩᠬᠠᠷ</VertMTag>
      <VertMTag color="error">ᠠᠯᠳᠠᠭ᠎ᠠ</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 可关闭

```tsx
import { VertMTag } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMTag closable onClose={() => console.log('closed')}>
      ᠬᠠᠭᠠᠴᠢᠬᠠᠯ᠎ᠠ
    </VertMTag>
  </VertMDemoFrame>
);
```

## 可选中

```tsx
import { useState } from 'react';
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMSpace align="start">
        <VertMTag checkable checked={checked} onChange={setChecked}>
          ᠰᠣᠩᠭᠣᠭᠳᠠᠭᠰᠠᠨ
        </VertMTag>
        <VertMTag checkable defaultChecked={false}>
          ᠪᠤᠰᠤᠳ
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
