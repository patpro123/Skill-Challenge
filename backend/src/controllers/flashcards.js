const pool = require('../db');

async function getFlashcards(req, res) {
  const { language } = req.query;
  if (!language) {
    return res.status(400).json({ error: 'language query param is required' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT * FROM flashcards WHERE language = $1 ORDER BY difficulty, id',
      [language.toLowerCase()]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getRandomFlashcards(req, res) {
  const { language } = req.query;
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
  if (!language) {
    return res.status(400).json({ error: 'language query param is required' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT * FROM flashcards WHERE language = $1 ORDER BY random() LIMIT $2',
      [language.toLowerCase(), limit]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getFlashcards, getRandomFlashcards };
