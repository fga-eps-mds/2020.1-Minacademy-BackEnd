const { Router } = require('express');
const LearnerController = require('../controllers/LearnerController');
const auth = require('../middleware/authentication');

const router = new Router();


router.get('/learners', LearnerController.getLearners);

module.exports = router;