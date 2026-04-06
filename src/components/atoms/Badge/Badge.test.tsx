import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge, StatusBadge } from "./Badge";

describe("Badge", () => {
  it("aplica tokens de contraste reforzado en success", () => {
    render(<Badge variant="success">Activo</Badge>);
    expect(screen.getByText("Activo").className).toContain("text-green-900");
    expect(screen.getByText("Activo").className).toContain("border-green-700");
  });

  it("aplica tokens de contraste reforzado en info", () => {
    render(<Badge variant="info">Info</Badge>);
    expect(screen.getByText("Info").className).toContain("text-blue-900");
    expect(screen.getByText("Info").className).toContain("border-blue-700");
  });

  it("mapea pending a warning con color accesible", () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText(/pendiente/i).className).toContain("text-amber-900");
    expect(screen.getByText(/pendiente/i).className).toContain("border-amber-700");
  });

  it("mapea out_of_stock a danger con tokens reforzados", () => {
    render(<StatusBadge status="out_of_stock" />);
    expect(screen.getByText(/sin stock/i).className).toContain("text-red-900");
    expect(screen.getByText(/sin stock/i).className).toContain("border-red-700");
  });
});