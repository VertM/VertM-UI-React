---
title: 检索归一化
order: 2
---

# 检索归一化

解决 O/U 等异体在搜索时的歧义：

```ts
import { normalizeForSearch } from '@vertm/core';

normalizeForSearch(query) === normalizeForSearch(candidate);
```

演示见 Demo 的检索区；后续可在本页加交互对比。
