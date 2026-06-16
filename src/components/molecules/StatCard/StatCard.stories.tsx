import type { Meta, StoryObj } from "@storybook/react";
import { TrendingUp, ShoppingBag, Users, Package, Star, Wallet, XCircle, AlertTriangle } from "lucide-react";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tarjeta KPI para fondos claros (dashboards). Icono con gradiente CSS, " +
          "tamaños responsive (móvil → tablet → desktop) y tendencia con `isPositive` " +
          "explícito o deducido del signo de `value`. " +
          "Para tarjetas sobre fondos oscuros/imágenes (hero de marketing), " +
          "usar `StatHighlightCard` en su lugar.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: "Ingresos del mes",
    value: "€4.280",
    icon: <Wallet />,
    variant: "pradera",
  },
};

export const WithPositiveTrend: Story = {
  args: {
    label: "Pedidos",
    value: 142,
    icon: <ShoppingBag />,
    trend: { value: 12.4, isPositive: true, label: "vs mes anterior" },
    variant: "hoja",
  },
};

export const WithNegativeTrend: Story = {
  args: {
    label: "Devoluciones",
    value: 8,
    icon: <Package />,
    trend: { value: -3.1, isPositive: false, label: "vs mes anterior" },
    variant: "mandarina",
  },
};

export const WithSubtitle: Story = {
  args: {
    label: "Valoración media",
    value: "4.8",
    icon: <Star />,
    subtitle: "últimos 30 días",
    variant: "bosque",
  },
};

export const DangerVariant: Story = {
  args: {
    label: "Agotados",
    value: 3,
    icon: <XCircle />,
    variant: "danger",
  },
};

export const Loading: Story = {
  args: {
    label: "Ingresos del mes",
    value: "€4.280",
    icon: <TrendingUp />,
    loading: true,
    variant: "pradera",
  },
};

/**
 * Las 8 variantes de color disponibles (`pradera`, `hoja`, `bosque`,
 * `arena`, `oscuro`, `neutral`, `mandarina`, `danger`).
 */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <StatCard label="Pradera" value="128" icon={<Users />} variant="pradera" />
      <StatCard label="Hoja" value="86" icon={<ShoppingBag />} variant="hoja" />
      <StatCard label="Bosque" value="4.8" icon={<Star />} variant="bosque" />
      <StatCard label="Arena" value="32" icon={<Package />} variant="arena" />
      <StatCard label="Oscuro" value="€1.2k" icon={<Wallet />} variant="oscuro" />
      <StatCard label="Neutral" value="—" icon={<TrendingUp />} variant="neutral" />
      <StatCard label="Mandarina" value="5" icon={<AlertTriangle />} variant="mandarina" />
      <StatCard label="Danger" value="3" icon={<XCircle />} variant="danger" />
    </div>
  ),
};

/**
 * Grid de 4 KPIs con tendencias — replica el diseño del dashboard principal.
 */
export const DashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <StatCard
        label="Visitas hoy"
        value={247}
        icon={<Users />}
        variant="pradera"
        trend={{ value: 8.3, isPositive: true, label: "vs ayer" }}
      />
      <StatCard
        label="Pedidos hoy"
        value={12}
        icon={<ShoppingBag />}
        variant="pradera"
        trend={{ value: -2.1, isPositive: false, label: "vs ayer" }}
      />
      <StatCard
        label="Ingresos hoy"
        value="€480"
        icon={<Wallet />}
        variant="hoja"
        trend={{ value: 15.4, isPositive: true, label: "vs ayer" }}
      />
      <StatCard
        label="Valoración"
        value="4.8"
        subtitle="128 reseñas"
        icon={<Star />}
        variant="bosque"
      />
    </div>
  ),
};
