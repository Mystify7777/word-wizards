# Issue #45: Catalogue & Theme Browsing Implementation Contract

## Scope

Implement the approved learner Catalogue and Theme browsing experiences from the supplied wireframes.

The existing content hierarchy remains authoritative:

Catalogue → Theme → Lesson → Exercise

The existing service/data boundary remains:

UI → service → mock data

This issue is a visual + lightweight client-interaction implementation. Backend persistence and new learning-system business logic are out of scope.

## Locked decisions

### Catalogue

- Display all current catalogues, including locked catalogues.
- Keep the existing catalogue IDs.
- Display the third catalogue as **Comprehensions & Conversations** while preserving its existing identity.
- Available catalogues navigate to the existing Catalogue → Theme route.
- Locked catalogues open a requirements presentation.
- Catalogue CTA is state-aware:
  - 0% → Start
  - 1–99% → Continue
  - 100% → Review
  - locked → View Requirements
- Catalogue progress remains mock data for now.
- Requirements UI is implemented with mock state; real qualification/unlock transactions are deferred.
- Insufficient-key actions should explain how keys are earned/used rather than silently failing.

### Themes

- Theme browsing is the existing Catalogue → Theme experience, not a second theme domain.
- Sidebar/theme selection uses the existing catalogue/theme data.
- All visible themes appear under **All**, including locked themes.
- Filters are exactly:
  - All
  - Not started
  - In progress
  - Completed
- Filter semantics:
  - Not started: available + progress === 0
  - In progress: available + 0 < progress < 100
  - Completed: available + progress === 100
- Locked themes remain visible under All but do not belong to progress-state filters.
- Theme search is implemented through a focused service boundary and operates on mock data for now.
- Theme sorting supports:
  - Recommended
  - A–Z
  - Z–A
  - Progress
- Recommended uses existing deterministic domain/mock ordering for this issue. No recommendation engine is introduced.
- Surprise Me randomly selects an eligible available theme. It is not personalized recommendation logic.
- Available themes navigate through the existing Theme → Lesson route.
- Theme mixing/custom learning paths may be shown as a deferred entry point, but no implementation or Module entity is introduced.

### Learner shell

- Reuse the existing learner shell/header.
- Language switching is presentation-only for now.
- Display the existing mock key balance, but do not implement key economy/history.
- Use existing learner routes for profile-menu destinations.
- Unimplemented destinations should use the existing Coming Soon mechanism rather than new placeholder systems.

### Data/content

- Current mock data is authoritative for IDs, relationships, ordering, and content.
- Do not replace the mock taxonomy merely to match example names in the wireframe.
- The deliberate display rename to **Comprehensions & Conversations** is allowed without changing its underlying ID.

### Assets

- Audit and reuse existing repository assets first.
- Generate/add only genuinely missing assets.
- Prefer SVG for clean vector/logo/icon assets.
- Prefer WebP for detailed illustrations and mascot artwork.
- Keep a consistent Word Wizards visual language.

## Service boundaries

Catalogue UI must consume the existing catalogue service.

Theme browsing should use a focused theme service for:
- listing
- search
- filtering
- sorting
- availability/progress presentation

The current implementation may use mock data behind that service. The service boundary should allow future backend/optimized queries without requiring the UI to be rewritten.

Do not introduce a generic query framework.

## Required interaction states

- Catalogue loading
- Catalogue empty
- Catalogue error/retry
- Available catalogue
- Locked catalogue
- In-progress catalogue
- Completed catalogue
- Requirements dialog
- Theme loading
- Theme empty
- Theme error/retry
- Theme search results
- No search results
- All / Not started / In progress / Completed filters
- Recommended / A–Z / Z–A / Progress sorting
- Available theme
- Locked theme
- Surprise Me with eligible themes
- Surprise Me with no eligible themes
- Keyboard/focus states
- Responsive states

## Explicit exclusions

- Supabase/database persistence
- Real catalogue/theme progress calculation
- Real key transactions or key economy
- Persistent unlocks
- Qualification/placement test engine
- Personalized recommendation engine
- Continue Learning/next-lesson resolution algorithm
- Onboarding flow
- Theme mixing/custom learning path implementation
- Module entity
- Lesson/exercise redesign
- Exercise execution
- Localization infrastructure
- New profile/help/key-history systems
- Author/admin content management

## Deferred work

Future issues should cover:
- real catalogue/theme unlock rules and key transactions
- recommendation logic
- Continue Learning / next lesson resolution
- theme mixing/custom learning paths
- onboarding and first-lesson flow
- database-backed persistence
- real progress calculation
- localization

## Acceptance criteria

- [ ] Catalogue page matches the approved wireframe structure.
- [ ] Existing catalogue data is rendered through the service layer.
- [ ] Available and locked catalogues are visually distinct.
- [ ] Progress states produce Start / Continue / Review actions.
- [ ] Locked catalogue requirements can be viewed.
- [ ] Theme browsing experience matches the approved wireframe.
- [ ] Theme sidebar works.
- [ ] Search works through the theme service.
- [ ] All / Not started / In progress / Completed filters work.
- [ ] Locked themes appear under All.
- [ ] Sorting works for Recommended / A–Z / Z–A / Progress.
- [ ] Recommended uses deterministic mock ordering only.
- [ ] Surprise Me selects a random available theme.
- [ ] Theme selection preserves existing catalogue/theme IDs.
- [ ] Theme → Lesson navigation remains functional.
- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Locked states exist.
- [ ] Responsive behavior works on desktop/tablet/mobile.
- [ ] Accessibility requirements are satisfied.
- [ ] Existing assets are reused where appropriate.
- [ ] Missing assets are added only where necessary.
- [ ] No backend/database work is introduced.
- [ ] No onboarding functionality is introduced.
- [ ] No recommendation engine is introduced.
- [ ] No theme-mixing implementation is introduced.
- [ ] No new Module entity is introduced.
- [ ] Existing tests/lint/typecheck/build remain clean.
