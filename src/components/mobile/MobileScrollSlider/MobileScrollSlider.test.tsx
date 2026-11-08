import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MobileScrollSlider } from "./MobileScrollSlider";

describe("MobileScrollSlider", () => {
  // Hallazgo real (petición del humano, 2026-11-08, captura de origen.delivery):
  // la primera tarjeta quedaba pegada al borde de la pantalla en vez de respetar
  // el margen de `px-4`. Causa: sin `scroll-padding` a juego, el motor de
  // scroll-snap adelanta el `scrollLeft` inicial justo ese valor, "comiéndose"
  // el padding visualmente desde el primer render.
  it("el track de scroll tiene scroll-padding a juego con su propio padding", () => {
    const { container } = render(
      <MobileScrollSlider>
        {[<div key="1">Uno</div>, <div key="2">Dos</div>]}
      </MobileScrollSlider>,
    );

    const track = container.querySelector(".overflow-x-auto");
    expect(track?.className).toContain("px-4");
    expect(track?.className).toContain("scroll-px-4");
  });
});
