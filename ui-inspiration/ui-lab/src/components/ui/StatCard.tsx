import * as React from "react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            {icon && (
              <div className="p-2 bg-surface-subtle rounded-md text-text-secondary">
                {icon}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-text-tertiary">{title}</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                  {value}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {trend && (
          <div className="mt-4 flex items-center text-sm">
            <span
              className={cn(
                "flex items-center font-medium",
                trend.direction === "up" && "text-state-success",
                trend.direction === "down" && "text-state-error",
                trend.direction === "neutral" && "text-text-secondary",
              )}
            >
              {trend.direction === "up" && (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              )}
              {trend.direction === "down" && (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              {trend.direction === "neutral" && (
                <Minus className="mr-1 h-4 w-4" />
              )}
              {trend.value}
            </span>
            <span className="ml-2 text-text-tertiary">
              {trend.label || "from last month"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
