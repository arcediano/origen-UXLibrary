"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../atoms/Card";
import { Badge } from "../../atoms/Badge";
import { StarRating } from "../../atoms/StarRating";
import { Avatar } from "../../atoms/Avatar";
import { AvatarFallback } from "../../atoms/Avatar";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ProducerCardProducer {
  producerCode: string;
  story?: { businessName?: string | null; tagline?: string | null } | null;
  location?: { city?: string | null; province?: string | null } | null;
  visual?: { bannerUrl?: string | null; logoUrl?: string | null } | null;
  fiscal?: { primaryCategory?: string | null } | null;
  certifications?: Array<string | { name?: string }> | null;
}

export interface ProducerCardProps {
  producer: ProducerCardProducer;
  href: string;
  /** `default`: imagen + nombre + ciudad. `featured`: añade tagline (rating se muestra en ambas variantes si hay datos). */
  variant?: "default" | "featured";
  /** Rating medio, solo visible con `reviewCount > 0`. */
  averageRating?: number;
  /** Número de reseñas — junto con `averageRating`, determina si se muestra rating en footer. */
  reviewCount?: number;
  /** URL del logo superpuesto en el footer. */
  logoUrl?: string | null;
  /** Slot inyectado para el botón de favoritos (construido por el consumidor con su contexto). */
  favoriteButton?: React.ReactNode;
  /** Si el productor ha sido verificado. */
  isVerified?: boolean;
  /** Si el productor ofrece packaging sostenible. */
  sustainablePackaging?: boolean;
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
  reviewCount,
  logoUrl,
  favoriteButton,
  isVerified = false,
  sustainablePackaging = false,
  linkComponent,
  className,
}: ProducerCardProps) {
  const LinkEl = linkComponent ?? "a";
  const businessName = producer.story?.businessName ?? "Productor Origen";
  const hasRating = averageRating != null && averageRating > 0 && reviewCount != null && reviewCount > 0;
  const initial = businessName.trim()[0]?.toUpperCase() ?? "?";

  return (
    <LinkEl
      href={href}
      className={cn("group block focus-visible:outline-none", className)}
      aria-label={`Ver perfil de ${businessName}`}
    >
      <Card variant="media" padding="none" className="h-full flex flex-col">
        {/* Imagen banner — 16:9 con logo superpuesto */}
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

          {/* Botón de favoritos — inyectado desde el consumidor */}
          {favoriteButton && (
            <div
              className="absolute left-2 top-2 z-10"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") e.stopPropagation();
              }}
            >
              {favoriteButton}
            </div>
          )}

          {/* Avatar superpuesto — bottom-left, sobresale sobre el contenido */}
          {logoUrl && (
            <div className="absolute -bottom-5 left-4 z-10">
              <Avatar size="md" shape="rounded" className="ring-2 ring-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-full w-full object-contain"
                />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Contenido de texto — pt-8 compensa el Avatar superpuesto */}
        <div className="flex flex-1 flex-col gap-1 p-4 pt-8">
          {/* Nombre del negocio */}
          <p className="font-serif font-semibold text-sm text-origen-oscuro line-clamp-2 group-hover:text-origen-bosque transition-colors">
            {businessName}
          </p>

          {/* Ubicación */}
          {producer.location?.city && (
            <p className="text-xs text-text-subtle">{producer.location.city}</p>
          )}

          {/* Tagline — oculto en móvil (2 columnas) */}
          {variant === "featured" && producer.story?.tagline && (
            <p className="hidden sm:block text-xs text-text-secondary line-clamp-2 mt-0.5">
              {producer.story.tagline}
            </p>
          )}

          {/* Categoría principal */}
          {producer.fiscal?.primaryCategory && (
            <p className="text-xs text-text-muted-foreground mt-1">
              {producer.fiscal.primaryCategory}
            </p>
          )}

          {/* Spacer — empuja el footer al fondo */}
          <div className="flex-1" />

          {/* Footer — Rating, badges y CTA */}
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
            {/* Rating y badges de confianza */}
            <div className="flex items-center gap-1">
              {hasRating && (
                <StarRating
                  value={averageRating!}
                  readOnly
                  size="xs"
                  showValue
                  totalReviews={reviewCount}
                />
              )}
              {isVerified && (
                <Badge variant="success" size="xs">
                  Verificado
                </Badge>
              )}
              {sustainablePackaging && (
                <Badge variant="leaf" size="xs">
                  Eco
                </Badge>
              )}
            </div>

            {/* CTA decorativo — solo lectura, no interactivo */}
            <span
              className="shrink-0 whitespace-nowrap text-[11px] font-semibold text-origen-bosque"
              aria-hidden="true"
            >
              Ver →
            </span>
          </div>
        </div>
      </Card>
    </LinkEl>
  );
}

ProducerCard.displayName = "ProducerCard";
