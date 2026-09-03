---
"@arcediano/ux-library": patch
---

StatusBadge: añadido el estado `scheduled` ("Programado") a `StatusType`, siguiendo el mismo patrón (pill plano + icono, sin punto indicador) que el resto de estados ya existentes en la librería. Resuelve la inconsistencia entre las 3 implementaciones locales del badge de estado de producto (`ProductStatusBadge` en `origen-admin`, con punto indicador; `ProductMobileList` en `origen-dashboard`, un `StatusBadge` local con su propia paleta) sustituyéndolas por este mismo componente compartido.
