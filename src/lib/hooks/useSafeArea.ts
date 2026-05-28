/**
 * @hook useSafeArea
 * @description Returns safe area insets for notched devices (iOS, Android).
 *              Reads from CSS env() variables or window object.
 *              Handles orientation changes and SSR gracefully.
 *
 * @example
 * ```tsx
 * const insets = useSafeArea();
 * return <div style={{ paddingTop: insets.top }}>content</div>;
 * ```
 *
 * @returns SafeAreaInsets object with top, right, bottom, left values in pixels
 */

'use client';

import { useEffect, useState } from 'react';

export interface SafeAreaInsets {
  /** Safe area from top (notch, status bar) */
  top: number;
  /** Safe area from right (Dynamic Island, etc) */
  right: number;
  /** Safe area from bottom (home indicator) */
  bottom: number;
  /** Safe area from left (notch, etc) */
  left: number;
}

/**
 * Get safe area insets from CSS env() variables
 * Falls back to 0 for non-notched devices
 */
function getSafeAreaInsets(): SafeAreaInsets {
  // SSR: return zeros during server rendering
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  try {
    // Read from CSS custom properties set in globals.css
    const styles = window.getComputedStyle(document.documentElement);

    const parseInset = (varName: string): number => {
      const value = styles.getPropertyValue(varName).trim();
      if (!value) return 0;
      // Remove 'px' suffix and parse
      const num = parseFloat(value.replace('px', ''));
      return isNaN(num) ? 0 : num;
    };

    return {
      top: parseInset('--safe-area-inset-top'),
      right: parseInset('--safe-area-inset-right'),
      bottom: parseInset('--safe-area-inset-bottom'),
      left: parseInset('--safe-area-inset-left'),
    };
  } catch {
    // Fallback: return zeros if any error
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
}

export function useSafeArea(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    // Set initial insets on mount
    setInsets(getSafeAreaInsets());

    // Update on orientation change
    const handleOrientationChange = () => {
      setInsets(getSafeAreaInsets());
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return insets;
}
