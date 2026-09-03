---
"@arcediano/ux-library": patch
---

`FilterSidebarPanel`: añadido soporte para `children` (contenido renderizado entre la cabecera y las secciones tipadas — p. ej. un campo de búsqueda o un `Select searchable` de alta cardinalidad), mismo slot que ya tiene `FilterSidebar`. Necesario para migrar los filtros de pedidos/reseñas/productos de `origen-dashboard`, que combinan búsqueda con las secciones tipadas.
