---
title: 主题
order: 0
nav:
  title: 主题
  order: 3
---

# 主题

```tsx
/**
 * inline: true
 */
import ThemeGallery from '../../src/components/ThemeGallery';

export default () => <ThemeGallery />;
```

## Design Tokens 说明

完整字段见 [Design Tokens](/theme/tokens)。竖排专属 `columnSize` / `columnGap` 见 [竖排专属令牌](/theme/vertical-tokens)。Editorial 列式几何见 [Editorial 外观](/theme/editorial)。

预设源码：`@vertm/tokens` 的 `cobaltTheme` / `cinnabarTheme` / `steppeTheme` / `amberTheme` / `slateTheme` / `frostTheme`，规范见仓库 `docs/theme-presets.md`。
