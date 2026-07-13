import {
  Children,
  Fragment,
  isValidElement,
  useMemo,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ChevronDown, ChevronRight } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMDropdown, type DropdownMenuConfig, type DropdownProps } from '../dropdown/Dropdown.js';
import type { MenuItemType } from '../menu/context.js';
import { VertMText } from '../VertMText.js';

export interface BreadcrumbMenuItem {
  key?: React.Key;
  title?: ReactNode;
  label?: ReactNode;
  path?: string;
  href?: string;
  disabled?: boolean;
  danger?: boolean;
}

export type BreadcrumbMenuConfig = Omit<DropdownMenuConfig, 'items'> & {
  items?: BreadcrumbMenuItem[];
};

export interface BreadcrumbRouteItem {
  key?: React.Key;
  title?: ReactNode;
  /** @deprecated use `title` */
  breadcrumbName?: ReactNode;
  href?: string;
  path?: string;
  className?: string;
  style?: CSSProperties;
  menu?: BreadcrumbMenuConfig;
  dropdownProps?: Partial<Omit<DropdownProps, 'menu' | 'children'>>;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** @deprecated use `menu` instead */
  children?: Omit<BreadcrumbRouteItem, 'children'>[];
}

export interface BreadcrumbSeparatorItem {
  type: 'separator';
  key?: React.Key;
  separator?: ReactNode;
}

export type BreadcrumbItemType = Partial<BreadcrumbRouteItem & BreadcrumbSeparatorItem>;

/** @deprecated use `BreadcrumbRouteItem` */
export type BreadcrumbItem = BreadcrumbRouteItem;

export type BreadcrumbDirection = 'vertical' | 'horizontal';

export interface BreadcrumbSemanticClassNames {
  root?: string;
  item?: string;
  separator?: string;
}

export interface BreadcrumbSemanticStyles {
  root?: CSSProperties;
  item?: CSSProperties;
  separator?: CSSProperties;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItemType[];
  /** @deprecated use `items` */
  routes?: BreadcrumbItemType[];
  separator?: ReactNode;
  params?: Record<string, string>;
  itemRender?: (
    route: BreadcrumbRouteItem,
    params: Record<string, string>,
    routes: BreadcrumbRouteItem[],
    paths: string[]
  ) => ReactNode;
  dropdownIcon?: ReactNode;
  classNames?: BreadcrumbSemanticClassNames;
  styles?: BreadcrumbSemanticStyles;
  /** Layout direction; defaults to `vertical` in vertical writing mode. */
  direction?: BreadcrumbDirection;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface BreadcrumbItemProps {
  href?: string;
  menu?: BreadcrumbMenuConfig;
  dropdownProps?: Partial<Omit<DropdownProps, 'menu' | 'children'>>;
  dropdownIcon?: ReactNode;
  separator?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface BreadcrumbSeparatorProps {
  children?: ReactNode;
}

const BREADCRUMB_ITEM_MARKER = '__VERTM_BREADCRUMB_ITEM__';
const BREADCRUMB_SEPARATOR_MARKER = '__VERTM_BREADCRUMB_SEPARATOR__';

function isRenderableNode(node: ReactNode): boolean {
  return node !== null && node !== undefined && node !== false;
}

function getPath(params: Record<string, string>, path?: string): string | undefined {
  if (path === undefined) return undefined;
  let mergedPath = path.replace(/^\//, '');
  Object.keys(params).forEach((key) => {
    mergedPath = mergedPath.replace(`:${key}`, params[key] ?? `:${key}`);
  });
  return mergedPath;
}

function getBreadcrumbTitle(route: BreadcrumbRouteItem, params: Record<string, string>): ReactNode {
  const title = route.title ?? route.breadcrumbName;
  if (!isRenderableNode(title)) return null;
  if (typeof title !== 'string') return title;

  const paramsKeys = Object.keys(params);
  if (paramsKeys.length === 0) return title;

  const pattern = new RegExp(`:(${paramsKeys.join('|')})`, 'g');
  return title.replace(pattern, (replacement, key: string) => params[key] ?? replacement);
}

function normalizeItems(items?: BreadcrumbItemType[]): BreadcrumbItemType[] | null {
  if (!items?.length) return null;

  return items.map((item) => {
    if (item.type === 'separator') return item;

    const { breadcrumbName, children, ...rest } = item;
    const route: BreadcrumbRouteItem = {
      ...rest,
      title: item.title ?? breadcrumbName,
    };

    if (children?.length) {
      route.menu = {
        items: children.map(({ breadcrumbName: childName, title: childTitle, ...childProps }, index) => ({
          ...childProps,
          title: childTitle ?? childName,
          key: childProps.key ?? index,
        })),
      };
    }

    return route;
  });
}

function useNormalizedItems(items?: BreadcrumbItemType[], routes?: BreadcrumbItemType[]) {
  return useMemo(() => {
    if (items?.length) return normalizeItems(items);
    if (routes?.length) return normalizeItems(routes);
    return null;
  }, [items, routes]);
}

function renderTitleContent(title: ReactNode): ReactNode {
  if (!isRenderableNode(title)) return null;
  if (typeof title === 'string') {
    return <VertMText as="span" text={title} className="vertm-breadcrumb__text" />;
  }
  return title;
}

function renderLinkNode(
  route: BreadcrumbRouteItem,
  title: ReactNode,
  href?: string
): ReactNode {
  const content = renderTitleContent(title);
  if (!isRenderableNode(content)) return null;

  if (href !== undefined) {
    return (
      <a
        href={href}
        className="vertm-breadcrumb__link"
        onClick={route.onClick}
        style={route.style}
      >
        {content}
      </a>
    );
  }

  if (route.onClick) {
    return (
      <button
        type="button"
        className="vertm-breadcrumb__link"
        onClick={route.onClick}
        style={route.style}
      >
        {content}
      </button>
    );
  }

  return (
    <span className="vertm-breadcrumb__page" style={route.style}>
      {content}
    </span>
  );
}

function renderMenuLabel(label: ReactNode): ReactNode {
  if (typeof label === 'string') {
    return <VertMText as="span" text={label} className="vertm-menu__text" />;
  }
  return label;
}

function convertMenuItems(items?: BreadcrumbMenuItem[]): MenuItemType[] | undefined {
  return items?.map((item, index) => {
    const label = item.label ?? item.title;
    let mergedLabel: ReactNode = renderMenuLabel(label);

    if (item.href || item.path) {
      mergedLabel = (
        <a href={item.href ?? item.path} className="vertm-breadcrumb__menu-link">
          {renderMenuLabel(label)}
        </a>
      );
    }

    return {
      key: String(item.key ?? index),
      label: mergedLabel,
      disabled: item.disabled,
      danger: item.danger,
    };
  });
}

function DefaultSeparator({ vertical }: { vertical: boolean }) {
  if (vertical) {
    return (
      <ChevronDown
        vertical={false}
        rotateForVertical={false}
        size="small"
        className="vertm-breadcrumb__separator-icon"
        aria-hidden
      />
    );
  }
  return (
    <ChevronRight
      vertical={false}
      rotateForVertical={false}
      size="small"
      className="vertm-breadcrumb__separator-icon"
      aria-hidden
    />
  );
}

function DefaultDropdownIcon({ vertical }: { vertical: boolean }) {
  return (
    <ChevronDown
      vertical={vertical}
      rotateForVertical={false}
      size="small"
      className="vertm-breadcrumb__dropdown-icon"
      aria-hidden
    />
  );
}

/** Rotate custom text/symbol separators 90° CW in vertical breadcrumb trails. */
function SeparatorContent({
  content,
  rotate,
}: {
  content: ReactNode;
  rotate: boolean;
}) {
  if (!isRenderableNode(content)) return null;
  if (!rotate) return content;
  return <span className="vertm-breadcrumb__separator-custom">{content}</span>;
}

function BreadcrumbDropdown({
  menu,
  dropdownProps,
  dropdownIcon,
  vertical,
  children,
}: {
  menu: BreadcrumbMenuConfig;
  dropdownProps?: Partial<Omit<DropdownProps, 'menu' | 'children'>>;
  dropdownIcon?: ReactNode;
  vertical: boolean;
  children: ReactNode;
}) {
  const { items, ...menuProps } = menu;

  return (
    <VertMDropdown
      trigger={['click']}
      menu={{
        ...menuProps,
        items: convertMenuItems(items),
      }}
      {...dropdownProps}
    >
      <span className="vertm-breadcrumb__dropdown-trigger" role="button" tabIndex={0}>
        {children}
        <span className="vertm-breadcrumb__dropdown-icon-wrap" aria-hidden>
          {dropdownIcon ?? <DefaultDropdownIcon vertical={vertical} />}
        </span>
      </span>
    </VertMDropdown>
  );
}

function InternalBreadcrumbItem({
  menu,
  dropdownProps,
  dropdownIcon,
  vertical,
  children,
}: {
  menu?: BreadcrumbMenuConfig;
  dropdownProps?: Partial<Omit<DropdownProps, 'menu' | 'children'>>;
  dropdownIcon?: ReactNode;
  vertical: boolean;
  children: ReactNode;
}) {
  if (!isRenderableNode(children)) return null;

  if (menu) {
    return (
      <BreadcrumbDropdown
        menu={menu}
        dropdownProps={dropdownProps}
        dropdownIcon={dropdownIcon}
        vertical={vertical}
      >
        {children}
      </BreadcrumbDropdown>
    );
  }

  return children;
}

function defaultItemRender(
  route: BreadcrumbRouteItem,
  params: Record<string, string>,
  href?: string
): ReactNode {
  const title = getBreadcrumbTitle(route, params);
  return renderLinkNode(route, title, href);
}

function BreadcrumbItemComponent({
  href,
  menu,
  dropdownProps,
  dropdownIcon,
  separator,
  onClick,
  className = '',
  style,
  children,
}: BreadcrumbItemProps) {
  const isVerticalWriting = useIsVertical();
  const isVertical = isVerticalWriting;

  const content = (
    <InternalBreadcrumbItem
      menu={menu}
      dropdownProps={dropdownProps}
      dropdownIcon={dropdownIcon}
      vertical={isVerticalWriting}
    >
      {renderLinkNode({ href, onClick, className, style, title: children }, children, href)}
    </InternalBreadcrumbItem>
  );

  return (
    <>
      {content}
      {separator ? (
        <span className="vertm-breadcrumb__separator" aria-hidden>
          <SeparatorContent content={separator} rotate={isVertical} />
        </span>
      ) : null}
    </>
  );
}

const BreadcrumbItem = BreadcrumbItemComponent as typeof BreadcrumbItemComponent & {
  [BREADCRUMB_ITEM_MARKER]?: boolean;
  displayName?: string;
};

BreadcrumbItem.displayName = 'VertMBreadcrumbItem';
BreadcrumbItem[BREADCRUMB_ITEM_MARKER] = true;

function BreadcrumbSeparatorComponent({ children }: BreadcrumbSeparatorProps) {
  return (
    <span className="vertm-breadcrumb__separator" aria-hidden>
      {children}
    </span>
  );
}

const BreadcrumbSeparator = BreadcrumbSeparatorComponent as typeof BreadcrumbSeparatorComponent & {
  [BREADCRUMB_SEPARATOR_MARKER]?: boolean;
  displayName?: string;
};

BreadcrumbSeparator.displayName = 'VertMBreadcrumbSeparator';
BreadcrumbSeparator[BREADCRUMB_SEPARATOR_MARKER] = true;

function isBreadcrumbItem(child: ReactElement): boolean {
  return Boolean(
    (child.type as { [BREADCRUMB_ITEM_MARKER]?: boolean } | undefined)?.[BREADCRUMB_ITEM_MARKER]
  );
}

function isBreadcrumbSeparator(child: ReactElement): boolean {
  return Boolean(
    (child.type as { [BREADCRUMB_SEPARATOR_MARKER]?: boolean } | undefined)?.[
      BREADCRUMB_SEPARATOR_MARKER
    ]
  );
}

function BreadcrumbBase({
  items,
  routes,
  separator,
  params = {},
  itemRender,
  dropdownIcon,
  classNames,
  styles,
  direction,
  className = '',
  style,
  children,
}: BreadcrumbProps) {
  const isVerticalWriting = useIsVertical();
  const isVertical = direction ? direction === 'vertical' : isVerticalWriting;
  const isCustomSeparator = separator !== undefined;
  const mergedSeparator = separator ?? (isVertical ? <DefaultSeparator vertical /> : '/');
  const rotateDefaultSeparator = isVertical && isCustomSeparator;
  const mergedItems = useNormalizedItems(items, routes);

  const itemNodes = useMemo(() => {
    if (mergedItems?.length) {
      const routeItems = mergedItems.filter(
        (item) => item.type !== 'separator'
      ) as BreadcrumbRouteItem[];
      const paths: string[] = [];
      const lastRouteIndex = mergedItems.reduce(
        (acc, item, idx) => (item.type !== 'separator' ? idx : acc),
        -1
      );

      return mergedItems.map((item, index) => {
        if (item.type === 'separator') {
          const sepContent = item.separator ?? mergedSeparator;
          const rotateSep =
            isVertical && (item.separator !== undefined || isCustomSeparator);

          return (
            <li
              key={item.key ?? `separator-${index}`}
              className={['vertm-breadcrumb__separator', classNames?.separator]
                .filter(Boolean)
                .join(' ')}
              style={styles?.separator}
              aria-hidden
            >
              <SeparatorContent content={sepContent} rotate={rotateSep} />
            </li>
          );
        }

        const mergedPath = getPath(params, item.path);
        if (mergedPath !== undefined) {
          paths.push(mergedPath);
        }

        let href = item.href;
        if (paths.length && mergedPath !== undefined) {
          href = `#/${paths.join('/')}`;
        }

        const isLast = index === lastRouteIndex;
        const rendered = itemRender
          ? itemRender(item, params, routeItems, [...paths])
          : defaultItemRender(item, params, href);

        const showSeparator =
          !isLast &&
          mergedItems[index + 1]?.type !== 'separator';

        return (
          <Fragment key={item.key ?? index}>
            <li
              className={[
                'vertm-breadcrumb__item',
                isLast && 'vertm-breadcrumb__item--current',
                classNames?.item,
                item.className,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ ...styles?.item, ...item.style }}
              aria-current={isLast ? 'page' : undefined}
            >
              <InternalBreadcrumbItem
                menu={item.menu}
                dropdownProps={item.dropdownProps}
                dropdownIcon={dropdownIcon}
                vertical={isVerticalWriting}
              >
                {rendered}
              </InternalBreadcrumbItem>
            </li>
            {showSeparator && (
              <li
                className={['vertm-breadcrumb__separator', classNames?.separator]
                  .filter(Boolean)
                  .join(' ')}
                style={styles?.separator}
                aria-hidden
              >
                <SeparatorContent
                  content={mergedSeparator}
                  rotate={rotateDefaultSeparator}
                />
              </li>
            )}
          </Fragment>
        );
      });
    }

    if (!children) return null;

    const childList = Children.toArray(children).filter(isValidElement) as ReactElement[];
    return childList.map((child, index) => {
      const isLast = index === childList.length - 1;

      if (isBreadcrumbSeparator(child)) {
        const sepContent = child.props.children ?? mergedSeparator;
        const rotateSep =
          isVertical &&
          (child.props.children !== undefined || isCustomSeparator);

        return (
          <li
            key={child.key ?? `child-separator-${index}`}
            className={['vertm-breadcrumb__separator', classNames?.separator]
              .filter(Boolean)
              .join(' ')}
            style={styles?.separator}
            aria-hidden
          >
            <SeparatorContent content={sepContent} rotate={rotateSep} />
          </li>
        );
      }

      if (isBreadcrumbItem(child)) {
        const childSeparator = isLast ? null : (child.props.separator ?? mergedSeparator);
        const rotateChildSep =
          isVertical &&
          (child.props.separator !== undefined || isCustomSeparator);
        const childContent = (
          <InternalBreadcrumbItem
            menu={child.props.menu}
            dropdownProps={child.props.dropdownProps}
            dropdownIcon={child.props.dropdownIcon ?? dropdownIcon}
            vertical={isVerticalWriting}
          >
            {renderLinkNode(
              {
                href: child.props.href,
                onClick: child.props.onClick,
                className: child.props.className,
                style: child.props.style,
                title: child.props.children,
              },
              child.props.children,
              child.props.href
            )}
          </InternalBreadcrumbItem>
        );

        return (
          <Fragment key={child.key ?? index}>
            <li
              className={[
                'vertm-breadcrumb__item',
                isLast && 'vertm-breadcrumb__item--current',
                classNames?.item,
                child.props.className,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ ...styles?.item, ...child.props.style }}
              aria-current={isLast ? 'page' : undefined}
            >
              {childContent}
            </li>
            {!isLast && childSeparator && (
              <li
                className={['vertm-breadcrumb__separator', classNames?.separator]
                  .filter(Boolean)
                  .join(' ')}
                style={styles?.separator}
                aria-hidden
              >
                <SeparatorContent content={childSeparator} rotate={rotateChildSep} />
              </li>
            )}
          </Fragment>
        );
      }

      return (
        <li key={child.key ?? index} className={['vertm-breadcrumb__item', classNames?.item].filter(Boolean).join(' ')}>
          {child}
        </li>
      );
    });
  }, [
    mergedItems,
    params,
    itemRender,
    dropdownIcon,
    mergedSeparator,
    classNames,
    styles,
    children,
    isVerticalWriting,
    isVertical,
    isCustomSeparator,
    rotateDefaultSeparator,
  ]);

  return (
    <nav
      className={[
        'vertm-breadcrumb',
        isVertical && 'vertm-breadcrumb--vertical',
        classNames?.root,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...styles?.root, ...style }}
      aria-label="Breadcrumb"
      data-vertical-writing={isVerticalWriting || undefined}
    >
      <ol className="vertm-breadcrumb__list">{itemNodes}</ol>
    </nav>
  );
}

export const VertMBreadcrumb = Object.assign(BreadcrumbBase, {
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
});
