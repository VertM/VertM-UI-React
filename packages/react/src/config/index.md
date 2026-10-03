---
title: ConfigProvider
group:
  title: 通用
  order: 4
---

# ConfigProvider

全局配置：主题、`appearance`、书写模式、字号、locale、弹层容器等。

## 何时使用

- 为整棵组件树注入主题 token 与 CSS 变量
- 切换 Default / Dark / Editorial 外观
- 统一竖排 / 横排书写模式
- 设置默认组件尺寸或字体族
- 指定弹出层挂载容器 `getPopupContainer`

## 基本用法

### 包裹应用

在应用根部包一层，子组件即可读到配置。

```tsx
import { VertMConfigProvider, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMConfigProvider writingMode="vertical-lr">
      <VertMSpace align="start">
        <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ" fontSize={18} />
        <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## Editorial 外观

### appearance="editorial"

开启 Vertical Editorial：墨色主按钮、栏目边线、字段 marker 等。

```tsx
import { VertMConfigProvider, VertMButton, VertMInput, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame forceTheme="editorial" minHeight={300}>
    <VertMSpace align="start" size="large">
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMInput placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

说明：本 demo 用 `VertMDemoFrame forceTheme="editorial"` 锁定外观；业务代码中等价于 `appearance="editorial"`（未显式传 `theme` 时自动挂 `editorialTheme`）。

## 书写模式

### writingMode

`vertical-lr` / `vertical-rl` / `horizontal-tb` 等。

```tsx
import { VertMConfigProvider, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace size="large" align="start">
      <VertMConfigProvider writingMode="vertical-lr">
        <VertMText text="vertical-lr" fontSize={16} />
      </VertMConfigProvider>
      <VertMConfigProvider writingMode="horizontal-tb">
        <VertMText text="horizontal-tb" fontSize={16} />
      </VertMConfigProvider>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 默认尺寸

### size

子树内 Button 等未设 `size` 时跟随此处。

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace direction="vertical" align="start" size="large">
      <VertMConfigProvider size="small">
        <VertMButton type="primary">ᠪᠠᠭ᠎ᠠ</VertMButton>
      </VertMConfigProvider>
      <VertMConfigProvider size="large">
        <VertMButton type="primary">ᠶᠡᠬᠡ</VertMButton>
      </VertMConfigProvider>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 字体

### fontFamily

覆盖默认蒙古文字体栈。

```tsx
import { VertMConfigProvider, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMConfigProvider fontFamily='"Noto Sans Mongolian", sans-serif'>
      <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠦᠰᠦᠭ" fontSize={20} />
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 嵌套覆盖

### 局部覆盖父配置

内层 Provider 只覆盖传入的字段，其余继承父级。

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMConfigProvider size="large">
      <VertMSpace align="start" size="large">
        <VertMButton type="primary">large</VertMButton>
        <VertMConfigProvider size="small">
          <VertMButton type="primary">small nest</VertMButton>
        </VertMConfigProvider>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 主题 token

### theme

传入完整 `VertMTheme` 对象以覆盖色板等（示例仅改主色相关展示）。

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import { defaultTheme } from '@vertm/tokens';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMConfigProvider
      theme={{
        ...defaultTheme,
        colorPrimary: '#0b6e4f',
      }}
    >
      <VertMSpace>
        <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
        <VertMButton type="link">ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ</VertMButton>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## direction

### ltr / rtl

文本方向（与书写模式独立）。

```tsx
import { VertMConfigProvider, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace size="large">
      <VertMConfigProvider direction="ltr">
        <VertMText text="ltr" />
      </VertMConfigProvider>
      <VertMConfigProvider direction="rtl">
        <VertMText text="rtl" />
      </VertMConfigProvider>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- `appearance="editorial"` 且未传 `theme` 时自动使用 `editorialTheme`
- CSS 变量写在 Provider 根节点，子树通过 `var(--vertm-*)` 消费
- 命令式 `message` / `notification` / `modal` 全局导出**看不到**外层 Provider；请用 `VertMApp` + hooks
- 文档站全局切换器底层也是改 `VertMConfigProvider` 的 theme / writingMode

## API

<API id="VertMConfigProvider"></API>

## 主题变量

Provider 会把 theme token 映射为 CSS 变量，常用包括：

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 主色 |
| `--vertm-color-text` | 正文色 |
| `--vertm-color-bg-layout` | 布局背景 |
| `--vertm-color-bg-container` | 容器背景 |
| `--vertm-column-size` | 竖排列宽 |
| `--vertm-font-family` | 字体族 |
| `--vertm-control-column` | Editorial 控件列宽 |
| `--vertm-field-column` | Editorial 字段列宽 |
