# FlatRights — Database schema reference

**Source of truth:** generated TypeScript types in **`src/types/database.ts`**.

Regenerate after remote schema changes:

```bash
npx supabase gen types typescript --project-id bsqaranndomlkmaokdkb > src/types/database.ts
```

## Core entities (public)

| Area | Tables / notes |
|------|------------------|
| Users | `profiles` (linked to `auth.users`) |
| Buildings | `buildings` — address, flat counts, landlord fields |
| Membership | `building_members` — `role` (`organiser` \| `member` \| `viewer`), flat, lease fields |
| RTM | `rtm_claims`, `rtm_tasks`, `rtm_consents` |
| Service charge | `service_charge_challenges` |
| Lease extension | `lease_extensions` |
| Enfranchisement | `enfranchisement_claims` (per types) |
| Documents | `generated_documents` — content, metadata JSON, review flags |
| Eligibility | `eligibility_checks` (and related — see types) |
| Outcomes | Outcome columns on product tables per Prompt 18 |

## RPCs / views (see `Database["public"]["Functions"]` and views in types)

Examples referenced in prompts: `check_rtm_eligibility`, `building_dashboard`, benchmark views — **confirm names in `src/types/database.ts`** after each migration.

## RLS

All tenant data must be protected by Supabase Row Level Security policies (not expressed in this file).
