import * as React from "react";
import { cn } from "../../../lib/utils";

export interface NutritionDonutProps {
  protein: number;
  fat: number;
  carbs: number;
  centerLabel: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

interface Segment {
  value: number;
  color: string;
  label: string;
}

const GAP = 2;

// hsl values from design system tokens
const COLORS = {
  protein: "hsl(156, 46%, 24%)",   // bosque
  fat:     "hsl(34, 92%, 60%)",    // mandarina
  carbs:   "hsl(156, 49%, 63%)",   // pradera
  track:   "#E5E7EB",              // gray-200
};

function buildSegments(protein: number, fat: number, carbs: number): Segment[] {
  return [
    { value: protein, color: COLORS.protein, label: "Proteínas" },
    { value: fat,     color: COLORS.fat,     label: "Grasas" },
    { value: carbs,   color: COLORS.carbs,   label: "Hidratos" },
  ];
}

export function NutritionDonut({
  protein,
  fat,
  carbs,
  centerLabel,
  size = 140,
  strokeWidth = 20,
  className,
}: NutritionDonutProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - strokeWidth / 2;
  const C = 2 * Math.PI * r;

  const total = protein + fat + carbs;
  const hasData = total > 0;

  const segments = buildSegments(protein, fat, carbs);

  const titleId = React.useId();
  const title = hasData
    ? `Macronutrientes: proteínas ${protein}g (${Math.round((protein / total) * 100)}%), grasas ${fat}g (${Math.round((fat / total) * 100)}%), hidratos ${carbs}g (${Math.round((carbs / total) * 100)}%)`
    : "Sin datos nutricionales";

  let accumulated = 0;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* SVG donut */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{title}</title>

          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={COLORS.track}
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {hasData && (
            <g transform={`rotate(-90, ${cx}, ${cy})`}>
              {segments.map((seg) => {
                if (seg.value <= 0) return null;
                const fraction = seg.value / total;
                const segLen = Math.max(0, fraction * C - GAP);
                const offset = -accumulated;
                accumulated += fraction * C;

                return (
                  <circle
                    key={seg.label}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${segLen} ${C}`}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Center label */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-text-primary leading-none">
            {centerLabel}
          </span>
          {hasData && (
            <span className="text-[10px] text-text-subtle mt-0.5">por porción</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <ul className="flex flex-col gap-1.5 self-start" aria-label="Leyenda de macronutrientes">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: seg.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-text-subtle">
              {seg.label}
              {hasData && (
                <span className="ml-1 font-medium text-text-primary">
                  {seg.value}g
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
