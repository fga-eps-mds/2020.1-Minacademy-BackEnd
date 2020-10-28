const Question = require('../models/Question');
const Module = require('../models/Module');

module.exports = {
  async getProgress(req, res) {
    try {
      const answerKeys = await req.user
        .execPopulate('answers')
        .then((user) => user.answers);
      if (!answerKeys) throw new Error('User does not have any answered question');
      /* eslint-disable no-param-reassign */
      answerKeys.answers.forEach(async (answer) => {
        const question = await Question.findById(answer.question);
        answer.isCorrect = question.answer.toString() === answer.alternative.toString();
      });
      await answerKeys.save();

      const correctAnswers = answerKeys.answers
        .filter((answer) => answer.isCorrect);

      if (req.query.moduleNumber) {
        const questions = await Module.findOne({
          moduleNumber: req.query.moduleNumber,
        }).populate('questions')
          .then((doc) => doc.questions.map((question) => question._id.toString()));
        answerKeys.answers = answerKeys.answers
          .filter((answer) => questions.includes(answer.question.toString()));
      }

      const totalQuestions = await Question.countDocuments({ module: { $ne: undefined } });
      const totalProgress = Math.floor((correctAnswers.length / totalQuestions) * 100);

      const payload = {
        questionsResults: answerKeys.answers,
        totalProgress,
      };
      res.send(payload);
    } catch (error) {
      res.status(400).send({ error: error.message, questionsResults: [], totalProgress: 0 });
    }
  },
};
