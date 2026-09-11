import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface DescriptionItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  span?: number;
}

export interface DescriptionsProps {
  /** 描述列表标题 */
  title?: ReactNode;
  /** 描述项列表 @default [] */
  items?: DescriptionItem[];
  /** 一行的描述列数 @default 1 */
  column?: number;
  /** 是否展示边框 @default false */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function renderNode(node: ReactNode, className: string): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className={className} /> : node;
}

export function VertMDescriptions({
  title,
  items = [],
  column = 1,
  bordered = false,
  className = '',
  style,
}: DescriptionsProps) {
  const isVerticalWriting = useIsVertical();

  return (
    <div
      className={[
        'vertm-descriptions',
        bordered && 'vertm-descriptions--bordered',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          ...style,
          '--vertm-descriptions-columns': String(column),
        } as CSSProperties
      }
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {title != null && (
        <div className="vertm-descriptions__title">{renderNode(title, 'vertm-descriptions__text')}</div>
      )}
      <dl className="vertm-descriptions__list">
        {items.map((item) => (
          <div
            key={item.key}
            className="vertm-descriptions__item"
            style={{ gridColumn: item.span ? `span ${item.span}` : undefined }}
          >
            <dt className="vertm-descriptions__label">
              {renderNode(item.label, 'vertm-descriptions__text')}
            </dt>
            <dd className="vertm-descriptions__value">
              {renderNode(item.children ?? '', 'vertm-descriptions__text')}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
