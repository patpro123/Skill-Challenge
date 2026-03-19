# Shape Notes — Backend API Foundation

## Appetite
Small-batch greenfield backend. Goal is a working API skeleton with auth, enrollments, daily logs, and flashcards.

## Core Abstractions

- **User** — authenticated identity; owns enrollments
- **Enrollment** — a 100-day commitment to a skill; belongs to a user
- **DailyLog** — one entry per day per enrollment; idempotent (can't log the same day twice)
- **Flashcard** — static seed data by language; public read access

## Key Decisions

- UUID primary keys everywhere for portability
- JWT-based auth (stateless, no sessions)
- `day_number` computed from count of existing logs + 1 on each new log
- Idempotency on daily logs: check if a log already exists for `(enrollment_id, day_number)` before inserting
- Flashcard endpoints are public — no auth required
- `DATABASE_URL` as the single connection config point (12-factor app style)

## Out of Scope

- Frontend / UI
- Email verification
- Skill categories / taxonomy
- Social features (sharing progress)
- Spaced repetition scoring for flashcards
