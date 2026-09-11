---
title: Notification
group:
  title: 反馈
  order: 11
---

# Notification

通知提醒框（命令式）。可用 `notification.*` 或 `useNotification` / `App.useApp().notification`。

## 何时使用

- 需要标题 + 描述的较完整反馈
- 希望出现在四角之一（`placement`）时
- 比 Message 更醒目、停留更久的提醒
- 需要跟随主题时，用 App 内实例而非全局静态 API

## 基本用法

### open

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMButton
      onClick={() =>
        notification.open({
          message: 'ᠠᠩᠬᠠᠷ ！',
          description: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁',
          placement: 'topRight',
        })
      }
    >
      open
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 类型快捷方法

### success / info / warning / error

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace wrap>
      <VertMButton
        type="primary"
        onClick={() =>
          notification.success({ message: 'ᠵᠥᠪ', description: 'ᠳᠠᠭᠤᠰᠪᠠ' })
        }
      >
        success
      </VertMButton>
      <VertMButton
        onClick={() =>
          notification.info({ message: 'ᠮᠡᠳᠡᠭᠡ', description: 'ᠠᠭᠤᠯᠭ᠎ᠠ' })
        }
      >
        info
      </VertMButton>
      <VertMButton
        onClick={() =>
          notification.warning({ message: 'ᠠᠩᠬᠠᠷ', description: '!' })
        }
      >
        warning
      </VertMButton>
      <VertMButton
        danger
        onClick={() =>
          notification.error({ message: 'ᠪᠤᠷᠤᠭᠤ', description: 'fail' })
        }
      >
        error
      </VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 弹出位置

### placement

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  const places = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;
  return (
    <VertMSpace wrap>
      {places.map((placement) => (
        <VertMButton
          key={placement}
          onClick={() =>
            notification.info({
              message: placement,
              description: 'ᠠᠭᠤᠯᠭ᠎ᠠ',
              placement,
            })
          }
        >
          {placement}
        </VertMButton>
      ))}
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 时长

### duration

默认 4.5 秒；`0` 不自动关闭。

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton
        onClick={() =>
          notification.info({ message: '1s', description: 'fast', duration: 1 })
        }
      >
        1s
      </VertMButton>
      <VertMButton
        onClick={() =>
          notification.info({
            message: 'sticky',
            description: 'duration=0',
            duration: 0,
          })
        }
      >
        sticky
      </VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 销毁

### destroy

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton
        onClick={() =>
          notification.open({
            message: 'ᠮᠡᠳᠡᠭᠡ',
            description: 'long',
            duration: 0,
          })
        }
      >
        open sticky
      </VertMButton>
      <VertMButton onClick={() => notification.destroy()}>destroy all</VertMButton>
    </VertMSpace>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## onClose

### 关闭回调

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification, message } = VertMApp.useApp();
  return (
    <VertMButton
      onClick={() =>
        notification.info({
          message: 'ᠮᠡᠳᠡᠭᠡ',
          description: 'close me',
          duration: 2,
          onClose: () => message.success('closed'),
        })
      }
    >
      with onClose
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 全局静态 API

### notification.*（注意主题）

```tsx
import { notification, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace>
      <VertMButton
        onClick={() =>
          notification.success({
            message: 'global',
            description: 'static root',
          })
        }
      >
        global success
      </VertMButton>
      <VertMButton onClick={() => notification.destroy()}>destroy</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## Editorial

### 跟随墨色主题

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
          message: 'ᠠᠩᠬᠠᠷ',
          description: 'Editorial',
        })
      }
    >
      editorial notice
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame forceTheme="editorial" minHeight={240}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- 全局 `notification.*` 挂独立根，**读不到**外层配置
- 竖排应用请用 `App.useApp().notification` 或 `NotificationHolder` + `useNotification`
- 标题 / 描述字符串经 `VertMText` 渲染

## API

方法：`notification.open` / `success` / `info` / `warning` / `error` / `destroy`。

### NotificationConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 通知标题 | `ReactNode` | — |
| description | 通知描述 | `ReactNode` | — |
| type | 类型 | `'success' \| 'info' \| 'warning' \| 'error'` | — |
| duration | 自动关闭延时（秒） | `number` | `4.5` |
| placement | 弹出位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` |
| onClose | 关闭回调 | `() => void` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-bg-container` | 通知面板背景 |
| `--vertm-color-text` | 标题 / 描述色 |
| `--vertm-color-border` | 边框 |
| `--vertm-border-radius` | 圆角 |
| `--vertm-color-primary` | 类型强调（随主题） |
