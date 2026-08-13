import { afterEach, describe, expect, it } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { message } from './Message.js';

/**
 * Exercises the standalone `message.*` entry point, which mounts its own
 * detached React root instead of relying on an in-tree holder.
 */
describe('message global API', () => {
  afterEach(async () => {
    await act(async () => { message.destroy(); });
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('shows the very first call, made before the root has mounted', async () => {
    await act(async () => { message.success('ᠠᠮᠵᠢᠯᠲᠠ', 0); });

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('ᠠᠮᠵᠢᠯᠲᠠ'));
    expect(document.getElementById('vertm-message-root')).toBeInTheDocument();
  });

  it.each(['success', 'error', 'info', 'warning'] as const)(
    'opens the %s variant',
    async (method) => {
      await act(async () => { message[method]('x', 0); });
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveClass(`vertm-message--${method}`)
      );
    }
  );

  it('keeps a loading message up until it is destroyed', async () => {
    const id = await act(async () => message.loading('ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ'));
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    await act(async () => { message.destroy(id); });
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('closes on the close button', async () => {
    await act(async () => { message.open({ content: 'x', duration: 0 }); });
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    await userEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });
});
