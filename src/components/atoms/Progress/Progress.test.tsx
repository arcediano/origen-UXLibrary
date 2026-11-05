import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("valueText sustituye al porcentaje en aria-valuetext", () => {
    render(<Progress value={12.5} max={40} valueText="12,50 € de 40,00 €" aria-label="Envío gratis" />);
    const progressbar = screen.getByRole("progressbar", { name: "Envío gratis" });

    expect(progressbar).toHaveAttribute("aria-valuetext", "12,50 € de 40,00 €");
  });

  it("no usa colores fuera de los tokens de marca (sin paleta de Tailwind)", () => {
    const { container } = render(
      <>
        {(["seed", "sprout", "leaf", "fruit", "forest", "warning"] as const).map((variant) => (
          <Progress key={variant} variant={variant} value={50} label={variant} />
        ))}
        <Progress mode="char-count" value={10} threshold={50} />
        <Progress mode="char-count" value={60} threshold={50} />
      </>
    );

    expect(container.innerHTML).not.toMatch(/(?:bg|text|from|to)-(?:amber|green|orange)-\d{2,3}/);
  });

  it("expone role progressbar y no permite sobrescribirlo", () => {
    render(<Progress value={30} max={100} role="status" aria-valuenow={10} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "30");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clampa valores fuera de rango", () => {
    render(<Progress value={160} max={100} />);
    const progressbar = screen.getByRole("progressbar");

    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
    expect(progressbar).toHaveAttribute("aria-valuetext", "100%");
  });
});
