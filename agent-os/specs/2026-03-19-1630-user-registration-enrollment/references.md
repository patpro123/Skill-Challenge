# References

## Existing Auth Code
- `backend/src/controllers/auth.js` — `register()` and `login()` functions
- `backend/src/routes/auth.js` — `POST /api/auth/register`, `POST /api/auth/login`
- `backend/src/middleware/auth.js` — JWT verification middleware

## Existing Enrollment Code
- `backend/src/controllers/enrollments.js` — `createEnrollment()` function
- `backend/src/routes/enrollments.js` — `POST /api/enrollments` (auth-protected)

## Frontend Reference Implementations
- `frontend/src/pages/HomePage.jsx` — two-card language selector pattern to reuse
- `frontend/src/pages/HomePage.module.css` — card/grid CSS classes to reuse

## Database
- `backend/src/db/migrate.js` — schema definition and seed data
- `backend/src/db/index.js` — pg Pool instance
