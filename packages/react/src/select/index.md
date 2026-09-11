---
title: Select
group:
  title: 数据录入
  order: 3
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

## 竖排提示

- 搜索走 `normalizeForSearch`，兼容 O/U 歧义
- `multiple` 开启多选；`height` / `listHeight` 控制触发器与面板尺寸

## API

<API id="VertMSelect"></API>
