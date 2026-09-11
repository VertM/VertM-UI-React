---
title: Spin
group:
  title: 反馈
  order: 6
---

# Spin

加载中。可单独显示指示器，也可包裹内容并在加载时遮罩模糊。

## 何时使用

- 局部区块等待接口返回
- 需要尺寸分级的加载指示（small / default / large）
- 带提示文案说明当前在做什么
- 竖排界面中加载图标应随书写方向旋转

## 基本用法

### 独立指示器

无 children 时仅渲染旋转图标。

```tsx
import { VertMSpin } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={180}>
    <VertMSpin />
  </VertMDemoFrame>
);
```

### 带提示

`tip` 显示加载文案。

```tsx
import { VertMSpin } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpin tip="ᠡᠷᠢᠵᠦ ᠪᠠᠢᠨ᠎ᠠ ᠁" />
  </VertMDemoFrame>
);
```

### 尺寸

`size`：`small` / `default` / `large`。

```tsx
import { VertMSpin, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace size="large" align="center">
      <VertMSpin size="small" />
      <VertMSpin size="default" />
      <VertMSpin size="large" />
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 嵌套内容

### 包裹卡片

有 children 时在内容上覆盖遮罩。

```tsx
import { VertMSpin, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpin spinning tip="loading">
      <div style={{ padding: 16, minHeight: 120, border: '1px solid #e7e5e4' }}>
        <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
      </div>
    </VertMSpin>
  </VertMDemoFrame>
);
```

### 切换 spinning

`spinning={false}` 时只显示内容。

```tsx
import { useState } from 'react';
import { VertMSpin, VertMButton, VertMSpace, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [spinning, setSpinning] = useState(true);
  return (
    <VertMDemoFrame minHeight={260}>
      <VertMSpace direction="vertical" align="start">
        <VertMButton onClick={() => setSpinning((s) => !s)}>toggle</VertMButton>
        <VertMSpin spinning={spinning} tip="ᠡᠷᠢᠵᠦ ᠪᠠᠢᠨ᠎ᠠ">
          <div style={{ padding: 12, minHeight: 100 }}>
            <VertMText text="content" />
          </div>
        </VertMSpin>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 大尺寸嵌套

大指示器适合整块区域加载。

```tsx
import { VertMSpin, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMSpin size="large" tip="ᠠᠴᠢᠶᠠᠯᠠᠵᠤ">
      <div style={{ padding: 24, minHeight: 140 }}>
        <VertMText text="ᠬᠦᠯᠢᠶᠡᠭᠡ" />
      </div>
    </VertMSpin>
  </VertMDemoFrame>
);
```

## 边界

### spinning 为 false 且无 children

不渲染任何内容。

```tsx
import { VertMSpin, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={160}>
    <VertMSpin spinning={false} />
    <VertMText text="(empty)" />
  </VertMDemoFrame>
);
```

### 小尺寸嵌套

紧凑列表行内加载。

```tsx
import { VertMSpin, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpin size="small" spinning>
      <VertMText text="ᠮᠥᠷ ᠨᠢᠭᠡ" />
    </VertMSpin>
  </VertMDemoFrame>
);
```

### 自定义 tip 节点

`tip` 可为 React 节点。

```tsx
import { VertMSpin, VertMTag } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpin tip={<VertMTag color="processing">wait</VertMTag>} />
  </VertMDemoFrame>
);
```

## 竖排提示

- 指示器使用 `@vertm/icons` 的 `Loading`，并传入 `vertical`
- 嵌套模式下内容区会降低透明度并禁用指针事件
- 竖排长文加载时优先包裹整列，而不是单个字符

## API

<API id="VertMSpin"></API>

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-margin-xs` | 图标与 tip 间距 |
| `--vertm-color-primary` | 加载图标默认色（currentColor 继承） |
| `--vertm-color-text-secondary` | tip 次要文字色参考 |
| `--vertm-motion-duration-mid` | 旋转动画节奏参考 |
| `--vertm-font-family` | tip 文案字体 |
