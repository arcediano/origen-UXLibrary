import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div className="p-16 bg-white">
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-origen-bosque">
            Más información
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-text-subtle">
            Contenido adicional mostrado en un popover flotante.
          </p>
          <PopoverClose className="mt-2 text-xs font-medium text-origen-pradera">Cerrar</PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 p-16 bg-white">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <button className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium capitalize text-origen-bosque">
              {side}
            </button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <p className="text-sm text-text-subtle">Popover posicionado en {side}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
