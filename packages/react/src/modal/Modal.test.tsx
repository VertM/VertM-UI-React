import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMModal } from './Modal.js';

describe('VertMModal', () => {
  it('renders nothing while closed', () => {
    render(<VertMModal open={false} title="ᠭᠠᠷᠴᠠᠭ" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a modal dialog into a portal when open', () => {
    render(<VertMModal open title="ᠭᠠᠷᠴᠠᠭ">ᠠᠭᠤᠯᠭ᠎ᠠ</VertMModal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('ᠭᠠᠷᠴᠠᠭ');
    expect(dialog.closest('body')).toBe(document.body);
  });

  it('closes on Escape', async () => {
    const onCancel = vi.fn();
    render(<VertMModal open onCancel={onCancel} />);
    await userEvent.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('closes when the mask is clicked', async () => {
    const onCancel = vi.fn();
    const { container } = render(<VertMModal open onCancel={onCancel} />);
    const mask = document.querySelector('.vertm-modal__mask')!;
    await userEvent.click(mask);
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(container).toBeTruthy();
  });

  it('keeps the mask inert when maskClosable is false', async () => {
    const onCancel = vi.fn();
    render(<VertMModal open maskClosable={false} onCancel={onCancel} />);
    await userEvent.click(document.querySelector('.vertm-modal__mask')!);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('omits the mask entirely when mask is false', () => {
    render(<VertMModal open mask={false} />);
    expect(document.querySelector('.vertm-modal__mask')).toBeNull();
  });

  it('wires the default footer to onOk and onCancel', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    render(<VertMModal open onOk={onOk} onCancel={onCancel} okText="OK" cancelText="Cancel" />);

    await userEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onOk).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('hides the footer when footer is null', () => {
    render(<VertMModal open footer={null} />);
    expect(document.querySelector('.vertm-modal__footer')).toBeNull();
  });

  it('renders a custom footer', () => {
    render(<VertMModal open footer={<button type="button">custom</button>} />);
    expect(screen.getByRole('button', { name: 'custom' })).toBeInTheDocument();
  });

  it('closes via the close button', async () => {
    const onCancel = vi.fn();
    render(<VertMModal open onCancel={onCancel} />);
    await userEvent.click(screen.getByLabelText('Close'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll while open and releases it on close', async () => {
    function Harness() {
      const [open, setOpen] = useState(true);
      return <VertMModal open={open} onCancel={() => setOpen(false)} />;
    }
    render(<Harness />);
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
  });

  it('returns focus to the trigger after closing', async () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            open
          </button>
          <VertMModal open={open} onCancel={() => setOpen(false)} />
        </>
      );
    }
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'open' });

    await userEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });

  it('applies a custom width', () => {
    render(<VertMModal open width={800} />);
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '800px' });
  });
});
