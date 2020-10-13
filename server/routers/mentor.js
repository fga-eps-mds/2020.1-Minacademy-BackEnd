const { Router } = require('express');
const MentorController = require('../controllers/MentorController');
const auth = require('../middleware/userAuth');

const router = new Router();


router.get('/mentors', MentorController.getMentors);

module.exports = router;