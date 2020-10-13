const { Router } = require('express');
const LearnerController = require('../controllers/LearnerController');
const auth = require('../middleware/userAuth');

const router = new Router();


router.get('/learner', LearnerController.getLearners);

module.exports = router;