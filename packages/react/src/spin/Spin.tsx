import { type ReactNode, type CSSProperties } from 'react';
import { Loading } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface SpinProps {
  spinning?: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function VertMSpin({
  spinning = true,
  size = 'default',
  tip,
  children,
  className = '',
  style,
}: SpinProps) {
  const vertical = useIsVertical();

  const indicator = (
    <div className={`vertm-spin vertm-spin--${size} vertm-vertical ${className}`.trim()} style={style}>
      <Loading spin size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle'} vertical={vertical} />
      {tip && (
        <div className="vertm-spin__tip">
          {typeof tip === 'string' ? <VertMText as="span" text={tip} /> : tip}
        </div>
      )}
    </div>
  );

  if (!children) return spinning ? indicator : null;

  return (
    <div className={`vertm-spin-nested ${spinning ? 'vertm-spin-nested--spinning' : ''}`}>
      {spinning && <div className="vertm-spin-nested__overlay">{indicator}</div>}
      <div className={spinning ? 'vertm-spin-nested__blur' : undefined}>{children}</div>
    </div>
  );
}
