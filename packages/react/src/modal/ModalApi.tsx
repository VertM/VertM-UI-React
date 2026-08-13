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
import { CheckCircle, CloseCircle, InfoCircle, WarningCircle } from '@vertm/icons';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMButton } from '../button/Button.js';
import { VertMText } from '../VertMText.js';
import { VertMModal } from './Modal.js';

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning';

export interface ModalFuncConfig {
  title?: ReactNode;
  content?: ReactNode;
  okText?: string;
  cancelText?: string;
  /** Resolve to close, reject to keep the dialog open. Shows a loading OK button. */
  onOk?: () => void | Promise<unknown>;
  onCancel?: () => void;
  /** Hide the cancel button; defaults to true for the single-action variants. */
  okOnly?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  className?: string;
}

export interface ModalFuncReturn {
  destroy: () => void;
  update: (config: ModalFuncConfig) => void;
}

export interface ModalAPI {
  confirm: (config: ModalFuncConfig) => ModalFuncReturn;
  info: (config: ModalFuncConfig) => ModalFuncReturn;
  success: (config: ModalFuncConfig) => ModalFuncReturn;
  error: (config: ModalFuncConfig) => ModalFuncReturn;
  warning: (config: ModalFuncConfig) => ModalFuncReturn;
}

interface ConfirmItem extends ModalFuncConfig {
  id: string;
  type: ConfirmType;
}

const TYPE_ICONS = {
  confirm: WarningCircle,
  info: InfoCircle,
  success: CheckCircle,
  error: CloseCircle,
  warning: WarningCircle,
};

const DEFAULT_OK_TEXT = 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠨ᠎ᠡ';
const DEFAULT_CANCEL_TEXT = 'ᠦᠭᠡᠢ';

/** Id-addressed operations so queued global calls keep a working handle. */
interface InternalModalAPI extends ModalAPI {
  openWithId: (type: ConfirmType, config: ModalFuncConfig, id: string) => void;
  destroyById: (id: string) => void;
  updateById: (id: string, config: ModalFuncConfig) => void;
}

const ModalContext = createContext<ModalAPI | null>(null);

let globalApi: InternalModalAPI | null = null;
let globalRoot: Root | null = null;
let pending: Array<(api: InternalModalAPI) => void> = [];

function ConfirmDialog({ item, onClose }: { item: ConfirmItem; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const Icon = TYPE_ICONS[item.type];
  const showCancel = !(item.okOnly ?? item.type !== 'confirm');

  const handleOk = async () => {
    if (!item.onOk) {
      onClose();
      return;
    }
    try {
      const result = item.onOk();
      if (result instanceof Promise) {
        setLoading(true);
        await result;
      }
      onClose();
    } catch {
      // A rejected onOk keeps the dialog open so the user can retry.
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  const handleCancel = () => {
    item.onCancel?.();
    onClose();
  };

  return (
    <VertMModal
      open
      className={['vertm-modal--confirm', `vertm-modal--confirm-${item.type}`, item.className]
        .filter(Boolean)
        .join(' ')}
      title={
        item.title != null ? (
          <span className="vertm-modal__confirm-title">
            <Icon className="vertm-modal__confirm-icon" vertical={false} />
            {typeof item.title === 'string' ? (
              <VertMText as="span" text={item.title} />
            ) : (
              item.title
            )}
          </span>
        ) : undefined
      }
      mask={item.mask}
      maskClosable={item.maskClosable ?? false}
      width={item.width}
      onCancel={handleCancel}
      footer={
        <>
          {showCancel && (
            <VertMButton disabled={loading} onClick={handleCancel}>
              {item.cancelText ?? DEFAULT_CANCEL_TEXT}
            </VertMButton>
          )}
          <VertMButton type="primary" loading={loading} onClick={handleOk}>
            {item.okText ?? DEFAULT_OK_TEXT}
          </VertMButton>
        </>
      }
    >
      {typeof item.content === 'string' ? (
        <VertMText as="span" text={item.content} />
      ) : (
        item.content
      )}
    </VertMModal>
  );
}

/**
 * Renders imperative dialogs inside the app tree so they inherit theme,
 * writing mode and locale from the nearest VertMConfigProvider.
 */
export function ModalHolder({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<ConfirmItem[]>([]);
  const seq = useRef(0);

  const destroy = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const update = useCallback((id: string, config: ModalFuncConfig) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...config } : item)));
  }, []);

  const openWithId = useCallback(
    (type: ConfirmType, config: ModalFuncConfig, id: string) => {
      setItems((prev) => [...prev, { ...config, id, type }]);
    },
    []
  );

  const open = useCallback(
    (type: ConfirmType, config: ModalFuncConfig): ModalFuncReturn => {
      seq.current += 1;
      const id = `vertm-confirm-${seq.current}`;
      openWithId(type, config, id);
      return {
        destroy: () => destroy(id),
        update: (next) => update(id, next),
      };
    },
    [openWithId, destroy, update]
  );

  const api = useMemo<InternalModalAPI>(
    () => ({
      confirm: (config) => open('confirm', config),
      info: (config) => open('info', config),
      success: (config) => open('success', config),
      error: (config) => open('error', config),
      warning: (config) => open('warning', config),
      openWithId,
      destroyById: destroy,
      updateById: update,
    }),
    [open, openWithId, destroy, update]
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
    <ModalContext.Provider value={api}>
      {children}
      {items.map((item) => (
        <ConfirmDialog key={item.id} item={item} onClose={() => destroy(item.id)} />
      ))}
    </ModalContext.Provider>
  );
}

function ensureGlobalHolder() {
  if (typeof document === 'undefined' || globalRoot) return;
  const el = document.createElement('div');
  el.id = 'vertm-modal-root';
  document.body.appendChild(el);
  globalRoot = createRoot(el);
  globalRoot.render(
    <VertMConfigProvider>
      <ModalHolder />
    </VertMConfigProvider>
  );
}

let globalSeq = 0;

/**
 * React renders the detached root asynchronously, so the first call of a
 * session arrives before the holder exists. Queue instead of dropping it.
 */
function withApi(fn: (api: InternalModalAPI) => void): void {
  ensureGlobalHolder();
  if (globalApi) fn(globalApi);
  else pending.push(fn);
}

function callGlobal(type: ConfirmType, config: ModalFuncConfig): ModalFuncReturn {
  globalSeq += 1;
  const id = `vertm-confirm-global-${globalSeq}`;
  withApi((api) => api.openWithId(type, config, id));
  return {
    destroy: () => withApi((api) => api.destroyById(id)),
    update: (next) => withApi((api) => api.updateById(id, next)),
  };
}

export const modal: ModalAPI = {
  confirm: (config) => callGlobal('confirm', config),
  info: (config) => callGlobal('info', config),
  success: (config) => callGlobal('success', config),
  error: (config) => callGlobal('error', config),
  warning: (config) => callGlobal('warning', config),
};

/** Context-aware modal API; falls back to the detached global holder. */
export function useModal(): ModalAPI {
  return useContext(ModalContext) ?? modal;
}
