# 文档站 · 迭代一(交付 Composer 执行)

> 承接 `docs/documentation-site-plan.md`。首版脚手架已完成并能构建。本轮做三件事:
> **(1) 切换器改全局 · (2) 补 JSDoc 让 API 表格有内容 · (3) 锁定页面模板并回对齐**。
> 执行顺序建议:**任务 1 → 任务 3 → 任务 2**(1 是结构改动,先做;3 先把模板定死;2 最费时,最后批量铺)。

---

## 任务 1 — 切换器改为全局(必做,优先)

### 现状问题
`packages/docs/src/components/VertMDemoFrame.tsx` 内部**每个 demo 各自** `SiteControlsProvider` + 各自渲染一条 `SiteControls` 工具栏。结果:全站上百个 demo → 上百条重复工具栏、状态互不相通、没有总控。

### 目标
**全站唯一一处切换器**(主题:Default/Dark/Editorial;书写模式:竖排/横排),点一下,当前页所有 demo **一起联动**。

### 实施
1. **把 Provider 提到全局**:新建 dumi 运行时入口 `packages/docs/.dumi/app.tsx`,用 `rootContainer` 把整个应用包进 `SiteControlsProvider`:
   ```tsx
   // packages/docs/.dumi/app.tsx
   import { SiteControlsProvider } from '../src/components/SiteContext';
   import { GlobalControls } from '../src/components/GlobalControls';

   export function rootContainer(last: JSX.Element) {
     return (
       <SiteControlsProvider>
         <GlobalControls />
         {last}
       </SiteControlsProvider>
     );
   }
   ```
2. **新建 `GlobalControls.tsx`**:复用现有 `SiteControls` 的按钮逻辑,渲染为**一条 sticky 工具栏**(建议吸附在内容区顶部;精细位置/样式后续由徐亚奥定,本轮先能用即可)。
3. **改 `VertMDemoFrame.tsx`**:
   - **删除**内部的 `SiteControlsProvider` 包裹与 `SiteControls` 工具栏渲染。
   - 直接 `useSiteControls()` 读全局状态,套 `VertMConfigProvider theme/appearance/writingMode` + 竖排容器。
   - `hideControls` 属性废弃(或保留为 no-op 兼容旧引用)。
4. **状态持久化**:`SiteControlsProvider` 里把 `themeId` / `writingMode` 存 `localStorage`(如 key `vertm-docs-controls`),切页不丢选择。
5. **可选·单 demo 锁定**:给 `VertMDemoFrame` 加可选 `forceTheme?` / `forceWritingMode?`,让个别页面(如 Editorial 专题、竖排对比页)可无视全局强制某状态。Editorial 页建议 `forceTheme="editorial"`。

### 验收
- [x] 全站仅 1 处切换器;任一 demo 不再自带工具栏。
- [x] 顶部切一次,当前页所有 demo 同步变主题/横竖排。
- [x] 刷新或跳页后选择保持。
- [x] `npm run docs:build` 通过。

---

## 任务 2 — 补 JSDoc,让 API 表格"说明"列有内容

### 现状问题
`apiParser` 已开、`<API>` 表能出,但组件 props 缺 JSDoc → **"说明"列大面积为空**。

### 做法(统一规范)
给**所有对外导出组件的 Props 接口**的每个字段补一行中文 JSDoc;有默认值的用 `@default` 标注。格式示例:

```ts
export interface ButtonProps {
  /** 按钮类型 @default 'default' */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** 危险态,用于删除等破坏性操作 @default false */
  danger?: boolean;
  /** 载入中,禁用点击并显示 spinner @default false */
  loading?: boolean;
  /** 单列最大行数,超出换到下一列 */
  columnDepth?: number;
}
```

要点:
- 一句话中文,说清用途;能默认就写 `@default`。
- 只补**对外导出**的 props(以 `packages/react/src/index.ts` 的导出为准);内部实现类型不用管。
- 顺手修正明显过时/错误的类型注释。

### 分批(按优先级,先高频)
- **A 批(高频,先做)**:Button、Input、Select、Form、Menu、Tabs、Modal、Checkbox、Radio、Switch、ConfigProvider、VertMText、VertMTextField。
- **B 批(其余全部)**:按 `docs/documentation-site-plan.md` §7 组件清单铺完(含 icons、命令式 API 的 config 类型)。

### 验收
- [x] A、B 两批组件在各自页面的 `<API>` 表中,**每个 prop 的"说明"列非空**。
- [x] `npm run typecheck` 通过(JSDoc 不改类型,只加注释)。

---

## 任务 3 — 锁定页面模板并回对齐 46 页

### 背景
首版一次性铺了全部组件页,跳过了"先样板后批量"的评审。为防版式漂移,本轮**先把模板定死,再让所有页面对齐**。

### 标准页面模板(所有组件页统一遵守)
```markdown
---
title: <ComponentName>
group:
  title: <AntD 分组名, 见 plan §2>
  order: <组内序号>
---

# <ComponentName>

<一句话定位 + 竖排相关的关键特性>

## 基本用法
<1 个最小 live demo, 走 VertMDemoFrame>

## <2~5 个能力小节>
<每节 1 个 live demo, 覆盖主要变体/状态>

## 竖排提示
<该组件在竖排下的注意点 / Editorial 差异, 无则省略>

## API
<API id="<导出组件名>"></API>
```

约束:
- 每页 **live demo 3~6 个**,统一 `import VertMDemoFrame from 'VertMDemoFrame'` 包裹。
- demo 尽量从 `packages/react-demo/src/App.tsx` 抽取复用(与决策 A 一致:抽走即从 react-demo 精简)。
- `<API id>` 用**导出名**(如 `VertMButton`),命令式 API 页对应其 config 类型。
- frontmatter 的 `group.title` / `order` 与 `.dumirc.ts` 侧边栏分组保持一致。

### 步骤
1. 先精修 3 个代表页作基准:**Button(基础)、Form(复杂)、Menu(导航)**,确认版式。
2. 以此为准,逐页对齐其余组件页(补齐缺失小节、统一标题层级、去除偏离模板的写法)。
3. 命令式 API 页(App / message / notification / Modal.confirm)套同一骨架。

### 验收
- [x] 抽查 10 页,frontmatter、小节顺序、demo 数量、`## API` 均符合模板。
- [x] 侧边栏分组/顺序与 `.dumirc.ts` 一致,无孤页、无死链。
- [x] `npm run docs:build` 通过。

---

## 本轮不做(留给设计/后续)
- 切换器的**视觉样式与最终位置**、文档壳(顶栏/侧栏/正文 vs demo 区版式)、首页 Hero、Editorial 专题呈现 —— 属 §9 设计交付,由徐亚奥定,本轮工程只保证"全局切换器能用"。
- changesets 自动版本流 —— 继续用手工 `CHANGELOG.md`。

## 完成后请更新
- 在 `CHANGELOG.md` 的 `[Unreleased]` 记一笔(全局切换器 / API 描述 / 模板对齐)。
- 若模板有微调,回写 `docs/documentation-site-plan.md` 对应小节,保持规划与实现一致。
