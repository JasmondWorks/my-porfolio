import * as React from "react";
import { cn } from "@/lib/cn";
import { Label } from "./Label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-2">
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {startIcon}
            </div>
          )}

          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              startIcon && "pl-10",
              endIcon && "pr-10",
              error && "border-state-error focus-visible:ring-state-error",
              className,
            )}
            ref={ref}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-state-error">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
