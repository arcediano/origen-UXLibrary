// Configuración de ESLint (flat config) para @arcediano/ux-library.
// Librería de componentes React/TSX consumida por origen-admin/origen-dashboard/origen-web,
// con Storybook como banco de pruebas visual.
import tseslint from "typescript-eslint";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import storybookPlugin from "eslint-plugin-storybook";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "storybook-static/**", "eslint.config.mjs"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      // TypeScript ya exige tipos — react/prop-types es redundante en este repo.
      "react/prop-types": "off",
    },
  },
  ...storybookPlugin.configs["flat/csf"],
  {
    files: [".storybook/**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "src/tests/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Patrón deliberado y repetido en este repo: `interface XProps extends
      // Y {}` solo para dar un nombre propio/documentado al tipo público que
      // consumen los 3 frontends — no es un tipo vacío accidental.
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
      // Los componentes de esta librería son wrappers `forwardRef` que
      // reciben su contenido vía `{...props}`/`children` en el sitio de uso
      // (no como JSX literal) — jsx-a11y no puede verlo estáticamente y
      // marca falsos positivos sistemáticos en cada wrapper de heading.
      "jsx-a11y/heading-has-content": "off",
      // Varios elementos (Radix, botones nativos) reciben atributos ARIA vía
      // `{...props}` cuyo `role` real solo se conoce en tiempo de ejecución
      // — el mapa estático rol→atributo del plugin da falsos positivos aquí.
      "jsx-a11y/role-supports-aria-props": "off",
      // Patrón estándar de overlay/backdrop de modal (Dialog/Sheet/AlertDialog):
      // el div de fondo solo cierra al hacer click fuera del contenido: el
      // diálogo real ya tiene su propio role/foco accesible por separado.
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
    },
  },
);
