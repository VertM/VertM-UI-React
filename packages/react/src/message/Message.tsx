import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  CheckCircle,
  CloseCircle,
  InfoCircle,
  WarningCircle,
  Loading,
  Close,
} from '@vertm/icons';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMText } from '../VertMText.js';

export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface MessageConfig {
  /** 消息内容 */
  content: ReactNode;
  /** 消息类型 */
  type?: MessageType;
  /** 自动关闭延时（秒）；0 表示不自动关闭 @default 3 */
  duration?: number;
  /** 关闭时的回调 */
  onClose?: () => void;
}

interface MessageItem extends MessageConfig {
  id: string;
}

const ICONS = {
  success: CheckCircle,
  error: CloseCircle,
  info: InfoCircle,
  warning: WarningCircle,
  loading: Loading,
};

export interface MessageAPI {
  open: (config: MessageConfig) => string;
  success: (content: ReactNode, duration?: number) => string;
  error: (content: ReactNode, duration?: number) => string;
  info: (content: ReactNode, duration?: number) => string;
  warning: (content: ReactNode, duration?: number) => string;
  loading: (content: ReactNode, duration?: number) => string;
  destroy: (id?: string) => void;
}

/** The holder accepts a caller-assigned id so queued calls keep their handle. */
interface InternalMessageAPI extends MessageAPI {
  open: (config: MessageConfig, id?: string) => string;
}

const MessageContext = createContext<MessageAPI | null>(null);

let globalApi: InternalMessageAPI | null = null;
let holderRoot: Root | null = null;
let pending: Array<(api: InternalMessageAPI) => void> = [];

function MessageRenderer({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<MessageItem[]>([]);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pool = timers.current;
    return () => {
      pool.forEach(clearTimeout);
      pool.clear();
    };
  }, []);

  const destroy = useCallback((id?: string) => {
    if (id) setItems((prev) => prev.filter((m) => m.id !== id));
    else setItems([]);
  }, []);

  const open = useCallback(
    (config: MessageConfig, presetId?: string) => {
      const id = presetId ?? `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setItems((prev) => [...prev, { ...config, id }]);
      if (config.type !== 'loading' && (config.duration ?? 3) > 0) {
        const timer = setTimeout(() => {
          timers.current.delete(timer);
          destroy(id);
          config.onClose?.();
        }, (config.duration ?? 3) * 1000);
        timers.current.add(timer);
      }
      return id;
    },
    [destroy]
  );

  const api = useMemo<InternalMessageAPI>(
    () => ({
      open,
      success: (c, d) => open({ type: 'success', content: c, duration: d }),
      error: (c, d) => open({ type: 'error', content: c, duration: d }),
      info: (c, d) => open({ type: 'info', content: c, duration: d }),
      warning: (c, d) => open({ type: 'warning', content: c, duration: d }),
      loading: (c, d = 0) => open({ type: 'loading', content: c, duration: d }),
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

  return (
    <MessageContext.Provider value={api}>
      {children}
      <div className="vertm-message-container vertm-vertical" aria-live="polite">
        {items.map((item) => {
          const Icon = ICONS[item.type ?? 'info'];
          return (
            <div
              key={item.id}
              className={`vertm-message vertm-split vertm-split--with-icon vertm-message--${item.type ?? 'info'}`}
              role="alert"
            >
              <div className="vertm-split__start">
                <Icon spin={item.type === 'loading'} className="vertm-message__icon" vertical />
                <span className="vertm-split__title vertm-message__content">
                  {typeof item.content === 'string' ? (
                    <VertMText as="span" text={item.content} />
                  ) : (
                    item.content
                  )}
                </span>
              </div>
              <div className="vertm-split__end vertm-split__end--top">
                <button
                  type="button"
                  className="vertm-message__close"
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
          );
        })}
      </div>
    </MessageContext.Provider>
  );
}

function ensureGlobalHolder() {
  if (typeof document === 'undefined' || holderRoot) return;
  const el = document.createElement('div');
  el.id = 'vertm-message-root';
  document.body.appendChild(el);
  holderRoot = createRoot(el);
  holderRoot.render(
    <VertMConfigProvider>
      <MessageRenderer />
    </VertMConfigProvider>
  );
}

let globalSeq = 0;

/**
 * React renders the detached root asynchronously, so the first call of a
 * session arrives before the holder exists. Queue instead of dropping it.
 */
function withApi(fn: (api: InternalMessageAPI) => void): void {
  ensureGlobalHolder();
  if (globalApi) fn(globalApi);
  else pending.push(fn);
}

function openGlobal(config: MessageConfig): string {
  globalSeq += 1;
  const id = `vertm-msg-global-${globalSeq}`;
  withApi((api) => api.open(config, id));
  return id;
}

export const message: MessageAPI = {
  open: (c) => openGlobal(c),
  success: (c, d) => openGlobal({ type: 'success', content: c, duration: d }),
  error: (c, d) => openGlobal({ type: 'error', content: c, duration: d }),
  info: (c, d) => openGlobal({ type: 'info', content: c, duration: d }),
  warning: (c, d) => openGlobal({ type: 'warning', content: c, duration: d }),
  loading: (c, d = 0) => openGlobal({ type: 'loading', content: c, duration: d }),
  destroy: (id) => withApi((api) => api.destroy(id)),
};

export function useMessage(): MessageAPI {
  const ctx = useContext(MessageContext);
  return ctx ?? message;
}

/**
 * Renders messages inside the app tree so they inherit theme, writing mode
 * and locale from the nearest VertMConfigProvider.
 */
export function MessageHolder({ children }: { children?: ReactNode }) {
  return <MessageRenderer>{children}</MessageRenderer>;
}
