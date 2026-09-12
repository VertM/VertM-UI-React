# VertM UI 文档站建设方案(交付 Composer 执行)

> 本文是**实施规格**,请按阶段执行。技术栈已定:**dumi 2 + 中文单语 + 组件文档就近放置**。

---

## 0. 背景与目标

`vertm-ui` 是**传统蒙古文竖排(`writing-mode: vertical-lr`)React 组件库** monorepo,API 刻意对标 Ant Design。现需建设一个面向使用者的**文档站**。

**已有资产**
- 发布包:`@vertm/core`、`@vertm/tokens`、`@vertm/styles`、`@vertm/icons`、`@vertm/react`、`@vertm/wasm`
- **~45 个 React 组件**(见 `packages/react/src/index.ts`),按 AntD 分组
- **core 能力**:文本规范化、检索归一化(O/U 歧义)、元音和谐、后缀表、竖排换行分段、光标映射、竖排光标导航、字体/竖排能力检测(见 `packages/core/src/index.ts`)
- **3 套主题**:default / dark / editorial(`@vertm/tokens`)
- 现成 demo:`packages/react-demo/src/App.tsx`(可抽取复用)
- 现有文档:`README.md`、`CONTRIBUTING.md`、`docs/browser-matrix.md`、`design/vertical-editorial/DESIGN-SPEC.md`
- CI:`.github/workflows/ci.yml`;仓库 GitHub `VertM/VertM-UI-React`

**目标**:交互式竖排组件文档站,含指南 / 组件 / 核心能力 / 主题,支持三主题与竖排⇄横排切换,部署到 GitHub Pages。

**特殊难点(必须解决)**
1. demo 区真实竖排渲染(`vertical-lr`)
2. 蒙古文字体加载与 fallback
3. 大量可交互 live demo + API 表格
4. 主题(default/dark/editorial)+ 书写模式切换

---

## 1. 技术栈

- **dumi 2**(umi/AntD 官方组件库文档方案)
- 语言:**中文单语**(zh-CN,后续可扩展)
- 组件文档**就近放置**:每个组件目录内建 `index.md`,dumi 通过 `resolve.atomDirs` 收录
- API 表格:dumi `apiParser`,从 TS 类型 + JSDoc **自动生成**

---

## 2. 信息架构(顶部导航)

```
指南 | 组件 | 核心能力 | 主题 | 更新日志 | GitHub

├─ 指南 Guide
│   ├─ 介绍(VertM 是什么 / 竖排理念)
│   ├─ 快速开始(安装 / 第一个竖排页面)
│   ├─ 设计原则(mlreq / CSS-native / Mirror Input)
│   ├─ 主题定制(createTheme / tokens / appearance)
│   ├─ 字体接入(registerFont / 字体检测 / fallback)
│   ├─ 国际化与书写模式
│   └─ 浏览器兼容矩阵(迁移 docs/browser-matrix.md)
│
├─ 组件 Components(按 AntD 分组)
│   ├─ 通用:Button / Icon / Typography
│   ├─ 布局:Layout / Grid / Flex / Space / Divider / Splitter
│   ├─ 导航:Menu / Tabs / Dropdown / Breadcrumb / Pagination / Steps / Anchor
│   ├─ 数据录入:Input / Select / Checkbox / Radio / Switch / Form / Segmented
│   ├─ 数据展示:Card / List / Descriptions / Tag / Avatar / Badge / Collapse / Timeline / Statistic / Tooltip / Popover
│   ├─ 反馈:Alert / Modal / Drawer / Popconfirm / Progress / Spin / Skeleton / Result / Empty
│   ├─ 反馈·命令式 API(单独成页, 见 §2.1):App(useApp) / message / notification / Modal.confirm
│   └─ 竖排专属:VertMText / VertMTextField / VertMList
│
├─ 核心能力 @vertm/core
│   ├─ 文本规范化 normalize
│   ├─ 检索归一化 normalizeForSearch
│   ├─ 元音和谐 vowel-harmony
│   ├─ 后缀与换行 suffix / line-break
│   ├─ 光标映射与竖排导航 caret
│   └─ 字体 / 竖排能力检测
│
├─ 主题 Theme
│   ├─ Design Tokens 总览
│   ├─ 竖排专属令牌(columnSize / columnGap)
│   └─ Editorial 外观
│
└─ 资源:更新日志 / 贡献指南 / 致谢
```

### 2.1 命令式 API 的文档落点(反馈修正)

`App.useApp()`、`Modal.confirm`、`message`、`notification` 是**命令式/全局 API**,不是普通组件,不能只在导航里写个组件名。处理如下:

- **`App`(useApp)单独成页**:讲清为什么命令式浮层读不到外层 `VertMConfigProvider`(主题/书写模式/locale),以及用 `App` 包裹 + `App.useApp()` 取实例的正确姿势(README 已有范例可迁移)。
- **`message` / `notification` 各自成页**:含 `useMessage` / `useNotification` hook 版与全局函数版,标注全局版不跟随主题的限制。
- **`Modal.confirm` 挂在 Modal 页内的独立小节**(命令式用法),与 `VertMModal` 组件式用法并列;`modal.confirm`/`useModal` 一并覆盖。
- 这些页统一强调:**推荐 `App.useApp()` 路径**以获得主题/竖排一致性。

---

## 3. 目录结构(就近放置)

```
packages/docs/                     # 新增 @vertm/docs 工作区
├─ package.json                    # 依赖 dumi + workspace 包
├─ .dumirc.ts                      # 导航/主题/多语言/base/alias/apiParser/atomDirs
├─ tsconfig.json
├─ docs/                           # 非组件文档(指南 / 核心 / 主题 / 首页)
│  ├─ index.md                     # 首页 Hero(竖排大标题 + 特性卡)
│  ├─ guide/*.md
│  ├─ core/*.md
│  └─ theme/*.md
├─ src/
│  ├─ components/
│  │  ├─ VertMDemoFrame.tsx        # 统一 demo 容器(见 §4)
│  │  └─ SiteControls.tsx          # 主题 + 书写模式切换器
│  └─ theme/                       # dumi 主题覆盖:注入 @vertm/styles + 字体 + 竖排容器
└─ public/fonts/                   # 蒙古文字体(如需自托管)

# 组件文档就近放在各组件目录(dumi atomDirs 收录):
packages/react/src/button/index.md
packages/react/src/input/index.md
packages/react/src/select/Select 等每个组件 index.md
...(文件夹型组件,约 40 个)
```

### 3.1 就近放置的落点约定(重要,反馈修正)

现实目录并非全是 `button/` 这种文件夹,分三类处理:

| 类型 | 例子 | 落点约定 |
|------|------|----------|
| **文件夹型组件**(主流) | `button/`、`input/`、`select/` … | 目录内 `index.md`,dumi `atomDirs` 自动收录 |
| **根目录单文件组件** | `VertMText.tsx`、`VertMTextField.tsx`(位于 `packages/react/src/` 根,**无同名文件夹**) | ✅ **已定:统一收进 `packages/react/src/_vertical/*.md`**(如 `_vertical/vertm-text.md`、`_vertical/vertm-text-field.md`)。**不为文档新建 `vertm-text/` 假组件目录**,避免污染源码树。`.dumirc.ts` 的 `atomDirs` 登记 `_vertical` 目录 |
| **跨包组件** | `Icon`(在 `@vertm/icons`,非 `@vertm/react`) | 就近放 `packages/icons/src/index.md`,并把该目录也登记进 `atomDirs` |

> `VertMList` 在 `list/` 文件夹内,按文件夹型处理。

**dumi 关键配置要点(`.dumirc.ts`)**
- `alias`:各 `@vertm/*` 指向对应 `packages/*/src`(消费源码,免每次 build)
- `resolve.atomDirs`:登记 `packages/react/src`、`packages/icons/src` **与 `packages/react/src/_vertical`** 为组件目录,自动收录其中的 `index.md` / `*.md`
- `apiParser` / `resolve.entryFile`:开启从 TS 类型 + JSDoc 生成 `<API>` 表格
- `base` / `publicPath`:设为 `/VertM-UI-React/`(GitHub Pages 子路径)
- `themeConfig.nav` + 侧边栏分组按 §2

---

## 4. 关键难点解决方案

1. **竖排 live demo**
   - 实现 `<VertMDemoFrame>`:内部套 `VertMConfigProvider` + `writing-mode: vertical-lr` 容器,并 `import '@vertm/styles/index.css'`
   - 通过 dumi 主题把所有 demo 默认包进该容器;或在各 demo 内显式引用

2. **主题 + 书写模式切换**
   - `<SiteControls>`:顶部放 default/dark/editorial 三态 + 竖排⇄横排切换,联动 `VertMConfigProvider` 的 `theme` / `appearance` 与容器 `writing-mode`
   - 用 React context 把当前选择广播给所有 demo

3. **字体**
   - 复用 `@vertm/styles/src/fonts` 现有字体,全局注入
   - 首屏用 `@vertm/core` 的 `isFontLoaded` / `detectMongolFonts` 做加载态,避免 fallback 方块

4. **API 表格自动生成**
   - 开启 dumi `apiParser`;**前置任务**:抽检并补齐各组件 props 的 **JSDoc 注释**(否则表格描述为空)——这是内容工作量大头
   - 组件 md 中用 `<API id="Button"></API>`(就近放时 dumi 自动关联同目录源码)

5. **消费源码而非产物**
   - dev/build 走 alias 到 `src`;CI 另跑一次全量 `npm run build` 保证发布产物可用

---

## 5. 分阶段实施(可作为 TODO)

### 阶段 0 — 脚手架 + 落实已定决策
- [x] 新增 `packages/docs` 工作区,接入 dumi 2
- [x] 配 `.dumirc.ts`:nav / 侧边栏 / zh-CN / base=`/VertM-UI-React/` / alias→各包 src / atomDirs / apiParser
- [x] 按 §3.1 登记 `_vertical` 落点(已定,不为单文件组件新建假目录)
- [x] dumi 主题注入 `@vertm/styles` + 字体 + 竖排容器
- [x] `npm run dev -w @vertm/docs` 跑通,首页 Hero 出竖排标题

**决策 A — `react-demo` 去向 ✅ 已定**
- 现状:`packages/react-demo/src/App.tsx` 是现成的大 demo 集合。
- **结论:文档站 = 唯一示例来源(single source of truth);`react-demo` 冻结为内部 playground**(不发布、只作本地联调),不再新增面向用户的示例。
- **迁移节奏**:随样板页/批量页推进**逐步抽取复用**,抽走的即从 react-demo 精简;**但不在早期强行删光**——样板页尚未盖全组件时,保留 react-demo 作本地联调兜底,避免联调断档。待文档站覆盖完整后再决定是否清空/移除。
- ⚠️ 阶段 0 就在本文件与 `CONTRIBUTING.md` 写明"新示例只进文档站",别留模糊地带。

**决策 B — 更新日志(Changelog)前提 ✅ 已定**
- 现状:仓库**尚无 changesets** 版本流,站内却计划有 Changelog 页。
- **结论:先用手工 `CHANGELOG.md`**(Keep a Changelog 格式),文档站直接渲染它;把导航里的"更新日志"接到该文件。
- 后续:发布节奏稳定后再引入 `@changesets/cli` 自动生成,替换手工文件。
- 阶段 0 若 `CHANGELOG.md` 尚未就绪:先**隐藏"更新日志"导航项**,不要放空页。

### 阶段 1 — 指南与核心能力
- [x] 迁移/改写 README、CONTRIBUTING、browser-matrix、DESIGN-SPEC 为指南页
- [x] 写 `@vertm/core` 六个能力页,各配可运行示例(如 `normalizeForSearch` 输入对比、`genderOfString` 判性)

### 阶段 2 — 组件文档(主体,**最大工作量**)

> ⚠️ 工作量提示:约 45 个 `index.md` + 全量补 JSDoc 才是真正的大头,不要低估。采用"**先定样板,再批量铺**"策略。

**2a. 先做 6 个样板页(定模板)**
- [x] 实现 `<VertMDemoFrame>` + `<SiteControls>`(主题/书写模式切换)
- [x] 挑 6 个代表性组件跑通完整形态:**Button / Input / Menu / Tabs / Form / VertMText**
  - 覆盖:基础组件、录入、导航、复杂表单、竖排专属 —— 足以定义模板与踩完坑
- [x] 沉淀"组件文档模板":概述 → live demo(3~6 个) → `<API>` 表格 → 注意事项/竖排提示
- [x] 评审模板通过后再进入 2b

**2b. 批量铺开(按 §7 清单)**
- [x] 按模板补齐其余全部组件 `index.md`
- [x] 命令式 API 页(App / message / notification / Modal.confirm,见 §2.1)
- [ ] 从 `react-demo/src/App.tsx` 抽取现成 demo 片段复用(与决策 A 一致:逐步抽取精简,早期不删光)
- [x] 全量补齐组件 props 的 JSDoc,使 API 表格有描述(可分组件并行)

### 阶段 3 — 主题与打磨
- [x] Design Tokens 可视化页(色板 / 间距 / 竖排令牌)
- [x] Editorial 外观页
- [ ] 首页特性区、暗色模式、移动端、无障碍与键盘轴说明 — 壳层待设计规范落地后打磨

> 迭代一已落地:全局切换器(见 `documentation-site-iteration-1.md`)、组件页模板对齐、Props 中文 JSDoc。

### 阶段 4 — 部署
- [x] 新增 `.github/workflows/docs.yml`:build 后发布 GitHub Pages(Pages Action)
- [x] 根 `package.json` 加 `docs` / `docs:build` 脚本
- [x] README 顶部加文档站链接/徽章

---

## 6. 验收标准

- [ ] `npm run docs` 本地启动,所有组件页含真实竖排 live demo
- [ ] 每个组件页有自动生成、**有描述**的 API 表格
- [ ] 三套主题 + 竖排/横排切换全站可用
- [ ] 蒙古文字体正确加载,无 fallback 方块
- [ ] CI 通过,GitHub Pages 可访问
- [ ] 指南覆盖:安装、主题、字体、兼容矩阵、设计原则

---

## 7. 组件清单(逐一建文档,勿遗漏)

**通用**:Button、Icon(`@vertm/icons`)、Typography
**布局**:Layout、Grid(Row/Col)、Flex、Space、Divider、Splitter
**导航**:Menu、Tabs、Dropdown、Breadcrumb、Pagination、Steps、Anchor
**数据录入**:Input(含 Search/TextArea)、Select(含 AutoComplete)、Checkbox、Radio、Switch、Form、Segmented
**数据展示**:Card、List、Descriptions、Tag(含 CheckableTag)、Avatar、Badge、Collapse、Timeline、Statistic、Tooltip、Popover
**反馈**:Alert、Modal、Drawer、Message、Notification、Popconfirm、Progress、Spin、Skeleton、Result、Empty、App
**竖排专属**:VertMText、VertMTextField(含 Bare)、VertMList

> 以 `packages/react/src/index.ts` 的导出为最终依据核对。

---

## 8. 注意事项

- 就近放置需建立约定:**改组件 props 必须同步更新同目录 `index.md`**;建议在 `CONTRIBUTING.md` 补一条,可选加 CI 校验。
- demo 代码统一走 `<VertMDemoFrame>`,避免各处重复注入 styles/主题。
- 若个别旧浏览器竖排渲染异常,参照 `docs/browser-matrix.md` 的 Mirror Input / WASM fallback 结论说明。

---

## 9. 设计交付物

样机源码（可微调）已落地：

- Hero：[`design/mockups/hero.html`](../design/mockups/hero.html) · 渲染图 [`design/mockups/renders/hero.png`](../design/mockups/renders/hero.png)
- DemoFrame + 文档壳对照：[`design/mockups/demo-frame.html`](../design/mockups/demo-frame.html) · [`design/mockups/renders/demo-frame.png`](../design/mockups/renders/demo-frame.png)

工程对齐要点：

1. **首页 Hero** — 左横排文案 + 右竖排蒙古文 showpiece（墨色 marker / 钴蓝 caret）
2. **文档壳** — dumi 顶栏 / 侧栏；全局切换器在顶栏搜索框左侧下拉（样机里的 sticky 分段条为早期方案，已收敛）
3. **`<VertMDemoFrame>`** — 虚线顶栏 + `writingMode` badge + 浅底 stage；editorial 时条带偏纸色
4. **Editorial 呈现** — 主题页 + `forceTheme="editorial"` 锁定对比

仍可后续打磨：移动端壳层、暗色文档壳、更完整的侧栏选中态与正文/demo 分界。

## 10. 结论与并行启动建议

- **工程规划**:已就绪;脚手架与组件文档覆盖已完成。
- **设计样机**:Hero / DemoFrame 已有可复用源码(`design/mockups/`),文档站首页与 DemoFrame chrome 已对齐;切换器采用顶栏下拉而非样机 sticky 条。
- **后续**:移动端壳层、暗色文档壳、视觉回归 fixture 可继续迭代。
