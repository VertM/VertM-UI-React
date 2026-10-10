---
title: 字体接入
order: 5
---

# 字体接入

```tsx | pure
import { ConfigProvider, registerFont, FONT_PRESETS } from '@vertm/react';

registerFont({
  family: 'My Mongolian',
  source: 'url(/fonts/MyMongolian.woff2)',
});

<ConfigProvider fontFamily={FONT_PRESETS.notoSansMongolian.fontFamily}>
  ...
</ConfigProvider>
```

文档站与样式包已内置 Noto Sans Mongolian。生产环境请用 `@vertm/core` 的字体检测避免方块字：

```ts
import { detectMongolFonts, isFontLoaded } from '@vertm/core';
```
