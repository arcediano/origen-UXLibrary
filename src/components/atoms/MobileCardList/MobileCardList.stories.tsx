import type { Meta, StoryObj } from "@storybook/react";
import { MobileCardList } from "./MobileCardList";
import { SwipeableRow } from "../../mobile/SwipeableRow/SwipeableRow";
import { Eye } from "lucide-react";

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

/**
 * Contraste del borde del contenedor sobre --background/--crema (no blanco) —
 * el escenario real reportado en apps consumidoras como origen-dashboard,
 * donde --surface-alt (blanco) y --background/--crema tienen poca diferencia
 * de luminosidad entre sí. Usa --border-container en vez de --border-subtle
 * específicamente para que el contenedor se distinga del fondo aquí.
 */
export const OnPageBackground: Story = {
  render: () => (
    <div className="p-4 bg-background max-w-sm">
      <MobileCardList>
        <Row label="Pedido #1023" />
        <Row label="Pedido #1024" />
        <Row label="Pedido #1025" />
      </MobileCardList>
    </div>
  ),
};

/**
 * Escenario real reportado por usuarios: filas envueltas en SwipeableRow
 * (como OrderCard/ProductMobileList en origen-dashboard/origen-admin)
 * dentro de MobileCardList, sobre el fondo de página --background/--crema.
 * Reproduce el bug donde la fila se pintaba con bg-surface (= --crema,
 * el mismo color que el fondo de página) en vez de bg-surface-alt (blanco,
 * el color del contenedor MobileCardList) — la fila quedaba literalmente
 * del mismo color que la pantalla, no solo con poco contraste de borde.
 */
export const SwipeableRowOnPageBackground: Story = {
  render: () => (
    <div className="p-4 bg-background max-w-sm">
      <MobileCardList>
        {["Pedido #1023", "Pedido #1024", "Pedido #1025"].map((label) => (
          <SwipeableRow
            key={label}
            actions={[{ label: "Ver", icon: Eye, color: "bosque", onPress: () => {} }]}
            className="border-b border-border-subtle last:border-0"
          >
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-origen-bosque">{label}</span>
              <span className="text-xs text-text-subtle">Detalle</span>
            </div>
          </SwipeableRow>
        ))}
      </MobileCardList>
    </div>
  ),
};
