---
title: Anchor
group:
  title: 导航
  order: 7
---

# Anchor

页面内锚点导航。根据滚动位置高亮当前章节，字符串标题经 `VertMText` 渲染。

## 何时使用

- 长文、规范页、文档页需要目录式跳转时
- 需要随滚动高亮当前章节时
- 多级标题需要嵌套锚点时
- 自定义滚动容器（非 `window`）内定位章节时
- 竖排长文按列阅读、侧栏锚点辅助定位时

## 基本用法

### 基础锚点

点击链接平滑滚动到对应锚点，并高亮当前项。

```tsx
import { VertMAnchor, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={360}>
    <div style={{ display: 'flex', gap: 24, height: 320 }}>
      <VertMAnchor
        items={[
          { key: 'a1', href: '#vertm-demo-a1', title: 'ᠨᠢᠭᠡ' },
          { key: 'a2', href: '#vertm-demo-a2', title: 'ᠬᠣᠶᠠᠷ' },
          { key: 'a3', href: '#vertm-demo-a3', title: 'ᠭᠤᠷᠪᠠ' },
        ]}
      />
      <div style={{ overflow: 'auto', flex: 1, height: 320 }}>
        <div id="vertm-demo-a1" style={{ minHeight: 160, marginBottom: 16 }}>
          <VertMText text="ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠬᠡᠰᠡᠭ" fontSize={16} />
        </div>
        <div id="vertm-demo-a2" style={{ minHeight: 160, marginBottom: 16 }}>
          <VertMText text="ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠬᠡᠰᠡᠭ" fontSize={16} />
        </div>
        <div id="vertm-demo-a3" style={{ minHeight: 160 }}>
          <VertMText text="ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠬᠡᠰᠡᠭ" fontSize={16} />
        </div>
      </div>
    </div>
  </VertMDemoFrame>
);
```

## 嵌套

### 多级锚点

`items` 可含 `children`，渲染为子链接。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMAnchor
      items={[
        {
          key: 'p1',
          href: '#vertm-nest-1',
          title: 'ᠨᠢᠭᠡ',
          children: [
            { key: 'p1-1', href: '#vertm-nest-1-1', title: 'ᠨᠢᠭᠡ᠂ᠨᠢᠭᠡ' },
            { key: 'p1-2', href: '#vertm-nest-1-2', title: 'ᠨᠢᠭᠡ᠂ᠬᠣᠶᠠᠷ' },
          ],
        },
        { key: 'p2', href: '#vertm-nest-2', title: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
    <div id="vertm-nest-1" style={{ height: 1 }} />
    <div id="vertm-nest-1-1" style={{ height: 1 }} />
    <div id="vertm-nest-1-2" style={{ height: 1 }} />
    <div id="vertm-nest-2" style={{ height: 1 }} />
  </VertMDemoFrame>
);
```

## 偏移与边界

### offsetTop

滚动高亮时预留顶部偏移，避免被固定顶栏遮挡。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMAnchor
      offsetTop={48}
      items={[
        { key: 'o1', href: '#vertm-off-1', title: 'ᠨᠢᠭᠡ' },
        { key: 'o2', href: '#vertm-off-2', title: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
    <div id="vertm-off-1" style={{ height: 1 }} />
    <div id="vertm-off-2" style={{ height: 1 }} />
  </VertMDemoFrame>
);
```

### bounds

调整 IntersectionObserver 判定边界灵敏度。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMAnchor
      bounds={20}
      items={[
        { key: 'b1', href: '#vertm-b-1', title: 'ᠨᠢᠭᠡ' },
        { key: 'b2', href: '#vertm-b-2', title: 'ᠬᠣᠶᠠᠷ' },
        { key: 'b3', href: '#vertm-b-3', title: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
    <div id="vertm-b-1" style={{ height: 1 }} />
    <div id="vertm-b-2" style={{ height: 1 }} />
    <div id="vertm-b-3" style={{ height: 1 }} />
  </VertMDemoFrame>
);
```

## 交互

### 点击回调

`onClick` 可拦截或旁路处理导航。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMAnchor
      onClick={(e, link) => {
        e.preventDefault();
        console.log(link.href, link.title);
      }}
      items={[
        { key: 'c1', href: '#vertm-click-1', title: 'ᠨᠢᠭᠡ' },
        { key: 'c2', href: '#vertm-click-2', title: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 自定义样式

通过 `style` / `className` 调整锚点栏外观。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMAnchor
      style={{
        padding: 8,
        border: '1px solid var(--vertm-color-border)',
        borderRadius: 8,
        background: 'var(--vertm-color-bg-container)',
      }}
      items={[
        { key: 's1', href: '#vertm-style-1', title: 'ᠨᠢᠭᠡ' },
        { key: 's2', href: '#vertm-style-2', title: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排场景

### 侧栏目录

竖排长文旁放置窄锚点栏，便于列间跳转。

```tsx
import { VertMAnchor, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <div style={{ display: 'flex', gap: 16, height: 280 }}>
      <VertMAnchor
        style={{ flexShrink: 0 }}
        items={[
          { key: 'v1', href: '#vertm-v-1', title: 'ᠮᠣᠩᠭᠣᠯ' },
          { key: 'v2', href: '#vertm-v-2', title: 'ᠪᠢᠴᠢᠭ' },
          { key: 'v3', href: '#vertm-v-3', title: 'ᠬᠡᠯᠡ' },
        ]}
      />
      <div style={{ overflow: 'auto', flex: 1 }}>
        <section id="vertm-v-1" style={{ minHeight: 120 }}>
          <VertMText text="ᠮᠣᠩᠭᠣᠯ ᠬᠡᠰᠡᠭ" />
        </section>
        <section id="vertm-v-2" style={{ minHeight: 120 }}>
          <VertMText text="ᠪᠢᠴᠢᠭ ᠬᠡᠰᠡᠭ" />
        </section>
        <section id="vertm-v-3" style={{ minHeight: 120 }}>
          <VertMText text="ᠬᠡᠯᠡ ᠬᠡᠰᠡᠭ" />
        </section>
      </div>
    </div>
  </VertMDemoFrame>
);
```

### 短标题列表

仅标题列表时的紧凑形态。

```tsx
import { VertMAnchor } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMAnchor
      items={[
        { key: 't1', href: '#t1', title: 'ᠠ' },
        { key: 't2', href: '#t2', title: 'ᠪ' },
        { key: 't3', href: '#t3', title: 'ᠴ' },
        { key: 't4', href: '#t4', title: 'ᠳ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- 标题字符串走 `VertMText`；竖排下锚点文字纵向排版
- `getContainer` 指向实际滚动容器时，高亮与滚动才一致
- 竖排页面建议把 Anchor 放在阅读起点一侧，避免遮挡列内容

## API

<API id="VertMAnchor"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-primary` | 当前锚点高亮色 |
| `--vertm-color-text` | 链接默认文字色 |
| `--vertm-color-text-secondary` | 非激活链接色 |
| `--vertm-color-border` | 侧栏/容器边框 |
| `--vertm-font-family` | 蒙文等字体栈 |
