---
title: 浏览器兼容
order: 7
---

# 浏览器兼容矩阵

基于 W3C [Mongolian Gap Analysis](https://www.w3.org/TR/mong-gap/) 与 Phase 0 PoC 验证。

## 竖排文本渲染（VertMText）

| 测试项 | Chrome (Blink) | Firefox (Gecko) | Safari (WebKit) |
|--------|----------------|-----------------|-----------------|
| `writing-mode: vertical-lr` | ✅ | ✅ | ✅ |
| 蒙古文连字 joining | ✅ 原生 OpenType | ✅ 原生 OpenType | ✅ Safari 18.1+ |
| 旧 Safari 字形方向 | N/A | N/A | ⚠ 需 `text-orientation: sideways` |
| 混合拉丁字符 | ✅ `text-orientation: mixed` | ✅ | ✅ |

**结论**：默认使用 CSS-native 路径，无需 Harfbuzz WASM。

## 竖排表单控件（VertMTextField）

| 测试项 | Chrome | Firefox | Safari |
|--------|--------|---------|--------|
| 原生竖排 `<textarea>` | ❌ Gap #37 | ⚠ 部分 | ❌ Gap #37 |
| Mirror Input 模式 | ✅ 推荐 | ✅ 推荐 | ✅ 推荐 |

**结论**：使用 Mirror Input 架构（隐藏 input + 视觉层 + 光标 overlay）。

## Shaping 策略

| 场景 | 路径 |
|------|------|
| 常规 Web 渲染 | NativePath（CSS + OpenType） |
| Canvas/PDF 导出 | WasmPath（`@vertm/wasm`，按需加载） |
| 旧 Safari (< 18) | CSS fallback + 可选 Wasm |
