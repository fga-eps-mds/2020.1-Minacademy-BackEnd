const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/authentication');
const permit = require('../middleware/authorization');

const router = new Router();


router.get('/mentors', auth, MentorController.getMentors);
router.patch('/mentors', auth, permit("Mentor"), MentorController.assignLearner);

module.exports = router;