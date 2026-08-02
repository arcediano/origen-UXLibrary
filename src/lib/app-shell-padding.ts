/**
 * Alturas de las barras de navegación móvil por aplicación (en píxeles).
 * Se usan como base para calcular el padding/offset inferior en componentes
 * que necesitan ajustarse por safe-area-inset-bottom.
 */
export const NAV_HEIGHT_MOBILE_WEB = 80;
export const NAV_HEIGHT_MOBILE_DASHBOARD = 88;
export const NAV_HEIGHT_MOBILE_ADMIN = 88;

/**
 * Genera la expresión `calc()` de safe-area, sin prefijo de propiedad CSS.
 * Base para `appShellPaddingClass` y para usos con `bottom-[...]` (elementos
 * flotantes posicionados sobre el bottom nav), que necesitan el mismo cálculo
 * pero con una propiedad Tailwind distinta a `padding-bottom`.
 *
 * Uso:
 *   appShellSafeAreaOffset(NAV_HEIGHT_MOBILE_DASHBOARD, 40)
 *   // Resultado: "calc(128px+env(safe-area-inset-bottom,0px))"
 *
 * @param base - altura base de la nav (ej: NAV_HEIGHT_MOBILE_WEB = 80)
 * @param extra - offset adicional (default: 0)
 */
export function appShellSafeAreaOffset(base: number, extra: number = 0): string {
  return `calc(${base + extra}px+env(safe-area-inset-bottom,0px))`;
}

/**
 * Genera un className de Tailwind para padding inferior con safe-area.
 *
 * Funciona en Server Components sin 'use client' porque es una función pura
 * que devuelve un string de className (no un hook con estado).
 *
 * Uso:
 *   className={appShellPaddingClass(NAV_HEIGHT_MOBILE_WEB, 72)}
 *   // Resultado: "pb-[calc(152px+env(safe-area-inset-bottom,0px))]"
 *
 * @param base - altura base de la nav (ej: NAV_HEIGHT_MOBILE_WEB = 80)
 * @param extra - padding adicional (default: 0)
 * @returns className de Tailwind con safe-area-inset-bottom
 */
export function appShellPaddingClass(base: number, extra: number = 0): string {
  return `pb-[${appShellSafeAreaOffset(base, extra)}]`;
}

/**
 * Genera un className de Tailwind para offset `bottom` con safe-area — usado
 * en elementos `fixed`/`absolute` que flotan sobre el bottom nav (en vez de
 * padding en el contenedor de la página).
 *
 * Uso:
 *   className={appShellBottomOffsetClass(NAV_HEIGHT_MOBILE_DASHBOARD, 40)}
 *   // Resultado: "bottom-[calc(128px+env(safe-area-inset-bottom,0px))]"
 *
 * @param base - altura base de la nav (ej: NAV_HEIGHT_MOBILE_DASHBOARD = 88)
 * @param extra - offset adicional (default: 0)
 */
export function appShellBottomOffsetClass(base: number, extra: number = 0): string {
  return `bottom-[${appShellSafeAreaOffset(base, extra)}]`;
}
