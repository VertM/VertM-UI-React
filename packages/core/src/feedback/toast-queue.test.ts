import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createToastQueue } from './toast-queue.js';

describe('createToastQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('auto-removes an item and calls onExpire', () => {
    const onExpire = vi.fn();
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 1,
      createId: () => 'a',
      onExpire,
    });
    queue.open({ label: 'one' });
    expect(queue.getItems()).toHaveLength(1);
    vi.advanceTimersByTime(1000);
    expect(queue.getItems()).toHaveLength(0);
    expect(onExpire).toHaveBeenCalledWith({ label: 'one', id: 'a' });
  });

  it('keeps durationSec: 0 until destroyed', () => {
    const onExpire = vi.fn();
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 1,
      createId: () => 'a',
      onExpire,
    });
    queue.open({ label: 'sticky' }, { durationSec: 0 });
    vi.advanceTimersByTime(5000);
    expect(queue.getItems()).toHaveLength(1);
    expect(onExpire).not.toHaveBeenCalled();
  });

  it('does not call onExpire for manual destroy', () => {
    const onExpire = vi.fn();
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 3,
      createId: () => 'a',
      onExpire,
    });
    queue.open({ label: 'one' });
    queue.destroy('a');
    expect(queue.getItems()).toHaveLength(0);
    expect(onExpire).not.toHaveBeenCalled();
  });

  it('clears everything with destroy()', () => {
    let n = 0;
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 0,
      createId: () => `id-${++n}`,
    });
    queue.open({ label: 'a' });
    queue.open({ label: 'b' });
    queue.destroy();
    expect(queue.getItems()).toHaveLength(0);
  });

  it('stops timers after dispose()', () => {
    const onExpire = vi.fn();
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 1,
      createId: () => 'a',
      onExpire,
    });
    queue.open({ label: 'one' });
    queue.dispose();
    vi.advanceTimersByTime(1000);
    expect(onExpire).not.toHaveBeenCalled();
  });

  it('returns the same getItems() reference when nothing changed', () => {
    const queue = createToastQueue<{ label: string }>({
      defaultDuration: 0,
      createId: () => 'a',
    });
    queue.open({ label: 'one' });
    const first = queue.getItems();
    expect(queue.getItems()).toBe(first);
  });
});
