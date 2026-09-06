# Word Wizards

## Product Requirements Document (PRD)

**Project Type:** Interactive Language Learning Platform + Content Management Engine  
**Initial Language:** English  
**Future Direction:** Multi-language learning platform  
**Architecture:** Data-driven, extensible, role-based  
**Primary Goal:** Build a reusable learning and content-management engine rather than a collection of hardcoded English lessons.

---

# 1. Executive Summary

Word Wizards is an interactive, gamified language-learning platform designed around structured learning, active recall, learner progression, and reusable content authoring.

The platform will initially teach **English**, beginning with vocabulary and progressively expanding into:

1. **Letters & Words**
2. **Phrases & Sentences**
3. **Comprehension**

Learners interact with content rather than passively consuming it. Lessons use images, pronunciation, spelling, direct manipulation, active recall, immediate feedback, mistake reinforcement, and recognition exercises.

Progression through the platform is controlled through a combination of:

- learning progress
- prerequisite completion
- qualification tests
- earned keys
- content unlocking

At the same time, Word Wizards provides an authoring environment where authorized content creators can create, edit, save, preview, publish, archive, and manage learning content without modifying application code.

The central engineering objective is therefore:

> Build a reusable, data-driven learning engine where learners consume structured content and authors manage that content through a role-based interface.

English is simply the first implementation of the system, not the permanent definition of the system.

---

# 2. Product Vision

Word Wizards should eventually support multiple languages and learning domains without requiring the engineering team to redesign the platform for every new language.

For example:

```text
Word Wizards Platform
│
├── English
│   ├── Words
│   ├── Phrases & Sentences
│   └── Comprehension
│
├── German
│   ├── Vocabulary
│   ├── Grammar
│   └── Comprehension
│
├── Hindi
│   ├── Vocabulary
│   ├── Sentences
│   └── Reading
│
└── Japanese
    ├── Hiragana / Katakana
    ├── Vocabulary
    ├── Sentences
    └── Comprehension
```

The platform must therefore distinguish between:

### Platform concepts

These are reusable concepts:

- Language
- Catalogue
- Module
- Theme
- Lesson
- Exercise
- Lab
- Progress
- Unlock Rule

### Content instances

These are specific implementations:

- English
- German
- Animals
- Food
- Travel
- Hiragana
- Business Vocabulary

The system should never fundamentally assume that:

```text
Language = English
```

or:

```text
Catalogue = Words
```

Those are data instances.

---

# 3. Product Goals

## Primary Goals

### 1. Interactive learning

Learners should actively interact with language concepts rather than simply read content.

### 2. Structured progression

Learning should move through increasingly complex stages.

### 3. Persistent learning state

Learners must retain their:

- completed lessons
- progress
- unlocked content
- keys
- achievements
- current learning state

across devices and sessions.

### 4. Content authoring without engineering involvement

Authors should be able to manage learning content through the application.

### 5. Extensibility

Adding a new language or learning structure should primarily involve adding data and content rather than rewriting application architecture.

### 6. Secure role-based access

Different users must have different capabilities.

---

# 4. Non-Goals for the Initial Release

The initial implementation should not attempt to become a complete Duolingo competitor before lunch.

The first release will not prioritize:

- social networks
- friend systems
- leaderboards
- competitive multiplayer
- AI tutors
- complex adaptive learning algorithms
- advanced streak systems
- dozens of currencies
- marketplace systems
- subscriptions
- every possible language

The goal is to build a strong learning engine first.

---

# 5. User Roles

The initial platform supports three primary roles.

## Learner

Can:

- browse accessible content
- complete lessons
- take tests
- earn keys
- unlock content
- view progress
- resume learning
- access their account across devices

---

## Author

Can:

- create content
- edit content
- save drafts
- preview content
- publish content
- archive content
- manage exercises
- define success criteria
- define prerequisites

Authors cannot necessarily manage platform-wide users or permissions.

---

## Administrator

Can:

- manage users
- assign roles
- manage permissions
- manage languages
- manage platform-wide content
- moderate or archive content
- manage system configuration

---

# 6. Learner Experience

## 6.1 Learner Dashboard

The learner dashboard acts as the central home screen.

```text
Dashboard
│
├── Continue Learning
│
├── Current Language
│
├── Overall Progress
│
├── Available Catalogues
│
├── Recently Completed
│
├── Keys Balance
│
├── Locked Content
│
└── Learning Statistics
```

The dashboard should answer three questions immediately:

> What am I currently learning?

> How much progress have I made?

> What can I unlock or learn next?

---

# 7. Learning Structure

The initial English learning path contains three catalogues.

```text
ENGLISH
│
├── Letters & Words
│
├── Phrases & Sentences
│
└── Comprehension
```

However, these must be stored as configurable catalogues rather than hardcoded application sections.

A future language may have a different structure.

For example:

```text
JAPANESE
│
├── Writing Systems
├── Vocabulary
├── Grammar
└── Reading
```

Therefore the application architecture must support:

```text
Language
    ↓
Catalogue
    ↓
Module
    ↓
Theme
    ↓
Lesson
    ↓
Exercise
```

Not every level must always be required, but the hierarchy should support structured content.

---

# 8. Letters & Words Catalogue

The Words catalogue is the initial learner entry point.

It contains themes such as:

```text
Animals
Food
Travel
Nature
Technology
Business
Emotions
Daily Life
```

Each theme contains vocabulary relevant to its domain.

Example:

```text
Theme: Animals

Lesson:
├── Lion
├── Elephant
├── Dolphin
└── Fox
```

---

# 9. Lesson Structure

The default vocabulary lesson should follow a structured learning loop.

## Stage 1: Introduction

The learner is introduced to vocabulary.

Each word may contain:

- image
- written word
- pronunciation audio
- optional meaning
- optional contextual information

Example:

```text
[ IMAGE ]

ELEPHANT

🔊 Listen
```

---

## Stage 2: Active Recall

The learner must actively produce the answer.

Example:

```text
[ IMAGE OF ELEPHANT ]

Spell the word.
```

The learner may interact using:

- typing
- letter tiles
- drag-and-drop
- word construction

Direct manipulation should be preferred where appropriate.

---

## Stage 3: Immediate Evaluation

The platform evaluates the learner's answer.

Possible states:

```text
CORRECT
```

or:

```text
NOT YET
```

Feedback should explain:

- what was expected
- what the learner entered
- what is being checked

The system should avoid vague failure messages.

---

## Stage 4: Mistake Reinforcement

Incorrectly answered items are collected.

After the initial round:

```text
Correct Answers
    ↓
Completed

Incorrect Answers
    ↓
Reinforcement Round
```

The learner receives another opportunity to answer previously mistaken items.

This creates a basic memory reinforcement loop.

---

## Stage 5: Recognition Round

The lesson ends with a quick recognition exercise.

Example:

```text
Which spelling is correct?

A. ELEPHANT
B. ELEPHENT
C. ELEFANT
```

This verifies recognition after active recall.

---

# 10. Progress System

Completion should update learner progress.

Progress may exist at several levels:

```text
Exercise Progress
        ↓
Lesson Progress
        ↓
Theme Progress
        ↓
Module Progress
        ↓
Catalogue Progress
        ↓
Language Progress
```

Example:

```text
Animals Theme

████████░░ 80%
```

Progress must persist in the database.

Learners logging into another device must retain:

- completed lessons
- unlocked content
- keys
- progress
- current state

---

# 11. Catalogue Unlocking

The Words catalogue is initially accessible.

Later catalogues begin locked.

```text
Words
🔓 Available

Phrases & Sentences
🔒 Locked

Comprehension
🔒 Locked
```

A learner can become eligible to access a higher catalogue through:

### Path A: Learning Progress

Completing required progress in predecessor content.

### Path B: Qualification Test

Demonstrating sufficient existing knowledge.

This prevents experienced learners from being forced through beginner content.

---

# 12. Eligibility vs Unlocking

These concepts must remain separate.

## Eligibility

Answers:

> Can the learner access this catalogue?

Example:

```text
Phrases & Sentences

Eligibility:
✓ 70% required Words progress

OR

✓ Qualification Test passed
```

---

## Unlocking

Answers:

> Which specific lessons can the learner access?

Keys are used here.

Example:

```text
Sentence Catalogue

Travel Conversation     🔓
Restaurant Dialogue     🔒 10 Keys
Airport Conversation    🔒 15 Keys
Business Meeting        🔒 20 Keys
```

This separation prevents the progression system from becoming unnecessarily confusing.

---

# 13. Key Economy

Keys are the primary progression resource.

Learners earn keys through completing content.

```text
Learn
  ↓
Complete
  ↓
Earn Keys
  ↓
Unlock Content
  ↓
Learn More
```

Keys should have one primary purpose:

> Unlock specific learning content.

The platform should avoid multiple unnecessary currencies.

No:

```text
Coins
Gems
Energy
Tickets
Stars
Crystals
Mystery Tokens
```

One resource is enough. Civilization will survive.

---

# 14. Qualification Tests

Learners may demonstrate existing knowledge.

Example:

```text
English Words Qualification Test
```

If the learner achieves the required score:

```text
Catalogue Access
    ↓
Unlocked
```

The learner may also receive a limited number of keys.

The purpose is:

```text
Explore Advanced Content
```

not:

```text
Skip The Entire Learning System Forever
```

Qualification rewards must therefore be limited.

---

# 15. Skip Theme Tests

Each theme has a maximum available key reward.

Example:

```text
Theme Maximum Reward: 100 Keys
```

Keys can be earned through:

- individual lesson completion
- successful theme skip test

Both draw from the same reward pool.

Example:

```text
Maximum Available: 100

Lessons Completed:
60 Keys earned

Skip Test Passed:
Maximum remaining = 40 Keys
```

Therefore:

```text
Skip Test Reward
=
Remaining Available Theme Reward
```

If all available keys have already been earned:

```text
Skip Test Reward = 0
```

This prevents reward farming.

---

# 16. Phrases & Sentences

This catalogue builds on vocabulary knowledge.

Each theme may require progress across one or more predecessor themes.

Example:

```text
Restaurant Conversation

Requirements:

Food Vocabulary       70%
Action Words          60%
Daily Life            50%
```

Once eligibility requirements are satisfied, the learner may unlock specific lessons using keys.

The learner should have some freedom of choice rather than being forced through one completely linear sequence.

---

# 17. Comprehension

Comprehension builds on previous language knowledge.

Requirements may depend on:

- sentence completion
- relevant vocabulary
- phrase knowledge
- prerequisite lessons

Example:

```text
Travel Story

Requires:

Travel Vocabulary
Airport Conversations
Basic Sentence Structure
```

The learner applies previously learned knowledge in a broader context.

---

# 18. Learner Content Flow

The intended primary learning loop is:

```text
Choose Theme
      ↓
Learn Vocabulary
      ↓
Interactive Exercise
      ↓
Immediate Feedback
      ↓
Reinforce Mistakes
      ↓
Recognition Round
      ↓
Complete Lesson
      ↓
Gain Progress
      ↓
Earn Keys
      ↓
Unlock New Learning
```

This is the core product loop.

---

# 19. Author Experience

The author interface is one of the primary objectives of the platform.

The author should not need:

```text
VS Code
Git
Pull Request
Deployment
```

to add a new lesson.

Instead:

```text
Author Dashboard
```

should provide content management.

---

# 20. Author Dashboard Structure

```text
Author Dashboard
│
├── Overview
│
├── Languages
│
├── Catalogues
│
├── Modules
│
├── Themes
│
├── Lessons
│
├── Exercises
│
├── Labs
│
├── Drafts
│
└── Archived Content
```

Depending on permissions, authors may only manage assigned content.

---

# 21. Content Lifecycle

Every author-created content entity should have a lifecycle.

```text
DRAFT
   ↓
PUBLISHED
   ↓
ARCHIVED
```

## Draft

The content is still being created.

Learners cannot access it.

## Published

The content is visible according to learner access rules.

## Archived

The content is no longer actively available but is retained for historical purposes.

The system should generally prefer:

```text
Archive
```

over:

```text
Permanent Delete
```

for important published content.

---

# 22. Draft Persistence

Authors must be able to stop work and return later.

Drafts must be stored in the database.

Example:

```text
Author Device A
       ↓
Save Draft
       ↓
Database
       ↓
Author Device B
       ↓
Continue Editing
```

This supports:

- cross-device authoring
- interrupted work
- persistent drafts

---

# 23. Content Preview

Authors must be able to preview content from the learner's perspective.

The preview should render the actual learning experience.

The author should not merely see:

```text
Lesson JSON
```

They should see:

```text
Picture
Question
Interaction
Feedback
Exercise Flow
```

The preview system should reuse the same learner rendering engine wherever possible.

This avoids building:

```text
Author Preview Renderer
```

and:

```text
Learner Renderer
```

as separate systems that slowly drift apart.

---

# 24. Content Model

The platform should be data-driven.

A simplified hierarchy:

```text
Language
│
└── Catalogue
    │
    └── Module
        │
        └── Theme
            │
            └── Lesson
                │
                ├── Exercise
                │
                └── Evaluation Criteria
```

Not every content type must contain every level.

The system should support configurable structures.

---

# 25. Extensibility Principles

The project should follow the **Open/Closed Principle** conceptually.

The system should be:

> Open for extension, closed for unnecessary modification.

Adding:

```text
German
Hindi
Japanese
Spanish
```

should primarily involve:

```text
Create Language
    ↓
Create Content Structure
    ↓
Create Catalogues
    ↓
Create Content
```

rather than:

```text
Modify core application logic
```

---

# 26. Important Architectural Refinement

Traditional OOP inheritance should not be copied literally into the database architecture.

For example, this Java-style mental model:

```java
abstract class Language

class English extends Language
class German extends Language
class Hindi extends Language
```

is conceptually useful.

However, the web application should not necessarily implement every language as a separate TypeScript class.

Instead:

```text
Language
```

should primarily be a database entity.

Example:

```text
languages

id
name
code
writing_system
direction
status
```

Examples:

```text
English
code: en

German
code: de

Hindi
code: hi

Japanese
code: ja
```

The platform behavior remains generic.

Only language-specific behavior should use specialized strategies.

---

# 27. Strategy-Based Extensibility

Where languages genuinely behave differently, use a strategy pattern.

Examples:

```text
Pronunciation Strategy

English Pronunciation
Japanese Pronunciation
Hindi Pronunciation
```

or:

```text
Writing Exercise Strategy

Latin Script Evaluator
Devanagari Evaluator
Kana Evaluator
```

Conceptually:

```text
Exercise
    ↓
Exercise Type
    ↓
Evaluation Strategy
```

This is preferable to creating an enormous inheritance hierarchy.

---

# 28. Exercise Engine

Exercises should be extensible.

Initial exercise types may include:

```text
IMAGE_TO_WORD
SPELLING_INPUT
LETTER_REORDER
WORD_BUILDER
MULTIPLE_CHOICE
SENTENCE_BUILDER
COMPREHENSION_INPUT
```

Each exercise contains:

- exercise type
- content configuration
- expected outcome
- evaluation criteria
- feedback configuration

The renderer chooses how to display the exercise.

The evaluator chooses how to evaluate it.

---

# 29. Evaluation Architecture

The system should follow:

```text
Exercise UI
      ↓
Submission
      ↓
Evaluation Service
      ↓
Exercise Evaluator
      ↓
Evaluation Result
      ↓
Progress Service
      ↓
Persistence
```

Critical learning logic must not be buried inside React components.

Bad:

```text
React Component
    ↓
if answer === expected
```

Better:

```text
Component
    ↓
submitAnswer()
    ↓
Evaluation Engine
    ↓
Result
```

---

# 30. Technology Stack

## Frontend

### Next.js

Used for:

- application routing
- server-side rendering
- server components
- route handlers
- application delivery

### React

Used for:

- interactive learning experiences
- exercise interfaces
- authoring tools
- dashboards

### TypeScript

Required across the application.

Benefits:

- safer domain models
- clearer contracts
- easier refactoring
- shared types

---

## Styling

### Tailwind CSS

Used for:

- rapid UI development
- consistent design
- responsive layouts

### shadcn/ui

Used for:

- accessible reusable components
- dashboards
- forms
- dialogs
- administrative interfaces

---

# 31. Backend Platform

## Supabase

Supabase provides:

- PostgreSQL
- authentication
- OAuth
- Row Level Security
- storage
- database migrations
- Edge Functions when required

Architecture:

```text
Next.js
   ↓
Application / Domain Layer
   ↓
Supabase
   ↓
PostgreSQL
```

Supabase is not a replacement for application architecture.

Business logic remains part of the project.

---

# 32. Authentication

Use:

```text
Supabase Auth
```

Initial authentication should support:

```text
Google OAuth
```

Additional providers may be introduced later.

Potentially:

```text
GitHub OAuth
Email/Password
```

depending on product requirements.

Authentication provides identity.

Authorization determines capabilities.

These must remain separate concepts.

---

# 33. Authorization

Use:

```text
Application Authorization
+
Supabase Row Level Security
```

RLS protects data access.

Application permissions control feature access.

Example:

```text
Learner
→ Read published learning content
→ Modify own progress

Author
→ Create/edit assigned content

Administrator
→ Manage platform resources
```

---

# 34. Permission Model

The idea of using a Discord-style bitfield is technically valid.

Permissions can be represented as bits inside an integer.

Example:

```text
CREATE_CONTENT  = 1
EDIT_CONTENT    = 2
PUBLISH_CONTENT = 4
ARCHIVE_CONTENT = 8
MANAGE_USERS    = 16
```

A user with:

```text
CREATE_CONTENT
+
EDIT_CONTENT
```

would have:

```text
1 + 2 = 3
```

stored as:

```text
00000011
```

---

# 35. Should Word Wizards Use a 64-Bit Permission Bitfield?

## Advantages

- compact storage
- fast permission checks
- efficient representation
- useful for stable global permissions

Example:

```text
permission & EDIT_CONTENT
```

determines whether a permission exists.

---

## Disadvantages

Permission bitfields become less pleasant when permissions are:

- dynamic
- resource-specific
- tenant-specific
- highly granular

For example:

```text
Author A can edit Theme X
Author B can edit Theme Y
Author C can edit only Lesson Z
```

A global 64-bit integer does not solve this elegantly.

---

# 36. Recommended Authorization Model

Use a hybrid approach.

## Global capabilities

Use role-based permissions.

Example:

```text
ADMIN
AUTHOR
LEARNER
```

Potentially backed by bitfields for platform-level capabilities.

## Resource-level permissions

Use relational access rules.

Example:

```text
author_content_access

user_id
content_id
permission
```

Therefore:

```text
Global Permission
+
Resource Ownership / Assignment
```

This is significantly more flexible than trying to encode the entire authorization universe into sixty-four increasingly cursed bits.

---

# 37. Recommended Permission Architecture

```text
User
 │
 ├── Role
 │
 └── Permissions
       │
       ├── Platform Permissions
       │
       └── Resource Permissions
```

Example:

```text
ROLE: AUTHOR

Platform Permissions:
✓ CREATE_CONTENT
✓ EDIT_CONTENT

Resource Assignment:
✓ English Vocabulary
✓ Animals Theme
✗ Japanese Content
```

This model scales better.

---

# 38. Database Responsibilities

Supabase PostgreSQL handles:

- users
- profiles
- languages
- catalogues
- modules
- themes
- lessons
- exercises
- progress
- keys
- unlocks
- drafts
- publication state

The database should enforce:

- foreign keys
- constraints
- uniqueness
- data integrity

RLS should enforce:

- user-level data access
- author restrictions
- learner ownership

---

# 39. Suggested Core Data Model

Initial entities:

```text
profiles

roles
permissions
role_permissions

languages

catalogues
modules
themes
lessons
exercises

content_prerequisites

learner_progress
lesson_attempts
exercise_attempts

learner_wallet
key_transactions

content_unlocks

author_drafts

content_assignments
```

This should be refined before implementation.

---

# 40. Important Financial-Ledger Principle for Keys

Keys should not only be stored as:

```text
user.keys = 150
```

That creates debugging problems.

Instead use:

```text
learner_wallet
```

and:

```text
key_transactions
```

Example:

```text
+10 Lesson Completed
+20 Theme Completed
-15 Lesson Unlocked
+5 Qualification Reward
```

The current balance can be derived or maintained transactionally.

This provides:

- auditability
- anti-exploit protection
- easier debugging
- reward tracking

This is particularly important because the key economy has anti-farming rules.

---

# 41. Security Requirements

The platform must:

- never trust client-side authorization
- protect privileged operations server-side
- enforce RLS
- validate input
- prevent learners from modifying key balances directly
- prevent learners from unlocking content without valid transactions
- prevent authors from publishing unauthorized content
- protect draft ownership

Critical progression operations should be transactional.

For example:

```text
Check Eligibility
    ↓
Deduct Keys
    ↓
Create Unlock
```

These operations should not be separate client-side calls.

---

# 42. Project Scaffold Structure

The current scaffold direction:

```text
word-wizards/
│
├── apps/
│   └── web/
│
├── packages/
│   ├── constants/
│   └── types/
│
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── config.toml
│
├── package.json
├── turbo.json
└── docker-compose.yml
```

This is a reasonable starting structure.

---

# 43. Recommended Scaffold Improvements

Before major feature development, the scaffold should establish:

```text
apps/web
```

with:

- Next.js
- TypeScript
- Tailwind
- shadcn/ui

Root tooling:

- Turborepo
- Biome
- Lefthook

Infrastructure:

- Supabase
- Docker

Automation:

- GitHub Actions

Testing:

- Vitest or Jest
- React Testing Library

The project must have working:

```text
lint
typecheck
test
build
```

commands.

A fake test command that intentionally fails is not a testing strategy. It is merely an automated reminder that the repository is unfinished.

---

# 44. Proposed Application Structure

As the project grows:

```text
apps/
└── web/
    │
    ├── app/
    │   ├── (auth)/
    │   ├── learner/
    │   ├── author/
    │   ├── admin/
    │   └── api/
    │
    ├── features/
    │   ├── auth/
    │   ├── learning/
    │   ├── catalogues/
    │   ├── progress/
    │   ├── keys/
    │   ├── unlocking/
    │   ├── qualification/
    │   ├── authoring/
    │   └── administration/
    │
    ├── domain/
    │   ├── language/
    │   ├── content/
    │   ├── exercises/
    │   ├── evaluation/
    │   ├── progression/
    │   └── permissions/
    │
    ├── services/
    │
    ├── lib/
    │   └── supabase/
    │
    └── components/
```

---

# 45. Recommended Package Structure

Eventually:

```text
packages/
│
├── types/
│
├── constants/
│
├── validation/
│
└── domain/
```

However:

> Do not create packages merely because Turborepo makes folders cheap.

Start with:

```text
types
constants
```

Extract additional packages only when code is genuinely shared.

---

# 46. Application Layer Responsibilities

The application must maintain a clear boundary:

```text
UI
↓
Feature / Application Layer
↓
Domain Logic
↓
Persistence
```

Example:

```text
Lesson UI
    ↓
Learning Service
    ↓
Exercise Evaluator
    ↓
Progress Service
    ↓
Supabase
```

React components should focus primarily on:

- rendering
- interaction
- local UI state

They should not become repositories for business rules.

---

# 47. Supabase Edge Functions

Use Edge Functions selectively.

Appropriate use cases:

- external APIs
- webhooks
- secret-dependent operations
- protected background-style operations

Do not create an Edge Function for every CRUD operation.

The architecture should not accidentally become:

```text
React
↓
Server Action
↓
API Route
↓
Edge Function
↓
Database
```

for fetching a vocabulary word. That would be performance art.

---

# 48. Testing Strategy

Testing should exist from the beginning.

## Unit Tests

Test:

- exercise evaluators
- progression rules
- key reward calculations
- unlock eligibility
- permission logic

## Component Tests

Test:

- lesson interactions
- feedback states
- authoring forms

## Integration Tests

Test:

- progress persistence
- unlock transactions
- authorization

## End-to-End Tests

Eventually test:

```text
Login
↓
Complete Lesson
↓
Earn Keys
↓
Unlock Content
↓
Resume on another session
```

---

# 49. CI Requirements

GitHub Actions should run:

```text
Install
↓
Lint
↓
Typecheck
↓
Test
↓
Build
```

No PR should depend entirely on someone saying:

> It worked on my machine.

History has demonstrated that this sentence has rarely improved software quality.

---

# 50. MVP Definition

The first production-worthy vertical slice should include:

## Authentication

- Google OAuth
- learner profile

## Learner

- dashboard
- one language
- one catalogue
- one theme
- one complete lesson flow

## Learning

- introduction
- spelling exercise
- evaluation
- feedback
- mistake reinforcement
- recognition round

## Persistence

- progress saved
- cross-session restoration

## Authoring

- create lesson
- save draft
- publish
- learner preview

This proves the entire architecture.

---

# 51. Three-Week Implementation Direction

## Week 1: Foundation

### Infrastructure

- finalize scaffold
- Supabase setup
- authentication
- database schema
- RLS
- CI
- testing foundation

### Vertical Slice

Build one complete learner flow:

```text
Login
↓
Select Theme
↓
Complete Lesson
↓
Receive Feedback
↓
Save Progress
```

---

## Week 2: Learning Engine

Implement:

- catalogue structure
- themes
- lessons
- exercise engine
- evaluation
- mistake reinforcement
- progress tracking
- keys
- unlocking

---

## Week 3: Authoring + Polish

Implement:

- author dashboard
- content CRUD
- drafts
- publishing
- archive
- learner preview
- qualification tests
- security hardening
- testing
- documentation

Stretch systems should only be implemented after the core system works.

---

# 52. Architecture Principles

The project should follow these principles.

## Data over hardcoding

```text
Languages are data.
Catalogues are data.
Themes are data.
Lessons are data.
```

---

## Generic engine

The application understands:

```text
Language
Catalogue
Lesson
Exercise
Evaluation
Progress
```

It should not need to understand:

```text
English Animals Lesson #7
```

as a special software concept.

---

## Strategy over giant inheritance trees

Use specialized behavior only where genuinely necessary.

---

## Server authority

The client displays state.

The server/database controls:

- permissions
- progress
- keys
- unlocks
- publication

---

## One clear responsibility per layer

```text
UI → interaction

Application → workflows

Domain → rules

Database → persistence

RLS → data access
```

---

# 53. Success Criteria

Word Wizards is successful when:

### Learners can:

- authenticate
- learn interactively
- receive meaningful feedback
- progress through content
- retain progress across devices
- earn and spend keys
- unlock content
- continue learning later

### Authors can:

- authenticate
- create content
- save drafts
- resume drafts
- edit content
- preview content
- publish content
- archive content

### Engineers can:

- add new languages without redesigning the platform
- add new content without hardcoding pages
- add exercise types through extension
- maintain clear authorization boundaries
- test core progression rules independently

---

# 54. Final Product Statement

> **Word Wizards is a data-driven, interactive language-learning platform that combines structured learner progression with a reusable content-management engine.**

The platform initially teaches English through vocabulary, phrases, sentences, and comprehension, while its underlying architecture is designed to support additional languages and learning structures.

Learners actively interact with lessons, receive immediate feedback, reinforce mistakes, earn progression resources, unlock new content, and retain their progress across devices.

Authors manage the learning experience through a role-based content interface, allowing them to create, save, preview, publish, and archive content without requiring engineering changes.

The long-term value of Word Wizards is therefore not merely the initial English curriculum.

It is the reusable system underneath it.

```text
Create Content
      ↓
Publish Content
      ↓
Learners Interact
      ↓
Evaluate Learning
      ↓
Track Progress
      ↓
Unlock Progression
```

That engine is the actual product.