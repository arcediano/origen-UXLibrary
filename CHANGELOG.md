# @arcediano/ux-library

## 0.23.3

### Patch Changes

- fix: cn() ya no descarta clases de color de texto/fondo al combinarse con fontSize/backgroundImage personalizados

  - Implementa extendTailwindMerge en utils.ts para registrar explícitamente las claves personalizadas de fontSize (h1, h2, h3, body, small, micro) y backgroundImage (gradient-origen, gradient-menta, gradient-crema) en sus grupos correctos
  - Resuelve bug donde tailwind-merge clasificaba text-{size} custom como si compitieran con text-{color}, descartando la clase de color indebidamente
  - Patrones afectados: todos los 6 variantes de Button (primary, secondary, outline, ghost, destructive, hero) en combinación con cualquier size
  - Añade tests de regresión que renderizen el componente real (no solo buttonVariants aislado) para evitar que este bug resurja

## 0.23.2

### Patch Changes

- Fix Checkbox contrast: use pino (5.4:1) instead of pradera (1.9:1) for checked/indeterminate states in seed and accent variants (R23/R24 compliance)

## 0.23.1

### Patch Changes

- fix(Table): reemplaza opacidad origen-crema/20 por fondo solido origen-nube en fila expandida -- WCAG AA

## 0.18.0

### Minor Changes

- feat(AuthFooter): Add "comprador-login" variant and parametrize navColumn per variant

  - Extend AuthFooterVariant with "comprador-login" for marketplace buyer login footer
  - Add navColumn field to VARIANT_CONFIG to allow per-variant navigation section titles and links
  - Migrate existing NAV_LINKS content to navColumn of login/register/forgot/info variants (no visual changes)
  - New "comprador-login" variant with "Comprar" column linking to /como-funciona, /contacto, /faq
  - CTA "Vende en Origen" links to https://origen-dashboard.vercel.app with versionLabel "Acceso comprador"

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
