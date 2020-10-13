const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/userAuth');

const router = new Router();


router.get('/mentor', MentorController.getMentors);
router.post('/mentor/change', MentorController.changeToLearner)

module.exports = router;