# FlatRights — Cursor Composer prompts (sequential build)

**Execute in order.** Test each prompt before moving on. Prompts **1–8** = launchable RTM path.

---

## ORDER OF EXECUTION

1. Scaffolding + Supabase connection  
2. RTM Eligibility Checker  
3. Landing page  
4. Auth flow  
5. Building dashboard  
6. Consent collection  
7. Statutory document generation  
8. Stripe payments + dual pricing  
9. Service charge challenge wizard  
10. Lease extension calculator + wizard  
11. Collective enfranchisement  
12. Member management  
13. Email notifications  
14. SEO guide pages  
15. Pricing page (full)  
16. Enhanced building overview  
17. Public tools page  
18. Outcome capture + data moat  

---

## PROMPT 1: Project scaffolding + Supabase connection

- Next.js **16**, App Router, TypeScript strict, Tailwind **v4**.  
- Packages: `@supabase/ssr`, `@supabase/supabase-js` (not deprecated auth-helpers), shadcn **new-york** slate, RHF + zod, `stripe` + `@stripe/stripe-js`, `lucide-react`, `resend`.  
- `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts` (`updateSession`).  
- **`src/proxy.ts`** — export **`proxy`**, **`config.matcher`**; **no** `middleware.ts` at root for Next 16.  
- `.env.example`; `.env.local` for real keys.  
- `npx supabase gen types typescript --project-id bsqaranndomlkmaokdkb > src/types/database.ts`  
- Route groups: `(public)`, `(auth)`, `(dashboard)` — placeholder pages only until later prompts.

---

## PROMPT 2: RTM eligibility checker (`/check`)

- Public, no auth. Multi-step form (5 steps), progress, Zod + RHF.  
- Submit: Supabase RPC **`check_rtm_eligibility`** (anon).  
- Results: eligible / ineligible + reasons; CTA to register.  
- Email capture → **`eligibility_checks`** + UTM.  
- SEO title: *Can I Right to Manage My Building? Free RTM Eligibility Check*.

---

## PROMPT 3: Landing page (`/`)

- Positioning: risk reduction; never “AI-generated” / unqualified “legally compliant”.  
- Sections: hero, fear cards, four products (dual £ + solicitor line), stats, how it works, vs solicitor calculator, LAFRA facts, founder, FAQ, footer (Companies House / ICO / legal links), final CTA.  
- Teal/green, calm authority.

---

## PROMPT 4: Auth flow

- Magic links only: `/login`, `/register` (name, email, optional flat).  
- `/auth/callback` exchanges code.  
- **`src/proxy.ts`**: protect `/buildings`, `/building/*`; redirect logged-in users away from login/register.

---

## PROMPT 5: Building dashboard

- `/buildings`: list from view **`building_dashboard`** (or equivalent); cards with badges, consent bar, deadlines; empty state CTA.  
- **`/building/new`**: add building (used after payment in Prompt 8).  
- `/building/[id]`: tabs RTM | Service Charges | Extensions | Freehold; RTM pipeline, consent (realtime), tasks, deadlines; quick actions.  
- Realtime: `rtm_consents`, `rtm_tasks`.

---

## PROMPT 6: Consent collection (`/building/[id]/consent`)

- Organiser: table, invite, Resend, bulk/reminders, progress, PDF export.  
- Public **`/consent/[token]`** (or API route per spec): no auth; JWT/UUID token; updates `rtm_consents`.

---

## PROMPT 7: Statutory document generation

- **`/api/generate/[type]`** POST: validation gate (422 if missing prerequisites) → Claude → save **`generated_documents`** + metadata JSON checklist.  
- **`/building/[id]/documents`**: list, preview, PDF, regenerate, solicitor review (£99).  
- User-facing: never “AI-generated”; use “Generate…” / “ready to review”.

---

## PROMPT 8: Stripe payments + dual pricing

- Dual display: £299/£398, £499/£598, £99/£198, £199/£298, £499/£598 + £99 review add-on.  
- **`/api/stripe/checkout`**, **`/api/stripe/webhook`**.  
- Flows: RTM → `/building/new?type=rtm&session_id=…`; others attach to existing building.  
- Money-back rules with eligibility gate.

---

## PROMPT 9–11: Other products

- **9:** `/building/[id]/challenge/new` wizard → challenge letter + status.  
- **10:** `/building/[id]/extension/new` + public **`/tools/lease-calculator`**.  
- **11:** `/building/[id]/enfranchise` + participants + s.13 flow.

---

## PROMPT 12: Member management

- `/building/[id]/members`: roles, invite, transfer organiser, remove, self-service fields.

---

## PROMPT 13: Email notifications

- Resend + React Email templates: welcome, consent, payment, documents, deadlines, etc.

---

## PROMPT 14: SEO guides

- `/guides/[slug]` MDX — eight launch guides, JSON-LD, internal links.

---

## PROMPT 15: Pricing page (full)

- Five-column products (incl. RTM Complex £499), calculator, comparison table, CTAs → auth → Stripe.

---

## PROMPT 16: Building overview (enhanced)

- Unified `/building/[id]` product cards + activity feed across tables.

---

## PROMPT 17: Public tools (`/tools`)

- Links to checkers + calculators + enfranchisement checker; email capture.

---

## PROMPT 18: Outcome capture + data moat

- Outcome forms per product; emails + cron reminders; **`/building/[id]/benchmarks`**; **`/admin/analytics`** (allowlisted emails).

---

## Audit helper

Use the **Cursor Audit Prompt** block (repo + prompts + `.cursorrules` + schema) at session start to classify DONE / PARTIAL / NOT STARTED for prompts 1–18.
