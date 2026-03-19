# Flashcard Review Screen — Plan

## Context

The Flash Card feature is part of Phase 1 MVP of the 100-day challenge app. Users need a way to practice and reinforce learning through questions. This spec covers the Flashcard Review screen: a page where users are shown questions one at a time, can flip to reveal the answer, mark cards as known or needing review, and see a summary at the end of the session.

**Product alignment:** Directly addresses the Phase 1 MVP goal — "Practice questions to reinforce learning; initial content covers Python and Java."

**Tech stack:** React (frontend), Node.js (backend), PostgreSQL (database)

---

## Task 1: Save Spec Documentation ✅

Created `agent-os/specs/2026-03-19-1200-flashcard-review-screen/` with plan, shape, standards, and references files.

---

## Task 2: Define Flashcard Data Model & API Endpoint ✅

Backend already implements this via `GET /api/flashcards?language={language}`.

Schema in `backend/src/db/migrate.js` — `flashcards` table with UUID, language, question, answer, difficulty.

Seed data: 12 Python + 12 Java cards.

---

## Task 3: Build the Flashcard Review Screen (React) ✅

React page at `/flashcards/:language` with:
- `FlashcardPage` — fetches data, manages session state
- `FlashcardCard` — flip animation via CSS transform
- `FlashcardProgress` — progress counter

---

## Task 4: Build the Session Summary Screen ✅

`FlashcardSummary` rendered in-page after session ends, showing score and restart/home buttons.
