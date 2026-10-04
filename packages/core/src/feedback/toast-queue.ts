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

export function createToastQueue<T>(options: ToastQueueOptions<T>): ToastQueue<T> {
  let items: Array<T & { id: string }> = [];
  const listeners = new Set<() => void>();
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  const notify = () => listeners.forEach((listener) => listener());

  const clearTimer = (id: string) => {
    const timer = timers.get(id);
    if (timer != null) {
      clearTimeout(timer);
      timers.delete(id);
    }
  };

  return {
    open(item, openOptions) {
      const id = openOptions?.id ?? options.createId();
      const durationSec = openOptions?.durationSec ?? options.defaultDuration;
      const entry = { ...item, id };
      items = [...items, entry];
      notify();

      if (durationSec > 0) {
        const timer = setTimeout(() => {
          timers.delete(id);
          const found = items.find((entryItem) => entryItem.id === id);
          if (!found) return;
          items = items.filter((entryItem) => entryItem.id !== id);
          notify();
          options.onExpire?.(found);
        }, durationSec * 1000);
        timers.set(id, timer);
      }

      return id;
    },
    destroy(id) {
      if (id) {
        clearTimer(id);
        items = items.filter((entry) => entry.id !== id);
      } else {
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
        items = [];
      }
      notify();
    },
    getItems() {
      return items;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    },
  };
}
