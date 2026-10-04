# 逻辑下沉任务书：`@vertm/react` → `@vertm/core`

> **已于 0.2.0 完成。**

> 本文档是给实现者（含 AI 编码代理）的逐步任务书。按任务顺序执行，**每个任务完成后单独提交一次**。
> 目标：把与框架无关的逻辑从 `@vertm/react` 下沉到 `@vertm/core`，为后续 `@vertm/vue`、小程序等技术栈打基础。架构参考 TDesign（样式与逻辑共享，各技术栈只做薄绑定层），并进一步把**竖排键盘契约、弹层默认方向、列表导航**也沉到共享层。
> 行号基于提交 `bb609ae`，如有偏移以函数名为准。

---

## 0. 执行规则（必读）

1. **行为零变化。** 这是重构，不是改设计。任何组件的渲染结果、键盘行为、默认值、对外 API 都不能变。唯一允许的行为变化在 T7（`Form` 校验文案改为可配置，默认值不变）。
2. **现有测试一律不改。** `packages/react/src/**/*.test.tsx` 全部原样通过，就是行为未变的证据。如果某个测试失败，修实现，不要改测试。唯一例外：T2 把 `react/src/overlay/placement.test.ts` 整体移动到 `core`。
3. **键盘行为以 `docs/component-design-spec.md` §3.1 为准。** 当前实现符合该规范，下沉时原样保留（见 T4）。不要套用 WAI-ARIA 或 antd 的键位去"修正"它。
4. **不动样式。** 不修改 `packages/styles`、`packages/tokens`。
5. **`@vertm/core` 不得依赖 React**，`package.json` 不新增 `react` 相关依赖。
6. **纯计算与 DOM 分离**：不访问浏览器 API 的代码放在 `core/src/` 下的普通目录；访问 `document`、`window`、`HTMLElement`、`getComputedStyle`、`requestAnimationFrame`、`FontFace`、`navigator` 等的代码，只能放在 `core/src/dom/`。
7. 代码风格对齐现有文件：ESM、`.js` 后缀的相对导入、英文 JSDoc 注释、函数式导出。新增的每个 `core` 模块都配同目录 `*.test.ts`（vitest，`environment: 'node'`）。

### 每个任务结束时必须执行的验证命令

`@vertm/react` 的测试通过 `node_modules` 解析 `@vertm/core` 的 **`dist`**，因此改完 `core` 一定要先构建：

```bash
npm run build -w @vertm/tokens && npm run build -w @vertm/core && npm run build -w @vertm/icons
npm test -w @vertm/core
npm test -w @vertm/react
npm run typecheck -w @vertm/core
npm run typecheck -w @vertm/react
```

基线（提交 `bb609ae`）：`core` 7 个测试文件 46 个用例、`react` 23 个测试文件 218 个用例，全部通过。每个任务结束后 `react` 仍应为 218 个用例全部通过（T2 移走 placement 测试后，相应用例数转移到 `core`）。

---

## 1. 背景与关键事实

### 1.1 包与解析

- `@vertm/core`：`tsc` 构建到 `dist/`，`package.json` 只有 `"."` 一个导出，vitest 环境为 `node`。
- `@vertm/react`：vitest 环境为 `jsdom`，通过 workspace 符号链接使用 `@vertm/core` 的 `dist`。
- 文档站 `packages/docs/.dumirc.ts` 和演示 `packages/react-demo/vite.config.ts` 通过 `alias` 把 `@vertm/core` 直接指到 `core/src`。新增子路径导出时，这两个 alias 必须同步（见 T1）。
- 根 `tsconfig.json` 用 `"moduleResolution": "bundler"`，支持 `package.json` 的 `exports` 子路径。

### 1.2 已存在的竖排键盘契约（`component-design-spec.md` §3.1）

| 逻辑轴 | `vertical-lr` 物理方向 | 键盘 |
|---|---|---|
| inline-start / end | 上 / 下 | ↑ 上一字符/项 · ↓ 下一字符/项 |
| block-start / end | 左 / 右 | ← 上一列/层级 · → 下一列/层级 |

规范原文："同级移动用 ↑↓，进出层级/切列用 ←→。例：Menu 同级 ↑↓、进子菜单 →、返回 ←；Tabs 始终 ←→（平级列）；Select 选项 ↑↓、确认并前进 →。"

注意：竖排时 Menu 根项和 Select 选项在视觉上是**从左到右排列的列**，但规范仍规定用 ↑↓ 切换同级（按阅读序），这是有意为之，不要改。

### 1.3 弹层默认方向（规范要求，现有代码已符合）

- Menu 子菜单：向右展开（`rightTop`），横竖排都一样；`mode="horizontal"` 时为 `bottomLeft`。
- Select：向 block-end（右上，`rightTop`）展开。Select 根节点始终带 `vertm-vertical` 类，横竖排都用 `rightTop`。
- Dropdown：竖排 `rightTop`，横排 `bottomLeft`。

现有代码里有两处三元表达式两个分支相同，属于冗余写法，不是 bug，T2 中顺手清理：

- `react/src/menu/Menu.tsx:104`：`return isVerticalWriting ? 'rightTop' : 'rightTop';`
- `react/src/dropdown/Dropdown.tsx`（`menuNode` 内）：`defaultPopupPlacement={isVerticalWriting ? 'rightTop' : 'rightTop'}`

### 1.4 真实存在的问题

- `react/src/form/Form.tsx:84` 起，校验默认文案写死为英文（`'Required field'`、`'Invalid format'`、`'Validation failed'`），无法配置。T7 处理。

---

## 2. 目标结构

```
packages/core/src/
├── index.ts                    # 纯计算主入口（为兼容，继续再导出 dom/ 中已有的 3 个旧模块）
├── purity.test.ts              # 守卫：非 dom/ 目录不得出现 DOM 全局
├── dom/
│   ├── index.ts                # @vertm/core/dom 入口
│   ├── caret-mapper.ts         # 由 src/ 移入
│   ├── font-detect.ts          # 由 src/ 移入
│   ├── detect-vertical-support.ts  # 由 src/ 移入
│   ├── viewport.ts             # T2
│   ├── menu-focus.ts           # T4
│   ├── focus-trap.ts           # T8
│   └── register-font.ts        # T8
├── overlay/placement.ts        # T2
├── interaction/
│   ├── collection.ts           # T3
│   └── keymap.ts               # T4
├── field/
│   ├── columns.ts              # T5
│   ├── scroll.ts               # T5
│   └── selection.ts            # T5
├── select/selection.ts         # T6
├── form/store.ts               # T7
├── feedback/toast-queue.ts     # T8
└── utils/
    ├── pagination.ts           # T8
    ├── format.ts               # T8
    ├── grid.ts                 # T8
    ├── splitter.ts             # T8
    ├── breakpoints.ts          # T8
    └── sanitize.ts             # T8
```

**明确不下沉**：`VertMConfigProvider` 的配置合并（依赖 `@vertm/tokens` 的 `editorialTheme`，且与 React Context 强绑定）、`Portal`、`cloneElement` 合并触发器事件、`useControlled`、所有渲染代码。

---

## 3. 任务列表

- [x] T1：建立 `@vertm/core/dom` 子入口与纯度守卫
- [x] T2：弹层定位下沉 + 默认方向表
- [x] T3：列表导航（跳过禁用项）
- [x] T4：键盘契约下沉（键位不变）
- [x] T5：`VertMTextField` 计算下沉
- [x] T6：Select 选中状态
- [x] T7：Form 存储
- [x] T8：小工具与 DOM 辅助
- [x] T9：图标数据与框架解耦

### T1：建立 `@vertm/core/dom` 子入口与纯度守卫

**目的**：把依赖 DOM 的模块与纯计算模块分开，让小程序/SSR 可以只用主入口。

**步骤**

1. 用 `git mv` 把以下文件移到 `packages/core/src/dom/`：
   - `src/caret-mapper.ts` → `src/dom/caret-mapper.ts`
   - `src/font-detect.ts` → `src/dom/font-detect.ts`
   - `src/detect-vertical-support.ts` → `src/dom/detect-vertical-support.ts`

   移动后修正这些文件内部的相对导入（例如对 `../normalize.js` 的引用）。
2. 新建 `packages/core/src/dom/index.ts`：

   ```ts
   export {
     detectMongolFonts,
     isFontLoaded,
   } from './font-detect.js';

   export {
     detectVerticalSupport,
     getVerticalLayoutClasses,
     type VerticalSupportResult,
   } from './detect-vertical-support.js';

   export {
     mapClickToIndex,
     getCaretRectAtIndex,
     getCaretPosition,
     type CaretPosition,
   } from './caret-mapper.js';
   ```

3. 修改 `packages/core/src/index.ts`：把原来从 `./font-detect.js`、`./detect-vertical-support.js`、`./caret-mapper.js` 的三段导出，改为从 `./dom/index.js` 再导出同样的名字（保持主入口向后兼容，文档站 `docs/core/detect.md` 等仍从主入口导入）。在这段上方加注释：

   ```ts
   // Back-compat re-exports; new code should import these from '@vertm/core/dom'.
   ```

4. `packages/core/package.json` 的 `exports` 增加子路径：

   ```json
   "exports": {
     ".": {
       "types": "./dist/index.d.ts",
       "import": "./dist/index.js"
     },
     "./dom": {
       "types": "./dist/dom/index.d.ts",
       "import": "./dist/dom/index.js"
     }
   }
   ```

5. 同步 alias（**新条目必须写在 `'@vertm/core'` 之前**，否则会被前缀匹配吃掉）：
   - `packages/react-demo/vite.config.ts`：`'@vertm/core/dom': resolveSrc('../core/src/dom/index.ts'),`
   - `packages/docs/.dumirc.ts`：`'@vertm/core/dom': pkg('../core/src/dom/index.ts'),`
6. `packages/react/src/VertMTextField.tsx` 中 `mapClickToIndex`、`getCaretPosition` 改为从 `'@vertm/core/dom'` 导入，其余仍从 `'@vertm/core'` 导入。
7. 新建 `packages/core/src/purity.test.ts`：递归读取 `src/` 下所有 `.ts` 文件，排除 `src/dom/**` 和 `*.test.ts`，断言文件内容不匹配

   ```ts
   /\b(document|window|navigator|HTMLElement|Element|getComputedStyle|requestAnimationFrame|cancelAnimationFrame|FontFace|ResizeObserver|IntersectionObserver)\b/
   ```

   用 `node:fs` 和 `node:path`，用 `fileURLToPath(new URL('.', import.meta.url))` 定位 `src` 目录。失败信息要列出违规文件名。注意：注释里出现这些单词也会误报，如有误报，就改写注释措辞，不要放宽正则。

**验收**：验证命令全部通过；`purity.test.ts` 通过；`npm run build -w @vertm/core` 后存在 `packages/core/dist/dom/index.js`。

---

### T2：弹层定位下沉 + 默认方向表

**目的**：定位数学和各组件的默认弹层方向集中到 `core`，Vue 版直接复用。

**步骤**

1. `git mv packages/react/src/overlay/placement.ts packages/core/src/overlay/placement.ts`，`git mv packages/react/src/overlay/placement.test.ts packages/core/src/overlay/placement.test.ts`。
2. 修改 `core/src/overlay/placement.ts`：
   - `Rect` 重命名为 `OverlayRect`（避免主入口里名字过于通用）。
   - `computeOverlayPosition` 的 `viewport` 参数改为**必填**，删除里面对 `window` 的引用（纯度守卫要求）。函数体其余逻辑一字不改。
   - 新增默认方向表：

   ```ts
   export type OverlayKind = 'dropdown' | 'select' | 'submenu' | 'menubarSubmenu';

   /**
    * Default popup placement per component, following component-design-spec §1.3:
    * submenus and Select open toward block-end (right) regardless of writing mode;
    * Dropdown opens right in vertical writing and below in horizontal writing.
    */
   export function resolveDefaultPlacement(kind: OverlayKind, writingMode: WritingMode): Placement {
     const vertical = writingMode.startsWith('vertical');
     switch (kind) {
       case 'dropdown':
         return vertical ? 'rightTop' : 'bottomLeft';
       case 'select':
       case 'submenu':
         return 'rightTop';
       case 'menubarSubmenu':
         return 'bottomLeft';
     }
   }
   ```

   `WritingMode` 从 `../normalize.js` 导入。
3. 修改移入的 `placement.test.ts`：导入路径改为 `./placement.js`，所有 `computeOverlayPosition(...)` 调用都显式传入 viewport（测试里已有 `viewport` 常量的直接用；没传的补上 `{ top: 0, left: 0, width: 1024, height: 768 }`）。新增 `resolveDefaultPlacement` 的用例，覆盖 4 种 kind × `vertical-lr` / `vertical-rl` / `horizontal-tb`。
4. 新建 `core/src/dom/viewport.ts`：

   ```ts
   import type { OverlayRect } from '../overlay/placement.js';

   /** Current layout viewport; falls back to 1024×768 outside the browser. */
   export function getViewportRect(): OverlayRect {
     if (typeof window === 'undefined') return { top: 0, left: 0, width: 1024, height: 768 };
     return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
   }
   ```

   并在 `dom/index.ts` 导出 `getViewportRect`。
5. 在 `core/src/index.ts` 导出：`computeOverlayPosition`、`resolveDefaultPlacement`、类型 `Placement`、`OverlayRect`、`OverlayPosition`、`OverlayKind`。
6. 新建 `packages/react/src/overlay/placement.ts`（薄封装，保持 `@vertm/react` 对外 API `computeOverlayPosition(trigger, popup, preferred, viewport?)` 不变）：

   ```ts
   import {
     computeOverlayPosition as computeCorePosition,
     type OverlayPosition,
     type OverlayRect,
     type Placement,
   } from '@vertm/core';
   import { getViewportRect } from '@vertm/core/dom';

   export type { Placement, OverlayPosition };
   export type Rect = OverlayRect;

   export function computeOverlayPosition(
     trigger: OverlayRect,
     popup: OverlayRect,
     preferred: Placement,
     viewport: OverlayRect = getViewportRect()
   ): OverlayPosition {
     return computeCorePosition(trigger, popup, preferred, viewport);
   }
   ```

   `Overlay.tsx`、`Select.tsx`、`Dropdown.tsx`、`Menu.tsx` 对 `../overlay/placement.js` 的导入保持不变。
7. 用 `resolveDefaultPlacement` 替换各组件的默认方向逻辑：
   - `dropdown/Dropdown.tsx`：删除本地 `resolveDefaultPlacement(isVerticalWriting)`，两处调用改为 `resolveDefaultPlacement('dropdown', config.writingMode)`；`menuNode` 中的 `defaultPopupPlacement={isVerticalWriting ? 'rightTop' : 'rightTop'}` 改为 `defaultPopupPlacement={resolveDefaultPlacement('submenu', config.writingMode)}`，并相应调整 `useMemo` 依赖（`isVerticalWriting` 换成 `config.writingMode`）。
   - `menu/Menu.tsx`：`resolveSubMenuPlacement` 改为：

     ```ts
     function resolveSubMenuPlacement(writingMode: WritingMode, mode: MenuMode, override?: Placement): Placement {
       if (override) return override;
       return resolveDefaultPlacement(mode === 'horizontal' ? 'menubarSubmenu' : 'submenu', writingMode);
     }
     ```

     调用处传入 `config.writingMode`（`SubMenu` 内已有 `const config = useVertMConfig()`）。
   - `select/Select.tsx`：参数解构中的 `placement = 'rightTop'` 改为 `placement: placementProp`，函数体内加 `const placement = placementProp ?? resolveDefaultPlacement('select', config.writingMode);`。JSDoc 中的 `@default 'rightTop'` 保留。

**验收**：验证命令通过；`react` 中不再出现 `isVerticalWriting ? 'rightTop' : 'rightTop'`；`grep -rn "resolveDefaultPlacement" packages/react/src` 只出现对 core 函数的调用，没有本地定义。

---

### T3：列表导航（跳过禁用项）

**目的**：合并 `Select` 的 `stepHighlight` 与 `Tabs` 的 `moveTab` 中重复的"找下一个可用项"逻辑。

**新增 `core/src/interaction/collection.ts`**

```ts
export interface NavigableItem {
  disabled?: boolean;
}

/**
 * Index of the next enabled item stepping from `from` (exclusive).
 * `from` may be -1 or `items.length` to search from either end.
 * Returns -1 when no enabled item is reachable.
 * With `loop`, the search wraps around and may return `from` itself
 * when it is the only enabled item.
 */
export function stepEnabledIndex(
  items: readonly NavigableItem[],
  from: number,
  step: 1 | -1,
  options?: { loop?: boolean }
): number;

/** First enabled index, or -1. Equivalent to stepEnabledIndex(items, -1, 1). */
export function firstEnabledIndex(items: readonly NavigableItem[]): number;
```

实现要求：

- 非循环：`for (let i = from + step; i >= 0 && i < items.length; i += step)`，找到第一个 `!items[i].disabled` 即返回。
- 循环：沿用 Tabs 现有公式 `index = (from + step * i + total * i) % total`，`i` 从 1 到 `total`。
- `items` 为空时返回 -1。

**测试用例**（`collection.test.ts`）：

- `[{}, {disabled:true}, {}]`，非循环，从 0 前进得 2，从 2 前进得 -1，从 2 后退得 0。
- 全部禁用时返回 -1。
- 循环：从最后一项前进回到 0；从 0 后退到最后一个可用项；`from = -1, step = 1` 得第一个可用项；`from = length, step = -1` 得最后一个可用项。
- 只有一个可用项且 `from` 就是它，循环时返回 `from`。

**接入 React**

- `select/Select.tsx` 的 `stepHighlight`：

  ```ts
  const stepHighlight = useCallback(
    (from: number, step: 1 | -1) => {
      const next = stepEnabledIndex(filtered, from, step);
      return next === -1 ? from : next;
    },
    [filtered]
  );
  ```

  打开时的 `filtered.findIndex((o) => !o.disabled)` 改为 `firstEnabledIndex(filtered)`。
- `tabs/Tabs.tsx` 的 `moveTab`：

  ```ts
  const moveTab = (from: number, step: 1 | -1) => {
    const index = stepEnabledIndex(items, from, step, { loop: true });
    if (index === -1) return;
    const candidate = items[index]!;
    setActive(candidate.key);
    tabListRef.current
      ?.querySelector<HTMLElement>(`[data-tab-key="${CSS.escape(candidate.key)}"]`)
      ?.focus();
  };
  ```

**验收**：验证命令通过；`Select.test.tsx` 中"跳过禁用项"的用例和 `Tabs.test.tsx` 的方向键用例均通过。

---

### T4：键盘契约下沉（键位不变）

**目的**：把 §1.2 的键盘契约编码为纯函数，React 组件只负责"根据动作执行副作用"。Vue 版用同一套函数即可保证键位一致。

**新增 `core/src/interaction/keymap.ts`**，内容要逐行复刻现有行为：

```ts
/**
 * Keyboard contract (component-design-spec §3.1):
 * ArrowUp/ArrowDown move between peers in reading order (inline axis);
 * ArrowLeft/ArrowRight enter/leave levels or switch columns (block axis).
 */

export type SelectKeyAction = 'open' | 'prev' | 'next' | 'commit' | 'close';

export function resolveSelectKey(
  key: string,
  state: { open: boolean; vertical: boolean }
): SelectKeyAction | null;

export type MenuItemKeyAction = 'activate' | 'prev' | 'next' | 'exitToParent';

export function resolveMenuItemKey(key: string): MenuItemKeyAction | null;

export type SubMenuKeyAction = 'toggle' | 'prev' | 'next' | 'open' | 'close';

export function resolveSubMenuKey(key: string, state: { open: boolean }): SubMenuKeyAction | null;

export type TabsKeyAxis = 'horizontal' | 'vertical';
export type TabsKeyAction = 'activate' | 'prev' | 'next' | 'first' | 'last';

/** Vertical writing always treats tabs as peer columns (Left/Right). */
export function resolveTabsKeyAxis(isVerticalWriting: boolean, verticalBar: boolean): TabsKeyAxis;

export function resolveTabsKey(key: string, axis: TabsKeyAxis): TabsKeyAction | null;

export type FieldKeyAction = 'caretPrev' | 'caretNext' | 'submit';

/** Single-line VertMTextField: the caret runs top→bottom inside one column. */
export function resolveFieldKey(key: string): FieldKeyAction | null;
```

**映射表**（来源于现有代码，必须完全一致）：

`resolveSelectKey`（来源 `select/Select.tsx:292` 的 `handleKeyDown`）

| 状态 | 按键 | 动作 |
|---|---|---|
| 关闭 | `ArrowDown`、`Enter` | `open` |
| 关闭 + 竖排 | `ArrowRight` | `open` |
| 关闭 | 其他 | `null` |
| 打开 | `ArrowDown` | `next` |
| 打开 | `ArrowUp` | `prev` |
| 打开 + 竖排 | `ArrowRight` | `commit` |
| 打开 + 竖排 | `ArrowLeft` | `prev` |
| 打开 + 横排 | `ArrowRight` | `next` |
| 打开 + 横排 | `ArrowLeft` | `prev` |
| 打开 | `Enter` | `commit` |
| 打开 | `Escape` | `close` |

`resolveMenuItemKey`（来源 `menu/Menu.tsx:165` `MenuItem.handleKeyDown`）：`Enter`、`' '` → `activate`；`ArrowDown` → `next`；`ArrowUp` → `prev`；`ArrowLeft` → `exitToParent`；其他 `null`。

`resolveSubMenuKey`（来源 `menu/Menu.tsx:334` `SubMenu.handleKeyDown`）：`Enter`、`' '` → `toggle`；`ArrowDown` → `next`；`ArrowUp` → `prev`；`ArrowRight` 且 `!open` → `open`；`ArrowLeft` 且 `open` → `close`；其他 `null`。

`resolveTabsKeyAxis`：`isVerticalWriting || !verticalBar ? 'horizontal' : 'vertical'`。

`resolveTabsKey`（来源 `tabs/Tabs.tsx:148`）：`Enter`、`' '` → `activate`；横轴时 `ArrowLeft` → `prev`、`ArrowRight` → `next`；纵轴时 `ArrowUp` → `prev`、`ArrowDown` → `next`；`Home` → `first`；`End` → `last`；其他 `null`。

`resolveFieldKey`（来源 `VertMTextField.tsx:466`）：`ArrowUp` → `caretPrev`；`ArrowDown` → `caretNext`；`Enter` → `submit`；其他 `null`。

**测试**：`keymap.test.ts` 用 `it.each` 把上面每一行写成一个用例，另加"无关按键返回 null"的用例。

**新增 `core/src/dom/menu-focus.ts`**：把 `react/src/menu/menuKeyboard.ts` 的 `focusSiblingMenuControl`、`focusFirstMenuControl` 原样移入，再新增：

```ts
/** Focus the title of the submenu identified by `key` (used when leaving a nested level). */
export function focusSubmenuTitle(key: string, root: ParentNode = document): HTMLElement | null {
  const title = root.querySelector<HTMLElement>(
    `.vertm-submenu[data-menu-key="${CSS.escape(key)}"] > .vertm-submenu__title`
  );
  title?.focus();
  return title;
}
```

在 `dom/index.ts` 导出这三个函数。删除 `react/src/menu/menuKeyboard.ts`，`Menu.tsx` 改为从 `'@vertm/core/dom'` 导入。

**接入 React**（以 Select 为例，其余同理）：

```ts
const handleKeyDown = (e: KeyboardEvent) => {
  const action = resolveSelectKey(e.key, { open, vertical });
  if (!action) return;
  if (action !== 'close') e.preventDefault();
  switch (action) {
    case 'open':
      setOpen(true);
      return;
    case 'next':
      setHighlight((h) => stepHighlight(h, 1));
      return;
    case 'prev':
      setHighlight((h) => stepHighlight(h, -1));
      return;
    case 'commit': {
      const opt = filtered[highlight];
      if (opt && !opt.disabled) selectOption(opt.value);
      return;
    }
    case 'close':
      setOpen(false);
  }
};
```

注意保留以下细节：

- Select 原代码对 `Escape` **不调用** `preventDefault`，保持不变（上例已处理）。
- `MenuItem` 的 `exitToParent`：没有父级（`ctx.keyPathPrefix` 为空）时直接 `return`，**不调用** `preventDefault`；有父级时 `preventDefault`，父级处于打开状态则 `toggleOpenKey(parentKey)`，再调用 `focusSubmenuTitle(parentKey)`。
- `SubMenu` 的 `prev` / `next` 只在 `focusFrom` 存在时执行并 `preventDefault`；`open` 动作要先设置 `focusChildOnOpenRef.current = true` 再 `openSubMenu()`；`close` 动作要 `closeSubMenu()` 后聚焦本级标题。
- `SubMenu` 标题节点上单独的 `onKeyDown`（只处理 Enter/空格并 `stopPropagation`）保持原样。
- Tabs 的 `aria-orientation` 改为由 `resolveTabsKeyAxis` 的结果决定（`'horizontal'` / `'vertical'`），删除 `useBlockAxisKeys` 变量。`first` 对应 `moveTab(-1, 1)`，`last` 对应 `moveTab(items.length, -1)`。
- `VertMTextField.handleKeyDown` 中 `sanitize` 拦截单字符的逻辑保持在 React 侧，放在 `resolveFieldKey` 之前。

**验收**：

- 验证命令通过，`Select.test.tsx`、`Menu.test.tsx`、`Tabs.test.tsx`、`EditorialKeyboard.test.tsx` 未做任何修改且全部通过。
- 执行 `rg "'Arrow(Up|Down|Left|Right)'" packages/react/src --glob '!*.test.*'`，结果为空。

---

### T5：`VertMTextField` 计算下沉

**目的**：`VertMTextField.tsx`（610 行）是逻辑最重的组件，其中列数和滚动计算有多处重复。

**新增 `core/src/field/columns.ts`**

```ts
export interface FieldColumnsInput {
  /** Normalized field text. */
  text: string;
  rows: number;
  columnDepth: number;
  maxColumns: number;
}

export interface FieldColumns {
  /** Columns the content needs. */
  needed: number;
  /** Columns actually rendered. */
  effective: number;
  /** Minimum columns (rows for multiline, otherwise 1). */
  min: number;
  /** Field auto-grows up to maxColumns. */
  autoColumns: boolean;
  /** Content exceeds maxColumns and scrolls along the block axis. */
  capped: boolean;
  /** Field grew beyond its minimum width. */
  wide: boolean;
}

export function computeFieldColumns(input: FieldColumnsInput): FieldColumns;
```

实现必须与现有逻辑（`VertMTextField.tsx:152-172`）完全一致：

```ts
const isMultiline = rows > 1;
const min = isMultiline ? Math.max(1, rows) : 1;
const content = countOverflowColumns(text, columnDepth);
const needed = maxColumns <= 1 ? (isMultiline ? min : content) : Math.max(min, content);
const effective = maxColumns <= 1 ? (isMultiline ? min : Math.min(1, needed)) : Math.min(maxColumns, needed);
const autoColumns = maxColumns > 1;
const capped = autoColumns && needed > maxColumns;
const wide = autoColumns && effective > min;
```

**新增 `core/src/field/scroll.ts`**

```ts
/**
 * Scroll offset that brings [start, end] into a viewport of `viewport` length,
 * keeping `pad` px of breathing room. Returns `scroll` unchanged when already visible.
 */
export function computeScrollToReveal(args: {
  start: number;
  end: number;
  scroll: number;
  viewport: number;
  max: number;
  pad?: number; // default 4
}): number;
// if (start < scroll + pad) return Math.max(0, start - pad);
// if (end > scroll + viewport - pad) return Math.min(end - viewport + pad, max);
// return scroll;

/** Max horizontal scroll for a capped field: needed columns × column width − visible width. */
export function maxColumnScroll(needed: number, columnWidth: number, clientWidth: number): number;
// Math.max(0, needed * columnWidth - clientWidth)

/** Clamp/reset the block-axis scroll after the text changes (no DOM measurement). */
export function reconcileColumnScroll(args: {
  needed: number;
  maxColumns: number;
  columnWidth: number;
  clientWidth: number;
  scrollLeft: number;
}): number;
// capped = maxColumns > 1 && needed > maxColumns
// max = capped ? maxColumnScroll(...) : 0
// if (!capped || max === 0) return 0;
// return scrollLeft > max ? max : scrollLeft;
```

**新增 `core/src/field/selection.ts`**

```ts
export interface FieldSelection {
  start: number;
  end: number;
  direction: 'forward' | 'backward' | 'none';
}

/** Move (or extend) a selection by `delta` code units, clamped to [0, length]. */
export function moveSelection(args: {
  start: number;
  end: number;
  length: number;
  delta: number;
  extend: boolean;
}): FieldSelection;
// extend: anchor = start; focus = clamp(end + delta);
//   focus < anchor ? { start: focus, end: anchor, direction: 'backward' }
//                  : { start: anchor, end: focus, direction: 'forward' }
// otherwise: next = clamp(start + delta); { start: next, end: next, direction: 'none' }

/** Caret position after `sanitize` strips characters before the raw caret. */
export function mapCaretThroughSanitize(raw: string, rawCaret: number, sanitize: (v: string) => string): number;
// sanitize(raw.slice(0, rawCaret)).length

/** Strip line breaks for single-line fields, then normalize. */
export function normalizeFieldValue(raw: string, multiline: boolean): string;
// normalizeMongolianText(multiline ? raw : raw.replace(/[\r\n]/g, ''))
```

**接入 `VertMTextField.tsx`**

- `neededColumns`、`effectiveColumnCount`、`minColumnCount`、`useAutoColumns`、`isColumnCapped`、`isWideField` 统一改为一个 `const columns = useMemo(() => computeFieldColumns({ text: normalizedValue, rows, columnDepth, maxColumns }), [...])`。
- `resolveNeededColumns(text)` 改为 `computeFieldColumns({ text, rows, columnDepth, maxColumns }).needed`。
- `reconcileHorizontalScroll` 内部改用 `reconcileColumnScroll`，只在结果与当前值不同时才赋值 `visual.scrollLeft`。
- `scrollSingleLineCaretIntoView` 中的三段"超出就滚动"（字形横向 `:258`、光标纵向 `:280`、光标横向 `:293`）改用 `computeScrollToReveal`。DOM 测量部分（`createRange`、`getBoundingClientRect`）留在组件里。字形横向那段 `end` 要传 `contentLeft + Math.max(glyphRect.width, columnWidth)`。
- `moveSingleLineCaret` 改用 `moveSelection`，`direction === 'none'` 时调用 `el.setSelectionRange(start, end)`，否则传第三个参数。
- `commitInputFromNative` 中的光标换算改用 `mapCaretThroughSanitize`；`updateValue` 和 `normalizeFieldValue`（组件内同名回调）改用 core 的 `normalizeFieldValue`。组件顶部 `normalizedValue` 的 `useMemo`（先规范化再去换行）**保持不变**，不要改成 core 函数，两者顺序不同。

**测试**：

- `columns.test.ts`：至少覆盖单行 `maxColumns=1`、多行 `rows=3`、`maxColumns=3` 未超出、`maxColumns=3` 超出（`capped=true`）、空文本 5 种情况。期望值请先在改动前用原组件逻辑手算或临时打印得到。
- `scroll.test.ts`：已可见不滚动、在前方超出、在后方超出、`max` 截断、`reconcileColumnScroll` 未超出时归零。
- `selection.test.ts`：普通移动越界截断；扩选向前；扩选向后得到 `backward`；`mapCaretThroughSanitize` 去掉光标前的非法字符。

**验收**：验证命令通过；`VertMTextField.tsx` 中不再出现 `countOverflowColumns` 的直接调用。

---

### T6：Select 选中状态

**新增 `core/src/select/selection.ts`**

```ts
export type SelectValue = string | string[];

/** Coerce a raw value to the shape required by `multiple` (来源 Select.tsx:68 normalizeCurrent). */
export function normalizeSelectValue(multiple: boolean, raw: SelectValue | undefined): SelectValue;

/** Add `value` if absent, remove it if present (多选切换，来源 Select.tsx:261). */
export function toggleSelectValue(current: readonly string[], value: string): string[];

/**
 * Filter options by a search keyword using Mongolian-aware normalization.
 * Returns `options` itself when the keyword is blank.
 */
export function filterOptionsBySearch<T>(
  options: readonly T[],
  search: string,
  getLabel: (option: T) => string
): readonly T[];
// if (!search.trim()) return options;
// const key = normalizeForSearch(search);
// return options.filter((o) => normalizeForSearch(getLabel(o)).includes(key));
```

React 侧：删除本地 `normalizeCurrent`，改用 `normalizeSelectValue`；`filtered` 的 `useMemo` 改为 `showSearch ? filterOptionsBySearch(options, search, optionLabel) : options`；`selectOption` 多选分支改用 `toggleSelectValue`。`optionLabel` 涉及 `ReactNode`，留在 React 侧。

**测试**：`normalizeSelectValue` 的 6 种组合（单选/多选 × `undefined`/字符串/数组）；`toggleSelectValue` 添加与移除；`filterOptionsBySearch` 空白关键字返回原数组引用、能匹配、不匹配返回空数组。

---

### T7：Form 存储

**新增 `core/src/form/store.ts`**：把 `react/src/form/Form.tsx` 中的 `Rule` 接口、`FormStore` 接口和 `createFormStore` 原样移入，并增加可配置文案：

```ts
export interface FormValidateMessages {
  required: string;
  pattern: string;
  validator: string;
}

export const DEFAULT_VALIDATE_MESSAGES: FormValidateMessages = {
  required: 'Required field',
  pattern: 'Invalid format',
  validator: 'Validation failed',
};

export interface FormStoreOptions {
  messages?: Partial<FormValidateMessages>;
}

export function createFormStore(options?: FormStoreOptions): FormStore;
```

`validate()` 中三处默认文案改为 `rule.message ?? messages.required` 等（`messages` 为 `{ ...DEFAULT_VALIDATE_MESSAGES, ...options?.messages }`）。其余逻辑一字不改。

React 侧：

- `Form.tsx` 删除上述定义，从 `@vertm/core` 导入 `createFormStore`、`type Rule`、`type FormStore`。
- `react/src/index.ts:64` 通过 `./form/Form.js` 对外导出 `type Rule`，因此 `Form.tsx` 中要加 `export type { Rule } from '@vertm/core';`，`index.ts` 不用改。`FormInstance._store` 的类型改用 core 的 `FormStore`。
- `useForm()` 签名不变，暂不暴露 `messages` 参数（避免扩大 API，留待接入 locale 时再做）。

**测试**（`store.test.ts`）：必填为空时报默认文案；`messages.required` 覆盖生效；`rule.message` 优先于 `messages`；`pattern` 失败；异步 `validator` 抛错；`reset()` 清空值并通知 `subscribeReset` 和 `subscribe` 的监听者；`setFieldsValue` 合并而不是覆盖。

---

### T8：小工具与 DOM 辅助

每一项都是"原样移入 + 补测试 + React 改为导入"。逐项列出：

| 新位置 | 导出 | 来源 | React 侧处理 |
|---|---|---|---|
| `utils/pagination.ts` | `buildPageList(current, totalPages)` | `pagination/Pagination.tsx:49` | 删除本地函数，改为导入 |
| `utils/format.ts` | `formatCountdown(remainingMs): string`（返回 `HH:MM:SS`，即 `Statistic.tsx:109-113` 的计算）、`formatFixed(value: number, precision?: number): string \| number` | `statistic/Statistic.tsx` | `formatValue` 保留在 React 侧处理 `ReactNode`，数字分支调用 `formatFixed`；Countdown 用 `formatCountdown(remaining)` |
| `utils/grid.ts` | `resolveGutter(gutter, isVertical)`、`spanToWidth(span)` | `grid/Grid.tsx:70`、`:82` | `buildColStyle` 留在 React 侧，调用 core 的 `spanToWidth` |
| `utils/splitter.ts` | `computeSplitRatio({ x, y, rect, axis, min = 0.15, max = 0.85 }): number`，`axis` 为 `'row' \| 'column'`，`rect` 为 `{ top, left, width, height }` | `splitter/Splitter.tsx:70` `handleMove` 内的比例计算 | `handleMove` 中调用它，`isColumn ? 'column' : 'row'` |
| `utils/breakpoints.ts` | `BREAKPOINTS`、`type Breakpoint`、`type BreakpointMap`、`resolveResponsiveValue` | `hooks/useBreakpoint.ts` | `useBreakpoint.ts` 只保留 hook 和 `getBreakpointMap`，从 core 导入并再导出 `BREAKPOINTS`、类型（`@vertm/react` 的 `index.ts` 对外导出不变） |
| `utils/sanitize.ts` | `stripNonPrintableAscii(value)`（即 `sanitizePasswordInput`，正则 `/[^\u0020-\u007E]/g`） | `input/Input.tsx:263-267` | `Password` 改用它 |
| `dom/focus-trap.ts` | `FOCUSABLE_SELECTOR`、`getFocusableElements(container)`、`handleFocusTrapKeydown(event: KeyboardEvent, root: HTMLElement)` | `hooks/useFocusTrap.ts` | hook 只保留 `useEffect` 注册/注销监听，监听函数内调用 `handleFocusTrapKeydown(event, container.current)` |
| `dom/register-font.ts` | `registerFont`、`type RegisterFontOptions` | `registerFont.ts:1-69` | `react/src/registerFont.ts` 保留 `useRegisterFont`，并 `export { registerFont, type RegisterFontOptions } from '@vertm/core/dom'` |
| `feedback/toast-queue.ts` | `createToastQueue`（见下） | `message/Message.tsx`、`notification/Notification.tsx` | 见下 |

**`createToastQueue` 规格**

```ts
export interface ToastQueueOptions<T> {
  /** Default auto-close duration in seconds; 0 keeps the item until destroyed. */
  defaultDuration: number;
  createId: () => string;
  /** Called after an item auto-closes (not on manual destroy). */
  onExpire?: (item: T & { id: string }) => void;
}

export interface ToastQueue<T> {
  /** Add an item; `durationSec` overrides the default; returns the id. */
  open(item: T, options?: { id?: string; durationSec?: number }): string;
  destroy(id?: string): void;
  /** Immutable snapshot; the array reference changes only when items change. */
  getItems(): ReadonlyArray<T & { id: string }>;
  subscribe(listener: () => void): () => void;
  /** Clear all pending timers (call on unmount). */
  dispose(): void;
}

export function createToastQueue<T>(options: ToastQueueOptions<T>): ToastQueue<T>;
```

行为要求，对照现有实现：

- Message：`duration` 默认 3 秒；`type === 'loading'` 不自动关闭；id 为 `` `msg-${Date.now()}-${Math.random().toString(36).slice(2)}` ``。
- Notification：`duration` 默认 4.5 秒；id 为 `` `vertm-notif-${seq}` ``，`seq` 自增。
- 自动关闭时先移除项，再调用该项配置里的 `onClose`（通过 `onExpire` 回调实现）。手动 `destroy` 不调用 `onClose`。
- `open` 的 `presetId` 参数（全局 API 排队调用时使用）通过 `options.id` 传入。

React 侧：

```ts
const queue = useMemo(
  () => createToastQueue<MessageConfig>({ defaultDuration: 3, createId: ..., onExpire: (item) => item.onClose?.() }),
  []
);
const items = useSyncExternalStore(queue.subscribe, queue.getItems, queue.getItems);
useEffect(() => () => queue.dispose(), [queue]);
```

Message 的 `open` 中，`loading` 类型传 `durationSec: 0`。`groupByPlacement` 留在 Notification 内。

**测试**：

- 每个 utils 模块至少 3 个用例；`buildPageList` 覆盖总页数 ≤ 7、当前页在开头、中间、结尾。
- `toast-queue.test.ts` 用 `vi.useFakeTimers()`：到时自动移除并触发 `onExpire`；`durationSec: 0` 不移除；`destroy(id)` 不触发 `onExpire`；`destroy()` 清空；`dispose()` 后计时器不再触发；`getItems()` 在无变化时返回同一引用。
- `focus-trap` 和 `register-font` 依赖 DOM，`core` 的测试环境是 `node`，不在 `core` 中写测试；现有 React 侧测试（Modal、Drawer 的焦点相关用例）通过即可。

**验收**：验证命令通过；`@vertm/react` 的 `index.ts` 导出名单与改动前完全一致（用 `git diff packages/react/src/index.ts` 确认没有删除导出）。

---

### T9：图标数据与框架解耦

**目的**：参考 TDesign 的图标做法，SVG 路径数据与 React 组件分离，以后 Vue 版直接复用数据。

**步骤**

1. 新建 `packages/icons/src/definitions.ts`：
   - 把 `IconDefinition` 接口从 `create-icon.tsx` 移到这里。
   - 把 `icons.tsx` 中 24 个 `createIconComponent({...})` 的参数对象，逐个提取为具名常量，命名为图标组件名的小驼峰加 `Def` 后缀，例如 `export const chevronRightDef: IconDefinition = { name: 'chevron-right', directional: true, paths: '...' };`。
   - 新增 `export function shouldRotateIcon(def: Pick<IconDefinition, 'directional'>, opts: { vertical: boolean; rotateForVertical: boolean }): boolean`，逻辑为 `!!def.directional && opts.rotateForVertical && opts.vertical`。
   - 本文件**不得**导入 `react`。
2. `create-icon.tsx`：从 `./definitions.js` 导入 `IconDefinition`、`shouldRotateIcon`，`shouldRotate` 改为调用 `shouldRotateIcon`；继续 `export type { IconDefinition }` 以保持对外 API。
3. `icons.tsx`：改为 `export const ChevronRight = createIconComponent(chevronRightDef);` 的形式。
4. `packages/icons/package.json` 的 `exports` 增加：

   ```json
   "./definitions": {
     "types": "./dist/definitions.d.ts",
     "import": "./dist/definitions.js"
   }
   ```

5. 同步 alias（同样写在 `'@vertm/icons'` 之前）：`react-demo/vite.config.ts` 增加 `'@vertm/icons/definitions': resolveSrc('../icons/src/definitions.ts')`；`docs/.dumirc.ts` 增加 `'@vertm/icons/definitions': pkg('../icons/src/definitions.ts')`。

**验收**：验证命令通过；`rg "from 'react'" packages/icons/src/definitions.ts` 为空；`packages/icons/dist/definitions.js` 存在。

---

## 4. 全部完成后的总验收

1. 根目录执行 `npm run build`、`npm test`、`npm run typecheck`，全部通过。
2. `npm run docs:build` 成功（验证文档站 alias）。
3. `core` 的 `purity.test.ts` 通过，`packages/core/package.json` 不含 React 依赖。
4. `rg "'Arrow(Up|Down|Left|Right)'" packages/react/src --glob '!*.test.*'` 为空。
5. `git diff bb609ae -- packages/react/src/**/*.test.tsx` 只有 `overlay/placement.test.ts` 的删除（移到了 core），没有其他测试改动。
6. `git diff bb609ae -- packages/react/src/index.ts` 没有删除任何导出。
7. 在 `CHANGELOG.md` 的未发布段落记录：新增 `@vertm/core/dom`、`@vertm/icons/definitions` 子路径；`@vertm/core` 新增导出清单；`createFormStore` 支持自定义校验文案。

## 5. 范围之外（不要做）

- 不新增 `@vertm/vue` 或任何其他技术栈的包。
- 不修改键位、默认弹层方向、组件视觉。
- 不把 `Form` 校验文案接入 `VertMLocale`（后续单独任务）。
- 不引入新的第三方依赖。
