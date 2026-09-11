---
title: Form
group:
  title: 数据录入
  order: 6
---

# Form

竖排表单。API 对标 antd（`useForm` / `Form.Item` / rules）；Editorial 下按列几何排布 label、控件与错误。

## 何时使用

- 收集并校验一组字段后提交
- 需要必填、正则或自定义 `validator` 规则时
- 竖排界面中 label / 控件 / 错误需按列对齐时
- 需要编程式 `setFieldsValue` / `resetFields` / `validateFields` 时
- 与 Input、Select、Checkbox 等录入组件组合时

## 基本用法

### 提交与必填

`useForm` + `Form.Item` 的最小表单；`onFinish` 在校验通过后触发。

```tsx
import { VertMForm, VertMInput, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm
      form={form}
      onFinish={(vals) => message.success(`ᠲᠤᠰᠢᠶᠠᠴᠢᠬᠠᠯ᠎ᠠ : ${JSON.stringify(vals)}`)}
      onFinishFailed={() => message.error('Error')}
    >
      <VertMForm.Item
        name="word"
        label="ᠨᠡᠷ᠎ᠡ"
        rules={[{ required: true, message: 'ᠡᠷᠬᠡᠪᠰᠢ ᠲᠠᠭᠯᠠᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ' }]}
      >
        <VertMInput placeholder="ᠲᠠᠭᠯᠠᠬᠤ ᠁" />
      </VertMForm.Item>
      <VertMForm.Item name="note" label="ᠪᠤᠰᠤᠳ">
        <VertMInput.TextArea rows={3} />
      </VertMForm.Item>
      <VertMButton htmlType="submit" type="primary">
        ᠲᠤᠰᠢᠶᠠᠬᠤ
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={420}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 校验规则

### pattern

正则与必填组合；失败时 `onFinishFailed` 收到字段错误表。

```tsx
import { VertMForm, VertMInput, VertMButton, VertMSpace, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm
      form={form}
      onFinish={() => message.success('ᠵᠥᠪ')}
      onFinishFailed={() => message.error('ᠪᠤᠷᠤᠭᠤ')}
    >
      <VertMForm.Item
        name="email"
        label="ᠢᠮᠡᠶᠢᠯ"
        rules={[
          { required: true, message: 'ᠣᠷᠤᠭᠤᠯ' },
          { pattern: /.+@.+\..+/, message: 'ᠪᠤᠷᠤᠭᠤ' },
        ]}
      >
        <VertMInput style={{ width: 48 }} />
      </VertMForm.Item>
      <VertMSpace>
        <VertMButton type="primary" htmlType="submit">
          ᠢᠯᠭᠡᠬᠦ
        </VertMButton>
        <VertMButton htmlType="button" onClick={() => form.resetFields()}>
          ᠰᠡᠷᠭᠡᠭᠡᠬᠦ
        </VertMButton>
      </VertMSpace>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={400}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 自定义校验

### validator

异步 / 同步自定义规则，`reject` 或 `throw` 即失败。

```tsx
import { VertMForm, VertMInput, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm
      form={form}
      onFinish={() => message.success('ok')}
      onFinishFailed={() => message.warning('fail')}
    >
      <VertMForm.Item
        name="code"
        label="ᠺᠣᠳ"
        rules={[
          {
            message: 'ᠪᠤᠷᠤᠭᠤ ᠺᠣᠳ',
            validator: async (value) => {
              if (value !== '1234') {
                throw new Error('invalid');
              }
            },
          },
        ]}
      >
        <VertMInput placeholder="1234" />
      </VertMForm.Item>
      <VertMButton type="primary" htmlType="submit">
        ᠢᠯᠭᠡᠬᠦ
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 布局

### layout

`vertical`（默认）与 `horizontal` 改变表单项排布方向。

```tsx
import { VertMForm, VertMInput, VertMButton, useForm } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [form] = useForm();
  return (
    <VertMDemoFrame minHeight={360}>
      <VertMForm form={form} layout="horizontal">
        <VertMForm.Item name="name" label="ᠨᠡᠷ᠎ᠡ" rules={[{ required: true }]}>
          <VertMInput />
        </VertMForm.Item>
        <VertMButton type="primary" htmlType="submit">
          ᠢᠯᠭᠡᠬᠦ
        </VertMButton>
      </VertMForm>
    </VertMDemoFrame>
  );
};
```

## 编程式赋值

### setFieldsValue

用实例写入初始值或回填。

```tsx
import { useEffect } from 'react';
import { VertMForm, VertMInput, VertMButton, VertMSpace, useForm } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ name: 'ᠪᠠᠲᠤ', note: 'ᠲᠡᠮᠳᠡᠭᠯᠡᠯ' });
  }, [form]);
  return (
    <VertMDemoFrame minHeight={400}>
      <VertMForm form={form}>
        <VertMForm.Item name="name" label="ᠨᠡᠷ᠎ᠡ">
          <VertMInput />
        </VertMForm.Item>
        <VertMForm.Item name="note" label="ᠲᠡᠮᠳᠡᠭᠯᠡᠯ">
          <VertMInput />
        </VertMForm.Item>
        <VertMSpace>
          <VertMButton
            htmlType="button"
            onClick={() => form.setFieldValue('name', 'ᠰᠠᠷᠠ')}
          >
            set name
          </VertMButton>
          <VertMButton htmlType="button" onClick={() => form.resetFields()}>
            reset
          </VertMButton>
        </VertMSpace>
      </VertMForm>
    </VertMDemoFrame>
  );
};
```

## 手动校验

### validateFields

不提交表单，仅触发校验。

```tsx
import { VertMForm, VertMInput, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm form={form}>
      <VertMForm.Item
        name="title"
        label="ᠭᠠᠷᠴᠠᠭ"
        rules={[{ required: true, message: 'ᠣᠷᠤᠭᠤᠯ' }]}
      >
        <VertMInput />
      </VertMForm.Item>
      <VertMButton
        htmlType="button"
        type="primary"
        onClick={() =>
          form
            .validateFields()
            .then((v) => message.success(JSON.stringify(v)))
            .catch(() => message.error('invalid'))
        }
      >
        validate
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 与 Select 组合

### 下拉字段

`Form.Item` 会向子控件注入 `value` / `onChange`。

```tsx
import { VertMForm, VertMSelect, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm form={form} onFinish={(v) => message.info(JSON.stringify(v))}>
      <VertMForm.Item
        name="color"
        label="ᠥᠩᠭᠡ"
        rules={[{ required: true, message: 'ᠰᠣᠩᠭᠣ' }]}
      >
        <VertMSelect
          allowClear
          options={[
            { label: 'ᠤᠯᠠᠭᠠᠨ', value: 'red' },
            { label: 'ᠬᠥᠬᠡ', value: 'blue' },
          ]}
        />
      </VertMForm.Item>
      <VertMButton type="primary" htmlType="submit">
        ᠢᠯᠭᠡᠬᠦ
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={360}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 与 Checkbox / Switch

### 布尔与多选字段

复选组与开关也可作为表单项。

```tsx
import { VertMForm, VertMCheckbox, VertMSwitch, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm form={form} onFinish={(v) => message.success(JSON.stringify(v))}>
      <VertMForm.Item name="tags" label="ᠰᠣᠩᠭᠣᠯᠲᠠ">
        <VertMCheckbox.Group
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </VertMForm.Item>
      <VertMForm.Item name="on" label="ᠰᠣᠯᠢᠬᠤ">
        <VertMSwitch />
      </VertMForm.Item>
      <VertMButton type="primary" htmlType="submit">
        ᠢᠯᠭᠡᠬᠦ
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={380}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 必填标记

### required

有 `required` 规则时默认显示必填标记；也可显式传 `required={false}` 隐藏。

```tsx
import { VertMForm, VertMInput, useForm } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [form] = useForm();
  return (
    <VertMDemoFrame minHeight={320}>
      <VertMForm form={form}>
        <VertMForm.Item
          name="a"
          label="ᠵᠠᠰᠠᠯᠲᠠᠢ"
          rules={[{ required: true, message: 'ᠣᠷᠤᠭᠤᠯ' }]}
        >
          <VertMInput />
        </VertMForm.Item>
        <VertMForm.Item name="b" label="ᠰᠤᠯᠠ" required={false}>
          <VertMInput />
        </VertMForm.Item>
      </VertMForm>
    </VertMDemoFrame>
  );
};
```

## 读取字段值

### getFieldsValue

提交前或按钮中读取当前值。

```tsx
import { VertMForm, VertMInput, VertMButton, VertMSpace, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm form={form}>
      <VertMForm.Item name="name" label="ᠨᠡᠷ᠎ᠡ">
          <VertMInput />
        </VertMForm.Item>
      <VertMSpace>
        <VertMButton
          htmlType="button"
          onClick={() => message.info(JSON.stringify(form.getFieldsValue()))}
        >
          peek
        </VertMButton>
        <VertMButton
          htmlType="button"
          onClick={() => message.info(String(form.getFieldValue('name') ?? ''))}
        >
          get name
        </VertMButton>
      </VertMSpace>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={340}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 多字段长表单

### 竖排多列字段流

演示多个 Item 在竖排容器中的自然换列流。

```tsx
import { VertMForm, VertMInput, VertMButton, useForm, VertMApp } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

const Demo = () => {
  const [form] = useForm();
  const { message } = VertMApp.useApp();
  return (
    <VertMForm form={form} onFinish={(v) => message.success(JSON.stringify(v))}>
      <VertMForm.Item name="f1" label="ᠨᠡᠷ᠎ᠡ" rules={[{ required: true }]}>
        <VertMInput />
      </VertMForm.Item>
      <VertMForm.Item name="f2" label="ᠣᠪᠤᠭ">
        <VertMInput />
      </VertMForm.Item>
      <VertMForm.Item name="f3" label="ᠬᠣᠲᠠ">
        <VertMInput />
      </VertMForm.Item>
      <VertMForm.Item name="f4" label="ᠤᠲᠠᠰᠤ">
        <VertMInput.TextArea rows={2} columnDepth={3} />
      </VertMForm.Item>
      <VertMButton type="primary" htmlType="submit">
        ᠢᠯᠭᠡᠬᠦ
      </VertMButton>
    </VertMForm>
  );
};

export default () => (
  <VertMDemoFrame minHeight={480}>
    <VertMApp>
      <Demo />
    </VertMApp>
  </VertMDemoFrame>
);
```

## 竖排提示

- Editorial 下 label / control / error 按列几何排布，错误走 `role="alert"`
- 字符串错误文案包在 `VertMText` 内
- 子控件需能接受 `value` + `onChange`；自定义控件请按此约定封装

## API

<API id="VertMForm"></API>

## Form.Item

`FormItem` 未作为独立导出符号挂到 API 解析入口时，以下表为准（对应 `FormItemProps`）。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名，对应表单值的 key | `string` | — |
| label | 字段标签 | `ReactNode` | — |
| rules | 校验规则列表 | `Rule[]` | `[]` |
| required | 是否显示必填标记；有 required 规则时默认为 true | `boolean` | — |
| children | 表单控件，需能接收 value / onChange | `ReactElement` | — |
| className | 自定义类名 | `string` | — |

### Rule

| 字段 | 说明 |
|------|------|
| required | 是否必填 |
| message | 失败提示 |
| pattern | 正则 |
| validator | `(value) => void \| Promise<void>` |

### FormInstance（useForm）

| 方法 | 说明 |
|------|------|
| getFieldValue / getFieldsValue | 读值 |
| setFieldValue / setFieldsValue | 写值 |
| validateFields | 校验全部字段 |
| resetFields | 重置值与错误 |

## 主题变量

| 变量 | 说明 |
|------|------|
| `--vertm-color-error` | 校验错误色 |
| `--vertm-field-column` | Editorial 字段列宽 |
| `--vertm-color-text` | 标签与正文色 |
| `--vertm-color-border` | 表单项分隔 / 边框 |
| `--vertm-column-size` | 竖排列宽基准 |
