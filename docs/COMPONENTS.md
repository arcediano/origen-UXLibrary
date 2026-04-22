# COMPONENTS.md — @arcediano/ux-library
> Versión: 0.2.14 | Fecha: 2026-04-22

Listado completo de componentes exportados por la librería, con descripción de props y ejemplos de uso.

## Importación

```tsx
import { Button, Input, Card, ... } from '@arcediano/ux-library';
import '@arcediano/ux-library/styles'; // Tokens CSS (incluir una vez en _app o layout)
```

---

## Componentes Atómicos (`atoms/`)

### Alert

Componente de alerta informativa con variantes de estado.

```tsx
import { Alert } from '@arcediano/ux-library';

<Alert variant="success" title="Guardado">
  Los cambios se han guardado correctamente.
</Alert>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | ✅ | Tipo de alerta |
| `title` | `string` | ❌ | Título de la alerta |
| `children` | `ReactNode` | ✅ | Contenido del mensaje |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `onClose` | `() => void` | ❌ | Callback al cerrar (muestra botón X) |

---

### AlertDialog

Diálogo de confirmación modal.

```tsx
import { AlertDialog } from '@arcediano/ux-library';

<AlertDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="¿Eliminar producto?"
  description="Esta acción no se puede deshacer."
  onConfirm={handleDelete}
  confirmLabel="Eliminar"
  variant="destructive"
/>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `open` | `boolean` | ✅ | Controla la visibilidad |
| `onOpenChange` | `(open: boolean) => void` | ✅ | Callback de cambio de visibilidad |
| `title` | `string` | ✅ | Título del diálogo |
| `description` | `string` | ❌ | Descripción o mensaje de confirmación |
| `onConfirm` | `() => void` | ✅ | Callback al confirmar |
| `onCancel` | `() => void` | ❌ | Callback al cancelar |
| `confirmLabel` | `string` | ❌ | Texto del botón de confirmación (default: "Confirmar") |
| `cancelLabel` | `string` | ❌ | Texto del botón de cancelar (default: "Cancelar") |
| `variant` | `'default' \| 'destructive'` | ❌ | Variante visual |

---

### Avatar

Imagen de perfil con fallback en iniciales.

```tsx
import { Avatar } from '@arcediano/ux-library';

<Avatar src="/foto.jpg" alt="Juan García" size="md" />
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `src` | `string` | ❌ | URL de la imagen |
| `alt` | `string` | ✅ | Texto alternativo / iniciales fallback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | ❌ | Tamaño (default: `md`) |
| `className` | `string` | ❌ | Clases CSS adicionales |

---

### Badge

Etiqueta de estado o categoría.

```tsx
import { Badge } from '@arcediano/ux-library';

<Badge variant="active">Activo</Badge>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | `'default' \| 'active' \| 'pending' \| 'inactive' \| 'error' \| 'outline'` | ❌ | Variante visual |
| `children` | `ReactNode` | ✅ | Contenido del badge |
| `className` | `string` | ❌ | Clases CSS adicionales |

---

### Button

Botón de acción principal.

```tsx
import { Button } from '@arcediano/ux-library';

<Button variant="primary" size="md" onClick={handleClick}>
  Guardar cambios
</Button>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | ❌ | Variante visual (default: `primary`) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | ❌ | Tamaño (default: `md`) |
| `disabled` | `boolean` | ❌ | Deshabilitado |
| `loading` | `boolean` | ❌ | Estado de carga (muestra spinner) |
| `asChild` | `boolean` | ❌ | Renderiza como hijo (para usar con `<Link>`) |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `onClick` | `() => void` | ❌ | Callback de clic |

---

### Card

Contenedor de tarjeta con padding y sombra.

```tsx
import { Card } from '@arcediano/ux-library';

<Card>
  <Card.Header title="Mi producto" />
  <Card.Content>Contenido aquí</Card.Content>
  <Card.Footer>Pie de tarjeta</Card.Footer>
</Card>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `ReactNode` | ✅ | Contenido de la tarjeta |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | ❌ | Variante visual |

---

### Checkbox

Casilla de verificación accesible.

```tsx
import { Checkbox } from '@arcediano/ux-library';

<Checkbox
  id="terms"
  checked={accepted}
  onCheckedChange={setAccepted}
  label="Acepto los términos"
/>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `id` | `string` | ✅ | ID del campo |
| `checked` | `boolean` | ❌ | Estado controlado |
| `onCheckedChange` | `(checked: boolean) => void` | ❌ | Callback de cambio |
| `label` | `string` | ❌ | Etiqueta visible |
| `disabled` | `boolean` | ❌ | Deshabilitado |

---

### CurrencyInput

Input numérico para valores monetarios.

```tsx
import { CurrencyInput } from '@arcediano/ux-library';

<CurrencyInput
  label="Precio base"
  value={price}
  onChange={setPrice}
  currency="EUR"
/>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ❌ | Etiqueta del campo |
| `value` | `number` | ❌ | Valor controlado |
| `onChange` | `(value: number) => void` | ❌ | Callback de cambio |
| `currency` | `string` | ❌ | Símbolo de moneda (default: `€`) |
| `min` / `max` | `number` | ❌ | Límites del valor |
| `disabled` | `boolean` | ❌ | Deshabilitado |
| `error` | `string` | ❌ | Mensaje de error |

---

### DateInput

Input de fecha con validación.

```tsx
import { DateInput } from '@arcediano/ux-library';

<DateInput label="Fecha de caducidad" value={date} onChange={setDate} />
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ❌ | Etiqueta del campo |
| `value` | `string` | ❌ | Fecha en formato `YYYY-MM-DD` |
| `onChange` | `(value: string) => void` | ❌ | Callback de cambio |
| `min` / `max` | `string` | ❌ | Fechas límite |
| `error` | `string` | ❌ | Mensaje de error |

---

### Dialog

Modal de diálogo accesible.

```tsx
import { Dialog } from '@arcediano/ux-library';

<Dialog open={isOpen} onOpenChange={setIsOpen} title="Editar producto">
  <Dialog.Content>Contenido del modal</Dialog.Content>
</Dialog>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `open` | `boolean` | ✅ | Controla la visibilidad |
| `onOpenChange` | `(open: boolean) => void` | ✅ | Callback de cambio |
| `title` | `string` | ❌ | Título del diálogo |
| `description` | `string` | ❌ | Descripción del diálogo |
| `children` | `ReactNode` | ✅ | Contenido |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | ❌ | Tamaño del modal |

---

### Input

Campo de texto base.

```tsx
import { Input } from '@arcediano/ux-library';

<Input
  label="Nombre del producto"
  placeholder="Ej: Miel de romero artesanal"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error="El nombre es requerido"
/>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ❌ | Etiqueta visible del campo |
| `placeholder` | `string` | ❌ | Placeholder |
| `value` | `string` | ❌ | Valor controlado |
| `onChange` | `ChangeEventHandler` | ❌ | Callback de cambio |
| `type` | `string` | ❌ | Tipo de input (default: `text`) |
| `error` | `string` | ❌ | Mensaje de error (muestra borde rojo) |
| `disabled` | `boolean` | ❌ | Deshabilitado |
| `required` | `boolean` | ❌ | Requerido |
| `className` | `string` | ❌ | Clases CSS adicionales |

---

### InputAffixField

Input con prefijo o sufijo.

```tsx
import { InputAffixField } from '@arcediano/ux-library';

<InputAffixField prefix="€" label="Precio" ... />
<InputAffixField suffix="kg" label="Peso" ... />
```

---

### Label

Etiqueta de formulario accesible.

```tsx
import { Label } from '@arcediano/ux-library';

<Label htmlFor="email">Correo electrónico</Label>
```

---

### Pagination

Componente de paginación.

```tsx
import { Pagination } from '@arcediano/ux-library';

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

---

### PercentageInput

Input numérico para porcentajes (0-100).

```tsx
import { PercentageInput } from '@arcediano/ux-library';

<PercentageInput label="Descuento" value={discount} onChange={setDiscount} />
```

---

### ProductImage

Componente optimizado para imágenes de producto con fallback.

```tsx
import { ProductImage } from '@arcediano/ux-library';

<ProductImage src={product.mainImageUrl} alt={product.name} size="md" />
```

---

### Progress

Barra de progreso.

```tsx
import { Progress } from '@arcediano/ux-library';

<Progress value={60} max={100} label="Paso 3 de 5" />
```

---

### RadioGroup

Grupo de opciones de selección única.

```tsx
import { RadioGroup } from '@arcediano/ux-library';

<RadioGroup
  options={[
    { value: 'INDIVIDUAL', label: 'Autónomo' },
    { value: 'COMPANY', label: 'Empresa' },
  ]}
  value={businessType}
  onChange={setBusinessType}
/>
```

---

### Select

Selector desplegable accesible.

```tsx
import { Select } from '@arcediano/ux-library';

<Select
  label="Categoría"
  options={categories}
  value={categoryId}
  onChange={setCategoryId}
  placeholder="Selecciona una categoría"
/>
```

---

### Separator

Separador horizontal o vertical.

```tsx
import { Separator } from '@arcediano/ux-library';

<Separator orientation="horizontal" />
```

---

### Sheet

Panel lateral (drawer) accesible.

```tsx
import { Sheet } from '@arcediano/ux-library';

<Sheet open={isOpen} onOpenChange={setIsOpen} side="right" title="Filtros">
  Contenido del panel
</Sheet>
```

---

### Slider

Selector de rango deslizante.

```tsx
import { Slider } from '@arcediano/ux-library';

<Slider
  label="Rango de precio"
  min={0}
  max={500}
  value={[minPrice, maxPrice]}
  onValueChange={setPriceRange}
/>
```

---

### Stepper

Indicador visual de pasos de un proceso multi-paso.

```tsx
import { Stepper } from '@arcediano/ux-library';

<Stepper
  steps={['Ubicación', 'Historia', 'Imágenes', 'Logística', 'Documentos', 'Pagos']}
  currentStep={3}
/>
```

---

### Switch

Toggle on/off accesible.

```tsx
import { Switch } from '@arcediano/ux-library';

<Switch
  id="active"
  checked={isActive}
  onCheckedChange={setIsActive}
  label="Producto activo"
/>
```

---

### Table

Tabla de datos.

```tsx
import { Table } from '@arcediano/ux-library';

<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Nombre</Table.Head>
      <Table.Head>Estado</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {rows.map(row => (
      <Table.Row key={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.status}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

---

### Tabs

Pestañas de navegación.

```tsx
import { Tabs } from '@arcediano/ux-library';

<Tabs defaultValue="general">
  <Tabs.List>
    <Tabs.Trigger value="general">General</Tabs.Trigger>
    <Tabs.Trigger value="precios">Precios</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="general">...</Tabs.Content>
  <Tabs.Content value="precios">...</Tabs.Content>
</Tabs>
```

---

### TagsInput

Campo de entrada de etiquetas múltiples.

```tsx
import { TagsInput } from '@arcediano/ux-library';

<TagsInput
  label="Etiquetas"
  value={tags}
  onChange={setTags}
  placeholder="Añadir etiqueta..."
/>
```

---

### Textarea

Campo de texto multilínea.

```tsx
import { Textarea } from '@arcediano/ux-library';

<Textarea
  label="Descripción corta"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  maxLength={200}
/>
```

---

### Toast

Sistema de notificaciones toast.

```tsx
import { Toast, useToast } from '@arcediano/ux-library';

const { toast } = useToast();
toast({ title: 'Guardado', description: 'Cambios guardados correctamente.', variant: 'success' });
```

---

### Toggle / ToggleGroup

Botones de toggle individual o en grupo.

```tsx
import { ToggleGroup } from '@arcediano/ux-library';

<ToggleGroup
  type="single"
  value={view}
  onValueChange={setView}
  options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'Lista' }]}
/>
```

---

### Tooltip

Información contextual al hacer hover.

```tsx
import { Tooltip } from '@arcediano/ux-library';

<Tooltip content="Eliminar este elemento">
  <Button variant="ghost" size="icon"><TrashIcon /></Button>
</Tooltip>
```

---

## Tokens de diseño

Los tokens semánticos se importan desde `@arcediano/ux-library/styles`:

| Token | Uso |
|-------|-----|
| `origen-bosque` | Color primario — verde oscuro |
| `origen-pradera` | Color secundario — verde medio |
| `origen-hoja` | Color acento — verde claro |
| `origen-pastel` | Fondos suaves |
| `origen-oscuro` | Texto oscuro |
| `origen-arena` | Fondos neutros cálidos |
| `bg-gradient-origen` | Gradiente de marca |

Ver manual completo en `_workspace/docs/manual-de-marca-origen.md`.

---

## Compatibilidad

| Proyecto | Versión usada | Estado |
|----------|--------------|--------|
| `origen-dashboard` | 0.2.14 | ✅ Compatible |
| `origen-web` | 0.2.14 | ✅ Compatible |
| `origen-admin` | 0.2.14 | ✅ Compatible |
