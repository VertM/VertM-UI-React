---
title: Pagination
group:
  title: 导航
  order: 5
---

# Pagination

分页器。默认 `layout="vertical"`，页码沿蒙文列方向排列，适合竖排列表与表格。

## 何时使用

- 列表、表格、搜索结果需要按页浏览
- 数据量较大，不能一次渲染全部条目
- 需要切换每页条数或快速跳页
- 竖排页面希望页码列与正文列方向一致时

## 基本用法

### 默认竖排分页

未指定 `layout` 时按竖排书写模式使用 vertical 布局。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMPagination defaultCurrent={1} total={50} />
  </VertMDemoFrame>
);
```

### 受控页码

用 `current` + `onChange` 同步外部状态。

```tsx
import { useState } from 'react';
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [page, setPage] = useState(3);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMPagination
        current={page}
        total={80}
        onChange={(p) => setPage(p)}
      />
    </VertMDemoFrame>
  );
};
```

### 横排布局

`layout="horizontal"` 强制横排页码条，适合混排工具栏。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMPagination layout="horizontal" defaultCurrent={2} total={60} />
  </VertMDemoFrame>
);
```

## 条数与跳转

### 每页条数切换

`showSizeChanger` 显示 pageSize 选择器。

```tsx
import { useState } from 'react';
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMPagination
        current={page}
        pageSize={size}
        total={128}
        showSizeChanger
        onChange={(p, s) => {
          setPage(p);
          setSize(s);
        }}
      />
    </VertMDemoFrame>
  );
};
```

### 自定义 pageSize 选项

通过 `pageSizeOptions` 限定可选条数。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMPagination
      defaultCurrent={1}
      total={200}
      showSizeChanger
      pageSizeOptions={[5, 10, 20]}
      defaultPageSize={5}
    />
  </VertMDemoFrame>
);
```

### 快速跳转

`showQuickJumper` 允许输入页码直接跳转。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMPagination
      defaultCurrent={1}
      total={100}
      showQuickJumper
      showSizeChanger
    />
  </VertMDemoFrame>
);
```

## 状态与边界

### 首页 / 末页按钮

`showFirstLast` 显示首末页；竖排布局默认开启。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMPagination defaultCurrent={5} total={120} showFirstLast />
  </VertMDemoFrame>
);
```

### 禁用

整组分页不可交互。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMPagination defaultCurrent={2} total={40} disabled />
  </VertMDemoFrame>
);
```

### 大量页码省略

总页数较多时自动插入省略号。

```tsx
import { VertMPagination } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMPagination defaultCurrent={12} total={500} pageSize={10} />
  </VertMDemoFrame>
);
```

## 竖排提示

- 默认 `layout` 偏向 vertical（蒙文列）；横排工具区可显式设 `horizontal`
- 竖排下 `showFirstLast` 默认开启，便于长列快速跳到首末
- 页码数字经竖排文本渲染；切换器与跳转输入框跟随书写方向排布

## API

<API id="VertMPagination"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-pagination-cell` | 竖排页码单元格尺寸（默认 28px） |
| `--vertm-color-primary` | 当前页高亮色 |
| `--vertm-color-border` | 页码边框 |
| `--vertm-color-text-disabled` | 禁用态文字色 |
| `--vertm-border-radius` | 页码圆角 |
| `--vertm-font-family` | 页码与跳转输入字体 |
