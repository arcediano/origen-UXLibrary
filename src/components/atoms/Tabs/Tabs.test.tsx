import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

describe("Tabs", () => {
  it("renderiza el panel asociado al valor inicial", () => {
    render(
      <Tabs defaultValue="uno">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Uno" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Uno" })).toHaveTextContent("Panel uno");
  });

  it("permite navegar con flechas en orientación horizontal", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="uno">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
          <TabsTrigger value="tres">Tres</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
        <TabsContent value="tres">Panel tres</TabsContent>
      </Tabs>
    );

    const firstTab = screen.getByRole("tab", { name: "Uno" });
    firstTab.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Dos" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Dos" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Dos" })).toHaveTextContent("Panel dos");
  });

  it("permite usar Home y End para saltar entre tabs", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="dos">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
          <TabsTrigger value="tres">Tres</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
        <TabsContent value="tres">Panel tres</TabsContent>
      </Tabs>
    );

    const secondTab = screen.getByRole("tab", { name: "Dos" });
    secondTab.focus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Tres" })).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Tres" })).toHaveTextContent("Panel tres");

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Uno" })).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Uno" })).toHaveTextContent("Panel uno");
  });

  it("permite navegar con flechas en orientación vertical", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="uno" orientation="vertical">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
          <TabsTrigger value="tres">Tres</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
        <TabsContent value="tres">Panel tres</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");

    const firstTab = screen.getByRole("tab", { name: "Uno" });
    firstTab.focus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Dos" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Dos" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Dos" })).toHaveTextContent("Panel dos");

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("tab", { name: "Uno" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Uno" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Uno" })).toHaveTextContent("Panel uno");
  });

  it("aplica clases accesibles para focus e inactivo", () => {
    render(
      <Tabs defaultValue="uno">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Dos" }).className).toContain("focus-visible:ring-origen-pino");
    expect(screen.getByRole("tab", { name: "Dos" }).className).toContain("text-origen-pino");
  });

  it("mantiene estado disabled con contraste suficiente", () => {
    render(
      <Tabs defaultValue="uno">
        <TabsList>
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos" disabled>
            Dos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Dos" }).className).toContain("disabled:text-origen-bosque/65");
  });

  it("no permite sobrescribir atributos ARIA reservados del tab trigger", () => {
    render(
      <Tabs defaultValue="uno">
        <TabsList>
          <TabsTrigger
            value="uno"
            role="presentation"
            aria-selected={false}
            aria-controls="externo"
            tabIndex={-1}
          >
            Uno
          </TabsTrigger>
        </TabsList>
        <TabsContent value="uno" role="presentation" tabIndex={-1} aria-labelledby="externo">
          Panel uno
        </TabsContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Uno" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).not.toHaveAttribute("aria-controls", "externo");
    expect(tab).toHaveAttribute("tabindex", "0");

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).not.toHaveAttribute("aria-labelledby", "externo");
  });
});