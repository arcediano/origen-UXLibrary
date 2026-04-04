import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "crema",
      values: [
        { name: "crema", value: "#FCF9F2" },
        { name: "nube", value: "#F8FCF9" },
        { name: "blanco", value: "#FFFFFF" },
        { name: "bosque", value: "#215A42" },
        { name: "pastel", value: "#E4F4EB" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    // ─── Accesibilidad global (addon-a11y) ─────────────────────────────────────
    // Reglas inhabilitadas a nivel de catálogo de componentes:
    //  • html-has-lang / document-title: Storybook gestiona el documento; irrelevantes
    //    en historias de componentes aislados.
    //  • region: los componentes se renderizan como fragmentos sin <main> ni
    //    landmarks de página — se valida a nivel de integración, no de story.
    a11y: {
      manual: false,
      config: {
        rules: [
          { id: "html-has-lang",   enabled: false },
          { id: "document-title",  enabled: false },
          { id: "region",          enabled: false },
        ],
      },
      options: {
        runOnly: ["wcag2a", "wcag2aa", "best-practice"],
      },
    },
  },
};

export default preview;
