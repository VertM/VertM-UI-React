---
title: VertMText
group:
  title: 竖排专属
  order: 1
---

# VertMText

核心竖排文本渲染。默认做 NFC / 蒙古文规范化。

## 何时使用

- 展示传统蒙古文段落、标签、链接
- 需要统一规范化（NFC + 蒙古文规则）时
- 需要截断最大行数 `maxLines` 时
- 覆盖局部字号、行高或书写模式时
- 作为其他组件字符串子节点的底层渲染器

## 基本用法

### 渲染文本

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ" fontSize={24} />
  </VertMDemoFrame>
);
```

## 链接

### href

有 `href` 时渲染为带链接样式的 `<a>`。

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMText
      text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ"
      href="https://github.com/VertM/VertM-UI-React"
      target="_blank"
      fontSize={20}
    />
  </VertMDemoFrame>
);
```

## 字号与行高

### fontSize / lineHeight

```tsx
import { VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMSpace align="start" size="large">
      <VertMText text="ᠪᠠᠭ᠎ᠠ" fontSize={14} lineHeight={1.6} />
      <VertMText text="ᠳᠤᠮᠳᠠ" fontSize={20} lineHeight={1.6} />
      <VertMText text="ᠶᠡᠬᠡ" fontSize={28} lineHeight={1.5} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 最大行数

### maxLines

超出截断（配合竖排列几何）。

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const LONG =
  'ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠤᠨ ᠵᠢᠭᠠᠰᠤᠨ ᠦᠰᠦᠭ ᠪᠣᠯ ᠨᠢᠭᠡ ᠨᠤᠲᠤᠭ ᠤᠨ ᠰᠣᠶᠣᠯ ᠤᠨ ᠥᠪ ᠡᠷᠳᠡᠮ ᠮᠥᠨ';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMText text={LONG} fontSize={16} maxLines={4} />
  </VertMDemoFrame>
);
```

## 元素类型

### as

默认 `span`；可改为 `p`、`div` 等。

```tsx
import { VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace align="start" size="large">
      <VertMText as="p" text="as=p" fontSize={18} />
      <VertMText as="div" text="as=div" fontSize={18} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 原始文本

### raw

跳过规范化，直接渲染原文。

```tsx
import { VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace align="start" size="large">
      <VertMText text="NFC 规范化" fontSize={16} />
      <VertMText text="raw 原文" fontSize={16} raw />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 禁用

### disabled

禁用交互样式（链接等）。

```tsx
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMText text="ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ" fontSize={18} disabled href="#" />
  </VertMDemoFrame>
);
```

## 继承排版

### inheritTypography

从父级 CSS 变量继承字号 / 行高 / 书写模式。

```tsx
import type { CSSProperties } from 'react';
import { VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <div
      style={
        {
          '--vertm-font-size': '22px',
          '--vertm-line-height': '1.7',
        } as CSSProperties
      }
    >
      <VertMText text="ᠥᠪᠡᠷ ᠡᠴᠡ ᠰᠢᠯᠭᠠᠬᠤ" inheritTypography />
    </div>
  </VertMDemoFrame>
);
```

## 竖排提示

- 布局 token（writing-mode、font-family、line-height）优先来自 `ConfigProvider` + CSS
- `showLatin` 控制拉丁字母 mixed 朝向（默认 true）
- 仅在需要覆盖上下文时再传 `fontSize` / `lineHeight` / `writingMode`

## API

<API id="VertMText"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-font-family` | 字体族 |
| `--vertm-font-size` / 相关字号 token | 默认字号 |
| `--vertm-line-height` | 行高 |
| `--vertm-color-primary` | 链接色 |
| `--vertm-color-text` | 正文色 |
| `--vertm-column-size` | 竖排列宽相关 |
