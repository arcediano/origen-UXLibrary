import { defineConfig } from "tsup";

export default defineConfig([
  // ─── Bundle principal — componentes, hooks, tokens JS ────────────────────
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    injectStyle: false,
    jsx: "react-jsx",
    splitting: true,
    minify: false,
    treeshake: true,
    async onSuccess() {
      const { mkdirSync, copyFileSync } = await import("fs");
      mkdirSync("dist/styles", { recursive: true });
      copyFileSync("src/styles/tokens.css", "dist/styles/tokens.css");
    },
  },
  // ─── Preset Tailwind — para usar como `presets: [origenPreset]` ──────────
  // Compilado por separado para que los consumidores no arrastren el bundle
  // completo de componentes al cargar solo la configuración de Tailwind.
  {
    entry: { "tailwind.config": "src/tailwind.config.ts" },
    format: ["cjs", "esm"],
    dts: true,
    // tailwindcss y tailwindcss-animate son responsabilidad del consumidor
    external: ["tailwindcss", "tailwindcss-animate"],
    splitting: false,
    clean: false,
  },
]);
