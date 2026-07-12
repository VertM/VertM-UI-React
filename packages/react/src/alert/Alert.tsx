import { type ReactNode, type CSSProperties } from 'react';
import {
  CheckCircle,
  CloseCircle,
  InfoCircle,
  WarningCircle,
  Close,
} from '@vertm/icons';
import { useControlled } from '../hooks/useControlled.js';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

const ICONS: Record<AlertType, typeof InfoCircle> = {
  success: CheckCircle,
  info: InfoCircle,
  warning: WarningCircle,
  error: CloseCircle,
};

export interface AlertProps {
  type?: AlertType;
  message: ReactNode;
  description?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  banner?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function VertMAlert({
  type = 'info',
  message,
  description,
  showIcon = true,
  closable = false,
  banner = false,
  onClose,
  className = '',
  style,
}: AlertProps) {
  const vertical = useIsVertical();
  const [visible, setVisible] = useControlled(true, true);

  if (!visible) return null;

  const Icon = ICONS[type];

  const renderText = (node: ReactNode) =>
    typeof node === 'string' ? (
      <VertMText as="span" text={node} className="vertm-alert__text" />
    ) : (
      node
    );

  return (
    <div
      className={[
        'vertm-alert',
        'vertm-split',
        showIcon && 'vertm-split--with-icon',
        `vertm-alert--${type}`,
        banner && 'vertm-alert--banner',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role="alert"
    >
      <div className="vertm-split__start">
        {showIcon && <Icon className="vertm-alert__icon" vertical={vertical} />}
        <div className="vertm-split__title vertm-alert__message">{renderText(message)}</div>
      </div>
      {description && (
        <div className="vertm-split__center vertm-alert__description">
          {renderText(description)}
        </div>
      )}
      {closable && (
        <div className="vertm-split__end vertm-split__end--top">
          <button
            type="button"
            className="vertm-alert__close"
            aria-label="Close"
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
          >
            <Close vertical={vertical} rotateForVertical={false} />
          </button>
        </div>
      )}
    </div>
  );
}
