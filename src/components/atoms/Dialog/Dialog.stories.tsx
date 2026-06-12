import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Atoms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white">
            Abrir diálogo
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar producto</DialogTitle>
            <DialogDescription>Actualiza la información de tu producto.</DialogDescription>
          </DialogHeader>
          <div className="py-2 text-sm text-text-subtle">Contenido del formulario.</div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-origen-bosque">
                Cancelar
              </button>
            </DialogClose>
            <button className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white">
              Guardar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false} closeOnOutsideClick={false}>
          <DialogHeader>
            <DialogTitle>Procesando</DialogTitle>
            <DialogDescription>Esta operación no puede cancelarse.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
