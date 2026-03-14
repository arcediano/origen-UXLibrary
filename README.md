# @origen/ux-library

> **Origen Design System** — Librería de componentes React reutilizables para todos los proyectos de la empresa.

[![CI](https://github.com/origen/ux-library/actions/workflows/ci.yml/badge.svg)](https://github.com/origen/ux-library/actions/workflows/ci.yml)

---

## Instalación

Añade un archivo `.npmrc` en la raíz de tu proyecto con:

```
@origen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Luego instala el paquete:

```bash
npm install @origen/ux-library
# o con pnpm
pnpm add @origen/ux-library
```

---

## Configuración en el proyecto consumidor

### 1. Importar los Design Tokens (CSS)

En tu `layout.tsx` (Next.js) o `main.tsx` (Vite):

```ts
import '@origen/ux-library/styles';
```

### 2. Configurar Tailwind CSS

En tu `tailwind.config.ts`:

```ts
import origenPreset from '@origen/ux-library/tailwind.config';

export default {
  presets: [origenPreset],
  content: [
    // ...tus rutas
    './node_modules/@origen/ux-library/dist/**/*.{js,mjs}',
  ],
};
```

---

## Uso

```tsx
import { Button, Badge, Input, StatusBadge } from '@origen/ux-library';

export function MiPagina() {
  return (
    <div>
      <Input label="Email" type="email" placeholder="tu@origen.es" required />
      <Button variant="primary" loading={false}>Guardar</Button>
      <StatusBadge status="active" />
      <Badge variant="leaf">Producto Ecológico</Badge>
    </div>
  );
}
```

---

## Componentes disponibles

| Categoría | Componente | Descripción |
|---|---|---|
| Atoms | `Button` | 5 variantes, tamaños, loading, iconos |
| Atoms | `Badge` | 7 variantes + `StatusBadge` para estados de negocio |
| Atoms | `Label` | Radix-based, required/optional/tooltip |
| Atoms | `Separator` | Horizontal/vertical |
| Atoms | `Input` | 4 variantes, iconos, password, contador |
| Atoms | `Tooltip` | Portal-based, posición inteligente |

---

## Contribuir

1. Clona el repositorio
2. `npm install`
3. `npm run storybook` — Visualiza los componentes
4. `npm run test:watch` — Tests en modo watch
5. Crea un changeset: `npm run changeset`
6. Abre un Pull Request a `develop`

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Build en modo watch |
| `npm run build` | Genera `dist/` |
| `npm run storybook` | Servidor de documentación en `:6006` |
| `npm run test` | Ejecuta todos los tests |
| `npm run changeset` | Crea un changeset para el versionado |
| `npm run release` | Build + publicación a GitHub Packages |

---

*Mantenido por el Equipo de Diseño y Plataforma de Origen.*
