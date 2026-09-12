# 原生主题预设 · Native Theme Presets(交付 Composer)

> 在现有 `defaultTheme` / `editorialTheme` / `darkTheme` 之外,新增 5 套原生主题预设。
> 每套通过 `createTheme(...)` 继承 default 的尺寸/字体/阴影,仅覆盖下表字段(与 `editorialTheme` 同款做法)。
> 样机见 `design/mockups/theme-page.html`,截图 `design/mockups/renders/theme-page*.png`。
> 落地位置:`packages/tokens/src/<name>-theme.ts`,并在 `packages/tokens/src/index.ts` 导出;文档站 `主题` 页消费。

## 命名与文件

| 预设 | 中文 | slug / 变量 | 文件 | 属性 |
|------|------|-------------|------|------|
| Cobalt | 钴蓝 | `cobaltTheme` | `cobalt-theme.ts` | 品牌主蓝(文档站门面色,可作 default 备选) |
| Cinnabar | 朱砂 | `cinnabarTheme` | `cinnabar-theme.ts` | 印章朱红 + 暖纸 |
| Steppe | 草原 | `steppeTheme` | `steppe-theme.ts` | 草场深绿 |
| Amber | 鎏金 | `amberTheme` | `amber-theme.ts` | 青铜暖金 |
| Slate | 黛青 | `slateTheme` | `slate-theme.ts` | 冷调墨青 |
| Frost | 霜 | `frostTheme` | `frost-theme.ts` | 冰蓝(default 蓝的清冷版) |

> 已有 `darkTheme` 为夜间面板;上述新预设均为浅色场,后续可用同法各生成暗色变体。

---

## Token 覆盖表

> 只列覆盖字段;其余继承 `defaultTheme`。所有 `borderRadiusSM/LG` 随 `borderRadius` 成比例(见每行)。

### 钴蓝 Cobalt `#0e2f74`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#0e2f74` | | colorBgContainer | `#ffffff` |
| colorInfo | `#3f7ce0` | | colorBgElevated | `#ffffff` |
| colorSuccess | `#247a55` | | colorBgLayout | `#eef0f4` |
| colorWarning | `#d97706` | | colorBorder | `#dde1ea` |
| colorError | `#d84a32` | | colorBorderSecondary | `#e8ebf1` |
| colorText | `#1e2740` | | colorLink | `#2155d6` |
| colorTextSecondary | `#5b6478` | | colorLinkHover | `#17408f` |
| colorTextDisabled | `#9aa2b4` | | caretColor | `#0e2f74` |
| borderRadius | `6 / 4 / 8` | | vertical.columnSize / Gap | `32 / 16` |

> 文档站点睛金 `#e0aa4e` 仅作 chrome 装饰(CTA/marker),**不是** token 角色色,不进主题。

### 朱砂 Cinnabar `#b23b2e`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#b23b2e` | | colorBgContainer | `#fbf7f2` |
| colorInfo | `#b23b2e` | | colorBgElevated | `#fbf7f2` |
| colorSuccess | `#4a7a3f` | | colorBgLayout | `#f3ebe1` |
| colorWarning | `#cc7a1f` | | colorBorder | `#e2d5c6` |
| colorError | `#a32d22` | | colorBorderSecondary | `#ece2d6` |
| colorText | `#241612` | | colorLink | `#b23b2e` |
| colorTextSecondary | `#7a6357` | | colorLinkHover | `#8f2e23` |
| colorTextDisabled | `#b3a598` | | caretColor | `#b23b2e` |
| borderRadius | `4 / 3 / 6` | | vertical.columnSize / Gap | `36 / 14` |

### 草原 Steppe `#2e6b4f`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#2e6b4f` | | colorBgContainer | `#ffffff` |
| colorInfo | `#2e6b4f` | | colorBgElevated | `#ffffff` |
| colorSuccess | `#2e6b4f` | | colorBgLayout | `#eef3ef` |
| colorWarning | `#c8871f` | | colorBorder | `#d7e0d8` |
| colorError | `#b8422f` | | colorBorderSecondary | `#e6ece7` |
| colorText | `#16211b` | | colorLink | `#2e6b4f` |
| colorTextSecondary | `#5a6b60` | | colorLinkHover | `#23543e` |
| colorTextDisabled | `#a3afa6` | | caretColor | `#2e6b4f` |
| borderRadius | `6 / 4 / 8` | | vertical.columnSize / Gap | `32 / 16` |

### 鎏金 Amber `#a26a1f`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#a26a1f` | | colorBgContainer | `#fbf8f1` |
| colorInfo | `#a26a1f` | | colorBgElevated | `#fbf8f1` |
| colorSuccess | `#5f7a2e` | | colorBgLayout | `#f2ecdf` |
| colorWarning | `#c88a1f` | | colorBorder | `#e3d8c2` |
| colorError | `#b04a2a` | | colorBorderSecondary | `#ece3d2` |
| colorText | `#2a2114` | | colorLink | `#a26a1f` |
| colorTextSecondary | `#77664a` | | colorLinkHover | `#83551a` |
| colorTextDisabled | `#b6a988` | | caretColor | `#a26a1f` |
| borderRadius | `6 / 4 / 8` | | vertical.columnSize / Gap | `32 / 16` |

> ⚠️ 主色 `#a26a1f` 已压深以保证白字按钮对比 ≥ AA;不要用更亮的琥珀(如 `#e0aa4e`)当 `colorPrimary`,那是装饰金。

### 黛青 Slate `#2f5b66`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#2f5b66` | | colorBgContainer | `#ffffff` |
| colorInfo | `#2f5b66` | | colorBgElevated | `#ffffff` |
| colorSuccess | `#2e6b57` | | colorBgLayout | `#eef2f3` |
| colorWarning | `#c8871f` | | colorBorder | `#d6dee0` |
| colorError | `#b8422f` | | colorBorderSecondary | `#e5ebec` |
| colorText | `#161f22` | | colorLink | `#2f5b66` |
| colorTextSecondary | `#5a686b` | | colorLinkHover | `#244851` |
| colorTextDisabled | `#a1abae` | | caretColor | `#2f5b66` |
| borderRadius | `6 / 4 / 8` | | vertical.columnSize / Gap | `32 / 16` |

### 霜 Frost `#2155d6`
| 字段 | 值 | | 字段 | 值 |
|---|---|---|---|---|
| colorPrimary | `#2155d6` | | colorBgContainer | `#ffffff` |
| colorInfo | `#2155d6` | | colorBgElevated | `#ffffff` |
| colorSuccess | `#247a55` | | colorBgLayout | `#e7eefb` |
| colorWarning | `#d97706` | | colorBorder | `#cfdcf3` |
| colorError | `#d84a32` | | colorBorderSecondary | `#e0e9f9` |
| colorText | `#132140` | | colorLink | `#2155d6` |
| colorTextSecondary | `#566a8f` | | colorLinkHover | `#17408f` |
| colorTextDisabled | `#9aa6c2` | | caretColor | `#2155d6` |
| borderRadius | `8 / 5 / 10` | | vertical.columnSize / Gap | `32 / 16` |

---

## 实现示例

```ts
// packages/tokens/src/cinnabar-theme.ts
import { createTheme } from './create-theme.js';

export const cinnabarTheme = createTheme({
  colorPrimary: '#b23b2e',
  colorInfo: '#b23b2e',
  colorSuccess: '#4a7a3f',
  colorWarning: '#cc7a1f',
  colorError: '#a32d22',
  colorText: '#241612',
  colorTextSecondary: '#7a6357',
  colorTextDisabled: '#b3a598',
  colorBgContainer: '#fbf7f2',
  colorBgElevated: '#fbf7f2',
  colorBgLayout: '#f3ebe1',
  colorBorder: '#e2d5c6',
  colorBorderSecondary: '#ece2d6',
  colorLink: '#b23b2e',
  colorLinkHover: '#8f2e23',
  borderRadius: 4,
  borderRadiusSM: 3,
  borderRadiusLG: 6,
  caretColor: '#b23b2e',
  vertical: { columnSize: 36, columnGap: 14 },
});
```

## 落地清单
- [x] 6 个 `*-theme.ts`(cobalt/cinnabar/steppe/amber/slate/frost)+ `index.ts` 导出。
- [x] 主题页(`docs` 站)按 `theme-page.html`:语义色角色 + 预设画廊(每卡真实竖排 demo + 色板条 + `radius/column/gap` 元信息)+ ConfigProvider 自定义面板。
- [x] 校验每套:白字按钮对比 ≥ WCAG AA;链接/正文/次要文本达标;暗色场可后续加 `*-dark`。
- [x] `caretColor` 与 `colorPrimary` 保持一致(Frost/Cobalt 同蓝系,Editorial 例外用钴蓝)。
