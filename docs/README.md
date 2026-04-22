# @arcediano/ux-library

Librería de componentes corporativos reutilizables del Design System de Origen Marketplace.

## Descripción

Librería React publicada en GitHub Packages (`@arcediano/ux-library`). Provee componentes atómicos con tokens semánticos de diseño que se utilizan en `origen-web`, `origen-dashboard` y `origen-admin`.

## Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | >=18 (peer) | Componentes |
| TypeScript | — | Tipado de props y exports |
| Tailwind CSS | — | Estilos base |
| tsup | — | Bundler — genera ESM y CJS |
| Storybook | ^8.6 | Documentación visual de componentes |
| Vitest | — | Tests unitarios |
| @changesets/cli | — | Gestión de versiones semver |

## Instalación

La librería se publica en GitHub Packages. Requiere configuración de `.npmrc`:

```bash
# .npmrc
@arcediano:registry=https://npm.pkg.github.com
```

```bash
npm install @arcediano/ux-library
```

**Versión actual:** `0.2.14`

## Uso

```tsx
import { Button, Input, Card } from '@arcediano/ux-library';
import '@arcediano/ux-library/styles';  // Tokens CSS
```

## Scripts disponibles

```bash
npm run dev              # Desarrollo con watch
npm run build            # Build (genera dist/index.js, dist/index.mjs, dist/index.d.ts)
npm run storybook        # Storybook en puerto 6006
npm run build-storybook  # Build estático de Storybook
npm test                 # Tests con Vitest
npm run type-check       # Verificación de tipos
npm run release          # Build + publish a GitHub Packages
```

## Exports

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  },
  "./styles": "./dist/styles/tokens.css"
}
```

## Estructura de directorios

```
src/
├── components/
│   ├── atoms/        # Componentes atómicos (ver COMPONENTS.md)
│   ├── icons/        # Iconos SVG como componentes React
│   └── mobile/       # Variantes mobile-specific
├── lib/              # Utilidades compartidas (cn, cva, etc.)
├── styles/           # Tokens CSS del design system
├── stories/          # Historias de Storybook
├── tests/            # Tests de componentes
└── index.ts          # Barrel export de todos los componentes
```

## Documentación adicional

- [COMPONENTS.md](./COMPONENTS.md) — Listado completo de componentes con props y uso
