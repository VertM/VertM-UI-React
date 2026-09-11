---
title: Switch
group:
  title: 数据录入
  order: 5
---

# Switch

开关选择器。竖排下沿块轴滑动，文案区随标签尺寸自适应。

## 何时使用

- 表示开 / 关两种状态的即时切换
- 需要比 Checkbox 更强的「开关」语义时
- 开关上需显示蒙古文短标签时
- 异步切换过程需要 `loading` 时
- 设置页中的功能开关

## 基本用法

### 受控开关

```tsx
import { useState } from 'react';
import { VertMSwitch, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(false);
  return (
    <VertMDemoFrame>
      <VertMSpace align="start" size="large">
        <VertMText text="ᠰᠣᠯᠢᠬᠤ" />
        <VertMSwitch checked={checked} onChange={setChecked} />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 带文案

### checkedChildren / unCheckedChildren

打开与关闭时显示不同标签。

```tsx
import { useState } from 'react';
import { VertMSwitch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMSwitch
        checked={checked}
        onChange={setChecked}
        checkedChildren="ᠬᠠᠭᠠᠬᠤ"
        unCheckedChildren="ᠨᠡᠭᠡᠭᠡᠬᠦ"
      />
    </VertMDemoFrame>
  );
};
```

## 尺寸

### size

`default` 与 `small`。

```tsx
import { VertMSwitch, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start" size="large">
      <VertMSwitch defaultChecked />
      <VertMSwitch size="small" defaultChecked />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 加载中

### loading

载入中不可切换，并显示 spinner。

```tsx
import { useState } from 'react';
import { VertMSwitch, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  return (
    <VertMDemoFrame>
      <VertMSpace align="start" size="large">
        <VertMSwitch loading={loading} checked={checked} onChange={setChecked} />
        <VertMButton size="small" onClick={() => setLoading((v) => !v)}>
          toggle loading
        </VertMButton>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 禁用

### disabled

```tsx
import { VertMSwitch, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start" size="large">
      <VertMSwitch disabled />
      <VertMSwitch disabled defaultChecked />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 非受控

### defaultChecked

```tsx
import { VertMSwitch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSwitch defaultChecked />
  </VertMDemoFrame>
);
```

## 小尺寸带文案

### small + children

小尺寸同样支持开/关文案。

```tsx
import { VertMSwitch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSwitch
      size="small"
      defaultChecked
      checkedChildren="ON"
      unCheckedChildren="OFF"
    />
  </VertMDemoFrame>
);
```

## 表单场景示意

### 与说明并排

设置项常见排版。

```tsx
import { useState } from 'react';
import { VertMSwitch, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace direction="vertical" align="start" size="large">
        <VertMSpace align="start">
          <VertMText text="ᠮᠡᠳᠡᠭᠳᠡᠯ" />
          <VertMSwitch checked={notify} onChange={setNotify} />
        </VertMSpace>
        <VertMSpace align="start">
          <VertMText text="ᠬᠠᠷᠠᠩᠭᠤᠢ" />
          <VertMSwitch checked={dark} onChange={setDark} />
        </VertMSpace>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 竖排下手柄沿纵向滑动（`--vertm-switch-travel`）
- 蒙古文标签会按实测宽高扩展轨道，避免裁切
- Editorial 打开态跟随墨色主色

## API

<API id="VertMSwitch"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-switch-handle` | 手柄尺寸 |
| `--vertm-switch-gap` | 手柄与文案区间隙 |
| `--vertm-switch-inset` | 内边距 |
| `--vertm-switch-travel` | 手柄滑动距离（运行时写入） |
| `--vertm-color-primary` | 打开态背景 |
