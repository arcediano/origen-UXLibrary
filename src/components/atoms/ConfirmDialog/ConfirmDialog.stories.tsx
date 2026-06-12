import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AlertCircle } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Atoms/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="p-8 bg-white">
        <button
          className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white"
          onClick={() => setOpen(true)}
        >
          Abrir diálogo de confirmación
        </button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Confirmar cambio de plan"
          description="Estás a punto de cambiar tu plan de suscripción"
          highlightLabel="Nuevo plan"
          highlightValue="Productor Premium"
          body="El nuevo plan se aplicará a partir del próximo ciclo de facturación."
          confirmLabel="Confirmar cambio"
          confirmVariant="primary"
          onConfirm={() => setOpen(false)}
          icon={<AlertCircle className="h-5 w-5" />}
        />
      </div>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="p-8 bg-white">
        <button
          className="rounded-lg border border-feedback-danger px-4 py-2 text-sm font-medium text-feedback-danger"
          onClick={() => setOpen(true)}
        >
          Eliminar cuenta
        </button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Eliminar cuenta de productor"
          description="Esta acción es irreversible"
          body="Se eliminarán todos tus productos, pedidos y datos asociados de forma permanente."
          confirmLabel="Eliminar cuenta"
          confirmVariant="danger"
          onConfirm={() => setOpen(false)}
          error="Debes confirmar tu contraseña antes de continuar"
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Procesando solicitud"
        description="Por favor espera"
        confirmLabel="Confirmar"
        confirmVariant="primary"
        onConfirm={() => {}}
        isLoading
        loadingLabel="Guardando cambios..."
      />
    </div>
  ),
};
