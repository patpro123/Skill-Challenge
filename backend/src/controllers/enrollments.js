const pool = require('../db');

async function createEnrollment(req, res) {
  const { skill_name, skill_description, start_date } = req.body;
  if (!skill_name || !start_date) {
    return res.status(400).json({ error: 'skill_name and start_date are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO enrollments (user_id, skill_name, skill_description, start_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, skill_name, skill_description || null, start_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function listEnrollments(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT e.*, COUNT(dl.id)::int AS days_logged
       FROM enrollments e
       LEFT JOIN daily_logs dl ON dl.enrollment_id = e.id
       WHERE e.user_id = $1
       GROUP BY e.id
       ORDER BY e.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getEnrollment(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT e.*, COUNT(dl.id)::int AS days_logged
       FROM enrollments e
       LEFT JOIN daily_logs dl ON dl.enrollment_id = e.id
       WHERE e.id = $1 AND e.user_id = $2
       GROUP BY e.id`,
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function logDay(req, res) {
  const { notes } = req.body;
  try {
    // Verify enrollment belongs to user
    const { rows: enRows } = await pool.query(
      'SELECT id FROM enrollments WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (!enRows[0]) return res.status(404).json({ error: 'Enrollment not found' });

    // Next day number = count of existing logs + 1
    const { rows: countRows } = await pool.query(
      'SELECT COUNT(*)::int AS count FROM daily_logs WHERE enrollment_id = $1',
      [req.params.id]
    );
    const day_number = countRows[0].count + 1;

    if (day_number > 100) {
      return res.status(400).json({ error: 'Challenge already completed (100 days logged)' });
    }

    const { rows } = await pool.query(
      `INSERT INTO daily_logs (enrollment_id, day_number, notes)
       VALUES ($1, $2, $3)
       ON CONFLICT (enrollment_id, day_number) DO NOTHING
       RETURNING *`,
      [req.params.id, day_number, notes || null]
    );

    if (!rows[0]) {
      return res.status(409).json({ error: 'This day has already been logged' });
    }
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getLogs(req, res) {
  try {
    const { rows: enRows } = await pool.query(
      'SELECT id FROM enrollments WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (!enRows[0]) return res.status(404).json({ error: 'Enrollment not found' });

    const { rows } = await pool.query(
      'SELECT * FROM daily_logs WHERE enrollment_id = $1 ORDER BY day_number ASC',
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createEnrollment, listEnrollments, getEnrollment, logDay, getLogs };
