---
title: Menu
group:
  title: 导航
  order: 1
---

# Menu

竖排导航菜单，支持子菜单浮层与逻辑轴键盘（Editorial）。

## 何时使用

- 应用侧栏或栏目导航
- 需要多级子菜单浮层时
- Editorial 竖排下要用逻辑轴键盘操作菜单时
- 需要受控选中 / 展开状态时
- 菜单项需带图标或禁用态时

## 基本用法

### items 声明式

用 `items` 描述菜单树（文档场景优先）。

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

### selectedKeys

完全受控的选中项。

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

## 受控展开

### openKeys

控制子菜单展开；配合 `onOpenChange`。

```tsx
import { useState } from 'react';
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [openKeys, setOpenKeys] = useState<string[]>(['sub1']);
  const [selectedKeys, setSelectedKeys] = useState(['setting1']);
  return (
    <VertMDemoFrame minHeight={340}>
      <VertMMenu
        mode="vertical"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        onOpenChange={setOpenKeys}
        style={{ border: '1px solid var(--vertm-color-border)' }}
        items={[
          { key: 'mail', label: 'ᠨᠢᠭᠡ' },
          {
            key: 'sub1',
            label: 'ᠬᠣᠶᠠᠷ',
            children: [
              { key: 'setting1', label: 'ᠳᠥᠷᠪᠡ' },
              { key: 'setting2', label: 'ᠲᠠᠪᠤ' },
            ],
          },
          { key: 'team', label: 'ᠭᠤᠷᠪᠠ' },
        ]}
      />
    </VertMDemoFrame>
  );
};
```

## 图标

### icon

菜单项与子菜单标题可带图标。

```tsx
import { VertMMenu } from '@vertm/react';
import { Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMMenu
      defaultSelectedKeys={['mail']}
      items={[
        { key: 'mail', label: 'ᠨᠢᠭᠡ', icon: <Search vertical size="small" /> },
        {
          key: 'sub1',
          label: 'ᠬᠣᠶᠠᠷ',
          icon: <Search vertical size="small" />,
          children: [
            { key: 's1', label: 'ᠳᠥᠷᠪᠡ' },
            { key: 's2', label: 'ᠲᠠᠪᠤ' },
          ],
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## 禁用与危险

### disabled / danger

单项禁用或危险样式（children 写法）。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMMenu defaultSelectedKeys={['1']}>
      <VertMMenu.Item itemKey="1">ᠨᠢᠭᠡ</VertMMenu.Item>
      <VertMMenu.Item itemKey="2" disabled>
        ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ
      </VertMMenu.Item>
      <VertMMenu.Item itemKey="3" danger>
        ᠤᠰᠠᠳᠬᠠᠬᠤ
      </VertMMenu.Item>
    </VertMMenu>
  </VertMDemoFrame>
);
```

## SubMenu 子节点写法

### Menu.SubMenu

不用 `items`，用 `Item` / `SubMenu` 组合。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMMenu defaultSelectedKeys={['a']} defaultOpenKeys={['sub']}>
      <VertMMenu.Item itemKey="a">ᠨᠢᠭᠡ</VertMMenu.Item>
      <VertMMenu.SubMenu itemKey="sub" title="ᠳᠣᠲᠣᠷ᠎ᠠ">
        <VertMMenu.Item itemKey="b">ᠬᠣᠶᠠᠷ</VertMMenu.Item>
        <VertMMenu.Item itemKey="c">ᠭᠤᠷᠪᠠ</VertMMenu.Item>
      </VertMMenu.SubMenu>
    </VertMMenu>
  </VertMDemoFrame>
);
```

## 弹出位置

### defaultPopupPlacement

子菜单浮层相对触发项的默认方位。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMMenu
      defaultPopupPlacement="bottomLeft"
      defaultSelectedKeys={['1']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ' },
        {
          key: 'sub',
          label: 'ᠪᠤᠰᠤᠳ',
          children: [
            { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
            { key: '3', label: 'ᠭᠤᠷᠪᠠ' },
          ],
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## 箭头配置

### expandIcon / arrowRotate

自定义展开箭头或旋转角度。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMMenu
      arrowRotate={90}
      arrowRotateOpen={270}
      defaultOpenKeys={['sub']}
      items={[
        {
          key: 'sub',
          label: 'ᠳᠣᠲᠣᠷ᠎ᠠ',
          children: [
            { key: '1', label: 'ᠨᠢᠭᠡ' },
            { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
          ],
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## 多级嵌套

### 深层 children

两级以上子菜单。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMMenu
      defaultSelectedKeys={['3-1']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ' },
        {
          key: '2',
          label: 'ᠬᠣᠶᠠᠷ',
          children: [
            { key: '2-1', label: 'ᠭᠤᠷᠪᠠ' },
            {
              key: '2-2',
              label: 'ᠳᠥᠷᠪᠡ',
              children: [
                { key: '3-1', label: 'ᠲᠠᠪᠤ' },
                { key: '3-2', label: 'ᠵᠢᠷᠭᠤᠭ᠎ᠠ' },
              ],
            },
          ],
        },
      ]}
    />
  </VertMDemoFrame>
);
```

## mode

### vertical 模式

`mode` 默认 `vertical`；与书写模式独立，控制菜单布局轴。

```tsx
import { VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMMenu
      mode="vertical"
      defaultSelectedKeys={['1']}
      style={{ minHeight: 240, border: '1px solid var(--vertm-color-border)' }}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ' },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
        { key: '3', label: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- Editorial：上下键移动同级，右键打开子菜单并聚焦首项，左键关闭/回退
- 选中态使用 block-end 墨色 marker（非蓝色底）
- 字符串 `label` 自动经 `VertMText` 渲染

## API

<API id="VertMMenu"></API>

## Menu.SubMenu

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| itemKey | 子菜单唯一 key | `string` | — |
| title | 子菜单标题 | `ReactNode` | — |
| icon | 子菜单图标 | `ReactNode` | — |
| disabled | 是否禁用 | `boolean` | — |
| popupPlacement | 弹出层位置，覆盖默认 | `Placement` | — |
| expandIcon | 自定义展开图标 | `ReactNode \| (({ open, isVerticalWriting }) => ReactNode)` | — |
| arrowRotate / arrowRotateOpen | 箭头关闭 / 打开时旋转角 | `number` | `0` / `180` |
| arrowVertical | 箭头是否竖排图标模式 | `boolean` | — |
| children | 子菜单项 | `ReactNode` | — |
| className / style | 样式 | — | — |

### Menu.Item

| 属性 | 说明 | 类型 |
|------|------|------|
| itemKey | 唯一 key | `string` |
| icon | 图标 | `ReactNode` |
| disabled | 禁用 | `boolean` |
| danger | 危险态 | `boolean` |
| children | 内容 | `ReactNode` |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | Default 主题选中强调 |
| `--vertm-color-text` | Editorial 墨色 marker / 文案 |
| `--vertm-color-border` | 菜单边框 |
| `--vertm-column-size` | 竖排列宽相关 |
| `--vertm-marker-width` | Editorial 选中条宽度 |
