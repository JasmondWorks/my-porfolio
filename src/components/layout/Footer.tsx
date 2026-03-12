import Link from "next/link";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-white">P</span>
              </span>
              <span className="font-bold text-base tracking-tight text-foreground-heading">
                Portfolio<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-Stack Engineer crafting scalable systems and intuitive
              interfaces. I specialize in robust architecture and
              high-performance solutions.
            </p>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full bg-green-500"
                style={{ animation: "status-pulse 2s ease-in-out infinite" }}
              />
              Available for new projects
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-heading">
              Directory
            </h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-heading">
              Social
            </h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Open to collaborations and full-time roles.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row font-medium">
          <p>© {year} Portfolio. Built by Jasmond.</p>
          <p className="flex items-center gap-1.5">
            Crafted with{" "}
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Next.js
            </a>{" "}
            &amp;{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Tailwind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
