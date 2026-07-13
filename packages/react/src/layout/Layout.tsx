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
  children?: ReactNode;
  /** Force has-sider layout class when Sider is not a direct child. */
  hasSider?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface FooterProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface ContentProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface SiderProps {
  children?: ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  /** Custom collapse trigger; `null` hides the trigger. */
  trigger?: ReactNode | null;
  placement?: 'left' | 'right';
  className?: string;
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
