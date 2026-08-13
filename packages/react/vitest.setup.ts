import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// jsdom 不实现布局，浮层定位与 autoSize 依赖的测量 API 需要可预测的桩值。
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

class ResizeObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

if (!('ResizeObserver' in window)) {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: ResizeObserverStub,
  });
}

if (!('IntersectionObserver' in window)) {
  class IntersectionObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
      return [];
    }
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: IntersectionObserverStub,
  });
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

// jsdom's Range lacks the rect APIs that @vertm/core's caret mapper relies on.
// Zero-sized rects keep the caret math on its "no measurable glyph" branch.
const emptyRect: DOMRect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  toJSON: () => ({}),
};

if (typeof Range.prototype.getClientRects !== 'function') {
  Range.prototype.getClientRects = function getClientRects() {
    const list: DOMRect[] = [];
    return Object.assign(list, {
      item: (index: number) => list[index] ?? null,
    }) as unknown as DOMRectList;
  };
}

if (typeof Range.prototype.getBoundingClientRect !== 'function') {
  Range.prototype.getBoundingClientRect = () => emptyRect;
}
