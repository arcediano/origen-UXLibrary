import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renderiza contenedor de navegacion semantico", () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);

    expect(screen.getByRole("navigation", { name: "Paginacion" })).toBeInTheDocument();
  });

  it("ejecuta onPageChange segun anterior/siguiente", () => {
    const onPageChange = vi.fn();

    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina siguiente" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });
});
