---
"@arcediano/ux-library": patch
---

Fix: `Table` pintaba su `<thead>` con `bg-origen-crema`, que en apps
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
