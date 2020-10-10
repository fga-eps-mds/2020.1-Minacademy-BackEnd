const { Router } = require('express');
const QuestionController = require('../controllers/QuestionController');

const router = new Router();

router.get('/questions', QuestionController.getQuestions);

module.exports = router;
