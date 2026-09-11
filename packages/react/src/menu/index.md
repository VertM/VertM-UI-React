---
title: Menu
group:
  title: 导航
  order: 1
---

# Menu

竖排导航菜单，支持子菜单浮层与逻辑轴键盘（Editorial）。

## 基本用法

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMMenu
      defaultSelectedKeys={['1']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ' },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        {
          key: 'sub',
          label: 'ᠳᠣᠲᠣᠷ᠎ᠠ',
          children: [
            { key: '3', label: 'ᠭᠤᠷᠪᠠ' },
            { key: '4', label: 'ᠳᠥᠷᠪᠡ' },
          ],
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## 受控选中

```tsx
import { useState } from 'react';
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['2']);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMMenu
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        items={[
          { key: '1', label: 'ᠨᠢᠭᠡ' },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', disabled: true },
        ]}
      />
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- Editorial：上下键移动同级，右键打开子菜单并聚焦首项，左键关闭/回退
- 选中态使用 block-end 墨色 marker（非蓝色底）

## API

<API id="VertMMenu"></API>
