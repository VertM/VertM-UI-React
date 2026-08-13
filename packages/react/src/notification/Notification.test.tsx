import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  NotificationHolder,
  useNotification,
  type NotificationConfig,
} from './Notification.js';

function Trigger({ config }: { config: NotificationConfig }) {
  const notification = useNotification();
  return (
    <button type="button" onClick={() => notification.open(config)}>
      open
    </button>
  );
}

function renderWithHolder(ui: React.ReactNode) {
  return render(<NotificationHolder>{ui}</NotificationHolder>);
}

const openTrigger = () => userEvent.click(screen.getByRole('button', { name: 'open' }));

describe('useNotification', () => {
  it('renders the message and description', async () => {
    renderWithHolder(<Trigger config={{ message: 'ᠮᠡᠳᠡᠭᠡ', description: 'ᠲᠠᠶᠢᠯᠪᠤᠷᠢ' }} />);
    await openTrigger();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('ᠮᠡᠳᠡᠭᠡ');
    expect(alert).toHaveTextContent('ᠲᠠᠶᠢᠯᠪᠤᠷᠢ');
  });

  it('tags the notification with its type', async () => {
    renderWithHolder(<Trigger config={{ message: 'x', type: 'error' }} />);
    await openTrigger();
    expect(await screen.findByRole('alert')).toHaveClass('vertm-notification--error');
  });

  it('groups notifications into placement stacks', async () => {
    renderWithHolder(<Trigger config={{ message: 'x', placement: 'bottomLeft' }} />);
    await openTrigger();

    await waitFor(() =>
      expect(
        document.querySelector('.vertm-notification-stack--bottomLeft')
      ).toBeInTheDocument()
    );
  });

  it('defaults to the topRight stack', async () => {
    renderWithHolder(<Trigger config={{ message: 'x' }} />);
    await openTrigger();

    await waitFor(() =>
      expect(document.querySelector('.vertm-notification-stack--topRight')).toBeInTheDocument()
    );
  });

  it('stacks multiple notifications', async () => {
    renderWithHolder(<Trigger config={{ message: 'x', duration: 0 }} />);
    await openTrigger();
    await openTrigger();

    await waitFor(() => expect(screen.getAllByRole('alert')).toHaveLength(2));
  });

  it('closes on the close button and reports onClose', async () => {
    const onClose = vi.fn();
    renderWithHolder(<Trigger config={{ message: 'x', duration: 0, onClose }} />);
    await openTrigger();
    await screen.findByRole('alert');

    await userEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('auto-dismisses after the configured duration', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const onClose = vi.fn();
      renderWithHolder(<Trigger config={{ message: 'x', duration: 1, onClose }} />);
      await userEvent.click(screen.getByRole('button', { name: 'open' }));
      await screen.findByRole('alert');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });
      await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
      expect(onClose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('stays put when duration is 0', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      renderWithHolder(<Trigger config={{ message: 'x', duration: 0 }} />);
      await userEvent.click(screen.getByRole('button', { name: 'open' }));
      await screen.findByRole('alert');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(10000);
      });
      expect(screen.getByRole('alert')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('destroys everything when called without an id', async () => {
    function DestroyTrigger() {
      const notification = useNotification();
      return (
        <>
          <button type="button" onClick={() => notification.open({ message: 'x', duration: 0 })}>
            open
          </button>
          <button type="button" onClick={() => notification.destroy()}>
            clear
          </button>
        </>
      );
    }
    renderWithHolder(<DestroyTrigger />);

    await openTrigger();
    await openTrigger();
    await waitFor(() => expect(screen.getAllByRole('alert')).toHaveLength(2));

    await userEvent.click(screen.getByRole('button', { name: 'clear' }));
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('renders inside the holder rather than a detached root', async () => {
    const { container } = renderWithHolder(<Trigger config={{ message: 'ᠮᠡᠳᠡᠭᠡ', duration: 0 }} />);
    await openTrigger();

    await waitFor(() => expect(container).toHaveTextContent('ᠮᠡᠳᠡᠭᠡ'));
    expect(document.getElementById('vertm-notification-root')).toBeNull();
  });
});
