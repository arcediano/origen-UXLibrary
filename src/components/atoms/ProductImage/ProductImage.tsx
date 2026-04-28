"use client";

import * as React from "react";
import { Package } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function ProductImage({ src, alt, className, fallback }: ProductImageProps) {
  const [error, setError] = React.useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      {fallback ?? <Package className="h-1/2 w-1/2 max-w-12 text-origen-pradera/30" aria-hidden="true" />}
    </div>
  );
}
