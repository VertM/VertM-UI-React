---
title: Typography
group:
  title: 通用
  order: 3
---

# Typography

排版。提供 `Title` / `Text` / `Paragraph` / `Link`；字符串子节点经 `VertMText` 规范化并适配竖排。

## 何时使用

- 页面标题、正文、辅助说明需要统一语义色与字号层级
- 长文需要省略（`ellipsis`）或一键复制（`copyable`）
- 内联链接与禁用链接
- 竖排阅读流中的标题层级与段落间距

## 基本用法

### 标题与段落

组合 Title + Paragraph + Text + Link。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <Typography.Title level={2}>ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ</Typography.Title>
    <Typography.Paragraph>
      ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠣᠯ ᠮᠣᠩᠭᠣᠯᠴᠤᠳ ᠤᠨ ᠡᠷᠲᠡ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠴᠢᠭ ᠮᠥᠨ᠃ ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃
    </Typography.Paragraph>
    <Typography.Text type="secondary">ᠲᠤᠰᠠᠯᠠᠮᠵᠢ ᠲᠠᠢᠯᠪᠤᠷᠢ</Typography.Text>
    <Typography.Link href="https://github.com/VertM/VertM-UI-React">ᠬᠣᠯᠪᠤᠭ᠎ᠠ</Typography.Link>
  </VertMDemoFrame>
);
```

### 标题层级

`level` 1–5 对应不同字号。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <Typography.Title level={1}>ᠭᠠᠷᠴᠠᠭ ᠨᠢᠭᠡ</Typography.Title>
    <Typography.Title level={2}>ᠭᠠᠷᠴᠠᠭ ᠬᠣᠶᠠᠷ</Typography.Title>
    <Typography.Title level={3}>ᠭᠠᠷᠴᠠᠭ ᠭᠤᠷᠪᠠ</Typography.Title>
    <Typography.Title level={4}>ᠭᠠᠷᠴᠠᠭ ᠳᠥᠷᠪᠡ</Typography.Title>
    <Typography.Title level={5}>ᠭᠠᠷᠴᠠᠭ ᠲᠠᠪᠤ</Typography.Title>
  </VertMDemoFrame>
);
```

### 文本类型

语义色：`secondary` / `success` / `warning` / `danger`。

```tsx
import { Typography, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <Typography.Text>ᠡᠩ ᠦᠨ</Typography.Text>
      <Typography.Text type="secondary">ᠲᠤᠰᠠᠯᠠᠮᠵᠢ</Typography.Text>
      <Typography.Text type="success">ᠠᠮᠵᠢᠯᠲᠠ</Typography.Text>
      <Typography.Text type="warning">ᠠᠩᠬᠠᠷᠤᠯᠭ᠎ᠠ</Typography.Text>
      <Typography.Text type="danger">ᠠᠶᠤᠯ</Typography.Text>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 交互能力

### 可复制

`copyable` 在文旁显示复制按钮。

```tsx
import { Typography, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace direction="vertical" align="start">
      <Typography.Text copyable>ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ</Typography.Text>
      <Typography.Paragraph copyable>
        ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃
      </Typography.Paragraph>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 自定义复制文本

对象形式指定 `text` / `onCopy`。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <Typography.Text
      copyable={{ text: 'copied-value', onCopy: () => undefined }}
    >
      show-me
    </Typography.Text>
  </VertMDemoFrame>
);
```

### 省略

`ellipsis` 截断过长文本；对象可指定 `rows`。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ maxHeight: 160 }}>
      ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠣᠯ ᠮᠣᠩᠭᠣᠯᠴᠤᠳ ᠤᠨ ᠡᠷᠲᠡ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠴᠢᠭ ᠮᠥᠨ᠃ ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃
      ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠣᠯ ᠮᠣᠩᠭᠣᠯᠴᠤᠳ ᠤᠨ ᠡᠷᠲᠡ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠴᠢᠭ ᠮᠥᠨ᠃ ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃
    </Typography.Paragraph>
  </VertMDemoFrame>
);
```

## 链接与块级

### 链接与禁用

`Typography.Link` 支持 `href` / `disabled`。

```tsx
import { Typography, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace direction="vertical" align="start">
      <Typography.Link href="https://doc.onon.cn" target="_blank">
        ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ ᠦᠵᠡᠬᠦ
      </Typography.Link>
      <Typography.Link disabled href="#">
        disabled
      </Typography.Link>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 块级 Text

`block` 让 Text 独占一行。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <Typography.Text block type="secondary">
      block secondary
    </Typography.Text>
    <Typography.Text block>block default</Typography.Text>
  </VertMDemoFrame>
);
```

### raw 原文

`raw` 跳过文本规范化，按原文渲染。

```tsx
import { Typography } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <Typography.Text raw>  spaced  text  </Typography.Text>
  </VertMDemoFrame>
);
```

## 竖排提示

- 所有字符串内容默认走 `VertMText`，竖排字形与规范化一致
- 标题字号对应 `--vertm-font-size-heading-*`
- 复制按钮图标在竖排下仍保持可点触尺寸

## API

Typography 为复合导出，无单一根组件 props。子组件：

<API id="Title"></API>

<API id="Text"></API>

<API id="Paragraph"></API>

<API id="Link"></API>

若表格为空，请对照源码 `TitleProps` / `TextProps` / `ParagraphProps` / `LinkProps`（均扩展 `BaseTypographyProps`：`type` / `ellipsis` / `copyable` / `raw`）。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-font-size-heading-1` … `5` | 标题层级字号 |
| `--vertm-font-size` | 正文字号 |
| `--vertm-color-text` | 默认文字色 |
| `--vertm-color-text-secondary` | secondary 类型 |
| `--vertm-color-success` / `--vertm-color-warning` / `--vertm-color-error` | 语义色 |
| `--vertm-color-link` | 链接色 |
| `--vertm-font-family` | 蒙文字体栈 |
| `--vertm-line-height` | 行高 |
