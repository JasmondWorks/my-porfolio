import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "seamless-point",
    title: "SeamlessPoint",
    slug: "seamless-point",
    category: "Fullstack",
    shortDescription:
      "All-in-one platform for logistics, payments, and utility services.",
    longDescription:
      "A comprehensive logistics and lifestyle platform designed to streamline daily tasks. Users can send packages locally and internationally, pay utility bills (electricity, water), purchase airtime and data, and manage their wallets. The platform integrates multiple third-party services to provide a seamless experience.",
    techStack: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "Paystack",
      "T-ship",
      "Rest API",
      "Tailwind CSS",
    ],
    coverImage: "/projects/seamless-point.png",
    demoVideo: "/projects/seamless-point/demo.mp4",
    liveUrl: "https://seamlesspoint.ng",
    architecture: {
      description:
        "Built with a decoupled architecture. The Next.js frontend communicates with a scalable Node.js backend. Shipping logistics are handled via T-ship integration, while payments are securely processed through Paystack. The system features a wallet system for quick transactions and robust user authentication.",
    },
    engineeringDecisions: [
      {
        topic: "Payment Integration",
        decision: "Paystack",
        reason:
          "Reliable and widely trusted payment gateway in the target region with excellent developer documentation.",
        tradeoff:
          "Dependent on external service uptime, handled via webhooks for transaction verification.",
      },
      {
        topic: "Logistics Aggregation",
        decision: "T-ship API Integration",
        reason:
          "Allowed rapid access to multiple courier services without building individual integrations for each carrier.",
      },
    ],
    metrics: [
      {
        label: "Services",
        value: "5+",
        description: "Shipping, Airtime, Data, Bills, etc.",
      },
      { label: "Platform", value: "Web", description: "Responsive Web App" },
    ],
    dateStr: "2024-02-01",
  },
  {
    id: "1",
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    category: "Fullstack",
    shortDescription:
      "Real-time analytics dashboard for high-volume e-commerce stores.",
    longDescription:
      "A comprehensive dashboard for store owners to track sales, inventory, and customer metrics in real-time. Built with performance and scalability in mind to handle thousands of concurrent events.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Redis",
    ],
    coverImage: "/projects/ecommerce-dashboard.png",
    demoVideo: "/videos/dashboard-demo.mp4",
    githubUrl: "https://github.com/username/dashboard",
    liveUrl: "https://dashboard-demo.com",
    architecture: {
      description:
        "The application uses a serverless architecture on Vercel. Data is ingested via webhooks into a Redis queue, processed by background workers, and stored in PostgreSQL. Real-time updates are pushed to the client using Server-Sent Events (SSE).",
    },
    engineeringDecisions: [
      {
        topic: "State Management",
        decision: "Zustand",
        reason:
          "Chosen for its simplicity and small bundle size compared to Redux.",
        tradeoff:
          "Less ecosystem tools than Redux, but sufficient for this scale.",
      },
      {
        topic: "Database",
        decision: "PostgreSQL + Prisma",
        reason:
          "Relational data model fit the product requirements perfectly. Prisma provides type safety.",
      },
    ],
    metrics: [
      {
        label: "Lighthouse Score",
        value: "98/100",
        description: "Performance optimization",
      },
      {
        label: "Query Time",
        value: "<50ms",
        description: "Average database query time",
      },
    ],
    dateStr: "2023-11-01",
  },
  {
    id: "2",
    title: "Travel Companion App",
    slug: "travel-app",
    category: "Mobile",
    shortDescription:
      "React Native app for planning trips and tracking expenses.",
    longDescription:
      "A mobile application designed to help travelers plan their itineraries, track expenses in multi-currency, and journal their experiences offline.",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "SQLite",
    ],
    coverImage: "/projects/travel-app.png",
    githubUrl: "https://github.com/username/travel-app",
    engineeringDecisions: [
      {
        topic: "Offline First",
        decision: "SQLite + Sync",
        reason:
          "Travelers often lack internet access. Local-first architecture ensures UX is never blocked.",
      },
    ],
    metrics: [],
    dateStr: "2023-08-15",
  },
];
