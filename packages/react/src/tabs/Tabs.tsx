import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Close, Plus } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';
import { VertMText } from '../VertMText.js';

export type TabsType = 'line' | 'card';
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TabItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface TabsEditableConfig {
  onEdit?: (action: 'add' | 'remove', key?: string) => void;
  showAdd?: boolean;
}

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  type?: TabsType;
  tabPosition?: TabPosition;
  items?: TabItem[];
  editable?: boolean | TabsEditableConfig;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

function renderLabel(node: ReactNode): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className="vertm-tabs__text" /> : node;
}

function resolveDefaultTabPosition(isVerticalWriting: boolean): TabPosition {
  return isVerticalWriting ? 'left' : 'top';
}

function isVerticalBar(position: TabPosition): boolean {
  return position === 'left' || position === 'right';
}

export function VertMTabs({
  activeKey,
  defaultActiveKey = '',
  onChange,
  type = 'line',
  tabPosition,
  items = [],
  editable = false,
  className = '',
  style,
}: TabsProps) {
  const isVerticalWriting = useIsVertical();
  const resolvedPosition = tabPosition ?? resolveDefaultTabPosition(isVerticalWriting);
  const verticalBar = isVerticalBar(resolvedPosition);

  const firstKey = items[0]?.key ?? '';
  const [active, setActive] = useControlled(activeKey, defaultActiveKey || firstKey, onChange);

  const tabListRef = useRef<HTMLDivElement>(null);
  const [inkStyle, setInkStyle] = useState<CSSProperties>({});

  const editableConfig: TabsEditableConfig =
    typeof editable === 'boolean' ? { showAdd: editable } : editable ?? {};

  const updateInk = useCallback(() => {
    const list = tabListRef.current;
    if (!list) return;
    const activeTab = list.querySelector<HTMLElement>('[data-tab-active="true"]');
    if (!activeTab) return;

    if (verticalBar) {
      setInkStyle({
        top: activeTab.offsetTop,
        height: activeTab.offsetHeight,
        width: 2,
        left: resolvedPosition === 'left' ? 'auto' : undefined,
        right: resolvedPosition === 'right' ? 0 : undefined,
      });
    } else {
      setInkStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        height: 2,
        bottom: resolvedPosition === 'top' ? 0 : undefined,
        top: resolvedPosition === 'bottom' ? 0 : undefined,
      });
    }
  }, [resolvedPosition, verticalBar]);

  useEffect(() => {
    updateInk();
    window.addEventListener('resize', updateInk);
    return () => window.removeEventListener('resize', updateInk);
  }, [active, items.length, updateInk]);

  const selectTab = (key: string, disabled?: boolean) => {
    if (disabled) return;
    setActive(key);
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, key: string, disabled?: boolean) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTab(key, disabled);
    }
  };

  const activeItem = items.find((item) => item.key === active) ?? items[0];

  return (
    <div
      className={[
        'vertm-tabs',
        `vertm-tabs--${type}`,
        `vertm-tabs--${resolvedPosition}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div className="vertm-tabs__nav" role="tablist" aria-orientation={verticalBar ? 'vertical' : 'horizontal'}>
        <div className="vertm-tabs__nav-wrap" ref={tabListRef}>
          {type === 'line' && <span className="vertm-tabs__ink-bar" style={inkStyle} aria-hidden />}
          {items.map((item) => {
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled || undefined}
                tabIndex={item.disabled ? -1 : isActive ? 0 : -1}
                data-tab-active={isActive || undefined}
                className={[
                  'vertm-tabs__tab',
                  isActive && 'vertm-tabs__tab--active',
                  item.disabled && 'vertm-tabs__tab--disabled',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => selectTab(item.key, item.disabled)}
                onKeyDown={(e) => handleTabKeyDown(e, item.key, item.disabled)}
              >
                {renderLabel(item.label)}
                {type === 'card' && (item.closable ?? editableConfig.onEdit != null) && (
                  <span
                    className="vertm-tabs__close"
                    role="button"
                    aria-label="Remove tab"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      editableConfig.onEdit?.('remove', item.key);
                    }}
                  >
                    <Close size="small" vertical={isVerticalWriting} />
                  </span>
                )}
              </button>
            );
          })}
          {type === 'card' && editableConfig.showAdd !== false && editableConfig.onEdit && (
            <button
              type="button"
              className="vertm-tabs__add"
              aria-label="Add tab"
              onClick={() => editableConfig.onEdit?.('add')}
            >
              <Plus size="small" vertical={isVerticalWriting} />
            </button>
          )}
        </div>
      </div>
      <div className="vertm-tabs__content" role="tabpanel">
        {activeItem?.children}
      </div>
    </div>
  );
}
