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
  children?: ReactNode;
  /** Stack along the block axis; defaults to true in vertical writing mode. */
  vertical?: boolean;
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: number | string;
  flex?: string | number;
  component?: ElementType;
  className?: string;
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
