---
title: Grid
group:
  title: 布局
  order: 2
---

# Grid

24 栅格系统：`VertMRow` + `VertMCol`。竖排下 `gutter` 会交换行列间距语义。

## 何时使用

- 需要按比例划分页面或表单区域时
- 响应式（`xs`–`xxl`）调整列宽时
- 列间距、对齐需要统一控制时
- 比 Flex 更强调栅格占比时
- 竖排布局中用栅格组织多列内容块时

## 基本用法

### 基础分栏

`span` 总和为 24。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMRow>
      <VertMCol span={12}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠨᠢᠭᠡ" />
        </div>
      </VertMCol>
      <VertMCol span={12}>
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠬᠣᠶᠠᠷ" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 间隔

### gutter 数字

统一行列间距。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMRow gutter={16}>
      <VertMCol span={8}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠠ" />
        </div>
      </VertMCol>
      <VertMCol span={8}>
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠪ" />
        </div>
      </VertMCol>
      <VertMCol span={8}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠴ" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

### gutter 数组

`[水平, 垂直]`；竖排下语义会交换。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMRow gutter={[16, 24]}>
      {[1, 2, 3, 4].map((n) => (
        <VertMCol span={12} key={n}>
          <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
            <VertMText text={`ᠨᠢᠭᠡ ${n}`} />
          </div>
        </VertMCol>
      ))}
    </VertMRow>
  </VertMDemoFrame>
);
```

## 偏移与对齐

### offset

列左侧（逻辑起点）空出若干格。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMRow>
      <VertMCol span={8} offset={8}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="offset 8" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

### justify / align

行内主轴与交叉轴对齐。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMRow justify="space-between" align="middle" style={{ minHeight: 80 }}>
      <VertMCol span={6}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠨᠢᠭᠡ" />
        </div>
      </VertMCol>
      <VertMCol span={6}>
        <div style={{ padding: 16, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠬᠣᠶᠠᠷ" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 响应式与 flex

### 响应式 span

按断点设置 `xs` / `sm` / `md` 等。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMRow gutter={12}>
      <VertMCol xs={24} sm={12} md={8} lg={6}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="R1" />
        </div>
      </VertMCol>
      <VertMCol xs={24} sm={12} md={8} lg={6}>
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="R2" />
        </div>
      </VertMCol>
      <VertMCol xs={24} sm={12} md={8} lg={6}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="R3" />
        </div>
      </VertMCol>
      <VertMCol xs={24} sm={12} md={8} lg={6}>
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="R4" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

### flex 列

`flex` 填充剩余空间。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMRow>
      <VertMCol flex="100px">
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="100px" />
        </div>
      </VertMCol>
      <VertMCol flex="auto">
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="auto" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

### 不换行

`wrap={false}` 强制单行。

```tsx
import { VertMRow, VertMCol, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMRow wrap={false} gutter={8}>
      <VertMCol span={10}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠨᠢᠭᠡ" />
        </div>
      </VertMCol>
      <VertMCol span={10}>
        <div style={{ padding: 8, background: 'var(--vertm-color-border-secondary)' }}>
          <VertMText text="ᠬᠣᠶᠠᠷ" />
        </div>
      </VertMCol>
      <VertMCol span={10}>
        <div style={{ padding: 8, background: 'var(--vertm-color-bg-layout)' }}>
          <VertMText text="ᠭᠤᠷᠪᠠ" />
        </div>
      </VertMCol>
    </VertMRow>
  </VertMDemoFrame>
);
```

## 竖排提示

- `gutter` 在竖排下交换水平/垂直语义，请用全局切换器对比
- 间距写入 `--vertm-row-gutter-x` / `--vertm-row-gutter-y`
- 响应式断点基于视口宽度，与书写模式无关

## API

<API id="VertMRow"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-row-gutter-x` | 列间距（由 gutter 注入） |
| `--vertm-row-gutter-y` | 行间距（由 gutter 注入） |
| `--vertm-color-bg-layout` | 演示块背景 |
| `--vertm-color-border-secondary` | 交替块背景 |
| `--vertm-color-border` | 外边框参考 |
