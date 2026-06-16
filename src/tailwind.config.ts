import type { Config } from "tailwindcss";

/**
 * Tailwind CSS para Origen UX Library
 * Paleta de colores oficial - Manual de Marca v5.0 "Bosque Comercial"
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
  content: ["./**/*.{ts,tsx}", "../.storybook/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // === PALETA OFICIAL - ORIGEN v5.0 "BOSQUE COMERCIAL" ===
      colors: {
        origen: {
          bosque:  "hsl(var(--bosque))",
          pino:    "hsl(var(--pino))",
          hoja:    "hsl(var(--hoja))",
          pradera: "hsl(var(--pradera))",
          menta:   "hsl(var(--menta))",
          crema:   "hsl(var(--crema))",
          oscuro:  "hsl(var(--oscuro))",
          pastel:  "hsl(var(--pastel))",
          mandarina: "hsl(var(--mandarina))",
          sol: "hsl(var(--sol))",
          cereza: "hsl(var(--cereza))",
          nube: "hsl(var(--nube))",
          tierra: "hsl(var(--tierra))",
          arena: "hsl(var(--arena))",
          "texto-suave": "hsl(var(--texto-suave))",
        },
        hover: {
          bosque:  "hsl(var(--hover-bosque))",
          pradera: "hsl(var(--hover-pradera))",
          menta:   "hsl(var(--hover-menta))",
          tierra:  "hsl(var(--hover-tierra))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          alt: "hsl(var(--surface-alt))",
          raised: "hsl(var(--surface-raised))",
        },
        "border-subtle": "hsl(var(--border-subtle))",
        "border-strong": "hsl(var(--border-strong))",
        "text-subtle": "hsl(var(--text-subtle))",
        "text-disabled": "hsl(var(--text-disabled))",
        // === FEEDBACK TOKENS (sincronizados con proyectos consumidores) ===
        feedback: {
          "success":        "hsl(var(--hoja))",
          "success-subtle": "hsl(var(--pastel))",
          "success-text":   "hsl(var(--hoja))",
          "danger":         "#ef4444",
          "danger-subtle":  "#fef2f2",
          "danger-text":    "#b91c1c",
          "danger-border":  "rgba(239,68,68,0.55)",
          "warning":        "#d97706",
          "warning-subtle": "#fffbeb",
          "warning-text":   "#92400e",
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
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      fontSize: {
        h1: ["var(--fs-h1)", { lineHeight: "var(--lh-tight)", fontWeight: "var(--fw-bold)", letterSpacing: "-0.02em" }],
        h2: ["var(--fs-h2)", { lineHeight: "var(--lh-heading)", fontWeight: "var(--fw-bold)", letterSpacing: "-0.015em" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--lh-heading)", fontWeight: "var(--fw-semibold)", letterSpacing: "-0.01em" }],
        body: ["var(--fs-body)", { lineHeight: "var(--lh-body)", fontWeight: "var(--fw-medium)" }],
        small: ["var(--fs-small)", { lineHeight: "var(--lh-body)", fontWeight: "var(--fw-medium)" }],
        micro: ["var(--fs-micro)", { lineHeight: "var(--lh-body)", fontWeight: "var(--fw-medium)" }],
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
