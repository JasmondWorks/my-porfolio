import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative container flex min-h-[calc(100vh-6rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 lg:py-40">
      {/* Background Grid Pattern - Subtle Linear Vibe */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="mx-auto flex max-w-[64rem] flex-col items-center space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Available for new projects
          <ChevronRight className="ml-1 h-3 w-3" />
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Crafting digital experiences with <br className="hidden sm:inline" />
          <span className="text-foreground/60">precision</span> and{" "}
          <span className="text-foreground/60">purpose.</span>
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Senior Full-Stack Engineer. Building scalable systems, intuitive
          interfaces, and solving complex problems with elegant code.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20"
            asChild
          >
            <Link href="#projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 bg-background/50 backdrop-blur-sm"
            asChild
          >
            <Link href="https://github.com" target="_blank">
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
