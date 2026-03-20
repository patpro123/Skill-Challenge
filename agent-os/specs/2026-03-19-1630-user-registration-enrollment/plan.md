# User Registration + Enrollment Flow

## Context

Phase 1 MVP "Enrollment flow" — lets users create an account, choose their language, and land on their personalized flashcard page. The backend auth and enrollment APIs already exist; only the frontend UI and a minor backend schema addition are needed.

**Flow:** User fills out registration form (name, email, password, Java/Python choice) → account created → enrollment created → redirected to `/flashcards/{language}`.

---

## Task 1: Save Spec Documentation ✅

Create `agent-os/specs/2026-03-19-1630-user-registration-enrollment/` with plan, shape, standards, and references files.

---

## Task 2: Backend — Add `name` to Users Table

The existing `users` table has no `name` column. Update the schema and register endpoint to store it.

**Files modified:**
- `backend/src/db/migrate.js` — added `name VARCHAR(255)` column to `users` CREATE TABLE statement
- `backend/src/controllers/auth.js` — extract `name` from `req.body` in `register()`, include in INSERT, return in response

**API contract:**
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user: { id, name, email } }
```

---

## Task 3: Frontend — Create `RegisterPage.jsx`

Created `frontend/src/pages/RegisterPage.jsx` with:
- Name, email, password inputs
- Language selector cards (Python/Java)
- On submit: register → enroll → navigate to `/flashcards/{language}`
- Inline error handling

---

## Task 4: Frontend — Wire Routing

- `frontend/src/App.jsx`: added `/register` route
- `frontend/src/pages/HomePage.jsx`: added "Get Started" button

---

## Critical Files

| File | Change |
|------|--------|
| `backend/src/db/migrate.js` | Add `name` column to users table |
| `backend/src/controllers/auth.js` | Accept + store `name` in register |
| `frontend/src/App.jsx` | Add `/register` route |
| `frontend/src/pages/RegisterPage.jsx` | New — full registration form |
| `frontend/src/pages/HomePage.jsx` | Add "Get Started" CTA |
