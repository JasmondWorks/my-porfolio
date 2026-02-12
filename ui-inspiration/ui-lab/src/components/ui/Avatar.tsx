import * as React from "react";
import { cn } from "@/lib/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full transition-shadow hover:ring-2 hover:ring-brand-primary/20",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src && !hasError ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-surface-subtle text-text-secondary font-medium uppercase border border-border-subtle">
          {fallback}
        </div>
      )}
    </div>
  );
}

export function AvatarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex -space-x-3 rtl:space-x-reverse", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<{
            className?: string;
          }>;
          return React.cloneElement(childElement, {
            className: cn(
              "ring-2 ring-surface-base",
              childElement.props.className,
            ),
          });
        }
        return child;
      })}
    </div>
  );
}
