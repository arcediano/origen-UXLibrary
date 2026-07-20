import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProducerCard } from "./ProducerCard";

const mockProducer = {
  producerCode: "prod-001",
  story: {
    businessName: "Los Huertos del Valle",
    tagline: "Frutas frescas de temporada.",
  },
  location: {
    city: "Logroño",
    province: "La Rioja",
  },
  visual: {
    bannerUrl: "https://example.com/banner.jpg",
    logoUrl: "https://example.com/logo.jpg",
  },
  fiscal: {
    primaryCategory: "Frutas y verduras",
  },
};

describe("ProducerCard", () => {
  it("renders the business name", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
      />
    );
    expect(screen.getByText("Los Huertos del Valle")).toBeInTheDocument();
  });

  it("renders the city location", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
      />
    );
    expect(screen.getByText("Logroño")).toBeInTheDocument();
  });

  it("renders the primary category", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
      />
    );
    expect(screen.getByText("Frutas y verduras")).toBeInTheDocument();
  });

  it("renders with aria-label for accessibility", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
      />
    );
    expect(screen.getByLabelText("Ver perfil de Los Huertos del Valle")).toBeInTheDocument();
  });

  it("renders tagline only in featured variant", () => {
    const { rerender } = render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        variant="default"
      />
    );
    expect(screen.queryByText("Frutas frescas de temporada.")).not.toBeInTheDocument();

    rerender(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        variant="featured"
      />
    );
    expect(screen.getByText("Frutas frescas de temporada.")).toBeInTheDocument();
  });

  it("renders rating when averageRating and reviewCount are provided", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        averageRating={4.5}
        reviewCount={20}
      />
    );
    // StarRating component will render, checking for the value
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders Verificado badge when isVerified is true", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        isVerified={true}
      />
    );
    expect(screen.getByText("Verificado")).toBeInTheDocument();
  });

  it("renders Eco badge when sustainablePackaging is true", () => {
    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        sustainablePackaging={true}
      />
    );
    expect(screen.getByText("Eco")).toBeInTheDocument();
  });

  it("renders favorite button slot when provided", () => {
    const FavoriteButtonMock = () => (
      <button aria-label="Add to favorites">♡</button>
    );

    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        favoriteButton={<FavoriteButtonMock />}
      />
    );
    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  });

  it("renders with fallback business name when not provided", () => {
    const producerWithoutName = {
      ...mockProducer,
      story: { ...mockProducer.story, businessName: null },
    };

    render(
      <ProducerCard
        producer={producerWithoutName}
        href="/productores/prod-001"
      />
    );
    expect(screen.getByText("Productor Origen")).toBeInTheDocument();
  });

  it("renders fallback gradient when no banner URL is provided", () => {
    const producerWithoutBanner = {
      ...mockProducer,
      visual: { ...mockProducer.visual, bannerUrl: null },
    };

    const { container } = render(
      <ProducerCard
        producer={producerWithoutBanner}
        href="/productores/prod-001"
      />
    );

    // Check that the gradient div is rendered
    const gradientDiv = container.querySelector("[aria-hidden='true']");
    expect(gradientDiv).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        className="custom-class"
      />
    );

    const link = container.querySelector("a");
    expect(link).toHaveClass("custom-class");
  });

  it("uses custom linkComponent when provided", () => {
    const MockLinkComponent = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement>
    >(({ ...props }, ref) => <a ref={ref} data-testid="mock-link" {...props} />);
    MockLinkComponent.displayName = "MockLinkComponent";

    render(
      <ProducerCard
        producer={mockProducer}
        href="/productores/prod-001"
        linkComponent={MockLinkComponent}
      />
    );

    expect(screen.getByTestId("mock-link")).toBeInTheDocument();
  });
});
