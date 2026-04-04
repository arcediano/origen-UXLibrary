import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("abre el contenido al recibir foco por teclado", async () => {
    const user = userEvent.setup();

    render(<Tooltip content="Ayuda breve" detailed="Detalle útil" />);

    await user.tab();

    expect(screen.getByRole("button", { name: /mostrar ayuda/i })).toHaveFocus();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Ayuda breve");
    expect(screen.getByRole("tooltip")).toHaveTextContent("Detalle útil");
  });

  it("cierra el tooltip al pulsar Escape", async () => {
    const user = userEvent.setup();

    render(<Tooltip content="Ayuda breve" />);

    await user.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("cierra el tooltip al perder foco", () => {
    render(
      <div>
        <Tooltip content="Ayuda breve" />
        <button type="button">Siguiente</button>
      </div>
    );

    const trigger = screen.getByRole("button", { name: /mostrar ayuda/i });
    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });
});