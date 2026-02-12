import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border-default bg-surface-subtle/30",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 text-text-tertiary">
          {/* Ensure icon is sized if passed as raw node, or wrap it */}
          <div className="bg-surface-base p-4 rounded-full shadow-sm">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-text-secondary max-w-lg">
          {description}
        </p>
      )}

      {(action || children) && (
        <div className="mt-6">
          {action && (
            <Button onClick={action.onClick} variant="default">
              {action.label}
            </Button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
