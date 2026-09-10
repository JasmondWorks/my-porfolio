import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "driftcare-ng",
    title: "DriftCare NG",
    slug: "driftcare-ng",
    category: "Fullstack",
    featured: true,
    shortDescription:
      "Catches health decline weeks before it turns into an ER visit, by learning what's normal for you specifically, not the population.",
    longDescription:
      "Most health apps compare users to a generic population average. That means real deterioration, like someone who's dropped from 8 hours of sleep to 5, or whose stress has been climbing for two weeks, gets lost in the noise until it's an emergency. DriftCare NG builds a personal baseline for every user from their first 10 check-ins across 8 wellbeing dimensions, then surfaces a live 'drift score' the moment their trend breaks from their own normal. An AI health companion, localised for a Nigerian context, turns that drift data into plain-language guidance instead of a chart the user has to interpret alone. Outputs are formatted in the clinical standards hospitals already use (HL7 FHIR R4, SBAR), so a flagged user can hand their data straight to a doctor with no translation step in between.",
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
    coverImage: "/projects/driftcare/landing-cover.png",
    githubUrl: "https://github.com/Donvictory/AI-HEALTHCARE-NEW",
    liveUrl: "https://ai-healthcare-new.vercel.app/",
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
        label: "Early Detection",
        value: "Personalised",
        description:
          "Flags decline against each user's own baseline, not a population average, so warning signs surface before a crisis instead of after",
      },
      {
        label: "Clinical Handoff",
        value: "FHIR R4 + SBAR",
        description:
          "Data is formatted to the standards hospitals already use, so a flagged user can hand it to a doctor with no translation step",
      },
      {
        label: "Time to Install",
        value: "No App Store gate",
        description:
          "Installable straight from the browser on iOS and Android, no review cycle standing between a user and getting help",
      },
      {
        label: "Wellbeing Coverage",
        value: "8 dimensions",
        description:
          "Sleep, stress, mood, activity, hydration, symptom load, health status, and lifestyle tracked daily, not just at a checkup",
      },
      {
        label: "AI Cost Control",
        value: "Swappable provider",
        description:
          "The AI model can be swapped for a cheaper or more capable one with no rework, so inference cost doesn't become a scaling problem",
      },
      {
        label: "Account Security",
        value: "XSS-proof",
        description:
          "Login tokens are inaccessible to malicious scripts, protecting sensitive health data from the most common web attack vector",
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
      "Turns a 20-minute guessing game at the bus stop into a 3-second answer, for the millions of Lagos commuters Google Maps can't route.",
    longDescription:
      "Google Maps has no answer for most Lagos commuters, because it assumes fixed schedules and named streets, and the informal bus networks that actually move this city (Danfo, BRT, Keke) have neither. That gap costs commuters real time every day to guesswork: which bus, which stop, which transfer. Busly closes it by modelling the entire city as a live transit graph and running real-time pathfinding across it, composing multi-leg journeys, including walking transfers between routes, in a fraction of a second. Commuters navigate by landmarks, not addresses, so every stop in the result comes with the nearest recognisable landmark and a crowdsourced cue ('the bus stop by the blue kiosk'). That's the difference between a technically correct route and one a rider can actually act on standing at a bus stop.",
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
    liveUrl: "https://busly-ng.vercel.app/",
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
        label: "Route Lookup",
        value: "Sub-50ms",
        description:
          "A journey plan returns near-instantly, even across multi-transfer trips. Fast enough to use standing at a bus stop, not back at home planning ahead",
      },
      {
        label: "City Coverage",
        value: "270 stops",
        description:
          "46 routes and 340 transfers mapped across Lagos metro, a navigable network where none existed before",
      },
      {
        label: "Actionable Directions",
        value: "1,125 landmarks",
        description:
          "Every stop comes with a real-world landmark cue. 'Turn left at the blue kiosk' gets a commuter where they're going; GPS coordinates alone don't",
      },
      {
        label: "Realistic Estimates",
        value: "120s boarding buffer",
        description:
          "Journey times account for real boarding delays, so the ETA a rider sees is one they can actually trust",
      },
      {
        label: "Mid-Trip Recovery",
        value: "Real-time",
        description:
          "If a rider deviates from the planned route, alternatives surface instantly instead of leaving them stranded to figure it out alone",
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
      "Replaces the spreadsheet-and-sticky-notes system churches use to track first-timers, so no one who walks through the door gets forgotten.",
    longDescription:
      "Church growth teams lose people at the exact moment they're most reachable: right after a first visit, when follow-up needs to happen fast and consistently. In practice that tracking usually lives in someone's notebook or a spreadsheet no one else checks. FaithCare replaces that with a real operations dashboard built for church admin teams: first-timer and second-timer tracking, prioritised follow-up queues, community groups, salvation records, and prayer requests, all in one place, with bulk CSV/Excel import so existing member data isn't lost in the switch. For individual members, the same platform doubles as a personal growth tool with a sermon journal, a focus timer, and streak tracking, giving the church a reason for members to open the app between services, not just show up to them.",
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
    liveUrl: "https://faithcare-home.vercel.app/",
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
        label: "Admin Search",
        value: "Instant",
        description:
          "Staff find any member or record with no loading delay, no waiting between keystrokes while managing a follow-up call",
      },
      {
        label: "Cross-Feature Lookup",
        value: "4 sources at once",
        description:
          "One search surfaces members, follow-ups, groups, and prayer requests together, instead of admins hunting across separate screens",
      },
      {
        label: "Data Privacy",
        value: "Zero cross-org leaks",
        description:
          "Each organisation's member data is fully isolated, so multi-branch churches can trust the platform with sensitive records",
      },
      {
        label: "Growth Tracking",
        value: "Never lost",
        description:
          "A member's focus streaks and journal entries persist across devices and sessions, keeping engagement data intact",
      },
      {
        label: "Session Reliability",
        value: "No duplicate logouts",
        description:
          "Admins mid-task never get bounced by a botched token refresh, even with several records open at once",
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
      "Opened three new revenue streams for a Nigerian food brand, retail, bulk wholesale, and diaspora orders, from a single storefront.",
    longDescription:
      "GFO Foods needed to sell premium, clean-label Nigerian harvests to three completely different buyers: everyday retail shoppers, corporate clients ordering in bulk, and diaspora customers who want product delivered to family back home. Each has different pricing, logistics, and service expectations that a standard checkout couldn't handle. Mervida solves this with one storefront that adapts to whoever's buying, and a WhatsApp-based checkout that routes every order to a real person for consultation on delivery fees and logistics. A wholesale buyer or a complex diaspora order that would have bounced off a generic checkout form now becomes a sales conversation instead. One platform, three markets, without the cost of building three separate systems.",
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
        label: "Revenue Segments",
        value: "3 markets, 1 platform",
        description:
          "Retail, wholesale corporate, and diaspora personal-shopper orders, each served without a separate build",
      },
      {
        label: "Checkout Recovery",
        value: "Cart abandonment reduced",
        description:
          "Complex logistics questions that would have killed a generic checkout now route straight to a real conversation with support",
      },
      {
        label: "First Impression",
        value: "Fast-loading catalog",
        description:
          "Product pages load quickly and rank well in search, so buyers land on the site instead of bouncing before they see the harvest",
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
      "Turns three separate apps (delivery, bill payments, and finding a technician) into one habit, so users never have a reason to leave for a competitor.",
    longDescription:
      "Every one of Seamless Point's services, package delivery, utility and data bill payments, on-demand technicians, already has standalone competitors. The business case for building one platform instead of three is retention: a user who only came to pay a light bill can schedule a delivery in the same session, without downloading another app or trusting another brand. That only works if the experience feels effortless end to end. The platform pre-computes exact delivery and payment fees, including the notoriously fiddly local and international transaction math, before the user commits. No 'wait, how much will this actually cost' hesitation left to kill the conversion.",
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
        label: "Cross-Sell Surface",
        value: "3 services, 1 login",
        description:
          "Logistics, utility bills, and on-demand technicians live in one account, so every visit is a chance to sell a second service",
      },
      {
        label: "Checkout Trust",
        value: "100% fee accuracy",
        description:
          "Users see the exact local and international charge before paying, no surprise fees to trigger a refund request or a lost customer",
      },
      {
        label: "Perceived Speed",
        value: "Zero-latency feel",
        description:
          "Dashboards and balances update instantly on-screen, so the app feels reliable even before the network catches up",
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
      "Cuts hours of 'which AI tool do I even need' research down to one guided conversation, with zero hallucinated recommendations.",
    longDescription:
      "The AI tools market is too crowded and changes too fast for a generic search engine to answer 'what should I use for this' honestly. A wrong recommendation costs a professional real time evaluating a tool that was never going to fit their workflow. Discover.io solves that with a guided clarification flow that extracts the user's actual persona, task, and success criteria before recommending anything, then ranks results from a verified tool database instead of letting an LLM invent plausible-sounding options that don't exist. The extra 30 seconds of clarification is a deliberate trade: a small amount of user patience up front, in exchange for a recommendation worth acting on.",
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
        label: "Recommendation Quality",
        value: "80%+ accuracy",
        description:
          "Clarifying intent before searching means users act on the first recommendation instead of trying three wrong ones",
      },
      {
        label: "Trust",
        value: "Zero hallucinated tools",
        description:
          "Every result comes from a verified 50+ tool database, so no professional wastes time chasing a tool that doesn't exist",
      },
      {
        label: "Time to Answer",
        value: "Under 3s",
        description:
          "Recommendations return fast enough to stay inside a user's train of thought, not break it",
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
      "Cuts a candidate's application from a 10-minute form to under 2 minutes, and gives hiring teams one board instead of five disconnected tools.",
    longDescription:
      "Hiring breaks down on both sides of the table. Candidates abandon applications that make them re-enter the same information for every role, and hiring teams lose track of who's where in the pipeline when tracking lives across spreadsheets, email threads, and a separate employee directory. Interlynk HR fixes both. Candidates build one reusable profile and apply to multiple roles in under two minutes instead of filling out a form from scratch each time, directly reducing the drop-off that happens mid-application. Hiring teams get a single pipeline board where moving a candidate from Applied to Interview is a drag-and-drop action that updates instantly, so a stage change made in a screening call shows up the moment the recruiter releases the mouse, not after a page refresh.",
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
        label: "Candidate Drop-off",
        value: "<2 min to apply",
        description:
          "Reusable profiles turn a repetitive form into a near-instant submission, so fewer candidates abandon mid-application",
      },
      {
        label: "Recruiter Efficiency",
        value: "Instant stage updates",
        description:
          "Moving a candidate through the pipeline updates immediately, so recruiter time goes into evaluating candidates, not waiting on the page",
      },
      {
        label: "Role Discovery",
        value: "Real-time search",
        description:
          "Candidates and hiring managers find relevant roles and profiles the moment they search, not after a slow, generic filter",
      },
    ],
    futureImprovements: [
      "Implement automated AI resume-to-job description semantic matching score",
      "Add automated interview scheduling integration with Google Calendar and Outlook",
      "Support enterprise custom hiring workflow stages and webhook notifications for Slack/Teams",
    ],
    dateStr: "2024-11-15",
  },

  {
    id: "pes",
    title: "PES",
    slug: "pes",
    category: "Fullstack",
    featured: true,
    shortDescription:
      "Universities and companies ran staff appraisals, stress surveys, and staffing math on spreadsheets that nobody trusted after the fact. PES turns those into one system where a score can be traced back to the person who entered it.",
    longDescription:
      "A university department head or company HR admin who wants to know whether a team is overstaffed, understaffed, or burning out has historically had to run separate spreadsheets for appraisal scores, stress surveys, and staffing formulas, then reconcile them by hand before anyone signs off. PES puts appraisal, performance, stress evaluation, and workforce-sizing models (queueing-theory personnel utilization, ANOVA-based stress analysis, staff-number estimation) behind one role-gated workflow: a staff member enters a score, their supervisor enters a counter-score for the same period, and an admin accepts or rejects the pair, which either averages them into a final record or sends both back for rework. The models themselves are the part a generic HR tool can't fake: they encode named equations (K*/H* queueing outputs, ANOVA F-statistics with a documented reset rule, load-classification tables) with inline guidance so a non-statistician can run them and still trust the number. It's built multi-tenant so one Postgres database serves many organizations at once, each seeing only its own roster and results, with subscription tiers (Paystack and PayPal) gating which models an organization can run.",
    techStack: [
      "Next.js 14 (App Router)",
      "React 18",
      "TypeScript",
      "PostgreSQL",
      "Prisma 5",
      "Redux Toolkit",
      "Formik / react-hook-form",
      "Zod",
      "Tailwind CSS 4",
      "Radix UI / shadcn-style component kit",
      "JWT (jsonwebtoken) + bcrypt",
      "Paystack",
      "PayPal Subscriptions API",
      "Stripe (present, inactive billing path)",
      "Cloudinary",
      "Nodemailer / Resend",
      "Docker Compose",
      "Vercel",
      "Neon",
    ],
    coverImage: "/projects/pes/cover.png",
    liveUrl: "https://hooaij.com/performance-evaluation-software/",
    architecture: {
      description:
        "Next.js App Router serves both the UI and roughly 200 API route handlers. Identity is established per-request through a verified JWT claim, and the organization a query is scoped to comes only from that verified token, never from the request body or URL. That's a rule the codebase enforces with a documented grep audit, because it had been broken repeatedly by routes that looked correctly scoped but weren't. Most of the ~40 evaluation, appraisal, and recognition tables key their tenant by a plain-text organization name string rather than a foreign key, documented as the largest structural debt in the schema and slated for an org_id backfill before any real customer onboards. The Prisma schema declares 62 models but only 11 have real migration files (the rest were pushed directly to the database), so new schema changes are hand-written and applied with db execute plus migrate resolve --applied until the history is baselined. Billing runs two parallel schemes for historical reasons: a flat Paystack-shaped table that signup actually writes to, and a relational PayPal-shaped set the UI doesn't call yet, with a single catalog file now the intended source of truth for prices and entitlements.",
    },
    engineeringDecisions: [
      {
        topic: "Authorization identity source",
        decision:
          "Every API route resolves the caller's organization from a server-verified JWT claim, never from the request body or a URL parameter.",
        reason:
          "An organization's appraisal and stress data is confidential inside a university or company. A rule that looked right but let the org come from something the caller controlled would let anyone read or write another tenant's staff records by editing a request. A prior audit found exactly that pattern across a dozen-plus routes, including three 'fixed' in a commit titled to prevent that leakage and still leaking afterward.",
        tradeoff:
          "Every new route needs a few extra lines of guard code and a mental check AGENTS.md now spells out explicitly. Accepted because the cost of getting it wrong is a cross-tenant data leak, not a slow API.",
      },
      {
        topic: "Counter-score reconciliation instead of single-entry scoring",
        decision:
          "Every appraisal and performance score is captured twice: staff, then supervisor as a counter-score, and an admin explicitly accepts (averaging) or rejects (sending both back).",
        reason:
          "A single self-reported or single supervisor-reported score is easy to dispute after the fact. Two independent entries plus an explicit admin adjudication step means a contested score has a paper trail: who entered what, who signed off.",
        tradeoff:
          "Roughly doubles data-entry burden and adds a review queue. Acceptable where evaluation outcomes affect pay or continued employment and need to survive a challenge.",
      },
      {
        topic: "Multi-tenancy keyed by organization name string, not a foreign key",
        decision:
          "Roughly 37 tables carry an org column as free text rather than an org_id foreign key.",
        reason:
          "This shipped in the original codebase before the current maintainers took over. Rewriting all 37 tables' join keys mid-build would have blocked every other fix behind a schema migration touching the entire query surface. Shipping security and correctness fixes on the existing shape first got real bugs closed faster.",
        tradeoff:
          "Until the migration runs, an organization can't be renamed without orphaning rows, and a typo'd org name silently creates unjoinable data. Documented as a pre-launch blocker, scheduled before any real organization's data is at stake.",
      },
      {
        topic: "Two billing schemes running in parallel",
        decision:
          "Kept the Paystack-shaped table signup actually writes and the PayPal-shaped relational set, while consolidating pricing and entitlement logic into one catalog file.",
        reason:
          "Four different places in the codebase quoted different prices for the same plan before this was cleaned up, and signup wrote status: 'success' without checking money had moved. Centralizing on one catalog closes the disagreement.",
        tradeoff:
          "The two schemes still coexist and only one is wired to the live signup path, leaving the other as dead weight until someone migrates or drops it. Left as an open decision, per the project's own documentation.",
      },
    ],
    metrics: [
      {
        label: "Authorization coverage closed from a near-total gap",
        value:
          "59 of 199 routes with zero identity check, now a documented, audited pattern across all of them",
        description:
          "A September 2026 audit found handlers including one that returned every user's bcrypt password hash to any caller, and one that let anyone cancel any organization's subscription by address. Every handler now establishes verified identity before its first database call.",
      },
      {
        label: "SQL injection surface reduced from systemic to one fixed string",
        value: "45+ raw, string-interpolated queries down to 1 hardcoded, input-free statement",
        description:
          "$queryRawUnsafe with request data spliced directly into SQL appeared in over 45 places, including stress and performance-scoring routes. Nearly all replaced with parameterized Prisma calls.",
      },
      {
        label: "A committed database dump with working plaintext credentials, purged and rotated",
        value:
          "backup.sql (3,149 lines, 24 staff records, 18 plaintext passwords) removed from team history, all exposed passwords rotated",
        description:
          "The dump was tracked on GitHub for four months while the login route accepted plaintext matches, so these were live credentials. The team's own remote had history rewritten. The client's separate upstream fork still carries the same history, flagged but unresolved.",
      },
      {
        label: "\"Write-only\" evaluation results made readable",
        value: "86 route files gained a GET handler that previously had none",
        description:
          "The client's top recorded complaint was that running an evaluation saved a result nobody could look at again. Personnel utilization, redundancy, staff number, org structure, stress, and performance results now have dedicated history pages.",
      },
    ],
    futureImprovements: [
      "Backfill the 37 name-keyed tables onto a real org_id foreign key so renaming an organization can't silently orphan its own records.",
      "Wire the plan catalog's entitlement check into the actual route guards; a basic-tier user who knows a model's URL can currently reach it anyway.",
      "Fill the three still-missing catalog prices and flip billing enforcement on, since signup can currently complete without a real payment reference while the client finishes testing.",
      "Extend Zod validation past the 18 routes that currently have it (of roughly 205), so malformed requests fail with a field error instead of a raw database exception.",
    ],
    dateStr: "2026-09-10",
  },
];
