---
title: Drawer
group:
  title: 反馈
  order: 3
---

# Drawer

抽屉面板。

## 基本用法

```tsx
import { useState } from 'react';
import { VertMDrawer, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMButton type="primary" onClick={() => setOpen(true)}>
        ᠨᠡᠭᠡᠭᠡᠬᠦ
      </VertMButton>
      <VertMDrawer
        open={open}
        title="ᠰᠢᠷᠭᠤᠯ"
        placement="right"
        onClose={() => setOpen(false)}
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- `placement`：`left` / `right` / `top` / `bottom`
- 竖排内容在抽屉内保持 writing-mode

## API

<API id="VertMDrawer"></API>
