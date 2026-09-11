---
title: Dropdown
group:
  title: 导航
  order: 3
---

# Dropdown

下拉菜单。用 `menu` 配置项包裹触发器；竖排默认弹出在 `rightTop`，横排默认 `bottomLeft`。

## 何时使用

- 按钮旁需要收纳一组操作时
- 点击/悬停/右键触发上下文菜单时
- 需要级联子菜单或分隔线组织操作时
- 主操作 + 次要操作组合（`Dropdown.Button`）时
- 竖排界面中触发器旁弹出操作列时

## 基本用法

### 悬停触发

默认 `trigger={['hover']}`。

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

## 触发方式

### 点击触发

`trigger={['click']}`，可配合 `arrow`。

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      trigger={['click']}
      arrow
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        ],
      }}
    >
      <VertMButton>ᠳᠠᠷᠤᠬᠤ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

### 右键菜单

`trigger={['contextMenu']}`。

```tsx
import { VertMDropdown, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      trigger={['contextMenu']}
      menu={{
        items: [
          { key: 'copy', label: 'ᠬᠠᠭᠤᠯᠬᠤ' },
          { key: 'paste', label: 'ᠨᠠᠭᠠᠬᠤ' },
        ],
      }}
    >
      <div
        style={{
          padding: '12px 8px',
          border: '1px dashed var(--vertm-color-border)',
          borderRadius: 8,
        }}
      >
        <VertMText text="ᠪᠠᠷᠠᠭᠤᠨ ᠳᠠᠷᠤᠬᠤ" fontSize={14} />
      </div>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## 菜单结构

### 分隔线

`type: 'divider'` 分隔菜单项。

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { type: 'divider', key: 'd1' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        ],
      }}
    >
      <VertMButton>ᠬᠡᠰᠡᠭ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

### 级联子菜单

`children` 嵌套子项。

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMDropdown
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          {
            key: 'sub',
            label: 'ᠬᠣᠶᠠᠷ',
            children: [
              { key: '2', label: 'ᠭᠤᠷᠪᠠ' },
              { key: '3', label: 'ᠳᠥᠷᠪᠡ' },
            ],
          },
        ],
      }}
    >
      <VertMButton>ᠣᠷᠤᠰᠢᠭᠤᠯᠤᠭᠰᠠᠨ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## 按钮形态

### Dropdown.Button

左侧主按钮 + 右侧下拉触发。

```tsx
import { VertMDropdown } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown.Button
      type="primary"
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        ],
      }}
    >
      ᠢᠯᠡᠭᠡᠬᠦ
    </VertMDropdown.Button>
  </VertMDemoFrame>
);
```

### 禁用

`disabled` 禁止展开。

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMDropdown
      disabled
      menu={{ items: [{ key: '1', label: 'ᠨᠢᠭᠡ' }] }}
    >
      <VertMButton disabled>ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

### 指定 placement

显式指定弹出位置。

```tsx
import { VertMDropdown, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMDropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        items: [
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        ],
      }}
    >
      <VertMButton>bottomRight</VertMButton>
    </VertMDropdown>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排默认 `placement="rightTop"`，避免菜单挡住列内容
- 菜单项 label 字符串走菜单内部的 `VertMText` 路径
- `menuCloseOnClick` 默认为 true；级联场景可按需关闭自动收起

## API

<API id="VertMDropdown"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-bg-elevated` | 下拉层背景 |
| `--vertm-color-border` | 菜单边框 |
| `--vertm-color-primary` | 选中/主按钮色 |
| `--vertm-color-text` | 菜单项文字 |
| `--vertm-motion-duration-fast` | 显隐过渡参考 |
