/**
 * @file PageLoader.tsx
 * @description Loader de página completa. Usado durante redirecciones y carga inicial.
 * Sistema de estado — muestra un spinner centrado con mensaje optional.
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
        'min-h-[calc(100dvh-144px)] lg:min-h-screen',
        'lg:bg-gradient-to-b lg:from-white lg:to-[hsl(var(--crema))]',
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
