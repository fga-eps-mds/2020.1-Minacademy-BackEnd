const Question = require('../models/Question');
const { isCorrect, populateAnswerKeys } = require('../utils/answerKeysUtils')
const { TUTORIAL, EXAM } = require('../utils/questionTypes')

module.exports = {
  async getProgress(req, res) {
    let questionsResults = []

    try {
      const answerKeys = await populateAnswerKeys(req.user);
      if (!answerKeys) throw new Error('User does not have any answered question');

      /* eslint-disable no-param-reassign */
      questionsResults = answerKeys.answers.map((answer) => {
        answer.isCorrect = isCorrect(answer.question, answer.alternative)
        return answer
      });
      await answerKeys.save();

      const correctAnswers = questionsResults.filter((answer) => answer.isCorrect);

      if (req.query.moduleNumber) {
        questionsResults = answerKeys.answers.filter((answer) =>
          answer.question.type === TUTORIAL &&
          answer.question.module.moduleNumber.toString() === req.query.moduleNumber
        );
      } else if (req.query.exam) {
        questionsResults = answerKeys.answers.filter((answer) =>answer.question.type === EXAM);
      }

      const totalQuestions = await Question.countDocuments({ type: TUTORIAL });
      const totalProgress = Math.floor((correctAnswers.length / totalQuestions) * 100);

      questionsResults = questionsResults.map((answer) => ({
        question: answer.question._id,
        alternative: answer.alternative,
        isCorrect: answer.isCorrect
      }));

      const payload = {
        questionsResults,
        totalProgress,
      };
      res.send(payload);
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message, questionsResults: [], totalProgress: 0 });
    }
  },
};
