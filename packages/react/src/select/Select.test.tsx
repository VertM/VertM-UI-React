import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMSelect, VertMAutoComplete, type SelectOption } from './Select.js';

const options: SelectOption[] = [
  { label: 'ᠮᠣᠩᠭᠣᠯ', value: 'mn' },
  { label: 'ᠬᠢᠲᠠᠳ', value: 'zh' },
  { label: 'ᠣᠷᠣᠰ', value: 'ru', disabled: true },
];

function openPanel() {
  return userEvent.click(screen.getByRole('combobox'));
}

describe('VertMSelect', () => {
  it('shows the placeholder until something is selected', () => {
    render(<VertMSelect options={options} placeholder="ᠰᠣᠩᠭᠣ" />);
    expect(screen.getByText('ᠰᠣᠩᠭᠣ')).toBeInTheDocument();
  });

  it('opens the listbox on click and closes on Escape', async () => {
    render(<VertMSelect options={options} />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await openPanel();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects an option and closes in single mode', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} onChange={onChange} />);
    await openPanel();
    await userEvent.click(screen.getByRole('option', { name: /ᠮᠣᠩᠭᠣᠯ/ }));

    expect(onChange).toHaveBeenCalledWith('mn');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('respects a controlled value', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} value="zh" onChange={onChange} />);
    await openPanel();

    expect(screen.getByRole('option', { name: /ᠬᠢᠲᠠᠳ/ })).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(screen.getByRole('option', { name: /ᠮᠣᠩᠭᠣᠯ/ }));
    expect(onChange).toHaveBeenCalledWith('mn');
  });

  it('ignores clicks on disabled options', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} onChange={onChange} />);
    await openPanel();
    await userEvent.click(screen.getByRole('option', { name: /ᠣᠷᠣᠰ/ }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('skips disabled options while navigating with arrow keys', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} onChange={onChange} />);
    screen.getByRole('combobox').focus();

    await userEvent.keyboard('{ArrowDown}');
    // ᠣᠷᠣᠰ is disabled, so three ArrowDowns must still land on ᠬᠢᠲᠠᠳ.
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('zh');
  });

  it('moves the active option with arrow keys and commits with Enter', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} onChange={onChange} />);
    screen.getByRole('combobox').focus();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('zh');
  });

  it('highlights the first enabled option when opening', async () => {
    const onChange = vi.fn();
    const leadingDisabled: SelectOption[] = [
      { label: 'ᠣᠷᠣᠰ', value: 'ru', disabled: true },
      { label: 'ᠮᠣᠩᠭᠣᠯ', value: 'mn' },
    ];
    render(<VertMSelect options={leadingDisabled} onChange={onChange} />);
    screen.getByRole('combobox').focus();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('mn');
  });

  it('toggles values in multiple mode without closing', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} multiple onChange={onChange} />);
    await openPanel();

    await userEvent.click(screen.getByRole('option', { name: /ᠮᠣᠩᠭᠣᠯ/ }));
    expect(onChange).toHaveBeenLastCalledWith(['mn']);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('option', { name: /ᠬᠢᠲᠠᠳ/ }));
    expect(onChange).toHaveBeenLastCalledWith(['mn', 'zh']);
  });

  it('removes a tag in multiple mode', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} multiple defaultValue={['mn', 'zh']} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Remove ᠮᠣᠩᠭᠣᠯ'));
    expect(onChange).toHaveBeenCalledWith(['zh']);
  });

  it('clears a single selection with allowClear', async () => {
    const onChange = vi.fn();
    render(<VertMSelect options={options} allowClear defaultValue="mn" onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Clear'));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('filters options through the Mongolian search normalizer', async () => {
    render(<VertMSelect options={options} showSearch />);
    await openPanel();

    // ᠮᠤᠩᠭᠤᠯ uses U (u1795) where the option uses O (u1792); normalizeForSearch
    // must collapse the two so the option still matches.
    await userEvent.type(screen.getByLabelText('Search'), 'ᠮᠤᠩᠭᠤᠯ');

    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: /ᠮᠣᠩᠭᠣᠯ/ })).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    render(<VertMSelect options={options} disabled />);
    await openPanel();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes when clicking outside', async () => {
    render(
      <div>
        <VertMSelect options={options} />
        <button type="button">outside</button>
      </div>
    );
    await openPanel();
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

describe('VertMAutoComplete', () => {
  it('always renders the search box', async () => {
    render(<VertMAutoComplete options={options} />);
    await openPanel();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });
});
