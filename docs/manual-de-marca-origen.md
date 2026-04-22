# Manual de Marca Origen — Comercial v5.0

**Fecha**: 2026-04-04  
**Estado**: Activo (unico manual vigente)  
**Aplica a**: `origen-web`, `origen-dashboard`, `origen-admin`, `origen-UXLibrary`

---

## 1. Objetivo de marca actual

Construir una experiencia visual mas comercial, memorable y orientada a conversion, manteniendo la identidad natural y cercana de Origen.

## 2. Restricciones

1. No se crean SVG nuevos en esta fase.
2. El rediseno se ejecuta con:
- color
- tipografia
- espaciado
- jerarquia
- motion
- patrones UI
3. Todos los componentes nuevos se implementan en `origen-UXLibrary`.
4. `origen-UXLibrary` no debe depender de `@radix-ui/*`.

## 3. Principios de diseno

1. Comercial: el usuario debe identificar valor y accion en menos de 3 segundos.
2. Claridad: contenido y acciones con jerarquia visual evidente.
3. Consistencia: una sola fuente de verdad para tokens y componentes.
4. Mobile-first: primero tactil, despues desktop.
5. Accesibilidad: contraste AA minimo y estados de foco visibles.

## 4. Sistema visual objetivo

### 4.1 Color

- Mantener base Bosque Profundo como identidad.
- Subir contraste de CTA y bloques de pricing.
- Definir niveles de enfasis comercial:
  - neutral
  - destacado
  - oferta
  - urgencia

### 4.2 Tipografia

- Jerarquia optimizada para conversion:
  - titulares de valor
  - subtitulos de confianza
  - cuerpo breve y escaneable
- Ajustar tracking, line-height y peso para lectura rapida en mobile.

### 4.3 Motion

- Microinteracciones en acciones de compra/guardado/filtro.
- Animaciones breves con proposito (sin ruido).
- Respetar `prefers-reduced-motion`.

## 5. Arquitectura de componentes (objetivo)

### 5.1 Atomicos core

- Button
- Input
- Label
- Badge
- Checkbox
- Radio
- Switch
- Tabs
- Tooltip
- Select
- Sheet

### 5.2 Patrones comerciales

- ProductCard
- PriceBlock
- PromoBadge
- EmptyState
- DataTableResponsive
- CommandPalette

### 5.3 Mobile-native (exclusivos)

- MobileBottomNav
- MobileTopBar
- FilterBottomSheet
- SwipeableRow
- StatStrip
- ScrollChipFilter

## 6. Handoffs obligatorios

1. `@diseñador-grafico` define direccion visual comercial.
2. `@diseñador-ux` convierte direccion visual en sistema de interaccion y patrones.
3. `@desarrollador-codigo` implementa en UXLibrary y migra frontales.
4. `@analista-pruebas` valida regresion visual y comportamiento.
5. `@documentador-tecnico` mantiene este manual y el plan de sprint.

## 7. Entregables de esta fase

1. Tokens comerciales v1 (sin romper esencia de marca).
2. Catalogo UXLibrary con secciones `tokens`, `typography`, `components`, `mobile`.
3. Primera ola de componentes core sin Radix.
4. Matriz de adopcion en frontales.

---

## Versionado

- v5.0 (actual): manual reiniciado para enfoque comercial activo de BRAND-R1.
