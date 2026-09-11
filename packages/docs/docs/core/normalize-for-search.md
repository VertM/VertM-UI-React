---
title: 检索归一化
order: 2
---

# 检索归一化

解决 O/U 等异体在搜索时的歧义：把用户输入与词库都归一到同一比较空间。

```tsx
import { useState } from 'react';
import { normalizeForSearch } from '@vertm/core';

export default () => {
  const [a, setA] = useState('ᠤ');
  const [b, setB] = useState('ᠦ');
  const na = normalizeForSearch(a);
  const nb = normalizeForSearch(b);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <label>
        A{' '}
        <input value={a} onChange={(e) => setA(e.target.value)} />
      </label>
      <br />
      <label>
        B{' '}
        <input value={b} onChange={(e) => setB(e.target.value)} />
      </label>
      <p>
        normalize(A)=<code>{na}</code> · normalize(B)=<code>{nb}</code>
      </p>
      <p>
        相等？ <strong>{na === nb ? '是' : '否'}</strong>
      </p>
    </div>
  );
};
```

```ts
import { normalizeForSearch } from '@vertm/core';

normalizeForSearch(query) === normalizeForSearch(candidate);
```
