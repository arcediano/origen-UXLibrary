/**
 * @file tokens.ts
 * @description Design token constants — Origen "Bosque Comercial" v5.0
 *
 * CUÁNDO USAR ESTE MÓDULO:
 *   - Gráficas/Canvas que necesitan valores de color como strings
 *   - Estilos inline en React (`style={{ color: colors.bosque }}`)
 *   - Storybook decorators o documentación
 *   - Utilidades que generan clases dinámicas
 *
 * PARA PROYECTOS TAILWIND:
 *   Usa `@arcediano/ux-library/tailwind.config` como preset en su lugar.
 *
 * PARA CSS GLOBAL:
 *   Importa `@arcediano/ux-library/styles` para las custom properties.
 */

// ─── Valores HSL raw (canal-only, e.g. "156 46% 24%") ──────────────────────
// Coinciden exactamente con las CSS custom properties definidas en tokens.css
export const rawColors = {
  // Primarios "Bosque Comercial"
  bosque:       '156 46% 24%',
  pino:         '156 40% 33%',
  hoja:         '155 38% 41%',
  pradera:      '156 49% 63%',
  menta:        '31 70% 62%',
  crema:        '42 52% 97%',
  mandarina:    '34 92% 60%',
  oscuro:       '158 40% 11%',
  pastel:       '152 52% 92%',
  // Extendidos comerciales
  sol:          '45 95% 56%',
  cereza:       '352 72% 58%',
  nube:         '150 35% 98%',
  tierra:       '156 40% 33%',
  arena:        '31 70% 62%',
  textoSuave:   '155 16% 46%',
  // Hover states
  hoverBosque:  '156 48% 19%',
  hoverPradera: '156 46% 56%',
  hoverMenta:   '31 64% 54%',
  hoverTierra:  '156 37% 28%',
} as const;

// ─── Referencias CSS var (para inline styles o theme()) ─────────────────────
export const colors = {
  // Paleta de marca
  bosque:       'hsl(var(--bosque))',
  pino:         'hsl(var(--pino))',
  hoja:         'hsl(var(--hoja))',
  pradera:      'hsl(var(--pradera))',
  menta:        'hsl(var(--menta))',
  crema:        'hsl(var(--crema))',
  mandarina:    'hsl(var(--mandarina))',
  oscuro:       'hsl(var(--oscuro))',
  pastel:       'hsl(var(--pastel))',
  sol:          'hsl(var(--sol))',
  cereza:       'hsl(var(--cereza))',
  nube:         'hsl(var(--nube))',
  tierra:       'hsl(var(--tierra))',
  arena:        'hsl(var(--arena))',
  // Hover
  hoverBosque:  'hsl(var(--hover-bosque))',
  hoverPradera: 'hsl(var(--hover-pradera))',
  hoverMenta:   'hsl(var(--hover-menta))',
  hoverTierra:  'hsl(var(--hover-tierra))',
  // Superficies semánticas
  surface:        'hsl(var(--surface))',
  surfaceAlt:     'hsl(var(--surface-alt))',
  surfaceRaised:  'hsl(var(--surface-raised))',
  // Bordes semánticos
  borderSubtle:   'hsl(var(--border-subtle))',
  borderStrong:   'hsl(var(--border-strong))',
  // Texto semántico
  textSubtle:     'hsl(var(--text-subtle))',
  textDisabled:   'hsl(var(--text-disabled))',
  // Sistema (shadcn compatible)
  background:  'hsl(var(--background))',
  foreground:  'hsl(var(--foreground))',
  primary:     'hsl(var(--primary))',
  secondary:   'hsl(var(--secondary))',
  destructive: 'hsl(var(--destructive))',
  // Feedback (valores fijos — no dependen de CSS vars)
  feedbackDanger:        'hsl(0 84% 60%)',
  feedbackDangerSubtle:  'hsl(0 86% 97%)',
  feedbackDangerText:    'hsl(0 72% 42%)',
  feedbackDangerBorder:  'hsl(0 84% 60% / 0.3)',
} as const;

// ─── Sombras ─────────────────────────────────────────────────────────────────
export const shadows = {
  origen:      '0 4px 20px hsla(var(--bosque) / 0.1)',
  origenLg:    '0 10px 40px hsla(var(--bosque) / 0.15)',
  origenInner: 'inset 0 2px 4px hsla(var(--bosque) / 0.06)',
  subtle:      '0 2px 8px hsla(var(--bosque) / 0.08)',
  cardHover:   '0 20px 30px hsla(var(--bosque) / 0.15)',
  mentaGlow:   '0 0 8px hsl(var(--menta))',
  mentaGlowLg: '0 2px 8px hsla(var(--menta) / 0.4)',
} as const;

// ─── Gradientes ──────────────────────────────────────────────────────────────
export const gradients = {
  origen: 'linear-gradient(135deg, hsl(var(--bosque)) 0%, hsl(var(--pino)) 50%, hsl(var(--pradera)) 100%)',
  menta:  'linear-gradient(135deg, hsl(var(--menta)) 0%, hsl(var(--hoja)) 100%)',
  crema:  'linear-gradient(135deg, hsl(var(--crema)) 0%, #FFFFFF 100%)',
} as const;

// ─── Tipografía ───────────────────────────────────────────────────────────────
export const typography = {
  fontSans:  '"Manrope", "Plus Jakarta Sans", "Avenir Next", "Segoe UI", sans-serif',
  fontSerif: '"Fraunces", "Iowan Old Style", "Palatino Linotype", serif',
  weight: {
    medium:   500,
    semibold: 600,
    bold:     700,
  },
} as const;

// ─── Radio de borde ───────────────────────────────────────────────────────────
export const radius = {
  base: '0.5rem',
  md:   '0.375rem',
  sm:   '0.25rem',
} as const;

// ─── Objeto unificado (para quienes prefieren un único import) ───────────────
export const tokens = {
  colors,
  rawColors,
  shadows,
  gradients,
  typography,
  radius,
} as const;

// ─── Tipos derivados ──────────────────────────────────────────────────────────
export type ColorToken    = keyof typeof colors;
export type RawColorToken = keyof typeof rawColors;
export type ShadowToken   = keyof typeof shadows;
export type GradientToken = keyof typeof gradients;
