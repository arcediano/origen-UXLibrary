import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

describe("RadioGroup", () => {
  it("no permite sobrescribir role en la raiz", () => {
    render(
      <RadioGroup defaultValue="a" role="group">
        <RadioGroupItem value="a" label="Opcion A" />
        <RadioGroupItem value="b" label="Opcion B" />
      </RadioGroup>
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("no permite sobrescribir role en items", () => {
    render(
      <RadioGroup defaultValue="a">
        {/* @ts-expect-error testing runtime guard */}
        <RadioGroupItem value="a" label="Opcion A" role="button" />
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Opcion A" })).toBeInTheDocument();
  });

  it("mantiene onValueChange al seleccionar una opcion", () => {
    const onValueChange = vi.fn();

    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Opcion A" />
        <RadioGroupItem value="b" label="Opcion B" />
      </RadioGroup>
    );

    fireEvent.click(screen.getByRole("radio", { name: "Opcion B" }));

    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});
