---
title: Switch
group:
  title: 数据录入
  order: 6
---

# Switch

开关。可配 `checkedChildren` / `unCheckedChildren`。

## 基本用法

```tsx
import { VertMSwitch } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSwitch
      defaultChecked
      checkedChildren="ᠨᠡᠭᠡᠭᠡᠬᠦ"
      unCheckedChildren="ᠬᠠᠭᠠᠬᠤ"
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 子文案字符串走 `VertMText`
- Editorial 开启态为墨色填充

## API

<API id="VertMSwitch"></API>
