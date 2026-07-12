import { type ReactNode, type CSSProperties } from 'react';
import { CheckCircle, CloseCircle, InfoCircle, WarningCircle } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

const ICONS: Record<string, typeof InfoCircle> = {
  success: CheckCircle,
  error: CloseCircle,
  info: InfoCircle,
  warning: WarningCircle,
};

export interface ResultProps {
  status?: ResultStatus;
  title?: ReactNode;
  subTitle?: ReactNode;
  extra?: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function VertMResult({
  status = 'info',
  title,
  subTitle,
  extra,
  icon,
  className = '',
  style,
}: ResultProps) {
  const vertical = useIsVertical();
  const Icon = ICONS[status] ?? InfoCircle;
  const render = (n: ReactNode) =>
    typeof n === 'string' ? (
      <VertMText as="span" text={n} className="vertm-result__text" />
    ) : (
      n
    );

  return (
    <div
      className={`vertm-result vertm-split vertm-split--with-icon ${className}`.trim()}
      style={style}
    >
      <div className="vertm-split__start">
        <div className={`vertm-result__icon vertm-result__icon--${status}`}>
          {icon ?? <Icon size="large" vertical={vertical} />}
        </div>
        {title && <div className="vertm-split__title vertm-result__title">{render(title)}</div>}
      </div>
      {subTitle && (
        <div className="vertm-split__center vertm-result__subtitle">{render(subTitle)}</div>
      )}
      {extra && <div className="vertm-split__end vertm-split__end--bottom vertm-result__extra">{extra}</div>}
    </div>
  );
}
