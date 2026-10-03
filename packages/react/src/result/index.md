---
title: Result
group:
  title: 反馈
  order: 8
---

# Result

结果页。用于操作结束或异常路由后的状态展示，支持成功 / 失败 / 信息 / 警告与 404 / 403 / 500。

## 何时使用

- 表单提交、支付、审批等流程结束后的结果反馈
- 无权限、资源不存在、服务异常等错误页
- 需要在状态图标旁放置返回 / 重试等操作按钮
- 竖排站点中作为整列结果面板

## 基本用法

### 成功结果

默认带成功图标与标题、操作区。

```tsx
import { VertMResult, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMResult
      status="success"
      title="ᠠᠮᠵᠢᠯᠲᠠᠢ !"
      subTitle="ᠦᠢᠯᠡᠳᠦᠯ ᠠᠮᠵᠢᠯᠲᠠᠢ ᠪᠣᠯᠪᠠ"
      extra={<VertMButton type="primary">ᠪᠤᠴᠠᠬᠤ</VertMButton>}
    />
  </VertMDemoFrame>
);
```

### 信息提示

`status="info"` 用于中性说明。

```tsx
import { VertMResult } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMResult status="info" title="ᠮᠡᠳᠡᠭᠡ" subTitle="ᠲᠠᠢᠯᠪᠤᠷᠢ ᠁" />
  </VertMDemoFrame>
);
```

### 警告

`status="warning"` 提示需注意但仍可继续。

```tsx
import { VertMResult, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMResult
      status="warning"
      title="ᠠᠩᠬᠠᠷ"
      subTitle="ᠰᠢᠯᠭᠠᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ"
      extra={<VertMButton>OK</VertMButton>}
    />
  </VertMDemoFrame>
);
```

## 错误与 HTTP 状态

### 错误结果

`status="error"` 表示操作失败。

```tsx
import { VertMResult, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMResult
      status="error"
      title="ᠠᠯᠳᠠᠭ᠎ᠠ"
      subTitle="ᠳᠠᠬᠢᠨ ᠣᠷᠤᠯᠳᠤᠭᠠᠷᠠᠢ"
      extra={
        <VertMSpace>
          <VertMButton>cancel</VertMButton>
          <VertMButton type="primary">retry</VertMButton>
        </VertMSpace>
      }
    />
  </VertMDemoFrame>
);
```

### 404

资源不存在。

```tsx
import { VertMResult, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMResult
      status="404"
      title="404"
      subTitle="ᠣᠯᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ"
      extra={<VertMButton type="primary">home</VertMButton>}
    />
  </VertMDemoFrame>
);
```

### 403 / 500

无权限与服务异常。

```tsx
import { VertMResult, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMSpace direction="horizontal" size="large" align="start">
      <VertMResult status="403" title="403" subTitle="ᠡᠷᠬᠡ ᠦᠭᠡᠢ" />
      <VertMResult status="500" title="500" subTitle="ᠳᠣᠲᠣᠭᠠᠳᠤ ᠠᠯᠳᠠᠭ᠎ᠠ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 定制

### 自定义图标

`icon` 覆盖 status 默认图标。

```tsx
import { VertMResult } from '@vertm/react';
import { Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMResult
      icon={<Search size="large" vertical />}
      title="ᠬᠠᠢᠯᠲᠠ"
      subTitle="custom icon"
    />
  </VertMDemoFrame>
);
```

### 仅标题

省略副标题与操作区。

```tsx
import { VertMResult } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMResult status="success" title="ᠪᠣᠯᠤᠪᠠ" />
  </VertMDemoFrame>
);
```

### 多操作按钮

`extra` 中可放一组按钮。

```tsx
import { VertMResult, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMResult
      status="info"
      title="ᠲᠡᠭᠦᠰᠪᠡ"
      extra={
        <VertMSpace>
          <VertMButton>list</VertMButton>
          <VertMButton type="primary">detail</VertMButton>
        </VertMSpace>
      }
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题 / 副标题字符串走 `VertMText`；图标随 `vertical` 旋转
- 布局使用 split 结构（图标列 + 正文列 + 操作列），适合竖排阅读
- `--vertm-result-min-height` 控制结果区最小高度

## API

<API id="VertMResult"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-result-min-height` | 结果区最小高度（默认 280px） |
| `--vertm-result-icon-size` | 状态图标尺寸 |
| `--vertm-color-success` | success 图标色 |
| `--vertm-color-error` | error 图标色 |
| `--vertm-color-warning` | warning 图标色 |
| `--vertm-margin-sm` | 图标与标题间距 |
