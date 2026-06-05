/**
 * @file PasswordStrengthIndicator.tsx
 * @description Indicador visual de fortaleza de contraseña con niveles codificados por color.
 * Migrado desde origen-dashboard/src/components/features/registration/components/PasswordStrengthIndicator.tsx
 * Nota: se eliminó la dependencia de framer-motion; la animación de entrada se aplica con CSS.
 *
 * @example
 * <PasswordStrengthIndicator password={formValues.password} />
 */

"use client";

import { cn } from "../../../lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface PasswordStrengthIndicatorProps {
  /** Contraseña actual del usuario */
  password: string;
  /** Clase CSS adicional */
  className?: string;
}

interface StrengthLevel {
  level: number;
  label: string;
  color: string;
  textColor: string;
}

// ─── Lógica de fortaleza ──────────────────────────────────────────────────────

function getStrength(pwd: string): StrengthLevel {
  if (!pwd) return { level: 0, label: "", color: "", textColor: "" };

  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { level: 1, label: "Débil",      color: "bg-feedback-danger", textColor: "text-feedback-danger" };
  if (score <= 2) return { level: 2, label: "Regular",    color: "bg-orange-500",       textColor: "text-orange-500"       };
  if (score <= 3) return { level: 3, label: "Buena",      color: "bg-yellow-500",       textColor: "text-yellow-500"       };
  if (score <= 4) return { level: 4, label: "Fuerte",     color: "bg-origen-hoja",      textColor: "text-origen-hoja"      };
  return               { level: 5, label: "Muy fuerte", color: "bg-green-600",        textColor: "text-green-600"        };
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function PasswordStrengthIndicator({
  password,
  className,
}: PasswordStrengthIndicatorProps) {
  const strength = getStrength(password);

  if (!password || strength.level === 0) return null;

  return (
    <div
      className={cn(
        "mt-2 space-y-1.5",
        "animate-in fade-in-0 slide-in-from-top-1 duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] md:text-xs text-muted-foreground">Fortaleza:</span>
        <span className={cn("text-[10px] md:text-xs font-semibold", strength.textColor)}>
          {strength.label}
        </span>
      </div>
      <div className="flex gap-1" role="meter" aria-valuenow={strength.level} aria-valuemin={0} aria-valuemax={5} aria-label={`Fortaleza de contraseña: ${strength.label}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= strength.level ? strength.color : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}

PasswordStrengthIndicator.displayName = "PasswordStrengthIndicator";
