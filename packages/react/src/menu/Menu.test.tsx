import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMMenu, type MenuItemType } from './Menu.js';

const items: MenuItemType[] = [
  { key: 'home', label: 'ᠨᠢᠭᠡ' },
  { key: 'divider-1', type: 'divider' },
  { key: 'blocked', label: 'ᠬᠣᠶᠠᠷ', disabled: true },
  {
    key: 'more',
    label: 'ᠭᠤᠷᠪᠠ',
    children: [
      { key: 'child-1', label: 'ᠳᠥᠷᠪᠡ' },
      { key: 'child-2', label: 'ᠲᠠᠪᠤ' },
    ],
  },
];

function subMenuTitle() {
  return screen.getByRole('button', { name: /ᠭᠤᠷᠪᠠ/ });
}

describe('VertMMenu', () => {
  it('renders items, dividers and submenu titles', () => {
    render(<VertMMenu items={items} />);
    expect(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ })).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(subMenuTitle()).toHaveAttribute('aria-expanded', 'false');
  });

  it('selects an item and reports its key path', async () => {
    const onSelect = vi.fn();
    render(<VertMMenu items={items} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ }));

    expect(onSelect).toHaveBeenCalledWith({ key: 'home', keyPath: ['home'] });
    expect(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ })).toHaveClass('vertm-menu-item--selected');
  });

  it('marks defaultSelectedKeys on mount', () => {
    render(<VertMMenu items={items} defaultSelectedKeys={['home']} />);
    expect(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ })).toHaveClass('vertm-menu-item--selected');
  });

  it('does not move selection when selectedKeys is controlled', async () => {
    const onSelect = vi.fn();
    render(<VertMMenu items={items} selectedKeys={[]} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ }));

    expect(onSelect).toHaveBeenCalledWith({ key: 'home', keyPath: ['home'] });
    expect(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ })).not.toHaveClass(
      'vertm-menu-item--selected'
    );
  });

  it('ignores clicks and keys on a disabled item', async () => {
    const onSelect = vi.fn();
    render(<VertMMenu items={items} onSelect={onSelect} />);
    const disabled = screen.getByRole('menuitem', { name: /ᠬᠣᠶᠠᠷ/ });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(disabled);
    disabled.focus();
    await userEvent.keyboard('{Enter}');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('selects an item with Enter and Space', async () => {
    const onSelect = vi.fn();
    render(<VertMMenu items={items} onSelect={onSelect} />);
    screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ }).focus();

    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(' ');
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('toggles a submenu on click and reports openKeys', async () => {
    const onOpenChange = vi.fn();
    render(<VertMMenu items={items} onOpenChange={onOpenChange} />);
    expect(screen.queryByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).not.toBeInTheDocument();

    await userEvent.click(subMenuTitle());
    expect(onOpenChange).toHaveBeenLastCalledWith(['more']);
    expect(screen.getByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).toBeInTheDocument();
    expect(subMenuTitle()).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(subMenuTitle());
    expect(onOpenChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).not.toBeInTheDocument();
  });

  it('opens a submenu on hover', async () => {
    render(<VertMMenu items={items} />);
    await userEvent.hover(subMenuTitle());
    expect(screen.getByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).toBeInTheDocument();
  });

  it('opens with ArrowRight and closes with ArrowLeft', async () => {
    render(<VertMMenu items={items} />);
    subMenuTitle().focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).toBeInTheDocument();

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.queryByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).not.toBeInTheDocument();
  });

  it('prefixes the parent key when selecting inside a submenu', async () => {
    const onSelect = vi.fn();
    render(<VertMMenu items={items} defaultOpenKeys={['more']} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /ᠲᠠᠪᠤ/ }));

    expect(onSelect).toHaveBeenCalledWith({ key: 'child-2', keyPath: ['more', 'child-2'] });
  });

  it('respects a controlled openKeys prop', async () => {
    const onOpenChange = vi.fn();
    render(<VertMMenu items={items} openKeys={[]} onOpenChange={onOpenChange} />);
    await userEvent.click(subMenuTitle());

    expect(onOpenChange).toHaveBeenCalledWith(['more']);
    expect(screen.queryByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).not.toBeInTheDocument();
  });

  it.each([
    ['vertical', 'vertm-menu--vertical'],
    ['inline', 'vertm-menu--inline'],
    ['horizontal', 'vertm-menu--horizontal'],
  ] as const)('maps mode %s to its class', (mode, expected) => {
    const { container } = render(<VertMMenu items={items} mode={mode} />);
    expect(container.querySelector('nav')).toHaveClass(expected);
  });

  it('supports the declarative children API', async () => {
    const onSelect = vi.fn();
    render(
      <VertMMenu onSelect={onSelect}>
        <VertMMenu.Item itemKey="one">ᠨᠢᠭᠡ</VertMMenu.Item>
        <VertMMenu.SubMenu itemKey="group" title="ᠭᠤᠷᠪᠠ">
          <VertMMenu.Item itemKey="two">ᠳᠥᠷᠪᠡ</VertMMenu.Item>
        </VertMMenu.SubMenu>
      </VertMMenu>
    );

    await userEvent.click(screen.getByRole('menuitem', { name: /ᠨᠢᠭᠡ/ }));
    expect(onSelect).toHaveBeenCalledWith({ key: 'one', keyPath: ['one'] });

    await userEvent.click(subMenuTitle());
    expect(screen.getByRole('menuitem', { name: /ᠳᠥᠷᠪᠡ/ })).toBeInTheDocument();
  });
});
