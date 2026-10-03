---
title: VertMTextField
group:
  title: 竖排专属
  order: 2
---

# VertMTextField

Mirror Input：隐藏原生 input + 竖排可视化层，适合复杂竖排编辑。`VertMInput` 底层即基于此。

## 何时使用

- 需要比 `VertMInput` 更底层的竖排编辑能力时
- 自定义多列扩宽（`columnDepth` / `maxColumns`）时
- 需要 `bare` 轻量内联编辑外观时
- 密码掩码或自定义 `sanitize` 过滤时
- 在自建表单控件中复用同一套 Mirror 机制时

## 基本用法

### 受控编辑

```tsx
import { useState } from 'react';
import { VertMTextField } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('');
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMTextField
        value={value}
        onChange={setValue}
        placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
      />
    </VertMDemoFrame>
  );
};
```

## 多行与列深

### rows / columnDepth / maxColumns

控制可视行数、每列深度与最大扩列数。

```tsx
import { VertMTextField } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={400}>
    <VertMTextField
      rows={2}
      columnDepth={4}
      maxColumns={3}
      placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
      defaultValue=""
    />
  </VertMDemoFrame>
);
```

## 字号

### fontSize / lineHeight

```tsx
import { VertMTextField, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMSpace align="start" size="large">
      <VertMTextField fontSize={14} lineHeight={1.6} placeholder="14" />
      <VertMTextField fontSize={20} lineHeight={1.6} placeholder="20" />
      <VertMTextField fontSize={28} lineHeight={1.5} columnDepth={3} placeholder="28" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## Bare 变体

### variant="bare" / VertMTextFieldBare

无边框轻量内联编辑。

```tsx
import { useState } from 'react';
import { VertMTextField, VertMTextFieldBare, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [a, setA] = useState('ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ');
  const [b, setB] = useState('Bare');
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMSpace direction="vertical" align="start" size="large">
        <VertMTextField variant="bare" value={a} onChange={setA} />
        <VertMTextFieldBare value={b} onChange={setB} />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 掩码

### masked

以圆点掩码显示（密码场景）。

```tsx
import { useState } from 'react';
import { VertMTextField } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('secret');
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMTextField value={value} onChange={setValue} masked placeholder="password" />
    </VertMDemoFrame>
  );
};
```

## 过滤

### sanitize

提交前过滤非法字符；非法按键会被拦截。

```tsx
import { useState } from 'react';
import { VertMTextField, VertMApp, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [value, setValue] = useState('');
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace direction="vertical" align="start">
      <VertMText text="仅数字" fontSize={14} />
      <VertMTextField
        value={value}
        onChange={setValue}
        sanitize={(v) => v.replace(/\D/g, '')}
        onSanitizeReject={() => message.warning('digits only')}
        placeholder="0-9"
      />
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 禁用与自动聚焦

### disabled / autoFocus

```tsx
import { VertMTextField, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace align="start" size="large">
      <VertMTextField disabled defaultValue="ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ" />
      <VertMTextField autoFocus placeholder="autoFocus" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## boxed 默认外观

### variant="boxed"

默认带边框输入框（与 bare 对比）。

```tsx
import { VertMTextField, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace align="start" size="large">
      <VertMTextField variant="boxed" placeholder="boxed" />
      <VertMTextField variant="bare" placeholder="bare" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 可视化层与隐藏原生控件保持同步；IME 组合输入有专用路径
- 列几何由 `--vertm-field-row-depth` / `--vertm-field-column-count` 等 CSS 变量驱动
- 多数业务场景优先用 `VertMInput`；仅在需要裸字段能力时用本组件

## API

<API id="VertMTextField"></API>

### VertMTextFieldBare

等价于 `variant="bare"` 的快捷导出。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-field-font-size` | 字段字号 |
| `--vertm-field-line-height` | 字段行高 |
| `--vertm-field-column-count` | 当前列数 |
| `--vertm-field-needed-column-count` | 内容所需列数 |
| `--vertm-field-row-depth` | 列深（`columnDepth`） |
| `--vertm-field-font-family` | 字段字体 |
| `--vertm-field-writing-mode` | 字段书写模式 |
| `--vertm-field-column` | Editorial 字段列宽 |
