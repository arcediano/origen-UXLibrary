import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-lg bg-origen-pradera px-4 py-2 text-sm font-medium text-white">
            Abrir panel
          </button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>Ajusta los filtros de búsqueda.</SheetDescription>
          </SheetHeader>
          <div className="py-4 text-sm text-text-subtle">Contenido del panel.</div>
          <SheetFooter>
            <SheetClose asChild>
              <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-origen-bosque">
                Cerrar
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-8 bg-white">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium capitalize text-origen-bosque">
              {side}
            </button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Panel {side}</SheetTitle>
              <SheetDescription>Sheet deslizado desde {side}.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
