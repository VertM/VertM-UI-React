---
title: VertMText
group:
  title: 竖排专属
  order: 1
---

# VertMText

核心竖排文本渲染。默认做 NFC / 蒙古文规范化。

## 基本用法

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ" fontSize={20} />
    <VertMText text="VertM UI" fontSize={16} />
  </VertMDemoFrame>
);
```

## 链接

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMText text="ᠬᠣᠯᠪᠤᠭ᠎ᠠ" href="https://github.com/VertM/VertM-UI-React" />
  </VertMDemoFrame>
);
```

## 竖排提示

- `maxLines` 控制单列行数
- `raw` 跳过规范化；`inheritTypography` 继承父级字号

## API

<API id="VertMText"></API>
