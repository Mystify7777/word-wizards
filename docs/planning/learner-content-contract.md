# Learner Content Contract

This document defines the content data the learner catalogue flow consumes for Issue #40.

The current implementation uses mock data behind the frontend catalogue service. The contract is intentionally shaped around the planned database model so the UI can move to a backend source without changing its content hierarchy.

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

The existing frontend also keeps presentation metadata such as the current visual marker and mock learner progress.

## Lesson

A lesson belongs to one theme.

Required learner-facing fields:

| Field | Type | Purpose |
| --- | --- | --- |
| id | uuid/string | Unique identifier |
| theme_id | uuid/string | Parent theme |
| title | string | Display title |
| description | string | Short learner-facing description |
| display_order | integer | Ordering within the theme |
| status | enum | Publication state |

The frontend currently represents `display_order` as `order`.

## Learner lesson state

Learner state is separate from content.

```
Lesson
   +
LessonProgress
   ↓
LearnerLesson
```

Current learner-facing progress fields:

| Field | Type | Purpose |
| --- | --- | --- |
| lesson_id | uuid/string | Lesson being tracked |
| status | enum | not_started, in_progress, completed |
| progress | integer | Completion percentage |
| score | integer | Optional lesson score |
| attempt_count | integer | Optional attempt count |

The eventual database record may also contain learner identity and timestamps. Those persistence fields are not required by the current UI.

## Availability

Availability is a learner-facing projection, not a permanent property of the lesson content.

```
Content
  +
learner eligibility / unlock state
  ↓
available | locked
```

Issue #40 uses mock availability only. Real eligibility and unlocking rules are explicitly out of scope.

A locked lesson must not be treated as a navigable lesson by the learner UI.

## Service boundary

The learner UI consumes content through the catalogue service:

```
UI
 ↓
Catalogue service
 ↓
Mock data today
 ↓
Backend source later
```

Current service operations include:

- `getCatalogues()`
- `getCatalogueById()`
- `getThemesByCatalogueId()`
- `getThemeById()`
- `getLessonsByThemeId()`
- `getLessonById()`
- `getLessonProgress()`
- `getLearnerLessonsByThemeId()`
- `getLearnerLessonById()`

The UI must not import mock data directly.

## Out of scope for this contract

This flow does not define:

- exercise schemas
- exercise evaluation
- lesson completion persistence
- key transactions
- content unlock transactions
- qualification tests
- authoring workflows
- database migrations
- Supabase queries

Those belong to later implementation phases.