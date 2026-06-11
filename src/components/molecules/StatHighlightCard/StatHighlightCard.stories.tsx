import type { Meta, StoryObj } from "@storybook/react";
import { TrendingUp, Clock, ShieldCheck, Globe, Users, ShoppingBag } from "lucide-react";
import { StatHighlightCard } from "./StatHighlightCard";

const meta: Meta<typeof StatHighlightCard> = {
  title: "Molecules/StatHighlightCard",
  component: StatHighlightCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tarjeta 'stat' con icono y gradiente para usar SOBRE fondos " +
          "oscuros o imágenes (hero de marketing, `/auth/register`, " +
          "`/auth/login`). Para tarjetas KPI sobre fondos claros (dashboard) " +
          "usar `StatCard` en su lugar — ver la diferencia documentada en " +
          "el JSDoc del componente.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-origen-bosque to-origen-pino p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatHighlightCard>;

/**
 * Ejemplo individual sobre fondo oscuro de marca.
 */
export const Default: Story = {
  args: {
    icon: <TrendingUp />,
    value: "15%",
    label: "Comisión",
    sublabel: "Solo al vender",
    gradient: "hoja",
  },
  parameters: { layout: "padded" },
};

/**
 * Grid 2x2 replicando el contexto del hero de `/auth/register`.
 */
export const HeroGrid: Story = {
  render: () => (
    <div className="grid max-w-md grid-cols-2 gap-3 md:gap-4">
      <StatHighlightCard icon={<TrendingUp />} value="15%" label="Comisión" sublabel="Solo al vender" gradient="hoja" />
      <StatHighlightCard icon={<Clock />} value="48h" label="Activación" sublabel="Rápido" gradient="hoja" />
      <StatHighlightCard icon={<ShieldCheck />} value="0€" label="Cuota mensual" sublabel="Costes fijos" gradient="bosque" />
      <StatHighlightCard icon={<Globe />} value="+50" label="Ciudades" sublabel="Nacional" gradient="bosque" />
    </div>
  ),
};

/**
 * Grid replicando el contexto de `/auth/login` (productores y compradores).
 */
export const LoginStats: Story = {
  render: () => (
    <div className="grid max-w-md grid-cols-2 gap-3 md:gap-4">
      <StatHighlightCard icon={<Users />} value="+500" label="Productores" sublabel="Activos" gradient="pradera" />
      <StatHighlightCard icon={<ShoppingBag />} value="50k+" label="Compradores" sublabel="Registrados" gradient="mandarina" />
    </div>
  ),
};

/**
 * Los 4 gradientes de marca disponibles: `hoja`, `pradera`, `bosque`,
 * `mandarina`. Todos cumplen contraste AA para texto blanco (valor, label).
 */
export const AllGradients: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
      <StatHighlightCard icon={<TrendingUp />} value="15%" label="Hoja" gradient="hoja" />
      <StatHighlightCard icon={<Users />} value="+500" label="Pradera" gradient="pradera" />
      <StatHighlightCard icon={<ShieldCheck />} value="0€" label="Bosque" gradient="bosque" />
      <StatHighlightCard icon={<ShoppingBag />} value="50k+" label="Mandarina" gradient="mandarina" />
    </div>
  ),
};
