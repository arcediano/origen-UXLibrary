import { defineConfig } from "tsup";

export default defineConfig([
  // ─── Bundle principal — componentes, hooks, tokens JS ────────────────────
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "react/jsx-runtime"],
    banner: { js: '"use client";' },
    injectStyle: false,
    jsx: "react-jsx",
    splitting: true,
    minify: false,
    treeshake: true,
    async onSuccess() {
      const { readFileSync, writeFileSync, mkdirSync, copyFileSync } = await import("fs");
      const directive = '"use client";\n';
      for (const file of ["dist/index.js", "dist/index.mjs"]) {
        const content = readFileSync(file, "utf-8");
        if (!content.startsWith('"use client"')) {
          writeFileSync(file, directive + content);
        }
      }
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
