import { segmentCaretBoundaries } from './mongol-caret-units.js';

export type VerticalCaretDirection = 'up' | 'down' | 'left' | 'right';

export interface VerticalCaretSlot {
  index: number;
  col: number;
  row: number;
}

/** Map caret indices to vertical-lr column/row coordinates. */
export function buildVerticalCaretLayout(text: string, columnDepth: number): VerticalCaretSlot[] {
  const depth = Math.max(1, columnDepth);
  const boundaries = segmentCaretBoundaries(text);
  const slots: VerticalCaretSlot[] = [{ index: 0, col: 0, row: 0 }];
  let col = 0;
  let rowsInCol = 0;

  for (let b = 1; b < boundaries.length; b++) {
    const index = boundaries[b];
    const prev = boundaries[b - 1];
    const slice = text.slice(prev, index);

    if (slice === '\n') {
      col += 1;
      rowsInCol = 0;
      slots.push({ index, col, row: 0 });
      continue;
    }

    if (rowsInCol >= depth) {
      col += 1;
      rowsInCol = 0;
    }
    rowsInCol += 1;
    slots.push({ index, col, row: rowsInCol });
  }

  return slots;
}

function findSlotIndex(slots: VerticalCaretSlot[], textIndex: number): number {
  let found = 0;
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].index <= textIndex) found = i;
    else break;
  }
  return found;
}

function slotAtTextIndex(slots: VerticalCaretSlot[], textIndex: number): VerticalCaretSlot {
  return slots[findSlotIndex(slots, textIndex)] ?? slots[0];
}

/** Column/row of a caret index in vertical-lr layout. */
export function getVerticalCaretSlot(
  text: string,
  columnDepth: number,
  index: number
): VerticalCaretSlot {
  return slotAtTextIndex(buildVerticalCaretLayout(text, columnDepth), index);
}

function maxRowInCol(slots: VerticalCaretSlot[], col: number): number {
  let max = 0;
  for (const slot of slots) {
    if (slot.col === col && slot.row > max) max = slot.row;
  }
  return max;
}

function maxCol(slots: VerticalCaretSlot[]): number {
  let max = 0;
  for (const slot of slots) {
    if (slot.col > max) max = slot.col;
  }
  return max;
}

function findIndexByColRow(
  slots: VerticalCaretSlot[],
  col: number,
  row: number
): number | null {
  const match = slots.find((slot) => slot.col === col && slot.row === row);
  return match?.index ?? null;
}

/**
 * Move a caret index in vertical Mongolian layout.
 * Up/Down stay within a column; Left/Right move between columns.
 */
export function moveVerticalCaret(
  text: string,
  columnDepth: number,
  index: number,
  direction: VerticalCaretDirection
): number {
  const len = text.length;
  const current = Math.max(0, Math.min(index, len));
  const slots = buildVerticalCaretLayout(text, columnDepth);
  const si = findSlotIndex(slots, current);
  const pos = slots[si];

  if (direction === 'up') {
    if (current > pos.index) {
      if (si > 0 && slots[si - 1].col === pos.col) return slots[si - 1].index;
      return pos.index;
    }
    if (si <= 0) return current;
    const prev = slots[si - 1];
    if (prev.col === pos.col) return prev.index;
    return current;
  }

  if (direction === 'down') {
    if (current < pos.index) return pos.index;
    if (si >= slots.length - 1) return current;
    const next = slots[si + 1];
    if (next.col === pos.col) return next.index;
    return current;
  }

  if (direction === 'left') {
    const targetCol = pos.col - 1;
    if (targetCol < 0) return current;
    const targetRow = Math.min(pos.row, maxRowInCol(slots, targetCol));
    return findIndexByColRow(slots, targetCol, targetRow) ?? current;
  }

  const targetCol = pos.col + 1;
  if (targetCol > maxCol(slots)) return current;
  const targetRow = Math.min(pos.row, maxRowInCol(slots, targetCol));
  return findIndexByColRow(slots, targetCol, targetRow) ?? current;
}
