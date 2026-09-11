import { type ReactElement, type ReactNode } from 'react';
import { Close } from '@vertm/icons';
import { Overlay, type OverlayProps, type TriggerType } from '../overlay/Overlay.js';
import { VertMText } from '../VertMText.js';

export interface PopoverProps extends Omit<OverlayProps, 'content'> {
  /** 气泡标题 */
  title?: ReactNode;
  /** 气泡内容 */
  content: ReactNode;
  /** 是否显示关闭按钮 @default false */
  closable?: boolean;
}

export function VertMPopover({
  title,
  content,
  placement = 'top',
  trigger = 'click',
  overlayClassName = '',
  closable,
  onOpenChange,
  children,
  ...rest
}: PopoverProps) {
  const showClose = closable === true;
  const useSplit = Boolean(title) || showClose;

  const body = useSplit ? (
    <div className="vertm-popover__inner vertm-split">
      {title && (
        <div className="vertm-split__start">
          <div className="vertm-split__title vertm-popover__title">
            {typeof title === 'string' ? <VertMText as="span" text={title} /> : title}
          </div>
        </div>
      )}
      <div className="vertm-split__center vertm-popover__content">
        {typeof content === 'string' ? <VertMText as="span" text={content} /> : content}
      </div>
      {showClose && (
        <div className="vertm-split__end vertm-split__end--top">
          <button
            type="button"
            className="vertm-popup-close"
            aria-label="Close"
            onClick={() => onOpenChange?.(false)}
          >
            <Close size="small" vertical={false} />
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="vertm-popover__inner">
      {typeof content === 'string' ? <VertMText as="span" text={content} /> : content}
    </div>
  );

  return (
    <Overlay
      placement={placement}
      trigger={trigger}
      content={body}
      closable={false}
      onOpenChange={onOpenChange}
      overlayClassName={`vertm-popover ${overlayClassName}`.trim()}
      {...rest}
    >
      {children as ReactElement}
    </Overlay>
  );
}

export type { TriggerType };
