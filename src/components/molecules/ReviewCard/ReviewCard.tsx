"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../atoms/Card";
import { Badge } from "../../atoms/Badge";
import { Avatar, AvatarFallback } from "../../atoms/Avatar";
import { StarRating } from "../../atoms/StarRating";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ReviewCardReview {
  id: string;
  rating: number;
  title?: string | null;
  content: string;
  authorName: string;
  /** Clase Tailwind para el color del avatar, p.ej. `"bg-origen-pradera text-white"`. */
  authorAvatarColor?: string;
  verifiedPurchase?: boolean;
  createdAt: string;
  product?: { name: string; slug: string } | null;
  response?: {
    content: string;
    authorName: string;
    createdAt: string;
  } | null;
}

export interface ReviewCardProps {
  review: ReviewCardReview;
  /** `default` con sombra (marketplace); `compact` sin sombra (dashboards). */
  variant?: "default" | "compact";
  /** Número máximo de líneas del texto de la reseña. */
  maxLines?: 3 | 4 | 5;
  /** Componente de enlace. Por defecto `"a"`. Pasa `Link` de `next/link` en Next.js. */
  linkComponent?: React.ElementType;
  /** Función para formatear la fecha. Si se omite, muestra la fecha ISO directa. */
  formatDate?: (isoDate: string) => string;
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ReviewCard({
  review,
  variant = "default",
  maxLines = 4,
  linkComponent,
  formatDate,
  className,
}: ReviewCardProps) {
  const LinkEl = linkComponent ?? "a";
  const dateLabel = formatDate ? formatDate(review.createdAt) : review.createdAt.split("T")[0];
  const lineClampClass = `line-clamp-${maxLines}`;

  return (
    <Card
      variant={variant === "compact" ? "default" : "elevated"}
      padding="md"
      className={cn("flex flex-col gap-3 h-full", className)}
    >
      {/* Header: avatar + nombre + verificado */}
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback className={review.authorAvatarColor ?? "bg-origen-pradera text-white"}>
            {review.authorName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary leading-tight truncate">
            {review.authorName}
          </p>
          {review.verifiedPurchase && (
            <Badge variant="success" size="xs">Compra verificada</Badge>
          )}
        </div>
      </div>

      {/* Estrellas */}
      <StarRating value={review.rating} readOnly size="xs" />

      {/* Título de la reseña */}
      {review.title && (
        <p className="text-sm font-semibold text-text-primary">{review.title}</p>
      )}

      {/* Contenido */}
      <p className={cn("font-serif text-sm italic text-text-primary flex-1", lineClampClass)}>
        &ldquo;{review.content}&rdquo;
      </p>

      {/* Respuesta del productor */}
      {review.response && (
        <div className="rounded-xl bg-origen-pastel/60 px-3 py-2 space-y-1">
          <p className="text-xs font-semibold text-origen-bosque">
            Respuesta de {review.response.authorName}
          </p>
          <p className="text-xs text-text-secondary line-clamp-3">
            {review.response.content}
          </p>
        </div>
      )}

      {/* Footer: producto + fecha */}
      <div className="flex flex-col gap-0.5 pt-1 border-t border-border-subtle">
        {review.product && (
          <LinkEl
            href={`/productos/${review.product.slug}`}
            className="text-xs text-origen-hoja hover:underline truncate"
          >
            Compró: {review.product.name}
          </LinkEl>
        )}
        <p className="text-xs text-text-subtle">{dateLabel}</p>
      </div>
    </Card>
  );
}

ReviewCard.displayName = "ReviewCard";
