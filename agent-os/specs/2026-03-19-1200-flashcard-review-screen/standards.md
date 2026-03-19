# Standards — Flashcard Review Screen

No project-wide standards have been defined yet via `/discover-standards`.

## Patterns Used in This Feature

These are informal conventions observed during implementation — candidates for future standards:

- **API response shape:** `{ data: [...] }` wrapper for list endpoints (or raw array — to be standardized)
- **Component file naming:** PascalCase filename matches component name (e.g., `FlashcardCard.jsx`)
- **CSS Modules:** One `.module.css` file per component
- **Language param:** Backend uses `language` (not `topic`) for flashcard filtering

## Action

Run `/discover-standards` after more features are built to extract consistent patterns.
