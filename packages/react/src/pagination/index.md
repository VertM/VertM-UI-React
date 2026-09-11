---
title: Pagination
group:
  title: 导航
  order: 5
---

# Pagination

分页器。竖排下页码沿书写方向排布。

## 基本用法

```tsx
import { useState } from 'react';
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMPagination
        current={page}
        pageSize={pageSize}
        total={128}
        showSizeChanger
        showQuickJumper
        onChange={(p, size) => {
          setPage(p);
          setPageSize(size);
        }}
      />
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- Editorial 下当前页使用墨色 marker
- `layout` 可控制控件排列

## API

<API id="VertMPagination"></API>
