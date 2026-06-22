import { cn } from "../../../lib/utils";

type SectionDividerVariant = "wave" | "wave-flip" | "diagonal";
type SectionDividerHeight = "sm" | "md" | "lg";

interface SectionDividerProps {
  variant?: SectionDividerVariant;
  /** Clase de color Tailwind del fondo destino (fill del SVG). Ej: "text-white", "text-background" */
  colorClass?: string;
  height?: SectionDividerHeight;
  className?: string;
  "aria-hidden"?: boolean;
}

const heightMap: Record<SectionDividerHeight, string> = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
};

export function SectionDivider({
  variant = "wave",
  colorClass = "text-background",
  height = "md",
  className,
  "aria-hidden": ariaHidden = true,
}: SectionDividerProps) {
  if (variant === "diagonal") {
    return (
      <div
        aria-hidden={ariaHidden}
        className={cn("relative overflow-hidden", heightMap[height], className)}
      >
        <div className={cn("absolute inset-0 -skew-y-1 origin-top-left", colorClass.replace("text-", "bg-"))} />
      </div>
    );
  }

  const isFlipped = variant === "wave-flip";

  return (
    <div
      aria-hidden={ariaHidden}
      className={cn(
        "relative w-full overflow-hidden leading-none",
        isFlipped && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full block", colorClass, heightMap[height])}
        preserveAspectRatio="none"
      >
        <path
          d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 40 1080 38C1200 36 1320 28 1380 24L1440 20V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

SectionDivider.displayName = "SectionDivider";
