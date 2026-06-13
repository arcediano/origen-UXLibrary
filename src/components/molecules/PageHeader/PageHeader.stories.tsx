import type { Meta, StoryObj } from "@storybook/react";
import { Settings2 } from "lucide-react";
import { Button } from "../../atoms/Button";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Molecules/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cabecera de página interior. Soporta título, descripción, botón de volver, acciones, badge superior (icono + texto) y tooltip de ayuda.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Mis certificaciones",
    description: "Gestiona tus documentos y certificados",
  },
};

export const ConBotonVolverYAcciones: Story = {
  name: "Con botón de volver y acciones",
  args: {
    title: "Editar producto",
    description: "Actualiza la información de tu producto",
    showBackButton: true,
    onBack: () => {},
    actions: <Button size="sm">Guardar</Button>,
  },
};

export const ConBadgeYTooltip: Story = {
  name: "Con badge y tooltip (dashboard/account)",
  args: {
    title: "Cuenta",
    description: "Gestiona en un único lugar tu seguridad, cobros y preferencias",
    badgeIcon: Settings2,
    badgeText: "Cuenta",
    tooltip: "Cuenta",
    tooltipDetailed:
      "Este espacio concentra tareas personales y de configuración, sin duplicar notificaciones.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Patrón visual usado en `/dashboard/account` de origen-dashboard: chip de badge (icono + texto) sobre el título y un icono de ayuda con tooltip nativo accesible.",
      },
    },
  },
};
