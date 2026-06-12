import type { Meta, StoryObj } from "@storybook/react";
import { MobileCardList } from "./MobileCardList";

const meta: Meta<typeof MobileCardList> = {
  title: "Atoms/MobileCardList",
  component: MobileCardList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MobileCardList>;

const Row = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between border-b border-border-subtle p-4 last:border-b-0">
    <span className="text-sm font-medium text-origen-bosque">{label}</span>
    <span className="text-xs text-text-subtle">Detalle</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-sm">
      <MobileCardList>
        <Row label="Pedido #1023" />
        <Row label="Pedido #1024" />
        <Row label="Pedido #1025" />
      </MobileCardList>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-sm">
      <MobileCardList
        isLoading
        skeletonCount={3}
        renderSkeleton={() => (
          <div className="border-b border-border-subtle p-4 last:border-b-0">
            <div className="h-4 w-2/3 animate-pulse rounded bg-origen-pastel" />
          </div>
        )}
      >
        <Row label="Pedido #1023" />
      </MobileCardList>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="p-4 bg-white max-w-sm">
      <MobileCardList>
        <div className="p-6 text-center text-sm text-text-subtle">No hay elementos para mostrar</div>
      </MobileCardList>
    </div>
  ),
};
