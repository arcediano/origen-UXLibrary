/**
 * @file AccordionCard.tsx
 * @description Section Card colapsable con cabecera de icono + gradiente,
 * chevron rotativo y contenido plegable. Patron canonico de las cards
 * colapsables de /onboarding (ver manual de diseno, seccion 9).
 */

"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Card, CardIconHeader } from "../Card";

export type AccordionCardState = "default" | "complete" | "incomplete";

export interface AccordionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icono mostrado en el recuadro con gradiente de marca */
  icon: React.ReactNode;
  /** Titulo de la seccion */
  title: string;
  /** Subtitulo o descripcion corta opcional */
  description?: string;
  /** Badge o pill opcional junto al titulo (ej. "Recomendado", "Requiere verificacion") */
  badge?: React.ReactNode;
  /** Si el contenido aparece expandido por defecto (modo no controlado) */
  defaultExpanded?: boolean;
  /**
   * Estado que condiciona el color del borde de la card:
   * - `default`: borde estandar (hover en color de marca)
   * - `complete`: borde verde (item completo, ver Paso 2 de Productos)
   * - `incomplete`: borde neutro/ambar (item incompleto)
   */
  state?: AccordionCardState;
  /** Estado controlado: si se pasa, el componente pasa a modo controlado */
  expanded?: boolean;
  /** Callback cuando el usuario clickea el header (solo en modo controlado) */
  onToggle?: () => void;
  children: React.ReactNode;
}

const stateBorderClasses: Record<AccordionCardState, string> = {
  default: "",
  complete: "border-feedback-success/40 bg-feedback-success-subtle/30",
  incomplete: "border-border-subtle",
};

const AccordionCard = React.forwardRef<HTMLDivElement, AccordionCardProps>(
  (
    {
      className,
      icon,
      title,
      description,
      badge,
      defaultExpanded = false,
      state = "default",
      expanded: controlledExpanded,
      onToggle,
      children,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);

    // Si expanded está definido (modo controlado), usarlo; si no, usar estado interno
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

    const handleToggle = () => {
      if (controlledExpanded !== undefined) {
        // Modo controlado: llamar al callback
        onToggle?.();
      } else {
        // Modo no controlado: actualizar estado interno
        setInternalExpanded((value) => !value);
      }
    };

    const contentId = React.useId();

    return (
      <Card
        ref={ref}
        variant="section"
        padding="none"
        className={cn("overflow-hidden", stateBorderClasses[state], className)}
        {...props}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="flex w-full items-center justify-between p-4 text-left sm:p-5"
        >
          <CardIconHeader icon={icon} title={title} description={description} size="sm" className="mb-0 flex-1">
            {badge && <span className="ml-2 inline-flex items-center">{badge}</span>}
          </CardIconHeader>
          <ChevronDown
            className={cn(
              "ml-3 h-4 w-4 shrink-0 text-text-subtle transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {isExpanded && (
          <div id={contentId} className="border-t border-border-subtle px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
            {children}
          </div>
        )}
      </Card>
    );
  }
);

AccordionCard.displayName = "AccordionCard";

export { AccordionCard };
