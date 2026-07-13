import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface AnchorItem {
  key: string;
  href: string;
  title: ReactNode;
  children?: AnchorItem[];
}

export interface AnchorProps {
  items?: AnchorItem[];
  offsetTop?: number;
  bounds?: number;
  getContainer?: () => HTMLElement | Window;
  onClick?: (e: MouseEvent<HTMLAnchorElement>, link: { href: string; title: ReactNode }) => void;
  className?: string;
  style?: CSSProperties;
}

function renderTitle(node: ReactNode): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className="vertm-anchor__text" /> : node;
}

function flattenItems(items: AnchorItem[]): AnchorItem[] {
  const result: AnchorItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) result.push(...flattenItems(item.children));
  }
  return result;
}

function AnchorLink({
  item,
  activeLink,
  onNavigate,
}: {
  item: AnchorItem;
  activeLink: string;
  onNavigate: AnchorProps['onClick'];
}) {
  const active = activeLink === item.href;
  return (
    <>
      <a
        href={item.href}
        className={['vertm-anchor__link', active && 'vertm-anchor__link--active'].filter(Boolean).join(' ')}
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.(e, { href: item.href, title: item.title });
          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        {renderTitle(item.title)}
      </a>
      {item.children && item.children.length > 0 && (
        <div className="vertm-anchor__sub">
          {item.children.map((child) => (
            <AnchorLink key={child.key} item={child} activeLink={activeLink} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </>
  );
}

export function VertMAnchor({
  items = [],
  offsetTop = 0,
  bounds = 5,
  getContainer,
  onClick,
  className = '',
  style,
}: AnchorProps) {
  const isVerticalWriting = useIsVertical();
  const [activeLink, setActiveLink] = useState<string>('');
  const links = flattenItems(items);

  useEffect(() => {
    const container = getContainer?.() ?? window;
    const elements = links
      .map((l) => ({ href: l.href, el: document.querySelector(l.href) }))
      .filter((x): x is { href: string; el: Element } => x.el != null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveLink(`#${visible[0].target.id}`);
        }
      },
      {
        root: container instanceof Window ? null : container,
        rootMargin: `-${offsetTop}px 0px -${bounds}px 0px`,
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    for (const { el } of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [links, offsetTop, bounds, getContainer]);

  return (
    <nav
      className={`vertm-anchor ${className}`.trim()}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {items.map((item) => (
        <div key={item.key} className="vertm-anchor__item">
          <AnchorLink item={item} activeLink={activeLink} onNavigate={onClick} />
        </div>
      ))}
    </nav>
  );
}
