import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "driftcare-ng",
    title: "DriftCare NG",
    slug: "driftcare-ng",
    category: "Fullstack",
    featured: true,
    shortDescription:
      "AI-powered health monitoring platform that detects subtle wellness drift before it becomes a crisis.",
    longDescription:
      "DriftCare NG is a fullstack health intelligence platform built for Nigerian users that tracks daily wellbeing across 8 clinical dimensions (sleep, stress, mood, activity, hydration, symptom load, health status, and lifestyle) and computes a real-time 'drift score' — the percentage deviation from each user's personal baseline. Rather than comparing against population averages, the system establishes an individualised baseline from the user's first 10 check-ins, then flags deterioration trends early. An AI health companion, context-aware and culturally localised for Nigeria, delivers insights grounded in the user's actual drift data. Clinical outputs in HL7 FHIR R4 and SBAR format allow seamless handoff to medical professionals, making the platform EMR-integration ready.",
    techStack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Express",
      "MongoDB",
      "Mongoose",
      "TanStack React Query",
      "Tailwind CSS 4",
      "Radix UI",
      "Framer Motion",
      "Recharts",
      "OpenRouter",
      "Google Gemini 2.5 Flash",
      "JWT",
      "Cloudinary",
      "Web Push (VAPID)",
      "Redis",
      "Swagger / OpenAPI",
      "Vercel",
    ],
    coverImage: "/projects/driftcare/cover.png",
    githubUrl: "https://github.com/Donvictory/AI-HEALTHCARE-NEW",
    architecture: {
      description:
        "The frontend is a React 19 SPA served from Vercel's CDN. TanStack React Query owns all server state with stale-while-revalidate semantics. Auth is handled via JWT stored exclusively in HTTP-only cookies (access token: 1h, refresh token: 7d), with a non-httpOnly hint cookie letting React Router guards make synchronous auth decisions without exposing the real token to JavaScript. On 401, an Axios interceptor silently hits the refresh endpoint and retries the original request. API traffic routes to an Express backend deployed as Vercel Functions under /api/v1/. Each feature domain (user, check-in, dashboard, chat, doctor, media, task) is fully modular: its own controller, service, route, Mongoose model, DTO, validator, and entity. The AI chat endpoint builds a context window from the user's recent and baseline check-in cohorts, injects the computed drift percentage into the system prompt, and forwards the conversation to OpenRouter (Gemini 2.5 Flash) via a pluggable IAIProvider abstraction.",
    },
    engineeringDecisions: [
      {
        topic: "Auth Security",
        decision: "HTTP-only cookies for JWT over localStorage",
        reason:
          "localStorage is fully accessible to any JavaScript running on the page, making stored tokens trivially exfiltrable via XSS. HTTP-only cookies are inaccessible to JS by spec. A secondary non-httpOnly boolean hint cookie allows React Router guards to make synchronous auth decisions on first render without exposing the token.",
        tradeoff:
          "Requires CORS credentials (withCredentials: true) on every request and explicit SameSite configuration. Also complicates cross-subdomain auth if the client and API ever live on different origins.",
      },
      {
        topic: "AI Provider",
        decision: "OpenRouter with Google Gemini 2.5 Flash over direct OpenAI GPT-4o",
        reason:
          "Gemini 2.5 Flash provides near-GPT-4 quality at significantly lower cost-per-token, which matters for a health app where every dashboard load and chat message triggers an inference call. OpenRouter as the abstraction layer keeps the AI provider swappable without touching the chat service.",
        tradeoff:
          "Adds a network hop through OpenRouter's proxy. Output token limits were intentionally capped (300 for chat, 500 for structured extraction) to constrain latency and cost, which limits response depth for complex health questions.",
      },
      {
        topic: "AI Architecture",
        decision: "Pluggable AI provider pattern (IAIProvider interface + AIService registry)",
        reason:
          "Locking the chat service to a single SDK import makes model migration a refactor. The provider pattern means adding Anthropic or a locally-hosted model is a new file, not a modification to existing service logic.",
        tradeoff:
          "Introduces an abstraction layer for a system that currently has only one active provider, adding indirection when tracing an AI call.",
      },
      {
        topic: "Database",
        decision: "MongoDB over a relational database (PostgreSQL)",
        reason:
          "Health check-in data is highly variable: symptom arrays, lifestyle enums, and medical report lists differ per user and evolve as the product adds dimensions. A document model avoids schema migrations during fast MVP iteration. Mongoose's embedded document support collapses the 5-step check-in form into one atomic write.",
        tradeoff:
          "No joins — dashboard aggregations require multiple round-trips or $lookup pipelines. Referential integrity between User and DailyCheckIn documents is application-level responsibility.",
      },
      {
        topic: "Clinical Standards",
        decision: "HL7 FHIR R4 and SBAR as clinical output formats",
        reason:
          "Producing proprietary JSON blobs would limit the platform to consumers who custom-integrate with it. FHIR R4 is the mandated interoperability standard across Nigerian and international healthcare systems. SBAR is the clinical communication standard used by nurses and physicians for handoff.",
        tradeoff:
          "Full FHIR compliance is non-trivial. The current implementation maps sleep duration to LOINC code 8967-7 and uses a placeholder 85354-9 for the full health panel — integration-ready but not yet fully coded.",
      },
      {
        topic: "Platform Strategy",
        decision: "PWA over a native mobile app (React Native / Flutter)",
        reason:
          "A PWA is installable on iOS and Android directly from the browser with no App Store submission cycle. For a hackathon build targeting rapid user validation in Nigeria, reducing install friction and eliminating the store review delay was the dominant constraint.",
        tradeoff:
          "PWA push notifications on iOS are gated behind iOS 16.4+ and have lower reliability than native push channels. Background sync and certain device API access remain limited.",
      },
      {
        topic: "Drift Algorithm",
        decision: "Baseline-relative drift detection over population-average comparison",
        reason:
          "A user who chronically sleeps 5 hours is not the same as one who has recently dropped from 8 to 5. Using each user's own first 10 check-ins as a personalised baseline makes the drift signal clinically meaningful — it detects change, not deviation from a generic healthy norm.",
        tradeoff:
          "The model requires a minimum of 10 check-ins before baseline stabilises. New users see no drift data during onboarding, creating a dead period for the core feature.",
      },
    ],
    metrics: [
      {
        label: "Health Dimensions",
        value: "8",
        description:
          "Sleep, stress, mood, activity, hydration, symptom load, health status, lifestyle",
      },
      {
        label: "Auth Security",
        value: "XSS-proof",
        description:
          "HTTP-only JWT with JS hint cookie for synchronous route guards",
      },
      {
        label: "Drift Algorithm",
        value: "Personalised",
        description:
          "Detects individual deterioration trends — not population averages",
      },
      {
        label: "Clinical Standards",
        value: "FHIR R4 + SBAR",
        description: "EMR-integration ready without custom connectors",
      },
      {
        label: "AI Provider",
        value: "Swappable",
        description:
          "Zero service changes needed to swap Gemini for GPT-4o or a local model",
      },
      {
        label: "Platform",
        value: "PWA",
        description: "Installable on iOS & Android — no App Store gate",
      },
    ],
    futureImprovements: [
      "Migrate cron jobs (daily reset, push reminders) to Vercel Cron — the current node-cron setup breaks in Vercel's stateless serverless environment",
      "Fully wire Redis for API response caching and per-user rate limiting on the AI chat endpoint, which is currently unbounded",
      "Expand the drift algorithm from 3 dimensions (sleep, stress, mood) to all 8 scored dimensions for a more complete drift signal",
      "Complete FHIR LOINC coding — replace the placeholder code 85354-9 with correct LOINC codes per metric for true clinical compliance",
      "Persist chat conversation history per user session to MongoDB so the AI companion has multi-turn context across sessions",
    ],
    dateStr: "2025-03-01",
  },

  {
    id: "busly",
    title: "Busly",
    slug: "busly",
    category: "Fullstack",
    featured: true,
    shortDescription:
      "Stop-centric transit navigation for informal urban networks, built for Lagos.",
    longDescription:
      "Busly solves a navigation problem that Google Maps ignores: the informal, cash-based, route-flexible bus networks (Danfo, BRT, Keke) that move the majority of commuters in Lagos. Formal mapping tools assume fixed schedules and named streets — neither exists here. Busly models the city as a directed, weighted stop graph loaded into server memory at startup. A custom A* algorithm with a Haversine heuristic finds the optimal path across this graph, composing multi-leg journeys that may span several routes connected by walking transfers. Each stop in the returned path is enriched with the nearest landmark within 300m and a crowdsourced navigation cue, because landmark-based wayfinding is how real commuters navigate.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Framer Motion",
      "Leaflet",
      "Zustand",
      "React Query",
      "Radix UI",
      "React Router 7",
      "Express.js 5",
      "MongoDB Atlas",
      "Mongoose",
      "JWT",
      "Swagger / OpenAPI",
    ],
    coverImage: "/projects/busly/cover.png",
    githubUrl: "https://github.com/JasmondWorks/busly-frontend",
    architecture: {
      description:
        "On startup, the backend connects to MongoDB Atlas and loads all stops (nodes), active route stop sequences (directed ROUTE edges weighted by averageTravelTimeToNext in seconds), and transfer records (bidirectional TRANSFER edges with a walking penalty plus a 120-second boarding buffer) into a Map<string, GraphNode> adjacency list held in process memory — making all A* traversals pure in-memory operations with no DB round-trips on the hot path. For a journey search, the service snaps the user's coordinates to the 3 nearest transit stops via MongoDB's $geoNear aggregation, then runs two strategies in parallel: a direct DB query for single-route trips and an in-memory A* search with a Haversine heuristic. Results are merged, deduplicated, and sorted by total duration. Each stop in the path is enriched with the nearest landmark within 300m via a $near geospatial query. On the frontend, React Query manages all server state, a Zustand store holds the active journey session, and Framer Motion handles page transitions and journey progress animation.",
    },
    engineeringDecisions: [
      {
        topic: "Graph Performance",
        decision:
          "In-memory routing graph (singleton loaded at startup) instead of per-request MongoDB graph queries",
        reason:
          "MongoDB's aggregation pipeline is too slow for multi-hop graph traversal at request time. A* on a transit network with ~270 stops and ~700 edges needs sub-50ms traversal. Materializing the entire graph into a Map<string, GraphNode> at startup achieves this since all traversal is pure JavaScript object lookups.",
        tradeoff:
          "The graph is a point-in-time snapshot. Any change to stops, routes, or transfers in the DB requires a manual reloadGraphFromDB() call or server restart to take effect.",
      },
      {
        topic: "Route Search Strategy",
        decision:
          "Dual-strategy routing: DB direct-route query first, A* fallback for multi-transfer paths",
        reason:
          "The majority of journeys in a city transit network are single-route trips. A MongoDB query that checks whether both stops appear in the same stopsSequence array is cheaper and returns a more semantically clean result than unwinding an A* path for the same single-leg trip.",
        tradeoff:
          "Two code paths must be maintained and their results merged. Deduplication by route-leg fingerprint is necessary but could miss logically equivalent paths with different route segment orderings.",
      },
      {
        topic: "Pathfinding Algorithm",
        decision: "A* with Haversine heuristic (distance / 5m/s) instead of BFS or Dijkstra",
        reason:
          "Dijkstra explores nodes uniformly by cost, which is wasteful in a geographically embedded graph where the destination's rough direction is known. The Haversine straight-line distance divided by a conservative 5m/s base speed is an admissible heuristic, guaranteeing optimal paths while dramatically pruning the open set.",
        tradeoff:
          "The 5m/s constant is a simplification. In practice, transfers have walking speeds closer to 1–1.5m/s and buses operate at 6–10m/s in Lagos traffic.",
      },
      {
        topic: "Landmark Enrichment",
        decision:
          "Landmark injection via per-stop $near query rather than pre-joining on graph load",
        reason:
          "Landmarks are crowdsourced and change frequently. Pre-joining them into the graph at startup would mean landmark updates also require graph reloads. Keeping landmark enrichment as a live per-stop DB query ensures fresh cues without coupling landmark writes to graph lifecycle.",
        tradeoff:
          "For a path with N stops, this fires N sequential $near queries. Acceptable at low concurrency but would benefit from a batched geospatial lookup or landmark-proximity cache under load.",
      },
      {
        topic: "State Management",
        decision:
          "Zustand for active journey session state, React Query for all server state",
        reason:
          "Journey session state (current stop index, selected route, deviation flag) is purely client-side ephemeral state with no server equivalent — Zustand's minimal API is the right fit. React Query handles all async server state with automatic background refetching, caching, and stale-while-revalidate.",
        tradeoff:
          "Two state libraries must coexist. The boundary between what lives in Zustand vs the React Query cache must be consciously maintained, especially for derived data like the active stop's landmark details.",
      },
    ],
    metrics: [
      {
        label: "Graph Traversal",
        value: "O(1)",
        description:
          "In-memory Map lookups — zero DB round-trips on the A* hot path",
      },
      {
        label: "Dataset Coverage",
        value: "270 stops",
        description:
          "46 routes, 340 bidirectional transfers, 1,125 landmarks across Lagos metro",
      },
      {
        label: "Landmark Radius",
        value: "≤300m",
        description:
          "Human-readable navigation cues at every stop in a journey path",
      },
      {
        label: "Transfer Buffer",
        value: "120s",
        description:
          "Boarding buffer added to walking time for realistic multi-leg estimates",
      },
      {
        label: "Deviation Detection",
        value: "Real-time",
        description:
          "Surfaces alternate routes at decision nodes without a full re-search",
      },
    ],
    futureImprovements: [
      "Replace per-stop sequential $near landmark queries with a single batched geospatial lookup or a landmark proximity cache (TTL ~1 hour) to prevent O(N) DB queries per journey response under load",
      "Add a reloadGraph admin endpoint triggered by MongoDB change streams on Stop, Route, and Transfer collections, so live data changes propagate to the in-memory graph without a server restart",
      "Implement a Redis OD-pair cache keyed by originStopId:destStopId to serve repeat corridor queries (e.g. CMS → Ajah) without re-running A*",
      "Replace the A* open set's O(N) minimum scan with a binary min-heap priority queue to improve worst-case routing performance on denser graph expansions",
      "Add WebSocket push for trip session updates, replacing the current polling pattern for currentStop progression and deviation detection",
    ],
    dateStr: "2025-01-01",
  },

  {
    id: "faithcare-dashboard",
    title: "FaithCare Dashboard",
    slug: "faithcare-dashboard",
    category: "Frontend",
    shortDescription:
      "Dual-persona church management SPA with JWT auth, React Query, and real-time member tracking.",
    longDescription:
      "FaithCare is a church operations platform built as a React SPA that serves two distinct user personas: individual church members and organization administrators. Individual users get a personal spiritual growth suite — a Sunday sermon journal with scripture references, a server-persisted Pomodoro focus timer, and streak tracking. Organization admins get a full membership operations dashboard covering first-timer and second-timer tracking, prioritized follow-up management, community groups, salvation records, prayer request queues, and bulk CSV/Excel imports.",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Radix UI",
      "shadcn/ui",
      "TanStack Query v5",
      "React Router v7",
      "React Hook Form",
      "Zod",
      "Recharts",
      "Framer Motion",
      "cmdk",
    ],
    coverImage: "/projects/faithcare/cover.png",
    githubUrl: "https://github.com/Donvictory/Faithcare",
    architecture: {
      description:
        "The app is a Vite-bundled React SPA deployed to Vercel with a catch-all rewrite routing all paths to index.html. The short-lived JWT access token lives exclusively in a JavaScript module-scoped variable (never localStorage), providing XSS resistance. The long-lived refresh token is stored in an HTTP-only cookie. On any 401, a single-flight refresh mechanism blocks concurrent calls while queued requests are held in a subscriber array, then replayed with the new token once resolved. Data fetching uses TanStack Query v5 with query keys namespaced by organizationId and userId to prevent cross-tenant cache hits. The global cmdk command palette queries four API endpoints in parallel on open, and a SearchContext filters already-cached data client-side with zero per-keystroke API calls.",
    },
    engineeringDecisions: [
      {
        topic: "Auth Security",
        decision: "In-memory JWT access token with HTTP-only cookie refresh token",
        reason:
          "Storing access tokens in localStorage exposes them to any XSS script on the page. Keeping the access token in a module-scoped variable means it is never accessible from the DOM. The HTTP-only cookie carries the refresh token so the browser never exposes it to JavaScript at all.",
        tradeoff:
          "The in-memory token is lost on hard refresh, requiring a /auth/refresh call on every page load — one extra network round-trip before the app renders protected content.",
      },
      {
        topic: "Token Refresh",
        decision:
          "Single-flight token refresh with subscriber queue in the shared apiRequest wrapper",
        reason:
          "When an access token expires, multiple in-flight requests can simultaneously receive a 401. Without coordination, each would independently try to refresh, causing race conditions and potentially invalidating a fresh token with a redundant refresh call.",
        tradeoff:
          "The subscriber queue adds statefulness to what would otherwise be a pure fetch wrapper. If the refresh itself fails, all queued requests receive the original 401 and must handle it individually.",
      },
      {
        topic: "Component Library",
        decision: "shadcn/ui + Radix UI primitives over MUI",
        reason:
          "shadcn/ui generates unstyled, composable Radix primitives into the project source, giving full ownership over markup and styles. MUI was evaluated and rejected because its Emotion-based styling system would have required fighting the library to achieve the required visual output.",
        tradeoff:
          "Every primitive (Dialog, Select, Command, Sheet) required manual composition and accessible wiring, increasing initial build time compared to a fully-styled library.",
      },
      {
        topic: "Search Architecture",
        decision:
          "Client-side global search via SearchContext filtering already-cached query data",
        reason:
          "The main list views are already fetched by TanStack Query on page load and held in cache. Wiring search to server-side API endpoints would add debounced network calls on every keystroke and require managing additional loading states in the UI.",
        tradeoff:
          "Search is bounded by what is already in the client cache. For organizations with very large member datasets where the API paginates results, the search will only match visible records.",
      },
      {
        topic: "Persona Routing",
        decision: "localStorage userType flag for persona routing instead of server-enforced role guards",
        reason:
          "The backend returns a role field on the auth response. Reading this into localStorage as a derived userType string at login time was the fastest path to rendering the correct sidebar and dashboard without adding a dedicated roles endpoint call.",
        tradeoff:
          "The userType in localStorage can be tampered with client-side, which could expose organization UI to individual users. All API endpoints enforce authorization server-side, so the risk is a confused UI state, not a data breach.",
      },
    ],
    metrics: [
      {
        label: "Token Refresh",
        value: "Single-flight",
        description:
          "Subscriber queue prevents N concurrent /auth/refresh calls on simultaneous 401s",
      },
      {
        label: "Search Requests",
        value: "0 per keystroke",
        description:
          "Filters in-memory TanStack Query cache — no API calls during search",
      },
      {
        label: "Command Palette",
        value: "4 APIs in parallel",
        description:
          "Cross-feature results surfaced without sequential waterfall fetching",
      },
      {
        label: "Cache Isolation",
        value: "Zero leaks",
        description:
          "Query keys scoped by organizationId prevent cross-tenant contamination",
      },
      {
        label: "Timer Persistence",
        value: "Per-tick",
        description:
          "Server-persisted on each tick — survives tab close and reopen",
      },
    ],
    futureImprovements: [
      "Replace localStorage userType persona routing with server-side role claims read from the decoded JWT, removing the client-tampering surface entirely",
      "Add server-side paginated search with debouncing for first-timers and follow-ups to handle large church datasets beyond what fits in a single page response",
      "Implement WebSocket or SSE for real-time follow-up due-date alerts instead of requiring a manual page refresh to see updates from other admins",
      "Extract the token-refresh subscriber queue into a standalone service worker or broadcast channel so multiple tabs share a single refresh cycle",
    ],
    dateStr: "2024-08-01",
  },

  {
    id: "mervida",
    title: "Mervida",
    slug: "mervida",
    category: "Frontend",
    shortDescription:
      "A specialized food distribution platform for premium, clean-label Nigerian harvests with export capabilities.",
    longDescription:
      "Mervida by GFO Foods is an e-commerce and distribution platform designed to connect local Nigerian harvests with a global audience. It serves multiple customer segments by providing retail shopping, bulk wholesale supply for corporate clients, and specialized 'personal shopper' services for the diaspora. To handle complex logistics and variable delivery fees, the platform utilises a streamlined WhatsApp checkout flow that routes orders directly to customer service for consultation.",
    techStack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Framer Motion",
      "Lucide React",
    ],
    coverImage: "/projects/mervida/cover.png",
    demoVideo: "/projects/mervida/demo.mp4",
    githubUrl: "https://github.com/Jasmond/gfo-distro",
    liveUrl: "https://mervida.com",
    architecture: {
      description:
        "The application is built on the Next.js App Router paradigm, leveraging React Server Components for optimal SEO and initial page load performance. The UI layer is constructed using a bespoke component system styled with Tailwind CSS v4 and animated using Framer Motion. Data flow for user orders bypasses traditional automated payment gateways, instead formatting cart contents and routing them directly to a WhatsApp Business API endpoint for human-in-the-loop processing.",
    },
    engineeringDecisions: [
      {
        topic: "Rendering Strategy",
        decision: "Next.js App Router with React Server Components",
        reason:
          "Chosen for its out-of-the-box SEO benefits, file-based routing, and ability to serve static pages rapidly, which is crucial for an e-commerce catalog.",
        tradeoff:
          "Requires a strict mental model separation between client and server components, occasionally adding complexity to interactive state management.",
      },
      {
        topic: "Checkout Flow",
        decision: "WhatsApp checkout routing over automated payment gateways",
        reason:
          "Selected over Paystack or Stripe to accommodate custom delivery fees, bulk wholesale orders, and specialised diaspora services that require human consultation.",
        tradeoff:
          "Sacrifices end-to-end checkout automation in favour of high-touch customer service and maximum logistical flexibility.",
      },
      {
        topic: "UI Architecture",
        decision: "Custom UI components over component libraries (MUI, Chakra UI)",
        reason:
          "Building bespoke components with Tailwind CSS and Framer Motion ensures the platform's visual identity matches its 'natural, clean-label' brand aesthetic perfectly.",
        tradeoff:
          "Increased initial development time, but resulted in a lighter, more unique interface than any pre-built library would have produced.",
      },
    ],
    metrics: [
      {
        label: "Core Web Vitals",
        value: "Optimized LCP",
        description: "Via Next/Image and React Server Components",
      },
      {
        label: "Customer Segments",
        value: "3",
        description: "Retail, wholesale corporate, and diaspora personal shoppers",
      },
      {
        label: "Cart Abandonment",
        value: "Reduced",
        description:
          "High-friction logistics queries routed directly to WhatsApp support",
      },
    ],
    futureImprovements: [
      "Integrate a headless CMS (e.g., Sanity or Strapi) to allow non-technical staff to update the product catalog dynamically",
      "Implement a localised payment gateway for fully automated retail checkouts alongside the WhatsApp flow",
      "Add internationalisation (i18n) to natively support multiple languages for the global diaspora audience",
    ],
    dateStr: "2024-11-01",
  },

  {
    id: "seamless-point",
    title: "Seamless Point",
    slug: "seamless-point",
    category: "Frontend",
    featured: true,
    shortDescription:
      "All-in-one platform for logistics, utility payments, and on-demand technical services.",
    longDescription:
      "Seamless Point is a comprehensive web platform built to unify everyday essential services. Users can effortlessly schedule nationwide and international package deliveries, securely pay for utility bills and data bundles, and connect with vetted technicians on demand. By consolidating these disparate services into a single interface, it provides a frictionless user experience powered by a robust Next.js frontend communicating with a scalable external API.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Paystack",
      "Radix UI",
      "React Hook Form",
      "Zod",
    ],
    coverImage: "/projects/seamless-point/cover.png",
    githubUrl: "https://github.com/JasmondWorks/seamless-point2",
    liveUrl: "https://seamless-point.vercel.app",
    architecture: {
      description:
        "The application leverages the Next.js App Router for optimal routing and rendering. Next.js Server Actions securely communicate with the external backend API, handling authentication, data fetching, and business logic encapsulation. Global UI state is managed by Zustand, while TanStack Query handles server state, caching, and optimistic updates for dashboard metrics. Payment processing is integrated via Paystack, with a custom mathematics module that accurately pre-computes complex local and international fee structures (kobo math) on the edge. Authentication flows use a mix of local JWTs and Google OAuth.",
    },
    engineeringDecisions: [
      {
        topic: "Architecture",
        decision: "Decoupled Next.js frontend communicating with an external backend API",
        reason:
          "Allowed the frontend to focus purely on UI/UX, caching, and client state management, while the backend independently scales to handle heavy transaction loads and third-party webhooks for logistics and utility payments.",
        tradeoff:
          "Requires strict synchronisation between frontend TypeScript interfaces and backend API contracts, increasing overhead for type sharing.",
      },
      {
        topic: "State Management",
        decision: "TanStack Query alongside Zustand",
        reason:
          "Zustand provides a lightweight, boilerplate-free solution for localised UI states (multi-step forms, modals), while TanStack Query exclusively manages asynchronous server state, ensuring efficient caching and reducing redundant network requests.",
        tradeoff:
          "Introduces two separate state management paradigms, requiring clear architectural boundaries on what state lives where.",
      },
      {
        topic: "Payment Integration",
        decision: "Custom Paystack fee computation logic on the client",
        reason:
          "Ensures the UI accurately displays gross and net charges to users in real-time (handling local caps, waivers, and international flat rates) before initiating the transaction with the payment gateway.",
        tradeoff:
          "Adds computation complexity to the frontend that must be kept precisely in sync with Paystack's official pricing structures to prevent discrepancies.",
      },
    ],
    metrics: [
      {
        label: "Service Verticals",
        value: "3",
        description:
          "Logistics, utility bills, and on-demand technicians in one interface",
      },
      {
        label: "Payment Accuracy",
        value: "100%",
        description:
          "Custom Paystack kobo math for local (₦) and international transactions",
      },
      {
        label: "Data Fetching",
        value: "Zero-latency feel",
        description: "Stale-while-revalidate caching via TanStack Query",
      },
    ],
    futureImprovements: [
      "Implement real-time tracking for logistics and delivery requests using WebSockets",
      "Transition to a strictly typed monorepo (e.g., Turborepo) to natively share TypeScript interfaces between frontend and backend",
      "Expand automated test coverage using Playwright for end-to-end critical user flows",
    ],
    dateStr: "2024-02-01",
  },

  {
    id: "discover-io",
    title: "Discover.io",
    slug: "discover-io",
    category: "Frontend",
    shortDescription:
      "An AI-powered discovery platform that recommends tailored AI tools based on user context and workflows.",
    longDescription:
      "Discover.io solves the problem of finding reliable and context-specific AI tools in a crowded ecosystem. Unlike generic search engines, it acts as an intelligent discovery platform that listens to a user's specific problem, persona, and core task, clarifies the intent, and curates a ranked leaderboard of verified AI tools. It focuses on workflow integration, offering practical guidance and explicit trade-offs for each recommendation to help creative professionals work more efficiently.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack React Query",
      "Axios",
      "Framer Motion",
      "React Hook Form",
    ],
    coverImage: "/projects/discover-io/cover.png",
    demoVideo: "/projects/discover-io/demo.mp4",
    githubUrl: "https://github.com/JasmondWorks/discovery_io_frontend",
    liveUrl: "https://discoverio-frontend.vercel.app",
    architecture: {
      description:
        "The frontend is a Client-Side Rendered Single Page Application using React and Vite. TanStack React Query manages all asynchronous server state with efficient data caching, automatic retries, and seamless backend synchronisation. API client logic is decoupled from UI components via custom hooks built on Axios. The multi-step AI search flow (Input → Clarification → Confirmation → Results) is managed locally, leveraging Framer Motion for perceived zero-latency transitions between steps.",
    },
    engineeringDecisions: [
      {
        topic: "State Management",
        decision: "TanStack React Query for server state",
        reason:
          "It provides built-in caching, background refetching, and robust error handling, which is crucial for managing variable response times from AI endpoints and preventing redundant network requests.",
        tradeoff:
          "Requires stricter structuring of query keys and mutations compared to standard useEffect data fetching.",
      },
      {
        topic: "UX Flow",
        decision:
          "Multi-step 'Clarification' flow before executing AI searches",
        reason:
          "AI recommendation engines often misinterpret generic queries. By explicitly extracting the User Persona, Core Task, and Success Criteria — and requiring user confirmation — the accuracy of recommendations improved drastically.",
        tradeoff:
          "Added an extra confirmation step to the user journey in exchange for significantly higher-quality, context-driven results.",
      },
      {
        topic: "Build Tool",
        decision: "Vite over a full-stack framework like Next.js",
        reason:
          "Vite provided lightning-fast HMR and optimised build times for an MVP that is strictly a Client-Side Rendered application interacting with external AI APIs.",
        tradeoff:
          "Sacrificed out-of-the-box SEO optimisation and server-side routing capabilities, which may necessitate a migration if organic SEO becomes a primary growth vector.",
      },
    ],
    metrics: [
      {
        label: "Recommendation Accuracy",
        value: "80%+",
        description:
          "Multi-step clarification extracts persona, task, and success criteria before search",
      },
      {
        label: "Page Load",
        value: "<3s",
        description: "Sub-5s search latency via React Query caching",
      },
      {
        label: "Tools Indexed",
        value: "50+",
        description:
          "Verified database — zero LLM hallucinations of non-existent tools",
      },
    ],
    futureImprovements: [
      "Migrate to Next.js for Server-Side Rendering to improve public SEO indexing of the skills and tools catalog",
      "Implement streaming responses (Server-Sent Events) for AI interactions to further reduce perceived latency during the Diagnosis phase",
      "Introduce persistent user profiles to cache onboarding data for long-term personalised recommendations",
    ],
    dateStr: "2024-05-01",
  },
  {
    id: "interlynk-hr",
    title: "Interlynk HR",
    slug: "interlynk-hr",
    category: "Fullstack",
    featured: true,
    shortDescription:
      "Modern talent acquisition & HR management platform unifying candidate discovery, applicant tracking, and workforce oversight.",
    longDescription:
      "Interlynk HR (HR Search) is an end-to-end recruitment and human resources management platform designed to streamline hiring workflows for both job seekers and hiring teams. For candidates, it provides a centralized profile with one-click multi-role applications and transparent status tracking. For employers, it delivers an integrated talent pipeline dashboard with applicant evaluation stages, employee directory oversight, and active project team assignments. Built with the Next.js App Router and designed with developer-grade aesthetics, Interlynk replaces fragmented hiring tooling with a single coherent system.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "TanStack React Query",
      "Radix UI",
      "Framer Motion",
      "Lucide React",
      "Node.js",
      "REST API",
      "Vercel",
    ],
    coverImage: "/projects/interlynk-hr/cover.png",
    githubUrl: "https://github.com/JasmondWorks/hr-management-frontend",
    liveUrl: "https://interlynk-hr.vercel.app/",
    architecture: {
      description:
        "The application utilizes Next.js App Router with React Server Components for fast initial dashboard loads and SEO-optimized public landing pages. Client interactivity—including drag-and-drop applicant pipelines and dynamic filter facets—is powered by React 19 and TanStack Query with optimistic UI updates. Authentication routes through role-based access control (candidate vs. employer vs. admin). REST endpoints handle candidate submissions, resume metadata extraction, and real-time status notifications.",
    },
    engineeringDecisions: [
      {
        topic: "Unified Candidate-Employer Architecture",
        decision:
          "Single multi-role application platform instead of separate candidate portal and employer ATS",
        reason:
          "Consolidating candidate profiles and employer dashboards in one codebase enabled shared design tokens, unified authentication, and frictionless transitions when company users apply to external roles or collaborate internally.",
        tradeoff:
          "Demanded strict role-based data isolation at the API middleware layer to prevent cross-tenant access.",
      },
      {
        topic: "Pipeline State Management",
        decision:
          "TanStack Query optimistic mutations for applicant tracking stages",
        reason:
          "Recruiters move candidates between stages (Applied → Screening → Interview → Offer) frequently. Optimistic UI updates ensure instantaneous drag-and-drop response without waiting for network round-trips.",
        tradeoff:
          "Requires rollback logic and error toast handling if a stage update fails due to server-side validation or concurrency conflicts.",
      },
      {
        topic: "UI Component Architecture",
        decision: "Radix UI headless primitives styled with Tailwind CSS",
        reason:
          "Ensured full keyboard accessibility (WAI-ARIA compliance) across complex modal dialogs, candidate dropdowns, and status badges while keeping the dark-mode aesthetic cohesive.",
        tradeoff:
          "Requires configuring bespoke component wrappers compared to an off-the-shelf pre-styled UI kit.",
      },
    ],
    metrics: [
      {
        label: "Application Flow",
        value: "<2 min",
        description: "One-click application flow with reusable candidate profiles",
      },
      {
        label: "Pipeline Latency",
        value: "<100ms",
        description: "Optimistic stage updates and cached applicant lists",
      },
      {
        label: "Role Discovery",
        value: "Real-Time",
        description: "Instantaneous multi-facet search across organizations and roles",
      },
    ],
    futureImprovements: [
      "Implement automated AI resume-to-job description semantic matching score",
      "Add automated interview scheduling integration with Google Calendar and Outlook",
      "Support enterprise custom hiring workflow stages and webhook notifications for Slack/Teams",
    ],
    dateStr: "2024-11-15",
  },
];
