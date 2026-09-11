---
title: 设计原则
order: 3
---

# 设计原则

1. **CSS-native 竖排**：优先 `writing-mode` / 逻辑属性，不整体 `rotate(90deg)`。
2. **列式几何**：控件按「列」设计，列宽受 `columnSize` / `columnGap` 约束。
3. **逻辑轴交互**：键盘与展开方向先按 block/inline 轴表达，再映射到物理方向。
4. **状态语言**：Editorial 外观用 block-end 3px marker，而不是整块蓝色底。
5. **Mirror Input**：在需要时为不支持竖排输入的环境提供镜像输入路径（见兼容矩阵）。

更细的交互契约见 `design/vertical-editorial/DESIGN-SPEC.md`。
