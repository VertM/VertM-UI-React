import { afterEach, describe, expect, it } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from './Notification.js';

/**
 * Exercises the standalone `notification.*` entry point, which mounts its own
 * detached React root instead of relying on an in-tree holder.
 */
describe('notification global API', () => {
  afterEach(async () => {
    await act(async () => { notification.destroy(); });
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('mounts a detached root on first use', async () => {
    await act(async () => { notification.open({ message: 'ᠮᠡᠳᠡᠭᠡ', duration: 0 }); });

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('ᠮᠡᠳᠡᠭᠡ'));
    expect(document.getElementById('vertm-notification-root')).toBeInTheDocument();
  });

  it.each(['success', 'error', 'info', 'warning'] as const)(
    'opens the %s variant',
    async (method) => {
      await act(async () => { notification[method]({ message: 'x', duration: 0 }); });
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveClass(`vertm-notification--${method}`)
      );
    }
  );

  it('closes a single notification by id', async () => {
    await act(async () => { notification.open({ message: 'first', duration: 0 }); });
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    const second = await act(async () => notification.open({ message: 'second', duration: 0 }));
    await waitFor(() => expect(screen.getAllByRole('alert')).toHaveLength(2));

    await act(async () => { notification.destroy(second); });
    await waitFor(() => expect(screen.getAllByRole('alert')).toHaveLength(1));
    expect(screen.getByRole('alert')).toHaveTextContent('first');
  });

  it('closes on the close button', async () => {
    await act(async () => { notification.open({ message: 'x', duration: 0 }); });
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    await userEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });
});
