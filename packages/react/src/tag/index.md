---
title: Tag
group:
  title: 数据展示
  order: 4
---

# Tag

标签。用于分类、标记与筛选；支持预设色、可关闭与可勾选（`Checkable`）。

## 何时使用

- 文章分类、状态标记、关键词
- 需要一键关闭的临时标签
- 多选筛选（CheckableTag）
- 竖排列表旁的短标签列

## 基本用法

### 基础标签

默认色标签。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace>
      <VertMTag>ᠰᠣᠶᠣᠯ</VertMTag>
      <VertMTag>ᠲᠡᠦᠬᠡ</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 预设颜色

`color` 使用预设名。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={240}>
    <VertMSpace wrap>
      <VertMTag color="default">default</VertMTag>
      <VertMTag color="primary">primary</VertMTag>
      <VertMTag color="success">success</VertMTag>
      <VertMTag color="warning">warning</VertMTag>
      <VertMTag color="error">error</VertMTag>
      <VertMTag color="processing">processing</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 自定义色值

传入任意 CSS 颜色作为背景。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace>
      <VertMTag color="#108ee9">#108ee9</VertMTag>
      <VertMTag color="#87d068">#87d068</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 交互

### 可关闭

`closable` + `onClose`。

```tsx
import { useState } from 'react';
import { VertMTag, VertMButton, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <VertMDemoFrame minHeight={200}>
      <VertMSpace>
        {visible ? (
          <VertMTag closable onClose={() => setVisible(false)}>
            ᠬᠠᠭᠠᠵᠤ ᠪᠣᠯᠬᠤ
          </VertMTag>
        ) : (
          <VertMButton size="small" onClick={() => setVisible(true)}>
            restore
          </VertMButton>
        )}
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 可勾选

`checkable` 或 `VertMTag.Checkable`。

```tsx
import { useState } from 'react';
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <VertMDemoFrame minHeight={200}>
      <VertMSpace>
        <VertMTag checkable checked={checked} onChange={setChecked}>
          ᠰᠣᠩᠭᠣᠵᠤ ᠪᠣᠯᠬᠤ
        </VertMTag>
        <VertMTag.Checkable defaultChecked>Checkable</VertMTag.Checkable>
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 前缀图标

`icon` 显示在标签文字前。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import { Check, InfoCircle } from '@vertm/icons';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace>
      <VertMTag icon={<Check vertical size="small" />} color="success">
        ok
      </VertMTag>
      <VertMTag icon={<InfoCircle vertical size="small" />} color="processing">
        info
      </VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 组合

### 标签组

Space + wrap 组成标签云。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={220}>
    <VertMSpace wrap size="small">
      <VertMTag color="primary">ᠮᠣᠩᠭᠣᠯ</VertMTag>
      <VertMTag>UI</VertMTag>
      <VertMTag color="success">vert</VertMTag>
      <VertMTag color="warning">beta</VertMTag>
      <VertMTag closable>temp</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

### 多选筛选

一组 Checkable 模拟筛选器。

```tsx
import { useState } from 'react';
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const OPTIONS = ['A', 'B', 'C', 'D'];

export default () => {
  const [selected, setSelected] = useState<string[]>(['A']);
  const toggle = (v: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, v] : prev.filter((x) => x !== v)));
  };
  return (
    <VertMDemoFrame minHeight={220}>
      <VertMSpace wrap>
        {OPTIONS.map((v) => (
          <VertMTag
            key={v}
            checkable
            checked={selected.includes(v)}
            onChange={(c) => toggle(v, c)}
          >
            {v}
          </VertMTag>
        ))}
      </VertMSpace>
    </VertMDemoFrame>
  );
};
```

### 非受控勾选

`defaultChecked` 非受控初始态。

```tsx
import { VertMTag, VertMSpace } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => (
  <VertMDemoFrame minHeight={200}>
    <VertMSpace>
      <VertMTag checkable defaultChecked>
        on
      </VertMTag>
      <VertMTag checkable>off</VertMTag>
    </VertMSpace>
  </VertMDemoFrame>
);
```

## 竖排提示

- 子节点字符串经 `VertMText` 渲染
- 关闭按钮图标不随竖排额外旋转（`rotateForVertical={false}`）
- Checkable 与 closable 互斥：勾选态不显示关闭按钮

## API

<API id="VertMTag"></API>

### CheckableTag

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 受控勾选 | `boolean` | — |
| defaultChecked | 非受控初始勾选 | `boolean` | `false` |
| onChange | 勾选变化 | `(checked: boolean) => void` | — |
| children | 内容 | `ReactNode` | — |
| color | 颜色 | `PresetTagColor \| string` | `'default'` |
| icon | 前缀图标 | `ReactNode` | — |

也可使用 `VertMTag.Checkable` 或独立导出的 `CheckableTag`。

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-primary` | primary / checked 强调 |
| `--vertm-color-success` | success 预设色 |
| `--vertm-color-warning` | warning 预设色 |
| `--vertm-color-error` | error 预设色 |
| `--vertm-border-radius-sm` | 标签圆角 |
| `--vertm-font-family` | 标签文字字体 |
