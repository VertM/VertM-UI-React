import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMDrawer, type DrawerPlacement } from './Drawer.js';

describe('VertMDrawer', () => {
  it('renders nothing while closed', () => {
    render(<VertMDrawer open={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dialog with its title and body when open', () => {
    render(
      <VertMDrawer open title="ᠭᠠᠷᠴᠠᠭ">
        ᠠᠭᠤᠯᠭ᠎ᠠ
      </VertMDrawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('ᠭᠠᠷᠴᠠᠭ');
    expect(dialog).toHaveTextContent('ᠠᠭᠤᠯᠭ᠎ᠠ');
  });

  it.each<[DrawerPlacement, string]>([
    ['left', 'vertm-drawer--left'],
    ['right', 'vertm-drawer--right'],
    ['top', 'vertm-drawer--top'],
    ['bottom', 'vertm-drawer--bottom'],
  ])('reflects placement %s in the class name', (placement, expected) => {
    render(<VertMDrawer open placement={placement} />);
    expect(screen.getByRole('dialog')).toHaveClass(expected);
  });

  it('sizes horizontally for side placements and vertically otherwise', () => {
    const { unmount } = render(<VertMDrawer open placement="right" size={420} />);
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '420px' });
    unmount();

    render(<VertMDrawer open placement="top" size={200} />);
    expect(screen.getByRole('dialog')).toHaveStyle({ height: '200px' });
  });

  it('closes on Escape, mask click and the close button', async () => {
    const onClose = vi.fn();
    const { unmount } = render(<VertMDrawer open onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await userEvent.click(document.querySelector('.vertm-drawer__mask')!);
    expect(onClose).toHaveBeenCalledTimes(2);

    await userEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(3);
    unmount();
  });

  it('keeps the mask inert when maskClosable is false', async () => {
    const onClose = vi.fn();
    render(<VertMDrawer open maskClosable={false} onClose={onClose} />);
    await userEvent.click(document.querySelector('.vertm-drawer__mask')!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders a footer only when provided', () => {
    const { unmount } = render(<VertMDrawer open />);
    expect(document.querySelector('.vertm-drawer__footer')).toBeNull();
    unmount();

    render(<VertMDrawer open footer={<button type="button">done</button>} />);
    expect(screen.getByRole('button', { name: 'done' })).toBeInTheDocument();
  });

  it('locks body scroll while open and releases it on close', async () => {
    function Harness() {
      const [open, setOpen] = useState(true);
      return <VertMDrawer open={open} onClose={() => setOpen(false)} />;
    }
    render(<Harness />);
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
  });

  it('moves focus to the panel on open', () => {
    render(<VertMDrawer open />);
    expect(screen.getByRole('dialog')).toHaveFocus();
  });
});
