import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn() — tailwind-merge con claves personalizadas", () => {
  describe("colisiones de fontSize (bug raiz corregido)", () => {
    /**
     * Test de guardia: verifica que cn() no descarta clases de color de texto
     * al combinarlas con fontSize personalizados (h1, h2, h3, body, small, micro).
     *
     * Sin extendTailwindMerge, tailwind-merge clasificaba text-{size} custom
     * en el mismo grupo que text-{color}, descartando la clase de color.
     *
     * Ver: .claude/requirements/bug-fusion-clases-tailwind-merge-button.md
     */
    it("conserva text-origen-bosque al combinar con text-h1", () => {
      const result = cn("text-origen-bosque", "text-h1");
      expect(result).toContain("text-origen-bosque");
      expect(result).toContain("text-h1");
    });

    it("conserva text-origen-bosque al combinar con text-h2", () => {
      const result = cn("text-origen-bosque", "text-h2");
      expect(result).toContain("text-origen-bosque");
      expect(result).toContain("text-h2");
    });

    it("conserva text-origen-bosque al combinar con text-h3", () => {
      const result = cn("text-origen-bosque", "text-h3");
      expect(result).toContain("text-origen-bosque");
      expect(result).toContain("text-h3");
    });

    it("conserva text-origen-bosque al combinar con text-body", () => {
      const result = cn("text-origen-bosque", "text-body");
      expect(result).toContain("text-origen-bosque");
      expect(result).toContain("text-body");
    });

    it("conserva text-white al combinar con text-small", () => {
      const result = cn("text-white", "text-small");
      expect(result).toContain("text-white");
      expect(result).toContain("text-small");
    });

    it("conserva text-feedback-danger-text al combinar con text-micro", () => {
      const result = cn("text-feedback-danger-text", "text-micro");
      expect(result).toContain("text-feedback-danger-text");
      expect(result).toContain("text-micro");
    });
  });

  describe("colisiones de backgroundImage (bug descubierto en investigación)", () => {
    /**
     * Test de guardia: verifica que cn() no descarta clases de color de fondo
     * al combinarlas con backgroundImage personalizados (gradient-origen, gradient-menta, gradient-crema).
     */
    it("conserva bg-origen-bosque al combinar con bg-gradient-origen", () => {
      const result = cn("bg-origen-bosque", "bg-gradient-origen");
      expect(result).toContain("bg-origen-bosque");
      expect(result).toContain("bg-gradient-origen");
    });

    it("conserva bg-origen-bosque al combinar con bg-gradient-menta", () => {
      const result = cn("bg-origen-bosque", "bg-gradient-menta");
      expect(result).toContain("bg-origen-bosque");
      expect(result).toContain("bg-gradient-menta");
    });

    it("conserva bg-origen-bosque al combinar con bg-gradient-crema", () => {
      const result = cn("bg-origen-bosque", "bg-gradient-crema");
      expect(result).toContain("bg-origen-bosque");
      expect(result).toContain("bg-gradient-crema");
    });
  });

  describe("casos de control — deduplicación normal debe seguir funcionando", () => {
    /**
     * Test de control: verifica que la configuración de extendTailwindMerge
     * no rompió el comportamiento de deduplicación correcto para clases
     * que SI deben colapsar entre sí.
     */
    it("colapsa text-sm y text-lg a text-lg", () => {
      const result = cn("text-sm", "text-lg");
      expect(result).toContain("text-lg");
      expect(result).not.toContain("text-sm");
    });

    it("colapsa shadow-subtle y shadow-card a shadow-card", () => {
      const result = cn("shadow-subtle", "shadow-card");
      expect(result).toContain("shadow-card");
      expect(result).not.toContain("shadow-subtle");
    });

    it("colapsa px-2 y px-4 a px-4", () => {
      const result = cn("px-2", "px-4");
      expect(result).toContain("px-4");
      expect(result).not.toContain("px-2");
    });
  });
});
