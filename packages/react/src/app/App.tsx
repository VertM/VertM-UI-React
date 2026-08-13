import { type CSSProperties, type ReactNode } from 'react';
import { MessageHolder, useMessage, type MessageAPI } from '../message/Message.js';
import {
  NotificationHolder,
  useNotification,
  type NotificationAPI,
} from '../notification/Notification.js';
import { ModalHolder, useModal, type ModalAPI } from '../modal/ModalApi.js';

export interface AppContextValue {
  message: MessageAPI;
  notification: NotificationAPI;
  modal: ModalAPI;
}

export interface AppProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Render a plain wrapper instead of a `<div>`; useful at the page root. */
  component?: 'div' | false;
}

/**
 * Hosts the imperative message / notification / modal APIs inside the React
 * tree. The standalone `message.*` and `notification.*` exports mount their own
 * detached root, which cannot see the surrounding VertMConfigProvider — the
 * hooks returned here can, so themed apps should reach for these instead.
 */
export function VertMApp({ children, className = '', style, component = 'div' }: AppProps) {
  const content = (
    <MessageHolder>
      <NotificationHolder>
        <ModalHolder>{children}</ModalHolder>
      </NotificationHolder>
    </MessageHolder>
  );

  if (component === false) return content;

  return (
    <div className={`vertm-app ${className}`.trim()} style={style}>
      {content}
    </div>
  );
}

/** Read the message / notification / modal APIs bound to the nearest App. */
export function useApp(): AppContextValue {
  return {
    message: useMessage(),
    notification: useNotification(),
    modal: useModal(),
  };
}

VertMApp.useApp = useApp;
