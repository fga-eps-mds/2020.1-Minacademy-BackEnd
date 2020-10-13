const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/userAuth');

const router = new Router();


router.get('/mentors', MentorController.getMentors);
router.patch('/mentors', MentorController.assignLearner);

module.exports = router;