const router = require('express').Router();
const { getFlashcards, getRandomFlashcards } = require('../controllers/flashcards');

router.get('/random', getRandomFlashcards);
router.get('/', getFlashcards);

module.exports = router;
