import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface TimelineItem {
  label?: ReactNode;
  children?: ReactNode;
  color?: string;
  dot?: ReactNode;
  pending?: boolean;
}

export interface TimelineProps {
  /** 时间轴线项列表 @default [] */
  items?: TimelineItem[];
  /** 时间轴模式 @default 'left' */
  mode?: 'left' | 'alternate' | 'right';
  /** 末尾待定节点内容 */
  pending?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function renderNode(node: ReactNode, className: string): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className={className} /> : node;
}

export function VertMTimeline({
  items = [],
  mode = 'left',
  pending,
  className = '',
  style,
}: TimelineProps) {
  const isVerticalWriting = useIsVertical();
  const allItems = pending != null ? [...items, { children: pending, pending: true }] : items;

  return (
    <ul
      className={[
        'vertm-timeline',
        `vertm-timeline--${mode}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {allItems.map((item, index) => (
        <li
          key={index}
          className={[
            'vertm-timeline__item',
            item.pending && 'vertm-timeline__item--pending',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="vertm-timeline__tail" aria-hidden />
          <div
            className="vertm-timeline__dot"
            style={item.color ? { borderColor: item.color, background: item.color } : undefined}
          >
            {item.dot}
          </div>
          <div className="vertm-timeline__content">
            {item.label != null && (
              <div className="vertm-timeline__label">{renderNode(item.label, 'vertm-timeline__text')}</div>
            )}
            {item.children != null && (
              <div className="vertm-timeline__children">{renderNode(item.children, 'vertm-timeline__text')}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
