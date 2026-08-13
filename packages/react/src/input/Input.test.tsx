import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMInput } from './Input.js';

function ControlledInput(props: { onChange?: (v: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <VertMInput
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e.target.value);
      }}
    />
  );
}

describe('VertMInput', () => {
  it('renders a single-line mirror input by default', () => {
    render(<VertMInput placeholder="ᠪᠢᠴᠢᠭ" />);
    const input = screen.getByRole('textbox');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('aria-label', 'ᠪᠢᠴᠢᠭ');
  });

  it('keeps an uncontrolled value internally', async () => {
    render(<VertMInput defaultValue="ᠠ" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'ᠪ');
    expect(input.value).toBe('ᠠᠪ');
  });

  it('reports changes to onChange for controlled usage', async () => {
    const onChange = vi.fn();
    render(<ControlledInput onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'ᠠᠪ');
    expect(onChange).toHaveBeenLastCalledWith('ᠠᠪ');
  });

  it('rejects input beyond maxLength', async () => {
    const onChange = vi.fn();
    render(<VertMInput maxLength={3} onChange={(e) => onChange(e.target.value)} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'ᠠᠪᠭᠳ');
    expect(onChange).toHaveBeenLastCalledWith('ᠠᠪᠭ');
  });

  it('shows the character count against maxLength', async () => {
    render(<VertMInput showCount maxLength={10} defaultValue="ᠠᠪ" />);
    expect(screen.getByText('2/10')).toBeInTheDocument();
  });

  it('exposes the clear button only when there is a value', async () => {
    render(<VertMInput allowClear defaultValue="ᠠᠪ" />);
    const clear = screen.getByLabelText('Clear');
    expect(clear).toHaveStyle({ visibility: 'visible' });

    await userEvent.click(clear);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    expect(screen.getByLabelText('Clear')).toHaveStyle({ visibility: 'hidden' });
  });

  it('marks the wrapper with the current status', () => {
    const { container } = render(<VertMInput status="error" />);
    expect(container.querySelector('.vertm-input--error')).toBeInTheDocument();
  });

  it('disables the underlying field', () => {
    render(<VertMInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders addons and affixes', () => {
    render(
      <VertMInput
        addonBefore={<span data-testid="before" />}
        addonAfter={<span data-testid="after" />}
        prefix={<span data-testid="prefix" />}
        suffix={<span data-testid="suffix" />}
      />
    );
    expect(screen.getByTestId('before')).toBeInTheDocument();
    expect(screen.getByTestId('after')).toBeInTheDocument();
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });
});

describe('VertMInput.TextArea', () => {
  it('renders a textarea when rows exceed one', () => {
    render(<VertMInput.TextArea rows={4} />);
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('derives rows from autoSize.minRows', () => {
    render(<VertMInput.TextArea autoSize={{ minRows: 5, maxRows: 8 }} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  it('keeps newlines in multiline mode', async () => {
    render(<VertMInput.TextArea rows={3} />);
    const area = screen.getByRole('textbox') as HTMLTextAreaElement;
    await userEvent.type(area, 'ᠠ{Enter}ᠪ');
    expect(area.value).toBe('ᠠ\nᠪ');
  });
});

describe('VertMInput.Search', () => {
  it('fires onSearch when the enter button is clicked', async () => {
    const onSearch = vi.fn();
    render(<VertMInput.Search value="ᠠᠪ" enterButton onSearch={onSearch} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onSearch).toHaveBeenCalledWith('ᠠᠪ');
  });
});

describe('VertMInput.Password', () => {
  it('masks the visual layer and toggles visibility', async () => {
    const { container } = render(<VertMInput.Password defaultValue="abc" />);
    const visual = container.querySelector('.vertm-field__visual');
    expect(visual).toHaveTextContent('•••');

    await userEvent.click(screen.getByLabelText('Show password'));
    expect(container.querySelector('.vertm-field__visual')).toHaveTextContent('abc');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('blocks non-ASCII characters and surfaces a hint', async () => {
    render(<VertMInput.Password />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'ᠠ');
    expect(input.value).toBe('');
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('accepts ASCII characters', async () => {
    render(<VertMInput.Password />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'aB1!');
    expect(input.value).toBe('aB1!');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
