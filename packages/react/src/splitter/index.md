---
title: Splitter
group:
  title: 布局
  order: 6
---

# Splitter

分割面板。拖拽调整相邻面板比例；未设 `layout` 时跟随书写模式（竖排 → 列向分割）。

## 何时使用

- 侧栏 + 主内容需要用户可调宽度/高度
- 对照阅读、双栏编辑器
- 面板需要最小/最大尺寸约束
- 竖排页面中沿水平方向切开两列内容

## 基本用法

### 默认双栏

使用 `VertMSplitter.Panel` 定义两侧内容。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 240, width: 320 }}>
      <VertMSplitter>
        <VertMSplitter.Panel>
          <VertMText text="ᠵᠡᠭᠦᠨ" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="ᠪᠠᠷᠠᠭᠤᠨ" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

### 水平分割

`layout="horizontal"` 上下分割。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <div style={{ height: 240, width: 280 }}>
      <VertMSplitter layout="horizontal">
        <VertMSplitter.Panel>
          <VertMText text="top" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="bottom" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

### 垂直分割

`layout="vertical"` 左右分割（与 CSS 命名一致）。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 200, width: 320 }}>
      <VertMSplitter layout="vertical">
        <VertMSplitter.Panel>
          <VertMText text="A" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="B" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

## 尺寸约束

### 默认尺寸

`defaultSize` 设定首屏比例偏好（像素解析）。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 220, width: 320 }}>
      <VertMSplitter>
        <VertMSplitter.Panel defaultSize={120}>
          <VertMText text="narrow" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="wide" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

### 最小尺寸

`min` 防止面板被拖得过小。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 220, width: 320 }}>
      <VertMSplitter>
        <VertMSplitter.Panel min={80}>
          <VertMText text="min 80" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="flex" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

### 最大尺寸

`max` 限制首面板上限。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 220, width: 320 }}>
      <VertMSplitter>
        <VertMSplitter.Panel max={200} min={60}>
          <VertMText text="capped" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="rest" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

## 交互

### 监听 onResize

拖拽时回传两侧比例。

```tsx
import { useState } from 'react';
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [sizes, setSizes] = useState([0.5, 0.5]);
  return (
    <VertMDemoFrame minHeight={300}>
      <VertMText text={`${sizes[0].toFixed(2)} / ${sizes[1].toFixed(2)}`} />
      <div style={{ height: 200, width: 300 }}>
        <VertMSplitter onResize={setSizes}>
          <VertMSplitter.Panel>
            <VertMText text="L" />
          </VertMSplitter.Panel>
          <VertMSplitter.Panel>
            <VertMText text="R" />
          </VertMSplitter.Panel>
        </VertMSplitter>
      </div>
    </VertMDemoFrame>
  );
};
```

### 富内容面板

面板内可放任意组件。

```tsx
import { VertMSplitter, VertMButton, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <div style={{ height: 240, width: 340 }}>
      <VertMSplitter>
        <VertMSplitter.Panel min={100}>
          <VertMSpace direction="vertical" align="start">
            <VertMText text="ᠵᠠᠰᠠᠬᠤ" />
            <VertMButton size="small" type="primary">
              action
            </VertMButton>
          </VertMSpace>
        </VertMSplitter.Panel>
        <VertMSplitter.Panel>
          <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

### 自定义面板样式

Panel 支持 `className` / `style`。

```tsx
import { VertMSplitter, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <div style={{ height: 200, width: 300 }}>
      <VertMSplitter>
        <VertMSplitter.Panel style={{ background: '#faf9f7', padding: 8 }}>
          <VertMText text="tint" />
        </VertMSplitter.Panel>
        <VertMSplitter.Panel style={{ padding: 8 }}>
          <VertMText text="plain" />
        </VertMSplitter.Panel>
      </VertMSplitter>
    </div>
  </VertMDemoFrame>
);
```

## 竖排提示

- 未设 `layout`：竖排书写 → 按列分割（拖拽改变交叉轴宽度）
- 拖拽比例限制在约 15%–85%，避免面板塌缩
- 容器需明确宽高，否则分割条无法正确定位

## API

<API id="VertMSplitter"></API>

### Panel

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| defaultSize | 面板默认尺寸 | `number \| string` | — |
| min | 最小尺寸 | `number \| string` | — |
| max | 最大尺寸 | `number \| string` | — |
| collapsible | 是否可折叠（预留） | `boolean` | — |
| children | 面板内容 | `ReactNode` | — |
| className | 自定义类名 | `string` | — |
| style | 自定义样式 | `CSSProperties` | — |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-split-min-height` | 分割区域最小高度参考 |
| `--vertm-result-min-height` | 与 split 布局共享的最小高度 |
| `--vertm-color-border` | 分割条边框色 |
| `--vertm-color-bg-layout` | 面板背景参考 |
| `--vertm-padding-sm` | 面板内边距建议 |
