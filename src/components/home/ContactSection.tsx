"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";

const LINKS = [
  {
    href: "mailto:hello@yourportfolio.dev",
    icon: Mail,
    label: "Email",
    value: "hello@yourportfolio.dev",
    external: false,
  },
  {
    href: "https://github.com",
    icon: Github,
    label: "GitHub",
    value: "github.com/you",
    external: true,
  },
  {
    href: "https://linkedin.com",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/you",
    external: true,
  },
  {
    href: "https://twitter.com",
    icon: Twitter,
    label: "Twitter",
    value: "@yourhandle",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[600px] bg-indigo-500/5 animate-glow-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-8 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Get in Touch
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground-heading sm:text-4xl">
            Let&apos;s build something{" "}
            <span className="gradient-text">great together.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Whether you have a project in mind, want to collaborate, or just
            want to say hello — my inbox is always open.
          </p>

          <Link
            href="mailto:hello@yourportfolio.dev"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            Send me an email <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto"
        >
          {LINKS.map(({ href, icon: Icon, label, value, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/30 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 group-hover:border-primary/20 group-hover:bg-primary/10 transition-colors">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground-heading">
                  {label}
                </p>
                <p className="text-[11px] text-muted-foreground truncate font-medium">
                  {value}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
