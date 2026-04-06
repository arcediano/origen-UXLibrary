import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
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
