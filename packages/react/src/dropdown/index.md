---
title: Dropdown
group:
  title: 导航
  order: 3
---

# Dropdown

下拉菜单。通过 `menu.items` 配置项。

## 基本用法

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMDropdown
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
          { type: 'divider', key: 'd1' },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', disabled: true },
        ],
      }}
    >
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## 竖排提示

- 默认 hover 触发；`trigger={['click']}` / `contextMenu` 也可用
- `VertMDropdown.Button` 提供按钮 + 下拉组合

## API

<API id="VertMDropdown"></API>
