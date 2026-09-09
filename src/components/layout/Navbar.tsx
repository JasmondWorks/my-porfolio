"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/data/siteConfig";

const NAV_LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
  {
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: siteConfig.links.twitter, icon: Twitter, label: "X" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled
            ? "border-border bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 transition-transform duration-200 group-hover:scale-105 overflow-hidden">
              {/* subtle inner highlight */}
              <span className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent" />
              <span className="relative text-[11px] font-black tracking-tighter text-white leading-none">
                OO
              </span>
            </span>
            <span className="font-bold text-sm tracking-tight text-foreground-heading">
              Olorede<span className="text-primary font-black">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-3 py-2 text-muted-foreground font-medium transition-all duration-150 hover:text-foreground rounded-md hover:bg-muted/50"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: socials + mobile toggle */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}

            {/* Divider */}
            <div className="hidden sm:block mx-1.5 h-4 w-px bg-border" />

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View Resume"
              title="View Resume"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              Resume
            </a>

            {/* CTA */}
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            >
              Hire Me
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden ml-1 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-md animate-slide-down md:hidden">
          <nav className="container py-8 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/40 transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-lg font-medium text-foreground hover:text-primary rounded-lg hover:bg-muted/40 transition-colors"
            >
              <FileText className="h-5 w-5 text-primary" />
              View Resume
            </a>
            <div className="my-4 h-px bg-border" />
            <div className="flex gap-3 px-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
