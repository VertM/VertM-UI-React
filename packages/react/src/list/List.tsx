import { type CSSProperties, type ReactNode } from 'react';
import { DEFAULT_WRITING_MODE, type WritingMode } from '@vertm/core';
import { VertMPagination, type PaginationProps } from '../pagination/Pagination.js';
import { VertMText } from '../VertMText.js';
import { VertMRow, VertMCol } from '../grid/Grid.js';

export interface VertMListItem {
  id: string;
  text: string;
  children?: VertMListItem[];
}

export interface ListGrid {
  column?: number;
  gutter?: number;
}

export interface VertMListProps<T = VertMListItem> {
  /** Legacy tree list items. */
  items?: VertMListItem[];
  /** Ant Design style data source. */
  dataSource?: T[];
  ordered?: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  writingMode?: WritingMode;
  renderItem?: (item: T, index: number) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  pagination?: false | PaginationProps;
  grid?: ListGrid;
  bordered?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}

function renderTreeItems(
  items: VertMListItem[],
  ordered: boolean,
  depth: number,
  props: Pick<VertMListProps, 'fontFamily' | 'fontSize' | 'lineHeight' | 'writingMode' | 'renderItem'>
): ReactNode {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      className="vertm-list"
      style={{ paddingInlineStart: depth > 0 ? `${depth * 1.5}em` : undefined }}
    >
      {items.map((item) => (
        <li key={item.id} className="vertm-list__item">
          {props.renderItem ? (
            props.renderItem(item as VertMListItem & VertMListItem, 0)
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
            renderTreeItems(item.children, ordered, depth + 1, props)}
        </li>
      ))}
    </Tag>
  );
}

function defaultRenderListItem(item: VertMListItem): ReactNode {
  return <VertMText text={item.text} />;
}

export function VertMList<T extends { key?: string; id?: string } = VertMListItem>({
  items,
  dataSource,
  ordered = false,
  fontFamily,
  fontSize = 16,
  lineHeight = 1.6,
  writingMode = DEFAULT_WRITING_MODE,
  renderItem,
  header,
  footer,
  pagination = false,
  grid,
  bordered = false,
  loading = false,
  className = '',
  style,
}: VertMListProps<T>) {
  const useLegacyTree = Boolean(items?.length && !dataSource?.length);

  let listContent: ReactNode;

  if (useLegacyTree && items) {
    listContent = renderTreeItems(items, ordered, 0, {
      fontFamily,
      fontSize,
      lineHeight,
      writingMode,
      renderItem: renderItem as VertMListProps['renderItem'],
    });
  } else {
    const source = dataSource ?? [];
    const pageSize = pagination && typeof pagination === 'object' ? pagination.pageSize ?? 10 : source.length;
    const paged = pagination ? source.slice(0, pageSize) : source;

    const renderRow = (item: T, index: number) => {
      const key = ('key' in item && item.key) || ('id' in item && item.id) || String(index);
      const content = renderItem
        ? renderItem(item, index)
        : 'text' in item && typeof (item as VertMListItem).text === 'string'
          ? defaultRenderListItem(item as VertMListItem)
          : null;

      if (grid?.column) {
        const span = Math.floor(24 / grid.column);
        return (
          <VertMCol key={key} span={span}>
            <div className="vertm-list-ant__item">{content}</div>
          </VertMCol>
        );
      }

      return (
        <li key={key} className="vertm-list-ant__item">
          {content}
        </li>
      );
    };

    listContent = grid?.column ? (
      <VertMRow gutter={grid.gutter ?? 16}>{paged.map(renderRow)}</VertMRow>
    ) : (
      <ul className="vertm-list-ant">{paged.map(renderRow)}</ul>
    );
  }

  return (
    <div
      className={[
        'vertm-list-container',
        bordered && 'vertm-list-container--bordered',
        loading && 'vertm-list-container--loading',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {header && <div className="vertm-list-container__header">{header}</div>}
      {listContent}
      {footer && <div className="vertm-list-container__footer">{footer}</div>}
      {pagination && typeof pagination === 'object' && (
        <div className="vertm-list-container__pagination">
          <VertMPagination {...pagination} total={pagination.total ?? dataSource?.length ?? 0} />
        </div>
      )}
    </div>
  );
}
