---
title: Radio
group:
  title: 数据录入
  order: 4
---

# Radio

竖排单选框与单选组。

## 何时使用

- 在互斥选项中选其一
- 选项较少、希望全部可见时（对比 Select）
- 需要按钮样式单选（`optionType="button"`）时
- 表单中收集单个枚举字段时
- 部分选项需禁用时

## 基本用法

### Radio.Group

最常见的选项组用法。

```tsx
import { useState } from 'react';
import { VertMRadio, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('a');
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMSpace direction="vertical" align="start">
        <VertMText text="ᠭᠠᠭᠴᠠ ᠰᠣᠩᠭᠣᠯᠲᠠ" />
        <VertMRadio.Group
          value={value}
          onChange={setValue}
          options={[
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ A', value: 'a' },
            { label: 'ᠰᠣᠩᠭᠣᠯᠲᠠ B', value: 'b' },
          ]}
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 按钮样式

### optionType="button"

外观接近分段控件的单选按钮组。

```tsx
import { useState } from 'react';
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('day');
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMRadio.Group
        optionType="button"
        value={value}
        onChange={setValue}
        options={[
          { label: 'ᠡᠳᠦᠷ', value: 'day' },
          { label: 'ᠭᠠᠷᠠᠭ', value: 'week' },
          { label: 'ᠰᠠᠷ᠎ᠠ', value: 'month' },
        ]}
      />
    </VertMDemoFrame>
  );
};
```

## 单个 Radio

### 受控单项

较少单独使用；通常放在 Group 外自管状态。

```tsx
import { useState } from 'react';
import { VertMRadio, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('1');
  return (
    <VertMDemoFrame>
      <VertMSpace direction="vertical" align="start">
        <VertMRadio
          value="1"
          checked={value === '1'}
          onChange={() => setValue('1')}
        >
          ᠨᠢᠭᠡ
        </VertMRadio>
        <VertMRadio
          value="2"
          checked={value === '2'}
          onChange={() => setValue('2')}
        >
          ᠬᠣᠶᠠᠷ
        </VertMRadio>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 禁用

### disabled

整组或选项禁用。

```tsx
import { VertMRadio, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMSpace direction="vertical" align="start" size="large">
      <VertMRadio.Group
        disabled
        defaultValue="a"
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
      <VertMRadio.Group
        defaultValue="1"
        options={[
          { label: 'ᠨᠢᠭᠡ', value: '1' },
          { label: 'ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ', value: '2', disabled: true },
          { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
        ]}
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 非受控

### defaultValue

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMRadio.Group
      defaultValue="blue"
      options={[
        { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
        { label: 'ᠬᠥᠬᠡ', value: 'blue' },
        { label: 'ᠨᠣᠭᠤᠭᠠᠨ', value: 'green' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 按钮组禁用项

### button + disabled option

```tsx
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMRadio.Group
      optionType="button"
      defaultValue="a"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: 'a' },
        { label: 'ᠬᠣᠶᠠᠷ', value: 'b', disabled: true },
        { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 较多选项

### 纵向选项流

选项较多时在竖排容器中自然换列。

```tsx
import { useState } from 'react';
import { VertMRadio } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('1');
  return (
    <VertMDemoFrame minHeight={360}>
      <VertMRadio.Group
        value={value}
        onChange={setValue}
        options={[
          { label: 'ᠨᠢᠭᠡ', value: '1' },
          { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
          { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
          { label: 'ᠳᠥᠷᠪᠡ', value: '4' },
          { label: 'ᠲᠠᠪᠤ', value: '5' },
        ]}
      />
    </VertMDemoFrame>
  );
};
```

## 与文案组合

### 说明 + 单选

```tsx
import { useState } from 'react';
import { VertMRadio, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('x');
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMSpace align="start" size="large">
        <VertMText text="ᠬᠡᠯᠡ" />
        <VertMRadio.Group
          value={value}
          onChange={setValue}
          options={[
            { label: 'ᠮᠣᠩᠭᠣᠯ', value: 'x' },
            { label: 'ᠬᠢᠲᠠᠳ', value: 'y' },
          ]}
        />
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 标签字符串经 `VertMText` 渲染
- `optionType="button"` 在竖排下按列方向排列按钮
- Editorial 选中环为墨色

## API

<API id="VertMRadio"></API>

### Radio.Group

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `RadioOption[]` | `[]` |
| value | 受控值 | `string` | — |
| defaultValue | 非受控初始值 | `string` | `''` |
| onChange | 变化回调 | `(value: string) => void` | — |
| disabled | 整组禁用 | `boolean` | — |
| optionType | `default` 圆点 / `button` 按钮 | `'default' \| 'button'` | `'default'` |
| className | 类名 | `string` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 选中环 / 按钮强调 |
| `--vertm-color-border` | 未选中边框 |
| `--vertm-color-text-disabled` | 禁用色 |
| `--vertm-column-size` | 竖排列宽相关 |
