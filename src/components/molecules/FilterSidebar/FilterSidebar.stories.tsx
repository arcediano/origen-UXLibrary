import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterSidebar, RatingFilterSection, type FilterSection } from "./FilterSidebar";

const meta: Meta<typeof FilterSidebar> = {
  title: "Molecules/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Columna de filtros siempre visible para catálogos públicos a 2 columnas (`origen-web`). A diferencia de `FilterPanel`, aplica cada cambio de inmediato (sin draft ni botón \"Aplicar\"). Cada sección se envuelve en un `AccordionCard` colapsado por defecto, sin scroll vertical/horizontal propio. Renderizar solo en `lg:block` — en móvil/tablet usar las mismas `sections` dentro de `FilterSheet`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterSidebar>;

/**
 * Catálogo de productos: valoración (RatingFilterSection, estrellas grandes
 * y amarillas, fuera del array `sections`), categoría (chips), precio
 * (numberrange) y disponibilidad (toggles), todas dentro de acordeones
 * colapsados por defecto. Layout de referencia: sidebar `w-[280px]` +
 * contenido a la derecha.
 */
export const CatalogFilters: Story = {
  render: () => {
    const [category, setCategory] = React.useState("");
    const [minRating, setMinRating] = React.useState(0);
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [inStock, setInStock] = React.useState(false);
    const [organic, setOrganic] = React.useState(false);

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "category",
        title: "Categoría",
        options: [
          { label: "Todas", value: "" },
          { label: "Frutas y verduras", value: "frutas-y-verduras" },
          { label: "Lácteos", value: "lacteos" },
          { label: "Miel y mermeladas", value: "miel-y-mermeladas" },
          { label: "Panadería", value: "panaderia" },
        ],
        value: category,
        onChange: setCategory,
      },
      {
        type: "numberrange",
        id: "price",
        title: "Precio",
        valueMin: minPrice,
        valueMax: maxPrice,
        onChangeMin: setMinPrice,
        onChangeMax: setMaxPrice,
        prefix: "€",
      },
      {
        type: "toggles",
        id: "availability",
        title: "Disponibilidad",
        options: [
          { id: "inStock", label: "Solo en stock", value: inStock, onChange: setInStock },
          { id: "organic", label: "Ecológico", value: organic, onChange: setOrganic },
        ],
      },
    ];

    return (
      <div className="grid grid-cols-[280px_1fr] gap-6 max-w-4xl">
        <FilterSidebar
          sections={sections}
          resultCount={128}
          resultLabel="productos"
          onClearAll={() => {
            setCategory("");
            setMinRating(0);
            setMinPrice("");
            setMaxPrice("");
            setInStock(false);
            setOrganic(false);
          }}
        >
          <RatingFilterSection value={minRating} onChange={setMinRating} />
        </FilterSidebar>
        <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-text-subtle">
          Área de contenido (grid de productos)
        </div>
      </div>
    );
  },
};

/** Estado sin filtros activos — categoría sin preselección, botón "Limpiar filtros" deshabilitado. */
export const Empty: Story = {
  render: () => {
    const [category, setCategory] = React.useState("");

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "category",
        title: "Categoría",
        options: [
          { label: "Todas", value: "" },
          { label: "Frutas y verduras", value: "frutas-y-verduras" },
          { label: "Lácteos", value: "lacteos" },
        ],
        value: category,
        onChange: setCategory,
      },
    ];

    return (
      <div className="max-w-xs">
        <FilterSidebar sections={sections} resultCount={42} resultLabel="productos" onClearAll={() => setCategory("")} />
      </div>
    );
  },
};

/**
 * Sección de valoración aislada — estrellas grandes (`w-6 h-6`) y amarillas
 * (`origen-mandarina`), sin scroll horizontal: las 3 opciones se disponen en
 * columna y envuelven sin overflow incluso en el ancho estrecho del sidebar.
 */
export const RatingSection: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <div className="max-w-xs rounded-2xl border border-border bg-surface-alt p-4">
        <RatingFilterSection value={value} onChange={setValue} />
      </div>
    );
  },
};
