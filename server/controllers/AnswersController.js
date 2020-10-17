const Question = require('../models/Question');
const AnswerKeys = require('../models/AnswerKey');

module.exports = {
  async answerQuestion(req, res) {
    try {
      const question = await Question.findById(req.body.question);
      if (!question) throw new Error('Question not found');
      const newAnswer = {
        question: req.body.question,
        alternative: req.body.alternative,
        isCorrect: question.answer === req.body.alternative,
      };
      let answerKeys = await req.user
        .execPopulate('answers')
        .then((user) => user.answers);
      if (answerKeys) {
        answerKeys.answers = answerKeys.answers
          .filter((answer) => answer.question.toString() !== question._id.toString());
        answerKeys.answers = answerKeys.answers.concat(newAnswer);
      } else {
        answerKeys = await new AnswerKeys({
          user: req.user._id,
          answers: newAnswer,
        });
      }

      await answerKeys.save();
      res.send(newAnswer);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
    }
  },
};
