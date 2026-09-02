---
"@arcediano/ux-library": patch
---

Button: la variante `ghost` (`bg-transparent`, sin borde, `shadow-none`) no tenía ningún límite visual propio en reposo sobre superficies claras — solo el texto y un hover perceptible, reportado como casi imperceptible (ejemplo: botón "Mover a borrador" en `StatusCard` de `origen-dashboard`). Añadido `border border-origen-pino/15` en reposo (mitad de opacidad que `outline`), reforzado a `border-origen-pradera/40` en hover y `border-origen-pino/10` en disabled. Sigue siendo la variante más discreta de las cinco.
