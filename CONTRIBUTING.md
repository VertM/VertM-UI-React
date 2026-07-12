# 贡献指南 / Contributing

感谢你对本项目的关注！本文档说明如何参与开发。

## 环境要求

- Node.js >= 18
- npm >= 9

## 开发流程

```bash
# 安装依赖（monorepo，使用 npm workspaces）
npm install

# 类型检查
npm run typecheck

# 构建全部包
npm run build

# 运行测试
npm test

# 启动 Demo（http://localhost:5173）
npm run dev
```

## 仓库结构

```
packages/
├── core/        # 框架无关工具（规范化、字体检测、元音和谐、后缀）
├── tokens/      # 设计令牌
├── styles/      # CSS tokens + vertical-lr 竖排预设
├── icons/       # 方向感知 SVG 图标
├── react/       # React 组件库
├── wasm/        # 可选 Harfbuzz WASM 封装
└── react-demo/  # 本地 Demo（不发布）
docs/            # 浏览器兼容矩阵
examples/        # Phase 0 CSS 基线验证
```

## 提交规范

请使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat: ...` 新功能
- `fix: ...` 缺陷修复
- `docs: ...` 文档
- `refactor: ...` 重构
- `test: ...` 测试
- `chore: ...` 杂项/构建

## Pull Request 要求

1. 从 `main` 拉出分支开发
2. 确保 `npm run typecheck`、`npm run build`、`npm test` 全部通过
3. 新增功能请附带测试
4. 涉及蒙古文排版行为的改动，请参考 [W3C Mongolian Layout Requirements](https://www.w3.org/TR/mlreq/) 与 GB/T 25914-2023

## 设计原则

- **CSS-first**：优先使用浏览器原生 `writing-mode: vertical-lr` 与 OpenType shaping，WASM 仅作可选 fallback
- **框架无关核心**：语言学逻辑放在 `@vertm/core`，UI 绑定放在 `@vertm/react`
- **存储用标准 Unicode**：`normalizeForSearch()` 仅用于检索，不用于存储/显示
