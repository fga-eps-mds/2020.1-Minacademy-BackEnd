const { Router } = require('express');
const LearnerController = require('../controllers/LearnerController');
const auth = require('../middleware/authentication');

const router = new Router();

router.patch('/learners',auth, LearnerController.mentorRequest);

module.exports = router;