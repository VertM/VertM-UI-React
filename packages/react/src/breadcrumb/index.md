---
title: Breadcrumb
group:
  title: 导航
  order: 4
---

# Breadcrumb

面包屑导航。`items` 配置路径；竖排书写模式下默认纵向排列，可用 `direction` 覆盖。

## 何时使用

- 告知用户当前位置与层级路径时
- 需要快速返回上级或跳转同级分支时
- 某一级带下拉（`menu`）展示更多入口时
- 自定义分隔符或语义化样式时
- 竖排页面希望路径沿块轴展开时

## 基本用法

### items 路径

最后一项通常为当前页（无链接）。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ', href: '#' },
        { title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 分隔符

### 自定义分隔符

`separator` 可为字符串或节点。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb
      separator="→"
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ', href: '#' },
        { title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 项内分隔符类型

`items` 中可插入 `type: 'separator'` 自定义某一段分隔。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { type: 'separator', separator: '/' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ', href: '#' },
        { title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 下拉与方向

### 带下拉的层级

某级配置 `menu.items` 可展开更多路径。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMBreadcrumb
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        {
          title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ',
          menu: {
            items: [
              { key: '1', title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ', href: '#' },
              { key: '2', title: 'ᠬᠢᠲᠠᠳ ᠨᠣᠮ', href: '#' },
            ],
          },
        },
        { title: 'ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 强制横向

竖排模式下可用 `direction="horizontal"` 保持横排路径。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb
      direction="horizontal"
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ', href: '#' },
        { title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 强制纵向

`direction="vertical"` 沿块轴排列。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMBreadcrumb
      direction="vertical"
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ', href: '#' },
        { title: 'ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 子组件写法

### Item / Separator

也可用 `VertMBreadcrumb.Item` 与 `Separator` 声明式写法。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb>
      <VertMBreadcrumb.Item href="#">ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ</VertMBreadcrumb.Item>
      <VertMBreadcrumb.Separator>/</VertMBreadcrumb.Separator>
      <VertMBreadcrumb.Item href="#">ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ</VertMBreadcrumb.Item>
      <VertMBreadcrumb.Item>ᠮᠣᠩᠭᠣᠯ ᠨᠣᠮ</VertMBreadcrumb.Item>
    </VertMBreadcrumb>
  </VertMDemoFrame>
);
```

### 语义化样式

`styles` / `classNames` 分别定制 root、item、separator。

```tsx
import { VertMBreadcrumb } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMBreadcrumb
      styles={{
        root: { padding: 8, borderRadius: 8, background: 'var(--vertm-color-bg-layout)' },
        item: { fontWeight: 600 },
      }}
      items={[
        { title: 'ᠲᠡᠷᠢᠭᠦᠨ ᠨᠢᠭᠤᠷ', href: '#' },
        { title: 'ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写模式下默认 `direction="vertical"`，路径沿阅读方向展开
- 标题字符串走 `VertMText`；下拉菜单同样遵循全局书写模式
- 过长路径可结合 `menu` 折叠中间层级，避免占满列宽

## API

<API id="VertMBreadcrumb"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-text` | 路径文字色 |
| `--vertm-color-text-secondary` | 分隔符/次要项 |
| `--vertm-color-link` | 可点击项链接色 |
| `--vertm-color-bg-layout` | 语义化背景示例 |
| `--vertm-font-family` | 蒙文字体栈 |
