---
title: Popconfirm
group:
  title: 反馈
  order: 4
---

# Popconfirm

气泡确认框。

## 基本用法

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="ᠤᠰᠤᠳᠬᠠᠬᠤ ᠦᠦ ?"
      onConfirm={() => console.log('ok')}
    >
      <VertMButton danger>ᠤᠰᠤᠳᠬᠠᠬᠤ</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 带描述

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?"
      description="ᠡᠨᠡ ᠦᠢᠯᠡᠳᠦᠯ ᠪᠤᠴᠠᠵᠤ ᠪᠣᠯᠬᠤ ᠦᠭᠡᠢ"
      onConfirm={() => console.log('ok')}
      onCancel={() => console.log('cancel')}
    >
      <VertMButton type="primary">ᠢᠯᠭᠡᠬᠦ</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 自定义文案

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="?"
      okText="ᠵᠥᠪ"
      cancelText="ᠪᠣᠯᠢᠬᠤ"
      onConfirm={() => {}}
    >
      <VertMButton>custom</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题字符串自动竖排
- 确认/取消文案可走 locale

## API

<API id="VertMPopconfirm"></API>
