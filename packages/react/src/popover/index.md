---
title: Popover
group:
  title: 数据展示
  order: 11
---

# Popover

气泡卡片，可带标题与更丰富内容。

## 基本用法

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover title="ᠭᠠᠷᠴᠠᠭ" content="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
      <VertMButton type="primary">ᠨᠡᠭᠡᠭᠡᠬᠦ</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

## 点击触发

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover
      trigger="click"
      title="click"
      content="ᠲᠠᠢᠯᠪᠤᠷᠢ"
    >
      <VertMButton>click</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

## 受控显示

```tsx
import { useState } from 'react';
import { VertMPopover, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMSpace>
        <VertMButton onClick={() => setOpen(true)}>open</VertMButton>
        <VertMPopover
          open={open}
          onOpenChange={setOpen}
          title="controlled"
          content="ᠠᠭᠤᠯᠭ᠎ᠠ"
        >
          <VertMButton type="primary">target</VertMButton>
        </VertMPopover>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 触发与定位复用 Overlay 体系
- 标题 / 内容字符串自动竖排

## API

<API id="VertMPopover"></API>
