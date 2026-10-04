import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createToastQueue } from '@vertm/core';
import { Close } from '@vertm/icons';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMText } from '../VertMText.js';

export type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface NotificationConfig {
  /** 通知标题 */
  message: ReactNode;
  /** 通知描述 */
  description?: ReactNode;
  /** 通知类型 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 自动关闭延时（秒） @default 4.5 */
  duration?: number;
  /** 弹出位置 @default 'topRight' */
  placement?: NotificationPlacement;
  /** 关闭时的回调 */
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

/** The holder accepts a caller-assigned id so queued calls keep their handle. */
interface InternalNotificationAPI extends NotificationAPI {
  open: (config: NotificationConfig, id?: string) => string;
}

const NotificationContext = createContext<NotificationAPI | null>(null);

let globalApi: InternalNotificationAPI | null = null;
let globalRoot: Root | null = null;
let pending: Array<(api: InternalNotificationAPI) => void> = [];

function groupByPlacement(list: readonly NotificationItem[]) {
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
  const seq = useRef(0);
  const queue = useMemo(
    () =>
      createToastQueue<NotificationConfig>({
        defaultDuration: 4.5,
        createId: () => {
          seq.current += 1;
          return `vertm-notif-${seq.current}`;
        },
        onExpire: (item) => item.onClose?.(),
      }),
    []
  );
  const items = useSyncExternalStore(queue.subscribe, queue.getItems, queue.getItems);

  useEffect(() => () => queue.dispose(), [queue]);

  const destroy = useCallback((id?: string) => queue.destroy(id), [queue]);

  const open = useCallback(
    (config: NotificationConfig, presetId?: string) =>
      queue.open(config, {
        id: presetId,
        durationSec: config.duration,
      }),
    [queue]
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

  const grouped = groupByPlacement(items as NotificationItem[]);

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
