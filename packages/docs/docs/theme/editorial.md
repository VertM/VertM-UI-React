---
title: Editorial 外观
order: 3
---

# Editorial 外观

```tsx
import { ConfigProvider } from '@vertm/react';

<ConfigProvider appearance="editorial">
  ...
</ConfigProvider>
```

两层能力：

1. **`editorialTheme`**：纸色背景、墨色主色、钴蓝仅用于链接/caret
2. **`appearance="editorial"`**：列式结构 + block-end marker + 逻辑轴键盘

设计真源：`design/vertical-editorial/DESIGN-SPEC.md`。
