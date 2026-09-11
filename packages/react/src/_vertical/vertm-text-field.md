---
title: VertMTextField
group:
  title: 竖排专属
  order: 2
---

# VertMTextField

Mirror Input：隐藏原生 input + 竖排可视化层，适合复杂竖排编辑。

## 基本用法

```tsx
import { useState } from 'react';
import { VertMTextField } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [value, setValue] = useState('ᠮᠣᠩᠭᠣᠯ');
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMTextField
        value={value}
        onChange={setValue}
        placeholder="ᠪᠢᠴᠢᠭᠯᠡᠬᠦ"
        columnDepth={4}
        maxColumns={2}
      />
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- `columnDepth`：单列可见行数；超出后向下一列扩展直至 `maxColumns`
- `variant="bare"` 为轻量无边框形态；`masked` 用于密码显示

## API

<API id="VertMTextField"></API>
