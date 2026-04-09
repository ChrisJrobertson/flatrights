# FlatRights — Project synopsis

**FlatRights** is a UK leasehold workflow product: Right to Manage, service charge challenges, lease extensions, and collective enfranchisement — with statutory deadlines, document generation (Claude API), Stripe one-off payments, and Supabase (Auth, Postgres, Realtime).

- **Audience:** Leaseholders and resident management company organisers.
- **Positioning:** Guided statutory process and document structure that **follow named sections of law** — not “AI legal advice” and not unqualified “compliance” claims.
- **Stack:** Next.js 16 (App Router), Tailwind v4, Supabase, Stripe, Resend, Anthropic (generation — Prompt 7).

**Canonical build plan:** see **`CURSOR_PROMPTS.md`** (18 sequential prompts). **Schema reference:** **`DATABASE_SCHEMA.md`** (and generated **`src/types/database.ts`**).
