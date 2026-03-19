const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createEnrollment,
  listEnrollments,
  getEnrollment,
  logDay,
  getLogs,
} = require('../controllers/enrollments');

router.use(auth);

router.post('/', createEnrollment);
router.get('/', listEnrollments);
router.get('/:id', getEnrollment);
router.post('/:id/log', logDay);
router.get('/:id/logs', getLogs);

module.exports = router;
