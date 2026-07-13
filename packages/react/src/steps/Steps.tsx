import { type CSSProperties, type ReactNode } from 'react';
import { Check, CloseCircle, Loading } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
export type StepsDirection = 'vertical' | 'horizontal';

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  status?: StepStatus;
  icon?: ReactNode;
}

export interface StepsProps {
  current?: number;
  direction?: StepsDirection;
  items?: StepItem[];
  className?: string;
  style?: CSSProperties;
}

function renderNode(node: ReactNode, className: string): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className={className} /> : node;
}

function resolveStatus(index: number, current: number, itemStatus?: StepStatus): StepStatus {
  if (itemStatus) return itemStatus;
  if (index < current) return 'finish';
  if (index === current) return 'process';
  return 'wait';
}

function StepIcon({ status, icon, vertical }: { status: StepStatus; icon?: ReactNode; vertical: boolean }) {
  if (icon) return <span className="vertm-steps__icon-custom">{icon}</span>;
  if (status === 'finish') return <Check size="small" vertical={vertical} className="vertm-steps__icon-check" />;
  if (status === 'error') return <CloseCircle size="small" vertical={vertical} className="vertm-steps__icon-error" />;
  if (status === 'process') return <Loading spin size="small" vertical={vertical} className="vertm-steps__icon-process" />;
  return <span className="vertm-steps__icon-dot" />;
}

export function VertMSteps({
  current = 0,
  direction,
  items = [],
  className = '',
  style,
}: StepsProps) {
  const isVerticalWriting = useIsVertical();
  const resolvedDirection = direction ?? (isVerticalWriting ? 'vertical' : 'horizontal');

  return (
    <div
      className={[
        'vertm-steps',
        `vertm-steps--${resolvedDirection}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {items.map((item, index) => {
        const status = resolveStatus(index, current, item.status);
        const isLast = index === items.length - 1;
        return (
          <div
            key={index}
            className={[
              'vertm-steps__item',
              `vertm-steps__item--${status}`,
              isLast && 'vertm-steps__item--last',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="vertm-steps__indicator">
              <StepIcon status={status} icon={item.icon} vertical={isVerticalWriting} />
              {!isLast && <span className="vertm-steps__tail" aria-hidden />}
            </div>
            <div className="vertm-steps__content">
              <div className="vertm-steps__title">{renderNode(item.title, 'vertm-steps__text')}</div>
              {item.description != null && (
                <div className="vertm-steps__description">
                  {renderNode(item.description, 'vertm-steps__text')}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
