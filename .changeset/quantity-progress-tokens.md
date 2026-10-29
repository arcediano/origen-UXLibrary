---
"@arcediano/ux-library": minor
---

`QuantitySelector`: dos props nuevas, opcionales y retrocompatibles.

- `itemLabel`: nombre del artículo; los botones se anuncian como «Reducir/Aumentar cantidad de {itemLabel}»
  (necesario con varios selectores en pantalla, p. ej. un carrito).
- `size`: `"md"` (por defecto, 44 px) o `"sm"` (36 px) para filas densas en escritorio.
  Añadidos tests y stories (antes no tenía).

`Progress`: nueva prop `valueText` para que los lectores de pantalla lean un valor con sentido
(«12,50 € de 40,00 €») en lugar del porcentaje. Las variantes `sprout`, `fruit`, `warning` y el modo
`char-count` dejan de usar colores de la paleta de Tailwind (`amber-*`, `green-*`, `orange-*`, `white`)
y pasan a los tokens `feedback-*` / `origen-*` / `primary-foreground`.

Correcciones de tokens: `Breadcrumb`, `NutritionDonut`, `ReviewCard`, `ProducerInfoSidebar` y
`ProductMobileHeader` usaban la clase `text-text-primary`, que no existe en ningún tema (no tenía efecto);
ahora usan `text-foreground`. `--background-image-gradient-crema` deja de llevar `#ffffff` fijo.
