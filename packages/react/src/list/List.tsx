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
  /** 旧版树形列表数据 */
  items?: VertMListItem[];
  /** Ant Design 风格数据源 */
  dataSource?: T[];
  /** 是否有序列表 */
  ordered?: boolean;
  /** 字体族 */
  fontFamily?: string;
  /** 字号（px） */
  fontSize?: number;
  /** 行高倍数 */
  lineHeight?: number;
  /** 书写模式 */
  writingMode?: WritingMode;
  /** 自定义渲染每一项 */
  renderItem?: (item: T, index: number) => ReactNode;
  /** 列表头部 */
  header?: ReactNode;
  /** 列表底部 */
  footer?: ReactNode;
  /** 分页配置；false 关闭分页 */
  pagination?: false | PaginationProps;
  /** 栅格列表配置 */
  grid?: ListGrid;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示加载态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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
