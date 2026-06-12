import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white max-w-lg">
      <Alert variant="default">
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>Mensaje informativo por defecto.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Ya puedes continuar</AlertTitle>
        <AlertDescription>La validación se completó correctamente.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Revisión pendiente</AlertTitle>
        <AlertDescription>Este dato requiere verificación adicional.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error de validación</AlertTitle>
        <AlertDescription>Revisa los campos marcados antes de continuar.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Información de logística</AlertTitle>
        <AlertDescription>Los pedidos se preparan en un máximo de 48h.</AlertDescription>
      </Alert>
      <Alert variant="organic">
        <AlertTitle>Ayuda contextual</AlertTitle>
        <AlertDescription>Caja de ayuda con estilo orgánico de marca.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-lg">
      <Alert variant="warning" dismissible onDismiss={() => {}}>
        <AlertTitle>Aviso</AlertTitle>
        <AlertDescription>Esta alerta puede cerrarse haciendo clic en la X.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithTrailing: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white max-w-lg">
      <Alert variant="success" trailing={<Badge variant="success" size="sm">Conectado</Badge>}>
        <AlertTitle>Stripe conectado</AlertTitle>
        <AlertDescription>Tu cuenta de pagos está activa y lista para recibir cobros.</AlertDescription>
      </Alert>
      <Alert variant="info" trailing={<Badge variant="info" size="sm">Km 0</Badge>}>
        <AlertTitle>Logística de proximidad</AlertTitle>
        <AlertDescription>Tus productos se entregan en un radio de 50 km.</AlertDescription>
      </Alert>
      <Alert variant="default" trailing={<Badge variant="neutral" size="sm">Pendiente</Badge>}>
        <AlertTitle>Configuración pendiente</AlertTitle>
        <AlertDescription>Completa este paso para activar tu cuenta.</AlertDescription>
      </Alert>
    </div>
  ),
};
