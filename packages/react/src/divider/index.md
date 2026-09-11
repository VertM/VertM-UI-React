---
title: Divider
group:
  title: 布局
  order: 5
---

# Divider

分割线，可带文案与就地编辑。

## 基本用法

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMText text="ᠡᠬᠢᠯᠡ" />
    <VertMDivider />
    <VertMText text="ᠲᠡᠭᠦᠰ" />
  </VertMDemoFrame>
);
```

## 带文案

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMText text="ᠳᠡᠭᠡᠷ᠎ᠡ" />
    <VertMDivider placement="center">ᠵᠠᠰᠠᠯᠲᠠ</VertMDivider>
    <VertMText text="ᠳᠣᠣᠷ᠎ᠠ" />
    <VertMDivider dashed placement="top">
      dashed
    </VertMDivider>
  </VertMDemoFrame>
);
```

## 可编辑文案

```tsx
import { useState } from 'react';
import { VertMDivider } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [text, setText] = useState('ᠵᠠᠰᠠᠬᠤ');
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMDivider editable onTextChange={setText}>
        {text}
      </VertMDivider>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- `placement`: `top` / `center` / `bottom`
- 支持 `editable` + `onTextChange` 就地改文案

## API

<API id="VertMDivider"></API>
