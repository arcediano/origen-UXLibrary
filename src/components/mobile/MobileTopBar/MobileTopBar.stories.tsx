import type { Meta, StoryObj } from "@storybook/react";
import { Bell, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { MobileTopBar } from "./MobileTopBar";

const meta: Meta<typeof MobileTopBar> = {
  title: "Mobile/MobileTopBar",
  component: MobileTopBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MobileTopBar>;

export const CommerceHeader: Story = {
  render: () => (
    <div className="min-h-[520px] bg-origen-nube">
      <MobileTopBar
        sticky
        title="Verduras de estación"
        subtitle="38 resultados cerca de tu zona"
        leading={
          <Button size="icon-sm" variant="ghost" aria-label="Volver">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        }
        trailing={
          <>
            <Button size="icon-sm" variant="ghost" aria-label="Filtrar">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Notificaciones">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </Button>
          </>
        }
      />
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
          <p className="text-body text-origen-oscuro">Header preparado para flujos mobile-first con safe area y acciones compactas.</p>
        </div>
      </div>
    </div>
  ),
};