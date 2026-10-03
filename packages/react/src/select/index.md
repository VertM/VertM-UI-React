---
title: Select
group:
  title: 数据录入
  order: 2
---

# Select

竖排选择器。同模块提供 `VertMAutoComplete`（或 `VertMSelect.AutoComplete`）。

## 何时使用

- 从固定选项中单选或多选时
- 选项较多需要搜索过滤时
- 竖排表单中需要下拉触发器与竖排选项面板时
- 需要可清除已选值时
- 需要「可输入联想」而非严格选项时，改用 AutoComplete

## 基本用法

### 单选

受控单选，可搜索与清除。

```tsx
import { useState } from 'react';
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const OPTIONS = [
  { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
  { label: 'ᠬᠥᠬᠡ', value: 'blue' },
  { label: 'ᠨᠣᠭᠤᠭᠠᠨ', value: 'green' },
];

export default () => {
  const [value, setValue] = useState<string>();
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSelect
        options={OPTIONS}
        value={value}
        onChange={(v) => setValue(v as string)}
        showSearch
        allowClear
        placeholder="ᠰᠣᠩᠭᠣᠭᠠᠷᠠᠢ"
      />
    </VertMDemoFrame>
  );
};
```

## 多选

### multiple

`multiple` 时值为 `string[]`；可用 `height` / `listWidth` 调整触发器与列表尺寸。

```tsx
import { useState } from 'react';
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const OPTIONS = [
  { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
  { label: 'ᠬᠥᠬᠡ', value: 'blue' },
  { label: 'ᠨᠣᠭᠤᠭᠠᠨ', value: 'green' },
  { label: 'ᠰᠢᠷ᠎ᠠ', value: 'yellow' },
];

export default () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <VertMDemoFrame minHeight={360}>
      <VertMSelect
        options={OPTIONS}
        value={value}
        onChange={(v) => setValue(v as string[])}
        multiple
        showSearch
        allowClear
        height={300}
        listWidth={300}
        listHeight={300}
        placeholder="ᠣᠯᠠᠨ ᠢ ᠰᠣᠩᠭᠣᠵᠤ ᠪᠣᠯᠤᠨ᠎ᠠ"
      />
    </VertMDemoFrame>
  );
};
```

## 搜索过滤

### showSearch

打开后可按规范化蒙古文检索选项。

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSelect
      showSearch
      defaultValue="a"
      options={[
        { label: 'ᠠᠯᠲᠠᠨ', value: 'a' },
        { label: 'ᠮᠥᠩᠭᠦᠨ', value: 'b' },
        { label: 'ᠲᠡᠮᠦᠷ', value: 'c' },
      ]}
      placeholder="ᠬᠠᠢᠬᠤ"
    />
  </VertMDemoFrame>
);
```

## 可清除

### allowClear

有值时显示清除按钮。

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSelect
      allowClear
      defaultValue="1"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 禁用

### disabled

整控件禁用，或单选项 `disabled`。

```tsx
import { VertMSelect, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const OPTIONS = [
  { label: 'ᠨᠢᠭᠡ', value: '1' },
  { label: 'ᠬᠣᠶᠠᠷ', value: '2', disabled: true },
  { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
];

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSpace align="start" size="large">
      <VertMSelect disabled defaultValue="1" options={OPTIONS} />
      <VertMSelect options={OPTIONS} placeholder="ᠰᠣᠩᠭᠣᠭᠠᠷᠠᠢ" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸几何

### height / listHeight / listWidth

自定义触发器高度与下拉可视区域。

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMSelect
      height={200}
      listHeight={220}
      listWidth={240}
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
        { label: 'ᠳᠥᠷᠪᠡ', value: '4' },
      ]}
      placeholder="ᠰᠣᠩᠭᠣᠭᠠᠷᠠᠢ"
    />
  </VertMDemoFrame>
);
```

## 弹出位置

### placement

相对触发器的弹出方位，默认 `rightTop`。

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSelect
      placement="bottomLeft"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
      ]}
      placeholder="ᠰᠣᠩᠭᠣᠭᠠᠷᠠᠢ"
    />
  </VertMDemoFrame>
);
```

## 非受控

### defaultValue

不传 `value` 时使用内部状态。

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSelect
      defaultValue="blue"
      options={[
        { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
        { label: 'ᠬᠥᠬᠡ', value: 'blue' },
      ]}
    />
  </VertMDemoFrame>
);
```

## AutoComplete

### 可输入联想

`VertMAutoComplete` 固定开启搜索，适合自由输入 + 建议列表。

```tsx
import { useState } from 'react';
import { VertMAutoComplete } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('');
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMAutoComplete
        value={value}
        onChange={(v) => setValue(v as string)}
        allowClear
        placeholder="ᠣᠷᠤᠭᠤᠯᠬᠤ ᠪᠤᠶᠤ ᠰᠣᠩᠭᠣᠬᠤ"
        options={[
          { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
          { label: 'ᠬᠥᠬᠡ', value: 'blue' },
          { label: 'ᠨᠣᠭᠤᠭᠠᠨ', value: 'green' },
        ]}
      />
    </VertMDemoFrame>
  );
};
```

## 组合：标签 + 选择

### 与 VertMText 并排

演示文案说明与控件并排的竖排排版。

```tsx
import { useState } from 'react';
import { VertMSelect, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState<string>();
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace align="start" size="large">
        <VertMText text="ᠭᠠᠭᠴᠠ ᠰᠣᠩᠭᠣᠯᠲᠠ" />
        <VertMSelect
          options={[
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ A', value: 'a' },
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ B', value: 'b' },
          ]}
          value={value}
          onChange={(v) => setValue(v as string)}
          allowClear
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 竖排下触发器宽度由 `--vertm-select-width`（多选 `--vertm-select-multiple-width`）约束
- 下拉列表高度默认对齐 `--vertm-select-height`，可用 `listHeight` 覆盖
- Editorial 选中态为墨色 marker，而非蓝色底
- AutoComplete：`import { VertMAutoComplete } from '@vertm/react'` 或 `VertMSelect.AutoComplete`；API 与 Select 相同（强制 `showSearch`）

## API

<API id="VertMSelect"></API>

### VertMAutoComplete

与 `VertMSelect` 相同，但不接受 `showSearch`（内部恒为 `true`）。选项类型为 `SelectOption`：`{ label, value, disabled? }`。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-select-height` | 触发器 / 列表默认高度 |
| `--vertm-select-width` | 单选触发器宽度 |
| `--vertm-select-multiple-width` | 多选触发器最小宽度 |
| `--vertm-select-list-height` | 列表可视高度（可由 props 写入） |
| `--vertm-select-list-width` | 列表可视宽度 |
| `--vertm-color-primary` | 焦点与选中强调色 |
