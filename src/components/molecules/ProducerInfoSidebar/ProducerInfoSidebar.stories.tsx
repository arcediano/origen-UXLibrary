import type { Meta, StoryObj } from "@storybook/react";
import { Heart } from "lucide-react";
import { Button } from "../../atoms/Button";
import { ProducerInfoSidebar } from "./ProducerInfoSidebar";

const meta: Meta<typeof ProducerInfoSidebar> = {
  title: "Molecules/ProducerInfoSidebar",
  component: ProducerInfoSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ProducerInfoSidebar>;

// Datos de ejemplo reutilizables
const baseProducer = {
  businessName: "Huerta La Encina",
  photoUrl: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=640&q=80",
  logoUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=96&q=80",
  primaryCategory: "Hortalizas y verduras",
  location: { city: "Écija", province: "Sevilla", foundedYear: 2012 },
  tagline: "Cultivamos con respeto a la tierra para que llegue lo mejor a tu mesa.",
  averageRating: 4.7,
  reviewCount: 128,
  isVerified: true,
  certificationNames: ["Agricultura Ecológica", "Km 0"],
};

const FavoriteButton = () => (
  <Button variant="outline" size="sm" aria-label="Guardar como favorito">
    <Heart className="h-4 w-4" />
  </Button>
);

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Caso completo: foto, logo, verificado, 2 certs, rating, favorito y boton perfil. */
export const Default: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        {...baseProducer}
        favoriteButton={<FavoriteButton />}
        onToggleProfile={() => alert("Toggle editorial")}
        profileSectionId="producer-full-profile"
      />
    </div>
  ),
};

/** Sin foto: muestra el degradado de marca como fallback. */
export const SinFoto: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        {...baseProducer}
        photoUrl={null}
        logoUrl={null}
        favoriteButton={<FavoriteButton />}
        onToggleProfile={() => alert("Toggle editorial")}
        profileSectionId="producer-full-profile"
      />
    </div>
  ),
};

/** Sin certificaciones: no se renderiza la zona de badges. */
export const SinCertificaciones: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        {...baseProducer}
        certificationNames={[]}
        onToggleProfile={() => alert("Toggle editorial")}
        profileSectionId="producer-full-profile"
      />
    </div>
  ),
};

/** Perfil expandido: el chevron gira 180 deg y el texto cambia a "Ocultar perfil". */
export const ExpandidoTrue: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        {...baseProducer}
        profileExpanded={true}
        favoriteButton={<FavoriteButton />}
        onToggleProfile={() => alert("Toggle editorial")}
        profileSectionId="producer-full-profile"
      />
    </div>
  ),
};

/**
 * Muchas certificaciones: muestra 3 badges y un chip no interactivo "+3 mas"
 * cuando el productor tiene 6 certificaciones registradas.
 */
export const MuchasCertificaciones: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        {...baseProducer}
        certificationNames={[
          "Agricultura Ecológica",
          "Km 0",
          "Rainforest Alliance",
          "Fair Trade",
          "GlobalG.A.P.",
          "BRC Food",
        ]}
        favoriteButton={<FavoriteButton />}
        onToggleProfile={() => alert("Toggle editorial")}
        profileSectionId="producer-full-profile"
      />
    </div>
  ),
};

/** Sin rating ni ubicacion: maquetacion minima con solo nombre y tagline. */
export const Minimo: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-white">
      <ProducerInfoSidebar
        businessName="Finca El Olivar"
        isVerified={false}
      />
    </div>
  ),
};
