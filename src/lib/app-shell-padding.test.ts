import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  appShellPaddingClass,
  appShellBottomOffsetClass,
  appShellSafeAreaOffset,
  NAV_HEIGHT_MOBILE_WEB,
  NAV_HEIGHT_MOBILE_DASHBOARD,
  NAV_HEIGHT_MOBILE_ADMIN,
} from './app-shell-padding';

describe('app-shell-padding', () => {
  describe('appShellSafeAreaOffset', () => {
    it('should generate correct calc expression for base only', () => {
      const result = appShellSafeAreaOffset(88);
      expect(result).toBe('calc(88px+env(safe-area-inset-bottom,0px))');
    });

    it('should generate correct calc expression for base + extra', () => {
      const result = appShellSafeAreaOffset(88, 40);
      expect(result).toBe('calc(128px+env(safe-area-inset-bottom,0px))');
    });

    it('should work with different base values', () => {
      expect(appShellSafeAreaOffset(80)).toBe('calc(80px+env(safe-area-inset-bottom,0px))');
      expect(appShellSafeAreaOffset(72, 0)).toBe('calc(72px+env(safe-area-inset-bottom,0px))');
      expect(appShellSafeAreaOffset(124, 0)).toBe('calc(124px+env(safe-area-inset-bottom,0px))');
    });
  });

  describe('appShellPaddingClass', () => {
    // Test all 8 mapped combinations parametrically
    const paddingCombinations: Array<[number, number, string]> = [
      [88, 0, 'pb-[calc(88px+env(safe-area-inset-bottom,0px))]'],
      [88, 25, 'pb-[calc(113px+env(safe-area-inset-bottom,0px))]'],
      [88, 64, 'pb-[calc(152px+env(safe-area-inset-bottom,0px))]'],
      [88, 36, 'pb-[calc(124px+env(safe-area-inset-bottom,0px))]'],
      [80, 0, 'pb-[calc(80px+env(safe-area-inset-bottom,0px))]'],
      [80, 16, 'pb-[calc(96px+env(safe-area-inset-bottom,0px))]'],
      [72, 0, 'pb-[calc(72px+env(safe-area-inset-bottom,0px))]'],
      [124, 0, 'pb-[calc(124px+env(safe-area-inset-bottom,0px))]'],
    ];

    it.each(paddingCombinations)(
      'should return mapped class for appShellPaddingClass(%i, %i)',
      (base, extra, expected) => {
        const result = appShellPaddingClass(base, extra);
        expect(result).toBe(expected);
      }
    );

    it('should default extra to 0', () => {
      const result = appShellPaddingClass(88);
      expect(result).toBe('pb-[calc(88px+env(safe-area-inset-bottom,0px))]');
    });
  });

  describe('appShellBottomOffsetClass', () => {
    // Test all 2 mapped combinations parametrically
    const bottomCombinations: Array<[number, number, string]> = [
      [88, 40, 'bottom-[calc(128px+env(safe-area-inset-bottom,0px))]'],
      [88, 0, 'bottom-[calc(88px+env(safe-area-inset-bottom,0px))]'],
    ];

    it.each(bottomCombinations)(
      'should return mapped class for appShellBottomOffsetClass(%i, %i)',
      (base, extra, expected) => {
        const result = appShellBottomOffsetClass(base, extra);
        expect(result).toBe(expected);
      }
    );

    it('should default extra to 0', () => {
      const result = appShellBottomOffsetClass(88);
      expect(result).toBe('bottom-[calc(88px+env(safe-area-inset-bottom,0px))]');
    });
  });

  describe('unmapped combination warning', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('should warn when appShellPaddingClass receives unmapped (base, extra)', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const result = appShellPaddingClass(999, 1);

      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[app-shell-padding] appShellPaddingClass(999, 1)')
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('no tiene una entrada literal en el mapeo estático')
      );
      // Fallback should still return interpolated value
      expect(result).toBe('pb-[calc(1000px+env(safe-area-inset-bottom,0px))]');

      process.env.NODE_ENV = originalEnv;
    });

    it('should warn when appShellBottomOffsetClass receives unmapped (base, extra)', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const result = appShellBottomOffsetClass(999, 1);

      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[app-shell-padding] appShellBottomOffsetClass(999, 1)')
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('no tiene una entrada literal en el mapeo estático')
      );
      // Fallback should still return interpolated value
      expect(result).toBe('bottom-[calc(1000px+env(safe-area-inset-bottom,0px))]');

      process.env.NODE_ENV = originalEnv;
    });

    it('should NOT warn when NODE_ENV is production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      appShellPaddingClass(999, 1);

      expect(warnSpy).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('named constants', () => {
    it('should export correct navigation heights', () => {
      expect(NAV_HEIGHT_MOBILE_WEB).toBe(80);
      expect(NAV_HEIGHT_MOBILE_DASHBOARD).toBe(88);
      expect(NAV_HEIGHT_MOBILE_ADMIN).toBe(88);
    });
  });
});
