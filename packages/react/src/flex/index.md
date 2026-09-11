---
title: Flex
group:
  title: 布局
  order: 3
---

# Flex

弹性布局容器。未指定 `vertical` 时跟随书写模式：竖排默认纵向堆叠，横排默认横向排列。

## 何时使用

- 需要一维对齐、分布一组子元素时
- 希望间距用 `gap` 统一控制时
- 布局方向应跟随竖排/横排切换时
- 需要 `justify` / `align` 精细对齐时
- 比 Grid 更轻量的线性排版时

## 基本用法

### 默认跟随书写模式

不传 `vertical` 时，竖排舞台中自动纵向排列。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMFlex gap={12}>
      <VertMButton type="primary">ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 方向

### 强制横向

`vertical={false}` 始终横向。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMFlex vertical={false} gap={8}>
      <VertMButton>ᠠ</VertMButton>
      <VertMButton>ᠪ</VertMButton>
      <VertMButton>ᠴ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

### 强制纵向

`vertical` 始终纵向堆叠。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMFlex vertical gap={8}>
      <VertMButton type="primary">ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 对齐

### justify

主轴分布：`start` / `center` / `space-between` 等。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMFlex
      vertical={false}
      justify="space-between"
      style={{ width: '100%', border: '1px dashed var(--vertm-color-border)', padding: 8 }}
    >
      <VertMButton>ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      <VertMButton>ᠭᠤᠷᠪᠠ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

### align

交叉轴对齐。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMFlex
      vertical={false}
      align="center"
      gap={12}
      style={{ height: 100, border: '1px dashed var(--vertm-color-border)', padding: 8 }}
    >
      <VertMButton size="small">ᠪᠠᠭ᠎ᠠ</VertMButton>
      <VertMButton size="large">ᠶᠡᠬᠡ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 换行与间距

### wrap

子项过多时换行。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMFlex vertical={false} wrap gap={8} style={{ maxWidth: 220 }}>
      {['ᠨᠢᠭᠡ', 'ᠬᠣᠶᠠᠷ', 'ᠭᠤᠷᠪᠠ', 'ᠳᠥᠷᠪᠡ', 'ᠲᠠᠪᠤ', 'ᠵᠢᠷᠭᠤᠭ᠎ᠠ'].map((t) => (
        <VertMButton key={t}>{t}</VertMButton>
      ))}
    </VertMFlex>
  </VertMDemoFrame>
);
```

### gap 字符串

`gap` 可为 CSS 长度。

```tsx
import { VertMFlex, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMFlex vertical={false} gap="1.5rem">
      <VertMButton>ᠨᠢᠭᠡ</VertMButton>
      <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
    </VertMFlex>
  </VertMDemoFrame>
);
```

### flex 简写

子容器自身的 `flex` CSS 简写。

```tsx
import { VertMFlex, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMFlex vertical={false} gap={8} style={{ width: '100%' }}>
      <VertMFlex
        flex="1"
        style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}
      >
        <VertMText text="ᠨᠢᠭᠡ" />
      </VertMFlex>
      <VertMFlex
        flex="2"
        style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}
      >
        <VertMText text="ᠬᠣᠶᠠᠷ" />
      </VertMFlex>
    </VertMFlex>
  </VertMDemoFrame>
);
```

## 竖排提示

- 默认 `vertical ?? isVerticalWriting`：全局切到竖排时 Flex 自动改列方向
- 需要「竖排页面里仍横向工具栏」时显式传 `vertical={false}`
- `gap` 使用逻辑间距，不受书写模式交换影响

## API

<API id="VertMFlex"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-border` | 演示边框参考 |
| `--vertm-color-bg-layout` | 子块背景参考 |
| `--vertm-color-border-secondary` | 次级块背景 |
| `--vertm-color-primary` | 主按钮色（子组件） |
| `--vertm-font-family` | 子项文字字体 |
