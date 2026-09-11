---
title: VertM UI
hero:
  title: VertM UI
  description: 面向传统蒙古文竖排的 React 组件库
  actions:
    - text: 快速开始
      link: /guide/getting-started
    - text: 浏览组件
      link: /components/button
---

<div className="vertm-docs-hero">
  <div className="vertm-docs-hero__mark" lang="mn-Mong">ᠸᠡᠷᠲ᠋ᠮ<br/>ᠦᠢ</div>
  <div className="vertm-docs-hero__body">
    <h1>VertM UI</h1>
    <p>
      以 <code>writing-mode: vertical-lr</code> 为真源的 React 组件库，API 对标 Ant Design。
      用列式几何与逻辑轴键盘表达竖排交互，而不是把横排组件整体旋转。
    </p>
    <div className="vertm-docs-hero__actions">
      <a className="primary" href="/VertM-UI-React/guide/getting-started">快速开始</a>
      <a className="secondary" href="/VertM-UI-React/components/button">浏览组件</a>
    </div>
  </div>
</div>

## 特性

- **竖排优先**：组件按列设计，选中态用 block-end 边缘 marker
- **Ant Design 心智**：熟悉的 API，降低迁移成本
- **主题与外观**：default / dark / `appearance="editorial"`
- **核心能力**：规范化、检索归一化、元音和谐、光标映射等 `@vertm/core` 工具

## 快速安装

```bash
npm install @vertm/react @vertm/styles @vertm/tokens
```

```tsx
import { ConfigProvider, Button } from '@vertm/react';
import '@vertm/styles/index.css';

export default () => (
  <ConfigProvider>
    <Button type="primary">ᠨᠡᠮᠡᠬᠦ</Button>
  </ConfigProvider>
);
```
