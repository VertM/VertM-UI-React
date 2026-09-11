---
title: Modal
group:
  title: 反馈
  order: 2
---

# Modal

对话框。组件式用 `VertMModal`；命令式见下方 `modal.confirm` / `useModal`。

## 基本用法

```tsx
import { useState } from 'react';
import { VertMModal, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={240}>
      <VertMButton type="primary" onClick={() => setOpen(true)}>
        ᠨᠡᠭᠡᠭᠡᠬᠦ
      </VertMButton>
      <VertMModal
        open={open}
        title="ᠭᠠᠷᠴᠠᠭ"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMModal>
    </VertMDemoFrame>
  );
};
```

## 命令式 confirm / useModal

```tsx
import { VertMApp, VertMButton, VertMModal } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const { modal } = VertMApp.useApp();
  return (
    <>
      <VertMButton
        onClick={() =>
          modal.confirm({
            title: 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠬᠦ ᠦᠦ ?',
            content: 'ᠠᠭᠤᠯᠭ᠎ᠠ ᠁',
          })
        }
      >
        confirm
      </VertMButton>
      <VertMButton
        onClick={() =>
          VertMModal.info({
            title: 'info',
            content: 'ᠮᠡᠳᠡᠭᠡ',
          })
        }
      >
        Modal.info
      </VertMButton>
    </>
  );
};

export default () => (
  <VertMDemoFrame>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

静态方法：`VertMModal.confirm` / `info` / `success` / `error` / `warning`（等同 `modal.*`）。要跟随主题与竖排，请用 `App.useApp().modal`（见 App 页）。

## 竖排提示

- 标题与内容字符串自动竖排
- 独立 `modal.*` 根节点读不到外层 ConfigProvider

## API

<API id="VertMModal"></API>
