/**
 * @file PageLoader.tsx
 * @description Loader de página completa. Usado durante redirecciones y carga inicial.
 * Sistema de estado — muestra un spinner centrado con mensaje optional.
 *
 * IMPORTANTE: este componente es transparente (sin fondo propio) y su altura
 * mínima se calcula igual en todos los breakpoints (`min-h-[calc(100dvh-144px)]`).
 * Nunca añadas aquí un `bg-*`/gradiente propio ni un `lg:min-h-screen`: en los
 * consumidores este loader se renderiza a menudo DENTRO de un layout que ya
 * tiene su propio fondo y su propio contenedor con padding (p. ej. el `<main>`
 * del dashboard, desplazado por un sidebar fijo con `lg:ml-72 lg:px-4`). Si el
 * loader pinta su propio fondo/alto de viewport, no coincide con el ancho ni el
 * color real del contenedor padre y aparece una costura/gap visible entre el
 * sidebar y el loader. Deja que el fondo de la página (token `--background`)
 * se vea siempre a través — así es consistente pintándose una sola vez.
 */

'use client';

import { cn } from '../../../lib/utils';
import { Spinner } from '../../atoms/Spinner';

export interface PageLoaderProps {
  /** Mensaje principal */
  message?: string;
  /** Clase CSS adicional */
  className?: string;
}

export function PageLoader({
  message = 'Cargando...',
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center p-4',
        'min-h-[calc(100dvh-144px)]',
        className,
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <Spinner size="xl" variant="primary" />
        <h3 className="text-lg sm:text-xl font-semibold text-[hsl(var(--bosque))]">
          {message}
        </h3>
        <p className="text-xs text-[hsl(var(--text-subtle))]">Esto puede tomar unos segundos</p>
      </div>
    </div>
  );
}
