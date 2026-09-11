---
title: Dropdown
group:
  title: 导航
  order: 3
---

# Dropdown

下拉菜单，触发器包裹子元素。

## 基本用法

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', disabled: true },
        ],
      }}
    >
      <VertMButton>ᠰᠣᠩᠭᠣᠬᠤ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## 点击触发

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      trigger={['click']}
      menu={{
        items: [
          { key: 'a', label: 'ᠨᠡᠮᠡᠬᠦ' },
          { key: 'b', label: 'ᠬᠠᠰᠠᠬᠤ' },
        ],
      }}
    >
      <VertMButton type="primary">click</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## Dropdown.Button

```tsx
import { VertMDropdown } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown.Button
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        ],
      }}
    >
      ᠦᠢᠯᠡᠳᠦᠯ
    </VertMDropdown.Button>
  </VertMDemoFrame>
);
```

## 竖排提示

- 默认 hover 触发；`trigger={['click']}` / `contextMenu` 也可用
- `VertMDropdown.Button` 提供按钮 + 下拉组合

## API

<API id="VertMDropdown"></API>
