import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMTabs, type TabItem } from './Tabs.js';

const items: TabItem[] = [
  { key: 'a', label: 'ᠨᠢᠭᠡ', children: 'panel-a' },
  { key: 'b', label: 'ᠬᠣᠶᠠᠷ', children: 'panel-b' },
  { key: 'c', label: 'ᠭᠤᠷᠪᠠ', children: 'panel-c', disabled: true },
  { key: 'd', label: 'ᠳᠥᠷᠪᠡ', children: 'panel-d' },
];

describe('VertMTabs', () => {
  it('activates the first tab by default and shows its panel', () => {
    render(<VertMTabs items={items} />);
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-a');
  });

  it('honours defaultActiveKey', () => {
    render(<VertMTabs items={items} defaultActiveKey="b" />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-b');
  });

  it('switches panels on click and reports the key', async () => {
    const onChange = vi.fn();
    render(<VertMTabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ }));

    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-b');
  });

  it('stays on the controlled activeKey until the parent updates it', async () => {
    const onChange = vi.fn();
    render(<VertMTabs items={items} activeKey="a" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ }));

    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-a');
  });

  it('ignores clicks on a disabled tab', async () => {
    const onChange = vi.fn();
    render(<VertMTabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /ᠭᠤᠷᠪᠠ/ }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-a');
  });

  it('keeps only the active tab in the tab order', () => {
    render(<VertMTabs items={items} defaultActiveKey="b" />);
    expect(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveAttribute('tabindex', '-1');
  });

  it('moves between tabs with the arrow keys along the bar axis', async () => {
    render(<VertMTabs items={items} tabPosition="top" />);
    screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('panel-b');

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveFocus();
  });

  it('uses the vertical arrow keys for a side tab bar', async () => {
    render(<VertMTabs items={items} tabPosition="left" />);
    screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ }).focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ })).toHaveFocus();
  });

  it('skips disabled tabs and wraps around', async () => {
    render(<VertMTabs items={items} tabPosition="top" defaultActiveKey="b" />);
    screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ }).focus();

    // ᠭᠤᠷᠪᠠ is disabled, so the next stop is ᠳᠥᠷᠪᠡ.
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /ᠳᠥᠷᠪᠡ/ })).toHaveFocus();

    // Past the end it wraps back to the first tab.
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveFocus();
  });

  it('jumps to the first and last enabled tab with Home and End', async () => {
    render(<VertMTabs items={items} tabPosition="top" defaultActiveKey="b" />);
    screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ }).focus();

    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: /ᠳᠥᠷᠪᠡ/ })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: /ᠨᠢᠭᠡ/ })).toHaveFocus();
  });

  it('activates a focused tab with Enter and Space', async () => {
    const onChange = vi.fn();
    render(<VertMTabs items={items} activeKey="a" onChange={onChange} />);
    const tab = screen.getByRole('tab', { name: /ᠬᠣᠶᠠᠷ/ });
    tab.focus();

    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith('b');

    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenLastCalledWith('b');
  });

  it('marks the tablist orientation from the tab position', () => {
    const { unmount } = render(<VertMTabs items={items} tabPosition="left" />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    unmount();

    render(<VertMTabs items={items} tabPosition="top" />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders add and remove controls for editable card tabs', async () => {
    const onEdit = vi.fn();
    render(<VertMTabs items={items} type="card" editable={{ onEdit }} />);

    await userEvent.click(screen.getByLabelText('Add tab'));
    expect(onEdit).toHaveBeenCalledWith('add');

    await userEvent.click(screen.getAllByLabelText('Remove tab')[0]!);
    expect(onEdit).toHaveBeenLastCalledWith('remove', 'a');
  });

  it('renders the ink bar only for line tabs', () => {
    const { container, unmount } = render(<VertMTabs items={items} type="line" />);
    expect(container.querySelector('.vertm-tabs__ink-bar')).toBeInTheDocument();
    unmount();

    const { container: cardContainer } = render(<VertMTabs items={items} type="card" />);
    expect(cardContainer.querySelector('.vertm-tabs__ink-bar')).not.toBeInTheDocument();
  });
});
