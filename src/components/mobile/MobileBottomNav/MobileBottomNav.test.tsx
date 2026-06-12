import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bell, Home, ShoppingCart, User } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { MobileBottomNav } from "./MobileBottomNav";

describe("MobileBottomNav", () => {
  const items = [
    { id: "home", label: "Inicio", icon: <Home className="h-4 w-4" /> },
    { id: "alerts", label: "Alertas", icon: <Bell className="h-4 w-4" />, badge: 3 },
    { id: "profile", label: "Perfil", icon: <User className="h-4 w-4" /> },
  ];

  it("marca el item activo con aria-current cuando usa enlaces", () => {
    render(
      <MobileBottomNav
        activeId="alerts"
        items={items.map((item) => ({ ...item, href: `/${item.id}` }))}
      />
    );

    expect(screen.getByRole("link", { name: /alertas/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("notifica cambios cuando se pulsa un item accionable", async () => {
    const onValueChange = vi.fn();

    render(<MobileBottomNav activeId="home" items={items} onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole("button", { name: /perfil/i }));
    expect(onValueChange).toHaveBeenCalledWith("profile");
  });

  it("usa texto blanco legible para el item activo con gradiente oscuro", () => {
    render(<MobileBottomNav activeId="home" items={items} />);

    const activeIconContainer = screen.getByRole("button", { name: /inicio/i }).querySelector("span.rounded-2xl");
    expect(activeIconContainer?.className).toContain("text-white");
  });

  const itemsWithCentral = [
    { id: "home", label: "Inicio", icon: <Home className="h-4 w-4" /> },
    {
      id: "cart",
      label: "Carrito",
      icon: <ShoppingCart className="h-5 w-5" />,
      central: true,
    },
    { id: "profile", label: "Perfil", icon: <User className="h-4 w-4" /> },
  ];

  it("renderiza un item central como FAB elevado en variant default", () => {
    render(<MobileBottomNav activeId="home" items={itemsWithCentral} variant="default" />);

    const fab = screen.getByRole("button", { name: /carrito/i }).querySelector("span.-translate-y-4");
    expect(fab).toBeInTheDocument();
    expect(fab?.className).toContain("h-14");
    expect(fab?.className).toContain("w-14");
  });

  it("no limita el ancho del contenedor interior en variant default (sin max-w-md/mx-auto)", () => {
    const { container } = render(<MobileBottomNav activeId="home" items={items} variant="default" />);

    const innerContainer = container.querySelector("div.rounded-\\[1\\.75rem\\]");
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer?.className).not.toContain("max-w-md");
    expect(innerContainer?.className).not.toContain("mx-auto");
  });

  it("mantiene max-w-md y mx-auto en variant island (sin cambios)", () => {
    const { container } = render(<MobileBottomNav activeId="home" items={items} variant="island" />);

    const innerContainer = container.querySelector("div.rounded-2xl");
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer?.className).toContain("max-w-md");
    expect(innerContainer?.className).toContain("mx-auto");
  });

  it("renderiza el FAB central igual en variant island que en variant default", () => {
    render(<MobileBottomNav activeId="home" items={itemsWithCentral} variant="island" />);

    const fab = screen.getByRole("button", { name: /carrito/i }).querySelector("span.-translate-y-4");
    expect(fab).toBeInTheDocument();
    expect(fab?.className).toContain("h-14");
    expect(fab?.className).toContain("w-14");
  });
});