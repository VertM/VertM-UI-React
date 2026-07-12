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

export { countOverflowColumns } from './count-overflow-columns.js';

export {
  buildVerticalCaretLayout,
  getVerticalCaretSlot,
  moveVerticalCaret,
  type VerticalCaretDirection,
  type VerticalCaretSlot,
} from './vertical-caret-nav.js';
