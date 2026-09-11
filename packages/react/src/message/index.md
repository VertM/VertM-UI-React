---
title: Message
group:
  title: 反馈
  order: 10
---

# Message

全局轻提示（命令式）。可用 `message.*` 或 `useMessage` / `App.useApp().message`。

## 基本用法

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton type="primary" onClick={() => message.success('ᠵᠥᠪ !')}>
        success
      </VertMButton>
      <VertMButton onClick={() => message.info('ᠮᠡᠳᠡᠭᠡ')}>info</VertMButton>
      <VertMButton danger onClick={() => message.error('ᠪᠤᠷᠤᠭᠤ')}>
        error
      </VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 警告与加载

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton onClick={() => message.warning('ᠠᠩᠬᠠᠷ')}>warning</VertMButton>
      <VertMButton
        onClick={() => {
          const id = message.loading('ᠠᠴᠢᠶᠠᠯᠠᠵᠤ...', 0);
          setTimeout(() => message.destroy(id), 1500);
        }}
      >
        loading
      </VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 销毁

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton onClick={() => message.info('ᠮᠡᠳᠡᠭᠡ', 10)}>long</VertMButton>
      <VertMButton onClick={() => message.destroy()}>destroy</VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- 全局 `message.*` 会挂独立 React 根，**读不到**外层 `VertMConfigProvider`
- 要跟随主题 / 竖排 / locale，请用 `App.useApp().message`（或包在 `MessageHolder` 内的 `useMessage`）

## API

`message.success` / `error` / `info` / `warning` / `loading` / `open` / `destroy`
