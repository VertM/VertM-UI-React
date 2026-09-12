# 文档站视觉规范 · VertM Chrome(交付 Composer 落 dumi 主题)

> 文档站整体视觉语言:**深蓝门面 + 浅色阅读场 + 鎏金点睛**。
> 落地目标:dumi 主题覆盖(`.dumi/theme` + `.dumi/global.ts`),把下列 token 与页型样式实现到文档站。
> 交互式样机(真实 token + bundled 蒙古文字体,浏览器验证过)见 `design/mockups/`:
> `site-home.html`(首页)、`doc-page.html`(组件/文档页)、`overview.html`(组件总览)、`theme-page.html`(主题)。截图见 `design/mockups/renders/`。
> 主题预设的完整 token 值见 `docs/theme-presets.md`。

---

## 1. 概念与原则

- **门面 / 内容场地切换**:深蓝(Hero、顶栏)= 识别与门面;象牙白(内容区)= 阅读与文档。配色在两处近乎反转。
- **蒙古文竖排即主视觉**:展示层交给放大的竖排蒙古文,拉丁/中文退为安静说明层。
- **鎏金只点睛**:全站唯一暖色,仅用于 CTA、caret、当前态 marker、章节刻度、链接下划。**不铺面、不做大色块**。
- **大胆只花一处**:每屏让竖排蒙古文当主角,其余安静克制。
- 质量底线:响应式到移动端、键盘焦点可见、`prefers-reduced-motion`、对比度达标。

---

## 2. Design Tokens

```css
:root{
  /* ── 蓝(门面) ── */
  --vm-night:#071a3f;      /* 深夜蓝:代码块底、Hero 渐变底 */
  --vm-sky:#0e2f74;        /* 钴蓝:顶栏、主按钮、primary、表头文字 */
  --vm-sky-2:#16408f;      /* Hero 顶部高光 */
  --vm-azure:#3f7ce0;      /* 亮蓝:类型标注、次级强调 */

  /* ── 白(内容场) ── */
  --vm-canvas:#eef0f4;     /* 页面画布(冷中性近白) */
  --vm-panel:#ffffff;      /* 内容面板/卡片 */
  --vm-panel-2:#f6f7f9;    /* 次级面(demo 头、代码折叠条) */
  --vm-snow:#f5f6f8;       /* 蓝底之上的字色 */
  --vm-snow-dim:rgba(245,246,248,.66);

  /* ── 金(点睛) ── */
  --vm-gilt:#e0aa4e;       /* 鎏金:CTA、caret、marker、刻度 */
  --vm-gilt-deep:#c68f34;  /* 深金:属性名、H1 侧竖排小字 */

  /* ── 墨/文本 ── */
  --vm-inkblue:#0e2f74;    /* 标题、强调文本 */
  --vm-text:#1e2740;       /* 正文 */
  --vm-muted:#5b6478;      /* 次要文本/说明 */
  --vm-line:#dde1ea;       /* 主分隔线/边框 */
  --vm-line-soft:#e8ebf1;  /* 弱分隔线 */
}
```

> 与产品 `@vertm/tokens` 的关系:文档站的 `--vm-sky` 即产品 cobalt 的放大用法;组件 **demo 内部**仍严格遵循 `@vertm/tokens` 与 `component-design-spec.md`(editorial/default),**文档站 chrome 不覆盖 demo 内部样式**。

---

## 3. 字体与排版

| 角色 | 字体 | 说明 |
|------|------|------|
| 展示(竖排) | **Noto Sans Mongolian**(bundled) | Hero 词标、H1 侧小字、组件标本 |
| 拉丁展示/UI | **Sora**(400–800) | 品牌字标、导航、组件名、数字指标 |
| 中文 | PingFang SC / Noto Sans SC | 标题与正文 |
| 代码 | JetBrains Mono / ui-monospace | 代码块、文件名、类型、属性名 |

字号(模数 ~1.333):micro 12 · small 13.5 · body 15 · h3 20 · h2/section 26 · h1 30–33 · Hero 词标 104–112。
正文行长 < 40 中文字符(`max-width:62ch` 于正文)。避免:ALL-CAPS eyebrow、中点 meta 串、按钮尾 `→`、单词高亮式标题。

---

## 4. Chrome(站点骨架)

### 4.1 顶栏 `.top`(品牌恒定深蓝,sticky)
- 背景 `--vm-sky`,高 56;字标 `VertM` + 金色 ` UI`;导航 `--vm-snow-dim`,当前项 `--vm-snow` 加粗。
- 右侧:搜索框(半透明白 `rgba(255,255,255,.12)` + `⌘K`)、GitHub(金色下划线)。

### 4.2 首页 Hero(满幅深蓝,见 `site-home.html`)
- 背景 `radial-gradient(120% 80% at 50% -18%, --sky-2, --sky 34%, --night 82%)`;极淡星点纹(opacity .05)。
- 左:中文标题(象牙,800)+ 说明(dim)+ CTA(**金色实心 `开始使用`** + ghost `浏览组件`)+ 指标(Sora)。
- 右:**列阵**——词标 `ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ` 居中,两侧真实组件词错落从"地平线"垂挂;金色 block-end marker 贴词标右缘;金色 caret 闪烁(唯一动效)。
- 向下切到象牙内容区(蓝字),放起步入口 + 组件标本。

### 4.3 文档三栏(见 `doc-page.html`)
`grid: 236px | 1fr | 208px`,画布 `--vm-canvas`,正文白面板 `--vm-panel`(左右描边)。
- **左侧栏**:分组用 mono 小标签;项 hover 浅底;**当前项**白底圆角 + 左侧 3px 金色刻度 + 加粗蓝。
- **正文**:面包屑(muted)→ H1(蓝,右侧一枚金色竖排蒙古文小字)→ lead(muted)→ 章节。
- **右 TOC**:mono "本页" 标签;锚点左描边,当前项金色左边 + 蓝加粗。

### 4.5 主题页(见 `theme-page.html`)
- 语义色角色卡(primary/success/warning/error/info + hex)。
- 内置主题画廊:每卡 = 标题 + 主色点 + 该主题下的竖排迷你 demo(按钮/输入/标签)+ 语义色板条 + `radius/column/gap` 元信息;当前项蓝色描边环。
- 自定义面板:colorPrimary 预设点 + columnSize/Gap/borderRadius 滑块 + ConfigProvider 代码。
- 预设清单与 token 值以 `docs/theme-presets.md` 为准(钴蓝 + 朱砂/草原/鎏金/黛青/霜 + 墨/夜)。

### 4.4 组件总览(见 `overview.html`)
- 分组标题:金点 + 中文名 + mono 英文名 + 延伸细线。
- 瓦片网格 `repeat(5,1fr)`:白瓦片、细边框,**hover 边框转金 + 轻蓝阴影**;瓦片上半为 `--vm-canvas` 迷你舞台,内置该组件**竖排蒙古文最小标本**;下半为 Sora 组件名 + 中文。**不使用统一重阴影 SaaS 卡**。

---

## 5. 内容块样式

- **DemoFrame**:圆角 10 边框卡;头部(灰点 + mono 文件名 + 右侧全局切换 chip:主题 `Default/Dark/Editorial`、书写 `竖排/横排`,当前态蓝底);舞台 `--vm-canvas` 承载竖排 editorial demo;底部 `</> 展开代码` 折叠条。
  ⚠️ **承载 `writing-mode` 的节点上不要放 flex**;demo 外层用普通横向 flex,竖排只加在文字控件本身(样机初版踩过此坑)。
- **代码块 `pre`**:`--vm-night` 深蓝底,象牙字;高亮:关键字 `#8fb4ff`、字符串 `--vm-gilt`、注释 `#6f80a6`、组件名 `#f5f7fa`、属性 `#a6f0d0`。
- **API 表**:表头 `--vm-canvas` 底、蓝加粗;单元格弱线分隔;属性名 mono 深金、类型 mono 亮蓝、默认值 mono muted。
- **提示(note/admonition)**:左 3px 金色边 + 极浅暖底 `#fbf4e6`,深棕字。可扩展 info(蓝)/warning(金)/danger(朱红)三态。

---

## 6. 动效

- 仅一处编排:首页列阵载入按列从顶"写下"(staggered),金色 caret 闪烁 1.05s step。
- 交互反馈(hover/expand/切换)可有短过渡(≤160ms)。
- 全部 `@media (prefers-reduced-motion: reduce)` 关停非交互动效。

---

## 7. 落地清单(交 Composer)

- [x] `.dumi/global.ts` 注入字体(Noto Sans Mongolian bundled + Sora/JetBrains Mono)与 §2 token。
- [x] dumi 主题覆盖:顶栏、侧栏、TOC、首页 Hero、内容排版、代码块、API 表、admonition —— 按 §4/§5。
- [x] `GlobalControls`(见 `documentation-site-iteration-1.md` 任务 1)样式对齐 §5 DemoFrame 头部 chip / 顶栏下拉。
- [x] 组件总览页按 §4.4 瓦片网格实现,标本取各组件竖排最小形态。
- [x] 移动端:三栏在窄屏折叠(侧栏抽屉、TOC 收起);Hero 列阵缩放不溢出。
- [x] 校验对比度(象牙字/蓝底、muted/白底)达 WCAG AA;键盘焦点可见(金色 focus 环)。

## 8. 非目标
- 不追求与 antd 视觉一致;不把竖排当 CSS 旋转;鎏金不铺面;不给控件加文化纹样;文档站 chrome 不侵入 demo 内部(demo 归 `component-design-spec.md`)。
