const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/authentication');
const permit = require('../middleware/authorization');

const router = new Router();

router.get('/mentors', auth,permit('Mentor'), MentorController.getLearners);
router.patch('/mentors', auth, permit('Mentor'), MentorController.assignLearner);
router.patch('/mentors/availability', auth, permit('Mentor'), MentorController.changeAvailability);
router.delete('/mentors', auth, permit('Mentor'), MentorController.unassignLearner);
router.patch('/mentors/validation', auth, permit('Mentor'), MentorController.validateMentor);

module.exports = router;
