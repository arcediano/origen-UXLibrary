import type { Preview } from "@storybook/react-vite";
import "../src/styles/tokens.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        crema: { name: "crema", value: "#FCF9F2" },
        nube: { name: "nube", value: "#F8FCF9" },
        blanco: { name: "blanco", value: "#FFFFFF" },
        bosque: { name: "bosque", value: "#215A42" },
        pastel: { name: "pastel", value: "#E4F4EB" }
      }
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

  initialGlobals: {
    backgrounds: {
      value: "crema"
    }
  }
};

export default preview;
