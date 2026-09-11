import {
  Children,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';

export interface LayoutProps {
  /** 布局子节点 */
  children?: ReactNode;
  /** 强制应用含侧栏布局类（Sider 非直接子节点时） */
  hasSider?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface HeaderProps {
  /** 顶栏内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface FooterProps {
  /** 底栏内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface ContentProps {
  /** 内容区子节点 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface SiderProps {
  /** 侧栏内容 */
  children?: ReactNode;
  /** 展开时宽度 */
  width?: number | string;
  /** 收起时宽度 */
  collapsedWidth?: number | string;
  /** 是否可收起 */
  collapsible?: boolean;
  /** 受控收起状态 */
  collapsed?: boolean;
  /** 非受控初始收起状态 */
  defaultCollapsed?: boolean;
  /** 收起状态变化回调 */
  onCollapse?: (collapsed: boolean) => void;
  /** 自定义收起触发器；传 null 隐藏 */
  trigger?: ReactNode | null;
  /** 侧栏位置 */
  placement?: 'left' | 'right';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function resolveSize(value: number | string | undefined, fallback: number): string {
  if (value == null) return `${fallback}px`;
  return typeof value === 'number' ? `${value}px` : value;
}

function hasSiderChild(children: ReactNode): boolean {
  let found = false;
  Children.forEach(children, (child) => {
    if (found || !isValidElement(child)) return;
    const el = child as ReactElement<{ __VERTM_SIDER__?: boolean }>;
    if (el.type === Sider || el.props.__VERTM_SIDER__) {
      found = true;
    }
  });
  return found;
}

function Header({ children, className = '', style }: HeaderProps) {
  return (
    <header className={`vertm-layout-header ${className}`.trim()} style={style}>
      {children}
    </header>
  );
}

function Footer({ children, className = '', style }: FooterProps) {
  return (
    <footer className={`vertm-layout-footer ${className}`.trim()} style={style}>
      {children}
    </footer>
  );
}

function Content({ children, className = '', style }: ContentProps) {
  return (
    <main className={`vertm-layout-content ${className}`.trim()} style={style}>
      {children}
    </main>
  );
}

function Sider({
  children,
  width = 200,
  collapsedWidth = 48,
  collapsible = false,
  collapsed,
  defaultCollapsed = false,
  onCollapse,
  trigger,
  placement = 'left',
  className = '',
  style,
}: SiderProps) {
  const vertical = useIsVertical();
  const [innerCollapsed, setInnerCollapsed] = useControlled(
    collapsed,
    defaultCollapsed,
    onCollapse
  );

  const resolvedWidth = innerCollapsed ? collapsedWidth : width;
  const siderStyle: CSSProperties = {
    ...style,
    '--vertm-sider-width': resolveSize(resolvedWidth, 200),
  } as CSSProperties;

  const defaultTrigger =
    placement === 'right' ? (
      <ChevronRight vertical={vertical} size="small" />
    ) : (
      <ChevronLeft vertical={vertical} size="small" />
    );

  const showTrigger = collapsible && trigger !== null;

  return (
    <aside
      className={[
        'vertm-layout-sider',
        `vertm-layout-sider--${placement}`,
        innerCollapsed && 'vertm-layout-sider--collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={siderStyle}
      data-collapsed={innerCollapsed || undefined}
    >
      <div className="vertm-layout-sider__children">{children}</div>
      {showTrigger && (
        <button
          type="button"
          className="vertm-layout-sider__trigger"
          aria-label={innerCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!innerCollapsed}
          onClick={() => setInnerCollapsed(!innerCollapsed)}
        >
          {trigger === undefined ? defaultTrigger : trigger}
        </button>
      )}
    </aside>
  );
}

Sider.displayName = 'VertMLayoutSider';
// Marker for hasSiderChild detection when re-exported.
(Sider as typeof Sider & { __VERTM_SIDER__?: boolean }).__VERTM_SIDER__ = true;

function Layout({ children, hasSider, className = '', style }: LayoutProps) {
  const withSider = useMemo(
    () => hasSider ?? hasSiderChild(children),
    [children, hasSider]
  );

  return (
    <section
      className={[
        'vertm-layout',
        withSider && 'vertm-layout--has-sider',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </section>
  );
}

export const VertMLayout = Object.assign(Layout, {
  Header,
  Footer,
  Content,
  Sider,
});
