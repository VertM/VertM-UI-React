# VertM UI 文档站 · 实现交接包

> 交接时间：2026-10-10
> 交接对象：接手实现的设计/前端 agent
> 仓库：`~/Code/Web/mongol-text-component`

> **2026-10-10 校正（以本段为准）**：本交接包初版有几处事实错误，已逐条修正：
> 1. 组件详情页**不是**"一个都没有"——已有 46 页，由 dumi `atomDirs` 从 `packages/react/src/*/index.md` 生成（见 2.3）。
> 2. 设计稿 03 的 Button API 表是编造的，`verticalMarker` 属性不存在，`type` 取值也不对（见 3.1）。
> 3. logo **尚未定案，暂缓**：设计稿 SVG 实际是 88 : 120 : 56，并非文字所说的递增（见第五节）。
> 4. 金标位置已定案：**横排 chrome 也统一放右缘**（见 4.3）。
> 5. Pagination 标本的数字原为阿拉伯-印度数字，源码本身写错了，已修正（见 7.1）。
> 6. `@vertm/styles` 依赖问题从 P0 降为 P1（见第六节）。
> 7. Input 的键盘行为写反了：caret 用 ↑↓，不是 ←→（见 3.2）。

---

## 一、先读这三条（避免重复踩坑）

### 1.1 一切以代码为准，不要以文档为准

`docs/design/brand.md` 此前整份过期（四项全错：主色 / 字体 / 包名 / logo），
**已于 2026-10-10 全面校正**，现在可正常参考。但新增约定仍建议写进代码注释，
不要只留在文档里。

另注意仓库有**两套令牌**，用途不同，不要混用：

| | 产品 | 文档站 chrome |
|---|---|---|
| 变量 | `--vertm-*` | `--vm-*` |
| 类名 | `vertm-*` | `vm-*` |
| 定义位置 | `@vertm/styles` / `@vertm/tokens` | `docs/.../site-tokens.css` |

`--vm-sky`（`#0e2f74`）即产品 `cobaltTheme.colorPrimary` 的放大用法。
**chrome 不覆盖 demo 内部样式。**


### 1.2 蒙文内容必须从源码取，不能自己拼

之前总览页的蒙文词我曾凭语义自造，7 处全错。真实值在
`packages/docs/src/components/ComponentsOverview.tsx`。

**改动任何页面前，先读对应源码文件。**

但源码也会错：Pagination 标本在源码里就用了阿拉伯-印度数字（见 7.1）。
照抄源码之后，仍要核对字符本身是不是蒙古文区块（U+1800–U+18AF）。

### 1.3 `packages/docs/src/components/` 与 `.dumi/theme/builtins/` 是同一套东西

dumi 的主题槽位机制让两处路径指向同一批组件。改组件时注意别只改一处。

---

## 二、当前实现状态

### 2.1 已完成（有源码，可直接跑）

| 模块 | 路径 | 状态 |
|---|---|---|
| 站点令牌 | `src/layouts/site-tokens.css` | ✅ 完整，与设计稿一致 |
| 站点样式 | `src/layouts/site.css` | ✅ 完整，1794 行，16 个章节 |
| └ 组件文档页样式 | `site.css` §3 §4 §7 §8 §9 | ✅ **已写好，等页面来用** |
| 组件总览 | `src/components/ComponentsOverview.tsx` | ✅ 4 组 × 5 瓦片 |
| 站点控制菜单 | `src/components/SiteControls.tsx` | ✅ 9 主题 + 2 书写模式 |
| 主题画廊 | `src/components/ThemeGallery.tsx` | ✅ |
| Demo 容器 | `src/components/VertMDemoFrame.tsx` | ✅ |
| 站点上下文 | `src/components/SiteContext.tsx` | ✅ |
| 搜索槽位 | `.dumi/theme/slots/SearchBar/index.tsx` | ✅ |
| Logo 槽位 | `.dumi/theme/slots/Logo/index.tsx` | ⚠️ 纯文字，未用 logo.svg |
| 组件详情页 | `packages/react/src/*/index.md`（46 页）+ `packages/icons/src/icon.md` | ✅ 已有内容，⚠️ 未按设计稿 03 统一，且缺「键盘」小节 |


### 2.2 已有内容页

```
docs/index.md                 首页
docs/components/index.md      组件总览
docs/theme/index.md           主题
docs/theme/tokens.md          令牌
docs/theme/editorial.md       editorial 主题
docs/theme/vertical-tokens.md 竖排令牌
docs/guide/*.md  × 10         入门/ 字体 / 无障碍 / 迁移 / 设计规范等
docs/core/*.md    × 7         core 能力文档
docs/changelog.md
```

### 2.3 组件详情页：已存在，但需要按模板统一

> 初版此处写的是"组件详情页一个都没有，瓦片点进去全部 404"，**这是错的**。
> 当时只看了 `packages/docs/docs/components/`，漏了 dumi 的 `atomDirs`。

`packages/docs/.dumirc.ts` 配置了：

```ts
atomDirs: [
  { type: 'component', dir: '../react/src' },
  { type: 'component', dir: '../react/src/_vertical' },
  { type: 'component', dir: '../icons/src' },
],
```

因此组件页的源文件是 **`packages/react/src/<组件目录>/index.md`**（Icon 是
`packages/icons/src/icon.md`），共 46 页，构建后路由为 `/components/<name>`。
总览页 20 个瓦片的 `href` 全部能打开。

现有页面已经相当完整，结构为：

```
# 组件名
## 何时使用
## 基本用法 → 若干能力小节（各带 demo）
## 竖排提示
## API
## 主题变量
```

分组写在 frontmatter 的 `group.title`（通用 / 数据录入 / 导航 / 反馈 …），与总览页一致。

**真正的缺口**：

1. 46 页中没有一页有「键盘」小节（见 3.2）。
2. 视觉上尚未对齐设计稿 03（页头蒙文侧标、DemoFrame chrome、API 表样式等）。
3. 设计稿 03 的部分内容与实际代码不符，不能照搬（见 3.1）。

**不要新建 `packages/docs/docs/components/button.md` 之类的文件**，会和
`atomDirs` 生成的路由冲突。直接改 `packages/react/src/<组件>/index.md`。

---

## 三、设计稿对应关系

设计稿在 `docs/document-site/design/pages/`，共四张。

| 设计稿 | 对应实现 | 差异 |
|---|---|---|
| `01-首页.png` | `docs/index.md` + `site.css` | 设计稿含 antd 式的组件实物陈列区（三件真实组件 + 生态链接卡），**当前实现没有**，需确认是否要加 |
| `02-组件总览.png` | `ComponentsOverview.tsx` | ✅ 已对齐 |
| `03-组件文档页.png` | `packages/react/src/*/index.md` + dumi 默认三栏布局 + `site.css` | 页面已有，需按稿统一视觉；稿内 API 表与侧栏分组有误（见 3.1） |
| `04-主题页.png` | `ThemeGallery.tsx` + `theme/*.md` | 需核对差异；稿内语义色卡片有复制粘贴错误（见 3.3） |

### 3.1 组件文档页的设计规格（03-组件文档页.png）

好消息：**样式层已经准备好了**。`site.css` 的章节划分：

```
 §1 Body / canvas        §9  DemoFrame chrome only
 §2 Header               §11 Site hero
 §3 Sidebar              §12 Theme page
 §4 TOC                  §13 Overview
 §5 Content / article    §14 Mobile
 §6 Code blocks          §15 Focus-visible
 §7 API tables           §16 prefers-reduced-motion
 §8 Admonition / note
```

即 **§3 Sidebar + §4 TOC + §7 API tables + §8 Admonition + §9 DemoFrame
五节都是为组件文档页写的**，并且已经作用在现有的 46 个组件页上
（它们覆盖的是 dumi 默认主题的类名，如 `.dumi-default-sidebar`、`.dumi-default-toc`）。

所以这项工作的范围是**按设计稿统一现有页面 + 补「键盘」小节**，
不是新建页面，也不是从零写样式。

页面规格：

- **三栏**：左导航（236px，分组 + 当前项带 3px 金标）/ 正文（自适应）/ 右 TOC（208px）
- **页头**：面包屑 → 标题行（H1 + 蒙文侧标，金色 `#c68f34`，竖排）
- **导语**：一句话说明，max-width 约 620px
- **DemoFrame**：圆角 10px，头部 44px（灰点组 + 文件名 + 主题切换 chip），
  舞台区 220px，底部代码折叠条
- **何时使用**：带金标的提示块，底色 `#fbf4e6`（对应 §8 Admonition）
- **API 表**：属性（mono，`#c68f34`）/ 类型（mono，`#3f7ce0`）/ 默认值 / 说明（对应 §7）
- **右 TOC**：当前锚点带金标（对应 §4）
- 金标一律在**右缘**，见 4.3

**开工前先读 `site.css` 的 §3 §4 §7 §8 §9 五节**，类名以那里的实际命名为准，
不要按设计稿猜。

#### 设计稿 03 中不能照搬的地方

| 稿内内容 | 实际情况 | 怎么做 |
|---|---|---|
| Button API：`type` 为 `'default' \| 'primary' \| 'danger' \| 'ghost'` | 实际为 `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'`；`danger` 是独立的布尔属性 | API 表一律由 dumi 从组件类型生成，不手写 |
| Button API：`verticalMarker` 属性 | **代码里不存在** | 删除 |
| 左导航分组：通用 / 表单与选择 / 导航与布局 | 分组来自各页 frontmatter 的 `group.title`：通用 / 数据录入 / 导航 / 反馈 …，与总览页一致 | 以 frontmatter 为准 |
| 右 TOC：何时使用 / 示例 / 列式几何 / API / 主题变量 / 无障碍 | 缺「键盘」；且现有页面的章节是 何时使用 / 基本用法 … / 竖排提示 / API / 主题变量 | 以现有章节为准，在「竖排提示」与「API」之间插入「键盘」 |
| API 表列序：属性 / 类型 / 默认值 / 说明 | dumi 默认列序为 属性 / 说明 / 类型 / 默认值（`site.css` §7 已按此写样式） | 接受 dumi 列序，或改 `.dumi/theme` 的 API 组件，二选一，不要只改 CSS |
| 左导航灰底只到页面一半高 | 稿内排版问题 | 侧栏底色铺满视口高度 |
| 侧栏当前项、TOC 当前锚点、提示块的金标在左边 | 与 4.3 的决定不符 | 改到右缘，见 4.3 |

### 3.2 组件文档页必须包含「键盘」小节

**这是竖排组件库最容易遗漏、也最重要的信息。**
竖排下键盘行为与横排直觉相反：

| 组件 | ↑↓ | ←→ | 其他 |
|---|---|---|---|
| Select（关闭时） | ↓ 打开 | 竖排时 → 打开 | Enter 打开 |
| Select（打开时） | 上下移动高亮项 | 竖排：→ 确认、← 上一项；横排：→ 下一项、← 上一项 | Enter 确认，Esc 关闭 |
| Menu | 走同级 | → 进子菜单 / ← 回退到父级 | Enter / 空格 选中或展开 |
| Tabs | 仅当横排且标签栏在左右两侧时，用于切换 | 竖排时始终用于切换；横排且标签栏在上下时也用于切换 | Home / End 跳到首尾，Enter / 空格 激活 |
| Input（单行） | ↑↓ 在列内移动光标，Shift 扩选 | — | Enter 触发 `onPressEnter` |
| TextArea（多行） | 浏览器原生行为 | 浏览器原生行为 | — |

**唯一可信来源是 `packages/core/src/interaction/keymap.ts`**（0.2.0 起键盘契约已下沉到 core），
其次是 `docs/component-design-spec.md` §3.1，以及
`packages/react/src/menu/EditorialKeyboard.test.tsx`。写文档前先读 `keymap.ts`。

**目前 46 个组件页都没有这一节。** 位置固定在「竖排提示」之后、「API」之前。
没有自定义键盘行为的组件（如 Button、Checkbox），写一句"使用浏览器原生的 Tab / Enter / 空格 行为"即可，不要省略这一节。

### 3.3 设计稿 04（主题页）的已知错误

- 语义色角色卡第 6 张标为 Link，色值却是主色 `#0e2f74`，说明文字也照抄了"主色"。
- 6 张卡片的说明文字全部是"主按钮、选中态、caret"，是复制粘贴遗留。

实现时以 `packages/tokens/src/cobalt-theme.ts` 等主题文件的实际字段为准，每个角色写自己的用途。

---

## 四、设计系统要点

### 4.1 色彩（全部对应 `--vm-*` 令牌，不要新增变量）

| 角色 | 令牌 | 值 |
|---|---|---|
| 门面 | `--vm-sky` | `#0e2f74` |
| 深底 | `--vm-night` | `#071a3f` |
| 强调 | `--vm-azure` / `--vm-sky-2` | `#3f7ce0` / `#16408f` |
| 链接 | — | `#2155d6` |
| 点睛（唯一暖色） | `--vm-gilt` / `--vm-gilt-deep` | `#e0aa4e` / `#c68f34` |
| 画布 / 面板 | `--vm-canvas` / `--vm-panel` | `#eef0f4` / `#ffffff` |
| 次级面 | `--vm-panel-2` | `#f6f7f9` |
| 文字 | `--vm-text` / `--vm-muted` | `#1e2740` / `#5b6478` |
| 线 | `--vm-line` / `--vm-line-soft` | `#dde1ea` / `#e8ebf1` |

语义色（来自 `cobaltTheme`）：
成功 `#247a55` / 警告 `#d97706` / 错误 `#d84a32` / 信息 `#3f7ce0`

### 4.2 字体

```
--vm-disp: 'Sora'                        拉丁标题
--vm-cjk:  'PingFang SC', 'Noto Sans SC' 中文
--vm-mong: 'Noto Sans Mongolian'         蒙古文
--vm-mono: 'JetBrains Mono'代码与标注
```

### 4.3 贯穿全站的设计元素：列缘标记

选中态统一用 **右缘 3px 金标**。

来源是组件的「列缘状态」原则：vertical-lr 下内容自上而下推进，新列在右侧
生长，block-end 就是右缘，因此选中标记落在右缘。同一根金标贯穿：

```
logo 金点 → 按钮选中态 → 总览瓦片脚注 → 左栏当前项 → 右 TOC 当前锚点 → 提示块
```

**2026-10-10 决定：横排的文档站 chrome 也统一放右缘。**
横排下 block-end 其实是下边，这里不按逻辑轴走，而是有意让 chrome 也"说竖排的话"：
金标永远在右，是 VertM 的识别特征。

需要改的现有样式（`packages/docs/src/layouts/site.css`）：

| 位置 | 现状 | 改为 |
|---|---|---|
| §3 侧栏 `.dumi-default-sidebar a.active::before`（约第 302 行） | `left: 0`，圆角 `0 2px 2px 0` | `right: 0`，圆角 `2px 0 0 2px` |
| §4 TOC `.dumi-default-toc a.active`（约第 348 行） | `border-left-color` | 改用右边框；非激活项的透明边框也要移到右侧，避免文字跳动 |
| §8 提示块（约第 582 行） | `border-left: 3px solid` | `border-right: 3px solid` |

**新增任何组件或 chrome 元素时，选中标记都放在右缘**，否则与全站脱节。

### 4.4 竖排排版规则

- 组件按**逻辑轴**布局，键盘方向键也按逻辑轴对齐
- 蒙文竖排用 `writing-mode: vertical-lr`，**不靠transform 旋转**
- 文本方向：内容自上而下推进，新列自左侧向右生长
- 浮层（Select/DatePicker 等）自 block-end（右侧）展开
- 输入交互用 Mirror Input 模式

---

## 五、logo：尚未定案，暂缓

> 2026-10-10：logo 暂不处理，本节只记录现状与候选方案。**定案前不要改任何 logo 资产。**

⚠️ **仓库里已有三套不同的几何并存**，需收敛成一套。

| 来源 | 实际形态 |
|---|---|
| `packages/docs/public/logo.svg` | 三柱**递减** 36:28:20（左高右低）+ 钴蓝点**居中**顶部，底 `#171a18` 墨色 |
| `packages/icons` 的 `vertMIconDef` | **两根方柱**（`M8 3v18h2V3H8zm6 0v18h2V3h-2z`） |
| `docs/document-site/design/logo/*.svg` | 三柱 **88:120:56**（中间最高、右边最低，**并不是**递增）+ 鎏金点偏右上，底 `#0e2f74`；favicon 为 16:26:10，`favicon-16.svg` 的注释甚至写着"三根递减柱" |

旧版设计说明称设计稿是"递增"，与 SVG 实际坐标不符。

**候选方案（未定）：真正的递增 56:88:120**

- 左低右高，三柱底部对齐；最右、最高的那根用钴蓝 `#2155D6`，其余两根用墨蓝 `#0E2F74`
- 鎏金点保留在右上角，对应 4.3 的列缘金标
- 理由：递增对应"新列在右侧生长"，与 vertical-lr 的推进方向一致

若采用此方案，`logo-vertm*.svg`、`favicon-64/32/16.svg`、`05-标志规范.png`
都要按新比例重画（favicon 各档按同一比例取整）。无论最终选哪套，定案后都要同步到：

- `packages/docs/public/logo.svg`（以及构建产物 `dist/logo.svg`）
- `packages/icons` 的 `vertMIconDef`
- `.dumi/theme/slots/Logo/`：现在这个槽位只渲染文字 "VertM UI"，
  **根本没用到 logo.svg**，要改成图形 + 文字的锁定组合

---

## 六、待办清单

### P0 — 影响发布与安装

- [ ] **46 个组件页补「键盘」小节 + 按设计稿 03 统一视觉**
      编辑 `packages/react/src/<组件>/index.md`（Icon 是 `packages/icons/src/icon.md`），
      键盘内容见 3.2，不照搬稿内 API，见 3.1
- [x] ~~文档站金标统一移到右缘~~ ✅ 2026-10-10 已改（`site.css` 侧栏、TOC、提示块三处）
- [x] ~~修正总览页 Pagination 标本的数字~~ ✅ 2026-10-10 已改为蒙古数字 `᠑ ᠒ ᠓`

- [x] ~~`@vertm/wasm` 未声明 `harfbuzzjs`~~ ✅ **2026-10-10 复核：判断有误**
      实际已正确声明在 `optionalDependencies: { "harfbuzzjs": "^0.4.4" }`。
      装 `@vertm/wasm` 时会顺带安装，不装则 shaper 优雅降级——
      这正是可选依赖该有的写法，无需改动。

### P1 — 影响可信度

- [ ] **`@vertm/react` 是否把 `@vertm/styles` 列为依赖**（原列为 P0，2026-10-10 降级）
      现状：`dependencies` 只有 `@vertm/core`、`@vertm/icons`、`@vertm/tokens`
      说明：即使加了依赖，用户仍要手动 `import '@vertm/styles/...css'` 才有样式，
      加依赖只省掉一次 `npm install`，并不能解决"忘记引 CSS 就没样式"。
      快速上手页已写明安装与引入步骤，因此不阻塞发布。
      建议：要么加进 `dependencies`，要么在 react 的 README 顶部醒目提示，二选一
- [x] ~~更新过期的 `docs/design/brand.md`~~ ✅ **2026-10-10 已校正**
- [ ] logo 三套几何收敛为一套（暂缓，见第五节）
- [ ] 组件文档页与主题页的蒙文词核对
      （总览页已照源码改对，**文档页与主题页尚未核对**）
- [ ] 无视觉回归测试——列缘标记跑错边、caret 偏移这类问题不会让单测失败，
      只会悄悄变丑
- [ ] `CHANGELOG.md` 缺面向使用者的迁移提示；
      跨包版本不齐（core/icons/react 已 0.2.0，styles/tokens/wasm 仍 0.1.0）
      需说明哪些包变了

### 已核实，无需处理

- `harfbuzzjs` 已正确声明在 `optionalDependencies`（**查依赖时别漏这个字段**，
  我此前误判过一次）
- 文档站令牌 `site-tokens.css` 与本设计完全一致，未新增变量
- `cobaltTheme.colorPrimary = #0e2f74` 与 `--vm-sky` 同值，chrome 与组件不冲突
- 组件文档页样式已备好（`site.css` §3 §4 §7 §8 §9 五节）
- 仓库已发布至 0.2.0，`@vertm/core` 已抽出共享工具与 Form/Select store


---

## 七、已知踩坑（别再踩）

### 7.1 蒙文

- **不要自造蒙文**。所有蒙文词从 `ComponentsOverview.tsx` 等源码取，
  但源码也会错：取用前确认字符都在 U+1800–U+18AF 区段内。
  已知错误：Pagination 标本用了阿拉伯-印度数字 `١٢٣`，应为 `᠑᠒᠓`
- 代码里竖排蒙文**只用 `writing-mode: vertical-lr`**（见 4.4），不要用 transform 旋转
- 在不支持 `writing-mode` 的设计工具里画稿时，才用"整词旋转 90°"模拟，
  不能逐字堆叠（看起来像散架）
- Ardot/画布类工具里，旋转文字的 `width` 是**旋转前的布局尺寸**，
  给窄了会折行成多行

### 7.2 `.m-rows` 多列标本

总览页的多列标本是 **flex 容器（`horizontal-tb`）+ 子元素各自 `vertical-lr`**，
不是单个竖排列。金标挂在**带 `.s` 的那一列**右侧——所以 Steps 的金标在第二列
（因为它的 `.s` 是 ᠬᠣᠶᠠᠷ），Menu/Tabs/Form/Checkbox 在第一列。这个细节要跟
`.s` 走，不能照抄位置。

### 7.3 画布工具（Ardot）

- 改可复用主组件会影响所有实例；改完必须**单独截一个实例**验证，
  整页截图会掩盖容器撑破的问题
- 给主组件设固定 width 会让实例里的 `fill_container` 被固化成该值
- `hug_contents` 高度依赖子元素贡献，旋转 90° 的文字在 flex 里不贡献高度

---

## 八、文件索引

```
docs/document-site/
├── handoff/← 本文件
└── design/
    ├── README.md               设计决策、色彩令牌、缩放规则
    ├── 仓库缺口清单.md          完整版缺口清单（本文件第六节的详版）
    ├── logo/                    ← logo 暂缓，定案前勿用（见第五节）
    │   ├── 05-标志规范.png      锁定组合 / 缩放四档 / 三版本
    │   ├── logo-vertm.svg       主标志
    │   ├── logo-vertm-reverse.svg
    │   ├── logo-vertm-mono.svg
    │   └── favicon-64/32/16.svg
    └── pages/
        ├── 01-首页.png           ← 分辨率过低（约 500px 宽），需高清重导
        ├── 02-组件总览.png
        ├── 03-组件文档页.png     ← 页面已存在（46 页），稿内有错误，见 3.1
        └── 04-主题页.png         ← 语义色卡片有错误，见 3.3
```
