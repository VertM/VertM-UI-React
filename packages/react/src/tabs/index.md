---
title: Tabs
group:
  title: 导航
  order: 2
---

# Tabs

竖排标签页。默认 `tabPosition="left"`（竖排书写时）。

## 何时使用

- 同一视图内切换多块相关内容
- 竖排界面需要标签栏在左侧 / 右侧时
- 需要卡片式页签外观时
- 需要动态增删页签时
- 部分页签需禁用时

## 基本用法

### 受控切换

`activeKey` + `onChange` 控制当前页。

```tsx
import { useState } from 'react';
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [tabKey, setTabKey] = useState('1');
  return (
    <VertMDemoFrame minHeight={360}>
      <div style={{ minWidth: 220, height: 320 }}>
        <VertMTabs
          activeKey={tabKey}
          onChange={setTabKey}
          tabPosition="left"
          items={[
            { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠨᠢᠭᠡ ᠁" fontSize={16} /> },
            { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠬᠣᠶᠠᠷ ᠁" fontSize={16} /> },
            { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠠᠭᠤᠯᠭ᠎ᠠ ᠭᠤᠷᠪᠠ ᠁" fontSize={16} /> },
          ]}
        />
      </div>
    </VertMDemoFrame>
  );
};
```

## 卡片样式

### type="card"

卡片页签；常与 `editable` 一起用于可增删场景。

```tsx
import { useState } from 'react';
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const SAMPLE = 'ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: 'ᠲᠠᠪ 1', children: <VertMText text={SAMPLE} fontSize={16} /> },
    { key: '2', label: 'ᠲᠠᠪ 2', children: <VertMText text={SAMPLE} fontSize={16} /> },
  ]);
  return (
    <VertMDemoFrame minHeight={360}>
      <div style={{ minWidth: 220, height: 320 }}>
        <VertMTabs
          type="card"
          editable={{
            onEdit: (action, key) => {
              if (action === 'add') {
                const next = String(Date.now());
                setItems((tabs) => [
                  ...tabs,
                  {
                    key: next,
                    label: `ᠲᠠᠪ ${tabs.length + 1}`,
                    children: <VertMText text={SAMPLE} fontSize={16} />,
                  },
                ]);
              } else if (key) {
                setItems((tabs) => tabs.filter((t) => t.key !== key));
              }
            },
          }}
          items={items}
        />
      </div>
    </VertMDemoFrame>
  );
};
```

## 页签位置

### tabPosition

`left` / `right` / `top` / `bottom`；竖排书写默认 `left`。

```tsx
import { VertMTabs, VertMText, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const items = [
  { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="A" fontSize={16} /> },
  { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="B" fontSize={16} /> },
];

export default () => (
  <VertMDemoFrame minHeight={400}>
    <VertMSpace align="start" size="large">
      <div style={{ height: 280, minWidth: 160 }}>
        <VertMTabs tabPosition="left" items={items} />
      </div>
      <div style={{ height: 280, minWidth: 160 }}>
        <VertMTabs tabPosition="right" items={items} />
      </div>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 禁用页签

### item.disabled

某一页不可选。

```tsx
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <div style={{ height: 280, minWidth: 200 }}>
      <VertMTabs
        defaultActiveKey="1"
        items={[
          { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="ᠨᠢᠭᠡ" fontSize={16} /> },
          { key: '2', label: 'ᠬᠤᠷᠢᠭᠯᠠᠭᠳᠠᠭᠰᠠᠨ', disabled: true },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="ᠭᠤᠷᠪᠠ" fontSize={16} /> },
        ]}
      />
    </div>
  </VertMDemoFrame>
);
```

## 非受控

### defaultActiveKey

初始激活页，之后由内部状态管理。

```tsx
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <div style={{ height: 280, minWidth: 200 }}>
      <VertMTabs
        defaultActiveKey="2"
        items={[
          { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="1" fontSize={16} /> },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="2" fontSize={16} /> },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text="3" fontSize={16} /> },
        ]}
      />
    </div>
  </VertMDemoFrame>
);
```

## 可关闭单项

### closable

单页 `closable` 控制是否显示关闭；需配合 `editable.onEdit`。

```tsx
import { useState } from 'react';
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: 'ᠨᠢᠭᠡ', closable: true, children: <VertMText text="1" fontSize={16} /> },
    { key: '2', label: 'ᠬᠣᠶᠠᠷ', closable: false, children: <VertMText text="2" fontSize={16} /> },
  ]);
  return (
    <VertMDemoFrame minHeight={320}>
      <div style={{ height: 280, minWidth: 220 }}>
        <VertMTabs
          type="card"
          editable={{
            showAdd: false,
            onEdit: (action, key) => {
              if (action === 'remove' && key) {
                setItems((tabs) => tabs.filter((t) => t.key !== key));
              }
            },
          }}
          items={items}
        />
      </div>
    </VertMDemoFrame>
  );
};
```

## line 类型

### type="line"

默认线型页签（相对 card）。

```tsx
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={320}>
    <div style={{ height: 280, minWidth: 200 }}>
      <VertMTabs
        type="line"
        items={[
          { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text="line-1" fontSize={16} /> },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text="line-2" fontSize={16} /> },
        ]}
      />
    </div>
  </VertMDemoFrame>
);
```

## 长内容面板

### 面板内竖排长文

页签内容区可放长文 `VertMText`。

```tsx
import { VertMTabs, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const LONG =
  'ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠤᠨ ᠵᠢᠭᠠᠰᠤᠨ ᠦᠰᠦᠭ ᠪᠣᠯ ᠨᠢᠭᠡ ᠨᠤᠲᠤᠭ ᠤᠨ ᠰᠣᠶᠣᠯ ᠤᠨ ᠥᠪ ᠡᠷᠳᠡᠮ';

export default () => (
  <VertMDemoFrame minHeight={400}>
    <div style={{ height: 360, minWidth: 240 }}>
      <VertMTabs
        items={[
          { key: '1', label: 'ᠨᠢᠭᠡ', children: <VertMText text={LONG} fontSize={14} /> },
          { key: '2', label: 'ᠬᠣᠶᠠᠷ', children: <VertMText text={LONG} fontSize={14} /> },
          { key: '3', label: 'ᠭᠤᠷᠪᠠ', children: <VertMText text={LONG} fontSize={14} /> },
        ]}
      />
    </div>
  </VertMDemoFrame>
);
```

## 竖排提示

- 竖排书写时默认 `tabPosition="left"`，横排默认 `top`
- Editorial 选中条为墨色 marker
- 字符串 label 经 `VertMText` 渲染

## API

<API id="VertMTabs"></API>

### TabItem

| 字段 | 说明 |
|------|------|
| key | 唯一键 |
| label | 页签标题 |
| children | 面板内容 |
| disabled | 禁用 |
| closable | 是否可关闭 |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | Default 选中强调 |
| `--vertm-color-text` | Editorial 墨色 |
| `--vertm-color-border` | 页签栏边框 |
| `--vertm-column-size` | 竖排列宽相关 |
| `--vertm-marker-width` | Editorial 选中条 |
