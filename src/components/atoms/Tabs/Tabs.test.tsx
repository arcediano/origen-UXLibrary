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
});