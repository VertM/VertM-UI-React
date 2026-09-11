---
title: Switch
group:
  title: 数据录入
  order: 5
---

# Switch

开关选择器。

## 基本用法

```tsx
import { VertMSwitch, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center" size="middle">
      <VertMSwitch defaultChecked />
      <VertMSwitch />
      <VertMSwitch disabled defaultChecked />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 带文案

```tsx
import { VertMSwitch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSwitch
      defaultChecked
      checkedChildren="ᠣᠨ"
      unCheckedChildren="ᠣᠯᠢ"
    />
  </VertMDemoFrame>
);
```

## 加载与尺寸

```tsx
import { VertMSwitch, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace align="center" size="middle">
      <VertMSwitch size="small" defaultChecked />
      <VertMSwitch loading defaultChecked />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 子文案字符串走 `VertMText`
- Editorial 开启态为墨色填充

## API

<API id="VertMSwitch"></API>
