import { createPortal } from 'react-dom';
import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { themeToCssVars } from '@vertm/tokens';
import { useVertMConfig } from '../config/context.js';

export interface PortalProps {
  children: ReactNode;
  container?: HTMLElement | (() => HTMLElement);
}

export function Portal({ children, container }: PortalProps) {
  const config = useVertMConfig();

  // Portalled content leaves the provider's DOM subtree, so the CSS variables
  // that carry the theme no longer cascade into it. React context still
  // reaches here, so re-emit the variables on a layout-neutral wrapper.
  const scopeStyle = useMemo(
    () =>
      ({
        ...themeToCssVars(config.theme),
        '--vertm-font-family': config.fontFamily,
        display: 'contents',
      }) as CSSProperties,
    [config.theme, config.fontFamily]
  );

  const target =
    typeof container === 'function'
      ? container()
      : container ?? (typeof document !== 'undefined' ? document.body : null);

  if (!target) return null;

  return createPortal(
    <div
      className="vertm-portal-scope"
      style={scopeStyle}
      data-writing-mode={config.writingMode}
      data-direction={config.direction}
      data-appearance={config.appearance}
    >
      {children}
    </div>,
    target
  );
}
