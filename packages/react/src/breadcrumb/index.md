---
title: Breadcrumb
group:
  title: 导航
  order: 4
---

# Breadcrumb

面包屑导航，`items` 配置路径。

## 基本用法

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMBreadcrumb
      items={[
        { title: 'ᠨᠢᠭᠡ', href: '#' },
        { title: 'ᠬᠣᠶᠠᠷ', href: '#' },
        { title: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 单项可挂 `menu` 做下拉分支
- `separator` 可自定义分隔符

## API

<API id="VertMBreadcrumb"></API>
