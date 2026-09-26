/**
 * @file Button.tsx
 * @description Componente Button del Origen Design System.
 * Variantes: primary | secondary | outline | ghost | destructive | hero | heroOutline
 *
 * Patrón recomendado para icono + texto: usar las props `leftIcon`/`rightIcon`
 * explícitas (no pasar el icono como `children` directo). El componente
 * detecta y corrige automáticamente el caso de icono-como-children (ver
 * comentario junto al render de `children` más abajo) para no romper el
 * alineamiento en código ya existente, pero esa detección no es API pública
 * ni el patrón preferido — úsese `leftIcon`/`rightIcon` en código nuevo.
 *
 * Accesibilidad del ring de foco (hallazgo de auditoría, ver historial de
 * `guia-diseno-ux.md`): el ring `focus-visible` NO es un único color fijo
 * para todas las variantes. `ring-origen-pino` (verde oscuro) es adecuado
 * sobre las variantes pensadas para fondo claro (`primary`/`secondary`/
 * `outline`/`ghost`/`destructive`), pero da un contraste insuficiente sobre
 * las variantes pensadas para fondo oscuro/imagen (`hero`/`heroOutline`),
 * que usan `ring-white` en su lugar.
 *
 * @example
 * <Button variant="primary" size="md" loading>Guardar</Button>
 * <Button variant="outline" leftIcon={<PlusIcon />}>Añadir</Button>
 * <Button asChild variant="outline"><a href="/path">Link</a></Button>
 * <Button variant="heroOutline" asChild><Link href="/productores">Conoce los productores</Link></Button>
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";

// ─── Variantes CVA ────────────────────────────────────────────────────────────

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:shadow-none",
    "active:scale-[0.98]",
    "w-full sm:w-auto shadow-subtle"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "border border-origen-pino/40",
          "bg-origen-bosque text-white",
          "hover:brightness-[1.03] hover:shadow-origen",
          "focus-visible:ring-origen-pino",
          "disabled:border-origen-bosque/60 disabled:bg-origen-bosque/80 disabled:text-white/85"
        ),
        secondary: cn(
          "border border-origen-pino/35",
          "bg-origen-pastel text-origen-bosque",
          "hover:bg-origen-pradera/35 hover:text-origen-oscuro",
          "focus-visible:ring-origen-pino",
          "disabled:border-origen-pino/30 disabled:bg-origen-pastel/90 disabled:text-origen-bosque/70"
        ),
        outline: cn(
          "border border-origen-pino/30 bg-surface-alt text-origen-bosque",
          "hover:border-origen-pradera/55 hover:bg-origen-pastel/70",
          "focus-visible:ring-origen-pino",
          "disabled:border-origen-pino/15 disabled:bg-white disabled:text-origen-bosque/70"
        ),
        ghost: cn(
          "border border-origen-pino/15 bg-transparent text-origen-bosque shadow-none",
          "hover:border-origen-pradera/40 hover:bg-origen-pastel/60 hover:text-origen-pino",
          "focus-visible:bg-origen-pastel/40 focus-visible:ring-origen-pino",
          "disabled:border-origen-pino/10 disabled:text-origen-bosque/70"
        ),
        destructive: cn(
          "border border-feedback-danger-border",
          "bg-feedback-danger-subtle text-feedback-danger-text",
          "hover:bg-feedback-danger/15 hover:border-feedback-danger-text/40",
          "focus-visible:ring-origen-pino",
          "disabled:border-feedback-danger-border/60 disabled:bg-feedback-danger-subtle/70 disabled:text-feedback-danger-text/60"
        ),
        hero: cn(
          "bg-white text-origen-bosque border border-white/20",
          "hover:bg-white/92 hover:scale-[1.03]",
          "shadow-lg shadow-black/15",
          "focus-visible:ring-white",
          "active:scale-[0.98] transition-all duration-200",
          "disabled:bg-white/60 disabled:text-origen-bosque/50 disabled:border-white/10"
        ),
        /** CTA secundario para fondos oscuros/imagen (hero, banners de marca) —
         * transparente con borde y texto blancos. Complementa a `hero` (que es
         * el CTA primario blanco sólido sobre esos mismos fondos). */
        heroOutline: cn(
          "border border-white/50 bg-white/10 text-white backdrop-blur-xs",
          "hover:bg-white/18",
          "focus-visible:ring-white",
          "disabled:border-white/25 disabled:bg-white/5 disabled:text-white/50"
        ),
      },
      size: {
        sm:      "h-10 px-4 gap-2 rounded-lg text-small",
        md:      "h-11 px-5 gap-2.5 rounded-xl text-small",
        lg:      "h-12 px-6 gap-3 rounded-xl text-body",
        // sm:w-* repite el ancho fijo del breakpoint base: la clase base del
        // componente es "w-full sm:w-auto" (pensada para botones con texto,
        // ancho completo en móvil y automático en escritorio), y sin el
        // sm:w-* explícito aquí, "sm:w-auto" sobrevive al merge de
        // tailwind-merge (mismo grupo pero modificador distinto al w-10/w-8
        // sin prefijo) y gana la cascada a partir de "sm" — cualquier botón
        // icon-only se volvía "auto" (ancho de su contenido) en escritorio
        // en vez de mantener el cuadrado fijo. Verificado con tailwind-merge
        // real: sin esto, "sm:w-auto" queda en el className final.
        icon:    "h-10 w-10 sm:w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 sm:w-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Muestra un spinner y deshabilita el botón */
  loading?: boolean;
  /** Texto mostrado durante el estado de carga */
  loadingText?: string;
  /** Icono posicionado a la izquierda del texto */
  leftIcon?: React.ReactNode;
  /** Icono posicionado a la derecha del texto */
  rightIcon?: React.ReactNode;
  /** Fuerza ancho completo en todos los breakpoints (sobreescribe el sm:w-auto de la base) */
  fullWidth?: boolean;
  /**
   * Renderiza los estilos del Button en el elemento hijo (Slot pattern).
   * Cuando es true, ignora loading, leftIcon y rightIcon — el hijo controla su contenido.
   * Útil para envolver un <Link> de Next.js: <Button asChild><Link href="...">Texto</Link></Button>
   */
  asChild?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Separa los `children` de un Button en nodos "icono" (elementos React, p. ej.
 * un SVG de lucide-react) y nodos de "texto" (strings/numbers/fragmentos),
 * envolviendo cada icono detectado en su propio `<span className="shrink-0"
 * aria-hidden>` — igual que ya reciben `leftIcon`/`rightIcon` — para que quede
 * como hermano flex del texto en vez de compartir un único `<span>` con él.
 *
 * Esto corrige el desalineamiento vertical que se produce cuando un consumidor
 * pasa un icono como children directo (`<Button><Plus />Texto</Button>`) en
 * lugar de usar `leftIcon`/`rightIcon`: sin esta separación, icono y texto
 * quedaban dentro del mismo `<span>` (un único hijo flex, no gobernado por el
 * `items-center` del contenedor raíz), y el SVG con `vertical-align: baseline`
 * por defecto se desalineaba respecto al texto.
 *
 * No es una API pública: el patrón recomendado sigue siendo `leftIcon`/`rightIcon`.
 *
 * Solo actúa cuando hay más de un nodo de nivel superior (el caso icono+texto
 * como hermanos, p. ej. `<Plus/>Texto`). Con un único hijo se devuelve tal cual
 * dentro de un `<span>` simple, sin marcarlo `aria-hidden`: un hijo solitario
 * suele ser un botón icon-only (no sufre el desalineamiento, no hay texto
 * adyacente) o un elemento compuesto que ya gestiona su propio layout e
 * incluye texto accesible (p. ej. `<span className="inline-flex ...">` con
 * icono + texto dentro) — marcarlo `aria-hidden` ocultaría ese texto a
 * lectores de pantalla, una regresión de accesibilidad peor que el bug visual
 * que se corrige aquí.
 */
function renderChildrenWithIconSpans(children: React.ReactNode): React.ReactNode {
  const childArray = React.Children.toArray(children);

  if (childArray.length <= 1) {
    return <span>{children}</span>;
  }

  const nodes: React.ReactNode[] = [];
  let currentTextGroup: React.ReactNode[] = [];
  let textGroupKey = 0;

  childArray.forEach((child, index) => {
    if (React.isValidElement(child)) {
      if (currentTextGroup.length > 0) {
        nodes.push(<span key={`text-${textGroupKey++}`}>{currentTextGroup}</span>);
        currentTextGroup = [];
      }
      nodes.push(
        <span key={child.key ?? `icon-${index}`} className="shrink-0" aria-hidden>
          {child}
        </span>
      );
    } else {
      currentTextGroup.push(child);
    }
  });

  if (currentTextGroup.length > 0) {
    nodes.push(<span key={`text-${textGroupKey++}`}>{currentTextGroup}</span>);
  }

  return nodes;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText = "Cargando...",
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      asChild = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant, size }), fullWidth && 'w-full sm:w-full', className)}
        disabled={!asChild ? (disabled || loading) : undefined}
        aria-busy={!asChild ? loading : undefined}
        aria-disabled={!asChild ? (disabled || loading) : undefined}
        type={!asChild ? type : undefined}
      >
        {asChild ? (
          children
        ) : loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon  && <span className="shrink-0" aria-hidden>{leftIcon}</span>}
            {renderChildrenWithIconSpans(children)}
            {rightIcon && <span className="shrink-0" aria-hidden>{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
