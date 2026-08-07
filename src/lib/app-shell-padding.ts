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
 * Mapeo estático de clases Tailwind pre-generadas para
 * appShellPaddingClass()/appShellBottomOffsetClass().
 *
 * POR QUÉ EXISTE: Tailwind (JIT) solo genera CSS para clases que aparecen
 * como cadenas literales completas en el texto de los archivos que
 * escanea (incluido el bundle compilado de esta librería, que los 3
 * consumidores incluyen en su `content` vía
 * "./node_modules/@arcediano/ux-library/dist/**\/*.{js,mjs}"). Antes de
 * este mapeo, appShellPaddingClass()/appShellBottomOffsetClass()
 * construían el nombre de clase con interpolación de template string
 * (`pb-[${...}]`), que el escáner nunca detecta — la clase quedaba fuera
 * del CSS final aunque el HTML renderizado la referenciara. Ver
 * .claude/requirements/bug-tailwind-jit-clases-dinamicas.md.
 *
 * CÓMO MANTENERLO: cada clave es `${base}:${extra}`. Si añades un nuevo
 * sitio de uso con una combinación (base, extra) que no está aquí,
 * AÑÁDELA a este mapa (y a su test en app-shell-padding.test.ts) antes
 * de publicar — de lo contrario appShellPaddingClass()/
 * appShellBottomOffsetClass() seguirán funcionando en runtime (ver
 * fallback más abajo) pero sin generar CSS real, reproduciendo este
 * mismo bug para esa combinación nueva. En desarrollo verás un
 * console.warn si esto ocurre.
 */
const PADDING_CLASS_BY_KEY: Record<string, string> = {
  '88:0': 'pb-[calc(88px+env(safe-area-inset-bottom,0px))]',
  '88:25': 'pb-[calc(113px+env(safe-area-inset-bottom,0px))]',
  '88:64': 'pb-[calc(152px+env(safe-area-inset-bottom,0px))]',
  '88:36': 'pb-[calc(124px+env(safe-area-inset-bottom,0px))]',
  '80:0': 'pb-[calc(80px+env(safe-area-inset-bottom,0px))]',
  '80:16': 'pb-[calc(96px+env(safe-area-inset-bottom,0px))]',
  '72:0': 'pb-[calc(72px+env(safe-area-inset-bottom,0px))]',
  '124:0': 'pb-[calc(124px+env(safe-area-inset-bottom,0px))]',
};

const BOTTOM_OFFSET_CLASS_BY_KEY: Record<string, string> = {
  '88:40': 'bottom-[calc(128px+env(safe-area-inset-bottom,0px))]',
  '88:0': 'bottom-[calc(88px+env(safe-area-inset-bottom,0px))]',
};

/**
 * Avisa en desarrollo si una combinación (base, extra) no está mapeada.
 * Ayuda a detectar combinaciones nuevas no cubiertas por el mapeo estático
 * antes de publicar.
 */
function warnIfMissingFromMap(fnName: string, base: number, extra: number, key: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `[app-shell-padding] ${fnName}(${base}, ${extra}) no tiene una entrada ` +
      `literal en el mapeo estático (clave "${key}") - Tailwind JIT no generará ` +
      `CSS para esta clase en los consumidores. Añade la clave a ` +
      `PADDING_CLASS_BY_KEY/BOTTOM_OFFSET_CLASS_BY_KEY en app-shell-padding.ts.`
    );
  }
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
  const key = `${base}:${extra}`;
  const mapped = PADDING_CLASS_BY_KEY[key];
  if (mapped) return mapped;
  warnIfMissingFromMap('appShellPaddingClass', base, extra, key);
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
  const key = `${base}:${extra}`;
  const mapped = BOTTOM_OFFSET_CLASS_BY_KEY[key];
  if (mapped) return mapped;
  warnIfMissingFromMap('appShellBottomOffsetClass', base, extra, key);
  return `bottom-[${appShellSafeAreaOffset(base, extra)}]`;
}
