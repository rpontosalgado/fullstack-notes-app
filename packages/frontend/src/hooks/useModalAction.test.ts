import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModalAction } from './useModalAction';

describe('useModalAction', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('starts with submitting=false and error=null', () => {
    const { result } = renderHook(() => useModalAction(onClose));
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('calls onClose and returns value on success', async () => {
    const { result } = renderHook(() => useModalAction(onClose));
    let returned: number | undefined;
    await act(async () => {
      returned = await result.current.execute(async () => 42, 'Fallback');
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(returned).toBe(42);
    expect(result.current.error).toBeNull();
    expect(result.current.submitting).toBe(false);
  });

  it('sets error message on rejection and does NOT call onClose', async () => {
    const { result } = renderHook(() => useModalAction(onClose));
    await act(async () => {
      await result.current.execute(
        () => Promise.reject(new Error('boom')),
        'Fallback error',
      );
    });
    expect(onClose).not.toHaveBeenCalled();
    expect(result.current.error).toBe('boom');
    expect(result.current.submitting).toBe(false);
  });

  it('uses fallback message when error is not an Error instance', async () => {
    const { result } = renderHook(() => useModalAction(onClose));
    await act(async () => {
      await result.current.execute(
        () => Promise.reject('raw string'),
        'Fallback message',
      );
    });
    expect(result.current.error).toBe('Fallback message');
  });
});
