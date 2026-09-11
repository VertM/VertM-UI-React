---
title: Steps
group:
  title: 导航
  order: 6
---

# Steps

步骤条。引导多步流程；未设 `direction` 时跟随书写模式（竖排 → vertical）。

## 何时使用

- 分步表单、向导、审批流
- 需要展示当前步、已完成与等待态
- 某一步出错时用 `status="error"` 标出
- 竖排页面中步骤沿列向下推进

## 基本用法

### 进行中

`current` 从 0 开始，指示当前步。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSteps
      current={1}
      items={[
        { title: 'ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠠᠯᠬᠤᠮ', description: 'ᠭᠦᠢᠴᠡᠳᠬᠡᠭᠰᠡᠨ' },
        { title: 'ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠠᠯᠬᠤᠮ', description: 'ᠭᠦᠢᠴᠡᠳᠬᠡᠵᠦ' },
        { title: 'ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠠᠯᠬᠤᠮ', description: 'ᠬᠦᠯᠢᠶᠡᠵᠦ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 仅标题

省略 description 的紧凑步骤。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSteps
      current={0}
      items={[
        { title: 'ᠨᠢᠭᠡ' },
        { title: 'ᠬᠣᠶᠠᠷ' },
        { title: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 全部完成

`current` 等于或超过最后一步索引。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSteps
      current={3}
      items={[
        { title: 'A' },
        { title: 'B' },
        { title: 'C' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 方向

### 垂直步骤

显式 `direction="vertical"`。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMSteps
      direction="vertical"
      current={1}
      items={[
        { title: 'ᠡᠬᠢᠯᠡᠬᠦ', description: 'start' },
        { title: 'ᠳᠤᠮᠳᠠ', description: 'mid' },
        { title: 'ᠲᠡᠭᠦᠰᠬᠦ', description: 'end' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 水平步骤

显式 `direction="horizontal"`。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSteps
      direction="horizontal"
      current={1}
      items={[
        { title: '1' },
        { title: '2' },
        { title: '3' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 状态与图标

### 错误步骤

单项 `status="error"` 覆盖自动状态。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSteps
      current={1}
      items={[
        { title: 'done', status: 'finish' },
        { title: 'error', status: 'error', description: 'ᠠᠯᠳᠠᠭ᠎ᠠ' },
        { title: 'wait', status: 'wait' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 自定义图标

`icon` 替换默认点/勾/加载图标。

```tsx
import { VertMSteps } from '@vertm/react';
import { Edit, Search, Check } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSteps
      current={1}
      items={[
        { title: 'edit', icon: <Edit vertical /> },
        { title: 'search', icon: <Search vertical /> },
        { title: 'done', icon: <Check vertical /> },
      ]}
    />
  </VertMDemoFrame>
);
```

### 受控切换当前步

配合按钮演示前进/后退。

```tsx
import { useState } from 'react';
import { VertMSteps, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [current, setCurrent] = useState(0);
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace direction="vertical" align="start" size="middle">
        <VertMSteps
          current={current}
          items={[
            { title: 'ᠨᠢᠭᠡ' },
            { title: 'ᠬᠣᠶᠠᠷ' },
            { title: 'ᠭᠤᠷᠪᠠ' },
          ]}
        />
        <VertMSpace>
          <VertMButton disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            prev
          </VertMButton>
          <VertMButton
            type="primary"
            disabled={current >= 2}
            onClick={() => setCurrent((c) => c + 1)}
          >
            next
          </VertMButton>
        </VertMSpace>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 两步流程

最短向导。

```tsx
import { VertMSteps } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSteps
      current={0}
      items={[
        { title: 'ᠣᠷᠤᠭᠤᠯᠬᠤ', description: 'input' },
        { title: 'ᠪᠠᠲᠤᠯᠠᠬᠤ', description: 'confirm' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 未设 `direction` 时随书写模式：竖排用 vertical 步骤列
- process 态默认使用旋转 `Loading` 图标
- 标题 / 描述字符串走 `VertMText`

## API

<API id="VertMSteps"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 当前步强调色 |
| `--vertm-color-success` | 完成勾选参考色 |
| `--vertm-color-error` | 错误步图标色 |
| `--vertm-color-border` | 步骤连线色 |
| `--vertm-color-text-secondary` | 描述次要色 |
| `--vertm-font-family` | 步骤标题字体 |
