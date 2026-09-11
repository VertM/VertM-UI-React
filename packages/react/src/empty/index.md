---
title: Empty
group:
  title: 反馈
  order: 9
---

# Empty

空状态。用于列表、表格或区块无数据时的占位；描述字符串经 `VertMText` 渲染。

## 何时使用

- 列表、搜索结果、表格无数据时
- 需要区分「默认插画」与「简洁」空态时
- 空态下方需要引导操作（如新建按钮）时
- 自定义插画替换默认图形时
- 竖排页面中占位说明仍需蒙文排版时

## 基本用法

### 默认空态

默认文案为 `No data`，可换成蒙文描述。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty description="ᠬᠣᠭᠣᠰᠤᠨ ᠪᠠᠢᠨ᠎ᠠ ᠁" />
  </VertMDemoFrame>
);
```

## 图片变体

### simple

更轻量的椭圆占位图。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMEmpty image="simple" description="ᠰᠢᠮᠫᠯᠧ" />
  </VertMDemoFrame>
);
```

### 默认插画

显式指定 `image="default"`。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty image="default" description="ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ" />
  </VertMDemoFrame>
);
```

### 自定义图片节点

`image` 可传入任意 React 节点。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty
      image={
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--vertm-color-border-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--vertm-color-text-secondary)',
          }}
        >
          ∅
        </div>
      }
      description="ᠥᠪᠡᠷᠮᠥᠷ ᠵᠢᠷᠤᠭ"
    />
  </VertMDemoFrame>
);
```

## 附加操作

### 底部按钮

`children` 放在描述下方，适合「去创建」等引导。

```tsx
import { VertMEmpty, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMEmpty description="ᠮᠡᠳᠡᠭᠡ ᠦᠭᠡᠢ">
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
    </VertMEmpty>
  </VertMDemoFrame>
);
```

### 多个操作

底部可放一组按钮。

```tsx
import { VertMEmpty, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMEmpty description="ᠢᠯᠡᠷᠡᠭᠰᠡᠨ ᠦᠭᠡᠢ">
      <VertMSpace>
        <VertMButton>ᠰᠡᠷᠭᠦᠭᠡᠬᠦ</VertMButton>
        <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      </VertMSpace>
    </VertMEmpty>
  </VertMDemoFrame>
);
```

## 文案与样式

### 无描述

`description={null}` 或空时可不显示文案（仍保留插画）。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMEmpty description={null} />
  </VertMDemoFrame>
);
```

### 自定义样式

调整容器内边距或背景。

```tsx
import { VertMEmpty } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMEmpty
      description="ᠵᠠᠭᠤᠰᠤ"
      style={{
        padding: 24,
        borderRadius: 8,
        background: 'var(--vertm-color-bg-layout)',
      }}
    />
  </VertMDemoFrame>
);
```

### 嵌在卡片中

常见于 Card / List 空数据占位。

```tsx
import { VertMEmpty, VertMCard } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMCard title="ᠵᠠᠭᠰᠠᠭᠠᠯᠲᠠ" style={{ width: 320 }}>
      <VertMEmpty image="simple" description="ᠬᠣᠭᠣᠰᠤᠨ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 竖排提示

- 描述字符串走 `VertMText`，竖排下按列阅读
- 根节点带 `vertm-vertical`，与竖排舞台对齐
- 插画 SVG 使用 `--vertm-color-border` / `--vertm-color-border-secondary`

## API

<API id="VertMEmpty"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-border` | 默认插画描边 |
| `--vertm-color-border-secondary` | 插画阴影椭圆 |
| `--vertm-color-text-secondary` | 描述次要色参考 |
| `--vertm-color-bg-layout` | 外层占位背景 |
| `--vertm-font-family` | 描述文字字体 |
