---
title: Divider
group:
  title: 布局
  order: 5
---

# Divider

分割线。可带文案与沿轴线位置（`placement`）；字符串标签支持就地编辑（`editable`）。

## 何时使用

- 分隔内容区块、表单段落时
- 分割线上需要简短标题/分类名时
- 虚线或更轻的 `plain` 样式区分层级时
- 允许用户就地改分割线标签时
- 竖排界面中沿阅读方向切分章节时

## 基本用法

### 纯分割线

无文案时渲染一条分隔线。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMText text="ᠡᠭᠦᠨᠡᠴᠡ ᠡᠮᠦᠨ᠎ᠡ" />
    <VertMDivider />
    <VertMText text="ᠡᠭᠦᠨᠡᠴᠡ ᠬᠣᠢᠲᠤ" />
  </VertMDemoFrame>
);
```

## 带文案

### 居中文案

默认 `placement="center"`。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMText text="ᠡᠮᠦᠨ᠎ᠡ" />
    <VertMDivider>ᠬᠡᠰᠡᠭ</VertMDivider>
    <VertMText text="ᠬᠣᠢᠲᠤ" />
  </VertMDemoFrame>
);
```

### 顶部 / 底部位置

`placement` 为 `top` 或 `bottom`，文案贴分割线一端。

```tsx
import { VertMDivider, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="vertical" size="middle" align="stretch" style={{ width: '100%' }}>
      <div>
        <VertMText text="A" />
        <VertMDivider placement="top">ᠡᠮᠦᠨ᠎ᠡ</VertMDivider>
        <VertMText text="B" />
      </div>
      <div>
        <VertMText text="C" />
        <VertMDivider placement="bottom">ᠬᠣᠢᠲᠤ</VertMDivider>
        <VertMText text="D" />
      </div>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 样式变体

### 虚线

`dashed` 使用虚线描边。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMText text="ᠡᠮᠦᠨ᠎ᠡ" />
    <VertMDivider dashed>ᠲᠠᠰᠤᠷᠬᠠᠢ</VertMDivider>
    <VertMText text="ᠬᠣᠢᠲᠤ" />
  </VertMDemoFrame>
);
```

### plain

更轻的正文样式标签。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMText text="ᠡᠮᠦᠨ᠎ᠡ" />
    <VertMDivider plain>ᠡᠩ ᠦᠨ</VertMDivider>
    <VertMText text="ᠬᠣᠢᠲᠤ" />
  </VertMDemoFrame>
);
```

### 虚线 + plain

组合用于弱分隔。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMText text="ᠡᠮᠦᠨ᠎ᠡ" />
    <VertMDivider dashed plain>
      ᠰᠤᠯᠠ
    </VertMDivider>
    <VertMText text="ᠬᠣᠢᠲᠤ" />
  </VertMDemoFrame>
);
```

## 可编辑

### 就地编辑标签

`editable` 仅对字符串 children 生效，点击后可改文案。

```tsx
import { useState } from 'react';
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [text, setText] = useState('ᠨᠠᠶᠢᠷᠠᠭᠤᠯᠬᠤ');
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMText text="ᠡᠮᠦᠨ᠎ᠡ" />
      <VertMDivider editable onTextChange={setText}>
        {text}
      </VertMDivider>
      <VertMText text="ᠬᠣᠢᠲᠤ" />
    </VertMDemoFrame>
  );
};
```

### 多段分隔

连续使用多条 Divider 划分章节。

```tsx
import { VertMDivider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMText text="ᠨᠢᠭᠡ" />
    <VertMDivider>Ⅰ</VertMDivider>
    <VertMText text="ᠬᠣᠶᠠᠷ" />
    <VertMDivider>Ⅱ</VertMDivider>
    <VertMText text="ᠭᠤᠷᠪᠠ" />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下分割线沿块轴方向延伸，`placement` 的 top/bottom 对应阅读起点/终点
- 可编辑输入在竖排下使用纵向输入样式
- 旧版 `orientation`（left/right/center）仍可用，但请迁移到 `placement`

## API

<API id="VertMDivider"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-border` | 分割线颜色 |
| `--vertm-color-text` | 标签文字色 |
| `--vertm-color-text-secondary` | plain 次要文字参考 |
| `--vertm-font-family` | 标签字体 |
| `--vertm-motion-duration-fast` | 交互过渡参考 |
