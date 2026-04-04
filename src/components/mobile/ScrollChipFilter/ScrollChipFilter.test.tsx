import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ScrollChipFilter } from "./ScrollChipFilter";

const items = [
  { id: "organic", label: "Orgánico" },
  { id: "fresh", label: "Fresco" },
  { id: "local", label: "Local" },
];

describe("ScrollChipFilter", () => {
  it("renders all chips", () => {
    render(<ScrollChipFilter items={items} />);
    expect(screen.getByText("Orgánico")).toBeInTheDocument();
    expect(screen.getByText("Fresco")).toBeInTheDocument();
    expect(screen.getByText("Local")).toBeInTheDocument();
  });

  it("marks active chip with aria-checked=true", () => {
    render(<ScrollChipFilter items={items} value="organic" />);
    const activeChip = screen.getByRole("checkbox", { name: "Orgánico" });
    const inactiveChip = screen.getByRole("checkbox", { name: "Fresco" });
    expect(activeChip).toHaveAttribute("aria-checked", "true");
    expect(inactiveChip).toHaveAttribute("aria-checked", "false");
  });

  it("calls onValueChange with chip id on single-select click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ScrollChipFilter items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByText("Orgánico"));
    expect(onValueChange).toHaveBeenCalledWith("organic");
  });

  it("deselects the active chip on second click in single-select mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ScrollChipFilter items={items} value="organic" onValueChange={onValueChange} />);
    await user.click(screen.getByText("Orgánico"));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("adds item to selection in multiple mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ScrollChipFilter
        items={items}
        multiple
        value={["organic"]}
        onValueChange={onValueChange}
      />
    );
    await user.click(screen.getByText("Fresco"));
    expect(onValueChange).toHaveBeenCalledWith(["organic", "fresh"]);
  });

  it("removes item from selection in multiple mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ScrollChipFilter
        items={items}
        multiple
        value={["organic", "fresh"]}
        onValueChange={onValueChange}
      />
    );
    await user.click(screen.getByText("Orgánico"));
    expect(onValueChange).toHaveBeenCalledWith(["fresh"]);
  });

  it("renders Todos chip when hasAll is true and marks it active when no value", () => {
    render(<ScrollChipFilter items={items} hasAll />);
    const todosChip = screen.getByRole("checkbox", { name: "Todos" });
    expect(todosChip).toHaveAttribute("aria-checked", "true");
  });
});
