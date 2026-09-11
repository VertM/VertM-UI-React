---
title: Notification
group:
  title: 反馈
  order: 11
---

# Notification

通知提醒框（命令式）。可用 `notification.*` 或 `useNotification` / `App.useApp().notification`。

## 基本用法

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMButton
      type="primary"
      onClick={() =>
        notification.open({
          message: 'ᠠᠩᠬᠠᠷ ！',
          description: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁',
          placement: 'topRight',
        })
      }
    >
      notification
    </VertMButton>
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

## 类型快捷方法

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton
        type="primary"
        onClick={() =>
          notification.success({ message: 'ᠵᠥᠪ', description: 'ok' })
        }
      >
        success
      </VertMButton>
      <VertMButton
        danger
        onClick={() =>
          notification.error({ message: 'ᠠᠯᠳᠠᠭ᠎ᠠ', description: 'fail' })
        }
      >
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

## 销毁

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace align="start">
      <VertMButton
        onClick={() =>
          notification.info({
            message: 'info',
            description: 'ᠮᠡᠳᠡᠭᠡ',
            duration: 0,
          })
        }
      >
        sticky
      </VertMButton>
      <VertMButton onClick={() => notification.destroy()}>destroy</VertMButton>
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

- 全局 `notification.*` 挂独立根，不继承外层主题 / 书写模式
- 推荐 `App.useApp().notification` 以获得竖排与主题一致性

## API

`notification.open` / `success` / `error` / `info` / `warning` / `destroy`
