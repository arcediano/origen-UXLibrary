/**
 * @test useReducedMotion hook
 * @description Tests for detecting and updating prefers-reduced-motion preference
 */

import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns false by default (SSR safe)', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  test('respects system preference for reduced motion', () => {
    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  test('respects system preference when motion is allowed', () => {
    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  test('updates when media query preference changes', async () => {
    let preferReduced = false;
    let changeListener: null | ((event: MediaQueryListEvent) => void) = null;

    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: preferReduced,
          media: query,
          addEventListener: vi.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              changeListener = listener;
            }
          }),
          removeEventListener: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simulate user enabling reduced motion via system settings
    preferReduced = true;
    changeListener?.({ matches: true } as MediaQueryListEvent);

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  test('cleans up event listener on unmount', () => {
    const removeEventListenerMock = vi.fn();

    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: removeEventListenerMock,
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { unmount } = renderHook(() => useReducedMotion());

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });

  test('handles matchMedia errors gracefully', () => {
    const mockMatchMedia = vi.fn().mockImplementation(() => {
      throw new Error('matchMedia not supported');
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    // Should fallback to false safely
    expect(result.current).toBe(false);
  });

  test('works with DevTools accessibility pane changes', async () => {
    let preferReduced = false;
    let changeListener: null | ((event: MediaQueryListEvent) => void) = null;

    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: preferReduced,
          media: query,
          addEventListener: vi.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              changeListener = listener;
            }
          }),
          removeEventListener: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Toggle via DevTools
    preferReduced = true;
    changeListener?.({ matches: true } as MediaQueryListEvent);

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Toggle back
    preferReduced = false;
    changeListener?.({ matches: false } as MediaQueryListEvent);

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
