import { useState, useEffect, type ReactNode } from 'react';
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

let items: NotificationItem[] = [];
let listeners: Array<() => void> = [];
let notifRoot: Root | null = null;

function notify() {
  listeners.forEach((l) => l());
}

function groupByPlacement(list: NotificationItem[]) {
  const map: Partial<Record<NotificationPlacement, NotificationItem[]>> = {};
  for (const item of list) {
    const p = item.placement ?? 'topRight';
    (map[p] ??= []).push(item);
  }
  return map;
}

function NotificationContainer() {
  const [list, setList] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fn = () => setList([...items]);
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }, []);

  const grouped = groupByPlacement(list);

  return (
    <>
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
                    removeNotification(item.id);
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
    </>
  );
}

function ensureNotifRoot() {
  if (typeof document === 'undefined' || notifRoot) return;
  const el = document.createElement('div');
  el.id = 'vertm-notification-root';
  document.body.appendChild(el);
  notifRoot = createRoot(el);
  notifRoot.render(
    <VertMConfigProvider>
      <NotificationContainer />
    </VertMConfigProvider>
  );
}

function addNotification(config: NotificationConfig) {
  ensureNotifRoot();
  const id = `notif-${Date.now()}`;
  items = [...items, { ...config, id }];
  notify();
  if ((config.duration ?? 4.5) > 0) {
    setTimeout(() => removeNotification(id), (config.duration ?? 4.5) * 1000);
  }
  return id;
}

function removeNotification(id?: string) {
  if (id) items = items.filter((n) => n.id !== id);
  else items = [];
  notify();
}

export const notification = {
  open: addNotification,
  success: (cfg: Omit<NotificationConfig, 'type'>) =>
    addNotification({ ...cfg, type: 'success' }),
  error: (cfg: Omit<NotificationConfig, 'type'>) =>
    addNotification({ ...cfg, type: 'error' }),
  info: (cfg: Omit<NotificationConfig, 'type'>) =>
    addNotification({ ...cfg, type: 'info' }),
  warning: (cfg: Omit<NotificationConfig, 'type'>) =>
    addNotification({ ...cfg, type: 'warning' }),
  destroy: removeNotification,
};
