import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useControlled } from './useControlled.js';

describe('useControlled', () => {
  it('tracks its own state when no value is supplied', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControlled<string>(undefined, 'a', onChange));
    expect(result.current[0]).toBe('a');

    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('defers to the supplied value and only reports changes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControlled<string>('a', 'z', onChange));

    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('a');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('follows the controlled value across rerenders', () => {
    const { result, rerender } = renderHook(({ value }) => useControlled(value, 'z'), {
      initialProps: { value: 'a' },
    });
    expect(result.current[0]).toBe('a');

    rerender({ value: 'b' });
    expect(result.current[0]).toBe('b');
  });

  it('treats an explicit null as controlled', () => {
    const { result } = renderHook(() => useControlled<string | null>(null, 'z'));
    expect(result.current[0]).toBeNull();
  });
});
