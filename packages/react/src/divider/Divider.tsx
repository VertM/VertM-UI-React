import { useState, useRef, type ReactNode, type CSSProperties, type CompositionEvent } from 'react';
import { normalizeMongolianText } from '@vertm/core';
import { Edit } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

/** Text position along the divider line. */
export type DividerPlacement = 'top' | 'center' | 'bottom';

/** @deprecated Use `DividerPlacement` instead. */
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps {
  /** 分割线中间的文字内容 */
  children?: ReactNode;
  /** 文字沿分割线的位置 @default 'center' */
  placement?: DividerPlacement;
  /** @deprecated 请改用 placement（left→top，right→bottom） */
  orientation?: DividerOrientation;
  /** 是否允许编辑标签文字（仅 string children） */
  editable?: boolean;
  /** 可编辑标签文字变化时的回调 */
  onTextChange?: (text: string) => void;
  /** 是否虚线 */
  dashed?: boolean;
  /** 是否使用更轻的正文样式 */
  plain?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function resolvePlacement(
  placement?: DividerPlacement,
  orientation?: DividerOrientation
): DividerPlacement {
  if (placement) return placement;
  if (orientation === 'left') return 'top';
  if (orientation === 'right') return 'bottom';
  if (orientation === 'center') return 'center';
  return 'center';
}

function hasDividerLabel(children: ReactNode): boolean {
  return children != null && children !== false;
}

function DividerLabelEditor({
  value,
  vertical,
  onChange,
  onClose,
}: {
  value: string;
  vertical: boolean;
  onChange: (text: string) => void;
  onClose: () => void;
}) {
  const composing = useRef(false);

  const commit = (raw: string) => onChange(normalizeMongolianText(raw));

  return (
    <input
      type="text"
      className={`vertm-divider__input ${vertical ? 'vertm-divider__input--vertical' : ''}`.trim()}
      defaultValue={value}
      autoFocus
      size={Math.max(2, Math.min(value.length || 2, 8))}
      aria-label="Edit divider text"
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={(e: CompositionEvent<HTMLInputElement>) => {
        composing.current = false;
        commit(e.currentTarget.value);
      }}
      onChange={(e) => {
        if (!composing.current) commit(e.target.value);
      }}
      onBlur={(e) => {
        commit(e.target.value);
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          commit(e.currentTarget.value);
          onClose();
        }
        if (e.key === 'Escape') onClose();
      }}
    />
  );
}

function DividerLabel({
  text,
  vertical,
  editable,
  onTextChange,
}: {
  text: string;
  vertical: boolean;
  editable?: boolean;
  onTextChange?: (text: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editable) {
    if (editing) {
      return (
        <DividerLabelEditor
          value={text}
          vertical={vertical}
          onChange={(value) => onTextChange?.(value)}
          onClose={() => setEditing(false)}
        />
      );
    }

    return (
      <button
        type="button"
        className="vertm-divider__editable-trigger"
        onClick={() => setEditing(true)}
        title="Click to edit"
        aria-label="Edit divider text"
      >
        {text ? (
          vertical ? (
            <VertMText as="span" text={text} className="vertm-divider__label" />
          ) : (
            normalizeMongolianText(text)
          )
        ) : (
          <span className="vertm-divider__label vertm-divider__label--empty" aria-hidden="true">
            {'\u00a0'}
          </span>
        )}
        <Edit size="small" vertical={vertical} className="vertm-divider__edit-icon" />
      </button>
    );
  }

  if (vertical) {
    return <VertMText as="span" text={text} className="vertm-divider__label" />;
  }

  return <>{normalizeMongolianText(text)}</>;
}

export function VertMDivider({
  children,
  placement,
  orientation,
  editable = false,
  onTextChange,
  dashed = false,
  plain = false,
  className = '',
  style,
}: DividerProps) {
  const isVertical = useIsVertical();
  const resolvedPlacement = resolvePlacement(placement, orientation);
  const showLabel = hasDividerLabel(children);

  const classes = [
    'vertm-divider',
    isVertical ? 'vertm-divider--vertical-mode' : 'vertm-divider--horizontal-mode',
    showLabel && 'vertm-divider--with-text',
    showLabel && `vertm-divider--${resolvedPlacement}`,
    editable && 'vertm-divider--editable',
    dashed && 'vertm-divider--dashed',
    plain && 'vertm-divider--plain',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style} role="separator">
      {showLabel ? (
        <>
          <span className="vertm-divider__line" aria-hidden="true" />
          <span className="vertm-divider__text">
            {typeof children === 'string' ? (
              <DividerLabel
                text={children}
                vertical={isVertical}
                editable={editable}
                onTextChange={onTextChange}
              />
            ) : (
              children
            )}
          </span>
          <span className="vertm-divider__line" aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}
