# @arcediano/ux-library

## 0.17.1

### Patch Changes

- Corrige `ScrollChipFilter`: el `<div>` envolvente usado cuando se pasa `renderItem` no tenía `shrink-0`, lo que hacía que los chips se comprimieran (con el texto envuelto en varias líneas) en vez de mantener su ancho natural dentro de la fila con scroll horizontal.

## 0.17.0

### Minor Changes

- Extiende componentes para el rediseño de Mi Cuenta (origen-web):

  - `Badge`/`StatusBadge`: añade estados de pedido `confirmed`, `returned`, `refunded` y estados de reseña `review_pending`, `review_approved`, `review_rejected`, `review_flagged`.
  - `ScrollChipFilter`: añade prop `size` (variantes de tamaño con mínimo táctil de 44px) y prop `badge` (contador superpuesto), y prop `renderItem` para permitir que el consumidor controle el elemento raíz de cada chip (p. ej. envolver `Link` de Next.js con prefetch en vez de un `button`).
  - `Button`: añade prop `asChild` (usando `@radix-ui/react-slot`) para poder envolver un `Link` u otro elemento manteniendo los estilos del botón.

## 0.9.0

### Minor Changes

- feat(NutritionDonut): add SVG donut chart component for nutritional macros display

## 0.8.0

### Minor Changes

- b431538: Ajustes de diseño solicitados para `@arcediano/ux-library` 0.5.0:

  - `PageHeader`: nuevas props opcionales `badgeIcon`, `badgeText`, `tooltip` y
    `tooltipDetailed` para soportar el patrón "eyebrow badge + tooltip de ayuda"
    usado en `/dashboard/account`. Retrocompatible.
  - `Table`: el empty state ahora compone `EmptyState` (icono en chip + título +
    descripción + acción opcional) en lugar del emoji anterior. Nuevas props
    opcionales `emptyIcon` (por defecto `PackageOpen` en `text-origen-pino`),
    `emptyDescription` y `emptyAction`.
  - `Button`: la variante `destructive` se rediseña con la estructura de
    `secondary` pero en tonos rojos (`feedback-danger-subtle`/`-text`/`-border`),
    sin fondo sólido. Se añade el token `feedback.danger-border` al preset
    Tailwind.
  - Nuevo molecule `ReviewSummary`: resumen de valoraciones con media general
    (`StarRating`) y desglose de votos por estrella (1-5) en barras de progreso,
    responsive (apilado en móvil, dos columnas en escritorio).
  - Se exporta `MobileScrollSlider` también como alias `Carousel`
    (y `MobileScrollSliderProps` como `CarouselProps`) para mejorar la
    descubribilidad, sin duplicar lógica.

- Add QuantitySelector atom and ProductMobileHeader mobile component

  - QuantitySelector: reusable quantity control with min/max limits and WCAG touch targets
  - ProductMobileHeader: fixed mobile header with framework-agnostic back navigation for product detail pages
