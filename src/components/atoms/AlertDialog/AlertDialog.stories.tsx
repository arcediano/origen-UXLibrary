import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./AlertDialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Atoms/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white">
            Eliminar producto
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent variant="warning">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto se eliminará permanentemente del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-8 bg-white">
      {(["default", "warning", "success", "info"] as const).map((variant) => (
        <AlertDialog key={variant} defaultOpen={false}>
          <AlertDialogTrigger asChild>
            <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium capitalize text-origen-bosque">
              {variant}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent variant={variant}>
            <AlertDialogHeader>
              <AlertDialogTitle>Título {variant}</AlertDialogTitle>
              <AlertDialogDescription>Contenido de ejemplo para la variante {variant}.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Aceptar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  ),
};
