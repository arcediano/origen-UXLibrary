---
"@arcediano/ux-library": major
---

Se elimina el componente `MobileBottomNav` (y sus tipos `MobileBottomNavItem`/`MobileBottomNavProps`) de la librería. Los proyectos consumidores (`origen-dashboard`, `origen-web`) han vuelto a sus implementaciones locales de bottom navigation ("isla flotante"), por lo que el componente compartido queda sin uso.
