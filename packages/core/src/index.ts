export {
  normalizeMongolianText,
  normalizeForSearch,
  containsMongolianScript,
  DEFAULT_VERTM_FONT_STACK,
  DEFAULT_WRITING_MODE,
  buildVertMTextStyles,
  type WritingMode,
  type VertMTextStyleOptions,
} from './normalize.js';

export * as MongolLetters from './mongol-letters.js';

export {
  genderOf,
  genderOfString,
  type Gender,
} from './vowel-harmony.js';

export {
  SUFFIXES,
  ALL_SUFFIXES,
  yinUnU,
  tuDu,
  taganDagan,
  taqiDaqi,
} from './suffix.js';

export {
  splitStemSuffix,
  isKnownSuffix,
  segmentForLineBreak,
  countBreakOpportunities,
  type StemSuffix,
  type BreakUnit,
} from './line-break.js';

export { MONGOLIAN_WORD_BANK } from './__fixtures__/word-bank.js';

// Back-compat re-exports; new code should import these from '@vertm/core/dom'.
export {
  detectMongolFonts,
  isFontLoaded,
  detectVerticalSupport,
  getVerticalLayoutClasses,
  type VerticalSupportResult,
  mapClickToIndex,
  getCaretRectAtIndex,
  getCaretPosition,
  type CaretPosition,
} from './dom/index.js';

export { countOverflowColumns } from './count-overflow-columns.js';

export {
  computeOverlayPosition,
  resolveDefaultPlacement,
  type Placement,
  type OverlayRect,
  type OverlayPosition,
  type OverlayKind,
} from './overlay/placement.js';

export {
  stepEnabledIndex,
  firstEnabledIndex,
  type NavigableItem,
} from './interaction/collection.js';

export {
  resolveSelectKey,
  resolveMenuItemKey,
  resolveSubMenuKey,
  resolveTabsKeyAxis,
  resolveTabsKey,
  resolveFieldKey,
  type SelectKeyAction,
  type MenuItemKeyAction,
  type SubMenuKeyAction,
  type TabsKeyAxis,
  type TabsKeyAction,
  type FieldKeyAction,
} from './interaction/keymap.js';

export {
  computeFieldColumns,
  type FieldColumnsInput,
  type FieldColumns,
} from './field/columns.js';

export {
  computeScrollToReveal,
  maxColumnScroll,
  reconcileColumnScroll,
} from './field/scroll.js';

export {
  moveSelection,
  mapCaretThroughSanitize,
  normalizeFieldValue,
  type FieldSelection,
} from './field/selection.js';

export {
  normalizeSelectValue,
  toggleSelectValue,
  filterOptionsBySearch,
  type SelectValue,
} from './select/selection.js';

export {
  createFormStore,
  DEFAULT_VALIDATE_MESSAGES,
  type Rule,
  type FormStore,
  type FormStoreOptions,
  type FormValidateMessages,
} from './form/store.js';

export { buildPageList } from './utils/pagination.js';
export { formatCountdown, formatFixed } from './utils/format.js';
export { resolveGutter, spanToWidth } from './utils/grid.js';
export { computeSplitRatio } from './utils/splitter.js';
export {
  BREAKPOINTS,
  resolveResponsiveValue,
  type Breakpoint,
  type BreakpointMap,
} from './utils/breakpoints.js';
export { stripNonPrintableAscii } from './utils/sanitize.js';
export {
  createToastQueue,
  type ToastQueue,
  type ToastQueueOptions,
} from './feedback/toast-queue.js';

export {
  buildVerticalCaretLayout,
  getVerticalCaretSlot,
  moveVerticalCaret,
  type VerticalCaretDirection,
  type VerticalCaretSlot,
} from './vertical-caret-nav.js';
