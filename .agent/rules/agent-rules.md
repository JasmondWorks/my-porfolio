---
trigger: always_on
---

# AI Agent Rules & Workflow

This document defines **strict rules, workflow steps, and quality bars** for building a personal developer portfolio for a **full‑stack software engineer (web + mobile)**. Follow these rules exactly.

---

## 1. CORE OBJECTIVE

Build a **production‑grade personal portfolio** that communicates:

- Technical depth (frontend, backend, infra)
- Engineering decision‑making
- Scalability & performance awareness
- Clean UI/UX with developer‑centric aesthetics

This is **not** a generic portfolio or landing page.

---

## 2. NON‑NEGOTIABLE PRINCIPLES

### 2.1 Think Like a Senior Engineer

- Prioritize **architecture clarity over visual gimmicks**
- Every feature must answer _why it exists_
- Avoid buzzwords unless justified by implementation

### 2.2 Clarity > Flash

- Minimal, calm UI
- Animations must improve understanding or flow
- No unnecessary gradients, glassmorphism, or gimmicks

### 2.3 Data‑Driven Everything

- Projects must be driven from a central data source
- No hard‑coded UI content for projects

---

## 3. TECH STACK RULES

### Mandatory

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion

### Optional / Allowed

- Shadcn/UI for primitives
- Zustand for UI state
- MDX or typed config for content

### Forbidden

- Pages Router
- JavaScript without types
- Inline styles
- Over‑engineered state management

---

## 4. PROJECT DATA MODEL RULES

All projects must come from a **single source of truth** (TS/JSON).

Each project must include:

- `title`
- `slug`
- `category` (frontend | backend | fullstack | mobile)
- `shortDescription`
- `longDescription`
- `techStack` (array)
- `coverImage`
- `demoVideo`
- `githubUrl`
- `liveUrl`
- `architecture`
- `engineeringDecisions`
- `metrics`
- `futureImprovements`

No project may be rendered without this structure.

---

## 5. PAGE‑LEVEL WORKFLOWS

### 5.1 Home Page Workflow

1. Render hero section:
   - Name
   - Clear value statement
   - Social links

2. Render projects section:
   - Default sort: most recent first
   - Category tabs:
     - All
     - Frontend
     - Backend
     - Fullstack
     - Mobile

3. Apply tech‑stack filters:
   - React
   - Next.js
   - Node.js
   - Kafka
   - Redis
   - Docker

4. Project cards must:
   - Show image by default
   - Auto‑play muted looping demo video on hover
   - Pause video when not hovered or visible

---

### 5.2 Project Card Rules

Each card must display:

- Title
- One‑line description
- Tech stack chips
- GitHub link
- Live demo link

Hover interactions must:

- Be subtle
- Not shift layout
- Never autoplay audio

---

### 5.3 Project Detail Page Workflow

1. Hero section:
   - Title
   - Description
   - External links

2. Media section:
   - Demo video or image carousel

3. Content sections (ordered):
   - Overview
   - Architecture
   - Engineering Decisions
   - Features
   - Metrics (if available)
   - If I Had More Time

Each section must be skippable and clearly labeled.

---

## 6. ARCHITECTURE SECTION RULES

Architecture sections must:

- Include a diagram (SVG/image)
- Explain:
  - Data flow
  - Backend responsibilities
  - Caching strategy (if any)
  - Messaging / async flow (Kafka, queues)

Avoid marketing language. Use engineering language.

---

## 7. ENGINEERING DECISIONS RULES

Each project must document:

- Why certain tools were chosen
- What alternatives were rejected
- Tradeoffs accepted

Use a clear structure:

- Decision
- Reason
- Tradeoff

---

## 8. METRICS & PERFORMANCE

If real metrics exist:

- Include them

If not:

- Use approximate or qualitative improvements
- Never fabricate exact numbers

Examples:

- Reduced API latency
- Improved throughput
- Removed N+1 queries

---

## 9. UX & INTERACTION RULES

- Dark mode by default
- Motion must be purposeful
- Command palette navigation is encouraged
- Keyboard accessibility required

No interaction should confuse first‑time visitors.

---

## 10. CODE QUALITY STANDARDS

- Modular component architecture
- Clear folder structure
- No unused components
- Clear comments only where necessary

Code should be readable by another senior engineer.

---

## 11. DELIVERY CHECKLIST

Before considering the task complete:

- [ ] All pages responsive
- [ ] Projects load from data source
- [ ] Hover videos optimized
- [ ] No console errors
- [ ] Ready for Vercel deployment

---

## 12. MENTAL MODEL

Build this portfolio as if:

- A senior engineer will review the code
- A recruiter will scan it for 60 seconds
- A CTO will open one project page only

Optimize for **clarity, depth, and credibility**.
