# VertM UI 组件表现设计规范(对照 Ant Design)

> 定义组件的**视觉与交互表现**,覆盖 `appearance="default"` 与 `appearance="editorial"` 两套外观。
> 与 `design/vertical-editorial/DESIGN-SPEC.md`(editorial 原型参考)互补:那份是 editorial 原型的像素级参考,本份是**面向全库、对照 antd 的统一表现规范**。
> 令牌以 `packages/tokens/src/default-theme.ts` 为准。

---

## 1. 定位:antd 是 checklist,不是视觉源

- **借用 antd 的**:组件覆盖面、状态完整度(default/hover/focus/selected/disabled/error/loading)、无障碍、API 命名。
- **不借用 antd 的**:横排轮廓、视觉皮肤、把控件当"横条"的几何。
- **VertM 的表现源**:传统蒙古文竖排(`vertical-lr`,行内 top→bottom,块 left→right)。**一切方向先用逻辑轴表达,再映射物理方向**。

---

## 2. 两套外观总览

| 维度 | `default`(通用中性) | `editorial`(列式书卷) |
|------|----------------------|------------------------|
| 主色填充 | 品牌蓝 `colorPrimary #1266d9` | 墨色 `colorPrimary #171a18`;钴蓝 `#2155d6` **仅用于链接与 caret** |
| 选中/焦点 marker | 边框加强 + 3px marker(可用 primary) | **3px marker 为主(墨色)**,背景填充为辅;钴蓝**不**用于 marker |
| 底色 | 近白 `#faf9f7` / 容器纯白 | 纸色 `#f3f1ea` / 表面 `#fbfaf6` |
| 圆角 | `borderRadius 6`(SM4/LG8) | `borderRadius 3`(SM2/LG4,更硬朗) |
| 气质 | 干净、接近现代 UI | 书卷、克制、结构化 |
| 文本列宽 `columnSize` | `32`(gap `16`) | `40`(gap `12`) |

> 两套共用同一套**方向契约、状态语言、键盘轴**(见 §3),只在颜色/填充/圆角/密度上不同。

---

## 3. 全局设计语言(对照 antd)

### 3.1 方向契约与键盘轴(全库强制)
| 逻辑语义 | `vertical-lr` 物理映射 | 键盘 |
|---|---|---|
| inline-start / end | 上 / 下 | ↑ 上一字符/项 · ↓ 下一字符/项 |
| block-start / end | 左 / 右 | ← 上一列/层级 · → 下一列/层级 |

- **同级移动用 ↑↓,进出层级/切列用 ←→**。例:Menu 同级 ↑↓、进子菜单 →、返回 ←;Tabs 始终 ←→(平级列);Select 选项 ↑↓、确认并前进 →。
- 生产代码**必须用逻辑属性**(`padding-inline`、`border-block-end`、`inset-block-end`…),禁止硬编码物理方向。
- **对照 antd 的最大差异**:antd 一切横向展开(下拉向下、Tabs 横向、Steps 横向)。VertM 一切**列式**——弹层/子级/校验信息**向 block-end(右)展开**。

### 3.2 尺寸体系(竖排语义翻转)
antd 用"高度"描述控件(small 24 / middle 32 / large 40)。竖排下**控件的关键尺寸是"宽度(block size)"+ 列深(inline depth)**。需区分两个概念:

- **文本列宽 = 主题 token `vertical.columnSize`**(每套主题一个值):**default 32 · editorial 40**;列距 `columnGap` default 16 / editorial 12。
- **控件壳宽(shell block size)= 参考刻度**(来自 `design/vertical-editorial` 原型,非主题 token,实现时以 CSS 变量落地):

| size | 控件壳宽 · default | 控件壳宽 · editorial |
|------|----|----|
| small | 24 | 40 |
| middle | 32 | 48 |
| large | 40 | 56 |

> 以上 40/48/56 是 editorial 原型的控件壳刻度,**不是** `columnSize`;`columnSize` 仅决定文本列宽(default 32 / editorial 40)。两者勿混。

- **文本层与几何壳分离**:承载 `writing-mode` 的节点上**不要放 flex/grid**(会翻转 flex 轴、把文字顶到边缘);flex/grid 用外层壳。
- 触控目标:即使可见控件 16–18px,交互列**不小于 40px**。

### 3.3 色彩
- 语义色沿用 token:success `#16a34a` / warning `#d97706` / error `#dc2626`。
- **default**:primary 蓝填充,链接=primary。
- **editorial**:primary=墨色 `#171a18` 填充;**选中/焦点 marker 也用墨色**;钴蓝 `#2155d6` **只**用于链接与 caret(`caretColor #2155d6`);朱红 `#d84a32`=错误,绿 `#247a55`=成功文字。
- **色彩永不作为唯一状态信号**(见 §3.5)。

### 3.4 间距 / 圆角 / 阴影
- 间距走 `paddingXS..LG`(8/12/16/24),列间距用 `vertical.columnGap 16`。
- 圆角:default 6(SM4/LG8);editorial 3。
- 阴影:default 用 `boxShadow` 轻投影托起浮层;editorial **尽量无阴影**,靠边框与留白。

### 3.5 状态语言(全库统一,对照 antd 的完整度)
| 状态 | 表现 |
|---|---|
| default | 中性边框 + 表面色 |
| hover | 边框加强(不位移) |
| focus / selected | **block-end 3px marker** + 边框加强(editorial 用**墨色** marker;default 可用 primary。钴蓝不用于 marker) |
| error | error 色边框 + block-end 错误信息 |
| success | 文字级确认,**不整体填充** |
| disabled | 禁用中性色,无阴影、无位移 |
| loading | inline-end 处 spinner,禁用点击 |

> marker 位置、边框强度、原生控件态、label、ARIA 与色彩**共同**表达状态。

### 3.6 动效
- 边缘 marker 显隐:140–160ms。
- 浮层:160–200ms,**从 block-start 向 block-end 进入**(即向右展开),而非 antd 的向下滑落。
- 控件内无循环动画;尊重 `prefers-reduced-motion`。

### 3.7 图标方向(@vertm/icons)
- 方向类图标(箭头/展开/chevron)**竖排下自动旋转**,指向逻辑方向;非方向图标(搜索/关闭)不旋转。
- 例:Select/Collapse 的展开箭头指向 block-end(右);"下一页"指向 inline-end(下)或 block-end,按语义定。

### 3.8 混排完整性
- `text-orientation: mixed`:拉丁文/数字/快捷键/代码保持可读,**不旋转整页**;`writing-mode` 只施加于**承载文字的组件层**。

---

## 4. 分组件表现规范(对照 antd)

> 每条给出:**antd 基线 → VertM 视觉 → VertM 交互/键盘**。仅列与 antd 有差异或需明确的点。

### 通用
- **Button**:antd 横条按钮。VertM 竖列:文字 top→bottom,前置图标在 inline-start(上),loading 在 inline-end(下);hover/focus 显 block-end marker;default primary 蓝填充,editorial 墨填充;多行标签按 `columnDepth` 限列深后换列。**禁止**在带 `writing-mode` 的节点上加 flex。
- **Icon**:见 §3.7,方向图标自动旋转。
- **Typography**:Title/Text/Paragraph/Link 竖排;标题字号走 `fontSizeHeading*`;省略号(ellipsis)沿 inline 轴截断;Link 用 link 色。

### 布局
- **Layout**:Header/Footer 对应 block-start/end(左/右侧栏概念);Sider 是一条 block 轴上的列容器。
- **Grid / Flex / Space**:主轴默认沿 block(left→right)排列子项;`Space` 的间距用 token;注意壳层用 flex,文字层独立。
- **Divider**:横排是水平线;竖排为**垂直分隔线**(沿 inline 轴),带文字时文字竖排居中。
- **Splitter**:分割条沿 block 轴拖拽(左右分栏)。

### 导航
- **Menu**:antd 纵向下拉/横向菜单。VertM 根项为**从左到右的列**;当前项用 block-end marker(非整块填充);**子菜单向右展开**并与父边缘视觉相连;键盘 ↑↓ 同级、→ 进子菜单、← 返回。
- **Tabs**:标签为**左→右平级列**,激活 marker 在标签 block-end 边;内容在标签列 block-end 侧;键盘**恒用 ←→**(平级列),不因字形朝下就用 ↓。
- **Dropdown**:触发后浮层向 block-end(右)展开,进入动效从左向右。
- **Breadcrumb**:分隔符沿 block 轴;层级从左向右递进。
- **Pagination**:页码沿 block 轴排列;"上一页/下一页"图标按逻辑方向旋转。
- **Steps**:antd 横向流程。VertM **沿 block 轴左→右**推进(或可配 inline 纵向);当前步用 marker;连接线走 block 轴。
- **Anchor**:锚点列表沿 inline 轴(上下),高亮当前用 marker。

### 数据录入
- **Input / TextArea / Search**:采用 **Mirror Input** 架构(隐藏原生 input + 视觉层 + caret overlay,解决竖排 textarea 的浏览器 Gap)。单列宽 default 从 ~32、editorial 56 起;多列向 block-end 扩展至 `maxColumns` 后沿 block 轴滚动;caret 用 ↑↓ 在列内移动;label 在 block-start,计数/help/error 在 block-end;focus=边框加强 + block-end marker。
- **Select / AutoComplete**:触发器为竖列;**弹层向 block-end(右上)展开**,选项是相邻竖列组成的一个横向列表;↑↓ 遍历阅读序,→ 在表单流中可确认并前进;选中用 **marker**(editorial 墨色);仅 `default` 外观可叠加低对比 primary 底,**editorial 不加钴蓝/彩色底**。
- **Checkbox / Radio**:原生控件置于 inline-start(视觉在 label 上方),label 竖排;选项组沿 block 轴左→右;保持 ≥40px 交互列。
- **Switch**:开关轨道沿 inline 轴(上下切换态),状态色 + 位置双信号。
- **Form**:字段是**block 轴序列的列**;label 在字段 block-start;help/校验在 block-end;主操作在末字段之后的 form block-end;窄视口在表单视口内约束横向推进,**不旋转整页、不缩字号到不可读**。
- **Segmented**:分段项沿 block 轴排列,选中项用填充/marker。

### 数据展示
- **Card**:标题在 block-start,内容竖排;`actions` 沿 block-end;Grid/Meta 用壳层布局。
- **List**:列表项沿 inline 轴(上下)堆叠或 grid;分割线沿 inline 轴。
- **Descriptions**:label/值成对,沿 block 轴分组;竖排读序 top→bottom。
- **Table(暂缺,见 roadmap)**:竖排行列语义需独立立项,本规范暂不定。
- **Tag / CheckableTag**:竖排小列,预设色;可关闭图标在 inline-end。
- **Avatar / Badge**:Avatar 形状不变;Badge 数字/圆点定位用逻辑角(block-end / inline-start)。
- **Collapse**:面板沿 inline 轴堆叠;展开箭头指向 block-end,展开内容向 inline-end 展开。
- **Timeline**:时间轴走 **inline 轴(上下)**,节点在轴一侧,内容在另一侧。
- **Statistic**:数值(拉丁/数字保持可读)+ 竖排标题;Countdown 同。
- **Tooltip / Popover**:默认 placement 走逻辑方位;竖排下优先 block-end 展开;箭头指向触发元素。

### 反馈
- **Alert**:图标在 inline-start,文案竖排;类型色边/底;可关闭在 inline-end。
- **Modal**:居中浮层;标题 block-start,footer 按钮沿 block-end;`Modal.confirm` 命令式同款;确认按钮支持 Promise loading。
- **Drawer**:从 block-start 或 block-end 侧滑入(左/右),而非 antd 常见的右侧;placement 用逻辑值。
- **Message / Notification**:轻提示;Notification 的 placement 用逻辑方位(如 block-end/inline-start),进入动效沿列方向。
- **Popconfirm**:气泡向 block-end 展开,确认/取消沿 block-end。
- **Progress**:线形进度**沿 inline 轴(上下)填充**;环形不变,文字可读。
- **Spin / Skeleton**:Spin 图标在容器居中,遮罩不旋转文字;Skeleton 占位块按竖排文本列方向排布。
- **Result / Empty**:图标 + 竖排文案 + 操作,沿 inline 轴堆叠。
- **App**:命令式宿主,保证 message/notification/modal 跟随当前主题/书写模式/locale。

### 竖排专属
- **VertMText**:竖排文本渲染核心;`columnDepth` 控列深,超出换列;`columnGap` 控列距;支持混排。
- **VertMTextField**:Mirror Input 竖排编辑器;caret overlay + ↑↓ 导航;是 Input/TextArea 的底层。
- **VertMList**:竖排列表/网格骨架,供 List/Select 等复用。

---

## 5. 交付与验收

- **视觉回归 fixture**:每个组件至少覆盖 default/hover/focus/selected/disabled/error(可加 loading),× default/editorial 两外观,× 竖排/横排。
- **键盘轴测试**:每个交互组件覆盖 inline 轴(↑↓)与 block 轴(←→)。
- **一致性核对(可行版)**:**布局优先使用逻辑属性**(`padding-inline`、`border-block-end`、`inset-block-end` 等);不追求绝对禁止物理方向(`transform`、第三方库、动画等场景难以杜绝),改为 **CI 抽检**——对组件内部**布局用**的硬编码 `left/right/top/bottom` 做告警式检查,允许在动效/兼容场景显式豁免(注释标注)。
- **对照 antd 的 checklist**:逐组件核对 antd 同名组件的状态与能力是否都有对应(有则确认竖排表现,无则记入 roadmap)。
- **落地顺序**(承接 editorial 原型的家族移植顺序):Button → Field(Input) → Select → Menu → Tabs → Form,再铺其余。

## 6. 非目标
- 追求与 antd 视觉一致;把竖排当作 CSS 旋转;给每个控件加文化纹样;强行把拉丁密集的数据表/开发者工具竖排化;仅为视觉替换而改动现有 VertM API。
