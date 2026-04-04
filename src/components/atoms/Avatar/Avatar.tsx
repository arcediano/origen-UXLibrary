"use client";

import * as React from "react";
import { CheckCircle, User } from "lucide-react";
import { cn } from "../../../lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarShape = "circle" | "rounded" | "square";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "verified";
type LoadingState = "idle" | "loading" | "loaded" | "error";

interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  status?: AvatarStatus;
  imageLoadingStatus: LoadingState;
  setImageLoadingStatus: React.Dispatch<React.SetStateAction<LoadingState>>;
}

const AvatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

function useAvatarContext(): AvatarContextValue {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar subcomponents must be used within Avatar");
  }
  return context;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs sm:h-8 sm:w-8 sm:text-sm",
  sm: "h-8 w-8 text-sm sm:h-10 sm:w-10 sm:text-base",
  md: "h-10 w-10 text-base sm:h-12 sm:w-12 sm:text-lg",
  lg: "h-12 w-12 text-lg sm:h-14 sm:w-14 sm:text-xl",
  xl: "h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl",
  "2xl": "h-16 w-16 text-2xl sm:h-20 sm:w-20 sm:text-3xl",
};

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-lg sm:rounded-xl",
  square: "rounded-none",
};

const STATUS_DOT_CLASSES: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5 sm:h-2 sm:w-2",
  sm: "h-2 w-2 sm:h-2.5 sm:w-2.5",
  md: "h-2.5 w-2.5 sm:h-3 sm:w-3",
  lg: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  xl: "h-3.5 w-3.5 sm:h-4 sm:w-4",
  "2xl": "h-4 w-4 sm:h-5 sm:w-5",
};

const STATUS_COLORS: Record<Exclude<AvatarStatus, "verified">, string> = {
  online: "bg-green-500",
  offline: "bg-text-disabled",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  bordered?: boolean;
  borderColor?: string;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: Exclude<AvatarSize, "2xl">;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      fallback,
      size = "md",
      shape = "circle",
      status,
      bordered = false,
      borderColor = "ring-white",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [imageLoadingStatus, setImageLoadingStatus] = React.useState<LoadingState>(src ? "loading" : "idle");
    const [imageError, setImageError] = React.useState(false);

    const contextValue = React.useMemo(
      () => ({ size, shape, status, imageLoadingStatus, setImageLoadingStatus }),
      [size, shape, status, imageLoadingStatus]
    );

    return (
      <AvatarContext.Provider value={contextValue}>
        <div className="relative inline-flex">
          <div
            ref={ref}
            className={cn(
              "relative flex shrink-0 overflow-hidden",
              "bg-gradient-to-br from-origen-pradera/10 to-origen-hoja/10",
              "text-origen-bosque font-medium",
              SIZE_CLASSES[size],
              SHAPE_CLASSES[shape],
              bordered && cn("ring-2 ring-offset-2", borderColor),
              className
            )}
            {...props}
          >
            {src && !imageError && (
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                onLoad={() => setImageLoadingStatus("loaded")}
                onError={() => {
                  setImageError(true);
                  setImageLoadingStatus("error");
                }}
              />
            )}

            {(!src || imageError) && (children ?? <AvatarFallback>{fallback}</AvatarFallback>)}
          </div>

          {status && status !== "verified" && (
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white",
                STATUS_DOT_CLASSES[size],
                STATUS_COLORS[status]
              )}
              aria-hidden
            />
          )}

          {status === "verified" && (
            <div
              className={cn(
                "absolute -bottom-1 -right-1 rounded-full bg-origen-pradera border border-white",
                "flex items-center justify-center",
                size === "xs" && "h-3 w-3 sm:h-4 sm:w-4",
                size === "sm" && "h-3.5 w-3.5 sm:h-4.5 sm:w-4.5",
                size === "md" && "h-4 w-4 sm:h-5 sm:w-5",
                size === "lg" && "h-4.5 w-4.5 sm:h-5.5 sm:w-5.5",
                size === "xl" && "h-5 w-5 sm:h-6 sm:w-6",
                size === "2xl" && "h-5.5 w-5.5 sm:h-6.5 sm:w-6.5"
              )}
              aria-label="verified"
            >
              <CheckCircle className="h-3 w-3 text-white sm:h-4 sm:w-4" />
            </div>
          )}
        </div>
      </AvatarContext.Provider>
    );
  }
);

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "", onLoadingStatusChange, ...props }, ref) => {
    const { setImageLoadingStatus } = useAvatarContext();
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

    React.useEffect(() => {
      setImageLoadingStatus(status);
      onLoadingStatusChange?.(status);
    }, [status, setImageLoadingStatus, onLoadingStatusChange]);

    if (!src) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        {...props}
      />
    );
  }
);

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, delayMs, children, ...props }, ref) => {
    const { imageLoadingStatus } = useAvatarContext();
    const [canRender, setCanRender] = React.useState(delayMs === undefined);

    React.useEffect(() => {
      if (delayMs === undefined) return;
      const timer = window.setTimeout(() => setCanRender(true), delayMs);
      return () => window.clearTimeout(timer);
    }, [delayMs]);

    if (imageLoadingStatus === "loaded" || (imageLoadingStatus === "loading" && !canRender)) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center bg-inherit", className)}
        {...props}
      >
        {children ?? <User className="h-1/2 w-1/2" aria-hidden />}
      </div>
    );
  }
);

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, spacing = "normal", size = "md", className, ...props }, ref) => {
    const spacingClasses = {
      tight: "-space-x-2 sm:-space-x-3",
      normal: "-space-x-3 sm:-space-x-4",
      loose: "-space-x-4 sm:-space-x-5",
    };

    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remaining = childrenArray.length - max;

    return (
      <div ref={ref} className={cn("flex items-center", spacingClasses[spacing], className)} {...props}>
        {visibleChildren}
        {remaining > 0 && (
          <Avatar size={size} bordered>
            <AvatarFallback>+{remaining}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
