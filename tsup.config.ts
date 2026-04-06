import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Excluir las dependencias peer del bundle
  external: ["react", "react-dom"],
  // Inyectar automáticamente React en cada archivo
  injectStyle: false,
  // Manejo de JSX
  jsx: "react-jsx",
  // Splitting para tree-shaking óptimo
  splitting: true,
  // Optimizar el bundle
  minify: false,
  treeshake: true,
  // Copiar estilos CSS al directorio dist
  async onSuccess() {
    const { mkdirSync, copyFileSync } = await import("fs");
    mkdirSync("dist/styles", { recursive: true });
    copyFileSync("src/styles/tokens.css", "dist/styles/tokens.css");
  },
});
