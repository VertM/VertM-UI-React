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
import { useIsVertical, useVertMConfig } from '../config/context.js';
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
  /** 增删页签时的回调 */
  onEdit?: (action: 'add' | 'remove', key?: string) => void;
  /** 是否显示新增按钮 */
  showAdd?: boolean;
}

export interface TabsProps {
  /** 受控当前激活 tab 的 key */
  activeKey?: string;
  /** 非受控初始激活 key @default '' */
  defaultActiveKey?: string;
  /** 切换 tab 时的回调 */
  onChange?: (key: string) => void;
  /** 视觉样式 @default 'line' */
  type?: TabsType;
  /** 页签栏相对面板的位置；竖排默认 left，横排默认 top */
  tabPosition?: TabPosition;
  /** 页签定义列表 @default [] */
  items?: TabItem[];
  /** 是否可增删页签；可为配置对象 @default false */
  editable?: boolean | TabsEditableConfig;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子节点方式定义页签（较少使用） */
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
  const { appearance } = useVertMConfig();
  const editorial = appearance === 'editorial';
  const resolvedPosition = tabPosition ?? resolveDefaultTabPosition(isVerticalWriting);
  const verticalBar = isVerticalBar(resolvedPosition);
  // Vertical writing treats tabs as peer columns (Left/Right), even when the
  // tab bar sits on the left/right edge of the panel.
  const useBlockAxisKeys = isVerticalWriting || !verticalBar;

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

  /** Focus and activate the nearest enabled tab, wrapping at both ends. */
  const moveTab = (from: number, step: number) => {
    const total = items.length;
    for (let i = 1; i <= total; i += 1) {
      const index = (from + step * i + total * i) % total;
      const candidate = items[index];
      if (!candidate || candidate.disabled) continue;
      setActive(candidate.key);
      tabListRef.current
        ?.querySelector<HTMLElement>(`[data-tab-key="${CSS.escape(candidate.key)}"]`)
        ?.focus();
      return;
    }
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, key: string, disabled?: boolean) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTab(key, disabled);
      return;
    }

    // Roving tabindex leaves inactive tabs out of the tab order, so the arrow
    // keys along the tab bar's own axis are the only way to reach them.
    // Vertical writing always treats tabs as peer columns (Left/Right).
    const prevKey = useBlockAxisKeys ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = useBlockAxisKeys ? 'ArrowRight' : 'ArrowDown';
    const index = items.findIndex((item) => item.key === key);
    if (index === -1) return;

    if (e.key === prevKey) {
      e.preventDefault();
      moveTab(index, -1);
    } else if (e.key === nextKey) {
      e.preventDefault();
      moveTab(index, 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      moveTab(-1, 1);
    } else if (e.key === 'End') {
      e.preventDefault();
      moveTab(items.length, -1);
    }
  };

  const activeItem = items.find((item) => item.key === active) ?? items[0];

  return (
    <div
      className={[
        'vertm-tabs',
        `vertm-tabs--${type}`,
        `vertm-tabs--${resolvedPosition}`,
        isVerticalWriting && 'vertm-tabs--vertical-writing',
        editorial && 'vertm-tabs--editorial',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div
        className="vertm-tabs__nav"
        role="tablist"
        aria-orientation={useBlockAxisKeys ? 'horizontal' : 'vertical'}
      >
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
                data-tab-key={item.key}
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
