---
title: Modal
group:
  title: 反馈
  order: 2
---

# Modal

对话框。组件式用 `VertMModal`；命令式见 `modal.confirm` / `useModal` / `App.useApp().modal`。

## 何时使用

- 需要用户确认后才继续的操作
- 展示简短表单或说明而不离开当前页
- 需要遮罩聚焦与键盘陷阱的模态层
- 命令式弹出确认框（不维护 open 状态）时
- 成功 / 信息 / 警告 / 错误等单按钮提示时

## 基本用法

### 受控打开

`open` + `onCancel` / `onOk` 控制显示。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [open, setOpen] = useState(false);
  const { message } = VertMApp.useApp();
  return (
    <>
      <VertMButton onClick={() => setOpen(true)}>Modal</VertMButton>
      <VertMModal
        open={open}
        title="ᠭᠠᠷᠴᠠᠭ"
        onCancel={() => setOpen(false)}
        onOk={() => {
          message.success('ᠵᠥᠪ');
          setOpen(false);
        }}
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMModal>
    </>
  );
};

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 自定义文案

### okText / cancelText

覆盖确定与取消按钮文案。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton type="primary" onClick={() => setOpen(true)}>
        open
      </VertMButton>
      <VertMModal
        open={open}
        title="ᠠᠰᠠᠭᠤᠯᠲᠠ"
        okText="ᠲᠡᠢᠮᠦ"
        cancelText="ᠦᠭᠡᠢ"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <VertMText text="ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 自定义页脚

### footer

传入自定义节点，或 `null` 隐藏默认按钮。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton onClick={() => setOpen(true)}>custom footer</VertMButton>
      <VertMModal
        open={open}
        title="ᠭᠠᠷᠴᠠᠭ"
        onCancel={() => setOpen(false)}
        footer={
          <VertMSpace>
            <VertMButton onClick={() => setOpen(false)}>ᠪᠤᠴᠠᠬᠤ</VertMButton>
            <VertMButton type="primary" onClick={() => setOpen(false)}>
              ᠬᠠᠳᠠᠭᠠᠯᠠᠬᠤ
            </VertMButton>
          </VertMSpace>
        }
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 无页脚

### footer={null}

仅内容与关闭图标。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton onClick={() => setOpen(true)}>no footer</VertMButton>
      <VertMModal open={open} title="ᠮᠡᠳᠡᠭᠡ" footer={null} onCancel={() => setOpen(false)}>
        <VertMText text="ᠵᠥᠪᠬᠡᠨ ᠤᠩᠰᠢᠬᠤ" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 遮罩行为

### mask / maskClosable

可关闭遮罩点击，或隐藏遮罩。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMSpace>
        <VertMButton onClick={() => setA(true)}>maskClosable=false</VertMButton>
        <VertMButton onClick={() => setB(true)}>mask=false</VertMButton>
      </VertMSpace>
      <VertMModal
        open={a}
        title="ᠭᠠᠷᠴᠠᠭ"
        maskClosable={false}
        onCancel={() => setA(false)}
        onOk={() => setA(false)}
      >
        <VertMText text="ᠠᠷᠤ ᠲᠠᠯ᠎ᠠ ᠶᠢ ᠳᠠᠷᠤᠪᠠᠴᠤ ᠬᠠᠭᠠᠭᠳᠠᠬᠤ ᠦᠭᠡᠢ" />
      </VertMModal>
      <VertMModal open={b} title="ᠭᠠᠷᠴᠠᠭ" mask={false} onCancel={() => setB(false)} onOk={() => setB(false)}>
        <VertMText text="ᠮᠠᠰᠺ ᠦᠭᠡᠢ" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 宽度

### width

自定义对话框宽度。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton onClick={() => setOpen(true)}>wide</VertMButton>
      <VertMModal
        open={open}
        title="ᠭᠠᠷᠴᠠᠭ"
        width={720}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <VertMText text="ᠥᠷᠭᠡᠨ ᠴᠣᠩᠬ᠎ᠠ" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## destroyOnClose

### 关闭销毁

关闭后卸载子树，再次打开会重新挂载。

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMInput } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton onClick={() => setOpen(true)}>destroyOnClose</VertMButton>
      <VertMModal
        open={open}
        title="ᠭᠠᠷᠴᠠᠭ"
        destroyOnClose
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <VertMInput placeholder="ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 命令式 confirm

### modal.confirm

通过 `App.useApp().modal` 弹出确认框（跟随主题）。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal, message } = VertMApp.useApp();
  return (
    <VertMButton
      danger
      onClick={() =>
        modal.confirm({
          title: 'ᠤᠰᠠᠳᠬᠠᠬᠤ ᠤᠤ ?',
          content: 'ᠡᠨᠡ ᠦᠢᠯᠡᠳᠦᠯ ᠢ ᠪᠤᠴᠠᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᠭᠡᠢ',
          onOk: () => message.success('ᠤᠰᠠᠳᠬᠠᠪᠠ'),
        })
      }
    >
      confirm
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

## 命令式变体

### info / success / error / warning

单按钮提示类对话框。

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal } = VertMApp.useApp();
  return (
    <VertMSpace wrap>
      <VertMButton onClick={() => modal.info({ title: 'Info', content: 'ᠮᠡᠳᠡᠭᠡ' })}>
        info
      </VertMButton>
      <VertMButton onClick={() => modal.success({ title: 'OK', content: 'ᠵᠥᠪ' })}>
        success
      </VertMButton>
      <VertMButton danger onClick={() => modal.error({ title: 'Err', content: 'ᠪᠤᠷᠤᠭᠤ' })}>
        error
      </VertMButton>
      <VertMButton onClick={() => modal.warning({ title: 'Warn', content: 'ᠠᠩᠬᠠᠷ' })}>
        warning
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

## 异步 onOk

### Promise

`onOk` 返回 Promise 时确定按钮进入 loading；reject 则保持打开。

```tsx
import { VertMApp, VertMButton } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal, message } = VertMApp.useApp();
  return (
    <VertMButton
      type="primary"
      onClick={() =>
        modal.confirm({
          title: 'ᠲᠤᠰᠢᠶᠠᠬᠤ ᠤᠤ ?',
          content: '1s…',
          onOk: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                message.success('done');
                resolve(undefined);
              }, 1000);
            }),
        })
      }
    >
      async ok
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

## 更新与销毁

### update / destroy

命令式句柄可更新内容或手动关闭。

```tsx
import { VertMApp, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal } = VertMApp.useApp();
  return (
    <VertMSpace>
      <VertMButton
        onClick={() => {
          const inst = modal.confirm({
            title: 'ᠭᠠᠷᠴᠠᠭ',
            content: 'v1',
            okOnly: true,
          });
          setTimeout(() => inst.update({ content: 'v2 updated' }), 800);
          setTimeout(() => inst.destroy(), 2500);
        }}
      >
        update then destroy
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

## 竖排提示

- 面板内书写模式跟随最近的 `VertMConfigProvider`
- 全局 `modal.*` 挂独立根，**读不到**外层配置；请用 `App.useApp().modal` 或 `useModal`
- 打开时锁定 body 滚动并陷阱焦点；ESC 触发 `onCancel`

## API

<API id="VertMModal"></API>

### ModalFuncConfig（命令式）

| 属性 | 说明 | 类型 |
|------|------|------|
| title / content | 标题与内容 | `ReactNode` |
| okText / cancelText | 按钮文案 | `string` |
| onOk / onCancel | 回调；onOk 可返回 Promise | `() => void \| Promise` |
| okOnly | 仅确定按钮 | `boolean` |
| mask / maskClosable / width / className | 同组件式 | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-bg-container` | 面板背景 |
| `--vertm-color-text` | 标题与正文 |
| `--vertm-color-primary` | 确定按钮主色 |
| `--vertm-border-radius` | 面板圆角 |
| `--vertm-color-border` | 分隔线 |
