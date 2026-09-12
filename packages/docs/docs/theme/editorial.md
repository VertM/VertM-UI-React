---
title: Editorial 外观
order: 3
---

# Editorial 外观

两层能力：

1. **`editorialTheme`**：纸色背景、墨色主色、钴蓝仅用于链接/caret
2. **`appearance="editorial"`**：列式结构 + block-end marker + 逻辑轴键盘

下方 demo **强制** Editorial，不受顶部全局切换器影响。设计真源：`design/vertical-editorial/DESIGN-SPEC.md`；文档壳/DemoFrame 样机见 `design/mockups/`。

## 对比示意

```tsx
import { VertMButton, VertMInput, VertMMenu } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame forceTheme="editorial" minHeight={320}>
    <VertMButton type="primary">ᠨᠡᠮᠡᠬᠦ</VertMButton>
    <VertMInput placeholder="ᠪᠢᠴᠢᠭ" style={{ width: 48 }} />
    <VertMMenu
      defaultSelectedKeys={['1']}
      items={[
        { key: '1', label: 'ᠨᠢᠭᠡ' },
        { key: '2', label: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 用法

```tsx
import { ConfigProvider } from '@vertm/react';

<ConfigProvider appearance="editorial">
  ...
</ConfigProvider>
```
