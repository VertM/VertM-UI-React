---
title: Popconfirm
group:
  title: 反馈
  order: 4
---

# Popconfirm

气泡确认框。在触发元素旁二次确认危险操作；确认回调可返回 Promise，按钮会进入 loading。

## 何时使用

- 删除、撤销、提交等需要轻量二次确认，又不想打断整页的 Modal
- 操作就近确认，降低误触成本
- 确认逻辑可能异步（接口请求）时
- 竖排界面里希望确认文案与按钮沿列轴排布时

## 基本用法

### 删除确认

悬停/点击触发后展示标题与确认、取消按钮。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="ᠤᠰᠤᠳᠬᠠᠬᠤ ᠦᠦ ?"
      onConfirm={() => undefined}
    >
      <VertMButton danger>ᠤᠰᠤᠳᠬᠠᠬᠤ</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

### 带描述

`description` 补充说明操作后果。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMPopconfirm
      title="ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?"
      description="ᠡᠨᠡ ᠦᠢᠯᠡᠳᠦᠯ ᠪᠤᠴᠠᠵᠤ ᠪᠣᠯᠤᠰᠢ ᠦᠭᠡᠢ"
      onConfirm={() => undefined}
    >
      <VertMButton type="primary">confirm</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

### 自定义按钮文案

通过 `okText` / `cancelText` 覆盖默认蒙文按钮。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="OK?"
      okText="Yes"
      cancelText="No"
      onConfirm={() => undefined}
    >
      <VertMButton>custom texts</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 异步与回调

### Promise 确认

`onConfirm` 返回 Promise 时确认按钮进入 loading，完成后关闭。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMPopconfirm
      title="ᠬᠦᠯᠢᠶᠡᠭᠡ"
      onConfirm={() => new Promise((r) => setTimeout(r, 800))}
    >
      <VertMButton type="primary">async</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

### 取消回调

`onCancel` 在取消或关闭时触发。

```tsx
import { useState } from 'react';
import { VertMPopconfirm, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [msg, setMsg] = useState('');
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMPopconfirm
        title="ᠪᠣᠯᠢᠬᠤ ᠦᠦ ?"
        onConfirm={() => setMsg('ok')}
        onCancel={() => setMsg('cancel')}
      >
        <VertMButton>open</VertMButton>
      </VertMPopconfirm>
      {msg ? <VertMText text={msg} /> : null}
    </VertMDemoFrame>
  );
};
```

### 禁用

`disabled` 时不弹出确认框。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMPopconfirm title="hidden" disabled onConfirm={() => undefined}>
      <VertMButton disabled>disabled</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 组合场景

### 危险主按钮

与 `danger` 按钮组合强调破坏性操作。

```tsx
import { VertMPopconfirm, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace>
      <VertMPopconfirm title="ᠤᠰᠤᠳᠬᠠᠬᠤ ?" onConfirm={() => undefined}>
        <VertMButton danger type="primary">
          delete
        </VertMButton>
      </VertMPopconfirm>
      <VertMPopconfirm title="ᠬᠠᠳᠠᠭᠠᠯᠠᠬᠤ ?" onConfirm={() => undefined}>
        <VertMButton type="primary">save</VertMButton>
      </VertMPopconfirm>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 文案按钮触发

用 `type="text"` / `link` 做就近确认。

```tsx
import { VertMPopconfirm, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace>
      <VertMPopconfirm title="remove?" onConfirm={() => undefined}>
        <VertMButton type="text" danger>
          text
        </VertMButton>
      </VertMPopconfirm>
      <VertMPopconfirm title="leave?" onConfirm={() => undefined}>
        <VertMButton type="link">link</VertMButton>
      </VertMPopconfirm>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 仅标题

省略 `description`，确认框更紧凑。

```tsx
import { VertMPopconfirm, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMPopconfirm title="ᠬᠢᠢᠬᠦ ᠦᠦ ?" onConfirm={() => undefined}>
      <VertMButton>compact</VertMButton>
    </VertMPopconfirm>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题 / 描述字符串走 `VertMText`，默认确认文案为蒙文
- 内部基于 `VertMPopover`，竖排下气泡沿触发点适配
- 异步确认期间勿重复点击；loading 由组件自动处理

## API

<API id="VertMPopconfirm"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-error` | 危险操作相关强调色 |
| `--vertm-color-primary` | 确认主按钮色 |
| `--vertm-z-index-popup` | 气泡层级 |
| `--vertm-box-shadow-secondary` | 弹出层阴影 |
| `--vertm-padding-sm` | 气泡内边距相关 |
| `--vertm-font-family` | 确认文案字体 |
