---
title: 无障碍与键盘
order: 11
---

# 无障碍与键盘

竖排 UI 的键盘与读屏不能照搬横排心智。

## 逻辑轴优先

在 `appearance="editorial"`（以及部分默认竖排场景）下：

| 组件 | 行为摘要 |
|------|----------|
| Select | 上下移动高亮；右键提交；左键回退/上一项 |
| Menu | 上下同级；右进子菜单；左关闭/回退 |
| Tabs | 左右在 tab 列之间切换（即使 tab 条在面板侧边） |

业务自定义快捷键时，先按 block/inline 轴表达，再映射到物理方向。

## 焦点

- 可交互控件需有可见焦点环（组件样式使用 `--vertm-color-primary` / 边框）。
- Modal / Drawer 应陷阱焦点；Escape 关闭（VertM Modal 已处理基础路径）。
- 下拉与子菜单打开后，焦点应进入面板内首个可聚焦项（Menu Editorial 路径已做）。

## 读屏

- 表单错误使用 `role="alert"`（Form.Item）。
- Tabs 使用 `role="tablist"`；Editorial 下 `aria-orientation` 可能为 `horizontal`（表示「列之间」的导航轴），与视觉列方向一致地理解。
- 纯展示蒙古文用 `VertMText`；链接用 `href` 或 `Typography.Link`，避免用可点击 `div` 冒充。

## 对比度与状态

- 不要仅靠颜色区分选中；Editorial marker + 文字色共同表达。
- 禁用态降低对比并移除指针事件；保持可被读屏感知（`disabled` / `aria-disabled`）。
