---
title: Input
group:
  title: 数据录入
  order: 1
---

# Input

竖排输入。含 `Search`、`TextArea`、`Password`；底层为 Mirror Input（`VertMTextField`）。

## 何时使用

- 需要录入短文本、搜索词或密码时
- 竖排表单中的单行 / 多行字段
- 需要前缀、后缀、清除或字数统计时
- 需要错误 / 警告校验态外观时
- 密码仅允许半角字符并带可见性切换时

## 基本用法

### 受控输入

最常见的受控单行输入，可配合 `allowClear`。

```tsx
import { useState } from 'react';
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('');
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
        allowClear
      />
    </VertMDemoFrame>
  );
};
```

## 搜索框

### Input.Search

带搜索图标或搜索按钮；`enterButton` 可显示主色按钮。

```tsx
import { useState } from 'react';
import { VertMInput, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [value, setValue] = useState('');
  const { message } = VertMApp.useApp();
  return (
    <VertMInput.Search
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="ᠬᠠᠢᠬᠤ ᠁"
      enterButton
      onSearch={(v) => message.success(`ᠬᠠᠢᠯᠲᠠ : ${v || 'empty'}`)}
    />
  );
};

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 密码

### Input.Password

掩码输入；非法（非半角）字符会被剥离并提示。

```tsx
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMInput.Password placeholder="ᠨᠢᠭᠤᠴᠠ ᠺᠣᠳ" />
  </VertMDemoFrame>
);
```

## 多行文本

### Input.TextArea

多行输入；可用 `columnDepth` / `maxColumns` 控制竖排列几何。

```tsx
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMInput.TextArea
      rows={2}
      columnDepth={4}
      maxColumns={3}
      placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ"
    />
  </VertMDemoFrame>
);
```

## 字号与列深

### 自定义 typography

通过 `fontSize`、`lineHeight`、`columnDepth` 适配不同阅读密度。

```tsx
import { VertMInput, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMSpace align="start" size="large">
      <VertMInput fontSize={14} lineHeight={1.6} placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
      <VertMInput fontSize={20} lineHeight={1.6} placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
      <VertMInput fontSize={28} lineHeight={1.5} columnDepth={3} placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 前缀后缀

### prefix / suffix / addon

行首侧前缀、行尾侧后缀，以及外侧前后置标签。

```tsx
import { VertMInput, VertMSpace } from '@vertm/react';
import { Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSpace direction="vertical" align="start" size="middle">
      <VertMInput prefix={<Search vertical size="small" />} placeholder="ᠬᠠᠢᠬᠤ" />
      <VertMInput addonBefore="ᠨᠡᠷ᠎ᠡ" addonAfter="᠁" placeholder="..." />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 校验状态

### status

`error` / `warning` 改变边框与焦点环样式。

```tsx
import { VertMInput, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace align="start" size="large">
      <VertMInput status="error" defaultValue="ᠪᠤᠷᠤᠭᠤ" />
      <VertMInput status="warning" defaultValue="ᠠᠩᠬᠠᠷ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 字数统计

### showCount + maxLength

限制长度并显示计数。

```tsx
import { VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMInput showCount maxLength={20} placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
  </VertMDemoFrame>
);
```

## 禁用

### disabled

禁用态不可编辑、不可清除。

```tsx
import { VertMInput, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpace align="start">
      <VertMInput disabled defaultValue="ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ" />
      <VertMInput disabled placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 输入可视化层与隐藏原生控件同步；竖排下列宽由 `columnDepth` / `maxColumns` 决定
- Editorial 下字段列宽走 `--vertm-field-column`，焦点为墨色 marker
- `VertMSearch` 亦可独立导入，与 `VertMInput.Search` 等价

## API

<API id="VertMInput"></API>

### Input.Search / TextArea / Password

| 组件 | 额外属性 |
|------|----------|
| `VertMInput.Search` | `onSearch`、`enterButton` |
| `VertMInput.TextArea` | `autoSize`、`rows`、`columnDepth` |
| `VertMInput.Password` | `invalidCharMessage`、`masked` 可见性切换 |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 焦点环 / 搜索按钮主色 |
| `--vertm-column-size` | 竖排列宽基准 |
| `--vertm-field-column` | Editorial 字段列宽 |
| `--vertm-field-font-size` | 字段字号（由 props 写入） |
| `--vertm-field-row-depth` | 列深（由 `columnDepth` 写入） |
