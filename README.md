# FlatRights

UK leasehold workflow platform: **Right to Manage**, **service charge challenges**, **lease extensions**, and **collective enfranchisement** — with statutory deadlines, guided steps, and document workflows.

- **Stack:** [Next.js 16](https://nextjs.org) (App Router), React 19, Tailwind CSS v4, [Supabase](https://supabase.com) (Auth + Postgres), Stripe, Resend.
- **Network boundary:** `src/proxy.ts` (Next.js 16 convention — session refresh via `src/lib/supabase/middleware.ts`). Do not add root `middleware.ts` for new work.

## Docs in this repo

| File | Purpose |
|------|---------|
| [`.cursorrules`](./.cursorrules) | Positioning and engineering rules for AI-assisted work |
| [`PROJECT_SYNOPSIS.md`](./PROJECT_SYNOPSIS.md) | Product overview |
| [`CURSOR_PROMPTS.md`](./CURSOR_PROMPTS.md) | Sequential build prompts (1–18) |
| [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md) | Schema notes; generated types live in `src/types/database.ts` |

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase project settings
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Regenerate database types

After schema changes in Supabase:

```bash
npx supabase gen types typescript --project-id bsqaranndomlkmaokdkb > src/types/database.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Deploy

The app is designed for [Vercel](https://vercel.com): set environment variables in the project dashboard to match `.env.example` (no secrets in the repo).

## Licence

Private — All rights reserved unless otherwise stated.
