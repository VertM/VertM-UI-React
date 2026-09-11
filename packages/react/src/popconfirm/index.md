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
import { VertMPopconfirm, VertMButton, message } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?"
      onConfirm={() => message.success('ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠪᠡ')}
    >
      <VertMButton danger>ᠤᠰᠤᠳᠬᠠᠬᠤ</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题字符串自动竖排
- 确认/取消文案可走 locale

## API

<API id="VertMPopconfirm"></API>
