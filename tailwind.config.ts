/**
 * Re-export del preset de Tailwind para uso local (PostCSS, Storybook).
 *
 * La fuente de verdad vive en `src/tailwind.config.ts`, ya que el build
 * (tsup + dts) requiere que todas las entradas estén bajo `rootDir: "./src"`
 * (ver tsconfig.json). Este archivo solo existe por convención: PostCSS y
 * Storybook descubren `tailwind.config.{js,ts}` en la raíz del proyecto.
 */
export { default } from "./src/tailwind.config";
