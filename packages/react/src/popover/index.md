---
title: Popover
group:
  title: 数据展示
  order: 11
---

# Popover

气泡卡片，可带标题与内容。

## 基本用法

```tsx
import { VertMPopover, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopover title="ᠭᠠᠷᠴᠠᠭ" content="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁">
      <VertMButton type="primary">Popover</VertMButton>
    </VertMPopover>
  </VertMDemoFrame>
);
```

## 竖排提示

- 触发与定位复用 Overlay 体系
- 标题 / 内容字符串自动竖排

## API

<API id="VertMPopover"></API>
