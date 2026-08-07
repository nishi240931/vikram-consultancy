# 🚀 Production Deployment Guide — VIKRAM EDU CONSULTANTS

## Prerequisites

1. Managed PostgreSQL Cluster (Neon, Supabase, or AWS RDS)
2. Clerk Account (Production Instance Keys)
3. AI Provider API Keys (OpenAI, Google Gemini, Anthropic Claude)
4. Vercel / Docker Container Deployment Platform

---

## Environment Variables Setup

Configure `.env.local` or environment settings on your host:

```env
DATABASE_URL="postgresql://user:password@host:5432/vikramedu_prod?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
OPENAI_API_KEY="sk-proj-..."
GEMINI_API_KEY="AIzaSy..."
ANTHROPIC_API_KEY="sk-ant-..."
AI_PROVIDER="openai"
NEXT_PUBLIC_SITE_URL="https://vikramedu.com"
```

---

## Deployment Steps

1. **Database Migration:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Database Seeding (Optional):**
   ```bash
   npx prisma db seed
   ```

3. **Production Next.js Build:**
   ```bash
   npm run build
   ```

4. **Start Production Server:**
   ```bash
   npm run start
   ```
