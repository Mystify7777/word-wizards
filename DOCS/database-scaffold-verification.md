# Database Scaffold Verification

This note records the local verification and schema assumptions for the Supabase database scaffold.

## Reproduce the local database

From the repository root, run:

```bash
npm exec supabase db reset
```

The original scaffold migration and seed were verified with a fresh local reset. The integrity/progress migration adds further checks, so rerun this command after pulling it. Do not describe the new migration as verified until that reset succeeds.

## Learning hierarchy and deletion behavior

- `themes.catalogue_id`, `lessons.theme_id`, and `exercises.lesson_id` are required foreign keys.
- The content hierarchy uses `ON DELETE RESTRICT`, preventing deletion of a parent while dependent content exists.
- `lesson_progress` references a user profile and lesson. A user's progress is unique per lesson; deleting a user profile cascades to their progress, while deleting a referenced lesson is restricted.
- `content_unlocks` stores exactly one catalogue, theme, or lesson target per row. Duplicate unlocks for the same user and target are rejected. Deleting a user profile cascades to their unlocks; deleting unlocked content is restricted.

## Row-level security and grants

- `catalogues`, `themes`, `lessons`, and `exercises` are selectable by authenticated users only when the row is published and not soft-deleted.
- `user_profiles` rows are scoped by `id = auth.uid()`.
- `user_roles.id` references `user_profiles.id`, which references `auth.users.id`. Therefore the `user_roles` policy using `id = auth.uid()` matches this schema; it is not an unrelated role-record identifier.
- `lesson_progress` and `content_unlocks` are selectable only by their owning authenticated user. Writes remain server-controlled through `service_role`; authenticated users receive SELECT only.
- Table grants and RLS are separate controls. The migration removes table privileges from `anon`, grants `authenticated` SELECT only, and explicitly preserves `service_role` access.

The current seed does not contain lesson/exercise rows, so it does not exercise those content relationships or learner-progress inserts. The new migration's constraints should be checked with focused local SQL tests after reset.

## Local Auth fixtures

`seeds/auth/users.sql` creates local fixture users with `.test` email addresses and no passwords or Auth identities. This avoids carrying dumped password hashes or identity records into the seed.

The minimal direct insert into `auth.users` passed a prior fresh local reset. Because `auth.users` is managed by Supabase, this is a compatibility assumption about the current local Auth schema, not a guarantee for every future Supabase version. Re-run the reset when upgrading the Supabase CLI or Auth stack. If it fails, inspect the actual local schema defaults and constraints before adding fixture columns or values.

## Timestamp behavior

The scaffold migration installs `updated_at` triggers on the six original tables using `extensions.moddatetime`. The new progress migration adds the same behavior to `lesson_progress`. `content_unlocks` records `unlocked_at` and does not have mutable update state.
