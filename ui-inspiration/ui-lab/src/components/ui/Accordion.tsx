import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b border-border-default last:border-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, isOpen, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full flex-1 items-center justify-between py-4 font-medium transition-all hover:text-brand-primary [&[data-state=open]>svg]:rotate-180",
      className,
    )}
    data-state={isOpen ? "open" : "closed"}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-text-tertiary" />
  </button>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      isOpen ? "block" : "hidden",
    )}
    data-state={isOpen ? "open" : "closed"}
    {...props}
  >
    <div className={cn("pb-4 pt-0 text-text-secondary", className)}>
      {children}
    </div>
  </div>
));
AccordionContent.displayName = "AccordionContent";

// Simple stateful wrapper for ease of use
const AccordionSingle = ({
  items,
  className,
}: {
  items: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  className?: string;
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(items.filter((i) => i.defaultOpen).map((i) => i.id)),
  );

  const toggle = (id: string) => {
    const newSet = new Set(openItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenItems(newSet);
  };

  return (
    <Accordion className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id}>
          <AccordionTrigger
            onClick={() => toggle(item.id)}
            isOpen={openItems.has(item.id)}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent isOpen={openItems.has(item.id)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionSingle,
};
