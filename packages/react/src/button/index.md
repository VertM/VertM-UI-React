---
title: Button
group:
  title: 通用
  order: 1
---

# Button

竖排按钮。字符串子节点经 `VertMText` 渲染；支持列深换列与 Editorial 墨色主按钮。

## 基本用法

```tsx
import { VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
    <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
    <VertMButton type="dashed">ᠵᠠᠰᠠᠬᠤ</VertMButton>
    <VertMButton type="text">ᠲᠡᠺᠰᠲ</VertMButton>
    <VertMButton type="link">ᠯᠢᠩᠺ</VertMButton>
  </VertMDemoFrame>
);
```

## 尺寸与块级

```tsx
import { VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMButton size="small">ᠪᠠᠭ᠎ᠠ</VertMButton>
    <VertMButton size="middle">ᠳᠤᠮᠳᠠ</VertMButton>
    <VertMButton size="large">ᠶᠡᠬᠡ</VertMButton>
    <VertMButton type="primary" block>
      ᠪᠦᠷᠢᠨ ᠥᠷᠭᠡᠨ
    </VertMButton>
  </VertMDemoFrame>
);
```

## 危险 / 加载

```tsx
import { VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMButton danger type="primary">
      ᠤᠰᠤᠳᠬᠠᠬᠤ
    </VertMButton>
    <VertMButton loading type="primary">
      ᠠᠴᠢᠶᠠᠯᠠᠵᠤ
    </VertMButton>
    <VertMButton disabled>ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ</VertMButton>
  </VertMDemoFrame>
);
```

## 竖排提示

- `columnDepth`：单列最大行数，超出后换到下一列
- Editorial 下 primary 填充为墨色，而非钴蓝

## API

<API id="VertMButton"></API>
