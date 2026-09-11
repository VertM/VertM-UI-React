---
title: Splitter
group:
  title: 布局
  order: 6
---

# Splitter

可拖拽分割面板。竖排下默认按列方向分割。

## 基本用法

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSplitter style={{ height: 240, width: 320, border: '1px solid var(--vertm-color-border)' }}>
      <VertMSplitter.Panel defaultSize="40%">
        <VertMText text="ᠵᠡᠭᠦᠨ" fontSize={16} />
      </VertMSplitter.Panel>
      <VertMSplitter.Panel>
        <VertMText text="ᠪᠠᠷᠠᠭᠤᠨ" fontSize={16} />
      </VertMSplitter.Panel>
    </VertMSplitter>
  </VertMDemoFrame>
);
```

## 限制尺寸

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSplitter style={{ height: 240, width: 320, border: '1px solid var(--vertm-color-border)' }}>
      <VertMSplitter.Panel defaultSize={120} min={80} max={200}>
        <VertMText text="min/max" fontSize={14} />
      </VertMSplitter.Panel>
      <VertMSplitter.Panel>
        <VertMText text="ᠦᠯᠳᠡᠭᠳᠡᠯ" fontSize={14} />
      </VertMSplitter.Panel>
    </VertMSplitter>
  </VertMDemoFrame>
);
```

## 横向布局

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSplitter
      layout="horizontal"
      style={{ height: 240, width: 320, border: '1px solid var(--vertm-color-border)' }}
    >
      <VertMSplitter.Panel defaultSize="50%">
        <VertMText text="A" fontSize={16} />
      </VertMSplitter.Panel>
      <VertMSplitter.Panel>
        <VertMText text="B" fontSize={16} />
      </VertMSplitter.Panel>
    </VertMSplitter>
  </VertMDemoFrame>
);
```

## 竖排提示

- 未指定 `layout` 时跟随书写模式
- `onResize` 回调返回两面板比例

## API

<API id="VertMSplitter"></API>
