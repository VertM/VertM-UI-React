import { type ReactElement, type ReactNode } from 'react';
import { Overlay, type OverlayProps, type TriggerType } from './Overlay.js';
import type { Placement } from './placement.js';

export interface TooltipProps extends Omit<OverlayProps, 'content' | 'overlayClassName'> {
  /** 提示文案 */
  title: ReactNode;
  /** 提示背景色 */
  color?: string;
}

export function Tooltip({
  title,
  color,
  children,
  placement = 'top',
  ...rest
}: TooltipProps) {
  if (!title) return children as ReactElement;

  return (
    <Overlay
      placement={placement}
      content={title}
      overlayClassName="vertm-tooltip"
      overlayStyle={color ? { '--vertm-tooltip-bg': color } as React.CSSProperties : undefined}
      showArrow
      {...rest}
    >
      {children as ReactElement}
    </Overlay>
  );
}

export type { Placement, TriggerType };
