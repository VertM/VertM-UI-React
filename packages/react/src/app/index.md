---
title: App
group:
  title: 反馈
  order: 12
---

# App

命令式浮层宿主。`message` / `notification` / `modal.confirm` 的全局导出会各自挂一个独立 React 根，**读不到**外层 `VertMConfigProvider` 的主题、书写模式与 locale。用 `VertMApp` 包住应用，再通过 `App.useApp()`（或 `useApp`）取实例，浮层即可跟随当前配置。

## 何时使用

- 应用需要跟随主题的命令式 message / notification / modal
- 不想在每个页面单独挂 `MessageHolder` 等时
- 文档或业务 demo 中演示命令式 API 时
- 需要 `component={false}` 避免多余包裹 div 时

## 基本用法

### useApp 三件套

一次取出 `message`、`notification`、`modal`。

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message, notification, modal } = VertMApp.useApp();
  return (
    <VertMSpace wrap>
      <VertMButton type="primary" onClick={() => message.success('ᠵᠥᠪ !')}>
        message
      </VertMButton>
      <VertMButton
        onClick={() =>
          notification.open({
            message: 'ᠠᠩᠬᠠᠷ',
            description: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁',
          })
        }
      >
        notification
      </VertMButton>
      <VertMButton
        onClick={() =>
          modal.confirm({
            title: 'ᠠᠰᠠᠭᠤᠯᠲᠠ',
            content: 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?',
          })
        }
      >
        modal
      </VertMButton>
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

## 必须包在 App 内

### Hook 作用域

`useApp` / `VertMApp.useApp` 只能在 `VertMApp` 子树中使用。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Inside = () => {
  const { message } = VertMApp.useApp();
  return <VertMButton onClick={() => message.info('inside App')}>info</VertMButton>;
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp>
      <Inside />
    </VertMApp>
  </VertMDemoFrame>
);
```

## component={false}

### 无额外 DOM

不渲染外层 `div.vertm-app`，只挂载 Holder。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton type="primary" onClick={() => message.success('no wrapper')}>
      ping
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp component={false}>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 与 ConfigProvider

### 跟随主题

App 放在 ConfigProvider 内时，命令式浮层继承主题与书写模式。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton type="primary" onClick={() => message.success('ᠵᠥᠪ')}>
      themed message
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

## message 进阶

### loading + destroy

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton
        onClick={() => {
          const id = message.loading('ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ ᠁', 0);
          setTimeout(() => message.destroy(id), 1500);
        }}
      >
        loading
      </VertMButton>
      <VertMButton onClick={() => message.destroy()}>destroy all</VertMButton>
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

## notification 进阶

### placement

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { notification } = VertMApp.useApp();
  return (
    <VertMSpace wrap>
      {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((p) => (
        <VertMButton
          key={p}
          onClick={() =>
            notification.info({
              message: p,
              description: 'ᠠᠭᠤᠯᠭ᠎ᠠ',
              placement: p,
            })
          }
        >
          {p}
        </VertMButton>
      ))}
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

## modal 进阶

### success / error

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton onClick={() => modal.success({ title: 'OK', content: 'ᠵᠥᠪ' })}>
        success
      </VertMButton>
      <VertMButton danger onClick={() => modal.error({ title: 'Err', content: 'ᠪᠤᠷᠤᠭᠤ' })}>
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

## 自定义样式容器

### className / style

给 `vertm-app` 根节点加样式。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton onClick={() => message.info('styled host')}>info</VertMButton>
  );
};

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMApp
      className="docs-app-host"
      style={{ padding: 8, border: '1px dashed var(--vertm-color-border)' }}
    >
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- App 内部依次挂载 `MessageHolder` → `NotificationHolder` → `ModalHolder`
- 全局静态 API 仍可用，但不会继承文档站 / 应用主题；生产竖排应用请优先 `useApp`
- 文档 demo 一律包在 `VertMApp` 内再调 hooks

## API

<API id="VertMApp"></API>

### App.useApp()

返回 `{ message, notification, modal }`，类型分别为 `MessageAPI` / `NotificationAPI` / `ModalAPI`。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-bg-container` | 浮层面板背景（随主题） |
| `--vertm-color-text` | 浮层文案色 |
| `--vertm-color-primary` | 成功 / 主色强调 |
| `--vertm-color-error` | 错误态 |
| `--vertm-border-radius` | 浮层圆角 |
