INSERT INTO "public"."user_profiles" ( "id",                                   "created_at",                    "updated_at",                    "goal",                                  "experience_level" )
VALUES                               (
                                       '2eeae1d4-8463-4367-a214-b68f2572fba1', '2026-09-20 19:48:33.679119+00', '2026-09-20 19:48:33.679119+00', NULL,                                    'beginner'         ),
                                     (
                                       '49946344-d2e6-40bf-8dac-efb68569f753', '2026-09-20 19:48:15.185991+00', '2026-09-20 19:48:15.185991+00', 'Give Shakespeare a run for his money.', 'master'           ),
                                     (
                                       '75e89913-02cc-45df-82fe-aaab27a49788', '2026-09-20 19:48:48.972652+00', '2026-09-20 19:48:48.972652+00', 'Learn a few words.',                    'elementary'       ),
                                     (
                                       'cdbebada-5b5b-4548-b2d4-c70d890948ce', '2026-09-20 19:49:58.531071+00', '2026-09-20 19:49:58.531071+00', NULL,                                    NULL               ),
                                     (
                                       'fb6d9d77-0781-442c-b21b-d5f5d56db4c8', '2026-09-20 19:49:49.059288+00', '2026-09-20 19:49:49.059288+00', 'Teach everyone English.',               'advanced'         );

INSERT INTO "public"."user_roles" ( "id",                                   "created_at",                    "updated_at",                    "role"    )
VALUES                            (
                                    '2eeae1d4-8463-4367-a214-b68f2572fba1', '2026-09-20 19:51:15.377024+00', '2026-09-20 19:51:15.377024+00', 'learner' ),
                                  (
                                    '49946344-d2e6-40bf-8dac-efb68569f753', '2026-09-20 19:50:32.894715+00', '2026-09-20 19:50:32.894715+00', 'admin'   ),
                                  (
                                    '75e89913-02cc-45df-82fe-aaab27a49788', '2026-09-20 19:51:25.646718+00', '2026-09-20 19:51:25.646718+00', 'learner' ),
                                  (
                                    'cdbebada-5b5b-4548-b2d4-c70d890948ce', '2026-09-20 19:51:35.974674+00', '2026-09-20 19:51:35.974674+00', 'author'  ),
                                  (
                                    'fb6d9d77-0781-442c-b21b-d5f5d56db4c8', '2026-09-20 19:51:43.965232+00', '2026-09-20 19:51:43.965232+00', 'admin'   );

INSERT INTO "public"."catalogues" (
                                  "id",
                                     "created_at",
                                                                      "updated_at",
                                                                                                       "name",
                                                                                                                              "slug",
                                                                                                                                                       "description",
                                                                                                                                                                                                                                            "display_order",
                                                                                                                                                                                                                                               "created_by",
                                                                                                                                                                                                                                                                                       "is_deleted",
                                                                                                                                                                                                                                                                                              "status"    )
VALUES                            (
                                  1, '2026-09-20 20:15:26.954839+00', '2026-09-20 20:15:26.954839+00', 'Letters & Words',     'letters-and-words',     'Build a practical foundation with everyday vocabulary and clear word recognition.', 1, 'fb6d9d77-0781-442c-b21b-d5f5d56db4c8', FALSE, 'published' ),
                                  (
                                  2, '2026-09-20 20:15:56.775519+00', '2026-09-20 20:15:56.775519+00', 'Phrases & Sentences', 'phrases-and-sentences', 'Connect the words you know into useful phrases and complete sentences.',            2, NULL,                                   FALSE, 'published'     ),
                                  (
                                  3, '2026-09-20 20:16:11.528562+00', '2026-09-20 20:16:11.528562+00', 'Conversations',       'conversations',         'Put your language skills into natural situations and everyday conversations.',      3, NULL,                                   FALSE, 'draft'     );

INSERT INTO "public"."themes" (
                              "id",
                                 "created_at",
                                                                  "updated_at",
                                                                                                   "name",
                                                                                                                        "slug",
                                                                                                                                             "description",
                                                                                                                                                                                                                               "display_order",
                                                                                                                                                                                                                                  "created_by",
                                                                                                                                                                                                                                        "is_deleted",
                                                                                                                                                                                                                                               "catalogue_id",
                                                                                                                                                                                                                                                  "status",
                                                                                                                                                                                                                                                               "visual" )
VALUES                        (
                              1, '2026-09-20 20:18:15.330993+00', '2026-09-20 20:33:09.8048+00',   'Everyday Animals',  'everyday-animals',  'Learn common animal names and build a useful first vocabulary set.',             1, NULL, FALSE, 1, 'published', '🐾'      ),
                              (
                              2, '2026-09-20 20:29:24.760092+00', '2026-09-20 20:33:10.621477+00', 'Food & Drinks',     'food-and-drinks',   'Build vocabulary for meals, drinks, ingredients, and everyday choices.',         2, NULL, FALSE, 1, 'published', '🍎'      ),
                              (
                              3, '2026-09-20 20:33:01.97285+00',  '2026-09-20 20:58:50.706795+00', 'Daily Life',        'daily-life',        'Learn practical words for routines, places, objects, and daily activities.',     3, NULL, FALSE, 1, 'draft',     '☀️'     ),
                              (
                              4, '2026-09-20 20:35:17.852998+00', '2026-09-20 20:58:55.110509+00', 'Daily Routines',    'daily-routines',    'Turn familiar vocabulary into phrases about routines and habits.',               1, NULL, FALSE, 2, 'published', '🕘'      ),
                              (
                              5, '2026-09-20 20:57:28.37386+00',  '2026-09-20 20:58:58.974672+00', 'At the Restaurant', 'at-the-restaurant', 'Practice useful phrases for ordering food and handling simple requests.',        2, NULL, FALSE, 2, 'published', '️🍽️'    ),
                              (
                              6, '2026-09-20 20:58:16.230926+00', '2026-09-20 20:59:02.899036+00', 'Making Plans',      'making-plans',      'Combine phrases to talk about plans, times, and simple arrangements.',           3, NULL, FALSE, 2, 'draft',     '📅'      ),
                              (
                              7, '2026-09-20 21:03:20.996576+00', '2026-09-20 21:05:05.821118+00', 'Introductions',     'introductions',     'Practice simple conversational patterns for meeting someone new.',               1, NULL, FALSE, 3, 'published', '👋'      ),
                              (
                              8, '2026-09-20 21:04:18.680941+00', '2026-09-20 21:04:18.680941+00', 'Shopping',          'shopping',          'Use practical conversation patterns for prices, choices, and simple questions.', 2, NULL, FALSE, 3, 'published', '🛍️'     ),
                              (
                              9, '2026-09-20 21:05:00.72136+00',  '2026-09-20 21:05:00.72136+00',  'Travel',            'travel',            'Build conversation confidence for common travel situations.',                    3, NULL, FALSE, 3, 'draft',     '🧳'      );

-- Keep identity sequences ahead of the explicit development fixtures.
SELECT pg_catalog.setval('"public"."catalogue_id_seq"', 3, true);
SELECT pg_catalog.setval('"public"."catalogue_display_order_seq"', 3, true);
SELECT pg_catalog.setval('"public"."themes_id_seq"', 9, true);
SELECT pg_catalog.setval('"public"."themes_display_order_seq"', 3, true);
