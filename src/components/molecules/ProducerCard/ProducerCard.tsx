"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../atoms/Card";
import { Badge } from "../../atoms/Badge";
import { StarRating } from "../../atoms/StarRating";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ProducerCardProducer {
  producerCode: string;
  story?: { businessName?: string | null; tagline?: string | null } | null;
  location?: { city?: string | null; province?: string | null } | null;
  visual?: { bannerUrl?: string | null; logoUrl?: string | null } | null;
  fiscal?: { primaryCategory?: string | null } | null;
}

export interface ProducerCardProps {
  producer: ProducerCardProducer;
  href: string;
  /** `default`: imagen + nombre + ciudad. `featured`: añade tagline y rating. */
  variant?: "default" | "featured";
  /** Rating medio, solo visible en `variant="featured"`. */
  averageRating?: number;
  /** Componente de enlace. Por defecto `"a"`. Pasa `Link` de `next/link` en Next.js. */
  linkComponent?: React.ElementType;
  className?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ProducerCard({
  producer,
  href,
  variant = "default",
  averageRating,
  linkComponent,
  className,
}: ProducerCardProps) {
  const LinkEl = linkComponent ?? "a";
  const businessName = producer.story?.businessName ?? "Productor Origen";

  return (
    <LinkEl
      href={href}
      className={cn("group block", className)}
      aria-label={`Ver perfil de ${businessName}`}
    >
      <Card variant="media" padding="none" className="h-full">
        {/* Imagen banner */}
        <div className="relative aspect-video overflow-hidden bg-origen-pastel">
          {producer.visual?.bannerUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={producer.visual.bannerUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-origen-pradera/40 to-origen-hoja/60" />
          )}
        </div>

        {/* Contenido de texto */}
        <div className="p-3 flex flex-col gap-1">
          <p className="font-serif font-semibold text-sm text-origen-oscuro line-clamp-1">
            {businessName}
          </p>

          {producer.location?.city && (
            <p className="text-xs text-text-subtle">{producer.location.city}</p>
          )}

          {variant === "featured" && producer.story?.tagline && (
            <p className="text-xs text-text-secondary line-clamp-2 mt-0.5">
              {producer.story.tagline}
            </p>
          )}

          <div className="flex items-center justify-between mt-1 flex-wrap gap-1">
            {producer.fiscal?.primaryCategory && (
              <Badge variant="leaf" size="xs">
                {producer.fiscal.primaryCategory}
              </Badge>
            )}
            {variant === "featured" && averageRating != null && (
              <StarRating value={averageRating} readOnly size="xs" />
            )}
          </div>
        </div>
      </Card>
    </LinkEl>
  );
}

ProducerCard.displayName = "ProducerCard";
