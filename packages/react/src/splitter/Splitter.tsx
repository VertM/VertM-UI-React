import {
  Children,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useIsVertical } from '../config/context.js';

export interface SplitterPanelProps {
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  collapsible?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface SplitterProps {
  layout?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onResize?: (sizes: number[]) => void;
}

function toPx(value: number | string | undefined, fallback: number): number {
  if (value == null) return fallback;
  if (typeof value === 'number') return value;
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

function SplitterPanel({ children, className = '', style }: SplitterPanelProps) {
  return (
    <div className={`vertm-splitter__panel ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

function SplitterBase({ layout, children, className = '', style, onResize }: SplitterProps) {
  const isVerticalWriting = useIsVertical();
  const isColumn = layout ? layout === 'vertical' : isVerticalWriting;
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0.5);
  const dragging = useRef(false);

  const panels = Children.toArray(children).filter(isValidElement) as ReactElement<SplitterPanelProps>[];
  const first = panels[0];
  const second = panels[1];

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = isColumn
        ? (clientX - rect.left) / rect.width
        : (clientY - rect.top) / rect.height;
      const clamped = Math.min(0.85, Math.max(0.15, next));
      setRatio(clamped);
      onResize?.([clamped, 1 - clamped]);
    },
    [isColumn, onResize]
  );

  const onMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const onMouseMove = (ev: MouseEvent) => handleMove(ev.clientX, ev.clientY);
    const onMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  if (!first || !second) {
    return <div className={`vertm-splitter ${className}`.trim()}>{children}</div>;
  }

  const firstMin = toPx(first.props.min, 48);
  const firstMax = toPx(first.props.max, Infinity);

  return (
    <div
      ref={containerRef}
      className={[
        'vertm-splitter',
        isColumn ? 'vertm-splitter--horizontal' : 'vertm-splitter--vertical',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      <div
        className="vertm-splitter__panel vertm-splitter__panel--first"
        style={{
          flexBasis: `${ratio * 100}%`,
          minWidth: isColumn ? firstMin : undefined,
          minHeight: !isColumn ? firstMin : undefined,
          maxWidth: isColumn && Number.isFinite(firstMax) ? firstMax : undefined,
          maxHeight: !isColumn && Number.isFinite(firstMax) ? firstMax : undefined,
          ...first.props.style,
        }}
      >
        {first.props.children}
      </div>
      <div
        className="vertm-splitter__bar"
        role="separator"
        aria-orientation={isColumn ? 'vertical' : 'horizontal'}
        tabIndex={0}
        onMouseDown={onMouseDown}
      />
      <div className="vertm-splitter__panel vertm-splitter__panel--second" style={second.props.style}>
        {second.props.children}
      </div>
    </div>
  );
}

export const VertMSplitter = Object.assign(SplitterBase, { Panel: SplitterPanel });
