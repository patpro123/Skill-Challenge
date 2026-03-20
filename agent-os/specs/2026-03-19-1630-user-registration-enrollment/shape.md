# Shape Notes

## Appetite
Small — one sprint, minimal scope.

## Problem
Users have no way to create an account or enroll in a language challenge. The app goes straight to flashcards with no personalization.

## Solution Shape
1. Add `name` column to `users` table (non-breaking migration using `IF NOT EXISTS` table creation — existing rows get NULL name).
2. A single new page (`/register`) with a combined register + enroll form.
3. No new backend routes needed — `POST /api/auth/register` and `POST /api/enrollments` already exist.
4. Routing change: `/` gets a CTA button, `/register` is the new entry.

## Rabbit Holes to Avoid
- No email verification in MVP
- No password confirmation field (keep form simple)
- No profile/settings page
- No logout flow needed for MVP

## Out of Scope
- Login page (can be added in Phase 2)
- Dashboard or progress tracking
- Multiple enrollments per user
