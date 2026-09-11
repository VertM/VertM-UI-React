import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import {
  useBreakpoint,
  resolveResponsiveValue,
  type Breakpoint,
} from '../hooks/useBreakpoint.js';

export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

export interface RowProps {
  /** 行内列 */
  children?: ReactNode;
  /** 栅格间隔；数组为 [水平, 垂直] */
  gutter?: number | [number, number];
  /** 是否自动换行 */
  wrap?: boolean;
  /** 主轴对齐方式 */
  justify?: RowJustify;
  /** 交叉轴对齐方式 */
  align?: RowAlign;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface ColProps {
  /** 列内容 */
  children?: ReactNode;
  /** 栅格占位格数（24 栅格） */
  span?: number;
  /** 栅格左侧间隔格数 */
  offset?: number;
  /** flex 布局填充 */
  flex?: number | string;
  /** <576px 响应式占位 */
  xs?: number;
  /** ≥576px 响应式占位 */
  sm?: number;
  /** ≥768px 响应式占位 */
  md?: number;
  /** ≥992px 响应式占位 */
  lg?: number;
  /** ≥1200px 响应式占位 */
  xl?: number;
  /** ≥1600px 响应式占位 */
  xxl?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

const ALIGN_MAP: Record<RowAlign, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

function resolveGutter(
  gutter: number | [number, number] | undefined,
  isVertical: boolean
): { row: number; col: number } {
  if (gutter == null) return { row: 0, col: 0 };
  if (Array.isArray(gutter)) {
    const [h, v] = gutter;
    return isVertical ? { row: v, col: h } : { row: h, col: v };
  }
  return { row: gutter / 2, col: gutter / 2 };
}

function spanToWidth(span: number): string {
  return `${(span / 24) * 100}%`;
}

function buildColStyle(
  span: number | undefined,
  offset: number | undefined,
  flex: number | string | undefined
): CSSProperties {
  const style: CSSProperties = {};
  if (flex != null) {
    style.flex = flex;
  } else if (span != null) {
    style.flex = `0 0 ${spanToWidth(span)}`;
    style.maxWidth = spanToWidth(span);
  } else {
    style.flex = '1 1 0';
  }
  if (offset != null && offset > 0) {
    style.marginInlineStart = spanToWidth(offset);
  }
  return style;
}

function Row({
  children,
  gutter,
  wrap = true,
  justify = 'start',
  align = 'top',
  className = '',
  style,
}: RowProps) {
  const isVertical = useIsVertical();
  const { row: rowGutter, col: colGutter } = resolveGutter(gutter, isVertical);

  const rowStyle: CSSProperties = {
    ...style,
    marginInline: rowGutter ? `-${rowGutter}px` : undefined,
    '--vertm-row-gutter-x': `${colGutter}px`,
    '--vertm-row-gutter-y': `${rowGutter}px`,
  } as CSSProperties;

  return (
    <div
      className={[
        'vertm-row',
        `vertm-row--justify-${justify}`,
        `vertm-row--align-${align}`,
        !wrap && 'vertm-row--nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={rowStyle}
      data-align={ALIGN_MAP[align]}
    >
      {children}
    </div>
  );
}


function Col({
  children,
  span,
  offset,
  flex,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  style,
}: ColProps) {
  const screens = useBreakpoint();

  const responsive: Partial<Record<Breakpoint, number>> = { xs, sm, md, lg, xl, xxl };
  const resolvedSpan = resolveResponsiveValue(span, responsive, screens);

  const colStyle: CSSProperties = {
    ...buildColStyle(resolvedSpan, offset, flex),
    ...style,
  };

  return (
    <div className={`vertm-col ${className}`.trim()} style={colStyle}>
      <div className="vertm-col__inner">{children}</div>
    </div>
  );
}

export const VertMRow = Row;
export const VertMCol = Col;
