---
title: 元音和谐
order: 3
---

# 元音和谐

```tsx
import { useState } from 'react';
import { genderOfString } from '@vertm/core';

export default () => {
  const [text, setText] = useState('ᠮᠣᠩᠭᠣᠯ');
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', maxWidth: 360 }}
      />
      <p>
        genderOfString → <strong>{genderOfString(text)}</strong>
      </p>
    </div>
  );
};
```

```ts
import { genderOfString, resolveSuffix } from '@vertm/core';

genderOfString('ᠮᠣᠩᠭᠣᠯ');
```
