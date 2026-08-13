import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMButton } from './Button.js';

describe('VertMButton', () => {
  it('renders its label and defaults to a non-submitting button', () => {
    render(<VertMButton>ᠲᠡᠶᠢᠮᠦ</VertMButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveTextContent('ᠲᠡᠶᠢᠮᠦ');
  });

  it('applies type, size and danger modifiers as class names', () => {
    render(
      <VertMButton type="primary" size="large" danger block>
        ᠲᠡᠶᠢᠮᠦ
      </VertMButton>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('vertm-btn--primary');
    expect(button).toHaveClass('vertm-btn--large');
    expect(button).toHaveClass('vertm-btn--danger');
    expect(button).toHaveClass('vertm-btn--block');
  });

  it('calls onClick when activated by pointer', async () => {
    const onClick = vi.fn();
    render(<VertMButton onClick={onClick}>ᠲᠡᠶᠢᠮᠦ</VertMButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is triggerable with Enter and Space', async () => {
    const onClick = vi.fn();
    render(<VertMButton onClick={onClick}>ᠲᠡᠶᠢᠮᠦ</VertMButton>);
    const button = screen.getByRole('button');
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('disables interaction and marks aria-busy while loading', async () => {
    const onClick = vi.fn();
    render(
      <VertMButton loading onClick={onClick}>
        ᠲᠡᠶᠢᠮᠦ
      </VertMButton>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <VertMButton disabled onClick={onClick}>
        ᠲᠡᠶᠢᠮᠦ
      </VertMButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders a custom icon when not loading', () => {
    render(
      <VertMButton icon={<span data-testid="icon" />}>
        ᠲᠡᠶᠢᠮᠦ
      </VertMButton>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('hides the custom icon while loading', () => {
    render(
      <VertMButton loading icon={<span data-testid="icon" />}>
        ᠲᠡᠶᠢᠮᠦ
      </VertMButton>
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('forwards htmlType so it can submit a form', () => {
    render(<VertMButton htmlType="submit">ᠲᠡᠶᠢᠮᠦ</VertMButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('groups buttons under a group role', () => {
    render(
      <VertMButton.Group>
        <VertMButton>ᠨᠢᠭᠡ</VertMButton>
        <VertMButton>ᠬᠣᠶᠠᠷ</VertMButton>
      </VertMButton.Group>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
