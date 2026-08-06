/**
 * @file utils.ts
 * @description Utilidades compartidas del Design System
 */

import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Nombres de fontSize personalizados definidos en theme.extend.fontSize
 * de origen-UXLibrary/src/tailwind.config.ts Y replicados de forma
 * identica en los tailwind.config.ts forkeados de los 3 consumidores
 * (origen-admin, origen-dashboard, origen-web) a fecha 2026-08-06.
 *
 * Sin registrarlos aqui, tailwind-merge los clasifica por defecto en el
 * mismo grupo que text-{color} y descarta la clase de color al
 * combinarla con una de estas (bug real, ver
 * .claude/requirements/bug-fusion-clases-tailwind-merge-button.md).
 *
 * IMPORTANTE: si algun consumidor anade una clave nueva a fontSize en su
 * tailwind.config.ts, anadela tambien aqui (y ejecuta de nuevo la
 * verificacion empirica de esta tarea) o volvera a reproducirse este
 * bug para esa clave.
 */
const CUSTOM_FONT_SIZE_NAMES = ["h1", "h2", "h3", "body", "small", "micro"];

/**
 * Nombres de backgroundImage personalizados — mismo problema que
 * CUSTOM_FONT_SIZE_NAMES pero contra el grupo bg-color en vez de
 * text-color. Ver comentario arriba.
 */
const CUSTOM_BG_IMAGE_NAMES = ["gradient-origen", "gradient-menta", "gradient-crema"];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: CUSTOM_FONT_SIZE_NAMES }],
      "bg-image": [{ bg: CUSTOM_BG_IMAGE_NAMES }],
    },
  },
});

/**
 * Combina clases de Tailwind CSS de forma inteligente, resolviendo
 * conflictos entre clases (ej. `px-2 px-4` → `px-4`).
 *
 * Registra claves personalizadas de fontSize y backgroundImage para
 * evitar que tailwind-merge descarte clases de color al combinarlas.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatea bytes a formato legible (KB, MB, GB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
