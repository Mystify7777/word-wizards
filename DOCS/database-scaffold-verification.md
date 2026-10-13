# Database Scaffold Verification

This note records the local verification and schema assumptions for the Supabase database scaffold.

## Reproduce the local database

From the repository root, run:

```bash
npm exec supabase db reset
```

The reset was verified on the current local Supabase CLI setup. It recreated the database, applied `20260917151047_remote_schema.sql`, loaded `seeds/auth/users.sql` and `seeds/seed.sql`, and completed successfully.

Repeat this check after changes to the migration, seed files, or Supabase CLI/Auth stack.

## Row-level security assumptions

- `catalogues`, `themes`, `lessons`, and `exercises` are selectable by authenticated users only when the row is published and not soft-deleted.
- `user_profiles` rows are scoped by `id = auth.uid()`.
- `user_roles.id` references `user_profiles.id`, which references `auth.users.id`. Therefore the `user_roles` policy using `id = auth.uid()` matches this schema; it is not an unrelated role-record identifier.
- Table grants and RLS are separate controls. The migration removes table privileges from `anon`, grants `authenticated` SELECT only, and explicitly preserves `service_role` access.

The current seed does not contain soft-deleted content or lesson/exercise rows, so those row states are not exercised by the seed itself. Their visibility is constrained by the migration policies.

## Local Auth fixtures

`seeds/auth/users.sql` creates local fixture users with `.test` email addresses and no passwords or Auth identities. This avoids carrying dumped password hashes or identity records into the seed.

The minimal direct insert into `auth.users` passed the fresh local reset described above. Because `auth.users` is managed by Supabase, this is a compatibility assumption about the current local Auth schema, not a guarantee for every future Supabase version. Re-run the reset when upgrading the Supabase CLI or Auth stack. If it fails, inspect the actual local schema defaults and constraints before adding fixture columns or values.

## Timestamp behavior

The migration installs `updated_at` triggers on all six scaffold tables using the `extensions.moddatetime` function. A local update check confirmed that `updated_at` changes when a row is updated; the test update was rolled back.
