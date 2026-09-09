import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMRadio } from './Radio.js';

const options = [
  { label: 'ᠨᠢᠭᠡ', value: 'a' },
  { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
  { label: 'ᠭᠤᠷᠪᠠ', value: 'c', disabled: true },
];

describe('VertMRadio', () => {
  it('renders a native radio with its label', () => {
    render(<VertMRadio value="a">ᠨᠢᠭᠡ</VertMRadio>);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'a');
    expect(screen.getByText('ᠨᠢᠭᠡ')).toBeInTheDocument();
  });

  it('does not react while disabled', async () => {
    const onChange = vi.fn();
    render(<VertMRadio disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('VertMRadio.Group', () => {
  it('keeps the selection mutually exclusive', async () => {
    const onChange = vi.fn();
    render(<VertMRadio.Group options={options} onChange={onChange} />);
    const radios = screen.getAllByRole('radio');

    await userEvent.click(radios[0]!);
    expect(onChange).toHaveBeenLastCalledWith('a');
    expect(radios[0]).toBeChecked();

    await userEvent.click(radios[1]!);
    expect(onChange).toHaveBeenLastCalledWith('b');
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it('starts from defaultValue', () => {
    render(<VertMRadio.Group options={options} defaultValue="b" />);
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
  });

  it('honours a controlled value', async () => {
    const onChange = vi.fn();
    render(<VertMRadio.Group options={options} value="a" onChange={onChange} />);
    await userEvent.click(screen.getAllByRole('radio')[1]!);

    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
  });

  it('disables individual options', () => {
    render(<VertMRadio.Group options={options} />);
    expect(screen.getAllByRole('radio')[2]).toBeDisabled();
  });

  it('renders a segmented button group when optionType is button', async () => {
    const onChange = vi.fn();
    render(<VertMRadio.Group options={options} optionType="button" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]!.tagName).toBe('BUTTON');

    await userEvent.click(radios[1]!);
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('aria-checked', 'true');
    expect(screen.getAllByRole('radio')[2]).toBeDisabled();
  });
});
