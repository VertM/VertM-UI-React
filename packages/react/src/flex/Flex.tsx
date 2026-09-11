import { type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';

export type FlexJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export interface FlexProps {
  /** Flex 子节点 */
  children?: ReactNode;
  /** 是否沿块轴堆叠；竖排书写模式下默认 true */
  vertical?: boolean;
  /** 是否换行 @default 'nowrap' */
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  /** 主轴对齐 @default 'start' */
  justify?: FlexJustify;
  /** 交叉轴对齐 @default 'stretch' */
  align?: FlexAlign;
  /** 子项间距 */
  gap?: number | string;
  /** CSS flex 简写 */
  flex?: string | number;
  /** 渲染的 HTML 元素类型 @default 'div' */
  component?: ElementType;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

const JUSTIFY_MAP: Record<FlexJustify, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

const ALIGN_MAP: Record<FlexAlign, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
};

export function VertMFlex({
  children,
  vertical,
  wrap = 'nowrap',
  justify = 'start',
  align = 'stretch',
  gap,
  flex,
  component: Component = 'div',
  className = '',
  style,
}: FlexProps) {
  const isVerticalWriting = useIsVertical();
  const isColumn = vertical ?? isVerticalWriting;
  const flexWrap = wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap;

  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isColumn ? 'column' : 'row',
    flexWrap,
    justifyContent: JUSTIFY_MAP[justify],
    alignItems: ALIGN_MAP[align],
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    flex,
    ...style,
  };

  return (
    <Component className={`vertm-flex ${className}`.trim()} style={flexStyle}>
      {children}
    </Component>
  );
}
