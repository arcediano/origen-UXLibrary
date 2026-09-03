# @arcediano/ux-library

## 0.25.1

### Patch Changes

- `Dialog`: en móvil, el contenido que no cabe en `max-h-[90dvh]` ahora se puede desplazar en vez de recortarse en silencio sin forma de llegar a él (bug real: casillas de un código de verificación cortadas al fondo de la pantalla, botón de confirmar inalcanzable). El panel exterior ya no se desplaza — solo recorta y mantiene fijos el tirador y el botón de cerrar; es un wrapper interior el que se desplaza, con `DialogHeader`/`DialogFooter` fijos (`sticky`) arriba/abajo de ese scroll para que el título y las acciones sigan siempre visibles. Sin cambios de comportamiento en escritorio.

## 0.25.0

### Minor Changes

- `FilterPanel`: nueva prop `variant` (`"popover" | "drawer"`, por defecto `"popover"` — sin cambios para consumidores existentes). Con `variant="drawer"`, la presentación en escritorio (`≥lg`) pasa de un popover pequeño anclado bajo el botón "Filtros" a un panel deslizante de altura completa desde el borde derecho, con scrim de fondo — mismas secciones tipadas, mismo estado draft y mismo footer "Limpiar/Aplicar" que ya tenía el popover. El bottom sheet de móvil/tablet no cambia. Pensado para listados de gestión donde el consumidor sustituye una barra de filtros siempre visible en escritorio por un botón "Filtros" bajo demanda también ahí — decisión de diseño validada en vivo por el humano tras revertir un intento anterior de sidebar fijo de 280px.

## 0.24.1

### Patch Changes

- eb21d0d: `FilterSidebarPanel`: añadido soporte para `children` (contenido renderizado entre la cabecera y las secciones tipadas — p. ej. un campo de búsqueda o un `Select searchable` de alta cardinalidad), mismo slot que ya tiene `FilterSidebar`. Necesario para migrar los filtros de pedidos/reseñas/productos de `origen-dashboard`, que combinan búsqueda con las secciones tipadas.

## 0.24.0

### Minor Changes

- 9db3eb9: Nuevo componente `FilterSidebarPanel`: variante de `FilterSidebar` pensada para listados de gestión (`origen-dashboard`/`origen-admin`) en vez de catálogos públicos — mantiene el acabado visual de columna lateral fija de `FilterSidebar`, pero con el modelo de interacción de `FilterPanel` (draft local + botón "Aplicar filtros" explícito, en vez de aplicar cada cambio al instante). Resincroniza el draft automáticamente cuando el estado aplicado de `sections` cambia por una vía externa al panel (p. ej. se quita un chip en `ActiveFilterChips`), ya que a diferencia de `FilterPanel` este componente nunca se desmonta entre usos. Comparte el motor de secciones tipadas (`chips`, `daterange`, `numberrange`, `toggles`) con `FilterPanel`/`FilterSidebar`.

## 0.23.11

### Patch Changes

- 4542d11: StatusBadge: añadido el estado `scheduled` ("Programado") a `StatusType`, siguiendo el mismo patrón (pill plano + icono, sin punto indicador) que el resto de estados ya existentes en la librería. Resuelve la inconsistencia entre las 3 implementaciones locales del badge de estado de producto (`ProductStatusBadge` en `origen-admin`, con punto indicador; `ProductMobileList` en `origen-dashboard`, un `StatusBadge` local con su propia paleta) sustituyéndolas por este mismo componente compartido.

## 0.23.10

### Patch Changes

- c90715f: Button: la variante `ghost` (`bg-transparent`, sin borde, `shadow-none`) no tenía ningún límite visual propio en reposo sobre superficies claras — solo el texto y un hover perceptible, reportado como casi imperceptible (ejemplo: botón "Mover a borrador" en `StatusCard` de `origen-dashboard`). Añadido `border border-origen-pino/15` en reposo (mitad de opacidad que `outline`), reforzado a `border-origen-pradera/40` en hover y `border-origen-pino/10` en disabled. Sigue siendo la variante más discreta de las cinco.

## 0.23.9

### Patch Changes

- 5100724: SwipeableRow: la fila deslizable usaba `bg-surface` (= `--crema`, el mismo color que el fondo de página) en vez de `bg-surface-alt` (blanco, el color del contenedor `MobileCardList` que la envuelve) — la fila quedaba literalmente del mismo color que la pantalla, no solo con poco contraste de borde. Afecta a todas las listas móviles que usan `SwipeableRow` (pedidos, productos, reseñas, ofertas flash, facturas, campañas, moderación de productos).

## 0.23.8

### Patch Changes

- af2bf1d: MobileCardList: nuevo token `--border-container` con contraste garantizado sobre `--background`/`--crema` (antes usaba `border-subtle`, casi invisible en apps consumidoras donde ambos tokens tienen poca diferencia de luminosidad).

## 0.23.7

### Patch Changes

- 63144c6: Fix: `CardIconHeader` pintaba el icono en `text-origen-pradera` (~1.9:1 sobre
  el fondo claro del propio tile), violando R25 del manual de diseño. El
  changelog v6.5 (2026-08-06) ya documentaba esta corrección como aplicada,
  pero nunca llegó al componente real. Se corrige a `text-hoja-tinta`
  (≥5.9:1), el token correcto para iconos/texto informativo sobre fondo
  claro. Afecta a todos los consumidores de `CardIconHeader`/`AccordionCard`
  (onboarding, `dashboard/account`, campañas, pagos, seguridad).

  Detectado en `disenador-ux` (auditoría de diseño de
  `bugs-detalle-pedido-productor`, 2026-08-22), bloqueante para migrar
  `SectionAccordion` de `origen-dashboard` a `AccordionCard`.

- f1d2b8a: Fix: `Table` pintaba su `<thead>` con `bg-origen-crema`, que en apps
  consumidoras que definen `--surface`/`--background` como `var(--crema)`
  (caso de `origen-dashboard`) resuelve al mismo valor HSL exacto que el
  fondo de página — la cabecera desaparecía visualmente contra el fondo.
  Se cambia a `bg-surface-alt` (blanco, mismo fondo que el resto de la
  tabla), apoyándose en el borde inferior verde de 2px ya existente
  (`border-b-2 border-origen-pradera/30`) para mantener la separación
  visual cabecera/cuerpo sin depender de que cada app defina sus tokens
  de superficie con valores distintos entre sí.

  Detectado en `origen-dashboard` (reporte del humano, 2026-08-30) —
  afecta también a `origen-admin`, que usa `Table` extensamente.

  `MobileCardList` tiene un problema relacionado (contraste insuficiente
  en móvil, no un color idéntico) que queda pendiente: las opciones
  probadas visualmente (`border-border-strong`, sombra más pronunciada)
  no dieron un resultado limpio sin introducir un token nuevo o reutilizar
  uno con semántica de "activo/énfasis" fuera de su propósito — ver
  `claude-agile/proyectos/origen-UXLibrary/tareas-pendientes.md`.

## 0.23.6

### Patch Changes

- fix(Alert): evitar que el contenido desborde horizontalmente en móvil

  El div interno de `Alert` (`flex-1 space-y-1`) no tenía `min-w-0`, así que
  un texto largo sin espacios dentro de `AlertDescription`/`AlertTitle`
  (p. ej. una API key en un mensaje de error) no podía encogerse ni partirse
  dentro del layout flex y desbordaba el contenedor por la derecha en
  pantallas estrechas. Se añade `min-w-0` y `break-words` al contenedor.

## 0.23.5

### Patch Changes

- fix(app-shell-padding): mapeo estático de clases pb-[...]/bottom-[...] para que Tailwind JIT las detecte

  appShellPaddingClass() y appShellBottomOffsetClass() ahora usan un mapeo estático interno que contiene las 10 combinaciones reales de clases Tailwind. El escáner JIT de Tailwind puede detectar estas cadenas literales en el bundle compilado (dist/), lo que permite que el CSS se genere correctamente.

  Antes: las clases se construían con interpolación de template string, que el escáner JIT nunca detecta.
  Después: las clases se buscan en un mapa y se devuelven como cadenas literales completas.

  El cambio es completamente transparente para los consumidores - la firma de las funciones no cambió, y un console.warn en desarrollo avisa si se usa una combinación no mapeada.

  Fixes .claude/requirements/bug-tailwind-jit-clases-dinamicas.md

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
