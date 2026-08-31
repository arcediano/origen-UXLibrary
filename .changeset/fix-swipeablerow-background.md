---
"@arcediano/ux-library": patch
---

SwipeableRow: la fila deslizable usaba `bg-surface` (= `--crema`, el mismo color que el fondo de página) en vez de `bg-surface-alt` (blanco, el color del contenedor `MobileCardList` que la envuelve) — la fila quedaba literalmente del mismo color que la pantalla, no solo con poco contraste de borde. Afecta a todas las listas móviles que usan `SwipeableRow` (pedidos, productos, reseñas, ofertas flash, facturas, campañas, moderación de productos).
