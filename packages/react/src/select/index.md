---
title: Select
group:
  title: 数据录入
  order: 2
---

# Select

竖排选择器。同模块还提供 `VertMAutoComplete`（或 `VertMSelect.AutoComplete`）。

## 基本用法

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSelect
      allowClear
      showSearch
      placeholder="ᠰᠣᠩᠭᠣᠬᠤ"
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 多选

```tsx
import { VertMSelect } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSelect
      multiple
      allowClear
      placeholder="ᠣᠯᠠᠨ"
      defaultValue={['1']}
      options={[
        { label: 'ᠨᠢᠭᠡ', value: '1' },
        { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        { label: 'ᠭᠤᠷᠪᠠ', value: '3' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 禁用与清空

```tsx
import { VertMSelect, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMSpace direction="horizontal" size="middle" align="start">
      <VertMSelect
        disabled
        defaultValue="1"
        options={[{ label: 'ᠨᠢᠭᠡ', value: '1' }]}
      />
      <VertMSelect
        allowClear
        defaultValue="2"
        options={[
          { label: 'ᠨᠢᠭᠡ', value: '1' },
          { label: 'ᠬᠣᠶᠠᠷ', value: '2' },
        ]}
      />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 搜索走 `normalizeForSearch`，兼容 O/U 歧义
- `multiple` 开启多选；`height` / `listHeight` 控制触发器与面板尺寸

## API

<API id="VertMSelect"></API>
