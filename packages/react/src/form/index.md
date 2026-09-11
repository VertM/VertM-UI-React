---
title: Form
group:
  title: 数据录入
  order: 2
---

# Form

竖排表单，API 对标 antd Form（`useForm` / `Form.Item` / rules）。

## 基本用法

```tsx
import { VertMForm, VertMInput, VertMButton, useForm } from '@vertm/react';
import VertMDemoFrame from 'VertMDemoFrame';

export default () => {
  const [form] = useForm();
  return (
    <VertMDemoFrame minHeight={360}>
      <VertMForm
        form={form}
        onFinish={(v) => console.log(v)}
        style={{ display: 'flex', gap: 16 }}
      >
        <VertMForm.Item name="name" label="ᠨᠡᠷ᠎ᠡ" rules={[{ required: true, message: 'ᠣᠷᠤᠭᠤᠯ' }]}>
          <VertMInput style={{ width: 48 }} />
        </VertMForm.Item>
        <VertMForm.Item>
          <VertMButton type="primary" htmlType="submit">
            ᠢᠯᠭᠡᠬᠦ
          </VertMButton>
        </VertMForm.Item>
      </VertMForm>
    </VertMDemoFrame>
  );
};
```

## 竖排提示

- Editorial 下 label / control / error 按列几何排布
- 校验错误走 `role="alert"`，字符串错误包在 `VertMText` 内

## API

<API id="VertMForm"></API>
