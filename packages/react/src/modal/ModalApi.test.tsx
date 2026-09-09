import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalHolder, useModal, type ModalFuncConfig, type ModalFuncReturn } from './ModalApi.js';

/** Fires an imperative call from inside the holder so it resolves via context. */
function Trigger({
  method = 'confirm',
  config,
  onHandle,
}: {
  method?: 'confirm' | 'info' | 'success' | 'error' | 'warning';
  config: ModalFuncConfig;
  onHandle?: (handle: ModalFuncReturn) => void;
}) {
  const modal = useModal();
  const handleClick = () => {
    const handle = modal[method](config);
    onHandle?.(handle);
  };
  return (
    <button type="button" onClick={handleClick}>
      open
    </button>
  );
}

function renderWithHolder(ui: React.ReactNode) {
  return render(<ModalHolder>{ui}</ModalHolder>);
}

const openTrigger = () => userEvent.click(screen.getByRole('button', { name: 'open' }));

describe('useModal', () => {
  it('opens a confirm dialog with title, content and both actions', async () => {
    renderWithHolder(
      <Trigger config={{ title: 'ᠭᠠᠷᠴᠠᠭ', content: 'ᠠᠭᠤᠯᠭ᠎ᠠ', okText: 'OK', cancelText: 'Cancel' }} />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await openTrigger();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('ᠭᠠᠷᠴᠠᠭ');
    expect(dialog).toHaveTextContent('ᠠᠭᠤᠯᠭ᠎ᠠ');
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls onOk and closes', async () => {
    const onOk = vi.fn();
    renderWithHolder(<Trigger config={{ content: 'x', okText: 'OK', onOk }} />);
    await openTrigger();
    await userEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onOk).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('calls onCancel and closes', async () => {
    const onCancel = vi.fn();
    renderWithHolder(<Trigger config={{ content: 'x', cancelText: 'Cancel', onCancel }} />);
    await openTrigger();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('shows a loading OK button until an async onOk settles', async () => {
    let resolveOk: () => void = () => {};
    const onOk = vi.fn(() => new Promise<void>((resolve) => { resolveOk = resolve; }));
    renderWithHolder(<Trigger config={{ content: 'x', okText: 'OK', onOk }} />);

    await openTrigger();
    await userEvent.click(screen.getByRole('button', { name: 'OK' }));

    const okButton = screen.getByRole('button', { name: 'OK' });
    await waitFor(() => expect(okButton).toHaveAttribute('aria-busy', 'true'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    resolveOk();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('keeps the dialog open when onOk rejects', async () => {
    const onOk = vi.fn(() => Promise.reject(new Error('nope')));
    renderWithHolder(<Trigger config={{ content: 'x', okText: 'OK', onOk }} />);

    await openTrigger();
    await userEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'OK' })).not.toHaveAttribute('aria-busy')
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('hides the cancel button for the single-action variants', async () => {
    renderWithHolder(<Trigger method="info" config={{ content: 'x', okText: 'OK', cancelText: 'Cancel' }} />);
    await openTrigger();

    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
  });

  it('can force the cancel button back on with okOnly', async () => {
    renderWithHolder(
      <Trigger method="info" config={{ content: 'x', cancelText: 'Cancel', okOnly: false }} />
    );
    await openTrigger();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it.each(['confirm', 'info', 'success', 'error', 'warning'] as const)(
    'tags the dialog with the %s variant',
    async (method) => {
      renderWithHolder(<Trigger method={method} config={{ content: 'x' }} />);
      await openTrigger();
      expect(screen.getByRole('dialog')).toHaveClass(`vertm-modal--confirm-${method}`);
    }
  );

  it('stacks multiple dialogs and closes them independently', async () => {
    renderWithHolder(<Trigger config={{ content: 'x', okText: 'OK' }} />);

    await openTrigger();
    await openTrigger();
    expect(screen.getAllByRole('dialog')).toHaveLength(2);

    await userEvent.click(screen.getAllByRole('button', { name: 'OK' })[0]!);
    await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));
  });

  it('closes programmatically through the returned handle', async () => {
    let handle: ModalFuncReturn | null = null;
    renderWithHolder(
      <Trigger config={{ content: 'x' }} onHandle={(h) => { handle = h; }} />
    );

    await openTrigger();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await act(async () => { handle!.destroy(); });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('updates an open dialog through the returned handle', async () => {
    let handle: ModalFuncReturn | null = null;
    renderWithHolder(
      <Trigger config={{ content: 'before' }} onHandle={(h) => { handle = h; }} />
    );

    await openTrigger();
    expect(screen.getByRole('dialog')).toHaveTextContent('before');

    await act(async () => { handle!.update({ content: 'after' }); });
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent('after'));
  });

  it('ignores mask clicks by default', async () => {
    renderWithHolder(<Trigger config={{ content: 'x' }} />);
    await openTrigger();

    await userEvent.click(document.querySelector('.vertm-modal__mask')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
