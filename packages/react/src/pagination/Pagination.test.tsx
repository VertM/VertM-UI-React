import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VertMPagination } from './Pagination.js';

function pageButton(page: number) {
  return screen.getByRole('button', { name: String(page) });
}

describe('VertMPagination', () => {
  it('renders one item per page and marks the current one', () => {
    render(<VertMPagination total={50} pageSize={10} defaultCurrent={2} />);
    expect(screen.getAllByRole('button', { name: /^\d+$/ })).toHaveLength(5);
    expect(pageButton(2)).toHaveAttribute('aria-current', 'page');
  });

  it('reports the page and size on change', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} onChange={onChange} />);
    await userEvent.click(pageButton(3));
    expect(onChange).toHaveBeenCalledWith(3, 10);
  });

  it('steps with the previous and next controls', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} defaultCurrent={2} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenLastCalledWith(3, 10);

    await userEvent.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
  });

  it('disables the edge controls at the boundaries', () => {
    const { unmount } = render(<VertMPagination total={50} pageSize={10} defaultCurrent={1} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('First page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeEnabled();
    unmount();

    render(<VertMPagination total={50} pageSize={10} defaultCurrent={5} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
  });

  it('jumps to the first and last page', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} defaultCurrent={3} onChange={onChange} />);

    await userEvent.click(screen.getByLabelText('Last page'));
    expect(onChange).toHaveBeenLastCalledWith(5, 10);

    await userEvent.click(screen.getByLabelText('First page'));
    expect(onChange).toHaveBeenLastCalledWith(1, 10);
  });

  it('collapses long page lists with ellipses', () => {
    const { container } = render(<VertMPagination total={200} pageSize={10} defaultCurrent={10} />);
    expect(container.querySelectorAll('.vertm-pagination__ellipsis')).toHaveLength(2);
    expect(pageButton(1)).toBeInTheDocument();
    expect(pageButton(20)).toBeInTheDocument();
  });

  it('stays on the controlled page until the parent updates it', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} current={1} onChange={onChange} />);
    await userEvent.click(pageButton(3));

    expect(onChange).toHaveBeenCalledWith(3, 10);
    expect(pageButton(1)).toHaveAttribute('aria-current', 'page');
  });

  it('resets to the first page when the page size changes', async () => {
    const onChange = vi.fn();
    render(
      <VertMPagination total={100} defaultPageSize={10} defaultCurrent={5} showSizeChanger onChange={onChange} />
    );
    await userEvent.selectOptions(screen.getByRole('combobox'), '20');
    expect(onChange).toHaveBeenCalledWith(1, 20);
    expect(screen.getAllByRole('button', { name: /^\d+$/ })).toHaveLength(5);
  });

  it('jumps to a typed page and clamps out-of-range input', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} showQuickJumper onChange={onChange} />);
    const jumper = screen.getByRole('spinbutton');

    await userEvent.type(jumper, '4{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(4, 10);

    await userEvent.type(jumper, '99{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(5, 10);
  });

  it('does not fire onChange when the quick jumper is left empty', async () => {
    const onChange = vi.fn();
    render(<VertMPagination total={50} pageSize={10} showQuickJumper onChange={onChange} />);

    await userEvent.click(screen.getByRole('spinbutton'));
    await userEvent.tab();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables every control when disabled', () => {
    render(<VertMPagination total={50} pageSize={10} defaultCurrent={3} showSizeChanger showQuickJumper disabled />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(pageButton(1)).toBeDisabled();
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });

  it('switches to the horizontal layout with English labels', () => {
    const { container } = render(<VertMPagination total={50} pageSize={10} layout="horizontal" showSizeChanger />);
    expect(container.querySelector('.vertm-pagination--horizontal')).toBeInTheDocument();
    expect(screen.getByText('/ page')).toBeInTheDocument();
  });
});
