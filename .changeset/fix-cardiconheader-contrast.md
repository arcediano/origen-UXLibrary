---
"@arcediano/ux-library": patch
---

Fix: `CardIconHeader` pintaba el icono en `text-origen-pradera` (~1.9:1 sobre
el fondo claro del propio tile), violando R25 del manual de diseño. El
changelog v6.5 (2026-08-06) ya documentaba esta corrección como aplicada,
pero nunca llegó al componente real. Se corrige a `text-hoja-tinta`
(≥5.9:1), el token correcto para iconos/texto informativo sobre fondo
claro. Afecta a todos los consumidores de `CardIconHeader`/`AccordionCard`
(onboarding, `dashboard/account`, campañas, pagos, seguridad).

Detectado en `disenador-ux` (auditoría de diseño de
`bugs-detalle-pedido-productor`, 2026-08-22), bloqueante para migrar
`SectionAccordion` de `origen-dashboard` a `AccordionCard`.
