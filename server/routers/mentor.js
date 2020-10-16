const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/authentication');
const permit = require('../middleware/authorization');

const router = new Router();

router.get('/mentors', auth, MentorController.getLearners);
router.patch('/mentors', auth, permit("Mentor"), MentorController.assignLearner);
router.patch('/mentors/availability', auth, permit("Mentor"), MentorController.changeAvailability);
router.delete('/mentors', auth, permit("Mentor"), MentorController.unassignLearner);

module.exports = router;
