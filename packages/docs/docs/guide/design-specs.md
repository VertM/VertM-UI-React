---
title: 设计规范
order: 8
---

# 设计规范

面向传统蒙古文竖排 UI 的视觉与几何约定。更细的交互契约见 `design/vertical-editorial/DESIGN-SPEC.md`。

## 书写与列几何

- 默认书写模式：`writing-mode: vertical-lr`，文本方向自上而下、列自左向右推进。
- **列宽**由 token `columnSize`（CSS `--vertm-column-size`）约束；**列距**为 `columnGap` / `--vertm-column-gap`。
- 组件按「列」设计，不要把横排控件整体 `rotate(90deg)`。
- 换行与标点遵循蒙古文习惯；复杂断行可用 `@vertm/core` 的换行工具。

## 色彩

| 角色 | Editorial | Default |
|------|-----------|---------|
| 主色 / 墨色 | `#171a18`（`colorPrimary`） | 品牌蓝系 primary |
| 信息 / 链接 / caret | `#2155d6`（`colorInfo`） | 与 primary 接近 |
| 纸色背景 | `#f3f1ea`（`colorBgLayout`） | 浅灰布局底 |
| 表面 | `#fbfaf6`（`colorBgContainer`） | 白/浅表面 |

Editorial 下**选中填充与 marker 用墨色**，钴蓝只留给链接与 caret，避免整站发蓝。

## 状态语言（Editorial）

- 选中 / 激活：block-end 边缘 **3px marker**，而非整块高饱和底色。
- 焦点：边框 + 可选 marker 增高；勿依赖仅颜色区分。

## 字体

- 推荐栈：`Noto Sans Mongolian` 等（见 `FONT_PRESETS` / `@vertm/styles` fonts）。
- 首屏用 `@vertm/core` 的字体检测，避免方块字。
- 拉丁与蒙古文混排时保持 `text-orientation: mixed`（`VertMText` 默认行为）。

## 间距与圆角

- 间距走主题 spacing token；圆角 Editorial 偏小（约 `3px`），贴近纸面编辑气质。
- Demo / 文档壳可用横排说明 + 竖排示例并置；读者需能分清「讲解」与「示例」。
