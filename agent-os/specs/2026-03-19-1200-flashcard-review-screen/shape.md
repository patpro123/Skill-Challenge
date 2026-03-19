# Shape Notes — Flashcard Review Screen

## Scope

**In scope:**
- Flashcard review flow: question → flip → rate → next
- Session summary with score
- Python and Java topics (language param)
- CSS flip animation
- Progress indicator

**Out of scope:**
- User-specific progress persistence (deferred to later phase)
- Spaced repetition algorithm
- Card creation/editing UI
- Authentication gating (cards are public for now)

## Key Decisions

1. **`language` param (not `topic`):** The existing backend uses `language` as the query param name. The frontend matches this convention.

2. **No separate route for summary:** `FlashcardSummary` renders in-place within `FlashcardPage` when `currentIndex >= cards.length`. Keeps routing simple.

3. **Flip via CSS:** Pure CSS `transform: rotateY(180deg)` on a card wrapper — no JS animation library needed.

4. **Greenfield frontend:** No existing React app. Created as a standalone Vite + React app in `/frontend/`.

## Open Questions

- Should cards shuffle on each session? (Currently: ordered by difficulty then id)
- Should "Review again" cards be cycled back into the deck? (Currently: no, single pass)
