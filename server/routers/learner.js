const { Router } = require('express');
const LearnerController = require('../controllers/LearnerController');
const auth = require('../middleware/authentication');
const permit = require('../middleware/authorization');

const router = new Router();

router.patch('/learners', auth, permit('Learner'), LearnerController.assignMentor);
router.patch('/learners/request', auth, permit('Learner'), LearnerController.cancelMentorRequest);
router.get('/learners', auth, permit('Learner'), LearnerController.getMentor);
router.delete('/learners', auth, permit('Learner'), LearnerController.unassignMentor);

module.exports = router;
