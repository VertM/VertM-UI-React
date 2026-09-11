---
title: Typography
group:
  title: 通用
  order: 2
---

# Typography

竖排排版组件，含 `Title` / `Text` / `Paragraph` / `Link`。

## 基本用法

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <Typography.Title level={2}>ᠲᠤᠤᠯᠠ ᠶᠢᠨ ᠰᠢᠭᠤᠢ</Typography.Title>
    <Typography.Paragraph>
      ᠲᠠᠤᠯᠠᠢ ᠶ᠋ᠢᠨ ᠭᠦᠶᠦᠳᠡᠯ ᠰᠢᠭ᠌ ᠰᠠᠯᠬᠢᠨ ᠳ᠋ᠦ ᠲᠤᠤᠯᠠ ᠶ᠋ᠢᠨ ᠰᠢᠭᠤᠢ ᠨᠠᠢᠢᠭᠤᠨ᠎ᠠ
    </Typography.Paragraph>
    <Typography.Text type="secondary">ᠳᠡᠮᠵᠢᠭᠦᠯᠦᠭᠰᠡᠨ ᠦᠰᠦᠭ</Typography.Text>
    <Typography.Link href="https://github.com/VertM/VertM-UI-React">ᠬᠣᠯᠪᠤᠭ᠎ᠠ</Typography.Link>
  </VertMDemoFrame>
);
```

## 竖排提示

- 字符串子节点走 `VertMText`，竖排与规范化一致
- `copyable` 等交互在竖排下仍可用

## API

<API id="Typography"></API>
