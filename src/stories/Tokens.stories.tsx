import type { Meta, StoryObj } from "@storybook/react";

const palette = [
  { name: "Bosque", className: "bg-origen-bosque", textClassName: "text-white", token: "--bosque" },
  { name: "Pino", className: "bg-origen-pino", textClassName: "text-white", token: "--pino" },
  { name: "Hoja", className: "bg-origen-hoja", textClassName: "text-white", token: "--hoja" },
  { name: "Pradera", className: "bg-origen-pradera", textClassName: "text-origen-oscuro", token: "--pradera" },
  { name: "Menta", className: "bg-origen-menta", textClassName: "text-origen-oscuro", token: "--menta" },
  { name: "Crema", className: "bg-origen-crema", textClassName: "text-origen-oscuro", token: "--crema" },
  { name: "Mandarina", className: "bg-origen-mandarina", textClassName: "text-origen-oscuro", token: "--mandarina" },
  { name: "Sol", className: "bg-origen-sol", textClassName: "text-origen-oscuro", token: "--sol" },
  { name: "Cereza", className: "bg-origen-cereza", textClassName: "text-white", token: "--cereza" },
  { name: "Pastel", className: "bg-origen-pastel", textClassName: "text-origen-oscuro", token: "--pastel" },
];

const typography = [
  { label: "H1", className: "text-h1", sample: "Mercado de origen con intención comercial" },
  { label: "H2", className: "text-h2", sample: "Jerarquía editorial para landing y catálogo" },
  { label: "H3", className: "text-h3", sample: "Subsecciones, módulos y paneles" },
  { label: "Body", className: "text-body", sample: "Texto principal para listings, formularios y detalle de producto." },
  { label: "Small", className: "text-small", sample: "Soporte, ayudas contextuales y labels secundarios." },
  { label: "Micro", className: "text-micro", sample: "Metadata, badges y navegación compacta." },
];

const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: "Vista de referencia para la paleta Bosque Comercial y la escala tipográfica vigente de Origen.",
      },
    },
    // Los swatches de paleta muestran intencionalmente los colores crudos del token;
    // el contraste de texto sobre ellos no es semántico sino referencial.
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BrandSystem: Story = {
  render: () => (
    <div className="space-y-8 bg-origen-nube p-6 text-origen-oscuro">
      <section className="space-y-3">
        <div>
          <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Paleta</p>
          <h2 className="text-h3 text-origen-bosque">Bosque Comercial v1</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {palette.map((item) => (
            <div key={item.token} className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-alt shadow-subtle">
              <div className={`h-24 ${item.className}`} />
              <div className="space-y-1 p-4">
                <p className="text-small font-semibold text-origen-bosque">{item.name}</p>
                <p className="text-micro text-text-subtle">{item.token}</p>
                <p className={`inline-flex rounded-full px-2 py-1 text-micro ${item.className} ${item.textClassName}`}>
                  Muestra
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-[2rem] border border-border-subtle bg-surface-alt p-6 shadow-subtle">
        <div>
          <p className="text-micro uppercase tracking-[0.18em] text-text-subtle">Tipografía</p>
          <h2 className="text-h3 text-origen-bosque">Escala responsive</h2>
        </div>
        <div className="space-y-5">
          {typography.map((item) => (
            <div key={item.label} className="border-b border-border-subtle/70 pb-4 last:border-b-0 last:pb-0">
              <p className="mb-2 text-micro uppercase tracking-[0.14em] text-text-subtle">{item.label}</p>
              <p className={`${item.className} text-origen-oscuro`}>{item.sample}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};