import { type CSSProperties } from 'react';
import { useIsVertical } from '../config/context.js';

export interface SkeletonProps {
  active?: boolean;
  avatar?: boolean | { size?: number; shape?: 'circle' | 'square' };
  title?: boolean | { width?: number | string };
  paragraph?: boolean | { rows?: number; width?: number | string | (number | string)[] };
  round?: boolean;
  className?: string;
  style?: CSSProperties;
}

function SkeletonBlock({
  className,
  style,
  active,
}: {
  className?: string;
  style?: CSSProperties;
  active?: boolean;
}) {
  return (
    <div
      className={`vertm-skeleton__item ${active ? 'vertm-skeleton__item--active' : ''} ${className ?? ''}`.trim()}
      style={style}
    />
  );
}

export function VertMSkeleton({
  active = false,
  avatar = false,
  title = true,
  paragraph = true,
  round = false,
  className = '',
  style,
}: SkeletonProps) {
  const isVertical = useIsVertical();

  const avatarSize =
    typeof avatar === 'object' ? (avatar.size ?? 40) : 40;
  const avatarShape = typeof avatar === 'object' ? (avatar.shape ?? 'circle') : 'circle';

  return (
    <div
      className={`vertm-skeleton vertm-vertical ${isVertical ? 'vertm-skeleton--vertical' : ''} ${className}`.trim()}
      style={style}
      aria-busy
      aria-live="polite"
    >
      {avatar && (
        <SkeletonBlock
          active={active}
          className={`vertm-skeleton__avatar vertm-skeleton__avatar--${avatarShape}`}
          style={{ width: avatarSize, height: avatarSize }}
        />
      )}
      <div className="vertm-skeleton__content">
        {title && (
          <SkeletonBlock
            active={active}
            className={`vertm-skeleton__title ${round ? 'vertm-skeleton__item--round' : ''}`}
            style={{
              width: typeof title === 'object' && title && 'width' in title
                ? (title.width as string | number)
                : '60%',
            }}
          />
        )}
        {paragraph && (
          <div className="vertm-skeleton__paragraph">
            {Array.from(
              { length: typeof paragraph === 'object' ? (paragraph.rows ?? 3) : 3 },
              (_, i) => (
                <SkeletonBlock
                  key={i}
                  active={active}
                  className="vertm-skeleton__line"
                  style={{
                    width: (typeof paragraph === 'object' && Array.isArray(paragraph.width)
                      ? paragraph.width[i] ?? '100%'
                      : typeof paragraph === 'object' && paragraph.width !== undefined
                        ? paragraph.width
                        : `${100 - i * 10}%`) as string | number,
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonAvatar(props: { active?: boolean; size?: number }) {
  return <VertMSkeleton active={props.active} avatar={{ size: props.size }} title={false} paragraph={false} />;
}

function SkeletonButton(props: { active?: boolean }) {
  return <SkeletonBlock active={props.active} className="vertm-skeleton__button" style={{ width: 80, height: 32 }} />;
}

function SkeletonInput(props: { active?: boolean }) {
  return <SkeletonBlock active={props.active} className="vertm-skeleton__input" style={{ width: 200, height: 32 }} />;
}

function SkeletonImage(props: { active?: boolean }) {
  return <SkeletonBlock active={props.active} className="vertm-skeleton__image" style={{ width: 120, height: 120 }} />;
}

VertMSkeleton.Avatar = SkeletonAvatar;
VertMSkeleton.Button = SkeletonButton;
VertMSkeleton.Input = SkeletonInput;
VertMSkeleton.Image = SkeletonImage;
