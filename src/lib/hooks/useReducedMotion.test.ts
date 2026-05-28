/**
 * @test useReducedMotion hook
 * @description Tests for detecting and updating prefers-reduced-motion preference
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

describe('useReducedMotion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns false by default (SSR safe)', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  test('respects system preference for reduced motion', () => {
    const mockMatchMedia = jest.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: true,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  test('respects system preference when motion is allowed', () => {
    const mockMatchMedia = jest.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: false,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  test('updates when media query preference changes', async () => {
    let preferReduced = false;
    let changeListener: ((event: MediaQueryListEvent) => void) | null = null;

    const mockMatchMedia = jest.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: preferReduced,
          media: query,
          addEventListener: jest.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              changeListener = listener;
            }
          }),
          removeEventListener: jest.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simulate user enabling reduced motion via system settings
    preferReduced = true;
    if (changeListener) {
      changeListener({ matches: true } as MediaQueryListEvent);
    }

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  test('cleans up event listener on unmount', () => {
    const removeEventListenerMock = jest.fn();

    const mockMatchMedia = jest.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: false,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: removeEventListenerMock,
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { unmount } = renderHook(() => useReducedMotion());

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });

  test('handles matchMedia errors gracefully', () => {
    const mockMatchMedia = jest.fn().mockImplementation(() => {
      throw new Error('matchMedia not supported');
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());

    // Should fallback to false safely
    expect(result.current).toBe(false);
  });

  test('works with DevTools accessibility pane changes', async () => {
    let preferReduced = false;
    let changeListener: ((event: MediaQueryListEvent) => void) | null = null;

    const mockMatchMedia = jest.fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: preferReduced,
          media: query,
          addEventListener: jest.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              changeListener = listener;
            }
          }),
          removeEventListener: jest.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    window.matchMedia = mockMatchMedia as any;

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Toggle via DevTools
    preferReduced = true;
    if (changeListener) {
      changeListener({ matches: true } as MediaQueryListEvent);
    }

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Toggle back
    preferReduced = false;
    if (changeListener) {
      changeListener({ matches: false } as MediaQueryListEvent);
    }

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
