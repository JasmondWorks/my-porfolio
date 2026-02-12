import * as React from "react";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Alert";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  tier,
  price,
  period = "/mo",
  description,
  features,
  popular,
  ctaText = "Get Started",
  onCtaClick,
  className,
  ...props
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all hover:shadow-lg",
        popular && "border-brand-primary shadow-md scale-105 z-10",
        className,
      )}
      {...props}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-brand-primary text-white hover:bg-brand-primary">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl text-text-primary">{tier}</CardTitle>
        <div className="mt-2 flex items-baseline text-text-primary">
          <span className="text-4xl font-extrabold tracking-tight">
            {price}
          </span>
          <span className="ml-1 text-xl font-medium text-text-tertiary">
            {period}
          </span>
        </div>
        {description && (
          <CardDescription className="mt-4">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check
                  className={cn(
                    "h-5 w-5",
                    feature.included
                      ? "text-brand-primary"
                      : "text-text-tertiary/20",
                  )}
                />
              </div>
              <p
                className={cn(
                  "ml-3 text-sm",
                  feature.included
                    ? "text-text-secondary"
                    : "text-text-tertiary decoration-slice",
                )}
              >
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className={cn("w-full transition-all", popular ? "shadow-brand" : "")}
          variant={popular ? "default" : "outline"}
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
