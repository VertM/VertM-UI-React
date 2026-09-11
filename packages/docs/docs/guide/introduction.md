---
title: 介绍
order: 1
nav: 指南
---

# 介绍

VertM UI（`@vertm/*`）是一套面向**传统蒙古文竖排**的 React 组件库。

## 解决什么问题

浏览器原生 `writing-mode: vertical-lr` 能排竖文，但通用 UI 库（如 Ant Design）的布局、浮层、键盘方向都按横排假设设计。VertM 从列几何、逻辑轴键盘和字体能力检测出发，提供可在生产中使用的竖排组件。

## 设计真源

- 传统蒙古文书写逻辑（见 [设计原则](/guide/design-principles)）
- 参考原型：`design/vertical-editorial/`
- API 刻意对标 Ant Design，便于迁移

## 包结构

| 包 | 用途 |
|---|---|
| `@vertm/react` | React 组件 |
| `@vertm/styles` | CSS tokens + 组件样式 |
| `@vertm/tokens` | 主题令牌 / `createTheme` |
| `@vertm/core` | 规范化、检索、和谐律等纯逻辑 |
| `@vertm/icons` | 方向感知图标 |
| `@vertm/wasm` | 可选 Harfbuzz WASM |
