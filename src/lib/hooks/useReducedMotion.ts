/**
 * @hook useReducedMotion
 * @description Detects user's motion preference (prefers-reduced-motion).
 *              Returns true if user has enabled reduced motion on their device.
 *              Respects changes in system settings and browser DevTools.
 *
 * @example
 * ```tsx
 * const prefersReduced = useReducedMotion();
 * return (
 *   <div className={prefersReduced ? 'duration-0' : 'duration-300'}>
 *     Content
 *   </div>
 * );
 * ```
 *
 * @returns boolean - true if reduced motion is preferred, false otherwise
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Check if user prefers reduced motion
 * Returns false during SSR (safe default)
 */
function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR safe default
  }

  try {
    // Query the media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  } catch {
    // Fallback: assume no reduced motion if error
    return false;
  }
}

export function useReducedMotion(): boolean {
  // Server: default to false
  // Client: will update on mount
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Set initial value on mount (client-side only)
    setPrefersReduced(getReducedMotionPreference());

    // Listen for changes (system settings, DevTools accessibility pane)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    // Modern browsers: use addEventListener
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReduced;
}
