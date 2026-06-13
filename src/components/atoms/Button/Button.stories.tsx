import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente Button del Origen Design System. Admite 5 variantes visuales, 5 tamaños y estados de carga.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon", "icon-sm"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Guardar Producto", variant: "primary", size: "md" },
};

export const Secondary: Story = {
  args: { children: "Ver Detalles", variant: "secondary", size: "md" },
};

export const Outline: Story = {
  args: { children: "Cancelar", variant: "outline", size: "md" },
};

export const Ghost: Story = {
  args: { children: "Omitir", variant: "ghost", size: "md" },
};

export const GhostIconOnly: Story = {
  name: "Ghost (icon-only)",
  args: {
    variant: "ghost",
    size: "icon-sm",
    "aria-label": "Cerrar",
    children: <Plus className="h-4 w-4 rotate-45" aria-hidden />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uso real de `ghost` en `AdminSidebar` (botón icon-only para cerrar el menú móvil). El hover combina fondo `origen-pastel/60` y texto `origen-pino`.",
      },
    },
  },
};

export const Destructive: Story = {
  args: { children: "Eliminar", variant: "destructive", size: "md" },
};

export const Loading: Story = {
  args: { children: "Guardando...", variant: "primary", loading: true, loadingText: "Procesando..." },
};

export const WithIcons: Story = {
  args: {
    children: "Añadir Producto",
    variant: "primary",
    leftIcon: <Plus className="h-4 w-4" />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-origen-crema">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" loading loadingText="Cargando...">Loading</Button>
      <Button variant="primary" leftIcon={<Save className="h-4 w-4" />}>Save</Button>
      <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
    </div>
  ),
};
