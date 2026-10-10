---
title: 主题定制
order: 4
---

# 主题定制

## createTheme

```tsx | pure
import { ConfigProvider, createTheme } from '@vertm/react';

const theme = createTheme({
  colorPrimary: '#171a18',
  colorBgLayout: '#f3f1ea',
});

<ConfigProvider theme={theme}>...</ConfigProvider>
```

## 预制主题

| 导出 | 说明 |
|---|---|
| `defaultTheme` | 默认 |
| `darkTheme` | 暗色 |
| `editorialTheme` | Vertical Editorial 纸色/墨色调色板 |

## appearance

`appearance="editorial"` 不只是换色：会打开列式结构样式（`data-appearance="editorial"`）与对应键盘契约。未显式传 `theme` 时会自动采用 `editorialTheme`。
