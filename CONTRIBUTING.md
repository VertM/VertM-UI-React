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

# 启动 Demo（http://localhost:5173）— 内部 playground，已冻结
npm run dev

# 启动文档站（http://localhost:8000/VertM-UI-React/）— 面向用户的示例唯一来源
npm run docs
```

## 文档站与示例约定

- **新示例只进文档站**（`packages/docs` + 各组件旁的 `index.md` / `_vertical/*.md`），不要往 `packages/react-demo` 加面向用户的 demo。
- `react-demo` 仅作本地联调 playground；文档站覆盖完整前可保留，但不再扩展。
- 改组件 props 时请同步更新同目录文档（`index.md`），并尽量补 JSDoc 以便 API 表格有描述。
- 规划见 [docs/documentation-site-plan.md](docs/documentation-site-plan.md)。

## 测试

`@vertm/core`、`@vertm/tokens` 用 Vitest 测纯逻辑；`@vertm/react` 在 jsdom 环境下用
[Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 测组件的渲染与交互。

```bash
# 仅跑组件测试
npm test -w @vertm/react

# 监听模式
npm run test:watch -w @vertm/react

# 覆盖率（CI 会校验阈值）
npm run test:coverage -w @vertm/react
```

写组件测试时请注意：

- **按可访问性查询**，用 `getByRole` / `getByLabelText` 而不是 class 选择器，这样测试同时充当 a11y 约束。
- **受控与非受控都要覆盖**，这是 antd 兼容性最容易回归的地方。
- **键盘路径要单独测**，竖排下的方向键语义与横排不同，只测鼠标点击会漏掉问题。
- jsdom 没有布局引擎，浮层定位、`ResizeObserver`、`Range` 测量的桩实现都在
  `packages/react/vitest.setup.ts`，需要新桩时加在那里。
- 覆盖率阈值是**防回退**用的下限，新增组件测试后请顺手抬高 `vitest.config.ts` 里的数值。

## 仓库结构

```
packages/
├── core/        # 框架无关工具（规范化、字体检测、元音和谐、后缀）
├── tokens/      # 设计令牌
├── styles/      # CSS tokens + vertical-lr 竖排预设
├── icons/       # 方向感知 SVG 图标
├── react/       # React 组件库（组件旁 index.md 为文档）
├── docs/        # 文档站（dumi，面向用户的示例唯一来源）
├── wasm/        # 可选 Harfbuzz WASM 封装
└── react-demo/  # 内部 playground（已冻结，不发布）
docs/            # 规划与兼容矩阵
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
