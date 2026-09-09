import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMSwitch } from './Switch.js';

describe('VertMSwitch', () => {
  it('exposes the switch role and its checked state', () => {
    render(<VertMSwitch defaultChecked />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveClass('vertm-switch--checked');
  });

  it('toggles on click when uncontrolled', async () => {
    const onChange = vi.fn();
    render(<VertMSwitch onChange={onChange} />);
    const toggle = screen.getByRole('switch');

    await userEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(toggle);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('stays put when controlled', async () => {
    const onChange = vi.fn();
    render(<VertMSwitch checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles with Enter and Space', async () => {
    const onChange = vi.fn();
    render(<VertMSwitch onChange={onChange} />);
    screen.getByRole('switch').focus();

    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(true);

    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('is inert while loading or disabled', async () => {
    const onChange = vi.fn();
    const { unmount } = render(<VertMSwitch loading onChange={onChange} />);
    const loadingToggle = screen.getByRole('switch');
    expect(loadingToggle).toBeDisabled();
    expect(loadingToggle).toHaveClass('vertm-switch--loading');
    await userEvent.click(loadingToggle);
    expect(onChange).not.toHaveBeenCalled();
    unmount();

    render(<VertMSwitch disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders checked and unchecked labels', () => {
    render(<VertMSwitch checkedChildren="ᠲᠡᠶᠢᠮᠦ" unCheckedChildren="ᠦᠭᠡᠢ" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('vertm-switch--with-text');
    expect(toggle).toHaveTextContent('ᠲᠡᠶᠢᠮᠦ');
    expect(toggle).toHaveTextContent('ᠦᠭᠡᠢ');
  });

  it('applies the small size modifier', () => {
    render(<VertMSwitch size="small" />);
    expect(screen.getByRole('switch')).toHaveClass('vertm-switch--small');
  });
});
