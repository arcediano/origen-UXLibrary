/**
 * @test useSafeArea hook
 * @description Tests for safe area insets detection and updates
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useSafeArea } from '../useSafeArea';

describe('useSafeArea', () => {
  beforeEach(() => {
    // Reset computed styles
    jest.clearAllMocks();
  });

  test('returns zeros on SSR (server-side)', () => {
    const { result } = renderHook(() => useSafeArea());
    expect(result.current).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  test('parses CSS custom properties on client', () => {
    // Mock getComputedStyle
    const mockGetComputedStyle = jest.fn(() => ({
      getPropertyValue: (prop: string) => {
        const values: Record<string, string> = {
          '--safe-area-inset-top': '44px',
          '--safe-area-inset-right': '0px',
          '--safe-area-inset-bottom': '34px',
          '--safe-area-inset-left': '0px',
        };
        return values[prop] || '0px';
      },
    }));

    window.getComputedStyle = mockGetComputedStyle as any;

    const { result } = renderHook(() => useSafeArea());

    expect(result.current.top).toBe(44);
    expect(result.current.right).toBe(0);
    expect(result.current.bottom).toBe(34);
    expect(result.current.left).toBe(0);
  });

  test('handles non-notched devices (all zeros)', () => {
    const mockGetComputedStyle = jest.fn(() => ({
      getPropertyValue: () => '0px',
    }));

    window.getComputedStyle = mockGetComputedStyle as any;

    const { result } = renderHook(() => useSafeArea());

    expect(result.current).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  test('handles malformed values gracefully', () => {
    const mockGetComputedStyle = jest.fn(() => ({
      getPropertyValue: (prop: string) => {
        if (prop === '--safe-area-inset-top') return 'invalid';
        if (prop === '--safe-area-inset-bottom') return '';
        return '0px';
      },
    }));

    window.getComputedStyle = mockGetComputedStyle as any;

    const { result } = renderHook(() => useSafeArea());

    expect(result.current.top).toBe(0); // Invalid → 0
    expect(result.current.bottom).toBe(0); // Empty → 0
  });

  test('updates on orientation change', async () => {
    let currentInsets = {
      '--safe-area-inset-top': '44px',
      '--safe-area-inset-right': '0px',
      '--safe-area-inset-bottom': '34px',
      '--safe-area-inset-left': '0px',
    };

    const mockGetComputedStyle = jest.fn(() => ({
      getPropertyValue: (prop: string) => currentInsets[prop as keyof typeof currentInsets] || '0px',
    }));

    window.getComputedStyle = mockGetComputedStyle as any;

    const { result, rerender } = renderHook(() => useSafeArea());

    expect(result.current.top).toBe(44);
    expect(result.current.bottom).toBe(34);

    // Simulate orientation change
    currentInsets = {
      '--safe-area-inset-top': '34px',
      '--safe-area-inset-right': '0px',
      '--safe-area-inset-bottom': '44px',
      '--safe-area-inset-left': '0px',
    };

    window.dispatchEvent(new Event('orientationchange'));

    await waitFor(() => {
      expect(result.current.top).toBe(34);
      expect(result.current.bottom).toBe(44);
    });
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useSafeArea());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('handles getComputedStyle errors gracefully', () => {
    const mockGetComputedStyle = jest.fn(() => {
      throw new Error('CSS not available');
    });

    window.getComputedStyle = mockGetComputedStyle as any;

    const { result } = renderHook(() => useSafeArea());

    // Should fallback to zeros
    expect(result.current).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });
});
