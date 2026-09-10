import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { editorialTheme } from '@vertm/tokens';
import { VertMConfigProvider } from './VertMConfigProvider.js';
import { useVertMConfig } from './context.js';

function Probe() {
  const config = useVertMConfig();
  return (
    <div
      data-testid="probe"
      data-appearance={config.appearance}
      data-primary={config.theme.colorPrimary}
      data-bg={config.theme.colorBgLayout}
    />
  );
}

describe('editorial appearance', () => {
  it('adopts editorialTheme when appearance is set without an explicit theme', () => {
    render(
      <VertMConfigProvider appearance="editorial">
        <Probe />
      </VertMConfigProvider>
    );

    const probe = screen.getByTestId('probe');
    expect(probe).toHaveAttribute('data-appearance', 'editorial');
    expect(probe).toHaveAttribute('data-primary', editorialTheme.colorPrimary);
    expect(probe).toHaveAttribute('data-bg', editorialTheme.colorBgLayout);
    expect(document.querySelector('[data-appearance="editorial"]')).toBeTruthy();
  });

  it('keeps an explicit theme when appearance is editorial', () => {
    render(
      <VertMConfigProvider appearance="editorial" theme={{ ...editorialTheme, colorPrimary: '#ff00aa' }}>
        <Probe />
      </VertMConfigProvider>
    );

    expect(screen.getByTestId('probe')).toHaveAttribute('data-primary', '#ff00aa');
    expect(screen.getByTestId('probe')).toHaveAttribute('data-appearance', 'editorial');
  });

  it('inherits appearance from a parent provider', () => {
    render(
      <VertMConfigProvider appearance="editorial">
        <VertMConfigProvider>
          <Probe />
        </VertMConfigProvider>
      </VertMConfigProvider>
    );

    expect(screen.getByTestId('probe')).toHaveAttribute('data-appearance', 'editorial');
  });
});
