const { Router } = require('express');
const AnswerController = require('../controllers/AnswersController');
const auth = require('../middleware/userAuth')

const router = new Router();

router.post('/answer', auth, AnswerController.answerQuestion);

module.exports = router;