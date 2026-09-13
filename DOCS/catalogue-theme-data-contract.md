# Catalogue and Theme Data Contract

The learner catalogue UI currently reads temporary frontend data through the catalogue service. The eventual backend source should provide the same conceptual fields so the service can be replaced without changing the UI layer.

## Catalogue

```ts
{
  id: string;            // stable identifier
  name: string;          // learner-facing name
  description: string;   // short discovery text
  visual?: string;       // image/visual reference
  order: number;         // display ordering
}
```

## Theme

```ts
{
  id: string;                    // stable identifier
  catalogueId: string;           // parent catalogue relationship
  name: string;                 // learner-facing name
  description: string;           // short discovery text
  visual?: string;               // image/visual reference
  order: number;                 // display ordering within the catalogue
  progress: number;              // learner progress, 0-100
  availability: "available" | "locked";
}
```

The backend may use a richer representation for images or availability, but the learner-facing service should normalize it to this shape.

Availability is display state in this frontend slice. Unlock rules and persistence are outside the scope of issue #1.

The relationship is strictly:

```text
Catalogue
   ↓
Theme
   ↓
Lesson (later)
   ↓
Exercise (later)
```

No Module entity is required by the current product contract.
