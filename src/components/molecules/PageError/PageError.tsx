/**
 * @file PageError.tsx
 * @description Componente simple para mostrar errores en páginas
 * Sistema de estado — muestra un alert de error con opción de reintento.
 *
 * IMPORTANTE: sin fondo propio y misma altura mínima en todos los
 * breakpoints (`min-h-[calc(100dvh-144px)]`). Ver nota equivalente en
 * `PageLoader.tsx` — este componente se renderiza a menudo dentro de un
 * `<main>` ya padeado/desplazado por un sidebar fijo, y un fondo/alto de
 * viewport propio genera una costura visible con el layout padre.
 */

'use client';

import { cn } from '../../../lib/utils';
import { Alert, AlertTitle, AlertDescription } from '../../atoms/Alert';
import { Button } from '../../atoms/Button';
import { RefreshCw } from 'lucide-react';

export interface PageErrorProps {
  /** Título del error */
  title?: string;
  /** Mensaje descriptivo */
  message: string;
  /** Función de reintento */
  onRetry?: () => void;
  /** Texto del botón de reintento */
  retryText?: string;
  /** Clase CSS adicional */
  className?: string;
}

export function PageError({
  title = 'Error',
  message,
  onRetry,
  retryText = 'Reintentar',
  className
}: PageErrorProps) {
  return (
    <div className={cn(
      'flex items-center justify-center p-4',
      'min-h-[calc(100dvh-144px)]',
      className
    )}>
      <div className="max-w-md w-full">
        <Alert
          variant="error"
          className="shadow-lg"
        >
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
          {onRetry && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={onRetry}
                variant="secondary"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {retryText}
              </Button>
            </div>
          )}
        </Alert>
      </div>
    </div>
  );
}
