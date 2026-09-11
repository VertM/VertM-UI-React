---
title: Pagination
group:
  title: 导航
  order: 5
---

# Pagination

分页器。竖排下默认列向排列页码。

## 基本用法

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMPagination defaultCurrent={1} total={50} pageSize={10} />
  </VertMDemoFrame>
);
```

## 尺寸切换

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMPagination
      defaultCurrent={2}
      total={200}
      showSizeChanger
      pageSizeOptions={[10, 20, 50]}
    />
  </VertMDemoFrame>
);
```

## 横向布局

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMPagination
      layout="horizontal"
      defaultCurrent={3}
      total={80}
      pageSize={10}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- Editorial 下当前页使用墨色 marker
- `layout` 可控制控件排列

## API

<API id="VertMPagination"></API>
