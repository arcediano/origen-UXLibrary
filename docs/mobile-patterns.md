# Mobile Patterns — Origen UXLibrary

**Versión:** 1.0.0  
**Fecha:** 2026-04-04  
**Autor:** Diseñador UX — Origen Platform  
**Estado:** Fuente de verdad para patrones mobile-native

---

## Introducción

Este documento define los patrones de interacción mobile-native que deben implementarse en la librería `origen-UXLibrary`. Los patrones aquí descritos se aplican principalmente a:

- **Dialog en móvil** → Bottom Sheet
- **Select en móvil** → Action Sheet
- Sheet como drawer lateral con gesture de cierre
- Touch targets y áreas táctiles

**Principio rector:** En móvil, los patrones deben sentirse *nativos de la plataforma*. Un usuario de iOS debe reconocer el bottom sheet; un usuario de Android debe reconocer el action sheet. No se trata de "adaptar el desktop a pantalla pequeña" sino de diseñar para la interacción táctil desde el inicio.

---

## Patrón 1: Bottom Sheet — Dialog en Móvil

### Cuándo se usa

El componente `Dialog` renderiza como bottom sheet cuando el viewport es **< 640px** (`sm` breakpoint de Tailwind / 640px).

### Anatomía visual

```
┌─────────────────────────────────────┐
│              OVERLAY                │
│           (semi-opaco)              │
│                                     │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║  ▬▬▬▬▬  ← handle pill        ║  │
│  ╠═══════════════════════════════╣  │
│  ║  Título del Dialog            ║  │
│  ║  Descripción opcional         ║  │
│  ╠═══════════════════════════════╣  │
│  ║                               ║  │
│  ║  Contenido scrollable         ║  │
│  ║                               ║  │
│  ╠═══════════════════════════════╣  │
│  ║  [ Cancelar ]  [ Confirmar ]  ║  │
└──╚══════════════════════════════╝───┘
                                  ↑ safe area bottom
```

### Especificaciones de diseño

#### Handle pill

```
w-10 h-1 bg-border-subtle rounded-full mx-auto mt-2 mb-4
```

El handle es puramente visual — indica que el componente es deslizable. No requiere ningún evento de click.

#### Panel bottom sheet

```css
/* Posición y geometría */
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 50;

/* Forma */
border-radius: 1.25rem 1.25rem 0 0;   /* rounded-t-2xl */
border-bottom-left-radius: 0;
border-bottom-right-radius: 0;

/* Tamaño */
max-height: 90dvh;                     /* dvh para respetar virtual keyboard */
overflow-y: auto;

/* Fondo */
background: hsl(var(--surface-raised));

/* Padding con safe area */
padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
/* Tailwind: p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] */
```

#### Scroll interno

Cuando el contenido excede `max-height: 90dvh`, el área de contenido (entre header y footer) debe ser scrollable, **no** el panel completo:

```
Panel (fixed)
  └─ Handle pill (fixed height)
  └─ Header (fixed height)
  └─ Content (overflow-y: auto, flex-1)
  └─ Footer (fixed height)
```

Usar `flex flex-col` en el panel y `overflow-y-auto` solo en el content wrapper.

### Overlay

```css
position: fixed;
inset: 0;
background: hsla(var(--oscuro), 0.6);
backdrop-filter: blur(2px);
z-index: 49;   /* un nivel por debajo del panel */
```

### Animación de entrada y salida

#### Entrada (open)

```css
animation: bottomSheetIn 350ms cubic-bezier(0.32, 0.72, 0, 1) forwards;

@keyframes bottomSheetIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

Equivalente Tailwind con `tailwindcss-animate`:
```
data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:duration-350
```

#### Salida (close)

```css
animation: bottomSheetOut 250ms cubic-bezier(0.32, 0.72, 0, 1) forwards;

@keyframes bottomSheetOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}
```

**La curva `cubic-bezier(0.32, 0.72, 0, 1)` es la curva spring recomendada** — rápida al inicio, suave al final, sensación táctil natural similar a iOS.

#### Overlay

- Entrada: `fade-in` con `duration-300`
- Salida: `fade-out` con `duration-250` en sincronía con el panel

### Gesto swipe-down para cerrar

#### Implementación con touch events

```typescript
// Hook useDragToClose
function useDragToClose(onClose: () => void, threshold = 100) {
  const startY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent, panelRef: React.RefObject<HTMLDivElement>) => {
    if (!isDragging.current || !panelRef.current) return;
    const deltaY = e.touches[0].clientY - startY.current;
    if (deltaY > 0) {
      // Solo permitir arrastre hacia abajo (positivo)
      panelRef.current.style.transform = `translateY(${deltaY}px)`;
      panelRef.current.style.transition = 'none';
      // Oscurecer overlay progresivamente
      const progress = Math.min(deltaY / threshold, 1);
      // opacity overlay: 0.6 * (1 - progress)
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, panelRef: React.RefObject<HTMLDivElement>) => {
    if (!isDragging.current || !panelRef.current) return;
    isDragging.current = false;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    if (deltaY > threshold) {
      // Supera umbral → cerrar con animación
      onClose();
    } else {
      // No supera umbral → snap back al origen
      panelRef.current.style.transform = 'translateY(0)';
      panelRef.current.style.transition = 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)';
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
```

#### Área de drag

El gesto se registra **únicamente en el handle pill y en el header** del bottom sheet, no en el área de contenido scrollable (para evitar conflicto con el scroll vertical del contenido).

```typescript
// El handle y header tienen los listeners touch
// El content área NO los tiene (scroll propio)
<div
  onTouchStart={handleTouchStart}
  onTouchMove={(e) => handleTouchMove(e, panelRef)}
  onTouchEnd={(e) => handleTouchEnd(e, panelRef)}
>
  <HandlePill />
  <SheetHeader />
</div>
<div className="overflow-y-auto flex-1">
  {children}
</div>
```

#### Umbral de cierre

- **Umbral mínimo**: 100px de desplazamiento vertical
- **O velocidad**: si la velocidad de swipe > 500px/s al soltar, cerrar aunque no alcance 100px

### Clases Tailwind finales (Bottom Sheet)

```tsx
// Panel
"fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-[90dvh] bg-surface-raised rounded-t-2xl shadow-origen-lg overflow-hidden"

// Handle
"w-10 h-1 bg-border-subtle rounded-full mx-auto mt-3 mb-1 shrink-0"

// Overlay
"fixed inset-0 z-49 bg-origen-oscuro/60 backdrop-blur-sm"

// Content área scrollable
"flex-1 overflow-y-auto overscroll-contain px-4 py-4"

// Footer
"shrink-0 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-border-subtle"
```

---

## Patrón 2: Action Sheet — Select en Móvil

### Cuándo se usa

El componente `Select` renderiza su dropdown como Action Sheet cuando el viewport es **< 640px**.

### Diferencia respecto al Bottom Sheet

| Aspecto | Bottom Sheet (Dialog) | Action Sheet (Select) |
|---------|----------------------|----------------------|
| Propósito | Contenido libre / formularios | Lista de opciones para seleccionar |
| Handle | Sí | Sí |
| Título | Sí (del dialog) | Sí (placeholder del select) |
| Footer | Sí (acciones personalizadas) | Botón "Cancelar" fijo |
| Max height | 90dvh | 70dvh (lista más corta) |
| Búsqueda | No (salvo contenido custom) | Sí si `searchable: true` |
| Selección | No aplica | Un tap selecciona y cierra |

### Anatomía visual

```
┌─────────────────────────────────────┐
│              OVERLAY                │
│                                     │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║  ▬▬▬▬▬                       ║  │
│  ╠═══════════════════════════════╣  │
│  ║  🔍 Buscar...  (si searchable)║  │
│  ╠═══════════════════════════════╣  │
│  ║  ✓  Opción seleccionada       ║  ← bg-origen-crema/50
│  ╠═══════════════════════════════╣  │
│  ║     Opción 2                  ║  │
│  ╠───────────────────────────────╣  │
│  ║     Opción 3                  ║  │
│  ╠───────────────────────────────╣  │
│  ║     Opción 4                  ║  │
│  ╠═══════════════════════════════╣  │
│  ║        [ Cancelar ]           ║  │
└──╚══════════════════════════════╝───┘
```

### Especificaciones de diseño

#### Items de la lista

```
Cada item: min-h-[52px] flex items-center justify-between px-5 py-3
  Label: text-base text-origen-bosque
  Checkmark (si selected): Check className="h-5 w-5 text-origen-pradera"
  Separadores: border-b border-border-subtle (excepto último item)
```

**Min height de 52px** — más generoso que los 44px mínimos para facilitar el tap en listas largas.

#### Botón Cancelar

```
m-4 w-[calc(100%-2rem)] h-12 rounded-xl
bg-surface-alt text-origen-bosque font-medium text-base
hover:bg-border-subtle active:scale-[0.98]
border border-border-subtle
```

#### Campo de búsqueda (si `searchable`)

```
Posición: sticky top del panel, después del handle
px-4 py-3 border-b border-border-subtle

Input: h-10 w-full bg-surface-alt rounded-lg px-3 pl-9 text-sm
       border border-border-subtle focus:border-origen-pradera
       outline-none
Search icon: left-3 absolute text-text-subtle h-4 w-4
```

### Comportamiento de selección

```
1. Usuario toca un item
2. Haptic feedback (si disponible): navigator.vibrate(30)
3. Item se marca visualmente como selected (transición 150ms)
4. Action sheet cierra con animación de salida (250ms)
5. Trigger del Select muestra el valor seleccionado
```

Para selección inmediata sin delay perceptible, la animación de salida debe iniciarse simultáneamente con la actualización de estado (no esperar a que cierre para actualizar).

### Clases Tailwind finales (Action Sheet)

```tsx
// Panel
"fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-[70dvh] bg-surface-raised rounded-t-2xl shadow-origen-lg overflow-hidden"

// Lista de items (scrollable)
"flex-1 overflow-y-auto overscroll-contain divide-y divide-border-subtle"

// Item individual
"flex items-center justify-between px-5 py-3 min-h-[52px] cursor-pointer active:bg-origen-crema/30 transition-colors duration-150"

// Item selected
"bg-origen-crema/50 text-origen-bosque font-medium"

// Botón cancelar
"mx-4 mb-4 mt-2 h-12 w-[calc(100%-2rem)] rounded-xl bg-surface-alt text-origen-bosque font-medium border border-border-subtle active:scale-[0.98] transition-transform duration-100"
```

---

## Patrón 3: Sheet con Swipe para Cerrar

### Los Sheets laterales (left/right) en móvil

`Sheet` con `side="left"` o `side="right"` ya implementa el comportamiento de drawer. En móvil se añaden los siguientes gestos:

#### Swipe desde el borde de pantalla para abrir (futura mejora)

No implementado en v1 de compat. Se reserva para una segunda iteración.

#### Swipe desde el interior del sheet para cerrar

Similar al gesto del bottom sheet, pero en dirección horizontal:

```typescript
// Swipe left → cierra sheet right
// Swipe right → cierra sheet left

// Umbral: 80px de desplazamiento horizontal
// O velocidad > 500px/s al soltar

const CLOSE_THRESHOLD = 80;

const handleTouchStart = (e: Touch) => {
  startX.current = e.clientX;
};

const handleTouchMove = (e: Touch, side: 'left' | 'right', panelRef) => {
  const deltaX = e.clientX - startX.current;
  // Para side="right": solo responder a deltaX negativo (arrastre → izquierda)
  // Para side="left": solo responder a deltaX positivo (arrastre → derecha)
  const isValidDirection = 
    (side === 'right' && deltaX < 0) ||
    (side === 'left' && deltaX > 0);

  if (isValidDirection) {
    panelRef.style.transform = `translateX(${deltaX}px)`;
    panelRef.style.transition = 'none';
  }
};

const handleTouchEnd = (e: Touch) => {
  if (Math.abs(deltaX) > CLOSE_THRESHOLD) {
    onClose();
  } else {
    // Snap back
    panelRef.style.transform = 'translateX(0)';
    panelRef.style.transition = 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)';
  }
};
```

#### Ancho del Sheet en móvil

```
w-[85vw]   → deja un 15% visible para indicar que hay overlay y facilitar el swipe-to-close
sm:max-w-sm → en desktop vuelve al máximo de 384px
```

El 15% visible también permite al usuario tocar el overlay para cerrar (patrón común y esperado).

---

## Guía de Touch Targets

### Estándares

| Plataforma | Touch target mínimo |
|-----------|-------------------|
| Apple HIG (iOS) | 44×44 pt |
| Material Design (Android) | 48×48 dp |
| WCAG 2.5.5 (AA) | 44×44 px |
| **Origen estándar** | **44×44 px** |

### Implementación en Tailwind

```tsx
// Para elementos visualmente pequeños (íconos, badges, indicators)
// Usar padding para agrandar el área táctil sin cambiar el visual

// Patrón 1: padding en el botón mismo
<button className="p-2.5 -m-2.5">   {/* 10px padding → área 44px para icono 24px */}
  <ChevronRight className="w-5 h-5" />
</button>

// Patrón 2: min-height/width con contenido centrado
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center">
  <Check className="w-4 h-4" />
</button>

// Patrón 3: área táctil extendida con pseudo-elemento (CSS only)
// No usar este patrón en favor de los dos anteriores (más legibles)

// INCORRECTO — área táctil insuficiente en móvil
<button className="p-1">
  <X className="w-4 h-4" />
</button>
```

### Excepciones permitidas

Solo se permiten touch targets menores de 44px cuando:

1. El elemento está en un **grupo de paginación densa** (ej: pagination de números individuales) y los elementos están tan juntos que colectivamente forman un área suficiente.
2. Son **puramente decorativos** y no interactivos (aunque en ese caso no deberían ser botones).
3. El espacio es extremadamente limitado, **pero** se documenta como excepción con `// TODO: touch target < 44px`.

### Tabla de touch targets por componente

| Componente | Elemento | Target actual | ¿Cumple? |
|------------|---------|--------------|---------|
| Button (todos los tamaños) | `<button>` | min `h-11` = 44px | ✅ |
| Checkbox sm | wrapper | `min-h-[44px]` via wrapper | ✅ |
| Switch sm | wrapper | `min-h-[44px]` via wrapper | ✅ |
| Avatar xs (24px) | Si interactivo | wrapper `min-44` | ⚠️ Requiere wrapper |
| Pagination prev/next | `<button>` | `h-11 w-11` en móvil | ✅ |
| Dialog close (X) | `<button>` | `min-h-[44px] min-w-[44px]` | ✅ |
| Sheet close (X) | `<button>` | `min-h-[44px] min-w-[44px]` | ✅ |
| Select trigger | `<button>` | `min-h-[44px]` | ✅ |
| Tag chip × | `<button>` | padding extendido `-m-1 p-1` | ✅ |
| Action sheet item | `<div>` | `min-h-[52px]` | ✅ |

### Espacio entre elementos táctiles

Dejar al menos **8px de espacio** entre targets táctiles adyacentes para evitar activaciones accidentales.

```
// Correcto: gap-2 (8px) entre acciones adyacentes en footer mobile
<div className="flex gap-2">
  <Button variant="outline">Cancelar</Button>
  <Button>Confirmar</Button>
</div>

// Incorrecto: sin gap
<div className="flex">
  <Button variant="outline">Cancelar</Button>
  <Button>Confirmar</Button>
</div>
```

---

## Animaciones recomendadas

### Principios de animación mobile-native

1. **Spring feel**: las curvas de easing deben imitar física de spring, no linear o ease
2. **Duración por tipo de interacción**:
   - Entrada de panel grande (bottom/action sheet): **300–350ms**
   - Salida/dismiss: **200–250ms** (más rápido — no bloquear al usuario)
   - Micro-interacciones (hover, active): **100–150ms**
   - Transiciones de estado (checked, selected): **150–200ms**
3. **No animar simultáneamente** color + posición + opacidad en el mismo elemento — elegir uno o dos
4. **Respetar `prefers-reduced-motion`**: desactivar animaciones de posición; mantener fade

### Curvas de easing recomendadas

```css
/* Spring - entrada de overlays y sheets */
--ease-spring: cubic-bezier(0.32, 0.72, 0, 1);

/* Ease out - salidas y dismiss */
--ease-out-smooth: cubic-bezier(0.16, 1, 0.3, 1);

/* Ease in-out - cambios de estado (toggle, checkbox) */
--ease-state: cubic-bezier(0.4, 0, 0.2, 1);

/* Ease out rápido - micro-interacciones */
--ease-fast: cubic-bezier(0, 0, 0.2, 1);
```

### Tabla de animaciones por componente

| Componente | Animación | Duración | Curva |
|------------|-----------|---------|-------|
| Dialog (desktop) | `zoom-in-95` + `fade-in` | 300ms | spring |
| Dialog (móvil) | `slide-in-from-bottom` | 350ms | spring |
| Dialog close | `zoom-out-95` + `fade-out` | 200ms | ease-out |
| Select dropdown (desktop) | `fade-in` + `zoom-in-95` | 200ms | spring |
| Select action sheet (móvil) | `slide-in-from-bottom` | 300ms | spring |
| Sheet open | `slide-in-from-[side]` | 500ms | spring |
| Sheet close | `slide-out-to-[side]` | 300ms | ease-out |
| Alert appear | `fade-in` + `slide-in-from-top-1` | 300ms | spring |
| Alert dismiss | `fade-out` + `slide-out-to-top` | 200ms | ease-out |
| Card hover lift | `translate-y` | 300ms | ease-state |
| Checkbox check | check icon `scale-in` | 150ms | spring |
| Switch thumb | `translate-x` | 200ms | ease-spring |
| Toggle state | background `color` | 200ms | ease-state |
| Progress bar fill | `width` | 700ms | ease-out |

### Implementación con `tailwindcss-animate`

```tsx
// Bottom sheet open
"data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:duration-350"
"data-[state=open]:ease-[cubic-bezier(0.32,0.72,0,1)]"

// Bottom sheet close
"data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:duration-250"

// Overlay fade
"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300"
"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-250"
```

### Respeto a `prefers-reduced-motion`

```tsx
// Patrón recomendado en el useEffect o en CSS
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// En Tailwind: usar la variante motion-safe / motion-reduce
"motion-safe:translate-y-0 motion-safe:transition-transform motion-safe:duration-300"
"motion-reduce:transition-none"

// En animaciones de posición: desactivar completamente con motion-reduce
// En fade: mantener (fade con duration corta es aceptable para reduced-motion)
```

---

## Checklist mobile-native por componente

### Dialog

- [ ] `< sm`: renderiza como bottom sheet
- [ ] Handle pill visible y centrado
- [ ] Panel `max-h-[90dvh] overflow-hidden`
- [ ] Footer usa `env(safe-area-inset-bottom)`
- [ ] Swipe-down en handle/header para cerrar
- [ ] Umbral de swipe: 100px o velocidad > 500px/s
- [ ] Animación `slide-in-from-bottom` 350ms spring
- [ ] Content área scrollable independiente del panel
- [ ] Focus trap funciona también en bottom sheet

### Select

- [ ] `< sm`: renderiza como action sheet
- [ ] Handle pill visible
- [ ] Items con `min-h-[52px]`
- [ ] Botón "Cancelar" fijo al fondo
- [ ] Búsqueda sticky al top si `searchable`
- [ ] Tap en item → cierra inmediatamente + actualiza valor
- [ ] Overlay tappable cierra el action sheet
- [ ] `max-h-[70dvh]` con scroll interno en lista

### Sheet

- [ ] `w-[85vw]` en móvil (< sm)
- [ ] Swipe horizontal hacia el overlay para cerrar
- [ ] Overlay muestra 15% de pantalla (permite tap-to-close)
- [ ] Botón close `min-h-[44px] min-w-[44px]`

### Interacciones táctiles generales

- [ ] Todos los botones y controls: `min-h-[44px]`
- [ ] Gap mínimo 8px entre targets táctiles adyacentes
- [ ] Estados `active:` definidos (para feedback táctil visual)
- [ ] No depender de `hover:` para esclarecer funcionalidad (sin hover en touch)
- [ ] `overscroll-contain` en containers scrollables que no deben propagar el scroll
- [ ] Inputs con `inputmode` correcto (`decimal`, `numeric`, `email`, etc.)

---

## Integración con `safe-area-inset`

Para dispositivos con notch o barra de gestos (iOS iPhone X+, Android gesture navigation):

```css
/* Padding bottom dinámico que respeta la safe area */
padding-bottom: max(1rem, env(safe-area-inset-bottom));

/* En Tailwind (con plugin @tailwindcss/safe-area o CSS custom): */
pb-[max(1rem,env(safe-area-inset-bottom))]
```

### Cuándo aplicarlo

| Elemento | Aplica safe-area-bottom? |
|---------|------------------------|
| Bottom sheet footer | ✅ Siempre |
| Action sheet "Cancelar" | ✅ Siempre |
| Fixed bottom navigation | ✅ Siempre |
| Paneles laterales (Sheet left/right) | No (no toca el borde bottom) |
| Modales centrados (desktop) | No |
| Contenido scrollable interno | No (el padding bottom del sheet ya lo cubre) |

### Configuración del viewport

```html
<!-- En el <head> del HTML — obligatorio en Next.js -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Sin `viewport-fit=cover`, `env(safe-area-inset-*)` retorna `0` y el contenido queda tapado por la barra de gestos del sistema.

---

## Referencia rápida de breakpoints

| Tailwind | Width | Comportamiento |
|---------|-------|---------------|
| Default (xs) | 0–474px | Mobile: bottom sheet, action sheet, touch-first |
| `xs:` | 475px+ | Mobile ampliado |
| `sm:` | 640px+ | Tablet pequeña: ya NO bottom sheet/action sheet |
| `tablet:` | 768px+ | Tablet |
| `desktop:` / `lg:` | 1024px+ | Desktop |

**Regla de oro:** Si el breakpoint es `< sm (640px)` → aplicar patrones mobile-native.
