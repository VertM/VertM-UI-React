import { type CSSProperties, type ReactNode } from 'react';
import { VertMText } from '../VertMText.js';

export interface CardProps {
  /** 卡片标题 */
  title?: ReactNode;
  /** 标题栏右侧额外内容 */
  extra?: ReactNode;
  /** 封面区域 */
  cover?: ReactNode;
  /** 底部操作区列表 */
  actions?: ReactNode[];
  /** 鼠标悬停是否浮起 */
  hoverable?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 卡片主体内容 */
  children?: ReactNode;
  /** 点击卡片回调 */
  onClick?: () => void;
}

export interface CardMetaProps {
  /** 头像/图标 */
  avatar?: ReactNode;
  /** 元信息标题 */
  title?: ReactNode;
  /** 元信息描述 */
  description?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface CardGridProps {
  /** 网格单元内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 鼠标悬停是否浮起 */
  hoverable?: boolean;
}

function renderTextNode(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    return <VertMText as="span" text={node} className="vertm-card__text" />;
  }
  return node;
}

function CardMeta({ avatar, title, description, className = '', style }: CardMetaProps) {
  return (
    <div className={`vertm-card-meta ${className}`.trim()} style={style}>
      {avatar && <div className="vertm-card-meta__avatar">{avatar}</div>}
      <div className="vertm-card-meta__detail">
        {title != null && (
          <div className="vertm-card-meta__title">{renderTextNode(title)}</div>
        )}
        {description != null && (
          <div className="vertm-card-meta__description">{renderTextNode(description)}</div>
        )}
      </div>
    </div>
  );
}

function CardGrid({ children, className = '', style, hoverable }: CardGridProps) {
  return (
    <div
      className={[
        'vertm-card-grid',
        hoverable && 'vertm-card-grid--hoverable',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </div>
  );
}

function CardBase({
  title,
  extra,
  cover,
  actions,
  hoverable = false,
  bordered = true,
  className = '',
  style,
  children,
  onClick,
}: CardProps) {
  const hasHeader = title != null || extra != null;

  return (
    <article
      className={[
        'vertm-card',
        bordered && 'vertm-card--bordered',
        hoverable && 'vertm-card--hoverable',
        onClick && 'vertm-card--clickable',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {cover && <div className="vertm-card__cover">{cover}</div>}
      {hasHeader && (
        <header className="vertm-card__header">
          {title != null && (
            <div className="vertm-card__title">{renderTextNode(title)}</div>
          )}
          {extra && <div className="vertm-card__extra">{extra}</div>}
        </header>
      )}
      {children != null && <div className="vertm-card__body">{children}</div>}
      {actions && actions.length > 0 && (
        <footer className="vertm-card__actions">
          {actions.map((action, i) => (
            <div key={i} className="vertm-card__action">
              {action}
            </div>
          ))}
        </footer>
      )}
    </article>
  );
}

export const VertMCard = Object.assign(CardBase, {
  Meta: CardMeta,
  Grid: CardGrid,
});
