---
"@arcediano/ux-library": minor
---

`FilterPanel`/`FilterSection`: nuevo tipo de sección `"text"` — un campo de
texto libre (opcionalmente restringido a dígitos vía `numeric: true`), con
el mismo ciclo de vida de draft/aplicar/limpiar que `chips`/`daterange`/
`numberrange`/`toggles`.

Motivado por `origen-admin` (`/admin/orders`), que necesita filtrar por
`sellerId`/`userId` (IDs de texto libre) dentro del mismo panel compartido
que ya usa para estado/fecha/importe — ninguno de los 4 tipos existentes
cubre texto libre, y `FilterPanel` no expone un slot de `children` para
mezclar campos propios (a diferencia de `FilterSidebar`). Sin cambios de
comportamiento para los consumidores existentes (unión de tipos extendida,
sin tocar los 4 tipos ya soportados).
