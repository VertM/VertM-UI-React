---
title: 字体与竖排检测
order: 6
---

# 字体与竖排检测

```ts
import { detectMongolFonts, isFontLoaded, detectVerticalCapabilities } from '@vertm/core';
```

在首屏用检测结果决定是否提示用户安装字体，或降级到 WASM / Mirror Input。
