---
title: Drawer
group:
  title: 反馈
  order: 3
---

# Drawer

抽屉面板。从屏幕边缘滑出承载表单、详情或辅助流程；标题字符串经 `VertMText` 渲染。

## 何时使用

- 需要不离开当前页完成次级任务时
- 详情预览、筛选面板、设置项较适合侧滑时
- 比 Modal 需要更大阅读/表单区域时
- 需控制出现方向（上/右/下/左）时
- 竖排应用中从阅读起点一侧滑出辅助栏时

## 基本用法

### 右侧抽屉

默认 `placement="right"`，点击按钮打开。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton type="primary" onClick={() => setOpen(true)}>
        ᠨᠡᠭᠡᠭᠡᠬᠦ
      </VertMButton>
      <VertMDrawer open={open} title="ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ" onClose={() => setOpen(false)}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 方向

### 左侧

`placement="left"`。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton onClick={() => setOpen(true)}>ᠵᠡᠭᠦᠨ</VertMButton>
      <VertMDrawer open={open} placement="left" title="ᠵᠡᠭᠦᠨ" onClose={() => setOpen(false)}>
        <VertMText text="ᠵᠡᠭᠦᠨ ᠲᠠᠯ᠎ᠠ" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

### 顶部 / 底部

上下方向时 `size` 表示高度。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMSpace size="middle">
        <VertMButton onClick={() => setTop(true)}>ᠳᠡᠭᠡᠳᠦ</VertMButton>
        <VertMButton onClick={() => setBottom(true)}>ᠳᠣᠷᠠᠲᠤ</VertMButton>
      </VertMSpace>
      <VertMDrawer open={top} placement="top" size={180} title="ᠳᠡᠭᠡᠳᠦ" onClose={() => setTop(false)}>
        <VertMText text="ᠳᠡᠭᠡᠳᠦ ᠠᠭᠤᠯᠭ᠎ᠠ" />
      </VertMDrawer>
      <VertMDrawer
        open={bottom}
        placement="bottom"
        size={180}
        title="ᠳᠣᠷᠠᠲᠤ"
        onClose={() => setBottom(false)}
      >
        <VertMText text="ᠳᠣᠷᠠᠲᠤ ᠠᠭᠤᠯᠭ᠎ᠠ" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 尺寸与页脚

### 自定义 size

数字为 px，也可传 CSS 长度字符串。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton onClick={() => setOpen(true)}>520px</VertMButton>
      <VertMDrawer open={open} size={520} title="ᠥᠷᠭᠡᠨ" onClose={() => setOpen(false)}>
        <VertMText text="ᠥᠷᠭᠡᠨ ᠲᠠᠲᠠᠭᠤᠷ" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

### footer

底部操作区，适合确认/取消。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={280}>
      <VertMButton type="primary" onClick={() => setOpen(true)}>
        ᠨᠡᠭᠡᠭᠡᠬᠦ
      </VertMButton>
      <VertMDrawer
        open={open}
        title="ᠪᠠᠲᠤᠯᠠᠬᠤ"
        onClose={() => setOpen(false)}
        footer={
          <VertMSpace>
            <VertMButton onClick={() => setOpen(false)}>ᠪᠣᠯᠢᠬᠤ</VertMButton>
            <VertMButton type="primary" onClick={() => setOpen(false)}>
              ᠪᠠᠲᠤᠯᠠᠬᠤ
            </VertMButton>
          </VertMSpace>
        }
      >
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 遮罩

### 无遮罩

`mask={false}` 不渲染遮罩层。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton onClick={() => setOpen(true)}>ᠮᠠᠰᠺ ᠦᠭᠡᠢ</VertMButton>
      <VertMDrawer open={open} mask={false} title="ᠮᠠᠰᠺ ᠦᠭᠡᠢ" onClose={() => setOpen(false)}>
        <VertMText text="ᠠᠷᠤ ᠲᠠᠯ᠎ᠠ ᠶᠢ ᠳᠠᠷᠤᠵᠤ ᠪᠣᠯᠤᠨ᠎ᠠ" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

### 禁止点遮罩关闭

`maskClosable={false}` 只能通过关闭按钮或业务逻辑关闭。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton onClick={() => setOpen(true)}>ᠬᠠᠲᠤᠤ</VertMButton>
      <VertMDrawer
        open={open}
        maskClosable={false}
        title="ᠮᠠᠰᠺ ᠬᠠᠭᠠᠬᠤ ᠦᠭᠡᠢ"
        onClose={() => setOpen(false)}
      >
        <VertMText text="ᠬᠠᠭᠠᠬᠤ ᠲᠣᠪᠴᠢ ᠪᠠᠷ ᠬᠠᠭᠠᠭᠠᠷᠠᠢ" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

### 长内容

面板内可滚动放置较长竖排正文。

```tsx
import { useState } from 'react';
import { VertMButton, VertMDrawer, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMButton onClick={() => setOpen(true)}>ᠤᠷᠲᠤ</VertMButton>
      <VertMDrawer open={open} title="ᠤᠷᠲᠤ ᠠᠭᠤᠯᠭ᠎ᠠ" onClose={() => setOpen(false)}>
        <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠣᠯ ᠮᠣᠩᠭᠣᠯᠴᠤᠳ ᠤᠨ ᠡᠷᠲᠡ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠢᠷᠡᠭᠰᠡᠨ ᠪᠢᠴᠢᠭ ᠮᠥᠨ᠃ ᠳᠡᠭᠡᠷ᠎ᠡ ᠡᠴᠡ ᠳᠣᠣᠷ᠎ᠠ ᠪᠢᠴᠢᠬᠦ ᠪᠥᠭᠡᠳ ᠮᠥᠷ ᠨᠢ ᠵᠡᠭᠦᠨ ᠡᠴᠡ ᠪᠠᠷᠠᠭᠤᠨ ᠰᠢᠯᠵᠢᠨ᠎ᠡ᠃" />
      </VertMDrawer>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- 标题字符串走 `VertMText`；面板内书写模式跟随 ConfigProvider
- 竖排场景常用 `left`/`right` 作为辅助列；`size` 控制交叉轴厚度
- 打开时会锁定 `body` 滚动并陷阱焦点，关闭后恢复原焦点

## API

<API id="VertMDrawer"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-bg-elevated` | 抽屉面板背景 |
| `--vertm-color-bg-container` | 内容区背景参考 |
| `--vertm-color-border` | 面板边缘分隔 |
| `--vertm-color-text` | 标题与正文色 |
| `--vertm-motion-duration-mid` | 滑入动画时长参考 |
| `--vertm-font-family` | 标题字体 |
