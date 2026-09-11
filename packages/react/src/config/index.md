---
title: ConfigProvider
group:
  title: 通用
  order: 4
---

# ConfigProvider

全局配置：主题、`appearance`、书写模式、字号、locale、弹层容器等。

## 基本用法

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMConfigProvider appearance="editorial" writingMode="vertical-lr">
      <VertMSpace align="start">
        <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
        <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 字号与尺寸

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMConfigProvider size="large">
      <VertMSpace align="start">
        <VertMButton type="primary">ᠶᠡᠬᠡ</VertMButton>
        <VertMButton>ᠬᠠᠰᠠᠬᠤ</VertMButton>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 嵌套覆盖

```tsx
import { VertMConfigProvider, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMConfigProvider appearance="default">
      <VertMSpace align="start">
        <VertMButton type="primary">ᠭᠠᠳᠠᠭᠠ</VertMButton>
        <VertMConfigProvider appearance="editorial">
          <VertMButton type="primary">ᠳᠣᠲᠣᠷ᠎ᠠ</VertMButton>
        </VertMConfigProvider>
      </VertMSpace>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 竖排提示

- `appearance="editorial"` 开启竖排编辑风（墨色 primary、列缘 marker）
- `writingMode` 支持 `vertical-lr` / `vertical-rl` / `horizontal-tb`
- 文档站 demo 外层已有 Provider；业务应用请在根节点包裹一次

## API

<API id="VertMConfigProvider"></API>
