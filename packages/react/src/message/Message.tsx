import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
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
  content: ReactNode;
  type?: MessageType;
  duration?: number;
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

const MessageContext = createContext<MessageAPI | null>(null);

let globalApi: MessageAPI | null = null;
let holderRoot: Root | null = null;

function MessageRenderer() {
  const [items, setItems] = useState<MessageItem[]>([]);

  const destroy = useCallback((id?: string) => {
    if (id) setItems((prev) => prev.filter((m) => m.id !== id));
    else setItems([]);
  }, []);

  const open = useCallback(
    (config: MessageConfig) => {
      const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setItems((prev) => [...prev, { ...config, id }]);
      if (config.type !== 'loading' && (config.duration ?? 3) > 0) {
        setTimeout(() => {
          destroy(id);
          config.onClose?.();
        }, (config.duration ?? 3) * 1000);
      }
      return id;
    },
    [destroy]
  );

  const api = useMemo<MessageAPI>(
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
    return () => {
      globalApi = null;
    };
  }, [api]);

  return (
    <MessageContext.Provider value={api}>
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

const fallbackApi: MessageAPI = {
  open: () => '',
  success: () => '',
  error: () => '',
  info: () => '',
  warning: () => '',
  loading: () => '',
  destroy: () => {},
};

function getApi(): MessageAPI {
  ensureGlobalHolder();
  return globalApi ?? fallbackApi;
}

export const message: MessageAPI = {
  open: (c) => getApi().open(c),
  success: (c, d) => getApi().success(c, d),
  error: (c, d) => getApi().error(c, d),
  info: (c, d) => getApi().info(c, d),
  warning: (c, d) => getApi().warning(c, d),
  loading: (c, d) => getApi().loading(c, d),
  destroy: (id) => getApi().destroy(id),
};

export function useMessage(): MessageAPI {
  const ctx = useContext(MessageContext);
  return ctx ?? message;
}

export function MessageHolder() {
  return <MessageRenderer />;
}
