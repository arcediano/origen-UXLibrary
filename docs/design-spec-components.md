# Design Spec — Migración Compat → UXLibrary Core

**Versión:** 1.0.0  
**Fecha:** 2026-04-04  
**Autor:** Diseñador UX — Origen Platform  
**Estado:** Fuente de verdad para implementación

---

## Paleta de tokens de referencia

| Token | Uso funcional |
|-------|---------------|
| `origen-bosque` | Texto principal, CTA primario, fondo dark |
| `origen-pino` | Hover de bosque, dark secundario |
| `origen-hoja` | Secundario activo, borders marcados |
| `origen-pradera` | Focus ring, checked states, brand accent |
| `origen-menta` | Suave / inline badges, subtle estados |
| `origen-crema` | Fondo de inputs, fondo flat cards |
| `origen-mandarina` | Switch activado, alertas accent |
| `origen-sol` | Alertas warning |
| `origen-cereza` | Estados error/destructive |
| `origen-nube` | Fondo de superficies very light |
| `origen-tierra` | Iconos neutros, bordes cálidos |
| `origen-arena` | Separadores, fondos neutros |
| `origen-oscuro` | Overlays, texto fuerte |
| `origen-pastel` | Fondos de cards flat |
| `surface-DEFAULT` | Fondo de componentes internos |
| `surface-alt` | Fondo alternativo (zebra, hover rows) |
| `surface-raised` | Fondo de panels, modales |
| `border-subtle` | Bordes en reposo de la mayoría de inputs |
| `border-strong` | Bordes activos / hover |
| `text-subtle` | Labels secundarios, placeholders |

**Focus ring global:**
```
focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:outline-none focus-visible:ring-offset-2
```

**Transición global:** `transition-all duration-300`

**Tipografía:** `font-sans` (Manrope / Plus Jakarta Sans vía `--font-sans`)

---

## Tier 1 — Uso en Dashboard + Admin

---

### 1. Card

#### Props interface

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:     "default" | "elevated" | "outline" | "flat" | "organic" | "dark";
  interactive?: boolean;
  padding?:     "none" | "sm" | "md" | "lg";
  hoverEffect?: "none" | "lift" | "glow" | "scale" | "organic";
  selected?:    boolean;
  disabled?:    boolean;
  asChild?:     boolean;
}

interface StatCardProps {
  label:     string;
  value:     string | number;
  trend?:    { value: number; isPositive: boolean };
  icon?:     React.ReactNode;
  variant?:  "default" | "elevated" | "flat";
  loading?:  boolean;
}
```

#### Subcomponentes

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `StatCard`

#### Variantes

| Variante | Fondo | Borde | Sombra |
|----------|-------|-------|--------|
| `default` | `bg-white` | `border border-border-subtle` | `shadow-subtle` |
| `elevated` | `bg-white` | `border border-border-subtle` | `shadow-origen` → `shadow-origen-lg` en hover |
| `outline` | `bg-transparent` | `border-2 border-border-subtle` | ninguna |
| `flat` | `bg-origen-pastel` | ninguno | ninguna |
| `organic` | `bg-white` | `border border-origen-pradera/20` | `shadow-subtle` + decorativos de hoja |
| `dark` | `bg-gradient-origen` | ninguno | `shadow-origen-lg` |

#### Efectos hover

| Efecto | Comportamiento |
|--------|----------------|
| `lift` | `hover:-translate-y-1 transition-transform duration-300` |
| `glow` | `hover:shadow-origen-lg` |
| `scale` | `hover:scale-[1.01]` — sutil, no más de 1.02 |
| `organic` | `hover:shadow-origen hover:border-origen-hoja/40` |

#### Estados

- **hover**: borde pasa de `border-subtle` → `border-strong`; sombra incrementada
- **focus** (interactive card): `focus-visible:ring-2 focus-visible:ring-origen-pradera/45`
- **selected**: `border-origen-hoja border-2` + indicador verde superior (`h-1 bg-origen-hoja rounded-t-xl`)
- **disabled**: `opacity-50 pointer-events-none`
- **loading** (StatCard): skeleton shimmer en value y label con `animate-pulse bg-origen-crema`

#### Desktop vs. Móvil

| Aspecto | Desktop | Móvil |
|---------|---------|-------|
| Padding `sm` | `p-4 sm:p-5` | `p-4` |
| Padding `md` | `p-5 sm:p-6` | `p-5` |
| Padding `lg` | `p-6 sm:p-8` | `p-6` |
| Grid StatCards | 3–4 columnas | 1–2 columnas (`grid-cols-1 sm:grid-cols-2`) |
| Texto CardTitle | `text-base sm:text-lg` | `text-base` |

#### Tokens de color/tamaño clave

```
bg-white / bg-origen-pastel / bg-gradient-origen
border-border-subtle / border-origen-hoja
shadow-subtle / shadow-origen / shadow-origen-lg
rounded-xl (container) / rounded-lg (elementos hijos)
```

#### Accesibilidad

- `interactive` card: papel `role="button"` con `tabIndex={0}` y `onKeyDown` (Enter/Space para click)
- `aria-selected` cuando `selected` es `true`
- `aria-disabled` cuando `disabled` es `true`
- StatCard: `aria-label="[label]: [value]"` para lectores de pantalla
- Contraste de texto en variante `dark`: texto blanco (#FFFFFF) sobre gradient bosque — verificar contraste ≥ 4.5:1

---

### 2. Dialog

#### Props interface

```typescript
interface DialogProps {
  isOpen:               boolean;
  onClose:              () => void;
  title?:               string;
  description?:         string;
  icon?:                React.ReactNode;
  children:             React.ReactNode;
  footer?:              React.ReactNode;
  size?:                "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean;
  className?:           string;
}
```

#### Variantes de tamaño

| Tamaño | Ancho máximo |
|--------|-------------|
| `sm` | `max-w-sm` (384px) |
| `md` | `max-w-md` (448px) — **default** |
| `lg` | `max-w-lg` (512px) |
| `xl` | `max-w-2xl` (672px) |

#### Estados

- **open**: overlay opaco + panel centrado con `animate-in fade-in-0 zoom-in-95 duration-300`
- **close**: `animate-out fade-out-0 zoom-out-95 duration-200`
- **loading** (footer): botón primario en estado `loading` con spinner `Loader2`

#### Desktop vs. Móvil

| Aspecto | Desktop (≥ sm) | Móvil (< sm) |
|---------|---------------|-------------|
| Posición | Centrado verticalmente `flex items-center justify-center` | **Bottom sheet** fijado al fondo |
| Forma | Panel con `rounded-xl` | Panel con `rounded-t-2xl rounded-b-none` |
| Ancho | Limitado por `maxWidth` | `w-full` |
| Animación entrada | `zoom-in-95` desde centro | `slide-in-from-bottom` |
| Handle drag | No | Handle pill visible `w-10 h-1 bg-border-subtle rounded-full mx-auto mb-4` |
| Cierre gesto | No | Swipe down cierra (ver `mobile-patterns.md`) |
| Altura máx. | Sin restricción extra | `max-h-[90dvh] overflow-y-auto` |
| Padding | `p-6` | `p-4 pb-safe` (safe area bottom) |

**Implementación del comportamiento móvil:**  
A `breakpoint < 640px`, el Dialog se renderiza como un bottom sheet. Ver sección completa en [mobile-patterns.md](./mobile-patterns.md#patrón-1-bottom-sheet--dialog-en-móvil).

#### Tokens de color

```
bg-surface-raised (panel)
bg-origen-oscuro/60 backdrop-blur-sm (overlay)
border-border-subtle (borde panel)
shadow-origen-lg
rounded-xl (desktop) / rounded-t-2xl (móvil)
```

#### Accesibilidad

- `role="dialog"` con `aria-modal="true"`
- `aria-labelledby` → id del título
- `aria-describedby` → id de la descripción
- **Focus trap**: Tab/Shift+Tab deben ciclar dentro del dialog
- Al abrir: foco al primer elemento interactivo
- Al cerrar: devolver foco al elemento trigger
- `Escape` siempre cierra el dialog
- Scrollable body con `aria-live="polite"` si hay contenido dinámico

---

### 3. Textarea

#### Props interface

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:        string;
  error?:        string;
  helperText?:   string;
  showCharCount?: boolean;
  autoResize?:   boolean;     // default: true
  success?:      boolean;
  loading?:      boolean;
  icon?:         React.ReactNode;
  variant?:      "default" | "outline" | "filled" | "minimal";
  textareaSize?: "sm" | "md" | "lg";
  tooltip?:      string;
}
```

#### Variantes

| Variante | Fondo | Borde normal | Borde focus |
|----------|-------|-------------|-------------|
| `default` | `bg-white` | `border-origen-pradera/30` | `border-origen-pradera ring-origen-pradera/20` |
| `outline` | `bg-transparent` | `border-border-subtle` | `border-border-strong` |
| `filled` | `bg-surface-alt` | `border-transparent` | `border-origen-pradera` |
| `minimal` | `bg-transparent` | borde solo inferior | borde inferior focus |

#### Tamaños de textarea

| Tamaño | Min Height | Font Size | Padding |
|--------|-----------|-----------|---------|
| `sm` | `min-h-[80px]` | `text-xs sm:text-sm` | `px-3 py-2` |
| `md` | `min-h-[100px]` | `text-sm` | `px-4 py-3` |
| `lg` | `min-h-[140px]` | `text-base` | `px-4 py-3` |

#### Estados

- **hover**: borde `border-origen-hoja`
- **focus**: `border-origen-pradera ring-2 ring-origen-pradera/20` (no usar outline, solo ring)
- **error**: `border-origen-cereza hover:border-red-600 ring-origen-cereza/20` + icono `AlertCircle` debajo
- **success**: `border-green-400` + icono `Check` verde
- **loading**: spinner `Loader2` en esquina superior derecha dentro del campo
- **disabled**: `opacity-50 cursor-not-allowed bg-surface-alt`
- **near-limit** (charCount ≥ 80%): contador en naranja `text-origen-mandarina`
- **at-limit** (charCount = maxLength): contador en rojo `text-origen-cereza`

#### Funcionalidad autoResize

```
// Valor por defecto: true
// Al escribir: recalcular scrollHeight y ajustar height
// Mínimo: definido por textareaSize (min-h-*)
// useLayoutEffect para evitar parpadeo al montar en SSR
```

#### Desktop vs. Móvil

- Tamaño de fuente: `text-sm sm:text-base` para `md`
- `autoResize` es especialmente crítico en móvil — nunca mostrar scroll en el textarea
- En móvil: el input virtual keyboard empuja el viewport; asegurarse que el label queda visible scrollando suavemente

#### Tokens de color

```
bg-white / bg-surface-alt
border-origen-pradera/30 (rest) → border-origen-pradera (focus)
border-origen-cereza (error)
ring-origen-pradera/20
text-text-subtle (placeholder)
```

#### Accesibilidad

- `id` generado con `React.useId()` si no se provee
- `aria-describedby` referencia tanto `errorId` como `helperId` simultáneamente
- `aria-invalid="true"` cuando `error` está definido
- `aria-required` cuando `required` es `true`
- Char count container: `role="status" aria-live="polite"` para anunciar a screen readers
- Label asociado con `htmlFor` siempre presente cuando `label` se provee

---

### 4. Avatar

#### Props interface

```typescript
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?:         string;
  alt?:         string;
  fallback?:    React.ReactNode;
  size?:        "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?:       "circle" | "rounded" | "square";
  status?:      "online" | "offline" | "away" | "busy" | "verified";
  bordered?:    boolean;
  borderColor?: string;
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?:     number;          // default: 3
  spacing?: "tight" | "normal" | "loose";
  size?:    "xs" | "sm" | "md" | "lg" | "xl";
}
```

#### Subcomponentes

`Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`

#### Tamaños

| Size | Dimensiones | Font fallback |
|------|-------------|---------------|
| `xs` | `w-6 h-6` (24px) | `text-xs` |
| `sm` | `w-8 h-8` (32px) | `text-xs` |
| `md` | `w-10 h-10` (40px) | `text-sm` |
| `lg` | `w-12 h-12` (48px) | `text-sm` |
| `xl` | `w-16 h-16` (64px) | `text-base` |
| `2xl` | `w-20 h-20` (80px) | `text-lg` |

> ⚠️ Los tamaños `xs` y `sm` **no** cumplen el touch target de 44px por sí mismos. Deben wrapearse en un contenedor de al menos 44×44px si son interactivos.

#### Status indicators

| Status | Color | Icono |
|--------|-------|-------|
| `online` | `bg-green-500` | ninguno |
| `offline` | `bg-muted-foreground` | ninguno |
| `away` | `bg-amber-500` | ninguno |
| `busy` | `bg-red-500` | ninguno |
| `verified` | `bg-origen-pradera` | `CheckCircle` |

Posición del indicator: `absolute bottom-0 right-0`, tamaño proporcional al avatar (20% del diámetro).

#### AvatarGroup

- Los avatares se superponen con spacing negativo: `tight=-space-x-3`, `normal=-space-x-2`, `loose=-space-x-1`
- El contador de exceso (`+N`) utiliza la variante `fallback` en fondo `bg-surface-alt text-text-subtle`
- Z-index: primer avatar en z superior, decrece hacia la derecha

#### Estados

- **imagen cargando**: fallback visible + `animate-pulse`
- **imagen error**: fallback con inicial del `alt` o el `fallback` custom
- **bordered**: `ring-2 ring-white ring-offset-1`

#### Tokens de color

```
bg-origen-pradera/15 (fallback default)
text-origen-pradera (texto fallback)
bg-surface-alt (grupo overflow badge)
ring-white ring-offset-1 (bordered)
```

#### Accesibilidad

- `<img>` siempre con `alt` (puede ser vacío `""` si es decorativo)
- Status con `aria-label="Estado: online"` en el indicador
- AvatarGroup: `aria-label="[N] participantes"` en el contenedor

---

### 5. Checkbox

#### Props interface

```typescript
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'checked' | 'onChange'> {
  variant?:        "seed" | "leaf" | "forest" | "accent";
  size?:           "sm" | "md" | "lg";
  hasError?:       boolean;
  checked?:        boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

interface CheckboxWithLabelProps extends Omit<CheckboxProps, 'hasError'> {
  label?:         string;
  description?:   string;
  errorMessage?:  string;
  labelPosition?: "right" | "left";
}

interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?:      string;
  description?: string;
  error?:       string;
  layout?:      "vertical" | "horizontal" | "grid";
}
```

#### Variantes

| Variante | Borde reposo | Checked background | Checked hover |
|----------|-------------|-------------------|---------------|
| `seed` | `border-origen-pradera/50` | `bg-origen-pradera` | `bg-origen-hoja` |
| `leaf` | `border-origen-hoja/50` | `bg-origen-hoja` | `bg-origen-bosque` |
| `forest` | `border-origen-bosque/50` | `bg-origen-bosque` | `bg-origen-pino` |
| `accent` | `border-origen-mandarina/50` | `bg-origen-mandarina` | `bg-amber-600` |

#### Tamaños

| Size | Dimensiones | Touch area |
|------|-------------|-----------|
| `sm` | `w-4 h-4` | wrapper `min-w-[44px] min-h-[44px] flex items-center justify-center` |
| `md` | `w-5 h-5` | wrapper `min-w-[44px] min-h-[44px]` |
| `lg` | `w-6 h-6` | wrapper `min-w-[44px] min-h-[44px]` |

**Los tamaños visuales son menores de 44px, pero el área táctil siempre se extiende a 44×44px mínimo mediante padding en el wrapper.**

#### Estados

- **unchecked**: fondo blanco, borde sutil según variante
- **checked**: fondo lleno según variante + icono `Check` blanco
- **indeterminate**: fondo lleno + icono `Minus` blanco
- **hover (unchecked)**: fondo `bg-origen-crema/30`, borde más marcado
- **hover (checked)**: color más profundo según variante
- **disabled**: `opacity-50 cursor-not-allowed` — el input real tiene `disabled` attribute
- **error**: `border-red-500` + mensaje debajo en `text-origen-cereza`
- **focus-visible**: `focus-visible:ring-2 focus-visible:ring-origen-pradera/45`

#### Desktop vs. Móvil

- En móvil: wrapper touch area de al menos 44×44px
- `CheckboxGroup` layout horizontal colapsa a vertical en `< sm`
- `labelPosition="right"` es defecto y recomendado para listas en móvil

#### Tokens de color

```
bg-origen-pradera / bg-origen-hoja / bg-origen-bosque / bg-origen-mandarina
border-origen-pradera/50 → border-origen-hoja (hover)
text-origen-cereza (error)
```

#### Accesibilidad

- Input real de tipo `checkbox` siempre en el DOM (puede ser `sr-only` si el visual es custom)
- `aria-checked="mixed"` cuando `indeterminate`
- `aria-invalid="true"` cuando `hasError`
- `CheckboxGroup` usa `<fieldset>` + `<legend>` para agrupar semánticamente
- Keyboard: Space activa/desactiva; Tab navega entre checkboxes

---

### 6. Select

#### Props interface

```typescript
interface SelectProps {
  value?:          string;
  defaultValue?:   string;
  onValueChange?:  (value: string) => void;
  placeholder?:    string;
  searchable?:     boolean;
  disabled?:       boolean;
  required?:       boolean;
  name?:           string;
  error?:          string;
  items?:          Array<{ value: string; label: string }>;
  className?:      string;
}
```

#### Subcomponentes

`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`

#### Comportamiento del portal

`SelectContent` se renderiza vía `createPortal` al `document.body` con `position: fixed`. Las coordenadas se calculan de `getBoundingClientRect()` del trigger en cada apertura, y se reposicionan en `scroll` y `resize`.

**Lógica de posicionamiento:**
```
top: triggerRect.bottom + 4    // abajo con gap de 4px
left: triggerRect.left
width: triggerRect.width       // mismo ancho que el trigger
maxHeight: 280px               // scroll interno si más items
```

Si no hay espacio abajo (overflow de viewport), abre hacia arriba.

#### Estados

- **reposo**: border `border-subtle`, chevron `ChevronDown` rotado `0deg`
- **open**: chevron `rotate-180`, borde activo `border-origen-pradera`
- **hover trigger**: `hover:border-border-strong bg-surface-alt`
- **selected item**: `bg-origen-crema/50 text-origen-bosque font-medium` + `Check` a la derecha
- **disabled**: `opacity-50 cursor-not-allowed pointer-events-none`
- **error**: borde rojo + mensaje `text-origen-cereza` debajo
- **searchable**: campo de búsqueda interno al top del dropdown con `Search` icon

#### Desktop vs. Móvil

| Aspecto | Desktop (≥ sm) | Móvil (< sm) |
|---------|---------------|-------------|
| Dropdown | Portal flotante posicionado | **Action Sheet** desde abajo (full-width) |
| Ancho | Igual al trigger | 100% viewport width |
| Posición | `fixed` calculado desde trigger | `fixed bottom-0 inset-x-0` |
| Animación | `fade-in + zoom-in-95` | `slide-in-from-bottom` |
| Cierre | Click fuera o Escape | Swipe down o tap en overlay |
| Handle | No | Handle pill en el top del sheet |
| Max height | 280px con scroll | `max-h-[70dvh]` |
| Búsqueda | Inline en dropdown | En el top del action sheet |

**En móvil, el `<select>` nativo oculto se mantiene para compatibilidad con formularios. El Action Sheet es visual-only sobre él.**

Ver implementación detallada en [mobile-patterns.md](./mobile-patterns.md#patrón-2-action-sheet--select-en-móvil).

#### Navegación por teclado

| Tecla | Acción |
|-------|--------|
| `Enter` / `Space` | Abrir/cerrar dropdown |
| `ArrowDown` | Siguiente item |
| `ArrowUp` | Item anterior |
| `Home` | Primer item |
| `End` | Último item |
| `Escape` | Cerrar sin seleccionar |
| `Tab` | Cerrar y mover foco al siguiente elemento |

#### Tokens de color

```
bg-white (trigger)
border-border-subtle → border-origen-pradera (focus/open)
bg-origen-crema/50 (item selected)
text-origen-cereza (error)
bg-surface-raised (dropdown panel)
shadow-origen (dropdown shadow)
```

#### Accesibilidad

- `role="combobox"` en el trigger con `aria-expanded`, `aria-haspopup="listbox"`
- Listbox con `role="listbox"`, items con `role="option"` y `aria-selected`
- `aria-activedescendant` apunta al item actualmente resaltado
- El input de búsqueda tiene `aria-label="Buscar"`
- `<select>` nativo oculto con `aria-hidden="false"` para formularios

---

## Tier 2 — Solo Dashboard

---

### 7. Alert

#### Props interface

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:    "default" | "success" | "warning" | "error" | "info" | "organic" | "accent";
  dismissible?: boolean;
  onDismiss?:  () => void;
  title?:      string;
  description?: string;
  icon?:       React.ReactNode;
  animate?:    boolean;
  alertSize?:  "sm" | "md" | "lg";
  position?:   "top" | "bottom" | "inline";
}
```

#### Variantes

| Variante | Fondo | Borde izquierdo | Icono | Texto |
|----------|-------|----------------|-------|-------|
| `default` | `bg-surface-alt` | `border-l-4 border-border-strong` | `Info` neutro | `text-foreground` |
| `success` | `bg-green-50` | `border-l-4 border-green-500` | `CheckCircle` verde | `text-green-800` |
| `warning` | `bg-amber-50` | `border-l-4 border-origen-sol` | `AlertTriangle` ámbar | `text-amber-800` |
| `error` | `bg-red-50` | `border-l-4 border-origen-cereza` | `AlertCircle` rojo | `text-red-800` |
| `info` | `bg-blue-50` | `border-l-4 border-blue-400` | `Info` azul | `text-blue-800` |
| `organic` | `bg-origen-crema` | `border-l-4 border-origen-hoja` | `Leaf` verde | `text-origen-bosque` |
| `accent` | `bg-origen-menta/20` | `border-l-4 border-origen-mandarina` | `AlertTriangle` naranja | `text-origen-oscuro` |

#### Tamaños

| Size | Padding | Icono | Font |
|------|---------|-------|------|
| `sm` | `px-3 py-2` | `h-4 w-4` | `text-xs sm:text-sm` |
| `md` | `px-4 py-3` | `h-4 w-4 sm:h-5 sm:w-5` | `text-sm` |
| `lg` | `px-5 py-4` | `h-5 w-5` | `text-base` |

#### Estados

- **visible**: animated opacity 0 → 1 `animate-in fade-in-0 slide-in-from-top-1 duration-300` si `animate=true`
- **dismiss hover**: botón `X` con `hover:bg-black/10 rounded`
- **dismissed**: `display: none` (unmount tras animación de salida)

#### Desktop vs. Móvil

- `position="top"` / `position="bottom"`: `fixed` con `z-50`, ancho `w-full sm:max-w-md` en desktop, full en móvil
- `position="inline"`: `relative` — sin posicionamiento fijo
- Texto title + description apilados en móvil para evitar overflow

#### Tokens de color

Cada variante usa sus propias clases semánticas — ver tabla de variantes arriba.

#### Accesibilidad

- `role="alert"` para errores y warnings (live region asertiva)
- `role="status"` para success e info (live region educada)
- Botón dismiss: `aria-label="Cerrar alerta"`
- La alerta visible no debe perder focus al aparecer; si es dismissible y aparece dinámicamente, no robar el foco

---

### 8. Progress

#### Props interface

```typescript
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?:       number;       // 0–100
  max?:         number;       // default: 100
  showLabel?:   boolean;
  label?:       string;
  variant?:     "seed" | "sprout" | "leaf" | "fruit" | "forest" | "warning";
  size?:        "sm" | "md" | "lg";
  showIcon?:    boolean;
  description?: string;
  animated?:    boolean;      // default: true
}

interface CircularProgressProps {
  value?:      number;
  size?:       number;        // px, default: 64
  strokeWidth?: number;       // default: 6
  showLabel?:  boolean;
  variant?:    "seed" | "sprout" | "leaf" | "fruit" | "forest";
  animated?:   boolean;
}

interface SteppedProgressProps {
  steps:        number;
  currentStep:  number;
  stepLabels?:  string[];
  variant?:     "seed" | "sprout" | "leaf" | "fruit";
  size?:        "sm" | "md" | "lg";
  animated?:    boolean;
}
```

#### Variantes de color

| Variante | Track | Indicator |
|----------|-------|-----------|
| `seed` | `bg-origen-crema` | `bg-origen-pradera` |
| `sprout` | `bg-green-50` | `bg-green-400` |
| `leaf` | `bg-origen-menta/20` | `bg-origen-hoja` |
| `fruit` | `bg-amber-50` | `bg-origen-mandarina` |
| `forest` | `bg-origen-pastel` | `bg-origen-bosque` |
| `warning` | `bg-red-50` | `bg-origen-cereza` |

#### Tamaños de barra

| Size | Altura | Font label |
|------|--------|-----------|
| `sm` | `h-1.5` | `text-xs` |
| `md` | `h-2.5` | `text-sm` |
| `lg` | `h-4` | `text-base` |

#### Animación

- Entrada: `transition-all duration-700 ease-out` en el width del indicator
- `animated=true` por defecto — desactivar con `animated=false` para reducir motion

#### Accesibilidad

- `role="progressbar"` en el track
- `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={max}`
- `aria-valuetext` cuando hay `label` o `description` personalizados
- Respetar `prefers-reduced-motion`: sin transición si media query activa

---

### 9. Table

#### Props interface

```typescript
interface Column<T> {
  key:             string;
  header:          string;
  accessor:        (item: T) => React.ReactNode;
  sortable?:       boolean;
  sortValue?:      (item: T) => string | number;
  className?:      string;
  headerClassName?: string;
  width?:          string;
  hideOnMobile?:   boolean;
}

interface TableProps<T> {
  data:               T[];
  columns:            Column<T>[];
  keyExtractor:       (item: T) => string;
  onRowClick?:        (item: T) => void;
  emptyMessage?:      string;
  loading?:           boolean;
  loadingRows?:       number;
  sortable?:          boolean;
  initialSortColumn?: string;
  initialSortDirection?: "asc" | "desc";
  expandable?:        { renderExpand: (item: T) => React.ReactNode };
}
```

#### Comportamiento de tabla responsive

| Aspecto | Desktop (≥ md) | Móvil (< md) |
|---------|---------------|-------------|
| Layout | Tabla HTML estándar con scroll horizontal | **Card layout**: cada fila = card apilada |
| Columnas ocultas | Todas visibles | `hideOnMobile: true` → ocultadas |
| Ordenación | Headers clicables con iconos | Selector dropdown arriba del listado |
| Filas expandibles | `chevron` en columna izquierda | `chevron` en card abajo |
| Empty state | Celda colspan full width centrada | Card vacía centrada |
| Loading | Skeleton rows con `animate-pulse` | Skeleton cards |
| Scroll | `overflow-x-auto` en wrapper | Sin scroll horizontal (cards adapt) |

**Card layout en móvil:**
```
[Row card]
  Header: valor de la primera columna (título)
  Grid 2 columnas: pares label:valor
  Columnas con hideOnMobile: ocultas
  onRowClick: card completa clickeable
```

#### Estados de filas

- **hover**: `hover:bg-surface-alt transition-colors duration-150`
- **active/selected**: `bg-origen-crema/30`
- **expandida**: row de detalle con `border-t border-border-subtle bg-surface-alt/50`
- **loading skeleton**: `animate-pulse bg-origen-crema rounded h-4 w-full`

#### Tokens de color

```
bg-surface-alt (header row, hover)
border-border-subtle (separadores)
text-origen-bosque font-semibold (datos importantes)
text-text-subtle text-xs (labels en card móvil)
```

#### Accesibilidad

- Elemento `<table role="table">` con `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">`, `<td>`
- Columnas sortables: `<th aria-sort="ascending|descending|none">` + botón interno
- En mobile card layout: `<dl>` + `<dt>` + `<dd>` para mantener semántica dato:valor
- `caption` opcional descriptivo de la tabla para screen readers

---

### 10. Switch

#### Props interface

```typescript
interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?:          boolean;
  defaultChecked?:   boolean;
  onCheckedChange?:  (checked: boolean) => void;
  size?:             "sm" | "md" | "lg";
  thumbColor?:       string;    // default: "bg-white"
  trackColor?:       string;    // default: "bg-border"
  trackCheckedColor?: string;   // default: "bg-origen-mandarina"
  disabled?:         boolean;
}
```

#### Tamaños

| Size | Track | Thumb |
|------|-------|-------|
| `sm` | `w-8 h-4` | `h-3 w-3` |
| `md` | `w-10 h-5` | `h-4 w-4` |
| `lg` | `w-12 h-6` | `h-5 w-5` |

**Touch target**: el botón wrapper debe tener `min-h-[44px] min-w-[44px]` para cumplir HIG. El track visualmente puede ser más pequeño.

#### Estados

- **off**: `bg-border` / thumb `translate-x-0`
- **on**: `bg-origen-mandarina` / thumb translado derecho según tamaño
- **hover off**: `bg-border-strong`
- **hover on**: `bg-amber-500`
- **disabled**: `opacity-50 cursor-not-allowed`
- **focus-visible**: `focus-visible:ring-2 focus-visible:ring-origen-pradera/45`

#### Animación del thumb

`transition-transform duration-200 ease-spring` — sensación táctil natural.

#### Tokens de color

```
bg-border (off) → bg-origen-mandarina (on)
bg-white (thumb)
```

#### Accesibilidad

- `role="switch"` con `aria-checked={isChecked}`
- `aria-label` si no hay label visible adyacente
- Accionable con Space y Enter

---

### 11. Toggle

#### Props interface

```typescript
interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'size'> {
  checked?:          boolean;
  defaultChecked?:   boolean;
  onCheckedChange?:  (checked: boolean) => void;
  variant?:          "leaf" | "seed" | "forest" | "accent";
  toggleSize?:       "sm" | "md" | "lg";
  activeIcon?:       React.ReactNode;
  inactiveIcon?:     React.ReactNode;
  label?:            string;
  description?:      string;
  labelPosition?:    "left" | "right" | "top" | "bottom";
  loading?:          boolean;
  error?:            boolean;
  errorText?:        string;
  required?:         boolean;
}
```

#### Variantes (botón tipo pill)

| Variante | Off background | On background | On text |
|----------|--------------|--------------|---------|
| `leaf` | `bg-surface-alt border border-border-subtle` | `bg-origen-hoja` | `text-white` |
| `seed` | `bg-surface-alt border border-border-subtle` | `bg-origen-pradera` | `text-white` |
| `forest` | `bg-surface-alt border border-border-subtle` | `bg-origen-bosque` | `text-white` |
| `accent` | `bg-surface-alt border border-border-subtle` | `bg-origen-mandarina` | `text-white` |

> **Diferencia semántica Switch vs Toggle:**  
> `Switch` = "on/off" de configuración (accesorio binario).  
> `Toggle` = "activar/desactivar" un filtro o modo (puede estar en grupo).

#### Tamaños

| Size | Padding | Font |
|------|---------|------|
| `sm` | `px-3 py-1.5` | `text-xs` |
| `md` | `px-4 py-2` | `text-sm` |
| `lg` | `px-5 py-2.5` | `text-base` |

Altura mínima siempre `min-h-[44px]` en todos los tamaños.

#### Estados

- **loading**: icono `Loader2 animate-spin` reemplaza al icono activo/inactivo
- **error**: borde rojo y message debajo
- **disabled**: `opacity-50 cursor-not-allowed`
- **focus-visible**: ring estándar

#### Accesibilidad

- `role="button"` con `aria-pressed={isChecked}`
- En grupo: `role="group"` con `aria-label` en el contenedor

---

### 12. Sheet

#### Props interface

```typescript
interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> {
  showClose?:    boolean;
  closeClassName?: string;
}

// side variants
type SheetSide = "top" | "bottom" | "left" | "right";
```

#### Subcomponentes

`Sheet` (Root), `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`

#### Variantes de lado

| Side | Posición | Animación entrada | Ancho/Alto |
|------|----------|-----------------|-----------|
| `left` | izquierda | `slide-in-from-left` | `w-[85vw] sm:max-w-sm` |
| `right` | derecha | `slide-in-from-right` | `w-[85vw] sm:max-w-sm` |
| `top` | arriba | `slide-in-from-top` | `inset-x-0` |
| `bottom` | abajo | `slide-in-from-bottom` | `inset-x-0` |

#### Desktop vs. Móvil

| Aspecto | Desktop | Móvil |
|---------|---------|-------|
| Side `left`/`right` ancho | `sm:max-w-sm` (384px) | `85vw` |
| Overlay | `bg-origen-oscuro/60 backdrop-blur-sm` | igual |
| Cierre | click overlay / botón X | swipe en dirección opuesta al origen + overlay tap |
| Padding | `p-6` | `p-4` |
| Close button | `top-4 right-4` absoluto | misma posición, `min-h-[44px] min-w-[44px]` |

#### Estados

- **open**: `data-[state=open]:duration-500`
- **close**: `data-[state=closed]:duration-300`
- Overlay animado independientemente del panel

#### Tokens de color

```
bg-white (panel)
bg-origen-oscuro/60 backdrop-blur-sm (overlay)
border-r / border-l / border-t / border-b en border-subtle
shadow-lg
p-4 sm:p-6
```

#### Accesibilidad

- `role="dialog"` (Radix lo gestiona)
- `aria-labelledby` → SheetTitle id
- `aria-describedby` → SheetDescription id
- Focus trap automático (Radix Dialog)
- Escape cierra el sheet
- `aria-label` en botón de cierre: "Cerrar panel"

---

### 13. Pagination

#### Props interface

```typescript
interface PaginationProps {
  currentPage:  number;
  totalPages:   number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;    // default: true
  className?:   string;
}
```

#### Layout

```
[ < Anterior ]  [ 1 / 24 ]  [ Siguiente > ]
```

En tablas con muchas páginas (> 10), considerar variante expandida con números de página directos (no implementada en compat — extensión futura).

#### Estados de botones

- **disabled anterior**: `currentPage === 1` → `disabled opacity-50`
- **disabled siguiente**: `currentPage === totalPages` → `disabled opacity-50`
- **hover**: `hover:border-origen-pradera`

#### Touch targets

Botones `h-11 w-11` en móvil (44×44px), `h-10 w-10` en desktop.

#### Tokens de color

```
bg-surface-alt rounded-lg border border-border (info panel)
text-origen-bosque font-medium (página actual)
text-muted-foreground (total)
border-2 hover:border-origen-pradera (botones)
```

#### Accesibilidad

- `nav` con `aria-label="Navegación de páginas"`
- Botones con `aria-label="Página anterior"` / `"Página siguiente"`
- Info panel con `aria-current="page"` o texto descriptivo con `aria-live="polite"` si cambia dinámicamente

---

## Tier 3 — Commerce-Specific

---

### 14. TagsInput

#### Props interface

```typescript
interface TagsInputProps {
  value:        string[];
  onChange:     (tags: string[]) => void;
  placeholder?: string;
  label?:       string;
  helperText?:  string;
  error?:       string;
  tooltip?:     string;
  maxTags?:     number;       // default: 10
  suggestions?: string[];
  required?:    boolean;
  className?:   string;
}
```

#### Comportamiento

- **Agregar tag**: Enter, coma (`,`) o espacio mientras escribe
- **Eliminar tag**: botón `×` en cada tag; Backspace elimina el último si input vacío
- **Sugerencias**: dropdown bajo el input cuando `suggestions` no vacío y hay texto escrito; filtrado case-insensitive
- **Límite**: al llegar a `maxTags`, input se deshabilita + mensaje `"Máximo N etiquetas"`

#### Diseño de tags

```
Tag chip: bg-origen-pradera/10 text-origen-bosque border border-origen-pradera/20 rounded-full px-2.5 py-0.5 text-sm
Tag ×: ml-1 text-origen-pradera/60 hover:text-origen-cereza transition-colors
```

#### Área de input

```
Contenedor: border border-border-subtle rounded-xl p-2 flex flex-wrap gap-1.5 min-h-[44px]
  → focus-within: border-origen-pradera ring-2 ring-origen-pradera/20
Input: inline flex-1 min-w-[120px] outline-none text-sm bg-transparent
Sugerencias dropdown: shadow-origen rounded-xl border border-border-subtle bg-white py-1
  Item: px-3 py-2 hover:bg-origen-crema/50 cursor-pointer text-sm
```

#### Estados

- **error**: borde rojo en el contenedor + mensaje debajo
- **disabled**: `opacity-50 pointer-events-none`
- **max alcanzado**: input `disabled` visualmente, mensaje informativo

#### Accesibilidad

- Contenedor con `role="group"` y `aria-labelledby`
- Input: `aria-describedby` hacia error/helper + `aria-autocomplete="list"` si hay sugerencias
- Cada tag: `role="listitem"` con botón delete `aria-label="Eliminar etiqueta [valor]"`
- Dropdown sugerencias: `role="listbox"` con items `role="option"`

---

### 15. CurrencyInput

#### Props interface

```typescript
interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  value:                 number;
  onChange:              (value: number) => void;
  label?:                string;
  error?:                string;
  helperText?:           string;
  tooltip?:              string;
  min?:                  number;        // default: 0
  max?:                  number;
  maxIntegerDigits?:     number;        // default: 15
  showThousandSeparator?: boolean;
  required?:             boolean;
  inputSize?:            "sm" | "md" | "lg";
}
```

#### Formato de display

- En reposo (blur): `1.234,56 €` (separador de miles `.`, decimal `,`, símbolo `€` sufijo)
- En focus: `1234,56` (sin separador de miles para edición limpia)
- Icono `Euro` en el lado izquierdo del input, `text-text-subtle`

#### Validaciones inline

- Dígitos enteros máximos: `maxIntegerDigits` (default 15) — no permite ingresar más
- `min` / `max`: validación al `blur`, no al escribir (para no interrumpir)
- Mensaje de error debajo si fuera de rango

#### Tamaños

| Size | Altura | Font | Padding |
|------|--------|------|---------|
| `sm` | `h-9` | `text-sm` | `pl-8 pr-3` (espacio para icono) |
| `md` | `h-11` | `text-base` | `pl-10 pr-4` |
| `lg` | `h-12` | `text-lg` | `pl-12 pr-4` |

**Min height `md` = 44px (cumple touch target).**

#### Tokens de color

```
bg-white border border-border-subtle rounded-xl
focus: border-origen-pradera ring-2 ring-origen-pradera/20
error: border-origen-cereza
text-text-subtle (icono Euro en reposo)
text-origen-bosque (icono Euro en focus)
```

#### Accesibilidad

- `inputmode="decimal"` en el `<input>` para teclado numérico en móvil
- `type="text"` (no `number`) para control de formato
- `aria-label` incluye "importe en euros" si no hay label visible
- `aria-describedby` → error/helper

---

### 16. PercentageInput

#### Props interface

```typescript
interface PercentageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value:        number;       // 0–100
  onChange:     (value: number) => void;
  label?:       string;
  error?:       string;
  helperText?:  string;
  min?:         number;       // default: 0
  max?:         number;       // default: 100
  step?:        number;       // default: 1
  inputSize?:   "sm" | "md" | "lg";
  required?:    boolean;
}
```

#### Diseño

- Sufijo `%` visible dentro del input (lado derecho)
- Sin icono prefijo — el `%` es suficiente indicador
- Validación: no permitir < `min` ni > `max` al blur

#### Experiencia de edición

- `inputmode="decimal"` para teclado numérico en móvil
- Al limpiar campo y escribir, permitir campo vacío temporalmente (mapear a `0` al blur si vacío)
- No admitir caracteres no numéricos (excepto el separador decimal)

#### Tokens de color

Idénticos a `CurrencyInput` — misma familia visual.

#### Accesibilidad

- `aria-label` incluye "porcentaje" si no hay label visible
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (si se usa como control deslizante semántico)

---

### 17. ProductImage

#### Props interface

```typescript
interface ProductImageProps {
  src?:      string | null;
  alt:       string;
  className?: string;
  fallback?: React.ReactNode;     // default: icono Package
}
```

#### Comportamiento

El componente es deliberadamente **sin tamaño propio** — el contenedor padre define width/height. ProductImage solo gestiona `qué` renderizar.

| Escenario | Comportamiento |
|-----------|---------------|
| `src` ausente/null | Fallback inmediato |
| Imagen cargando | Skeleton shimmer `animate-pulse bg-origen-crema` en el contenedor padre (responabilidad del padre) |
| Error de carga (404, red) | Transición a fallback; `onError` activa automáticamente |
| Carga correcta | `<img>` con `object-cover w-full h-full` |

#### Fallback por defecto

```
centered flex items-center justify-center bg-origen-crema
  <Package className="text-text-subtle" style={{ width: '40%', height: '40%', maxWidth: 48 }} />
```

#### Recomendaciones de contenedor

```tsx
// Thumbnail tabla (32×32)
<div className="w-8 h-8 rounded-lg overflow-hidden bg-origen-crema">
  <ProductImage src={url} alt={name} />
</div>

// Imagen principal (aspect-square)
<div className="aspect-square rounded-xl overflow-hidden bg-origen-crema">
  <ProductImage src={url} alt={name} />
</div>

// Avatar de producto (variante circular)
<div className="w-12 h-12 rounded-full overflow-hidden bg-origen-crema ring-2 ring-white">
  <ProductImage src={url} alt={name} />
</div>
```

#### Accesibilidad

- `alt` es **requerido** (no opcional en la interfaz)
- Si la imagen es decorativa (ya existe descripción textual adyacente), pasar `alt=""`
- No usar `role="img"` en el wrapper — el `<img>` lo gestiona solo

---

## Convenciones globales de implementación

### Composición de clases

Usar `cn()` (utility de `clsx` + `tailwind-merge`) para todas las clases condicionales. Nunca concatenar strings manualmente.

```typescript
import { cn } from '../../lib/utils';

className={cn(
  "base-classes",
  variant === "default" && "variant-classes",
  disabled && "disabled-classes",
  className  // siempre al final para permitir override
)}
```

### Controlled vs Uncontrolled

Todos los componentes de formulario deben soportar ambos modos:
- **Controlled**: `value` + `onChange/onCheckedChange/onValueChange`
- **Uncontrolled**: `defaultValue` + `defaultChecked`
- Detectar via `value !== undefined`

### Forwarding de refs

Todos los componentes que renderizan un elemento DOM interactivo deben usar `React.forwardRef`.

### Naming en exports

```typescript
// Named exports (no default exports)
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
```

### Estructura de archivos en core

```
src/components/atoms/
  Card/
    index.ts          ← re-export limpio
    Card.tsx          ← componente principal
    Card.types.ts     ← interfaces y tipos
    Card.stories.tsx  ← storybook
    Card.test.tsx     ← tests unitarios
```

---

## Checklist de implementación por componente

Antes de considerar un componente como "promovido" al core:

- [ ] Props interface exportada con `export type`
- [ ] Soporte controlled + uncontrolled
- [ ] `React.forwardRef` aplicado
- [ ] Estados: hover, focus-visible, disabled, error
- [ ] Touch targets ≥ 44×44px en móvil
- [ ] Comportamiento adaptado a móvil (si aplica)
- [ ] Focus ring estándar `ring-origen-pradera/45`
- [ ] `aria-*` y `role` correctos
- [ ] `cn()` para clases condicionales
- [ ] `className` prop al final para override
- [ ] Export en `src/index.ts`
- [ ] Story en Storybook con todas las variantes
- [ ] Test unitario básico (render + variants)
