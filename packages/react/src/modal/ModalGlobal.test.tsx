import { describe, expect, it } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMModal } from './index.js';

/**
 * Exercises the standalone `Modal.confirm()` entry point, which mounts its own
 * detached React root instead of relying on an in-tree holder.
 */
describe('Modal static methods', () => {
  it('mounts a detached root on first use', async () => {
    const handle = await act(async () => VertMModal.confirm({ content: 'ᠠᠰᠠᠭᠤᠯᠲᠠ', okText: 'OK' }));

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(document.getElementById('vertm-modal-root')).toBeInTheDocument();

    await act(async () => { handle.destroy(); });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it.each(['info', 'success', 'error', 'warning'] as const)(
    'opens the %s variant',
    async (method) => {
      const handle = await act(async () => VertMModal[method]({ content: 'x' }));
      await waitFor(() =>
        expect(screen.getByRole('dialog')).toHaveClass(`vertm-modal--confirm-${method}`)
      );
      await act(async () => { handle.destroy(); });
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    }
  );

  it('updates content through the returned handle', async () => {
    const handle = await act(async () => VertMModal.confirm({ content: 'before' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent('before'));

    await act(async () => { handle.update({ content: 'after' }); });
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent('after'));

    await act(async () => { handle.destroy(); });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes when the user confirms', async () => {
    await act(async () => { VertMModal.confirm({ content: 'x', okText: 'OK' }); });
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: 'OK' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('destroying before the root has mounted cancels the dialog', async () => {
    const handle = await act(async () => VertMModal.confirm({ content: 'never shown' }));
    await act(async () => { handle.destroy(); });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
