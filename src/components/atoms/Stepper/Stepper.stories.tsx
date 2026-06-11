import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperContent, StepperFooter } from "./Stepper";
import type { Step } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Atoms/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps: Step[] = [
  { id: "datos", title: "Datos básicos", description: "Información de la cuenta", status: "completed" },
  { id: "negocio", title: "Negocio", description: "Datos del productor", status: "active" },
  { id: "ubicacion", title: "Ubicación", description: "Dirección y zona", status: "pending" },
  { id: "verificacion", title: "Verificación", description: "Documentación", status: "pending" },
];

/**
 * Uso estándar del Stepper: pasos con icono, título, descripción y conector,
 * en orientación horizontal (desktop) o vertical.
 */
export const Horizontal: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="max-w-3xl">
        <Stepper
          steps={steps.map((step, i) => ({
            ...step,
            status: i < currentStep ? "completed" : i === currentStep ? "active" : "pending",
          }))}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          orientation="horizontal"
        />
        <StepperContent className="mt-8 rounded-xl border border-border-subtle bg-surface-alt p-6">
          <p className="text-small text-text-subtle">
            Contenido del paso {currentStep + 1}: {steps[currentStep].title}
          </p>
        </StepperContent>
        <StepperFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
          onNext={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
        />
      </div>
    );
  },
};

/**
 * Orientación vertical: lista de pasos apilados, recomendado para
 * formularios largos en columna lateral (desktop).
 */
export const Vertical: Story = {
  render: () => (
    <div className="max-w-sm">
      <Stepper steps={steps} currentStep={1} orientation="vertical" />
    </div>
  ),
};

/**
 * ## Patrón "dot trail" para móvil (onboarding)
 *
 * Variante compacta `orientation="horizontal-dots"`: renderiza únicamente
 * los indicadores de progreso (puntos + conectores) sin títulos ni
 * descripciones, replicando el patrón visual usado en
 * `MobileStepperBar` de `origen-dashboard` (onboarding móvil).
 *
 * No sustituye a `MobileStepperBar` (decisión: documentar el patrón sin
 * migrar el consumidor), pero sirve como referencia de implementación y
 * para nuevos flujos móviles que necesiten el mismo indicador.
 *
 * Recomendación de composición: combinar con un texto "Paso X de N · Título"
 * debajo del trail, igual que hace `MobileStepperBar`.
 */
export const DotTrailMobile: Story = {
  render: () => {
    const dotSteps: Step[] = [
      { id: "1", title: "Datos básicos", status: "completed" },
      { id: "2", title: "Negocio", status: "completed" },
      { id: "3", title: "Ubicación", status: "active" },
      { id: "4", title: "Verificación", status: "pending" },
      { id: "5", title: "Confirmación", status: "pending" },
    ];
    const currentStep = 2;

    return (
      <div className="max-w-sm rounded-xl border border-border-subtle bg-surface-alt px-4 py-3">
        <Stepper steps={dotSteps} currentStep={currentStep} orientation="horizontal-dots" />
        <p className="mt-2 text-xs text-text-subtle">
          <span className="font-semibold text-origen-bosque">
            Paso {currentStep + 1} de {dotSteps.length}
          </span>
          {" · "}
          {dotSteps[currentStep].title}
        </p>
      </div>
    );
  },
};
