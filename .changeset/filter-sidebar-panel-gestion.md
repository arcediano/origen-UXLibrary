---
"@arcediano/ux-library": minor
---

Nuevo componente `FilterSidebarPanel`: variante de `FilterSidebar` pensada para listados de gestión (`origen-dashboard`/`origen-admin`) en vez de catálogos públicos — mantiene el acabado visual de columna lateral fija de `FilterSidebar`, pero con el modelo de interacción de `FilterPanel` (draft local + botón "Aplicar filtros" explícito, en vez de aplicar cada cambio al instante). Resincroniza el draft automáticamente cuando el estado aplicado de `sections` cambia por una vía externa al panel (p. ej. se quita un chip en `ActiveFilterChips`), ya que a diferencia de `FilterPanel` este componente nunca se desmonta entre usos. Comparte el motor de secciones tipadas (`chips`, `daterange`, `numberrange`, `toggles`) con `FilterPanel`/`FilterSidebar`.
