import type { Config } from "tailwindcss";

/**
 * Tailwind CSS para Origen UX Library
 * Paleta de colores oficial - Manual de Marca v2.0 "Índigo y Salvia"
 * 
 * Este archivo es la FUENTE DE VERDAD del Design System.
 * Los proyectos consumidores deben importar este preset para sincronizar
 * la identidad corporativa automáticamente.
 *
 * Uso en proyectos externos:
 * @example
 * // tailwind.config.ts
 * import origenPreset from '@origen/ux-library/tailwind.config'
 * export default { presets: [origenPreset] }
 */

const config: Config = {
  darkMode: ["class"],
  content: [],
  theme: {
    extend: {
      // === PALETA OFICIAL - ORIGEN v2.0 "ÍNDIGO Y SALVIA" ===
      colors: {
        origen: {
          bosque:  "hsl(var(--bosque))",   // #1B2A4B - Índigo Marino
          pino:    "hsl(var(--pino))",     // #2E4A6E - Azul Pizarra
          hoja:    "hsl(var(--hoja))",     // #4E7456 - Verde Salvia
          pradera: "hsl(var(--pradera))", // #6B90B8 - Azul Niebla
          menta:   "hsl(var(--menta))",   // #C89B4C - Oro Envejecido
          crema:   "hsl(var(--crema))",   // #F8F9FC - Lienzo Frío
          oscuro:  "hsl(var(--oscuro))",  // #0D1626 - Tinta
          pastel:  "hsl(var(--pastel))",  // #E8EEF5 - Bruma
        },
        hover: {
          bosque:  "hsl(var(--hover-bosque))",   // #0F1B30
          pradera: "hsl(var(--hover-pradera))", // #5B7FA6
          menta:   "hsl(var(--hover-menta))",   // #A47A30
        },
        // Variables del sistema (shadcn/ui compatible)
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // === BREAKPOINTS MOBILE-FIRST ===
      screens: {
        xs:      "475px",
        tablet:  "768px",
        desktop: "1024px",
      },

      // === TIPOGRAFÍA ===
      fontFamily: {
        sans:  ["var(--font-sans)", "Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        h1:    ["2.5rem",   { lineHeight: "1.2", fontWeight: "700" }],
        h2:    ["1.8rem",   { lineHeight: "1.3", fontWeight: "700" }],
        h3:    ["1.3rem",   { lineHeight: "1.4", fontWeight: "600" }],
        body:  ["1rem",     { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      },

      // === BORDES REDONDEADOS ===
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // === ESPACIADO EXTENDIDO ===
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },

      // === SOMBRAS CORPORATIVAS ===
      boxShadow: {
        origen:          "0 4px 20px hsla(var(--bosque) / 0.1)",
        "origen-lg":     "0 10px 40px hsla(var(--bosque) / 0.15)",
        "origen-inner":  "inset 0 2px 4px hsla(var(--bosque) / 0.06)",
        subtle:          "0 2px 8px hsla(var(--bosque) / 0.08)",
        "card-hover":    "0 20px 30px hsla(var(--bosque) / 0.15)",
        "menta-glow":    "0 0 8px hsl(var(--menta))",
        "menta-glow-lg": "0 2px 8px hsla(var(--menta) / 0.4)",
      },

      // === GRADIENTES ===
      backgroundImage: {
        "gradient-origen": "linear-gradient(135deg, hsl(var(--bosque)) 0%, hsl(var(--pino)) 50%, hsl(var(--pradera)) 100%)",
        "gradient-menta":  "linear-gradient(135deg, hsl(var(--menta)) 0%, hsl(var(--hoja)) 100%)",
        "gradient-crema":  "linear-gradient(135deg, hsl(var(--crema)) 0%, #FFFFFF 100%)",
      },

      // === ANIMACIONES ===
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        "card-hover": {
          "0%":   { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-5px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        float:            "float 3s ease-in-out infinite",
        "pulse-slow":     "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "card-hover":     "card-hover 0.3s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },

      // === TRANSICIONES ===
      transitionProperty: {
        card:     "transform, box-shadow, border-color",
        gradient: "opacity, transform",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
