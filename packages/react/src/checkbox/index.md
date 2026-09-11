---
title: Checkbox
group:
  title: 数据录入
  order: 3
---

# Checkbox

竖排复选框与复选组。

## 何时使用

- 在一组选项中多选
- 单独开关某个布尔条件（同意条款等）
- 需要半选（indeterminate）表示「部分选中」时
- 表单中收集 `string[]` 字段时
- 整组或单项需要禁用时

## 基本用法

### 单个复选框

受控选中状态。

```tsx
import { useState } from 'react';
import { VertMCheckbox } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(false);
  return (
    <VertMDemoFrame>
      <VertMCheckbox checked={checked} onChange={setChecked}>
        ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠨ᠎ᠡ
      </VertMCheckbox>
    </VertMDemoFrame>
  );
};
```

## 复选组

### Checkbox.Group

用 `options` 批量渲染；值为 `string[]`。

```tsx
import { useState } from 'react';
import { VertMCheckbox, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState<string[]>(['c']);
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMSpace direction="vertical" align="start">
        <VertMText text="ᠠᠷᠪᠢᠨ ᠰᠣᠩᠭᠣᠬᠤ" />
        <VertMCheckbox.Group
          options={[
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ C', value: 'c' },
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ D', value: 'd' },
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ E', value: 'e' },
          ]}
          value={value}
          onChange={setValue}
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 半选

### indeterminate

外观半选，不影响 `checked` 语义；常用于「全选」父项。

```tsx
import { useState } from 'react';
import { VertMCheckbox, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checkedList, setCheckedList] = useState<string[]>(['a']);
  const options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
  ];
  const all = options.map((o) => o.value);
  const indeterminate = checkedList.length > 0 && checkedList.length < all.length;
  const checkAll = checkedList.length === all.length;
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMSpace direction="vertical" align="start">
        <VertMCheckbox
          indeterminate={indeterminate}
          checked={checkAll}
          onChange={(c) => setCheckedList(c ? all : [])}
        >
          ᠪᠦᠭᠦᠳᠡ
        </VertMCheckbox>
        <VertMCheckbox.Group options={options} value={checkedList} onChange={setCheckedList} />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 禁用

### disabled

单项或整组禁用。

```tsx
import { VertMCheckbox, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="vertical" align="start">
      <VertMCheckbox disabled>ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ</VertMCheckbox>
      <VertMCheckbox disabled defaultChecked>
        checked + disabled
      </VertMCheckbox>
      <VertMCheckbox.Group
        disabled
        defaultValue={['a']}
        options={[
          { label: 'ᠨᠢᠭᠡ', value: 'a' },
          { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
        ]}
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 非受控

### defaultChecked / defaultValue

```tsx
import { VertMCheckbox, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace direction="vertical" align="start">
      <VertMCheckbox defaultChecked>ᠡᠬᠢᠯᠡᠬᠦ</VertMCheckbox>
      <VertMCheckbox.Group
        defaultValue={['1']}
        options={[
          { label: 'ᠨᠢᠭᠡ', value: '1' },
          { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        ]}
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 选项禁用

### option.disabled

组内个别选项不可点。

```tsx
import { VertMCheckbox } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCheckbox.Group
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ', value: '2', disabled: true },
        { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 无标签

### 仅方框

不传 children，只显示控件。

```tsx
import { useState } from 'react';
import { VertMCheckbox, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <VertMDemoFrame>
      <VertMSpace>
        <VertMCheckbox checked={a} onChange={setA} />
        <VertMCheckbox checked={b} onChange={setB} />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 与文案并排

### VertMText 说明

演示说明文字与复选组的竖排组合。

```tsx
import { useState } from 'react';
import { VertMCheckbox, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMSpace align="start" size="large">
        <VertMText text="ᠰᠣᠩᠭᠣᠯᠲᠠ" />
        <VertMCheckbox.Group
          value={value}
          onChange={setValue}
          options={[
            { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'r' },
            { label: 'ᠬᠥᠬᠡ', value: 'b' },
          ]}
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 标签字符串经 `VertMText` 渲染
- Editorial 下选中色跟随墨色主色 token
- 半选时原生 `indeterminate` 属性同步到隐藏 input

## API

<API id="VertMCheckbox"></API>

### Checkbox.Group

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `CheckboxOption[]` | `[]` |
| value | 受控选中值 | `string[]` | — |
| defaultValue | 非受控初始值 | `string[]` | `[]` |
| onChange | 变化回调 | `(value: string[]) => void` | — |
| disabled | 整组禁用 | `boolean` | — |
| className | 类名 | `string` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 选中填充色 |
| `--vertm-color-border` | 未选中边框 |
| `--vertm-color-text-disabled` | 禁用文案色 |
| `--vertm-column-size` | 竖排列宽相关 |
