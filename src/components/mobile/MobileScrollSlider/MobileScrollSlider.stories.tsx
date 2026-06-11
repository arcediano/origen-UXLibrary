import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Leaf, Truck, ShieldCheck, Heart, Star } from "lucide-react";
import { MobileScrollSlider } from "./MobileScrollSlider";

const meta: Meta<typeof MobileScrollSlider> = {
  title: "Mobile/MobileScrollSlider",
  component: MobileScrollSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Slider horizontal táctil con scroll-snap, pensado para mostrar " +
          "tarjetas en viewport móvil (`md:hidden`) cuando en desktop se usa " +
          "un grid normal. Ya en uso en `origen-dashboard` " +
          "(`BenefitsSection`, `ProcessSection`, `TestimonialsSection` de " +
          "`/auth/register`). Importar directamente como `MobileScrollSlider` " +
          "(no usar alias de import como `MobileCardSlider`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileScrollSlider>;

function DemoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-border-subtle bg-surface-alt p-5 shadow-subtle">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-origen-pradera/10 text-origen-pradera">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-h4 text-origen-bosque">{title}</h3>
      <p className="mt-1 text-small text-text-subtle">{description}</p>
    </div>
  );
}

const benefitItems = [
  { icon: Leaf, title: "Producto local", description: "Directo del productor a tu mesa, sin intermediarios." },
  { icon: Truck, title: "Logística propia", description: "Reparto optimizado por zonas para reducir huella de carbono." },
  { icon: ShieldCheck, title: "Calidad verificada", description: "Cada productor pasa un proceso de verificación." },
  { icon: Heart, title: "Comunidad", description: "Apoya a productores de tu región." },
];

/**
 * Uso por defecto (`cardWidthClass="w-[82vw] max-w-xs"`), tal como aparece
 * en `BenefitsSection` de `/auth/register`.
 */
export const Default: Story = {
  render: () => (
    <div className="bg-origen-nube py-6">
      <MobileScrollSlider>
        {benefitItems.map((item) => (
          <DemoCard key={item.title} {...item} />
        ))}
      </MobileScrollSlider>
    </div>
  ),
};

const processItems = [
  { icon: Star, title: "1. Regístrate", description: "Crea tu perfil de productor en minutos." },
  { icon: ShieldCheck, title: "2. Verificación", description: "Validamos tu actividad y certificaciones." },
  { icon: Truck, title: "3. Publica", description: "Sube tus productos y empieza a vender." },
];

/**
 * `cardWidthClass` más estrecho (`w-[75vw]`), como en `ProcessSection`.
 * Ajusta cuántas tarjetas se "asoman" en el borde de la pantalla.
 */
export const NarrowCards: Story = {
  render: () => (
    <div className="bg-origen-nube py-6">
      <MobileScrollSlider cardWidthClass="w-[75vw]">
        {processItems.map((item) => (
          <DemoCard key={item.title} {...item} />
        ))}
      </MobileScrollSlider>
    </div>
  ),
};

/**
 * Con un único elemento: los indicadores de paginación se ocultan
 * automáticamente (`children.length > 1`).
 */
export const SingleCard: Story = {
  render: () => (
    <div className="bg-origen-nube py-6">
      <MobileScrollSlider cardWidthClass="w-[83vw]">
        <DemoCard icon={Heart} title="Único elemento" description="Sin indicadores de paginación." />
      </MobileScrollSlider>
    </div>
  ),
};
