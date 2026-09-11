---
title: Message
group:
  title: 反馈
  order: 10
---

# Message

全局轻提示（命令式）。可用 `message.*` 或 `useMessage` / `App.useApp().message`。

## 何时使用

- 操作成功 / 失败后的轻量反馈
- 不打断当前流程的短时提示
- 加载中状态（`loading`，可手动 `destroy`）
- 需要跟随主题与竖排时，用 App 内实例而非全局静态 API

## 基本用法

### 成功 / 信息 / 错误

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

### warning / loading

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

## 时长

### duration

第二参数为秒；`0` 表示不自动关闭。

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton onClick={() => message.info('1s', 1)}>1s</VertMButton>
      <VertMButton onClick={() => message.info('5s', 5)}>5s</VertMButton>
      <VertMButton onClick={() => message.info('sticky', 0)}>sticky</VertMButton>
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

### destroy

按 id 销毁，或不传参清空全部。

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

## open 配置

### MessageConfig

完整配置对象：`content` / `type` / `duration` / `onClose`。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton
      type="primary"
      onClick={() =>
        message.open({
          type: 'success',
          content: 'ᠳᠠᠭᠤᠰᠪᠠ',
          duration: 2,
          onClose: () => console.log('closed'),
        })
      }
    >
      open
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

## 连续触发

### 多条排队

连续调用会叠多条提示。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton
      onClick={() => {
        message.info('ᠨᠢᠭᠡ');
        message.success('ᠬᠣᠶᠠᠷ');
        message.warning('ᠭᠤᠷᠪᠠ');
      }}
    >
      burst
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

## 全局静态 API

### message.*（注意主题）

可直接 `import { message }`，但挂独立根，**不继承**外层 ConfigProvider。

```tsx
import { message, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace>
      <VertMButton onClick={() => message.success('global static')}>global success</VertMButton>
      <VertMButton onClick={() => message.destroy()}>destroy</VertMButton>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## Editorial 下提示

### 跟随文档主题

在 App 内调用即可跟随当前（含 Editorial）主题。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { message } = VertMApp.useApp();
  return (
    <VertMButton type="primary" onClick={() => message.success('ᠵᠥᠪ')}>
      editorial message
    </VertMButton>
  );
};

export default () => (
  <VertMDemoFrame forceTheme="editorial" minHeight={220}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- 全局 `message.*` 会挂独立 React 根，**读不到**外层 `VertMConfigProvider`
- 要跟随主题 / 竖排 / locale，请用 `App.useApp().message`（或 `MessageHolder` + `useMessage`）
- 内容为字符串时经 `VertMText` 渲染

## API

方法：`message.success` / `error` / `info` / `warning` / `loading` / `open` / `destroy`。

### MessageConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 消息内容 | `ReactNode` | — |
| type | 消息类型 | `'success' \| 'error' \| 'info' \| 'warning' \| 'loading'` | — |
| duration | 自动关闭延时（秒）；0 不关闭 | `number` | `3` |
| onClose | 关闭回调 | `() => void` | — |

快捷方法签名：`(content, duration?) => id`。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-bg-container` | 提示条背景 |
| `--vertm-color-text` | 文案色 |
| `--vertm-color-success` / `--vertm-color-error` 等 | 类型图标色（随主题） |
| `--vertm-border-radius` | 圆角 |
| `--vertm-font-family` | 字体 |
