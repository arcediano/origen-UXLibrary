import type { Meta, StoryObj } from "@storybook/react";
import { AuthFooter } from "./AuthFooter";

const meta: Meta<typeof AuthFooter> = {
  title: "Molecules/AuthFooter",
  component: AuthFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Footer de marca para páginas de autenticación, registro y " +
          "páginas legales/informativas. Framework-agnostic vía la prop " +
          "`linkComponent` (por defecto `<a>`; en Next.js pasar `Link` de " +
          "`next/link`). Esta es la versión canónica — sustituye al " +
          "`AuthFooter` local de `origen-dashboard`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthFooter>;

/**
 * Variante para `/auth/login`. CTA cruzado hacia "Nuevo productor"
 * (`/auth/register`).
 */
export const Login: Story = {
  args: {
    variant: "login",
  },
};

/**
 * Variante para `/auth/register`. CTA cruzado hacia "Acceso productores"
 * (`/auth/login`) y nota legal adicional (`showLegalNote`).
 */
export const Register: Story = {
  args: {
    variant: "register",
    showLegalNote: true,
  },
};

/**
 * Variante para `/auth/forgot-password`. CTA "Volver al login".
 */
export const Forgot: Story = {
  args: {
    variant: "forgot",
  },
};

/**
 * ## Variante "info" — páginas legales e informativas
 *
 * Para páginas que no son parte de un flujo de autenticación
 * (`/aviso-legal`, `/casos-exito`, `/como-funciona`, `/contacto`,
 * `/cookies`, `/privacidad`): mantiene el mismo footer de marca y el CTA
 * cruzado "Nuevo productor" (promoción del marketplace), pero con un
 * `versionLabel` neutro ("Marketplace de productores locales") en lugar de
 * "Acceso productores", que no tenía sentido fuera del flujo de login.
 */
export const Info: Story = {
  args: {
    variant: "info",
  },
};
