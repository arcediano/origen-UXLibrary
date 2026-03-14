# Roadmap: origen-UXLibrary v1.0 🚀

Este documento detalla la estrategia para desacoplar los componentes visuales del proyecto `origen-dashboard` y consolidarlos en una librería corporativa reutilizable, agnóstica al framework pero optimizada para el ecosistema de la empresa.

## 1. Stack Tecnológico Recomendado

Para garantizar modernidad, rendimiento y adaptabilidad, se propone el siguiente stack:

*   **Core:** [React 18/19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/).
*   **Fundación UI:** [Radix UI](https://www.radix-ui.com/) (Primitive-first). Provee accesibilidad y comportamiento sin estilos predefinidos.
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [CVA (Class Variance Authority)](https://cva.style/). Permite gestionar variantes de diseño de forma tipada.
*   **Design Tokens:** Variables CSS (estilo `globals.css`) exportables o un paquete `@origen/tokens` para mantener la identidad de marca sincronizada.
*   **Documentación:** [Storybook](https://storybook.js.org/). Esencial para el catálogo de componentes y pruebas visuales.
*   **Bundling:** [Tsup](https://tsup.egoist.dev/) o [Rollup]. Optimizado para generar paquetes ESM y CJS con definiciones de tipos.
*   **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library].
*   **Publicación:** [Changesets](https://github.com/changesets/changesets) para gestión de versiones y changelogs.

---

## 2. Arquitectura de Desacoplamiento

El objetivo es separar la **Lógica de Negocio** de la **Interfaz de Usuario**.

### Estrategia de Design Tokens
1.  Extraer variables de color, tipografía y espaciado a un archivo base.
2.  Los componentes de la librería consumen estas variables, no valores fijos (Hex/Rgb).
3.  Permite aplicar "Theming" (ej. pasar de Origen a otra marca de la empresa solo cambiando las variables bases).

---

## 3. Fases del Roadmap

### Fase 1: Infraestructura y Tokens (Q2 2026)
- [ ] Inicializar repositorio en `origen-UXLibrary`.
- [ ] Configurar Tsup/Rollup para exportación de paquetes.
- [ ] Definir el paquete de **Design Tokens** (Paleta Índigo y Salvia v2.0).
- [ ] Configurar Storybook con soporte para Tailwind.

### Fase 2: Migración de Componentes Atómicos (Q2-Q3 2026)
Prioridad: Componentes sin dependencias de API.
- [ ] `Button`: Implementar variantes `primary`, `secondary`, `menta-glow`.
- [ ] `Card`: Sistema de contenedores orgánicos.
- [ ] `Badge`, `Label`, `Separator`, `Progress`.
- [ ] `Typography`: Componentes funcionales para H1, H2, Body.

### Fase 3: Componentes de Formulario y Complejos (Q3 2026)
- [ ] `Input`, `TextArea`, `Checkbox`, `RadioGroup`.
- [ ] `Select`, `Dialog`, `Accordion` (Basados en Radix).
- [ ] `CurrencyInput` y `PercentageInput` (Lógica de Origen).
- [ ] `Uploader`: Desacoplar `react-dropzone` para que sea configurable.

### Fase 4: Consumo y Publicación en GitHub (Q4 2026)
- [ ] Configurar **GitHub Packages** para el alojamiento del registro npm privado/público.
- [ ] Implementar **GitHub Actions** para el despliegue automático de Storybook en GitHub Pages.
- [ ] Automatizar versionado con **Changesets** e integrarlos con Releases de GitHub.
- [ ] Crear plantillas para Issues y Pull Requests para fomentar la colaboración interna en la empresa.
- [ ] Documentar guía de consumo para `npm install @origen/ux-library`.

---

## 4. Guía de GitHub Actions para CI/CD

El repositorio incluirá flujos automatizados para:
1.  **Validación de PRs:** ESLint, Prettier, Vitest y Build check.
2.  **Snapshot Testing:** Verificación visual automática de cambios en componentes.
3.  **Deploy Storybook:** Despliegue automático de la documentación en cada rama o merge a `main`.
4.  **Publish Package:** Publicación automática a GitHub Packages al crear una nueva release.

Para que un componente sea aceptado en `origen-UXLibrary`, debe cumplir:
1.  **Zero Business Logic:** No realizar llamadas a `fetch` o bases de datos.
2.  **Framework Agnostic:** Recibir datos por props, no depender de contextos de Next.js.
3.  **Styled via Tokens:** Usar clases Tailwind que apunten a los tokens del sistema.
4.  **Full Typed:** Interfaces de TS completas y documentadas con JSDoc.

---
*Última actualización: 14 de Marzo, 2026*
