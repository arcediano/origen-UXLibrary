import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "lienzo-frio",
      values: [
        { name: "lienzo-frio", value: "#F8F9FC" },
        { name: "blanco",      value: "#FFFFFF" },
        { name: "indigo-marino", value: "#1B2A4B" },
        { name: "bruma",       value: "#E8EEF5" },
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
  },
};

export default preview;
