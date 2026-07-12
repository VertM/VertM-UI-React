import { type ReactNode, type CSSProperties } from 'react';
import { VertMText } from '../VertMText.js';

export interface EmptyProps {
  description?: ReactNode;
  image?: ReactNode | 'default' | 'simple';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function DefaultImage() {
  return (
    <svg className="vertm-empty__image" viewBox="0 0 64 41" aria-hidden>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="var(--vertm-color-border-secondary)" cx="32" cy="33" rx="32" ry="7" />
        <g stroke="var(--vertm-color-border)" strokeWidth="1.5">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46z" />
          <path d="M41.608 12H22.392" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

export function VertMEmpty({
  description = 'No data',
  image = 'default',
  children,
  className = '',
  style,
}: EmptyProps) {
  const img =
    image === 'default' ? (
      <DefaultImage />
    ) : image === 'simple' ? (
      <svg className="vertm-empty__image vertm-empty__image--simple" viewBox="0 0 64 41" aria-hidden>
        <ellipse fill="var(--vertm-color-border-secondary)" cx="32" cy="33" rx="32" ry="7" />
      </svg>
    ) : (
      image
    );

  return (
    <div className={`vertm-empty vertm-vertical ${className}`.trim()} style={style}>
      <div className="vertm-empty__image-wrap">{img}</div>
      {description && (
        <p className="vertm-empty__description">
          {typeof description === 'string' ? (
            <VertMText as="span" text={description} />
          ) : (
            description
          )}
        </p>
      )}
      {children && <div className="vertm-empty__footer">{children}</div>}
    </div>
  );
}
