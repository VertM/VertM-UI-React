import { type CSSProperties, type ReactNode } from 'react';
import { DEFAULT_WRITING_MODE, type WritingMode } from '@vertm/core';
import { VertMText } from './VertMText.js';

export interface VertMListItem {
  id: string;
  text: string;
  children?: VertMListItem[];
}

export interface VertMListProps {
  items: VertMListItem[];
  ordered?: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  writingMode?: WritingMode;
  renderItem?: (item: VertMListItem) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

function renderListItems(
  items: VertMListItem[],
  ordered: boolean,
  depth: number,
  props: Omit<VertMListProps, 'items'>
): ReactNode {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      className="vertm-list"
      style={{
        paddingInlineStart: depth > 0 ? `${depth * 1.5}em` : undefined,
      }}
    >
      {items.map((item) => (
        <li key={item.id} className="vertm-list__item">
          {props.renderItem ? (
            props.renderItem(item)
          ) : (
            <VertMText
              text={item.text}
              fontFamily={props.fontFamily}
              fontSize={props.fontSize}
              lineHeight={props.lineHeight}
              writingMode={props.writingMode}
            />
          )}
          {item.children && item.children.length > 0 &&
            renderListItems(item.children, ordered, depth + 1, props)}
        </li>
      ))}
    </Tag>
  );
}

export function VertMList({
  items,
  ordered = false,
  fontFamily,
  fontSize = 16,
  lineHeight = 1.6,
  writingMode = DEFAULT_WRITING_MODE,
  renderItem,
  className = '',
  style,
}: VertMListProps) {
  return (
    <div className={`vertm-list-container ${className}`.trim()} style={style}>
      {renderListItems(items, ordered, 0, {
        fontFamily,
        fontSize,
        lineHeight,
        writingMode,
        renderItem,
        ordered,
      })}
    </div>
  );
}
