/** Caret immediately below a glyph's ink box in vertical-lr. */
function resolveCaretBelowGlyphIndex(
  textNode: Text,
  glyphIndex: number,
  textEl: HTMLElement,
  parentRect: DOMRect
): CaretPosition | null {
  if (glyphIndex < 0 || glyphIndex >= textNode.length) return null;

  const { columnWidth, lineAdvance, fontSize } = getColumnMetrics(textEl);
  const range = document.createRange();
  range.setStart(textNode, glyphIndex);
  range.setEnd(textNode, glyphIndex + 1);
  const rects = range.getClientRects();
  const glyphRect = rects.length > 0 ? rects[0] : null;

  if (glyphRect && (glyphRect.width || glyphRect.height)) {
    return {
      top: glyphRect.bottom - parentRect.top,
      left: glyphRect.left - parentRect.left,
      width: normalizeVerticalCaretWidth(glyphRect.width, columnWidth, fontSize),
      height: CARET_THICKNESS,
    };
  }

  const anchor = getCollapsedRangeRect(textNode, glyphIndex);
  if (!anchor) return null;
  const offset = anchor.height > 0 ? anchor.height : lineAdvance;
  return {
    top: anchor.top - parentRect.top + offset,
    left: anchor.left - parentRect.left,
    width: normalizeVerticalCaretWidth(anchor.width, columnWidth, fontSize),
    height: CARET_THICKNESS,
  };
}

/** Place caret below the last rendered glyph (end-of-text in vertical-lr). */
function resolveCaretBelowLastGlyph(
  textNode: Text,
  text: string,
  textEl: HTMLElement,
  parentRect: DOMRect
): CaretPosition | null {
  if (!text.length) return null;
  if (text[text.length - 1] === '\n') return null;

  const belowGlyph = resolveCaretBelowGlyphIndex(
    textNode,
    text.length - 1,
    textEl,
    parentRect
  );
  if (belowGlyph) return belowGlyph;

  const endRect = getCollapsedRangeRect(textNode, text.length);
  if (!endRect || (!endRect.height && !endRect.width)) return null;

  const { columnWidth, fontSize } = getColumnMetrics(textEl);
  return {
    top: endRect.top - parentRect.top,
    left: endRect.left - parentRect.left,
    width: normalizeVerticalCaretWidth(endRect.width, columnWidth, fontSize),
    height: CARET_THICKNESS,
  };
}

/**
 * Map a click position to a character index in vertical Mongolian text.
 * Uses binary search over character positions measured via Range API.
 */
export function mapClickToIndex(
  container: HTMLElement,
  clientX: number,
  clientY: number,
  textLength: number
): number {
  if (textLength === 0) return 0;

  const rect = container.getBoundingClientRect();
  if (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return textLength;
  }

  let bestIndex = textLength;
  let bestDistance = Infinity;

  for (let i = 0; i <= textLength; i++) {
    const pos = getCaretRectAtIndex(container, i);
    if (!pos) continue;

    const dx = clientX - (pos.left + pos.width / 2);
    const dy = clientY - (pos.top + pos.height / 2);
    const distance = dx * dx + dy * dy;

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = i;
    }
  }

  return bestIndex;
}

/**
 * Get bounding rect for caret position at a given text index.
 */
export function getCaretRectAtIndex(
  container: HTMLElement,
  index: number
): DOMRect | null {
  const textNode = findTextNode(container);
  if (!textNode) return null;

  const range = document.createRange();
  const safeIndex = Math.min(index, textNode.length);
  range.setStart(textNode, safeIndex);
  range.setEnd(textNode, safeIndex);

  const rects = range.getClientRects();
  if (rects.length > 0) return rects[0];

  const boundingRect = range.getBoundingClientRect();
  if (boundingRect.width === 0 && boundingRect.height === 0) {
    return container.getBoundingClientRect();
  }
  return boundingRect;
}

function findTextNode(element: HTMLElement): Text | null {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  return walker.nextNode() as Text | null;
}

/** Element that actually carries the writing-mode (the text node's parent). */
function findTextElement(container: HTMLElement): HTMLElement {
  const textNode = findTextNode(container);
  return (textNode?.parentElement as HTMLElement) ?? container;
}

function isVerticalWritingMode(el: HTMLElement): boolean {
  if (typeof getComputedStyle === 'undefined') return true;
  return getComputedStyle(el).writingMode.startsWith('vertical');
}

/** Read text inset from the text layer (vertical-lr → inline = physical top/bottom). */
function getTextInset(textEl: HTMLElement): { inlineStart: number; blockStart: number } {
  if (typeof getComputedStyle === 'undefined') {
    return { inlineStart: 0, blockStart: 0 };
  }
  const styles = getComputedStyle(textEl);
  const inlineStart = parseFloat(styles.paddingInlineStart) || 0;
  const blockStart = parseFloat(styles.paddingBlockStart) || 0;
  return { inlineStart, blockStart };
}

interface ColumnMetrics {
  columnWidth: number;
  lineAdvance: number;
  inlineStart: number;
  blockStart: number;
  fontSize: number;
}

function getColumnMetrics(textEl: HTMLElement): ColumnMetrics {
  if (typeof getComputedStyle === 'undefined') {
    return { columnWidth: 16, lineAdvance: 25.6, inlineStart: 0, blockStart: 0, fontSize: 16 };
  }
  const styles = getComputedStyle(textEl);
  const fontSize = parseFloat(styles.fontSize) || 16;
  const lhRaw = styles.lineHeight;
  let lineAdvance = fontSize * 1.6;
  const lhNum = parseFloat(lhRaw);
  if (lhRaw.endsWith('px')) {
    lineAdvance = lhNum;
  } else if (!Number.isNaN(lhNum)) {
    lineAdvance = fontSize * lhNum;
  }
  const { inlineStart, blockStart } = getTextInset(textEl);
  return { columnWidth: lineAdvance, lineAdvance, inlineStart, blockStart, fontSize };
}

function getCollapsedRangeRect(textNode: Text, index: number): DOMRect | null {
  const safeIndex = Math.min(Math.max(0, index), textNode.length);
  const range = document.createRange();
  range.setStart(textNode, safeIndex);
  range.setEnd(textNode, safeIndex);
  const rects = range.getClientRects();
  if (rects.length > 0) return rects[0];
  const collapsed = range.getBoundingClientRect();
  return collapsed.width || collapsed.height ? collapsed : null;
}

function splitVerticalSegments(
  text: string,
  index: number
): { columnIndex: number; rowInColumn: number; colStart: number } {
  const head = text.slice(0, index);
  const lines = head.split('\n');
  const columnIndex = lines.length - 1;
  const rowInColumn = [...lines[columnIndex]].length;
  let colStart = 0;
  for (let i = 0; i < columnIndex; i++) {
    colStart += lines[i].length + 1;
  }
  return { columnIndex, rowInColumn, colStart };
}

/** True when caret sits at the top of a new column (right after Enter). */
function needsVerticalColumnFallback(text: string, index: number): boolean {
  if (index === 0) return false;
  if (index > 0 && text[index - 1] === '\n') return true;
  if (index < text.length && text[index] === '\n') return true;
  if (index === text.length) {
    const tail = text.split('\n').pop() ?? '';
    if (tail === '') return true;
  }
  return false;
}

function normalizeVerticalCaretWidth(
  measured: number,
  columnWidth: number,
  fontSize: number
): number {
  if (!measured || measured > columnWidth * 1.25) return columnWidth;
  return measured || fontSize;
}

function resolveColumnLeft(
  textNode: Text,
  textEl: HTMLElement,
  parentRect: DOMRect,
  columnIndex: number,
  columnWidth: number,
  blockStart: number,
  colStart: number
): number {
  const tRect = textEl.getBoundingClientRect();
  if (columnIndex === 0) {
    return tRect.left - parentRect.left + blockStart;
  }

  const prevLast = colStart - 2;
  if (prevLast >= 0) {
    const prev = getCollapsedRangeRect(textNode, prevLast);
    if (prev) {
      return prev.left - parentRect.left + columnWidth;
    }
  }

  const newlineIndex = colStart - 1;
  if (newlineIndex >= 0) {
    const nl = getCollapsedRangeRect(textNode, newlineIndex);
    if (nl) {
      return nl.left - parentRect.left + columnWidth;
    }
  }

  return tRect.left - parentRect.left + blockStart + columnIndex * columnWidth;
}

/** Fallback when Range collapses at a column break (common after Enter in TextArea). */
function resolveVerticalCaretFallback(
  textNode: Text,
  index: number,
  textEl: HTMLElement,
  parentRect: DOMRect
): CaretPosition {
  const text = textNode.textContent ?? '';
  const { columnWidth, inlineStart, blockStart } = getColumnMetrics(textEl);
  const tRect = textEl.getBoundingClientRect();
  const { columnIndex, rowInColumn, colStart } = splitVerticalSegments(text, index);

  if (rowInColumn > 0) {
    const below = resolveCaretBelowGlyphIndex(
      textNode,
      colStart + rowInColumn - 1,
      textEl,
      parentRect
    );
    if (below) return below;
  }

  return {
    top: tRect.top - parentRect.top + inlineStart,
    left: resolveColumnLeft(
      textNode,
      textEl,
      parentRect,
      columnIndex,
      columnWidth,
      blockStart,
      colStart
    ),
    width: columnWidth,
    height: CARET_THICKNESS,
  };
}

/** Caret origin when Range gives no rect — mirrors text padding tokens. */
function getCaretOrigin(
  textContainer: HTMLElement,
  parentRect: DOMRect,
  vertical: boolean,
  fontSize: number
): CaretPosition {
  const textEl = findTextElement(textContainer);
  const tRect = textEl.getBoundingClientRect();
  const { inlineStart, blockStart } = getTextInset(textEl);
  const { columnWidth } = getColumnMetrics(textEl);
  const top = tRect.top - parentRect.top + (vertical ? inlineStart : blockStart);
  const left = tRect.left - parentRect.left + (vertical ? blockStart : inlineStart);
  return vertical
    ? { top, left, width: columnWidth, height: CARET_THICKNESS }
    : { top, left, width: CARET_THICKNESS, height: fontSize };
}

export interface CaretPosition {
  top: number;
  left: number;
  height: number;
  width: number;
}

const CARET_THICKNESS = 2;

/**
 * Get caret overlay geometry for a text index, relative to a positioning
 * parent (the element the caret overlay is absolutely positioned within).
 *
 * The caret is oriented to match the writing mode: in vertical Mongolian text
 * (vertical-lr / vertical-rl) it is a horizontal bar spanning the glyph's
 * cross-axis width; in horizontal text it is the usual vertical bar.
 *
 * @param textContainer Element containing the text node to measure.
 * @param index Character index for the caret.
 * @param positioningParent Offset parent for the overlay. Defaults to textContainer.
 */
export function getCaretPosition(
  textContainer: HTMLElement,
  index: number,
  positioningParent?: HTMLElement
): CaretPosition | null {
  const parent = positioningParent ?? textContainer;
  const parentRect = parent.getBoundingClientRect();
  const textEl = findTextElement(textContainer);
  const vertical = isVerticalWritingMode(textEl);
  const { columnWidth, fontSize } = getColumnMetrics(textEl);

  const textNode = findTextNode(textContainer);
  const text = textNode?.textContent ?? '';

  if (textNode && vertical && text.length > 0 && index >= text.length) {
    const belowLast = resolveCaretBelowLastGlyph(textNode, text, textEl, parentRect);
    if (belowLast) return belowLast;
  }

  if (textNode && vertical && needsVerticalColumnFallback(text, index)) {
    return resolveVerticalCaretFallback(textNode, index, textEl, parentRect);
  }

  if (textNode && textNode.length > 0) {
    const safeIndex = Math.min(Math.max(0, index), textNode.length);
    const range = document.createRange();
    range.setStart(textNode, safeIndex);
    range.setEnd(textNode, safeIndex);

    const rects = range.getClientRects();
    let caretRect: DOMRect | null = rects.length > 0 ? rects[0] : null;
    if (!caretRect) {
      const collapsed = range.getBoundingClientRect();
      caretRect = collapsed.width || collapsed.height ? collapsed : null;
    }

    if (caretRect) {
      if (vertical) {
        const left = caretRect.left - parentRect.left;
        const top = caretRect.top - parentRect.top;
        return {
          top,
          left,
          width: normalizeVerticalCaretWidth(caretRect.width, columnWidth, fontSize),
          height: CARET_THICKNESS,
        };
      }

      const top = caretRect.top - parentRect.top;
      const left = caretRect.left - parentRect.left;
      return {
        top,
        left,
        width: CARET_THICKNESS,
        height: caretRect.height || fontSize,
      };
    }

    if (vertical) {
      return resolveVerticalCaretFallback(textNode, index, textEl, parentRect);
    }
  }

  return getCaretOrigin(textContainer, parentRect, vertical, fontSize);
}
