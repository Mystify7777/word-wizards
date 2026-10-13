-- Local development auth fixtures only.
-- These users intentionally have no password or identity so the seed cannot
-- create reusable credentials. Create a login-capable local user through
-- Supabase Auth/Studio when authentication testing is required.

INSERT INTO "auth"."users" (
    "id",
    "email",
    "raw_user_meta_data"
)
VALUES
    (
        '49946344-d2e6-40bf-8dac-efb68569f753',
        'admin@word-wizards.test',
        '{}'::jsonb
    ),
    (
        '2eeae1d4-8463-4367-a214-b68f2572fba1',
        'learner1@word-wizards.test',
        '{}'::jsonb
    ),
    (
        '75e89913-02cc-45df-82fe-aaab27a49788',
        'learner2@word-wizards.test',
        '{}'::jsonb
    ),
    (
        'fb6d9d77-0781-442c-b21b-d5f5d56db4c8',
        'author1@word-wizards.test',
        '{}'::jsonb
    ),
    (
        'cdbebada-5b5b-4548-b2d4-c70d890948ce',
        'author2@word-wizards.test',
        '{}'::jsonb
    );
