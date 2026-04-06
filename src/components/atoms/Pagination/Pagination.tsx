"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageInfo = true,
  className,
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrev = () => {
    if (canGoPrev) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (canGoNext) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Paginacion" className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className="h-11 w-11 p-0 rounded-lg border-2 hover:border-origen-pradera"
        aria-label="Pagina anterior"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </Button>

      {showPageInfo && (
        <div className="rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm sm:text-base">
          <span className="font-medium text-origen-bosque">{currentPage}</span>
          <span className="mx-1 text-muted-foreground">/</span>
          <span className="text-muted-foreground">{totalPages}</span>
        </div>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={handleNext}
        disabled={!canGoNext}
        className="h-11 w-11 p-0 rounded-lg border-2 hover:border-origen-pradera"
        aria-label="Pagina siguiente"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </Button>
    </nav>
  );
}
