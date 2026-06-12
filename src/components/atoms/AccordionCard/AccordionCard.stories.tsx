import type { Meta, StoryObj } from "@storybook/react";
import { Camera, FlaskConical, ShieldCheck } from "lucide-react";
import { Badge } from "../Badge";
import { AccordionCard } from "./AccordionCard";

const meta: Meta<typeof AccordionCard> = {
  title: "Atoms/AccordionCard",
  component: AccordionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccordionCard>;

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-lg">
      <AccordionCard
        icon={<Camera className="h-5 w-5" />}
        title="Fotos del entorno"
        description="Opcional — ayuda a transmitir confianza"
      >
        <p className="text-sm text-text-subtle">Contenido colapsable de la sección.</p>
      </AccordionCard>
    </div>
  ),
};

export const DefaultExpanded: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-lg">
      <AccordionCard
        icon={<FlaskConical className="h-5 w-5" />}
        title="Certificaciones"
        description="Añade tus certificaciones ecológicas"
        defaultExpanded
      >
        <p className="text-sm text-text-subtle">Selecciona tus certificaciones desde la lista.</p>
      </AccordionCard>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-lg">
      <AccordionCard
        icon={<FlaskConical className="h-5 w-5" />}
        title="Filosofía de producción"
        description="Cuéntanos cómo trabajas"
        badge={<Badge variant="neutral" size="sm">Recomendado</Badge>}
      >
        <p className="text-sm text-text-subtle">Contenido del paso.</p>
      </AccordionCard>
      <AccordionCard
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Certificaciones"
        description="Verificación de calidad"
        badge={<Badge variant="warning" size="sm">Requiere verificación</Badge>}
      >
        <p className="text-sm text-text-subtle">Contenido del paso.</p>
      </AccordionCard>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white max-w-lg">
      <AccordionCard
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Tomates ecológicos"
        description="Producto completo"
        state="complete"
        defaultExpanded
      >
        <p className="text-sm text-text-subtle">Todos los campos del producto están completos.</p>
      </AccordionCard>
      <AccordionCard
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Aceite de oliva"
        description="Producto incompleto"
        state="incomplete"
        defaultExpanded
      >
        <p className="text-sm text-text-subtle">Faltan campos por completar en este producto.</p>
      </AccordionCard>
    </div>
  ),
};
