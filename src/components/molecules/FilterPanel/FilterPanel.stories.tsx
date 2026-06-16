import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, ThumbsUp, ImageIcon } from "lucide-react";
import { FilterPanel, type FilterSection } from "./FilterPanel";
import { FilterToolbar } from "../FilterToolbar";
import { ActiveFilterChips, type ActiveFilterChip } from "../ActiveFilterChips";

const meta: Meta<typeof FilterPanel> = {
  title: "Molecules/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Panel de filtros unificado: popover en escritorio (≥1024px) y bottom sheet en móvil/tablet (<1024px). Patrón canónico de filtros de Origen — usar junto a `FilterToolbar` y `ActiveFilterChips`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

/**
 * Todos los tipos de sección soportados (chips, daterange, numberrange, toggles).
 * Abre el panel pulsando el botón "Filtros" de la barra.
 * Redimensionar la ventana a <1024px para ver el bottom sheet; ≥1024px muestra
 * el popover anclado al botón.
 */
export const AllSectionTypes: Story = {
  render: () => {
    const filtersButtonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");
    const [minAmount, setMinAmount] = React.useState("");
    const [maxAmount, setMaxAmount] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [withResponse, setWithResponse] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const activeChips: ActiveFilterChip[] = [
      ...(status ? [{ id: "status", label: status, onRemove: () => setStatus("") }] : []),
      ...(dateFrom ? [{ id: "dateFrom", label: `Desde: ${dateFrom}`, onRemove: () => setDateFrom("") }] : []),
      ...(dateTo ? [{ id: "dateTo", label: `Hasta: ${dateTo}`, onRemove: () => setDateTo("") }] : []),
      ...(minAmount ? [{ id: "min", label: `Mín: ${minAmount}€`, onRemove: () => setMinAmount("") }] : []),
      ...(maxAmount ? [{ id: "max", label: `Máx: ${maxAmount}€`, onRemove: () => setMaxAmount("") }] : []),
      ...(verified ? [{ id: "verified", label: "Verificadas", onRemove: () => setVerified(false) }] : []),
      ...(withResponse ? [{ id: "response", label: "Con respuesta", onRemove: () => setWithResponse(false) }] : []),
    ];

    const activeCount = activeChips.length;

    const clearAll = () => {
      setStatus("");
      setDateFrom("");
      setDateTo("");
      setMinAmount("");
      setMaxAmount("");
      setVerified(false);
      setWithResponse(false);
    };

    const sections: FilterSection[] = [
      {
        type: "chips",
        id: "status",
        title: "Estado",
        options: [
          { label: "Todos", value: "" },
          { label: "Pendientes", value: "pending" },
          { label: "Procesando", value: "processing" },
          { label: "Enviados", value: "shipped" },
          { label: "Entregados", value: "delivered" },
          { label: "Cancelados", value: "cancelled" },
        ],
        value: status,
        onChange: setStatus,
      },
      {
        type: "daterange",
        id: "period",
        title: "Período",
        valueFrom: dateFrom,
        valueTo: dateTo,
        onChangeFrom: setDateFrom,
        onChangeTo: setDateTo,
      },
      {
        type: "numberrange",
        id: "amount",
        title: "Importe",
        valueMin: minAmount,
        valueMax: maxAmount,
        onChangeMin: setMinAmount,
        onChangeMax: setMaxAmount,
        prefix: "€",
      },
      {
        type: "toggles",
        id: "booleans",
        title: "Opciones",
        options: [
          { id: "verified", label: "Verificadas", icon: CheckCircle, value: verified, onChange: setVerified },
          { id: "response", label: "Con respuesta", icon: ThumbsUp, value: withResponse, onChange: setWithResponse },
        ],
      },
    ];

    return (
      <div className="space-y-2 max-w-2xl">
        <FilterToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar pedido o cliente..."
          activeFilterCount={activeCount}
          onOpenFilters={() => setOpen(true)}
          filtersButtonRef={filtersButtonRef}
        />

        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 bg-origen-nube border border-dashed border-origen-bosque/20 rounded-xl px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-subtle whitespace-nowrap flex-shrink-0">
              Activos:
            </span>
            <ActiveFilterChips chips={activeChips} onClearAll={clearAll} />
          </div>
        )}

        <FilterPanel
          isOpen={open}
          onClose={() => setOpen(false)}
          triggerRef={filtersButtonRef}
          sections={sections}
          onClearAll={clearAll}
          resultCount={24}
          resultLabel="pedidos"
        />
      </div>
    );
  },
};

/**
 * Variante con solo secciones de chips — equivale al panel de Productos.
 */
export const ChipsOnly: Story = {
  render: () => {
    const filtersButtonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [sort, setSort] = React.useState("");
    const [search, setSearch] = React.useState("");

    const activeChips: ActiveFilterChip[] = [
      ...(category ? [{ id: "category", label: category, onRemove: () => setCategory("") }] : []),
      ...(status ? [{ id: "status", label: status, onRemove: () => setStatus("") }] : []),
      ...(stock ? [{ id: "stock", label: stock, onRemove: () => setStock("") }] : []),
      ...(sort ? [{ id: "sort", label: sort, onRemove: () => setSort("") }] : []),
    ];

    const clearAll = () => { setCategory(""); setStatus(""); setStock(""); setSort(""); };

    const sections: FilterSection[] = [
      {
        type: "chips", id: "category", title: "Categoría",
        options: [
          { label: "Todas", value: "" }, { label: "Quesos", value: "quesos" },
          { label: "Aceites", value: "aceites" }, { label: "Mieles", value: "mieles" },
          { label: "Embutidos", value: "embutidos" }, { label: "Vinos", value: "vinos" },
        ],
        value: category, onChange: setCategory,
      },
      {
        type: "chips", id: "status", title: "Estado",
        options: [
          { label: "Todos", value: "" }, { label: "Activos", value: "active" },
          { label: "Borradores", value: "draft" }, { label: "Sin stock", value: "out_of_stock" },
          { label: "Inactivos", value: "inactive" },
        ],
        value: status, onChange: setStatus,
      },
      {
        type: "chips", id: "stock", title: "Stock",
        options: [
          { label: "Todo", value: "" }, { label: "Con stock", value: "disponible" },
          { label: "Stock bajo", value: "bajo" }, { label: "Agotados", value: "agotado" },
        ],
        value: stock, onChange: setStock,
      },
      {
        type: "chips", id: "sort", title: "Ordenar por",
        options: [
          { label: "Por defecto", value: "" }, { label: "Más recientes", value: "newest" },
          { label: "Más antiguos", value: "oldest" }, { label: "Nombre A-Z", value: "name-asc" },
          { label: "Precio ↑", value: "price-asc" }, { label: "Más vendidos", value: "sales-desc" },
        ],
        value: sort, onChange: setSort,
      },
    ];

    return (
      <div className="space-y-2 max-w-2xl">
        <FilterToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar por nombre o SKU..."
          activeFilterCount={activeChips.length}
          onOpenFilters={() => setOpen(true)}
          filtersButtonRef={filtersButtonRef}
        />
        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 bg-origen-nube border border-dashed border-origen-bosque/20 rounded-xl px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-subtle whitespace-nowrap flex-shrink-0">
              Activos:
            </span>
            <ActiveFilterChips chips={activeChips} onClearAll={clearAll} />
          </div>
        )}
        <FilterPanel
          isOpen={open}
          onClose={() => setOpen(false)}
          triggerRef={filtersButtonRef}
          sections={sections}
          onClearAll={clearAll}
          resultCount={12}
          resultLabel="productos"
        />
      </div>
    );
  },
};

/**
 * Variante con toggles y chips mixtos — equivale al panel de Reseñas.
 */
export const ReviewsPanel: Story = {
  render: () => {
    const filtersButtonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [type, setType] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [hasResponse, setHasResponse] = React.useState(false);
    const [hasImages, setHasImages] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const activeChips: ActiveFilterChip[] = [
      ...(status ? [{ id: "status", label: status, onRemove: () => setStatus("") }] : []),
      ...(type ? [{ id: "type", label: type, onRemove: () => setType("") }] : []),
      ...(rating ? [{ id: "rating", label: `★ ${rating}`, onRemove: () => setRating("") }] : []),
      ...(verified ? [{ id: "verified", label: "Verificadas", onRemove: () => setVerified(false) }] : []),
      ...(hasResponse ? [{ id: "response", label: "Con respuesta", onRemove: () => setHasResponse(false) }] : []),
      ...(hasImages ? [{ id: "images", label: "Con imágenes", onRemove: () => setHasImages(false) }] : []),
    ];

    const clearAll = () => {
      setStatus(""); setType(""); setRating("");
      setVerified(false); setHasResponse(false); setHasImages(false);
    };

    const sections: FilterSection[] = [
      {
        type: "chips", id: "status", title: "Estado",
        options: [
          { label: "Todas", value: "" }, { label: "Pendientes", value: "pending" },
          { label: "Aprobadas", value: "approved" }, { label: "Rechazadas", value: "rejected" },
          { label: "Reportadas", value: "flagged" },
        ],
        value: status, onChange: setStatus,
      },
      {
        type: "chips", id: "type", title: "Tipo de reseña",
        options: [
          { label: "Todos", value: "" }, { label: "Productos", value: "product" },
          { label: "Productores", value: "producer" },
        ],
        value: type, onChange: setType,
      },
      {
        type: "chips", id: "rating", title: "Valoración",
        options: [
          { label: "Cualquier valoración", value: "" },
          { label: "★ 5", value: "5" }, { label: "★ 4", value: "4" },
          { label: "★ 3", value: "3" }, { label: "★ 2", value: "2" },
          { label: "★ 1", value: "1" },
        ],
        value: rating, onChange: setRating,
      },
      {
        type: "toggles", id: "booleans", title: "Opciones",
        options: [
          { id: "verified", label: "Verificadas", icon: CheckCircle, value: verified, onChange: setVerified },
          { id: "response", label: "Con respuesta", icon: ThumbsUp, value: hasResponse, onChange: setHasResponse },
          { id: "images", label: "Con imágenes", icon: ImageIcon, value: hasImages, onChange: setHasImages },
        ],
      },
    ];

    return (
      <div className="space-y-2 max-w-2xl">
        <FilterToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar reseñas..."
          activeFilterCount={activeChips.length}
          onOpenFilters={() => setOpen(true)}
          filtersButtonRef={filtersButtonRef}
        />
        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 bg-origen-nube border border-dashed border-origen-bosque/20 rounded-xl px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-text-subtle whitespace-nowrap flex-shrink-0">
              Activos:
            </span>
            <ActiveFilterChips chips={activeChips} onClearAll={clearAll} />
          </div>
        )}
        <FilterPanel
          isOpen={open}
          onClose={() => setOpen(false)}
          triggerRef={filtersButtonRef}
          sections={sections}
          onClearAll={clearAll}
          resultCount={87}
          resultLabel="reseñas"
        />
      </div>
    );
  },
};
