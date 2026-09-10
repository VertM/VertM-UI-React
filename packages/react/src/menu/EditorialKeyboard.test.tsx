import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMConfigProvider } from '../config/VertMConfigProvider.js';
import { VertMSelect } from '../select/Select.js';
import { VertMTabs } from '../tabs/Tabs.js';
import { VertMMenu } from './Menu.js';

const selectOptions = [
  { label: 'ᠨᠢᠭᠡ', value: 'a' },
  { label: 'ᠬᠣᠶᠠᠷ', value: 'b' },
  { label: 'ᠭᠤᠷᠪᠠ', value: 'c' },
];

describe('editorial keyboard contract', () => {
  it('Select: ArrowUp/Down move highlight, ArrowRight commits', async () => {
    const onChange = vi.fn();
    render(
      <VertMConfigProvider appearance="editorial">
        <VertMSelect options={selectOptions} onChange={onChange} />
      </VertMConfigProvider>
    );

    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('Tabs: Left/Right move between peer columns even on a side bar', async () => {
    render(
      <VertMConfigProvider appearance="editorial">
        <VertMTabs
          tabPosition="left"
          items={[
            { key: 'a', label: 'ᠨᠢᠭᠡ', children: 'panel-a' },
            { key: 'b', label: 'ᠬᠣᠶᠠᠷ', children: 'panel-b' },
          ]}
        />
      </VertMConfigProvider>
    );

    screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ }).focus();
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-b');

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveFocus();
  });

  it('Menu: ArrowDown moves within a level, ArrowRight opens and focuses the submenu', async () => {
    render(
      <VertMConfigProvider appearance="editorial">
        <VertMMenu
          items={[
            { key: 'mail', label: 'ᠵᠠᠬᠢᠳᠠᠯ' },
            {
              key: 'sub',
              label: 'ᠳᠡᠭᠡᠳᠦ',
              children: [
                { key: 'sub-1', label: 'ᠨᠢᠭᠡ' },
                { key: 'sub-2', label: 'ᠬᠣᠶᠠᠷ' },
              ],
            },
          ]}
        />
      </VertMConfigProvider>
    );

    const mail = screen.getByRole('menuitem', { name: /ᠵᠠᠬᠢᠳᠠᠯ/ });
    mail.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: /ᠳᠡᠭᠡᠳᠦ/ })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ })).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: /ᠬᠣᠶᠠᠷ/ })).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /ᠳᠡᠭᠡᠳᠦ/ })).toHaveFocus()
    );
  });
});
