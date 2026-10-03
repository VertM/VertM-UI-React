---
title: Card
group:
  title: 数据展示
  order: 1
---

# Card

卡片容器。可带标题、附加区、封面、操作栏与 `Meta` / `Grid` 子组件；字符串节点经 `VertMText` 渲染。

## 何时使用

- 需要把一组相关信息收纳为独立区块时
- 列表、仪表盘中展示摘要内容时
- 需要封面图、操作按钮或元信息（头像+标题）时
- 可点击卡片作为入口跳转时
- 竖排阅读流中用卡片分隔章节/条目时

## 基本用法

### 标题与内容

最简单的带标题卡片。

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMCard title="ᠭᠠᠷᠴᠠᠭ" style={{ width: 280 }}>
      <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 附加与操作

### extra

标题栏右侧放置额外操作。

```tsx
import { VertMCard, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMCard
      title="ᠮᠡᠳᠡᠭᠡ"
      extra={<VertMButton type="link">ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ</VertMButton>}
      style={{ width: 300 }}
    >
      <VertMText text="ᠨᠡᠮᠡᠯᠲᠡ ᠠᠭᠤᠯᠭ᠎ᠠ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

### actions

底部操作区，传入节点数组。

```tsx
import { VertMCard, VertMButton, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMCard
      title="ᠦᠢᠯᠡᠳᠦᠯ"
      actions={[
        <VertMButton key="e" type="text">
          ᠨᠠᠶᠢᠷᠠᠭᠤᠯᠬᠤ
        </VertMButton>,
        <VertMButton key="d" type="text" danger>
          ᠤᠰᠠᠳᠬᠠᠬᠤ
        </VertMButton>,
      ]}
      style={{ width: 300 }}
    >
      <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠁" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 封面与 Meta

### cover

`cover` 放在标题上方，适合图片摘要。

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMCard
      title="ᠵᠢᠷᠤᠭ"
      cover={
        <div
          style={{
            height: 96,
            background: 'linear-gradient(135deg, var(--vertm-color-primary), var(--vertm-color-info))',
          }}
        />
      }
      style={{ width: 280 }}
    >
      <VertMText text="ᠵᠢᠷᠤᠭ ᠤᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

### Card.Meta

头像 + 标题 + 描述的元信息块。

```tsx
import { VertMCard, VertMAvatar } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMCard style={{ width: 300 }}>
      <VertMCard.Meta
        avatar={<VertMAvatar>ᠮ</VertMAvatar>}
        title="ᠪᠠᠲᠤ"
        description="ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ ᠶᠢᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ"
      />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 交互与边框

### hoverable

鼠标悬停浮起，暗示可交互。

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMCard hoverable title="ᠮᠡᠳᠡᠭᠡ" style={{ width: 260 }}>
      <VertMText text="ᠬᠤᠯᠤᠭᠠᠨ᠎ᠠ ᠪᠠᠷ ᠵᠢᠭᠠᠭᠠᠷᠠᠢ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

### 无边框

`bordered={false}` 去掉描边。

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMCard
      bordered={false}
      title="ᠬᠢᠵᠠᠭᠠᠷ ᠦᠭᠡᠢ"
      style={{ width: 260, background: 'var(--vertm-color-bg-layout)' }}
    >
      <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

### 可点击

传入 `onClick` 后卡片可键盘聚焦并响应点击。

```tsx
import { VertMCard, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMCard
      hoverable
      title="ᠳᠠᠷᠤᠬᠤ"
      style={{ width: 260 }}
      onClick={() => console.log('card click')}
    >
      <VertMText text="ᠣᠷᠤᠬᠤ" />
    </VertMCard>
  </VertMDemoFrame>
);
```

## 网格

### Card.Grid

在一张卡片内划分网格单元。

```tsx
import { VertMCard } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMCard title="ᠰᠦᠯᠵᠢᠶ᠎ᠡ" style={{ width: 360 }}>
      <VertMCard.Grid hoverable>ᠨᠢᠭᠡ</VertMCard.Grid>
      <VertMCard.Grid hoverable>ᠬᠣᠶᠠᠷ</VertMCard.Grid>
      <VertMCard.Grid>ᠭᠤᠷᠪᠠ</VertMCard.Grid>
      <VertMCard.Grid>ᠳᠥᠷᠪᠡ</VertMCard.Grid>
    </VertMCard>
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题、正文、Meta 中的字符串走 `VertMText`
- 竖排下卡片高度随列内容增长，建议限制 `width` 或列宽
- `actions` 在竖排舞台中沿交叉轴排布，注意按钮文案长度

## API

<API id="VertMCard"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-bg-container` | 卡片背景 |
| `--vertm-color-bg-layout` | 无边框/页面底色 |
| `--vertm-color-border` | 默认边框色 |
| `--vertm-color-primary` | 封面/强调色参考 |
| `--vertm-font-family` | 标题与正文字体 |
