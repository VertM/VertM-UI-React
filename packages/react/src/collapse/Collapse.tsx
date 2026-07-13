import { type CSSProperties, type ReactNode } from 'react';
import { ChevronRight } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';
import { VertMText } from '../VertMText.js';

export interface CollapsePanel {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  extra?: ReactNode;
  collapsible?: 'header' | 'icon' | 'disabled';
}

export interface CollapseProps {
  items?: CollapsePanel[];
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  onChange?: (key: string | string[]) => void;
  accordion?: boolean;
  /** Fixed height of the collapse container (px or CSS length). */
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

function toCssLength(value?: number | string): string | undefined {
  if (value == null || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

function normalizeKeys(key: string | string[] | undefined): string[] {
  if (!key) return [];
  return Array.isArray(key) ? key : [key];
}

function renderNode(node: ReactNode, className: string): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className={className} /> : node;
}

export function VertMCollapse({
  items = [],
  activeKey,
  defaultActiveKey = [],
  onChange,
  accordion = false,
  height,
  className = '',
  style,
}: CollapseProps) {
  const isVerticalWriting = useIsVertical();
  const resolvedHeight = toCssLength(height);
  const [active, setActive] = useControlled(
    activeKey != null ? normalizeKeys(activeKey) : undefined,
    normalizeKeys(defaultActiveKey),
    (keys) => onChange?.(accordion ? keys[0] ?? '' : keys)
  );

  const toggle = (key: string, disabled?: boolean) => {
    if (disabled) return;
    if (accordion) {
      const next = active.includes(key) ? [] : [key];
      setActive(next);
      return;
    }
    const next = active.includes(key) ? active.filter((k) => k !== key) : [...active, key];
    setActive(next);
  };

  return (
    <div
      className={[
        'vertm-collapse',
        resolvedHeight && 'vertm-collapse--sized',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(resolvedHeight ? { '--vertm-collapse-height': resolvedHeight } : {}),
        ...style,
      } as CSSProperties}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {items.map((panel) => {
        const open = active.includes(panel.key);
        const disabled = panel.collapsible === 'disabled';
        return (
          <section
            key={panel.key}
            className={[
              'vertm-collapse__panel',
              open && 'vertm-collapse__panel--open',
              disabled && 'vertm-collapse__panel--disabled',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <header
              className="vertm-collapse__header"
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-expanded={open}
              onClick={() => panel.collapsible !== 'icon' && toggle(panel.key, disabled)}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(panel.key, disabled);
                }
              }}
            >
              <button
                type="button"
                className="vertm-collapse__arrow"
                aria-label={open ? 'Collapse' : 'Expand'}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(panel.key, disabled);
                }}
              >
                <ChevronRight
                  vertical={false}
                  rotateForVertical={false}
                  size="small"
                  style={{
                    transform: `rotate(${open ? (isVerticalWriting ? 180 : 90) : 0}deg)`,
                    transition: 'transform var(--vertm-motion-duration-fast)',
                  }}
                />
              </button>
              <span className="vertm-collapse__label">{renderNode(panel.label, 'vertm-collapse__text')}</span>
              {panel.extra && <span className="vertm-collapse__extra">{panel.extra}</span>}
            </header>
            <div className="vertm-collapse__body" hidden={!open}>
              <div className="vertm-collapse__content">{panel.children}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
