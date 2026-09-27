# Learner Content Contract

This document defines the temporary frontend data contract for the learner experience. Mock data sits behind service functions today so the learner UI can move to Supabase-backed sources later without changing its content hierarchy or component boundaries.

## Learning hierarchy

```
Catalogue
   ↓
Theme
   ↓
Lesson
   ↓
Exercise
```

`Module` is not part of the current learner content contract.

## Catalogue

A catalogue is a top-level learning category.

Required learner-facing fields:

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unique identifier |
| name | string | Display name |
| slug | string | URL-friendly identifier |
| description | string | Short learner-facing description |
| display_order | integer | Ordering within the catalogue list |
| status | enum | Publication state |

The frontend currently represents `display_order` as `order`.

## Theme

A theme groups related lessons within a catalogue.

Required learner-facing fields:

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unique identifier |
| catalogue_id | uuid/string | Parent catalogue |
| name | string | Display name |
| slug | string | URL-friendly identifier |
| description | string | Short learner-facing description |
| display_order | integer | Ordering within the catalogue |
| status | enum | Publication state |

The frontend also keeps presentation metadata such as the current visual marker and mock learner progress.

## Lesson

A lesson belongs to one theme.

Required learner-facing fields:

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unique identifier |
| theme_id | uuid/string | Parent theme |
| type | enum | tutorial or lab |
| title | string | Display title |
| description | string | Short learner-facing description |
| display_order | integer | Ordering within the theme |
| status | enum | Publication state |

The frontend currently represents `display_order` as `order`.

Lesson types currently supported by the learner flow:

- `tutorial`: teaches the concepts and skills represented by a theme.
- `lab`: provides a separate application/practice activity.

## Exercise

An exercise is the smallest learner-facing activity inside a lesson.

Required learner-facing fields:

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unique identifier |
| lesson_id | uuid/string | Parent lesson |
| type | enum | Renderer/evaluation category |
| title | string | Display title |
| display_order | integer | Ordering within the lesson |
| status | enum | Publication state |

Current frontend exercise types are:

- `recognition`
- `spelling`
- `multiple_choice`
- `direct_manipulation`

The exercise contract intentionally does not define answer payloads, evaluation rules, hints, feedback, or rendering configuration yet.

## Learner profile

The profile represents application-level learner information. Authentication remains owned by Supabase Auth.

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Learner identifier |
| display_name | string | Learner-facing name and identifier |
| email | string | Account email |
| avatar_url | string/null | Optional profile image |

Service:

- `getLearnerProfile()`

## Learner state

Learner state remains separate from content.

```
Lesson
   +
LessonProgress
   ↓
LearnerLesson
```

Current lesson progress fields:

| Field | Type | Purpose |
| --- | --- | --- |
| lesson_id | uuid/string | Lesson being tracked |
| status | enum | not_started, in_progress, completed |
| progress | integer | Completion percentage |
| score | integer | Optional lesson score |
| attempt_count | integer | Optional aggregate attempt count |

The eventual persistence model may also include learner identity and timestamps.

## Exercise attempts

An exercise attempt represents a learner's historical interaction with an exercise.

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Attempt identifier |
| learner_id | uuid/string | Learner who made the attempt |
| exercise_id | uuid/string | Exercise attempted |
| status | enum | in_progress or completed |
| score | integer/null | Result when available |
| started_at | timestamp | Attempt start time |
| completed_at | timestamp/null | Completion time |

Service:

- `getExerciseAttempts(learnerId, exerciseId)`
- `getExerciseAttemptById(learnerId, exerciseId, attemptId)`

Attempt history is separate from progress aggregates. The current mock progress data may still expose `attemptCount` as a UI-friendly aggregate.

## Keys

The temporary learner state exposes a wallet-like key balance:

| Field | Type | Purpose |
| --- | --- | --- |
| learner_id | uuid/string | Learner who owns the balance |
| key_balance | integer | Current mock key balance |

Service:

- `getLearnerWallet()`

This is intentionally a read-only mock projection. Key earning, spending, transaction history, and anti-farming rules are out of scope.

## Content unlocks

An unlock represents content that a learner has already unlocked.

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unlock record identifier |
| learner_id | uuid/string | Learner who unlocked the content |
| content_id | uuid/string | Unlocked content identifier |
| content_type | enum | theme or lesson |
| unlocked_at | timestamp | When the mock unlock occurred |

Service:

- `getContentUnlocks()`
- `getContentUnlock(contentType, contentId)`

Unlock rules, key transactions, qualification tests, and server-side authorization are out of scope.

## Service boundary

Learner UI consumes data through domain service functions:

```
UI
 ↓
service layer
 ↓
mock data today
 ↓
Supabase-backed source later
```

Current service boundaries include:

### Learner

- `getLearnerProfile()`
- `getLearnerOverview()`
- `getLearnerWallet()`
- `getContentUnlocks()`
- `getContentUnlock()`

### Catalogue

- `getCatalogues()`
- `getCatalogueById()`
- `getThemesByCatalogueId()`
- `getThemeById()`
- `getLessonsByThemeId()`
- `getLessonById()`
- `getLessonProgress()`
- `getLearnerLessonsByThemeId()`
- `getLearnerLessonById()`

### Learning

- `getExercisesByLessonId()`
- `getExerciseById()`
- `getExerciseAttempts()`
- `getExerciseAttemptById()`

### Progress

- `getOverallProgress()`
- `getTodaysProgress()`
- `getWeeklyGoal()`
- `getCatalogueProgress()`

### Achievements

- `getAchievements()`

Components and route handlers should not import mock-data modules directly.

## Backend replacement boundary

The eventual Supabase implementation should preserve the service-facing shapes wherever possible.

The service layer is responsible for:

- querying the backend source
- normalizing backend field names into frontend types
- filtering unpublished content
- preserving parent-child relationships
- returning learner-facing state

The UI is responsible for:

- rendering data
- handling interaction
- presenting loading, empty, locked, and error states

The backend is responsible for:

- authentication
- persistence
- authorization
- progress mutation
- key transactions
- unlock rules
- publication state

## Out of scope

This contract does not implement:

- Supabase queries
- database migrations
- exercise answer schemas
- exercise evaluation
- lesson completion workflows
- progress mutation
- key transactions or economy rules
- unlock transactions or eligibility rules
- qualification tests
- authoring workflows
- server-side enforcement of learner state
