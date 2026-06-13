import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReviewSummary } from "./ReviewSummary";

const breakdown = [
  { stars: 5, count: 80 },
  { stars: 4, count: 30 },
  { stars: 3, count: 10 },
  { stars: 2, count: 5 },
  { stars: 1, count: 3 },
];

describe("ReviewSummary", () => {
  it("muestra la media general formateada con un decimal", () => {
    render(<ReviewSummary average={4.3} total={128} breakdown={breakdown} />);
    expect(screen.getByText("4.3")).toBeInTheDocument();
  });

  it("muestra el total de valoraciones", () => {
    render(<ReviewSummary average={4.3} total={128} breakdown={breakdown} />);
    expect(screen.getByText("128 valoraciones")).toBeInTheDocument();
  });

  it("calcula el porcentaje de cada nivel de estrella", () => {
    render(<ReviewSummary average={4.3} total={128} breakdown={breakdown} />);
    // 80/128 = 62.5% -> redondeado a 63%
    expect(screen.getByText("63%")).toBeInTheDocument();
    // 3/128 = 2.34% -> redondeado a 2%
    expect(screen.getByText("2%")).toBeInTheDocument();
  });

  it("muestra el número de votos entre paréntesis", () => {
    render(<ReviewSummary average={4.3} total={128} breakdown={breakdown} />);
    expect(screen.getByText("(80)")).toBeInTheDocument();
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("renderiza las 5 filas del desglose en orden de 5 a 1 estrellas", () => {
    const { container } = render(<ReviewSummary average={4.3} total={128} breakdown={breakdown} />);
    const labels = Array.from(container.querySelectorAll("dt")).map((el) => el.textContent);
    expect(labels).toEqual(["5", "4", "3", "2", "1"]);
  });

  it("asume count=0 para valores de estrella ausentes en breakdown", () => {
    render(<ReviewSummary average={4.9} total={42} breakdown={[{ stars: 5, count: 40 }, { stars: 4, count: 2 }]} />);
    expect(screen.getAllByText("(0)").length).toBe(3);
  });

  it("maneja total=0 sin dividir por cero", () => {
    render(<ReviewSummary average={0} total={0} breakdown={[]} />);
    const zeroPercents = screen.getAllByText("0%");
    expect(zeroPercents.length).toBe(5);
  });
});
