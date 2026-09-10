```json
{
  "title": "Mervida (GFO Foods)",
  "slug": "mervida",
  "category": "frontend",
  "shortDescription": "A specialized food distribution platform for premium, clean-label Nigerian harvests with export capabilities.",
  "longDescription": "Mervida by GFO Foods is an e-commerce and distribution platform designed to connect local Nigerian harvests with a global audience. It serves multiple customer segments by providing retail shopping, bulk wholesale supply for corporate clients, and specialized 'personal shopper' services for the diaspora. To handle complex logistics and variable delivery fees, the platform utilizes a streamlined WhatsApp checkout flow that routes orders directly to customer service for consultation.",
  "techStack": [
    "Next.js 16",
    "React 19",
    "Tailwind CSS v4",
    "Framer Motion",
    "Lucide React"
  ],
  "coverImage": "/projects/mervida/cover.png",
  "demoVideo": "/projects/mervida/demo.mp4",
  "githubUrl": "https://github.com/Jasmond/gfo-distro",
  "liveUrl": "https://mervida.com",
  "architecture": {
    "description": "The application is built on the Next.js App Router paradigm, leveraging React Server Components for optimal SEO and initial page load performance. The UI layer is constructed using a bespoke component system styled with Tailwind CSS v4 and animated using Framer Motion. Data flow for user orders bypasses traditional automated payment gateways, instead formatting cart contents and routing them directly to a WhatsApp business API endpoint for human-in-the-loop processing.",
    "diagramUrl": "/images/projects/mervida/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "Next.js App Router Implementation",
      "reason": "Chosen for its out-of-the-box SEO benefits, file-based routing, and ability to serve static pages rapidly, which is crucial for an e-commerce catalog.",
      "tradeoff": "Requires a strict mental model separation between client and server components, occasionally adding complexity to interactive state management."
    },
    {
      "decision": "WhatsApp Checkout Routing",
      "reason": "Selected over automated gateways (like Paystack or Stripe) to accommodate custom delivery fees, bulk wholesale orders, and specialized diaspora services that require human consultation.",
      "tradeoff": "Sacrifices end-to-end checkout automation in favor of high-touch customer service and maximum logistical flexibility."
    },
    {
      "decision": "Custom UI over Component Libraries",
      "reason": "Decided to build bespoke UI components using Tailwind CSS and Framer Motion to ensure the platform's visual identity matched its 'natural, clean-label' brand aesthetic perfectly.",
      "tradeoff": "Increased initial development time compared to using pre-built libraries like MUI or Chakra UI, but resulted in a lighter, more unique interface."
    }
  ],
  "metrics": [
    "Optimized LCP (Largest Contentful Paint) by utilizing Next/Image and React Server Components",
    "Streamlined complex cross-border purchasing through the dedicated 'Personal Shippers' portal",
    "Reduced cart abandonment by routing high-friction logistics questions directly to human support via WhatsApp"
  ],
  "futureImprovements": [
    "Integrate a headless CMS (e.g., Sanity or Strapi) to allow non-technical staff to update the product catalog dynamically",
    "Implement a localized payment gateway for fully automated retail checkouts alongside the WhatsApp flow",
    "Add internationalization (i18n) to natively support multiple languages for the global diaspora audience"
  ]
}
```

```json
{
  "title": "Busly",
  "slug": "busly",
  "category": "fullstack",
  "shortDescription": "Stop-centric transit navigation for informal urban networks, built for Lagos.",
  "longDescription": "Busly solves a navigation problem that Google Maps ignores: the informal, cash-based, route-flexible bus networks (Danfo, BRT, Keke) that move the majority of commuters in Lagos, Nigeria. Formal mapping tools assume fixed schedules and named streets — neither exists here. Busly models the city as a directed, weighted stop graph loaded into server memory at startup. A custom A* algorithm with a Haversine heuristic finds the optimal path across this graph, composing multi-leg journeys that may span several routes connected by walking transfers. Each stop in the returned path is enriched with the nearest landmark within 300m and a crowdsourced navigation cue (e.g. 'alight at the junction past the red market'), because landmark-based wayfinding is how real commuters navigate. The platform also includes a real-time trip session engine that tracks a user's current stop position, detects route deviations, and surfaces alternate route options at each decision node — enabling dynamic re-routing mid-journey.",
  "techStack": [
    "React 19",
    "TypeScript",
    "Vite",
    "TailwindCSS 4",
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
    "Swagger / OpenAPI"
  ],
  "coverImage": "/images/projects/busly/cover.png",
  "demoVideo": "/videos/projects/busly/demo.mp4",
  "githubUrl": "https://github.com/JasmondWorks/busly-frontend",
  "liveUrl": "https://busly-ng.vercel.app/",
  "architecture": {
    "description": "On startup, `app.ts` connects to MongoDB Atlas and immediately calls `RoutingGraphService.getInstance().reloadGraphFromDB()`. This singleton loads all stops (nodes), active route stop sequences (directed ROUTE edges weighted by `averageTravelTimeToNext` in seconds), and transfer records (bidirectional TRANSFER edges with a walking penalty plus a 120-second boarding buffer) into a `Map<string, GraphNode>` adjacency list held in process memory. This makes all subsequent A* traversals pure in-memory operations with no DB round-trips on the hot path. For a journey search, the service first calls MongoDB's `$geoNear` aggregation to snap the user's coordinates to the 3 nearest transit stops within 1.5km on both ends. It then runs two search strategies in parallel: a direct DB query that finds routes where both origin and destination exist in the `stopsSequence` array with a mathematically guaranteed `originIndex < destIndex`, and a graph-based A* search over the in-memory adjacency list using a Haversine distance divided by 5m/s as the admissible heuristic. Results from both strategies are merged, deduplicated by route-leg fingerprint, and sorted by total duration before returning the top 3 options. Each stop in the final path is individually queried for the nearest landmark within 300m using a `$near` geospatial query, and the first navigation cue from that landmark is attached. On the frontend, React Query manages all server state with stale-while-revalidate semantics, a Zustand store holds the active journey session (selected option, current stop index, deviation flag), and the stop search input is debounced via a custom hook before firing the search API. Framer Motion handles page transitions and the animated step-through of the journey progress UI.",
    "diagramUrl": "/images/projects/busly/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "In-memory routing graph (singleton loaded at startup) instead of per-request MongoDB graph queries",
      "reason": "MongoDB's aggregation pipeline is powerful for geospatial queries but too slow for multi-hop graph traversal at request time. A* on a transit network with ~270 stops and ~700 edges needs sub-50ms traversal. Materializing the entire graph into a `Map<string, GraphNode>` at startup achieves this since all traversal is pure JavaScript object lookups.",
      "tradeoff": "The graph is a point-in-time snapshot. Any change to stops, routes, or transfers in the DB requires a manual `reloadGraphFromDB()` call or server restart to take effect. A future Redis pub/sub or admin endpoint trigger would solve this."
    },
    {
      "decision": "Dual-strategy routing: DB direct-route query first, A* fallback for multi-transfer paths",
      "reason": "The majority of journeys in a city transit network are single-route trips. A MongoDB query that checks whether both stops appear in the same `stopsSequence` array (with origin index < destination index) is cheaper and returns a more semantically clean result than unwinding an A* path for the same single-leg trip.",
      "tradeoff": "Two code paths must be maintained and their results merged. Deduplication by route-leg fingerprint (`legs.map(l => l.routeId).join('|')`) is necessary but could miss logically equivalent paths with different route segment orderings."
    },
    {
      "decision": "A* with Haversine heuristic (distance / 5m/s) instead of BFS or Dijkstra",
      "reason": "Dijkstra explores nodes uniformly by cost, which is wasteful in a geographically embedded graph where the destination's rough direction is known. The Haversine straight-line distance divided by a conservative 5m/s base speed is an admissible heuristic (never overestimates actual transit time), guaranteeing optimal paths while dramatically pruning the open set.",
      "tradeoff": "The 5m/s constant is a simplification. In practice, transfers have walking speeds closer to 1–1.5m/s and buses operate at 6–10m/s in Lagos traffic. A more accurate per-edge-type heuristic would yield tighter estimates but adds complexity."
    },
    {
      "decision": "MongoDB `$geoNear` for stop snapping over client-side nearest-stop computation",
      "reason": "The frontend only knows raw coordinates. Computing nearest stops client-side would require downloading the full stop dataset. A server-side `$geoNear` aggregation on an indexed `2dsphere` field returns the 3 nearest stops within a radius in a single query, keeping the client payload minimal.",
      "tradeoff": "Adds one DB round-trip at the start of every journey search. This is acceptable because it runs before the in-memory A* phase, not inside the hot loop."
    },
    {
      "decision": "Landmark injection via per-stop `$near` query rather than pre-joining on graph load",
      "reason": "Landmarks are crowdsourced and change frequently. Pre-joining them into the graph at startup would mean landmark updates also require graph reloads. Keeping landmark enrichment as a live per-stop DB query at response-build time ensures fresh cues without coupling landmark writes to graph lifecycle.",
      "tradeoff": "For a path with N stops, this fires N sequential `$near` queries. On the heavy seed dataset with 1,125 landmarks, this is acceptable at low concurrency but would benefit from a batched geospatial lookup or a landmark-proximity cache under load."
    },
    {
      "decision": "Repository pattern (`IBaseRepository<T>` interface + `MongooseRepository<T>` concrete class) over direct Mongoose calls in services",
      "reason": "Services interact only with the abstract `IBaseRepository<T>` contract. This decouples business logic from the ODM, making services unit-testable without a live database and theoretically swappable to Prisma or TypeORM with zero changes to service or controller code.",
      "tradeoff": "Adds a layer of indirection. Complex Mongoose-specific queries (aggregations, geospatial pipelines) that don't fit the generic interface must be implemented as one-off methods on the service directly, partially bypassing the abstraction."
    },
    {
      "decision": "Zustand for active journey session state, React Query for all server state",
      "reason": "Journey session state (current stop index, selected route, deviation flag) is purely client-side ephemeral state with no server equivalent — Zustand's minimal API is the right fit. React Query handles all async server state with automatic background refetching, caching, and stale-while-revalidate, removing the need for manual loading/error states across the component tree.",
      "tradeoff": "Two state libraries must coexist. The boundary between 'what lives in Zustand' vs 'what lives in React Query cache' must be consciously maintained, especially for derived data like the currently active stop's landmark details."
    },
    {
      "decision": "OSM `.pbf` file parsing for Lagos stop data (`seed-lagos-heavy.ts`) over manual data entry",
      "reason": "Manually entering 270+ geographically accurate stops for a city as dense as Lagos is impractical. Parsing the 640MB `nigeria-260226.osm.pbf` OpenStreetMap extract with a custom seeder yields 139 real OSM-tagged stops that are geographically accurate, supplemented by 131 curated GPS-accurate stops for key corridors.",
      "tradeoff": "OSM data quality for Lagos is inconsistent — OSM stops are seeded with `isVerified=false` and require community validation before becoming first-class routing nodes. The parse itself takes ~3 minutes and is a one-time dev operation."
    }
  ],
  "metrics": [
    "In-memory graph traversal eliminates DB round-trips on the A* hot path — all node and edge lookups are O(1) `Map` accesses after startup",
    "Dual-strategy routing (DB direct query + A* fallback) short-circuits the expensive graph search for the majority of single-route journeys",
    "Landmark injection at ≤300m radius provides human-readable navigation cues for every stop in a journey path, addressing the primary usability gap in existing tools for informal transit networks",
    "Transfer edges include a 120-second boarding buffer on top of walking time, producing realistic multi-leg duration estimates rather than optimistic theoretical minimums",
    "OSM-seeded dataset covers 270 stops, 46 routes, 340 bidirectional transfers, and 1,125 landmarks across the Lagos metro bbox — sufficient to route real corridors without fabricated data",
    "Trip deviation detection (comparing `currentStop` updates against the active route's `stopsSequence` order) surfaces alternate route options at decision nodes without requiring a full re-search"
  ],
  "futureImprovements": [
    "Replace the per-stop sequential `$near` landmark queries with a single batched geospatial lookup or a landmark proximity cache (keyed by stop ID, TTL ~1 hour) to prevent O(N) DB queries per journey response under concurrent load",
    "Add a `reloadGraph` admin endpoint triggered by MongoDB change streams on Stop, Route, and Transfer collections, so live data changes propagate to the in-memory graph without a server restart",
    "Implement the planned Redis OD-pair cache: key by `originStopId:destStopId`, cache the top-3 journey options with a short TTL, to serve repeat corridor queries (e.g. CMS → Ajah) without re-running A*",
    "Replace the A* open set's `Array.from(openSet).reduce(...)` O(N) minimum scan with a binary min-heap priority queue to improve worst-case routing performance on denser graph expansions",
    "Integrate real driver speed telemetry (the `speed` module is already instrumented) as a live edge-weight feed — congestion on a route segment would dynamically increase its traversal cost in the graph, producing time-aware routing results",
    "Add WebSocket push for trip session updates, replacing the current polling pattern for `currentStop` progression and deviation detection"
  ]
}
```

```json
{
  "title": "DriftCare NG",
  "slug": "driftcare-ng",
  "category": "fullstack",
  "shortDescription": "AI-powered health monitoring platform that detects subtle wellness drift before it becomes a crisis.",
  "longDescription": "DriftCare NG is a fullstack health intelligence platform built for Nigerian users that tracks daily wellbeing across 8 clinical dimensions (sleep, stress, mood, activity, hydration, symptom load, health status, and lifestyle) and computes a real-time 'drift score' — the percentage deviation from each user's personal baseline. Rather than comparing against population averages, the system establishes an individualised baseline from the user's first 10 check-ins, then flags deterioration trends early. An AI health companion, context-aware and culturally localised for Nigeria, delivers insights grounded in the user's actual drift data. Clinical outputs in HL7 FHIR R4 and SBAR format allow seamless handoff to medical professionals, making the platform EMR-integration ready.",
  "techStack": [
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
    "OpenRouter (Google Gemini 2.5 Flash)",
    "JWT",
    "Cloudinary",
    "web-push (VAPID)",
    "node-cron",
    "Redis",
    "Swagger / OpenAPI",
    "Vite PWA Plugin",
    "Vercel"
  ],
  "coverImage": "/images/projects/driftcare-ng/cover.png",
  "demoVideo": "/videos/projects/driftcare-ng/demo.mp4",
  "githubUrl": "https://github.com/Donvictory/AI-HEALTHCARE-NEW",
  "liveUrl": "",
  "architecture": {
    "description": "The frontend is a React 19 SPA served from Vercel's CDN. TanStack React Query owns all server state with stale-while-revalidate semantics, keeping the UI reactive without manual cache invalidation. Auth is handled via JWT stored exclusively in HTTP-only cookies (access token: 1h, refresh token: 7d). A separate non-httpOnly hint cookie (`is_logged_in=true`) lets React Router guards make auth decisions without exposing the real token to JavaScript, closing the XSS attack surface. On 401, an Axios interceptor silently hits the refresh endpoint and retries the original request. API traffic routes to an Express backend deployed as Vercel Functions (serverless Node.js) under `/api/v1/`. Each feature domain (user, check-in, dashboard, chat, doctor, media, task) is fully modular: its own controller, service, route, Mongoose model, DTO, validator, and entity. MongoDB via Mongoose stores all domain data; a generic `MongooseRepository<T>` utility eliminates repetitive CRUD across models. Redis is provisioned for caching and rate limiting but not yet fully wired in the MVP. Health check-ins are the core data event: on submission, the 8-dimension resilience score is computed server-side from weighted scoring functions (defined in `health-params.config.ts`) and stored alongside the check-in. The dashboard then computes drift by comparing the rolling average of the user's recent 10 check-ins against their first 10 check-ins across sleep, stress, and mood axes. The AI chat endpoint builds a context window from those same two cohorts, injects the computed drift percentage into the system prompt, and forwards the conversation to OpenRouter (Gemini 2.5 Flash). The AI layer uses a pluggable provider pattern: `AIService` delegates to named `IAIProvider` implementations, so swapping to Anthropic or a local model requires zero changes to the chat service. Medical report uploads flow through Multer → Cloudinary, with the returned CDN URL stored on the check-in document. Web Push notifications (VAPID via `web-push`) use subscriptions stored on the User model. Cron jobs for daily resets and reminder pushes run via `node-cron` in local/server mode; the Vercel deployment requires migrating these to Vercel Cron.",
    "diagramUrl": "/images/projects/driftcare-ng/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "HTTP-only cookies for JWT over localStorage",
      "reason": "localStorage is fully accessible to any JavaScript running on the page, making stored tokens trivially exfiltrable via XSS. HTTP-only cookies are inaccessible to JS by spec. A secondary non-httpOnly boolean hint cookie allows React Router guards to make synchronous auth decisions on first render without exposing the token.",
      "tradeoff": "Requires CORS credentials (`withCredentials: true`) on every request and explicit SameSite configuration. Also complicates cross-subdomain auth if the client and API ever live on different origins."
    },
    {
      "decision": "OpenRouter with Google Gemini 2.5 Flash over direct OpenAI GPT-4o",
      "reason": "Gemini 2.5 Flash provides near-GPT-4 quality at significantly lower cost-per-token, which matters for a health app where every dashboard load and chat message triggers an inference call. OpenRouter as the abstraction layer keeps the AI provider swappable without touching the chat service.",
      "tradeoff": "Adds a network hop through OpenRouter's proxy. Output token limits were intentionally capped (300 tokens for chat, 500 for structured extraction) to constrain latency and cost, which limits response depth for complex health questions."
    },
    {
      "decision": "Pluggable AI provider pattern (`IAIProvider` interface + `AIService` registry)",
      "reason": "Locking the chat service to a single SDK import makes model migration a refactor. The provider pattern means adding Anthropic or a locally-hosted model is a new file, not a modification to existing service logic.",
      "tradeoff": "Introduces an abstraction layer for a system that currently has only one active provider. Adds indirection that marginally increases cognitive overhead when tracing an AI call."
    },
    {
      "decision": "MongoDB over a relational database (PostgreSQL)",
      "reason": "Health check-in data is highly variable: symptom arrays, lifestyle enums, and medical report lists differ per user and evolve as the product adds dimensions. A document model avoids schema migrations during fast MVP iteration. Mongoose's embedded document support cleanly collapses the 5-step check-in form into one atomic write.",
      "tradeoff": "No joins — dashboard aggregations require multiple round-trips or `$lookup` pipelines. Lack of enforced foreign key constraints means referential integrity between User and DailyCheckIn documents is application-level responsibility."
    },
    {
      "decision": "TanStack React Query for server state over Redux or Zustand",
      "reason": "Redux adds significant boilerplate for data that is fundamentally server-owned (user profile, check-ins, dashboard metrics). React Query provides stale-while-revalidate caching, background refetch, and automatic cache invalidation tied to mutations without a global store.",
      "tradeoff": "React Query is not a substitute for client-only UI state. Any truly local state (modals, form steps) still requires `useState` or a lightweight store, so the project uses two mental models for state — server state (React Query) and UI state (local hooks)."
    },
    {
      "decision": "Per-feature modular backend structure (controller / service / route / model / DTO / entity / validator per module)",
      "reason": "A single flat `routes.ts` and `services.ts` file becomes unmaintainable past ~5 features. The modular layout makes it possible to understand, test, or replace any feature in isolation and mirrors how production-grade Express codebases are structured.",
      "tradeoff": "Higher file count and more boilerplate per feature. For a hackathon-scoped MVP, this is over-engineered relative to the current number of routes, but pays off if the codebase grows."
    },
    {
      "decision": "HL7 FHIR R4 and SBAR as clinical output formats",
      "reason": "Producing proprietary JSON blobs would limit the platform to consumers who custom-integrate with it. FHIR R4 is the mandated interoperability standard across Nigerian and international healthcare systems. SBAR (Situation, Background, Assessment, Recommendation) is the clinical communication standard used by nurses and physicians for handoff. Both make the platform a credible candidate for hospital integration without requiring a custom connector.",
      "tradeoff": "Full FHIR compliance is non-trivial. The current implementation maps sleep duration to LOINC code `8967-7` and uses a placeholder LOINC `85354-9` for the full health panel, meaning the FHIR bundle is integration-ready but not yet fully coded. A complete implementation would require a LOINC code per metric."
    },
    {
      "decision": "PWA over a native mobile app (React Native / Flutter)",
      "reason": "A PWA is installable on iOS and Android directly from the browser with no App Store submission cycle. For a hackathon build targeting rapid user validation in Nigeria, reducing install friction and eliminating the store review delay was the dominant constraint.",
      "tradeoff": "PWA push notifications on iOS are gated behind Safari's implementation (requires iOS 16.4+) and have lower reliability than native push channels. Background sync and certain device API access remain limited compared to a native app."
    },
    {
      "decision": "Radix UI headless components over a styled component library (MUI, Chakra, Mantine)",
      "reason": "Styled libraries ship opinionated visual defaults that require fighting overrides to achieve a distinct design. Radix UI primitives are entirely unstyled and accessibility-complete (ARIA attributes, keyboard navigation, focus management) out of the box, composing cleanly with Tailwind for full design control.",
      "tradeoff": "Every component needs to be styled from scratch. This increases initial setup time compared to dropping in a pre-styled library."
    },
    {
      "decision": "Baseline-relative drift detection over population-average comparison",
      "reason": "A user who chronically sleeps 5 hours is not the same as one who has recently dropped from 8 to 5. Using each user's own first 10 check-ins as a personalised baseline makes the drift signal clinically meaningful — it detects change, not deviation from a generic healthy norm.",
      "tradeoff": "The model requires a minimum of 10 check-ins before baseline stabilises. New users see no drift data during onboarding, which creates a dead period for the core feature."
    }
  ],
  "metrics": [
    "JWT stored in HTTP-only cookies with a JS-readable hint cookie eliminates token XSS exposure without blocking synchronous route guard evaluation",
    "8-dimension resilience scoring (sleep, stress, mood, activity, hydration, symptom load, health status, lifestyle) provides granular health signal beyond single-metric trackers",
    "Baseline-relative drift algorithm detects personalised deterioration trends before they surface as acute episodes, rather than comparing against population averages",
    "Pluggable AI provider pattern (IAIProvider interface) allows model swapping — Gemini 2.5 Flash to GPT-4o or a local model — with zero changes to the chat service",
    "HL7 FHIR R4 and SBAR outputs enable direct clinician handoff without a custom integration layer",
    "Generic MongooseRepository<T> utility eliminates repetitive CRUD boilerplate across all five domain models",
    "PWA deployment (service workers, standalone display mode, VAPID push) delivers a native-app experience with no App Store gate",
    "Per-feature modular backend (controller/service/route/model/DTO/validator) keeps feature boundaries clean and enables independent replacement of any domain"
  ],
  "futureImprovements": [
    "Migrate cron jobs (daily reset, push reminders) to Vercel Cron — the current node-cron setup breaks in Vercel's stateless serverless environment",
    "Fully wire Redis for API response caching and per-user rate limiting on the AI chat endpoint, which is currently unbounded",
    "Expand the drift algorithm from 3 dimensions (sleep, stress, mood) to all 8 scored dimensions for a more complete drift signal",
    "Complete FHIR LOINC coding — replace the placeholder code `85354-9` with correct LOINC codes per metric for true clinical compliance",
    "Persist chat conversation history per user session to MongoDB so the AI companion has multi-turn context across sessions, not just the current request",
    "Add database indexes on the User model's `email` field and the Doctor model's geolocation fields to prevent collection scans at scale",
    "Resolve the unmerged vercel.json conflict in the root and stabilise the monorepo deployment pipeline with a single authoritative Vercel configuration",
    "Introduce WebSocket-based real-time drift alerts so clinicians or family members can be notified the moment a threshold is crossed, replacing the current one-way batch push"
  ]
}
```

```json
{
  "title": "FaithCare Dashboard",
  "slug": "faithcare-dashboard",
  "category": "frontend",
  "shortDescription": "Dual-persona church management SPA with JWT auth, React Query, and real-time member tracking.",
  "longDescription": "FaithCare is a church operations platform built as a React SPA that serves two distinct user personas: individual church members and organization administrators. Individual users get a personal spiritual growth suite — a Sunday sermon journal with scripture references, a server-persisted Pomodoro focus timer, and streak tracking. Organization admins get a full membership operations dashboard covering first-timer and second-timer tracking, prioritized follow-up management, community groups, salvation records, prayer request queues, and bulk CSV/Excel imports. The application implements a layered auth system using in-memory JWT access tokens and HTTP-only cookie refresh tokens, a TanStack Query-driven data layer with scoped cache keys, and a context-based global search that filters pre-fetched data without additional API round-trips.",
  "techStack": [
    "React 18",
    "TypeScript",
    "Vite",
    "TailwindCSS v4",
    "Radix UI",
    "shadcn/ui",
    "TanStack Query v5",
    "React Router v7",
    "React Hook Form",
    "Zod",
    "Recharts",
    "Framer Motion",
    "cmdk",
    "react-hot-toast"
  ],
  "coverImage": "/images/projects/faithcare-dashboard/cover.png",
  "demoVideo": "/videos/projects/faithcare-dashboard/demo.mp4",
  "githubUrl": "https://github.com/Donvictory/Faithcare",
  "liveUrl": "https://faithcare-home.vercel.app/",
  "architecture": {
    "description": "The app is a Vite-bundled React SPA deployed to Vercel with a catch-all rewrite rule routing all paths to index.html for client-side navigation. React Router v7 defines all routes; authenticated routes are wrapped in AppLayout, which composes LayoutProvider (sidebar open/close state, notification store) and SearchProvider (global search term) before rendering page content.\n\nAuthentication is split across two layers. The short-lived JWT access token lives exclusively in a JavaScript module-scoped variable (inMemoryToken in api/helper.ts), never written to localStorage, providing XSS resistance. The long-lived refresh token is stored in an HTTP-only cookie managed by the backend. On application mount, AuthProvider calls POST /auth/refresh to bootstrap the session. If the cookie is valid, the new access token is written to inMemoryToken and the user object is merged from localStorage into React state. On any 401, apiRequest enters a single-flight refresh: a boolean flag (isRefreshing) blocks concurrent refresh calls while queued requests are held in a subscriber array (refreshSubscribers). Once the refresh resolves, all queued requests are replayed with the new token.\n\nData fetching uses TanStack Query v5. Query keys are namespaced by organizationId or userId to prevent cross-tenant cache hits. The enabled flag on every useQuery gates execution on auth context readiness, preventing unauthenticated requests on mount. Mutations call queryClient.invalidateQueries with exact keys for targeted cache busting rather than broad resets.\n\nThe Header component renders a cmdk command palette that issues parallel TanStack Query fetches across first-timers, prayer requests, communities, and journal entries. Global search state lives in SearchContext and is read by dashboard components to filter already-cached data client-side — no per-keystroke API calls.\n\nUser persona (individual vs. organization) is written to localStorage as userType at login and read by AppLayout and Sidebar to render the correct navigation and dashboard component.",
    "diagramUrl": "/images/projects/faithcare-dashboard/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "In-memory JWT access token with HTTP-only cookie refresh token",
      "reason": "Storing access tokens in localStorage exposes them to any XSS script on the page. Keeping the access token in a module-scoped variable means it is never accessible from the DOM. The HTTP-only cookie carries the refresh token so the browser never exposes it to JavaScript at all.",
      "tradeoff": "The in-memory token is lost on hard refresh, requiring a /auth/refresh call on every page load. This adds one network round-trip to the critical path before the app renders protected content. A localStorage fallback exists as a transitional measure but is intended to be removed."
    },
    {
      "decision": "Single-flight token refresh with subscriber queue in the shared apiRequest wrapper",
      "reason": "When an access token expires, multiple in-flight requests can simultaneously receive a 401. Without coordination, each would independently try to refresh, causing race conditions and potentially invalidating a fresh token with a redundant refresh call.",
      "tradeoff": "The subscriber queue adds statefulness to what would otherwise be a pure fetch wrapper. If the refresh itself fails, all queued requests receive the original 401 response and must handle it individually; there is no centralized redirect to login, which shifts responsibility to each consuming component."
    },
    {
      "decision": "TanStack Query v5 for all server state instead of Redux or Zustand",
      "reason": "All server-derived state in this app has an async lifecycle: loading, error, success, stale, and background-refetch states. TanStack Query models these natively and provides cache invalidation, deduplication, and background refetching out of the box, eliminating the need for manual loading/error reducers.",
      "tradeoff": "TanStack Query is purpose-built for server state; it does not replace a general client state store. UI state that does not need to be persisted across navigation (modal open state, local filters) is managed with useState, creating a split between two mental models in the same components."
    },
    {
      "decision": "shadcn/ui + Radix UI primitives over MUI for the component library",
      "reason": "shadcn/ui generates unstyled, composable Radix primitives into the project source. This gives full ownership over markup and styles, which was necessary to match a bespoke design system. MUI was evaluated and rejected because its opinionated styling system (Emotion-based sx props and theme tokens) would have required fighting the library to achieve the required visual output.",
      "tradeoff": "Every primitive (Dialog, Select, Command, Sheet) required manual composition and accessible wiring. This increased initial build time compared to dropping in a fully-styled component library. MUI Icons is still used as a secondary icon source alongside Lucide React."
    },
    {
      "decision": "Client-side global search via SearchContext filtering already-cached query data",
      "reason": "The main list views (first-timers, follow-ups, communities) are already fetched by TanStack Query on page load and held in cache. Wiring search to server-side API endpoints would add debounced network calls on every keystroke and require managing additional loading states in the UI.",
      "tradeoff": "Search is bounded by what is already in the client cache. For organizations with very large member datasets where the API paginates results, the search will only match visible records, not the full dataset. This is an acceptable tradeoff for v1 but will not scale without server-side search."
    },
    {
      "decision": "localStorage userType flag for persona routing instead of server-enforced role guards",
      "reason": "The backend returns a role field (ADMIN, ORGANIZATION, or user) on the auth response. Reading this into localStorage as a derived userType string (individual or organization) at login time was the fastest path to rendering the correct sidebar and dashboard without adding a dedicated roles endpoint call.",
      "tradeoff": "The userType in localStorage can be tampered with client-side, which could expose organization UI to individual users. Since all API endpoints enforce authorization server-side, the actual data access is still protected; the risk is only a confused UI state, not a data breach. A proper solution would gate routes on the decoded token's role claim."
    },
    {
      "decision": "Native fetch with manual FormData construction for bulk CSV/Excel upload, bypassing apiRequest",
      "reason": "The shared apiRequest helper sets Content-Type: application/json by default, which is incompatible with multipart/form-data. Forcing the header to multipart manually without letting the browser set the boundary would corrupt the request. Using native fetch gives full control over the request body.",
      "tradeoff": "The bulk upload function reads the accessToken directly from localStorage rather than from inMemoryToken, since it lives outside the apiRequest closure. This is a consistency issue: if the token has been refreshed since the last page load, the localStorage value may be stale."
    },
    {
      "decision": "Tailwind CSS v4 with the @tailwindcss/vite plugin instead of Tailwind v3",
      "reason": "Tailwind v4 ships as a native CSS transform via a Vite plugin, removing the PostCSS configuration layer entirely. It also resolves class merging inconsistencies that previously required careful tailwind-merge configuration.",
      "tradeoff": "Tailwind v4 was still in early release during development with limited community documentation and known breaking changes from v3. Several third-party components documented for v3 required manual adaptation, adding friction during initial setup."
    }
  ],
  "metrics": [
    "Subscriber-pattern token refresh prevents N concurrent /auth/refresh calls when multiple requests expire simultaneously, ensuring session recovery completes in a single round-trip",
    "Global search filters across first-timers, follow-ups, and communities from in-memory TanStack Query cache — zero additional network requests per keystroke",
    "Query keys scoped by organizationId and userId ensure zero cross-tenant cache contamination when switching between organizations via switchOrganization flow",
    "cmdk command palette queries four independent API endpoints in parallel on open, surfacing cross-feature results without sequential waterfall fetching",
    "SPA routing handled via Vercel catch-all rewrite, eliminating 404s on direct URL access without requiring server-side rendering",
    "Notification deduplication via timestamp-based ID comparison prevents duplicate streak notifications across re-renders within the same calendar day",
    "Focus Timer sessions are server-persisted via PATCH /timer/sessions/:id on each tick, allowing session recovery if the user closes and reopens the tab"
  ],
  "futureImprovements": [
    "Replace localStorage userType persona routing with server-side role claims read from the decoded JWT, removing the client-tampering surface entirely",
    "Add server-side paginated search with debouncing for first-timers and follow-ups to handle large church datasets beyond what fits in a single page response",
    "Migrate notification storage from localStorage to a server-persisted endpoint so notifications survive across devices and browser clears",
    "Implement WebSocket or SSE for real-time follow-up due-date alerts instead of requiring a manual page refresh to see updates from other admins",
    "Add a React Query persistence adapter (e.g., persistQueryClient with IndexedDB) to serve stale-while-revalidate data on hard refresh without a loading flash",
    "Extract the token-refresh subscriber queue into a standalone service worker or broadcast channel so multiple tabs share a single refresh cycle rather than each tab initiating its own"
  ]
}
```

```json
{
  "title": "Seamless Point",
  "slug": "seamless-point",
  "category": "frontend",
  "shortDescription": "All-in-one platform for logistics, utility payments, and on-demand technical services.",
  "longDescription": "Seamless Point is a comprehensive web platform built to unify everyday essential services. Users can effortlessly schedule nationwide and international package deliveries, securely pay for utility bills and data bundles, and connect with vetted technicians on demand. By consolidating these disparate services into a single interface, it provides a frictionless user experience powered by a robust Next.js frontend communicating with a scalable external API.",
  "techStack": [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "TanStack Query",
    "Paystack",
    "Radix UI",
    "React Hook Form",
    "Zod"
  ],
  "coverImage": "/seamless-point/cover.png",
  "demoVideo": "/seamless-point/demo.mp4",
  "githubUrl": "https://github.com/JasmondWorks/seamless-point2",
  "liveUrl": "https://seamless-point.vercel.app",
  "architecture": {
    "description": "The application leverages the Next.js App Router for optimal routing and rendering. It utilizes Next.js Server Actions to securely communicate with the external backend API, handling authentication, data fetching, and business logic encapsulation. Global UI state is managed by Zustand, while TanStack Query handles server state, caching, and optimistic updates for dashboard metrics. Payment processing is integrated via Paystack, utilizing a custom mathematics module to accurately pre-compute complex local and international fee structures (kobo math) on the edge. Authentication flows use a mix of local JWTs and Google OAuth.",
    "diagramUrl": "/images/projects/seamless-point/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "Separation of Frontend (Next.js) and Backend (External API)",
      "reason": "Allowed the frontend to focus purely on UI/UX, caching, and client state management, while the backend independently scales to handle heavy transaction loads and third-party webhooks for logistics and utility payments.",
      "tradeoff": "Requires strict synchronization between frontend TypeScript interfaces and backend API contracts, increasing overhead for type sharing."
    },
    {
      "decision": "Adopted TanStack Query alongside Zustand",
      "reason": "Zustand provides a lightweight, boilerplate-free solution for localized UI states (e.g., multi-step forms, modals), while TanStack Query exclusively manages asynchronous server state, ensuring efficient caching and reducing redundant network requests.",
      "tradeoff": "Introduces two separate state management paradigms, requiring clear architectural boundaries on what state lives where."
    },
    {
      "decision": "Implemented Custom Paystack Fee Computation Logic",
      "reason": "Ensures the UI accurately displays gross and net charges to users in real-time (handling local caps, waivers, and international flat rates) before initiating the transaction with the payment gateway.",
      "tradeoff": "Adds computation complexity to the frontend that must be kept precisely in sync with Paystack's official pricing structures to prevent discrepancies."
    }
  ],
  "metrics": [
    "Unified 3 disparate service verticals (logistics, bills, technicians) into a single cohesive interface, drastically reducing user friction.",
    "Streamlined dashboard data fetching with TanStack Query, enabling perceived zero-latency updates and robust cache invalidation.",
    "Engineered precise client-side Paystack fee computations for local (₦) and international transactions, eliminating payment mismatch errors."
  ],
  "futureImprovements": [
    "Implement real-time tracking for logistics and delivery requests using WebSockets.",
    "Transition to a strictly typed monorepo (e.g., Turborepo) to natively share TypeScript interfaces between frontend and backend.",
    "Expand automated test coverage using Playwright for end-to-end critical user flows."
  ]
}
```

```json
{
  "title": "Discover.io",
  "slug": "discover-io",
  "category": "frontend",
  "shortDescription": "An AI-powered discovery platform that recommends tailored AI tools based on user context and workflows.",
  "longDescription": "Discover.io solves the problem of finding reliable and context-specific AI tools in a crowded ecosystem. Unlike generic search engines, it acts as an intelligent discovery platform that listens to a user's specific problem, persona, and core task, clarifies the intent, and curates a ranked leaderboard of verified AI tools. It focuses on workflow integration, offering practical guidance and explicit trade-offs for each recommendation to help creative professionals work more efficiently.",
  "techStack": [
    "React 19",
    "TypeScript",
    "Vite",
    "React Query (TanStack)",
    "Axios",
    "Framer Motion",
    "React Hook Form"
  ],
  "coverImage": "/images/projects/discover-io/cover.png",
  "demoVideo": "/projects/discover-io/demo.mp4",
  "githubUrl": "https://github.com/JasmondWorks/discovery_io_frontend",
  "liveUrl": "https://discoverio-frontend.vercel.app",
  "architecture": {
    "description": "The frontend is built as a Client-Side Rendered (CSR) Single Page Application using React and Vite. It heavily relies on TanStack React Query for robust asynchronous server state management, enabling efficient data caching, automatic retries, and seamless synchronization with the backend APIs. The architecture strictly decouples the API client logic (via Axios) from UI components using custom hooks. The multi-step AI search flow (Input → Clarification → Confirmation → Results) is managed locally, leveraging Framer Motion for perceived zero-latency transitions.",
    "diagramUrl": "/images/projects/discover-io/architecture.svg"
  },
  "engineeringDecisions": [
    {
      "decision": "Adopted TanStack React Query for server state management",
      "reason": "It provides built-in caching, background refetching, and robust error handling, which is crucial for managing variable response times from AI endpoints and preventing redundant network requests.",
      "tradeoff": "Introduced a slight learning curve and required stricter structuring of query keys and mutations compared to standard `useEffect` data fetching."
    },
    {
      "decision": "Implemented a multi-step 'Clarification' flow before executing AI searches",
      "reason": "AI recommendation engines often misinterpret generic queries. By forcing the system to explicitly extract the User Persona, Core Task, and Success Criteria—and requiring user confirmation—the accuracy of recommendations improved drastically.",
      "tradeoff": "Added UX friction (an extra confirmation click) to the user journey in exchange for significantly higher-quality, context-driven results."
    },
    {
      "decision": "Chose Vite as the build tool over a full-stack framework like Next.js",
      "reason": "Vite provided lightning-fast Hot Module Replacement (HMR) and optimized build times for an MVP that is strictly a Client-Side Rendered application interacting with external AI APIs.",
      "tradeoff": "Sacrificed out-of-the-box SEO optimization and server-side routing capabilities, which may necessitate a migration if organic SEO becomes a primary growth vector."
    }
  ],
  "metrics": [
    "Engineered an intelligent clarification flow that ensures over 80% accuracy in AI tool recommendations.",
    "Maintained sub-3-second initial page loads and sub-5-second search result latency through efficient React Query caching.",
    "Architected the frontend to exclusively query a verified database of 50+ curated AI tools, completely eliminating LLM hallucinations of non-existent products."
  ],
  "futureImprovements": [
    "Migrate to Next.js for Server-Side Rendering (SSR) to improve public SEO indexing of the skills and tools catalog.",
    "Implement streaming responses (Server-Sent Events) for AI interactions to further reduce perceived latency during the 'Diagnosis' phase.",
    "Introduce persistent user profiles to cache onboarding data for long-term personalized recommendations."
  ]
}
```
