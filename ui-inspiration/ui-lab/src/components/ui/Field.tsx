import * as React from "react";
import { Input, InputProps } from "@/components/ui/Input";
import {
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
  Checkbox,
  Switch,
} from "@/components/ui/FormElements";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/cn";

// --- TYPES ---
export type FieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "tel"
  | "url"
  | "select"
  | "textarea"
  | "checkbox"
  | "switch";

interface BaseFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
}

// Discriminated union for props based on type would be ideal but complex for this snippet.
// We'll use intersection for simplicity and flexibility.
export type FieldProps = BaseFieldProps &
  (InputProps & SelectProps & TextareaProps) & {
    as?: FieldType;
    children?: React.ReactNode; // For Select options
  };

export function Field({
  as = "text",
  label,
  helperText,
  error,
  id,
  className,
  containerClassName,
  children,
  ...props
}: FieldProps) {
  const generatedId = React.useId();
  const fieldId = id || generatedId;

  // Handle Boolean Inputs (Checkbox, Switch) differently as they wrap differently
  if (as === "checkbox" || as === "switch") {
    return (
      <div className={cn("flex items-center space-x-2", containerClassName)}>
        {as === "checkbox" ? (
          <Checkbox
            id={fieldId}
            className={className}
            {...(props as React.ComponentProps<typeof Checkbox>)}
          />
        ) : (
          <Switch
            id={fieldId}
            className={className}
            {...(props as React.ComponentProps<typeof Switch>)}
          />
        )}
        <div className="grid gap-1.5 leading-none">
          {label && (
            <Label
              htmlFor={fieldId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-state-error",
              )}
            >
              {label}
            </Label>
          )}
          {descriptionOrError(helperText, error)}
        </div>
      </div>
    );
  }

  // Handle Standard Inputs
  return (
    <div className={cn("w-full space-y-2", containerClassName)}>
      {label && (
        <Label htmlFor={fieldId} className={error ? "text-state-error" : ""}>
          {label}
        </Label>
      )}

      {renderControl(as, fieldId, className, props, children, error)}

      {descriptionOrError(helperText, error)}
    </div>
  );
}

function renderControl(
  type: FieldType,
  id: string,
  className: string | undefined,
  props: Record<string, unknown>,
  children: React.ReactNode,
  error?: string,
) {
  const commonProps = {
    id,
    "aria-invalid": !!error,
    className: cn(
      className,
      error && "border-state-error focus-visible:ring-state-error",
    ),
    ...props,
  };

  switch (type) {
    case "textarea":
      return <Textarea {...commonProps} />;
    case "select":
      return <Select {...commonProps}>{children}</Select>;
    default:
      return <Input type={type} {...commonProps} />;
  }
}

function descriptionOrError(helperText?: string, error?: string) {
  if (error)
    return <p className="text-sm font-medium text-state-error">{error}</p>;
  if (helperText)
    return <p className="text-sm text-text-secondary">{helperText}</p>;
  return null;
}
