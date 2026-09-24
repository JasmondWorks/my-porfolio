export const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://obafemiolorede.com";
};

export const siteConfig = {
  name: "Obafemi Olorede",
  shortName: "Olorede",
  initials: "OO",
  handle: "@obafemi_lared",
  email: "obafemiolorede@gmail.com",
  role: "Full-Stack Engineer",
  location: "Lagos, Nigeria",
  url: getSiteUrl(),
  headline: "I build software that moves your numbers, not just your roadmap.",
  description:
    "Full-Stack Engineer specialising in scalable systems, real-time architectures, and intuitive interfaces.",
  resume: {
    pdf: "/resume.pdf",
    docx: "/Obafemi_Olorede_CV_Sept.docx",
  },
  links: {
    github: "https://github.com/jasmondWorks",
    linkedin: "https://linkedin.com/in/obafemi-olorede",
    twitter: "https://x.com/obafemi_lared",
    email: "mailto:obafemiolorede@gmail.com",
    resume: "/resume.pdf",
  },
} as const;

