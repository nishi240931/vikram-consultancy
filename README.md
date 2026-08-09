# Vikram Edu Consultants

A premium AI-powered study abroad consultancy platform built with Next.js 15, React 19, Clerk, Prisma, PostgreSQL, and Resend.

---

## 🌟 Overview

**Vikram Edu Consultants** is a comprehensive, production-ready study abroad counseling platform designed to guide international students through their global education journey. The platform enables students to:

- Explore top study destinations (USA, UK, Canada, Australia, Germany, Ireland, Singapore)
- Search and discover world-class universities and global rankings
- Explore academic courses, tuition fees, and IELTS/GRE entry requirements
- Search international scholarships and financial aid opportunities
- Book 1-on-1 consultations with senior overseas education advisors
- Submit direct contact inquiries with automated transactional email notifications
- Access a personalized Student Workspace for application tracking and document management
- Utilize 24/7 AI-powered counseling assistance (university matching, SOP evaluation, eligibility scoring)

---

## ✨ Core Features

- **Study Destinations Hub:** Detailed country profiles featuring post-study work visa rights, living costs, top cities, and popular degree majors.
- **University Directory:** Interactive university cards featuring localized campus photography, global QS rankings, acceptance rates, and location badges.
- **Course & Scholarship Explorers:** Structured search and filter controls for degree levels, tuition budgets, eligibility criteria, and application deadlines.
- **Consultation Booking System:** Interactive 3-step appointment scheduling with senior advisors, automatic conflict protection, and Google Meet integration.
- **Contact Inquiry Workflow:** Validated inquiry form with database persistence and dual transactional email notifications via Resend.
- **Clerk Authentication & RBAC:** Role-based access control (`STUDENT`, `COUNSELLOR`, `ADMIN`, `SUPER_ADMIN`) guarding student dashboards and administrative CRM.
- **Student Dashboard Workspace:** Profile management, application stage tracking, document verification badges, saved shortlists, and notifications.
- **Admin CRM Operations:** Student application tracking, counsellor assignments, appointment calendars, content management, and platform conversion analytics.
- **AI Counseling Studio:** Multi-provider AI orchestrator supporting 24/7 student guidance with built-in simulator fallbacks.
- **Production Hardening:** Strict HTTP security headers (`nosniff`, `DENY`, `strict-origin-when-cross-origin`, HSTS), sliding-window rate limiting, and safe error handling.
- **SEO & Discoverability:** Dynamic Next.js metadata, automated XML sitemap, `robots.txt`, EducationalOrganization JSON-LD, and Course Schema.org markup.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/) & [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) with [PostgreSQL / Neon](https://neon.tech/)
- **Transactional Email:** [Resend SDK](https://resend.com/)
- **Input Validation:** [Zod](https://zod.dev/)
- **Icons & Animations:** [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/)
- **AI Integrations (Optional):** OpenAI, Google Gemini, Anthropic Claude

---

## 📁 Repository Architecture

```text
vikram-consultancy/
├── prisma/
│   ├── schema.prisma           # Prisma schema definition
│   └── migrations/             # Database migration history
├── public/
│   ├── favicon.ico             # Web application favicon
│   └── images/
│       └── universities/       # Localized university campus assets
├── src/
│   ├── app/                    # Next.js App Router (Public, Dashboard, Admin, Auth, API)
│   ├── components/             # Reusable UI components (Layout, Sections, Design System)
│   ├── config/                 # Application, SEO, and Environment configurations
│   ├── data/                   # Static fallback data (Countries, Universities, Testimonials)
│   ├── design-system/          # Core tokens, color palettes, and glassmorphism utilities
│   ├── lib/                    # Auth helpers, error classes, logger, rate-limiter
│   ├── repositories/           # Data access layer (User, Appointment, Contact)
│   ├── services/               # Business logic services & Email dispatch
│   └── validators/             # Zod validation schemas
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration & Security headers
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🔐 Authentication & Roles

Authentication is powered by Clerk with server-side role synchronization to PostgreSQL:

- **Public Routes:** `/`, `/about`, `/services`, `/destinations`, `/universities`, `/courses`, `/scholarships`, `/blogs`, `/events`, `/contact`, `/book-consultation`, `/sign-in`, `/sign-up`
- **Student Protected Routes:** `/dashboard(/*)` — Requires `STUDENT`, `COUNSELLOR`, `ADMIN`, or `SUPER_ADMIN` role.
- **Admin Protected Routes:** `/admin(/*)` — Strictly requires `ADMIN` or `SUPER_ADMIN` role.
- **Clerk Webhook Synchronization:** `/api/webhooks/clerk` processes `user.created`, `user.updated`, and `user.deleted` events verified via `svix`.

---

## 🌐 API Routes

- `POST /api/contact` — Validates inquiry payloads via Zod, persists record to PostgreSQL, and dispatches Resend email notifications.
- `POST /api/appointments` — Validates consultation bookings, enforces future date and slot conflict rules, records appointment, and dispatches confirmation emails.
- `POST /api/webhooks/clerk` — Svix-verified webhook endpoint for real-time user state synchronization.

---

## 🗄️ Database Setup

The project uses PostgreSQL managed via Prisma ORM:

```bash
# Generate Prisma Client
npx prisma generate

# Apply Database Migrations (Local Development)
npx prisma migrate dev

# Deploy Migrations (Production Pipeline)
npx prisma migrate deploy
```

---

## 🔑 Environment Variables

To run the application locally, create a `.env.local` file in the root directory and populate it based on `.env.example`:

```env
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Clerk Authentication Setup
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key_here"
CLERK_SECRET_KEY="your_clerk_secret_key_here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret_here"

# PostgreSQL Database Connection (Neon / PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/vikramedu_db?schema=public"

# Resend Transactional Email Key
RESEND_API_KEY="your_resend_api_key_here"

# Optional AI Provider Keys
OPENAI_API_KEY="your_openai_api_key_here"
GEMINI_API_KEY="your_gemini_api_key_here"
ANTHROPIC_API_KEY="your_anthropic_api_key_here"
```

> ⚠️ *Important: Never commit `.env`, `.env.local`, or real production credentials to Git.*

---

## 💻 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Open Browser:** Navigate to `http://localhost:3000`.

---

## 🧪 Validation & Type-Checking

Run the following checks prior to deployment:

```bash
# TypeScript Type Verification
npm run type-check

# Next.js Production Build Test
npm run build
```

---

## 🚀 Production Deployment

This repository is ready for automated production deployment on [Vercel](https://vercel.com/):

1. Connect the GitHub repository `nishi240931/vikram-consultancy` to Vercel.
2. Select **Next.js** framework preset.
3. Configure Vercel production environment variables (`DATABASE_URL`, `CLERK_*`, `RESEND_API_KEY`).
4. Set production Clerk webhook URL: `https://vikramedu.com/api/webhooks/clerk`.
5. Trigger build deployment.

---

## 🛡️ Security & Hardening

- Server-side environment variable isolation
- Svix webhook signature verification
- Parameterized Prisma database queries
- Sliding window API rate limiting (`src/lib/rate-limit.ts`)
- Production HTTP Security Headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, HSTS, `Permissions-Policy`)
- Fail-safe dev fallback data mechanisms ensuring 100% platform availability

---

## 🎯 Project Status

**Production-Ready Deployment Candidate.** (All 30 development, security, performance, SEO, and QA phases completed).

---

## 📜 License

Proprietary project. All rights reserved. © Vikram Edu Consultants Private Limited.
