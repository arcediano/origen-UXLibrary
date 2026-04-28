import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const cardVariants = cva(
  cn(
    "w-full rounded-2xl",
    "transition-all duration-300",
    "border border-border-subtle"
  ),
  {
    variants: {
      variant: {
        default: "bg-surface-alt shadow-subtle",
        elevated: "bg-white shadow-origen hover:shadow-origen-lg",
        outline: "bg-transparent border-2 border-origen-pradera/35 hover:border-origen-pradera/60",
        flat: "bg-origen-pastel border-transparent shadow-none",
      },
      interactive: {
        true: cn(
          "cursor-pointer min-h-[44px]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/45 focus-visible:ring-offset-2"
        ),
        false: "",
      },
      padding: {
        none: "p-0",
        sm: "p-3 sm:p-4",
        md: "p-4 sm:p-6",
        lg: "p-5 sm:p-7",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "sm" | "md" | "lg";
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "sm" | "md" | "lg";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, padding, role, tabIndex, ...props }, ref) => (
    <div
      ref={ref}
      role={role ?? (interactive ? "button" : "article")}
      tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  )
);

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    const spacingClasses = {
      sm: "space-y-1 mb-3",
      md: "space-y-1.5 mb-4",
      lg: "space-y-2 mb-5",
    };

    return <div ref={ref} className={cn("flex flex-col", spacingClasses[spacing], className)} {...props} />;
  }
);

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-base sm:text-lg",
      md: "text-lg sm:text-xl",
      lg: "text-xl sm:text-2xl",
    };

    return (
      <h3
        ref={ref}
        className={cn("font-bold leading-tight tracking-tight text-origen-bosque", sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-xs sm:text-sm",
      md: "text-sm sm:text-base",
      lg: "text-base sm:text-lg",
    };

    return <p ref={ref} className={cn("leading-relaxed text-text-subtle", sizeClasses[size], className)} {...props} />;
  }
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    const spacingClasses = {
      sm: "space-y-2",
      md: "space-y-3",
      lg: "space-y-4",
    };

    return <div ref={ref} className={cn("flex-1", spacingClasses[spacing], className)} {...props} />;
  }
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, spacing = "md", align = "left", ...props }, ref) => {
    const spacingClasses = {
      sm: "mt-3 pt-2",
      md: "mt-4 pt-3",
      lg: "mt-5 pt-4",
    };
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center border-t border-border-subtle",
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
