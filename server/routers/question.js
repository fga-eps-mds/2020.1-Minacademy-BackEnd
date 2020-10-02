const { Router } = require('express');
const QuestionController = require('../controllers/QuestionController');
const auth = require('../middleware/userAuth')

const router = new Router();

router.get('/questions', QuestionController.getQuestions);
router.post('/questions/result', auth, QuestionController.answerQuestion);
router.get('/questions/result', auth, QuestionController.getQuestionsResults);
router.get('/questions/completed', auth, QuestionController.getCompletedModule);

module.exports = router;