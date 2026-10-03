---
title: List
group:
  title: 数据展示
  order: 2
---

# List

列表。支持树形 `items`，或 antd 风格 `dataSource` + `renderItem`；可分页、栅格与边框。

## 何时使用

- 展示一组同构条目（文章、联系人、结果）时
- 需要有序/无序或嵌套树形列表时
- 列表需分页或栅格多列时
- 加载中用 `loading` 占位时
- 竖排长文目录或词条列表时

## 基本用法

### dataSource + renderItem

推荐的数据驱动写法。

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={280}>
    <VertMList
      dataSource={[
        { id: '1', text: 'ᠨᠢᠭᠡ' },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
        { id: '3', text: 'ᠭᠤᠷᠪᠠ' },
      ]}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

## 树形与有序

### items 树形

旧版树形数据，支持 `children` 嵌套。

```tsx
import { VertMList } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMList
      items={[
        {
          id: '1',
          text: 'ᠨᠢᠭᠡ',
          children: [
            { id: '1-1', text: 'ᠨᠢᠭᠡ᠂ᠨᠢᠭᠡ' },
            { id: '1-2', text: 'ᠨᠢᠭᠡ᠂ᠬᠣᠶᠠᠷ' },
          ],
        },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
      ]}
    />
  </VertMDemoFrame>
);
```

### 有序列表

`ordered` 使用 `<ol>`。

```tsx
import { VertMList } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMList
      ordered
      items={[
        { id: '1', text: 'ᠨᠢᠭᠡ' },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
        { id: '3', text: 'ᠭᠤᠷᠪᠠ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 头尾与边框

### header / footer

列表上下附加区域。

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMList
      header={<VertMText text="ᠵᠢᠭᠰᠠᠭᠠᠯᠲᠠ" />}
      footer={<VertMText text="ᠨᠡᠢᠲᠡ 2 ᠵᠦᠢᠯ" />}
      bordered
      dataSource={[
        { id: '1', text: 'ᠨᠢᠭᠡ' },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
      ]}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

### bordered

带边框的列表容器。

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMList
      bordered
      dataSource={[
        { id: '1', text: 'ᠠ' },
        { id: '2', text: 'ᠪ' },
        { id: '3', text: 'ᠴ' },
      ]}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

## 分页与栅格

### pagination

传入分页配置；演示中截取首页条数。

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const data = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  text: `ᠮᠥᠷ ${i + 1}`,
}));

export default () => (
  <VertMDemoFrame minHeight={320}>
    <VertMList
      dataSource={data}
      pagination={{ pageSize: 4, total: data.length }}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

### grid

栅格列表，按 `column` 分列。

```tsx
import { VertMList, VertMText, VertMCard } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={300}>
    <VertMList
      grid={{ column: 2, gutter: 12 }}
      dataSource={[
        { id: '1', text: 'ᠨᠢᠭᠡ' },
        { id: '2', text: 'ᠬᠣᠶᠠᠷ' },
        { id: '3', text: 'ᠭᠤᠷᠪᠠ' },
        { id: '4', text: 'ᠳᠥᠷᠪᠡ' },
      ]}
      renderItem={(item) => (
        <VertMCard style={{ marginBottom: 0 }}>
          <VertMText text={item.text} />
        </VertMCard>
      )}
    />
  </VertMDemoFrame>
);
```

## 状态与排版

### loading

加载态遮罩列表区域。

```tsx
import { VertMList, VertMText } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMList
      loading
      bordered
      dataSource={[{ id: '1', text: 'ᠨᠢᠭᠡ' }]}
      renderItem={(item) => <VertMText text={item.text} />}
    />
  </VertMDemoFrame>
);
```

### 字号与行高

通过 `fontSize` / `lineHeight` 控制条目排版。

```tsx
import { VertMList } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={260}>
    <VertMList
      fontSize={18}
      lineHeight={1.8}
      items={[
        { id: '1', text: 'ᠮᠣᠩᠭᠣᠯ' },
        { id: '2', text: 'ᠪᠢᠴᠢᠭ' },
        { id: '3', text: 'ᠬᠡᠯᠡ' },
      ]}
    />
  </VertMDemoFrame>
);
```

## 竖排提示

- `items` 默认用 `VertMText` 渲染；`dataSource` 请在 `renderItem` 中自行包 `VertMText`
- `writingMode` 可覆盖单列表书写模式；一般跟随 ConfigProvider 即可
- `grid` 内部使用 `VertMRow`/`VertMCol`，竖排 gutter 语义与 Grid 一致

## API

<API id="VertMList"></API>

## 主题变量

| 变量 | 说明 |
| --- | --- |
| `--vertm-color-border` | 边框列表描边 |
| `--vertm-color-bg-container` | 列表容器背景 |
| `--vertm-color-text` | 条目文字色 |
| `--vertm-font-family` | 条目字体 |
| `--vertm-font-size` | 默认字号参考 |
