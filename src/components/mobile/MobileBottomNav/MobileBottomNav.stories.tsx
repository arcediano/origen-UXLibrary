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
    docs: {
      description: {
        component:
          "Patrón estándar de barra inferior móvil: `variant=\"island\"` + " +
          "`fixed={false}` + un item `central` (FAB elevado, sin label " +
          "visible). El componente NO gestiona el wrapper de animación ni " +
          "el posicionamiento `fixed` — eso es responsabilidad de cada " +
          "proyecto consumidor (ver story `IslandWithCentralFAB` para el " +
          "patrón de integración recomendado).",
      },
    },
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
 * ## Patrón de integración recomendado: "Island + FAB central"
 *
 * `MobileBottomNav` con `variant="island"`, `fixed={false}` y un item
 * `central: true` (renderizado como botón circular elevado, sin label
 * visible). El componente solo dibuja la barra; el posicionamiento
 * `fixed bottom-0`, el `safe-area-inset-bottom` y la animación de
 * mostrar/ocultar (p. ej. al abrir un filtro) son responsabilidad de cada
 * proyecto.
 *
 * ### Referencia canónica: `MarketplaceBottomNav` (origen-web)
 *
 * Este es el wrapper de referencia que ambos proyectos (`origen-web` y
 * `origen-dashboard`/`BottomTabBar`) deben replicar:
 *
 * ```tsx
 * import { motion, AnimatePresence } from 'framer-motion';
 * import { MobileBottomNav as UXMobileBottomNav } from '@arcediano/ux-library';
 *
 * <AnimatePresence>
 *   {!filterOpen && (
 *     <motion.div
 *       key="marketplace-bottom-nav"
 *       initial={{ y: 100, opacity: 0 }}
 *       animate={{ y: 0, opacity: 1 }}
 *       exit={{ y: 100, opacity: 0 }}
 *       transition={{ type: 'spring', damping: 30, stiffness: 300 }}
 *       className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex justify-center items-end px-4"
 *       style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 10px)' }}
 *     >
 *       <UXMobileBottomNav
 *         items={items}
 *         activeId={activeId}
 *         onValueChange={handleValueChange}
 *         variant="island"
 *         fixed={false}
 *         className="w-full max-w-[360px]"
 *       />
 *     </motion.div>
 *   )}
 * </AnimatePresence>
 * ```
 *
 * Puntos clave:
 * - `variant="island"` + `fixed={false}`: el componente NO se posiciona a sí
 *   mismo; el wrapper `motion.div` es quien aplica `fixed bottom-0 inset-x-0 z-50`.
 * - `className="w-full max-w-[360px]"` en `UXMobileBottomNav` limita el ancho
 *   de la "isla" flotante centrada.
 * - La visibilidad (`!filterOpen`) reacciona a eventos custom del proyecto
 *   (`filter-sheet:toggle`, `page-action-bar:toggle`, etc.) — cada proyecto
 *   define los suyos, no es parte de la librería.
 * - El item `central` (`isCentral: true` / `central: true`) lleva `label: ''`
 *   para que no se muestre texto bajo el FAB.
 */
export const IslandWithCentralFAB: Story = {
  render: () => {
    const [activeId, setActiveId] = React.useState("inicio");

    return (
      <div className="min-h-[520px] bg-origen-nube pb-32">
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-6">
          <div className="rounded-[2rem] border border-border-subtle bg-surface-alt p-5 shadow-subtle">
            <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Demo mobile</p>
            <h2 className="mt-2 text-h3 text-origen-bosque">Island + FAB central</h2>
            <p className="mt-2 text-small text-text-subtle">Tab activa: {activeId}</p>
          </div>
        </div>
        <div className="fixed bottom-0 inset-x-0 z-50 flex items-end justify-center px-4 pb-[max(env(safe-area-inset-bottom),10px)]">
          <MobileBottomNav
            items={itemsWithCentral}
            activeId={activeId}
            onValueChange={setActiveId}
            variant="island"
            fixed={false}
            className="w-full max-w-[360px]"
          />
        </div>
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