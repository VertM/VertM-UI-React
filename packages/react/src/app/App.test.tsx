import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme } from '@vertm/tokens';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMApp, useApp } from './App.js';

function Trigger() {
  const { message, notification, modal } = useApp();
  return (
    <>
      <button type="button" onClick={() => message.success('ᠠᠮᠵᠢᠯᠲᠠ')}>
        message
      </button>
      <button type="button" onClick={() => notification.info({ message: 'ᠮᠡᠳᠡᠭᠡ' })}>
        notification
      </button>
      <button type="button" onClick={() => modal.confirm({ content: 'ᠠᠰᠠᠭᠤᠯᠲᠠ' })}>
        modal
      </button>
    </>
  );
}

describe('VertMApp', () => {
  it('renders its children', () => {
    render(
      <VertMApp>
        <span>child</span>
      </VertMApp>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('wraps content in a div by default and skips it when component is false', () => {
    const { container, unmount } = render(
      <VertMApp>
        <span>child</span>
      </VertMApp>
    );
    expect(container.querySelector('.vertm-app')).toBeInTheDocument();
    unmount();

    const { container: bare } = render(
      <VertMApp component={false}>
        <span>child</span>
      </VertMApp>
    );
    expect(bare.querySelector('.vertm-app')).not.toBeInTheDocument();
  });

  it('exposes working message, notification and modal APIs through useApp', async () => {
    render(
      <VertMApp>
        <Trigger />
      </VertMApp>
    );

    await userEvent.click(screen.getByRole('button', { name: 'message' }));
    await waitFor(() => expect(screen.getByText('ᠠᠮᠵᠢᠯᠲᠠ')).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: 'notification' }));
    await waitFor(() => expect(screen.getByText('ᠮᠡᠳᠡᠭᠡ')).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: 'modal' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
  });

  it('renders the three surfaces inside the app tree, not a detached root', async () => {
    const { container } = render(
      <VertMApp>
        <Trigger />
      </VertMApp>
    );
    const appRoot = container.querySelector('.vertm-app')!;

    await userEvent.click(screen.getByRole('button', { name: 'message' }));
    await waitFor(() => expect(appRoot).toHaveTextContent('ᠠᠮᠵᠢᠯᠲᠠ'));

    await userEvent.click(screen.getByRole('button', { name: 'notification' }));
    await waitFor(() => expect(appRoot).toHaveTextContent('ᠮᠡᠳᠡᠭᠡ'));

    expect(document.getElementById('vertm-message-root')).toBeNull();
    expect(document.getElementById('vertm-notification-root')).toBeNull();
  });

  it('inherits writingMode from the surrounding ConfigProvider', async () => {
    render(
      <VertMConfigProvider writingMode="vertical-rl" theme={createTheme()}>
        <VertMApp>
          <Trigger />
        </VertMApp>
      </VertMConfigProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'message' }));

    // A detached root would fall back to the default vertical-lr config.
    const provider = document.querySelector('[data-writing-mode]')!;
    expect(provider).toHaveAttribute('data-writing-mode', 'vertical-rl');
    await waitFor(() => expect(provider).toHaveTextContent('ᠠᠮᠵᠢᠯᠲᠠ'));
  });

  it('inherits custom theme tokens for dialogs opened through useApp', async () => {
    render(
      <VertMConfigProvider theme={createTheme({ colorPrimary: '#ff0000' })}>
        <VertMApp>
          <Trigger />
        </VertMApp>
      </VertMConfigProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'modal' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    // The dialog is portalled out of the provider's subtree, so the portal
    // scope has to carry the theme variables for it.
    const themed = screen.getByRole('dialog').closest('.vertm-portal-scope') as HTMLElement;
    expect(themed).not.toBeNull();
    expect(themed.style.getPropertyValue('--vertm-color-primary')).toBe('#ff0000');
  });
});
