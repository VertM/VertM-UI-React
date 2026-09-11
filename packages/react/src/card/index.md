---
title: Card
group:
  title: 数据展示
  order: 1
---

# Card

卡片容器。可用 `VertMCard.Meta` 组合头像与描述。

## 基本用法

```tsx
import { VertMCard } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMCard title="ᠭᠠᠷᠴᠠᠭ" style={{ width: 160 }} hoverable>
      ᠠᠭᠤᠯᠭ᠎ᠠ ᠁
    </VertMCard>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题 / 内容字符串自动竖排
- `extra` / `actions` 可挂附加操作

## API

<API id="VertMCard"></API>
