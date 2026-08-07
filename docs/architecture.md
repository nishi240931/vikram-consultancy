# 🏛️ System Architecture Overview — VIKRAM EDU CONSULTANTS

## Technology Stack

* **Framework:** Next.js 15 (App Router, Server Components, Streaming, Server Actions)
* **Language:** TypeScript 5.x (Strict Type Safety)
* **Styling:** Vanilla CSS & TailwindCSS Design System Tokens
* **Database & ORM:** PostgreSQL + Prisma ORM (Type-safe Repositories)
* **Authentication & Access:** Clerk + Role-Based Access Control (`STUDENT`, `COUNSELLOR`, `ADMIN`, `SUPER_ADMIN`)
* **AI Intelligence:** Multi-Provider AI Orchestrator (OpenAI, Gemini, Claude) + Versioned Prompts + Zod Validation

---

## Architectural Layers

```
Client UI Pages / Server Components
       │
       ▼
Service Layer (`src/services/*`)
       │
 ┌─────┴────────────────┐
 ▼                      ▼
Repository Layer      AI Orchestrator Layer
(`src/repositories/*`) (`src/ai/orchestrator/*`)
       │                      │
       ▼                      ▼
Prisma ORM / PostgreSQL  AI Providers (OpenAI/Gemini/Claude)
```

1. **Repository Layer (`src/repositories/`):** Direct type-safe Prisma database queries with fallback handling.
2. **Service Layer (`src/services/`):** Business logic, validation, aggregation, and caching.
3. **AI Layer (`src/ai/`):** Provider abstraction, versioned prompt templates, and schema validation.
4. **UI Layer (`src/components/`, `src/app/`):** Server & Client components consuming services.
