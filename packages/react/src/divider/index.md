---
title: Divider
group:
  title: 布局
  order: 5
---

# Divider

分隔线。竖排下 `placement` 控制文字相对线条的位置。

## 基本用法

```tsx
import { VertMDivider, Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <Typography.Paragraph>ᠡᠬᠢᠯᠡᠬᠦ</Typography.Paragraph>
    <VertMDivider placement="center" style={{ minHeight: 200 }}>
      ᠵᠠᠭᠤᠷ
    </VertMDivider>
    <Typography.Paragraph>ᠲᠡᠭᠦᠰᠬᠦ</Typography.Paragraph>
  </VertMDemoFrame>
);
```

## 竖排提示

- `placement`: `top` / `center` / `bottom`
- 支持 `editable` + `onTextChange` 就地改文案

## API

<API id="VertMDivider"></API>
