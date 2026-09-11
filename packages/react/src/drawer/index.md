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
        title="ᠰᠢᠷᠡᠭᠡ"
        onClose={() => setOpen(false)}
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 位置

```tsx
import { useState } from 'react';
import { VertMDrawer, VertMButton, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'left' | 'right'>('right');
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMSpace>
        <VertMButton
          onClick={() => {
            setPlacement('left');
            setOpen(true);
          }}
        >
          left
        </VertMButton>
        <VertMButton
          onClick={() => {
            setPlacement('right');
            setOpen(true);
          }}
        >
          right
        </VertMButton>
      </VertMSpace>
      <VertMDrawer
        open={open}
        placement={placement}
        title="ᠰᠢᠷᠡᠭᠡ"
        onClose={() => setOpen(false)}
      >
        <VertMText text={placement} />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 带页脚

```tsx
import { useState } from 'react';
import { VertMDrawer, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMButton onClick={() => setOpen(true)}>footer</VertMButton>
      <VertMDrawer
        open={open}
        title="ᠰᠢᠷᠡᠭᠡ"
        onClose={() => setOpen(false)}
        footer={
          <VertMSpace>
            <VertMButton onClick={() => setOpen(false)}>ᠪᠣᠯᠢᠬᠤ</VertMButton>
            <VertMButton type="primary" onClick={() => setOpen(false)}>
              ᠵᠥᠪ
            </VertMButton>
          </VertMSpace>
        }
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
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
