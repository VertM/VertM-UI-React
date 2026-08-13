import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMCheckbox } from './Checkbox.js';

describe('VertMCheckbox', () => {
  it('toggles when uncontrolled', async () => {
    const onChange = vi.fn();
    render(<VertMCheckbox onChange={onChange}>ᠨᠢᠭᠡ</VertMCheckbox>);
    const box = screen.getByRole('checkbox');
    expect(box).not.toBeChecked();

    await userEvent.click(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);

    await userEvent.click(box);
    expect(box).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('starts from defaultChecked', () => {
    render(<VertMCheckbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('stays put when controlled', async () => {
    const onChange = vi.fn();
    render(<VertMCheckbox checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('reflects the indeterminate flag on the native input', () => {
    render(<VertMCheckbox indeterminate />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
  });

  it('does not react while disabled', async () => {
    const onChange = vi.fn();
    render(<VertMCheckbox disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});

describe('VertMCheckbox.Group', () => {
  const options = [
    { label: 'ᠨᠢᠭᠡ', value: 'a' },
    { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
    { label: 'ᠭᠤᠷᠪᠠ', value: 'c', disabled: true },
  ];

  it('accumulates and removes values', async () => {
    const onChange = vi.fn();
    render(<VertMCheckbox.Group options={options} onChange={onChange} />);
    const boxes = screen.getAllByRole('checkbox');

    await userEvent.click(boxes[0]!);
    expect(onChange).toHaveBeenLastCalledWith(['a']);

    await userEvent.click(boxes[1]!);
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);

    await userEvent.click(boxes[0]!);
    expect(onChange).toHaveBeenLastCalledWith(['b']);
  });

  it('checks the boxes listed in defaultValue', () => {
    render(<VertMCheckbox.Group options={options} defaultValue={['b']} />);
    const boxes = screen.getAllByRole('checkbox');
    expect(boxes[0]).not.toBeChecked();
    expect(boxes[1]).toBeChecked();
  });

  it('honours a controlled value', async () => {
    const onChange = vi.fn();
    render(<VertMCheckbox.Group options={options} value={['a']} onChange={onChange} />);
    const boxes = screen.getAllByRole('checkbox');
    expect(boxes[0]).toBeChecked();

    await userEvent.click(boxes[1]!);
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
    expect(boxes[1]).not.toBeChecked();
  });

  it('disables individual options and the whole group', async () => {
    const onChange = vi.fn();
    const { unmount } = render(<VertMCheckbox.Group options={options} onChange={onChange} />);
    expect(screen.getAllByRole('checkbox')[2]).toBeDisabled();
    unmount();

    render(<VertMCheckbox.Group options={options} disabled onChange={onChange} />);
    screen.getAllByRole('checkbox').forEach((box) => expect(box).toBeDisabled());
  });
});
