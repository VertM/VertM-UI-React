---
title: App
group:
  title: 反馈
  order: 12
---

# App

命令式浮层宿主。`message` / `notification` / `modal.confirm` 的全局导出会各自挂一个独立 React 根，**读不到**外层 `VertMConfigProvider` 的主题、书写模式与 locale。用 `VertMApp` 包住应用，再通过 `App.useApp()`（或 `useApp`）取实例，浮层即可跟随当前配置。

## 基本用法

```tsx
import { VertMApp, VertMButton, VertMSpace, VertMConfigProvider } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message, notification, modal } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton type="primary" onClick={() => message.success('ᠵᠥᠪ !')}>
        message
      </VertMButton>
      <VertMButton
        onClick={() =>
          notification.info({ message: 'ᠮᠡᠳᠡᠭᠡ', description: 'ᠠᠭᠤᠯᠭ᠎ᠠ' })
        }
      >
        notification
      </VertMButton>
      <VertMButton
        onClick={() =>
          modal.confirm({ title: 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?', content: 'ᠠᠭᠤᠯᠭ᠎ᠠ' })
        }
      >
        modal
      </VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMConfigProvider appearance="editorial">
      <VertMApp>
        <Demo />
      </VertMApp>
    </VertMConfigProvider>
  </VertMDemoFrame>
);
```

## 仅 message

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton type="primary" onClick={() => message.info('ᠮᠡᠳᠡᠭᠡ')}>
      info
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 仅 modal

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal } = VertMApp.useApp();
  return (
    <VertMButton
      onClick={() =>
        modal.confirm({ title: 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?', content: 'ᠠᠭᠤᠯᠭ᠎ᠠ' })
      }
    >
      confirm
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- 推荐结构：`VertMConfigProvider` → `VertMApp` → 页面
- `App.useApp()` 必须在 `VertMApp` 子树内调用
- 也可导出别名 `App`（antd 风格）

## API

<API id="VertMApp"></API>
