import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Home, ShoppingCart, Search, UserRound } from "lucide-react";
import { MobileBottomNav } from "./MobileBottomNav";

const items = [
  { id: "inicio", label: "Inicio", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
  { id: "buscar", label: "Buscar", icon: <Search className="h-5 w-5" aria-hidden="true" /> },
  { id: "favoritos", label: "Favoritos", icon: <Heart className="h-5 w-5" aria-hidden="true" />, badge: 3 },
  { id: "perfil", label: "Perfil", icon: <UserRound className="h-5 w-5" aria-hidden="true" /> },
];

const itemsWithCentral = [
  { id: "inicio", label: "Inicio", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
  { id: "favoritos", label: "Favoritos", icon: <Heart className="h-5 w-5" aria-hidden="true" />, badge: 2 },
  {
    id: "carrito",
    label: "Carrito",
    icon: <ShoppingCart className="h-6 w-6" aria-hidden="true" />,
    badge: 3,
    central: true,
  },
  { id: "buscar", label: "Buscar", icon: <Search className="h-5 w-5" aria-hidden="true" /> },
  { id: "perfil", label: "Perfil", icon: <UserRound className="h-5 w-5" aria-hidden="true" /> },
];

const meta: Meta<typeof MobileBottomNav> = {
  title: "Mobile/MobileBottomNav",
  component: MobileBottomNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MobileBottomNav>;

export const Playground: Story = {
  render: () => {
    const [activeId, setActiveId] = React.useState("inicio");

    return (
      <div className="min-h-[520px] bg-origen-nube pb-28">
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-6">
          <div className="rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
            <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Demo mobile</p>
            <h2 className="mt-2 text-h3 text-origen-bosque">Navegación inferior</h2>
            <p className="mt-2 text-small text-text-subtle">Cambio activo: {activeId}</p>
          </div>
        </div>
        <MobileBottomNav items={items} activeId={activeId} onValueChange={setActiveId} fixed />
      </div>
    );
  },
};

/**
 * Patron "floating island + FAB central": item `central` renderizado como
 * boton circular elevado con gradiente y sombra, combinado con `variant="island"`.
 */
export const FloatingIslandWithCentralFab: Story = {
  render: () => {
    const [activeId, setActiveId] = React.useState("inicio");

    return (
      <div className="min-h-[520px] bg-origen-nube pb-32">
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-6">
          <div className="rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
            <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Demo mobile</p>
            <h2 className="mt-2 text-h3 text-origen-bosque">Marketplace bottom nav</h2>
            <p className="mt-2 text-small text-text-subtle">Tab activa: {activeId}</p>
          </div>
        </div>
        <MobileBottomNav
          items={itemsWithCentral}
          activeId={activeId}
          onValueChange={setActiveId}
          fixed
          variant="island"
        />
      </div>
    );
  },
};