"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "checked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: SwitchSize;
  trackColor?: string;
  trackCheckedColor?: string;
  thumbColor?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      disabled,
      size = "md",
      trackColor = "bg-border",
      trackCheckedColor = "bg-origen-mandarina",
      thumbColor = "bg-white",
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const inputRef = React.useRef<HTMLInputElement | null>(null) as React.MutableRefObject<HTMLInputElement | null>;

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const sizeClasses: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
      sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
      md: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
      lg: { track: "h-7 w-12", thumb: "h-6 w-6", translate: "translate-x-5" },
    };

    const styles = sizeClasses[size];

    return (
      <label
        htmlFor={id}
        className={cn(
          "relative inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          {...props}
          id={id}
          ref={inputRef}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className="peer sr-only"
          onChange={(event) => {
            if (!isControlled) {
              setInternalChecked(event.target.checked);
            }
            onCheckedChange?.(event.target.checked);
            onChange?.(event);
          }}
        />

        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center rounded-full border-2 border-transparent p-0.5 transition-colors duration-200",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-origen-pradera/40 peer-focus-visible:ring-offset-2",
            styles.track,
            isChecked ? trackCheckedColor : trackColor
          )}
        >
          <span
            className={cn(
              "block rounded-full shadow-sm transition-transform duration-200",
              styles.thumb,
              thumbColor,
              isChecked && styles.translate
            )}
          />
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };