import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

// --- BADGE ---
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-primary text-text-onBrand hover:bg-brand-primary/80",
        secondary:
          "border-transparent bg-surface-subtle text-text-primary hover:bg-surface-subtle/80",
        destructive:
          "border-transparent bg-state-error text-text-onBrand hover:bg-state-error/80",
        outline: "text-text-primary border-border-default",
        success:
          "border-transparent bg-state-success text-text-onBrand hover:bg-state-success/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// --- ALERT ---
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-text-primary",
  {
    variants: {
      variant: {
        default: "bg-surface-base text-text-primary border-border-default",
        destructive:
          "border-state-error/50 text-state-error dark:border-state-error [&>svg]:text-state-error",
        success:
          "border-state-success/50 text-state-success [&>svg]:text-state-success",
        info: "border-state-info/50 text-state-info [&>svg]:text-state-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const icons = {
  default: Info,
  destructive: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, children, ...props }, ref) => {
    const IconComponent = icons[variant as keyof typeof icons] || Info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon || <IconComponent className="h-4 w-4" />}
        <div className="text-sm font-medium leading-none tracking-tight mb-1">
          {children}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm [&_p]:leading-relaxed text-text-secondary pl-7",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Badge, badgeVariants, Alert, AlertDescription };
