---
title: Card
group:
  title: 数据展示
  order: 1
---

# Card

卡片容器，可带标题、附加区与操作。

## 基本用法

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMCard title="ᠭᠠᠷᠴᠠᠭ" style={{ width: 160 }}>
      <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 附加与操作

```tsx
import { VertMCard, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCard
      title="ᠭᠠᠷᠴᠠᠭ"
      extra={<VertMButton type="link">ᠨᠡᠮᠡᠬᠦ</VertMButton>}
      actions={[
        <VertMButton key="e" type="text">
          ᠵᠠᠰᠠᠬᠤ
        </VertMButton>,
        <VertMButton key="d" type="text" danger>
          ᠤᠰᠤᠳᠬᠠᠬᠤ
        </VertMButton>,
      ]}
      style={{ width: 180 }}
    >
      <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 可悬停

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCard hoverable title="hoverable" style={{ width: 140 }}>
      <VertMText text="ᠲᠡᠷᠢᠭᠦᠯᠦᠭᠰᠡᠨ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题 / 内容字符串自动竖排
- `extra` / `actions` 可挂附加操作

## API

<API id="VertMCard"></API>
