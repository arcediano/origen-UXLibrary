import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bell, Home, User } from "lucide-react";
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
});