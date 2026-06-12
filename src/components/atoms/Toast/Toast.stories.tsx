import type { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Variants: Story = {
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-3 p-4 bg-white">
        <Toast variant="default" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Notificación</ToastTitle>
            <ToastDescription>Mensaje informativo estándar.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <Toast variant="success" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Guardado correctamente</ToastTitle>
            <ToastDescription>Los cambios se han guardado.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <Toast variant="error" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>No se pudo completar la acción.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <Toast variant="warning" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Atención</ToastTitle>
            <ToastDescription>Revisa los datos introducidos.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <Toast variant="info" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Información</ToastTitle>
            <ToastDescription>Nueva actualización disponible.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <div className="p-4 bg-white">
        <Toast variant="default" open className="relative">
          <div className="grid gap-1">
            <ToastTitle>Producto eliminado</ToastTitle>
            <ToastDescription>El producto se ha movido a la papelera.</ToastDescription>
          </div>
          <ToastAction altText="Deshacer">Deshacer</ToastAction>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};
