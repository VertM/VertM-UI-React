import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Close } from '@vertm/icons';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMText } from '../VertMText.js';

export type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface NotificationConfig {
  message: ReactNode;
  description?: ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  placement?: NotificationPlacement;
  onClose?: () => void;
}

interface NotificationItem extends NotificationConfig {
  id: string;
}

export interface NotificationAPI {
  open: (config: NotificationConfig) => string;
  success: (config: Omit<NotificationConfig, 'type'>) => string;
  error: (config: Omit<NotificationConfig, 'type'>) => string;
  info: (config: Omit<NotificationConfig, 'type'>) => string;
  warning: (config: Omit<NotificationConfig, 'type'>) => string;
  destroy: (id?: string) => void;
}

const DEFAULT_DURATION = 4.5;

/** The holder accepts a caller-assigned id so queued calls keep their handle. */
interface InternalNotificationAPI extends NotificationAPI {
  open: (config: NotificationConfig, id?: string) => string;
}

const NotificationContext = createContext<NotificationAPI | null>(null);

let globalApi: InternalNotificationAPI | null = null;
let globalRoot: Root | null = null;
let pending: Array<(api: InternalNotificationAPI) => void> = [];

function groupByPlacement(list: NotificationItem[]) {
  const map: Partial<Record<NotificationPlacement, NotificationItem[]>> = {};
  for (const item of list) {
    const p = item.placement ?? 'topRight';
    (map[p] ??= []).push(item);
  }
  return map;
}

/**
 * Renders notifications inside the app tree so they inherit theme, writing
 * mode and locale from the nearest VertMConfigProvider.
 */
export function NotificationHolder({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const seq = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pool = timers.current;
    return () => {
      pool.forEach(clearTimeout);
      pool.clear();
    };
  }, []);

  const destroy = useCallback((id?: string) => {
    setItems((prev) => (id ? prev.filter((n) => n.id !== id) : []));
  }, []);

  const open = useCallback(
    (config: NotificationConfig, presetId?: string) => {
      seq.current += 1;
      const id = presetId ?? `vertm-notif-${seq.current}`;
      setItems((prev) => [...prev, { ...config, id }]);

      const duration = config.duration ?? DEFAULT_DURATION;
      if (duration > 0) {
        const timer = setTimeout(() => {
          timers.current.delete(timer);
          destroy(id);
          config.onClose?.();
        }, duration * 1000);
        timers.current.add(timer);
      }
      return id;
    },
    [destroy]
  );

  const api = useMemo<InternalNotificationAPI>(
    () => ({
      open,
      success: (cfg) => open({ ...cfg, type: 'success' }),
      error: (cfg) => open({ ...cfg, type: 'error' }),
      info: (cfg) => open({ ...cfg, type: 'info' }),
      warning: (cfg) => open({ ...cfg, type: 'warning' }),
      destroy,
    }),
    [open, destroy]
  );

  useEffect(() => {
    globalApi = api;
    // Calls made before this holder finished mounting were parked, not dropped.
    const queued = pending;
    pending = [];
    queued.forEach((fn) => fn(api));
    return () => {
      globalApi = null;
    };
  }, [api]);

  const grouped = groupByPlacement(items);

  return (
    <NotificationContext.Provider value={api}>
      {children}
      {(Object.keys(grouped) as NotificationPlacement[]).map((placement) => (
        <div
          key={placement}
          className={`vertm-notification-stack vertm-notification-stack--${placement}`}
        >
          {grouped[placement]?.map((item) => (
            <div
              key={item.id}
              className={`vertm-notification vertm-split vertm-notification--${item.type ?? 'info'}`}
              role="alert"
            >
              <div className="vertm-split__start">
                <div className="vertm-split__title vertm-notification__message">
                  {typeof item.message === 'string' ? (
                    <VertMText as="span" text={item.message} />
                  ) : (
                    item.message
                  )}
                </div>
              </div>
              {item.description && (
                <div className="vertm-split__center vertm-notification__description">
                  {typeof item.description === 'string' ? (
                    <VertMText as="span" text={item.description} />
                  ) : (
                    item.description
                  )}
                </div>
              )}
              <div className="vertm-split__end vertm-split__end--top">
                <button
                  type="button"
                  className="vertm-notification__close"
                  aria-label="Close"
                  onClick={() => {
                    destroy(item.id);
                    item.onClose?.();
                  }}
                >
                  <Close size="small" vertical={false} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </NotificationContext.Provider>
  );
}

function ensureGlobalHolder() {
  if (typeof document === 'undefined' || globalRoot) return;
  const el = document.createElement('div');
  el.id = 'vertm-notification-root';
  document.body.appendChild(el);
  globalRoot = createRoot(el);
  globalRoot.render(
    <VertMConfigProvider>
      <NotificationHolder />
    </VertMConfigProvider>
  );
}

let globalSeq = 0;

/**
 * React renders the detached root asynchronously, so the first call of a
 * session arrives before the holder exists. Queue instead of dropping it.
 */
function withApi(fn: (api: InternalNotificationAPI) => void): void {
  ensureGlobalHolder();
  if (globalApi) fn(globalApi);
  else pending.push(fn);
}

function openGlobal(config: NotificationConfig): string {
  globalSeq += 1;
  const id = `vertm-notif-global-${globalSeq}`;
  withApi((api) => api.open(config, id));
  return id;
}

export const notification: NotificationAPI = {
  open: (cfg) => openGlobal(cfg),
  success: (cfg) => openGlobal({ ...cfg, type: 'success' }),
  error: (cfg) => openGlobal({ ...cfg, type: 'error' }),
  info: (cfg) => openGlobal({ ...cfg, type: 'info' }),
  warning: (cfg) => openGlobal({ ...cfg, type: 'warning' }),
  destroy: (id) => withApi((api) => api.destroy(id)),
};

/** Context-aware notification API; falls back to the detached global holder. */
export function useNotification(): NotificationAPI {
  return useContext(NotificationContext) ?? notification;
}
