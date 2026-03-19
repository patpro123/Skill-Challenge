# 100-Day Skill Challenge App — Backend API

## Context

Building the backend/API foundation for a new 100-day skill challenge app. The app helps users commit to learning a skill over 100 days by providing enrollment, daily progress tracking, and practice flashcards. This is a greenfield project; no existing code to reference.

**Tech stack:** Node.js (Express), PostgreSQL
**Spec folder:** `agent-os/specs/2026-03-19-backend-api-foundation/`

---

## Task 1: Save Spec Documentation

Create `agent-os/specs/2026-03-19-backend-api-foundation/` with:
- `plan.md` — this plan
- `shape.md` — shaping notes
- `standards.md` — N/A (no standards defined yet)
- `references.md` — no existing references

---

## Task 2: Project Setup

Initialize the Node.js backend project.

- `npm init` with `package.json`
- Install core dependencies: `express`, `pg`, `dotenv`, `cors`
- Install dev dependencies: `nodemon`
- Create folder structure:
  ```
  backend/
  ├── src/
  │   ├── routes/
  │   ├── controllers/
  │   ├── models/
  │   ├── middleware/
  │   └── db/
  ├── .env.example
  └── server.js
  ```
- Configure Express server with JSON body parser and CORS
- Set up `db/index.js` with a `pg.Pool` connected via `DATABASE_URL` env var

---

## Task 3: Database Schema & Migrations

Create SQL migration files for all core tables.

**Tables:**

```sql
users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
)

enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  skill_name TEXT NOT NULL,
  skill_description TEXT,
  start_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
)

daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  day_number INTEGER NOT NULL,  -- 1 to 100
  logged_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT
)

flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language TEXT NOT NULL,       -- 'python' | 'java'
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium'
)
```

- Create `db/migrate.js` script to run migrations on startup
- Seed initial flashcard data for Python and Java (at least 10 cards each)

---

## Task 4: User Authentication Endpoints

Implement auth with JWT.

- Install: `bcryptjs`, `jsonwebtoken`
- `POST /api/auth/register` — hash password, insert user, return JWT
- `POST /api/auth/login` — verify password, return JWT
- `src/middleware/auth.js` — verify JWT and attach `req.user` for protected routes

---

## Task 5: Enrollment Endpoints

- `POST /api/enrollments` (protected) — create new 100-day enrollment for the logged-in user
- `GET /api/enrollments` (protected) — list user's enrollments
- `GET /api/enrollments/:id` (protected) — get enrollment detail including progress count

---

## Task 6: Daily Progress Tracking Endpoints

- `POST /api/enrollments/:id/log` (protected) — log today's practice (idempotent per day)
- `GET /api/enrollments/:id/logs` (protected) — return all logs for an enrollment (used to render 100-day grid)

---

## Task 7: Flashcard Endpoints

- `GET /api/flashcards?language=python` — return all flashcards for a given language (public, no auth required)
- `GET /api/flashcards/random?language=java&limit=10` — return N random flashcards

---

## Verification

1. Start the server: `node server.js` (or `nodemon`)
2. Run migrations: confirm all 4 tables created in PostgreSQL
3. Test auth: `POST /api/auth/register`, then `POST /api/auth/login` → get JWT
4. Test enrollment: `POST /api/enrollments` with Bearer token → get enrollment ID
5. Test daily log: `POST /api/enrollments/:id/log` → confirm day_number increments correctly
6. Test flashcards: `GET /api/flashcards?language=python` → confirm seed data returns
