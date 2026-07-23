/**
 * @file ProducerInfoSidebar.tsx
 * @description Sidebar de identidad del productor para la pagina de perfil publico.
 * Muestra foto/banner, logo, nombre, ubicacion, rating, tagline,
 * badges de certificacion y CTA para expandir el perfil editorial.
 *
 * Layout responsive:
 * - Movil (<md): bloque full-width, sin sticky. Foto aspect-[16/7] max-h-[200px].
 * - Tablet (md-lg): columna 280px, sin sticky. Foto aspect-[4/3].
 * - Desktop (>=lg): columna 320px, sticky top-24. Foto aspect-[4/3].
 *
 * Tokens usados: origen-bosque, origen-hoja, origen-pino, origen-pradera,
 * origen-pastel, origen-nube, text-text-primary, text-text-subtle,
 * border-border-subtle, surface-alt, shadow-subtle, font-serif.
 *
 * Accesibilidad:
 * - Landmark: <aside aria-label="Informacion del productor">
 * - Imagen fallback: div role="img" aria-label="Foto de {nombre}"
 * - Verificado: aria-label="Productor verificado por Origen"
 * - Boton perfil: aria-expanded + aria-controls apuntando al id del AccordionCard
 */

"use client";

import * as React from "react";
import { ArrowRight, ChevronDown, MapPin, Calendar, CheckCircle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { StarRating } from "../../atoms/StarRating";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ProducerInfoSidebarProps {
  /** Nombre comercial del productor */
  businessName: string;
  /** URL de la foto principal o banner del sidebar */
  photoUrl?: string | null;
  /** URL del logotipo del productor */
  logoUrl?: string | null;
  /** Categoria principal (ej. "Hortalizas y verduras") */
  primaryCategory?: string | null;
  /** Datos de ubicacion y fundacion */
  location?: {
    city?: string | null;
    province?: string | null;
    foundedYear?: number | null;
  } | null;
  /** Frase descriptiva corta del productor */
  tagline?: string | null;
  /** Rating medio (1-5, acepta decimales) */
  averageRating?: number;
  /** Numero total de resenas */
  reviewCount?: number;
  /** Si el productor ha sido verificado por Origen */
  isVerified?: boolean;
  /** Nombres de certificaciones (se muestran hasta 3, el resto con chip "+N mas") */
  certificationNames?: string[];
  /**
   * Slot para el boton de favorito (o cualquier accion de usuario).
   * El proyecto consumidor renderiza el boton con su estado de sesion.
   */
  favoriteButton?: React.ReactNode;
  /**
   * Estado externo del acordeon editorial (modo controlado).
   * Solo aplica cuando `profileLinkMode` es `false` (default). Si no se
   * pasa, el boton no muestra estado expandido.
   */
  profileExpanded?: boolean;
  /** Callback invocado al pulsar el boton "Conocer perfil" / "Conocer nuestra historia" */
  onToggleProfile?: () => void;
  /**
   * id de la seccion editorial a la que apunta el boton.
   * Se usa como aria-controls (modo acordeon) o como ancla de scroll
   * (modo `profileLinkMode`).
   */
  profileSectionId?: string;
  /**
   * Cuando es `true`, el boton se comporta como un enlace de navegacion a
   * una seccion editorial **siempre visible** en la pagina (icono flecha,
   * label "Conocer nuestra historia", sin `aria-expanded`) en vez de un
   * disclosure de acordeon (icono chevron rotativo, `aria-expanded`,
   * label "Conocer perfil"/"Ocultar perfil"). Usar `true` cuando el
   * contenido editorial ya no vive detras de un accordion colapsado.
   * @default false
   */
  profileLinkMode?: boolean;
  /** Clases CSS adicionales para el contenedor raiz */
  className?: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

/** Maximo de badges de certificacion visibles antes del chip "+N mas" */
const MAX_VISIBLE_CERTS = 3;

// ─── Componente ───────────────────────────────────────────────────────────────

export function ProducerInfoSidebar({
  businessName,
  photoUrl,
  logoUrl,
  primaryCategory,
  location,
  tagline,
  averageRating,
  reviewCount,
  isVerified = false,
  certificationNames = [],
  favoriteButton,
  profileExpanded = false,
  onToggleProfile,
  profileSectionId,
  profileLinkMode = false,
  className,
}: ProducerInfoSidebarProps) {
  // ── Datos derivados ──────────────────────────────────────────────────────

  const visibleCerts = certificationNames.slice(0, MAX_VISIBLE_CERTS);
  const extraCertsCount = certificationNames.length - MAX_VISIBLE_CERTS;

  const hasLocation = !!(location?.province || location?.city);
  const locationText = [location?.city, location?.province]
    .filter(Boolean)
    .join(", ");

  const showRating = averageRating != null && averageRating > 0;
  const showReviewCount = typeof reviewCount === "number" && reviewCount > 0;

  return (
    <aside
      aria-label="Informacion del productor"
      className={cn(
        "flex flex-col gap-0",
        // Sticky solo en desktop: el sidebar sigue visible mientras el
        // usuario hace scroll por el catalogo de productos.
        "lg:sticky lg:top-24 lg:self-start",
        className
      )}
    >
      {/* ── 1. Bloque foto/banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Contenedor de imagen: ratio corto en movil, cuadrado en md+ */}
        <div className="relative aspect-[16/7] max-h-[200px] md:aspect-[4/3] md:max-h-none">
          {photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoUrl}
              alt={`Foto de ${businessName}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            /* Fallback degradado de marca cuando no hay foto */
            <div
              role="img"
              aria-label={`Foto de ${businessName}`}
              className="absolute inset-0 bg-gradient-to-br from-origen-pastel via-origen-nube to-origen-pradera/20"
            />
          )}

          {/* Gradiente de lectura en la parte inferior de la imagen */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Logo superpuesto: esquina inferior derecha */}
        {logoUrl && (
          <div className="absolute bottom-2 right-2 h-12 w-12 overflow-hidden rounded-xl border-2 border-white shadow-md bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt={`Logo de ${businessName}`}
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>

      {/* ── 2. Bloque identidad ───────────────────────────────────────── */}
      <div className="pt-3 px-1">
        {/* Overline: categoria + badge verificado */}
        {(primaryCategory || isVerified) && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {primaryCategory && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-origen-hoja">
                {primaryCategory}
              </span>
            )}
            {isVerified && (
              <Badge
                variant="success"
                size="sm"
                icon={<CheckCircle className="h-3 w-3" />}
              >
                Verificado
              </Badge>
            )}
          </div>
        )}

        {/* Nombre del productor */}
        <h2 className="font-serif font-bold text-2xl leading-tight text-text-primary">
          {businessName}
        </h2>

        {/* Metadatos: ubicacion y ano de fundacion */}
        {(hasLocation || location?.foundedYear) && (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-text-subtle">
            {hasLocation && (
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden="true" className="h-3 w-3" />
                {locationText}
              </span>
            )}
            {location?.foundedYear && (
              <span className="inline-flex items-center gap-1">
                <Calendar aria-hidden="true" className="h-3 w-3" />
                desde {location.foundedYear}
              </span>
            )}
          </div>
        )}

        {/* Rating y numero de resenas */}
        {showRating && (
          <div className="mt-2 flex items-center gap-2">
            <StarRating
              value={averageRating!}
              readOnly
              size="sm"
              showValue
              totalReviews={showReviewCount ? reviewCount : undefined}
            />
          </div>
        )}

        {/* Tagline: cita breve del productor, max 2 lineas */}
        {tagline && (
          <p className="mt-2 pl-3 border-l-2 border-origen-hoja/50 font-serif text-sm italic text-text-subtle line-clamp-2">
            {tagline}
          </p>
        )}

        {/* ── 3. Badges de certificaciones ──────────────────────────── */}
        {certificationNames.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Certificaciones del productor">
            {visibleCerts.map((cert) => (
              <Badge key={cert} variant="leaf" size="sm">
                {cert}
              </Badge>
            ))}
            {extraCertsCount > 0 && (
              /* Chip no interactivo: indica que hay mas certificaciones */
              <span className="inline-flex items-center rounded-full border border-border-subtle bg-surface-alt px-2 py-1 text-xs font-medium text-text-subtle">
                +{extraCertsCount} mas
              </span>
            )}
          </div>
        )}

        {/* ── 4. Fila de acciones ───────────────────────────────────── */}
        <div className="mt-4 flex items-center gap-2">
          {/* Slot de favorito inyectado por el proyecto consumidor */}
          {favoriteButton}

          {/* Boton de acceso a la seccion editorial: enlace de navegacion
              (profileLinkMode) o disclosure de acordeon (legacy) */}
          {onToggleProfile && profileLinkMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleProfile}
              aria-controls={profileSectionId}
              className="flex-1 justify-between"
              rightIcon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            >
              Conocer nuestra historia
            </Button>
          )}
          {onToggleProfile && !profileLinkMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleProfile}
              aria-expanded={profileExpanded}
              aria-controls={profileSectionId}
              className="flex-1 justify-between"
              rightIcon={
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    profileExpanded && "rotate-180"
                  )}
                />
              }
            >
              {profileExpanded ? "Ocultar perfil" : "Conocer perfil"}
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

ProducerInfoSidebar.displayName = "ProducerInfoSidebar";
