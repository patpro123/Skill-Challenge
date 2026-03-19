# References — Flashcard Review Screen

## Existing Backend Code

| File | Purpose |
|---|---|
| `backend/src/routes/flashcards.js` | Express router — `GET /api/flashcards`, `GET /api/flashcards/random` |
| `backend/src/controllers/flashcards.js` | `getFlashcards(language)`, `getRandomFlashcards(language, limit)` |
| `backend/src/db/migrate.js` | Schema + seed data for `flashcards` table |
| `backend/server.js` | Mounts flashcard routes at `/api/flashcards` |

## Frontend (Greenfield)

No prior frontend code. The React app is created fresh at `/frontend/` using Vite.

## API Contract

```
GET /api/flashcards?language=python
GET /api/flashcards?language=java

Response: [
  { id, language, question, answer, difficulty }
]
```
