---
title: Button
group:
  title: 通用
  order: 1
---

# Button

竖排按钮。字符串子节点经 `VertMText` 渲染；支持列深换列与 Editorial 墨色主按钮。

## 何时使用

- 触发提交、确认、导航等操作时
- 需要在竖排界面中展示蒙古文按钮标签时
- 一组相关操作需要并排或分组呈现时（配合 `Button.Group`）
- 危险操作（删除等）需要醒目的 `danger` 样式时
- 异步操作进行中需要 `loading` 反馈时

## 基本用法

### 按钮类型

五种类型：主按钮、默认、虚线、文本与链接。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start" wrap>
      <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
      <VertMButton>ᠬᠠᠰᠤᠬᠤ</VertMButton>
      <VertMButton type="dashed">ᠨᠠᠶᠢᠷᠠᠭᠤᠯᠬᠤ</VertMButton>
      <VertMButton type="text">ᠪᠣᠯᠢᠬᠤ</VertMButton>
      <VertMButton type="link">ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 尺寸

### 三种尺寸

通过 `size` 控制小 / 中 / 大；未设时跟随 `ConfigProvider`。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start">
      <VertMButton size="small" type="primary">
        ᠪᠠᠭ᠎ᠠ
      </VertMButton>
      <VertMButton size="middle" type="primary">
        ᠳᠤᠮᠳᠠ
      </VertMButton>
      <VertMButton size="large" type="primary">
        ᠶᠡᠬᠡ
      </VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 图标

### 带图标的按钮

在文字前放置图标；竖排下图标可用 `vertical`。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import { Search } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start">
      <VertMButton type="primary" icon={<Search vertical />}>
        ᠬᠠᠢᠬᠤ
      </VertMButton>
      <VertMButton icon={<Search vertical />}>ᠬᠠᠢᠬᠤ</VertMButton>
      <VertMButton type="dashed" icon={<Search vertical />} />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 状态

### 危险、加载与禁用

`danger` 用于破坏性操作；`loading` 禁用点击并显示 spinner；`disabled` 完全不可用。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace align="start" wrap>
      <VertMButton danger type="primary">
        ᠤᠰᠠᠳᠬᠠᠬᠤ
      </VertMButton>
      <VertMButton danger>Danger</VertMButton>
      <VertMButton loading type="primary">
        ᠠᠴᠢᠶᠠᠯᠠᠵᠤ
      </VertMButton>
      <VertMButton disabled>ᠬᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 块级按钮

### 撑满父容器

`block` 使按钮沿交叉轴撑满可用空间。

```tsx
import { VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMButton type="primary" block>
      ᠪᠦᠷᠢᠨ ᠥᠷᠭᠡᠨ
    </VertMButton>
  </VertMDemoFrame>
);
```

## 列深换列

### columnDepth

竖排下单列最大行数，超出后换到下一列，适合较长标签。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMSpace align="start">
      <VertMButton type="dashed" columnDepth={4}>
        ᠪᠦᠷᠢᠳᠬᠡᠯ ᠲᠤᠰᠢᠶᠠᠬᠤ
      </VertMButton>
      <VertMButton type="primary" columnDepth={3}>
        ᠲᠡᠮᠳᠡᠭᠯᠡᠯ ᠬᠠᠳᠠᠭᠠᠯᠠᠬᠤ
      </VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 按钮组

### Button.Group

将多个按钮组成一组；可统一 `size`。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <VertMSpace direction="vertical" align="start" size="large">
      <VertMButton.Group>
        <VertMButton type="primary">ᠡᠳᠦᠷ</VertMButton>
        <VertMButton>ᠭᠠᠷᠠᠭ</VertMButton>
        <VertMButton>ᠰᠠᠷ᠎ᠠ</VertMButton>
      </VertMButton.Group>
      <VertMButton.Group size="small">
        <VertMButton type="primary">ᠪᠠᠭ᠎ᠠ</VertMButton>
        <VertMButton>ᠪᠠᠭ᠎ᠠ</VertMButton>
      </VertMButton.Group>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 原生类型

### htmlType

在表单内用 `htmlType="submit"` / `"reset"` 触发原生提交行为。

```tsx
import { VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame>
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <VertMSpace align="start">
        <VertMButton type="primary" htmlType="submit">
          ᠲᠤᠰᠢᠶᠠᠬᠤ
        </VertMButton>
        <VertMButton htmlType="reset">ᠰᠡᠷᠭᠦᠭᠡᠬᠦ</VertMButton>
        <VertMButton htmlType="button">ᠪᠤᠴᠠᠬᠤ</VertMButton>
      </VertMSpace>
    </form>
  </VertMDemoFrame>
);
```

## 竖排提示

- 字符串子节点自动走 `VertMText`；复杂子树请自行处理竖排
- `columnDepth` 通过 `--vertm-btn-column-depth` 控制换列
- Editorial 下 primary 填充为墨色，而非钴蓝
- 图标请传入已适配竖排的节点（如 `@vertm/icons` 的 `vertical`）

## API

<API id="VertMButton"></API>

## Button.Group

`VertMButton.Group` 对应 `ButtonGroupProps`（未作为独立导出组件解析时，以下表为准）。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| children | 按钮组成员 | `ReactNode` | — |
| className | 自定义类名 | `string` | — |
| size | 组内按钮统一尺寸 | `'small' \| 'middle' \| 'large'` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | 主色（Default 主题下 primary / link 等） |
| `--vertm-btn-column-depth` | 竖排换列深度（由 `columnDepth` 写入） |
| `--vertm-column-size` | 竖排列宽基准 |
| `--vertm-motion-duration-fast` | 悬停等过渡时长 |
