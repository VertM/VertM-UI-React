---
title: 从 Ant Design 迁移
order: 10
---

# 从 Ant Design 迁移

VertM UI **刻意贴近** antd 的组件名与常用 props，但真源是传统蒙古文竖排，不是视觉换皮。

## 包与入口

| antd | VertM |
|------|-------|
| `antd` | `@vertm/react` + `@vertm/styles` + `@vertm/tokens` |
| `ConfigProvider` | `ConfigProvider` / `VertMConfigProvider` |
| `App` | `App` / `VertMApp` |
| 样式 less/cssinjs | 导入 `@vertm/styles/index.css` + theme CSS 变量 |

## 别名

下列导出与 antd 同名，便于迁移：

`ConfigProvider`、`Button`、`Input`、`Modal`、`App`

其余组件多为 `VertM*` 前缀（如 `VertMSelect`、`VertMMenu`）。

## 常见差异

| 主题 | 说明 |
|------|------|
| 书写模式 | 默认 `vertical-lr`；方向键按**逻辑轴**（尤其 `appearance="editorial"`） |
| 主色语义 | Editorial 下 primary=墨色，信息色=钴蓝 |
| 选中态 | Editorial 用 block-end marker，而非 antd 大面积主色底 |
| 输入 | 复杂竖排编辑优先 `VertMTextField`（Mirror Input），不要假设原生 textarea 竖排可用 |
| 命令式 API | 同样推荐 `App.useApp()`，原因与 antd 5 类似 |
| 缺失组件 | Table / DatePicker / Upload / Tree 等见仓库 `docs/component-roadmap.md`，本轮文档站不假装已有 |

## 迁移步骤建议

1. 换依赖与样式入口，用 `ConfigProvider` 包一层。
2. 按页把 `Button`/`Input`/`Form`/`Modal` 等替换为 VertM 等价物并肉眼验竖排。
3. 打开 `appearance="editorial"` 做产品级视觉（若需要）。
4. 全局 `message` 改为 `App.useApp().message`。
5. 对照 FAQ 与浏览器矩阵处理字体与旧引擎。
