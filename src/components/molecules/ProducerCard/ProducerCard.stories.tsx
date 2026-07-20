import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProducerCard, type ProducerCardProps } from "./ProducerCard";
import { Badge } from "../../atoms/Badge";

const meta: Meta<typeof ProducerCard> = {
  title: "Molecules/ProducerCard",
  component: ProducerCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ProducerCard>;

// Mock de productor mínimo
const baseMockProducer = {
  producerCode: "prod-001",
  story: {
    businessName: "Los Huertos del Valle",
    tagline: "Frutas y verduras de temporada cultivadas con amor en la Ribera del Ebro.",
  },
  location: {
    city: "Logroño",
    province: "La Rioja",
  },
  visual: {
    bannerUrl: "https://images.unsplash.com/photo-1488459716781-6818ecdf27d5?w=800&h=450&fit=crop",
    logoUrl: "https://images.unsplash.com/photo-1488459716781-6818ecdf27d5?w=100&h=100&fit=crop",
  },
  fiscal: {
    primaryCategory: "Frutas y verduras",
  },
};

// Botón de favoritos mock
const MockFavoriteButton = ({ isFavorited = false }: { isFavorited?: boolean }) => (
  <button
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-origen-oscuro shadow-sm"
    aria-label="Guardar en favoritos"
    aria-pressed={isFavorited}
  >
    <span>{isFavorited ? "♥" : "♡"}</span>
  </button>
);

// Story 1: Variant default sin extras
export const Default: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "default",
  },
};

// Story 2: Variant featured con rating
export const Featured: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    averageRating: 4.5,
    reviewCount: 23,
  },
};

// Story 3: Con logo superpuesto
export const WithLogo: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: "https://images.unsplash.com/photo-1488459716781-6818ecdf27d5?w=100&h=100&fit=crop",
    averageRating: 4.2,
    reviewCount: 15,
  },
};

// Story 4: Con botón de favoritos
export const WithFavoriteButton: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: baseMockProducer.visual?.logoUrl,
    averageRating: 4.8,
    reviewCount: 42,
    favoriteButton: <MockFavoriteButton />,
  },
};

// Story 5: Con verificación
export const Verified: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: baseMockProducer.visual?.logoUrl,
    isVerified: true,
    averageRating: 4.9,
    reviewCount: 67,
    favoriteButton: <MockFavoriteButton />,
  },
};

// Story 6: Con packaging sostenible
export const SustainablePackaging: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: baseMockProducer.visual?.logoUrl,
    sustainablePackaging: true,
    averageRating: 4.6,
    reviewCount: 33,
    favoriteButton: <MockFavoriteButton />,
  },
};

// Story 7: Verificado + Sostenible
export const VerifiedAndSustainable: Story = {
  args: {
    producer: baseMockProducer,
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: baseMockProducer.visual?.logoUrl,
    isVerified: true,
    sustainablePackaging: true,
    averageRating: 4.7,
    reviewCount: 89,
    favoriteButton: <MockFavoriteButton isFavorited />,
  },
};

// Story 8: Sin imagen banner (fallback)
export const NoBanner: Story = {
  args: {
    producer: {
      ...baseMockProducer,
      visual: { logoUrl: baseMockProducer.visual?.logoUrl },
    },
    href: "/productores/prod-001",
    variant: "featured",
    logoUrl: baseMockProducer.visual?.logoUrl,
    isVerified: true,
    averageRating: 4.3,
    reviewCount: 20,
  },
};

// Story 9: En grid de 2 columnas (móvil, tagline oculta)
export const GridMobile: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <ProducerCard
        producer={baseMockProducer}
        href="/productores/prod-001"
        variant="featured"
        logoUrl={baseMockProducer.visual?.logoUrl}
        averageRating={4.5}
        reviewCount={20}
        isVerified={true}
        favoriteButton={<MockFavoriteButton />}
      />
      <ProducerCard
        producer={{
          ...baseMockProducer,
          story: { ...baseMockProducer.story, businessName: "La Huerta Ecológica" },
          location: { ...baseMockProducer.location, city: "Zaragoza" },
        }}
        href="/productores/prod-002"
        variant="featured"
        logoUrl={baseMockProducer.visual?.logoUrl}
        averageRating={4.8}
        reviewCount={45}
        sustainablePackaging={true}
        favoriteButton={<MockFavoriteButton />}
      />
    </div>
  ),
};

// Story 10: En grid de 3 columnas (desktop)
export const GridDesktop: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ProducerCard
        producer={baseMockProducer}
        href="/productores/prod-001"
        variant="featured"
        logoUrl={baseMockProducer.visual?.logoUrl}
        averageRating={4.5}
        reviewCount={20}
        isVerified={true}
        favoriteButton={<MockFavoriteButton />}
      />
      <ProducerCard
        producer={{
          ...baseMockProducer,
          story: { ...baseMockProducer.story, businessName: "La Huerta Ecológica" },
          location: { ...baseMockProducer.location, city: "Zaragoza" },
        }}
        href="/productores/prod-002"
        variant="featured"
        logoUrl={baseMockProducer.visual?.logoUrl}
        averageRating={4.8}
        reviewCount={45}
        sustainablePackaging={true}
        favoriteButton={<MockFavoriteButton />}
      />
      <ProducerCard
        producer={{
          ...baseMockProducer,
          story: { ...baseMockProducer.story, businessName: "Vinos de Rioja" },
          fiscal: { primaryCategory: "Vinos" },
        }}
        href="/productores/prod-003"
        variant="featured"
        logoUrl={baseMockProducer.visual?.logoUrl}
        averageRating={4.9}
        reviewCount={67}
        isVerified={true}
        sustainablePackaging={true}
        favoriteButton={<MockFavoriteButton />}
      />
    </div>
  ),
};
